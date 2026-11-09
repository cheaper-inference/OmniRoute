"use client";

// Deep import of the brand module only: the package barrel pulls all 73 kit files (Radix,
// charts…) into every importer of the logo — Sidebar, landing, login, error pages.
import { ProductIcon, ProductLockup } from "@omniroute/ui-kit/keak-brand";
import { cn } from "@/shared/utils/cn";

type OmniRouteLogoProps = { size?: number; className?: string };

/** Product glyph (connected waypoints) from the Keak brand system — inline SVG, basePath-safe. */
export default function OmniRouteLogo({ size = 20, className = "" }: OmniRouteLogoProps) {
  return (
    <ProductIcon
      product="omniroute"
      variant="glyph"
      width={size}
      height={size}
      // The kit's `.ci-keak-product-icon { width: 2em; height: 2em }` beats SVG presentation
      // attributes; inline style is what actually sizes the glyph in a browser.
      style={{ width: size, height: size }}
      aria-hidden="true"
      className={cn(className)}
      suppressHydrationWarning
    />
  );
}

interface OmniRouteLockupProps {
  name?: string | null;
  logoSrc?: string | null;
  className?: string;
}

/** Full "Keak OmniRoute" lockup; white-label operators get their own name/logo instead. */
export function OmniRouteLockup({ name, logoSrc, className }: OmniRouteLockupProps) {
  if (name || logoSrc) {
    return (
      <span
        role="img"
        aria-label={name || "OmniRoute"}
        className={cn("inline-flex items-center gap-2", className)}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- operator-supplied white-label logo (data: or remote URL), not a static/known asset
          <img src={logoSrc} alt="" className="size-6 object-contain" />
        ) : (
          <OmniRouteLogo size={24} />
        )}
        {name && (
          <span aria-hidden="true" className="truncate font-semibold">
            {name}
          </span>
        )}
      </span>
    );
  }
  return <ProductLockup product="omniroute" className={className} />;
}
