"use client";

import { CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import Checkbox from "@/shared/components/Checkbox";

const WEBHOOK_EVENTS = [
  "request.completed",
  "request.failed",
  "provider.error",
  "provider.recovered",
  "quota.exceeded",
  "combo.switched",
  "test.ping",
] as const;

interface EventChecklistProps {
  label?: string;
  selected: string[];
  onChange: (events: string[]) => void;
  allEventsLabel?: string;
}

export function EventChecklist({
  label,
  selected,
  onChange,
  allEventsLabel = "All events",
}: EventChecklistProps) {
  const isAll = selected.includes("*");

  const toggle = (event: string) => {
    if (event === "*") {
      onChange(["*"]);
      return;
    }
    const without = selected.filter((e) => e !== "*");
    const next = without.includes(event) ? without.filter((e) => e !== event) : [...without, event];
    onChange(next.length > 0 ? next : ["*"]);
  };

  return (
    <CheckboxGroup label={label}>
      <Checkbox label={allEventsLabel} checked={isAll} onChange={() => toggle("*")} />
      <div className="grid gap-2 sm:grid-cols-2">
        {WEBHOOK_EVENTS.map((ev) => (
          <Checkbox
            key={ev}
            label={<span className="font-mono text-xs">{ev}</span>}
            checked={isAll || selected.includes(ev)}
            onChange={() => toggle(ev)}
          />
        ))}
      </div>
    </CheckboxGroup>
  );
}
