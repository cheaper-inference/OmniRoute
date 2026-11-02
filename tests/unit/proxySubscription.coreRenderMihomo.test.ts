import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import * as yaml from "js-yaml";

const { parseSubscription } = await import("../../src/lib/proxySubscription/parse.ts");
const { buildCoreModel, normalizeSource } =
  await import("../../src/lib/proxySubscription/coreConfig/model.ts");
const { renderSingBox, projectCanonical } =
  await import("../../src/lib/proxySubscription/coreConfig/singbox.ts");
const mihomo = await import("../../src/lib/proxySubscription/coreConfig/mihomo.ts");
const renderers = await import("../../src/lib/proxySubscription/coreConfig/renderers.ts");

const ENTRIES = ["socks5://127.0.0.1:1080 selector=a", "socks5://127.0.0.1:1081 selector=b"];

function renderFromFeed(body: string, entries: string[] = ENTRIES) {
  const parsed = parseSubscription(body);
  const model = buildCoreModel(entries, [...parsed.nodes, ...parsed.needsCore] as never);
  return { model, result: mihomo.renderMihomo(model, null) };
}

test("a standard vless URI renders as a mihomo proxy with the same content as sing-box", () => {
  const parsed = parseSubscription(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls#std"
  );
  const model = buildCoreModel(ENTRIES, [...parsed.nodes, ...parsed.needsCore] as never);
  assert.equal(model.nodes.length, 1);
  const mRes = mihomo.renderMihomo(model, null);
  assert.equal(mRes.ok, true);
  if (!mRes.ok) return;
  const sRes = renderSingBox(model, null);
  assert.equal(sRes.ok, true);
  if (!sRes.ok) return;
  const after = yaml.load(mRes.text) as {
    proxies: Array<{ type: string; server: string; port: number; uuid: string; name: string }>;
  };
  const proxy = after.proxies.find(
    (p: { type: string; server: string; port: number }) =>
      p.type === "vless" && p.server === "example.com" && p.port === 443
  );
  assert.ok(proxy, `expected a vless proxy, got: ${mRes.text}`);
  assert.equal(proxy.uuid, "11111111-2222-4333-8444-555555555555");
  assert.equal(mRes.skipped.filter((s) => s.reason === "converter_unsupported").length, 0);
  // Same content as sing-box, mapped field by field.
  const sAfter = JSON.parse((sRes as { text: string }).text);
  const outbound = sAfter.outbounds.find(
    (o: { type: string; server: string; server_port: number }) =>
      o.type === "vless" && o.server === "example.com" && o.server_port === 443
  );
  assert.ok(outbound, `expected a vless outbound, got: ${(sRes as { text: string }).text}`);
  assert.equal(proxy.uuid, outbound.uuid);
  assert.equal(proxy.server, outbound.server);
  assert.equal(proxy.port, outbound.server_port);
});

function parsedYaml(
  text: string
): { proxies: Array<{ type: string; name: string }> } & Record<string, unknown> {
  return yaml.load(text) as { proxies: Array<{ type: string; name: string }> } & Record<
    string,
    unknown
  >;
}

test("a vmess clash object renders as a mihomo proxy", () => {
  const { result } = renderFromFeed(`proxies:
  - name: "named"
    type: vmess
    server: 203.0.113.9
    port: 443
    uuid: 11111111-2222-4333-8444-555555555555
`);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const after = parsedYaml(result.text);
  const proxy = after.proxies.find((p) => p.type === "vmess") as { uuid: string };
  assert.ok(proxy, `expected a vmess proxy, got: ${result.text}`);
  assert.equal(proxy.uuid, "11111111-2222-4333-8444-555555555555");
});

test("a node with an unsupported field is rejected whole with a reason, never guessed", () => {
  const { result } = renderFromFeed(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?mystery=1#unknown"
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const rejected = result.skipped.filter((s) => s.reason === "converter_unsupported");
  assert.equal(rejected.length, 1);
  assert.equal(rejected[0].detail, "unknown-param:mystery");
  const after = parsedYaml(result.text);
  assert.deepEqual(after.proxies, []);
});

test("clash trojan, ss, vmess and hysteria2 objects share the rendered proxy shape", () => {
  const body = `proxies:
  - name: "clash-trojan"
    type: trojan
    server: 203.0.113.11
    port: 8443
    password: trojan-secret
  - name: "clash-ss"
    type: ss
    server: 203.0.113.12
    port: 8388
    cipher: aes-256-gcm
    password: ss-secret
  - name: "clash-vmess"
    type: vmess
    server: 203.0.113.13
    port: 443
    uuid: 11111111-2222-4333-8444-555555555555
  - name: "clash-hysteria2"
    type: hysteria2
    server: 203.0.113.14
    port: 8443
    password: hy-secret
`;
  const { result } = renderFromFeed(body);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const after = parsedYaml(result.text);
  const names = after.proxies.map((p) => p.name);
  for (const name of ["clash-trojan", "clash-ss", "clash-vmess", "clash-hysteria2"]) {
    assert.ok(
      names.some((n) => n.includes(name)),
      `expected a rendered proxy for ${name}, got names: ${names.join(",")}`
    );
  }
  assert.equal(result.skipped.filter((s) => s.reason === "converter_unsupported").length, 0);
});

test("the clash corpus renders at the same rate as sing-box with zero exceptions", () => {
  const bodies = [
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls#std",
    "hysteria2://secret@example.com:8443?obfs=salamander&obfs-password=x#obfs",
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?mystery=1#unknown",
    "vless://u@example.com:443?flow=xtls-rprx-vision-udp443#bad",
    `proxies:
  - name: "clash-trojan"
    type: trojan
    server: 203.0.113.11
    port: 8443
    password: trojan-secret
  - name: "clash-ss"
    type: ss
    server: 203.0.113.12
    port: 8388
    cipher: aes-256-gcm
    password: ss-secret
  - name: "clash-vmess"
    type: vmess
    server: 203.0.113.13
    port: 443
    uuid: 11111111-2222-4333-8444-555555555555
  - name: "clash-hysteria2"
    type: hysteria2
    server: 203.0.113.14
    port: 8443
    password: hy-secret
`,
    "vless://u@example.com:443?flow=xtls-rprx-vision-udp443#irreducible",
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?remark=hello#named",
  ];
  for (const body of bodies) {
    const parsed = parseSubscription(body);
    const model = buildCoreModel(ENTRIES, [...parsed.nodes, ...parsed.needsCore] as never);
    const mRes = mihomo.renderMihomo(model, null);
    assert.equal(mRes.ok, true);
    if (!mRes.ok) continue;
    const sRes = renderSingBox(model, null);
    assert.equal(sRes.ok, true);
    if (!sRes.ok) continue;
    const mRendered = model.nodes.filter((n) =>
      (mRes as { text: string }).text.includes(`omniroute-${n.tag}`)
    ).length;
    const sRendered = model.nodes.filter((n) =>
      (sRes as { text: string }).text.includes(`omniroute-${n.tag}`)
    ).length;
    assert.equal(mRendered, sRendered, `rate mismatch for feed: ${body.slice(0, 60)}`);
    assert.deepEqual(
      [...mRes.skipped.map((s) => s.reason)].sort(),
      [...sRes.skipped.map((s) => s.reason)].sort(),
      `skip reasons mismatch for feed: ${body.slice(0, 60)}`
    );
  }
});

test("projectCanonicalMihomo mirrors projectCanonical field by field", () => {
  const parsed = parseSubscription(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls#std"
  );
  const model = buildCoreModel(ENTRIES, [...parsed.nodes, ...parsed.needsCore] as never);
  const verdict = normalizeSource(model.nodes[0].source);
  assert.equal(verdict.ok, true);
  if (!verdict.ok) return;
  const mProxy = mihomo.projectCanonicalMihomo(verdict.node);
  const sOutbound = projectCanonical(verdict.node);
  assert.equal(mProxy.server, sOutbound.server);
  assert.equal(mProxy.port, sOutbound.server_port);
  assert.equal(mProxy.uuid, (sOutbound as { uuid: string }).uuid);
});

test("refuses empty, malformed, non-object and section-less bases like sing-box", () => {
  const { model } = renderFromFeed(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls#std"
  );
  const emptySection = mihomo.renderMihomo(model, "proxies: []");
  assert.equal(emptySection.ok, true);
  if (!emptySection.ok) return;
  assert.deepEqual(parsedYaml(emptySection.text).proxies.length, 1);
  assert.deepEqual(mihomo.renderMihomo(model, "not yaml {{{: ["), {
    ok: false,
    reason: "unparseable",
  });
  assert.deepEqual(mihomo.renderMihomo(model, "- just\n- a\n- list\n"), {
    ok: false,
    reason: "not_an_object",
  });
  assert.deepEqual(mihomo.renderMihomo(model, "dns:\n  servers: []\n"), {
    ok: false,
    reason: "no_ownable_section",
  });
});

test("keeps operator sections verbatim and reports group empties", () => {
  const { model } = renderFromFeed("vless://u@10.3.0.2:443?flow=bogus#x", [
    "socks5://127.0.0.1:1080 selector=solo",
  ]);
  const base =
    "dns:\n  nameserver:\n    - https://1.1.1.1/dns-query\nproxies:\n  - name: keep-me\n    type: direct\n";
  const res = mihomo.renderMihomo(model, base);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  assert.ok(res.text.includes("keep-me"));
  assert.ok(res.text.includes("https://1.1.1.1/dns-query"));
  assert.equal(res.skipped.filter((s) => s.reason === "empty_group").length, 1);
});

test("second render is unchanged", () => {
  const { model } = renderFromFeed(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls#std"
  );
  const first = mihomo.renderMihomo(model, null);
  assert.equal(first.ok, true);
  if (!first.ok) return;
  assert.equal(first.unchanged, false);
  const second = mihomo.renderMihomo(model, first.text);
  assert.equal(second.ok, true);
  if (!second.ok) return;
  assert.equal(second.unchanged, true);
  assert.equal(second.text, first.text);
});

test("the mihomo entry is registered without changing the default", () => {
  assert.equal(renderers.DEFAULT_CORE, "sing-box");
  assert.equal(renderers.RENDERERS["mihomo"], mihomo.renderMihomo);
  assert.equal(renderers.RENDERERS["sing-box"], renderSingBox);
  assert.equal(renderers.OFFENDING_RESOLVERS["mihomo"], mihomo.resolveMihomoTag);
  assert.equal(renderers.RENDERERS["mihomo"].apiReload, false);
});

test("rendererFor resolves yaml targets to mihomo and anything else to the default", () => {
  assert.equal(renderers.rendererFor("core.yaml").core, "mihomo");
  assert.equal(renderers.rendererFor("core.yaml").renderer, mihomo.renderMihomo);
  assert.equal(renderers.rendererFor("core.yml").core, "mihomo");
  assert.equal(renderers.rendererFor("core.json").core, renderers.DEFAULT_CORE);
  assert.equal(renderers.rendererFor("core.YAML").core, renderers.DEFAULT_CORE);
});

// Error line printed by `mihomo -t -f <file>` (Mihomo v1.19.10) for a bad
// second entry of `proxies`: logged on stdout as `proxy <index>: <error>`.
const MIHOMO_PROXY_ERROR =
  'time="2026-10-17T13:22:27Z" level=error msg="proxy 1: ss b.example.com:8388 cipher: nope initialize error: unknown method: nope"';

test("resolveMihomoTag maps the core's proxy position to its node tag", () => {
  const table = [null, "node-a", null];
  assert.deepEqual(mihomo.resolveMihomoTag(MIHOMO_PROXY_ERROR, table), {
    tag: "node-a",
    token: "offending-pattern:proxy 1",
  });
  assert.equal(
    mihomo.resolveMihomoTag(MIHOMO_PROXY_ERROR.replace("proxy 1:", "proxy 0:"), table),
    null
  );
  assert.equal(
    mihomo.resolveMihomoTag(MIHOMO_PROXY_ERROR.replace("proxy 1:", "proxy 7:"), table),
    null
  );
  assert.equal(mihomo.resolveMihomoTag('msg="proxy group[1]: missing name"', table), null);
  assert.equal(mihomo.resolveMihomoTag("FATAL: configuration missing", table), null);
});

test("a failed mihomo check names the offending node from its stdout", async (t) => {
  const { applyRendered } = await import("../../src/lib/proxySubscription/coreConfig/apply.ts");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-mihomo-check-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const adoptedPath = path.join(dir, "config.yaml");
  fs.writeFileSync(adoptedPath, "proxies: []\n");
  const binaryPath = path.join(dir, "mihomo");
  fs.writeFileSync(binaryPath, "#!/bin/sh\nexit 1\n");
  fs.chmodSync(binaryPath, 0o755);
  const outcome = await applyRendered({
    adoptedPath,
    binaryPath,
    renderedText: "proxies: [{name: x}]\n",
    subscriptionId: "sub-1",
    runCheck: async () => {
      throw Object.assign(new Error("Command failed"), { stdout: MIHOMO_PROXY_ERROR, stderr: "" });
    },
    offending: { resolve: mihomo.resolveMihomoTag, table: [null, "node-a"] },
  });
  assert.equal(outcome.status, "beside");
  assert.deepEqual((outcome as { offending?: unknown }).offending, {
    tag: "node-a",
    detail: "offending-pattern:proxy 1",
  });
  assert.equal(fs.readFileSync(adoptedPath, "utf8"), "proxies: []\n");
});

test("each owned listener sends its traffic to its own group, like the sing-box route rules", () => {
  const parsed = parseSubscription(
    [
      "vless://11111111-2222-4333-8444-555555555555@a.example.com:443?security=tls#one",
      "trojan://pw@b.example.com:443#two",
      "ss://YWVzLTI1Ni1nY206c2VjcmV0@c.example.com:8388#three",
    ].join("\n")
  );
  const model = buildCoreModel(ENTRIES, [...parsed.nodes, ...parsed.needsCore] as never);
  const base = "mode: rule\nproxies: []\nrules:\n  - MATCH,DIRECT\n";
  const m = mihomo.renderMihomo(model, base);
  const s = renderSingBox(model, null);
  assert.equal(m.ok, true);
  assert.equal(s.ok, true);
  if (!m.ok || !s.ok) return;
  const after = yaml.load(m.text) as {
    listeners: Array<{ name: string; proxy: string }>;
    "proxy-groups": Array<{ name: string }>;
    rules: string[];
  };
  const groups = new Set(after["proxy-groups"].map((g) => g.name));
  const routes = (
    JSON.parse(s.text) as { route: { rules: Array<{ inbound: string[]; outbound: string }> } }
  ).route.rules;
  assert.ok(after.listeners.length > 0);
  for (const listener of after.listeners) {
    assert.ok(groups.has(listener.proxy), `listener ${listener.name} -> ${listener.proxy}`);
    const route = routes.find((r) => r.inbound[0] === listener.name);
    assert.equal(listener.proxy, route?.outbound);
  }
  assert.deepEqual(after.rules, ["MATCH,DIRECT"]);
});

test("TLS fields follow each mihomo proxy type", () => {
  const U = "11111111-2222-4333-8444-555555555555";
  const project = (value: string) => {
    const res = normalizeSource({ kind: "uri", value });
    assert.equal(res.ok, true, JSON.stringify(res));
    if (!res.ok) throw new Error("unreachable");
    return mihomo.projectCanonicalMihomo(res.node);
  };
  const trojan = project("trojan://pw@203.0.113.5:443?sni=real.example.com#t");
  assert.equal(trojan.sni, "real.example.com");
  assert.equal(trojan.servername, undefined);
  assert.equal(trojan.tls, undefined);
  assert.equal(trojan["client-fingerprint"], undefined);
  const hy2 = project("hysteria2://pw@hy.example.com:443?sni=s.example.com&insecure=1&fp=chrome#h");
  assert.equal(hy2.sni, "s.example.com");
  assert.equal(hy2["skip-cert-verify"], true);
  assert.equal(hy2["client-fingerprint"], undefined);
  const vless = project(`vless://${U}@v.example.com:443?security=tls&sni=s.example.com#v`);
  assert.equal(vless.tls, true);
  assert.equal(vless.servername, "s.example.com");
  assert.equal(vless["client-fingerprint"], undefined);
  const reality = project(
    `vless://${U}@r.example.com:443?security=reality&sni=www.example.com&pbk=KEY&sid=ab#r`
  );
  assert.equal(reality["client-fingerprint"], "chrome");
  assert.deepEqual(reality["reality-opts"], { "public-key": "KEY", "short-id": "ab" });
  const vm = project(
    `vmess://${Buffer.from(JSON.stringify({ add: "m.example.com", port: "443", id: U, net: "tcp" })).toString("base64")}`
  );
  assert.equal(vm.alterId, 0);
  assert.equal(vm.cipher, "auto");
  const v6 = project(`vless://${U}@[2001:db8::1]:443?security=tls#v6`);
  assert.equal(v6.server, "2001:db8::1");
});

test("the adopted YAML keeps keys and their order but not its comments", () => {
  const parsed = parseSubscription(
    "vless://11111111-2222-4333-8444-555555555555@a.example.com:443?security=tls#one"
  );
  const model = buildCoreModel(ENTRIES, [...parsed.nodes, ...parsed.needsCore] as never);
  const base = "# operator note\nmode: rule\nlog-level: info\nproxies: []\n";
  const res = mihomo.renderMihomo(model, base);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  assert.ok(!res.text.includes("# operator note"));
  assert.deepEqual(Object.keys(yaml.load(res.text) as object).slice(0, 3), [
    "mode",
    "log-level",
    "proxies",
  ]);
});

test("sync renders yaml targets with mihomo and json targets with sing-box", async (t) => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-mihomo-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const feed = {
    nodes: [],
    needsCore: [
      {
        name: "sb-node-1",
        source: {
          kind: "object" as const,
          value: { type: "vless", server: "203.0.113.1", server_port: 443, uuid: "u-1" },
        },
      },
    ] as never[],
    format: "v2ray-json",
  };
  const yamlTarget = path.join(dir, "core.yaml");
  fs.writeFileSync(yamlTarget, "proxies: []\n");
  const yamlWarning = await sync.generateForSubscription(
    { coreConfigPath: yamlTarget, localCoreEndpoint: ENTRIES[0] },
    feed
  );
  assert.equal(yamlWarning, null);
  const yamlGenerated = fs.readFileSync(`${yamlTarget}.generated`, "utf8");
  assert.ok(yamlGenerated.includes("proxies:"), `got: ${yamlGenerated.slice(0, 120)}`);
  const jsonTarget = path.join(dir, "core.json");
  fs.writeFileSync(jsonTarget, JSON.stringify({ inbounds: [], outbounds: [] }));
  const jsonWarning = await sync.generateForSubscription(
    { coreConfigPath: jsonTarget, localCoreEndpoint: ENTRIES[0] },
    feed
  );
  assert.equal(jsonWarning, null);
  const jsonGenerated = fs.readFileSync(`${jsonTarget}.generated`, "utf8");
  assert.ok(!jsonGenerated.includes("proxies:"), `got: ${jsonGenerated.slice(0, 120)}`);
});

test("an uppercase yaml suffix resolves to the default core", async (t) => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-mihomo-case-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const feed = {
    nodes: [],
    needsCore: [
      {
        name: "sb-node-1",
        source: {
          kind: "object" as const,
          value: { type: "vless", server: "203.0.113.1", server_port: 443, uuid: "u-1" },
        },
      },
    ] as never[],
    format: "v2ray-json",
  };
  const target = path.join(dir, "core.YAML");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const warning = await sync.generateForSubscription(
    { coreConfigPath: target, localCoreEndpoint: ENTRIES[0] },
    feed
  );
  assert.equal(warning, null);
  const generated = fs.readFileSync(`${target}.generated`, "utf8");
  assert.ok(!generated.includes("proxies:"), `got: ${generated.slice(0, 120)}`);
});

test("the native check table carries a mihomo entry", async () => {
  const { checkArgsFor, CORE_CHECK_ARGS } =
    await import("../../src/lib/proxySubscription/coreConfig/pathGuard.ts");
  assert.deepEqual(checkArgsFor("mihomo"), ["-t", "-f"]);
  assert.equal(checkArgsFor("sing-box")?.join(" "), "check -c");
  assert.ok("mihomo" in CORE_CHECK_ARGS);
});
