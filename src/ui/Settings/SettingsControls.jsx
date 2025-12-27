import React from "react";
import Input from "../Form/Input";
import Button from "../Form/Button";

/**
 * Reusable controls group used by pages.
 * Wraps existing Form primitives and adds layout/spacing.
 */
export function ControlsRow({ children }) {
  return <div className="flex gap-2 items-center">{children}</div>;
}

export function TextInput({ value, onChange, placeholder, className }) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
}

export function PrimaryButton({ children, onClick, className }) {
  return (
    <Button onClick={onClick} className={`px-3 py-2 ${className || ""}`}>
      {children}
    </Button>
  );
}

export function GhostButton({ children, onClick, className }) {
  return (
    <button
      className={`px-3 py-2 border rounded text-sm ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
