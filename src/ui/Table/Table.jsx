import React from "react";

export function Table({ children, className = "", ...rest }) {
  return (
    <table
      className={`w-full border-collapse text-gray-800 ${className}`}
      {...rest}
    >
      {children}
    </table>
  );
}