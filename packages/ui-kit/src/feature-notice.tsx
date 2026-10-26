"use client";

import { Slot } from "@radix-ui/react-slot";
import { useCallback, useRef } from "react";
import type { ComponentPropsWithoutRef, CSSProperties, ReactElement, ReactNode } from "react";
import { ControlHighlight } from "./control-highlight";
import { Toast } from "./toast";
import { cn } from "./lib/utils";

export type FeatureNoticeAlign = "start" | "end";
export type FeatureNoticeSide = "top" | "bottom";

export interface FeatureNoticeProps extends Omit<ComponentPropsWithoutRef<"div">, "children" | "title"> {
  /** Visibility and persistence belong to the application. */
  open: boolean;
  /** Called by the close button or a successful activation of the child control. */
  onDismiss: () => void;
  title: ReactNode;
  description: ReactNode;
  /** Optional decorative icon or labelled AvatarGroup before the title. */
  titleLeading?: ReactNode;
  /** One existing control that forwards its ref and click handler (including asChild triggers). */
  children: ReactElement;
  side?: FeatureNoticeSide;
  align?: FeatureNoticeAlign;
  /** Alignment below 640px. Defaults to align. */
  mobileAlign?: FeatureNoticeAlign;
  /** Preferred popup width in pixels; capped to the viewport with 16px gutters. */
  width?: number;
}

/** A persistent contextual announcement attached to an existing control. */
export function FeatureNotice({
  open, onDismiss, title, description, titleLeading, children,
  side = "bottom", align = "end", mobileAlign = align, width = 384,
  className, style, ...props
}: FeatureNoticeProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const dismiss = useCallback(() => {
    if (!open) return;
    if (noticeRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    onDismiss();
  }, [onDismiss, open]);

  return (
    <div
      {...props}
      data-slot="feature-notice"
      data-side={side}
      data-align={align}
      data-mobile-align={mobileAlign}
      className={cn("ci-feature-notice", className)}
      style={{ "--ci-feature-notice-width": `${width}px`, ...style } as CSSProperties}
    >
      <ControlHighlight active={open}>
        <Slot ref={triggerRef} onClick={(event) => { if (!event.defaultPrevented) dismiss(); }}>
          {children}
        </Slot>
      </ControlHighlight>
      {open && (
        <div ref={noticeRef} data-slot="feature-notice-content" className="ci-feature-notice__content">
          <Toast
            variant="accent"
            showIcon={false}
            title={
              <div className="ci-feature-notice__title">
                {titleLeading != null && <span className="ci-feature-notice__leading">{titleLeading}</span>}
                <span className="ci-feature-notice__title-text">{title}</span>
              </div>
            }
            description={description}
            duration={Infinity}
            onDismiss={dismiss}
          />
        </div>
      )}
    </div>
  );
}
