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
// The ranking key of a pool member also lives here: `egressKeyForAddresses`
// turns the addresses observed for a member into the key it is ranked under —
// one exact address, or the /16 range a host rotates its exits inside.
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
  const mapped = text.startsWith("::ffff:") ? text.slice("::ffff:".length) : text;
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
 * Range key of an IPv4 address: the /16 it belongs to, read from its two
 * first bytes (`203.0.113.7` -> `r16:203.0.0.0/16`, `203.0.114.9` ->
 * `r16:203.0.0.0/16` too). Members behind one host rotating its exits inside
 * a single range share that range, so the range is the key they are ranked
 * under. Null for anything that is not IPv4.
 *
 * Module-private: the rule reads one key per member, so the range key is only
 * ever built here.
 */
function egressIpv4RangeKey(address: string): string | null {
  if (ipVersion(address) !== 4) return null;
  const parts = address.split(".");
  return `r16:${parts[0]}.${parts[1]}.0.0/16`;
}

/**
 * The key one member is ranked under, from the addresses observed for it.
 *
 * Contract: the addresses are already normalized by `normalizeEgressAddress`
 * (a whole IPv4 address, or an IPv6 /64 key). They are used as they are —
 * a single address is returned as it is, without a second validation.
 *
 * - no address: null (the member reads as unknown);
 * - one address: that address's own key;
 * - several addresses inside one IPv4 /16: that range's key (a host rotating
 *   its exits inside one range);
 * - addresses crossing two ranges: null.
 * IPv6 keeps its /64 key: two addresses of one /64 already normalize to the
 * same key, so two distinct IPv6 keys are two ranges.
 *
 * `truncated` says the read was cut by the read ceiling: the window may hold
 * more addresses than were read, so it cannot be shown to stay inside one
 * range and the member reads as unknown.
 */
export function egressKeyForAddresses(
  addresses: Iterable<string>,
  options?: { truncated?: boolean }
): string | null {
  if (options?.truncated) return null;
  const distinct = new Set(addresses);
  if (distinct.size === 0) return null;
  if (distinct.size === 1) return [...distinct][0];
  let range: string | null = null;
  for (const address of distinct) {
    const key = egressIpv4RangeKey(address);
    if (key === null) return null; // another family: another range
    if (range === null) range = key;
    else if (range !== key) return null; // two ranges: the member reads as unknown
  }
  return range;
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
  const demapped = lower.startsWith("::ffff:") ? lower.slice("::ffff:".length) : lower;
  // Hostname, not a literal: refused.
  if (ipVersion(lower) === 0 && ipVersion(demapped) === 0) return false;
  return !isPrivateHost(lower);
}
