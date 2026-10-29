import test from "node:test";
import assert from "node:assert/strict";
import { parseSubscription } from "../../src/lib/proxySubscription/parse.ts";

const formats: Record<string, (uris: string[]) => string> = {
  lines: (uris) => uris.join("\n"),
  base64: (uris) => Buffer.from(uris.join("\n")).toString("base64"),
  json: (uris) => JSON.stringify(uris),
  yaml: (uris) => `proxies:\n${uris.map((uri) => `  - ${JSON.stringify(uri)}`).join("\n")}`,
};
for (const [format, encode] of Object.entries(formats)) {
  for (const label of ["100%", "%GG", "%E0%A4%A"]) {
    test(`${format} subscription preserves malformed label ${label} and its siblings`, () => {
      const direct = `socks5://proxy.example:1080#${label}`;
      const core = `vmess://eyJhZGQiOiJwcm94eS5leGFtcGxlIiwicG9ydCI6NDQzfQ==#${label}`;
      const result = parseSubscription(
        encode([
          "http://before.example:8080#Before",
          direct,
          core,
          "https://after.example:8443#After",
        ])
      );
      assert.deepEqual(
        result.nodes.map((node) => node.name),
        ["Before", label, "After"]
      );
      assert.equal(result.needsCore.length, 1);
      assert.equal(result.needsCore[0].name, label);
      assert.equal(result.nodes[1].source?.value, direct);
      assert.equal(result.needsCore[0].source?.value, core);
    });
  }
}

test("subscription decodes valid names once and preserves empty-label defaults", () => {
  const result = parseSubscription(
    [
      "socks5://proxy.example:1080#M%C3%BCnchen%20%25",
      "socks5://proxy.example:1080#%2520",
      "socks5://fallback.example:1080#",
      "vmess://encoded#M%C3%BCnchen%20%25",
      "vmess://encoded#",
    ].join("\n")
  );
  assert.deepEqual(
    result.nodes.map((node) => node.name),
    ["München %", "%20", "fallback.example"]
  );
  assert.deepEqual(
    result.needsCore.map((node) => node.name),
    ["München %", "vmess-encoded"]
  );
});
