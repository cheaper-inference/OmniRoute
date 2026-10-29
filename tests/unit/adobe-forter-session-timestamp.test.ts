import "../_setup/disableAdobeBrowser.ts";
import assert from "node:assert/strict";
import test from "node:test";
import {
  extractAdobeForterTimestampMs,
  getAdobeForterAgeMs,
  resolveAdobeArpSessionIdSmart,
} from "../../open-sse/services/adobeFireflySession.ts";

const MS = 1761600000000;
const modern = (ms: number) => `prefix-${ms}-suffix-v2_tt`;
const cookie = (ftr: string) =>
  `ff_session_guid=synthetic-session; arkose=synthetic-arkose; forterToken=${ftr}`;
const arp = (ftr: string) =>
  Buffer.from(
    JSON.stringify({ sid: "synthetic-extracted", ark: "synthetic-arkose", ftr })
  ).toString("base64");

// Pure session helpers only: no browser, network, persistence or real cookie data.
test("cookie-blob path accepts URL-encoded non-underscore timestamps", () => {
  assert.equal(extractAdobeForterTimestampMs(cookie(`prefix%2D${MS}%2Dsuffix-v2_tt`)), MS);
  assert.equal(extractAdobeForterTimestampMs(`forter=${modern(MS)}`), MS);
});

test("token age is finite for an unrecognized-delimiter regression and infinite for unknown", () => {
  const timestamp = Date.now() - 60_000;
  const before = Date.now();
  const age = getAdobeForterAgeMs(cookie(modern(timestamp)));
  const after = Date.now();
  assert.ok(Number.isFinite(age));
  assert.ok(age >= before - timestamp && age <= after - timestamp);
  assert.equal(getAdobeForterAgeMs(cookie("no-timestamp")), Number.POSITIVE_INFINITY);
});

test("ARP comparison keeps the newer extracted non-underscore timestamp", () => {
  const extracted = arp(modern(MS + 1000));
  assert.equal(
    resolveAdobeArpSessionIdSmart(`${cookie(modern(MS))}; sherlockToken=${extracted}`),
    extracted
  );
});

test("ARP comparison rebuilds from cookies when that non-underscore timestamp is newer", () => {
  const extracted = arp(modern(MS));
  const selected = resolveAdobeArpSessionIdSmart(
    `${cookie(modern(MS + 1000))}; sherlockToken=${extracted}`
  );
  assert.notEqual(selected, extracted);
  assert.equal(JSON.parse(Buffer.from(selected, "base64").toString("utf8")).ftr, modern(MS + 1000));
});
