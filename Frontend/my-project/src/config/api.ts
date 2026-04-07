// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER_STUDENT: `${API_BASE_URL}/auth/register/student`,
  REGISTER_CANTEEN: `${API_BASE_URL}/auth/register/canteen`,
  
  // Payment endpoints
  PAYMENT_KEY: `${API_BASE_URL}/api/payment/key`,
  PAYMENT_CREATE_ORDER: `${API_BASE_URL}/api/payment/create-order`,
  PAYMENT_VERIFY: `${API_BASE_URL}/api/payment/verify`,
  
  // Student endpoints
  STUDENT_INFO: `${API_BASE_URL}/Student/info`,
  
  // Canteen endpoints
  CANTEEN_INFO: `${API_BASE_URL}/Canteen/info`,
};

export default API_BASE_URL;
