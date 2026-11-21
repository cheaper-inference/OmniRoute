#!/usr/bin/env node
// scripts/check/check-public-creds.mjs
// Security gate — CLAUDE.md Hard Rule #11.
//
// Public upstream credentials (OAuth client_id/client_secret of public CLIs
// + Firebase web keys) DEVEM ser embutidas via `resolvePublicCred()` /
// `resolvePublicCredMulti()` (from open-sse/utils/publicCreds.ts), NEVER as a string
// literal in code. See docs/security/PUBLIC_CREDS.md.
//
// Literais embutidos (a) disparam scanners de secret/CodeQL a cada release, gerando
// noise, and (b) they couple the value to the source text instead of the central decoder —
// if upstream rotates the public client_id, there are N copies to update and the
// `process.env` override stops being the single source of truth.
//
// This gate scans the files that load credential configuration and blocks
// ANY NEW assignment of a credential key to a non-empty literal string.
// Pre-existing literals (audited below) are frozen at
// KNOWN_LITERAL_CREDS for the gate to exit 0 today and block regressions.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();

// 6A.8: Instead of a static hardcoded list, scan the two credential-bearing subtrees
// dynamically so new files (new executor, new OAuth provider) are caught automatically.
// Anchor files (providerRegistry.ts, oauth.ts) are the canonical credential config;
// the broader scan covers new additions in open-sse/ and src/lib/oauth/.
// Exclusions: test files, node_modules, .next.
const SCAN_ROOTS = [path.join(cwd, "open-sse"), path.join(cwd, "src", "lib", "oauth")];

function walkTs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && e.name !== ".next") walkTs(p, acc);
    } else if (/\.tsx?$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) {
      acc.push(p);
    }
  }
  return acc;
}

function collectScannedFiles() {
  const files = [];
  for (const root of SCAN_ROOTS) {
    for (const abs of walkTs(root)) {
      files.push(path.relative(cwd, abs).replace(/\\/g, "/"));
    }
  }
  return files;
}

// Object keys whose value is a credential. Assign any of these to a
// Non-empty string literal violates Hard Rule #11.
//   - clientIdDefault / clientSecretDefault: forma do providerRegistry (entry.oauth)
//   - clientId / clientSecret: forma dos *_CONFIG em oauth.ts
//   - apiKey / apiKeyDefault: embedded API keys (same principle)
const CRED_KEY_RE =
  /(?:^|[\s{,([])(clientIdDefault|clientSecretDefault|clientId|clientSecret|apiKeyDefault|apiKey)\s*:/;

// Environment keys (clientIdEnv, clientSecretEnv, …) end in "Env" and carry
// the NAME of the environment variable, not the credential — they should never be flagged.
const ENV_KEY_RE = /(clientId|clientSecret|apiKey)Env\s*:/;

// Audited pre-existing literals (DISCOVERY 2026-06-09). Each is a credential
// built-in upstream public BEFORE this gate exists. They stay frozen here for
// the turnstile should now exit 0 and block ANY NEW literal. EACH ONE is a Rule #11
// security Rule #11 to be migrated to resolvePublicCred() — DO NOT add new ones
// without justification; that is the point of the gate.
//
// The allowlist matches by LITERAL VALUE (the same public client_id appears in both
// files, so freezing by value covers both copies). To freeze a value
// only in a specific file:line, use the key "file:line:value".
//
// All five public client_ids (9 call-sites) were migrated to resolvePublicCred() in
// #3493 (embedded as claude_id/codex_id/qwen_id/kimi_id/github_copilot_id in
// open-sse/utils/publicCreds.ts), matching the Gemini/Antigravity pattern.
//
// 6A.8: Expanded scope to open-sse/** + src/lib/oauth/**. Newly discovered FPs:
//
//   open-sse/services/usage/minimax.ts L213: `getMiniMaxUsage(apiKey: string, provider: "minimax" | "minimax-cn")`
//   The CRED_KEY_RE matches `apiKey:` in the TypeScript function-parameter type annotation.
//   "minimax" and "minimax-cn" are provider-name strings in the type annotation, NOT credentials.
//   This is a false positive (the gate was designed for object-literal assignments, not fn params).
//   TODO(6A.8): Consider tightening CRED_KEY_RE to exclude function-signature contexts — but
//   that adds complexity; the FP rate is low (1 file). Frozen by file:line:value key.
//   The MiniMax family was extracted from services/usage.ts into services/usage/minimax.ts
//   (god-file decomposition), so the FP moved with the getMiniMaxUsage signature.
//
//   open-sse/executors/zcodeProtocol.ts L336: `clientId: \`omniroute-${process.pid}\``
//   is the per-process identifier in the local ZCode app-server handshake. It is
//   generated from the process PID, is not an upstream OAuth/client credential, and
//   must remain visible in the wire contract. Frozen by file:line:value key.
//   NOTE: the key includes the LINE, so any edit that shifts this statement breaks
//   the gate twice over — a stale-entry error plus a "new violation" for the same
//   literal. That happened again at L313 -> L336 (#13963, win32 shell:true spawn
//   fix). Re-point the line; do not remove the entry.
export const KNOWN_LITERAL_CREDS = new Set([
  "open-sse/services/usage/minimax.ts:213:minimax", // TODO(6A.8): pre-existing FP — TS fn-param type, not a credential (getMiniMaxUsage signature)
  "open-sse/services/usage/minimax.ts:213:minimax-cn", // TODO(6A.8): pre-existing FP — TS fn-param type, not a credential (getMiniMaxUsage signature)
  "open-sse/executors/zcodeProtocol.ts:336:omniroute-${process.pid}", // local per-process ZCode handshake ID, not an upstream credential
]);

/**
 * Finds assignments of a credential key to a non-empty literal string.
 *
 * Pure: Receives the source text and the allowlist, and returns the list of violations. Does not affect
 * I/O. Each violation is "L<line>: <key> = \"<literal>\"".
 *
 * Detection rules (line by line):
 *   1. The line needs to assign one of the CRED_KEYS (clientIdDefault, clientId, …)
 *      and not be an *Env key (which only carries the name of the env-var).
 *   2. If the RHS calls resolvePublicCred()/resolvePublicCredMulti(), it is CORRECT
 *      (The literal there is the KEY of the embedded default, not the credential) → ignore.
 *   3. Otherwise, any NON-EMPTY literal string in the RHS is a violation
 *      — cobre tanto `key: "literal"` quanto `key: process.env.X || "literal"`.
 * 4. Empty literals (""/'') are legitimate fallback of process.env → ignored.
 *   5. Literals present in the allowlist (by value OR by key "file:line:value")
 *      ficam congelados → ignorados.
 *
 * @param {string} source  file content
 * @param {Set<string>} allowlist  frozen literal values (or file:line:value keys)
 * @param {string} [relFile]  relative path of the file (for file:line:value keys)
 * @returns {string[]} readable violations
 */
export function findLiteralCreds(source, allowlist, relFile = "") {
  const violations = [];
  const lines = String(source).split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const keyMatch = CRED_KEY_RE.exec(line);
    if (!keyMatch) continue;
    if (ENV_KEY_RE.test(line)) continue;
    const key = keyMatch[1];

    // RHS = everything after the first ":" in the credential key.
    const colonIdx = line.indexOf(":", keyMatch.index);
    const rhs = colonIdx >= 0 ? line.slice(colonIdx + 1) : line;

    // Correct form: embedded via central decoder. Does not inspect literals.
    if (/resolvePublicCred(?:Multi)?\s*\(/.test(rhs)) continue;

    // Extrai todo literal de string do RHS (aspas simples, duplas ou crase).
    const litRe = /(["'`])((?:\\.|(?!\1).)*)\1/g;
    let lit;
    while ((lit = litRe.exec(rhs))) {
      const value = lit[2];
      if (!value) continue; // "" / '' — legitimate env fallback
      const lineNo = i + 1;
      const fileLineKey = relFile ? `${relFile}:${lineNo}:${value}` : "";
      if (allowlist.has(value)) continue;
      if (fileLineKey && allowlist.has(fileLineKey)) continue;
      violations.push(`L${lineNo}: ${key} = ${JSON.stringify(value)}`);
    }
  }
  return violations;
}

function main() {
  const scannedFiles = collectScannedFiles();

  // 6A.8: stale-allowlist enforcement.
  // Compute all live violations WITHOUT the allowlist, then check for stale entries.
  const liveViolationKeys = new Set();
  for (const rel of scannedFiles) {
    const src = fs.readFileSync(path.join(cwd, rel), "utf8");
    for (const v of findLiteralCreds(src, new Set(), rel)) {
      // v is like "L543: apiKey = \"minimax\"" — generate the same file:line:value key
      // that the allowlist uses so stale detection matches by canonical key form.
      const lineMatch = v.match(/^L(\d+):/);
      const lineNo = lineMatch ? lineMatch[1] : "?";
      const valMatch = v.match(/"([^"]+)"$/);
      const val = valMatch ? valMatch[1] : v;
      liveViolationKeys.add(`${rel}:${lineNo}:${val}`);
      liveViolationKeys.add(val); // also track plain value for backward compat
    }
  }
  assertNoStale(KNOWN_LITERAL_CREDS, liveViolationKeys, "check-public-creds");

  const allMisses = [];
  for (const rel of scannedFiles) {
    const src = fs.readFileSync(path.join(cwd, rel), "utf8");
    for (const v of findLiteralCreds(src, KNOWN_LITERAL_CREDS, rel)) {
      allMisses.push(`${rel} ${v}`);
    }
  }
  if (allMisses.length) {
    console.error(
      `[check-public-creds] ${allMisses.length} public credential(s) as string literal ` +
        `(viola CLAUDE.md Hard Rule #11):\n` +
        allMisses.map((m) => "  ✗ " + m).join("\n") +
        `\n  → embuta via resolvePublicCred()/resolvePublicCredMulti() ` +
        `(open-sse/utils/publicCreds.ts). Ver docs/security/PUBLIC_CREDS.md.\n` +
        `  → if it is a pre-existing literal that has already been audited, freeze it in KNOWN_LITERAL_CREDS ` +
        `with justification (and open migration tracking).`
    );
    process.exit(1);
  }
  if (process.exitCode === 1) return; // stale entries already logged
  console.log(
    `[check-public-creds] OK (${scannedFiles.length} file(s) in ${SCAN_ROOTS.length} root(s), ` +
      `${KNOWN_LITERAL_CREDS.size} literal(is) congelado(s))`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
