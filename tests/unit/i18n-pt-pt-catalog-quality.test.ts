// Guards the European Portuguese (`pt`) UI catalog against regressions found while
// reviewing PR #18493: lower-cased standalone labels, machine-translated literal tokens,
// and "solicitações" swapped for "pedidos" without fixing the gender agreement.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

type Catalog = { [key: string]: string | Catalog };

function flatten(node: Catalog, prefix = "", out: Record<string, string> = {}) {
  for (const [key, value] of Object.entries(node)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") out[full] = value;
    else flatten(value, full, out);
  }
  return out;
}

function readCatalog(locale: string): Record<string, string> {
  const file = path.join(REPO_ROOT, "src/i18n/messages", `${locale}.json`);
  return flatten(JSON.parse(fs.readFileSync(file, "utf8")) as Catalog);
}

const pt = readCatalog("pt");
const en = readCatalog("en");

test("pt: standalone common labels keep the capital of the English source", () => {
  const labels = [
    "common.save",
    "common.delete",
    "common.loading",
    "common.refresh",
    "common.manage",
    "common.provider",
    "common.connected",
    "common.disconnected",
    "common.selectOption",
  ];
  for (const key of labels) {
    assert.match(en[key], /^[A-Z]/, `${key} English source should be capitalised`);
    assert.match(pt[key], /^[A-ZÀ-Ú]/, `${key} should start upper-case, got "${pt[key]}"`);
  }
});

test("pt: literal tokens from the English source survive translation", () => {
  const cases: Array<[string, string]> = [
    ["settings.modalityBridgeVideoRuntimeInstall", "PATH"],
    ["settings.reasoningTokenBufferDesc", "max_tokens"],
    ["settings.proxySubscription.localCoreEndpointPlaceholder", "socks5://"],
    ["limits.tokensPerMinute", "Tokens/min"],
  ];
  for (const [key, token] of cases) {
    assert.ok(en[key].includes(token), `${key} English source should contain ${token}`);
    assert.ok(pt[key].includes(token), `${key} should keep "${token}", got "${pt[key]}"`);
  }
});

test("pt: 'pedido' (masculine) never takes a feminine determiner", () => {
  const feminine =
    /\b(as|às|das|nas|pelas|todas|essas|estas|outras|algumas|várias|muitas|uma|nenhuma|da|na|pela)\s+pedidos?\b/i;
  const offenders = Object.entries(pt)
    .filter(([, value]) => feminine.test(value))
    .map(([key, value]) => `${key}: ${value}`);
  assert.deepEqual(offenders, []);
});

test("pt: 'Exclude' is translated as exclude, not delete", () => {
  for (const key of ["common.excludeDomains", "search.excludeDomains"]) {
    assert.equal(en[key], "Exclude Domains");
    assert.doesNotMatch(pt[key], /elimin/i, `${key} should not say "eliminar"`);
  }
});

test("pt: no Brazilian-only wording leaks back into the European Portuguese catalog", () => {
  // PT-BR forms with an unambiguous PT-PT counterpart (a carregar / equipa / guardar / gerir / o senhor).
  const brazilian = /\b(Carregando|Salvando|Excluindo|Equipe|Você|Salvar|Gerenciar)\b/;
  const offenders = Object.entries(pt)
    .filter(([, value]) => brazilian.test(value))
    .map(([key, value]) => `${key}: ${value}`);
  assert.deepEqual(offenders, []);
});
