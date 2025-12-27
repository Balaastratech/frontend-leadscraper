// src/ui/Layout/Col.jsx
import React from "react";

export default function Col({
  children,
  as: Component = "div",
  className = "",
  role,
  ...rest
}) {
  return (
    <Component
      role={role}
      className={`flex flex-col ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
