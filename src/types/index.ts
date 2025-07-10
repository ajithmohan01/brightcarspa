export interface User {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: 'customer' | 'van_admin' | 'super_admin';
  createdAt: string;
  vanId?: string; // For van admins
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image: string;
  category: 'basic' | 'premium' | 'addon';
  features: string[];
  available: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: number; // in days
  services: string[]; // service IDs
  features: string[];
  popular?: boolean;
  maxBookings: number;
}

export interface Booking {
  id: string;
  userId: string;
  vanId: string;
  serviceIds: string[];
  packageId?: string;
  scheduledDate: string;
  timeSlot: string;
  address: Address;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Van {
  id: string;
  name: string;
  adminId: string;
  location: string;
  status: 'active' | 'maintenance' | 'offline';
  coordinates?: {
    lat: number;
    lng: number;
  };
  capacity: number;
  services: string[]; // service IDs
  revenue: number;
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  vanId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  available: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'disabled';
  applicableServices?: string[];
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  position: 'hero' | 'middle' | 'footer';
  active: boolean;
  order: number;
}