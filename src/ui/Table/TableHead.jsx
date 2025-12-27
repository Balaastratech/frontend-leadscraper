import React from "react";

export function TableHead({ children, className = "", ...rest }) {
  return (
    <thead className={className} {...rest}>
      {children}
    </thead>
  );
}
