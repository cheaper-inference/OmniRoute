/**
 * Field limits shared by a dashboard form and the Zod schema of the route that receives it.
 * The form shows an inline message at the limit and the route refuses beyond it; importing the
 * same constant on both sides keeps the two from drifting apart.
 */

/** `name` of POST /api/cli/tokens (Settings › Access tokens). */
export const ACCESS_TOKEN_NAME_MAX_LENGTH = 100;

/** `url` of POST/PUT /api/webhooks and POST /api/webhooks/validate-url. */
export const WEBHOOK_URL_MAX_LENGTH = 2000;

/** `secret` of POST/PUT /api/webhooks (the HMAC signing key of a custom webhook). */
export const WEBHOOK_SECRET_MAX_LENGTH = 500;

/** `name` of POST /api/evals/suites and PUT /api/evals/suites/:id (Quality › New suite). */
export const EVAL_SUITE_NAME_MAX_LENGTH = 200;

/** `description` of the same eval suite save routes. */
export const EVAL_SUITE_DESCRIPTION_MAX_LENGTH = 2000;

/** `cases[].name` of the same eval suite save routes. */
export const EVAL_CASE_NAME_MAX_LENGTH = 200;
