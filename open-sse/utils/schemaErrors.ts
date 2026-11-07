/**
 * Local failure while preparing a JSON Schema for a provider (Gemini/Antigravity
 * tool parameters or `response_format`). It describes the client's request, never
 * the account: every account and every retry would fail the same body the same way.
 *
 * Thrown during request translation, so handleChatCore's translation catch maps it
 * through createTranslationFailureResult() — `statusCode`/`errorType` become a 400
 * `invalid_request_error` built with buildErrorBody(), and the result carries the
 * request_translation_failed label that skips connection cooldown and the provider
 * breaker (#14815). The message is a fixed category plus an internally supplied
 * field location; it never echoes schema text or caller values.
 */
const SCHEMA_ERROR_MESSAGES = {
  schema_size: "Schema exceeds the configured processing budget",
  schema_depth: "Schema exceeds the configured nesting depth",
  schema_conflict: "Schema constraints have an empty intersection",
} as const;

export type SchemaErrorCode = keyof typeof SCHEMA_ERROR_MESSAGES;

export class SchemaPreparationError extends Error {
  readonly statusCode = 400;
  readonly errorType = "invalid_request_error";
  readonly code: SchemaErrorCode;
  readonly location: string;

  constructor(code: SchemaErrorCode, location = "schema") {
    super(`${SCHEMA_ERROR_MESSAGES[code]} (${location}).`);
    this.name = "SchemaPreparationError";
    this.code = code;
    this.location = location;
  }
}
