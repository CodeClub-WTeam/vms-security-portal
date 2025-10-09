// src/features/auth/authService.ts

import { apiClient, handleApiError } from '@/api/apiClient';
import type { LoginPayload, LoginSuccessData, SecurityUser } from '@/features/auth/types'; // Uses types you defined
import type { ApiResponse } from '@/types/api';

const AUTH_URL = '/auth';

/**
 * Handles the login request to the backend.
 * POST /auth/security/login
 * @param payload - User's email and password.
 * @returns An object containing the JWT token and user data on success.
 * @throws An error if the API call fails or returns an error response.
 */
export async function login(payload: LoginPayload): Promise<LoginSuccessData> {
  try {
    const response = await apiClient.post<ApiResponse<LoginSuccessData>>(`${AUTH_URL}/security/login`, payload);
    
    if (response.data.success) {
      return response.data.data;
    }
    // This case should ideally be caught by handleApiError during a 4xx response, 
    // but included for type safety.
    throw new Error('Login failed: Invalid server response.');
    
  } catch (error) {
    // Use the handleApiError utility to standardize the response
    const apiError = handleApiError(error);
    
    // Throw a generic error for the useAuth hook to catch
    throw new Error(apiError.error.message);
  }
}

/**
 * Fetches the currently authenticated user's details.
 * GET /auth/me
 * @returns The current user's data.
 * @throws An error if the API call fails.
 */
export async function getCurrentUser(): Promise<SecurityUser> {
  try {
    const response = await apiClient.get<ApiResponse<SecurityUser>>(`${AUTH_URL}/verify`);
    
    if (response.data.success) {
      return response.data.data;
    }
    
    throw new Error('Failed to retrieve current user details.');
  } catch (error) {
    const apiError = handleApiError(error);
    throw new Error(apiError.error.message);
  }
}