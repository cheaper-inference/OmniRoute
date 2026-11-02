"use server";

import { NextResponse } from "next/server";

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import { guardCliConfigWrite } from "@/lib/api/cliConfigWriteGuard";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { saveCliToolLastConfigured, deleteCliToolLastConfigured } from "@/lib/db/cliToolState";
import { createBackup } from "@/shared/services/backupService";
import {
  PI_TOOL_ID,
  applyOmniRoutePiProvider,
  getPiModelsPath,
  hasOmniRoutePiProvider,
  hasUnownedOmniRoutePiProvider,
  normalizePiBaseUrl,
  readOmniRoutePiProvider,
  readPiModelsJson,
  removeOmniRoutePiProvider,
} from "@/shared/services/piConfig";
import { getCliRuntimeStatus } from "@/shared/services/cliRuntime";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { cliModelConfigSchema } from "@/shared/validation/schemas";
import {
  ConfigClobberRefusedError,
  configClobberRefusalResponse,
} from "../_lib/readExistingConfig";

/**
 * /api/cli-tools/pi-settings
 *
 * Manages the OmniRoute provider inside Pi Coding Agent's models.json
 * (`~/.pi/agent/models.json`, overridable with `PI_CODING_AGENT_DIR`).
 *
 * Pi loads custom providers from `providers.<name>` in that file and never
 * auto-lists models for them, so the entry carries an explicit `models[]`.
 */

type PiRuntimeStatus = Awaited<ReturnType<typeof getCliRuntimeStatus>>;
type PiModelsRead = Awaited<ReturnType<typeof readPiModelsJson>>;

function piRuntimeFields(runtime: PiRuntimeStatus, modelsPath: string) {
  return {
    installed: runtime.installed,
    runnable: runtime.runnable,
    command: runtime.command,
    commandPath: runtime.commandPath,
    runtimeMode: runtime.runtimeMode,
    reason: runtime.reason,
    modelsPath,
  };
}

/** The OmniRoute provider state the current models.json holds. */
function piProviderState({ config, error }: PiModelsRead) {
  const provider = readOmniRoutePiProvider(config);
  const { apiPort } = getRuntimePorts();
  const unowned = hasUnownedOmniRoutePiProvider(config, apiPort);
  const currentProvider = provider ?? (unowned ? config?.providers.omniroute : null);
  const models = Array.isArray(currentProvider?.models) ? currentProvider.models : null;
  const present = hasOmniRoutePiProvider(config) || unowned;
  return {
    // Surface a corrupt or non-models JSON file instead of misreading it as
    // "not configured" — the user needs to know their config is broken.
    configError: error,
    // Provider names Pi currently knows about (informational for the card).
    providers: config ? Object.keys(config.providers || {}) : null,
    hasOmniRoute: present,
    // A working but unowned entry: report it so the card shows "configured",
    // while signalling that Reset will not touch it.
    omniRouteUnowned: unowned,
    omniRouteOwned: hasOmniRoutePiProvider(config),
    baseUrl: typeof currentProvider?.baseUrl === "string" ? currentProvider.baseUrl : null,
    model: Array.isArray(models) && models[0]?.id ? String(models[0].id) : null,
    apiKeyId: null,
    message: error ?? undefined,
  };
}

// GET — detect the pi binary and report the current OmniRoute provider state
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const runtime = await getCliRuntimeStatus(PI_TOOL_ID);
    const modelsPath = getPiModelsPath();

    if (!runtime.installed || !runtime.runnable) {
      return NextResponse.json({
        ...piRuntimeFields(runtime, modelsPath),
        providers: null,
        hasOmniRoute: false,
        message:
          runtime.installed && !runtime.runnable
            ? "Pi CLI is installed but not runnable"
            : "Pi CLI is not installed",
      });
    }

    return NextResponse.json({
      ...piRuntimeFields(runtime, modelsPath),
      ...piProviderState(await readPiModelsJson()),
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// POST — write the OmniRoute provider into Pi's models.json
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  try {
    // Extract keyId BEFORE Zod validation — Zod strips unknown fields.
    const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;

    const validation = validateBody(cliModelConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { model } = validation.data;
    let baseUrl: string;
    try {
      baseUrl = normalizePiBaseUrl(validation.data.baseUrl);
    } catch (err) {
      return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 400 });
    }
    const apiKey = await resolveApiKey(keyId, validation.data.apiKey);

    // Refuse to write into a container-ephemeral home; clients render the
    // hostCommand guidance from the returned body.
    const refusal = guardCliConfigWrite(getPiModelsPath(), {
      toolLabel: "Pi",
      // There is no `omniroute setup-pi` yet — point at the generic connect
      // flow plus the file the dashboard writes, so the operator is not sent
      // to a command that does not exist.
      hostCommand: "omniroute connect http://localhost:20128",
    });
    if (refusal) return refusal;

    const modelsPath = getPiModelsPath();

    // Only a missing models.json starts fresh. One that exists but is unreadable
    // as a models.json (bad JSON, no `providers` object, wrong shape) would be
    // replaced by our single provider and lose the user's other providers, so it
    // is refused with the shared 409 contract (#16523) and left untouched.
    const { error: modelsError } = await readPiModelsJson();
    if (modelsError) {
      throw new ConfigClobberRefusedError(modelsPath, { cause: new Error(modelsError) });
    }

    await createBackup(PI_TOOL_ID, modelsPath);
    await applyOmniRoutePiProvider({ baseUrl, apiKey, model, modelName: model });

    try {
      saveCliToolLastConfigured(PI_TOOL_ID);
    } catch {
      /* non-critical bookkeeping */
    }

    return NextResponse.json({
      success: true,
      message: "Pi settings applied successfully!",
      configPath: modelsPath,
    });
  } catch (err) {
    const refusal = configClobberRefusalResponse(err);
    if (refusal) return refusal;
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// DELETE — remove only the OmniRoute-owned provider from Pi's models.json
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const modelsPath = getPiModelsPath();
    const refusal = guardCliConfigWrite(modelsPath, {
      toolLabel: "Pi",
      hostCommand: "omniroute connect http://localhost:20128",
    });
    if (refusal) return refusal;

    await createBackup(PI_TOOL_ID, modelsPath);
    const { removed } = await removeOmniRoutePiProvider();

    if (removed) {
      try {
        deleteCliToolLastConfigured(PI_TOOL_ID);
      } catch {
        /* non-critical bookkeeping */
      }
    }

    return NextResponse.json({
      success: true,
      message: removed ? "Pi OmniRoute settings removed" : "No OmniRoute provider to remove",
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}
