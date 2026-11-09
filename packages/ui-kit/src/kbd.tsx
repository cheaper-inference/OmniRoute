import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export type KbdSize = "sm" | "md";

export interface KbdProps extends ComponentProps<"kbd"> {
  /** `sm` is 20px high (default), `md` 24px. Inside a `KbdGroup` an unset size follows the group. */
  size?: KbdSize;
  /**
   * The key's name for symbols such as ⌘, ⇧ or ↵ ("Command", "Shift", "Enter"). It becomes the
   * tooltip `title` (unless `title` is set) and visually hidden text read in place of the glyph.
   */
  label?: string;
}

/** One key of a keyboard shortcut, safe inside running text and buttons. */
export function Kbd({ size, label, title, className, children, ...props }: KbdProps) {
  const named = label !== undefined && label !== "";
  return (
    <kbd {...props} data-slot="kbd" data-size={size} title={title ?? (named ? label : undefined)} className={cn("ci-kbd", className)}>
      {named ? (
        <>
          <span aria-hidden="true">{children}</span>
          <span className="ci-sr-only">{label}</span>
        </>
      ) : (
        children
      )}
    </kbd>
  );
}

export interface KbdGroupProps extends ComponentProps<"kbd"> {
  /** Size of every `Kbd` inside that does not set its own. Defaults to `sm`. */
  size?: KbdSize;
}

/**
 * A key combination or sequence: `<KbdGroup><Kbd label="Command">⌘</Kbd><Kbd>K</Kbd></KbdGroup>`.
 * Renders a `<kbd>` around the keys, as HTML specifies for key combinations; text between the
 * keys (such as "+" or "then") is yours to add.
 */
export function KbdGroup({ size = "sm", className, ...props }: KbdGroupProps) {
  return <kbd {...props} data-slot="kbd-group" data-size={size} className={cn("ci-kbd-group", className)} />;
}
