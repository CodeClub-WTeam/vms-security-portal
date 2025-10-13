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

  // --- Manual validation ---
  const validate = async (code: string) => {
    reset();
    setState("loading");

    try {
      const response = await validateAccessCode(code);

      if (response.success) {
        const data = response.data;
        setResult(data);

        if (data.result === "granted") {
          setState("success");
        } else {
          setState("denied");
          setErrorMessage(data.reason || "Access denied");
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

  // --- QR validation ---
  const validateQR = async (qrData: string) => {
    reset();
    setState("loading");

    try {
      const response = await validateQRAccessCode(qrData);

      if (response.success) {
        const data = response.data;
        setResult(data);

        if (data.result === "granted") {
          setState("success");
        } else {
          setState("denied");
          setErrorMessage(data.reason || "Access denied");
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
// --- Fetch history ---
const fetchHistory = async () => {
  const response = await getRecentValidations();

  if (response.success) {
    // ✅ Extract the actual list of validations
const validations = response.data?.validations || [];

    // ✅ Transform backend field names to match your frontend RecentValidation type
    const formatted = validations.map((v: any) => ({
      id: v.id,
      code: v.code,
      status: v.result === "granted" ? "GRANTED" : "DENIED",
      timestamp: v.validated_at,
      officerId: "", // backend doesn’t return this yet
      visitorName: v.visitor_name,
      residentName: v.resident_name,
    }));

    setHistory(
  data.validations.map((item) => ({
    id: item.id,
    code: item.code,
    result: item.result as "granted" | "denied", // ✅ correct typing
    validated_at: item.validated_at,
    visitor_name: item.visitor_name,
    resident_name: item.resident_name,
    home: item.home,
  }))
);

  } else {
    console.error("Failed to fetch recent validations:", response.error?.message);
  }
};

  useEffect(() => {
    fetchHistory();
  }, []);

  return { state, result, history, errorMessage, validate, validateQR, fetchHistory, reset };
};
