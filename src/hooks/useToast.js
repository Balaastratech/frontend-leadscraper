import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { showToast, clearToast } from "../store/uiSlice";

export const useToast = () => {
  const dispatch = useDispatch();

  // Generic dispatcher
  const push = useCallback((type, message, duration = 5000, undoCallback) => {
    if (typeof message !== "string") {
      message = String(message ?? "");
    }

    dispatch(showToast({ type, message, duration, undoCallback }));
  }, [dispatch]);

  const api = useMemo(() => ({
    success: (msg, d) => push("success", msg, d),
    error: (msg, d) => push("error", msg, d),
    warning: (msg, d) => push("warning", msg, d),
    info: (msg, d) => push("info", msg, d),
    undo: (msg, onUndo, d = 10000) => push("info", msg, d, onUndo),
    clear: () => dispatch(clearToast())
  }), [push, dispatch]);

  return api;
};
