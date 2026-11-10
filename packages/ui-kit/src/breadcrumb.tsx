import type { ComponentProps } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "./lib/utils";

export function Breadcrumb({ className, ...props }: ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" data-slot="breadcrumb" className={cn("ci-breadcrumb", className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return <ol data-slot="breadcrumb-list" className={cn("ci-breadcrumb__list", className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("ci-breadcrumb__item", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: ComponentProps<"a">) {
  return <a data-slot="breadcrumb-link" className={cn("ci-breadcrumb__link", className)} {...props} />;
}

export function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return <span aria-current="page" data-slot="breadcrumb-page" className={cn("ci-breadcrumb__page", className)} {...props} />;
}

export function BreadcrumbSeparator({ className, children, ...props }: ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden="true" data-slot="breadcrumb-separator" className={cn("ci-breadcrumb__separator", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span aria-hidden="true" data-slot="breadcrumb-ellipsis" className={cn("ci-breadcrumb__ellipsis", className)} {...props}>
      <MoreHorizontal />
      <span className="ci-sr-only">More</span>
    </span>
  );
}
