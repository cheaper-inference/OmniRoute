import { createHash, randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  ensureCliConfigWriteAllowed,
  getCodexClientConfigHome,
} from "@/shared/services/cliRuntime";
import { dump as stringifyYaml, load as parseYaml } from "js-yaml";
import { z } from "zod";

import { resolveDataDir } from "@/lib/dataPaths";
import { clientInstructionsId } from "./clientInstructions";
import { getHermesHome } from "./config-generator/hermesHome";

type Client = z.infer<typeof clientInstructionsId>;
type Source = Client | "shared" | "cc-switch";
const clients = clientInstructionsId.options;
const idSchema = z.string().regex(/^[a-f0-9]{64}$/);
const skillAction = z.enum(["import", "enable", "disable", "update", "uninstall"]);
type SkillAction = z.infer<typeof skillAction>;
type ClientSkillAction = Exclude<SkillAction, "import">;
export const clientSkillLibraryChange = z
  .strictObject({
    action: skillAction,
    ids: z.array(idSchema).min(1).max(50),
    client: clientInstructionsId.optional(),
  })
  .refine(({ action, client }) => !["enable", "disable"].includes(action) || !!client);

const safeName = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/;
const reservedName = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
const ownerFile = ".omniroute-skill-owner";
const byteLimit = 10 * 1024 * 1024;
const sourcesSharedBy = new Set<Client>(["codex", "kimi-code"]);
const frontmatter = /^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

type Skill = {
  id: string;
  name: string;
  description?: string;
  source: Source;
  bundle: string;
  flat: boolean;
};
type Assignment = {
  enabled: boolean;
  canEnable: boolean;
  canDisable: boolean;
  reason?: string;
};

class SkillConflict extends Error {}

function roots(): Record<Source, string> {
  const home = os.homedir();
  return {
    codex: path.join(getCodexClientConfigHome(), "skills"),
    hermes: path.resolve(getHermesHome(), "skills"),
    "kimi-code": path.resolve(
      process.env.KIMI_CODE_HOME || path.join(home, ".kimi-code"),
      "skills"
    ),
    codebuddy: path.resolve(
      process.env.CODEBUDDY_CONFIG_DIR || path.join(home, ".codebuddy"),
      "skills"
    ),
    shared: path.join(home, ".agents", "skills"),
    "cc-switch": path.join(home, ".cc-switch", "skills"),
  };
}

function libraryRoot() {
  return path.resolve(resolveDataDir(), "client-skill-library");
}

function history(root: string) {
  return path.join(path.dirname(root), ".omniroute-skill-history");
}

function skillId(source: Source, root: string, relative: string) {
  return createHash("sha256")
    .update(source + "\0" + root + "\0" + relative)
    .digest("hex");
}

function assertDirectoryChain(dir: string) {
  for (let cursor = dir; cursor !== path.dirname(cursor); cursor = path.dirname(cursor)) {
    const stat = fs.lstatSync(cursor, { throwIfNoEntry: false });
    if (stat && !stat.isDirectory()) throw new SkillConflict("Linked directories are read-only");
  }
}

function readSmallFile(file: string, bytes: number) {
  const stat = fs.lstatSync(file, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.size > bytes) return;
  return fs.readFileSync(file, "utf8");
}

function describe(file: string, fallback: string) {
  const content = readSmallFile(file, 256 * 1024);
  if (content === undefined) return;
  const header = frontmatter.exec(content)?.[1];
  let data: unknown;
  try {
    data = header && parseYaml(header);
  } catch {
    return;
  }
  if (data != null && (typeof data !== "object" || Array.isArray(data))) return;
  const metadata = data as Record<string, unknown> | undefined;
  const name = typeof metadata?.name === "string" ? metadata.name : fallback;
  if (!safeName.test(name) || reservedName.test(name)) return;
  const description =
    typeof metadata?.description === "string" ? metadata.description.slice(0, 500) : undefined;
  return { name, description, metadata };
}

function discover(native: ReturnType<typeof roots>): Skill[] {
  return Object.entries(native).flatMap(([source, root]) => {
    function scan(dir: string, depth: number): Skill[] {
      if (!fs.lstatSync(dir, { throwIfNoEntry: false })?.isDirectory()) return [];
      return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        if (entry.name.startsWith(".") || entry.isSymbolicLink()) return [];
        const flat =
          depth === 0 &&
          (source === "kimi-code" || source === "shared") &&
          entry.isFile() &&
          entry.name.endsWith(".md");
        const bundle = path.join(dir, entry.name);
        const file = flat ? bundle : path.join(bundle, "SKILL.md");
        if (!flat && !entry.isDirectory()) return [];
        const data = describe(file, flat ? entry.name.slice(0, -3) : entry.name);
        if (!data) return !flat && depth < 4 ? scan(bundle, depth + 1) : [];
        const id = skillId(source as Source, root, path.relative(root, bundle));
        const { name, description } = data;
        return [{ name, description, source: source as Source, id, bundle, flat }];
      });
    }
    return scan(root, 0);
  });
}

const originSchema = z.object({
  id: idSchema,
  source: z.enum([...clients, "shared", "cc-switch"]),
  name: z.string().regex(safeName),
  adopted: z.object({ relative: z.string().min(1).max(1024), fingerprint: idSchema }).optional(),
});
type Managed = z.infer<typeof originSchema> & { description?: string; bundle: string };

function readLibrary(): Managed[] {
  const root = libraryRoot();
  assertDirectoryChain(root);
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory() || !idSchema.safeParse(entry.name).success) return [];
    const dir = path.join(root, entry.name);
    const origin = originSchema.parse(
      JSON.parse(readSmallFile(path.join(dir, "origin.json"), 4096) ?? "null")
    );
    const bundle = path.join(dir, "bundle");
    assertDirectoryChain(bundle);
    const data = describe(path.join(bundle, "SKILL.md"), origin.name);
    if (!data || origin.id !== entry.name) throw new Error("Invalid stored skill");
    return [{ ...data, ...origin, bundle }];
  });
}

function treeDigest(bundle: string) {
  const hash = createHash("sha256");
  let bytes = 0;
  let files = 0;
  function visit(dir: string) {
    for (const name of fs.readdirSync(dir).sort()) {
      if (dir === bundle && name === ownerFile) continue;
      const file = path.join(dir, name);
      const stat = fs.lstatSync(file);
      if (++files > 1024) throw new SkillConflict("Skill bundle contains too many files");
      hash.update(
        JSON.stringify([path.relative(bundle, file), stat.isDirectory() ? null : stat.size])
      );
      if (stat.isDirectory()) visit(file);
      else if (stat.isFile()) {
        bytes += stat.size;
        if (bytes > byteLimit) throw new SkillConflict("Skill bundle exceeds 10 MB");
        hash.update(fs.readFileSync(file));
      } else throw new SkillConflict("Skill bundles with linked files are read-only");
    }
  }
  assertDirectoryChain(path.dirname(bundle));
  const root = fs.lstatSync(bundle);
  if (root.isFile()) {
    if (root.size > byteLimit) throw new SkillConflict("Skill bundle exceeds 10 MB");
    return hash.update("file\0").update(fs.readFileSync(bundle)).digest("hex");
  }
  if (!root.isDirectory()) throw new SkillConflict("Linked skill files are read-only");
  visit(bundle);
  return hash.digest("hex");
}

function isOwned(bundle: string, id: string) {
  return readSmallFile(path.join(bundle, ownerFile), 160)?.startsWith(id + ":") ?? false;
}

function verifyOwned(bundle: string, id: string) {
  if (readSmallFile(path.join(bundle, ownerFile), 160) !== id + ":" + treeDigest(bundle)) {
    throw new SkillConflict("Client copy changed outside OmniRoute");
  }
}

function sameName(left: Skill | Managed, right: Skill | Managed) {
  return left.name.toLowerCase() === right.name.toLowerCase();
}

function adoptionPath(skill: Managed, client: Client, root: string) {
  const relative = skill.adopted?.relative;
  if (!relative || skill.source !== client) return;
  const dest = path.resolve(root, relative);
  if (
    path.isAbsolute(relative) ||
    relative.startsWith("..") ||
    path.relative(root, dest) !== relative ||
    skillId(client, root, relative) !== skill.id
  )
    return;
  return { dest, backup: path.join(history(root), "adopted-" + skill.id) };
}

function adoptedAssignment(
  skill: Managed,
  client: Client,
  root: string,
  matches: Skill[]
): Assignment {
  const adoption = adoptionPath(skill, client, root);
  const current = adoption && fs.lstatSync(adoption.dest, { throwIfNoEntry: false });
  const saved = adoption && fs.lstatSync(adoption.backup, { throwIfNoEntry: false });
  if (!adoption || !!current === !!saved || matches.some(({ id }) => id !== skill.id))
    return {
      enabled: !!current,
      canEnable: false,
      canDisable: false,
      reason: "The adopted path changed or conflicts with another skill",
    };
  return { enabled: !!current, canEnable: !!saved, canDisable: !!current };
}

function assignment(
  skill: Managed | Skill,
  managed: boolean,
  client: Client,
  local: Skill[],
  native: ReturnType<typeof roots>
): Assignment {
  const matching = (source: Source) =>
    local.filter((entry) => sameName(skill, entry) && entry.source === source);
  const dest = path.join(native[client], skill.name);
  const stat = fs.lstatSync(dest, { throwIfNoEntry: false });
  const nativeMatches = matching(client);
  const shared = sourcesSharedBy.has(client) ? matching("shared") : [];
  if (shared.length)
    return {
      enabled: shared.some(({ id }) => id === skill.id),
      canEnable: false,
      canDisable: false,
      reason: shared.some(({ id }) => id === skill.id)
        ? "Loaded from the shared skills directory"
        : "A skill with this name is loaded from the shared skills directory",
    };
  if ("adopted" in skill && skill.adopted && skill.source === client)
    return adoptedAssignment(skill, client, native[client], nativeMatches);
  if (managed && stat?.isDirectory() && isOwned(dest, skill.id)) {
    return {
      enabled: nativeMatches.some(({ bundle }) => bundle === dest),
      canEnable: false,
      canDisable: true,
    };
  }
  if (stat || nativeMatches.length)
    return {
      enabled: nativeMatches.some(({ id }) => id === skill.id),
      canEnable: false,
      canDisable: false,
      reason: "Existing client files are unmanaged",
    };
  return { enabled: false, canEnable: managed, canDisable: false };
}

export function getClientSkillLibrary() {
  const native = roots();
  const local = discover(native);
  const stored = readLibrary();
  const known = new Set(stored.map(({ id }) => id));
  const rows = [
    ...stored.map((skill) => ({ skill, managed: true })),
    ...local
      .filter(
        ({ id, bundle, flat }) =>
          !known.has(id) && (flat || !readSmallFile(path.join(bundle, ownerFile), 160))
      )
      .map((skill) => ({ skill, managed: false })),
  ];
  return {
    items: rows.map(({ skill, managed }) => ({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      managed,
      sourceClient: clientInstructionsId.safeParse(skill.source).data,
      shared: skill.source === "shared" || skill.source === "cc-switch",
      clients: Object.fromEntries(
        clients.map((client) => [client, assignment(skill, managed, client, local, native)])
      ) as Record<Client, Assignment>,
    })),
  };
}

function stageBundle(skill: Skill | Managed, target: string, owner?: string) {
  if ("flat" in skill && skill.flat) {
    if (readSmallFile(skill.bundle, 256 * 1024) === undefined)
      throw new SkillConflict("Skill file changed during import");
    fs.mkdirSync(target, { mode: 0o700 });
    fs.copyFileSync(skill.bundle, path.join(target, "SKILL.md"), fs.constants.COPYFILE_EXCL);
  } else {
    treeDigest(skill.bundle);
    fs.cpSync(skill.bundle, target, {
      recursive: true,
      force: false,
      errorOnExist: true,
      filter(file) {
        if (file === path.join(skill.bundle, ownerFile)) return false;
        const stat = fs.lstatSync(file);
        if (!stat.isDirectory() && !stat.isFile())
          throw new SkillConflict("Skill bundles with linked files are read-only");
        return true;
      },
    });
  }
  const manifest = path.join(target, "SKILL.md");
  const data = describe(manifest, skill.name);
  if (!data) throw new SkillConflict("Skill metadata is invalid");
  if (typeof data.metadata?.name !== "string" || !data.description) {
    const content = fs.readFileSync(manifest, "utf8");
    const header = frontmatter.exec(content);
    // Normalize only the staged copy so flat Kimi skills can load in other clients.
    const metadata = stringifyYaml({
      ...data.metadata,
      name: skill.name,
      description: data.description || skill.name,
    });
    fs.writeFileSync(manifest, `---\n${metadata}---\n${content.slice(header?.[0].length ?? 0)}`);
  }
  const fingerprint = treeDigest(target);
  if (owner)
    fs.writeFileSync(path.join(target, ownerFile), owner + ":" + fingerprint, { flag: "wx" });
}

type SkillWrite = {
  dest: string;
  staged?: string;
  fingerprint?: string;
  expected?: string;
  backup?: string;
  owner?: string;
  exists: boolean;
  replaced?: boolean;
  saved?: boolean;
};

function checkTarget(target: string) {
  const writeGuard = ensureCliConfigWriteAllowed(target);
  if (writeGuard) throw new SkillConflict(writeGuard);
}

function stage(root: string, staging: string[]) {
  assertDirectoryChain(root);
  fs.mkdirSync(root, { recursive: true, mode: 0o700 });
  const outside = history(root);
  assertDirectoryChain(outside);
  fs.mkdirSync(outside, { recursive: true, mode: 0o700 });
  const dir = fs.mkdtempSync(path.join(outside, "staging-"));
  staging.push(dir);
  return dir;
}

function prepareWrite(dest: string, exists: boolean, next?: string, owner?: string): SkillWrite {
  const outside = history(path.dirname(dest));
  assertDirectoryChain(outside);
  fs.mkdirSync(outside, { recursive: true, mode: 0o700 });
  const backup = exists ? path.join(outside, path.basename(dest) + "-" + randomUUID()) : undefined;
  const fingerprint = next ? treeDigest(next) : undefined;
  return { dest, staged: next, fingerprint, backup, owner, exists };
}

function adopt(skill: Skill, native: ReturnType<typeof roots>, local: Skill[]) {
  const parsed = clientInstructionsId.safeParse(skill.source);
  if (!parsed.success) return;
  const source = parsed.data;
  if (
    local.some(
      (entry) =>
        entry.id !== skill.id &&
        sameName(skill, entry) &&
        (entry.source === source || (entry.source === "shared" && sourcesSharedBy.has(source)))
    ) ||
    clients.some((other) => other !== source && path.relative(native[other], native[source]) === "")
  )
    return;
  return {
    relative: path.relative(native[source], skill.bundle),
    fingerprint: treeDigest(skill.bundle),
  };
}

function prepareLibraryWrite(
  library: string,
  origin: Skill,
  stored: Managed | undefined,
  native: ReturnType<typeof roots>,
  local: Skill[],
  staging: string[]
) {
  if (stored && stored.name !== origin.name)
    throw new SkillConflict("The source skill was renamed");
  const dir = stage(library, staging);
  assertDirectoryChain(path.dirname(origin.bundle));
  let adopted = stored ? stored.adopted : adopt(origin, native, local);
  if (stored?.adopted) {
    const source = clientInstructionsId.parse(stored.source);
    const current = adoptionPath(stored, source, native[source]);
    if (
      current?.dest !== origin.bundle ||
      !assignment(stored, true, source, local, native).canDisable
    )
      throw new SkillConflict("The adopted source has an unresolved conflict");
    adopted = { relative: stored.adopted.relative, fingerprint: treeDigest(origin.bundle) };
  }
  stageBundle(origin, path.join(dir, "bundle"));
  if (adopted && treeDigest(origin.bundle) !== adopted.fingerprint)
    throw new SkillConflict("The adopted skill changed while it was copied");
  fs.writeFileSync(
    path.join(dir, "origin.json"),
    JSON.stringify({ id: origin.id, source: origin.source, name: origin.name, adopted }),
    { flag: "wx", mode: 0o600 }
  );
  return prepareWrite(path.join(library, origin.id), !!stored, dir);
}

function prepareAdoptedWrite(
  action: Exclude<ClientSkillAction, "update">,
  adoption: ReturnType<typeof adoptionPath>,
  expected: string,
  state: Assignment
): SkillWrite | undefined {
  if (!adoption) throw new SkillConflict("The adopted skill directory has changed");
  const { dest, backup } = adoption;
  assertDirectoryChain(path.dirname(dest));
  assertDirectoryChain(path.dirname(backup));
  const saved = fs.lstatSync(backup, { throwIfNoEntry: false });
  if (action === "uninstall" && !saved) return;
  checkTarget(dest);
  checkTarget(backup);
  if (action === "disable" && state.canDisable) {
    fs.mkdirSync(path.dirname(backup), { recursive: true, mode: 0o700 });
    return { dest, backup, expected, exists: true };
  }
  if (action !== "disable" && state.canEnable) {
    if (!fs.lstatSync(path.dirname(dest), { throwIfNoEntry: false })?.isDirectory())
      throw new SkillConflict("The original skill directory is unavailable");
    if (treeDigest(backup) !== expected)
      throw new SkillConflict("The retained original skill has changed");
    return { dest, staged: backup, fingerprint: expected, exists: false };
  }
  if (action === "enable" && state.canDisable && treeDigest(dest) === expected) return;
  throw new SkillConflict(state.reason ?? "The adopted skill has changed");
}

function prepareClientCopy(
  root: string,
  dest: string,
  skill: Skill | Managed,
  id: string,
  owned: boolean,
  staging: string[]
) {
  checkTarget(dest);
  checkTarget(history(root));
  const dir = stage(root, staging);
  const bundle = path.join(dir, "bundle");
  stageBundle(skill, bundle, id);
  return prepareWrite(dest, owned, bundle, owned ? id : undefined);
}

function prepareClientWrite(
  action: ClientSkillAction,
  root: string,
  stored: Managed,
  state: Assignment,
  origin: Skill | undefined,
  staging: string[]
): SkillWrite | undefined {
  const { id, name } = stored;
  const dest = path.join(root, name);
  const owned = fs.lstatSync(dest, { throwIfNoEntry: false })?.isDirectory() && isOwned(dest, id);
  if (action === "enable" && !owned && !state.canEnable)
    throw new SkillConflict(state.reason ?? "Cannot sync this client");
  if (action === "disable" && !state.canDisable)
    throw new SkillConflict(state.reason ?? "No owned client copy to disable");
  if (!owned) {
    if (action === "enable") return prepareClientCopy(root, dest, stored, id, false, staging);
    return;
  }

  assertDirectoryChain(dest);
  verifyOwned(dest, id);
  if (action === "update") return prepareClientCopy(root, dest, origin!, id, true, staging);
  if (action === "disable" || action === "uninstall") {
    checkTarget(dest);
    checkTarget(history(root));
    return prepareWrite(dest, true, undefined, id);
  }
}

function applySkillWrites(changes: SkillWrite[]) {
  for (const change of changes) {
    if (!!fs.lstatSync(change.dest, { throwIfNoEntry: false }) !== change.exists)
      throw new SkillConflict("Skill files changed. Refresh first");
    if (change.owner) verifyOwned(change.dest, change.owner);
    if (change.expected && treeDigest(change.dest) !== change.expected)
      throw new SkillConflict("The adopted skill has changed outside OmniRoute");
    if (change.backup && fs.lstatSync(change.backup, { throwIfNoEntry: false }))
      throw new SkillConflict("The skill backup already exists");
    if (change.backup) {
      fs.renameSync(change.dest, change.backup);
      change.saved = true;
    }
    if (change.staged) {
      fs.renameSync(change.staged, change.dest);
      change.replaced = true;
    }
  }
}

function verifySkillWrites(changes: SkillWrite[]) {
  for (const change of changes) {
    if (fs.existsSync(change.dest) !== !!change.staged) throw new Error("Skill readback failed");
    if (change.fingerprint && treeDigest(change.dest) !== change.fingerprint)
      throw new Error("Skill contents changed during readback");
    if (change.expected && change.backup && treeDigest(change.backup) !== change.expected)
      throw new Error("The retained original did not match the expected contents");
  }
}

function undoSkillWrites(changes: SkillWrite[]) {
  for (const change of changes.reverse()) {
    if (change.replaced && change.staged) fs.renameSync(change.dest, change.staged);
    if (change.saved && change.backup) fs.renameSync(change.backup, change.dest);
  }
}

function applyOne(
  action: SkillAction,
  id: string,
  client: Client | undefined,
  native: ReturnType<typeof roots>,
  local: Skill[],
  stored: Managed | undefined
) {
  const library = libraryRoot();
  const origin = local.find(
    (skill) =>
      skill.id === id && (skill.flat || !readSmallFile(path.join(skill.bundle, ownerFile), 160))
  );
  const changes: SkillWrite[] = [];
  const staging: string[] = [];
  try {
    if (action === "import" && stored) return;
    const copiesOrigin = action === "import" || action === "update";
    if (copiesOrigin && !origin) throw new SkillConflict("The source skill is unavailable");
    if (action !== "import" && !stored) throw new SkillConflict("Import the skill first");
    if (copiesOrigin && origin)
      changes.push(prepareLibraryWrite(library, origin, stored, native, local, staging));

    if (stored && action !== "import") {
      changes.push(...prepareClientWrites(action, client, stored, native, local, origin, staging));
      if (action === "uninstall") changes.push(prepareWrite(path.join(library, id), true));
    }
    applySkillWrites(changes);
    verifySkillWrites(changes);
  } catch (error) {
    undoSkillWrites(changes);
    throw error;
  } finally {
    for (const temp of staging) fs.rmSync(temp, { recursive: true, force: true });
  }
}

function prepareClientWrites(
  action: ClientSkillAction,
  client: Client | undefined,
  stored: Managed,
  native: ReturnType<typeof roots>,
  local: Skill[],
  origin: Skill | undefined,
  staging: string[]
) {
  const targets = action === "enable" || action === "disable" ? [client!] : clients;
  const changes: SkillWrite[] = [];
  for (const selected of targets) {
    const state = assignment(stored, true, selected, local, native);
    const root = native[selected];
    let change: SkillWrite | undefined;
    if (stored.adopted && stored.source === selected) {
      if (action === "update") continue;
      change = prepareAdoptedWrite(
        action,
        adoptionPath(stored, selected, root),
        stored.adopted.fingerprint,
        state
      );
    } else {
      change = prepareClientWrite(action, root, stored, state, origin, staging);
    }
    if (change) changes.push(change);
  }
  return changes;
}

export function changeClientSkillLibrary(input: z.infer<typeof clientSkillLibraryChange>) {
  const { action, ids, client } = clientSkillLibraryChange.parse(input);
  const native = roots();
  const local = discover(native);
  const stored = new Map(readLibrary().map((skill) => [skill.id, skill]));
  const results = [...new Set(ids)].map((id) => {
    try {
      applyOne(action, id, client, native, local, stored.get(id));
      return { id, ok: true };
    } catch (error) {
      return {
        id,
        ok: false,
        error:
          error instanceof SkillConflict ? error.message : "Skill change could not be verified",
      };
    }
  });
  return { ...getClientSkillLibrary(), results };
}
