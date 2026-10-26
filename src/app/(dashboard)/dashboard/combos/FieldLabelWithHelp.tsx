"use client";

import { Label } from "@omniroute/ui-kit/label";
import InfoTooltip from "@/shared/components/InfoTooltip";

type FieldLabelWithHelpProps = {
  label: string;
  help: string;
  showHelp?: boolean;
  htmlFor?: string;
};

/**
 * Field label row for the combo editor: the kit `Label` (tied to the control by `htmlFor`) and,
 * beside it — not inside it, so the help text stays out of the control's accessible name — an
 * `InfoTooltip` trigger that is keyboard reachable.
 */
export default function FieldLabelWithHelp({
  label,
  help,
  showHelp = true,
  htmlFor,
}: FieldLabelWithHelpProps) {
  return (
    <div className="mb-1 flex items-center gap-1">
      <Label htmlFor={htmlFor}>{label}</Label>
      {showHelp && <InfoTooltip text={help} />}
    </div>
  );
}
