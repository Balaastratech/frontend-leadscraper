import React from "react";

/**
 * Upgraded Button primitive with forwardRef
 */

const VARIANTS = {
  default: "text-sm bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
  primary: "text-sm bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent",
  ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
  outline: "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
  link: "bg-transparent text-indigo-600 underline px-0 py-0",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

const RADIUS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const Button = React.forwardRef(function Button(
  {
    children,
    onClick,
    variant = "default",
    size = "md",
    radius = "md",
    loading = false,
    disabled = false,
    className = "",
    twin = "",
    type = "button",
    ...rest
  },
  ref
) {
  const v = VARIANTS[variant] || VARIANTS.default;
  const s = SIZES[size] || SIZES.md;
  const r = RADIUS[radius] || RADIUS.md;

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`
        inline-flex items-center justify-center
        transition font-medium
        ${v}
        ${s}
        ${r}
        ${isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${twin}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <span className="animate-spin border-2 border-t-transparent border-current rounded-full w-4 h-4" />
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
