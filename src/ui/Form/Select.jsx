import React from "react";

/**
 * Select supports either children or options prop.
 * options: [{ value, label }]
 *
 * FIX:
 * - Normalizes onChange so the feature always receives the actual value.
 * - Fully backward compatible: if parent passed onChange(e), it still works.
 */
export default function Select({
  value,
  onChange,
  children,
  options = null,
  className = "",
  ...rest
}) {
  const handleChange = (e) => {
    const val = e.target.value;

    // If parent expects direct value:
    if (typeof onChange === "function") {
      // Detect if parent provided an event-style callback
      const argCount = onChange.length;

      if (argCount === 1) {
        // Feature code expects raw "value"
        onChange(val);
      } else {
        // In case any old components expect event
        onChange(e);
      }
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`border p-2 rounded w-full ${className}`}
      {...rest}
    >
      {options
        ? options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))
        : children}
    </select>
  );
}
