import React from "react";

/**
 * Upgraded Grid primitive
 *
 * Backward compatible with:
 *   cols="1 sm:2 lg:3"
 *   gap="4"
 *
 * New:
 *   cols={{ base:1, sm:2, md:3 }}
 *   rowGap / colGap
 *   autoFit + minCol ("200px")
 *   align / justify
 *   flow: row | col | dense
 *   twin override
 */

const GAP = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

const ROW_GAP = {
  0: "row-gap-0",
  1: "row-gap-1",
  2: "row-gap-2",
  3: "row-gap-3",
  4: "row-gap-4",
  6: "row-gap-6",
  8: "row-gap-8",
  10: "row-gap-10",
  12: "row-gap-12",
};

const COL_GAP = {
  0: "col-gap-0",
  1: "col-gap-1",
  2: "col-gap-2",
  3: "col-gap-3",
  4: "col-gap-4",
  6: "col-gap-6",
  8: "col-gap-8",
  10: "col-gap-10",
  12: "col-gap-12",
};

function parseStringCols(cols) {
  return String(cols)
    .split(" ")
    .filter(Boolean)
    .map((p) => {
      if (p.includes(":")) {
        const [bp, cnt] = p.split(":");
        return `${bp}:grid-cols-${cnt}`;
      }
      return `grid-cols-${p}`;
    })
    .join(" ");
}

function parseObjectCols(colsObj) {
  return Object.entries(colsObj)
    .map(([bp, cnt]) =>
      bp === "base" ? `grid-cols-${cnt}` : `${bp}:grid-cols-${cnt}`
    )
    .join(" ");
}

export default function Grid({
  children,
  cols = "1",
  gap = "4",
  rowGap = null,
  colGap = null,
  autoFit = false,
  minCol = "200px",
  align = "start",
  justify = "start",
  flow = "row",
  twin = "",
  className = "",
  as: Component = "div",
  ...rest
}) {
  let colsClass = "";

  // cols="1 sm:2"
  if (typeof cols === "string") colsClass = parseStringCols(cols);

  // cols={{ base:1, md:2 }}
  if (typeof cols === "object") colsClass = parseObjectCols(cols);

  const gapClass = GAP[String(gap)] || GAP["4"];
  const rowGapClass = rowGap ? ROW_GAP[String(rowGap)] : "";
  const colGapClass = colGap ? COL_GAP[String(colGap)] : "";

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  const flowMap = {
    row: "grid-flow-row",
    col: "grid-flow-col",
    dense: "grid-flow-dense",
  };

  const flowCls = flowMap[flow] || flowMap.row;

  // auto-fit grid: responsive cards
  const autoFitClass = autoFit
    ? `grid-cols-[repeat(auto-fit,minmax(${minCol},1fr))]`
    : colsClass;

  return (
    <Component
      className={`grid ${autoFitClass} ${gapClass} min-w-0 [>&>*]:min-w-0 ${
        alignMap[align] || ""
      } ${justifyMap[justify] || ""} ${flowCls} ${twin} ${className}`}
    >
      {children}
    </Component>
  );
}
