import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()

  const { event } = await request.json()

  console.log('Auth callback event:', event)

  return NextResponse.json({ success: true })
}