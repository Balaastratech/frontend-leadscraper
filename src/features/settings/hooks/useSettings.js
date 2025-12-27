import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSettings,
  addKey,
  removeKey,
  addWebhook,
  removeWebhook,
  saveSmtp,
  testSmtp,
  testWebhook
} from "../store/settingsSlice";

/**
 * useSettings
 * Encapsulates all redux/selectors/actions used by settings pages.
 * Pages become pure composition layers calling this hook.
 */
export default function useSettings() {
  const dispatch = useDispatch();
  const settings = useSelector((s) => s.settings);

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  const createKey = useCallback((label) => {
    if (!label || !label.trim()) return;
    dispatch(addKey(label.trim()));
  }, [dispatch]);

  const deleteKey = useCallback((id) => {
    dispatch(removeKey(id));
  }, [dispatch]);

  const createWebhook = useCallback(({ url, events }) => {
    if (!url || !url.trim()) return;
    const payload = { url, events };
    dispatch(addWebhook(payload));
  }, [dispatch]);

  const deleteWebhook = useCallback((id) => {
    dispatch(removeWebhook(id));
  }, [dispatch]);

  const saveSmtpConfig = useCallback((payload) => {
    dispatch(saveSmtp(payload));
  }, [dispatch]);

  const runTestSmtp = useCallback(() => {
    dispatch(testSmtp());
  }, [dispatch]);

  const runTestWebhook = useCallback((id) => {
    dispatch(testWebhook(id));
  }, [dispatch]);

  return {
    ...settings,
    createKey,
    deleteKey,
    createWebhook,
    deleteWebhook,
    saveSmtpConfig,
    runTestSmtp,
    runTestWebhook
  };
}
