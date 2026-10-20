// Mock data for SGKart Admin Dashboard

export const initialAdminStats = {
  totalRevenue: 1485600,
  monthlyGrowth: 18.4,
  totalOrders: 1248,
  ordersGrowth: 12.8,
  totalCustomers: 892,
  customerGrowth: 24.2,
  avgOrderValue: 2480,
  pendingDeliveries: 42
};

export const salesTrends = [
  { month: 'May', sales: 680000, orders: 540 },
  { month: 'Jun', sales: 790000, orders: 620 },
  { month: 'Jul', sales: 940000, orders: 740 },
  { month: 'Aug', sales: 1120000, orders: 890 },
  { month: 'Sep', sales: 1290000, orders: 1040 },
  { month: 'Oct', sales: 1485600, orders: 1248 },
];

export const categoryBreakdown = [
  { name: 'Electronics', percentage: 42, revenue: 623950, color: '#174EA6' },
  { name: 'Fashion', percentage: 22, revenue: 326830, color: '#FFD54F' },
  { name: 'Home & Kitchen', percentage: 16, revenue: 237690, color: '#10B981' },
  { name: 'Beauty', percentage: 8, revenue: 118840, color: '#EC4899' },
  { name: 'Sports & Others', percentage: 12, revenue: 178290, color: '#8B5CF6' },
];

export const initialOrders = [
  {
    id: 'SG-ORD-98214',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '+91 98765 43210',
    date: '2026-10-20T14:30:00Z',
    items: [
      { id: 'prod-elec-1', name: 'SG ProMax 5G Smartphone', price: 18999, quantity: 1, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80' }
    ],
    subtotal: 18999,
    discount: 1000,
    shippingFee: 0,
    total: 17999,
    status: 'Processing',
    paymentMethod: 'UPI (GPay)',
    paymentStatus: 'Paid',
    deliveryAddress: {
      fullName: 'Aarav Sharma',
      addressLine: 'Flat 402, Sunshine Heights, Powai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400076'
    },
    trackingNumber: 'SGK-EXP-90812'
  },
  {
    id: 'SG-ORD-98188',
    customerName: 'Priyanka Sen',
    customerEmail: 'priyanka.sen@example.com',
    customerPhone: '+91 98123 45678',
    date: '2026-10-19T10:15:00Z',
    items: [
      { id: 'prod-elec-2', name: 'AcousticBeat ANC Wireless Headphones', price: 3499, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-acc-2', name: 'VoltCharge MagSafe 10000mAh Power Bank', price: 1599, quantity: 1, image: 'https://images.unsplash.com/photo-1609592424300-e2b26aa571c2?auto=format&fit=crop&w=400&q=80' }
    ],
    subtotal: 5098,
    discount: 500,
    shippingFee: 0,
    total: 4598,
    status: 'Shipped',
    paymentMethod: 'Credit Card (HDFC)',
    paymentStatus: 'Paid',
    deliveryAddress: {
      fullName: 'Priyanka Sen',
      addressLine: 'House 12B, Sector 15, Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091'
    },
    trackingNumber: 'SGK-EXP-87231'
  },
  {
    id: 'SG-ORD-97992',
    customerName: 'Vikramaditya Rao',
    customerEmail: 'vikram.rao@example.com',
    customerPhone: '+91 99001 23456',
    date: '2026-10-17T18:45:00Z',
    items: [
      { id: 'prod-fash-2', name: 'Kanjivaram Style Banarasi Silk Zari Saree', price: 2499, quantity: 1, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-fash-1', name: 'Royal Heritage Men Embroidered Kurta Set', price: 1899, quantity: 1, image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80' }
    ],
    subtotal: 4398,
    discount: 300,
    shippingFee: 0,
    total: 4098,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid on Delivery',
    deliveryAddress: {
      fullName: 'Vikramaditya Rao',
      addressLine: 'Villa 7, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066'
    },
    trackingNumber: 'SGK-DEL-65490'
  },
  {
    id: 'SG-ORD-97810',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.d@example.com',
    customerPhone: '+91 97654 32109',
    date: '2026-10-15T09:20:00Z',
    items: [
      { id: 'prod-home-1', name: 'AeroFry Smart Digital Rapid Air Fryer', price: 3699, quantity: 1, image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80' }
    ],
    subtotal: 3699,
    discount: 0,
    shippingFee: 0,
    total: 3699,
    status: 'Delivered',
    paymentMethod: 'UPI (Paytm)',
    paymentStatus: 'Paid',
    deliveryAddress: {
      fullName: 'Ananya Deshmukh',
      addressLine: '14, Shanti Kunj, Baner',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045'
    },
    trackingNumber: 'SGK-DEL-54312'
  }
];

export const initialCustomers = [
  {
    id: 'CUST-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    ordersCount: 8,
    totalSpent: 48990,
    status: 'Active',
    joinDate: '2025-08-14'
  },
  {
    id: 'CUST-002',
    name: 'Priyanka Sen',
    email: 'priyanka.sen@example.com',
    phone: '+91 98123 45678',
    city: 'Kolkata',
    ordersCount: 4,
    totalSpent: 18450,
    status: 'Active',
    joinDate: '2025-11-20'
  },
  {
    id: 'CUST-003',
    name: 'Vikramaditya Rao',
    email: 'vikram.rao@example.com',
    phone: '+91 99001 23456',
    city: 'Bengaluru',
    ordersCount: 12,
    totalSpent: 76200,
    status: 'VIP Customer',
    joinDate: '2025-03-09'
  },
  {
    id: 'CUST-004',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@example.com',
    phone: '+91 97654 32109',
    city: 'Pune',
    ordersCount: 3,
    totalSpent: 11200,
    status: 'Active',
    joinDate: '2026-01-22'
  },
  {
    id: 'CUST-005',
    name: 'Kavita Chawla',
    email: 'kavita.c@example.com',
    phone: '+91 99887 76655',
    city: 'Delhi NCR',
    ordersCount: 6,
    totalSpent: 34500,
    status: 'Active',
    joinDate: '2025-06-18'
  }
];
