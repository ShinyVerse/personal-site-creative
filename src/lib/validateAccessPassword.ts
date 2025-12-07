'use server'

/**
 * Validates the access password against the SECRET_ACCESS_PASSWORD environment variable.
 * This is used to restrict sign-up access.
 */
export async function validateAccessPassword(accessPassword: string): Promise<{
  isValid: boolean
  error?: string
}> {
  const secretAccessPassword = process.env.SECRET_ACCESS_PASSWORD

  if (!secretAccessPassword) {
    // If the env var is not set, we should log this but allow signups for development
    // In production, you might want to block signups if the env var is missing
    console.warn('SECRET_ACCESS_PASSWORD environment variable is not set')
    return {
      isValid: false,
      error: 'Access password validation is not configured. Please contact administrator.',
    }
  }

  if (accessPassword !== secretAccessPassword) {
    return {
      isValid: false,
      error: 'Invalid access password.',
    }
  }

  return {
    isValid: true,
  }
}

