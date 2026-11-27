import crypto from "node:crypto";
import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";

export type AntigravityCredentialsLike = {
  accessToken?: string | null;
  connectionId?: string | null;
  email?: string | null;
  projectId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
  _antigravitySessionKey?: string | null;
};
export interface AntigravityEnvelopeIdentity {
  requestId: string;
  sessionId: string;
  labels: Record<string, string>;
}

/**
 * Live `v1internal:fetchAvailableModels` -> `model` protobuf enum map captured from
 * `agy 1.5.18`. Used for the CLI profile's `request.labels.model_enum`.
 */
export const ANTIGRAVITY_CLI_MODEL_ENUMS: Readonly<Record<string, string>> = Object.freeze({
  "gemini-4-hydrogen-high": "MODEL_PLACEHOLDER_M525",
  "gemini-4-hydrogen-medium": "MODEL_PLACEHOLDER_M526",
  "gemini-4-hydrogen-low": "MODEL_PLACEHOLDER_M527",
  "gemini-4-hydrogen-xhigh": "MODEL_PLACEHOLDER_M528",
  "gemini-4-hydrogen-tiered-high": "MODEL_PLACEHOLDER_M530",
  "gemini-4-hydrogen-tiered-xhigh": "MODEL_PLACEHOLDER_M531",
  "gemini-4-hydrogen-sonar": "MODEL_PLACEHOLDER_M578",
  "gemini-4-neon-disabled": "MODEL_PLACEHOLDER_M536",
  "gemini-4-carbon-disabled": "MODEL_PLACEHOLDER_M670",
  "gemini-4-argon-disabled": "MODEL_PLACEHOLDER_M421",
  "gemini-3.8-flash-high": "MODEL_PLACEHOLDER_M318",
  "gemini-3.8-flash-medium": "MODEL_PLACEHOLDER_M319",
  "gemini-3.8-flash-low": "MODEL_PLACEHOLDER_M320",
  "gemini-3.8-flash-tiered": "MODEL_PLACEHOLDER_M322",
  "gemini-3.5-flash-lite": "MODEL_PLACEHOLDER_M198",
  "gemini-3.1-flash-lite": "MODEL_PLACEHOLDER_M50",
  "claude-sonnet-4-6": "MODEL_PLACEHOLDER_M35",
  "claude-opus-4-6-thinking": "MODEL_PLACEHOLDER_M26",
  "gpt-oss-120b-medium": "MODEL_OPENAI_GPT_OSS_120B_MEDIUM",
  "gemini-2.5-flash": "MODEL_GOOGLE_GEMINI_2_5_FLASH",
  "gemini-2.5-flash-thinking": "MODEL_GOOGLE_GEMINI_2_5_FLASH_THINKING",
  "gemini-2.5-flash-lite": "MODEL_GOOGLE_GEMINI_2_5_FLASH_LITE",
  "gemini-3-flash": "MODEL_PLACEHOLDER_M18",
  "gemini-3.1-flash-image": "MODEL_PLACEHOLDER_M21",
});

export function resolveAntigravityModelEnum(modelId?: string | null): string | null {
  const raw = toNonEmptyString(modelId);
  if (!raw) return null;
  const clean = raw.includes("/") ? raw.split("/").pop()! : raw;
  return ANTIGRAVITY_CLI_MODEL_ENUMS[clean] ?? null;
}

const MAX_CLI_TRAJECTORIES = 512;
const CLI_TRAJECTORY_TTL_MS = 6 * 60 * 60 * 1000;

interface CliTrajectoryState {
  cascadeId: string;
  trajectoryId: string;
  sessionId: string;
  turnIndex: number;
  lastStep: number;
  updatedAt: number;
}

const cliTrajectories = new Map<string, CliTrajectoryState>();
const cliTrajectoryAclsWritten = new Set<string>();

function evictExpiredCliTrajectories(now = Date.now()): void {
  for (const [key, entry] of cliTrajectories) {
    if (now - entry.updatedAt >= CLI_TRAJECTORY_TTL_MS) {
      cliTrajectories.delete(key);
    }
  }
  while (cliTrajectories.size >= MAX_CLI_TRAJECTORIES) {
    const oldestKey = cliTrajectories.keys().next().value;
    if (oldestKey === undefined) break;
    cliTrajectories.delete(oldestKey);
  }
}

export function clearAntigravityCliTrajectories(): void {
  cliTrajectories.clear();
  cliTrajectoryAclsWritten.clear();
}

export function isAntigravityTrajectoryAclWritten(trajectoryId: string): boolean {
  return cliTrajectoryAclsWritten.has(trajectoryId);
}

export function markAntigravityTrajectoryAclWritten(trajectoryId: string): void {
  if (!trajectoryId) return;
  if (cliTrajectoryAclsWritten.size >= MAX_CLI_TRAJECTORIES) {
    const oldest = cliTrajectoryAclsWritten.values().next().value;
    if (oldest !== undefined) cliTrajectoryAclsWritten.delete(oldest);
  }
  cliTrajectoryAclsWritten.add(trajectoryId);
}

function getOrCreateCliTrajectory(
  credentials: AntigravityCredentialsLike | null | undefined,
  conversationKey: string | null,
  sessionIdFallback: string | null
): CliTrajectoryState {
  const sessionId =
    sessionIdFallback || getAntigravityConversationSessionId(credentials, conversationKey, "cli");

  if (!conversationKey) {
    return {
      cascadeId: crypto.randomUUID(),
      trajectoryId: crypto.randomUUID(),
      sessionId,
      turnIndex: 0,
      lastStep: 0,
      updatedAt: Date.now(),
    };
  }

  const now = Date.now();
  const accountKey = getAntigravityAccountKey(credentials);
  const stateKey = `${accountKey ?? ""}\x1f${conversationKey}`;
  const existing = cliTrajectories.get(stateKey);
  if (existing && now - existing.updatedAt < CLI_TRAJECTORY_TTL_MS) {
    // Touch LRU order
    cliTrajectories.delete(stateKey);
    existing.updatedAt = now;
    cliTrajectories.set(stateKey, existing);
    return existing;
  }

  evictExpiredCliTrajectories(now);
  const created: CliTrajectoryState = {
    cascadeId: crypto.randomUUID(),
    trajectoryId: crypto.randomUUID(),
    sessionId,
    turnIndex: 0,
    lastStep: 0,
    updatedAt: now,
  };
  cliTrajectories.set(stateKey, created);
  return created;
}

export function buildAntigravityEnvelopeIdentity(args: {
  isClaude: boolean;
  credentials?: AntigravityCredentialsLike | null;
  sessionIdFallback?: string | null;
  clientProfile?: AntigravityClientProfile;
  model?: string | null;
  conversationKey?: string | null;
  contentsLength?: number;
}): AntigravityEnvelopeIdentity {
  if (args.clientProfile === "cli") {
    const conversationKey =
      toNonEmptyString(args.conversationKey) ||
      toNonEmptyString(args.credentials?._antigravitySessionKey);
    const explicitSession = toNonEmptyString(args.sessionIdFallback);
    const state = getOrCreateCliTrajectory(args.credentials, conversationKey, explicitSession);
    const turnIndex = state.turnIndex;
    const minStep = turnIndex === 0 ? 1 : state.lastStep + 2;
    const contentsStep =
      typeof args.contentsLength === "number" && args.contentsLength > 0 ? args.contentsLength : 0;
    const step = turnIndex === 0 ? 1 : Math.max(minStep, contentsStep);
    state.turnIndex = turnIndex + 1;
    state.lastStep = step;

    const requestId = `agent/${state.cascadeId}/${Date.now()}/${state.trajectoryId}/${step}`;
    const modelEnum = resolveAntigravityModelEnum(args.model);
    const modelName = toNonEmptyString(args.model)?.toLowerCase() ?? "";
    const isGeminiModel = modelName.includes("gemini");
    const isClaudeStr = String(Boolean(args.isClaude));

    const labels: Record<string, string> = {
      cascade_id: state.cascadeId,
      last_step_index: String(step - 1),
      ...(modelEnum ? { model_enum: modelEnum } : {}),
      request_id: `${state.trajectoryId}-${turnIndex}`,
      root_cascade_id: state.cascadeId,
      trajectory_id: state.trajectoryId,
      trajectory_source: "CORTEX_TRAJECTORY_SOURCE_CLI",
      used_claude: isClaudeStr,
      used_claude_conservative: isClaudeStr,
      used_non_gemini_model: String(!isGeminiModel),
    };

    return {
      requestId,
      sessionId: state.sessionId,
      labels,
    };
  }

  const agentId = crypto.randomUUID();
  const trajectoryId = crypto.randomUUID();
  const step = 2;
  const requestId = `agent/${agentId}/${Date.now()}/${trajectoryId}/${step}`;

  const sessionId = getAntigravitySessionId(args.credentials, args.sessionIdFallback);

  const isClaudeStr = String(Boolean(args.isClaude));
  const labels: Record<string, string> = {
    last_step_index: String(step - 1),
    trajectory_id: trajectoryId,
    used_claude: isClaudeStr,
    used_claude_conservative: isClaudeStr,
  };

  return {
    requestId,
    sessionId,
    labels,
  };
}

const FNV_OFFSET_I64 = -3750763034362895579n;
const FNV_PRIME_I64 = 1099511628211n;
function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getProviderDataString(
  credentials: AntigravityCredentialsLike | null | undefined,
  key: string
): string | null {
  const data = credentials?.providerSpecificData;
  return data && typeof data === "object" ? toNonEmptyString(data[key]) : null;
}

export function getAntigravityAccountKey(
  credentials?: AntigravityCredentialsLike | null
): string | null {
  return (
    toNonEmptyString(credentials?.email) ||
    getProviderDataString(credentials, "email") ||
    getProviderDataString(credentials, "accountId") ||
    toNonEmptyString(credentials?.connectionId) ||
    null
  );
}

export function getAntigravityEnvelopeUserAgent(
  _credentials?: AntigravityCredentialsLike | null
): "antigravity" {
  return "antigravity";
}

export function generateAntigravityRequestId(): string {
  return `agent/${Date.now()}/${crypto.randomBytes(4).toString("hex")}`;
}

export function refreshAntigravityRequestIdTimestamp(existingRequestId?: unknown): string {
  if (typeof existingRequestId === "string") {
    const parts = existingRequestId.split("/");
    if (parts.length === 5 && parts[0] === "agent") {
      return `agent/${parts[1]}/${Date.now()}/${parts[3]}/${parts[4]}`;
    }
  }
  return generateAntigravityRequestId();
}

function sampleUniform63Bit(): bigint {
  const max = 18446744073709551615n; // 2^64 - 1
  const target = 9_000_000_000_000_000_000n;
  // Rejection sampling: discard values in [limit, max] that would cause modulo bias.
  // Accepted range [0, limit) divides evenly by target, so value % target is uniform.
  const limit = max - (max % target);
  let value: bigint;
  do {
    value = crypto.randomBytes(8).readBigUInt64BE();
  } while (value >= limit);
  // lgtm[js/biased-cryptographic-random] — rejection sampling above eliminates bias
  return value % target; // nosemgrep: biased-cryptographic-random
}

export function generateAntigravitySessionId(
  clientProfile: AntigravityClientProfile = "ide"
): string {
  const sample = sampleUniform63Bit();
  if (clientProfile === "cli") {
    return (sample === 0n ? 1n : sample).toString();
  }
  return `-${sample.toString()}`;
}

export function deriveAntigravitySessionId(
  accountKey?: string | null,
  clientProfile: AntigravityClientProfile = "ide"
): string | null {
  const key = toNonEmptyString(accountKey);
  if (!key) return null;

  let hash = FNV_OFFSET_I64;
  for (const byte of Buffer.from(key, "utf8")) {
    hash = BigInt.asIntN(64, hash ^ BigInt(byte));
    hash = BigInt.asIntN(64, hash * FNV_PRIME_I64);
  }
  if (clientProfile === "cli") {
    const positive = BigInt.asUintN(63, hash);
    return (positive === 0n ? 1n : positive).toString();
  }
  return hash.toString();
}

/**
 * Upstream Cloud Code session for one conversation on one account. Stable across turns
 * of that conversation (prompt-cache reuse) yet distinct between conversations running in
 * parallel on the same account, which otherwise share and evict one session cache.
 *
 * @param credentials - Connection credentials; their account key scopes the session.
 * @param conversationKey - Resolved conversation id (or session-affinity key); when empty,
 *   the account-derived session from {@link getAntigravitySessionId} is returned unchanged.
 * @returns The `request.sessionId` to send in the Cloud Code envelope.
 */
export function getAntigravityConversationSessionId(
  credentials?: AntigravityCredentialsLike | null,
  conversationKey?: string | null,
  clientProfile: AntigravityClientProfile = "ide"
): string {
  const conversation = toNonEmptyString(conversationKey);
  const account = getAntigravityAccountKey(credentials);
  if (!conversation) return getAntigravitySessionId(credentials, undefined, clientProfile);
  return (
    deriveAntigravitySessionId(`${account ?? ""}\x1f${conversation}`, clientProfile) ||
    getAntigravitySessionId(credentials, undefined, clientProfile)
  );
}

/**
 * Account-scoped Cloud Code session id: an explicit fallback wins, else a stable hash of the
 * account key, else a random id when no account is known.
 */
export function getAntigravitySessionId(
  credentials?: AntigravityCredentialsLike | null,
  fallback?: unknown,
  clientProfile: AntigravityClientProfile = "ide"
): string {
  return (
    toNonEmptyString(fallback) ||
    deriveAntigravitySessionId(getAntigravityAccountKey(credentials), clientProfile) ||
    generateAntigravitySessionId(clientProfile)
  );
}
