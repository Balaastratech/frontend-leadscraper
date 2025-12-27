import React from "react";

const SIZES = {
  sm: "text-sm px-2 py-1.5",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
};

const VARIANTS = {
  default:
    "bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/40",
  subtle:
    "bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40",
  filled:
    "bg-gray-100 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/40",
};

const RADIUS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export default function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  size = "md",
  variant = "default",
  radius = "md",
  className = "",
  twin = "",
  error, // ✅ Destructure error here to exclude it from ...rest
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.default;
  const r = RADIUS[radius] || RADIUS.md;

  // Optional: Add error styling if error prop is provided
  const errorClass = error ? "border-red-500 focus:border-red-500 focus:ring-red-400/40" : "";

  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          outline-none
          transition
          ${s}
          ${v}
          ${r}
          ${errorClass}
          ${twin}
          ${className}
        `}
        {...rest}
      />
      {error && typeof error === 'string' && (
        <span className="mt-1 block text-sm text-red-600">{error}</span>
      )}
    </div>
  );
}