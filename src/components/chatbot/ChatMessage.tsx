'use client';

import { formatDistanceToNow } from 'date-fns';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isEmergency?: boolean;
  isTyping?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  const isEmergency = message.isEmergency;

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            isBot 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 text-white'
          }`}>
            {isBot ? '🤖' : '👤'}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
          <div className={`rounded-lg px-4 py-2 shadow-sm ${
            isBot 
              ? isEmergency 
                ? 'bg-red-50 border border-red-200' 
                : 'bg-gray-100 text-gray-800'
              : 'bg-blue-600 text-white'
          }`}>
            {/* Emergency indicator */}
            {isEmergency && (
              <div className="flex items-center mb-2 text-red-600">
                <span className="text-lg mr-1">🚨</span>
                <span className="text-sm font-semibold">EMERGENCY PROTOCOL</span>
              </div>
            )}
            
            {/* Message text */}
            <p className={`text-sm leading-relaxed ${
              isEmergency ? 'text-red-800' : ''
            }`}>
              {message.text.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < message.text.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            {message.isTyping ? (
              <span className="italic">typing...</span>
            ) : (
              formatDistanceToNow(message.timestamp, { addSuffix: true })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}