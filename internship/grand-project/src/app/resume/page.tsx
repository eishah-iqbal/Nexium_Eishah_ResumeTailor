"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import jsPDF from "jspdf"
import Link from 'next/link'

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("resumeText")
    if (stored) {
      setResumeText(stored)
    } else {
      toast.error("No resume found. Please generate one first.")
    }
  }, [])

  const handleDownload = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  })

  const margin = 40
  const lineHeight = 18
  const pageHeight = doc.internal.pageSize.height
  const maxLineWidth = 520

  const lines = doc.splitTextToSize(resumeText, maxLineWidth)

  let y = margin

  doc.setFont("Helvetica", "normal")
  doc.setFontSize(12)

  lines.forEach((line: string) => {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage()
      y = margin
    }

    doc.text(line, margin, y)
    y += lineHeight
  })

  doc.save("resume.pdf")
  toast.success("PDF downloaded!")
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
        backgroundAttachment: 'fixed'
      }}
    >
      <header className="mt-4 mb-4 ml-4 text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(138,43,226,0.7)]">
        CV Crafter
      </header>

      <Link href="/signup">
        <Button
          variant="default"
          className="absolute top-4 right-4 px-6 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
        >
          Logout
        </Button>
      </Link>


      <div className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <Card className="w-full max-w-3xl min-h-[400px] shadow-md mb-6 bg-[rgba(137,43,226,0.1)] border border-violet-600 overflow-auto">
          <CardContent className="p-6 text-sm whitespace-pre-wrap text-white">
            {resumeText || "Loading your resume..."}
          </CardContent>
        </Card>

        <Button 
          onClick={handleDownload}
          className="mx-auto mt-4 mb-4 px-14 bg-violet-900 hover:bg-violet-700 text-white shadow-md"
        >
          Download as PDF
        </Button>
      </div>

      <footer className="mt-auto mb-4 text-center text-gray-400 text-xs">
        © 2025 CV Crafter
      </footer>
    </div>
  )
}