// leads/Lead-List/hooks/useLeadsListLogic.js
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../../../hooks/useDebounce";
import { useToast } from "../../../../hooks/useToast";

import {
  useLeadsQuery,
  useBulkDeleteMutation,
  useBulkMergeMutation,
  useCsvImportMutation,
} from "../../Lead-List/hooks/queries/leadsQueries";

export default function useLeadsListLogic() {
  const toast = useToast();

  const filters = useSelector((s) => s.leads.filters);
  const globalSearch = useSelector((s) => s.leads.globalSearch);

  const debouncedSearch = useDebounce(globalSearch, 300);

  const [selected, setSelected] = useState([]);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [csvImporting, setCsvImporting] = useState(false);
  const [bulkActionProcessing, setBulkActionProcessing] = useState(false);
  const lastClickedIdx = useRef(null);

  const {
    data: leads = [],
    isLoading: loading,
    isFetching,
  } = useLeadsQuery({
    search: debouncedSearch,
    status: filters.status,
    minScore: filters.minScore,
    maxScore: filters.maxScore,
    company: filters.company,
    limit: 100,
  });

  const bulkDeleteMutation = useBulkDeleteMutation();
  const bulkMergeMutation = useBulkMergeMutation();
  const csvImportMutation = useCsvImportMutation();

  useEffect(() => {
    setSelected([]);
    lastClickedIdx.current = null;
  }, [leads?.length]);

  const toggleRow = useCallback(
    (id, index, event) => {
      if (!Array.isArray(leads) || leads.length === 0) return;

      if (!event) {
        lastClickedIdx.current = index;
        setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
        return;
      }

      if (event.shiftKey && lastClickedIdx.current !== null) {
        const start = Math.min(lastClickedIdx.current, index);
        const end = Math.max(lastClickedIdx.current, index);
        const ids = leads.slice(start, end + 1).map((l) => String(l.id));

        setSelected((p) => [...new Set([...p, ...ids])]);
        return;
      }

      lastClickedIdx.current = index;
      setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    },
    [leads]
  );

  const toggleAll = useCallback((checked, items = []) => {
    const ids = items.map((i) => String(i.id));
    setSelected((p) => (checked ? [...new Set([...p, ...ids])] : p.filter((id) => !ids.includes(id))));
  }, []);

  const bulkDelete = useCallback(async () => {
    if (bulkActionProcessing || !selected.length) return;

    setBulkActionProcessing(true);
    try {
      await bulkDeleteMutation.mutateAsync(selected);
      setSelected([]);
      toast.success(`${selected.length} leads deleted`);
    } catch {
      toast.error("Delete failed");
    } finally {
      setBulkActionProcessing(false);
    }
  }, [selected, bulkDeleteMutation, bulkActionProcessing, toast]);

  const bulkMerge = useCallback(async () => {
    if (bulkActionProcessing || selected.length < 2) return;

    setBulkActionProcessing(true);
    try {
      await bulkMergeMutation.mutateAsync({
        targetId: selected[0],
        mergeIds: selected.slice(1),
      });
      setSelected([]);
      toast.success("Merge complete");
    } catch {
      toast.error("Merge failed");
    } finally {
      setBulkActionProcessing(false);
    }
  }, [selected, bulkMergeMutation, bulkActionProcessing, toast]);

  const handleCsvImport = useCallback(
    async (file) => {
      if (!file) return toast.error("Select file");

      setCsvModalOpen(false);
      setCsvImporting(true);

      try {
        const res = await csvImportMutation.mutateAsync(file);
        toast.success(`Imported ${res?.importedCount ?? 0}`);
      } catch {
        toast.error("Import failed");
      } finally {
        setCsvImporting(false);
      }
    },
    [csvImportMutation, toast]
  );

  return {
    leads,
    loading,
    isFetching,

    globalSearch,
    selected,
    toggleRow,
    toggleAll,

    bulkDelete,
    bulkMerge,

    csvModalOpen,
    setCsvModalOpen,
    csvImporting,
    handleCsvImport,

    bulkActionProcessing,
  };
}
