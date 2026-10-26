"use client";

import { Children, cloneElement, isValidElement, useEffect, useState } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "./lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";

export function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  return `${words[0]?.[0] ?? ""}${words.length > 1 ? words[words.length - 1]?.[0] ?? "" : ""}`.toUpperCase();
}

export interface AvatarProps extends ComponentProps<"span"> {
  size?: AvatarSize;
  shape?: AvatarShape;
  src?: string;
  name?: string;
  alt?: string;
  fallback?: ReactNode;
}

export function Avatar({ className, size = "md", shape = "circle", src, name, alt, fallback, children, ...props }: AvatarProps) {
  const structured = src != null || name != null || fallback != null;
  return (
    <span data-slot="avatar" data-size={size} data-shape={shape} className={cn("ci-avatar", `ci-avatar--${size}`, `ci-avatar--${shape}`, className)} {...props}>
      {structured ? (
        <>
          {src != null && <AvatarImage src={src} alt={alt ?? name ?? ""} />}
          <AvatarFallback>{fallback ?? (name ? initials(name) : null)}</AvatarFallback>
        </>
      ) : children}
    </span>
  );
}

export type AvatarImageProps = ComponentProps<"img">;

export function AvatarImage({ className, onError, ...props }: AvatarImageProps) {
  const [errored, setErrored] = useState(false);
  useEffect(() => setErrored(false), [props.src]);
  if (errored) return null;
  return <img data-slot="avatar-image" className={cn("ci-avatar__image", className)} onError={(event) => { setErrored(true); onError?.(event); }} {...props} />;
}

export type AvatarFallbackProps = ComponentProps<"span">;

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return <span data-slot="avatar-fallback" className={cn("ci-avatar__fallback", className)} {...props} />;
}

export interface AvatarGroupProps extends ComponentProps<"div"> {
  size?: AvatarSize;
  shape?: AvatarShape;
  max?: number;
}

export function AvatarGroup({ className, size = "md", shape = "circle", max, children, ...props }: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const shown = max != null ? items.slice(0, max) : items;
  const overflow = items.length - shown.length;
  return (
    <div data-slot="avatar-group" className={cn("ci-avatar-group", className)} {...props}>
      {shown.map((item, index) => (
        <span className="ci-avatar-group__item" key={index}>
          {cloneElement(item as ReactElement<AvatarProps>, {
            size: (item.props as AvatarProps).size ?? size,
            shape: (item.props as AvatarProps).shape ?? shape,
          })}
        </span>
      ))}
      {overflow > 0 && (
        <span className="ci-avatar-group__item">
          <Avatar size={size} shape={shape} fallback={`+${overflow}`} aria-label={`${overflow} more members`} />
        </span>
      )}
    </div>
  );
}
