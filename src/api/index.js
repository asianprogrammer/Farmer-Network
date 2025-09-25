import config from "../../config";
import {getToken} from "@/utils/Auth";

const BASE_URL = config.backendUrl;

// Generic request function
export const request = async (endpoint, options = {}) => {
  const baseUrl = config.backendUrl; // backend URL
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // যদি token থাকে, attach কর
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(baseUrl + endpoint, {
    ...options,
    headers,
  });

  // যদি backend 200 ছাড়া response দেয়, error handle কর
  const data = await res.json();
  if (!res.ok) throw data;

  return data;
};