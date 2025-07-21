import { NextRequest, NextResponse } from 'next/server';
import { createAppointment, getAvailableSlots } from '@/lib/calendar';
import { validatePatientData, sanitizePatientData, maskSensitiveData } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'create') {
      // Sanitize the appointment data
      const sanitizedData = sanitizePatientData(data);
      
      // Validate the data
      const validation = validatePatientData(sanitizedData);
      if (!validation.isValid) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid appointment data',
            details: validation.errors 
          },
          { status: 400 }
        );
      }

      // Create the appointment
      const result = await createAppointment(sanitizedData);
      
      if (result.success) {
        // Log the appointment creation (with masked data for privacy)
        console.log('Appointment created:', maskSensitiveData(sanitizedData));
        
        return NextResponse.json({
          success: true,
          appointmentId: result.eventId,
          message: 'Appointment booked successfully!',
          startTime: result.startTime,
          endTime: result.endTime
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
    }

    if (action === 'getSlots') {
      const { date } = data;
      const requestedDate = date ? new Date(date) : new Date();
      
      const slots = await getAvailableSlots(requestedDate);
      
      return NextResponse.json({
        success: true,
        slots,
        date: requestedDate.toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Appointments API error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process appointment request',
        message: 'Please call our office at (555) 123-4567 for immediate assistance.'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    const requestedDate = date ? new Date(date) : new Date();
    const slots = await getAvailableSlots(requestedDate);
    
    return NextResponse.json({
      success: true,
      slots,
      date: requestedDate.toISOString()
    });

  } catch (error) {
    console.error('Get slots error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch available slots'
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}