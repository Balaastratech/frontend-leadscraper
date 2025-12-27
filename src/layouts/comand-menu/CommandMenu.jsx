// src/layouts/command-menu/CommandMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CommandMenuUI from "./components/CommandMenu.ui";
import { useCommandMenuLogic } from "./hooks/CommandMenu.logic";
import { summarizeText } from "../../features/ai/store/aiSlice";

export default function CommandMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logic = useCommandMenuLogic({
    isOpen,
    onClose,
    navigate,
    dispatch,
    summarizeText
  });

  return (
    <CommandMenuUI
      isOpen={isOpen}
      onClose={onClose}
      query={logic.query}
      setQuery={logic.setQuery}
      actions={logic.filteredActions}
      index={logic.index}
    />
  );
}
