"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function ResumeTailorPage() {
  const router = useRouter()
  const [instruction, setInstruction] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [error, setError] = useState("")


  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch("/api/get-resume",{
          credentials: "include",
        })
        const data = await res.json()
        console.log('Get-resume response:', data)

        if (res.ok) {
            console.log('Setting resumeText to:', data.resumeText) 
          setResumeText(data.resumeText)
        } else {
          toast.error(data.message || "Could not fetch resume")
        }
      } catch (err) {
        console.error(err)
        toast.error("Failed to fetch resume")
      }
    }

    fetchResume()
  }, [])

  const handleTailorResume = async () => {
    if (!instruction.trim()) {
      toast.error("Please describe what changes you want.")
      return
    }

    toast.loading("Tailoring your resume...")

    try {
      const res = await fetch("/api/tailor-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          instruction,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Resume tailored!")
        localStorage.setItem("resumeText", data.resume)
        router.push("/resume")
      } else {
        toast.error(data.message || "Something went wrong.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to tailor resume.")
    }
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
      <header className="absolute top-4 left-4 text-2xl sm:text-3xl font-sans font-bold text-white drop-shadow-[0_0_6px_rgba(138,43,226,0.7)]">
        CV Crafter
      </header>

      <main className="flex flex-col items-center flex-1 justify-center w-full px-4">
        <div className="w-full max-w-xl space-y-4">
          <Label htmlFor="instruction" className="text-base sm:text-lg">
            Describe the changes you'd like to make:
          </Label>
          <Textarea
            id="instruction"
            placeholder="e.g. Tailor this for a React Frontend Developer role..."
            className="w-full min-h-[160px] bg-transparent border border-violet-500 focus:ring-violet-400 text-white"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <Button
              className="w-full sm:w-auto mt-4 px-6 sm:px-14 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
              onClick={handleTailorResume}
            >
              Tailor Resume
            </Button>
          </div>
        </div>
      </main>

      <footer className="mb-5 text-gray-400 text-xs text-center">
        © 2025 CV Crafter
      </footer>
    </div>
  )
}