// src/ui/Table/TableCell.jsx
import React, { useState } from "react";

export function TableCell({ children, className = "", resizable = false, width, onResize, ...rest }) {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e) => {
    if (!resizable) return;
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = e.currentTarget.offsetWidth;

    const handleMouseMove = (moveE) => {
      const newWidth = Math.max(100, startWidth + moveE.clientX - startX); // Min width 100px
      if (onResize) onResize(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <td
      className={`relative p-0 ${className} ${isResizing ? "select-none" : ""}`}
      style={width ? { width } : {}}
      {...rest}
    >
      <div className="py-3 px-4">
        {children}
      </div>
      {resizable && (
        <div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-accent transition-colors"
          onMouseDown={handleMouseDown}
          title="Drag to resize"
        />
      )}
    </td>
  );
}