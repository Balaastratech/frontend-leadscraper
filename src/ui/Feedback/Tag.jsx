import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import  Stack  from "../Layout/Stack";
import  Text from "../Typography/Text";

/**
 * Tag - Badge component for labels, categories, counters
 * 
 * Features:
 * - Multiple semantic variants (accent, success, warning, error, info)
 * - Size variants (xs, sm, md)
 * - Removable option with callback
 * - Accessible with ARIA labels
 * - Icon support
 * - Loading state
 * - Full keyboard navigation
 */

const Tag = forwardRef(({
  children,
  variant = "default",
  size = "sm",
  removable = false,
  onRemove,
  icon: IconComponent,
  loading = false,
  disabled = false,
  className = "",
  twin = "",
  ariaLabel,
  ...rest
}, ref) => {
  // Variant styles with proper contrast ratios
  const VARIANTS = {
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    accent: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    error: "bg-red-100 text-red-700 border border-red-200",
    info: "bg-blue-100 text-blue-700 border border-blue-200",
    muted: "bg-gray-50 text-gray-500 border border-gray-200",
  };

  const SIZES = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-sm",
    md: "px-3 py-1.5 text-base",
    lg: "px-4 py-2 text-lg",
  };

  const isInteractive = removable && !loading && !disabled;

  const handleKeyDown = (e) => {
    if (!isInteractive) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRemove?.();
    }
    
    if (e.key === 'Delete' && removable) {
      e.preventDefault();
      onRemove?.();
    }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    if (!disabled && !loading) {
      onRemove?.();
    }
  };

  return (
    <span
      ref={ref}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-full
        transition-all duration-150
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${loading ? "opacity-60 cursor-not-allowed" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isInteractive ? "cursor-pointer hover:opacity-80" : ""}
        ${twin}
        ${className}
      `}
      role={removable ? "button" : "status"}
      aria-label={ariaLabel || (typeof children === 'string' ? String(children) : "Tag")}
      aria-disabled={disabled || loading}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <Stack direction="horizontal" gap="1" align="center">
        {IconComponent && (
          <IconComponent 
            size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} 
            className="flex-shrink-0" 
          />
        )}
        <Text size={size} weight="medium" className="leading-none">
          {children}
        </Text>
        {removable && (
          <button
            type="button"
            aria-label={`Remove ${typeof children === 'string' ? children : 'tag'}`}
            onClick={handleRemoveClick}
            disabled={disabled || loading}
            className={`
              ml-1 inline-flex items-center justify-center
              rounded-full hover:bg-white/20
              focus:outline-none focus:ring-2 focus:ring-accent
              ${size === 'xs' ? 'w-4 h-4' : size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'}
              ${disabled || loading ? 'cursor-not-allowed opacity-50' : ''}
            `}
          >
            <span className="sr-only">Remove</span>
            <svg 
              width="8" 
              height="8" 
              viewBox="0 0 8 8" 
              fill="none" 
              aria-hidden="true"
            >
              <path 
                d="M1 1L7 7M7 1L1 7" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        {loading && (
          <span 
            className="ml-1 inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" 
            aria-label="Loading"
          />
        )}
      </Stack>
    </span>
  );
});

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'accent', 'success', 'warning', 'error', 'info', 'muted']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  icon: PropTypes.elementType,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  twin: PropTypes.string,
  ariaLabel: PropTypes.string,
};

Tag.defaultProps = {
  variant: "default",
  size: "sm",
  removable: false,
  loading: false,
  disabled: false,
};

Tag.displayName = "Tag";

export default Tag;