import React from "react";

/**
 * Skeleton system: default export + named exports SkeletonLine, SkeletonParagraph
 * All classes explicit to avoid Tailwind purge issues.
 */
export default function Skeleton({ width = "full", height = "4", className = "", children, as: Component = "div", ...rest }) {
  const w = width === "full" ? "w-full" : `w-${width}`;
  const h = height ? `h-${height}` : "";
  return (
    <Component className={`animate-pulse ${className}`} {...rest}>
      {children ? children : <div className={`bg-gray-200 rounded ${w} ${h}`} />}
    </Component>
  );
}

export function SkeletonLine({ width = "full", className = "", as: Component = "div", ...rest }) {
  const w = width === "full" ? "w-full" : `w-${width}`;
  return <Component className={`bg-gray-200 h-4 rounded ${w} ${className} animate-pulse`} {...rest} />;
}

export function SkeletonParagraph({ lines = 3, className = "", as: Component = "div", ...rest }) {
  return (
    <Component className={`space-y-2 animate-pulse ${className}`} {...rest}>
      {Array.from({ length: lines }).map((_, i) => <div key={i} className="h-3 bg-gray-200 rounded w-full" />)}
    </Component>
  );
}
