'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`Magic link sent to ${email}. Please check your email!`)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-white"
      style={{
        backgroundColor: '#0a0a12',
        backgroundImage: `
          radial-gradient(circle at 100% 0%, rgba(138, 43, 226, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 0% 100%, rgba(138, 43, 226, 0.15) 0%, transparent 40%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
       <header className="absolute top-4 left-4 text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(138,43,226,0.7)]">
        CV Crafter
      </header>

      <Link href="/signup">
        <Button
          variant="default"
          className="absolute top-4 right-4 px-6 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
        >
          Signup
        </Button>
      </Link>


      <Card className="w-full max-w-lg border border-violet-600 rounded-2xl bg-[rgba(137,43,226,0.1)] backdrop-blur-xl shadow-[0_0_20px_rgba(138,43,226,0.5)] ring-1 ring-violet-500">
        <CardContent className="p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
              <label className="block text-sm font-medium text-white mb-3">
                Enter your email:
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
              className="mx-auto mt-4 px-10 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
            >
              Get Magic Link
            </Button>
            </div>
        </form>
       </CardContent>
      </Card>

      <footer className="absolute bottom-4 text-gray-400 text-xs">
        © 2025 CV Crafter
      </footer>
    </div>
  )
}
