/**
 * Detection of the Antigravity CLI login stored on this host.
 *
 * Kept apart from agyAuthImport.ts on purpose: this module spawns `secret-tool`, and the
 * spawn must stay reachable only from the loopback-only apply-local route (Hard Rules #15
 * + #17). The import and import-bulk routes share agyAuthImport.ts and serve tunnels, so
 * importing this module from there turns them into spawn-capable routes.
 */
import { execFile } from "child_process";
import { promisify } from "util";
import type { Dirent } from "fs";
import fs from "fs/promises";
import path from "path";
import os from "os";

import { AgyAuthFileError } from "@/lib/oauth/utils/agyAuthImport";

const execFileAsync = promisify(execFile);

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

type DetectedAgyToken = { raw: unknown; source: string };

const AGY_TOKEN_FILE_NAME = "antigravity-oauth-token";

function noLocalLoginError(): AgyAuthFileError {
  return new AgyAuthFileError(
    "No local Antigravity CLI login found. Run agy, sign in with Google, then try again.",
    404,
    "no_local_login"
  );
}

/**
 * Read and parse a JSON token file. Null only when the file does not exist: a token file
 * that is present but unreadable stops detection, so a corrupt login is reported instead
 * of being skipped in favour of a different stored account.
 */
async function readJsonFile(filePath: string): Promise<unknown> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") return null;
    throw new AgyAuthFileError("Could not read the local agy token file", 500, "read_failed");
  }
}

/** `source` is a fixed label: it lands in the audit log, which must not carry home paths. */
async function detectFromFirstReadable(
  candidates: string[],
  source: string
): Promise<DetectedAgyToken | null> {
  for (const candidate of candidates) {
    const raw = await readJsonFile(candidate);
    if (raw !== null) return { raw, source };
  }
  return null;
}

/** An explicit AGY_TOKEN_FILE is authoritative: it never falls through to another login. */
async function detectFromEnvOverride(): Promise<DetectedAgyToken | null> {
  const override = process.env.AGY_TOKEN_FILE?.trim();
  if (!override) return null;
  const raw = await readJsonFile(override);
  if (raw === null) throw noLocalLoginError();
  return { raw, source: "env:AGY_TOKEN_FILE" };
}

/** Linux Secret Service keyring entry, accepted only when it carries a refresh token. */
async function detectFromSecretService(): Promise<DetectedAgyToken | null> {
  if (process.platform !== "linux") return null;
  try {
    const { stdout } = await execFileAsync(
      "secret-tool",
      ["lookup", "service", "gemini", "username", "antigravity"],
      { timeout: 3000 }
    );
    const parsed = toRecord(JSON.parse(stdout.trim()));
    const hasRefresh = !!(toRecord(parsed.token).refresh_token || parsed.refresh_token);
    return hasRefresh ? { raw: parsed, source: "secret-service" } : null;
  } catch {
    // secret-tool missing (ENOENT), no keyring entry, or a non-JSON secret.
    return null;
  }
}

async function detectFromAgentControlProfiles(home: string): Promise<DetectedAgyToken | null> {
  const profilesDir = path.join(home, ".config", "agentcontrol", "profiles");
  let entries: Dirent[];
  try {
    entries = await fs.readdir(profilesDir, { withFileTypes: true });
  } catch {
    return null;
  }
  const candidates = entries
    .filter((ent) => ent.isDirectory())
    .map((ent) =>
      path.join(profilesDir, ent.name, ".gemini", "antigravity-cli", AGY_TOKEN_FILE_NAME)
    );
  return detectFromFirstReadable(candidates, "agentcontrol-profile");
}

/**
 * Detect locally stored Antigravity credentials, in order:
 * 1. AGY_TOKEN_FILE environment variable override (authoritative when set)
 * 2. Linux Secret Service keyring (secret-tool), only when it carries a refresh token
 * 3. Default CLI token files (~/.gemini/antigravity-cli/antigravity-oauth-token)
 * 4. Multi-profile token files (~/.config/agentcontrol/profiles/...)
 *
 * The Antigravity IDE `state.vscdb` store is deliberately not read: the shape of its
 * `antigravityAuthStatus` entry is unverified and carries no confirmed OAuth refresh
 * token, so importing it could store a connection that stops refreshing after ~1h.
 */
export async function detectLocalAgyTokenRaw(): Promise<DetectedAgyToken> {
  const home = os.homedir();
  const detected =
    (await detectFromEnvOverride()) ??
    (await detectFromSecretService()) ??
    (await detectFromFirstReadable(
      [
        path.join(home, ".gemini", "antigravity-cli", AGY_TOKEN_FILE_NAME),
        path.join(home, ".gemini", "antigravity", AGY_TOKEN_FILE_NAME),
      ],
      "cli-token-file"
    )) ??
    (await detectFromAgentControlProfiles(home));
  if (detected) return detected;

  throw noLocalLoginError();
}
