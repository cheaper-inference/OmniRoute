/**
 * Moves focus — and with it the scroll position of the enclosing dialog — to the first control
 * flagged `aria-invalid="true"` inside `container`. Forms call it after a refused submit, once
 * the inline messages have rendered, so the user lands on the field that needs fixing.
 */
export function focusFirstInvalidField(container: ParentNode | null | undefined): boolean {
  const field = container?.querySelector<HTMLElement>('[aria-invalid="true"]');
  if (!field) return false;
  field.focus();
  return true;
}
