import React from "react";
import Title from "../Typography/Title";

/**
 * Small presentational header for settings pages.
 * Keeps typography and spacing inside a primitive.
 */
export default function SettingsHeader({ title }) {
  return (
    <div className="flex items-center justify-between">
      <Title className="text-lg">{title ?? "Settings"}</Title>
    </div>
  );
}
