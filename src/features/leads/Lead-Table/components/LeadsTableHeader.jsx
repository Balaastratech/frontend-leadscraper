import React from "react";
import Text from "../../../../ui/Typography/Text";
import Row from "../../../../ui/Layout/Row";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const LeadsTableHeader = ({
  columns = [],
  sortConfig = {},
  handleSort = () => {},
  onToggleAll = () => {},
  allSelected = false,
  gridTemplateColumns = "",
  virtualHeader = false
}) => {

  if (virtualHeader) {
    return (
      <div
        role="row"
        className="px-4 py-3 bg-surface-raised border-b-2 border-muted"
        style={{ display: "grid", gridTemplateColumns, alignItems: "center" }}
      >
        {columns.map((col) => {
          // SELECT ALL COLUMN
          if (col.key === "select") {
            return (
              <div key="select">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onToggleAll(e.target.checked)}
                  aria-label="Select all rows"
                />
              </div>
            );
          }

          return (
            <div
              key={col.key}
              role={col.sortable ? "button" : "columnheader"}
              onClick={() => col.sortable && handleSort(col.key)}
              aria-sort={
                col.sortable && sortConfig.key === col.key
                  ? sortConfig.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              className={col.sortable ? "cursor-pointer select-none" : ""}
            >
              <Row align="center" gap="2">
                <Text size="sm" weight="medium">{col.label}</Text>
                {col.sortable && sortConfig.key === col.key &&
                  (sortConfig.direction === "asc" ? (
                    <FiChevronUp size={14} className="text-accent" />
                  ) : (
                    <FiChevronDown size={14} className="text-accent" />
                  ))}
              </Row>
            </div>
          );
        })}
      </div>
    );
  }

  // fallback (rarely used)
  return null;
};

export default React.memo(LeadsTableHeader);
