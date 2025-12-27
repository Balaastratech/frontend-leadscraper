import { useCallback, useState } from "react";

/**
 * useCollapsible
 * Manages open/closed state for named groups.
 * initial can be array of ids to open by default.
 */
export default function useCollapsible(initial = []) {
  const [openMap, setOpenMap] = useState(() => {
    const map = {};
    if (Array.isArray(initial)) {
      initial.forEach((id) => (map[id] = true));
    }
    return map;
  });

  const isOpen = useCallback((id) => !!openMap[id], [openMap]);

  const toggle = useCallback((id) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const open = useCallback((id) => setOpenMap((prev) => ({ ...prev, [id]: true })), []);
  const close = useCallback((id) => setOpenMap((prev) => ({ ...prev, [id]: false })), []);

  return { isOpen, toggle, open, close, openMap };
}
