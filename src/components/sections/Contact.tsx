'use client';

import { useState } from 'react';
import { validatePatientData, sanitizePatientData } from '@/lib/security';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'phone'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    // Sanitize and validate data
    const sanitizedData = sanitizePatientData(formData);
    const validation = validatePatientData(sanitizedData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, you would send this to your API
      // For demo purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'phone'
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrors(['Failed to send message. Please try again or call us directly.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      primary: '(555) 123-4567',
      secondary: 'Mon-Fri 8AM-6PM',
      action: 'Call Now'
    },
    {
      icon: '📧',
      title: 'Email',
      primary: 'contact@smilecare.com',
      secondary: 'We reply within 2 hours',
      action: 'Send Email'
    },
    {
      icon: '📍',
      title: 'Address',
      primary: '123 Dental Street',
      secondary: 'SmileCity, SC 12345',
      action: 'Get Directions'
    },
    {
      icon: '🚨',
      title: 'Emergency',
      primary: '(555) 123-4567',
      secondary: '24/7 Emergency Line',
      action: 'Emergency Call'
    }
  ];

  const hours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
    { day: 'Emergencies', hours: '24/7 Available' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-4">
            <span className="mr-2">📞</span>
            Contact Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to schedule your appointment? We're here to help with any questions 
            or concerns about your dental care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-green-600 text-xl mr-3">✅</span>
                  <div>
                    <h4 className="font-medium text-green-800">Message sent successfully!</h4>
                    <p className="text-sm text-green-700 mt-1">
                      We'll get back to you within 2 hours during business hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errors.length > 0 && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-red-600 text-xl mr-3">⚠️</span>
                  <div>
                    <h4 className="font-medium text-red-800 mb-2">Please fix the following:</h4>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Phone and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Schedule Appointment</option>
                    <option value="emergency">Dental Emergency</option>
                    <option value="insurance">Insurance Questions</option>
                    <option value="services">Service Information</option>
                    <option value="billing">Billing Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Phone</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{info.icon}</span>
                    <h4 className="font-semibold text-gray-900">{info.title}</h4>
                  </div>
                  <p className="text-gray-900 font-medium mb-1">{info.primary}</p>
                  <p className="text-sm text-gray-600 mb-3">{info.secondary}</p>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                    {info.action} →
                  </button>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🕐</span>
                Office Hours
              </h4>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{schedule.day}</span>
                    <span className="font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🗺️</span>
                Find Us
              </h4>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="font-medium text-gray-900">123 Dental Street</p>
                  <p className="text-gray-600">SmileCity, SC 12345</p>
                  <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-lg shadow-md p-6 text-white">
              <h4 className="font-semibold mb-4 flex items-center">
                <span className="text-xl mr-2">⚡</span>
                Quick Actions
              </h4>
              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-lg transition-colors">
                  📅 Book Appointment Online
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-lg transition-colors">
                  💬 Chat with AI Assistant
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors">
                  🚨 Emergency Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}