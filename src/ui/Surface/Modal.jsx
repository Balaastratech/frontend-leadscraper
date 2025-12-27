import React from "react";
import Button from "../Form/Button";

/**
 * Simple Modal primitive.
 * - children renders inside content area
 * - onClose required for accessibility
 * - closeOnBackdrop default true
 */
export default function Modal({
  children,
  open = false,
  onClose,
  title,
  ariaLabel,
  closeOnBackdrop = true,
  className = "",
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title || "modal"}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => closeOnBackdrop && onClose && onClose()}
        aria-hidden="true"
      />
      <div className={`relative max-w-2xl w-full z-10 ${className}`}>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            {title ? <div className="text-sm font-semibold">{title}</div> : null}
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
              Close
            </Button>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
