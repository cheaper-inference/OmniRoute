import { homedir } from "node:os";
import { NativeZcodeHostClient } from "../../executors/zcode/nativeHostClient.ts";
import type { ProviderCredentials } from "../../executors/base.ts";
import { join } from "node:path";
import { ZcodeAppServerClient, type ZcodeClientLike } from "../../executors/zcodeProtocol.ts";
import { createQuotaFromUsage, type UsageQuota } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

export interface ZcodeUsageOptions {
  clientFactory?: () => ZcodeClientLike;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function nativeClient(): ZcodeClientLike {
  const runtimeRoot = process.env.ZCODE_SERVER_RUNTIME_ROOT || join(homedir(), ".zcode", "server");
  const command = process.env.ZCODE_SERVER_NODE || join(runtimeRoot, "node");
  const entry = process.env.ZCODE_SERVER_ENTRY || join(runtimeRoot, "zcode-server.cjs");
  return new ZcodeAppServerClient({
    command,
    args: [entry],
    env: { ...process.env, ZCODE_SERVICE_AUTHORITY_MODE: "standalone-server" },
  });
}

function toQuota(snapshot: JsonRecord): UsageQuota | null {
  const quota = asRecord(snapshot.quota);
  const limits = Array.isArray(quota.limits) ? quota.limits.map(asRecord) : [];
  const entitlement = limits.find(
    (limit) => limit.meter === "model_usage" && limit.unitType === "token"
  );
  if (!entitlement) return null;

  const total = Number(entitlement.unit ?? entitlement.number);
  const used = Number(entitlement.usage ?? entitlement.currentValue);
  if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(used) || used < 0) return null;
  const result = createQuotaFromUsage(
    used,
    total,
    entitlement.nextResetTime ?? asRecord(snapshot.remaining).nextResetTime
  );
  const percent = Number(asRecord(snapshot.remaining).percentage ?? entitlement.percentage);
  if (Number.isFinite(percent)) {
    result.remainingPercentage = Math.max(0, Math.min(100, percent <= 1 ? percent * 100 : percent));
  }
  result.displayName = String(asRecord(quota).level || "ZCode");
  return result;
}

/** Read the signed-in ZCode account's current native entitlement without inference. */
export async function getZcodeUsage(
  provider: string,
  options: ZcodeUsageOptions = {}
): Promise<{ plan: string; quotas: Record<string, UsageQuota> } | { message: string }> {
  if (provider !== "zcode-start") return { message: "Unsupported ZCode plan." };

  const providerId = "account:zai-start-plan";
  const client = options.clientFactory?.() || nativeClient();
  try {
    await client.start();
    const raw = await client.call("usage-stats", "getEntitlementSnapshot", [
      {
        preferredProviderId: providerId,
        accountAccess: { accountType: "zai", mode: "start-plan" },
      },
    ]);
    const snapshot = asRecord(raw);
    if (snapshot.authenticated !== true || asRecord(snapshot.provider).id !== providerId) {
      return { message: "ZCode account entitlement is unavailable for the selected plan." };
    }
    const quota = toQuota(snapshot);
    if (!quota) return { message: "ZCode did not report a usable token entitlement." };
    const details = asRecord(snapshot.subscription).details;
    const detail = Array.isArray(details) ? asRecord(details[0]) : {};
    if (typeof detail.productName === "string") quota.displayName = detail.productName;
    return { plan: quota.displayName || "ZCode", quotas: { tokens: quota } };
  } catch {
    return { message: "Unable to read the signed-in ZCode account entitlement." };
  } finally {
    await client.close().catch(() => undefined);
  }
}

type ManagedCredentials = ProviderCredentials & { authType: "oauth"; connectionId: string };
type ManagedConnection = JsonRecord & {
  id?: string;
  authType?: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  providerSpecificData?: JsonRecord;
};
type ManagedUsageGroup = {
  plan: "start" | "individual";
  status: "available" | "unknown";
  observedAt: string | null;
  quotas: Record<string, UsageQuota>;
};
type ManagedUsageResult = JsonRecord & {
  quotas?: undefined;
  quotaGroups: ManagedUsageGroup[];
  message?: string;
};
type ManagedUsageOptions = {
  ensureHost?: (credentials: ManagedCredentials) => Promise<string>;
  clientFactory?: (serverRoot: string) => ZcodeClientLike;
};

function individualQuota(item: JsonRecord): { key: string; quota: UsageQuota } | null {
  if (!["CREDIT_LIMIT", "TOKENS_LIMIT"].includes(String(item.type))) return null;
  const key =
    item.unit === 3 && item.number === 5
      ? "session"
      : item.unit === 6 && item.number === 1
        ? "weekly"
        : null;
  const total = typeof item.usage === "number" ? item.usage : NaN;
  const used = typeof item.currentValue === "number" ? item.currentValue : NaN;
  if (
    !key ||
    !Number.isFinite(total) ||
    total <= 0 ||
    !Number.isFinite(used) ||
    used < 0 ||
    used > total
  )
    return null;
  const quota = createQuotaFromUsage(used, total, item.nextResetTime);
  applyRemaining(item, quota, total);
  quota.displayName = key === "session" ? "5 Hours Quota" : "Weekly Quota";
  return { key, quota };
}

function applyRemaining(item: JsonRecord, quota: UsageQuota, total: number): void {
  if (
    typeof item.remaining === "number" &&
    Number.isFinite(item.remaining) &&
    item.remaining >= 0 &&
    item.remaining <= total
  ) {
    quota.remaining = item.remaining;
    quota.remainingPercentage = (item.remaining / total) * 100;
  }
}

function individualQuotas(snapshot: JsonRecord): Record<string, UsageQuota> {
  const limits = Array.isArray(asRecord(snapshot.quota).limits)
    ? (asRecord(snapshot.quota).limits as unknown[])
    : [];
  const quotas: Record<string, UsageQuota> = {};
  for (const raw of limits) {
    const parsed = individualQuota(asRecord(raw));
    if (parsed) quotas[parsed.key] = parsed.quota;
  }
  return quotas;
}

function managedQuotas(
  raw: JsonRecord,
  plan: ManagedUsageGroup["plan"]
): Record<string, UsageQuota> {
  if (plan !== "start") return individualQuotas(raw);
  const quota = toQuota(raw);
  return quota ? { tokens: quota } : {};
}

async function readManagedGroup(
  client: ZcodeClientLike,
  family: unknown,
  plan: ManagedUsageGroup["plan"]
): Promise<ManagedUsageGroup> {
  const mode = plan === "start" ? "start-plan" : "individual-coding-plan";
  const providerId = `account:${family}-${mode}`;
  const group: ManagedUsageGroup = { plan, status: "unknown", observedAt: null, quotas: {} };
  try {
    const raw = asRecord(
      await client.call("usage-stats", "getEntitlementSnapshot", [
        {
          preferredProviderId: providerId,
          requirePreferredProvider: true,
          accountAccess: { accountType: family, mode },
        },
      ])
    );
    if (
      raw.authenticated === true &&
      !raw.unavailableReason &&
      asRecord(raw.provider).id === providerId
    ) {
      const quotas = managedQuotas(raw, plan);
      const observedAt =
        typeof raw.generatedAt === "number" && Number.isFinite(raw.generatedAt)
          ? new Date(raw.generatedAt)
          : null;
      if (Object.keys(quotas).length && observedAt && Number.isFinite(observedAt.getTime())) {
        group.status = "available";
        group.quotas = quotas;
        group.observedAt = observedAt.toISOString();
      }
    }
  } catch {
    /* Leave only this plan unknown; do not expose provider errors. */
  }
  return group;
}

/** Read two plan-scoped snapshots from a host bound to exactly one saved OAuth account. */
export async function getManagedZcodeUsage(
  connection: ManagedConnection,
  options: ManagedUsageOptions = {}
): Promise<ManagedUsageResult> {
  const plans = ["start", "individual"] as const;
  const unknown = (): ManagedUsageResult => ({
    quotaGroups: plans.map((plan) => ({ plan, status: "unknown", observedAt: null, quotas: {} })),
    message: "ZCode account quota is unavailable",
  });
  const data = asRecord(connection.providerSpecificData);
  const family = data.family;
  if (
    connection.authType !== "oauth" ||
    !connection.id ||
    !connection.accessToken ||
    !connection.idToken ||
    typeof data.userId !== "string" ||
    (family !== "zai" && family !== "bigmodel")
  )
    return unknown();
  const credentials: ManagedCredentials = {
    ...connection,
    authType: "oauth",
    connectionId: connection.id,
    providerSpecificData: data,
  };
  let client: ZcodeClientLike | undefined;
  try {
    let serverRoot: string;
    if (options.ensureHost) serverRoot = await options.ensureHost(credentials);
    else {
      const { nativeZcodeHosts } = await import("../../executors/zcode/nativeHostManager.ts");
      serverRoot = await nativeZcodeHosts.ensure(credentials);
    }
    client =
      options.clientFactory?.(serverRoot) ||
      new NativeZcodeHostClient({ serverRoot, startupTimeoutMs: 5_000, requestTimeoutMs: 10_000 });
    await client.start();
    const quotaGroups: ManagedUsageGroup[] = [];
    for (const plan of plans) {
      quotaGroups.push(await readManagedGroup(client, family, plan));
    }
    return { quotaGroups };
  } catch {
    return unknown();
  } finally {
    await client?.close().catch(() => undefined);
  }
}
