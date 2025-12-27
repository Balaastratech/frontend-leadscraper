// src/layouts/WorkspaceSwitcher.jsx
import Button from "../ui/Form/Button";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default function WorkspaceSwitcher() {
  const user = useSelector((s) => s.auth.user);
  const workspaces = Array.isArray(user?.workspaces) ? user.workspaces : [];

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  function handleSelect(id) {
    // Real API call would go here:
    // await api.switchWorkspace(id)
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <Button
        variant="primary"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
       
      >
        Workspace ▾
      </Button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-44 border"
        >
          {workspaces.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-600">
              No workspaces
            </div>
          )}

          {workspaces.map((ws) => (
            <Button
              key={ws}
              role="menuitem"
              onClick={() => handleSelect(ws)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
            >
              {ws}
            </Button>
          ))}

          <Button
            role="menuitem"
            onClick={() => handleSelect("new")}
            
          >
            + Add Workspace
          </Button>
        </div>
      )}
    </div>
  );
}
