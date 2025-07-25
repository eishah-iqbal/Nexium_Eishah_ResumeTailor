import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongo'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const userId = formData.get('userId') as string

  if (!file || !userId) {
    return NextResponse.json({ error: 'Missing file or user ID' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const client = await clientPromise

  const db = client.db('resume_tailor')
  const resumes = db.collection('resumes')

  await resumes.insertOne({
    userId,
    filename: file.name,
    content: buffer,
    uploadedAt: new Date(),
  })

  return NextResponse.json({ message: 'Resume uploaded successfully' })
}