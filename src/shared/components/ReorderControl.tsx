"use client";

import { cn } from "@/shared/utils/cn";
import Button from "./Button";
import Icon from "./Icon";

interface ReorderControlProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  upLabel?: string;
  downLabel?: string;
  className?: string;
}

/** Compact up/down pair used to change an item's priority in a list. */
export default function ReorderControl({
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
  upLabel = "Move up",
  downLabel = "Move down",
  className,
}: ReorderControlProps) {
  // Compact (20px) kit ghost icon buttons: the kit's min-height is reset so the pair stays
  // the height of one list row.
  const btn = "size-5 min-h-5 min-w-5 rounded text-text-muted hover:text-primary";
  return (
    <div className={cn("flex shrink-0 flex-col", className)}>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onMoveUp}
        disabled={isFirst}
        aria-label={upLabel}
        className={btn}
      >
        <Icon name="keyboard_arrow_up" size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onMoveDown}
        disabled={isLast}
        aria-label={downLabel}
        className={btn}
      >
        <Icon name="keyboard_arrow_down" size={18} />
      </Button>
    </div>
  );
}
