'use client'

import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

const formStyles = tv({
  slots: {
    container: 'mx-auto max-w-2xl',
    header: 'mb-8',
    title: 'text-4xl font-block text-secondary mb-2',
    subtitle: 'text-gray-400',
    form: 'space-y-6 rounded-lg bg-white/5 p-8 backdrop-blur-sm',
    inputGroup: 'space-y-2',
    label: 'block text-sm font-semibold text-white',
    colorInputWrapper: 'flex items-center gap-4',
    colorInput:
      'h-16 w-16 rounded-lg border-2 border-white/20 cursor-pointer bg-white/10',
    colorValue: 'flex-1 rounded-lg bg-white/10 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-secondary',
    textarea:
      'w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary min-h-[120px]',
    buttonGroup: 'flex gap-4',
    submitButton:
      'flex-1 rounded-lg bg-secondary px-6 py-3 font-semibold text-off-black transition-colors hover:bg-secondary/80 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:active:bg-gray-500',
    cancelButton:
      'flex-1 rounded-lg bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20 disabled:bg-gray-500/50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-500/50 disabled:active:bg-gray-500/50',
    error: 'rounded-lg bg-red-500/20 p-3 text-sm text-red-300',
    success: 'rounded-lg bg-green-500/20 p-3 text-sm text-green-300',
  },
})

export default function NewMoodEntryPage() {
  const [moodColour, setMoodColour] = useState('#3f5ab9')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const styles = formStyles()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Validate hex color
    const hexRegex = /^#[0-9A-Fa-f]{6}$/
    if (!hexRegex.test(moodColour)) {
      setError('Please enter a valid hex color code (e.g., #3f5ab9)')
      setLoading(false)
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        // should never happen as login would take over.
        throw new Error('You must be logged in to create a mood entry')
      }

      const { error: insertError } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood_colour: moodColour,
          notes: notes.trim() || null,
        })

      if (insertError) throw insertError

      setSuccess(true)
      setTimeout(() => {
        router.push('/mood-tracker')
        router.refresh()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mood entry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container()}>
      <div className={styles.header()}>
        <h1 className={styles.title()}>New Mood Entry</h1>
        <p className={styles.subtitle()}>How are you feeling today?</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form()}>
        {error && <div className={styles.error()}>{error}</div>}
        {success && (
          <div className={styles.success()}>
            Entry created successfully! Redirecting...
          </div>
        )}

        <div className={styles.inputGroup()}>
          <label htmlFor="mood_colour" className={styles.label()}>
            Mood Color
          </label>
          <div className={styles.colorInputWrapper()}>
            <input
              type="color"
              id="mood_colour"
              value={moodColour}
              onChange={(e) => setMoodColour(e.target.value)}
              className={styles.colorInput()}
              disabled={loading}
            />
            <input
              type="text"
              value={moodColour}
              onChange={(e) => setMoodColour(e.target.value)}
              placeholder="#3f5ab9"
              className={styles.colorValue()}
              pattern="^#[0-9A-Fa-f]{6}$"
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.inputGroup()}>
          <label htmlFor="notes" className={styles.label()}>
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind?"
            className={styles.textarea()}
            disabled={loading}
          />
        </div>

        <div className={styles.buttonGroup()}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancelButton()}
            disabled={loading || success}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton()}
            disabled={loading || success}
          >
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </form>
    </div>
  )
}

