import axios, { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';
import { API_BASE_URL } from '@/types/api';

const TOKEN_KEY = 'vms-security-token';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

// ✅ Check and warn if API_BASE_URL is missing
if (!API_BASE_URL) {
  console.warn(
    '⚠️ Warning: VITE_API_BASE_URL is not defined. Please check your .env file or restart the dev server.'
  );
}

// ✅ Log which API base is being used (for debugging)
console.log('🔗 Using API base URL:', API_BASE_URL);

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (
      axiosError.response?.data &&
      'success' in axiosError.response.data &&
      axiosError.response.data.success === false
    ) {
      return axiosError.response.data;
    }
    return {
      success: false,
      error: {
        code: error.code || 'NETWORK_ERROR',
        message: axiosError.message,
      },
    };
  }
  return {
    success: false,
    error: {
      code: 'UNKNOWN_ERROR',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred.',
    },
  };
};
