"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {toast} from 'sonner'

export default function ResumePage() {
  const handleDownload = () => {
    // TODO: Replace this with actual PDF logic
    const dummyPdfUrl = "/sample-resume.pdf"
    const link = document.createElement("a")
    link.href = dummyPdfUrl
    link.download = "resume.pdf"
    link.click()

    toast.success("Resume downloaded successfully!")
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

      {/* Resume Preview */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <Card className="w-[300px] h-[400px] shadow-md mb-6">
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-600">Your Resume</p>
          </CardContent>
        </Card>

        {/* Download Button */}
        <Button onClick={handleDownload} className="mx-auto mt-4 px-14 bg-violet-900 hover:bg-violet-700 text-white shadow-md">
          Download Resume
        </Button>
      </div>

     {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-xs">
        © 2025 CV Crafter
      </footer>
    </div>
  )
}