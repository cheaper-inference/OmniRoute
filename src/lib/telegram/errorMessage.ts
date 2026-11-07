import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export function formatTelegramGatewayError(error: unknown): string {
  return `⚠️ Gateway error: ${sanitizeErrorMessage(error)}`;
}
