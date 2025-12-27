import React from "react";
import Modal from "../../../ui/Surface/Modal";
import TeamInviteForm from "../../../ui/Team/TeamInviteForm";

export default function TeamInviteModal({ open, onClose, onInvite }) {
  return (
    <Modal open={open} onClose={onClose} title="Invite User">
      <TeamInviteForm
        onSubmit={(email) => {
          if (email) onInvite(email);
          onClose();
        }}
      />
    </Modal>
  );
}
