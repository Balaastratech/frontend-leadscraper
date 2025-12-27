import React, { useRef } from "react";
import NavItem from "./NavItem";
import { ChevronRight } from "lucide-react";

/**
 * CollapsibleGroup - UI only.
 * Props:
 *  - id, label, Icon, children (array of child items)
 *  - open (bool)
 *  - onToggle (fn)
 */
function CollapsibleGroup({ id, label, Icon, children = [], open, onToggle }) {
  const btnRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(id);
    }
    // optional: add ArrowLeft / ArrowRight behavior if desired
  }

  return (
    <div>
      <button
        ref={btnRef}
        onClick={() => onToggle(id)}
        onKeyDown={handleKeyDown}
        aria-expanded={!!open}
        aria-controls={`group-${id}`}
        className="flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        type="button"
      >
        <span className="flex items-center gap-3">
          {Icon ? <Icon size={17} /> : null}
          <span>{label}</span>
        </span>

        <ChevronRight
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`group-${id}`}
        aria-hidden={!open}
        className={`pl-7 overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-screen" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-1 py-1">
          {children.map((child) => (
            <NavItem key={child.id} to={child.to} Icon={child.icon} label={child.label} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CollapsibleGroup);
