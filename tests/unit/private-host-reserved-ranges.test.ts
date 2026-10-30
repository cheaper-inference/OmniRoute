/**
 * The outbound URL guard has to refuse IPv4 ranges that are never a public destination:
 * 240.0.0.0/4 (reserved, "Class E", used as extra private space by some cloud networks) and the
 * limited-broadcast address 255.255.255.255 at its top. They must be refused in every spelling
 * the guard reads (dotted IPv4, IPv4-mapped IPv6 in the compressed and the expanded form, NAT64)
 * and as a DNS answer to `safeOutboundFetch({ guard: "public-only" })`. The neighbours of the
 * range, and ordinary public addresses, must keep passing.
 *
 * The 0.0.0.0/8 ("this network") and 100.64.0.0/10 (CGNAT) blocks are pinned here as well, in
 * the same spellings, so the range table cannot lose them silently.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/private-host-reserved-ranges.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isPrivateHost,
  parseAndValidatePublicUrl,
  OutboundUrlGuardError,
} from "../../src/shared/network/outboundUrlGuard.ts";

const { safeOutboundFetch, SafeOutboundFetchError } =
  await import("../../src/shared/network/safeOutboundFetch.ts");

// Each entry: [IPv4 address, the same address as expanded IPv4-mapped IPv6, as NAT64].
const RESERVED = [
  ["240.0.0.0", "0:0:0:0:0:ffff:f000:0", "64:ff9b::f000:0"],
  ["240.0.0.1", "0:0:0:0:0:ffff:f000:1", "64:ff9b::f000:1"],
  ["250.10.20.30", "0:0:0:0:0:ffff:fa0a:141e", "64:ff9b::fa0a:141e"],
  ["255.255.255.254", "0:0:0:0:0:ffff:ffff:fffe", "64:ff9b::ffff:fffe"],
  ["255.255.255.255", "0:0:0:0:0:ffff:ffff:ffff", "64:ff9b::ffff:ffff"],
] as const;

const ALREADY_COVERED = [
  ["0.0.0.1", "0:0:0:0:0:ffff:0:1"],
  ["0.255.255.255", "0:0:0:0:0:ffff:ff:ffff"],
  ["100.64.0.1", "0:0:0:0:0:ffff:6440:1"],
  ["100.127.255.254", "0:0:0:0:0:ffff:647f:fffe"],
] as const;

// The addresses right outside the blocked ranges, and ordinary public resolvers.
const PUBLIC = [
  "8.8.8.8",
  "1.1.1.1",
  "223.255.255.255",
  "100.63.255.255",
  "100.128.0.0",
  "0:0:0:0:0:ffff:808:808",
  "64:ff9b::808:808",
];

describe("isPrivateHost - reserved 240.0.0.0/4 and limited broadcast", () => {
  for (const [ipv4, mapped, nat64] of RESERVED) {
    it(`treats ${ipv4} as private`, () => {
      assert.equal(isPrivateHost(ipv4), true);
    });
    it(`treats the IPv4-mapped ${mapped} as private`, () => {
      assert.equal(isPrivateHost(mapped), true);
      assert.equal(isPrivateHost(`[${mapped}]`), true);
    });
    it(`treats the NAT64 ${nat64} as private`, () => {
      assert.equal(isPrivateHost(nat64), true);
    });
  }
});

describe("isPrivateHost - 0.0.0.0/8 and 100.64.0.0/10 stay covered", () => {
  for (const [ipv4, mapped] of ALREADY_COVERED) {
    it(`treats ${ipv4} and ${mapped} as private`, () => {
      assert.equal(isPrivateHost(ipv4), true);
      assert.equal(isPrivateHost(mapped), true);
    });
  }
});

describe("isPrivateHost - public addresses next to the blocked ranges", () => {
  for (const host of PUBLIC) {
    it(`treats ${host} as public`, () => {
      assert.equal(isPrivateHost(host), false);
    });
  }
});

describe("parseAndValidatePublicUrl - reserved ranges in a URL", () => {
  for (const [ipv4, mapped] of RESERVED) {
    for (const url of [`http://${ipv4}/`, `http://[::ffff:${ipv4}]/`, `http://[${mapped}]/`]) {
      it(`rejects ${url}`, () => {
        assert.throws(
          () => parseAndValidatePublicUrl(url),
          (error: unknown) => error instanceof OutboundUrlGuardError
        );
      });
    }
  }

  it("accepts a public address", () => {
    for (const url of ["http://8.8.8.8/", "http://223.255.255.255/", "https://api.openai.com/"]) {
      assert.doesNotThrow(() => parseAndValidatePublicUrl(url), url);
    }
  });
});

async function guardCode(address: string): Promise<string | null> {
  try {
    await safeOutboundFetch("http://reserved.alias.test:9/", {
      guard: "public-only",
      retry: false,
      timeoutMs: 500,
      dnsLookup: async () => [{ address, family: address.includes(":") ? 6 : 4 }],
    });
    return null;
  } catch (error) {
    return error instanceof SafeOutboundFetchError ? error.code : "OTHER";
  }
}

describe("safeOutboundFetch public-only - a name that resolves into a reserved range", () => {
  for (const address of ["240.0.0.1", "255.255.255.255", "0:0:0:0:0:ffff:f000:1"]) {
    it(`refuses a name resolving to ${address}`, async () => {
      assert.equal(await guardCode(address), "URL_GUARD_BLOCKED");
    });
  }

  it("does not refuse a name resolving to a public address", async () => {
    assert.notEqual(await guardCode("203.0.113.10"), "URL_GUARD_BLOCKED");
  });
});
