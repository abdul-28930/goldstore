export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  videoUrl?: string;
  category: string;
  stock: number;
  featured: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  shippingAddress: Address;
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  addresses: Address[];
}