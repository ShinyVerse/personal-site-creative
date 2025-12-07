'use client'

import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthHandler() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check for email confirmation tokens in URL hash
      // Hash-based flows are used for email confirmation, password reset, etc.
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const type = hashParams.get('type')
      const error = hashParams.get('error')
      const errorDescription = hashParams.get('error_description')

      if (error) {
        console.error('Auth error:', error, errorDescription)
        // Clear error from URL
        window.history.replaceState({}, '', window.location.pathname)
        return
      }

      // Handle hash-based tokens (email confirmation, password reset, etc.)
      // Code-based flows (PKCE) are handled by the server-side route handler at /auth/callback
      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (!sessionError) {
          // Clear the hash from URL
          window.history.replaceState({}, '', window.location.pathname)
          router.refresh()

          // Redirect based on type
          if (type === 'signup' || type === 'email' || type === 'recovery') {
            router.push('/mood-tracker')
          }
        } else {
          console.error('Session error:', sessionError)
        }
      }
    }

    // Only run if there are hash-based auth tokens in the URL
    // Code-based flows are handled by the server-side route handler
    const hasHash = window.location.hash.includes('access_token') || window.location.hash.includes('refresh_token')
    const hasHashError = window.location.hash.includes('error=')

    if (hasHash || hasHashError) {
      handleAuthCallback()
    }
  }, [router])

  return null
}

