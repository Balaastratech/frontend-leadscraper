import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import useKeyboardShortcuts from "../../../hooks/useKeyboardShortcuts";
import { close as closeSidebar } from "../../SideNav/store/sidebarSlice";
import { closeCommandMenu } from "../../../store/uiSlice";
import { SIDEBAR_WIDTH } from "../layout.config";

/**
 * Returns props and handlers for LayoutShell UI.
 * Keeps all redux + keyboard logic here so UI stays pure.
 */
export default function useLayoutShellLogic() {
  const dispatch = useDispatch();

  // select only the bits we need, keep selection shallow to avoid extra re-renders
  const { sidebarOpen, commandMenuOpen } = useSelector(
    (s) => ({
      sidebarOpen: s.sidebar.open,
      commandMenuOpen: s.ui.commandMenuOpen,
    }),
    shallowEqual
  );

  // run global keyboard shortcuts hook once (side-effect)
  useKeyboardShortcuts();

  const onCloseSidebar = useCallback(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  const onCloseCommandMenu = useCallback(() => {
    dispatch(closeCommandMenu());
  }, [dispatch]);

  return {
    sidebarOpen,
    commandMenuOpen,
    onCloseSidebar,
    onCloseCommandMenu,
    SIDEBAR_WIDTH,
  };
}
