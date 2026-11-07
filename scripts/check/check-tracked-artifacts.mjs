#!/usr/bin/env node
// scripts/check/check-tracked-artifacts.mjs
// Gate: falha se o git rastreia artefatos de build/artefatos gerados proibidos.
// Guarda contra `git add -A` acidental em worktrees que include node_modules symlinks.
// Incidente registrado 2× neste repo (v3.8.12 / v3.8.13) — Hard Rule #7 extensão.
//
// Artefatos proibidos:
//   - node_modules/  — deps de build nunca devem entrar no repo
//   - .next/         — output do build Next.js
//   - coverage/      — relatórios de cobertura gerados pelo c8
//   - quality-metrics.json — saída do collect-metrics.mjs (gerado, não-versionado)
//   - symlinks rastreados (mode 120000) — indício de `git add -A` em worktree
//   - _tasks (exato E prefixo) — repo git SEPARADO; o blob symlink rastreado causou DOIS
//     wipes do diretório real (2026-08-08 e 2026-08-10; Hard Rule #23)
//   - _references/ _mono_repo/ _ideia/ _cache/ — diretórios privados de raiz (regra /_*/)
//   - .claude/worktrees/ — worktrees de sessão nunca entram no repo
//   - docs/superpowers/ — artefatos de planejamento vivem em _tasks/, não em docs/
//   - .eslintcache* .fakebin-* dist/ .build/ .artifacts/ logs/ — caches e outputs gerados
//
// Todos os prefixos são ancorados na raiz (startsWith sobre paths do `git ls-files`):
// paths aninhados legítimos como `src/lib/logs/` NÃO são atingidos.

import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const FORBIDDEN_PREFIXES = [
  "node_modules/",
  ".next/",
  "coverage/",
  // "_" na raiz é GENÉRICO (regra abaixo em checkTrackedArtifacts): _tasks/, _references/,
  // _mono_repo/, _ideia/, _cache/ e qualquer _<novo>/ futuro — dirs privados, alguns com
  // repo git próprio (_tasks). Nunca rastrear nada dentro deles (Hard Rule #23).
  ".claude/worktrees/",
  "docs/superpowers/",
  ".eslintcache", // matches .eslintcache, .eslintcache-complexity, .eslintcache-probe, …
  ".fakebin-", // test executable shim dirs (.fakebin-<pid>/)
  "dist/",
  ".build/",
  ".artifacts/",
  "logs/",
];
const FORBIDDEN_EXACT = new Set([
  "quality-metrics.json", // legacy root location (still forbidden if a stale run writes it)
  "config/quality/quality-metrics.json", // current generated location (collect-metrics.mjs)
  "_tasks", // separate git repo — a tracked blob/symlink here wiped the real dir twice (HR#23)
]);

/**
 * Verifica se algum caminho na lista de arquivos rastreados corresponde a um
 * artefato proibido. Também aceita uma lista separada de symlinks rastreados.
 *
 * @param {string[]} trackedFiles - saída de `git ls-files` (caminhos relativos)
 * @param {string[]} trackedSymlinks - caminhos com mode 120000 (saída de git ls-files -s)
 * @returns {string[]} lista de violações (strings descritivas)
 */
export function checkTrackedArtifacts(trackedFiles, trackedSymlinks = []) {
  const violations = [];

  for (const file of trackedFiles) {
    if (FORBIDDEN_EXACT.has(file)) {
      violations.push(`forbidden tracked artifact: ${file}`);
      continue;
    }
    // Regra genérica: NENHUM caminho de raiz prefixado com "_" pode ser rastreado
    // (dir ou arquivo). Cobre _tasks, _references, _mono_repo e qualquer _<novo> futuro;
    // paths aninhados legítimos (src/lib/_x) não são atingidos.
    if (file.startsWith("_")) {
      violations.push(`forbidden tracked artifact (root underscore path): ${file}`);
      continue;
    }
    for (const prefix of FORBIDDEN_PREFIXES) {
      if (file.startsWith(prefix)) {
        violations.push(`forbidden tracked artifact (${prefix}*): ${file}`);
        break;
      }
    }
  }

  for (const sym of trackedSymlinks) {
    violations.push(`forbidden tracked symlink (mode 120000): ${sym}`);
  }

  return violations;
}

/**
 * `execFileSync` defaults to a 1 MiB stdout buffer and throws ENOBUFS past it.
 * This check runs on pre-commit, so crossing that line breaks committing for
 * the whole repo, not just the change that crossed it. `git ls-files -s` is
 * already at ~1.04 MB here and only grows, so the ceiling is set far above any
 * plausible tree instead of just above today's.
 */
const GIT_LS_OPTS = { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 };

function getTrackedFiles() {
  const output = execFileSync("git", ["ls-files"], GIT_LS_OPTS);
  return output
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function getTrackedSymlinks() {
  // git ls-files -s prints: <mode> <hash> <stage>\t<path>
  // mode 120000 = symlink
  const output = execFileSync("git", ["ls-files", "-s"], GIT_LS_OPTS);
  const symlinks = [];
  for (const line of output.split("\n")) {
    if (line.startsWith("120000")) {
      const parts = line.split("\t");
      if (parts[1]) symlinks.push(parts[1].trim());
    }
  }
  return symlinks;
}

function main() {
  const trackedFiles = getTrackedFiles();
  const trackedSymlinks = getTrackedSymlinks();
  const violations = checkTrackedArtifacts(trackedFiles, trackedSymlinks);

  if (violations.length === 0) {
    console.log("[tracked-artifacts] OK — no forbidden artifacts tracked by git");
    process.exit(0);
  }

  console.error(
    `[tracked-artifacts] FAIL — ${violations.length} forbidden artifact(s) tracked by git:`
  );
  for (const v of violations) {
    console.error(`  ✗ ${v}`);
  }
  console.error(
    "\n  → Run: git rm --cached <path> to untrack the artifact." +
      "\n  → Add the path to .gitignore to prevent re-tracking."
  );
  process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
