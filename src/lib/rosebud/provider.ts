import { randomUUID } from "node:crypto";
import {
  getProviderConnectionById,
  getProviderConnections,
  createProviderConnection,
  updateProviderConnection,
} from "@/lib/db/providers";
import { getCustomModels, replaceCustomModels } from "@/lib/db/models";
import { saveRosebudCreditEvent, getRosebudCreditEvents } from "@/lib/db/rosebudCredits";
import { rosebudRuntime, type RosebudJob } from "@omniroute/open-sse/services/rosebud/runtime.ts";
import {
  RosebudError,
  runRosebud,
  rosebudProfile,
} from "@omniroute/open-sse/services/rosebud/cli.ts";
import { rosebudCatalogEntry } from "@omniroute/open-sse/services/rosebud/catalog.ts";

export async function rosebudConnection(id: string) {
  const connection = await getProviderConnectionById(id);
  if (!connection || connection.provider !== "rosebud")
    throw new RosebudError("connection_not_found", 404);
  const data = (connection.providerSpecificData || {}) as Record<string, unknown>;
  const profile = data.rosebudProfile;
  if (typeof profile !== "string") throw new RosebudError("profile_not_configured", 409);
  await rosebudProfile(profile);
  return { connection, profile };
}
export async function connectRosebud(name: string) {
  const profile = randomUUID();
  const login = await runRosebud(profile, ["login", "--agent-client", "other", "--name", name]);
  const connection = await createProviderConnection({
    provider: "rosebud",
    authType: "none",
    name,
    isActive: false,
    testStatus: "pending",
    providerSpecificData: { rosebudProfile: profile },
  });
  if (!connection) throw new RosebudError("connection_create_failed", 500);
  return { connectionId: connection.id, status: login.status, approval_url: login.approval_url };
}
export async function rosebudAccount(id: string) {
  const { profile, connection } = await rosebudConnection(id);
  const account = await rosebudRuntime.account(profile);
  await updateProviderConnection(id, {
    isActive: account.status === "active",
    testStatus: account.status === "active" ? "active" : "expired",
    providerSpecificData: {
      ...((connection.providerSpecificData as Record<string, unknown>) || {}),
      rosebudAccount: account,
      rosebudLastChecked: new Date().toISOString(),
    },
  });
  return {
    ...account,
    status: typeof account.status === "string" ? account.status : "unknown",
    usage: getRosebudCreditEvents(id),
    creditUnit: "rosebud_credits",
    usdCost: null,
  };
}
export async function discoverRosebud(id: string) {
  const { profile } = await rosebudConnection(id);
  const models = (await rosebudRuntime.models(profile)).map(rosebudCatalogEntry);
  const connection = await getProviderConnectionById(id);
  await updateProviderConnection(id, {
    providerSpecificData: { ...(connection?.providerSpecificData || {}), rosebudModels: models },
  });
  const connections = await getProviderConnections({ provider: "rosebud" });
  const merged = new Map(models.map((model) => [model.id, model]));
  for (const item of connections) {
    const cached = (item.providerSpecificData as Record<string, unknown> | undefined)
      ?.rosebudModels;
    if (item.id !== id && item.isActive && Array.isArray(cached))
      for (const entry of cached)
        if (
          entry &&
          typeof entry === "object" &&
          typeof entry.id === "string" &&
          entry.rosebud &&
          Array.isArray(entry.rosebud.outputFormats)
        )
          merged.set(entry.id, entry);
  }
  const manual = (await getCustomModels("rosebud")).filter((model) => model.source !== "auto-sync");
  // Only images fit this catalog's contract. Other modalities remain discoverable
  // through the Rosebud API/MCP catalog; none are fabricated as chat models.
  await replaceCustomModels(
    "rosebud",
    [...merged.values()]
      .filter(
        (model) =>
          model.type === "image" &&
          model.rosebud.outputFormats.some((format) =>
            ["png", "jpg", "jpeg", "webp"].includes(format)
          )
      )
      .map((model) => ({
        ...model,
        source: "auto-sync",
        apiFormat: "images-generations",
        supportedEndpoints: ["images"],
      }))
      .filter((model) => !manual.some((item) => item.id === model.id))
      .concat(manual)
  );
  return { provider: "rosebud", models, source: "rosebud-cli", creditUnit: "rosebud_credits" };
}
export function recordRosebudJob(connectionId: string, job: RosebudJob) {
  saveRosebudCreditEvent({
    id: job.id,
    connectionId,
    model: job.model,
    modality: job.category,
    status: job.status,
    estimatedCredits: job.estimatedCredits,
    actualCredits: job.actualCredits,
    refundedCredits: job.refundedCredits,
    updatedAt: job.updatedAt,
  });
}
export async function generateRosebud(connectionId: string, profile: string, request: unknown) {
  try {
    const job = await rosebudRuntime.generate(profile, request);
    recordRosebudJob(connectionId, job);
    return job;
  } catch (error) {
    if (error instanceof RosebudError && error.jobId) {
      recordRosebudJob(connectionId, await rosebudRuntime.read(profile, error.jobId));
    }
    throw error;
  }
}
export function publicRosebudJob(job: RosebudJob) {
  return {
    id: job.id,
    model: "rosebud/" + job.model,
    category: job.category,
    status: job.status,
    estimatedCredits: job.estimatedCredits,
    actualCredits: job.actualCredits,
    refundedCredits: job.refundedCredits,
    creditUnit: "rosebud_credits",
    usdCost: null,
    error: job.error,
    updatedAt: job.updatedAt,
  };
}
