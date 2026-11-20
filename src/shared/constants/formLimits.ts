/**
 * Field limits shared by a dashboard form and the Zod schema of the route that receives it.
 * The form shows an inline message at the limit and the route refuses beyond it; importing the
 * same constant on both sides keeps the two from drifting apart.
 */

/** `name` of POST /api/cli/tokens (Settings › Access tokens). */
export const ACCESS_TOKEN_NAME_MAX_LENGTH = 100;
