import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  fetchConversation,
  postHelpMessage,
  uploadAttachment,
} from "../store/helpSlice";

/**
 * Encapsulates all help chat logic and exposes a clean imperative API for the UI.
 *
 * Returns:
 * - state: { conversations, current, loading }
 * - refs: { listRef }
 * - ui: { open, setOpen, subject, setSubject, text, setText, attached, setAttached, testMode, setTestMode }
 * - actions: { onOpen, onClose, onSend, onUploaded, onSelectConv, clear }
 */
export default function useHelpChat() {
  const dispatch = useDispatch();
  const { conversations = [], current = null, loading = false } = useSelector(
    (s) => s.help || {}
  );
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [attached, setAttached] = useState([]);
  const [testMode, setTestMode] = useState(true);
  const listRef = useRef();

  // fetch list on mount
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // auto-open most recent conversation if none selected
  useEffect(() => {
    if (conversations && conversations.length && !current) {
      const id = conversations[0].id;
      dispatch(fetchConversation(id));
    }
  }, [conversations, current, dispatch]);

  // when current updates, set subject and auto-scroll
  useEffect(() => {
    if (current) {
      setSubject(current.subject || "");
      setTimeout(() => {
        if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
      }, 200);
    }
  }, [current, listRef]);

  const onOpen = useCallback(() => setOpen((v) => !v), []);
  const onClose = useCallback(() => setOpen(false), []);

  const onSend = useCallback(async () => {
    if (!text.trim() && attached.length === 0) return;
    const payload = {
      conversationId: current ? current.id : null,
      subject: current ? current.subject : subject || "Support",
      from: "user",
      text: text.trim(),
      files: attached,
    };
    await dispatch(postHelpMessage(payload));
    setText("");
    setAttached([]);
  }, [text, attached, current, subject, dispatch]);

  const onUploaded = useCallback(
    async (fileMeta) => {
      // If you want server upload here, dispatch uploadAttachment
      // For now, components call uploadAttachment directly or pass fileMeta.
      setAttached((s) => [...s, fileMeta]);
    },
    [setAttached]
  );

  const onSelectConv = useCallback(
    (id) => {
      dispatch(fetchConversation(id));
      setOpen(true);
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    setText("");
    setAttached([]);
    setSubject("");
  }, []);

  return {
    state: { conversations, current, loading },
    refs: { listRef },
    ui: {
      open,
      setOpen,
      subject,
      setSubject,
      text,
      setText,
      attached,
      setAttached,
      testMode,
      setTestMode,
    },
    actions: { onOpen, onClose, onSend, onUploaded, onSelectConv, clear },
  };
}
