// src/features/icp/hooks/useICPBuilder.js
import { useState, useCallback } from "react";
import useICP from "./useICP";

/**
 * Encapsulates all form and edit state for ICPBuilder.
 * Returns state + handlers only. UI is composed in ICPBuilder.jsx.
 */
export default function useICPBuilder() {
  const { add, update, remove, list } = useICP();

  // create form fields (strings)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tagsRaw, setTagsRaw] = useState(""); // comma separated

  // editing state
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // helpers
  const parseTags = useCallback((raw) =>
    raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    []
  );

  const onCreate = useCallback(() => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const parsedTags = parseTags(tagsRaw);
    add({
      name: trimmed,
      description: description.trim(),
      tags: parsedTags,
      createdAt: new Date().toISOString(),
    });
    setName("");
    setDescription("");
    setTagsRaw("");
  }, [name, description, tagsRaw, add, parseTags]);

  const onStartEdit = useCallback((icp) => {
    setEditId(icp.id);
    setEditName(icp.name || "");
  }, []);

  const onSaveEdit = useCallback(() => {
    const trimmed = editName.trim();
    if (!editId || !trimmed) {
      setEditId(null);
      return;
    }
    update(editId, { name: trimmed });
    setEditId(null);
    setEditName("");
  }, [editId, editName, update]);

  const onDelete = useCallback((id) => {
    remove(id);
    if (editId === id) {
      setEditId(null);
      setEditName("");
    }
  }, [remove, editId]);

  // tag manipulation: uses update to write tags back to store
  const removeTag = useCallback((icpId, tag) => {
    const icp = list.find((i) => i.id === icpId);
    if (!icp) return;
    const newTags = (icp.tags || []).filter((t) => t !== tag);
    update(icpId, { tags: newTags });
  }, [list, update]);

  return {
    // data
    list,

    // create form
    name,
    setName,
    description,
    setDescription,
    tagsRaw,
    setTagsRaw,
    onCreate,

    // edit
    editId,
    editName,
    setEditName,
    onStartEdit,
    onSaveEdit,
    onDelete,

    // tags
    removeTag,
  };
}
