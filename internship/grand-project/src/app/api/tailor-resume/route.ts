import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import clientPromise from '@/lib/mongo'

export async function POST(req: NextRequest) {
  try {
    console.log('=== TAILOR RESUME REQUEST START ===')
    
    const { resumeText, instruction } = await req.json()
    console.log('Request data received:', { 
      resumeTextLength: resumeText?.length, 
      instructionLength: instruction?.length 
    })

    const supabase = await createSupabaseServerClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session?.user) {
      console.log('Auth error:', sessionError)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    console.log('User ID:', userId)

    // Send to n8n with better error handling
    console.log('Calling n8n webhook...')
    const n8nRes = await fetch('https://eishah-malik.app.n8n.cloud/webhook/tailor-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription: instruction })
    })

    console.log('n8n response status:', n8nRes.status)
    
    if (!n8nRes.ok) {
      const errorText = await n8nRes.text()
      console.error('n8n error response:', errorText)
      return NextResponse.json(
        { error: 'n8n webhook failed', details: errorText },
        { status: 500 }
      )
    }

    const n8nData = await n8nRes.json()
    console.log('n8n response data:', n8nData)

    // Check what structure n8n actually returns
    const tailoredResume = n8nData.tailoredResume || n8nData.result || n8nData.response || n8nData

    if (!tailoredResume) {
      console.error('No tailored resume in n8n response:', n8nData)
      return NextResponse.json(
        { error: 'No tailored resume received from AI agent' },
        { status: 500 }
      )
    }

    console.log('Tailored resume received, length:', tailoredResume.length)

    // Store tailored resume in MongoDB
    const client = await clientPromise
    const db = client.db('resume_tailor')
    const tailored = db.collection('tailored_resumes')

    const insertResult = await tailored.insertOne({
      userId,
      tailoredText: tailoredResume,
      createdAt: new Date(),
    })

    console.log('Stored in MongoDB with ID:', insertResult.insertedId)
    console.log('=== TAILOR RESUME REQUEST SUCCESS ===')

    return NextResponse.json({ resume: tailoredResume })

  } catch (error: any) {
    console.error('=== TAILOR RESUME ERROR ===')
    console.error('Error:', error.message || error)
    console.error('Stack:', error.stack)
    return NextResponse.json(
      { error: 'Failed to tailor resume', details: error.message || error },
      { status: 500 }
    )
  }
}