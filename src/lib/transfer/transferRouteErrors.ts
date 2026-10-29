import { createErrorResponse } from "@/lib/api/errorResponse";
import { ManagementPasswordAsCredentialError } from "@/lib/db/providers";
import { ProviderTransferInputError } from "./providerTransfer";
import { SealedPayloadError } from "./sealedPayload";

/**
 * Map a selective-transfer failure to a response. Operator-fixable errors keep
 * their (sanitized) message as a 400; anything else is logged and returns a
 * generic 500 so no stack, path or credential fragment reaches the client.
 */
export function transferErrorResponse(error: unknown, fallbackMessage: string): Response {
  if (
    error instanceof SealedPayloadError ||
    error instanceof ProviderTransferInputError ||
    error instanceof ManagementPasswordAsCredentialError
  ) {
    return createErrorResponse({ status: 400, message: error.message, type: "invalid_request" });
  }
  console.error("[Transfer]", fallbackMessage, error instanceof Error ? error.name : typeof error);
  return createErrorResponse({ status: 500, message: fallbackMessage, type: "server_error" });
}
