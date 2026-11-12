import test from "node:test";
import assert from "node:assert/strict";
import {
  htmlStructureProblems,
  validateTranslatedChunk,
} from "../../scripts/i18n/run-translation.mjs";

const TRAE = "Authorization: Cloud-IDE-JWT <token>";
const CLARIFAI = "Authorization: Key <token>";
const HEADERS = [TRAE, CLARIFAI];
const wrappers = ["", "'", '"', "`", "``"];

function accepts(source, output) {
  assert.deepEqual(htmlStructureProblems(source, output), []);
  assert.deepEqual(validateTranslatedChunk(source, output), { text: output, problems: [] });
}

function rejects(source, output) {
  assert.ok(validateTranslatedChunk(source, output).problems.length > 0);
}

test("preserves the real Trae authorization example when quotes become inline code", () => {
  const source =
    "Trae is an AI-native IDE by ByteDance (SOLO remote agent). Authorize via trae.ai in the popup, or sign in at solo.trae.ai and paste the Cloud-IDE-JWT (sent as 'Authorization: Cloud-IDE-JWT <token>', ~14-day lifetime) as the access token; web_id/biz_user_id/user_unique_id/scope/tenant/region propagate via providerSpecificData. No headless refresh for pasted tokens — re-paste on expiry.";
  accepts(source, source.replace(`'${TRAE}'`, `\`${TRAE}\``));
});

test("preserves the real Clarifai authorization example when prose becomes inline code", () => {
  const source =
    "Use your Clarifai PAT or app-specific API key. OmniRoute targets the OpenAI-compatible endpoint at https://api.clarifai.com/v2/ext/openai/v1 and authenticates with Authorization: Key <token>.";
  accepts(source, source.replace(CLARIFAI, `\`${CLARIFAI}\``));
});

test("preserves either exact header across valid quote and backtick wrappers", () => {
  for (const header of HEADERS) {
    for (const before of wrappers) {
      for (const after of wrappers) {
        accepts(`Header: ${before}${header}${before}.`, `Cabeçalho: ${after}${header}${after}.`);
      }
    }
  }
});

test("compares a multiset of exact headers independently of order and wrappers", () => {
  const source = `First: '${TRAE}'; second: ${CLARIFAI}; third: '${TRAE}'.`;
  const output = `Segundo: \`${CLARIFAI}\`; primeiro: \`${TRAE}\`; terceiro: \`${TRAE}\`.`;
  accepts(source, output);
});

test("rejects a missing known authorization header", () => {
  for (const header of HEADERS) rejects(`Header: ${header}.`, "Cabeçalho ausente.");
});

test("rejects changes to the literal authorization name or known scheme", () => {
  for (const header of HEADERS) {
    for (const output of [
      header.replace("Authorization", "X-Authorization"),
      header.replace("Authorization", "authorization"),
      header.replace(": ", ":"),
      header.replace(header === TRAE ? "Cloud-IDE-JWT" : "Key", "Bearer"),
    ]) {
      rejects(`Header: ${header}.`, `Header: ${output}.`);
    }
  }
});

test("rejects changed or malformed token placeholders in a known header", () => {
  for (const header of HEADERS) {
    for (const token of ["<secret>", "<Token>", "token", "<token extra>", "<token/>"]) {
      rejects(`Header: ${header}.`, `Header: ${header.replace("<token>", token)}.`);
    }
  }
});

test("rejects duplicated known headers even when all occurrences are inline code", () => {
  for (const header of HEADERS) {
    rejects(`Header: \`${header}\`.`, `Header: \`${header}\` and \`${header}\`.`);
  }
});

test("still rejects changed real HTML tags beside an unchanged header", () => {
  for (const header of HEADERS) {
    const source = `<strong>Header</strong>: ${header}.`;
    rejects(source, `<em>Header</em>: ${header}.`);
    rejects(source, `<strong>Header: ${header}.`);
    rejects(source, `<strong><em>Header</strong></em>: ${header}.`);
  }
});

test("still rejects missing or code-wrapped generic token tags outside known headers", () => {
  for (const header of HEADERS) {
    const source = `Header: ${header}. Other placeholder: <token>.`;
    rejects(source, `Header: ${header}. Other placeholder: absent.`);
    rejects(source, `Header: ${header}. Other placeholder: \`<token>\`.`);
  }
});

test("does not exempt placeholders in an unknown authorization scheme", () => {
  const header = "Authorization: Bearer <token>";
  rejects(`Header: ${header}.`, `Header: \`${header}\`.`);
});

test("does not exempt a known-looking header embedded in another header name", () => {
  for (const header of HEADERS) {
    rejects(`Header: X-${header}.`, `Header: \`X-${header}\`.`);
  }
});

test("continues preserving unrelated inline code beside known headers", () => {
  for (const header of HEADERS) {
    rejects(
      `Run \`npm ci\`, then use '${header}'.`,
      `Rode \`npm install\`, depois use '${header}'.`
    );
    rejects(`Example: \`prefix ${header}\`.`, `Exemplo: prefix ${header}.`);
  }
});

test("returns each unchanged authorization example without rewriting its wrappers", () => {
  for (const header of HEADERS) {
    for (const wrapper of wrappers) {
      const source = `Header: ${wrapper}${header}${wrapper}.`;
      accepts(source, source);
    }
  }
});

test("does not exempt nonliteral headers after inline-code whitespace normalization", () => {
  for (const header of HEADERS) {
    for (const changed of [
      header.replace(": ", ":  "),
      header.replace(": ", ":\t"),
      header.replace(" <token>", "  <token>"),
      header.replace(" <token>", "\t<token>"),
    ]) {
      rejects(`Example: \`${changed}\`.`, "Exemplo omitido.");
    }
  }
});
