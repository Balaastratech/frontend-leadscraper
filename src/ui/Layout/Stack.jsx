// src/ui/Layout/Stack.jsx
import React, { forwardRef } from "react";

const GAP = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
};

const SPACE = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
  "2xl": "gap-8",
  "3xl": "gap-10",
  "4xl": "gap-12",
};

function resolveSpace(space, fallbackGap) {
  if (space == null) return GAP[String(fallbackGap)] || GAP["4"];

  if (typeof space === "string") {
    return SPACE[space] || SPACE.md;
  }

  if (typeof space === "object") {
    const base = SPACE[space.base] || SPACE.md;
    const md = space.md ? `md:${SPACE[space.md]}` : "";
    const lg = space.lg ? `lg:${SPACE[space.lg]}` : "";
    return `${base} ${md} ${lg}`;
  }

  return SPACE.md;
}

const ALIGN = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const JUSTIFY = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const Stack = forwardRef(({
  flex = false,
  children,
  gap = "4",
  space = null,
  align = "start",
  justify = "start",
  wrap = false,
  direction = "vertical",
  twin = "",
  as: Component = "div",
  className = "",
  role,
  ...rest
}, ref) => {
  const gapCls = resolveSpace(space, gap);
  const alignCls = ALIGN[align] || ALIGN.start;
  const justifyCls = JUSTIFY[justify] || JUSTIFY.start;
  const dirCls = direction === "horizontal" ? "flex-row" : "flex-col";
  const wrapCls = wrap ? "flex-wrap" : "";

  return (
    <Component
      role={role}
      ref={ref} // ✅ Forward the ref to the root element
      className={`
        ${flex ? "flex" : ""}
        ${dirCls}
        ${gapCls}
        ${alignCls}
        ${justifyCls}
        ${wrapCls}
        ${twin}
        ${className}
      `}
      {...rest}
    >
      {children}
    </Component>
  );
});

Stack.displayName = "Stack"; // ✅ Good practice for debugging

export default Stack;