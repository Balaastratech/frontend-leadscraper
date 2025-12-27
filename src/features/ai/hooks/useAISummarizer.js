// src/features/ai/hooks/useAISummarizer.js
// Extracts all logic (state, handlers, redux wiring, clipboard, attach behavior).
// No JSX here. Pure logic hook.
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { summarizeText, clearLastSummary } from "../store/aiSlice";

/**
 * Returns:
 *  - state: { input, model, showAdvanced, copied }
 *  - handlers: onChangeInput, setModel, toggleAdvanced, onSummarize, onClear, onCopy, attachToLead
 *  - aiState: slice of redux ai (loading, lastSummary, history, error)
 */
export default function useAISummarizer(leadId) {
  const dispatch = useDispatch();
  const ai = useSelector((s) => s.ai || {});
  const [input, setInput] = useState("");
  const [model, setModel] = useState("mock-clarity-0.1");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);

  const onChangeInput = useCallback((e) => setInput(e.target.value), []);
  const toggleAdvanced = useCallback(() => setShowAdvanced((s) => !s), []);
  const setModelHandler = useCallback((val) => setModel(val), []);

  const onCopy = useCallback(() => {
    if (navigator.clipboard && ai.lastSummary && ai.lastSummary.summary) {
      navigator.clipboard.writeText(ai.lastSummary.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }, [ai.lastSummary]);

  const onSummarize = useCallback(async (e) => {
    e && e.preventDefault();
    if (!input.trim()) return;
    await dispatch(summarizeText({ input, model }));
  }, [dispatch, input, model]);

  const onClear = useCallback(() => {
    setInput("");
    dispatch(clearLastSummary());
  }, [dispatch]);

  const attachToLead = useCallback(() => {
    try {
      const { updateLeadLocal } = require("../../../store/leadsSlice");
      if (leadId && ai.lastSummary) {
        dispatch(
          updateLeadLocal({
            id: leadId,
            changes: { aiSummary: ai.lastSummary.summary },
          })
        );
        // keep UI feedback decisions to the component (alert here as in original)
        alert("AI summary attached to lead (local only).");
      }
    } catch (err) {
      console.warn("Attach to lead not available in this build.");
    }
  }, [dispatch, leadId, ai.lastSummary]);

  return {
    state: { input, model, showAdvanced, copied },
    handlers: {
      onChangeInput,
      setModel: setModelHandler,
      toggleAdvanced,
      onSummarize,
      onClear,
      onCopy,
      attachToLead,
    },
    aiState: ai,
  };
}
