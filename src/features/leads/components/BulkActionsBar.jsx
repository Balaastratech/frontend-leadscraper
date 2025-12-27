import React from "react";
import PropTypes from "prop-types";

import Row from "../../../ui/Layout/Row";
import Stack from "../../../ui/Layout/Stack";
import Text from "../../../ui/Typography/Text";
import Button from "../../../ui/Form/Button";
import Card from "../../../ui/Surface/Card";
import Tag from "../../../ui/Feedback/Tag";
import Modal from "../../../ui/Surface/Modal";
import { FiAlertTriangle } from "react-icons/fi";

import { useBulkActions } from "../hooks/BullkActionBar/useBulkActions";

const BulkActionsBar = React.memo(
  ({ selected, onDelete, onMerge, disabled = false, processing = false, className = "" }) => {
    const {
      confirmModal,
      processingAction,
      canMerge,
      canDelete,
      openDelete,
      openMerge,
      closeModal,
      confirmAction,
    } = useBulkActions({ selected, onDelete, onMerge });

    if (selected.length === 0) return null;

    const mergeDisabled = disabled || processing || !canMerge;
    const deleteDisabled = disabled || processing || !canDelete;

    return (
      <Stack>
        <Card padding="sm" variant="surface" className={`border-l-4 ${className}`}>
          <Row justify="between" align="center" gap="md">
            <Row align="center" gap="2">
              <Tag variant="accent" size="md" removable={false}>
                {selected.length} selected
              </Tag>

              {processing && (
                <span className="inline-block w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              )}
            </Row>

            <Row gap="2">
              <Button
                variant="outline"
                size="sm"
                onClick={openMerge}
                disabled={mergeDisabled}
                aria-label={`Merge ${selected.length} leads`}
              >
                <span className={mergeDisabled ? "text-gray-400" : ""}>Merge</span>
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={openDelete}
                disabled={deleteDisabled}
                aria-label={`Delete ${selected.length} leads`}
                loading={processingAction === "delete"}
              >
                <span className={deleteDisabled ? "text-gray-400" : ""}>Delete</span>
              </Button>
            </Row>
          </Row>
        </Card>

        <Modal
          open={confirmModal !== null}
          onClose={closeModal}
          title={
            confirmModal === "delete"
              ? `Delete ${selected.length} leads?`
              : `Merge ${selected.length} leads?`
          }
        >
          <Stack gap="lg">
            <Card variant="soft" padding="md">
              <Row align="center" gap="3">
                <FiAlertTriangle className="text-yellow-500" size={24} />
                <Stack gap="1">
                  <Text size="lg" weight="semibold">
                    This action cannot be undone
                  </Text>
                  <Text size="sm" color="muted">
                    {confirmModal === "delete"
                      ? `Are you sure you want to permanently delete ${selected.length} leads?`
                      : `Are you sure you want to merge these leads into one? Others will be removed.`}
                  </Text>
                </Stack>
              </Row>

              {selected.length <= 5 && (
                <Stack gap="2" className="mt-4 pl-9">
                  <Text size="sm" color="muted">Affected:</Text>
                  <ul className="list-disc list-inside">
                    {selected.map((id) => (
                      <li key={id} className="text-sm text-gray-600">Lead ID: {id}</li>
                    ))}
                  </ul>
                </Stack>
              )}
            </Card>

            <Row justify="end" gap="2">
              <Button variant="outline" size="sm" onClick={closeModal} disabled={processing}>
                Cancel
              </Button>

              <Button
                variant={confirmModal === "delete" ? "danger" : "primary"}
                size="sm"
                onClick={confirmAction}
                disabled={processing}
                loading={processingAction !== null}
              >
                {confirmModal === "delete" ? "Delete" : "Merge"}
              </Button>
            </Row>
          </Stack>
        </Modal>
      </Stack>
    );
  }
);

BulkActionsBar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
  onMerge: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  processing: PropTypes.bool,
  className: PropTypes.string,
};

export default BulkActionsBar;
