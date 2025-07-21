import { NextRequest, NextResponse } from 'next/server';
import { getChatResponse, detectIntent } from '@/lib/gemini';
import { validateChatMessage, sanitizeMessage, isEmergencyKeywords } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    // Validate the message
    const validation = validateChatMessage(message);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid message content', details: validation.errors },
        { status: 400 }
      );
    }

    // Sanitize the message
    const sanitizedMessage = sanitizeMessage(message);

    // Check for emergency keywords
    const isEmergency = isEmergencyKeywords(sanitizedMessage);

    // Get response from Gemini
    const response = await getChatResponse(sanitizedMessage, conversationHistory);

    // Detect intent for analytics/routing
    const intent = await detectIntent(sanitizedMessage);

    return NextResponse.json({
      response,
      intent,
      isEmergency,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: "I'm sorry, I'm having trouble connecting right now. Please call our office at (555) 123-4567 for immediate assistance."
      },
      { status: 500 }
    );
  }
}

// Handle CORS for development
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}