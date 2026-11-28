"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { parse as parseToml, stringify as stringifyToml } from "smol-toml";
import type { z } from "zod";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  ensureCliConfigWriteAllowed,
  getCodexClientConfigHome,
  getCliRuntimeStatus,
} from "@/shared/services/cliRuntime";
import { createMultiBackup } from "@/shared/services/backupService";
import {
  saveCliToolLastConfigured,
  deleteCliToolLastConfigured,
  getCodexKeepOfficialLogin,
  setCodexKeepOfficialLogin,
} from "@/lib/db/cliToolState";
import { codexSettingsConfigSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";
import { normalizeCodexBaseUrl } from "@/shared/utils/codexBaseUrl";
import { migrateCodexFeatureFlags } from "@/shared/utils/codexConfig";
import {
  getCodexCatalogPath,
  listOmniRouteChatModels,
  removeCodexModelCatalog,
  writeCodexModelCatalog,
  type CodexCatalogWriteResult,
} from "@/lib/cliTools/codexModelCatalogWriter";
import {
  configClobberRefusalResponse,
  parseJsonObject,
  readExistingConfig,
} from "../_lib/readExistingConfig";

const getCodexConfigPath = () => path.join(getCodexClientConfigHome(), "config.toml");
const getCodexAuthPath = () => path.join(getCodexClientConfigHome(), "auth.json");
// The catalog path is stored with forward slashes (Codex accepts them on Windows).
const toTomlPath = (filePath: string) => filePath.replace(/\\/g, "/");

type TomlDoc = Record<string, unknown>;

const asRecord = (value: unknown): TomlDoc =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as TomlDoc) : {};

// The whole document is parsed and written back with a full TOML parser, so every value the
// merge does not own (arrays, inline tables, quoted keys, arrays of tables) stays valid TOML.
// A config.toml that Codex itself could not load throws here and is refused, never rewritten.
// shortcut: comments and formatting are not kept (smol-toml has no comment model), only values.
// Integers parse as BigInt and plain numbers write as floats, so `30.0` stays a float and `60`
// stays an integer. The merge only writes strings, so BigInt never reaches a key it owns.
const parseConfig = (content: string): TomlDoc =>
  parseToml(content, { integersAsBigInt: true }) as TomlDoc;
const toToml = (doc: TomlDoc) => stringifyToml(doc, { numbersAsFloat: true }) + "\n";

// migrateCodexFeatureFlags reads `[features]` from `_sections`; the parsed document is that map.
const migrateFeatureFlags = (doc: TomlDoc) =>
  migrateCodexFeatureFlags({
    _root: {},
    _sections: doc as Record<string, Record<string, unknown>>,
  });

// A root openai_base_url is OmniRoute's only when it equals the base_url OmniRoute wrote into
// [model_providers.omniroute] (or is about to write). Any other value is the user's own route.
const trimUrl = (url: unknown) => (typeof url === "string" ? url.trim().replace(/\/+$/, "") : null);
const deleteOwnedRootUrl = (doc: TomlDoc, ...ownedUrls: string[]) => {
  const current = trimUrl(doc.openai_base_url);
  const providers = asRecord(doc.model_providers);
  const owned = [asRecord(providers.omniroute).base_url, ...ownedUrls];
  if (current !== null && owned.some((url) => trimUrl(url) === current)) {
    delete doc.openai_base_url;
  }
};

// Read current config.toml
const readConfig = async () => {
  try {
    const configPath = getCodexConfigPath();
    const content = await fs.readFile(configPath, "utf-8");
    return content;
  } catch (error: any) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
};

// Check if config has OmniRoute settings
const hasOmniRouteConfig = (config: string | null) => {
  if (!config) return false;
  return (
    config.includes("openai_base_url") ||
    config.includes('model_provider = "omniroute"') ||
    config.includes("[model_providers.omniroute]")
  );
};

// GET - Check codex CLI and read current settings
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const runtime = await getCliRuntimeStatus("codex");

    if (!runtime.installed || !runtime.runnable) {
      return NextResponse.json({
        installed: runtime.installed,
        runnable: runtime.runnable,
        command: runtime.command,
        commandPath: runtime.commandPath,
        runtimeMode: runtime.runtimeMode,
        reason: runtime.reason,
        config: null,
        message:
          runtime.installed && !runtime.runnable
            ? "Codex CLI is installed but not runnable"
            : "Codex CLI is not installed",
      });
    }

    const config = await readConfig();

    return NextResponse.json({
      installed: runtime.installed,
      runnable: runtime.runnable,
      command: runtime.command,
      commandPath: runtime.commandPath,
      runtimeMode: runtime.runtimeMode,
      reason: runtime.reason,
      config,
      hasOmniRoute: hasOmniRouteConfig(config),
      keepOfficialLogin: getCodexKeepOfficialLogin(),
      configPath: getCodexConfigPath(),
    });
  } catch (error) {
    console.log("Error checking codex settings:", error);
    return NextResponse.json({ error: "Failed to check codex settings" }, { status: 500 });
  }
}

function isLocalCodexEndpoint(baseUrl: string) {
  if (!URL.canParse(baseUrl)) return false;
  const endpoint = new URL(baseUrl);
  return (
    ["http:", "https:"].includes(endpoint.protocol) &&
    ["localhost", "127.0.0.1", "[::1]"].includes(endpoint.hostname)
  );
}

function mergeCodexSettings(
  doc: TomlDoc,
  settings: z.infer<typeof codexSettingsConfigSchema>,
  keepOfficialLogin: boolean
) {
  const { baseUrl, model, reasoningEffort, wireApi, modelMappings } = settings;
  // Carry the user's intent forward off the deprecated Codex feature flag (#1327).
  migrateFeatureFlags(doc);

  // Update only OmniRoute related fields (api_key goes to auth.json, not config.toml)
  doc.model = model;

  if (reasoningEffort && reasoningEffort !== "none") {
    // Optional Codex reasoning effort.
    doc.model_reasoning_effort = reasoningEffort;
  } else {
    delete doc.model_reasoning_effort;
  }

  const effectiveWireApi = wireApi ?? "responses";
  const normalizedBaseUrl = normalizeCodexBaseUrl(baseUrl, effectiveWireApi);

  // Read the previous OmniRoute URL before the provider section is replaced below.
  deleteOwnedRootUrl(doc, normalizedBaseUrl);

  // Always create a custom provider to reliably pass wire_api and use OMNIROUTE_API_KEY
  doc.model_provider = "omniroute";
  doc.model_providers = {
    ...asRecord(doc.model_providers),
    omniroute: {
      name: "OmniRoute",
      base_url: normalizedBaseUrl,
      wire_api: effectiveWireApi,
      env_key: keepOfficialLogin ? "OMNIROUTE_API_KEY" : "OPENAI_API_KEY",
    },
  };

  // Process model aliases into notice.model_migrations
  const notice = asRecord(doc.notice);
  if (modelMappings && Object.keys(modelMappings).length > 0) {
    doc.notice = {
      ...notice,
      model_migrations: { ...asRecord(notice.model_migrations), ...modelMappings },
    };
  } else if ("model_migrations" in notice) {
    delete notice.model_migrations;
    if (Object.keys(notice).length === 0) delete doc.notice;
  }
}

function codexSettingsAppliedResponse(configPath: string, catalog: CodexCatalogWriteResult | null) {
  return NextResponse.json({
    success: true,
    message: "Codex settings applied successfully!",
    configPath,
    ...(catalog?.catalogPath
      ? { catalogPath: catalog.catalogPath, catalogModelCount: catalog.count }
      : {}),
    ...(catalog?.warning ? { catalogWarning: catalog.warning } : {}),
  });
}

// POST - Update OmniRoute settings (merge with existing config)
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) return NextResponse.json({ error: writeGuard }, { status: 403 });

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    // (#549) Extract keyId BEFORE validation — Zod strips unknown fields!
    // The dashboard sends masked key strings — resolving by ID guarantees
    // we always write the full key value to the config file.
    const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;

    const validation = validateBody(codexSettingsConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, model, modelCatalog, modelMappings } = validation.data;
    const keepOfficialLogin = validation.data.keepOfficialLogin ?? getCodexKeepOfficialLogin();
    if (keepOfficialLogin && !isLocalCodexEndpoint(baseUrl)) {
      return NextResponse.json(
        { error: "Keeping official Codex login requires a local OmniRoute endpoint." },
        { status: 400 }
      );
    }
    const configPath = getCodexConfigPath();
    const authPath = getCodexAuthPath();
    const codexDir = path.dirname(configPath);
    const targetGuard =
      ensureCliConfigWriteAllowed(configPath) ||
      (!keepOfficialLogin && ensureCliConfigWriteAllowed(authPath)) ||
      (modelCatalog === true && ensureCliConfigWriteAllowed(getCodexCatalogPath(codexDir)));
    if (targetGuard) return NextResponse.json({ error: targetGuard }, { status: 403 });

    // Canonical key resolution (#13563): by keyId -> submitted apiKey -> sk_omniroute.
    const apiKey = keepOfficialLogin ? null : await resolveApiKey(keyId, validation.data.apiKey);

    // Ensure directory exists
    await fs.mkdir(codexDir, { recursive: true });

    // Backup current configs before modifying
    await createMultiBackup("codex", keepOfficialLogin ? [configPath] : [configPath, authPath]);

    // Read BOTH files before writing either one. A file that exists but cannot
    // be read or parsed is not an empty config: the merge below writes the result
    // back, which would replace every provider/MCP server in config.toml and the
    // ChatGPT OAuth tokens in auth.json. Only ENOENT means "start fresh".
    const doc: TomlDoc = (await readExistingConfig(configPath, parseConfig)) ?? {};
    const authData = keepOfficialLogin
      ? null
      : ((await readExistingConfig(authPath, parseJsonObject)) ?? {});

    mergeCodexSettings(doc, validation.data, keepOfficialLogin);

    // A failed catalog refresh leaves the currently configured path in place.
    const catalog =
      modelCatalog === true
        ? await writeCodexModelCatalog({
            codexDir,
            selectedModels: [model, ...Object.values(modelMappings ?? {})],
            listModels: () => listOmniRouteChatModels(request),
          })
        : null;
    if (catalog?.catalogPath) doc.model_catalog_json = toTomlPath(catalog.catalogPath);

    // Write merged config
    const configContent = toToml(doc);
    await fs.writeFile(configPath, configContent);

    // Preserve the existing auth.json contract for profiles using a stored key.
    if (authData) {
      authData.OPENAI_API_KEY = apiKey;
      await fs.writeFile(authPath, JSON.stringify(authData, null, 2));
    }
    if (validation.data.keepOfficialLogin !== undefined)
      setCodexKeepOfficialLogin(keepOfficialLogin);

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured("codex");
    } catch {
      /* non-critical */
    }

    return codexSettingsAppliedResponse(configPath, catalog);
  } catch (error) {
    const refusal = configClobberRefusalResponse(error);
    if (refusal) return refusal;
    console.log("Error updating codex settings:", error);
    return NextResponse.json({ error: "Failed to update codex settings" }, { status: 500 });
  }
}

// DELETE - Remove OmniRoute settings only (keep other settings)
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getCodexConfigPath();
    const authPath = getCodexAuthPath();
    const codexDir = path.dirname(configPath);
    const keepOfficialLogin = getCodexKeepOfficialLogin();
    const targetGuard =
      ensureCliConfigWriteAllowed(configPath) ||
      (!keepOfficialLogin && ensureCliConfigWriteAllowed(authPath)) ||
      ensureCliConfigWriteAllowed(getCodexCatalogPath(codexDir));
    if (targetGuard) return NextResponse.json({ error: targetGuard }, { status: 403 });

    // Backup current configs before resetting
    await createMultiBackup("codex", keepOfficialLogin ? [configPath] : [configPath, authPath]);

    // Read and parse existing config; a file that does not parse is refused, not rewritten.
    const doc = await readExistingConfig(configPath, parseConfig);
    if (doc === null) {
      return NextResponse.json({
        success: true,
        message: "No config file to reset",
      });
    }

    // Carry the user's intent forward off the deprecated Codex feature flag (#1327).
    migrateFeatureFlags(doc);

    // Remove OmniRoute related root fields
    deleteOwnedRootUrl(doc);

    if (doc.model_provider === "omniroute") {
      delete doc.model;
      delete doc.model_provider;
    }

    // Remove omniroute provider section
    const providers = asRecord(doc.model_providers);
    if ("omniroute" in providers) {
      delete providers.omniroute;
      if (Object.keys(providers).length === 0) delete doc.model_providers;
    }

    // Remove the model catalog only when it is the one OmniRoute wrote
    const catalogValue = doc.model_catalog_json;
    if (
      typeof catalogValue === "string" &&
      toTomlPath(catalogValue) === toTomlPath(getCodexCatalogPath(codexDir))
    ) {
      delete doc.model_catalog_json;
    }

    // Write updated config
    const configContent = toToml(doc);
    await fs.writeFile(configPath, configContent);

    // Remove OPENAI_API_KEY from auth.json
    if (!keepOfficialLogin) {
      try {
        const existingAuth = await fs.readFile(authPath, "utf-8");
        const authData = JSON.parse(existingAuth);
        delete authData.OPENAI_API_KEY;

        if (Object.keys(authData).length === 0) {
          await fs.unlink(authPath);
        } else {
          await fs.writeFile(authPath, JSON.stringify(authData, null, 2));
        }
      } catch {
        /* No auth file */
      }
    }

    await removeCodexModelCatalog(codexDir);

    // Clear last-configured timestamp
    try {
      deleteCliToolLastConfigured("codex");
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "OmniRoute settings removed successfully",
    });
  } catch (error) {
    const refusal = configClobberRefusalResponse(error);
    if (refusal) return refusal;
    console.log("Error resetting codex settings:", error);
    return NextResponse.json({ error: "Failed to reset codex settings" }, { status: 500 });
  }
}
