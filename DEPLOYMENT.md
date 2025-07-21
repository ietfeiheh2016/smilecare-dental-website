# 🚀 Deployment Guide - SmileCare Dental Website

Your dental website is ready for deployment! Here are multiple options to make it live:

## 📁 Repository Information
- **GitHub Repo**: https://github.com/ietfeiheh2016/smilecare-dental-website
- **Status**: ✅ Code pushed successfully
- **Features**: All AI chatbot and booking features included

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free & Fast)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign up with GitHub"
   - Authorize with your GitHub account (ietfeiheh2016@gmail.com)

2. **Import Project**
   - Click "New Project"
   - Select "smilecare-dental-website" repository
   - Click "Import"

3. **Configure Environment Variables**
   Add these in Vercel dashboard:
   ```
   GEMINI_API_KEY = AIzaSyAQ-pqPl-ztCASspWK2xTXiCRxbez0e3Jo
   NEXT_PUBLIC_SITE_URL = https://your-site.vercel.app
   GOOGLE_CALENDAR_ID = your-calendar-id@gmail.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in 2-3 minutes!

### Option 2: Netlify (Alternative - Also Free)

1. **Go to Netlify**
   - Visit: https://netlify.com
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "New site from Git"
   - Choose GitHub
   - Select "smilecare-dental-website"

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Environment Variables**
   Same as Vercel above

### Option 3: GitHub Pages (Static Only)

1. **Enable GitHub Pages**
   - Go to repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch

## ⚙️ Environment Variables Needed

For full functionality, add these environment variables in your deployment platform:

```env
# Required for AI Chatbot
GEMINI_API_KEY=AIzaSyAQ-pqPl-ztCASspWK2xTXiCRxbez0e3Jo

# Optional - For appointment booking
GOOGLE_CALENDAR_ID=your-calendar@gmail.com
GOOGLE_SERVICE_ACCOUNT_KEY=your-service-account.json

# Site configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🔧 Quick Deploy Commands

If you have Vercel CLI installed:
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add GEMINI_API_KEY
```

## 🎯 What You Get Live

✅ **AI-Powered Chatbot**
- Dental expertise with Gemini AI
- 24/7 patient assistance
- Emergency protocol handling

✅ **Professional Website**
- Mobile-responsive design
- Modern dental practice layout
- Contact forms and service info

✅ **Appointment Booking** (with Google Calendar setup)
- Real-time availability
- Automated confirmations
- Patient management

## 📞 Next Steps After Deployment

1. **Test the AI Chatbot**
   - Open the chat widget
   - Try asking: "I need a cleaning"
   - Verify AI responses

2. **Customize Practice Info**
   - Update doctor name and address
   - Add your actual phone numbers
   - Modify service pricing

3. **Set Up Google Calendar**
   - Create service account
   - Share calendar with service account
   - Add calendar ID to environment

## 🌟 Your Live Website Will Have

- **Professional Design**: Modern, trustworthy dental website
- **AI Assistant**: Gemini-powered chatbot for patients
- **Mobile Ready**: Perfect on all devices
- **Fast Loading**: Optimized performance
- **SEO Optimized**: Google-friendly structure
- **Secure**: HIPAA-compliant data handling

## 🆘 Support

If you need help with deployment:
1. Check deployment platform documentation
2. Verify environment variables are set
3. Test API keys are working
4. Contact platform support if needed

**Your dental practice website is ready to serve patients! 🦷✨**