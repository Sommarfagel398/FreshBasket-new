import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import { updateProfileRequest } from '../api/auth';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_REVIEWS, MOCK_PROMOS } from './mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── Auth — delegated to real backend via AuthContext ──────────────────────
  const { user: currentUser, login, signup, logout, updateUser } = useAuth();

  // ── Local state (still mock — integrate incrementally) ────────────────────
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [promos, setPromos] = useState(MOCK_PROMOS);
  const [users, setUsers] = useState([]);

  // ── Fetch users from backend ───────────────────────────────────────────────
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        // Transform backend user data to match frontend expectations
        // Maps: _id→id, full_name→name, generates avatar from DiceBear API
        const transformedUsers = response.data.map(user => ({
          id: user._id,
          name: user.full_name,
          email: user.email,
          phone: user.phone || 'N/A',
          address: user.address || 'N/A',
          role: user.role,
          // Generate consistent avatar based on username/email
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || user.email}`,
          username: user.username,
        }));
        setUsers(transformedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // ── Cart ──────────────────────────────────────────────────────────────────
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  };
  const updateCartQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // ── Favourites ────────────────────────────────────────────────────────────
  const toggleFavourite = (productId) => {
    setFavourites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // ── Orders ────────────────────────────────────────────────────────────────
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      userId: currentUser?.id,
      customerName: currentUser?.name,
      email: currentUser?.email,
      date: new Date().toISOString().split('T')[0],
      status: 'confirmed',
      items: cart.map(i => ({ productId: i.id, name: i.name, qty: i.qty, price: i.price })),
      total: orderData.total,
      deliveryDate: orderData.deliveryDate,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      promoCode: orderData.promoCode || null,
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };
  const updateOrderStatus = (orderId, status) =>
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  const getUserOrders = (userId) => orders.filter(o => o.userId === userId);

  // ── Products ──────────────────────────────────────────────────────────────
  const updateProduct = (id, data) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const addProduct = (data) =>
    setProducts(prev => [...prev, { ...data, id: prev.length + 1, rating: 0, reviews: 0 }]);
  const deleteProduct = (id) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  // ── Reviews ───────────────────────────────────────────────────────────────
  const addReview = (review) => {
    setReviews(prev => [
      ...prev,
      { ...review, id: prev.length + 1, date: new Date().toISOString().split('T')[0] },
    ]);
  };
  const getProductReviews = (productId) => reviews.filter(r => r.productId === productId);

  // ── Promos ────────────────────────────────────────────────────────────────
  const validatePromo = (code, orderTotal) => {
    const promo = promos.find(p => p.code === code && p.active);
    if (!promo) return { valid: false, error: 'Invalid promo code' };
    if (orderTotal < promo.minOrder)
      return { valid: false, error: `Minimum order of $${promo.minOrder} required` };
    return { valid: true, promo };
  };
  const updatePromo = (id, data) =>
    setPromos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const addPromo = (data) =>
    setPromos(prev => [...prev, { ...data, id: prev.length + 1, uses: 0 }]);
  const deletePromo = (id) =>
    setPromos(prev => prev.filter(p => p.id !== id));

  // ── Profile (integrate with backend PATCH endpoint) ──────────────────────
  const updateUserProfile = async (profileData) => {
    try {
      if (!currentUser?.id) throw new Error('User not authenticated');
      
      // Transform form data to match backend field names (name → full_name)
      const updateData = {
        full_name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
      };
      
      // Call backend API to update profile
      const updatedUser = await updateProfileRequest(currentUser.id, updateData);
      
      // Transform backend response to match frontend field names
      const userToStore = {
        ...currentUser,
        name: updatedUser.full_name,
        phone: updatedUser.phone,
        address: updatedUser.address,
      };
      
      // Sync the updated user with AuthContext to refresh currentUser in UI
      updateUser({
        name: updatedUser.full_name,
        phone: updatedUser.phone,
        address: updatedUser.address,
      });
      
      return { success: true, user: userToStore };
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: error.displayMessage || 'Failed to update profile' };
    }
  };

  return (
    <AppContext.Provider value={{
      // auth
      currentUser, login, signup, logout,
      // cart
      cart, addToCart, updateCartQty, removeFromCart, clearCart, cartTotal, cartCount,
      // favourites
      favourites, toggleFavourite,
      // products
      products, updateProduct, addProduct, deleteProduct,
      // orders
      orders, updateOrderStatus, placeOrder, getUserOrders,
      // reviews
      reviews, addReview, getProductReviews,
      // promos
      promos, validatePromo, updatePromo, addPromo, deletePromo,
      // users
      users,
      // profile
      updateUserProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
