import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to manage click-outside and ESC close for a dropdown.
 * Returns: { ref, bindToggle, isListening } — but we only need the ref and control externally.
 */
export default function useUserMenu({ isOpen, onClose }) {
  const ref = useRef(null);

  const handleDocumentClick = useCallback(
    (e) => {
      if (!isOpen) return;
      if (ref.current && !ref.current.contains(e.target)) onClose();
    },
    [isOpen, onClose]
  );

  const handleEsc = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleDocumentClick, handleEsc]);

  return ref;
}
