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

  } catch (error: any) {
    console.error('API Error:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to send to n8n', details: error.message || error },
      { status: 500 }
    );
  }
}