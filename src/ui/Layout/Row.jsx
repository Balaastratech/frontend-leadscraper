// src/ui/Layout/Row.jsx
import React from "react";

const GAP_ROW = {
  "0": "space-x-0",
  "1": "space-x-1",
  "2": "space-x-2",
  "3": "space-x-3",
  "4": "space-x-4",
  "5": "space-x-5",
  "6": "space-x-6",
  "8": "space-x-8",
  "10": "space-x-10",
  "12": "space-x-12",
};

const ALIGN_ROW = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

const JUSTIFY_ROW = {
  start: "justify-start",
  center: "justify-center",
  between: "justify-between",
  end: "justify-end",
};

export default function Row({
  children,
  gap = "2",
  align = "center",
  justify = "start",
  wrap = false,
  as: Component = "div",
  className = "",
  role,
  ...rest
}) {
  const gapCls = GAP_ROW[String(gap)] || GAP_ROW["2"];
  const alignCls = ALIGN_ROW[align] || ALIGN_ROW.center;
  const justifyCls = JUSTIFY_ROW[justify] || JUSTIFY_ROW.start;

  return (
    <Component
      role={role}
      className={`flex flex-row ${wrap ? "flex-wrap" : ""} ${gapCls} ${alignCls} ${justifyCls} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
