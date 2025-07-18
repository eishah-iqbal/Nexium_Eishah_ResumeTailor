import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const resume = await req.json();
    console.log('Incoming resume:', resume);

    const response = await fetch('https://eishah-malik.app.n8n.cloud/webhook/resume-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume),
    });

    const rawText = await response.text();
    console.log('n8n Raw Response:', rawText);

    return NextResponse.json({ message: 'Sent to n8n', result: rawText });
  } catch (error: any) {
    console.error('API Error:', error.message || error);
    return NextResponse.json({ error: 'Failed to send to n8n', details: error.message || error }, { status: 500 });
  }
}