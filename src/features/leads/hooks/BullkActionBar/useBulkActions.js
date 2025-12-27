import { useState, useCallback } from "react";
import { useToast } from "../../../../hooks/useToast";

const canMerge = (selected) => selected.length >= 2;
const canDelete = (selected) => selected.length >= 1;

export function useBulkActions({ selected, onDelete, onMerge }) {
  const toast = useToast();
  const [confirmModal, setConfirmModal] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);

  const validateAndOpen = useCallback(
    (type) => {
      if (type === "delete" && !canDelete(selected)) {
        toast.warning("No leads selected for deletion");
        return;
      }
      if (type === "merge" && !canMerge(selected)) {
        toast.warning("Select at least 2 leads to merge");
        return;
      }
      setConfirmModal(type);
    },
    [selected, toast]
  );

  const openDelete = useCallback(() => validateAndOpen("delete"), [validateAndOpen]);
  const openMerge = useCallback(() => validateAndOpen("merge"), [validateAndOpen]);

  const closeModal = useCallback(() => {
    setConfirmModal(null);
  }, []);

  const confirmAction = useCallback(async () => {
    if (!confirmModal) return;

    setProcessingAction(confirmModal);

    try {
      if (confirmModal === "delete") {
        await onDelete();
      } else {
        await onMerge();
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${confirmModal} leads`);
    } finally {
      setProcessingAction(null);
      setConfirmModal(null);
    }
  }, [confirmModal, onDelete, onMerge, toast]);

  return {
    confirmModal,
    processingAction,
    canMerge: canMerge(selected),
    canDelete: canDelete(selected),

    openDelete,
    openMerge,
    closeModal,
    confirmAction,
  };
}
