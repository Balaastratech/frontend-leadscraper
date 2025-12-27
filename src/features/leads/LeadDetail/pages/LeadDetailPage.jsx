import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLeadDetailQuery from "../hooks/useLeadDetailQuery";
import useUpdateLeadMutation from "../hooks/useUpdateLeadMutation";
import useDeleteLeadMutation from "../hooks/useDeleteLeadMutation";
import LeadDetailPageUI from "../components/LeadDetailPageUI";
import DeleteLeadModal from "../components/DeleteLeadModal";
import { useToast } from "../../../../hooks/useToast";

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { data: lead, isLoading, isError, error, refetch } = useLeadDetailQuery(id);
  const updateMutation = useUpdateLeadMutation(id, { toast });
  const deleteMutation = useDeleteLeadMutation(id, { toast });

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      navigate("/app/leads");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <>
      <LeadDetailPageUI
        lead={lead}
        loading={isLoading}
        error={isError ? error?.message : null}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onUpdate={(updates) => updateMutation.mutateAsync(updates)}
        onBack={() => navigate("/app/leads")}
        onConfirmDelete={() => setDeleteModalOpen(true)}
        onRetry={() => refetch()}
      />

      <DeleteLeadModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={deleteMutation.isLoading}
        leadName={lead?.name}
      />
    </>
  );
}
