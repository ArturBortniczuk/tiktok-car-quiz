import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // TODO: Implement car analysis with OpenAI Vision
  return NextResponse.json({ 
    success: false, 
    error: 'Not implemented yet' 
  }, { status: 501 });
}
