// src/features/auth/types.ts

/** Defines the possible roles for a security portal user. */
export type UserRole = 'security_officer' | 'admin';

/** Interface representing a fully authenticated user. */
export interface SecurityUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  // Add any other necessary user properties (e.g., stationId)
}

/** Interface for the data sent during a login attempt. */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Interface for the data received upon a successful login request. */
export interface LoginSuccessData {
  token: string;
  user: SecurityUser;
}