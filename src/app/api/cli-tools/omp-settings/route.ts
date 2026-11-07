export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { dump as yamlDump } from "js-yaml";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { ompSettingsSchema } from "@/shared/validation/schemas/cli";
import { getOmpCredentials, saveOmpCredentials, deleteOmpCredentials } from "@/lib/db/omp";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { createBackup } from "@/shared/services/backupService";
import { OMP_ROLE_IDS, type OmpRoleId } from "@/shared/constants/ompRoles";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  ConfigClobberRefusedError,
  configClobberRefusalResponse,
  parseYamlObject,
  readExistingConfig,
} from "../_lib/readExistingConfig";

const execAsync = promisify(exec);

const PROVIDER_ID = "omniroute";
const ROLE_PREFIX = `${PROVIDER_ID}/`;
const BACKUP_TOOL_ID = "omp";

const getOmpDir = () => path.join(os.homedir(), ".omp", "agent");
const getOmpDbPath = () => path.join(getOmpDir(), "agent.db");
const getOmpModelsYmlPath = () => path.join(getOmpDir(), "models.yml");
const getOmpConfigYmlPath = () => path.join(getOmpDir(), "config.yml");

type YamlMap = Record<string, any>;

const checkOmpInstalled = async () => {
  const isWindows = os.platform() === "win32";
  try {
    const command = isWindows ? "where omp" : "which omp";
    await execAsync(command, { windowsHide: true });
    return true;
  } catch {
    try {
      await fs.access(getOmpDbPath());
      return true;
    } catch {
      if (isWindows) {
        try {
          const appDataPath = path.join(process.env.LOCALAPPDATA || "", "omp", "omp.exe");
          await fs.access(appDataPath);
          return true;
        } catch {}
        try {
          const binPath = path.join(os.homedir(), ".omp", "bin", "omp.exe");
          await fs.access(binPath);
          return true;
        } catch {}
      } else {
        try {
          const binPath = path.join(os.homedir(), ".omp", "bin", "omp");
          await fs.access(binPath);
          return true;
        } catch {}
      }
      return false;
    }
  }
};

/** Parse a YAML mapping whose `key` (when present) must itself be a mapping. */
const yamlMapWith =
  (key: string) =>
  (raw: string): YamlMap => {
    const parsed = parseYamlObject(raw);
    const value = parsed[key];
    if (value != null && (typeof value !== "object" || Array.isArray(value))) {
      throw new TypeError(`\`${key}\` must be a mapping`);
    }
    return parsed;
  };

const parseModelsYml = yamlMapWith("providers");
const parseConfigYml = yamlMapWith("modelRoles");

// Write paths: a missing file is empty, an unreadable/unparsable one throws
// (ConfigClobberRefusedError -> 409) so it is never overwritten.
const readModelsYml = async (): Promise<YamlMap> =>
  (await readExistingConfig(getOmpModelsYmlPath(), parseModelsYml)) ?? {};
const readConfigYml = async (): Promise<YamlMap> =>
  (await readExistingConfig(getOmpConfigYmlPath(), parseConfigYml)) ?? {};

// GET is a status read: tolerate a broken file instead of failing the page.
const readForStatus = async (read: () => Promise<YamlMap>): Promise<YamlMap> => {
  try {
    return await read();
  } catch (error) {
    if (error instanceof ConfigClobberRefusedError) return {};
    throw error;
  }
};

const writeYml = async (filePath: string, data: YamlMap) => {
  await createBackup(BACKUP_TOOL_ID, filePath);
  await fs.writeFile(filePath, yamlDump(data, { lineWidth: -1 }), "utf-8");
};

const routerModelId = (value: unknown): string | null =>
  typeof value === "string" && value.startsWith(ROLE_PREFIX) && value.length > ROLE_PREFIX.length
    ? value.slice(ROLE_PREFIX.length)
    : null;

/** Official omp roles currently pointing at an OmniRoute model, as `{ role: modelId }`. */
const getRouterRoles = (configYml: YamlMap): Partial<Record<OmpRoleId, string>> => {
  const roles: Partial<Record<OmpRoleId, string>> = {};
  for (const role of OMP_ROLE_IDS) {
    const modelId = routerModelId(configYml.modelRoles?.[role]);
    if (modelId) roles[role] = modelId;
  }
  return roles;
};

/**
 * Apply role assignments in place. A model id sets `modelRoles.<role>` to
 * `omniroute/<id>`; null/"" removes the role only when OmniRoute owns it — roles
 * pointing at other providers and custom role keys are never touched.
 * Returns whether anything changed.
 */
const applyRoleAssignments = (
  configYml: YamlMap,
  roles: Partial<Record<OmpRoleId, string | null>>
): boolean => {
  const modelRoles: YamlMap = { ...(configYml.modelRoles || {}) };
  let changed = false;
  for (const [role, requested] of Object.entries(roles)) {
    const current = modelRoles[role];
    if (requested) {
      const next = `${ROLE_PREFIX}${requested}`;
      if (current !== next) {
        modelRoles[role] = next;
        changed = true;
      }
    } else if (routerModelId(current)) {
      delete modelRoles[role];
      changed = true;
    }
  }
  if (!changed) return false;
  if (Object.keys(modelRoles).length > 0) configYml.modelRoles = modelRoles;
  else delete configYml.modelRoles;
  return true;
};

/** Remove every OmniRoute-owned role value (any key, official or custom). */
const removeRouterRoles = (configYml: YamlMap): boolean => {
  if (!configYml.modelRoles) return false;
  const roles = Object.fromEntries(
    Object.keys(configYml.modelRoles)
      .filter((role) => routerModelId(configYml.modelRoles[role]))
      .map((role) => [role, null])
  );
  return applyRoleAssignments(configYml, roles);
};

export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  try {
    const installed = await checkOmpInstalled();

    if (!installed) {
      return NextResponse.json({
        installed: false,
        config: null,
        message: "Oh My Pi is not installed",
      });
    }

    const creds = getOmpCredentials(PROVIDER_ID);
    const modelsYml = await readForStatus(readModelsYml);
    const ymlProvider = modelsYml?.providers?.[PROVIDER_ID];
    const configYml = await readForStatus(readConfigYml);

    return NextResponse.json({
      installed: true,
      config: {
        providers: {
          [PROVIDER_ID]: {
            baseUrl: ymlProvider?.baseUrl || creds.baseUrl,
            apiKey: ymlProvider?.apiKey || creds.apiKey,
            discovery: ymlProvider?.discovery?.type || null,
          },
        },
        modelRoles: getRouterRoles(configYml),
      },
      hasOmniRoute: !!(ymlProvider || creds.hasOmniRoute),
      configPath: getOmpModelsYmlPath(),
    });
  } catch (error) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}

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
    const validation = validateBody(ompSettingsSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, apiKey, roles } = validation.data;

    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;
    const keyRef = apiKey || "sk_omniroute";

    await fs.mkdir(getOmpDir(), { recursive: true });

    // Read every file this request writes BEFORE writing any of them, so an
    // unparsable models.yml/config.yml aborts the whole apply (409) untouched.
    const modelsYml = await readModelsYml();
    const configYml = roles ? await readConfigYml() : null;

    // 1. Write models.yml — provider config + auto-discovery
    if (!modelsYml.providers) modelsYml.providers = {};

    modelsYml.providers[PROVIDER_ID] = {
      baseUrl: normalizedBaseUrl,
      apiKey: keyRef,
      api: "openai-completions",
      authHeader: true,
      disableStrictTools: true,
      discovery: { type: "openai-models-list", injectV1: false },
    };

    await writeYml(getOmpModelsYmlPath(), modelsYml);

    // 2. Optional modelRoles assignments in config.yml (written only on change)
    if (configYml && roles && applyRoleAssignments(configYml, roles)) {
      await writeYml(getOmpConfigYmlPath(), configYml);
    }

    // 3. Write auth_credentials — so omp sees omniroute as "logged in"
    saveOmpCredentials(PROVIDER_ID, keyRef, normalizedBaseUrl);

    return NextResponse.json({
      success: true,
      message:
        "Oh My Pi settings applied! Run omp and all OmniRoute models appear under omniroute in /model.",
      configPath: getOmpModelsYmlPath(),
      ...(configYml ? { modelRoles: getRouterRoles(configYml) } : {}),
    });
  } catch (error) {
    const refusal = configClobberRefusalResponse(error);
    if (refusal) return refusal;
    return NextResponse.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  try {
    // Read both files first: an unparsable one aborts the reset (409) untouched.
    const modelsYml = await readModelsYml();
    const configYml = await readConfigYml();

    // 1. Remove from models.yml
    if (modelsYml?.providers?.[PROVIDER_ID]) {
      delete modelsYml.providers[PROVIDER_ID];
      if (Object.keys(modelsYml.providers).length === 0) delete modelsYml.providers;
      await fs.mkdir(getOmpDir(), { recursive: true });
      if (Object.keys(modelsYml).length === 0) {
        await createBackup(BACKUP_TOOL_ID, getOmpModelsYmlPath());
        await fs.unlink(getOmpModelsYmlPath()).catch(() => {});
      } else {
        await writeYml(getOmpModelsYmlPath(), modelsYml);
      }
    }

    // 2. Drop modelRoles values that point at OmniRoute; keep everything else
    if (removeRouterRoles(configYml)) {
      await writeYml(getOmpConfigYmlPath(), configYml);
    }

    // 3. Remove from auth_credentials
    deleteOmpCredentials(PROVIDER_ID);

    return NextResponse.json({
      success: true,
      message: "OmniRoute removed from Oh My Pi",
    });
  } catch (error) {
    const refusal = configClobberRefusalResponse(error);
    if (refusal) return refusal;
    return NextResponse.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}
