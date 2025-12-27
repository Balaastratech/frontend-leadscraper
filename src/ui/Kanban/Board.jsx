import React from "react";

/**
 * Horizontal board wrapper with optional overflow handling.
 * Props:
 * - gap: spacing between columns (tailwind token or plain px class)
 * - twin: override
 */
export default function Board({ children, gap = "gap-4", twin = "", className = "", as: Component = "div", ...rest }) {
  return (
    <Component
      className={`flex ${gap} overflow-x-auto ${className} ${twin}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
