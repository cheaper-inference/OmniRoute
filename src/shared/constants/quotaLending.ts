/**
 * Bounds of a lending deadline, in epoch ms. Shared by the request schema, the database reader
 * and the dashboard badge, so they judge a deadline the same way.
 */

/** Any Unix time in seconds is below this value. */
export const LENDING_UNTIL_MIN_MS = 100_000_000_000;

/** The largest epoch ms a Date can hold. A later deadline cannot be formatted. */
export const LENDING_UNTIL_MAX_MS = 8_640_000_000_000_000;
