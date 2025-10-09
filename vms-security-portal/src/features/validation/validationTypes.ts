// src/features/validation/validationTypes.ts

import type { ApiErrorResponse, ApiResponse } from "@/types/api"; // <--- FIX 2

/** Structure of the data returned on a successful code validation. */
export interface ValidationResult {
  isValid: boolean;
  message: string;
  visitorName: string;
  residentName: string;
  homeDetails: {
    plotNumber: string;
    street: string;
    // Add other relevant home fields
  };
}

/** Structure for a recent validation log entry. */
export interface RecentValidation {
  id: string;
  code: string;
  status: 'GRANTED' | 'DENIED';
  timestamp: string;
  officerId: string;
  visitorName: string;
  residentName: string; // 

}

export type ValidationResponse = ApiResponse<ValidationResult> | ApiErrorResponse;