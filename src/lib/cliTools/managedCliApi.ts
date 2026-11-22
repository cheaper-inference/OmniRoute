import { NextResponse } from "next/server";
import { z } from "zod";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";
import { getManagedCliDefinition } from "@/shared/services/managedCliRuntime";
import { createLogger } from "@/shared/utils/logger";
import {
  listManagedCliRuntimes,
  updateManagedCliRuntime,
  ManagedCliRuntimeError,
} from "./managedCliRuntimes";
import { applyManagedCliUpdateEffects } from "./managedCliUpdateEffects";

const log = createLogger("managed-cli-api");
const actionSchema = z.discriminatedUnion("action", [
  z.strictObject({ action: z.literal("check") }),
  z.strictObject({
    action: z.literal("update"),
    toolId: z.string().regex(/^[a-z][a-z0-9-]{0,31}$/),
  }),
]);

interface ManagedCliApiDependencies {
  list?: typeof listManagedCliRuntimes;
  update?: typeof updateManagedCliRuntime;
  effects?: typeof applyManagedCliUpdateEffects;
}

function noStore(response: Response): Response {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function requireManagedCliLocality(request: Request): Response | null {
  // This trusted stamp is written by the peer guard; client-supplied copies are stripped there.
  const locality = request.headers.get(AUTHZ_HEADER_PEER_LOCALITY);
  if (locality !== "loopback" && locality !== "lan") {
    return noStore(
      createErrorResponse({
        status: 403,
        message: "CLI updates require a local connection to OmniRoute",
        details: { code: "LOCAL_ONLY" },
      })
    );
  }
  return null;
}

/** Guarded entry for callers outside the HTTP route. */
export async function handleManagedCliRequest(
  request: Request,
  dependencies: ManagedCliApiDependencies = {}
): Promise<Response> {
  const localityError = requireManagedCliLocality(request);
  if (localityError) return localityError;
  const authError = await requireCliToolsAuth(request, { alwaysRequireAuth: true });
  if (authError) return noStore(authError);
  return handleAuthorizedManagedCliRequest(request, dependencies);
}

/** Internal dispatch: HTTP routes must complete locality and management auth first. */
export async function handleAuthorizedManagedCliRequest(
  request: Request,
  dependencies: ManagedCliApiDependencies = {}
): Promise<Response> {
  try {
    if (request.method === "GET") {
      const items = await (dependencies.list ?? listManagedCliRuntimes)();
      return noStore(NextResponse.json({ items }));
    }
    if (request.method !== "POST") {
      return noStore(new Response(null, { status: 405, headers: { Allow: "GET, POST" } }));
    }
    return await handleManagedCliPost(request, dependencies);
  } catch (error) {
    const known = error instanceof ManagedCliRuntimeError;
    const code = known ? error.code : "UPDATE_FAILED";
    log.error({ code }, "Managed CLI request failed");
    return noStore(
      createErrorResponse({
        status: known ? error.httpStatus : 500,
        message: known
          ? error.message
          : "Unable to manage CLI runtimes. Check the application logs and retry.",
        details: { code },
      })
    );
  }
}

async function handleManagedCliPost(
  request: Request,
  dependencies: ManagedCliApiDependencies
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return noStore(createErrorResponse({ status: 400, message: "Invalid JSON body" }));
  }
  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return noStore(createErrorResponse({ status: 400, message: "Invalid CLI runtime action" }));
  }
  if (parsed.data.action === "check") {
    const items = await (dependencies.list ?? listManagedCliRuntimes)({ checkUpdates: true });
    return noStore(NextResponse.json({ items }));
  }
  if (!getManagedCliDefinition(parsed.data.toolId)) {
    return noStore(createErrorResponse({ status: 404, message: "Unsupported managed CLI tool" }));
  }
  const { activated, ...item } = await (dependencies.update ?? updateManagedCliRuntime)(
    parsed.data.toolId
  );
  const effects = activated
    ? (dependencies.effects ?? applyManagedCliUpdateEffects)(item)
    : { runtimeCacheInvalidated: false, clientVersionRefreshed: false };
  log.info(
    { toolId: item.id, version: item.installedVersion, activated },
    "Managed CLI update completed"
  );
  return noStore(NextResponse.json({ item, effects, activated }));
}
