import React from "react";
import useLayoutShellLogic from "./hooks/useLayoutShell";
import LayoutShellUI from "./components/LayoutShell.ui";

/**
 * Thin glue component.
 * Keeps the public import path the same as before.
 */
export default function LayoutShell() {
  const logic = useLayoutShellLogic();

  // Spread only the public props the UI needs.
  return (
    <LayoutShellUI
      sidebarOpen={logic.sidebarOpen}
      commandMenuOpen={logic.commandMenuOpen}
      onCloseSidebar={logic.onCloseSidebar}
      onCloseCommandMenu={logic.onCloseCommandMenu}
    />
  );
}
