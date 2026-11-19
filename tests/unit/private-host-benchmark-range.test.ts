/**
 * 198.18.0.0/15 is reserved for network benchmarking (RFC 2544) and is never routed publicly.
 * It stays public by default, because fake-IP proxies (Clash, Mihomo, Surge in TUN mode) answer
 * every name with an address in it (#15039). With OMNIROUTE_BLOCK_BENCHMARK_RANGE=true the strict
 * outbound guard refuses it like the other non-public IPv4 blocks: as a dotted IPv4, as
 * IPv4-mapped IPv6 (compressed and expanded), as NAT64, in a URL, and as a DNS answer to
 * `safeOutboundFetch({ guard: "public-only" })`. The addresses right outside the /15 stay public
 * in both modes.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/private-host-benchmark-range.test.ts
 */

import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isPrivateHost,
  parseAndValidatePublicUrl,
  OutboundUrlGuardError,
} from "../../src/shared/network/outboundUrlGuard.ts";

const { safeOutboundFetch, SafeOutboundFetchError } =
  await import("../../src/shared/network/safeOutboundFetch.ts");

const FLAG = "OMNIROUTE_BLOCK_BENCHMARK_RANGE";

// Each entry: [IPv4 address, the same address as expanded IPv4-mapped IPv6, as NAT64].
const BENCHMARK = [
  ["198.18.0.0", "0:0:0:0:0:ffff:c612:0", "64:ff9b::c612:0"],
  ["198.18.0.1", "0:0:0:0:0:ffff:c612:1", "64:ff9b::c612:1"],
  ["198.19.255.254", "0:0:0:0:0:ffff:c613:fffe", "64:ff9b::c613:fffe"],
  ["198.19.255.255", "0:0:0:0:0:ffff:c613:ffff", "64:ff9b::c613:ffff"],
] as const;

// The addresses right outside 198.18.0.0/15.
const NEIGHBOURS = ["198.17.255.255", "198.20.0.0", "0:0:0:0:0:ffff:c611:ffff"];

async function guardCode(address: string): Promise<string | null> {
  try {
    await safeOutboundFetch("http://bench.alias.test:9/", {
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

let saved: string | undefined;

function restoreFlag() {
  if (saved === undefined) delete process.env[FLAG];
  else process.env[FLAG] = saved;
}

describe("198.18.0.0/15 by default - public, for fake-IP proxies", () => {
  beforeEach(() => {
    saved = process.env[FLAG];
    delete process.env[FLAG];
  });
  afterEach(restoreFlag);

  it("isPrivateHost treats every spelling as public", () => {
    for (const [ipv4, mapped, nat64] of BENCHMARK) {
      assert.equal(isPrivateHost(ipv4), false, ipv4);
      assert.equal(isPrivateHost(mapped), false, mapped);
      assert.equal(isPrivateHost(nat64), false, nat64);
    }
  });

  it("parseAndValidatePublicUrl accepts the range", () => {
    for (const [ipv4] of BENCHMARK) {
      assert.doesNotThrow(() => parseAndValidatePublicUrl(`http://${ipv4}/v1`), ipv4);
    }
  });

  it("safeOutboundFetch public-only does not refuse a fake-IP answer", async () => {
    assert.notEqual(await guardCode("198.18.0.1"), "URL_GUARD_BLOCKED");
  });

  it("any value other than true keeps the default", () => {
    for (const value of ["false", "1", "TRUE", ""]) {
      process.env[FLAG] = value;
      assert.equal(isPrivateHost("198.18.0.1"), false, JSON.stringify(value));
    }
  });
});

describe("198.18.0.0/15 with OMNIROUTE_BLOCK_BENCHMARK_RANGE=true - private", () => {
  beforeEach(() => {
    saved = process.env[FLAG];
    process.env[FLAG] = "true";
  });
  afterEach(restoreFlag);

  for (const [ipv4, mapped, nat64] of BENCHMARK) {
    it(`isPrivateHost treats ${ipv4}, ${mapped} and ${nat64} as private`, () => {
      assert.equal(isPrivateHost(ipv4), true);
      assert.equal(isPrivateHost(mapped), true);
      assert.equal(isPrivateHost(`[${mapped}]`), true);
      assert.equal(isPrivateHost(nat64), true);
    });

    for (const url of [`http://${ipv4}/v1`, `http://[::ffff:${ipv4}]/v1`, `http://[${mapped}]/`]) {
      it(`parseAndValidatePublicUrl rejects ${url}`, () => {
        assert.throws(
          () => parseAndValidatePublicUrl(url),
          (error: unknown) => error instanceof OutboundUrlGuardError
        );
      });
    }
  }

  it("keeps the neighbours public", () => {
    for (const host of NEIGHBOURS) {
      assert.equal(isPrivateHost(host), false, host);
    }
    for (const url of ["http://198.17.255.255/", "http://198.20.0.0/"]) {
      assert.doesNotThrow(() => parseAndValidatePublicUrl(url), url);
    }
  });

  for (const address of ["198.18.0.1", "198.19.255.254", "0:0:0:0:0:ffff:c612:1"]) {
    it(`safeOutboundFetch public-only refuses a name resolving to ${address}`, async () => {
      assert.equal(await guardCode(address), "URL_GUARD_BLOCKED");
    });
  }

  it("safeOutboundFetch public-only does not refuse a neighbour address", async () => {
    assert.notEqual(await guardCode("198.20.0.1"), "URL_GUARD_BLOCKED");
  });
});
