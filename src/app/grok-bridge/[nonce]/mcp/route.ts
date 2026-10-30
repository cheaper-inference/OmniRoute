import {
  handleGrokBridgeMethodNotAllowed,
  handleGrokBridgeOptions,
  handleGrokBridgeRequest,
} from "@omniroute/open-sse/services/grokBotBridgeProxy";
import { getGrokBotBridgeRegistry } from "@omniroute/open-sse/services/grokBotBridgeRegistry";

/**
 * Public Grok Bot tool-bridge route: `/grok-bridge/<nonce>/mcp`.
 *
 * The nonce segment matcher compiles the 22-character pattern
 * (`/grok-bridge/:nonce([A-Za-z0-9_-]{22})/mcp` in src/proxy.ts); the
 * pipeline re-checks the same shape before any registry access. The target
 * port comes only from the registry, never from request input (spec:
 * Public Route).
 */

export async function POST(request: Request, { params }: { params: Promise<{ nonce: string }> }): Promise<Response> {
  const { nonce } = await params;
  const url = new URL(request.url);
  return handleGrokBridgeRequest({
    request,
    upstreamPath: `${url.pathname}${url.search}`,
    nonce,
    registry: getGrokBotBridgeRegistry(),
  });
}

export function OPTIONS(): Response {
  return handleGrokBridgeOptions();
}

export const GET = POST;

export function PUT(): Response {
  return handleGrokBridgeMethodNotAllowed();
}

export function DELETE(): Response {
  return handleGrokBridgeMethodNotAllowed();
}

export function PATCH(): Response {
  return handleGrokBridgeMethodNotAllowed();
}
