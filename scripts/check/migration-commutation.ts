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
//     --base-dir <dir> --head-dir <dir> [--must-not-apply <file.sql>]... [--json]
// --must-not-apply (repeatable) names a file of --head-dir, by file name, that the second boot
// of the upgraded path must NOT apply: the gate passes the target of each rename covered by
// RENAMED_MIGRATION_COMPATIBILITY, whose ledger row the runner has to move instead of running
// the file again. The boot child reports the files it applied (every ledger INSERT); a listed
// file among them is a difference of kind "reapplied" (contract phrase REAPPLIED_PHRASE).
// Exit 0 = same schema and no listed file applied again; 1 = schemas differ (readable diff), a
// listed file was applied again, or a PR migration fails to apply on one path or both (the boot
// child exits with MIGRATION_FAILED_EXIT_CODE); 2 = infrastructure error (missing directory, a
// --must-not-apply file that is not in --head-dir, a child that cannot start, times out or
// crashes, or a BASE migration that fails on the base alone: the base does not install, the PR
// is not the cause).
// --json prints { "equal": bool, "differences": [...] } on stdout (exit 2 prints { "error" }).
//
// Never uses the caller's DATA_DIR or ~/.omniroute: every boot gets a temporary DATA_DIR and
// HOME under one temporary root that is removed at the end.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  MIGRATION_FAILED_EXIT_CODE,
  type BootFailureResult,
  type BootResult,
  type ColumnShape,
  type IndexShape,
  type MigrationFailure,
  type NormalizedSchema,
  type SqlObjectShape,
  type TableDefinition,
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
  kind:
    | "table"
    | "column"
    | "constraint"
    | "definition"
    | "index"
    | "trigger"
    | "view"
    | "migration"
    | "reapplied";
  name: string;
  table?: string;
  /** Set when the object exists on one path only. */
  onlyIn?: PathName;
  /** kind "migration": the path on which the migration `name` failed to apply. */
  failedIn?: PathName;
  /**
   * kind "reapplied": set when the second upgraded boot did not finish because `name` failed
   * while running again (it was attempted, not applied).
   */
  attempted?: boolean;
  upgraded?: unknown;
  fresh?: unknown;
  message: string;
  /** Extra explanation printed under the message (set once per table on definition-only diffs). */
  note?: string;
};

export class InfrastructureError extends Error {}

/** A boot whose migration failed to apply (the child exited with MIGRATION_FAILED_EXIT_CODE). */
export class MigrationBootError extends Error {
  constructor(
    readonly label: string,
    readonly failure: MigrationFailure,
    /** Files applied before the failure; null when the child could not read them back. */
    readonly appliedMigrations: string[] | null = null
  ) {
    super(`boot ${label}: a migration ${failure.file} falhou ao ser aplicada: ${failure.message}`);
  }
}

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

function diffDefinitions(
  table: string,
  upgraded: TableDefinition | null | undefined,
  fresh: TableDefinition | null | undefined
): Difference[] {
  if (sameJson(upgraded ?? null, fresh ?? null)) return [];
  const differences: Difference[] = [];
  const upgradedItems = upgraded?.items ?? [];
  const freshItems = fresh?.items ?? [];
  for (const [onlyIn, items, others] of [
    ["upgraded", upgradedItems, freshItems],
    ["fresh", freshItems, upgradedItems],
  ] as const) {
    for (const item of items) {
      if (others.includes(item)) continue;
      differences.push({
        kind: "definition",
        name: item,
        table,
        onlyIn,
        [onlyIn]: item,
        message: `tabela ${table}: definição "${item}" só existe no ${PATH_LABEL[onlyIn]}`,
      });
    }
  }
  const upgradedOptions = upgraded?.options ?? "";
  const freshOptions = fresh?.options ?? "";
  if (upgradedOptions !== freshOptions || differences.length === 0) {
    // Different options, or the same items with a different multiplicity: still a divergence.
    differences.push({
      kind: "definition",
      name: "options",
      table,
      upgraded: upgraded ?? null,
      fresh: fresh ?? null,
      message:
        upgradedOptions !== freshOptions
          ? `tabela ${table}: definição difere nas opções — atualizado: "${upgradedOptions}"; ` +
            `novo: "${freshOptions}"`
          : `tabela ${table}: definição difere — atualizado: ${JSON.stringify(upgraded)}; ` +
            `novo: ${JSON.stringify(fresh)}`,
    });
  }
  // diffDefinitions only runs once the columns and constraints of the table agree. The
  // difference is kept on purpose (the text carries what no pragma shows), but say so, or a
  // reader looks for a missing column that is not there.
  differences[differences.length - 1].note = definitionOnlyNote(table);
  return differences;
}

export function definitionOnlyNote(table: string): string {
  return (
    `tabela ${table}: colunas e constraints iguais; a diferença está no texto da definição ` +
    "(CHECK, COLLATE, coluna gerada, AUTOINCREMENT, opções da tabela) ou só na forma de " +
    "escrever a mesma tabela (ex.: FOREIGN KEY de coluna × de tabela)"
  );
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
    const tableDifferencesBefore = differences.length;
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
    // The CREATE TABLE text covers what no pragma shows (CHECK, COLLATE, generated columns,
    // AUTOINCREMENT, WITHOUT ROWID, ...). Shown only when the columns and constraints of the
    // table already agree, so one divergence is not reported twice.
    if (differences.length === tableDifferencesBefore) {
      differences.push(
        ...diffDefinitions(table, upgraded.definitions?.[table], fresh.definitions?.[table])
      );
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

type CliOptions = { baseDir: string; headDir: string; json: boolean; mustNotApply: string[] };

const USAGE =
  "uso: migration-commutation.ts --base-dir <dir> --head-dir <dir> " +
  "[--must-not-apply <arquivo.sql>]... [--json]";

/**
 * A bare migration file name the runner loads: no directory part, `<digits>_<name>.sql` (the
 * pattern of getMigrationFiles in src/lib/db/migrationRunner.ts). A file the runner skips could
 * never be applied, so listing it would pass blind.
 */
const SQL_FILE_NAME = /^\d+_[^/\\]+\.sql$/;

export function parseArgs(argv: readonly string[]): CliOptions {
  let baseDir: string | undefined;
  let headDir: string | undefined;
  let json = false;
  const mustNotApply: string[] = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [flag, inlineValue] = arg.includes("=") ? arg.split(/=(.*)/s, 2) : [arg, undefined];
    if (flag === "--json" && inlineValue === undefined) {
      json = true;
    } else if (flag === "--must-not-apply") {
      const value = inlineValue ?? argv[++index];
      if (!value || !SQL_FILE_NAME.test(value)) {
        throw new InfrastructureError(
          `--must-not-apply exige o nome de um arquivo .sql de migration de --head-dir ` +
            `(<dígitos>_<descrição>.sql, o formato que o runner carrega), sem diretório ` +
            `(recebido: ${value ?? "nada"})`
        );
      }
      if (!mustNotApply.includes(value)) mustNotApply.push(value);
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
    throw new InfrastructureError(USAGE);
  }
  return {
    baseDir: path.resolve(baseDir),
    headDir: path.resolve(headDir),
    json,
    mustNotApply,
  };
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
): Promise<BootResult> {
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
      if (code === MIGRATION_FAILED_EXIT_CODE) {
        let written: Partial<BootFailureResult> | undefined;
        try {
          written = JSON.parse(fs.readFileSync(outputFile, "utf8")) as Partial<BootFailureResult>;
        } catch {
          written = undefined;
        }
        const failure = written?.migrationFailure;
        if (failure && typeof failure.file === "string" && typeof failure.message === "string") {
          const applied = written?.appliedMigrations;
          reject(
            new MigrationBootError(
              label,
              failure,
              Array.isArray(applied) && applied.every((file) => typeof file === "string")
                ? applied
                : null
            )
          );
          return;
        }
      }
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
      let written: Partial<BootResult>;
      try {
        written = JSON.parse(fs.readFileSync(outputFile, "utf8")) as Partial<BootResult>;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        reject(new InfrastructureError(`boot ${label}: schema ilegível (${message})`));
        return;
      }
      const applied = written.appliedMigrations;
      if (
        !written.schema ||
        typeof written.schema !== "object" ||
        !Array.isArray(applied) ||
        !applied.every((file) => typeof file === "string")
      ) {
        reject(
          new InfrastructureError(
            `boot ${label}: saída sem schema ou sem a lista de migrations aplicadas`
          )
        );
        return;
      }
      resolve({ schema: written.schema, appliedMigrations: applied });
    });
  });
}

export type CommutationResult = { equal: boolean; differences: Difference[] };

/** True when every difference is a migration that failed on BOTH paths (broken SQL). */
export function allFailOnBothPaths(differences: readonly Difference[]): boolean {
  return (
    differences.length > 0 &&
    differences.every(
      (difference) =>
        difference.kind === "migration" &&
        differences.some(
          (other) =>
            other.kind === "migration" &&
            other.name === difference.name &&
            other.failedIn !== difference.failedIn
        )
    )
  );
}

/** True when at least one PR migration failed on the upgraded path (contract C1). */
export function failsOnUpgradedPath(differences: readonly Difference[]): boolean {
  return differences.some(
    (difference) => difference.kind === "migration" && difference.failedIn === "upgraded"
  );
}

/**
 * The exact phrase of contract C2 with scripts/check/check-migration-numbering.mjs, printed
 * with the file name for every --must-not-apply file the upgraded database applied again.
 */
export const REAPPLIED_PHRASE = "aplicada de novo no banco atualizado";

function reappliedDifference(file: string, attempted: boolean): Difference {
  return {
    kind: "reapplied",
    name: file,
    ...(attempted ? { attempted: true } : {}),
    message:
      `migration ${file} ${REAPPLIED_PHRASE}: o segundo boot do caminho atualizado ` +
      (attempted ? "tentou aplicá-la outra vez (e ela falhou)" : "aplicou-a outra vez") +
      ", quando devia só mover a linha dela no _omniroute_migrations",
  };
}

/**
 * The --must-not-apply files that the second upgraded boot applied (or attempted: the file
 * whose failure stopped the boot). When that boot failed and the child could not read back what
 * it applied before the failure, the verdict stays open.
 */
function findReapplied(
  mustNotApply: readonly string[],
  headBoot: PromiseSettledResult<BootResult> | null
): Difference[] {
  if (mustNotApply.length === 0 || headBoot === null) return [];
  if (headBoot.status === "fulfilled") {
    return mustNotApply
      .filter((file) => headBoot.value.appliedMigrations.includes(file))
      .map((file) => reappliedDifference(file, false));
  }
  const reason: unknown = headBoot.reason;
  if (!(reason instanceof MigrationBootError)) return [];
  if (reason.appliedMigrations === null) {
    throw new InfrastructureError(
      `boot ${reason.label}: não foi possível ler quais migrations ele aplicou antes de ` +
        `${reason.failure.file} falhar, e há --must-not-apply a conferir`
    );
  }
  const applied = reason.appliedMigrations;
  return mustNotApply
    .filter((file) => applied.includes(file) || file === reason.failure.file)
    .map((file) => reappliedDifference(file, !applied.includes(file)));
}

export async function checkCommutation(
  baseDir: string,
  headDir: string,
  options: { mustNotApply?: readonly string[] } = {}
): Promise<CommutationResult> {
  assertDirectory("--base-dir", baseDir);
  assertDirectory("--head-dir", headDir);
  const mustNotApply = [...(options.mustNotApply ?? [])];
  for (const file of mustNotApply) {
    if (!SQL_FILE_NAME.test(file)) {
      throw new InfrastructureError(
        `--must-not-apply exige o nome de um arquivo .sql de --head-dir, sem diretório ` +
          `(recebido: ${file})`
      );
    }
    if (!fs.existsSync(path.join(headDir, file))) {
      // A name the head does not have could never be applied: the check would pass blind.
      throw new InfrastructureError(`--must-not-apply: ${file} não existe em --head-dir`);
    }
  }

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
    let baseBootFailure: unknown = undefined;
    let upgradedHeadBoot: PromiseSettledResult<BootResult> | null = null;
    const upgradedPath = (async () => {
      try {
        await bootOnce(
          "atualizado 1/2 (base)",
          dirs.upgradedData,
          dirs.upgradedHome,
          baseDir,
          path.join(root, "upgraded-base.json")
        );
      } catch (error) {
        baseBootFailure = error;
        throw error;
      }
      try {
        const result = await bootOnce(
          "atualizado 2/2 (head sobre o banco da base)",
          dirs.upgradedData,
          dirs.upgradedHome,
          headDir,
          path.join(root, "upgraded-head.json")
        );
        upgradedHeadBoot = { status: "fulfilled", value: result };
        return result;
      } catch (error) {
        upgradedHeadBoot = { status: "rejected", reason: error };
        throw error;
      }
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
    // A failed base boot means the base does not install on its own: not the PR's doing.
    if (upgradedResult.status === "rejected" && upgradedResult.reason === baseBootFailure) {
      const reason: unknown = upgradedResult.reason;
      if (reason instanceof MigrationBootError) {
        throw new InfrastructureError(
          `boot ${reason.label}: a base não instala sozinha — a migration ` +
            `${reason.failure.file} falhou ao ser aplicada: ${reason.failure.message}`
        );
      }
      throw reason;
    }
    const failures: Difference[] = [];
    for (const [pathName, result] of [
      ["upgraded", upgradedResult],
      ["fresh", freshResult],
    ] as const) {
      if (result.status === "fulfilled") continue;
      // Anything but a migration that failed to apply keeps the verdict open (exit 2).
      if (!(result.reason instanceof MigrationBootError)) throw result.reason;
      const { failure } = result.reason;
      failures.push({
        kind: "migration",
        name: failure.file,
        failedIn: pathName,
        message:
          `migration ${failure.file} falhou ao ser aplicada no ${PATH_LABEL[pathName]}: ` +
          failure.message,
      });
    }
    const reapplied = findReapplied(mustNotApply, upgradedHeadBoot);
    if (upgradedResult.status === "rejected" || freshResult.status === "rejected") {
      return { equal: false, differences: [...failures, ...reapplied] };
    }
    const differences = [
      ...diffSchemas(upgradedResult.value.schema, freshResult.value.schema),
      ...reapplied,
    ];
    return { equal: differences.length === 0, differences };
  } finally {
    process.removeListener("SIGINT", onSignal);
    process.removeListener("SIGTERM", onSignal);
    removeRoot();
  }
}

/**
 * Printed when EVERY difference is a PR migration that fails on both paths. The exact phrase
 * "não aplica em nenhum dos dois caminhos" is a contract with scripts/check/
 * check-migration-numbering.mjs, which looks for it in the output; keep it on one line.
 */
export const BROKEN_ON_BOTH_PATHS_PHRASE = "não aplica em nenhum dos dois caminhos";

/**
 * Contract C1 with scripts/check/check-migration-numbering.mjs: printed whenever at least one
 * PR migration failed on the upgraded path (whether or not it also failed on the fresh one).
 * Keep it on one line.
 */
export const NOT_APPLIED_AFTER_BASE_PHRASE = "não aplica depois de todas as migrations da base";

/** The three cases the gate runs this check for; the gate names the actual one below. */
const CASE_BULLETS =
  "    · migration nova fora de ordem → dê a ela um carimbo novo com\n" +
  "      `npm run db:new-migration -- <descrição>` (depois de todas as da base) e apague o\n" +
  "      arquivo antigo do PR;\n" +
  "    · migration já mesclada e editada → devolva o conteúdo da base e faça a mudança numa\n" +
  "      migration nova (bancos atualizados não reaplicam o que já está no ledger);\n" +
  "    · migration renomeada → desfaça a renomeação (volte ao nome antigo) ou escolha outro\n" +
  "      carimbo novo em que ela comute; nunca o mesmo carimbo com outro nome.";

/**
 * Neutral on purpose: the gate runs this check for out-of-order migrations, for merged
 * migrations that were edited and for renames covered by the compatibility map, and prints the
 * hint of the actual case right below. It never says "regere o nome": the gate's tests assert
 * that a rename or an edit is not told to regenerate the name. Printed only when both paths
 * produced a schema and they differ.
 */
const HOW_TO_FIX =
  "  → aplicadas depois da base (banco já instalado), as migrations comparadas dão um schema\n" +
  "    diferente do de uma instalação nova, que aplica tudo na ordem dos nomes. A correção\n" +
  "    depende do caso (pelo gate, o caso vem indicado logo abaixo):\n" +
  CASE_BULLETS;

/**
 * A PR migration failed on the upgraded path. That path already applies the PR's migrations
 * after the WHOLE base, so a new stamp alone does not help (a fresh install would then do the
 * same and fail too) — unless the migration depends on another migration of the same PR with
 * a larger stamp, which a new stamp puts first.
 */
const HOW_TO_FIX_FAILED_UPGRADED =
  `  → a migration do PR ${NOT_APPLIED_AFTER_BASE_PHRASE}, que é a ordem\n` +
  "    de um banco já instalado (um carimbo novo sozinho não muda isso):\n" +
  "    corrija o SQL contra o schema atual da base;\n" +
  "    se ela depende de outra migration do PR com carimbo maior, dê a ela um carimbo novo com\n" +
  "    `npm run db:new-migration -- <descrição>`.";

const BROKEN_ON_BOTH_PATHS_LINE = `  → a migration do PR ${BROKEN_ON_BOTH_PATHS_PHRASE} (banco atualizado e instalação nova).`;

/**
 * Failures on the fresh path only: the name order changes the outcome. Either the failing
 * migration needs something that comes after it, or it collides with something an earlier
 * stamp already created (the failing file can then be a base one, not the PR's).
 */
const HOW_TO_FIX_FAILED_FRESH_ONLY =
  "  → tudo aplica no banco atualizado, mas uma instalação nova, que aplica tudo na ordem dos\n" +
  "    nomes, falha: a ordem muda o resultado (a migration que falhou depende de algo que vem\n" +
  "    depois dela, ou colide com algo que uma migration de carimbo menor já criou). A correção\n" +
  "    depende do caso (pelo gate, o caso vem indicado logo abaixo):\n" +
  CASE_BULLETS;

const HOW_TO_FIX_REAPPLIED =
  "  → bancos que já aplicaram essa migration com o nome antigo vão rodá-la outra vez. O runner\n" +
  "    só move a linha do ledger quando reconhece a renomeação por uma entrada de\n" +
  "    RENAMED_MIGRATION_COMPATIBILITY com carimbo diferente do antigo (no mesmo carimbo ele\n" +
  "    apaga a linha antiga e reaplica o arquivo). Mantenha o nome antigo ou corrija a entrada.";

/** The hints for a non-empty list of differences, most specific first. */
export function howToFix(differences: readonly Difference[]): string[] {
  const hints: string[] = [];
  if (differences.some((difference) => difference.kind === "reapplied")) {
    hints.push(HOW_TO_FIX_REAPPLIED);
  }
  const failures = differences.filter((difference) => difference.kind === "migration");
  if (failsOnUpgradedPath(failures)) {
    if (allFailOnBothPaths(failures)) hints.push(BROKEN_ON_BOTH_PATHS_LINE);
    hints.push(HOW_TO_FIX_FAILED_UPGRADED);
  } else if (failures.length > 0) {
    hints.push(HOW_TO_FIX_FAILED_FRESH_ONLY);
  }
  if (
    differences.some(
      (difference) => difference.kind !== "migration" && difference.kind !== "reapplied"
    )
  ) {
    hints.push(HOW_TO_FIX);
  }
  return hints;
}

async function main(): Promise<number> {
  let options: CliOptions | null = null;
  try {
    options = parseArgs(process.argv.slice(2));
    const result = await checkCommutation(options.baseDir, options.headDir, {
      mustNotApply: options.mustNotApply,
    });
    if (options.json) {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } else if (result.equal) {
      console.log(
        `${TAG} OK: o schema do banco atualizado (base, depois o PR) é igual ao de uma ` +
          "instalação nova (tudo em ordem)." +
          (options.mustNotApply.length > 0
            ? ` Nenhuma destas foi aplicada de novo: ${options.mustNotApply.join(", ")}.`
            : "")
      );
    } else {
      console.error(
        `${TAG} ✗ ${result.differences.length} diferença(s) entre o banco atualizado e o novo:`
      );
      for (const difference of result.differences) {
        console.error(`  - ${difference.message}`);
        if (difference.note) console.error(`    ℹ ${difference.note}`);
      }
      for (const hint of howToFix(result.differences)) console.error(hint);
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
