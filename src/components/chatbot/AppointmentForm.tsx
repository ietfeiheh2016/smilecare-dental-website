'use client';

import { useState } from 'react';
import { formatDateSlot, formatTimeSlot } from '@/lib/calendar';
import { validatePatientData, sanitizePatientData } from '@/lib/security';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface AppointmentFormProps {
  availableSlots: TimeSlot[];
  onSubmit: (appointmentData: any) => void;
  onCancel: () => void;
}

export default function AppointmentForm({ 
  availableSlots, 
  onSubmit, 
  onCancel 
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    selectedSlot: '',
    isNewPatient: false,
    notes: ''
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Regular Cleaning',
    'Dental Exam',
    'Tooth Filling',
    'Crown/Cap',
    'Root Canal',
    'Teeth Whitening',
    'Orthodontic Consultation',
    'Oral Surgery',
    'Emergency Care',
    'General Consultation'
  ];

  const availableTimeSlots = availableSlots.filter(slot => slot.available);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Find selected slot details
    const selectedSlotDetails = availableTimeSlots.find(slot => slot.start === formData.selectedSlot);
    
    if (!selectedSlotDetails) {
      setErrors(['Please select an available time slot']);
      setIsSubmitting(false);
      return;
    }

    // Sanitize and validate data
    const sanitizedData = sanitizePatientData({
      ...formData,
      date: selectedSlotDetails.start.split('T')[0],
      time: formatTimeSlot(selectedSlotDetails.start)
    });

    const validation = validatePatientData(sanitizedData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Prepare appointment data
    const appointmentData = {
      ...sanitizedData,
      startTime: selectedSlotDetails.start,
      endTime: selectedSlotDetails.end,
      date: formatDateSlot(selectedSlotDetails.start),
      time: formatTimeSlot(selectedSlotDetails.start)
    };

    try {
      await onSubmit(appointmentData);
    } catch (error) {
      setErrors(['Failed to book appointment. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Book Appointment</h3>
          <button
            onClick={onCancel}
            className="text-white hover:text-gray-200 text-xl"
            type="button"
          >
            ✕
          </button>
        </div>
        <p className="text-sm opacity-90 mt-1">Fill out the form to schedule your visit</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <span className="text-red-600 mr-2">⚠️</span>
              <span className="font-medium text-red-800">Please fix the following:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Personal Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 border-b pb-1">Personal Information</h4>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="(555) 123-4567"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 border-b pb-1">Appointment Details</h4>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service Needed *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="selectedSlot" className="block text-sm font-medium text-gray-700 mb-1">
              Available Times *
            </label>
            {availableTimeSlots.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No available slots. Please call (555) 123-4567.</p>
            ) : (
              <select
                id="selectedSlot"
                name="selectedSlot"
                value={formData.selectedSlot}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot.start} value={slot.start}>
                    {formatDateSlot(slot.start)} at {formatTimeSlot(slot.start)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isNewPatient"
              name="isNewPatient"
              checked={formData.isNewPatient}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="isNewPatient" className="ml-2 text-sm text-gray-700">
              I am a new patient (requires additional time)
            </label>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Any specific concerns or requests..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || availableTimeSlots.length === 0}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
}