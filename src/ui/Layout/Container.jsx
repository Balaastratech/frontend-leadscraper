// src/ui/Layout/Container.jsx
import React from "react";

export default function Container({
  children,
  className = "",
  as: Component = "div",
  role,
  ...props
}) {
  return (
    <Component
      role={role}
      className={`w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
