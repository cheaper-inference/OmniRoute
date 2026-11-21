import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";
const DEFINITIONS = Object.freeze(
  [
    {
      id: "codex",
      name: "Codex CLI",
      packageName: "@openai/codex",
      binary: "codex",
      envBinKey: "CLI_CODEX_BIN",
      updateSupported: true,
      lifecyclePackages: [],
    },
    {
      id: "claude",
      name: "Claude Code",
      packageName: "@anthropic-ai/claude-code",
      binary: "claude",
      envBinKey: "CLI_CLAUDE_BIN",
      updateSupported: true,
      lifecyclePackages: ["@anthropic-ai/claude-code"],
    },
    {
      id: "droid",
      name: "Droid",
      packageName: "droid",
      binary: "droid",
      envBinKey: "CLI_DROID_BIN",
      updateSupported: true,
      lifecyclePackages: ["droid"],
    },
    {
      id: "openclaw",
      name: "OpenClaw",
      packageName: "openclaw",
      binary: "openclaw",
      envBinKey: "CLI_OPENCLAW_BIN",
      updateSupported: false,
      lifecyclePackages: ["openclaw", "sharp", "@google/genai", "tree-sitter-bash", "protobufjs"],
    },
    {
      id: "qoder",
      name: "Qoder CLI",
      packageName: "@qoder-ai/qodercli",
      binary: "qodercli",
      envBinKey: "CLI_QODER_BIN",
      updateSupported: true,
      // Its published bundle is ready to run; postinstall changes the user's global PATH.
      lifecyclePackages: [],
    },
  ].map((definition) =>
    Object.freeze({ ...definition, lifecyclePackages: Object.freeze(definition.lifecyclePackages) })
  )
);
export const MANAGED_CLI_STABLE_VERSION = /^(0|[1-9]\d{0,8})\.(0|[1-9]\d{0,8})\.(0|[1-9]\d{0,8})$/;
const INSTALLATION_ID =
  /^\d{1,9}\.\d{1,9}\.\d{1,9}-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const pointerSchema = z
  .object({
    version: z.string().regex(MANAGED_CLI_STABLE_VERSION),
    installationId: z.string().regex(INSTALLATION_ID),
    updatedAt: z.string().datetime(),
  })
  .strict();
export function getManagedCliDefinition(toolId) {
  return DEFINITIONS.find((definition) => definition.id === toolId);
}
export function listManagedCliDefinitions() {
  return DEFINITIONS;
}
export function hasManagedCliOverride(definition, env = process.env) {
  return Boolean(env[definition.envBinKey]?.trim());
}
function isWithin(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))
  );
}
/** Validate the ownership boundary before accessing any install or pointer. */
export function assertManagedCliPath(root, candidate) {
  const rootStat = fs.lstatSync(root);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink())
    throw new Error("Unsafe CLI runtime root");
  if (!isWithin(path.resolve(root), path.resolve(candidate)))
    throw new Error("Unsafe CLI runtime path");
  const realRoot = fs.realpathSync(root);
  const realCandidate = fs.realpathSync(candidate);
  if (!isWithin(realRoot, realCandidate)) throw new Error("CLI runtime path escapes its root");
}
/** Package metadata and executable must both belong to this exact candidate. */
export function inspectManagedCliInstallation(definition, root, pointer, platform = os.platform()) {
  const validated = pointerSchema.parse(pointer);
  if (!validated.installationId.startsWith(`${validated.version}-`))
    throw new Error("CLI installation version mismatch");
  const prefix = path.join(root, definition.id, "versions", validated.installationId);
  assertManagedCliPath(root, prefix);
  const packagePath = path.join(
    prefix,
    "node_modules",
    ...definition.packageName.split("/"),
    "package.json"
  );
  const command = path.join(
    prefix,
    "node_modules",
    ".bin",
    `${definition.binary}${platform === "win32" ? ".cmd" : ""}`
  );
  for (const file of [packagePath, command]) {
    assertManagedCliPath(prefix, file);
    if (!fs.statSync(file).isFile()) throw new Error("Invalid CLI installation file");
  }
  if (fs.statSync(packagePath).size > 1024 * 1024) throw new Error("Invalid CLI package metadata");
  const metadata = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const parsed = z
    .object({
      name: z.literal(definition.packageName),
      version: z.literal(validated.version),
      bin: z.union([z.string(), z.record(z.string(), z.string())]),
    })
    .safeParse(metadata);
  if (!parsed.success) throw new Error("CLI package identity or version mismatch");
  const bin =
    typeof parsed.data.bin === "string" ? parsed.data.bin : parsed.data.bin[definition.binary];
  if (!bin || path.isAbsolute(bin) || bin.split(/[\\/]/).includes(".."))
    throw new Error("Invalid CLI package binary");
  const executableEntryPath = path.resolve(path.dirname(packagePath), bin);
  // Native npm distributions may link their bin to a sibling optional platform package.
  assertManagedCliPath(prefix, executableEntryPath);
  if (!fs.statSync(executableEntryPath).isFile()) throw new Error("Invalid CLI executable entry");
  fs.accessSync(command, platform === "win32" ? fs.constants.R_OK : fs.constants.X_OK);
  return { command, prefix, version: validated.version, executableEntryPath };
}
export function readManagedCliInstallation(toolId, root, platform = os.platform()) {
  const definition = getManagedCliDefinition(toolId);
  if (!definition) return null;
  try {
    const pointerPath = path.join(root, definition.id, "active.json");
    assertManagedCliPath(root, pointerPath);
    const stat = fs.lstatSync(pointerPath);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 4096) return null;
    const pointer = pointerSchema.parse(JSON.parse(fs.readFileSync(pointerPath, "utf8")));
    return { pointer, ...inspectManagedCliInstallation(definition, root, pointer, platform) };
  } catch {
    // A missing or invalid managed install never replaces a working external CLI.
    return null;
  }
}
/** Accept version banners while retaining prerelease information for no-downgrade checks. */
export function parseManagedCliVersion(output) {
  if (typeof output !== "string" || output.length > 4096) return null;
  const match = output.match(
    /\b((?:0|[1-9]\d{0,8})\.(?:0|[1-9]\d{0,8})\.(?:0|[1-9]\d{0,8})(?:-[A-Za-z0-9.-]{1,80})?(?:\+[A-Za-z0-9.-]{1,80})?)(?![A-Za-z0-9._-])/
  );
  return match?.[1] ?? null;
}
export function compareManagedCliVersions(left, right) {
  const parse = (value) => {
    if (parseManagedCliVersion(value) !== value) throw new TypeError("Invalid CLI version");
    const [core, prerelease] = value.split("+")[0].split("-", 2);
    return { parts: core.split(".").map(Number), prerelease };
  };
  const a = parse(left);
  const b = parse(right);
  for (let index = 0; index < 3; index += 1) {
    if (a.parts[index] !== b.parts[index]) return a.parts[index] - b.parts[index];
  }
  if (Boolean(a.prerelease) !== Boolean(b.prerelease)) return a.prerelease ? -1 : 1;
  return 0;
}
