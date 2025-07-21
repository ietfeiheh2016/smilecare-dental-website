'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        'Regular Cleanings',
        'Dental Exams',
        'Tooth Fillings',
        'Crowns & Caps',
        'Root Canal Therapy',
        'Teeth Whitening',
        'Orthodontics',
        'Emergency Care'
      ]
    },
    {
      title: 'Patient Info',
      links: [
        'New Patient Forms',
        'Insurance & Payment',
        'Appointment Policy',
        'Post-Care Instructions',
        'FAQ',
        'Patient Reviews',
        'Referral Program',
        'Financial Options'
      ]
    },
    {
      title: 'About',
      links: [
        'Meet Dr. Johnson',
        'Our Team',
        'Technology',
        'Office Tour',
        'Community Involvement',
        'Awards & Recognition',
        'Continuing Education',
        'Practice History'
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Google Reviews', icon: '⭐', href: '#' },
    { name: 'Yelp', icon: '🔍', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🦷</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">SmileCare</h3>
                <p className="text-gray-400 text-sm">AI-Powered Dental Care</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Experience modern dental care with cutting-edge AI technology and 
              compassionate service. Your smile is our mission.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <span className="mr-3">📍</span>
                <span>123 Dental Street<br />SmileCity, SC 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="mr-3">📞</span>
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="mr-3">📧</span>
                <span>contact@smilecare.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-green-400">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency & Hours Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2">🚨</span>
                Dental Emergency?
              </h4>
              <p className="text-red-100">
                We provide 24/7 emergency dental care. Don't wait - call us now!
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                📞 Emergency Line: (555) 123-4567
              </button>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4 text-green-400 flex items-center">
            <span className="mr-2">🕐</span>
            Office Hours
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
              { days: 'Saturday', hours: '9:00 AM - 2:00 PM' },
              { days: 'Sunday', hours: 'Closed' },
              { days: 'Emergencies', hours: '24/7 Available' }
            ].map((schedule, index) => (
              <div key={index} className="text-center">
                <div className="font-medium text-white">{schedule.days}</div>
                <div className="text-gray-300 text-sm">{schedule.hours}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant Promo */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-center">
          <h4 className="text-xl font-bold mb-2">
            🤖 Try Our AI Dental Assistant
          </h4>
          <p className="text-green-100 mb-4">
            Get instant answers to your dental questions and book appointments 24/7!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              💬 Start Chat
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              📅 Book Online
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-gray-400 text-sm">
              © {currentYear} SmileCare Dental Clinic. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">HIPAA Notice</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            <p className="flex items-center justify-center">
              <span className="mr-2">🔒</span>
              HIPAA Compliant • AI-Powered by Google Gemini • Secured with SSL
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}