export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  role: 'customer' | 'seller' | 'admin';
  addresses: Address[];
  defaultAddressId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}
