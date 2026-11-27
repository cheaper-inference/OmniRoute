import { pickDisplayValue } from "@/shared/utils/maskEmail";

export function hideUnmaskableEmailLabel(
  rawLabel: string | null | undefined,
  emailsVisible: boolean
): string | null {
  const label = rawLabel?.trim();
  if (!label) return null;

  const displayLabel = pickDisplayValue([label], emailsVisible);
  return !emailsVisible && label.includes("@") && displayLabel === label ? null : displayLabel;
}
