// src/api/authApi.js
import { request } from './index';

// Register user
export const registerUser = (data) => {
  return request('/users/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Login user
export const loginUser = (data) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Get me
export const fetchMe = () => request("/users/me", { method: "GET" });