import React from "react";
import { MAX_FILE_SIZE, ACCEPTED_TYPES } from "../utils/csvConstants";

export function useCsvFileValidation() {
  const validateFile = (file) => {
    if (!file) return { valid: false, message: "No file selected" };

    const ext = file.name.toLowerCase().split(".").pop();
    const validType = ACCEPTED_TYPES.some(
      t => file.type.includes(t) || t === `.${ext}`
    );

    if (!validType) {
      return { valid: false, message: "Invalid file type. Use CSV only." };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        message: `File too large. Max ${MAX_FILE_SIZE / 1024 / 1024}MB`
      };
    }

    return { valid: true };
  };

  return { validateFile };
}
