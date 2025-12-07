'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'
import type { MoodEntry } from '@/lib/moodSchemas'
import { tv } from 'tailwind-variants'

const dashboardStyles = tv({
  slots: {
    container: 'mx-auto max-w-4xl',
    header: 'mb-8 flex items-center justify-between',
    title: 'text-4xl font-block text-secondary',
    button:
      'rounded-lg bg-secondary px-6 py-3 font-semibold text-off-black transition-colors hover:bg-secondary/80',
    entriesGrid: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3',
    entryCard:
      'rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-transform hover:scale-105',
    entryHeader: 'mb-4 flex items-center justify-between',
    moodIndicator: 'h-8 w-8 rounded-full border-2 border-white/20',
    date: 'text-sm text-gray-400',
    notes: 'text-white',
    empty: 'col-span-full rounded-lg bg-white/5 p-12 text-center',
    emptyText: 'text-xl text-gray-400 mb-4',
    logoutButton:
      'mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300 transition-colors hover:bg-red-500/30',
  },
})

interface MoodDashboardProps {
  entries: MoodEntry[]
  userId: string
}

export default function MoodDashboard({ entries, userId }: MoodDashboardProps) {
  const router = useRouter()
  const { signOut } = useAuth()
  const styles = dashboardStyles()

  const handleLogout = async () => {
    await signOut()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={styles.container()}>
      <div className={styles.header()}>
        <h1 className={styles.title()}>Mood Tracker</h1>
        <Link href="/mood-tracker/new" className={styles.button()}>
          + New Entry
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className={styles.empty()}>
          <p className={styles.emptyText()}>No mood entries yet</p>
          <Link href="/mood-tracker/new" className={styles.button()}>
            Create your first entry
          </Link>
        </div>
      ) : (
        <div className={styles.entriesGrid()}>
          {entries.map((entry) => (
            <div key={entry.id} className={styles.entryCard()}>
              <div className={styles.entryHeader()}>
                <div
                  className={styles.moodIndicator()}
                  style={{ backgroundColor: entry.mood_colour }}
                  aria-label={`Mood color: ${entry.mood_colour}`}
                />
                <span className={styles.date()}>
                  {formatDate(entry.created_at)}
                </span>
              </div>
              {entry.notes && (
                <p className={styles.notes()}>{entry.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleLogout} className={styles.logoutButton()}>
        Logout
      </button>
    </div>
  )
}

