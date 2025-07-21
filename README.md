# 🦷 SmileCare Dental Clinic - AI-Powered Dental Website

A modern, responsive dental practice website featuring a Gemini AI-powered chatbot for patient interactions and Google Calendar integration for seamless appointment booking.

## ✨ Features

### 🤖 AI-Powered Chatbot
- **Google Gemini Integration**: Intelligent dental assistant with dental-specific knowledge
- **Natural Conversations**: Understanding of dental terminology and procedures
- **Intent Detection**: Automatically routes conversations (booking, emergencies, info)
- **Emergency Protocols**: Special handling for urgent dental situations
- **24/7 Availability**: Always available for patient inquiries

### 📅 Appointment Booking System
- **Real-time Calendar Integration**: Google Calendar API for live availability
- **Instant Booking**: Book appointments directly through AI chat
- **Automated Confirmations**: Email notifications with appointment details
- **New Patient Handling**: Extended time slots for first-time patients
- **Conflict Prevention**: Automatic slot validation and booking

## 🚀 Quick Start

### Installation
1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd gemini-dental-website
   npm install
   ```

2. **Environment Setup** - Create `.env.local`:
   ```env
   GEMINI_API_KEY=AIzaSyDiv7OakqUig-JtqE7UmArRH0MVaikpXhw
   GOOGLE_CALENDAR_ID=your_clinic_calendar_id@gmail.com
   GOOGLE_SERVICE_ACCOUNT_KEY=./service-account-key.json
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`

## 🛠️ Technology Stack
- **Next.js 15** with TypeScript
- **Tailwind CSS** for styling
- **Google Gemini Pro** AI integration
- **Google Calendar API** for appointments
- **Date-fns** for date handling

Built with ❤️ for modern dental practices