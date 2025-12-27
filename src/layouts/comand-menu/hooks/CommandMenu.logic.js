// src/layouts/command-menu/CommandMenu.logic.js
import { useState, useEffect, useMemo, useCallback } from "react";
import { BASE_ACTIONS, AI_ACTIONS } from "./actions";

export function useCommandMenuLogic({
  isOpen,
  onClose,
  navigate,
  dispatch,
  summarizeText
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const allActions = useMemo(() => {
    return [
      ...BASE_ACTIONS(navigate),
      ...AI_ACTIONS(navigate, dispatch, summarizeText)
    ];
  }, [navigate, dispatch, summarizeText]);

  const filteredActions = useMemo(() => {
    const q = query.toLowerCase();
    return allActions.filter((a) => a.label.toLowerCase().includes(q));
  }, [allActions, query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setIndex(0);
    }
  }, [isOpen]);

  const onKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((v) => (v + 1) % filteredActions.length);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((v) => (v - 1 + filteredActions.length) % filteredActions.length);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredActions[index];
        if (item) {
          item.run();
          onClose();
        }
      }
    },
    [isOpen, filteredActions, index, onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onKeyDown]);

  return {
    query,
    setQuery,
    index,
    filteredActions,
    setIndex
  };
}
