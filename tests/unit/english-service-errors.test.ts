// API errors, logs and thrown errors are part of the operator-facing contract and must be
// English. German and Portuguese literals had leaked into provider validation, service
// install/start routes, the conductor bridge, memory summarization and the SQLite fallback.
// This guard fails if a distinctive legacy fragment returns or if accented Latin letters
// reappear in any scoped file. Translation only: codes, placeholders and control flow stay put.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRepoFile(relativePath: string): string {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const PROVIDER_VALIDATION = "src/lib/providers/validation/chatgptWebCodex.ts";
const PROVIDERS_ROUTE = "src/app/api/providers/route.ts";
const PROVIDER_BY_ID_ROUTE = "src/app/api/providers/[id]/route.ts";
const INSTALLER_UTILS = "src/lib/services/installers/utils.ts";
const SINGBOX_INSTALLER = "src/lib/services/installers/singbox.ts";
const SUMMARIZATION = "src/lib/memory/summarization.ts";
const BRIDGE = "src/lib/conductor/bridge.ts";
const DB_CORE = "src/lib/db/core.ts";
const NINEROUTER_STATUS = "src/app/api/services/9router/status/route.ts";

const INSTALLER_MODULES = [
  "src/lib/services/installers/bifrost.ts",
  "src/lib/services/installers/dario.ts",
  "src/lib/services/installers/llmlingua.ts",
  "src/lib/services/installers/mux.ts",
  "src/lib/services/installers/ninerouter.ts",
  "src/lib/services/installers/openwa.ts",
];

// [directory, legacy "not installed" message]
const SERVICE_INSTALL_MESSAGES: Array<[string, string]> = [
  ["9router", "9router não está instalado."],
  ["bifrost", "Bifrost não está instalado."],
  ["cliproxy", "CLIProxyAPI não está instalado."],
  ["dario", "Dario não está instalado."],
  ["llmlingua", "LLMLingua não está instalado."],
  ["mux", "Mux não está instalado."],
  ["openwa", "open-wa não está instalado."],
  ["singbox", "sing-box não está instalado."],
];

const SCOPED_FILES = [
  PROVIDER_VALIDATION,
  PROVIDERS_ROUTE,
  PROVIDER_BY_ID_ROUTE,
  INSTALLER_UTILS,
  ...INSTALLER_MODULES,
  SINGBOX_INSTALLER,
  ...SERVICE_INSTALL_MESSAGES.flatMap(([dir]) => [
    `src/app/api/services/${dir}/start/route.ts`,
    `src/app/api/services/${dir}/restart/route.ts`,
  ]),
  NINEROUTER_STATUS,
  SUMMARIZATION,
  BRIDGE,
  DB_CORE,
];

const SERVICE_ROUTE_FRAGMENTS: Array<[string, string]> = SERVICE_INSTALL_MESSAGES.flatMap(
  ([dir, legacy]) => [
    [`src/app/api/services/${dir}/start/route.ts`, legacy],
    [`src/app/api/services/${dir}/restart/route.ts`, legacy],
  ]
);

// Distinctive fragments, each tied to the file it used to live in.
const LEGACY_FRAGMENTS: Array<[string, string]> = [
  [PROVIDER_VALIDATION, "Für die Browserprüfung"],
  [PROVIDER_VALIDATION, "Der ChatGPT-Custom-Connector ist erforderlich."],
  [PROVIDER_VALIDATION, "Tunnel-ID und Runtime-Key müssen gemeinsam gültig konfiguriert werden."],
  [PROVIDER_VALIDATION, "Kein unterstütztes Chrome oder Chromium gefunden."],
  [PROVIDERS_ROUTE, "Die ChatGPT-Browserprüfung konnte nicht abgeschlossen werden."],
  [PROVIDER_BY_ID_ROUTE, "Die ChatGPT-Browserprüfung konnte nicht abgeschlossen werden."],
  [INSTALLER_UTILS, "Sem permissão para instalar."],
  [INSTALLER_UTILS, "não está disponível no PATH."],
  [INSTALLER_UTILS, "Espaço em disco insuficiente."],
  [INSTALLER_UTILS, "Instalação demorou demais."],
  [INSTALLER_UTILS, "Falha de rede ao instalar."],
  [INSTALLER_UTILS, "Falha na instalação:"],
  ...INSTALLER_MODULES.map((file): [string, string] => [
    file,
    "instalado mas versão não pôde ser lida.",
  ]),
  [SINGBOX_INSTALLER, "não tem checksum verificado"],
  [SINGBOX_INSTALLER, "Falha ao baixar o binário do sing-box."],
  [SINGBOX_INSTALLER, "Apenas a versão fixada do sing-box"],
  [SINGBOX_INSTALLER, "Falha na verificação de integridade"],
  [SINGBOX_INSTALLER, "Binário do sing-box não encontrado"],
  ...SERVICE_ROUTE_FRAGMENTS,
  [NINEROUTER_STATUS, "Gravar no audit log"],
  [SUMMARIZATION, "Resumo de ${candidates.length} memórias"],
  [BRIDGE, "hub respondeu HTTP"],
  [BRIDGE, "conectado ao hub"],
  [BRIDGE, "stream encerrado pelo hub"],
  [BRIDGE, "reconectando em ${wait}ms"],
  [DB_CORE, "Nenhum driver SQLite disponível"],
  [DB_CORE, "Drivers testados:"],
  [DB_CORE, "Chame ensureDbInitialized() no startup."],
  [DB_CORE, "sql.js WASM ainda não foi pré-inicializado."],
  [DB_CORE, "Tenta drivers síncronos primeiro"],
];

test("no legacy Portuguese or German error literals remain in the scoped files", () => {
  const remaining: string[] = [];
  for (const [relativePath, fragment] of LEGACY_FRAGMENTS) {
    if (readRepoFile(relativePath).includes(fragment)) {
      remaining.push(`${relativePath}: ${fragment}`);
    }
  }
  assert.deepEqual(remaining, []);
});

test("scoped files contain no accented Latin letters", () => {
  const offenders: string[] = [];
  for (const relativePath of SCOPED_FILES) {
    readRepoFile(relativePath)
      .split("\n")
      .forEach((line, index) => {
        if (/[\u00C0-\u024F\u1E00-\u1EFF]/.test(line))
          offenders.push(`${relativePath}:${index + 1}`);
      });
  }
  assert.deepEqual(offenders, []);
});

test("English replacements keep each message, placeholder and meaning", () => {
  assert.match(
    readRepoFile(PROVIDER_VALIDATION),
    /A fresh ChatGPT cookie or a saved browser state is required for browser validation\./
  );
  assert.match(readRepoFile(PROVIDER_VALIDATION), /The ChatGPT custom connector is required\./);
  assert.match(
    readRepoFile(PROVIDER_VALIDATION),
    /Tunnel ID and runtime key must both be configured with valid values\./
  );
  assert.match(
    readRepoFile(PROVIDER_VALIDATION),
    /No supported Chrome or Chromium was found\. Install Chromium or configure the browser path\./
  );
  for (const file of [PROVIDERS_ROUTE, PROVIDER_BY_ID_ROUTE]) {
    assert.match(readRepoFile(file), /The ChatGPT browser validation could not be completed\./);
  }

  const utils = readRepoFile(INSTALLER_UTILS);
  assert.match(
    utils,
    /Permission denied while installing\. Check the permissions of the data folder\./
  );
  assert.match(utils, /Node\.js\/npm is not available on PATH\. Install Node ≥22\.22\.2\./);
  assert.match(utils, /Insufficient disk space\./);
  assert.match(utils, /Installation took too long\. Please try again\./);
  assert.match(utils, /Network error while installing\. Check your connection and try again\./);
  assert.match(utils, /Installation failed: \$\{raw\}/);

  for (const [index, name] of [
    "Bifrost",
    "Dario",
    "LLMLingua",
    "Mux",
    "9router",
    "open-wa",
  ].entries()) {
    const file = INSTALLER_MODULES[index];
    assert.match(
      readRepoFile(file),
      new RegExp(`${name} is installed, but its version could not be read\\.`)
    );
  }

  const singbox = readRepoFile(SINGBOX_INSTALLER);
  assert.match(singbox, /sing-box has no verified checksum for this platform \(FreeBSD\)\./);
  assert.match(
    singbox,
    /Failed to download the sing-box binary\. Check your connection and try again\./
  );
  assert.match(singbox, /sing-box has no verified checksum for \$\{key\}\./);
  assert.match(
    singbox,
    /Only the pinned version of sing-box \(\$\{SINGBOX_PINNED_VERSION\}\) has a verified checksum\./
  );
  assert.match(singbox, /Integrity verification failed for the downloaded sing-box binary\./);
  assert.match(singbox, /sing-box binary not found after extracting the package\./);

  for (const [dir, _legacy] of SERVICE_INSTALL_MESSAGES) {
    for (const action of ["start", "restart"]) {
      const file = `src/app/api/services/${dir}/${action}/route.ts`;
      assert.match(readRepoFile(file), /is not installed\./, file);
    }
  }

  assert.match(
    readRepoFile(SUMMARIZATION),
    /Summary of \$\{candidates\.length\} memories \(>\$\{days\} days\):/
  );
  assert.match(readRepoFile(BRIDGE), /hub responded with HTTP \$\{res\.status\}/);
  assert.match(readRepoFile(BRIDGE), /connected to hub \(last_event_id=\$\{since\}\)/);
  assert.match(readRepoFile(BRIDGE), /stream closed by hub/);
  assert.match(readRepoFile(BRIDGE), /connection dropped \(.*\) — reconnecting in \$\{wait\}ms/);

  const core = readRepoFile(DB_CORE);
  assert.match(core, /\[DB\] No SQLite driver available for '\$\{sqliteFile\}'\. /);
  assert.match(core, /Drivers tried: \$\{syncDrivers\}/);
  assert.match(core, /sql\.js \(failed: \$\{preInitError\}\)\./);
  assert.match(core, /Call ensureDbInitialized\(\) at startup\. /);
  assert.match(core, /sql\.js WASM has not been pre-initialized yet\./);
});

test("translation preserves HTTP status codes", () => {
  for (const [dir, _legacy] of SERVICE_INSTALL_MESSAGES) {
    for (const action of ["start", "restart"]) {
      const file = `src/app/api/services/${dir}/${action}/route.ts`;
      assert.match(readRepoFile(file), /status: 409/, file);
    }
  }
  const utils = readRepoFile(INSTALLER_UTILS);
  for (const status of [403, 500, 507, 504, 503]) {
    assert.match(utils, new RegExp(`\\b${status}\\b`));
  }
});
