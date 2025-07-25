import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongo"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export async function GET() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error || !session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  try {
    const client = await clientPromise
    const db = client.db("resume_tailor")
    const collection = db.collection("resumes")

    const latest = await collection.findOne({ userId }, { sort: { createdAt: -1 } })

    if (!latest) {
      return NextResponse.json({ message: "No resume found" }, { status: 404 })
    }

    return NextResponse.json({ resumeText: latest.text })
  } catch (err) {
    console.error("Resume fetch error:", err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
