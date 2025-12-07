'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { loginSchema, signupSchema } from '@/lib/authSchemas'
import type { LoginFormData, SignupFormData } from '@/lib/authSchemas'
import { validateAccessPassword } from '@/lib/validateAccessPassword'

/**
 * Sanitizes error messages to prevent information leakage.
 * Only logs detailed errors in development mode to prevent exposing sensitive information in production.
 * 
 * @param error - The error object or message to sanitize
 * @param context - Context about where the error occurred (for logging)
 * @returns A user-friendly error message
 */
function sanitizeErrorMessage(error: unknown, context: 'signup' | 'login'): string {
  // Only log detailed errors in development mode to prevent information leakage in production
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context.toUpperCase()}] Detailed error:`, error)
  }
  
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

interface UseAuthActionsReturn {
  login: (email: string, password: string, accessPassword: string) => Promise<{ success: boolean; error: string | null }>
  signup: (email: string, password: string, confirmPassword: string, accessPassword: string) => Promise<{ success: boolean; error: string | null }>
}

export function useAuthActions(returnUrl: string | null = null): UseAuthActionsReturn {
  const router = useRouter()

  const login = async (
    email: string,
    password: string,
    accessPassword: string
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      // Validate login form data with Zod schema
      const formData = { email, password, accessPassword }
      const validationResult = loginSchema.safeParse(formData)

      if (!validationResult.success) {
        // Get the first error message from Zod
        const firstError = validationResult.error.errors[0]
        return { success: false, error: firstError.message }
      }

      // For login, validate access password first to prevent unnecessary API calls
      const validatedLoginData: LoginFormData = validationResult.data
      
      // Validate access password 
      const accessPasswordValidation = await validateAccessPassword(validatedLoginData.accessPassword)
      
      if (!accessPasswordValidation.isValid) {
        return { 
          success: false, 
          error: accessPasswordValidation.error || 'Invalid access password.' 
        }
      }
      
      // Only proceed with API login if access password is valid
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: validatedLoginData.email,
        password: validatedLoginData.password,
      })

      if (signInError) {
        const sanitizedError = sanitizeErrorMessage(signInError, 'login')
        return { success: false, error: sanitizedError }
      }

      if (data.session) {
        const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/mood-tracker'
        router.push(redirectUrl)
        router.refresh()
        return { success: true, error: null }
      } else {
        return { success: false, error: 'No session created. Please try again.' }
      }
    } catch (err) {
      // Sanitize all errors before showing to users
      const sanitizedError = sanitizeErrorMessage(err, 'login')
      return { success: false, error: sanitizedError }
    }
  }

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string,
    accessPassword: string
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      // Validate signup form data with Zod schema
      const formData = { email, password, confirmPassword, accessPassword }
      const validationResult = signupSchema.safeParse(formData)

      if (!validationResult.success) {
        // Get the first error message from Zod
        const firstError = validationResult.error.errors[0]
        return { success: false, error: firstError.message }
      }

      // At this point, validation passed, so we can safely use the validated data
      const validatedData: SignupFormData = validationResult.data
      
      // Validate access password against environment variable
      const accessPasswordValidation = await validateAccessPassword(validatedData.accessPassword)
      
      if (!accessPasswordValidation.isValid) {
        return { 
          success: false, 
          error: accessPasswordValidation.error || 'Invalid access password. Please contact project owner.' 
        }
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
      })

      if (signUpError) {
        const sanitizedError = sanitizeErrorMessage(signUpError, 'signup')
        return { success: false, error: sanitizedError }
      }

      // If there's a session, user is automatically logged in (email confirmation disabled)
      // If no session, user needs to confirm email first
      if (data.user) {
        if (data.session) {
          // Auto-logged in
          const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : '/mood-tracker'
          router.push(redirectUrl)
          router.refresh()
          return { success: true, error: null }
        } else {
          // Email confirmation required
          return { 
            success: false, 
            error: 'Please check your email to confirm your account or sign in if you already have an account.' 
          }
        }
      }

      return { success: false, error: 'An unexpected error occurred during signup.' }
    } catch (err) {
      // Sanitize all errors before showing to users
      const sanitizedError = sanitizeErrorMessage(err, 'signup')
      return { success: false, error: sanitizedError }
    }
  }

  return { login, signup }
}

