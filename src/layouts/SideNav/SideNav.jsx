import React from "react";
import nav from "./nav.config";
import NavItem from "./components/NavItem";
import CollapsibleGroup from "./components/CollapsibleGroup";
import useCollapsible from "./hooks/useCollapsible";

import { Sparkles } from "lucide-react";
import { openCommandMenu } from "../../store/uiSlice";
import { useDispatch } from "react-redux";

export default function SideNav() {
  const { isOpen, toggle } = useCollapsible(["leads"]);
  const dispatch = useDispatch();                        // ← required

  return (
    <nav
      aria-label="App sidebar"
      className="h-full flex flex-col text-sm select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600 font-medium">
            AL
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-gray-800">
                AI LeadGen
              </div>

              {/* Command Menu Icon */}
              <button
                onClick={() => dispatch(openCommandMenu())}   // ← FIXED
                aria-label="Open command menu"
                className="p-1 rounded hover:bg-gray-100 text-gray-500"
              >
                <Sparkles size={14} />
              </button>
            </div>

            <div className="text-xs text-gray-500">Workspace</div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-1">
        {nav.map((item) =>
          item.type === "group" ? (
            <CollapsibleGroup
              key={item.id}
              id={item.id}
              label={item.label}
              Icon={item.icon}
              children={item.children}
              open={isOpen(item.id)}
              onToggle={toggle}
            />
          ) : (
            <NavItem
              key={item.id}
              to={item.to}
              Icon={item.icon}
              label={item.label}
            />
          )
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-gray-100">
        <div className="hidden sm:flex text-[11px] text-gray-400 items-center gap-1">
          Press
          <kbd className="px-1 py-[1px] bg-gray-200 rounded border text-gray-700">
            Ctrl
          </kbd>
          +
          <kbd className="px-1 py-[1px] bg-gray-200 rounded border text-gray-700">
            K
          </kbd>
          to open Command Menu
        </div>

        <div className="sm:hidden text-[11px] text-gray-400 mt-1">
          Tap the menu icon to open commands
        </div>

        <div className="text-xs text-gray-500 mt-2">v1.0.0</div>
      </div>
    </nav>
  );
}
