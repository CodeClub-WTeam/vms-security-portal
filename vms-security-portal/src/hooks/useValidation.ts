// src/hooks/useValidation.ts

import { useState, useEffect } from "react";
import {
  validateAccessCode,
  validateQRAccessCode,
  getRecentValidations,
} from "@/features/validation/validationService";
import type { ValidationResult, RecentValidation } from "@/features/validation/validationTypes";

type ValidationState = "idle" | "loading" | "success" | "denied" | "error";

interface ValidationHook {
  state: ValidationState;
  result: ValidationResult | null;
  history: RecentValidation[];
  errorMessage: string | null;
  validate: (code: string) => Promise<void>;
  validateQR: (qrData: string) => Promise<void>;
  fetchHistory: () => Promise<void>;
  reset: () => void;
}

export const useValidation = (): ValidationHook => {
  const [state, setState] = useState<ValidationState>("idle");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [history, setHistory] = useState<RecentValidation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reset = () => {
    setState("idle");
    setResult(null);
    setErrorMessage(null);
  };

  // ✅ Manual validation
  const validate = async (code: string) => {
    reset();
    setState("loading");

    try {
      const response = await validateAccessCode(code);

      if (response.success) {
        setResult(response.data);

if (response.data.isValid) {
          setState("success");
        } else {
          setState("denied");
          setErrorMessage(response.data.message || "Access denied");
        }
      } else {
        setState("error");
        setErrorMessage(response.error?.message || "Validation failed");
      }
    } catch (err) {
      setState("error");
      setErrorMessage("A network error occurred.");
    } finally {
      fetchHistory();
    }
  };

  // ✅ QR code validation
  const validateQR = async (qrData: string) => {
    reset();
    setState("loading");

    try {
      const response = await validateQRAccessCode(qrData);

      if (response.success) {
        setResult(response.data);

if (response.data.isValid) {
          setState("success");
        } else {
          setState("denied");
          setErrorMessage(response.data.message || "Access denied");
        }
      } else {
        setState("error");
        setErrorMessage(response.error?.message || "Validation failed");
      }
    } catch (err) {
      setState("error");
      setErrorMessage("A network error occurred.");
    } finally {
      fetchHistory();
    }
  };

  // ✅ Fetch validation history
  const fetchHistory = async () => {
    if (state === "idle") setState("loading");

    const response = await getRecentValidations();

    if (response.success) {
      setHistory(response.data);
    } else {
      console.error("Failed to fetch recent validations:", response.error.message);
    }

    if (state === "loading") setState("idle");
  };

  // ✅ Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  return { state, result, history, errorMessage, validate, validateQR, fetchHistory, reset };
};
