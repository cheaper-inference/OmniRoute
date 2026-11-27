import { useFormatter } from "next-intl";

import type { FormatNumber } from "./quotaText";

/** The page's number formatter (its locale), in the shape the pure text helpers take. */
export function useFormatNumber(): FormatNumber {
  const format = useFormatter();
  return (value, options) => format.number(value, options);
}
