'use client'

import { useEffect } from 'react'
import supabase from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthListener() {
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // ✅ Send session to server to sync cookies
      await fetch('/api/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event, session }),
      })

      if (event === 'SIGNED_IN' && session?.user) {
        const user = session.user
        const full_name = user.user_metadata.full_name || localStorage.getItem('pendingFullName') || ''
        const email = user.email || localStorage.getItem('pendingEmail') || ''
        const user_id = user.id

        const { error } = await supabase
          .from('profiles')
          .insert({ id: user_id, full_name, email })
          .select()

        if (error && error.code !== '23505') {
          console.error('Insert error:', error.message)
        }

        localStorage.removeItem('pendingFullName')
        localStorage.removeItem('pendingEmail')

        router.push('/dashboard')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return null
}