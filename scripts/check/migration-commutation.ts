#!/usr/bin/env node
// scripts/check/migration-commutation.ts
//
// Do the pull request's migrations commute with the base?
//
// Timestamped migrations (`YYYYMMDDHHMMSS_description.sql`) are applied in file order on a
// fresh database, but an existing database applies whatever is pending in the order it
// arrives. A migration dated BEFORE the newest one on the base therefore runs in a different
// position on the two paths. That is harmless when the migrations touch unrelated objects,
// and wrong when they do not (a table rebuild that copies a fixed column list, merged first,
// silently drops a column that an older-dated ADD COLUMN added on upgraded databases).
//
// Instead of forbidding older stamps, this check builds both databases with the REAL install
// path (src/lib/db/core.ts → getDbInstance()) and compares their normalized schemas:
//   - "atualizado" (upgraded): one temporary DATA_DIR, booted with --base-dir, then booted
//     again on the SAME file with --head-dir (an existing database: the mass-migration guard
//     and the pre-migration snapshot run as in production);
//   - "novo" (fresh): another temporary DATA_DIR, booted once with --head-dir.
// Each boot is its own child process (scripts/check/lib/migrationSchemaBoot.ts) because the
// migration runner resolves its directory when its module loads.
//
// Usage (cwd = repository root):
//   node --import tsx/esm scripts/check/migration-commutation.ts \
//     --base-dir <dir> --head-dir <dir> [--json]
// Exit 0 = same schema; 1 = schemas differ (readable diff); 2 = infrastructure error.
// --json prints { "equal": bool, "differences": [...] } on stdout (exit 2 prints { "error" }).
//
// Never uses the caller's DATA_DIR or ~/.omniroute: every boot gets a temporary DATA_DIR and
// HOME under one temporary root that is removed at the end.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type {
  ColumnShape,
  IndexShape,
  NormalizedSchema,
  SqlObjectShape,
} from "./lib/migrationSchemaBoot.ts";

const TAG = "[migration-commutation]";
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const BOOT_SCRIPT = path.join(SCRIPT_DIR, "lib", "migrationSchemaBoot.ts");
/** A full boot of the real migration set takes ~20 s locally; leave room for a slow runner. */
const BOOT_TIMEOUT_MS = 10 * 60 * 1000;
/** Lines of child output kept for the error message of a failed boot. */
const OUTPUT_TAIL_LINES = 40;

export type PathName = "upgraded" | "fresh";

export type Difference = {
  kind: "table" | "column" | "constraint" | "index" | "trigger" | "view";
  name: string;
  table?: string;
  /** Set when the object exists on one path only. */
  onlyIn?: PathName;
  upgraded?: unknown;
  fresh?: unknown;
  message: string;
};

export class InfrastructureError extends Error {}

const PATH_LABEL: Record<PathName, string> = {
  upgraded: "caminho atualizado (base, depois o PR)",
  fresh: "caminho novo (tudo em ordem)",
};

function describeColumn(column: ColumnShape): string {
  const parts = [column.type || "sem tipo"];
  if (column.notnull) parts.push("NOT NULL");
  if (column.dflt_value !== null) parts.push(`DEFAULT ${column.dflt_value}`);
  if (column.pk) parts.push(`pk=${column.pk}`);
  return parts.join(" ");
}

function describeIndex(index: IndexShape): string {
  const unique = index.unique ? "UNIQUE " : "";
  return `${unique}${index.table}(${index.columns.join(", ")})${index.sql ? ` — ${index.sql}` : ""}`;
}

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function sortedUnion(left: Record<string, unknown>, right: Record<string, unknown>): string[] {
  return [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
}

/** Every difference between the two normalized schemas, in a stable order. */
export function diffSchemas(upgraded: NormalizedSchema, fresh: NormalizedSchema): Difference[] {
  const differences: Difference[] = [];

  for (const table of sortedUnion(upgraded.tables, fresh.tables)) {
    const upgradedColumns = upgraded.tables[table];
    const freshColumns = fresh.tables[table];
    if (!upgradedColumns || !freshColumns) {
      const onlyIn: PathName = upgradedColumns ? "upgraded" : "fresh";
      differences.push({
        kind: "table",
        name: table,
        onlyIn,
        message: `tabela ${table} só existe no ${PATH_LABEL[onlyIn]}`,
      });
      continue;
    }
    const upgradedByName = Object.fromEntries(upgradedColumns.map((c) => [c.name, c]));
    const freshByName = Object.fromEntries(freshColumns.map((c) => [c.name, c]));
    for (const column of sortedUnion(upgradedByName, freshByName)) {
      const left = upgradedByName[column];
      const right = freshByName[column];
      if (!left || !right) {
        const onlyIn: PathName = left ? "upgraded" : "fresh";
        const shape = (left ?? right) as ColumnShape;
        differences.push({
          kind: "column",
          name: column,
          table,
          onlyIn,
          [onlyIn]: shape,
          message: `tabela ${table}: coluna ${column} (${describeColumn(shape)}) só existe no ${PATH_LABEL[onlyIn]}`,
        });
      } else if (!sameJson(left, right)) {
        differences.push({
          kind: "column",
          name: column,
          table,
          upgraded: left,
          fresh: right,
          message:
            `tabela ${table}: coluna ${column} difere — atualizado: ${describeColumn(left)}; ` +
            `novo: ${describeColumn(right)}`,
        });
      }
    }
    const upgradedConstraints = new Set(upgraded.constraints?.[table] ?? []);
    const freshConstraints = new Set(fresh.constraints?.[table] ?? []);
    for (const signature of [...new Set([...upgradedConstraints, ...freshConstraints])].sort()) {
      if (upgradedConstraints.has(signature) && freshConstraints.has(signature)) continue;
      const onlyIn: PathName = upgradedConstraints.has(signature) ? "upgraded" : "fresh";
      differences.push({
        kind: "constraint",
        name: signature,
        table,
        onlyIn,
        [onlyIn]: signature,
        message: `tabela ${table}: restrição ${signature} só existe no ${PATH_LABEL[onlyIn]}`,
      });
    }
  }

  for (const name of sortedUnion(upgraded.indexes, fresh.indexes)) {
    const left = upgraded.indexes[name];
    const right = fresh.indexes[name];
    if (!left || !right) {
      const onlyIn: PathName = left ? "upgraded" : "fresh";
      const shape = (left ?? right) as IndexShape;
      differences.push({
        kind: "index",
        name,
        table: shape.table,
        onlyIn,
        [onlyIn]: shape,
        message: `índice ${name} (${describeIndex(shape)}) só existe no ${PATH_LABEL[onlyIn]}`,
      });
    } else if (!sameJson(left, right)) {
      differences.push({
        kind: "index",
        name,
        table: left.table,
        upgraded: left,
        fresh: right,
        message:
          `índice ${name} difere — atualizado: ${describeIndex(left)}; ` +
          `novo: ${describeIndex(right)}`,
      });
    }
  }

  for (const kind of ["trigger", "view"] as const) {
    const upgradedObjects: Record<string, SqlObjectShape> =
      kind === "trigger" ? upgraded.triggers : upgraded.views;
    const freshObjects: Record<string, SqlObjectShape> =
      kind === "trigger" ? fresh.triggers : fresh.views;
    const label = kind === "trigger" ? "gatilho" : "view";
    for (const name of sortedUnion(upgradedObjects, freshObjects)) {
      const left = upgradedObjects[name];
      const right = freshObjects[name];
      if (!left || !right) {
        const onlyIn: PathName = left ? "upgraded" : "fresh";
        const shape = (left ?? right) as SqlObjectShape;
        differences.push({
          kind,
          name,
          table: shape.table,
          onlyIn,
          [onlyIn]: shape,
          message: `${label} ${name} só existe no ${PATH_LABEL[onlyIn]}`,
        });
      } else if (!sameJson(left, right)) {
        differences.push({
          kind,
          name,
          table: left.table,
          upgraded: left,
          fresh: right,
          message: `${label} ${name} difere — atualizado: ${left.sql}; novo: ${right.sql}`,
        });
      }
    }
  }

  return differences;
}

type CliOptions = { baseDir: string; headDir: string; json: boolean };

export function parseArgs(argv: readonly string[]): CliOptions {
  let baseDir: string | undefined;
  let headDir: string | undefined;
  let json = false;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [flag, inlineValue] = arg.includes("=") ? arg.split(/=(.*)/s, 2) : [arg, undefined];
    if (flag === "--json" && inlineValue === undefined) {
      json = true;
    } else if (flag === "--base-dir" || flag === "--head-dir") {
      const value = inlineValue ?? argv[++index];
      if (!value || value.startsWith("--")) {
        throw new InfrastructureError(`${flag} exige um diretório`);
      }
      if (flag === "--base-dir") baseDir = value;
      else headDir = value;
    } else {
      throw new InfrastructureError(`argumento desconhecido: ${arg}`);
    }
  }
  if (!baseDir || !headDir) {
    throw new InfrastructureError(
      "uso: migration-commutation.ts --base-dir <dir> --head-dir <dir> [--json]"
    );
  }
  return { baseDir: path.resolve(baseDir), headDir: path.resolve(headDir), json };
}

function assertDirectory(label: string, dir: string): void {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(dir);
  } catch {
    throw new InfrastructureError(`${label} não existe: ${dir}`);
  }
  if (!stat.isDirectory()) throw new InfrastructureError(`${label} não é um diretório: ${dir}`);
}

/**
 * The child's environment is built from scratch: nothing from the caller's DATA_DIR, HOME,
 * NODE_OPTIONS, test-runner signals or OMNIROUTE_* settings leaks into the boot. No secret is
 * needed to boot the database layer.
 */
function bootEnv(dataDir: string, homeDir: string, migrationsDir: string): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {
    DATA_DIR: dataDir,
    HOME: homeDir,
    USERPROFILE: homeDir,
    OMNIROUTE_MIGRATIONS_DIR: migrationsDir,
    DISABLE_SQLITE_AUTO_BACKUP: "true",
    APP_LOG_TO_FILE: "false",
  };
  for (const key of ["PATH", "Path", "SystemRoot", "TMPDIR", "TEMP", "TMP", "LANG"]) {
    const value = process.env[key];
    if (value !== undefined) env[key] = value;
  }
  return env;
}

function tail(text: string): string {
  return text.trimEnd().split("\n").slice(-OUTPUT_TAIL_LINES).join("\n");
}

function bootOnce(
  label: string,
  dataDir: string,
  homeDir: string,
  migrationsDir: string,
  outputFile: string
): Promise<NormalizedSchema> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--import", "tsx/esm", BOOT_SCRIPT, outputFile], {
      cwd: REPO_ROOT,
      env: bootEnv(dataDir, homeDir, migrationsDir),
      stdio: ["ignore", "pipe", "pipe"],
      timeout: BOOT_TIMEOUT_MS,
    });
    let output = "";
    child.stdout.on("data", (chunk: Buffer) => (output += chunk.toString()));
    child.stderr.on("data", (chunk: Buffer) => (output += chunk.toString()));
    child.on("error", (error) =>
      reject(new InfrastructureError(`boot ${label}: não foi possível iniciar: ${error.message}`))
    );
    child.on("close", (code, signal) => {
      if (code !== 0) {
        const how = signal ? `sinal ${signal}` : `código ${code}`;
        reject(
          new InfrastructureError(
            `boot ${label} (OMNIROUTE_MIGRATIONS_DIR=${migrationsDir}) falhou com ${how}:\n` +
              tail(output)
          )
        );
        return;
      }
      try {
        resolve(JSON.parse(fs.readFileSync(outputFile, "utf8")) as NormalizedSchema);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        reject(new InfrastructureError(`boot ${label}: schema ilegível (${message})`));
      }
    });
  });
}

export type CommutationResult = { equal: boolean; differences: Difference[] };

export async function checkCommutation(
  baseDir: string,
  headDir: string
): Promise<CommutationResult> {
  assertDirectory("--base-dir", baseDir);
  assertDirectory("--head-dir", headDir);

  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-commutation-"));
  const removeRoot = () =>
    fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  const onSignal = (signal: NodeJS.Signals) => {
    removeRoot();
    process.exit(signal === "SIGINT" ? 130 : 143);
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);
  try {
    const dirs = {
      upgradedData: path.join(root, "upgraded", "data"),
      upgradedHome: path.join(root, "upgraded", "home"),
      freshData: path.join(root, "fresh", "data"),
      freshHome: path.join(root, "fresh", "home"),
    };
    for (const dir of Object.values(dirs)) fs.mkdirSync(dir, { recursive: true });

    // The two paths share nothing, so they run side by side.
    const upgradedPath = (async () => {
      await bootOnce(
        "atualizado 1/2 (base)",
        dirs.upgradedData,
        dirs.upgradedHome,
        baseDir,
        path.join(root, "upgraded-base.json")
      );
      return bootOnce(
        "atualizado 2/2 (head sobre o banco da base)",
        dirs.upgradedData,
        dirs.upgradedHome,
        headDir,
        path.join(root, "upgraded-head.json")
      );
    })();
    const freshPath = bootOnce(
      "novo (head)",
      dirs.freshData,
      dirs.freshHome,
      headDir,
      path.join(root, "fresh-head.json")
    );
    // allSettled, not all: the temporary root is removed in `finally`, so no child may still
    // be running (and recreating its DATA_DIR) when one path fails early.
    const [upgradedResult, freshResult] = await Promise.allSettled([upgradedPath, freshPath]);
    if (upgradedResult.status === "rejected") throw upgradedResult.reason;
    if (freshResult.status === "rejected") throw freshResult.reason;
    const upgraded = upgradedResult.value;
    const fresh = freshResult.value;
    const differences = diffSchemas(upgraded, fresh);
    return { equal: differences.length === 0, differences };
  } finally {
    process.removeListener("SIGINT", onSignal);
    process.removeListener("SIGTERM", onSignal);
    removeRoot();
  }
}

const HOW_TO_FIX =
  "  → as migrations do PR não comutam com as da base: aplicadas depois da base (banco já\n" +
  "    instalado) dão um schema diferente do de uma instalação nova, que as aplica na ordem do\n" +
  "    carimbo. Regere o nome da migration do PR com `npm run db:new-migration -- <descrição>`\n" +
  "    (carimbo novo, depois de todas as da base) e apague o arquivo antigo do PR. Nunca\n" +
  "    renomeie nem apague uma migration que já está na base.";

async function main(): Promise<number> {
  let options: CliOptions | null = null;
  try {
    options = parseArgs(process.argv.slice(2));
    const result = await checkCommutation(options.baseDir, options.headDir);
    if (options.json) {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } else if (result.equal) {
      console.log(
        `${TAG} OK: o schema do banco atualizado (base, depois o PR) é igual ao de uma ` +
          "instalação nova (tudo em ordem)."
      );
    } else {
      console.error(
        `${TAG} ✗ ${result.differences.length} diferença(s) entre o banco atualizado e o novo:`
      );
      for (const difference of result.differences) console.error(`  - ${difference.message}`);
      console.error(HOW_TO_FIX);
    }
    return result.equal ? 0 : 1;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (options?.json || process.argv.includes("--json")) {
      process.stdout.write(`${JSON.stringify({ error: message }, null, 2)}\n`);
    }
    console.error(`${TAG} erro de infraestrutura: ${message}`);
    return 2;
  }
}

const invokedDirectly =
  typeof process.argv[1] === "string" &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main().then(
    (code) => process.exit(code),
    (error: unknown) => {
      console.error(`${TAG} erro de infraestrutura: ${String(error)}`);
      process.exit(2);
    }
  );
}
