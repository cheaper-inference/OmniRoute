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

function providerData(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export async function rosebudConnection(id: string) {
  const connection = await getProviderConnectionById(id);
  if (!connection || connection.provider !== "rosebud")
    throw new RosebudError("connection_not_found", 404);
  const data = providerData(connection.providerSpecificData);
  const profile = data.rosebudProfile;
  if (typeof profile !== "string") throw new RosebudError("profile_not_configured", 409);
  await rosebudProfile(profile);
  return { connection, profile };
}
/** Limit first submissions to accounts whose current catalog supports this model. */
export async function rosebudModelConnections(model: string, allowed: string[] | null) {
  const ids: string[] = [];
  for (const connection of await getProviderConnections({ provider: "rosebud" })) {
    if (typeof connection.id !== "string") continue;
    if (!connection.isActive || (allowed?.length && !allowed.includes(connection.id))) continue;
    let data = connection.providerSpecificData as Record<string, unknown> | undefined;
    if (
      !Array.isArray(data?.rosebudModels) ||
      Date.now() - Date.parse(String(data?.rosebudModelsChecked || "")) > 300000 ||
      !data?.rosebudModelsChecked
    ) {
      try {
        await discoverRosebud(connection.id);
      } catch {
        continue;
      } // A pre-submit discovery failure must not hide healthy accounts.
      data = (await getProviderConnectionById(connection.id))?.providerSpecificData as
        Record<string, unknown> | undefined;
    }
    if (
      Array.isArray(data?.rosebudModels) &&
      data.rosebudModels.some(
        (entry) =>
          entry && typeof entry === "object" && entry.id === model.replace(/^rosebud\//, "")
      )
    )
      ids.push(connection.id);
  }
  return ids;
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
  const { profile } = await rosebudConnection(id);
  const account = await rosebudRuntime.account(profile);
  const latest = await getProviderConnectionById(id);
  await updateProviderConnection(id, {
    isActive: account.status === "active",
    testStatus: account.status === "active" ? "active" : "expired",
    providerSpecificData: {
      ...providerData(latest?.providerSpecificData),
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
    providerSpecificData: {
      ...providerData(connection?.providerSpecificData),
      rosebudModels: models,
      rosebudModelsChecked: new Date().toISOString(),
    },
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
export async function generateRosebud(
  connectionId: string,
  profile: string,
  request: unknown,
  signal?: AbortSignal | null
) {
  try {
    const job = await rosebudRuntime.generate(profile, request, signal);
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
