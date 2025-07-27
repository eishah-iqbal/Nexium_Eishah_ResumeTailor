import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();

    const response = await fetch(process.env.N8N_RESUME_TAILOR_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription })
    });

    // Try parsing JSON safely
    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    const err = error as Error;
    console.error('API Error:', err.message || err);
    return NextResponse.json(
      { error: 'Failed to send to n8n', details: err.message || err },
      { status: 500 }
    );
  }
}