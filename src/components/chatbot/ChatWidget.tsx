'use client';

import { useState, useRef, useEffect } from 'react';
import { getChatResponse, detectIntent, generateAppointmentSummary, ChatMessage as GeminiMessage } from '@/lib/gemini';
import { getAvailableSlots, createAppointment, AppointmentData, TimeSlot } from '@/lib/calendar';
import { validateChatMessage, sanitizeMessage, isEmergencyKeywords } from '@/lib/security';
import ChatMessage, { Message } from './ChatMessage';
import AppointmentForm from './AppointmentForm';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm SmileCare's AI assistant. I can help you:\n\n• 📅 Book appointments instantly\n• 🦷 Answer questions about dental services\n• 💰 Provide pricing and insurance info\n• 🚨 Handle dental emergencies\n• 📍 Give directions and hours\n\nHow can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<'general' | 'booking' | 'booking_form'>('general');
  const [conversationHistory, setConversationHistory] = useState<GeminiMessage[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const addMessage = (text: string, sender: 'user' | 'bot', metadata: Partial<Message> = {}) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      ...metadata
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation history for Gemini
    setConversationHistory(prev => [
      ...prev,
      { role: sender === 'user' ? 'user' : 'model', parts: [{ text }] }
    ]);
  };
  
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = inputText.trim();
    
    // Validate message
    const validation = validateChatMessage(userMessage);
    if (!validation.isValid) {
      alert('Invalid message content. Please try again.');
      return;
    }
    
    const sanitizedMessage = sanitizeMessage(userMessage);
    setInputText('');
    
    // Add user message
    addMessage(sanitizedMessage, 'user');
    setIsTyping(true);
    
    try {
      // Check for emergency keywords
      const isEmergency = isEmergencyKeywords(sanitizedMessage);
      
      if (isEmergency) {
        const response = await handleEmergencyFlow(sanitizedMessage);
        addMessage(response, 'bot', { isEmergency: true });
        setIsTyping(false);
        return;
      }
      
      // Detect intent
      const intent = await detectIntent(sanitizedMessage);
      
      if (intent === 'BOOK_APPOINTMENT') {
        const response = await handleBookingFlow(sanitizedMessage);
        addMessage(response, 'bot');
      } else {
        // General conversation with Gemini
        const response = await getChatResponse(sanitizedMessage, conversationHistory);
        addMessage(response, 'bot');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage("I'm having trouble connecting. Please call us at (555) 123-4567 for immediate assistance.", 'bot');
    }
    
    setIsTyping(false);
  };
  
  const handleBookingFlow = async (message: string): Promise<string> => {
    try {
      // Get available slots for today and next few days
      const today = new Date();
      const slots = await getAvailableSlots(today);
      
      // Also check tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowSlots = await getAvailableSlots(tomorrow);
      
      const allSlots = [...slots, ...tomorrowSlots].filter(slot => slot.available);
      setAvailableSlots(allSlots);
      
      if (allSlots.length === 0) {
        return `I don't see any available appointments in the next 2 days. Let me connect you with our scheduling team.\n\n📞 Please call us at (555) 123-4567 and we'll find the perfect time for you.\n\n📅 Our hours are:\n• Mon-Fri: 8AM-6PM\n• Sat: 9AM-2PM\n• Closed Sundays\n\nIs there anything else I can help you with?`;
      }
      
      // Trigger booking form
      setCurrentFlow('booking_form');
      return `Great! I found ${allSlots.length} available appointment slots. Let me get your information to book your appointment:`;
      
    } catch (error) {
      console.error('Booking flow error:', error);
      return "I'm having trouble checking our schedule right now. Please call us at (555) 123-4567 to book your appointment directly.";
    }
  };
  
  const handleEmergencyFlow = async (message: string): Promise<string> => {
    const emergencyPrompt = `
    DENTAL EMERGENCY ASSESSMENT: "${message}"
    
    Provide immediate guidance following this protocol:
    1. Assess severity level (mild/moderate/severe)
    2. Give immediate care instructions
    3. Determine if patient needs urgent care
    4. Provide comfort measures
    5. Include emergency contact info
    
    Be professional, calm, and helpful. Always include our emergency number.
    `;
    
    try {
      const response = await getChatResponse(emergencyPrompt, []);
      return `🚨 DENTAL EMERGENCY PROTOCOL:\n\n${response}\n\n📞 EMERGENCY LINE: (555) 123-4567 (24/7)\n📍 If life-threatening, call 911 immediately\n\nI'm here if you have any other questions!`;
    } catch (error) {
      return `🚨 DENTAL EMERGENCY:\n\nFor immediate assistance:\n📞 Call our emergency line: (555) 123-4567 (24/7)\n📍 If life-threatening, call 911\n\nCommon immediate care:\n• Rinse with warm salt water\n• Apply cold compress to reduce swelling\n• Take over-the-counter pain relief as directed\n• Avoid extreme temperatures\n\nPlease call us immediately for professional care.`;
    }
  };
  
  const handleAppointmentSubmit = async (appointmentData: AppointmentData) => {
    setIsTyping(true);
    
    try {
      const result = await createAppointment(appointmentData);
      
      if (result.success) {
        // Generate confirmation summary using Gemini
        const summary = await generateAppointmentSummary(appointmentData);
        
        addMessage(
          `✅ Perfect! Your appointment has been confirmed:\n\n${summary}\n\n📧 You'll receive a confirmation email shortly with all the details.\n\nIs there anything else I can help you with?`,
          'bot'
        );
      } else {
        addMessage(
          `❌ I'm sorry, there was an issue booking your appointment: ${result.error}\n\n📞 Please call us at (555) 123-4567 and we'll get you scheduled right away.\n\nOur scheduling team will be happy to help!`,
          'bot'
        );
      }
    } catch (error) {
      console.error('Appointment booking error:', error);
      addMessage(
        "I'm having trouble with the booking system right now. Please call (555) 123-4567 to schedule your appointment directly.",
        'bot'
      );
    }
    
    setCurrentFlow('general');
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const closeChatWidget = () => {
    setIsOpen(false);
    setCurrentFlow('general');
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105 z-50"
          aria-label="Open chat"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Pulse animation */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}
      
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          {currentFlow === 'booking_form' ? (
            <AppointmentForm
              availableSlots={availableSlots}
              onSubmit={handleAppointmentSubmit}
              onCancel={() => setCurrentFlow('general')}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-2xl w-80 md:w-96 h-96 flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">SmileCare AI Assistant</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                      <p className="text-sm opacity-90">Online • Usually replies instantly</p>
                    </div>
                  </div>
                  <button
                    onClick={closeChatWidget}
                    className="text-white hover:text-gray-200 text-xl transition-colors"
                    aria-label="Close chat"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center justify-start">
                    <div className="bg-gray-200 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-500">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <div className="p-4 border-t bg-white rounded-b-lg">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    disabled={isTyping}
                    maxLength={1000}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                    aria-label="Send message"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  🔒 Your information is secure • AI-powered by Gemini
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}