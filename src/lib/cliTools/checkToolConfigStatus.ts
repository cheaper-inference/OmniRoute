// DRY: shared between /api/cli-tools/status and /api/cli-tools/all-statuses (plan 14 F2)

import fs from "fs/promises";
import { getCliConfigHome, getCliPrimaryConfigPath } from "@/shared/services/cliRuntime";
import { hasOmniRouteQwenCodeConfig } from "@/shared/services/qwenCodeConfig";
import {
  parseGrokBuildConfig,
  resolveGrokBuildConfigPath,
} from "@/shared/services/grokBuildConfig";
import {
  hasOmniRoutePiProvider,
  hasUnownedOmniRoutePiProvider,
  readPiModelsJson,
} from "@/shared/services/piConfig";
import { isOmniRouteCustomModel } from "@/shared/services/droidCustomModels";
import { getRuntimePorts } from "@/lib/runtime/ports";

const { apiPort } = getRuntimePorts();

/** True when `url` is this OmniRoute: a loopback host on the API port. */
function pointsAtThisOmniRoute(url: unknown): boolean {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url.trim());
    const port = parsed.port || (parsed.protocol === "https:" ? "443" : "80");
    return (
      ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname) && port === String(apiPort)
    );
  } catch {
    return false;
  }
}

/** An OmniRoute-owned entry: "configured" when it points here, "other" when it points elsewhere. */
const entryStatus = (baseUrl: unknown) => (pointsAtThisOmniRoute(baseUrl) ? "configured" : "other");

/**
 * Check if a tool has OmniRoute configured by reading its config file directly.
 * This replaces the expensive self-referential HTTP calls to /api/cli-tools/*-settings.
 *
 * @param toolId - CLI tool identifier (e.g. "claude", "codex", "cline")
 * @param _configPathOverride - optional path override (used in tests for DI)
 *
 * Returns: "configured" | "not_configured" | "not_installed" | "unknown" | "other"
 */
export async function checkToolConfigStatus(
  toolId: string,
  _configPathOverride?: string
): Promise<"configured" | "not_configured" | "not_installed" | "unknown" | "other"> {
  try {
    const configPath =
      _configPathOverride ??
      (toolId === "grok-build"
        ? resolveGrokBuildConfigPath(process.env, getCliConfigHome())
        : getCliPrimaryConfigPath(toolId));
    if (!configPath) return "unknown";

    const content = await fs.readFile(configPath, "utf-8");

    if (toolId === "grok-build") {
      const settings = parseGrokBuildConfig(content);
      return settings.default === "omniroute" &&
        settings.model?.base_url &&
        settings.model.api_backend === "chat_completions"
        ? "configured"
        : "not_configured";
    }

    // Codex uses TOML config — parse as raw text, not JSON
    if (toolId === "codex") {
      const lower = content.toLowerCase();
      const hasOmniRoute =
        lower.includes("omniroute") ||
        lower.includes(`localhost:${apiPort}`) ||
        lower.includes(`127.0.0.1:${apiPort}`);
      if (!hasOmniRoute) return "not_configured";

      // Also verify auth.json has an API key (not masked/empty)
      try {
        const authPath = configPath.replace(/config\.toml$/, "auth.json");
        const authContent = await fs.readFile(authPath, "utf-8");
        const auth = JSON.parse(authContent) as Record<string, unknown>;
        const apiKey = (auth?.OPENAI_API_KEY as string) || "";
        if (!apiKey || apiKey.includes("****") || apiKey.length < 20) {
          return "not_configured";
        }
      } catch {
        return "not_configured";
      }

      return "configured";
    }

    if (toolId === "hermes" || toolId === "omp") {
      const lower = content.toLowerCase();
      const hasOmniRoute =
        lower.includes("omniroute") ||
        lower.includes(`localhost:${apiPort}`) ||
        lower.includes(`127.0.0.1:${apiPort}`);
      return hasOmniRoute ? "configured" : "not_configured";
    }

    // Pi keeps providers in models.json; both an OmniRoute-written entry and a
    // hand-edited one that points at this instance count as configured.
    if (toolId === "pi") {
      const { config } = await readPiModelsJson();
      return hasOmniRoutePiProvider(config) || hasUnownedOmniRoutePiProvider(config, apiPort)
        ? "configured"
        : "not_configured";
    }

    if (toolId === "whycodes") {
      const hasProvider =
        /\[providers\.omniroute\]/i.test(content) || /\[providers\."omniroute"\]/i.test(content);
      if (!hasProvider) return "not_configured";
      const lower = content.toLowerCase();
      const hasBase = /(?:base_url|api_base)\s*=\s*["']https?:\/\//i.test(content);
      const pointsAtOmniRoute =
        lower.includes("omniroute") ||
        lower.includes(`localhost:${apiPort}`) ||
        lower.includes(`127.0.0.1:${apiPort}`);
      return hasBase && pointsAtOmniRoute ? "configured" : "not_configured";
    }

    const config = JSON.parse(content) as Record<string, unknown>;

    // Each tool stores OmniRoute config differently
    switch (toolId) {
      case "claude": {
        const baseUrl = (config?.env as Record<string, unknown> | undefined)?.ANTHROPIC_BASE_URL;
        return baseUrl ? entryStatus(baseUrl) : "not_configured";
      }
      case "qwen":
        return hasOmniRouteQwenCodeConfig(config) ? "configured" : "not_configured";
      case "droid": {
        // Same rule as the droid settings route: a `custom:OmniRoute-N` customModels entry.
        const models = Array.isArray(config.customModels) ? config.customModels : [];
        const entry = models.find(isOmniRouteCustomModel) as { baseUrl?: unknown } | undefined;
        return entry ? entryStatus(entry.baseUrl) : "not_configured";
      }
      case "openclaw": {
        // Same rule as the openclaw settings route: `models.providers.omniroute`.
        const models = config.models as { providers?: Record<string, { baseUrl?: unknown }> };
        const provider = models?.providers?.omniroute;
        return provider ? entryStatus(provider.baseUrl) : "not_configured";
      }
      case "cline":
        // Same rule as the cline settings route: the openai provider on this OmniRoute.
        return (config.actModeApiProvider === "openai" ||
          config.planModeApiProvider === "openai") &&
          pointsAtThisOmniRoute(config.openAiBaseUrl)
          ? "configured"
          : "not_configured";
      case "kilo": {
        // Same rule as the kilo settings route: the router entry in auth.json.
        const auth = config as Record<string, { baseUrl?: unknown; baseURL?: unknown } | undefined>;
        const entry = auth["openai-compatible"] || auth["omniroute"];
        return pointsAtThisOmniRoute(entry?.baseUrl || entry?.baseURL)
          ? "configured"
          : "not_configured";
      }
      default:
        return "unknown";
    }
  } catch {
    return "not_configured";
  }
}
