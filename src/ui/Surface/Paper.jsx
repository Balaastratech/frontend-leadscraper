import React from "react";

/**
 * Paper primitive: thin surface wrapper
 */
export default function Paper({ children, className = "", padding = "p-4", ...rest }) {
  return (
    <div className={`bg-white rounded-md shadow-card ${padding} ${className}`} {...rest}>
      {children}
    </div>
  );
}
