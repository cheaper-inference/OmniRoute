// The masker can leave short email addresses fully visible.
export function hideExposedEmailLabel(
  rawLabel: string | null | undefined,
  displayLabel: string | null | undefined,
  emailsVisible: boolean
): string | null {
  if (!displayLabel?.trim()) return null;

  const label = rawLabel?.trim();
  return !emailsVisible && label?.includes("@") && displayLabel === label ? null : displayLabel;
}
