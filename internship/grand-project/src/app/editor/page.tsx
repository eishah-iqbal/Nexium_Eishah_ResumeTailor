"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function ResumeEditorPage() {
  const router = useRouter()
  const [jobDescription, setJobDescription] = useState("")
  const [error, setError] = useState("")

  const handleGenerateResume = async () => {
  if (!jobDescription.trim()) {
    toast.error("Job description is required.")
    return
  }

  setError("")
  const toastId = toast.loading("Generating resume...")

  try {
    const res = await fetch("/api/send-to-n8n", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription }),
    })

    const data = await res.json()

    toast.dismiss(toastId)

    if (res.ok) {
      toast.success("Resume generated!")
      console.log("n8n response:", data)

      // Store response in localStorage or route with params
      localStorage.setItem("resumeText", data.resume)
      router.push("/resume")
    } else {
      toast.error(data.message || "Something went wrong.")
    }
  } catch (err) {
    console.error(err)
    toast.dismiss(toastId)
    toast.error("Failed to generate resume.")
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
          <Label htmlFor="job-description" className="text-base sm:text-lg">
            Job Description:
          </Label>
          <Textarea 
            id="job-description"
            placeholder="Enter the job description here..."
            className="w-full min-h-[160px] bg-transparent border border-violet-500 focus:ring-violet-400 text-white"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          {/* ✅ Error Text */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <Button 
              className="w-full sm:w-auto mt-4 px-6 sm:px-14 bg-violet-900 hover:bg-violet-700 text-white shadow-md" 
              onClick={handleGenerateResume}
            >
              Generate Resume
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
