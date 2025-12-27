// src/ui/Layout/Spacer.jsx
import React from "react";

/**
 * Spacer - flexible spacer
 *
 * Props:
 * - size: number (px) | string (CSS unit like "1rem" or "16px") | null
 * - axis: "x" | "y"
 * - flex: boolean (default true) -> uses flex-1 when true and no size provided
 * - as: component tag
 * - className, role, style forwarded
 */
export default function Spacer({
  size = null,
  axis = "x",
  flex = true,
  className = "",
  as: Component = "div",
  role,
  style = {},
  ...rest
}) {
  // If no explicit size and flex enabled => flex spacer
  if (!size) {
    return (
      <Component
        role={role}
        className={`${flex ? "flex-1" : ""} ${className}`}
        style={style}
        {...rest}
      />
    );
  }

  // If size is numeric, treat as pixels
  const resolvedSize =
    typeof size === "number" ? `${size}px` : String(size).trim();

  const sizeStyle =
    axis === "x"
      ? { width: resolvedSize, minWidth: resolvedSize, ...style }
      : { height: resolvedSize, minHeight: resolvedSize, ...style };

  return (
    <Component role={role} className={className} style={sizeStyle} {...rest} />
  );
}
