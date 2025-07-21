export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PatientData {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  service?: string;
  date?: string;
  time?: string;
  isNewPatient?: boolean;
  notes?: string;
}

export function sanitizePatientData(data: PatientData): PatientData {
  return {
    name: data.name?.replace(/[<>]/g, '').trim().substring(0, 100),
    phone: data.phone?.replace(/[^\d\-\(\)\s\+]/g, '').trim().substring(0, 20),
    email: data.email?.toLowerCase().trim().substring(0, 100),
    message: data.message?.substring(0, 500).trim(),
    service: data.service?.trim().substring(0, 100),
    date: data.date?.trim(),
    time: data.time?.trim(),
    isNewPatient: Boolean(data.isNewPatient),
    notes: data.notes?.substring(0, 300).trim()
  };
}

export function validatePatientData(data: PatientData): ValidationResult {
  const errors: string[] = [];
  
  // Name validation
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  // Phone validation
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Please enter a valid phone number (at least 10 digits)');
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Service validation
  const validServices = [
    'cleaning',
    'exam',
    'filling',
    'crown',
    'root canal',
    'teeth whitening',
    'orthodontics',
    'oral surgery',
    'emergency',
    'consultation'
  ];
  
  if (data.service && !validServices.some(service => 
    data.service?.toLowerCase().includes(service)
  )) {
    errors.push('Please select a valid service');
  }
  
  // Date validation (if provided)
  if (data.date) {
    const appointmentDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      errors.push('Appointment date cannot be in the past');
    }
    
    // Check if date is more than 3 months in advance
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    
    if (appointmentDate > maxDate) {
      errors.push('Appointments can only be booked up to 3 months in advance');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateChatMessage(message: string): ValidationResult {
  const errors: string[] = [];
  
  if (!message || message.trim().length === 0) {
    errors.push('Message cannot be empty');
  }
  
  if (message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }
  
  // Check for potential malicious content
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /data:text\/html/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(message))) {
    errors.push('Message contains invalid content');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeMessage(message: string): string {
  return message
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .trim()
    .substring(0, 1000); // Limit length
}

export function isEmergencyKeywords(message: string): boolean {
  const emergencyKeywords = [
    'severe pain',
    'emergency',
    'urgent',
    'bleeding',
    'swelling',
    'can\'t open mouth',
    'knocked out tooth',
    'broken tooth',
    'abscess',
    'infection',
    'throbbing',
    'unbearable pain',
    '911',
    'hospital'
  ];
  
  const lowerMessage = message.toLowerCase();
  return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
}

export function logSecurityEvent(event: string, data?: any) {
  // In production, you'd want to send this to a proper logging service
  console.warn('Security Event:', {
    event,
    data,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server'
  });
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different phone number formats
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if can't format
}

export function maskSensitiveData(data: any): any {
  const masked = { ...data };
  
  // Mask email
  if (masked.email) {
    const [username, domain] = masked.email.split('@');
    if (username && domain) {
      masked.email = `${username.slice(0, 2)}***@${domain}`;
    }
  }
  
  // Mask phone
  if (masked.phone) {
    const cleaned = masked.phone.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      masked.phone = `***-***-${cleaned.slice(-4)}`;
    }
  }
  
  return masked;
}