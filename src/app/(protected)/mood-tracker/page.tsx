'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/app/contexts/AuthContext'
import MoodDashboard from './components/MoodDashboard'
import type { MoodEntry } from '@/lib/moodSchemas'

export default function MoodTrackerPage() {
  const { user } = useAuth()
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      const { data: moodEntries, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .returns<MoodEntry[]>()

      if (error) {
        console.error('Error fetching mood entries:', error)
      } else {
        setEntries(moodEntries || [])
      }

      setLoading(false)
    }

    fetchData()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchData()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-off-black p-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-off-black p-8">
      <MoodDashboard entries={entries} userId={user?.id || ''} />
    </div>
  )
}

