import assert from "node:assert/strict";
import { test } from "node:test";
import {
  managedSubscriptionNodes,
  previewManagedSubscription,
} from "../../src/lib/services/managedProxy/subscription.ts";
const source =
  "vless://11111111-1111-4111-8111-111111111111@example.invalid:443?security=tls#First";

test("a failed public IPv6 connection falls back to validated IPv4 with the same deadline", async () => {
  const attempted: string[] = [];
  const signals: AbortSignal[] = [];
  const result = await previewManagedSubscription("xray", "https://example.invalid/sub", {
    lookup: async () => [
      { address: "2606:4700:4700::1111", family: 6 },
      { address: "93.184.216.34", family: 4 },
    ],
    pinnedFetch: (address) => async (_url, init) => {
      attempted.push(address);
      signals.push(init!.signal!);
      assert.equal(init?.redirect, "error");
      if (attempted.length === 1)
        throw new TypeError("fetch failed", {
          cause: Object.assign(new Error("unreachable"), { code: "ENETUNREACH" }),
        });
      return new Response(source);
    },
  });
  assert.equal(result.nodes.length, 1);
  assert.deepEqual(attempted, ["2606:4700:4700::1111", "93.184.216.34"]);
  assert.equal(signals[0], signals[1]);
});

for (const status of [302, 403, 500]) {
  test(`HTTP ${status} does not try another pinned address`, async () => {
    let attempts = 0;
    await assert.rejects(
      previewManagedSubscription("xray", "https://example.invalid/sub", {
        lookup: async () => [
          { address: "1.1.1.1", family: 4 },
          { address: "8.8.8.8", family: 4 },
        ],
        pinnedFetch: () => async () => {
          attempts++;
          return new Response("rejected", { status });
        },
      }),
      /download failed/
    );
    assert.equal(attempts, 1);
  });
}
for (const code of ["CERT_HAS_EXPIRED", "ABORT_ERR"]) {
  test(`${code} does not retry another pinned address`, async () => {
    let attempts = 0;
    await assert.rejects(
      previewManagedSubscription("xray", "https://example.invalid/sub", {
        lookup: async () => [
          { address: "1.1.1.1", family: 4 },
          { address: "8.8.8.8", family: 4 },
        ],
        pinnedFetch: () => async () => {
          attempts++;
          throw new TypeError("fetch failed", {
            cause: Object.assign(new Error("rejected"), { code }),
          });
        },
      }),
      /fetch failed/
    );
    assert.equal(attempts, 1);
  });
}
test("plain and base64 feeds preserve selected source and deduplicate nodes", () => {
  for (const body of [source + "\n" + source, Buffer.from(source).toString("base64")]) {
    const result = managedSubscriptionNodes("xray", body);
    assert.equal(result.nodes.length, 1);
    assert.equal(result.nodes[0].sourceLink, source);
    assert.equal(result.nodes[0].name, "First");
  }
});
test("unsupported protocols are reported and an unsupported-only feed is rejected", () => {
  const result = managedSubscriptionNodes(
    "xray",
    source + "\nhysteria2://secret@example.invalid:443"
  );
  assert.equal(result.nodes.length, 1);
  assert.equal(result.skipped, 1);
  assert.throws(() => managedSubscriptionNodes("xray", "not a subscription"), /no supported/);
});
test("subscription preview rejects metadata, local, credential URLs and private DNS answers", async () => {
  for (const url of [
    "http://example.invalid/sub",
    "https://127.0.0.1/sub",
    "https://169.254.169.254/meta",
    "https://user:pass@example.invalid/sub",
  ])
    await assert.rejects(previewManagedSubscription("xray", url));
  await assert.rejects(
    previewManagedSubscription("xray", "https://example.invalid/sub", {
      lookup: async () => [{ address: "127.0.0.1", family: 4 }],
    }),
    /blocked/
  );
});
test("subscription transport pins checked DNS and refuses redirect following", async () => {
  const result = await previewManagedSubscription("xray", "https://example.invalid/sub", {
    lookup: async () => [{ address: "93.184.216.34", family: 4 }],
    pinnedFetch: (ip, family) => {
      assert.equal(ip, "93.184.216.34");
      assert.equal(family, 4);
      return async (_url, init) => {
        assert.equal(init?.redirect, "error");
        return new Response(source);
      };
    },
  });
  assert.equal(result.nodes.length, 1);
});

test("oversized subscription responses and node floods are rejected", async () => {
  assert.throws(
    () => managedSubscriptionNodes("xray", "x".repeat(2 * 1024 * 1024 + 1)),
    /size limit/
  );
  assert.throws(
    () =>
      managedSubscriptionNodes(
        "xray",
        Array.from({ length: 501 }, (_, index) => source + index).join("\n")
      ),
    /too many/
  );
  await assert.rejects(
    previewManagedSubscription("xray", "https://example.invalid/sub", {
      lookup: async () => [{ address: "93.184.216.34", family: 4 }],
      pinnedFetch: () => async () => new Response("x".repeat(2 * 1024 * 1024 + 1)),
    }),
    /size limit/
  );
});

test("native JSON outbound feeds preserve compatible objects for each selected core", () => {
  for (const [core, outbound] of [
    [
      "singbox",
      {
        type: "vless",
        tag: "native",
        server: "example.invalid",
        server_port: 443,
        uuid: "11111111-1111-4111-8111-111111111111",
        tls: { enabled: true, server_name: "example.invalid" },
      },
    ],
    [
      "xray",
      {
        protocol: "vless",
        tag: "native",
        settings: {
          vnext: [
            {
              address: "example.invalid",
              port: 443,
              users: [{ id: "11111111-1111-4111-8111-111111111111", encryption: "none" }],
            },
          ],
        },
        streamSettings: { security: "tls", network: "tcp" },
      },
    ],
  ] as const) {
    const content = JSON.stringify({ outbounds: [outbound] });
    for (const body of [content, Buffer.from(content).toString("base64")]) {
      const result = managedSubscriptionNodes(core, body);
      assert.equal(result.nodes[0].name, "native");
      assert.deepEqual(JSON.parse(result.nodes[0].sourceLink), outbound);
    }
  }
});

test("YAML alias graphs and cycles are skipped without expansion or rejecting other nodes", () => {
  const body = [
    "a: &a [x, x]",
    "b: &b [*a, *a]",
    "c: &c [*b, *b]",
    "proxies:",
    `  - '${source}'`,
    "  - {name: cyclic, type: vless, server: example.invalid, port: 443, extra: &cycle [*cycle]}",
    "  - {name: graph, type: vless, server: example.invalid, port: 443, extra: *c}",
  ].join("\n");
  const result = managedSubscriptionNodes("xray", body);
  assert.equal(result.nodes.length, 1);
  assert.equal(result.skipped, 2);
});

test("public-only preview rejects CGNAT, reserved, mapped and non-global IPv6 before fetching", async () => {
  for (const address of [
    "100.64.0.1",
    "100.100.100.100",
    "198.18.0.1",
    "224.0.0.1",
    "::ffff:6440:1",
    "fec0::1",
    "ff02::1",
    "2002:a00:1::1",
    "64:ff9b::a00:1",
  ]) {
    await assert.rejects(
      previewManagedSubscription("xray", "https://example.invalid/sub", {
        lookup: async () => [{ address, family: address.includes(":") ? 6 : 4 }],
        pinnedFetch: () => {
          throw new Error("must not fetch blocked address");
        },
      }),
      /host is blocked/
    );
  }
});
