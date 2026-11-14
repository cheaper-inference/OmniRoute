// Shared version helpers for launch adapters. Pure: no fs, process or os reads.

const SEMVER = /(\d+)\.(\d+)\.(\d+)/;
const SEMVER_PREFIX = /^(\d+)\.(\d+)\.(\d+)/;

function toTriple(match) {
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

/**
 * The first x.y.z anywhere in `text`, as numbers.
 * @param {string | null | undefined} text
 * @returns {number[] | null}
 */
export function parseSemver(text) {
  return toTriple(SEMVER.exec(String(text ?? "")));
}

/**
 * An x.y.z at the very start of `text` (no leading text allowed), as numbers.
 * @param {string | null | undefined} text
 * @returns {number[] | null}
 */
export function parseSemverPrefix(text) {
  return toTriple(SEMVER_PREFIX.exec(String(text ?? "")));
}

/**
 * -1, 0 or 1 comparing two parsed triples.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
export function compareSemver(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return 0;
}

/**
 * True when triple `a` is strictly below triple `b`.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {boolean}
 */
export function semverLess(a, b) {
  return compareSemver(a, b) < 0;
}

/**
 * True when `version` is strictly below `floor`; false when either does not parse.
 * @param {string | null | undefined} version
 * @param {string} floor
 * @param {(text: string | null | undefined) => number[] | null} [parse]
 * @returns {boolean}
 */
export function isSemverBelow(version, floor, parse = parseSemver) {
  const a = parse(version);
  const b = parse(floor);
  return Boolean(a && b) && semverLess(a, b);
}

/**
 * Numeric dotted-version compare (-1, 0, 1); non-numeric parts count as 0.
 * @param {string} a
 * @param {string} b
 * @param {number} [width] parts compared (default: the longer of the two)
 * @returns {number}
 */
export function compareDotted(a, b, width) {
  const pa = String(a).split(".");
  const pb = String(b).split(".");
  const len = width ?? Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const x = Number.parseInt(pa[i] ?? "0", 10) || 0;
    const y = Number.parseInt(pb[i] ?? "0", 10) || 0;
    if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

/**
 * Where `version` sits against a `{ min, recommended }` gate: "unknown" when it does not parse,
 * "too-old" below min, "behind" below recommended, else "ok".
 * @param {string | null | undefined} version
 * @param {{ min: string, recommended?: string }} gate
 * @returns {"unknown" | "too-old" | "behind" | "ok"}
 */
export function gateStatus(version, gate) {
  const have = parseSemver(version);
  if (!have) return "unknown";
  if (semverLess(have, parseSemver(gate.min))) return "too-old";
  if (gate.recommended && semverLess(have, parseSemver(gate.recommended))) return "behind";
  return "ok";
}
