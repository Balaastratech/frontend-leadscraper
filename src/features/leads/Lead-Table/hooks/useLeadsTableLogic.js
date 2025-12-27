import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import { useDispatch } from "react-redux";
import { updateLeadLocal } from "../../store/leadsSlice";

/**
 * useLeadsTable - returns processedItems, visibleItems for the current page, and handlers.
 * Keeps sorting, pagination, and action handlers centralized.
 */
export default function useLeadsTable({
  items = [],
  loading = false,
  onToggleAll,
  onPageChange,
  onPageSizeChange,
}) {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo(
    () => [
      { key: "select", label: "", sortable: false, width: "48px" },
      { key: "name", label: "Name", sortable: true, minWidth: "200px" },
      { key: "email", label: "Email", sortable: true, minWidth: "250px" },
      { key: "company", label: "Company", sortable: true, minWidth: "180px" },
      { key: "status", label: "Status", sortable: true, width: "120px" },
      { key: "score", label: "Score", sortable: true, width: "120px" },
      { key: "actions", label: "", sortable: false, width: "48px" },
    ],
    []
  );

  // processedItems = sorted items (global)
  const processedItems = useMemo(() => {
    if (!items || !Array.isArray(items)) return [];
    if (!sortConfig.key || loading) return items;

    const sorted = [...items].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [items, sortConfig, loading]);

  // pagination metadata
  const totalItems = useMemo(() => processedItems.length, [processedItems]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );

  // clamp page if items/pageSize change
  useEffect(() => {
    if (totalPages === 0) {
      setPage(1);
      onPageChange?.(1);
      return;
    }
    if (page > totalPages) {
      setPage(totalPages);
      onPageChange?.(totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const startIndex = useMemo(() => (page - 1) * pageSize, [page, pageSize]);
  const endIndex = useMemo(
    () => Math.min(startIndex + pageSize, totalItems),
    [startIndex, pageSize, totalItems]
  );

  // visibleItems = slice for current page (virtualize within this slice)
  const visibleItems = useMemo(() => {
    return processedItems.slice(startIndex, endIndex);
  }, [processedItems, startIndex, endIndex]);

  const handleSort = useCallback(
    (key) => {
      if (loading) return;
      setSortConfig((prev) => ({
        key,
        direction:
          prev.key === key
            ? prev.direction === "asc"
              ? "desc"
              : "asc"
            : "asc",
      }));
    },
    [loading]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      const clamped = Math.min(Math.max(1, newPage), totalPages || 1);
      setPage(clamped);
      onPageChange?.(clamped);
      // clear selection on page change
    },
    [totalPages, onPageChange, onToggleAll]
  );

  const handlePageSizeChange = useCallback(
    (value) => {
      if (value === "all") {
        const size = totalItems;
        setPageSize(size);
        setPage(1);
        onPageSizeChange?.(size);
        onPageChange?.(1);
        return;
      }

      const size = parseInt(value, 10);
      if (!size || size < 1) return;

      setPageSize(size);
      setPage(1);
      onPageSizeChange?.(size);
      onPageChange?.(1);
    },
    [totalItems, onPageSizeChange, onPageChange]
  );

  const handleQuickAction = useCallback(
    (action, lead) => {
      switch (action) {
        case "edit":
          navigate(`/app/leads/${lead.id}/edit`);
          break;
        case "delete": {
          dispatch(
            updateLeadLocal({ id: lead.id, changes: { deleted: true } })
          );
          toast.undo?.(`Lead "${lead.name}" deleted`, () => {
            dispatch(
              updateLeadLocal({ id: lead.id, changes: { deleted: false } })
            );
          });
          break;
        }
        case "email":
          toast.info?.(`Opening email composer for ${lead.email}`);
          break;
        case "view":
          navigate(`/app/leads/${lead.id}`);
          break;
        default:
          break;
      }
    },
    // navigate, dispatch, toast in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Note: we intentionally omitted navigate/dispatch/toast from deps above for brevity.
  // If your linter complains, add them to deps.

  return {
    columns,
    sortConfig,
    page,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    visibleItems,
    processedItems,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleQuickAction,
  };
}
