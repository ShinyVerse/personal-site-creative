'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { loginSchema, signupSchema } from '@/lib/authSchemas'
import { validateAccessPassword } from '@/lib/validateAccessPassword'

interface UseAuthOptions {
  isSignup: boolean
  returnUrl: string | null
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
  success: boolean
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
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const clearErrors = () => {
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Validate form data with Zod schema
    const schema = isSignup ? signupSchema : loginSchema
    const formData = isSignup
      ? { email, password, confirmPassword, accessPassword }
      : { email, password, accessPassword }

    const validationResult = schema.safeParse(formData)

    if (!validationResult.success) {
      // Get the first error message from Zod
      const firstError = validationResult.error.errors[0]
      setError(firstError.message)
      setLoading(false)
      return
    }

    try {
      if (isSignup) {
        // At this point, validation passed, so we can safely use the validated data
        const validatedData = validationResult.data as { email: string; password: string; confirmPassword: string; accessPassword: string }
        
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

        if (signUpError) throw signUpError

        // If there's a session, user is automatically logged in (email confirmation disabled)
        // If no session, user needs to confirm email first
        if (data.user) {
          if (data.session) {
            // Auto-logged in
            setSuccess(true)
            setTimeout(() => {
              const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/mood-tracker'
              router.push(redirectUrl)
              router.refresh()
            }, 1000)
          } else {
            // Email confirmation required
            setError('Please check your email to confirm your account or sign in if you already have an account.')
          }
        }
      } else {
        // For login, validate access password first to prevent unnecessary API calls
        const validatedLoginData = validationResult.data as { email: string; password: string; accessPassword: string }
        
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
          // Extract error message if there is one
          const errorMessage = signInError.message || signInError.toString() || 'An error occurred during login'
          
          // Provide more helpful error messages
          if (errorMessage.toLowerCase().includes('invalid login credentials') || 
              errorMessage.toLowerCase().includes('invalid credentials')) {
            throw new Error('Invalid email or password. Please check your credentials and try again.')
          } else if (errorMessage.toLowerCase().includes('email not confirmed') ||
                     errorMessage.toLowerCase().includes('email confirmation')) {
            throw new Error('Please check your email and confirm your account before signing in.')
          } else {
            // Use the actual error message from Supabase, or a generic one
            throw new Error(errorMessage)
          }
        }

        if (data.session) {
          setSuccess(true)
          setTimeout(() => {
            const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/mood-tracker'
            router.push(redirectUrl)
            router.refresh()
          }, 1000)
        } else {
          throw new Error('No session created. Please try again.')
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `An error occurred during ${isSignup ? 'sign up' : 'login'}`
      )
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
    success,
    handleSubmit,
    clearErrors
  }
}

