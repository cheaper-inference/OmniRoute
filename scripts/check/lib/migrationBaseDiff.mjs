// scripts/check/lib/migrationBaseDiff.mjs
// Comparação das migrations do HEAD com as da BASE (o branch que vai receber o merge).
// Usada por scripts/check/check-migration-numbering.mjs. JS puro: roda em node sem tsx.
//
// WHY: no formato por data o gate de numeração não enxerga mais buracos (o carimbo não é
// sequencial). Apagar ou renomear uma migration JÁ MESCLADA passaria em silêncio:
//   - apagada: instalação nova fica sem o schema, banco atualizado fica com ele (divergência);
//   - renomeada: todo banco que já a aplicou roda de novo (DML duplicada, CREATE sem
//     IF NOT EXISTS derruba o boot). Reprodução: revisão adversarial R3-1 de 2026-11-13.
// Por isso o gate compara o disco com a base e:
//   (a) arquivo da base que sumiu do disco (apagado OU renomeado) → FALHA;
//   (b) arquivo da base com conteúdo diferente → AVISO (correções legítimas acontecem);
//   (c) migration por data adicionada com carimbo ≤ maior carimbo da base → roda o
//       verificador de comutação (scripts/check/migration-commutation.ts), que monta o banco
//       "atualizado" (base, depois HEAD) e o "novo" (HEAD de uma vez) e compara o schema.
//
// Este arquivo tem a parte PURA (findBaseDiffAnomalies) separada da orquestração (git e
// processo filho), para os testes cobrirem as regras sem repositório.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Caminho do diretório de migrations relativo à raiz do repositório (formato do git). */
export const MIGRATIONS_REL_DIR = "src/lib/db/migrations";

/** Eventos do GitHub Actions em que a base é obrigatória (PR e fila de merge). */
export const BASE_REQUIRED_EVENTS = new Set(["pull_request", "pull_request_target", "merge_group"]);

/** Tempo máximo do verificador de comutação (dois caminhos de boot com todas as migrations). */
export const COMMUTATION_TIMEOUT_MS = 10 * 60 * 1000;

const LIB_DIR = path.dirname(fileURLToPath(import.meta.url));
/** Raiz do repositório que contém este gate (cwd do verificador, para os aliases `@/`). */
export const GATE_REPO_ROOT = path.resolve(LIB_DIR, "..", "..", "..");
/** Verificador de comutação padrão; `MIGRATION_COMMUTATION_SCRIPT` troca (só testes). */
export const DEFAULT_COMMUTATION_SCRIPT = path.resolve(LIB_DIR, "..", "migration-commutation.ts");

const TIMESTAMP_PREFIX_RE = /^(\d{14})_(.+)\.sql$/;

function descriptionOf(name) {
  const match = name.match(/^\d+_(.+)\.sql$/);
  return match ? match[1] : null;
}

/**
 * Função pura — compara a lista de migrations da base com a do HEAD.
 *
 * @param {{ baseFiles: Map<string, string>, headFiles: Map<string, string> }} input
 *   nome do arquivo → id do blob (git) na base e no HEAD
 * @returns {{
 *   removed: Array<{ name: string, renamedTo?: string }>,
 *   modified: string[],
 *   addedOutOfOrder: string[],
 *   baseMaxTimestamp: string | null,
 * }}
 *   `removed`: na base e fora do disco; `renamedTo` aponta o arquivo novo com o mesmo
 *   conteúdo ou a mesma descrição (renomeação provável). `modified`: mesmo nome, blob
 *   diferente. `addedOutOfOrder`: migrations por data que não estão na base e cujo carimbo
 *   é ≤ o maior carimbo da base (precisam da checagem de comutação).
 */
export function findBaseDiffAnomalies({ baseFiles, headFiles }) {
  const added = [...headFiles.keys()].filter((name) => !baseFiles.has(name)).sort();

  let baseMaxTimestamp = null;
  for (const name of baseFiles.keys()) {
    const match = name.match(TIMESTAMP_PREFIX_RE);
    if (match && (baseMaxTimestamp === null || match[1] > baseMaxTimestamp)) {
      baseMaxTimestamp = match[1];
    }
  }

  const removed = [];
  const modified = [];
  for (const [name, blob] of [...baseFiles.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    if (!headFiles.has(name)) {
      const description = descriptionOf(name);
      const renamedTo =
        added.find((candidate) => headFiles.get(candidate) === blob) ??
        (description ? added.find((candidate) => descriptionOf(candidate) === description) : null);
      removed.push(renamedTo ? { name, renamedTo } : { name });
    } else if (headFiles.get(name) !== blob) {
      modified.push(name);
    }
  }

  const addedOutOfOrder = [];
  if (baseMaxTimestamp !== null) {
    for (const name of added) {
      const match = name.match(TIMESTAMP_PREFIX_RE);
      if (match && match[1] <= baseMaxTimestamp) addedOutOfOrder.push(name);
    }
  }

  return { removed, modified, addedOutOfOrder, baseMaxTimestamp };
}

// ---------------------------------------------------------------------------------------
// Orquestração (git, processo filho). Tudo abaixo recebe o cwd do repositório analisado.
// ---------------------------------------------------------------------------------------

function git(cwd, args, options = {}) {
  const binary = options.binary === true;
  return spawnSync("git", args, {
    cwd,
    // Binary mode returns Buffers (blob content is written byte for byte).
    ...(binary ? {} : { encoding: "utf-8" }),
    input: options.input === undefined ? undefined : Buffer.from(options.input, "utf-8"),
    maxBuffer: 256 * 1024 * 1024,
  });
}

function revParseCommit(cwd, ref) {
  const r = git(cwd, ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`]);
  return r.status === 0 ? r.stdout.trim() : null;
}

/**
 * Lê `--base <ref>` / `--base=<ref>` da linha de comando. Opção desconhecida → erro.
 *
 * @param {string[]} argv
 * @returns {{ base: string | null }}
 */
export function parseGateArgs(argv) {
  let base = null;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--base") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--base precisa de uma ref git");
      base = value;
      i += 1;
    } else if (arg.startsWith("--base=")) {
      base = arg.slice("--base=".length);
      if (!base) throw new Error("--base precisa de uma ref git");
    } else {
      throw new Error(`opção desconhecida ${arg} (uso: check-migration-numbering [--base <ref>])`);
    }
  }
  return { base };
}

/**
 * Resolve a base da comparação, nesta ordem:
 *   1. `--base <ref>`; 2. env `MIGRATION_BASE_REF`;
 *   3. em evento de PR/fila (`GITHUB_EVENT_NAME` ∈ BASE_REQUIRED_EVENTS):
 *      a. HEAD é commit de merge → 1º pai (o merge ref do GitHub e o candidato da fila são
 *         merges cujo 1º pai é a base);
 *      b. `merge_group.base_sha` do payload (fila com squash: o candidato não é merge);
 *      c. `git merge-base HEAD origin/$GITHUB_BASE_REF`;
 *      d. nada disso → FALHA fechada.
 *   Fora de PR/fila e sem base → pula a comparação.
 *
 * @param {{ cwd: string, cliBase: string | null, env: Record<string, string | undefined> }} input
 * @returns {{ status: "resolved", sha: string, label: string }
 *   | { status: "skipped" }
 *   | { status: "error", message: string }}
 */
export function resolveBaseRef({ cwd, cliBase, env }) {
  const explicit = cliBase || env.MIGRATION_BASE_REF || null;
  if (explicit) {
    const sha = revParseCommit(cwd, explicit);
    if (!sha) {
      return {
        status: "error",
        message: `a base "${explicit}" não é um commit deste repositório (git rev-parse falhou)`,
      };
    }
    return { status: "resolved", sha, label: explicit };
  }

  const event = env.GITHUB_EVENT_NAME || "";
  if (!BASE_REQUIRED_EVENTS.has(event)) return { status: "skipped" };

  const parents = git(cwd, ["rev-list", "--parents", "-n", "1", "HEAD"]);
  const ids = parents.status === 0 ? parents.stdout.trim().split(/\s+/) : [];
  if (ids.length >= 3) {
    return { status: "resolved", sha: ids[1], label: "HEAD^1 (1º pai do merge)" };
  }

  if (event === "merge_group" && env.GITHUB_EVENT_PATH) {
    try {
      const payload = JSON.parse(fs.readFileSync(env.GITHUB_EVENT_PATH, "utf-8"));
      const baseSha = payload?.merge_group?.base_sha;
      const sha = baseSha ? revParseCommit(cwd, baseSha) : null;
      if (sha) return { status: "resolved", sha, label: "merge_group.base_sha" };
    } catch {
      // Unreadable payload: fall through to the next strategy (and fail closed at the end).
    }
  }

  if (env.GITHUB_BASE_REF) {
    const remote = `origin/${env.GITHUB_BASE_REF}`;
    const mb = git(cwd, ["merge-base", "HEAD", remote]);
    if (mb.status === 0 && mb.stdout.trim()) {
      return { status: "resolved", sha: mb.stdout.trim(), label: `merge-base HEAD ${remote}` };
    }
  }

  return {
    status: "error",
    message:
      `base não resolvida em evento ${event}: o HEAD não é commit de merge e nem ` +
      `merge_group.base_sha nem origin/$GITHUB_BASE_REF estão disponíveis. Faça checkout ` +
      `com fetch-depth: 0, ou passe --base <ref> / MIGRATION_BASE_REF.`,
  };
}

/**
 * Lista as migrations da base: nome → blob (`git ls-tree`). Só entradas do tipo blob.
 *
 * @param {string} cwd
 * @param {string} sha
 * @returns {Map<string, string>}
 */
export function listBaseMigrations(cwd, sha) {
  const r = git(cwd, ["ls-tree", "-z", sha, "--", `${MIGRATIONS_REL_DIR}/`]);
  if (r.status !== 0) throw new Error(`git ls-tree ${sha} falhou: ${r.stderr.trim()}`);
  const files = new Map();
  for (const record of r.stdout.split("\0")) {
    if (!record) continue;
    const tab = record.indexOf("\t");
    const [, type, blob] = record.slice(0, tab).split(" ");
    const name = path.posix.basename(record.slice(tab + 1));
    if (type === "blob") files.set(name, blob);
  }
  return files;
}

/**
 * Lista as migrations do disco (arquivos regulares) com o blob que o git gravaria.
 *
 * @param {string} cwd
 * @param {string[]} regularNames basenames dos arquivos regulares do diretório
 * @returns {Map<string, string>}
 */
export function listHeadMigrations(cwd, regularNames) {
  const files = new Map();
  if (regularNames.length === 0) return files;
  const rel = regularNames.map((name) => `${MIGRATIONS_REL_DIR}/${name}`);
  const r = git(cwd, ["hash-object", "--stdin-paths"], { input: rel.join("\n") + "\n" });
  if (r.status !== 0) throw new Error(`git hash-object falhou: ${r.stderr.trim()}`);
  const blobs = r.stdout.trim().split("\n");
  regularNames.forEach((name, i) => files.set(name, blobs[i]));
  return files;
}

/**
 * Grava em `targetDir` o conteúdo dos blobs da base (`git cat-file --batch`, um processo).
 *
 * @param {string} cwd
 * @param {Map<string, string>} baseFiles nome → blob
 * @param {string} targetDir
 */
export function extractBaseMigrations(cwd, baseFiles, targetDir) {
  const entries = [...baseFiles.entries()];
  if (entries.length === 0) return;
  const r = git(cwd, ["cat-file", "--batch"], {
    input: entries.map(([, blob]) => blob).join("\n") + "\n",
    binary: true,
  });
  if (r.status !== 0) throw new Error(`git cat-file falhou: ${String(r.stderr).trim()}`);
  const out = r.stdout;
  let offset = 0;
  for (const [name] of entries) {
    const headerEnd = out.indexOf(0x0a, offset);
    const header = out.subarray(offset, headerEnd).toString("utf-8").split(" ");
    if (header[1] !== "blob") throw new Error(`blob da base ilegível para ${name}`);
    const size = Number(header[2]);
    const start = headerEnd + 1;
    fs.writeFileSync(path.join(targetDir, name), out.subarray(start, start + size));
    offset = start + size + 1;
  }
}

/**
 * Roda o verificador de comutação (contrato em scripts/check/migration-commutation.ts):
 * base-dir = migrations da base extraídas do git; head-dir = cópia do diretório do disco.
 * Exit 0 = schemas iguais, 1 = divergem, outro = erro de infraestrutura.
 *
 * @param {{ cwd: string, baseFiles: Map<string, string>, migrationsDir: string,
 *   headNames: string[], env: Record<string, string | undefined> }} input
 * @returns {{ status: "equal" | "different" | "error", output: string }}
 */
export function runCommutationCheck({ cwd, baseFiles, migrationsDir, headNames, env }) {
  const script = env.MIGRATION_COMMUTATION_SCRIPT || DEFAULT_COMMUTATION_SCRIPT;
  if (!fs.existsSync(script)) {
    return { status: "error", output: `verificador de comutação ausente: ${script}` };
  }
  let tsxLoader;
  try {
    tsxLoader = import.meta.resolve("tsx/esm");
  } catch {
    return {
      status: "error",
      output: "tsx indisponível (npm ci): não há como rodar o verificador",
    };
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-commutation-"));
  try {
    const baseDir = path.join(tmp, "base");
    const headDir = path.join(tmp, "head");
    fs.mkdirSync(baseDir);
    fs.mkdirSync(headDir);
    extractBaseMigrations(cwd, baseFiles, baseDir);
    for (const name of headNames) {
      fs.copyFileSync(path.join(migrationsDir, name), path.join(headDir, name));
    }
    const r = spawnSync(
      process.execPath,
      ["--import", tsxLoader, script, "--base-dir", baseDir, "--head-dir", headDir],
      {
        cwd: GATE_REPO_ROOT,
        env,
        encoding: "utf-8",
        timeout: COMMUTATION_TIMEOUT_MS,
        maxBuffer: 64 * 1024 * 1024,
      }
    );
    const output = [r.stdout, r.stderr].filter(Boolean).join("\n").trim();
    if (r.error) return { status: "error", output: `${r.error.message}\n${output}`.trim() };
    if (r.status === 0) return { status: "equal", output };
    if (r.status === 1) return { status: "different", output };
    return {
      status: "error",
      output: `verificador saiu com ${r.status ?? r.signal}${output ? `:\n${output}` : ""}`,
    };
  } catch (err) {
    return { status: "error", output: err instanceof Error ? err.message : String(err) };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
