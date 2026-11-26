// tests/unit/k8s-helm-security-hardening-20998.test.mjs
//
// Regression guards for the Kubernetes & Helm follow-up hardening wave of #20998
// (issues #21008 and #21014, base commit 5ffa68e835442a12ed1204a2eebf4076c298aecb):
//
//   1. F4 / F6 (P1, #21008) — deploy/kubernetes/base/configmap.yaml and
//      deploy/helm/omniroute/values.yaml must require an API key by default
//      (REQUIRE_API_KEY="true" / config.requireApiKey=true), no overlay may
//      silently revert that posture, NOTES.txt must document both keyed default
//      and explicit keyless warning, and /healthz must stay unauthenticated so
//      startupProbe/readinessProbe remain 200 under REQUIRE_API_KEY=true.
//   2. F5 (P1, #21014) — deploy/kubernetes/base/networkpolicy.yaml (wired into
//      base/kustomization.yaml) and deploy/helm/omniroute/templates/networkpolicy.yaml
//      must enforce default-deny Ingress + Egress, allow ports 20128/20132 ONLY
//      from ingress controller pods (ingress-nginx / traefik) without Kustomize
//      includeSelectors corrupting peer selectors, and restrict Egress to DNS
//      (53 UDP/TCP in kube-system) plus external HTTPS model providers (443/TCP
//      excluding RFC1918, loopback, CGNAT, and 169.254.0.0/16 cloud IMDS).
//   3. F8 (P3, #21014) — deploy/kubernetes/base/deployment.yaml and
//      deploy/helm/omniroute/values.yaml + templates/deployment.yaml must set
//      readOnlyRootFilesystem: true with writable mounts for DATA_DIR (/app/data),
//      /tmp (emptyDir), and /app/.build/next/cache (emptyDir matching distDir).

import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dump as yamlDump, load as yamlLoad, loadAll as yamlLoadAll } from "js-yaml";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel) => readFileSync(path.join(ROOT, rel), "utf8");
const loadDocs = (rel) => yamlLoadAll(read(rel)).filter((d) => d && typeof d === "object");
const loadDoc = (rel) => {
  const doc = yamlLoad(read(rel));
  assert.ok(doc && typeof doc === "object", `expected YAML object in ${rel}`);
  return doc;
};

function findKubectl() {
  for (const candidate of [
    "kubectl",
    "/Users/same7adel/.docker/bin/kubectl",
    "/usr/local/bin/kubectl",
  ]) {
    try {
      execFileSync(candidate, ["version", "--client"], { stdio: "ignore" });
      return candidate;
    } catch {
      // continue probing
    }
  }
  return null;
}

function findGo() {
  for (const candidate of ["go", "/opt/homebrew/bin/go", "/usr/local/bin/go"]) {
    try {
      execFileSync(candidate, ["version"], { stdio: "ignore" });
      return candidate;
    } catch {
      // continue probing
    }
  }
  return null;
}

const KUBECTL = findKubectl();
const GO_BIN = findGo();

/**
 * Evaluates `deploy/helm/omniroute/templates/networkpolicy.yaml` against a
 * synthetic Helm `.Values` object using Go's `text/template` engine (the exact
 * template engine Helm v3 uses) when `go` is installed, with a deterministic JS
 * fallback when `go` is absent.
 */
function renderHelmNetworkPolicy(templateContent, values) {
  const fullValues = {
    service: { port: 20128, liveWsPort: 20132 },
    ...values,
  };

  if (GO_BIN) {
    const dir = mkdtempSync(path.join(tmpdir(), "omniroute-helm-tpl-"));
    try {
      const goSrc = `package main
import (
\t"bytes"
\t"encoding/json"
\t"fmt"
\t"os"
\t"strings"
\t"text/template"
)
func toYAML(v any, indent int) string {
\tpad := strings.Repeat(" ", indent)
\tswitch x := v.(type) {
\tcase []any:
\t\tvar out []string
\t\tfor _, item := range x {
\t\t\tm, ok := item.(map[string]any)
\t\t\tif !ok {
\t\t\t\tout = append(out, fmt.Sprintf("%s- %v", pad, item))
\t\t\t\tcontinue
\t\t\t}
\t\t\tfirst := true
\t\t\tfor k, val := range m {
\t\t\t\tprefix := pad + "  "
\t\t\t\tif first {
\t\t\t\t\tprefix = pad + "- "
\t\t\t\t\tfirst = false
\t\t\t\t}
\t\t\t\tswitch sub := val.(type) {
\t\t\t\tcase []any, map[string]any:
\t\t\t\t\tout = append(out, fmt.Sprintf("%s%s:\\n%s", prefix, k, toYAML(sub, indent+4)))
\t\t\t\tdefault:
\t\t\t\t\tout = append(out, fmt.Sprintf("%s%s: %v", prefix, k, val))
\t\t\t\t}
\t\t\t}
\t\t}
\t\treturn strings.Join(out, "\\n")
\tcase map[string]any:
\t\tvar out []string
\t\tfor k, val := range x {
\t\t\tswitch sub := val.(type) {
\t\t\tcase []any, map[string]any:
\t\t\t\tout = append(out, fmt.Sprintf("%s%s:\\n%s", pad, k, toYAML(sub, indent+2)))
\t\t\tdefault:
\t\t\t\tout = append(out, fmt.Sprintf("%s%s: %v", pad, k, val))
\t\t\t}
\t\t}
\t\treturn strings.Join(out, "\\n")
\tdefault:
\t\treturn fmt.Sprintf("%s%v", pad, v)
\t}
}
func main() {
\ttplBytes, err := os.ReadFile(os.Args[1])
\tif err != nil { panic(err) }
\tvalBytes, err := os.ReadFile(os.Args[2])
\tif err != nil { panic(err) }
\tvar vals map[string]any
\tif err := json.Unmarshal(valBytes, &vals); err != nil { panic(err) }
\tfuncs := template.FuncMap{
\t\t"dict": func() map[string]any { return map[string]any{} },
\t\t"default": func(def, given any) any {
\t\t\tif given == nil { return def }
\t\t\treturn given
\t\t},
\t\t"hasKey": func(m map[string]any, k string) bool {
\t\t\tif m == nil { return false }
\t\t\t_, ok := m[k]
\t\t\treturn ok
\t\t},
\t\t"index": func(m map[string]any, k string) any {
\t\t\tif m == nil { return nil }
\t\t\treturn m[k]
\t\t},
\t\t"include": func(name string, _ any) string {
\t\t\tswitch name {
\t\t\tcase "omniroute.fullname":
\t\t\t\treturn "omniroute"
\t\t\tcase "omniroute.labels":
\t\t\t\treturn "app.kubernetes.io/name: omniroute\\napp.kubernetes.io/instance: omniroute"
\t\t\tcase "omniroute.selectorLabels":
\t\t\t\treturn "app.kubernetes.io/name: omniroute\\napp.kubernetes.io/instance: omniroute"
\t\t\tdefault:
\t\t\t\treturn ""
\t\t\t}
\t\t},
\t\t"nindent": func(spaces int, s string) string {
\t\t\tpad := strings.Repeat(" ", spaces)
\t\t\tlines := strings.Split(strings.TrimRight(s, "\\n"), "\\n")
\t\t\tfor i, l := range lines {
\t\t\t\tlines[i] = pad + l
\t\t\t}
\t\t\treturn "\\n" + strings.Join(lines, "\\n")
\t\t},
\t\t"toYaml": func(v any) string {
\t\t\treturn toYAML(v, 0)
\t\t},
\t}
\tt, err := template.New("networkpolicy.yaml").Funcs(funcs).Option("missingkey=zero").Parse(string(tplBytes))
\tif err != nil {
\t\tfmt.Fprintln(os.Stderr, err)
\t\tos.Exit(1)
\t}
\tvar buf bytes.Buffer
\tif err := t.Execute(&buf, map[string]any{"Values": vals}); err != nil {
\t\tfmt.Fprintln(os.Stderr, err)
\t\tos.Exit(1)
\t}
\tos.Stdout.Write(buf.Bytes())
}
`;
      writeFileSync(path.join(dir, "render.go"), goSrc);
      writeFileSync(path.join(dir, "networkpolicy.yaml"), templateContent);
      writeFileSync(path.join(dir, "values.json"), JSON.stringify(fullValues));
      const res = spawnSync(
        GO_BIN,
        [
          "run",
          path.join(dir, "render.go"),
          path.join(dir, "networkpolicy.yaml"),
          path.join(dir, "values.json"),
        ],
        { encoding: "utf8", timeout: 15_000 }
      );
      if (res.status !== 0) {
        throw new Error(`Helm Go template render failed: ${res.stderr || res.stdout}`);
      }
      return res.stdout;
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }

  // Deterministic JS fallback when Go is absent in CI
  if (
    /\.Values\.networkPolicy\.enabled/.test(templateContent) &&
    fullValues.networkPolicy == null
  ) {
    throw new Error("nil pointer evaluating interface {}.enabled");
  }
  const np = fullValues.networkPolicy ?? {};
  const enabled = Object.prototype.hasOwnProperty.call(np, "enabled") ? Boolean(np.enabled) : true;
  if (!enabled) return "";
  let out = templateContent
    .replace(/\{\{-?\s*\/\*[\s\S]*?\*\/\s*-?\}\}\n?/g, "")
    .replace(/\{\{-?\s*\$np\s*:=\s*\.Values\.networkPolicy\s*\|\s*default\s+dict\s*-?\}\}\n?/g, "")
    .replace(/\{\{-?\s*\$npEnabled\s*:=\s*true\s*-?\}\}\n?/g, "")
    .replace(
      /\{\{-?\s*if\s+hasKey\s+\$np\s+"enabled"\s*-?\}\}[\s\S]*?\{\{-?\s*end\s*-?\}\}\n?/g,
      ""
    )
    .replace(/^\s*\{\{-?\s*if\s+\$npEnabled\s*-?\}\}\n?/m, "")
    .replace(/\{\{\s*include\s+"omniroute\.fullname"\s+\.\s*\}\}/g, "omniroute")
    .replace(
      /\{\{-?\s*include\s+"omniroute\.labels"\s+\.\s*\|\s*nindent\s+4\s*\}\}/g,
      "\n    app.kubernetes.io/name: omniroute\n    app.kubernetes.io/instance: omniroute"
    )
    .replace(
      /\{\{-?\s*include\s+"omniroute\.selectorLabels"\s+\.\s*\|\s*nindent\s+6\s*\}\}/g,
      "\n      app.kubernetes.io/name: omniroute\n      app.kubernetes.io/instance: omniroute"
    )
    .replace(/\{\{\s*\.Values\.service\.port\s*\}\}/g, String(fullValues.service.port))
    .replace(/\{\{\s*\.Values\.service\.liveWsPort\s*\}\}/g, String(fullValues.service.liveWsPort));
  const extra = np.extraEgress;
  if (Array.isArray(extra) && extra.length > 0) {
    const dumped = yamlDump(extra)
      .trimEnd()
      .split("\n")
      .map((l) => `    ${l}`)
      .join("\n");
    out = out.replace(
      /\{\{-?\s*with\s+\(index\s+\$np\s+"extraEgress"\)\s*\}\}[\s\S]*?\{\{-?\s*end\s*\}\}/,
      `\n${dumped}`
    );
  } else {
    out = out.replace(
      /\n?\s*\{\{-?\s*with\s+\(index\s+\$np\s+"extraEgress"\)\s*\}\}[\s\S]*?\{\{-?\s*end\s*\}\}/,
      ""
    );
  }
  out = out.replace(/\n?\{\{-?\s*end\s*\}\}\s*$/, "\n");
  return out;
}

// ── 1. F4 & F6: REQUIRE_API_KEY default true in Kustomize + Helm (#21008) ────

test('k8s base ConfigMap defaults REQUIRE_API_KEY to "true" (#21008)', () => {
  const cm = loadDoc("deploy/kubernetes/base/configmap.yaml");
  assert.equal(cm.kind, "ConfigMap");
  assert.equal(
    cm.data?.REQUIRE_API_KEY,
    "true",
    'deploy/kubernetes/base/configmap.yaml must ship REQUIRE_API_KEY: "true" so overlays with Ingress never expose keyless /v1/*'
  );
});

test("no k8s overlay reverts REQUIRE_API_KEY back to false (#21008)", () => {
  const overlaysRoot = path.join(ROOT, "deploy/kubernetes/overlays");
  const overlays = readdirSync(overlaysRoot).filter((d) =>
    statSync(path.join(overlaysRoot, d)).isDirectory()
  );
  assert.ok(overlays.length >= 2, "expected k8s and k3s overlays");

  for (const overlay of overlays) {
    const dir = path.join(overlaysRoot, overlay);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".yaml")) continue;
      for (const doc of loadDocs(`deploy/kubernetes/overlays/${overlay}/${file}`)) {
        if (doc.kind === "ConfigMap" && doc.data && "REQUIRE_API_KEY" in doc.data) {
          assert.equal(
            doc.data.REQUIRE_API_KEY,
            "true",
            `overlay ${overlay}/${file} must not disable REQUIRE_API_KEY by default`
          );
        }
      }
    }
  }
});

test("Helm chart defaults config.requireApiKey to true and documents it in NOTES.txt (#21008)", () => {
  const values = loadDoc("deploy/helm/omniroute/values.yaml");
  assert.equal(
    values.config?.requireApiKey,
    true,
    "deploy/helm/omniroute/values.yaml must default config.requireApiKey to true"
  );

  const cmTpl = read("deploy/helm/omniroute/templates/configmap.yaml");
  assert.match(
    cmTpl,
    /REQUIRE_API_KEY:\s*\{\{\s*\.Values\.config\.requireApiKey\s*\|\s*quote\s*\}\}/,
    "Helm ConfigMap template must render REQUIRE_API_KEY from .Values.config.requireApiKey"
  );

  const notes = read("deploy/helm/omniroute/templates/NOTES.txt");
  assert.match(notes, /if \.Values\.config\.requireApiKey/, "NOTES.txt must cover keyed default");
  assert.match(notes, /config\.requireApiKey=true/, "NOTES.txt must state API key auth is on");
  assert.match(notes, /config\.requireApiKey is false/, "NOTES.txt must keep the keyless warning");
});

test("Kubernetes startup/readiness /healthz probes remain exempt from REQUIRE_API_KEY", () => {
  const deploy = loadDoc("deploy/kubernetes/base/deployment.yaml");
  const container = deploy.spec?.template?.spec?.containers?.[0];
  assert.equal(container?.startupProbe?.httpGet?.path, "/healthz");
  assert.equal(container?.readinessProbe?.httpGet?.path, "/healthz");

  // /healthz must stay out of src/proxy.ts matcher and import no auth layer so
  // enabling REQUIRE_API_KEY="true" never causes probe 401s.
  const proxySrc = read("src/proxy.ts");
  assert.doesNotMatch(proxySrc, /\/healthz/, "/healthz must remain outside src/proxy.ts matcher");
  const healthzSrc = read("src/app/healthz/route.ts");
  assert.doesNotMatch(healthzSrc, /apiAuth|routeGuard|requireApiKey/i);
});

// ── 2. F5: NetworkPolicy baseline in Kustomize + Helm (#21014) ───────────────

const REQUIRED_BLOCKED_CIDRS = [
  "10.0.0.0/8",
  "172.16.0.0/12",
  "192.168.0.0/16",
  "169.254.0.0/16",
  "100.64.0.0/10",
  "127.0.0.0/8",
  "198.18.0.0/15",
];

function selectedAppNames(podSelector) {
  const names = [];
  if (podSelector?.matchLabels?.["app.kubernetes.io/name"]) {
    names.push(podSelector.matchLabels["app.kubernetes.io/name"]);
  }
  for (const expr of podSelector?.matchExpressions ?? []) {
    if (expr.key === "app.kubernetes.io/name" && expr.operator === "In") {
      names.push(...(expr.values ?? []));
    }
  }
  return names;
}

function assertBaselineNetworkPolicy(policy, label) {
  assert.equal(policy.apiVersion, "networking.k8s.io/v1", `${label}: apiVersion`);
  assert.equal(policy.kind, "NetworkPolicy", `${label}: kind`);
  assert.deepEqual(
    policy.spec?.policyTypes,
    ["Ingress", "Egress"],
    `${label}: must enforce both Ingress and Egress (default-deny for unmatched traffic)`
  );
  assert.equal(
    policy.spec?.podSelector?.matchLabels?.["app.kubernetes.io/name"],
    "omniroute",
    `${label}: podSelector must target omniroute pods`
  );

  // Ingress: ports 20128 & 20132 from ingress controller pods ONLY.
  const ingressRules = policy.spec?.ingress ?? [];
  assert.equal(ingressRules.length, 1, `${label}: expected a single tight ingress rule`);
  const [ingRule] = ingressRules;
  const ingPorts = (ingRule.ports ?? []).map((p) => `${p.protocol ?? "TCP"}:${p.port}`).sort();
  assert.deepEqual(
    ingPorts,
    ["TCP:20128", "TCP:20132"],
    `${label}: ingress must allow only TCP 20128 (http) and 20132 (live-ws)`
  );

  const peers = ingRule.from ?? [];
  assert.ok(peers.length >= 2, `${label}: ingress must list explicit ingress-controller peers`);
  for (const peer of peers) {
    assert.ok(
      peer.namespaceSelector && peer.podSelector,
      `${label}: every ingress peer must pair namespaceSelector AND podSelector (no whole-namespace allow)`
    );
    assert.ok(!peer.ipBlock, `${label}: ingress must not open raw ipBlocks`);
    // Guard against Kustomize includeSelectors injecting omniroute's own label into peer podSelector!
    assert.ok(
      !selectedAppNames(peer.podSelector).includes("omniroute"),
      `${label}: peer podSelector was corrupted with app.kubernetes.io/name=omniroute`
    );
  }

  const controllerNames = peers.flatMap((p) => selectedAppNames(p.podSelector));
  assert.ok(
    controllerNames.includes("ingress-nginx"),
    `${label}: must allow ingress-nginx controller pods (k8s overlay)`
  );
  assert.ok(
    controllerNames.includes("traefik"),
    `${label}: must allow traefik controller pods (k3s overlay)`
  );
  const nginxPeer = peers.find((p) => selectedAppNames(p.podSelector).includes("ingress-nginx"));
  const nginxComponents = (nginxPeer?.podSelector?.matchExpressions ?? [])
    .filter((e) => e.key === "app.kubernetes.io/component" && e.operator === "In")
    .flatMap((e) => e.values ?? []);
  assert.deepEqual(
    nginxComponents,
    ["controller"],
    `${label}: ingress-nginx peer must require app.kubernetes.io/component=controller`
  );

  // Egress: (1) DNS 53 UDP+TCP to kube-system DNS + NodeLocal DNSCache, (2) HTTPS 443 TCP to public IPs only.
  const egressRules = policy.spec?.egress ?? [];
  assert.equal(
    egressRules.length,
    2,
    `${label}: expected exactly 2 egress rules (DNS + HTTPS providers)`
  );

  const dnsRule = egressRules.find((r) => (r.ports ?? []).some((p) => p.port === 53));
  assert.ok(dnsRule, `${label}: must include DNS egress rule on port 53`);
  const dnsPorts = (dnsRule.ports ?? []).map((p) => `${p.protocol}:${p.port}`).sort();
  assert.deepEqual(
    dnsPorts,
    ["TCP:53", "UDP:53"],
    `${label}: DNS rule must allow UDP/53 and TCP/53`
  );
  assert.ok(
    (dnsRule.to ?? []).length >= 2,
    `${label}: DNS rule must include kube-system DNS pods and NodeLocal DNSCache listener`
  );
  let sawNodeLocalPodLabel = false;
  let sawNodeLocalIpBlock = false;
  for (const dest of dnsRule.to) {
    if (dest.ipBlock) {
      assert.equal(
        dest.ipBlock.cidr,
        "169.254.20.10/32",
        `${label}: DNS ipBlock must only allow the /32 NodeLocal DNSCache listener`
      );
      sawNodeLocalIpBlock = true;
      continue;
    }
    assert.equal(
      dest.namespaceSelector?.matchLabels?.["kubernetes.io/metadata.name"],
      "kube-system",
      `${label}: DNS egress pod rule must be scoped to kube-system namespace`
    );
    assert.ok(
      dest.podSelector && !selectedAppNames(dest.podSelector).includes("omniroute"),
      `${label}: DNS podSelector must target DNS pods without omniroute label corruption`
    );
    for (const expr of dest.podSelector?.matchExpressions ?? []) {
      if (expr.key === "k8s-app" && (expr.values ?? []).includes("node-local-dns")) {
        sawNodeLocalPodLabel = true;
      }
    }
  }
  assert.ok(sawNodeLocalPodLabel, `${label}: DNS rule must include k8s-app=node-local-dns`);
  assert.ok(sawNodeLocalIpBlock, `${label}: DNS rule must include 169.254.20.10/32 listener`);

  const httpsRule = egressRules.find((r) => (r.ports ?? []).some((p) => p.port === 443));
  assert.ok(httpsRule, `${label}: must include HTTPS egress rule on port 443 for model providers`);
  const httpsPorts = (httpsRule.ports ?? []).map((p) => `${p.protocol ?? "TCP"}:${p.port}`);
  assert.deepEqual(httpsPorts, ["TCP:443"], `${label}: provider egress must allow TCP/443 only`);
  assert.equal(
    (httpsRule.to ?? []).length,
    1,
    `${label}: provider egress must use a bounded ipBlock`
  );
  const ipBlock = httpsRule.to[0]?.ipBlock;
  assert.equal(ipBlock?.cidr, "0.0.0.0/0", `${label}: provider ipBlock base CIDR`);
  for (const cidr of REQUIRED_BLOCKED_CIDRS) {
    assert.ok(
      (ipBlock?.except ?? []).includes(cidr),
      `${label}: provider egress ipBlock must block internal/metadata CIDR ${cidr}`
    );
  }
}

test("k8s base ships NetworkPolicy wired into kustomization.yaml (#21014)", () => {
  const npPath = path.join(ROOT, "deploy/kubernetes/base/networkpolicy.yaml");
  assert.ok(existsSync(npPath), "deploy/kubernetes/base/networkpolicy.yaml must exist");

  const kustomization = loadDoc("deploy/kubernetes/base/kustomization.yaml");
  assert.ok(
    (kustomization.resources ?? []).includes("networkpolicy.yaml"),
    "deploy/kubernetes/base/kustomization.yaml must list networkpolicy.yaml in resources"
  );

  const docs = loadDocs("deploy/kubernetes/base/networkpolicy.yaml");
  const policies = docs.filter((d) => d.kind === "NetworkPolicy");
  assert.ok(policies.length >= 1, "expected NetworkPolicy in base/networkpolicy.yaml");
  const mainPolicy = policies.find((p) => (p.spec?.ingress ?? []).length > 0) ?? policies[0];
  assertBaselineNetworkPolicy(mainPolicy, "base/networkpolicy.yaml");
});

test("Helm chart ships enabled-by-default NetworkPolicy template matching base (#21014)", () => {
  const values = loadDoc("deploy/helm/omniroute/values.yaml");
  assert.equal(
    values.networkPolicy?.enabled,
    true,
    "deploy/helm/omniroute/values.yaml must enable networkPolicy by default"
  );

  const tplPath = path.join(ROOT, "deploy/helm/omniroute/templates/networkpolicy.yaml");
  assert.ok(existsSync(tplPath), "deploy/helm/omniroute/templates/networkpolicy.yaml must exist");
  const tpl = read("deploy/helm/omniroute/templates/networkpolicy.yaml");
  assert.doesNotMatch(
    tpl,
    /\.Values\.networkPolicy\.enabled/,
    "Helm template must guard .Values.networkPolicy for --reuse-values upgrades"
  );
  assert.match(tpl, /\.Values\.networkPolicy \| default dict/);
  assert.match(tpl, /hasKey \$np "enabled"/);
  assert.match(tpl, /kind:\s*NetworkPolicy/);
  assert.match(tpl, /- Ingress/);
  assert.match(tpl, /- Egress/);
  assert.match(tpl, /ingress-nginx/);
  assert.match(tpl, /app\.kubernetes\.io\/component/);
  assert.match(tpl, /node-local-dns/);
  assert.match(tpl, /169\.254\.20\.10\/32/);
  assert.match(tpl, /traefik/);
  for (const cidr of REQUIRED_BLOCKED_CIDRS) {
    assert.ok(tpl.includes(cidr), `Helm NetworkPolicy template must exclude ${cidr}`);
  }
});

// ── 3. F8: readOnlyRootFilesystem: true + writable emptyDir mounts (#21014) ──

test("k8s base Deployment enforces readOnlyRootFilesystem: true with emptyDir mounts (#21014)", () => {
  const deploy = loadDoc("deploy/kubernetes/base/deployment.yaml");
  const podSpec = deploy.spec?.template?.spec;
  const container = podSpec?.containers?.[0];
  assert.ok(container, "expected omniroute container");

  assert.equal(
    container.securityContext?.readOnlyRootFilesystem,
    true,
    "container.securityContext.readOnlyRootFilesystem must be true"
  );
  assert.equal(container.securityContext?.allowPrivilegeEscalation, false);
  assert.deepEqual(container.securityContext?.capabilities?.drop, ["ALL"]);

  const npmCacheEnv = (container.env ?? []).find((e) => e.name === "npm_config_cache");
  assert.equal(
    npmCacheEnv?.value,
    "/tmp/npm-cache",
    "Deployment must point npm_config_cache at writable /tmp/npm-cache under readOnlyRootFilesystem"
  );

  // Verify next.config.mjs still uses .build/next so the cache mount path stays accurate.
  const nextCfg = read("next.config.mjs");
  assert.match(nextCfg, /\.build\/next/, "re-check Next.js distDir if next.config.mjs changed");

  const mounts = new Map((container.volumeMounts ?? []).map((m) => [m.mountPath, m.name]));
  assert.equal(mounts.get("/app/data"), "data", "DATA_DIR (/app/data) must stay mounted");
  assert.ok(mounts.has("/tmp"), "must mount writable /tmp for Node/SQLite temp files");
  assert.ok(
    mounts.has("/app/.build/next/cache"),
    "must mount writable /app/.build/next/cache for Next.js standalone distDir"
  );

  const volumes = new Map((podSpec.volumes ?? []).map((v) => [v.name, v]));
  assert.ok(volumes.get("data")?.persistentVolumeClaim, "data volume must stay backed by PVC");
  assert.ok(
    volumes.get(mounts.get("/tmp"))?.emptyDir !== undefined,
    "/tmp volume must be an emptyDir"
  );
  assert.ok(
    volumes.get(mounts.get("/app/.build/next/cache"))?.emptyDir !== undefined,
    "/app/.build/next/cache volume must be an emptyDir"
  );
});

test("Helm chart enforces readOnlyRootFilesystem: true and mounts emptyDir volumes (#21014)", () => {
  const values = loadDoc("deploy/helm/omniroute/values.yaml");
  assert.equal(
    values.containerSecurityContext?.readOnlyRootFilesystem,
    true,
    "deploy/helm/omniroute/values.yaml must default containerSecurityContext.readOnlyRootFilesystem to true"
  );

  const deployTpl = read("deploy/helm/omniroute/templates/deployment.yaml");
  assert.match(deployTpl, /name:\s*npm_config_cache/, "Helm Deployment must set npm_config_cache");
  assert.match(deployTpl, /value:\s*\/tmp\/npm-cache/, "Helm Deployment npm_config_cache path");
  assert.match(deployTpl, /mountPath:\s*\/tmp/, "Helm Deployment must mount /tmp");
  assert.match(
    deployTpl,
    /mountPath:\s*\/app\/\.build\/next\/cache/,
    "Helm Deployment must mount /app/.build/next/cache"
  );
  assert.match(deployTpl, /emptyDir:\s*\{\}/, "Helm Deployment must define emptyDir volumes");
});

// ── 4. Live kubectl kustomize render verification (base + both overlays) ─────

test("kubectl kustomize renders valid hardened manifests for base, k8s, and k3s", (t) => {
  if (!KUBECTL) {
    t.skip("kubectl not installed in PATH");
    return;
  }

  for (const target of [
    "deploy/kubernetes/base",
    "deploy/kubernetes/overlays/k8s",
    "deploy/kubernetes/overlays/k3s",
  ]) {
    const rendered = execFileSync(KUBECTL, ["kustomize", path.join(ROOT, target)], {
      encoding: "utf8",
    });
    const docs = yamlLoadAll(rendered).filter((d) => d && typeof d === "object");

    const cm = docs.find((d) => d.kind === "ConfigMap" && d.metadata?.name === "omniroute-config");
    assert.ok(cm, `${target}: missing rendered ConfigMap`);
    assert.equal(
      cm.data?.REQUIRE_API_KEY,
      "true",
      `${target}: rendered REQUIRE_API_KEY must be "true"`
    );

    const deploy = docs.find((d) => d.kind === "Deployment" && d.metadata?.name === "omniroute");
    assert.ok(deploy, `${target}: missing rendered Deployment`);
    const container = deploy.spec?.template?.spec?.containers?.[0];
    assert.equal(
      container?.securityContext?.readOnlyRootFilesystem,
      true,
      `${target}: rendered Deployment must keep readOnlyRootFilesystem: true`
    );

    const policies = docs.filter((d) => d.kind === "NetworkPolicy");
    assert.ok(policies.length >= 1, `${target}: rendered output must include NetworkPolicy`);
    const mainPolicy = policies.find((p) => (p.spec?.ingress ?? []).length > 0) ?? policies[0];
    assertBaselineNetworkPolicy(mainPolicy, `rendered ${target}`);
  }
});

// ── 5. Behavioral Helm NetworkPolicy template render (--reuse-values & toggles) ─

test("Helm NetworkPolicy template renders cleanly when networkPolicy is absent (--reuse-values) and honors enabled:false (#21014)", () => {
  const tpl = read("deploy/helm/omniroute/templates/networkpolicy.yaml");

  // 1. Missing `.Values.networkPolicy` (simulates `helm upgrade --reuse-values` from older chart)
  const renderedMissingMap = renderHelmNetworkPolicy(tpl, {});
  const missingDocs = yamlLoadAll(renderedMissingMap).filter((d) => d && typeof d === "object");
  assert.equal(
    missingDocs.length,
    1,
    "missing .Values.networkPolicy must default to rendering 1 NetworkPolicy"
  );
  assertBaselineNetworkPolicy(
    missingDocs[0],
    "Helm networkpolicy.yaml (--reuse-values missing map)"
  );

  // 2. Explicit `networkPolicy.enabled: false` must disable rendering completely
  const renderedDisabled = renderHelmNetworkPolicy(tpl, { networkPolicy: { enabled: false } });
  const disabledDocs = yamlLoadAll(renderedDisabled).filter((d) => d && typeof d === "object");
  assert.equal(disabledDocs.length, 0, "networkPolicy.enabled=false must emit zero manifests");

  // 3. Present map `{}` without `enabled` key defaults to enabled
  const renderedEmptyMap = renderHelmNetworkPolicy(tpl, { networkPolicy: {} });
  const emptyMapDocs = yamlLoadAll(renderedEmptyMap).filter((d) => d && typeof d === "object");
  assert.equal(emptyMapDocs.length, 1, "networkPolicy: {} must default to enabled");
  assertBaselineNetworkPolicy(emptyMapDocs[0], "Helm networkpolicy.yaml (empty map)");

  // 4. `extraEgress` appends custom egress rules cleanly
  const renderedExtra = renderHelmNetworkPolicy(tpl, {
    networkPolicy: {
      enabled: true,
      extraEgress: [
        {
          to: [{ ipBlock: { cidr: "169.254.25.10/32" } }],
          ports: [
            { protocol: "UDP", port: 53 },
            { protocol: "TCP", port: 53 },
          ],
        },
      ],
    },
  });
  const extraDocs = yamlLoadAll(renderedExtra).filter((d) => d && typeof d === "object");
  assert.equal(extraDocs.length, 1);
  assert.equal(
    extraDocs[0].spec?.egress?.length,
    3,
    "networkPolicy.extraEgress must append custom egress rule alongside baseline DNS + HTTPS rules"
  );
});

test("KUBERNETES_DEPLOYMENT_GUIDE.md documents --reuse-values, scale-out controller namespaces, and custom NodeLocal DNSCache IPs (#21014)", () => {
  const guide = read("docs/ops/KUBERNETES_DEPLOYMENT_GUIDE.md");

  assert.match(
    guide,
    /--reuse-values[\s\S]{0,600}config\.requireApiKey=true/,
    "deployment guide must warn that --reuse-values does not merge new chart defaults"
  );

  // Scale-out section must name the exact namespaces permitted by the baseline NetworkPolicy
  const scaleOutIdx = guide.indexOf("### Scale-out");
  assert.ok(scaleOutIdx !== -1, "expected ### Scale-out section in KUBERNETES_DEPLOYMENT_GUIDE.md");
  const scaleOutSection = guide.slice(scaleOutIdx, scaleOutIdx + 1800);
  assert.match(
    scaleOutSection,
    /ingress-nginx.*namespace.*`ingress-nginx`|`ingress-nginx`\s+namespace/i,
    "Scale-out section must state that ingress-nginx is only admitted from namespace `ingress-nginx` by default"
  );
  assert.match(
    scaleOutSection,
    /`kube-system`\s+or\s+`traefik`/,
    "Scale-out section must state that Traefik is only admitted from `kube-system` or `traefik` namespaces by default"
  );
  assert.match(
    scaleOutSection,
    /other\s+namespace/i,
    "Scale-out section must note that controllers in other namespaces also require an additive NetworkPolicy or overlay peer"
  );

  // Troubleshooting section must cover custom NodeLocal DNSCache listener IPs
  const troubleIdx = guide.indexOf("## 8. Troubleshooting");
  assert.ok(troubleIdx !== -1, "expected ## 8. Troubleshooting section");
  const troubleSection = guide.slice(troubleIdx);
  assert.match(
    troubleSection,
    /169\.254\.20\.10\/32/,
    "Troubleshooting must mention default NodeLocal DNSCache listener 169.254.20.10/32 and custom listener override"
  );
});
