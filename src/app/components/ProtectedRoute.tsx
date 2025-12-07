'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login with return query parameter
      const returnUrl = encodeURIComponent(pathname)
      console.log(pathname, returnUrl);

      router.push(`/auth/login?return=${returnUrl}`)
    }
  }, [user, loading, router, pathname])

  // Show nothing while checking auth or redirecting
  if (loading || !user) {
    return null
  }

  return <>{children}</>
}

