'use client';

import { useState } from 'react';

export default function Hero() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                <span className="mr-2">✨</span>
                AI-Powered Dental Care
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Beautiful Smiles
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Start Here
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
                Experience modern dental care with Dr. Sarah Johnson. 
                Book your appointment instantly with our AI assistant!
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: "⚡", title: "Instant Booking", desc: "AI-powered scheduling" },
                { icon: "🤖", title: "24/7 Assistant", desc: "Get answers anytime" },
                { icon: "📱", title: "Mobile Ready", desc: "Book anywhere" }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-green-100">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                📅 Book Appointment Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
                📞 Call (555) 123-4567
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-green-100">
              <div className="flex items-center">
                <span className="text-yellow-300 mr-2">⭐⭐⭐⭐⭐</span>
                <span>4.9/5 Rating</span>
              </div>
              <div>🛡️ HIPAA Compliant</div>
              <div>✅ 15+ Years Experience</div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Try Our AI Assistant</h3>
                <p className="text-green-100">See how easy it is to book an appointment!</p>
              </div>

              {/* Chat Demo */}
              <div className="bg-white/20 rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                {[
                  { sender: 'user', text: "I need a dental cleaning", time: "just now" },
                  { sender: 'bot', text: "I'd be happy to help! When would you prefer to come in?", time: "just now" },
                  { sender: 'user', text: "Tomorrow afternoon", time: "just now" },
                  { sender: 'bot', text: "Perfect! I have these times available:\n• 2:00 PM\n• 3:30 PM\n• 4:00 PM", time: "just now" },
                  { sender: 'user', text: "2:00 PM works great", time: "just now" },
                  { sender: 'bot', text: "✅ Appointment booked for tomorrow at 2:00 PM!\nYou'll receive a confirmation email shortly.", time: "just now" }
                ].map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-800'
                    }`}>
                      {message.text.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Demo Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">30s</div>
                  <div className="text-sm text-green-100">Average booking time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-green-100">Always available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-green-100">Success rate</div>
                </div>
              </div>

              {/* Try It Button */}
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  🚀 Try It Now - It's Free!
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#ffffff"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#ffffff"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
}