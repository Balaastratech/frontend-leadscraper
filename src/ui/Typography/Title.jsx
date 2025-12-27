import React from "react";

const SIZE = { base: "text-base font-semibold", lg: "text-lg font-semibold", xl: "text-xl font-semibold" };

export default function Title({ children, size = "base", className = "", as: Component = "div", ...rest }) {
  return (
    <Component className={`${SIZE[size] || SIZE.base} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
