import React from "react";

const SIZE = { xs: "text-xs", sm: "text-sm", base: "text-base" };
const COLOR = { muted: "text-gray-500", normal: "text-gray-800" };

export default function Text({ 
  children, 
  size = "sm", 
  color = "normal", 
  className = "", 
  as: Component = "div",
  uppercase = false,  // ✅ Add this
  ...rest 
}) {
  return (
    <Component 
      className={`
        ${SIZE[size] || SIZE.sm} 
        ${COLOR[color] || COLOR.normal}
        ${uppercase ? 'uppercase' : ''}  // ✅ Add uppercase class
        ${className}
      `} 
      {...rest}
    >
      {children}
    </Component>
  );
}