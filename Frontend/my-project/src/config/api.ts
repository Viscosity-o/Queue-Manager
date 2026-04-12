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
  STUDENT_CANTEENS: `${API_BASE_URL}/Student/canteens`,
  STUDENT_SEARCH_CANTEEN: `${API_BASE_URL}/Student/canteen/search`,
  
  // Canteen endpoints
  CANTEEN_INFO: `${API_BASE_URL}/Canteen/info`,
  
  // Staff Dashboard endpoints
  STAFF_DASHBOARD_STATS: `${API_BASE_URL}/staff/dashboard/stats`,
  STAFF_INVENTORY: `${API_BASE_URL}/staff/inventory`,
  STAFF_MENU: `${API_BASE_URL}/staff/menu`,
};

export default API_BASE_URL;
