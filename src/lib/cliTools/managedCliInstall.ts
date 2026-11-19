import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type {
  ManagedCliDefinition,
  ManagedCliInstallation,
} from "@/shared/services/managedCliRuntime";
import {
  MANAGED_CLI_STABLE_VERSION,
  getManagedCliDefinition,
} from "@/shared/services/managedCliRuntime";
import { buildManagedCliInvocation } from "@/shared/services/managedCliInvocation.mjs";
import { executeManagedCliCommand as execute } from "./managedCliProcess";
import { ManagedCliRuntimeError } from "./managedCliError";
import { buildManagedCliNpmManifest, supportsManagedCliNpmPolicy } from "./managedCliNpmPolicy.mjs";

const ENVIRONMENT_KEYS = [
  "PATH",
  "HOME",
  "USERPROFILE",
  "APPDATA",
  "LOCALAPPDATA",
  "TEMP",
  "TMP",
  "TMPDIR",
  "SystemRoot",
  "SYSTEMROOT",
  "WINDIR",
  "ComSpec",
  "COMSPEC",
  "PATHEXT",
  "SYSTEMDRIVE",
  "LANG",
  "LC_ALL",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
  "NODE_EXTRA_CA_CERTS",
  "SSL_CERT_FILE",
  "SSL_CERT_DIR",
  "npm_config_proxy",
  "npm_config_https_proxy",
  "npm_config_noproxy",
  "npm_config_cafile",
] as const;

/** Do not forward provider credentials, npm tokens, NODE_OPTIONS or npmrc overrides. */
export function buildManagedCliInstallEnvironment(
  prefix: string,
  source: NodeJS.ProcessEnv = process.env,
  nodePath = process.execPath
): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { NODE_ENV: "production" };
  for (const key of ENVIRONMENT_KEYS) {
    if (source[key] !== undefined) env[key] = source[key];
  }
  env.PATH = [path.dirname(nodePath), source.PATH || source.Path]
    .filter(Boolean)
    .join(path.delimiter);
  env.npm_config_prefix = prefix;
  env.npm_config_cache = path.join(prefix, ".npm-cache");
  env.npm_config_userconfig = path.join(prefix, ".npmrc");
  env.npm_config_globalconfig = path.join(prefix, ".npmrc-global");
  env.npm_config_registry = "https://registry.npmjs.org/";
  env.npm_config_update_notifier = "false";
  return env;
}

export function buildManagedCliInstallArgs(
  definition: ManagedCliDefinition,
  version: string
): string[] {
  if (!MANAGED_CLI_STABLE_VERSION.test(version)) throw new TypeError("Invalid CLI version");
  const approved = getManagedCliDefinition(definition.id);
  if (
    !approved ||
    approved.packageName !== definition.packageName ||
    approved.binary !== definition.binary
  )
    throw new TypeError("Unsupported CLI package");
  const scriptsPolicy = approved.lifecyclePackages.length
    ? "--strict-allow-scripts"
    : "--ignore-scripts";
  return [
    "install",
    "--no-audit",
    "--no-fund",
    "--save-exact",
    "--include=optional",
    "--engine-strict",
    "--registry=https://registry.npmjs.org/",
    scriptsPolicy,
    `${approved.packageName}@${version}`,
  ];
}

export async function installManagedCliCandidate(
  definition: ManagedCliDefinition,
  version: string,
  prefix: string,
  run: typeof execute = execute
): Promise<void> {
  const args = buildManagedCliInstallArgs(definition, version);
  const approved = getManagedCliDefinition(definition.id)!;
  const windows = os.platform() === "win32";
  const command = windows ? "npm.cmd" : "npm";
  const options = {
    cwd: prefix,
    env: buildManagedCliInstallEnvironment(prefix),
    // npm.cmd needs cmd.exe; arguments are fixed flags or validated catalog values.
    ...(windows ? { shell: true } : {}),
  };
  if (approved.lifecyclePackages.length) {
    const npmVersion = await run(command, ["--version"], { ...options, timeout: 20_000 });
    if (!supportsManagedCliNpmPolicy(npmVersion)) {
      throw new ManagedCliRuntimeError(
        "npm_policy_unsupported",
        "This CLI requires npm 11.18 or newer in major 11, or stable npm 12, to enforce its installation-script policy. Update npm separately and retry. The previous CLI remains active.",
        409
      );
    }
  }
  await fs.writeFile(
    path.join(prefix, "package.json"),
    JSON.stringify(buildManagedCliNpmManifest(approved)),
    { flag: "wx", mode: 0o600 }
  );
  await fs.writeFile(path.join(prefix, ".npmrc"), "", { flag: "wx", mode: 0o600 });
  await fs.writeFile(path.join(prefix, ".npmrc-global"), "", { flag: "wx", mode: 0o600 });
  await run(command, args, {
    ...options,
    timeout: 300_000,
  });
}

export async function probeManagedCliCandidate(
  installation: ManagedCliInstallation,
  definition: ManagedCliDefinition
): Promise<string> {
  const invocation = buildManagedCliInvocation(installation, definition);
  return execute(invocation.command, [...invocation.argsPrefix, "--version"], {
    cwd: installation.prefix,
    env: buildManagedCliInstallEnvironment(installation.prefix),
    timeout: 20_000,
  });
}
