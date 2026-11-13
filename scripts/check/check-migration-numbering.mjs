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
//     inclusive no topo: sumir o 239 (ou qualquer número até ele) também falha.
// As migrations por data não são sequenciais: não criam buraco nem entram na faixa antiga.
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
 *   - qualquer outra coisa: nome inválido (`badNames` + motivo em `invalidNames`).
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
 *   invalidNames: Array<{filename:string,reason:string}>,
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
    if (!filename.endsWith(".sql")) continue;
    const parsed = classifyMigrationFilename(filename, classifyOptions);
    if (parsed.kind === "invalid") {
      badNames.push(filename);
      invalidNames.push({ filename, reason: parsed.reason });
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
    // passaria despercebido (o buraco só era calculado entre min e max presentes).
    for (let n = max + 1; n <= legacyMax; n++) {
      const padded = pad3(n);
      if (gapsAllow.has(padded)) continue;
      missingLegacyTop.push(padded);
    }
    // Base fixa: idem para a PRIMEIRA migration (001).
    for (let n = legacyMin; n < min; n++) {
      const padded = pad3(n);
      if (gapsAllow.has(padded)) continue;
      missingLegacyBottom.push(padded);
    }
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

function listMigrationFilenames() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  return fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
}

function main() {
  const filenames = listMigrationFilenames();

  // Compute raw anomalies WITHOUT allowlists — needed for stale-enforcement (6A.3).
  const raw = findMigrationAnomalies(filenames, new Set(), new Set());
  // O topo fixo da faixa antiga também é "gap": uma entrada em KNOWN_GAPS que cubra um
  // número acima do maior antigo presente continua viva enquanto o arquivo faltar.
  const liveGaps = [...raw.gaps, ...raw.missingLegacyTop, ...raw.missingLegacyBottom];
  const liveDupVersions = raw.duplicates.map((d) => d.version);
  assertNoStale(KNOWN_GAPS, liveGaps, "check-migration-numbering:gaps");
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
  for (const { filename, reason } of invalidNames) {
    problems.push(`  ✗ nome inválido: ${filename} — ${reason} (gere com: ${NEW_MIGRATION_HINT})`);
  }
  for (const d of duplicates) {
    problems.push(`  ✗ prefixo de versão duplicado ${d.version}: [${d.names.join(", ")}]`);
  }
  for (const g of gaps) {
    problems.push(`  ✗ gap inexplicado na sequência: faltando ${g}`);
  }
  for (const b of missingLegacyBottom) {
    problems.push(
      `  ✗ faixa antiga truncada: faltando ${b} (a série antiga começa em ` +
        `${pad3(LEGACY_MIGRATION_MIN)}; migration apagada por engano?)`
    );
  }
  for (const t of missingLegacyTop) {
    problems.push(
      `  ✗ faixa antiga truncada: faltando ${t} (a série antiga vai até ` +
        `${LEGACY_MIGRATION_MAX}; migration apagada por engano?)`
    );
  }

  if (problems.length > 0) {
    console.error(
      `[check-migration-numbering] ${problems.length} anomalia(s) de numeração:\n` +
        problems.join("\n") +
        `\n  → renomeie o arquivo colidente, preencha o gap, ou — se for legítimo — ` +
        `adicione o número às allowlists KNOWN_DUPLICATE_VERSIONS / KNOWN_GAPS com ` +
        `justificativa rastreável a src/lib/db/migrationRunner.ts.`
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
