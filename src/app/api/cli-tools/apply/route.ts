import { z } from "zod";
import { createHash } from "node:crypto";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import fs from "node:fs";
import path from "node:path";
import { generateConfig, redactGeneratedConfig } from "@/lib/cli-helper/config-generator";
import { readPrivateConfigFile, writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import { guardCliConfigWrite } from "@/lib/api/cliConfigWriteGuard";
import { getCliPrimaryConfigPath, normalizeCliToolId } from "@/shared/services/cliRuntime";
import {
  configRequestSchema,
  configError,
  defaultConfigBaseUrl,
  privateConfigResponse,
} from "@/lib/cli-helper/configRequest";

const PLAN_FINGERPRINT_PATTERN = /^p1:[0-9a-f]{32}$/;

const applySchema = configRequestSchema.extend({
  dryRun: z.boolean().optional(),
  /** `planFingerprint` from a dry run. When set, apply refuses if the plan has moved. */
  planFingerprint: z.string().regex(PLAN_FINGERPRINT_PATTERN).optional(),
});

/** The host-side command that does the same job when OmniRoute is containerised. */
const HOST_SETUP_COMMANDS: Record<string, string> = {
  claude: "omniroute setup-claude",
  codex: "omniroute setup-codex",
  opencode: "omniroute setup-opencode",
  cline: "omniroute setup-cline",
  kilo: "omniroute setup-kilo",
  continue: "omniroute setup-continue",
  whycodes: "omniroute setup-whycodes",
};

function ensureBackup(configPath: string): string | null {
  if (!fs.existsSync(configPath)) return null;
  const backupDir = path.join(path.dirname(configPath), ".omniroute.bak");
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, path.basename(configPath) + ".bak");
  writePrivateConfigFile(backupPath, readPrivateConfigFile(configPath));
  return backupPath;
}

/**
 * Token for "what this apply would do now": the tool, the target path, the current file
 * bytes and the redacted config it would write (which carries the merged contribution and
 * the model roster). Secret-free; an optimistic check, never authorization.
 */
function computePlanFingerprint(
  toolId: string,
  configPathOrNull: string | null | undefined,
  safeContent: string
): string {
  const configPath = configPathOrNull || "";
  let current: string;
  try {
    current = `file:${readPrivateConfigFile(configPath)}`;
  } catch (error) {
    current = (error as NodeJS.ErrnoException).code === "ENOENT" ? "absent" : "unreadable";
  }
  const digest = createHash("sha256")
    .update(JSON.stringify([toolId, configPath, current, safeContent]))
    .digest("hex");
  return `p1:${digest.slice(0, 32)}`;
}

/**
 * The plan the caller confirmed no longer matches the file or the request: refuse and answer
 * with the current plan. Null when no fingerprint was sent or it still matches.
 */
function stalePlanRefusal(
  planFingerprint: string | undefined,
  currentFingerprint: string,
  configPath: string,
  safeContent: string
): Response | null {
  if (!planFingerprint || planFingerprint === currentFingerprint) return null;
  return privateConfigResponse(
    {
      error: "The config changed since the preview. Review the current plan and apply again.",
      configPath,
      content: safeContent,
      planFingerprint: currentFingerprint,
    },
    409
  );
}

// POST /api/cli-tools/apply - Apply config for a specific tool
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request, { alwaysRequireAuth: true });
  if (authError) {
    authError.headers.set("cache-control", "no-store");
    return authError;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return configError(400, "Invalid JSON request");
  }

  try {
    const parsed = applySchema.safeParse(body);
    if (!parsed.success) {
      return configError(400, "Invalid config request");
    }
    const { toolId, baseUrl, apiKey, model, dryRun, planFingerprint } = parsed.data;
    const canonicalToolId = normalizeCliToolId(toolId);

    const result = await generateConfig(canonicalToolId, {
      baseUrl: baseUrl || defaultConfigBaseUrl(),
      apiKey,
      model,
    });

    if (!result.success) {
      return configError(
        400,
        redactGeneratedConfig(result.error || "Config generation failed", [apiKey])
      );
    }
    const safeContent = redactGeneratedConfig(result.content || "", [apiKey]);
    const configPath = result.configPath || getCliPrimaryConfigPath(canonicalToolId);
    const currentFingerprint = computePlanFingerprint(canonicalToolId, configPath, safeContent);
    const migration = result.migration ? { migration: result.migration } : {};

    if (dryRun) {
      return privateConfigResponse({
        dryRun: true,
        configPath: result.configPath,
        content: safeContent,
        planFingerprint: currentFingerprint,
        ...migration,
      });
    }

    if (!configPath) {
      return configError(400, "Unknown CLI tool");
    }

    // A container write into an unmounted path looks successful and then
    // disappears with the container — refuse it and point at the host CLI.
    const refusal = guardCliConfigWrite(configPath, {
      toolLabel: canonicalToolId,
      hostCommand: HOST_SETUP_COMMANDS[canonicalToolId],
    });
    if (refusal) {
      refusal.headers.set("cache-control", "no-store");
      return refusal;
    }

    // Nothing awaits between this check and the write below.
    const stale = stalePlanRefusal(planFingerprint, currentFingerprint, configPath, safeContent);
    if (stale) return stale;

    const backupPath = ensureBackup(configPath);

    writePrivateConfigFile(configPath, result.content!);

    return privateConfigResponse({
      success: true,
      configPath,
      backupPath,
      content: safeContent,
      ...migration,
    });
  } catch {
    return configError(500, "Failed to apply config");
  }
}
