// GET /api/tools/agent-bridge/cert/download always streamed the legacy
// `<DATA_DIR>/mitm/server.crt`, regardless of which cert model is active for
// this run (src/mitm/cert/migration.ts::decideCertMigration). Under the
// root-CA model (the default for fresh installs, or `MITM_ROOT_CA_ENABLED=true`)
// the MITM server signs per-host leaves with `ca.crt`, so a user who downloaded
// and trusted the file this endpoint handed out still saw interception fail.
// The manual-install guide (src/mitm/cert/install.ts::buildCertManualGuide)
// points users at exactly this endpoint, which made the container/headless
// fallback (#4546) hand out the wrong certificate.
//
// The sibling status route (GET /api/tools/agent-bridge/cert) had the same
// hard-coded path, so the dashboard reported "no cert" on a root-CA install.
//
// Both routes now resolve the file through src/mitm/cert/activeCert.ts, the
// same helper manager.ts and the state/diagnose/server routes already use.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const downloadRoute = await import("../../src/app/api/tools/agent-bridge/cert/download/route.ts");
const certRoute = await import("../../src/app/api/tools/agent-bridge/cert/route.ts");

const CA_PEM = "-----BEGIN CERTIFICATE-----\nROOT-CA-FAKE\n-----END CERTIFICATE-----\n";
const LEAF_PEM = "-----BEGIN CERTIFICATE-----\nLEGACY-LEAF-FAKE\n-----END CERTIFICATE-----\n";
const FAKE_KEY = "-----BEGIN PRIVATE KEY-----\nFAKE\n-----END PRIVATE KEY-----\n";

type Files = { ca?: boolean; leaf?: boolean };

async function withCertDir<T>(
  files: Files,
  rootCaFlag: string | undefined,
  fn: (certDir: string) => Promise<T>
): Promise<T> {
  const base = process.env.DATA_DIR || os.tmpdir();
  const dataDir = fs.mkdtempSync(path.join(base, "cert-download-active-"));
  const certDir = path.join(dataDir, "mitm");
  fs.mkdirSync(certDir, { recursive: true });
  if (files.ca) {
    fs.writeFileSync(path.join(certDir, "ca.crt"), CA_PEM);
    fs.writeFileSync(path.join(certDir, "ca.key"), FAKE_KEY);
  }
  if (files.leaf) {
    fs.writeFileSync(path.join(certDir, "server.crt"), LEAF_PEM);
    fs.writeFileSync(path.join(certDir, "server.key"), FAKE_KEY);
  }

  const prevDataDir = process.env.DATA_DIR;
  const prevFlag = process.env.MITM_ROOT_CA_ENABLED;
  process.env.DATA_DIR = dataDir;
  if (rootCaFlag === undefined) delete process.env.MITM_ROOT_CA_ENABLED;
  else process.env.MITM_ROOT_CA_ENABLED = rootCaFlag;
  try {
    return await fn(certDir);
  } finally {
    if (prevDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prevDataDir;
    if (prevFlag === undefined) delete process.env.MITM_ROOT_CA_ENABLED;
    else process.env.MITM_ROOT_CA_ENABLED = prevFlag;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

function attachmentName(res: Response): string | null {
  const disposition = res.headers.get("content-disposition") || "";
  const match = /filename="([^"]+)"/.exec(disposition);
  return match ? match[1] : null;
}

async function errorMessage(res: Response): Promise<string> {
  const body = (await res.json()) as { error?: { message?: string } };
  return body.error?.message ?? "";
}

test("download: root-CA model (CA pair on disk next to a legacy leaf) serves ca.crt, not server.crt", async () => {
  await withCertDir({ ca: true, leaf: true }, undefined, async () => {
    const res = await downloadRoute.GET();
    assert.equal(res.status, 200);
    const text = await res.text();
    assert.equal(text, CA_PEM, "the active root CA must be served, not the legacy leaf");
    assert.equal(attachmentName(res), "omniroute-mitm-ca.crt");
    assert.equal(res.headers.get("content-type"), "application/x-pem-file");
    assert.equal(res.headers.get("content-length"), String(Buffer.byteLength(CA_PEM)));
  });
});

test("download: MITM_ROOT_CA_ENABLED=true serves ca.crt even when only a legacy leaf was trusted before", async () => {
  await withCertDir({ ca: true, leaf: true }, "true", async () => {
    const res = await downloadRoute.GET();
    assert.equal(res.status, 200);
    assert.equal(await res.text(), CA_PEM);
    assert.equal(attachmentName(res), "omniroute-mitm-ca.crt");
  });
});

test("download: root-CA model with no CA generated yet returns 404 instead of the stale legacy leaf", async () => {
  await withCertDir({ leaf: true }, "true", async () => {
    const res = await downloadRoute.GET();
    assert.equal(res.status, 404, "server.crt is not the active cert and must not be served");
    const message = await errorMessage(res);
    assert.match(message, /root CA/i);
    assert.match(message, /start/i, "the CA is only minted by starting the bridge");
    assert.doesNotMatch(
      message,
      /regenerate/i,
      "regenerate mints a legacy leaf, which would not fix a root-CA install"
    );
    assert.ok(!message.includes("at /"), "stack trace leaked in download 404");
  });
});

test("download: fresh install (nothing on disk) points at starting the bridge, not regenerate", async () => {
  await withCertDir({}, undefined, async () => {
    const res = await downloadRoute.GET();
    assert.equal(res.status, 404);
    const message = await errorMessage(res);
    assert.match(message, /root CA/i);
    assert.doesNotMatch(message, /regenerate/i);
  });
});

test("download: legacy-leaf install (server pair, no CA, flag off) keeps serving server.crt", async () => {
  await withCertDir({ leaf: true }, undefined, async () => {
    const res = await downloadRoute.GET();
    assert.equal(res.status, 200);
    assert.equal(await res.text(), LEAF_PEM);
    assert.equal(attachmentName(res), "omniroute-mitm.crt");
  });
});

test("cert status: root-CA model reports ca.crt as the cert on disk", async () => {
  await withCertDir({ ca: true }, undefined, async (certDir) => {
    const res = await certRoute.GET();
    assert.equal(res.status, 200);
    const body = (await res.json()) as { exists: boolean; path: string | null };
    assert.equal(body.exists, true, "a root-CA install with no legacy leaf still has a cert");
    assert.equal(body.path, path.join(certDir, "ca.crt"));
  });
});

test("cert status: legacy-leaf install keeps reporting server.crt", async () => {
  await withCertDir({ leaf: true }, undefined, async (certDir) => {
    const res = await certRoute.GET();
    const body = (await res.json()) as { exists: boolean; path: string | null };
    assert.equal(body.exists, true);
    assert.equal(body.path, path.join(certDir, "server.crt"));
  });
});

test("cert trust: root-CA model with no CA yet returns a 404 that names the root CA", async () => {
  await withCertDir({ leaf: true }, "true", async () => {
    const res = await certRoute.POST(
      new Request("http://localhost/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sudoPassword: "x" }),
      })
    );
    assert.equal(res.status, 404);
    const message = await errorMessage(res);
    assert.match(message, /root CA/i);
    assert.ok(!message.includes("at /"));
  });
});
