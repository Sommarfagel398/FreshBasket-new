// LOGO
export const LOGO_URL = '/public/freshbasket.png';

// ── Products ─────────────────────────────────────────────────────────────────
export const MOCK_PRODUCTS = [
  // FRUITS
  { id: 1,  name: 'Organic Red Apple',      category: 'fruits',     price: 180, unit: 'per kg',      stock: 150, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80',    badge: 'Organic',    rating: 4.8, reviews: 124, description: 'Crisp and juicy organic red apples, freshly harvested. Rich in fiber and antioxidants. Perfect for snacking or baking.',        tags: ['organic', 'seasonal'],      featured: true  },
  { id: 2,  name: 'Alphonso Mango',         category: 'fruits',     price: 250, unit: 'per kg',      stock: 80,  image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80',    badge: 'Seasonal',   rating: 4.9, reviews: 89,  description: 'The king of mangoes. Sweet, rich, and aromatic Alphonso mangoes from Maharashtra. Limited seasonal availability.',            tags: ['seasonal', 'premium'],      featured: true  },
  { id: 3,  name: 'Cavendish Banana',       category: 'fruits',     price: 120, unit: 'per bunch',   stock: 200, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80',    badge: null,         rating: 4.5, reviews: 210, description: 'Premium Cavendish bananas, perfectly ripened. High in potassium and natural energy. Great for smoothies.',                      tags: ['everyday'],                 featured: false },
  { id: 4,  name: 'Fresh Strawberries',     category: 'fruits',     price: 280, unit: 'per 500g',    stock: 60,  image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80',    badge: 'Fresh Pick', rating: 4.7, reviews: 156, description: 'Sweet, plump strawberries picked at peak ripeness. Bursting with vitamin C and natural sweetness.',                           tags: ['fresh', 'seasonal'],        featured: true  },
  { id: 5,  name: 'Wild Blueberries',       category: 'fruits',     price: 350, unit: 'per 250g',    stock: 45,  image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&q=80',    badge: 'Premium',    rating: 4.9, reviews: 78,  description: 'Antioxidant-rich wild blueberries. Smaller and more flavourful than cultivated varieties.',                                      tags: ['premium', 'superfood'],     featured: false },
  { id: 6,  name: 'Navel Orange',           category: 'fruits',     price: 160, unit: 'per kg',      stock: 120, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&q=80',    badge: null,         rating: 4.6, reviews: 93,  description: 'Juicy seedless navel oranges packed with vitamin C. Perfect for fresh-squeezed juice.',                                         tags: ['everyday', 'vitamin-c'],    featured: false },
  { id: 7,  name: 'Red Seedless Grapes',    category: 'fruits',     price: 220, unit: 'per kg',      stock: 70,  image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&q=80',    badge: 'Organic',    rating: 4.7, reviews: 64,  description: 'Plump, sweet red seedless grapes. Organically grown with no pesticides.',                                                         tags: ['organic'],                  featured: false },
  { id: 8,  name: 'Seedless Watermelon',    category: 'fruits',     price: 180, unit: 'each',        stock: 30,  image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=500&q=80',    badge: 'Seasonal',   rating: 4.8, reviews: 112, description: 'Giant, refreshing seedless watermelons. Perfect for summer entertaining.',                                                      tags: ['seasonal', 'large'],        featured: true  },
  { id: 9,  name: 'Golden Pineapple',       category: 'fruits',     price: 90, unit: 'each',        stock: 40,  image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=500&q=80',    badge: null,         rating: 4.6, reviews: 55,  description: 'Sweet, golden pineapples from tropical farms. Rich in bromelain and vitamin C.',                                                  tags: ['tropical'],                 featured: false },
  { id: 10, name: 'Hass Avocado',           category: 'fruits',     price: 80, unit: 'each',        stock: 90,  image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80',    badge: 'Popular',    rating: 4.8, reviews: 187, description: 'Creamy Hass avocados, perfectly ripened. Rich in healthy fats and nutrients.',                                                     tags: ['popular', 'everyday'],      featured: true  },
  // VEGETABLES
  { id: 11, name: 'Organic Baby Carrots',   category: 'vegetables', price: 90, unit: 'per 500g',    stock: 160, image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500&q=80',    badge: 'Organic',    rating: 4.7, reviews: 143, description: 'Sweet, tender organic baby carrots. Washed and ready to eat. High in beta-carotene.',                                           tags: ['organic', 'ready-to-eat'],  featured: false },
  { id: 12, name: 'Baby Spinach',           category: 'vegetables', price: 120, unit: 'per 200g',    stock: 80,  image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80',    badge: 'Organic',    rating: 4.8, reviews: 98,  description: 'Tender organic baby spinach leaves. Rich in iron, calcium, and vitamins A & K.',                                                  tags: ['organic', 'superfood'],     featured: true  },
  { id: 13, name: 'Broccoli Crown',         category: 'vegetables', price: 85, unit: 'each',        stock: 100, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80',    badge: null,         rating: 4.6, reviews: 76,  description: 'Large, vibrant broccoli crowns. Packed with vitamins C and K, and fiber.',                                                        tags: ['everyday'],                 featured: false },
  { id: 14, name: 'Heirloom Tomatoes',      category: 'vegetables', price: 160, unit: 'per kg',      stock: 55,  image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&q=80',    badge: 'Heirloom',   rating: 4.9, reviews: 67,  description: 'A colorful medley of heirloom tomatoes. Complex, rich flavors unlike any regular tomato.',                                       tags: ['premium', 'heirloom'],      featured: true  },
  { id: 15, name: 'English Cucumber',       category: 'vegetables', price: 50, unit: 'each',        stock: 130, image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&q=80',    badge: null,         rating: 4.5, reviews: 88,  description: 'Long, crisp English cucumbers. Mild flavour, thin skin, virtually seedless.',                                                      tags: ['everyday'],                 featured: false },
  { id: 16, name: 'Tri-Colour Bell Peppers',category: 'vegetables', price: 150, unit: 'per pack (3)',stock: 75,  image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&q=80',    badge: 'Popular',    rating: 4.7, reviews: 102, description: 'Sweet red, yellow, and orange bell peppers in one pack. Perfect for stir-fries.',                                                tags: ['popular', 'colourful'],     featured: false },
  { id: 17, name: 'Tuscan Kale',            category: 'vegetables', price: 110, unit: 'per bunch',   stock: 65,  image: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=500&q=80',    badge: 'Superfood',  rating: 4.8, reviews: 59,  description: 'Dark, earthy Tuscan (dinosaur) kale. A nutrient powerhouse perfect for salads and smoothies.',                                   tags: ['superfood', 'organic'],     featured: false },
  { id: 18, name: 'Butter Lettuce',         category: 'vegetables', price: 70, unit: 'per head',    stock: 90,  image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=500&q=80',    badge: null,         rating: 4.4, reviews: 44,  description: 'Soft, tender butter lettuce heads. Mild, sweet flavour perfect for salads.',                                                      tags: ['everyday'],                 featured: false },
  { id: 19, name: 'Sweet Corn',             category: 'vegetables', price: 25, unit: 'each',        stock: 200, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&q=80',    badge: 'Seasonal',   rating: 4.7, reviews: 167, description: 'Fresh, sweet corn on the cob. Picked at peak sweetness for maximum flavour.',                                                    tags: ['seasonal', 'everyday'],     featured: false },
  { id: 20, name: 'Portobello Mushrooms',   category: 'vegetables', price: 180, unit: 'per 250g',    stock: 50,  image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=500&q=80',    badge: 'Premium',    rating: 4.8, reviews: 73,  description: 'Meaty portobello mushrooms. Perfect for grilling, stuffing, or as a meat alternative.',                                          tags: ['premium'],                  featured: true  },
];

// ── Orders ────────────────────────────────────────────────────────────────────
export const MOCK_ORDERS = [
  { id: 'ORD-001', userId: null, customerName: 'Rixcie Cabatana',     email: 'rixcie@gmail.com', date: '2026-04-10', status: 'delivering', items: [{ productId: 1,  name: 'Organic Red Apple',   qty: 2, price: 3.99 }, { productId: 12, name: 'Baby Spinach',       qty: 1, price: 3.49 }], total: 11.47, deliveryDate: '2026-04-12', address: '456 Oak Street, Sunnyvale',    paymentMethod: 'card', promoCode: null       },
  { id: 'ORD-002', userId: null, customerName: 'Frydrich Cabatana',   email: 'frydrich@gmail.com',             date: '2026-04-09', status: 'packing',    items: [{ productId: 2,  name: 'Alphonso Mango',      qty: 1, price: 6.99 }, { productId: 8,  name: 'Seedless Watermelon', qty: 1, price: 8.99 }, { productId: 10, name: 'Hass Avocado', qty: 3, price: 2.49 }], total: 23.45, deliveryDate: '2026-04-11', address: '789 Maple Ave, Springfield',  paymentMethod: 'card', promoCode: 'FRESH10'  },
  { id: 'ORD-003', userId: null, customerName: 'Xian Cabatana', email: 'xian@gmail.com',            date: '2026-04-08', status: 'confirmed',  items: [{ productId: 14, name: 'Heirloom Tomatoes',    qty: 2, price: 5.99 }, { productId: 16, name: 'Bell Peppers',       qty: 1, price: 4.99 }], total: 16.97, deliveryDate: '2026-04-13', address: '321 Pine Lane, Riverdale',    paymentMethod: 'cash', promoCode: null       },
  { id: 'ORD-004', userId: null, customerName: 'Nailah Cabtana',     email: 'nailah@gmail.com', date: '2026-04-07', status: 'delivered',  items: [{ productId: 4,  name: 'Fresh Strawberries',  qty: 2, price: 5.49 }, { productId: 5,  name: 'Wild Blueberries',   qty: 1, price: 7.99 }], total: 18.97, deliveryDate: '2026-04-09', address: '456 Oak Street, Sunnyvale',    paymentMethod: 'card', promoCode: null       },
  { id: 'ORD-005', userId: null, customerName: 'Adhara Cabatana',   email: 'adhara@gmail.com',             date: '2026-04-06', status: 'delivered',  items: [{ productId: 11, name: 'Organic Baby Carrots', qty: 3, price: 2.99 }, { productId: 13, name: 'Broccoli Crown',     qty: 2, price: 3.29 }], total: 15.55, deliveryDate: '2026-04-08', address: '789 Maple Ave, Springfield',  paymentMethod: 'card', promoCode: 'VEGGIE15' },
];

// ── Reviews ───────────────────────────────────────────────────────────────────
export const MOCK_REVIEWS = [
  { id: 1, productId: 1,  userId: null, userName: 'Rixcie C.',   rating: 5, comment: "These apples are incredibly fresh! Best I've ever tasted.", date: '2026-04-05' },
  { id: 2, productId: 1,  userId: null, userName: 'Frydrich C.',   rating: 4, comment: 'Great quality, arrived in perfect condition.',              date: '2026-04-03' },
  { id: 3, productId: 2,  userId: null, userName: 'Xian C.',  rating: 5, comment: 'Alphonso mangoes are divine! So sweet and aromatic.',       date: '2026-04-01' },
  { id: 4, productId: 12, userId: null, userName: 'Nailah C.',   rating: 5, comment: 'Perfect baby spinach, very fresh and crispy.',              date: '2026-03-28' },
  { id: 5, productId: 10, userId: null, userName: 'Adhara C.',   rating: 5, comment: 'Perfectly ripe avocados. Will order again!',               date: '2026-03-25' },
];

// ── Promos ────────────────────────────────────────────────────────────────────
export const MOCK_PROMOS = [
  { id: 1, code: 'FRESH10',  discount: 10, type: 'percentage', minOrder: 500, active: true,  uses: 45,  maxUses: 100, expiresAt: '2026-05-01' },
  { id: 2, code: 'VEGGIE15', discount: 15, type: 'percentage', minOrder: 700, active: true,  uses: 23,  maxUses: 50,  expiresAt: '2026-04-30' },
  { id: 3, code: 'WELCOME50', discount: 50, type: 'fixed',      minOrder: 300, active: true,  uses: 112, maxUses: 500, expiresAt: '2026-12-31' },
  { id: 4, code: 'SUMMER20', discount: 20, type: 'percentage', minOrder: 1000, active: false, uses: 88,  maxUses: 200, expiresAt: '2026-03-31' },
];

// ── Static reference data ─────────────────────────────────────────────────────
export const DELIVERY_ZONES = [
  { id: 1, name: 'Zone A - City Centre', fee: 50,  minOrder: 500, estimatedTime: 'Same Day' },
  { id: 2, name: 'Zone B - Suburbs',     fee: 80,  minOrder: 700, estimatedTime: 'Next Day' },
  { id: 3, name: 'Zone C - Outer Areas', fee: 120, minOrder: 1000, estimatedTime: '2-3 Days' },
];

export const CATEGORIES = [
  { id: 'all',        label: 'All Products', icon: 'bi-grid-3x3-gap' },
  { id: 'fruits',     label: 'Fresh Fruits', icon: 'bi-apple'        },
  { id: 'vegetables', label: 'Vegetables',   icon: 'bi-flower1'      },
];

export const ORDER_STATUSES = ['confirmed', 'packing', 'delivering', 'delivered', 'cancelled'];

export const ANALYTICS = {
  totalRevenue:   624800,   
  totalOrders:    248,
  totalCustomers: 156,
  avgOrderValue:  2520,     

  revenueByMonth: [
    { month: 'Nov', revenue: 420000 },
    { month: 'Dec', revenue: 510000 },
    { month: 'Jan', revenue: 480000 },
    { month: 'Feb', revenue: 560000 },
    { month: 'Mar', revenue: 545000 },
    { month: 'Apr', revenue: 624800 },
  ],

  topProducts: [
    { name: 'Hass Avocado',      sales: 187 },
    { name: 'Organic Red Apple', sales: 154 },
    { name: 'Alphonso Mango',    sales: 138 },
    { name: 'Sweet Corn',        sales: 127 },
    { name: 'Baby Spinach',      sales: 118 },
  ],
};
