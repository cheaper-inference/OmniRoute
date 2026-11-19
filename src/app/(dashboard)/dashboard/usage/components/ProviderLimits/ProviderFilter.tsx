"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@omniroute/ui-kit/popover";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";

type Props = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  labels: Record<string, string>;
  allLabel: string;
  ariaLabel: string;
};

/**
 * Multi-provider filter. The list is the kit Popover (body portal, collision-aware placement,
 * Escape and outside press to close, focus back on the trigger) so it is not clipped by the
 * quota card's overflow. An empty selection means every provider.
 */
export default function ProviderFilter({
  options,
  value,
  onChange,
  labels,
  allLabel,
  ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const summary = value.length ? value.map((id) => labels[id] || id).join(", ") : allLabel;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label={ariaLabel}
          className="min-w-48 max-w-full justify-between"
        >
          <span className="truncate">{summary}</span>
          <Icon name={open ? "expand_less" : "expand_more"} size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label={ariaLabel}
        sideOffset={4}
        className="max-h-72 w-72 max-w-[80vw] overflow-y-auto overscroll-contain p-2"
      >
        <div role="group" aria-label={ariaLabel}>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={() => onChange([])}
            className="justify-start"
          >
            {allLabel}
          </Button>
          {options.map((id) => (
            <Checkbox
              key={id}
              className="rounded px-2 py-2 text-sm hover:bg-bg"
              label={labels[id] || id}
              checked={value.includes(id)}
              onChange={(event) =>
                onChange(
                  event.target.checked ? [...value, id] : value.filter((item) => item !== id)
                )
              }
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
