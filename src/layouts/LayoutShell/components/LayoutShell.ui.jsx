import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import TopNav from "../../../layouts/TopNav/TopNav";
import SideNav from "../../../layouts/SideNav/SideNav";
import WorkspaceSwitcher from "../../WorkspaceSwitcher";
import { ToastContainer } from "../../../design/primitives/Toast";
import { SIDEBAR_WIDTH_REM, TOPBAR_HEIGHT } from "../layout.config";

// lazy heavy UI pieces
const CommandMenu = React.lazy(() => import("../../comand-menu/CommandMenu"));
const HelpChatPanel = React.lazy(() =>
  import("../../../features/help/components/HelpChatPanel")
);

// memoize imported components to avoid unnecessary re-rendersx
const TopNavMemo = React.memo(TopNav);
const WorkspaceSwitcherMemo = React.memo(WorkspaceSwitcher);
const SideNavMemo = React.memo(SideNav);

/**
 * Pure UI for LayoutShell.
 * Accepts simple props that come from the logic hook.
 */
export default function LayoutShellUI({
  sidebarOpen,
  commandMenuOpen,
  onCloseSidebar,
  onCloseCommandMenu,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <ToastContainer />

      {/* Top Navigation */}
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b shadow-sm flex items-center justify-between px-6"
        style={{ height: `${TOPBAR_HEIGHT}px` }}
      >
        <TopNavMemo />
        <WorkspaceSwitcherMemo />
      </header>

      {/* Command Menu (lazy) */}
      <Suspense fallback={null}>
        <CommandMenu isOpen={commandMenuOpen} onClose={onCloseCommandMenu} />
      </Suspense>

      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar */}
        <aside
          role="navigation"
          aria-label="Primary"
          className={`
            fixed top-16 bottom-0 left-0 z-40
            w-[16rem] bg-white border-r shadow-lg
            transform transition-transform duration-300 ease-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-[16rem]"}
            overflow-hidden
          `}
          // keep layout paint cheap: no inline style recalcs here
        >
          <div className="h-full overflow-y-auto p-4">
            <SideNavMemo />
          </div>
        </aside>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <button
            aria-label="Close menu"
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={onCloseSidebar}
          />
        )}

        {/* Main content */}
        <main
          role="main"
          className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? "lg:ml-[16rem]" : "lg:ml-0"}`}
        >
          <Outlet />
        </main>

        {/* Help chat (lazy) */}
        <Suspense fallback={null}>
          <HelpChatPanel />
        </Suspense>
      </div>
    </div>
  );
}
