'use client'

import { useState } from 'react'
import { useAuthActions } from './useAuthActions'

interface UseLoginFormOptions {
  isSignup: boolean
  returnUrl: string | null
}

interface UseLoginFormReturn {
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

export function useLoginForm({ isSignup, returnUrl }: UseLoginFormOptions): UseLoginFormReturn {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accessPassword, setAccessPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login, signup } = useAuthActions(returnUrl)

  const clearErrors = () => {
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignup) {
        const result = await signup(email, password, confirmPassword, accessPassword)
        if (!result.success) {
          setError(result.error)
        }
      } else {
        const result = await login(email, password, accessPassword)
        if (!result.success) {
          setError(result.error)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
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

