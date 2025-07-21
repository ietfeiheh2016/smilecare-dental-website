import { google } from 'googleapis';

const calendar = google.calendar('v3');

export interface AppointmentData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  notes?: string;
  isNewPatient?: boolean;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

async function getAuthClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ]
    });
    
    return await auth.getClient();
  } catch (error) {
    console.error('Auth client error:', error);
    throw new Error('Failed to authenticate with Google Calendar');
  }
}

export async function getAvailableSlots(date: Date = new Date()): Promise<TimeSlot[]> {
  try {
    const authClient = await getAuthClient();
    
    const startTime = new Date(date);
    startTime.setHours(0, 0, 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(23, 59, 59, 999);
    
    const response = await calendar.events.list({
      auth: authClient,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });
    
    const busySlots = response.data.items || [];
    return generateAvailableSlots(busySlots, date);
  } catch (error) {
    console.error('Calendar API Error:', error);
    return getDefaultSlots(date);
  }
}

function generateAvailableSlots(busySlots: any[], date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dayOfWeek = date.getDay();
  
  // Skip Sundays (0)
  if (dayOfWeek === 0) {
    return slots;
  }
  
  // Define business hours
  let startHour, endHour;
  if (dayOfWeek === 6) { // Saturday
    startHour = 9;
    endHour = 14; // 2 PM
  } else { // Monday-Friday
    startHour = 8;
    endHour = 18; // 6 PM
  }
  
  // Generate 30-minute slots
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes of [0, 30]) {
      const slotStart = new Date(date);
      slotStart.setHours(hour, minutes, 0, 0);
      
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);
      
      // Skip lunch hour (12-1 PM on weekdays)
      if (dayOfWeek !== 6 && hour === 12 && minutes === 0) {
        continue;
      }
      if (dayOfWeek !== 6 && hour === 12 && minutes === 30) {
        continue;
      }
      
      const isAvailable = !busySlots.some(event => {
        const eventStart = new Date(event.start?.dateTime || event.start?.date);
        const eventEnd = new Date(event.end?.dateTime || event.end?.date);
        
        return (slotStart >= eventStart && slotStart < eventEnd) ||
               (slotEnd > eventStart && slotEnd <= eventEnd) ||
               (slotStart <= eventStart && slotEnd >= eventEnd);
      });
      
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        available: isAvailable
      });
    }
  }
  
  return slots;
}

function getDefaultSlots(date: Date): TimeSlot[] {
  // Fallback slots when API is unavailable
  const slots: TimeSlot[] = [];
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 0) return slots; // No Sunday slots
  
  const commonSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
  ];
  
  commonSlots.forEach(timeString => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hours, minutes, 0, 0);
    
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + 30);
    
    slots.push({
      start: slotStart.toISOString(),
      end: slotEnd.toISOString(),
      available: true // Default to available
    });
  });
  
  return slots;
}

export async function createAppointment(appointmentData: AppointmentData) {
  try {
    const authClient = await getAuthClient();
    
    const duration = appointmentData.isNewPatient ? 60 : 30; // New patients need more time
    
    const startDateTime = new Date(appointmentData.startTime);
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + duration);
    
    const event = {
      summary: `🦷 ${appointmentData.name} - ${appointmentData.service}`,
      description: `
Patient Information:
- Name: ${appointmentData.name}
- Phone: ${appointmentData.phone}
- Email: ${appointmentData.email}
- Service: ${appointmentData.service}
- New Patient: ${appointmentData.isNewPatient ? 'Yes' : 'No'}
- Notes: ${appointmentData.notes || 'None'}
- Booked via: AI Chatbot

Reminders:
- Call patient day before to confirm
- Prepare treatment room
- Review patient history if returning patient
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York'
      },
      attendees: [
        { 
          email: appointmentData.email,
          displayName: appointmentData.name,
          responseStatus: 'needsAction'
        }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 2 * 60 },  // 2 hours before
          { method: 'popup', minutes: 60 }       // 1 hour before
        ]
      },
      guestsCanInviteOthers: false,
      guestsCanSeeOtherGuests: false
    };
    
    const response = await calendar.events.insert({
      auth: authClient,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
      sendUpdates: 'all'
    });
    
    return {
      success: true,
      eventId: response.data.id,
      link: response.data.htmlLink,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString()
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function cancelAppointment(eventId: string) {
  try {
    const authClient = await getAuthClient();
    
    await calendar.events.delete({
      auth: authClient,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: eventId,
      sendUpdates: 'all'
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to cancel appointment'
    };
  }
}

export function formatTimeSlot(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDateSlot(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}