import test from "node:test";
import assert from "node:assert/strict";
import { parseSubscription } from "../../src/lib/proxySubscription/parse.ts";

for (const [scheme, port] of [
  ["http", 80],
  ["https", 443],
] as const) {
  for (const explicit of [false, true]) {
    test(`${scheme} subscription accepts ${explicit ? "explicit" : "implicit"} default port`, () => {
      const uri = `${scheme}://user:p%40ss@proxy.example${explicit ? `:${port}` : ""}#Primary`;
      const result = parseSubscription(`${uri}\nsocks5://backup.example:1080#Backup`);
      assert.equal(result.nodes.length, 2);
      assert.deepEqual(result.nodes[0], {
        name: "Primary",
        type: scheme,
        host: "proxy.example",
        port,
        username: "user",
        password: "p@ss",
        rawProtocol: scheme,
        source: { kind: "uri", value: uri },
      });
      assert.equal(result.nodes[1].port, 1080);
    });
  }
}

test("subscription keeps non-default HTTP ports and IPv6 hosts", () => {
  const result = parseSubscription("http://[::1]:8080#Local\nhttps://proxy.example:8443");
  assert.deepEqual(
    result.nodes.map(({ host, port }) => ({ host, port })),
    [
      { host: "[::1]", port: 8080 },
      { host: "proxy.example", port: 8443 },
    ]
  );
});

test("subscription still rejects zero ports and missing ports without scheme defaults", () => {
  for (const uri of [
    "http://proxy.example:0",
    "https://proxy.example:0",
    "socks5://proxy.example",
    "trojan://proxy.example",
  ]) {
    const result = parseSubscription(uri);
    assert.equal(result.nodes.length, 0, uri);
    assert.equal(result.needsCore.length, 0, uri);
  }
});
