// scripts/check/lib/migrationNaming.mjs
// Regras de nome de migration compartilhadas pelo gate (check-migration-numbering.mjs)
// e pelo gerador (scripts/dev/new-migration.mjs). JS puro: roda em node sem tsx.
//
// Dois formatos convivem em src/lib/db/migrations/:
//   - ANTIGO  `NNN_descricao.sql` — exatamente 3 dígitos, de 001 até LEGACY_MIGRATION_MAX.
//     Congelado: nenhuma migration nova recebe número sequencial.
//   - NOVO    `YYYYMMDDHHMMSS_descricao.sql` — carimbo UTC de 14 dígitos (momento de
//     CRIAÇÃO, não de merge) + descrição snake_case minúscula. Cada PR tem um
//     identificador próprio, então PRs paralelos deixam de disputar o mesmo número.
//
// O runner ordena pelo valor numérico do prefixo: as antigas (≤ 239) vêm sempre antes
// das por data (≥ 20261113000000), e os diretórios extras com namespace (`ee-NNN`)
// continuam por último.

/**
 * Número antigo mais alto, CONGELADO no dia da mudança de formato (2026-11-13,
 * release/v3.8.54 tip 2f2c1957: última migration `239_call_logs_pending_detail_index.sql`).
 * Daqui em diante toda migration nova usa o carimbo de data e hora. Um arquivo antigo
 * acima deste valor é recusado pelo gate, e um buraco entre o menor número antigo e este
 * valor (fora de KNOWN_GAPS) também — inclusive o próprio 239 sumindo.
 */
export const LEGACY_MIGRATION_MAX = 239;

/**
 * Número antigo mais baixo (`001_initial_schema.sql`). Fixo pelo mesmo motivo do topo:
 * apagar a PRIMEIRA migration também não pode passar despercebido.
 */
export const LEGACY_MIGRATION_MIN = 1;

/** Formato antigo: exatamente 3 dígitos (todas as 236 existentes têm 3). */
export const LEGACY_MIGRATION_RE = /^(\d{3})_(.+)\.sql$/;

/**
 * Formato novo: carimbo UTC de 14 dígitos + descrição snake_case minúscula que começa
 * com letra. Começar com letra mantém o invariante de #17186 (o `name` gravado no ledger
 * nunca começa com dígito) e impede nomes ambíguos como `20261113120000_239_x.sql`.
 */
export const TIMESTAMP_MIGRATION_RE = /^(\d{14})_([a-z][a-z0-9]*(?:_[a-z0-9]+)*)\.sql$/;

/** Descrição do formato novo (o mesmo trecho do regex acima, isolado). */
export const MIGRATION_DESCRIPTION_RE = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;

/** Tamanho máximo da descrição no formato novo (nome de arquivo legível em qualquer FS). */
export const MIGRATION_DESCRIPTION_MAX_LENGTH = 80;

/**
 * Menor carimbo aceito: o dia do corte. Uma migration "por data" anterior ao corte só
 * pode ser erro (relógio errado ou carimbo inventado à mão) e seria ordenada junto de
 * migrations que nunca existiram naquela época.
 */
export const MIGRATION_TIMESTAMP_MIN = "20261113000000";

/**
 * Tolerância de relógio para a regra "carimbo não futuro": 10 minutos. Cobre a
 * diferença normal entre o relógio da máquina que gerou o arquivo e o do CI. Um
 * carimbo mais adiantado que isso indica relógio errado ou carimbo digitado à mão,
 * e quebraria a premissa "carimbo = ordem de criação".
 */
export const MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS = 10 * 60 * 1000;

/** Dica impressa junto de todo nome recusado. */
export const NEW_MIGRATION_HINT = "npm run db:new-migration -- <descricao>";

/**
 * Motivo para um nome que não termina em `.sql` minúsculo. O runner só lê arquivos que
 * terminam exatamente em `.sql`: qualquer outra coisa no diretório seria ignorada em
 * silêncio (a migration nunca roda e o CI fica verde), então o gate recusa com o motivo.
 *
 * @param {string} filename
 * @returns {string}
 */
function describeNonSqlName(filename) {
  if (filename.startsWith(".")) {
    return "arquivo oculto: o diretório de migrations só aceita arquivos .sql visíveis";
  }
  if (/\s/.test(filename)) {
    return "nome com espaço: o runner só lê nomes que terminam exatamente em .sql";
  }
  if (/\.sql$/i.test(filename)) {
    return "extensão em maiúsculas (.SQL): o runner só lê arquivos terminados em .sql minúsculo";
  }
  if (/\.sql\./i.test(filename)) {
    return "extensão extra depois de .sql (ex.: .sql.bak): o runner ignora o arquivo";
  }
  return "não termina em .sql: o diretório de migrations só aceita arquivos .sql";
}

function pad(n, width) {
  return String(n).padStart(width, "0");
}

/**
 * Converte um carimbo `YYYYMMDDHHMMSS` em Date UTC, validando o calendário de verdade
 * (mês 01–12, dia existente no mês — inclusive 29/02 só em ano bissexto —, hora 00–23,
 * minuto e segundo 00–59). Devolve null para qualquer coisa inválida.
 *
 * @param {string} version
 * @returns {Date | null}
 */
export function parseMigrationTimestamp(version) {
  if (typeof version !== "string" || !/^\d{14}$/.test(version)) return null;
  const year = Number(version.slice(0, 4));
  const month = Number(version.slice(4, 6));
  const day = Number(version.slice(6, 8));
  const hour = Number(version.slice(8, 10));
  const minute = Number(version.slice(10, 12));
  const second = Number(version.slice(12, 14));
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (hour > 23 || minute > 59 || second > 59) return null;
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  // Ida e volta: Date.UTC normaliza 31/11 → 01/12; se o formato não bate, o dia não existe.
  if (formatMigrationTimestamp(date) !== version) return null;
  return date;
}

/**
 * Formata um Date como `YYYYMMDDHHMMSS` em UTC.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatMigrationTimestamp(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("formatMigrationTimestamp: data inválida");
  }
  return (
    pad(date.getUTCFullYear(), 4) +
    pad(date.getUTCMonth() + 1, 2) +
    pad(date.getUTCDate(), 2) +
    pad(date.getUTCHours(), 2) +
    pad(date.getUTCMinutes(), 2) +
    pad(date.getUTCSeconds(), 2)
  );
}

/**
 * Normaliza texto livre para a descrição snake_case minúscula do formato novo:
 * acentos removidos, qualquer caractere não alfanumérico vira `_`, sublinhados
 * colapsados e aparados, limite de MIGRATION_DESCRIPTION_MAX_LENGTH. Lança erro se
 * não sobrar nada.
 *
 * @param {string} text
 * @returns {string}
 */
export function normalizeMigrationDescription(text) {
  const normalized = String(text ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, MIGRATION_DESCRIPTION_MAX_LENGTH)
    .replace(/_+$/g, "");
  if (normalized.length === 0) {
    throw new Error("descrição de migration vazia: use letras ou números (ex.: add_usage_index)");
  }
  if (!/^[a-z]/.test(normalized)) {
    throw new Error(
      `descrição "${normalized}" precisa começar com letra (ex.: add_2fa_table, não 2fa_table)`
    );
  }
  return normalized;
}

/**
 * Classifica e valida um nome de arquivo `.sql` de migration. Usada pelo gate e pelo
 * gerador (o gerador valida o nome que vai criar).
 *
 * @param {string} filename  basename terminado em `.sql`
 * @param {{ now?: Date | number, legacyMax?: number }} [options]
 * Todo resultado `invalid` traz um `code` estável (o gate escolhe a dica pela classe):
 * `not-sql`, `legacy-zero`, `legacy-after-cut`, `no-prefix`, `prefix-length`, `separator`,
 * `description`, `description-length`, `bad-date`, `before-cut`, `future`, `format`.
 *
 * @returns {{ kind: "legacy", version: string, value: number, description: string }
 *   | { kind: "timestamp", version: string, value: number, description: string, date: Date }
 *   | { kind: "invalid", code: string, reason: string }}
 */
export function classifyMigrationFilename(filename, options = {}) {
  const legacyMax = options.legacyMax ?? LEGACY_MIGRATION_MAX;
  const nowMs =
    options.now === undefined
      ? Date.now()
      : options.now instanceof Date
        ? options.now.getTime()
        : Number(options.now);

  if (typeof filename !== "string") {
    return { kind: "invalid", code: "not-sql", reason: "nome ausente" };
  }
  if (!filename.endsWith(".sql") || filename.startsWith(".") || /\s/.test(filename)) {
    return { kind: "invalid", code: "not-sql", reason: describeNonSqlName(filename) };
  }

  const legacy = filename.match(LEGACY_MIGRATION_RE);
  if (legacy) {
    const value = Number.parseInt(legacy[1], 10);
    if (value < 1) {
      return {
        kind: "invalid",
        code: "legacy-zero",
        reason: "número antigo 000 não existe (a série começa em 001)",
      };
    }
    if (value > legacyMax) {
      return {
        kind: "invalid",
        code: "legacy-after-cut",
        reason:
          `número antigo ${legacy[1]} depois do corte (LEGACY_MIGRATION_MAX=${legacyMax}): ` +
          `migrations novas usam YYYYMMDDHHMMSS_descricao.sql`,
      };
    }
    return { kind: "legacy", version: legacy[1], value, description: legacy[2] };
  }

  const prefix = filename.match(/^(\d+)(.*)$/);
  if (!prefix) {
    return {
      kind: "invalid",
      code: "no-prefix",
      reason: "sem prefixo numérico (esperado YYYYMMDDHHMMSS_descricao.sql)",
    };
  }
  const digits = prefix[1];
  const rest = prefix[2];
  if (digits.length !== 14) {
    return {
      kind: "invalid",
      code: "prefix-length",
      reason:
        `prefixo com ${digits.length} dígito(s): use 14 (YYYYMMDDHHMMSS, UTC) para ` +
        `migrations novas — o formato de 3 dígitos é só das antigas 001–${pad(legacyMax, 3)}`,
    };
  }
  if (!rest.startsWith("_")) {
    return {
      kind: "invalid",
      code: "separator",
      reason: "separador inválido depois do carimbo (esperado `_`, ex.: 20261113120000_add_x.sql)",
    };
  }
  const description = rest.slice(1, -".sql".length);
  if (!MIGRATION_DESCRIPTION_RE.test(description)) {
    return {
      kind: "invalid",
      code: "description",
      reason:
        `descrição "${description}" fora do padrão: snake_case minúsculo começando ` +
        `com letra (a-z, 0-9 e _ entre palavras)`,
    };
  }
  if (description.length > MIGRATION_DESCRIPTION_MAX_LENGTH) {
    return {
      kind: "invalid",
      code: "description-length",
      reason: `descrição com ${description.length} caracteres (máximo ${MIGRATION_DESCRIPTION_MAX_LENGTH})`,
    };
  }
  const date = parseMigrationTimestamp(digits);
  if (!date) {
    return {
      kind: "invalid",
      code: "bad-date",
      reason: `carimbo ${digits} não é uma data/hora UTC válida (YYYYMMDDHHMMSS)`,
    };
  }
  if (digits < MIGRATION_TIMESTAMP_MIN) {
    return {
      kind: "invalid",
      code: "before-cut",
      reason: `carimbo ${digits} anterior ao corte do formato (${MIGRATION_TIMESTAMP_MIN})`,
    };
  }
  if (date.getTime() > nowMs + MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS) {
    return {
      kind: "invalid",
      code: "future",
      reason:
        `carimbo ${digits} no futuro (agora ${formatMigrationTimestamp(new Date(nowMs))} UTC, ` +
        `tolerância ${MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS / 60000} min)`,
    };
  }
  if (!TIMESTAMP_MIGRATION_RE.test(filename)) {
    // Defesa em profundidade: as checagens acima devem ser equivalentes ao regex.
    return {
      kind: "invalid",
      code: "format",
      reason: "nome fora do formato YYYYMMDDHHMMSS_descricao.sql",
    };
  }
  return { kind: "timestamp", version: digits, value: Number(digits), description, date };
}

/**
 * Atalho booleano + motivo para quem só precisa saber se o nome passa.
 *
 * @param {string} filename
 * @param {{ now?: Date | number, legacyMax?: number }} [options]
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
export function validateMigrationFilename(filename, options = {}) {
  const result = classifyMigrationFilename(filename, options);
  return result.kind === "invalid" ? { ok: false, reason: result.reason } : { ok: true };
}
