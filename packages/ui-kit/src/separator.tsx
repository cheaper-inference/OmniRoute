import type { CSSProperties, ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorLabelAlign = "start" | "center" | "end";
export interface SeparatorProps extends Omit<ComponentProps<"div">, "children"> {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
  label?: ReactNode;
  align?: SeparatorLabelAlign;
  size?: number | string;
  thickness?: number | string;
  color?: string;
  children?: ReactNode;
}

const length = (value: number | string) => typeof value === "number" ? `${value}px` : value;
export function Separator({ className, orientation = "horizontal", decorative = true, label, align = "center", size, thickness, color, style, children, ...props }: SeparatorProps) {
  const content = label ?? children;
  const dimensions: CSSProperties = orientation === "vertical"
    ? { height: size == null ? undefined : length(size), width: thickness == null ? undefined : length(thickness) }
    : { width: size == null ? undefined : length(size), height: thickness == null ? undefined : length(thickness) };
  const custom = { ...dimensions, "--ci-separator-color": color, ...style } as CSSProperties;
  const a11y = decorative ? { role: "none" as const } : { role: "separator" as const, "aria-orientation": orientation };
  if (content != null && orientation === "horizontal") {
    return <div data-slot="separator" data-align={align} className={cn("ci-separator-label", className)} style={custom} {...a11y} {...props}><span aria-hidden="true" /><span>{content}</span><span aria-hidden="true" /></div>;
  }
  return <div data-slot="separator" data-orientation={orientation} className={cn("ci-separator", className)} style={custom} {...a11y} {...props} />;
}
