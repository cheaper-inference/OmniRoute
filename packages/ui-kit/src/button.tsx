"use client";

import { Slot } from "@radix-ui/react-slot";
import { cloneElement, forwardRef, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement, ReactNode, SyntheticEvent } from "react";
import { cn } from "./lib/utils";
import { SpinnerGraphic } from "./lib/spinner-graphic";
import { TooltipRoot } from "./lib/tooltip-root";
import { TooltipContent, TooltipTrigger, type TooltipSide } from "./tooltip";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "destructive-ghost"
  | "warning"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "assistant";

/** `2xs` and `icon-2xs` are the 24px dense sizes for row and inline actions. */
export type ButtonSize =
  | "default"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "icon"
  | "icon-2xs"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg";

/** Quieter resting ink. Omit it to keep the variant's own colours. */
export type ButtonTone = "muted";

export function buttonVariants(
  options: { variant?: ButtonVariant; size?: ButtonSize; tone?: ButtonTone; className?: string } = {},
): string {
  const { variant = "default", size = "default", tone, className } = options;
  return cn(
    "ci-button",
    `ci-button--${variant}`,
    `ci-button--size-${size}`,
    tone && `ci-button--tone-${tone}`,
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * `muted` rests on the muted text colour and takes the variant's own hover, for secondary
   * actions in rows and toolbars. It applies to `ghost`, `outline` and `secondary`.
   */
  tone?: ButtonTone;
  loading?: boolean;
  /** Native form navigation must retain an enabled submitter until the browser serializes it. */
  disableWhileLoading?: boolean;
  asChild?: boolean;
  /**
   * Shows the kit Tooltip on hover and keyboard focus, with no element around the button. On an
   * icon size, a string tooltip also names the button unless `aria-label` does. While `disabled`
   * or `loading`, the button stays focusable (`aria-disabled` instead of `disabled`) so the
   * tooltip can still be read; it runs no click, pointer-press or key handler and submits nothing.
   */
  tooltip?: ReactNode;
  /** The side of the button the tooltip opens on. Defaults to `top`. */
  tooltipSide?: TooltipSide;
}

function ButtonSpinner() {
  return <SpinnerGraphic className="ci-button__spinner" />;
}

function blockActivation(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * An inactive Button with a tooltip is not `disabled`, so that it can still be hovered and
 * focused. These props make it act like a disabled one: no default action (submit, navigation,
 * a middle-click on a link), no click reaching a parent, and none of the caller's activation
 * handlers, in the capture phase either.
 */
const SOFT_DISABLED_PROPS = {
  "aria-disabled": true,
  "data-soft-disabled": "true",
  onClick: blockActivation,
  onAuxClick: blockActivation,
  onDoubleClick: undefined,
  onMouseDown: undefined,
  onMouseUp: undefined,
  onPointerDown: undefined,
  onPointerUp: undefined,
  onKeyDown: undefined,
  onKeyUp: undefined,
  onClickCapture: undefined,
  onAuxClickCapture: undefined,
  onDoubleClickCapture: undefined,
  onMouseDownCapture: undefined,
  onMouseUpCapture: undefined,
  onPointerDownCapture: undefined,
  onPointerUpCapture: undefined,
  onKeyDownCapture: undefined,
  onKeyUpCapture: undefined,
} as const;

interface TooltipTargetProps {
  /** The tooltip's own id, set by the tooltip trigger while the tooltip is open. */
  "aria-describedby"?: string;
  /** The caller's `aria-describedby`. */
  describedBy: string | undefined;
  /** False when the tooltip only repeats the accessible name. */
  describes: boolean;
  children: ReactElement<Record<string, unknown>>;
}

/** Sits between the tooltip trigger and the button to merge the two `aria-describedby` values. */
const TooltipTarget = forwardRef<HTMLElement, TooltipTargetProps>(function TooltipTarget(
  { "aria-describedby": tooltipId, describedBy, describes, children, ...triggerProps },
  ref,
) {
  const ids = [describedBy, describes ? tooltipId : undefined].filter(Boolean).join(" ") || undefined;
  return <Slot ref={ref} {...triggerProps}>{cloneElement(children, { "aria-describedby": ids })}</Slot>;
});

const asString = (value: unknown) => (typeof value === "string" ? value : undefined);

/**
 * The text the children give the button, or undefined when the JSX alone does not tell: a
 * component can render anything, and an element with a name of its own is not read by its text.
 */
function childText(node: ReactNode): string | undefined {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    let text = "";
    for (const child of node) {
      const part = childText(child);
      if (part === undefined) return undefined;
      text += part;
    }
    return text;
  }
  if (!isValidElement<Record<string, unknown>>(node)) return undefined;
  const { props } = node;
  // Hidden content is not part of the accessible name.
  if (props["aria-hidden"] === true || props["aria-hidden"] === "true") return "";
  if (props.hidden != null && props.hidden !== false) return "";
  if (typeof node.type !== "string") return undefined;
  // An explicit name wins over alt and over the text inside, and it is not read here.
  if (props["aria-label"] != null || props["aria-labelledby"] != null || props.title != null) return undefined;
  if (node.type === "img") return typeof props.alt === "string" ? props.alt : undefined;
  return childText(props.children as ReactNode);
}

/** `tooltip=""` and `tooltip={condition && "…"}` mean no tooltip, as they render nothing. */
const hasContent = (node: ReactNode) => node != null && typeof node !== "boolean" && node !== "";

/**
 * Wraps the rendered button in the kit tooltip, which adds no element. `own` is what the element
 * was rendered with: it tells whether the tooltip names the button, repeats its name or describes it.
 */
function attachTooltip(
  element: ReactElement<Record<string, unknown>>,
  own: Record<string, unknown>,
  tooltip: ReactNode,
  side: TooltipSide | undefined,
  iconOnly: boolean,
) {
  const text = asString(tooltip)?.trim();
  const named = own["aria-label"] != null || own["aria-labelledby"] != null;
  // An icon-only button with no name of its own takes a string tooltip as its name.
  const fallbackLabel = iconOnly && !named && text ? text : undefined;
  // The name the button has without the tooltip: aria-label wins over the text of the children.
  // It is undefined when it cannot be read here (aria-labelledby, a component child): the tooltip
  // then stays a description, since dropping it by a guess would hide what it adds.
  const ownName = own["aria-labelledby"] != null
    ? undefined
    : asString(own["aria-label"])?.trim() ?? childText(own.children as ReactNode)?.replace(/\s+/g, " ").trim();
  const repeatsName = text !== undefined && (fallbackLabel !== undefined || ownName === text);
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>
        <TooltipTarget describedBy={asString(own["aria-describedby"])} describes={!repeatsName}>
          {fallbackLabel ? cloneElement(element, { "aria-label": fallbackLabel }) : element}
        </TooltipTarget>
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </TooltipRoot>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "default",
    size = "default",
    tone,
    loading = false,
    disableWhileLoading = true,
    disabled,
    asChild = false,
    children,
    tooltip,
    tooltipSide,
    ...props
  },
  ref,
) {
  const classes = buttonVariants({ variant, size, tone, className });
  const inactive = disabled || (loading && disableWhileLoading);
  const iconOnly = size.startsWith("icon");
  const hasTooltip = hasContent(tooltip);
  const softDisabled = hasTooltip && inactive ? SOFT_DISABLED_PROPS : undefined;
  const withTooltip = (element: ReactElement<Record<string, unknown>>, own: Record<string, unknown>) =>
    hasTooltip ? attachTooltip(element, own, tooltip, tooltipSide, iconOnly) : element;
  const content = (
    <>
      {loading && <ButtonSpinner />}
      {loading && iconOnly ? null : children}
    </>
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return withTooltip(cloneElement(child, {
      ...props,
      ...(tone ? { "data-tone": tone } : {}),
      "aria-busy": loading || undefined,
      "aria-disabled": inactive || undefined,
      ...softDisabled,
      className: cn(classes, child.props.className as string | undefined),
      children: loading ? (
        <>
          <ButtonSpinner />
          {iconOnly ? null : child.props.children as ReactNode}
        </>
      ) : (
        (child.props.children as ReactNode)
      ),
    }), { ...child.props, ...props });
  }

  return withTooltip(
    <button
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-tone={tone}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={classes}
      disabled={softDisabled ? undefined : inactive}
      {...props}
      {...softDisabled}
    >
      {content}
    </button>,
    { ...props, children },
  );
});
