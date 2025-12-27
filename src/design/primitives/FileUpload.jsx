// src/components/FileUpload.jsx
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAttachment } from "../../features/help/store/helpSlice";

/**
 * Simple file upload UI that uses the mock uploadAttachment thunk.
 * Returns uploaded attachment objects via onUploaded callback.
 */
export default function FileUpload({ onUploaded }) {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  const onSelect = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setUploading(true);
    try {
      const res = await dispatch(uploadAttachment({ name: f.name, blobSize: f.size }));
      if (res && res.payload) {
        if (onUploaded) onUploaded(res.payload);
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed (mock).");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input ref={inputRef} type="file" onChange={onSelect} className="sr-only" id="help-file-input" />
      <label htmlFor="help-file-input" className="px-3 py-1 border rounded text-sm cursor-pointer">
        {uploading ? "Uploading…" : "Attach file"}
      </label>
    </div>
  );
}
