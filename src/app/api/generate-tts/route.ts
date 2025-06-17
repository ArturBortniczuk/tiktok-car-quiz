import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // TODO: Implement text-to-speech with ElevenLabs
  return NextResponse.json({ 
    success: false, 
    error: 'Not implemented yet' 
  }, { status: 501 });
}
