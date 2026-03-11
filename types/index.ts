export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  service: string;
  centre: string;
  centreId?: string;
  date: string;
  time: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  vehicles: number;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface Centre {
  id: string;
  name: string;
  location: string;
  contact: string;
  hours: string;
  rating: number;
  status: 'active' | 'suspended' | 'review';
  adminEmail?: string;
  createdAt: string;
}

export interface Station {
  id: string;
  name: string;
  location: string;
  type: 'AC' | 'DC';
  power: string;
  status: 'online' | 'offline' | 'busy';
  sessions: number;
  lat?: number;
  lng?: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
  userId?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  totalCentres: number;
  totalStations: number;
  recentBookings: Booking[];
}
