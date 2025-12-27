import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { FiInbox, FiUpload, FiPlus } from "react-icons/fi";
import Button from "../Form/Button";

export const EmptyState = ({
  icon = "inbox",
  title = "",
  description = "",
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => {
  const icons = useMemo(
    () => ({
      inbox: <FiInbox size={48} className="text-muted" />,
      upload: <FiUpload size={48} className="text-muted" />,
      plus: <FiPlus size={48} className="text-muted" />,
    }),
    []
  );

  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div className="mb-4">{icons[icon] || icons.inbox}</div>

      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>

      <p className="text-sm text-muted mb-6 max-w-md">{description}</p>

      <div className="flex gap-3">
        {actionText && (
          <Button type="button" variant="primary" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        )}

        {secondaryActionText && (
          <Button type="button" variant="outline" size="sm" onClick={onSecondaryAction}>
            {secondaryActionText}
          </Button>
        )}
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.oneOf(["inbox", "upload", "plus"]),
  title: PropTypes.string,
  description: PropTypes.string,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  secondaryActionText: PropTypes.string,
  onSecondaryAction: PropTypes.func,
};
