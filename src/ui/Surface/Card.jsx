import React from "react";

/**
 * Upgraded Card primitive.
 *
 * Retains full backward compatibility with your original version.
 * Adds:
 * - richer variants (elevated, soft, surface)
 * - stronger shadow + rounding tokens
 * - responsive padding support
 * - cleaner internal layering
 * - consistent typography scale
 * - better bg image handling
 */

const PAD = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};
export function CardSkeleton({ className = "" }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

// Responsive padding support: { base:"md", md:"lg" }
function resolvePadding(padding) {
  if (typeof padding === "string") return PAD[padding] || PAD.md;

  if (typeof padding === "object") {
    const base = PAD[padding.base] || PAD.md;
    const md = padding.md ? PAD[padding.md] : null;

    return `
      ${base}
      ${md ? `md:${md}` : ""}
    `;
  }

  return PAD.md;
}

const VAR = {
  default: "bg-white border border-gray-200 rounded-lg shadow-sm",
  outline: "bg-white border border-gray-300 rounded-lg",
  subtle: "bg-gray-50 border border-gray-200 rounded-lg",

  // New visual variants
  elevated: "bg-white rounded-lg shadow-md border border-gray-100",
  soft: "bg-gray-100 rounded-lg border border-gray-200 shadow-sm",
  surface: "bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm",
};

// Optional shadow + radius tokens
const RADIUS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const SHADOW = {
  none: "",
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const SIZE_MAP = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function Card({
  children,
  padding = "md",
  variant = "default",
  fullHeight = false,

  radius = "lg",
  shadow = "sm",

  bgImage = null,
  imageAsset = null,
  bgCover = true,
  bgPosition = "center",
  bgOverlay = false,

  size = "md",
  twin = "",
  className = "",

  as: Component = "div",
  ...rest
}) {
  const paddingClass = resolvePadding(padding);
  const variantClass = VAR[variant] || VAR.default;
  const radiusClass = RADIUS[radius] || RADIUS.lg;
  const shadowClass = SHADOW[shadow] || SHADOW.sm;
  const heightClass = fullHeight ? "h-full" : "";
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  const backgroundImage = bgImage
    ? `url(${bgImage})`
    : imageAsset
    ? `url(${imageAsset})`
    : undefined;

  const bgStyle = backgroundImage
    ? {
        backgroundImage,
        backgroundSize: bgCover ? "cover" : "auto",
        backgroundPosition: bgPosition,
      }
    : {};

  return (
    <Component
      className={`
        w-full max-w-none
        ${variantClass}
        ${radiusClass}
        ${shadowClass}
        ${paddingClass}
        ${heightClass}
        ${sizeClass}
        relative overflow-hidden
        transition-all duration-150
        ${twin}
        ${className}
      `}
      style={bgStyle}
      {...rest}
    >
      {/* Overlay */}
      {bgOverlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      )}

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
}
