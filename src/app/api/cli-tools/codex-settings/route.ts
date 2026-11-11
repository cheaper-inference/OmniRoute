"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { parse as parseToml, stringify as stringifyToml } from "smol-toml";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  ensureCliConfigWriteAllowed,
  getCliConfigPaths,
  getCliRuntimeStatus,
} from "@/shared/services/cliRuntime";
import { createMultiBackup } from "@/shared/services/backupService";
import { writeFilesWithRollback } from "@/lib/cli-helper/configTransaction";
import { saveCliToolLastConfigured, deleteCliToolLastConfigured } from "@/lib/db/cliToolState";
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

const getCodexConfigPath = () => getCliConfigPaths("codex").config;
const getCodexAuthPath = () => getCliConfigPaths("codex").auth;
const getCodexDir = () => path.dirname(getCodexConfigPath());
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
      configPath: getCodexConfigPath(),
    });
  } catch (error) {
    console.log("Error checking codex settings:", error);
    return NextResponse.json({ error: "Failed to check codex settings" }, { status: 500 });
  }
}

// POST - Update OmniRoute settings (merge with existing config)
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

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
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    // (#549) Extract keyId BEFORE validation — Zod strips unknown fields!
    // The dashboard sends masked key strings — resolving by ID guarantees
    // we always write the full key value to the config file.
    const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;

    const validation = validateBody(codexSettingsConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, model, reasoningEffort, wireApi, modelMappings, modelCatalog } =
      validation.data;
    // Canonical key resolution (#13563): by keyId -> submitted apiKey -> sk_omniroute.
    // Matches cline/forge/openclaw/grok-build/jcode-settings.
    const apiKey = await resolveApiKey(keyId, validation.data.apiKey);

    const codexDir = getCodexDir();
    const configPath = getCodexConfigPath();
    const authPath = getCodexAuthPath();

    // Ensure directory exists
    await fs.mkdir(codexDir, { recursive: true });

    // Backup current configs before modifying
    await createMultiBackup("codex", [configPath, authPath]);

    // Read BOTH files before writing either one. A file that exists but cannot
    // be read or parsed is not an empty config: the merge below writes the result
    // back, which would replace every provider/MCP server in config.toml and the
    // ChatGPT OAuth tokens in auth.json. Only ENOENT means "start fresh".
    const doc: TomlDoc = (await readExistingConfig(configPath, parseConfig)) ?? {};
    const authData: Record<string, any> =
      (await readExistingConfig(authPath, parseJsonObject)) ?? {};

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

    // Always create a custom provider to reliably pass wire_api and use OMNIROUTE_API_KEY
    doc.model_provider = "omniroute";
    doc.model_providers = {
      ...asRecord(doc.model_providers),
      omniroute: {
        name: "OmniRoute",
        base_url: normalizedBaseUrl,
        wire_api: effectiveWireApi,
        env_key: "OPENAI_API_KEY",
      },
    };
    delete doc.openai_base_url;

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

    // Point Codex's /model picker at an OmniRoute catalog. Fail-open: on any failure
    // Apply still succeeds, a previous value is left alone and a warning is returned.
    let catalog: CodexCatalogWriteResult | null = null;
    if (modelCatalog === true) {
      catalog = await writeCodexModelCatalog({
        codexDir,
        selectedModels: [model, ...Object.values(modelMappings ?? {})],
        listModels: () => listOmniRouteChatModels(request),
      });
      if (catalog.catalogPath) doc.model_catalog_json = toTomlPath(catalog.catalogPath);
    }

    // Write merged config, then auth.json with OPENAI_API_KEY (Codex reads this first).
    // If the second write fails the first is put back: new routing must not meet old auth.
    authData.OPENAI_API_KEY = apiKey;
    await writeFilesWithRollback([
      { path: configPath, content: toToml(doc) },
      { path: authPath, content: JSON.stringify(authData, null, 2) },
    ]);

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured("codex");
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "Codex settings applied successfully!",
      configPath,
      ...(catalog?.catalogPath
        ? { catalogPath: catalog.catalogPath, catalogModelCount: catalog.count }
        : {}),
      ...(catalog?.warning ? { catalogWarning: catalog.warning } : {}),
    });
  } catch (error) {
    const refusal = configClobberRefusalResponse(error);
    if (refusal) return refusal;
    console.log("Error updating codex settings:", error);
    return NextResponse.json({ error: "Failed to update codex settings" }, { status: 500 });
  }
}

// DELETE - Remove OmniRoute settings only (keep other settings)
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getCodexConfigPath();

    // Backup current configs before resetting
    await createMultiBackup("codex", [configPath, getCodexAuthPath()]);

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
    delete doc.openai_base_url;

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
    const codexDir = getCodexDir();
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
    const authPath = getCodexAuthPath();
    try {
      const existingAuth = await fs.readFile(authPath, "utf-8");
      const authData = JSON.parse(existingAuth);
      delete authData.OPENAI_API_KEY;

      // Write back or delete if empty
      if (Object.keys(authData).length === 0) {
        await fs.unlink(authPath);
      } else {
        await fs.writeFile(authPath, JSON.stringify(authData, null, 2));
      }
    } catch {
      /* No auth file */
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
