import React, { useState, useMemo } from "react";

export default function AuthPasswordField({
  label = "Password",
  value,
  onChange,
  showStrength = false,
  error = null,
  ariaLabel = "password"
}) {
  const [show, setShow] = useState(false);

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
    return { text: "Strong", color: "text-green-500" };
  }, [value, showStrength]);

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm text-zinc-400 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          aria-label={ariaLabel}
          type={show ? "text" : "password"}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-indigo-500 pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />

        <button
          type="button"
          aria-label="toggle password visibility"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
        >
          {show ? (
            // HIDE ICON
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18" />
              <path stroke="currentColor" strokeWidth="2" d="M5 12a7.5 7.5 0 0112.34-3.9" />
            </svg>
          ) : (
            // SHOW ICON
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {strength && (
        <p className={`text-xs mt-1 ${strength.color}`}>
          {strength.text} password
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
