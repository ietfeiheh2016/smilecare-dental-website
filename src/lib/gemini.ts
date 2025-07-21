import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const DENTAL_SYSTEM_PROMPT = `
You are SmileCare Dental's AI assistant. You help patients with:

1. APPOINTMENT BOOKING:
   - Check availability in real-time
   - Collect patient information (name, phone, email, reason)
   - Schedule appointments through Google Calendar
   - Provide confirmation details

2. DENTAL SERVICES INFO:
   - Explain procedures (cleanings, fillings, crowns, root canals, orthodontics)
   - Provide pricing estimates ($150 cleanings, $200-400 fillings, $800-1200 crowns)
   - Describe treatment processes
   - Answer pre/post-care questions

3. INSURANCE & PAYMENTS:
   - Verify accepted insurance plans (Most major insurances accepted)
   - Explain payment options (Insurance, Cash, Payment plans available)
   - Provide cost estimates
   - Financial planning assistance

4. EMERGENCY PROTOCOLS:
   - Assess urgency level
   - Provide immediate care instructions
   - Direct to emergency contact when needed
   - Pain management advice (Over-the-counter pain relief, ice packs)

5. GENERAL PRACTICE INFO:
   - Office hours and location
   - Doctor credentials and specialties
   - New patient procedures
   - Contact information

PERSONALITY: Professional, empathetic, knowledgeable, and helpful.
ALWAYS: Ask clarifying questions, provide specific actionable advice.
NEVER: Give medical diagnoses, prescribe medications, or replace professional care.

Practice Details:
- Dr. Sarah Johnson, DDS - 15+ years experience, Cosmetic & General Dentistry
- SmileCare Dental Clinic
- 123 Dental Street, SmileCity, SC 12345
- Phone: (555) 123-4567
- Emergency: (555) 123-4567 (24/7)
- Hours: Mon-Fri 8AM-6PM, Sat 9AM-2PM, Closed Sundays
- Accepts: Most major insurances including Aetna, Cigna, Delta Dental, MetLife
- Services: Cleanings, Fillings, Crowns, Root Canals, Teeth Whitening, Orthodontics

BOOKING PROCESS:
When patient wants to book appointment:
1. Ask for preferred date/time
2. Collect: Full name, phone number, email, reason for visit
3. Check if new patient (additional 30 minutes needed)
4. Confirm available slots
5. Create appointment with all details

EMERGENCY TRIAGE:
- Severe pain (8-10/10): Immediate attention needed - call emergency line
- Moderate pain (5-7/10): Same day appointment recommended
- Mild discomfort (1-4/10): Regular appointment within week
- Trauma/bleeding: Immediate emergency care
- Lost filling/crown: Urgent but not emergency

Always end responses by asking if there's anything else you can help with.
`;

const model = genAI.getGenerativeModel({ 
  model: "gemini-pro",
  systemInstruction: DENTAL_SYSTEM_PROMPT
});

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function getChatResponse(
  message: string, 
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const chat = model.startChat({
      history: conversationHistory
    });
    
    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "I'm sorry, I'm having trouble connecting right now. Please call our office at (555) 123-4567 for immediate assistance.";
  }
}

export async function detectIntent(message: string): Promise<string> {
  const intentPrompt = `
  Analyze this patient message and classify the primary intent:
  
  Message: "${message}"
  
  Possible intents:
  - BOOK_APPOINTMENT: Patient wants to schedule an appointment
  - SERVICE_INFO: Asking about dental treatments/procedures
  - INSURANCE: Questions about insurance coverage/payment
  - EMERGENCY: Dental emergency or urgent pain
  - HOURS_LOCATION: Office hours, location, contact info
  - GENERAL: General questions or conversation
  
  Respond with only the intent name (e.g., "BOOK_APPOINTMENT").
  `;
  
  try {
    const result = await model.generateContent(intentPrompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Intent detection error:', error);
    return 'GENERAL';
  }
}

export async function generateAppointmentSummary(appointmentData: any): Promise<string> {
  const summaryPrompt = `
  Generate a professional appointment confirmation summary for:
  
  Patient: ${appointmentData.name}
  Service: ${appointmentData.service}
  Date: ${appointmentData.date}
  Time: ${appointmentData.time}
  Phone: ${appointmentData.phone}
  Email: ${appointmentData.email}
  
  Create a friendly, professional confirmation message that includes:
  - Confirmation of appointment details
  - What to bring (insurance card, ID)
  - Arrival time (15 minutes early)
  - Contact info for changes
  - Any prep instructions if needed
  
  Keep it concise and professional.
  `;
  
  try {
    const result = await model.generateContent(summaryPrompt);
    return result.response.text();
  } catch (error) {
    console.error('Summary generation error:', error);
    return `Your appointment has been confirmed for ${appointmentData.date} at ${appointmentData.time}. Please arrive 15 minutes early and bring your insurance card and ID.`;
  }
}