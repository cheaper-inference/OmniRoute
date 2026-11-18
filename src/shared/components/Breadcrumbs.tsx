"use client";

/**
 * Breadcrumbs — FASE-07 UX
 *
 * Dashboard breadcrumb navigation component. Automatically generates
 * breadcrumbs from the current path with friendly labels.
 * Uses usePathname() internally — no props needed.
 *
 * Usage:
 *   <Breadcrumbs />
 */

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@omniroute/ui-kit/breadcrumb";
import { breadcrumbLabelRefs, routeHasPage } from "@/shared/utils/breadcrumbTrail";
import { decodeRouteParam } from "@/shared/utils/decodeRouteParam";

type Translator = ((key: string) => string) & { has?: (key: string) => boolean };

/**
 * Friendly label of a path segment: the first translation that exists among the segment's
 * label sources (see `breadcrumbLabelRefs`), else the segment itself, capitalised (an id).
 */
function getLabel(
  segment: string,
  href: string,
  translators: Record<"breadcrumbs" | "sidebar", Translator>
) {
  for (const ref of breadcrumbLabelRefs(segment, href)) {
    const t = translators[ref.namespace];
    if (typeof t.has === "function" && t.has(ref.key)) return t(ref.key);
  }
  // usePathname() returns url.pathname verbatim — the URL's single encoding
  // layer (auto%2Ffast) — so one decode yields the display label.
  const decoded = decodeRouteParam(segment);
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("breadcrumbs");
  const tSidebar = useTranslations("sidebar");
  const tTeams = useTranslations("teamCosts");
  if (!pathname || pathname === "/dashboard") return null;

  const translators = { breadcrumbs: t, sidebar: tSidebar };
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return {
      label:
        seg === "teams" && segments[idx - 1] === "costs"
          ? tTeams("selectTeam")
          : getLabel(seg, href, translators),
      href,
      isLast: idx === segments.length - 1,
      // A prefix that only groups sub-routes has no page: its URL is a 404.
      hasPage: routeHasPage(href),
    };
  });

  return (
    <Breadcrumb aria-label={t("ariaLabel")} className="mb-2 py-2">
      <BreadcrumbList>
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.href}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage aria-current="page">{crumb.label}</BreadcrumbPage>
              ) : crumb.hasPage ? (
                // The kit BreadcrumbLink is a plain <a> (no asChild); next/link keeps client-side
                // navigation, so it carries the kit link slot + class itself.
                <Link href={crumb.href} data-slot="breadcrumb-link" className="ci-breadcrumb__link">
                  {crumb.label}
                </Link>
              ) : (
                // No page behind this segment: plain text in the trail, not a link to a 404.
                <span data-slot="breadcrumb-text" className="truncate">
                  {crumb.label}
                </span>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
