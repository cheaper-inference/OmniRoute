// Follow-up to #16643 (active AgentBridge cert in root-CA mode). Two more
// consumers still hard-coded the legacy `<DATA_DIR>/mitm/server.crt`:
//
//   1. /api/settings/mitm — `?download=cert` streamed server.crt, the
//      `certExists` fallback checked server.crt, and `regenerate-cert`
//      deleted + re-minted server.crt/server.key (never rotating the root CA,
//      and flipping a fresh install into the legacy model).
//   2. src/mitm/repair.ts — the repair "untrust" step only looked at
//      server.crt, so under the root-CA model repair left ca.crt trusted.
//
// Both now resolve the active cert through src/mitm/cert/activeCert.ts.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { decideCertMigration } from "../../src/mitm/cert/migration.ts";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const DATA_DIR = process.env.DATA_DIR || fs.mkdtempSync(path.join(os.tmpdir(), "mitm-active-"));
process.env.DATA_DIR = DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsMitmRoute = await import("../../src/app/api/settings/mitm/route.ts");
const repair = await import("../../src/mitm/repair.ts");

const CA_PEM = "-----BEGIN CERTIFICATE-----\nROOT-CA-FAKE\n-----END CERTIFICATE-----\n";
const LEAF_PEM = "-----BEGIN CERTIFICATE-----\nLEGACY-LEAF-FAKE\n-----END CERTIFICATE-----\n";
const FAKE_KEY = "-----BEGIN PRIVATE KEY-----\nFAKE\n-----END PRIVATE KEY-----\n";

const certDir = path.join(DATA_DIR, "mitm");
const caCrt = path.join(certDir, "ca.crt");
const serverCrt = path.join(certDir, "server.crt");

function writeCertFiles(files: { ca?: boolean; leaf?: boolean }) {
  fs.rmSync(certDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(certDir, { recursive: true });
  if (files.ca) {
    fs.writeFileSync(caCrt, CA_PEM);
    fs.writeFileSync(path.join(certDir, "ca.key"), FAKE_KEY);
  }
  if (files.leaf) {
    fs.writeFileSync(serverCrt, LEAF_PEM);
    fs.writeFileSync(path.join(certDir, "server.key"), FAKE_KEY);
  }
}

async function withFlag<T>(flag: string | undefined, fn: () => Promise<T>): Promise<T> {
  const prev = process.env.MITM_ROOT_CA_ENABLED;
  if (flag === undefined) delete process.env.MITM_ROOT_CA_ENABLED;
  else process.env.MITM_ROOT_CA_ENABLED = flag;
  try {
    return await fn();
  } finally {
    if (prev === undefined) delete process.env.MITM_ROOT_CA_ENABLED;
    else process.env.MITM_ROOT_CA_ENABLED = prev;
  }
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(certDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const getSettings = async (query = "") =>
  settingsMitmRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/settings/mitm${query}`)
  );

const postRegenerate = async (body: Record<string, unknown> = { action: "regenerate-cert" }) =>
  settingsMitmRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/settings/mitm", {
      method: "POST",
      body,
    })
  );

// ── /api/settings/mitm ?download=cert ────────────────────────────────────────

test("settings/mitm download: root-CA model serves ca.crt, not the legacy server.crt", async () => {
  writeCertFiles({ ca: true, leaf: true });
  await withFlag(undefined, async () => {
    const res = await getSettings("?download=cert");
    assert.equal(res.status, 200);
    assert.equal(await res.text(), CA_PEM);
    assert.match(res.headers.get("content-disposition") || "", /omniroute-mitm-ca\.crt/);
  });
});

test("settings/mitm download: root-CA model with no CA yet 404s instead of serving server.crt", async () => {
  writeCertFiles({ leaf: true });
  await withFlag("true", async () => {
    const res = await getSettings("?download=cert");
    assert.equal(res.status, 404);
    const body = (await res.json()) as { error?: string };
    assert.match(String(body.error), /root CA/i);
  });
});

test("settings/mitm download: legacy-leaf install keeps serving server.crt", async () => {
  writeCertFiles({ leaf: true });
  await withFlag(undefined, async () => {
    const res = await getSettings("?download=cert");
    assert.equal(res.status, 200);
    assert.equal(await res.text(), LEAF_PEM);
    assert.match(res.headers.get("content-disposition") || "", /filename="omniroute-mitm\.crt"/);
  });
});

// ── /api/settings/mitm certExists ────────────────────────────────────────────

test("settings/mitm status: a stale server.crt does not count as the cert in root-CA mode", async () => {
  writeCertFiles({ leaf: true });
  await withFlag("true", async () => {
    const res = await getSettings();
    assert.equal(res.status, 200);
    const body = (await res.json()) as { certExists: boolean };
    assert.equal(body.certExists, false, "the active cert (ca.crt) does not exist yet");
  });
});

test("settings/mitm status: legacy-leaf install reports its server.crt", async () => {
  writeCertFiles({ leaf: true });
  await withFlag(undefined, async () => {
    const body = (await (await getSettings()).json()) as { certExists: boolean };
    assert.equal(body.certExists, true);
  });
});

// ── /api/settings/mitm POST regenerate-cert ──────────────────────────────────

test("settings/mitm regenerate: root-CA install rotates ca.crt and keeps the legacy files", async () => {
  writeCertFiles({ ca: true, leaf: true });
  await withFlag(undefined, async () => {
    const res = await postRegenerate();
    assert.equal(res.status, 200);
    const body = (await res.json()) as {
      certExists?: boolean;
      certRegeneration?: { mode?: string; trustRequired?: boolean };
    };
    assert.notEqual(fs.readFileSync(caCrt, "utf8"), CA_PEM, "the root CA must be rotated");
    assert.equal(fs.readFileSync(serverCrt, "utf8"), LEAF_PEM, "legacy leaf untouched");
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
    assert.equal(body.certExists, true);
    assert.equal(body.certRegeneration?.mode, "use-root-ca");
    assert.equal(body.certRegeneration?.trustRequired, true);
  });
});

test("settings/mitm regenerate: fresh install is not flipped into the legacy model", async () => {
  writeCertFiles({});
  await withFlag(undefined, async () => {
    const res = await postRegenerate();
    assert.equal(res.status, 200);
    assert.equal(fs.existsSync(serverCrt), false, "no legacy server.crt on a fresh install");
    assert.equal(fs.existsSync(caCrt), true);
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
  });
});

test("settings/mitm regenerate: legacy-leaf install still re-mints server.crt/server.key", async () => {
  writeCertFiles({ leaf: true });
  await withFlag(undefined, async () => {
    const res = await postRegenerate();
    assert.equal(res.status, 200);
    const body = (await res.json()) as {
      certExists?: boolean;
      certRegeneration?: { mode?: string; trustRequired?: boolean };
    };
    assert.notEqual(fs.readFileSync(serverCrt, "utf8"), LEAF_PEM, "leaf must be re-minted");
    assert.equal(fs.existsSync(caCrt), false, "no CA on a legacy install");
    assert.equal(decideCertMigration(certDir, false), "use-legacy-leaf");
    assert.equal(body.certRegeneration?.mode, "use-legacy-leaf");
  });
});

// ── src/mitm/repair.ts ───────────────────────────────────────────────────────

test("repair plan: root-CA model untrusts ca.crt (and the leftover legacy leaf)", async () => {
  writeCertFiles({ ca: true, leaf: true });
  await withFlag(undefined, async () => {
    const plan = repair.buildRepairPlan();
    assert.equal(plan.removeCert, true);
    assert.ok(
      plan.certPathsToUntrust.includes(caCrt),
      "repair must untrust the active root CA, not only server.crt"
    );
    assert.ok(plan.certPathsToUntrust.includes(serverCrt));
    assert.equal(plan.certPathsToUntrust[0], caCrt, "the active cert comes first");
  });
});

test("repair plan: root-CA model with only ca.crt untrusts exactly ca.crt", async () => {
  writeCertFiles({ ca: true });
  await withFlag(undefined, async () => {
    assert.deepEqual(repair.buildRepairPlan().certPathsToUntrust, [caCrt]);
  });
});

test("repair plan: legacy-leaf install untrusts exactly server.crt (unchanged)", async () => {
  writeCertFiles({ leaf: true });
  await withFlag(undefined, async () => {
    assert.deepEqual(repair.buildRepairPlan().certPathsToUntrust, [serverCrt]);
  });
});

test("repair plan: nothing on disk means nothing to untrust", async () => {
  writeCertFiles({});
  await withFlag(undefined, async () => {
    assert.deepEqual(repair.buildRepairPlan().certPathsToUntrust, []);
  });
});
