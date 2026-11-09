import { isRequireApiKeyValueEnabled } from "../../../src/shared/utils/requireApiKeyValue.mjs";

/**
 * Keys a `.env` in the current working directory may set.
 *
 * The CLI also reads `<cwd>/.env`, so running any `omniroute` command inside a
 * directory someone else controls (a cloned repo, an extracted archive) lets
 * that file write into the CLI's environment, and `omniroute serve` passes that
 * environment on to the server and every process the server spawns. Hundreds
 * of variables decide which code runs, which files are read, which hosts get a
 * stored credential, which TLS roots are trusted or which policy applies, and
 * new ones are added all the time, so the file may set only the keys below.
 * Every other line is skipped, and the CLI prints a warning naming the skipped
 * keys. The data-directory `.env`, the package `.env` and the shell
 * environment can still set every key.
 *
 * A key is listed only when no value it accepts can load code, pick a file,
 * name a remote host, change TLS or relax a security policy. Values are
 * checked too: ports must be numbers, and locale and time zone names may not
 * be paths. The ports still decide which local port the CLI talks to, and so
 * which local listener gets the API key, the context token and the CLI
 * machine token (`x-omniroute-cli-token`).
 */

const PORT_VALUE = /^[0-9]{1,5}$/;
// Locale names such as `en_US.UTF-8` or `de_DE@euro`. glibc reads a name that
// contains a slash as a path to locale files, so slashes are not allowed.
const LOCALE_VALUE = /^[A-Za-z0-9_.@-]{1,64}$/;
// LANGUAGE is a `:`-separated list of locale names.
const LOCALE_LIST_VALUE = /^[A-Za-z0-9_.@:-]{1,64}$/;
// IANA names such as `Europe/Berlin` or `UTC`, and offset names such as
// `EST5EDT`. A leading `:` or `/`, or `..`, would make TZ a path to a zone
// file, so the value may not start with either and may not contain a dot.
// That also rejects the `:Area/City` form and POSIX rules with `,` or `<>`.
const TZ_VALUE = /^[A-Za-z0-9_+-][A-Za-z0-9_+/-]{0,63}$/;
const FLAG_VALUE = /^[A-Za-z0-9]{0,16}$/;
function isPort(value) {
  if (!PORT_VALUE.test(value)) return false;
  const n = Number(value);
  return n >= 1 && n <= 65535;
}

const PORT_RULE = { check: isPort, expected: "a port number from 1 to 65535" };
const LOCALE_RULE = { check: (v) => LOCALE_VALUE.test(v), expected: "a locale name" };
const FLAG_RULE = { check: (v) => FLAG_VALUE.test(v), expected: "up to 16 letters or digits" };

/** Allowed keys, each with the check its value must pass. */
const ALLOWED = new Map([
  // The local ports the server listens on and the CLI talks to.
  ["PORT", PORT_RULE],
  ["API_PORT", PORT_RULE],
  ["DASHBOARD_PORT", PORT_RULE],
  // The parser the server gate uses, so the file can turn enforcement on but
  // never off, and a value that already turned it on is not dropped on upgrade.
  ["REQUIRE_API_KEY", { check: isRequireApiKeyValueEnabled, expected: "true, 1 or yes" }],
  // Display only.
  ["LANG", LOCALE_RULE],
  ["LANGUAGE", { check: (v) => LOCALE_LIST_VALUE.test(v), expected: "a list of locale names" }],
  ["LC_ALL", LOCALE_RULE],
  ["LC_MESSAGES", LOCALE_RULE],
  ["TZ", { check: (v) => TZ_VALUE.test(v), expected: "a zone name such as Europe/Berlin" }],
  ["NO_COLOR", FLAG_RULE],
  ["FORCE_COLOR", FLAG_RULE],
]);

export const UNTRUSTED_CWD_ENV_ALLOWLIST = Object.freeze([...ALLOWED.keys()]);

/**
 * An environment variable name a `.env` line may use. `process.env` passes
 * names to the C library, which stops at a NUL byte, so `NODE_OPTIONS\0=...`
 * would set NODE_OPTIONS while every check saw another name. Only plain ASCII
 * names are accepted from the working directory.
 */
export function isPlainEnvKey(key) {
  return typeof key === "string" && /^[A-Za-z_][A-Za-z0-9_]*$/.test(key);
}

/**
 * Why a `.env` in the working directory may not set `key` to `value` (the
 * parsed value), or null when it may. Names must match exactly: on Linux and
 * macOS `port=` sets a variable nothing reads, and on Windows it would set
 * PORT, so a name in another case is skipped on every platform.
 *
 * - `{ kind: "name" }`: not an allowed key.
 * - `{ kind: "case", name }`: an allowed key written in another case.
 * - `{ kind: "value", expected }`: an allowed key with a value that fails its
 *   check; `expected` says what the value must be.
 */
export function cwdEnvRejection(key, value) {
  if (!isPlainEnvKey(key)) return { kind: "name" };
  const rule = ALLOWED.get(key);
  if (rule === undefined) {
    const upper = key.toUpperCase();
    return ALLOWED.has(upper) ? { kind: "case", name: upper } : { kind: "name" };
  }
  return rule.check(String(value ?? "")) ? null : { kind: "value", expected: rule.expected };
}

/** True when a `.env` in the working directory may set `key` to `value`. */
export function isAllowedFromCwdEnv(key, value) {
  return cwdEnvRejection(key, value) === null;
}

/**
 * A key name safe to print in a warning: anything outside printable ASCII
 * (NUL, escape sequences, look-alike letters) is shown as a \u escape.
 */
export function printableEnvKey(key) {
  const text = String(key);
  if (/^[\x21-\x7e]*$/.test(text)) return text;
  return JSON.stringify(text).replace(/[^\x20-\x7e]/g, (ch) => {
    return `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`;
  });
}

// C0 and C1 controls, DEL, and the format characters that reorder or hide
// text (bidi controls, zero-width characters, line and paragraph separators).
const UNSAFE_PATH_CHAR = /[\x00-\x1f\x7f-\x9f\u061c\u200b-\u200f\u2028-\u202e\u2060-\u2069\ufeff]/;

/**
 * A file path safe to print: the working directory's name comes from whoever
 * made it, and a name with escape sequences or line breaks could rewrite the
 * terminal or fake log lines. A path with any such character is printed as a
 * JSON string with those characters as \u escapes; other paths, including
 * ones with spaces or non-ASCII letters, are printed as they are.
 */
export function printablePath(value) {
  const text = String(value);
  if (!UNSAFE_PATH_CHAR.test(text)) return text;
  return JSON.stringify(text).replace(new RegExp(UNSAFE_PATH_CHAR.source, "g"), (ch) => {
    return `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`;
  });
}
