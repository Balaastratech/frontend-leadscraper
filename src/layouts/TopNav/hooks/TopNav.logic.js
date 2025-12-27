import { useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toggle } from "../../SideNav/store/sidebarSlice";
import { logout } from "../../../features/auth/store/authSlice";
import { setGlobalSearch } from "../../../features/leads/store/leadsSlice";
import useUserMenu from "./useUserMenu";

export default function useTopNavLogic() {
  const dispatch = useDispatch();

  const user = useSelector((s) => s.auth.user, shallowEqual);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const menuRef = useUserMenu({
    isOpen: menuOpen,
    onClose: () => setMenuOpen(false),
  });

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggle());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    setMenuOpen(false);
    dispatch(logout());
  }, [dispatch]);

  // input updates local state only
  const handleSearchInput = useCallback((value) => {
    setSearchInput(value);
  }, []);

  // actual search dispatch happens ONLY when button is pressed
  const executeSearch = useCallback(() => {
    dispatch(setGlobalSearch(searchInput));
  }, [dispatch, searchInput]);

  const clearSearch = useCallback(() => {
    setSearchInput("");
    dispatch(setGlobalSearch(""));
  }, [dispatch]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((s) => !s);
  }, []);

  return useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
}
