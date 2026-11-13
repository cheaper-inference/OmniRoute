#!/usr/bin/env node
// scripts/check/check-migration-numbering.mjs
// Gate de numeração de migrations: protege src/lib/db/migrations/ contra regressões
// de numeração. WHY: um incidente destrutivo aconteceu DUAS VEZES — um `git rm` de
// uma migration duplicada durante um merge apagou uma migration REAL da release
// (094/095 em #3365/#3371). Este gate cria uma ligação de CI entre o disco e as
// anomalias já reconhecidas em migrationRunner.ts, falhando em QUALQUER:
//   - nome de arquivo fora dos dois formatos aceitos — antigo `NNN_*.sql` (exatamente
//     3 dígitos, 001 até LEGACY_MIGRATION_MAX=239, congelado em 2026-11-13) ou novo
//     `YYYYMMDDHHMMSS_descricao.sql` (carimbo UTC válido, ≥ corte, não futuro, descrição
//     snake_case minúscula) — com o motivo e a dica `npm run db:new-migration`;
//   - prefixo de versão DUPLICADO no disco (exceto duplicatas antigas já reconhecidas;
//     dois arquivos com o mesmo carimbo são sempre duplicata);
//   - NOVO gap inexplicado na faixa ANTIGA (gaps conhecidos 026/055/121 são congelados),
//     inclusive no topo: sumir o 239 (ou qualquer número até ele) também falha — e o topo
//     ou a base truncados NUNCA são liberados por KNOWN_GAPS;
//   - entrada do diretório que não seja arquivo regular com nome exatamente válido
//     (diretório, symlink, `.SQL`, `x.sql `, `.sql.bak`, oculto): o runner a ignoraria ou
//     quebraria no boot.
// As migrations por data não são sequenciais: não criam buraco nem entram na faixa antiga.
// Por isso o gate também COMPARA COM A BASE (scripts/check/lib/migrationBaseDiff.mjs):
// migration da base apagada ou renomeada → falha; editada → aviso; por data adicionada com
// carimbo ≤ o maior da base → checagem de comutação (scripts/check/migration-commutation.ts).
// Base: `--base <ref>`, env MIGRATION_BASE_REF ou, em PR/fila do GitHub, o 1º pai do merge
// ref / merge_group.base_sha / merge-base com origin/$GITHUB_BASE_REF (falha fechada sem
// base). Fora de CI e sem base, a comparação é pulada.
// Regras de nome compartilhadas com o gerador: scripts/check/lib/migrationNaming.mjs.
// As anomalias conhecidas são derivadas das listas de migrationRunner.ts
// (LEGACY_VERSION_SLOT_MIGRATIONS / SUPERSEDED_DUPLICATE_MIGRATIONS) + a auditoria
// de gaps de sequência. NÃO adicione novos itens sem justificativa — esse é o ponto.
// Stale-enforcement (6A.3): entrada em KNOWN_GAPS / KNOWN_DUPLICATE_VERSIONS que não
// suprime nenhuma anomalia real → gate falha com instrução de remoção.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";
import {
  findBaseDiffAnomalies,
  listBaseMigrations,
  listHeadMigrations,
  MIGRATIONS_REL_DIR,
  parseGateArgs,
  resolveBaseRef,
  runCommutationCheck,
} from "./lib/migrationBaseDiff.mjs";
import {
  classifyMigrationFilename,
  LEGACY_MIGRATION_MAX,
  LEGACY_MIGRATION_MIN,
  NEW_MIGRATION_HINT,
} from "./lib/migrationNaming.mjs";

export { LEGACY_MIGRATION_MAX };

const cwd = process.cwd();
const MIGRATIONS_DIR = path.join(cwd, "src/lib/db/migrations");

// ---------------------------------------------------------------------------
// ALLOWLIST 1 — duplicatas de versão CONHECIDAS.
// Fonte: src/lib/db/migrationRunner.ts → SUPERSEDED_DUPLICATE_MIGRATIONS (~L188).
// O runner já aceita estes slots de versão reutilizados (a migration "renomeada"
// foi promovida para um número novo, e o slot antigo é tolerado). Adicionar aqui
// SOMENTE se houver um arquivo físico duplicado no disco (stale-enforcement 6A.3
// detecta entradas sem duplicata física viva e força remoção).
// ---------------------------------------------------------------------------
export const KNOWN_DUPLICATE_VERSIONS = new Set([
  // "041" was removed: 041_session_account_affinity.sql no longer exists on disk
  // (only 041_compression_receipts.sql remains), so no physical duplicate is present.
  // The SUPERSEDED_DUPLICATE_MIGRATIONS entry in migrationRunner.ts handles the runner
  // compatibility at runtime without needing an allowlist here. (#6A.3 stale cleanup)
]);

// ---------------------------------------------------------------------------
// ALLOWLIST 2 — gaps de sequência CONHECIDOS.
// Fonte: auditoria do disco (src/lib/db/migrations/). Além dos slots legados,
// As migrations Radar 144–145, a migration 143 e a 147 já aterrissaram. O job
// registry foi promovido de 139 para 146 pela tabela
// RENAMED_MIGRATION_COMPATIBILITY. A 148 aterrissou nesta branch
// (148_provider_quota_state.sql) e a 149 aterrissou junto com #10066
// (149_api_key_combo_access.sql) — nenhuma das duas é mais um gap. O
// stale-enforcement exige que cada reserva seja removida quando os arquivos
// correspondentes aterrissarem na release.
// #15564 landed 197 and 198. 199 (#15314), 200, and 201 (#15354) also exist.
// None of 197–201 is a gap.
// ---------------------------------------------------------------------------
export const KNOWN_GAPS = new Set(["026", "055", "121"]); // 121: número queimado no ciclo v3.8.47 — 122 (#6909) mergeou antes e 121 nunca aterrissou (validação e2e 2026-07-12); 144/145 aterrissaram na release (radar offers/intel cache), 148/149 aterrissaram (provider_quota_state, api_key_combo_access); 197–201 exist on disk and are not gaps

function pad3(n) {
  return String(n).padStart(3, "0");
}

/**
 * Função pura — entradas de KNOWN_GAPS proibidas: a primeira (001) e a última (239)
 * migration antiga. Liberá-las esconderia exatamente o incidente que o gate existe para
 * pegar (migration apagada por engano no topo ou na base da série).
 *
 * @param {Set<string>} knownGaps
 * @returns {string[]}
 */
export function findForbiddenKnownGaps(knownGaps) {
  const forbidden = new Set([pad3(LEGACY_MIGRATION_MIN), pad3(LEGACY_MIGRATION_MAX)]);
  return [...knownGaps].filter((gap) => forbidden.has(gap)).sort();
}

/**
 * Função pura — separa as entradas do diretório de migrations: arquivos regulares seguem
 * para a checagem de nome; diretório, symlink ou qualquer outra coisa é recusado.
 *
 * @param {Array<{ name: string, isFile: boolean, isSymbolicLink: boolean, isDirectory: boolean }>} entries
 * @returns {{ regularNames: string[], invalidEntries: Array<{ filename: string, code: string, reason: string }> }}
 */
export function classifyDirectoryEntries(entries) {
  const regularNames = [];
  const invalidEntries = [];
  for (const entry of entries) {
    if (entry.isSymbolicLink) {
      invalidEntries.push({
        filename: entry.name,
        code: "not-regular",
        reason:
          "é um link simbólico: migrations precisam ser arquivos regulares versionados " +
          "(o runner leria o alvo do link)",
      });
    } else if (entry.isDirectory) {
      invalidEntries.push({
        filename: entry.name,
        code: "not-regular",
        reason: "é um diretório: o runner tentaria lê-lo como SQL e o boot quebraria (EISDIR)",
      });
    } else if (!entry.isFile) {
      invalidEntries.push({
        filename: entry.name,
        code: "not-regular",
        reason: "não é um arquivo regular",
      });
    } else {
      regularNames.push(entry.name);
    }
  }
  return { regularNames, invalidEntries };
}

/**
 * Função pura — detecta anomalias de numeração de migrations.
 *
 * Classificação de cada `.sql` (regras em scripts/check/lib/migrationNaming.mjs):
 *   - antigo (3 dígitos, ≤ legacyMax): duplicata (salvo knownDuplicates) e buraco (salvo
 *     knownGaps) valem SÓ nessa faixa — inclusive o topo: se `legacyMax` (239) ou qualquer
 *     número entre o maior antigo presente e `legacyMax` sumir, vai para `missingLegacyTop`;
 *     e a base: sumir o `legacyMin` (001) ou qualquer número abaixo do menor presente vai
 *     para `missingLegacyBottom`;
 *   - por data (14 dígitos, carimbo UTC válido, ≥ corte, não futuro): versão única; não
 *     cria buraco nem entra no min/max da faixa antiga;
 *   - qualquer outra coisa — inclusive nome que não termina em `.sql` minúsculo, oculto ou
 *     com espaço: nome inválido (`badNames` + motivo e `code` em `invalidNames`).
 *   O topo/base truncados (`missingLegacyTop`/`missingLegacyBottom`) IGNORAM `knownGaps`:
 *   apagar o 001 ou o 239 nunca é liberável.
 *
 * @param {string[]} filenames    nomes de arquivo (basename) em src/lib/db/migrations/
 * @param {Set<string>} knownDuplicates  versões antigas com duplicata reconhecida (ex.: "041")
 * @param {Set<string>} knownGaps        gaps de sequência reconhecidos (ex.: "026")
 * @param {{ now?: Date | number, legacyMax?: number, legacyMin?: number }} [options]
 *   relógio e limites da faixa antiga injetáveis (testes)
 * @returns {{
 *   duplicates: Array<{version:string,names:string[]}>,
 *   gaps: string[],
 *   badNames: string[],
 *   invalidNames: Array<{filename:string,code:string,reason:string}>,
 *   missingLegacyTop: string[],
 *   missingLegacyBottom: string[],
 *   legacyCount: number,
 *   timestampCount: number,
 * }}
 */
export function findMigrationAnomalies(filenames, knownDuplicates, knownGaps, options = {}) {
  const dups = knownDuplicates || new Set();
  const gapsAllow = knownGaps || new Set();
  const legacyMax = options.legacyMax ?? LEGACY_MIGRATION_MAX;
  const legacyMin = options.legacyMin ?? LEGACY_MIGRATION_MIN;
  const classifyOptions = { now: options.now, legacyMax };

  const badNames = [];
  const invalidNames = [];
  const byVersion = new Map();
  const legacyVersions = new Set();
  let legacyCount = 0;
  let timestampCount = 0;

  for (const filename of filenames) {
    const parsed = classifyMigrationFilename(filename, classifyOptions);
    if (parsed.kind === "invalid") {
      badNames.push(filename);
      invalidNames.push({ filename, code: parsed.code, reason: parsed.reason });
      continue;
    }
    if (parsed.kind === "legacy") {
      legacyCount += 1;
      legacyVersions.add(parsed.version);
    } else {
      timestampCount += 1;
    }
    if (!byVersion.has(parsed.version)) byVersion.set(parsed.version, []);
    byVersion.get(parsed.version).push(filename);
  }

  // Duplicatas: dois arquivos físicos com o mesmo prefixo. A allowlist só vale para a
  // faixa antiga — dois arquivos com o mesmo carimbo são sempre duplicata.
  const duplicates = [];
  for (const [version, names] of byVersion.entries()) {
    if (names.length <= 1) continue;
    if (legacyVersions.has(version) && dups.has(version)) continue;
    duplicates.push({ version, names: [...names].sort() });
  }
  duplicates.sort((a, b) => a.version.localeCompare(b.version));

  // Gaps: buracos na faixa ANTIGA min..max que não estão na allowlist. Migrations por data
  // não entram aqui (o carimbo não é sequencial).
  const versions = [...legacyVersions].map((v) => parseInt(v, 10)).sort((a, b) => a - b);
  const gaps = [];
  const missingLegacyTop = [];
  const missingLegacyBottom = [];
  if (versions.length > 0) {
    const min = versions[0];
    const max = versions[versions.length - 1];
    const present = new Set(versions);
    for (let n = min + 1; n < max; n++) {
      if (present.has(n)) continue;
      const padded = pad3(n);
      if (gapsAllow.has(padded)) continue;
      gaps.push(padded);
    }
    // Topo fixo: a faixa antiga vai até legacyMax. Sem isto, apagar a ÚLTIMA migration
    // passaria despercebido (o buraco só era calculado entre min e max presentes). A
    // allowlist NÃO vale aqui: um topo truncado é sempre migration apagada (R3-8).
    for (let n = max + 1; n <= legacyMax; n++) missingLegacyTop.push(pad3(n));
    // Base fixa: idem para a PRIMEIRA migration (001).
    for (let n = legacyMin; n < min; n++) missingLegacyBottom.push(pad3(n));
  }

  return {
    duplicates,
    gaps,
    badNames,
    invalidNames,
    missingLegacyTop,
    missingLegacyBottom,
    legacyCount,
    timestampCount,
  };
}

function listMigrationEntries() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  return fs.readdirSync(MIGRATIONS_DIR, { withFileTypes: true }).map((entry) => ({
    name: entry.name,
    isFile: entry.isFile(),
    isSymbolicLink: entry.isSymbolicLink(),
    isDirectory: entry.isDirectory(),
  }));
}

const isCi = (env) => env.GITHUB_ACTIONS === "true" || Boolean(env.CI && env.CI !== "false");

/** Dica por classe de nome inválido (o motivo já vem de migrationNaming.mjs). */
function hintForInvalid(code) {
  if (code === "future") {
    return "confira o relógio (NTP/timedatectl) e gere de novo com " + NEW_MIGRATION_HINT;
  }
  if (code === "not-regular" || code === "not-sql") {
    return (
      "src/lib/db/migrations/ só aceita arquivos .sql regulares: remova a entrada ou gere com " +
      NEW_MIGRATION_HINT
    );
  }
  return "gere com: " + NEW_MIGRATION_HINT;
}

const RESTORE_HINT = (version) =>
  `restaure com git checkout <base> -- ${MIGRATIONS_REL_DIR}/${version}_*.sql; nunca libere na allowlist`;

/**
 * Comparação com a base. Devolve as linhas de problema (falha) e imprime avisos e notas.
 *
 * @param {{ argvBase: string | null, regularNames: string[], staticProblems: number }} input
 * @returns {string[]}
 */
function compareWithBase({ argvBase, regularNames, staticProblems }) {
  const env = process.env;
  const base = resolveBaseRef({ cwd, cliBase: argvBase, env });
  if (base.status === "skipped") {
    console.log("[check-migration-numbering] comparação com a base: pulada (sem --base)");
    return [];
  }
  if (base.status === "error") return [`  ✗ comparação com a base: ${base.message}`];

  let baseFiles;
  let headFiles;
  try {
    baseFiles = listBaseMigrations(cwd, base.sha);
    headFiles = listHeadMigrations(cwd, regularNames);
  } catch (err) {
    return [`  ✗ comparação com a base: ${err instanceof Error ? err.message : String(err)}`];
  }
  const { removed, modified, addedOutOfOrder, baseMaxTimestamp } = findBaseDiffAnomalies({
    baseFiles,
    headFiles,
  });
  console.log(
    `[check-migration-numbering] comparação com a base ${base.sha.slice(0, 12)} (${base.label}): ` +
      `${baseFiles.size} migration(s) na base`
  );

  const problems = [];
  for (const { name, renamedTo } of removed) {
    problems.push(
      `  ✗ ${name}: migration já mesclada não pode ser apagada nem renomeada` +
        (renamedTo ? ` (renomeada para ${renamedTo}?)` : "") +
        `; restaure com git checkout <base> -- ${MIGRATIONS_REL_DIR}/${name} e, se precisa ` +
        `mudar o schema, crie uma nova com npm run db:new-migration (bancos que já a ` +
        `aplicaram a rodariam de novo, e instalações novas ficariam sem ela)`
    );
  }

  for (const name of modified) {
    const message =
      `conteúdo alterado de migration já mesclada ${name}: bancos que já a aplicaram NÃO ` +
      `rodam a versão nova. Só corrija assim se a mudança for inócua para eles (ex.: ` +
      `tornar idempotente); senão crie uma nova com npm run db:new-migration.`;
    if (env.GITHUB_ACTIONS === "true") {
      console.log(`::warning file=${MIGRATIONS_REL_DIR}/${name}::${message}`);
    } else {
      console.log(`  ⚠ ${message}`);
    }
  }

  if (addedOutOfOrder.length === 0) return problems;
  if (problems.length > 0 || staticProblems > 0) {
    console.log(
      `  ℹ checagem de comutação pulada até corrigir as anomalias acima ` +
        `(${addedOutOfOrder.join(", ")})`
    );
    return problems;
  }

  const result = runCommutationCheck({
    cwd,
    baseFiles,
    migrationsDir: MIGRATIONS_DIR,
    headNames: regularNames,
    env,
  });
  if (result.status === "equal") {
    for (const name of addedOutOfOrder) {
      console.log(
        `  ℹ ${name}: fora de ordem, mas comuta (carimbo ≤ ${baseMaxTimestamp}, o maior da ` +
          `base; banco atualizado e banco novo terminam com o mesmo schema)`
      );
    }
  } else if (result.status === "different") {
    problems.push(
      `  ✗ fora de ordem e NÃO comuta (${addedOutOfOrder.join(", ")}: carimbo ≤ ` +
        `${baseMaxTimestamp}, o maior da base): banco atualizado e banco novo divergem:\n` +
        result.output
          .split("\n")
          .map((line) => `      ${line}`)
          .join("\n") +
        `\n    → regere o nome com npm run db:new-migration (renomear é seguro: o arquivo ` +
        `ainda não foi mesclado)`
    );
  } else {
    const message = `checagem de comutação não rodou para ${addedOutOfOrder.join(", ")}: ${result.output}`;
    if (isCi(env)) problems.push(`  ✗ ${message}`);
    else console.log(`  ⚠ ${message} (fora de CI: só aviso)`);
  }
  return problems;
}

function main() {
  let args;
  try {
    args = parseGateArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`[check-migration-numbering] ${err instanceof Error ? err.message : err}`);
    process.exitCode = 1;
    return;
  }

  const { regularNames, invalidEntries } = classifyDirectoryEntries(listMigrationEntries());
  const filenames = regularNames;

  // Compute raw anomalies WITHOUT allowlists — needed for stale-enforcement (6A.3). Only
  // interior gaps can be allowlisted; a truncated top/bottom never is.
  const raw = findMigrationAnomalies(filenames, new Set(), new Set());
  const liveDupVersions = raw.duplicates.map((d) => d.version);
  assertNoStale(KNOWN_GAPS, raw.gaps, "check-migration-numbering:gaps");
  assertNoStale(KNOWN_DUPLICATE_VERSIONS, liveDupVersions, "check-migration-numbering:duplicates");

  const {
    duplicates,
    gaps,
    invalidNames,
    missingLegacyTop,
    missingLegacyBottom,
    legacyCount,
    timestampCount,
  } = findMigrationAnomalies(filenames, KNOWN_DUPLICATE_VERSIONS, KNOWN_GAPS);

  const problems = [];
  for (const gap of findForbiddenKnownGaps(KNOWN_GAPS)) {
    problems.push(
      `  ✗ KNOWN_GAPS contém ${gap}: a primeira e a última migration antiga nunca entram na ` +
        `allowlist; ${RESTORE_HINT(gap)}`
    );
  }
  for (const { filename, code, reason } of [...invalidEntries, ...invalidNames]) {
    problems.push(`  ✗ nome inválido: ${filename} — ${reason}\n    → ${hintForInvalid(code)}`);
  }
  for (const d of duplicates) {
    problems.push(
      `  ✗ prefixo de versão duplicado ${d.version}: [${d.names.join(", ")}]\n` +
        `    → regere o nome do arquivo que AINDA NÃO foi mesclado com npm run ` +
        `db:new-migration; nunca renomeie o que já está na base`
    );
  }
  for (const g of gaps) {
    problems.push(
      `  ✗ gap inexplicado na sequência: faltando ${g}\n    → migration apagada por engano? ` +
        `restaure com git checkout <base> -- ${MIGRATIONS_REL_DIR}/${g}_*.sql; só um número ` +
        `que NUNCA existiu entra em KNOWN_GAPS, com justificativa rastreável`
    );
  }
  for (const b of missingLegacyBottom) {
    problems.push(
      `  ✗ faixa antiga truncada: faltando ${b} (a série antiga começa em ` +
        `${pad3(LEGACY_MIGRATION_MIN)}; migration apagada por engano?)\n    → ${RESTORE_HINT(b)}`
    );
  }
  for (const t of missingLegacyTop) {
    problems.push(
      `  ✗ faixa antiga truncada: faltando ${t} (a série antiga vai até ` +
        `${LEGACY_MIGRATION_MAX}; migration apagada por engano?)\n    → ${RESTORE_HINT(t)}`
    );
  }

  const staticProblems = problems.length;
  problems.push(
    ...compareWithBase({ argvBase: args.base, regularNames: filenames, staticProblems })
  );

  if (problems.length > 0) {
    console.error(
      `[check-migration-numbering] ${problems.length} anomalia(s) de migration:\n` +
        problems.join("\n")
    );
    process.exitCode = 1;
  }

  if (!process.exitCode) {
    console.log(
      `[check-migration-numbering] OK (${filenames.length} migrations: ` +
        `${legacyCount} antiga(s) 001–${LEGACY_MIGRATION_MAX}, ${timestampCount} por data; ` +
        `${KNOWN_GAPS.size} gap(s) conhecido(s), ${KNOWN_DUPLICATE_VERSIONS.size} duplicata(s) conhecida(s))`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
