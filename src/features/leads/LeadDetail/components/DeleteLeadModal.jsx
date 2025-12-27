// DeleteLeadModal.jsx
import React from "react";
import PropTypes from "prop-types";
import Button from "../../../../ui/Form/Button";
import Modal from "../../../../ui/Surface/Modal";
import Text from "../../../../ui/Typography/Text";

export default function DeleteLeadModal({ open, onClose, onConfirm, loading, leadName }) {
  // Modal handles the open guard itself.
  return (
    <Modal open={open} onClose={onClose} title="Confirm delete" ariaLabel="Delete lead confirmation">
      <div className="p-4">
        <Text>
          Are you sure you want to delete{" "}
          <span className="font-medium">{leadName ?? "this lead"}</span>? This action cannot be undone.
        </Text>

        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

DeleteLeadModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  leadName: PropTypes.string,
};
