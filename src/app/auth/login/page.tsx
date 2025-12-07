'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { tv } from 'tailwind-variants'
import Link from 'next/link'
import { useLoginForm } from '@/app/hooks/useLoginForm'
import { login, signup } from './login.constants'

const authStyles = tv({
  slots: {
    container:
      'flex min-h-screen flex-col items-center justify-center bg-off-black p-8',
    card: 'w-full max-w-md rounded-lg bg-white/5 p-8 shadow-lg backdrop-blur-sm',
    title: 'text-3xl font-block text-secondary mb-2 text-center',
    subtitle: 'text-gray-400 mb-4 text-center',
    error: 'text-sm text-red-400 mb-4 text-center',
    form: 'space-y-6',
    inputGroup: 'space-y-2',
    label: 'block text-sm font-semibold text-white',
    input:
      'w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary',
    button:
      'w-full rounded-lg bg-secondary px-4 py-3 font-semibold text-off-black transition-colors hover:bg-secondary/80 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:active:bg-gray-500',
    link: 'mt-4 text-center text-sm text-gray-400',
    linkText: 'text-secondary hover:underline',
  },
})

export default function LoginPage() {
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('return')
  const isSignup = searchParams.get('mode') === 'signup'

  const auth = useLoginForm({ isSignup, returnUrl })
  const styles = authStyles()

  const constants = useMemo(() => (isSignup ? signup : login), [isSignup])

  const buttonText = auth.loading ? constants.loadingButtonText : constants.buttonText
  const alternateHref = useMemo(() => {
    const params = new URLSearchParams()
    if (!isSignup) params.set('mode', 'signup')
    if (returnUrl) params.set('return', returnUrl)
    const queryString = params.toString()
    return `/auth/login${queryString ? `?${queryString}` : ''}`
  }, [isSignup, returnUrl])

  return (
    <div className={styles.container()}>
      <div className={styles.card()}>
        <h1 className={styles.title()}>{constants.title}</h1>
        <p className={styles.subtitle()}>{constants.subtitle}</p>
        {auth.error && <div className={styles.error()}>{auth.error}</div>}

        <form onSubmit={auth.handleSubmit} className={styles.form()}>

          <div className={styles.inputGroup()}>
            <label htmlFor="email" className={styles.label()}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={auth.email}
              onChange={(e) => auth.setEmail(e.target.value)}
              placeholder="you@example.com"
              className={styles.input()}
              disabled={auth.loading}
            />
          </div>

          <div className={styles.inputGroup()}>
            <label htmlFor="password" className={styles.label()}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={auth.password}
              onChange={(e) => auth.setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.input()}
              disabled={auth.loading}
            />
          </div>

  

          {isSignup && (
            <div className={styles.inputGroup()}>
              <label htmlFor="confirmPassword" className={styles.label()}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={auth.confirmPassword}
                onChange={(e) => auth.setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input()}
                disabled={auth.loading}
              />
            </div>
          )}

          <div className={styles.inputGroup()}>
            <label htmlFor="accessPassword" className={styles.label()}>
              Access Password
            </label>
            <input
              id="accessPassword"
              type="password"
              value={auth.accessPassword}
              onChange={(e) => auth.setAccessPassword(e.target.value)}
              placeholder="Enter access password"
              className={styles.input()}
              disabled={auth.loading}
            />
          </div>

          <button
            type="submit"
            className={styles.button()}
            disabled={auth.loading}
          >
            {buttonText}
          </button>
        </form>

        <div className={styles.link()}>
          {constants.alternateText}{' '}
          <Link
            href={alternateHref}
            className={styles.linkText()}
            onClick={() => auth.clearErrors()}
            style={{
              pointerEvents: auth.loading ? 'none' : 'auto',
              opacity: auth.loading ? 0.5 : 1,
            }}
          >
            {constants.alternateLinkText}
          </Link>
        </div>
      </div>
    </div>
  )
}

