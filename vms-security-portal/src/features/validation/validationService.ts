// src/features/validation/validationService.ts

import { apiClient, handleApiError } from "@/api/apiClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api";
import type { ValidationResult, ValidationResponse, RecentValidation } from "./validationTypes";

const SECURITY_URL = "/security";

/**
 * Validate a manually entered 5-character access code.
 * POST /security/validate
 */
export async function validateAccessCode(code: string): Promise<ValidationResponse> {
  try {
    const response = await apiClient.post<ApiResponse<ValidationResult>>(
      `${SECURITY_URL}/validate`,
      { code }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Validate a QR code scanned by the security officer.
 * POST /security/validate-qr
 */
export async function validateQRAccessCode(qrData: string): Promise<ValidationResponse> {
  try {
    // backend expects { qr_data: "XY4P9" }
    const response = await apiClient.post<ApiResponse<ValidationResult>>(
      `${SECURITY_URL}/validate-qr`,
      { qr_data: qrData }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Fetch recent validation logs by this security officer.
 * GET /security/recent-validations
 */
export async function getRecentValidations():
  Promise<ApiResponse<{ validations: RecentValidation[] }> | ApiErrorResponse> {
  try {
    const response = await apiClient.get<ApiResponse<{ validations: RecentValidation[] }>>(
      `${SECURITY_URL}/recent-validations`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
  
