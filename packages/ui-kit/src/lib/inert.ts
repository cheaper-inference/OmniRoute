import { version } from "react";

/**
 * Whether this React writes `inert` as a boolean attribute. React DOM 19 does; React DOM 18 does not know the
 * attribute, warns "Received `true` for a non-boolean attribute" and leaves a boolean out of the DOM, but writes
 * a string. React DOM 19 in turn leaves an empty string out, so the value has to follow the version.
 */
export function supportsBooleanInert(reactVersion: string = version): boolean {
  return Number.parseInt(reactVersion, 10) >= 19;
}

const BOOLEAN_INERT = supportsBooleanInert();

/**
 * Props that make an element inert when `active`, in the form the running React writes to the DOM (`true` on
 * React 19, `""` on React 18). Spread them on the element: `<div {...inertProps(loading)} />`. When `active` is
 * false they are empty, so the attribute is removed.
 */
export function inertProps(active: boolean | undefined, booleanInert: boolean = BOOLEAN_INERT): { inert?: boolean } {
  if (!active) return {};
  // React 18's types do not list `inert`; React 19's type it as boolean. The empty string is what React 18 writes.
  return { inert: (booleanInert ? true : "") as unknown as boolean };
}
