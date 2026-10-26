// Shared normalization for observed egress addresses: a whole IPv4 address
// (`203.0.113.7`), an IPv4-mapped IPv6 form demapped to IPv4
// (`::ffff:203.0.113.7`), or an IPv6 /64 prefix (`v6:2001:db8:1:0`) — members
// behind one shared /64 consume one quota. Anything else (zone ids
// `fe80::1%eth0`, unparseable input) gives null so the caller falls back to
// today's order instead of guessing.
//
// Pure-JS, no `node:*` import: `proxyOperatorEgress.ts` (server) and
// `proxies/rotation.ts` (bundled near the provider registry) both use it, and
// the browser bundle cannot resolve `node:net` (#11122). Classification parity
// with `node:net#isIP` comes from `ipVersion` in `./privateHost.ts`.
//
// The module also classifies an observed address (which family it belongs to)
// and lists the addresses a log line observed, so every reader — the probe,
// the log row and the two components that display it — answers the same way.
import { ipVersion, isPrivateHost } from "./privateHost";

// Expand an IPv6 literal to its eight 16-bit groups, or null when malformed.
// `::` supplies the missing zero groups; anything else must list all eight.
function expandIpv6ToGroups(text: string): number[] | null {
  const halves = text.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves[1] ? halves[1].split(":") : [];
  if (halves.length === 1 && head.length !== 8) return null;
  if (halves.length === 2 && head.length + tail.length > 7) return null;
  if ([...head, ...tail].some((part) => !/^[0-9a-f]{1,4}$/.test(part))) return null;
  const groups = [
    ...head.map((part) => parseInt(part, 16)),
    ...new Array(halves.length === 2 ? 8 - head.length - tail.length : 0).fill(0),
    ...tail.map((part) => parseInt(part, 16)),
  ];
  if (groups.length !== 8 || groups.some((group) => !Number.isInteger(group))) return null;
  return groups;
}

/**
 * Normalize an observed egress address for pool ranking. `null` means the
 * input is unusable — the caller keeps today's behavior instead of guessing.
 */
export function normalizeEgressAddress(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const text = input.trim().toLowerCase();
  if (!text || text.includes("%")) return null;
  const mapped = demapEgressAddress(text);
  if (mapped === null) return null;
  if (ipVersion(mapped) === 4) return mapped;
  if (ipVersion(text) !== 6) return null;
  const groups = expandIpv6ToGroups(text);
  if (groups === null) return null;
  return `v6:${groups
    .slice(0, 4)
    .map((group) => group.toString(16))
    .join(":")}`;
}

/**
 * Whether an observed egress address is usable: an IP literal that is
 * routable (not loopback, link-local, private/non-routable, or unspecified).
 * Pure helper — `node:net` stays server-side, so this uses the shared pure-JS
 * classifier (`isPrivateHost` covers loopback, private, link-local, multicast,
 * and reserved forms verdict-for-verdict with `isIP`). Hostnames
 * (non-literals) and `%zone` forms are refused: an observed address is an IP,
 * never a name.
 */
export function isRoutableEgressAddress(input: unknown): boolean {
  if (typeof input !== "string") return false;
  const text = input.trim();
  if (!text || text.includes("%")) return false;
  const lower = text.toLowerCase();
  const demapped = demapEgressAddress(lower);
  if (demapped === null) return false;
  // Hostname, not a literal: refused.
  if (ipVersion(lower) === 0 && ipVersion(demapped) === 0) return false;
  return !isPrivateHost(lower);
}

/** IPv4-mapped IPv6 prefix: the IPv4 address is carried right after it. */
const IPV4_MAPPED_PREFIX = "::ffff:";

/**
 * Strip the IPv4-mapped prefix of an observed address; the rest is returned as
 * it is. One copy of the prefix, shared by every reader. An entry that is not
 * a string is refused (null): this is the first gate every observed address
 * passes through, and a value that is not an address must not be guessed.
 */
export function demapEgressAddress(input: unknown): string | null {
  if (typeof input !== "string") return null;
  if (input.length <= IPV4_MAPPED_PREFIX.length) return input;
  if (input.slice(0, IPV4_MAPPED_PREFIX.length).toLowerCase() !== IPV4_MAPPED_PREFIX) return input;
  return input.slice(IPV4_MAPPED_PREFIX.length);
}

/** The family an observed address belongs to. */
export type EgressAddressFamily = "ipv4" | "ipv6";

/**
 * Classify an observed address; null when it is not an IP literal (a hostname,
 * a zone id, anything that is not an address). Never a guess: an IPv4-mapped
 * form is an IPv4 address.
 */
export function egressAddressFamily(input: unknown): EgressAddressFamily | null {
  if (typeof input !== "string") return null;
  const text = input.trim().toLowerCase();
  if (!text || text.includes("%")) return null;
  const demapped = demapEgressAddress(text);
  if (demapped === null) return null;
  if (ipVersion(demapped) === 4) return "ipv4";
  if (ipVersion(text) === 6) return "ipv6";
  return null;
}

/** The version the shared family label carries ("IPv{version}"). */
export const EGRESS_FAMILY_LABEL_ARGUMENT: Record<EgressAddressFamily, string> = {
  ipv4: "4",
  ipv6: "6",
};

/**
 * The family of the primary address: the family of the column that carries it
 * (both sides compared on their demapped value), null when no column carries
 * it — the address was measured, its family was not observed.
 */
function primaryAddressFamily(
  primary: string,
  ipv4: string | null,
  ipv6: string | null
): EgressAddressFamily | null {
  const demapped = demapEgressAddress(primary);
  if (demapped === null) return null;
  if (ipv4 && demapEgressAddress(ipv4) === demapped) return "ipv4";
  if (ipv6 && demapEgressAddress(ipv6) === demapped) return "ipv6";
  return null;
}

/**
 * The addresses a log line observed: the primary address first when there is
 * one, then the other observed addresses. Each entry carries its family, or
 * null when that family was not observed — an address without a family was
 * measured, a missing address was not.
 */
export function observedEgressAddresses(input: {
  primary: string | null;
  ipv4: string | null;
  ipv6: string | null;
}): Array<{ address: string; family: EgressAddressFamily | null }> {
  const addresses: Array<{ address: string; family: EgressAddressFamily | null }> = [];
  const seen = new Set<string>();
  const push = (address: string | null, family: EgressAddressFamily | null) => {
    if (!address) return;
    const key = demapEgressAddress(address);
    // An entry that is not an address is refused: nothing is rendered for it.
    if (key === null) return;
    if (seen.has(key)) return;
    seen.add(key);
    addresses.push({ address, family });
  };
  if (input.primary) {
    push(input.primary, primaryAddressFamily(input.primary, input.ipv4, input.ipv6));
  }
  push(input.ipv4, "ipv4");
  push(input.ipv6, "ipv6");
  return addresses;
}
