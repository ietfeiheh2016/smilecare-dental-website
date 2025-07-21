'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🦷</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">SmileCare</h1>
              <p className="text-xs text-gray-600 hidden md:block">AI-Powered Dental Care</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
              📞 (555) 123-4567
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors transform hover:scale-105">
              📅 Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
            <nav className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button className="w-full text-left text-green-600 hover:text-green-700 font-medium py-2 transition-colors">
                  📞 Call (555) 123-4567
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center">
                  📅 Book Appointment
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center">
                  💬 Chat with AI
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Top Bar - Emergency/Hours */}
      <div className={`bg-green-600 text-white text-sm transition-all duration-300 ${
        isScrolled ? 'h-0 overflow-hidden' : 'h-auto'
      }`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="mr-1">🕐</span>
                Mon-Fri 8AM-6PM, Sat 9AM-2PM
              </span>
              <span className="flex items-center">
                <span className="mr-1">📍</span>
                123 Dental Street, SmileCity, SC
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span className="flex items-center text-yellow-300">
                <span className="mr-1">🚨</span>
                Emergency: (555) 123-4567
              </span>
              <span className="flex items-center">
                <span className="mr-1">💬</span>
                Try Our AI Assistant!
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}