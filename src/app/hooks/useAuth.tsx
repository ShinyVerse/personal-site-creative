'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { loginSchema, signupSchema } from '@/lib/authSchemas'
import type { LoginFormData, SignupFormData } from '@/lib/authSchemas'
import { validateAccessPassword } from '@/lib/validateAccessPassword'

interface UseAuthOptions {
  isSignup: boolean
  returnUrl: string | null
}

/**
 * Sanitizes error messages to prevent information leakage.
 * Logs detailed errors for debugging while showing generic user-friendly messages.
 * 
 * @param error - The error object or message to sanitize
 * @param context - Context about where the error occurred (for logging)
 * @returns A user-friendly error message
 */
function sanitizeErrorMessage(error: unknown, context: 'signup' | 'login'): string {
  // Log the detailed error for debugging (in production, this should go to a logging service)
  console.error(`[${context.toUpperCase()}] Detailed error:`, error)
  
  // Extract error message
  let errorMessage = ''
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = String(error.message)
  } else {
    errorMessage = String(error)
  }
  
  const lowerMessage = errorMessage.toLowerCase()
  
  // Map known Supabase/auth errors to user-friendly messages
  if (lowerMessage.includes('invalid login credentials') || 
      lowerMessage.includes('invalid credentials') ||
      lowerMessage.includes('invalid email or password')) {
    return 'Invalid email or password. Please check your credentials and try again.'
  }
  
  if (lowerMessage.includes('email not confirmed') ||
      lowerMessage.includes('email confirmation') ||
      lowerMessage.includes('confirm your email')) {
    return 'Please check your email and confirm your account before signing in.'
  }
  
  if (lowerMessage.includes('user already registered') ||
      lowerMessage.includes('already registered') ||
      lowerMessage.includes('user exists')) {
    return 'An account with this email already exists. Please sign in instead.'
  }
  
  if (lowerMessage.includes('password') && lowerMessage.includes('weak')) {
    return 'Password is too weak. Please choose a stronger password.'
  }
  
  if (lowerMessage.includes('rate limit') ||
      lowerMessage.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.'
  }
  
  if (lowerMessage.includes('network') ||
      lowerMessage.includes('fetch') ||
      lowerMessage.includes('connection')) {
    return 'Network error. Please check your connection and try again.'
  }
  
  // For any unknown errors, return a generic message
  // This prevents leaking implementation details, API structure, or internal error codes
  return `An error occurred during ${context}. Please try again. If the problem persists, contact support.`
}

interface UseAuthReturn {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  setConfirmPassword: (password: string) => void
  accessPassword: string
  setAccessPassword: (password: string) => void
  loading: boolean
  error: string | null
  handleSubmit: (e: React.FormEvent) => Promise<void>
  clearErrors: () => void
}

export function useAuth({ isSignup, returnUrl }: UseAuthOptions): UseAuthReturn {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accessPassword, setAccessPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const clearErrors = () => {
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignup) {
        // Validate signup form data with Zod schema
        const formData = { email, password, confirmPassword, accessPassword }
        const validationResult = signupSchema.safeParse(formData)

        if (!validationResult.success) {
          // Get the first error message from Zod
          const firstError = validationResult.error.errors[0]
          setError(firstError.message)
          setLoading(false)
          return
        }

        // At this point, validation passed, so we can safely use the validated data
        const validatedData: SignupFormData = validationResult.data
        
        // Validate access password against environment variable
        const accessPasswordValidation = await validateAccessPassword(validatedData.accessPassword)
        
        if (!accessPasswordValidation.isValid) {
          setError(accessPasswordValidation.error || 'Invalid access password. Please contact project owner.')
          setLoading(false)
          return
        }
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: validatedData.email,
          password: validatedData.password,
        })

        if (signUpError) {
          const sanitizedError = sanitizeErrorMessage(signUpError, 'signup')
          setError(sanitizedError)
          setLoading(false)
          return
        }

        // If there's a session, user is automatically logged in (email confirmation disabled)
        // If no session, user needs to confirm email first
        if (data.user) {
          if (data.session) {
            // Auto-logged in
            const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/mood-tracker'
            router.push(redirectUrl)
            router.refresh()
          } else {
            // Email confirmation required
            setError('Please check your email to confirm your account or sign in if you already have an account.')
          }
        }
      } else {
        // Validate login form data with Zod schema
        const formData = { email, password, accessPassword }
        const validationResult = loginSchema.safeParse(formData)

        if (!validationResult.success) {
          // Get the first error message from Zod
          const firstError = validationResult.error.errors[0]
          setError(firstError.message)
          setLoading(false)
          return
        }

        // For login, validate access password first to prevent unnecessary API calls
        const validatedLoginData: LoginFormData = validationResult.data
        
        // Validate access password 
        const accessPasswordValidation = await validateAccessPassword(validatedLoginData.accessPassword)
        
        if (!accessPasswordValidation.isValid) {
          setError(accessPasswordValidation.error || 'Invalid access password.')
          setLoading(false)
          return
        }
        
        // Only proceed with API login if access password is valid
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: validatedLoginData.email,
          password: validatedLoginData.password,
        })

        if (signInError) {
          const sanitizedError = sanitizeErrorMessage(signInError, 'login')
          setError(sanitizedError)
          setLoading(false)
          return
        }

        if (data.session) {
          const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/mood-tracker'
          router.push(redirectUrl)
          router.refresh()
        } else {
          setError('No session created. Please try again.')
        }
      }
    } catch (err) {
      // Sanitize all errors before showing to users
      const sanitizedError = sanitizeErrorMessage(err, isSignup ? 'signup' : 'login')
      setError(sanitizedError)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    accessPassword,
    setAccessPassword,
    loading,
    error,
    handleSubmit,
    clearErrors
  }
}

