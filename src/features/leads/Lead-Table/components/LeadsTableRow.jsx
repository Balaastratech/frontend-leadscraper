import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../../../ui/Typography/Text";
import Stack from "../../../../ui/Layout/Stack";
import Tag from "../../../../ui/Feedback/Tag";
import Button from "../../../../ui/Form/Button";
import { FiEdit2, FiMail, FiTrash2, FiMoreVertical } from "react-icons/fi";

const LeadsTableRow = ({
  lead,
  isSelected = false,
  onToggleRow = () => {},
  handleQuickAction = () => {},
  renderMode = "virtual",
  gridTemplateColumns = ""
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onCheckboxChange = useCallback(
    (e) => {
      e.stopPropagation();
      onToggleRow(lead.id, e.target.checked);
    },
    [lead.id, onToggleRow]
  );

  const toggleMenu = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen((p) => !p);
    },
    []
  );

  const statusVariant =
    lead.status === "qualified"
      ? "success"
      : lead.status === "new"
      ? "info"
      : lead.status === "contacted"
      ? "warning"
      : lead.status === "lost"
      ? "error"
      : "default";

  if (renderMode === "virtual") {
    return (
      <div
        role="row"
        className="px-4 py-3 hover:bg-subtle border-b border-muted"
        style={{
          display: "grid",
          gridTemplateColumns,
          alignItems: "center"
        }}
      >
        {/* Checkbox */}
        <div>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onCheckboxChange}
            aria-label={`Select ${lead.name}`}
            className="rounded border-muted text-accent focus:ring-2"
          />
        </div>

        {/* Name */}
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/app/leads/${lead.id}`)}
        >
          <Stack gap="1">
            <Text size="sm" weight="medium" className="text-primary truncate">
              {lead.name}
            </Text>
            {lead.title && (
              <Text size="xs" color="muted" className="truncate">
                {lead.title}
              </Text>
            )}
          </Stack>
        </div>

        {/* Email */}
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/app/leads/${lead.id}`)}
        >
          <Text size="sm" color="muted" className="font-mono truncate">
            {lead.email || "—"}
          </Text>
        </div>

        {/* Company */}
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/app/leads/${lead.id}`)}
        >
          <Text size="sm" className="text-primary truncate">
            {lead.company || "—"}
          </Text>
        </div>

        {/* Status */}
        <div>
          <Tag variant={statusVariant} size="sm">
            {lead.status}
          </Tag>
        </div>

        {/* Score */}
        <div>
          <Stack gap="1">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={
                  lead.score >= 80
                    ? "h-full bg-green-500"
                    : lead.score >= 50
                    ? "h-full bg-yellow-500"
                    : "h-full bg-red-500"
                }
                style={{ width: `${lead.score || 0}%` }}
              />
            </div>
            <Text size="xs" weight="semibold" className="text-primary">
              {lead.score || 0}%
            </Text>
          </Stack>
        </div>

        {/* Action Menu */}
        <div className="relative">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            <FiMoreVertical size={16} />
          </Button>

          {open && (
            <div
              className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                className="justify-start"
                onClick={() => {
                  handleQuickAction("view", lead);
                  setOpen(false);
                }}
              >
                <FiEdit2 size={14} className="mr-2" />
                View Details
              </Button>

              <Button
                variant="ghost"
                size="sm"
                fullWidth
                className="justify-start"
                onClick={() => {
                  handleQuickAction("email", lead);
                  setOpen(false);
                }}
              >
                <FiMail size={14} className="mr-2" />
                Send Email
              </Button>

              <Button
                variant="ghost"
                size="sm"
                fullWidth
                className="justify-start text-red-600 hover:bg-red-50"
                onClick={() => {
                  handleQuickAction("delete", lead);
                  setOpen(false);
                }}
              >
                <FiTrash2 size={14} className="mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default React.memo(LeadsTableRow);
