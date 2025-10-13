// src/features/validation/validationTypes.ts

import type { ApiErrorResponse, ApiResponse } from "@/types/api";

/** Structure of the data returned on a successful code validation. */
export interface ValidationResult {
  result: "granted" | "denied";
  reason: string;
  reason_code?: string;
  code: string;
  accessCodeId: string;
  residentId: string;
  validated_at: string;

  // Optional UI-related display data (if frontend uses them)
  visitorName?: string;
  residentName?: string;
  homeDetails?: {
    plotNumber?: string;
    street?: string;
  };
}

/** Structure for a recent validation log entry. */
export interface RecentValidation {
  id: string;
  code: string;
  result: "granted" | "denied";
  visitor_name: string;
  resident_name: string;
  home: string;
  validated_at: string;
}

/** Unified type for validation API responses */
export type ValidationResponse = ApiResponse<ValidationResult> | ApiErrorResponse;
