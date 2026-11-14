// scripts/check/lib/migrationBaseDiff.mjs
// Comparação das migrations do HEAD com as da BASE (o branch que vai receber o merge, ou a
// última tag de release com --base-latest-tag). Usada por
// scripts/check/check-migration-numbering.mjs. JS puro: roda em node sem tsx.
//
// WHY: no formato por data o gate de numeração não enxerga mais buracos (o carimbo não é
// sequencial). Apagar ou renomear uma migration JÁ MESCLADA passaria em silêncio:
//   - apagada: instalação nova fica sem o schema, banco atualizado fica com ele (divergência);
//   - renomeada: todo banco que já a aplicou roda de novo (DML duplicada, CREATE sem
//     IF NOT EXISTS derruba o boot). Reprodução: revisão adversarial R3-1 de 2026-11-13.
// Por isso o gate compara o disco com a base e:
//   (a) arquivo da base que sumiu do disco → FALHA, tenha saído numa tag ou não: todo push
//       numa release/v* publica o Docker :next e roda na homologação, nas VPS e no sync do
//       Enterprise, então uma migration mesclada já rodou em bancos reais. Única exceção:
//       renomeação coberta por entrada de RENAMED_MIGRATION_COMPATIBILITY (na cabeça) com
//       conteúdo idêntico → aviso + checagem de comutação, qualquer que seja o carimbo novo
//       (a renomeação muda a posição em instalações novas, não em bancos atualizados), com
//       `--must-not-apply <alvo>`: o verificador falha se o runner real aplicar o alvo de
//       novo no banco atualizado (entrada errada, ou um texto do constants.ts que o parser
//       leu diferente do TypeScript); conteúdo diferente → FALHA; renomeação que mantém a
//       versão (só a descrição muda) → FALHA, com ou sem entrada (o runner a aplicaria de
//       novo com a entrada, ou a pularia pela versão sem ela);
//   (b) arquivo da base com conteúdo diferente → aviso + checagem de comutação;
//   (c) migration por data adicionada com carimbo ≤ maior carimbo da base → checagem de
//       comutação (scripts/check/migration-commutation.ts), que monta o banco "atualizado"
//       (base, depois HEAD) e o "novo" (HEAD de uma vez) e compara;
//   (d) arquivo no formato antigo adicionado abaixo do maior número antigo da base → FALHA
//       (a série antiga está congelada).
//
// Este arquivo tem a parte PURA (findBaseDiffAnomalies, classifyRemovals, parsers) separada
// da orquestração (git e processo filho), para os testes cobrirem as regras sem repositório.
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

/** Arquivo das tabelas de compatibilidade do runner, relativo à raiz do repositório. */
export const COMPAT_CONSTANTS_REL_PATH = "src/lib/db/migrationRunner/constants.ts";

/**
 * Tag de release publicada: exatamente `vX.Y.Z`. Fica de fora o que tem sufixo
 * (`v3.8.51-nightly.20260915.21a0ee1`, `v3.8.52-hdl-20261009.1`).
 */
export const RELEASE_TAG_RE = /^v(\d+)\.(\d+)\.(\d+)$/;

const TIMESTAMP_PREFIX_RE = /^(\d{14})_(.+)\.sql$/;
const LEGACY_PREFIX_RE = /^(\d{3})_(.+)\.sql$/;
const MIGRATION_NAME_RE = /^(\d+)_(.+)\.sql$/;

function descriptionOf(name) {
  const match = name.match(MIGRATION_NAME_RE);
  return match ? match[2] : null;
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
 *   addedLegacyBelowBase: string[],
 *   baseMaxTimestamp: string | null,
 * }}
 *   `removed`: na base e fora do disco; `renamedTo` aponta o arquivo novo com o mesmo
 *   conteúdo ou a mesma descrição (renomeação provável). `modified`: mesmo nome, blob
 *   diferente. `addedOutOfOrder`: migrations por data que não estão na base e cujo carimbo
 *   é ≤ o maior carimbo da base (precisam da checagem de comutação).
 *   `addedLegacyBelowBase`: arquivos no formato antigo (3 dígitos) que não estão na base e
 *   cujo número é MENOR que o maior número antigo da base — preencher lacuna da série
 *   congelada, independente de KNOWN_GAPS. Acima do maior da base é legítimo (a PR
 *   release/vX → main traz as antigas que a main ainda não tem).
 */
export function findBaseDiffAnomalies({ baseFiles, headFiles }) {
  const added = [...headFiles.keys()].filter((name) => !baseFiles.has(name)).sort();

  let baseMaxTimestamp = null;
  let baseMaxLegacy = null;
  for (const name of baseFiles.keys()) {
    const match = name.match(TIMESTAMP_PREFIX_RE);
    if (match && (baseMaxTimestamp === null || match[1] > baseMaxTimestamp)) {
      baseMaxTimestamp = match[1];
    }
    const legacy = name.match(LEGACY_PREFIX_RE);
    if (legacy && (baseMaxLegacy === null || Number(legacy[1]) > baseMaxLegacy)) {
      baseMaxLegacy = Number(legacy[1]);
    }
  }

  const addedLegacyBelowBase =
    baseMaxLegacy === null
      ? []
      : added.filter((name) => {
          const legacy = name.match(LEGACY_PREFIX_RE);
          return legacy !== null && Number(legacy[1]) < baseMaxLegacy;
        });

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

  return { removed, modified, addedOutOfOrder, addedLegacyBelowBase, baseMaxTimestamp };
}

/**
 * Função pura — duas versões de um trecho TS com o MESMO comprimento e os mesmos offsets do
 * original: `code` troca comentários (`//`, `/* *\/`) por espaços e mantém as strings;
 * `masked` também troca por espaços o conteúdo de cada literal ('…', "…", `…`), mantendo as
 * aspas. Quebras de linha são preservadas nas duas (as âncoras `^` com flag m continuam
 * valendo). Procurar a declaração em `masked` impede que uma string que a imita conte.
 *
 * @param {string} source
 * @returns {{ code: string, masked: string }}
 */
function blankTsCommentsAndLiterals(source) {
  const blank = (text) => text.replace(/[^\n]/g, " ");
  let code = "";
  let masked = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (ch === "/" && next === "/") {
      let j = i;
      while (j < source.length && source[j] !== "\n") j += 1;
      const spaces = blank(source.slice(i, j));
      code += spaces;
      masked += spaces;
      i = j;
    } else if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const j = end === -1 ? source.length : end + 2;
      const spaces = blank(source.slice(i, j));
      code += spaces;
      masked += spaces;
      i = j;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < source.length && source[j] !== ch) j += source[j] === "\\" ? 2 : 1;
      const literal = source.slice(i, Math.min(j + 1, source.length));
      code += literal;
      masked += literal.length >= 2 ? ch + blank(literal.slice(1, -1)) + ch : blank(literal);
      i = j + 1;
    } else {
      code += ch;
      masked += ch;
      i += 1;
    }
  }
  return { code, masked };
}

const COMPAT_KEYS = ["fromVersion", "fromName", "toVersion", "toName"];

/**
 * Função pura — extrai, por texto, as entradas de `RENAMED_MIGRATION_COMPATIBILITY` de
 * src/lib/db/migrationRunner/constants.ts (o gate é .mjs puro e não importa TS). Aceita
 * qualquer ordem de chaves, comentários, aspas simples ou duplas e vírgula final. A
 * declaração é procurada fora de comentários e literais, em começo de linha, e precisa
 * existir exatamente UMA vez (uma string que imita a declaração não conta). Formato
 * inesperado (nenhuma ou duas declarações, array sem fechamento, chave faltando, valor que
 * não é string literal) → erro: melhor falhar do que ignorar ou inventar uma entrada.
 *
 * @param {string} source conteúdo do constants.ts
 * @returns {Array<{ fromVersion: string, fromName: string, toVersion: string, toName: string }>}
 */
export function parseRenamedMigrationCompatibility(source) {
  const { code, masked } = blankTsCommentsAndLiterals(source);
  const declarations = [
    ...masked.matchAll(/^export\s+const\s+RENAMED_MIGRATION_COMPATIBILITY\b[^=]*=\s*\[/gm),
  ];
  if (declarations.length === 0) {
    throw new Error("RENAMED_MIGRATION_COMPATIBILITY não encontrado em constants.ts");
  }
  if (declarations.length > 1) {
    throw new Error(
      `RENAMED_MIGRATION_COMPATIBILITY: ${declarations.length} declarações em constants.ts ` +
        `(esperada exatamente uma, em começo de linha)`
    );
  }
  const declaration = declarations[0];
  const open = declaration.index + declaration[0].length - 1;
  let depth = 0;
  let close = -1;
  for (let i = open; i < masked.length && close === -1; i++) {
    const ch = masked[i];
    if (ch === "[") {
      depth += 1;
    } else if (ch === "]") {
      depth -= 1;
      if (depth === 0) close = i;
    }
  }
  if (close === -1) throw new Error("RENAMED_MIGRATION_COMPATIBILITY: array sem fechamento");
  // Same offsets in both texts: the values are read with their literals intact.
  const body = code.slice(open + 1, close);

  const entries = [];
  const objectRe = /\{([^{}]*)\}/g;
  let match;
  while ((match = objectRe.exec(body)) !== null) {
    const fields = {};
    const fieldRe = /([A-Za-z_$][\w$]*)\s*:\s*(?:"([^"\\]*)"|'([^'\\]*)')/g;
    let field;
    while ((field = fieldRe.exec(match[1])) !== null) {
      fields[field[1]] = field[2] ?? field[3];
    }
    const missing = COMPAT_KEYS.filter((key) => typeof fields[key] !== "string");
    if (missing.length > 0) {
      throw new Error(
        `RENAMED_MIGRATION_COMPATIBILITY: entrada sem ${missing.join(", ")} (string literal): ` +
          `{${match[1].replace(/\s+/g, " ").trim()}}`
      );
    }
    entries.push({
      fromVersion: fields.fromVersion,
      fromName: fields.fromName,
      toVersion: fields.toVersion,
      toName: fields.toName,
    });
  }
  const leftover = body.replace(objectRe, "").replace(/[\s,]/g, "");
  if (leftover) {
    throw new Error(`RENAMED_MIGRATION_COMPATIBILITY: conteúdo inesperado no array: ${leftover}`);
  }
  return entries;
}

/**
 * Função pura — decide o destino de cada arquivo da base que sumiu do disco. Regra estrita:
 * só a renomeação coberta por entrada de compatibilidade (alvo na cabeça e fora da base, com
 * OUTRA versão) é aceita, e só com conteúdo idêntico; todo o resto (apagar, renomear sem
 * entrada, entrada cujo alvo não está no disco) vai para `forbidden`, tenha o arquivo saído
 * numa tag ou não.
 *
 * Renomeação que mantém a versão (só a descrição muda) vai para `renamedSameVersion`, com
 * ou sem entrada (`covered` diz se havia uma), e é sempre proibida: com a entrada, o runner
 * (reconcileRenumberedMigrations, caso isSameSlotReplacement em
 * src/lib/db/migrationRunner/schemaState.ts) apaga a linha do ledger e aplica o arquivo de
 * novo; sem ela, o runner rastreia só a versão, pula o arquivo nos bancos que já a rodaram e
 * acusa a renumeração a cada boot.
 *
 * @param {{
 *   removed: Array<{ name: string, renamedTo?: string }>,
 *   baseFiles: Map<string, string>,
 *   headFiles: Map<string, string>,
 *   compat: Array<{ fromVersion: string, fromName: string, toVersion: string, toName: string }>,
 * }} input
 * @returns {{
 *   renamedCovered: Array<{ name: string, to: string }>,
 *   renamedChanged: Array<{ name: string, to: string }>,
 *   renamedSameVersion: Array<{ name: string, to: string, covered: boolean }>,
 *   forbidden: Array<{ name: string, renamedTo?: string }>,
 * }}
 */
export function classifyRemovals({ removed, baseFiles, headFiles, compat }) {
  const result = { renamedCovered: [], renamedChanged: [], renamedSameVersion: [], forbidden: [] };
  for (const item of removed) {
    const sameVersion = findSameVersionTarget(item.name, { baseFiles, headFiles, compat });
    if (sameVersion) {
      result.renamedSameVersion.push({ name: item.name, ...sameVersion });
      continue;
    }
    const covered = findCompatTarget(item.name, { baseFiles, headFiles, compat });
    if (covered) {
      const bucket =
        headFiles.get(covered) === baseFiles.get(item.name)
          ? result.renamedCovered
          : result.renamedChanged;
      bucket.push({ name: item.name, to: covered });
      continue;
    }
    result.forbidden.push(item.renamedTo ? { name: item.name, renamedTo: item.renamedTo } : item);
  }
  return result;
}

/**
 * Arquivo novo (na cabeça, fora da base) apontado por uma entrada `from` = `name` para OUTRA
 * versão. Uma entrada que mantém a versão nunca cobre (ver findSameVersionTarget).
 */
function findCompatTarget(name, { baseFiles, headFiles, compat }) {
  const match = name.match(MIGRATION_NAME_RE);
  if (!match) return null;
  for (const entry of compat) {
    if (entry.fromVersion !== match[1] || entry.fromName !== match[2]) continue;
    if (entry.toVersion === entry.fromVersion) continue;
    const target = `${entry.toVersion}_${entry.toName}.sql`;
    if (headFiles.has(target) && !baseFiles.has(target)) return target;
  }
  return null;
}

/**
 * Arquivo novo (na cabeça, fora da base) com a MESMA versão de `name` e outra descrição:
 * renomeação que mantém o carimbo. `covered` diz se uma entrada de compatibilidade aponta
 * de `name` para ele.
 *
 * @returns {{ to: string, covered: boolean } | null}
 */
function findSameVersionTarget(name, { baseFiles, headFiles, compat }) {
  const match = name.match(MIGRATION_NAME_RE);
  if (!match) return null;
  const candidates = [...headFiles.keys()]
    .filter((candidate) => !baseFiles.has(candidate) && candidate !== name)
    .filter((candidate) => candidate.match(MIGRATION_NAME_RE)?.[1] === match[1])
    .sort();
  if (candidates.length === 0) return null;
  const coveredTarget = candidates.find((candidate) =>
    compat.some(
      (entry) =>
        entry.fromVersion === match[1] &&
        entry.fromName === match[2] &&
        entry.toVersion === match[1] &&
        `${entry.toVersion}_${entry.toName}.sql` === candidate
    )
  );
  return coveredTarget
    ? { to: coveredTarget, covered: true }
    : { to: candidates[0], covered: false };
}

const DML_KEYWORDS = new Set(["INSERT", "UPDATE", "DELETE", "REPLACE"]);

/**
 * Função pura — o SQL tem DML? Um comando é DML quando começa com INSERT, UPDATE, DELETE ou
 * REPLACE, ou quando começa com WITH [RECURSIVE] e a primeira dessas palavras (ou SELECT)
 * fora de parênteses é DML (`WITH s AS (…) UPDATE …`). Ignora comentários, literais e o
 * corpo de CREATE TRIGGER … BEGIN … END; dentro do gatilho cada CASE fecha com o seu END, e
 * só o END que fecha o BEGIN termina o gatilho.
 *
 * @param {string} sql
 * @returns {boolean}
 */
export function sqlHasDml(sql) {
  const tokens = tokenizeSqlForDml(sql);
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === ";") {
      i += 1;
      continue;
    }
    if (isCreateTrigger(tokens, i)) {
      i = skipTrigger(tokens, i);
      continue;
    }
    // One statement: up to the next ";" outside parentheses.
    const first = tokens[i];
    let depth = 0;
    let verdict = DML_KEYWORDS.has(first);
    let decided = first !== "WITH";
    let j = i + (first === "WITH" ? 1 : 0);
    for (; j < tokens.length; j++) {
      const token = tokens[j];
      if (token === "(") depth += 1;
      else if (token === ")") depth = Math.max(0, depth - 1);
      else if (token === ";" && depth === 0) break;
      else if (!decided && depth === 0 && (DML_KEYWORDS.has(token) || token === "SELECT")) {
        verdict = token !== "SELECT";
        decided = true;
      }
    }
    if (verdict) return true;
    i = j + 1;
  }
  return false;
}

/** CREATE [TEMP | TEMPORARY] TRIGGER at `i`? */
function isCreateTrigger(tokens, i) {
  if (tokens[i] !== "CREATE") return false;
  const next = tokens[i + 1] === "TEMP" || tokens[i + 1] === "TEMPORARY" ? i + 2 : i + 1;
  return tokens[next] === "TRIGGER";
}

/**
 * Index right after a CREATE TRIGGER statement that starts at `i`: the header (which can hold
 * a WHEN with CASE … END) runs to BEGIN; the body to the END that closes that BEGIN, counting
 * each CASE … END pair; then up to the ";" that ends the statement.
 */
function skipTrigger(tokens, i) {
  let j = i;
  let caseDepth = 0;
  for (; j < tokens.length; j++) {
    const token = tokens[j];
    if (token === "CASE") caseDepth += 1;
    else if (token === "END" && caseDepth > 0) caseDepth -= 1;
    else if (token === "BEGIN" && caseDepth === 0) break;
    else if (token === ";") return j + 1; // no BEGIN: malformed, end the statement here
  }
  let blockDepth = 1;
  for (j += 1; j < tokens.length && blockDepth > 0; j++) {
    if (tokens[j] === "CASE") blockDepth += 1;
    else if (tokens[j] === "END") blockDepth -= 1;
  }
  while (j < tokens.length && tokens[j] !== ";") j += 1;
  return j + 1;
}

/**
 * Words (upper case), "(", ")" and ";" of the SQL, with comments dropped and every literal
 * or quoted identifier ('…', "…", `…`, […]) replaced by the placeholder word `X`.
 *
 * @param {string} sql
 * @returns {string[]}
 */
function tokenizeSqlForDml(sql) {
  let clean = "";
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i];
    const next = sql[i + 1];
    if (ch === "-" && next === "-") {
      while (i < sql.length && sql[i] !== "\n") i += 1;
    } else if (ch === "/" && next === "*") {
      const end = sql.indexOf("*/", i + 2);
      i = end === -1 ? sql.length : end + 2;
      clean += " ";
    } else if (ch === "'" || ch === '"' || ch === "`" || ch === "[") {
      const closer = ch === "[" ? "]" : ch;
      let j = i + 1;
      while (j < sql.length) {
        if (sql[j] === closer) {
          if (closer !== "]" && sql[j + 1] === closer) {
            j += 2; // doubled quote = escaped quote
            continue;
          }
          break;
        }
        j += 1;
      }
      clean += " x ";
      i = j + 1;
    } else {
      clean += ch;
      i += 1;
    }
  }
  return (clean.match(/[A-Za-z_][A-Za-z0-9_$]*|[();]/g) ?? []).map((token) => token.toUpperCase());
}

/**
 * Função pura — ordena tags `vX.Y.Z` pela versão (maior primeiro). Tags fora do formato são
 * descartadas.
 *
 * @param {string[]} tags
 * @returns {string[]}
 */
export function sortReleaseTagsDescending(tags) {
  const parsed = [];
  for (const tag of tags) {
    const match = tag.match(RELEASE_TAG_RE);
    if (match) parsed.push({ tag, parts: match.slice(1, 4).map(Number) });
  }
  parsed.sort((a, b) => {
    for (let k = 0; k < 3; k++) {
      if (a.parts[k] !== b.parts[k]) return b.parts[k] - a.parts[k];
    }
    return 0;
  });
  return parsed.map((p) => p.tag);
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
 * Lê `--base <ref>` / `--base=<ref>` e `--base-latest-tag` da linha de comando. Opção
 * desconhecida, ou as duas formas de base juntas → erro.
 *
 * @param {string[]} argv
 * @returns {{ base: string | null, baseLatestTag: boolean }}
 */
export function parseGateArgs(argv) {
  let base = null;
  let baseLatestTag = false;
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
    } else if (arg === "--base-latest-tag") {
      baseLatestTag = true;
    } else {
      throw new Error(
        `opção desconhecida ${arg} (uso: check-migration-numbering [--base <ref> | --base-latest-tag])`
      );
    }
  }
  if (base && baseLatestTag) {
    throw new Error("use --base <ref> OU --base-latest-tag, não os dois");
  }
  return { base, baseLatestTag };
}

/**
 * Tags de release (`vX.Y.Z`) do repositório, maior versão primeiro. Com `mergedInto`, só as
 * alcançáveis a partir desse commit (`git tag --merged`).
 *
 * @param {string} cwd
 * @param {{ mergedInto?: string }} [options]
 * @returns {string[]}
 */
export function listReleaseTags(cwd, options = {}) {
  const args = ["tag", "--list", "v*"];
  if (options.mergedInto) args.push("--merged", options.mergedInto);
  const r = git(cwd, args);
  if (r.status !== 0) throw new Error(`git tag falhou: ${r.stderr.trim()}`);
  return sortReleaseTagsDescending(r.stdout.split("\n").map((line) => line.trim()));
}

/**
 * Lê RENAMED_MIGRATION_COMPATIBILITY do constants.ts da raiz do repositório analisado.
 * Arquivo ausente → lista vazia (nenhuma renomeação coberta).
 *
 * @param {string} repoRoot
 * @returns {Array<{ fromVersion: string, fromName: string, toVersion: string, toName: string }>}
 */
export function readRenamedMigrationCompatibility(repoRoot) {
  const file = path.join(repoRoot, COMPAT_CONSTANTS_REL_PATH);
  if (!fs.existsSync(file)) return [];
  return parseRenamedMigrationCompatibility(fs.readFileSync(file, "utf-8"));
}

/**
 * Resolve a base da comparação, nesta ordem:
 *   0. `--base-latest-tag`: a maior tag de release `vX.Y.Z` (ordem semver) alcançável a
 *      partir do HEAD (uma tag local fora do histórico não conta); nenhuma → FALHA fechada;
 *   1. `--base <ref>`; 2. env `MIGRATION_BASE_REF`;
 *   3. em evento de PR/fila (`GITHUB_EVENT_NAME` ∈ BASE_REQUIRED_EVENTS):
 *      a. HEAD é commit de merge → 1º pai (o merge ref do GitHub e o candidato da fila são
 *         merges cujo 1º pai é a base);
 *      b. `merge_group.base_sha` do payload (fila com squash: o candidato não é merge);
 *      c. `git merge-base HEAD origin/$GITHUB_BASE_REF`;
 *      d. nada disso → FALHA fechada.
 *   Fora de PR/fila e sem base → pula a comparação.
 *
 * @param {{ cwd: string, cliBase: string | null, latestTag?: boolean,
 *   env: Record<string, string | undefined> }} input
 * @returns {{ status: "resolved", sha: string, label: string }
 *   | { status: "skipped" }
 *   | { status: "error", message: string }}
 */
export function resolveBaseRef({ cwd, cliBase, latestTag = false, env }) {
  if (latestTag) {
    let tags;
    try {
      tags = listReleaseTags(cwd, { mergedInto: "HEAD" });
    } catch (err) {
      return { status: "error", message: `--base-latest-tag: ${err.message}` };
    }
    if (tags.length === 0) {
      return {
        status: "error",
        message:
          "--base-latest-tag: nenhuma tag de release (vX.Y.Z) no histórico do HEAD, então não " +
          "há com o que comparar. Rode git fetch --tags (no CI: actions/checkout com " +
          "fetch-depth: 0).",
      };
    }
    const sha = revParseCommit(cwd, tags[0]);
    if (!sha) return { status: "error", message: `--base-latest-tag: tag ${tags[0]} ilegível` };
    return { status: "resolved", sha, label: `tag ${tags[0]}` };
  }

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
 * Frase que o verificador de comutação imprime sempre que uma migration do PR falha ao ser
 * aplicada no caminho atualizado (com ou sem falha também no caminho novo). Contrato C1 com
 * scripts/check/migration-commutation.ts.
 */
export const NOT_AFTER_BASE_PHRASE = "não aplica depois de todas as migrations da base";

/**
 * Frase que o verificador imprime (com exit 1) quando um arquivo passado em
 * `--must-not-apply` é aplicado no segundo boot do caminho atualizado. Contrato C2 com
 * scripts/check/migration-commutation.ts.
 */
export const APPLIED_AGAIN_PHRASE = "aplicada de novo no banco atualizado";

/**
 * Roda o verificador de comutação (contrato em scripts/check/migration-commutation.ts):
 * base-dir = migrations da base extraídas do git; head-dir = cópia do diretório do disco.
 * Cada nome de `mustNotApply` vira um `--must-not-apply <arquivo.sql>`: o alvo de uma
 * renomeação coberta não pode ser aplicado no banco atualizado (o runner só move a linha do
 * ledger), e o verificador confere isso pelo comportamento do runner real, não pelo texto
 * do constants.ts.
 * Exit 0 = schemas iguais, 1 = divergem, outro = erro de infraestrutura.
 *
 * @param {{ cwd: string, baseFiles: Map<string, string>, migrationsDir: string,
 *   headNames: string[], mustNotApply?: string[], env: Record<string, string | undefined> }} input
 * @returns {{ status: "equal" | "different" | "error", output: string }}
 */
export function runCommutationCheck({
  cwd,
  baseFiles,
  migrationsDir,
  headNames,
  mustNotApply = [],
  env,
}) {
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
    const args = ["--import", tsxLoader, script, "--base-dir", baseDir, "--head-dir", headDir];
    for (const name of [...new Set(mustNotApply)].sort()) args.push("--must-not-apply", name);
    const r = spawnSync(process.execPath, args, {
      cwd: GATE_REPO_ROOT,
      env,
      encoding: "utf-8",
      timeout: COMMUTATION_TIMEOUT_MS,
      maxBuffer: 64 * 1024 * 1024,
    });
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
