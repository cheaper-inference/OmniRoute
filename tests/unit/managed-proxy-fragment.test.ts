import assert from "node:assert/strict";
import { test } from "node:test";
import { renderManagedConfig, sourceOutbound } from "../../src/lib/services/managedProxy/config.ts";
import { FragmentSchema } from "../../src/lib/services/managedProxy/fragment.ts";
const source = "vless://11111111-1111-4111-8111-111111111111@example.invalid:443?security=tls";
const fragment = { packets: "tlshello" as const, length: "100-200", interval: "10-20" };
test("Xray-compatible fragmentation creates an isolated generated dialer per listener", () => {
  const outbound = sourceOutbound("xray", source);
  const before = JSON.stringify(outbound);
  const config = renderManagedConfig("xray", [
    { id: "a", port: 20001, outbound, fragment },
    { id: "b", port: 20002, outbound, fragment },
  ]);
  const outs = config.outbounds as Record<string, unknown>[];
  assert.equal(outs.length, 4);
  assert.equal(
    (outs[0].streamSettings as { sockopt: { dialerProxy: string } }).sockopt.dialerProxy,
    "fragment-a"
  );
  assert.equal(outs[3].tag, "fragment-b");
  assert.equal(JSON.stringify(outbound), before);
});
test("fragmentation refuses unsupported cores, transports and non-TLS links", () => {
  assert.throws(
    () =>
      renderManagedConfig("singbox", [
        { id: "a", port: 20001, outbound: sourceOutbound("singbox", source), fragment },
      ]),
    /only/
  );
  for (const link of [
    source.replace("security=tls", "security=none"),
    `${source}&type=grpc&serviceName=test`,
  ])
    assert.throws(
      () =>
        renderManagedConfig("xray", [
          { id: "a", port: 20001, outbound: sourceOutbound("xray", link), fragment },
        ]),
      /requires/
    );
});
test("fragment options reject reversed, excessive, malformed and unknown ranges", () => {
  for (const length of ["0", "4000-5000", "200-100", "1-2-3", "-1", "1e3"])
    assert.equal(FragmentSchema.safeParse({ ...fragment, length }).success, false);
  assert.equal(FragmentSchema.safeParse({ ...fragment, interval: "1001" }).success, false);
  assert.equal(FragmentSchema.safeParse({ ...fragment, command: "x" }).success, false);
});
