// src/ui/Layout/Panel.jsx
import React from "react";

/**
 * Panel — generic surface wrapper.
 * Presentation-only. No business logic.
 *
 * Props:
 * - width, height → CSS size values
 * - shadow → boolean
 * - rounded → boolean
 * - background → CSS color value
 */
export default function Panel({
  children,
  className = "",
  style = {},
  role,
  ariaLabel,
  width,
  height,
  shadow = true,
  rounded = true,
  background,
  as: Component = "div",
  ...rest
}) {
  const base = [
    "p-0",
    shadow ? "shadow-lg" : "",
    rounded ? "rounded-lg" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sizeStyle = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(background ? { background } : {}),
    ...style,
  };

  return (
    <Component
      role={role}
      aria-label={ariaLabel}
      className={`${base} ${className}`}
      style={sizeStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}
