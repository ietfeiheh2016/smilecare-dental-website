'use client';

import { useState } from 'react';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular?: boolean;
  features: string[];
}

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services: Service[] = [
    {
      id: 'cleaning',
      icon: '🦷',
      title: 'Regular Cleaning',
      description: 'Professional teeth cleaning and polishing',
      price: '$150',
      duration: '45 min',
      features: ['Plaque removal', 'Polishing', 'Fluoride treatment', 'Oral hygiene tips']
    },
    {
      id: 'exam',
      icon: '🔍',
      title: 'Dental Exam',
      description: 'Comprehensive oral health examination',
      price: '$100',
      duration: '30 min',
      popular: true,
      features: ['Complete examination', 'X-rays if needed', 'Treatment planning', 'Health consultation']
    },
    {
      id: 'filling',
      icon: '🛡️',
      title: 'Tooth Filling',
      description: 'Cavity treatment with modern materials',
      price: '$200-400',
      duration: '60 min',
      features: ['Composite fillings', 'Color matching', 'Pain-free procedure', 'Long-lasting results']
    },
    {
      id: 'crown',
      icon: '👑',
      title: 'Crown/Cap',
      description: 'Restore damaged teeth with custom crowns',
      price: '$800-1200',
      duration: '2 visits',
      features: ['Custom fit', 'Natural appearance', 'Durable materials', 'Digital impressions']
    },
    {
      id: 'root-canal',
      icon: '🩺',
      title: 'Root Canal',
      description: 'Save infected teeth with gentle care',
      price: '$600-1000',
      duration: '90 min',
      features: ['Pain relief', 'Tooth preservation', 'Advanced techniques', 'Follow-up care']
    },
    {
      id: 'whitening',
      icon: '✨',
      title: 'Teeth Whitening',
      description: 'Professional brightening treatment',
      price: '$300-500',
      duration: '60 min',
      popular: true,
      features: ['Professional grade', 'Safe & effective', 'Immediate results', 'Custom trays included']
    },
    {
      id: 'orthodontics',
      icon: '🎯',
      title: 'Orthodontics',
      description: 'Straighten teeth with modern solutions',
      price: '$3000-6000',
      duration: '12-24 months',
      features: ['Clear aligners', 'Traditional braces', 'Digital planning', 'Regular monitoring']
    },
    {
      id: 'emergency',
      icon: '🚨',
      title: 'Emergency Care',
      description: '24/7 urgent dental care',
      price: 'Varies',
      duration: 'As needed',
      features: ['Immediate relief', '24/7 availability', 'Pain management', 'Same-day treatment']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'preventive', name: 'Preventive' },
    { id: 'restorative', name: 'Restorative' },
    { id: 'cosmetic', name: 'Cosmetic' },
    { id: 'emergency', name: 'Emergency' }
  ];

  const getServiceCategory = (serviceId: string): string => {
    const categoryMap: { [key: string]: string } = {
      'cleaning': 'preventive',
      'exam': 'preventive',
      'filling': 'restorative',
      'crown': 'restorative',
      'root-canal': 'restorative',
      'whitening': 'cosmetic',
      'orthodontics': 'cosmetic',
      'emergency': 'emergency'
    };
    return categoryMap[serviceId] || 'all';
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => getServiceCategory(service.id) === selectedCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-4">
            <span className="mr-2">🦷</span>
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From routine cleanings to complex procedures, we provide complete dental care 
            with the latest technology and gentle touch.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{service.icon}</div>
                  {service.popular && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                {/* Price and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    {service.price}
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {service.duration}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Book Button */}
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 transform hover:scale-105">
                  Book {service.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance & Payment Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💳 Insurance & Payment Options
            </h3>
            <p className="text-gray-600">
              We make dental care affordable with flexible payment options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Insurance */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Insurance Accepted</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Aetna</li>
                <li>• Cigna</li>
                <li>• Delta Dental</li>
                <li>• MetLife</li>
                <li>• Most PPO plans</li>
              </ul>
            </div>

            {/* Payment Plans */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Plans</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 0% interest financing</li>
                <li>• Monthly payment plans</li>
                <li>• CareCredit accepted</li>
                <li>• Flexible terms</li>
                <li>• No hidden fees</li>
              </ul>
            </div>

            {/* Other Options */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Other Options</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cash discounts</li>
                <li>• Credit cards</li>
                <li>• HSA/FSA accepted</li>
                <li>• Senior discounts</li>
                <li>• Family packages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency CTA */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-8 text-white text-center">
          <div className="mb-4">
            <span className="text-4xl">🚨</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Dental Emergency?
          </h3>
          <p className="text-red-100 mb-6">
            Don't wait - we provide 24/7 emergency care for urgent dental situations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              📞 Call Emergency Line
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all">
              💬 Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}