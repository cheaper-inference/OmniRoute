import { constants, type Stats } from "node:fs";
import { open } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const ACCOUNT_INDIVIDUAL_PROVIDER_ID = "account:zai-individual-coding-plan";
const BUILTIN_INDIVIDUAL_PROVIDER_ID = "builtin:zai-coding-plan";
const INDIVIDUAL_CONFIG_PROVIDER_ID = "builtin:zai-coding-plan";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/**
 * Read only the exact Individual Coding Plan credential needed by the opt-in
 * direct SSE transport. ZCode keeps that plan's API key in the
 * `builtin:zai-coding-plan` config entry, so both the account profile and the
 * builtin profile (the same IDs the app-server transport prefers and falls back
 * to) resolve to it; any other profile, such as the Start Plan, is refused. The
 * provider origin is constrained before the credential can reach the native client.
 */
export async function readZcodeIndividualCodingPlanApiKey(
  providerId: string,
  configPath = join(homedir(), ".zcode", "v2", "config.json")
): Promise<string> {
  if (
    providerId !== ACCOUNT_INDIVIDUAL_PROVIDER_ID &&
    providerId !== BUILTIN_INDIVIDUAL_PROVIDER_ID
  ) {
    throw new Error("Native ZCode streaming supports only the explicitly selected Individual Plan");
  }

  const noFollow = process.platform === "win32" ? 0 : (constants.O_NOFOLLOW ?? 0);
  const handle = await open(configPath, constants.O_RDONLY | noFollow);
  try {
    assertPrivateRegularFile(await handle.stat());
    const parsed = asRecord(JSON.parse(await handle.readFile("utf8")));
    const options = individualProfileOptions(parsed);
    assertIndividualApiOrigin(options.baseURL);
    return signedApiKey(options.apiKey);
  } finally {
    await handle.close();
  }
}

/** A regular file owned by the service user and closed to group/other. */
function assertPrivateRegularFile(info: Stats): void {
  if (!info.isFile()) throw new Error("ZCode profile config is not a regular file");
  if (process.platform === "win32") return;
  const uid = typeof process.getuid === "function" ? process.getuid() : undefined;
  if (uid !== undefined && info.uid !== uid)
    throw new Error("ZCode profile config is not owned by the service user");
  if ((info.mode & 0o077) !== 0) throw new Error("ZCode profile config permissions are too broad");
}

function individualProfileOptions(config: JsonRecord): JsonRecord {
  const profile = asRecord(asRecord(config.provider)[INDIVIDUAL_CONFIG_PROVIDER_ID]);
  if (profile.enabled !== true || profile.kind !== "anthropic")
    throw new Error("Individual Coding Plan profile is not enabled in ZCode config");
  return asRecord(profile.options);
}

/** Only https://api.z.ai, with no credentials, port, query or fragment. */
function assertIndividualApiOrigin(baseURL: unknown): void {
  const baseUrl = new URL(typeof baseURL === "string" ? baseURL : "");
  const pinned =
    baseUrl.protocol === "https:" &&
    baseUrl.hostname === "api.z.ai" &&
    !baseUrl.username &&
    !baseUrl.password &&
    !baseUrl.port &&
    !baseUrl.search &&
    !baseUrl.hash;
  if (!pinned) throw new Error("Individual Coding Plan profile has an unsupported API origin");
}

function signedApiKey(apiKey: unknown): string {
  if (
    typeof apiKey !== "string" ||
    apiKey.length > 512 ||
    !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(apiKey)
  ) {
    throw new Error("Individual Coding Plan profile has no valid signed credential");
  }
  return apiKey;
}
