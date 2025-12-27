import React from "react";
import { NavLink } from "react-router-dom";

/**
 * NavItem - presentational, memoized.
 * Props:
 *  - to, Icon, label, ariaLabel
 */
function NavItem({ to, Icon, label, ariaLabel }) {
  const base = "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 text-sm";

  return (
    <NavLink
      end
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${base} bg-indigo-50 text-indigo-700 font-semibold`
          : `${base} text-gray-700 hover:bg-gray-100`
      }
      aria-label={ariaLabel || label}
    >
      {Icon ? <Icon size={17} className="shrink-0" /> : null}
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default React.memo(NavItem);
