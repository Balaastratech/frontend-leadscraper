import React from "react";
import { Menu, ChevronDown, Search, X } from "lucide-react";

function TopNavUI({
  user,
  menuOpen,
  menuRef,
  searchInput,
  handleSearchInput,
  executeSearch,
  clearSearch,
  handleToggleSidebar,
  handleLogout,
  toggleMenu,
  openCommandMenu,
  
}) {
  return (
    <div className="flex items-center gap-4 w-full">
      {/* Logo + Sidebar Toggle */}
      <button
        aria-label="Toggle sidebar"
        onClick={handleToggleSidebar}
        className="flex items-center gap-2 font-semibold text-primary hover:opacity-80"
      >
        <Menu size={18} />
        <span className="text-lg">AI LeadGen</span>
      </button>

      {/* Global Search: input with internal clear button + search btn */}
      {/* Search Container */}
      <div className="flex items-center gap-2 flex-1 max-w-md mx-4 relative">
        {/* Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchInput}
            placeholder="Search leads..."
            onChange={(e) => handleSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") executeSearch();
              if (e.key === "Escape") clearSearch();
            }}
            className="w-full pl-4 pr-10 py-2 border border-muted rounded-lg text-sm bg-surface
                 focus:ring-2 focus:ring-accent focus:outline-none text-primary
                 placeholder:text-subtle"
          />

          {/* Clear X inside input */}
          {searchInput.length > 0 && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Search Button OUTSIDE */}
        <button
          onClick={executeSearch}
          className="p-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* User Menu */}
      <div className="relative ml-auto" ref={menuRef}>
        <button
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          className="flex items-center gap-2 p-2 rounded-lg border border-muted bg-surface hover:bg-subtle transition-colors"
        >
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-accent">
              {user?.name?.[0] ?? "?"}
            </span>
          </div>
          <span className="text-sm font-medium text-primary">
            {user?.name ?? "Unknown"}
          </span>
          <ChevronDown size={16} className="text-subtle" />
        </button>
        

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-48 bg-surface border border-muted shadow-lg rounded-lg p-2 text-sm z-50"
          >
            <div className="px-3 py-2 border-b border-muted">
              <div className="font-semibold text-primary">{user?.name}</div>
              <div className="text-subtle text-xs">{user?.email}</div>
            </div>
            <button
              role="menuitem"
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 hover:bg-subtle rounded-md text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(TopNavUI);
