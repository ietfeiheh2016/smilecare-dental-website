'use client';

export default function About() {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5,000+', label: 'Happy Patients' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '24/7', label: 'Emergency Care' }
  ];

  const credentials = [
    { icon: '🎓', title: 'DDS Degree', desc: 'University of Dental Medicine' },
    { icon: '🏆', title: 'Board Certified', desc: 'American Dental Association' },
    { icon: '📚', title: 'Continuing Education', desc: '50+ hours annually' },
    { icon: '⭐', title: 'Excellence Awards', desc: 'Top Dentist 2020-2024' }
  ];

  const technologies = [
    { name: 'Digital X-Rays', icon: '📱', description: '90% less radiation than traditional X-rays' },
    { name: 'Laser Dentistry', icon: '🔬', description: 'Minimally invasive, faster healing' },
    { name: 'CAD/CAM Technology', icon: '⚙️', description: 'Same-day crowns and restorations' },
    { name: 'Intraoral Cameras', icon: '📷', description: 'See what we see in real-time' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-4">
            <span className="mr-2">👩‍⚕️</span>
            Meet Your Dentist
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dr. Sarah Johnson, DDS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated to providing exceptional dental care with a gentle touch and cutting-edge technology
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Doctor Image & Info */}
          <div className="relative">
            {/* Placeholder for doctor image */}
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white">
                👩‍⚕️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
              <p className="text-gray-600 mb-4">Doctor of Dental Surgery</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>🎓 DDS, 2009</span>
                <span>📍 SmileCity, SC</span>
                <span>🗣️ English, Spanish</span>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border-l-4 border-green-500">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Patient Satisfaction</div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Passionate About Your Smile
              </h3>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  With over 15 years of experience, Dr. Johnson combines advanced dental techniques 
                  with a gentle, patient-centered approach. She believes that everyone deserves a 
                  healthy, beautiful smile and works closely with each patient to achieve their 
                  dental goals.
                </p>
                <p>
                  Dr. Johnson stays at the forefront of dental technology and continues her education 
                  to provide the most effective, comfortable treatments available. Her warm personality 
                  and expertise have earned her the trust of thousands of patients throughout the community.
                </p>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Specialties:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Cosmetic Dentistry',
                  'Preventive Care',
                  'Restorative Dentistry',
                  'Emergency Care',
                  'Pediatric Dentistry',
                  'Orthodontics'
                ].map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-start">
                <span className="text-3xl mr-4">💭</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">My Philosophy</h4>
                  <p className="text-gray-600 italic">
                    "I believe in treating each patient as I would want to be treated - with respect, 
                    honesty, and gentle care. My goal is not just to fix problems, but to help you 
                    maintain optimal oral health for life."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{stat.number}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{stat.label}</h3>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Credentials & Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((credential, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{credential.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{credential.title}</h4>
                <p className="text-sm text-gray-600">{credential.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Advanced Technology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">{tech.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{tech.name}</h4>
                <p className="text-sm text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Meet Our Caring Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Maria Rodriguez', role: 'Dental Hygienist', experience: '8 years', icon: '🦷' },
              { name: 'Jennifer Kim', role: 'Office Manager', experience: '12 years', icon: '💼' },
              { name: 'David Chen', role: 'Dental Assistant', experience: '5 years', icon: '🩺' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                  {member.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-green-600 font-medium mb-1">{member.role}</p>
                <p className="text-sm text-gray-600">{member.experience} experience</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience the Difference?
          </h3>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied patients who trust Dr. Johnson with their smiles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors transform hover:scale-105">
              📅 Schedule Your Visit
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all">
              💬 Ask Our AI Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}