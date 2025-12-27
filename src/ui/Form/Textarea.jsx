import React from "react";

/**
 * Upgraded Textarea primitive
 *
 * Same design tokens as Input
 */

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

export default function Textarea({
  value,
  onChange,
  rows = 3,
  placeholder = "",
  size = "md",
  variant = "default",
  radius = "md",
  className = "",
  twin = "",
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.default;
  const r = RADIUS[radius] || RADIUS.md;

  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`
        w-full
        outline-none
        transition
        resize-none
        ${s}
        ${v}
        ${r}
        ${twin}
        ${className}
      `}
      {...rest}
    />
  );
}
