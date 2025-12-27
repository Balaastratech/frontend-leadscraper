// src/hooks/useKeyboardShortcuts.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCommandMenu } from "../store/uiSlice";
import { summarizeText } from "../features/ai/store/aiSlice";

export default function useKeyboardShortcuts() {
  const dispatch = useDispatch();
  const enabled = useSelector((s) => s.shortcuts.enabled);

  useEffect(() => {
    if (!enabled) return;

    const handler = async (e) => {
      const key = e.key.toLowerCase();

      // Command Menu: Ctrl/Cmd + K
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        dispatch(openCommandMenu());
        return;
      }

      // AI: summarize clipboard — Shift + S
      if (e.shiftKey && key === "s") {
        try {
          const text = await navigator.clipboard.readText();
          if (text) dispatch(summarizeText({ input: text }));
        } catch (_) {}
        return;
      }

      // AI: quick snippet — Shift + N
      if (e.shiftKey && key === "n") {
        const payload = "Generate a short outreach snippet.";
        dispatch(summarizeText({ input: payload }));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch, enabled]);
}
