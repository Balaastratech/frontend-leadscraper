import React from "react";

export function TableRow({ children, hover = false, selected = false, className = "", ...rest }) {
  return (
    <tr
      className={`
        ${hover ? "hover:bg-gray-50 cursor-pointer" : ""}
        ${selected ? "bg-blue-50" : ""}
        border-b
        ${className}
      `}
      {...rest}
    >
      {children}
    </tr>
  );
}