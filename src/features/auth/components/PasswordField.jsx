import React, { useState, useMemo } from "react";

/*
  Reusable password component
  Props:
    - label: string
    - value: string
    - onChange: (value) => void
    - showStrength: boolean (optional)
    - showConfirm: boolean (optional)
    - error: string (optional)
    - ariaLabel: string (optional)
*/

export default function PasswordField({
  label = "Password",
  value,
  onChange,
  showStrength = false,
  error = null,
  ariaLabel = "password"
}) {
  const [show, setShow] = useState(false);

  // Simple strength estimation
  const strength = useMemo(() => {
    if (!showStrength || !value) return null;

    let score = 0;
    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) return { text: "Weak", color: "text-red-500" };
    if (score <= 3) return { text: "Medium", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-600" };
  }, [value, showStrength]);

  return (
    <div className="mb-md">
      <label className="block mb-xs relative">
        <span className="text-sm text-secondary">{label}</span>

        {/* Password input */}
        <input
          aria-label={ariaLabel}
          type={show ? "text" : "password"}
          className="w-full px-sm py-xs border rounded-md mt-xs pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />

        {/* Eye toggle */}
        <button
          type="button"
          aria-label="toggle password visibility"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-9 text-secondary"
        >
          {show ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18" />
              <path stroke="currentColor" strokeWidth="2" d="M5 12a7.5 7.5 0 0112.34-3.9" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>

      </label>

      {/* Strength meter */}
      {strength && (
        <p className={`text-xs mt-xs ${strength.color}`}>{strength.text} password</p>
      )}

      {/* Error message */}
      {error && <p className="text-red-600 text-sm mt-xs">{error}</p>}
    </div>
  );
}
