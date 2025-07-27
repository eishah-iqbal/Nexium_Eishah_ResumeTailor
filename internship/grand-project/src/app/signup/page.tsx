'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import supabase from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isEmailValid = /\S+@\S+\.\S+/.test(email)
    if (!isEmailValid) {
      toast.error('Please enter a valid email address.')
      return
    }

    localStorage.setItem('pendingFullName', name)
    localStorage.setItem('pendingEmail', email)


    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { full_name: name },
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success(`Magic link sent to ${email}. Please check your inbox!`)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col px-4 text-white"
      style={{
        backgroundColor: '#0a0a12',
        backgroundImage: `
          radial-gradient(circle at 100% 0%, rgba(138, 43, 226, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 0% 100%, rgba(138, 43, 226, 0.15) 0%, transparent 40%)
        `,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header */}
      <header className="absolute top-4 left-4 text-2xl sm:text-3xl font-sans font-bold text-white drop-shadow-[0_0_6px_rgba(138,43,226,0.7)]">
        CV Crafter
      </header>

      {/* Login Button */}
      <Link href="/login">
        <Button
          variant="default"
          className="absolute top-4 right-4 px-6 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
        >
          Login
        </Button>
      </Link>

      <div className="flex-grow flex items-center justify-center">
      <Card className="w-full max-w-lg border border-violet-600 rounded-2xl bg-[rgba(137,43,226,0.1)] backdrop-blur-xl shadow-[0_0_20px_rgba(138,43,226,0.5)] ring-1 ring-violet-500">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Name:
              </label>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-transparent border border-violet-500 focus:ring-violet-400 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email:
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border border-violet-500 focus:ring-violet-400 text-white"
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="mx-auto mt-4 px-6 sm:px-10 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
              >
                Get Magic Link
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>

      {/* Footer */}
      <footer className="text-gray-400 text-xs text-center py-6">
        © 2025 CV Crafter
      </footer>
    </div>
  )
}