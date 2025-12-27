// src/ui/Form/Checkbox.jsx
import React from "react";

/**
 * Simple accessible Checkbox primitive.
 *
 * Props:
 * - checked, onChange, id, label, disabled, className
 *
 * Visual tokens are here so features remain markup-free.
 */
export default function Checkbox({
  checked,
  onChange,
  id,
  label,
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2 cursor-pointer ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        className="form-checkbox h-4 w-4 rounded border-gray-300"
        checked={!!checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
        {...rest}
      />
      {label ? <span className="text-sm select-none">{label}</span> : null}
    </label>
  );
}
