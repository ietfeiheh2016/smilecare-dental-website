import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmileCare Dental Clinic - AI-Powered Dental Care | Dr. Sarah Johnson DDS",
  description: "Experience modern dental care with cutting-edge AI technology at SmileCare Dental Clinic. Book appointments instantly with our AI assistant. Dr. Sarah Johnson provides comprehensive dental services including cleanings, fillings, crowns, and emergency care in SmileCity, SC.",
  keywords: [
    "dentist SmileCity SC",
    "dental clinic",
    "AI dental assistant", 
    "book dental appointment online",
    "Dr. Sarah Johnson DDS",
    "dental emergency",
    "teeth cleaning",
    "dental crowns",
    "root canal",
    "teeth whitening",
    "orthodontics",
    "dental insurance",
    "HIPAA compliant"
  ],
  authors: [{ name: "SmileCare Dental Clinic" }],
  creator: "SmileCare Dental Clinic",
  publisher: "SmileCare Dental Clinic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SmileCare Dental Clinic - AI-Powered Dental Care",
    description: "Book your dental appointment instantly with our AI assistant. Modern dental care with Dr. Sarah Johnson DDS in SmileCity, SC.",
    url: '/',
    siteName: 'SmileCare Dental Clinic',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SmileCare Dental Clinic - AI-Powered Dental Care',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SmileCare Dental Clinic - AI-Powered Dental Care",
    description: "Book your dental appointment instantly with our AI assistant. Modern dental care in SmileCity, SC.",
    images: ['/og-image.jpg'],
    creator: '@SmileCareDental',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'healthcare',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "SmileCare Dental Clinic",
              "description": "AI-powered dental care with modern technology and compassionate service",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              "telephone": "+15551234567",
              "email": "contact@smilecare.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Dental Street",
                "addressLocality": "SmileCity",
                "addressRegion": "SC",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "14:00"
                }
              ],
              "priceRange": "$$",
              "hasCredential": "DDS",
              "founder": {
                "@type": "Person",
                "name": "Dr. Sarah Johnson",
                "jobTitle": "Doctor of Dental Surgery",
                "hasCredential": "DDS"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "247"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}