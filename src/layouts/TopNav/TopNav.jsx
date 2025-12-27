import React from "react";
import useTopNavLogic from "./hooks/TopNav.logic";
import TopNavUI from "./components/TopNav.ui";

export default function TopNav() {
  const logic = useTopNavLogic();

  return (
    <TopNavUI
      user={logic.user}
      menuOpen={logic.menuOpen}
      menuRef={logic.menuRef}
      searchInput={logic.searchInput}
      handleSearchInput={logic.handleSearchInput}    // ← missing earlier
      executeSearch={logic.executeSearch}            // ← required
      clearSearch={logic.clearSearch}
      handleToggleSidebar={logic.handleToggleSidebar}
      handleLogout={logic.handleLogout}
      handleSearch={logic.handleSearch}
      toggleMenu={logic.toggleMenu}
      
    />
  );
}
