#!/usr/bin/env node
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import { evaluateParity } from "./lib/parity.mjs";
import { createEphemeralKey } from "./lib/adminClient.mjs";
import { checkSse } from "./lib/sseCheck.mjs";
import { promptfooToCtrf } from "./lib/promptfooToCtrf.mjs";

// ── env ──────────────────────────────────────────────────────────────────
if (fs.existsSync(".env.homolog")) {
  for (const line of fs.readFileSync(".env.homolog", "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const BASE = process.env.HOMOLOG_BASE_URL;
if (!BASE || !process.env.HOMOLOG_ADMIN_PASSWORD) {
  console.error("Configure .env.homolog (HOMOLOG_BASE_URL, HOMOLOG_ADMIN_PASSWORD)");
  process.exit(2);
}
fs.rmSync("homolog-report", { recursive: true, force: true });
// raw/ fica FORA do merge CTRF: `ctrf merge` tenta mesclar qualquer *.json com
// "results" key and breaks into promptfoo's raw output.
fs.mkdirSync("homolog-report/raw", { recursive: true });
const layers = []; // {name, ok, detail}
const record = (name, ok, detail = "") => {
  layers.push({ name, ok, detail });
  console.log(`${ok ? "✅" : "❌"} ${name}${detail ? ` — ${detail}` : ""}`);
};

// ── L0 health/parity ────────────────────────────────────────────────────
const expectedVersion =
  process.env.HOMOLOG_EXPECT_VERSION || JSON.parse(fs.readFileSync("package.json", "utf8")).version;
const healthRes = await fetch(`${BASE}/api/monitoring/health`);
const health = await healthRes.json().catch(() => ({}));
const parity = evaluateParity(health, { expectedVersion, httpStatus: healthRes.status });
record("L0 health/parity", parity.ok, parity.failures.join("; "));
if (!parity.ok) {
  console.error("Deploy divergente — abortando.");
  writeSummary(layers, BASE, expectedVersion);
  process.exit(1);
}

// ── ephemeral key ──────────────────────────── ────────────────────────────
const eph = await createEphemeralKey(BASE, process.env.HOMOLOG_ADMIN_PASSWORD);
process.env.HOMOLOG_API_KEY = eph.key;
try {
  // smoke model = 1st critical-tier model present in the catalog
  const models = (
    await (
      await fetch(`${BASE}/v1/models`, { headers: { Authorization: `Bearer ${eph.key}` } })
    ).json()
  ).data;
  const critical = (process.env.HOMOLOG_CRITICAL_PROVIDERS || "openai").split(",");
  const smokeModel =
    models.find((m) => critical.some((p) => m.id.startsWith(`${p}/`)))?.id || models[0].id;

  // ── L1 httpYac + SSE ───────────────────────────────────────────────────
  const hy = spawnSync(
    "npx",
    [
      "httpyac",
      "send",
      "tests/homolog/api/core.http",
      "--all",
      "--var",
      `baseUrl=${BASE}`,
      "--var",
      `apiKey=${eph.key}`,
      "--var",
      `smokeModel=${smokeModel}`,
      "--junit",
      "--output",
      "none",
    ],
    { encoding: "utf8" }
  );
  fs.writeFileSync("homolog-report/httpyac-junit.xml", hy.stdout || "");
  record("L1 API (httpYac)", hy.status === 0);
  const sse = await checkSse(BASE, eph.key, smokeModel);
  record("L1 SSE streaming", sse.ok, (sse.failures || []).join("; "));

  // ── L2 providers reais ─────────────────────────────────────────────────
  try {
    execSync("node scripts/homolog/gen-promptfoo.mjs", { stdio: "inherit", env: process.env });
    spawnSync(
      "npx",
      [
        "promptfoo",
        "eval",
        "-c",
        "homolog-report/promptfooconfig.yaml",
        "-o",
        "homolog-report/raw/promptfoo.json",
        "--no-cache",
      ],
      { encoding: "utf8", env: process.env }
    );
    const pfOut = JSON.parse(fs.readFileSync("homolog-report/raw/promptfoo.json", "utf8"));
    const pfCtrf = promptfooToCtrf(pfOut);
    fs.writeFileSync("homolog-report/providers-ctrf.json", JSON.stringify(pfCtrf, null, 2));
    record(
      "L2 providers reais",
      pfCtrf.results.summary.failed === 0,
      `${pfCtrf.results.summary.passed}/${pfCtrf.results.summary.tests} providers OK`
    );
  } catch (err) {
    // generator/eval breaking is a failure of the layer — the run continues to L4 and the cleanup
    record("L2 providers reais", false, err.message);
  }

  // ── L4 UI ──────────────────────────────────────────────────────────────
  const pw = spawnSync(
    "npx",
    ["playwright", "test", "-c", "tests/homolog/ui/playwright.config.ts"],
    {
      stdio: "inherit",
      env: process.env,
    }
  );
  record("L4 UI (Playwright)", pw.status === 0);
} finally {
  await eph
    .revoke()
    .then(() => record("cleanup: ephemeral key revoked", true))
    .catch((e) => record("cleanup: ephemeral key revoked", false, e.message));
}

// ── L5 unified report ─────────────────────────────────────────────────
spawnSync(
  "npx",
  ["junit-to-ctrf", "homolog-report/httpyac-junit.xml", "-o", "homolog-report/api-ctrf.json"],
  {
    stdio: "inherit",
  }
);
spawnSync(
  "npx",
  [
    "ctrf",
    "merge",
    "homolog-report",
    "--output",
    "homolog-ctrf.json",
    "--output-dir",
    "homolog-report",
  ],
  {
    stdio: "inherit",
  }
);

writeSummary(layers, BASE, expectedVersion);
const failed = layers.filter((l) => !l.ok);
process.exit(failed.length ? 1 : 0);

function writeSummary(rows, base, version) {
  const md = [
    "# Homologação — relatório",
    "",
    `Target: ${base} · expected version: ${version}`,
    "",
    "| layer | result | detail |",
    "|---|---|---|",
    ...rows.map((l) => `| ${l.name} | ${l.ok ? "✅" : "❌"} | ${l.detail} |`),
  ].join("\n");
  fs.writeFileSync("homolog-report/summary.md", md);
  console.log(`\n${md}\n\nReport: homolog-report/ (unified CTRF: homolog-ctrf.json)`);
}
