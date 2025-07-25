'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function DashboardPage() {
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const setupProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      const userId = user?.id
      if (!userId) return
      setUserId(userId)

      // 1. Try user_metadata
      const metadataName = user.user_metadata?.full_name
      if (metadataName) setUserName(metadataName)

      // 2. Try localStorage fallback
      const localName = localStorage.getItem('pendingFullName')
      const localEmail = localStorage.getItem('pendingEmail')

      // 3. Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (!existingProfile && !fetchError) {
        const { error: insertError } = await supabase.from('profiles').insert({
          id: userId,
          full_name: localName || metadataName || '',
          email: localEmail || '',
        })

        if (!insertError) {
          localStorage.removeItem('pendingFullName')
          localStorage.removeItem('pendingEmail')
        }
      }

      // 4. Last resort: get full name from DB
      if (!metadataName && !localName) {
        const { data: dbData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', userId)
          .single()
        if (dbData) setUserName(dbData.full_name)
      }
    }

    setupProfile()
  }, [])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !userId) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', userId)

    try {
      const res = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        router.push('/tailor')
      } else {
        const data = await res.json()
        alert(`Upload failed: ${data.error}`)
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Something went wrong during upload.')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 text-white pt-20"
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

      <h1 className="text-2xl font-semibold mb-2 mt-8 drop-shadow-[0_0_6px_rgba(138,43,226,0.7)]">
        Welcome <span className="italic">{userName || 'there'}</span>!
      </h1>

      <div className="text-center max-w-5/6 text-white text-lg p-4 my-4">
        <p>
          <strong>CV Crafter</strong> helps job seekers create and personalize
          resumes that match specific job descriptions. You can either start
          fresh or upload an existing resume and tailor it automatically using AI.
        </p>
        <p> Get job-ready, faster. </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-12 w-full max-w-5xl mt-15">
        <div className="text-center flex-1">
          <p className="mb-2 text-accent">Create new resume:</p>
          <Link href="/editor">
            <Button className="mx-auto mt-4 px-20 bg-violet-900 hover:bg-violet-700 text-white shadow-md">
              Create Resume
            </Button>
          </Link>
        </div>

        <div className="text-center flex-1">
          <p className="mb-2 text-accent">Tailor your resume:</p>
          <Button
            onClick={handleUploadClick}
            className="mx-auto mt-4 px-20 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
          >
            Upload Resume
          </Button>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>

      <footer className="absolute bottom-4 text-gray-400 text-xs">
        © 2025 CV Crafter
      </footer>
    </div>
  )
}