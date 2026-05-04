import axios from './axios';

/**
 * Sign in with email + password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ user: Object, token: string }>}
 */
export const loginRequest = (email, password) =>
  axios.post('/users/login', { email: email, password }).then((res) => res.data);

/**
 * Register a new account.
 * @param {{ name: string, email: string, phone: string, address: string, password: string }} data
 * @returns {Promise<{ user: Object, token: string }>}
 */
export const signupRequest = (data) =>
  axios.post('/users/signup', data).then((res) => res.data);

/**
 * Update user profile.
 * @param {string} userId - User ID from currentUser
 * @param {{ full_name: string, phone: string, address: string }} data
 * @returns {Promise<{ Object }>}
 */
export const updateProfileRequest = (userId, data) =>
  axios.patch(`/users/${userId}`, data).then((res) => res.data);
