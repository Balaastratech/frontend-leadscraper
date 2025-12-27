import React, { useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useVirtualizer } from "@tanstack/react-virtual";

import Stack from "../../../../ui/Layout/Stack";
import LeadsTableHeader from "../components/LeadsTableHeader";
import LeadsTableRow from "../components/LeadsTableRow";
import LeadsTableSkeleton from "../components/LeadsTableSkeleton";
import LeadsTablePagination from "../components/LeadsTablePagination";
import { EmptyState } from "../../../../ui/Feedback/EmptyState";
import useLeadsTable from "../hooks/useLeadsTableLogic";

const ROW_HEIGHT = 64;

function LeadsTable(props) {
  const {
    items = [],
    selected = [],
    onToggleRow = () => {},
    onToggleAll = () => {},
    loading = false,
    onPageChange = () => {},
    onPageSizeChange = () => {},
    height = 520
  } = props;

  const {
    columns,
    sortConfig,
    page,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    visibleItems,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleQuickAction
  } = useLeadsTable({
    items,
    loading,
    onToggleAll,
    onPageChange,
    onPageSizeChange
  });

  // Selected ids as Set for O(1)
  const selectedSet = useMemo(() => {
    return new Set(selected.map((id) => String(id)));
  }, [selected]);

  // Column layout → shared by header + rows
  const gridTemplateColumns = useMemo(() => {
    return columns
      .map((col) => {
        if (col.width) return col.width;
        if (col.minWidth) return `minmax(${col.minWidth}, 1fr)`;
        return "1fr";
      })
      .join(" ");
  }, [columns]);

  // Virtualizer (per-page only)
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: visibleItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5
  });

  // Loading state
  if (loading) {
    return <LeadsTableSkeleton columns={columns} pageSize={pageSize} />;
  }

  // Empty state
  if (!loading && visibleItems.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="No leads found"
        description="Try adjusting your filters or import new leads"
      />
    );
  }

  // Render a virtual row
  const renderRow = useCallback(
    (virtualRow) => {
      const index = virtualRow.index;
      const lead = visibleItems[index];
      if (!lead) return null;

      const top = virtualRow.start;

      return (
        <div
          key={virtualRow.key}
          role="row"
          style={{
            position: "absolute",
            top,
            left: 0,
            width: "100%"
          }}
        >
          <LeadsTableRow
            lead={lead}
            isSelected={selectedSet.has(String(lead.id))}
            onToggleRow={onToggleRow}
            handleQuickAction={handleQuickAction}
            renderMode="virtual"
            gridTemplateColumns={gridTemplateColumns}
          />
        </div>
      );
    },
    [visibleItems, selectedSet, onToggleRow, handleQuickAction, gridTemplateColumns]
  );

  return (
    <Stack gap="md">
      <div className="bg-surface rounded-xl border border-muted shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-surface-raised border-b-2 border-muted">
          <LeadsTableHeader
            columns={columns}
            sortConfig={sortConfig}
            handleSort={handleSort}
            gridTemplateColumns={gridTemplateColumns}
            virtualHeader
            allSelected={
              visibleItems.length > 0 &&
              visibleItems.every((item) => selectedSet.has(String(item.id)))
            }
            onToggleAll={(checked) => onToggleAll(checked, visibleItems)}
          />
        </div>

        {/* VIRTUAL LIST */}
        <div
          ref={parentRef}
          className="relative w-full overflow-auto"
          style={{ height }}
          role="table"
          aria-rowcount={visibleItems.length}
        >
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: "100%",
              position: "relative"
            }}
          >
            {rowVirtualizer.getVirtualItems().map(renderRow)}
          </div>
        </div>
      </div>

      {/* PAGINATION ALWAYS VISIBLE */}
      <LeadsTablePagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Stack>
  );
}

LeadsTable.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.array,
  onToggleRow: PropTypes.func,
  onToggleAll: PropTypes.func,
  loading: PropTypes.bool,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  height: PropTypes.number
};

export default React.memo(LeadsTable);
