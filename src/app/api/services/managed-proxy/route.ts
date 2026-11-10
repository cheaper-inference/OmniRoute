import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { commitManagedProxy } from "@/lib/db/proxies/managedRegistry";
import { inlineProxyAssignmentSchema } from "@/shared/validation/schemas/proxy";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import {
  managedEntries,
  managedRoot,
  saveManagedProxy,
  startManagedProxyCore,
  stopManagedProxyCore,
} from "@/lib/services/managedProxy/manager";
import { getSupervisor } from "@/lib/services/registry";
import { officialRelease } from "@/lib/services/managedProxy/releases";
import { FragmentSchema } from "@/lib/services/managedProxy/fragment";
import { readCoreSelection, importCustomBinary } from "@/lib/services/managedProxy/selection";
import { listCoreReleases, resolveCoreRelease } from "@/lib/services/managedProxy/catalog";
import { changeManagedCore } from "@/lib/services/managedProxy/update";
import { testManagedSource } from "@/lib/services/managedProxy/testSource";
import { previewManagedSubscription } from "@/lib/services/managedProxy/subscription";

export const runtime = "nodejs";
const CoreSchema = z.enum(["singbox", "xray"]);
const SaveSchema = z
  .object({
    core: CoreSchema,
    name: z.string().trim().min(1).max(120),
    sourceLink: z.string().trim().min(1).max(65536),
    id: z.string().uuid().optional(),
    assignment: inlineProxyAssignmentSchema.optional(),
    fragment: FragmentSchema.optional(),
  })
  .strict();
const DistributionSchema = z.enum(["singbox", "xray", "mahsa"]);
const LifecycleSchema = z.discriminatedUnion("action", [
  z.object({ core: CoreSchema, action: z.literal("start") }).strict(),
  z.object({ core: CoreSchema, action: z.literal("stop") }).strict(),
  z
    .object({ core: CoreSchema, action: z.literal("releases"), distribution: DistributionSchema })
    .strict(),
  z
    .object({
      core: CoreSchema,
      action: z.literal("update"),
      distribution: DistributionSchema,
      version: z.string().min(1).max(64),
    })
    .strict(),
  z
    .object({
      core: CoreSchema,
      action: z.literal("custom"),
      path: z.string().min(1).max(4096),
      sha256: z.string().regex(/^[a-fA-F0-9]{64}$/),
      acknowledgeUntrustedCode: z.literal(true),
    })
    .strict(),
  z
    .object({
      core: CoreSchema,
      action: z.literal("test"),
      sourceLink: z.string().trim().min(1).max(65536),
      fragment: FragmentSchema.optional(),
    })
    .strict(),
  z
    .object({
      core: CoreSchema,
      action: z.literal("subscription"),
      url: z.string().url().max(8192),
    })
    .strict(),
]);

async function guard(request: Request): Promise<Response | null> {
  // Central services classification checks the real peer before auth; also fail closed on
  // direct raw-Next invocation where the trusted locality stamp is missing.
  if (request.headers.get(AUTHZ_HEADER_PEER_LOCALITY) !== "loopback")
    return createErrorResponse({
      status: 403,
      message: "Managed proxy cores require local access",
      type: "invalid_request",
    });
  return requireManagementAuth(request, { alwaysRequireAuth: true });
}

function failure(error: unknown): Response {
  // Never expose raw native stderr, decrypted sources, or parser payloads.
  const message =
    error instanceof Error &&
    /^(Unsupported|Invalid|Duplicate|Malformed|TLS|REALITY|Xray|sing-box|Native|Managed|Official|Installed|STORAGE_ENCRYPTION_KEY|No verified|No distinct|Save a|This protocol|Transport options|Proxy upstream|VMess upstream|Shadowsocks password)/.test(
      error.message
    )
      ? error.message
      : "Managed proxy operation failed";
  return createErrorResponse({ status: 400, message, type: "invalid_request" });
}

export async function GET(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    return Response.json(
      {
        cores: ["singbox", "xray"].map((core: "singbox" | "xray") => {
          const selection = readCoreSelection(core, managedRoot());
          return {
            core,
            state: getSupervisor(`managed-proxy-${core}`)?.getStatus().state || "stopped",
            entries: managedEntries(core),
            selection,
            distribution: selection?.source === "official" ? selection.distribution : core,
            version:
              selection?.source === "custom"
                ? `custom-${selection.sha256.slice(0, 12)}`
                : selection?.version || officialRelease(core).version,
          };
        }),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    const input = SaveSchema.safeParse(await request.json());
    if (!input.success)
      return createErrorResponse({
        status: 400,
        message: "Invalid managed proxy save fields",
        type: "invalid_request",
      });
    const { assignment, ...save } = input.data;
    const result = await saveManagedProxy(save, (entry) => commitManagedProxy(entry, assignment));
    clearDispatcherCache();
    return Response.json(result, { status: 201 });
  } catch (error) {
    return failure(error);
  }
}

export async function PATCH(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    const input = LifecycleSchema.safeParse(await request.json());
    if (!input.success)
      return createErrorResponse({
        status: 400,
        message: "Invalid managed core lifecycle fields",
        type: "invalid_request",
      });
    const data = input.data;
    let result: unknown = { success: true };
    if (data.action === "stop") await stopManagedProxyCore(data.core);
    else if (data.action === "start") await startManagedProxyCore(data.core);
    else if (data.action === "releases")
      result = { releases: await listCoreReleases(data.core, data.distribution) };
    else if (data.action === "update") {
      const selection = await resolveCoreRelease(data.core, data.distribution, data.version);
      await changeManagedCore(data.core, selection);
    } else if (data.action === "custom") {
      const selection = await importCustomBinary(
        data.core,
        data.path,
        data.sha256,
        data.acknowledgeUntrustedCode,
        managedRoot()
      );
      await changeManagedCore(data.core, selection);
    } else if (data.action === "test")
      result = await testManagedSource(
        data.core,
        data.sourceLink,
        undefined,
        undefined,
        data.fragment
      );
    else if (data.action === "subscription")
      result = await previewManagedSubscription(data.core, data.url);
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return failure(error);
  }
}
