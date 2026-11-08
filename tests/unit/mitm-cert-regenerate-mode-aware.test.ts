// "Regenerate cert" used to always mint the LEGACY leaf (`server.crt`/
// `server.key` via generateCert()), whatever cert model was active:
//
//   - under the root-CA model it never rotated `ca.crt`, so "regenerate" did
//     nothing for the cert clients actually trust;
//   - on a fresh install (nothing on disk) it created a server.crt/server.key
//     pair, which decideCertMigration() reads as a legacy install — silently
//     switching the instance from the root-CA model to the legacy leaf.
//
// Three entry points did this: POST /api/tools/agent-bridge/cert/regenerate,
// the dashboard's POST /api/tools/agent-bridge/server {action:"regenerate-cert"},
// and POST /api/settings/mitm {action:"regenerate-cert"} (covered in
// mitm-settings-and-repair-active-ca.test.ts). They now share
// src/mitm/cert/regenerate.ts::regenerateActiveMitmCert(), which never changes
// the cert model: legacy installs get a fresh leaf, root-CA installs get a
// rotated root CA (untrusting the old one first when it is trusted).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { decideCertMigration } from "../../src/mitm/cert/migration.ts";

const regenerateRoute =
  await import("../../src/app/api/tools/agent-bridge/cert/regenerate/route.ts");
const serverRoute = await import("../../src/app/api/tools/agent-bridge/server/route.ts");
const core = await import("../../src/lib/db/core.ts");

const CA_PEM = "-----BEGIN CERTIFICATE-----\nOLD-ROOT-CA-FAKE\n-----END CERTIFICATE-----\n";
const LEAF_PEM = "-----BEGIN CERTIFICATE-----\nOLD-LEGACY-LEAF-FAKE\n-----END CERTIFICATE-----\n";
const FAKE_KEY = "-----BEGIN PRIVATE KEY-----\nFAKE\n-----END PRIVATE KEY-----\n";

type Files = { ca?: boolean; leaf?: boolean };

const BASE_DATA_DIR = process.env.DATA_DIR || fs.mkdtempSync(path.join(os.tmpdir(), "regen-"));

test.after(() => {
  core.resetDbInstance();
});

async function withCertDir<T>(
  files: Files,
  rootCaFlag: string | undefined,
  fn: (certDir: string) => Promise<T>
): Promise<T> {
  const dataDir = fs.mkdtempSync(path.join(BASE_DATA_DIR, "cert-regen-mode-"));
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

const read = (p: string) => fs.readFileSync(p, "utf8");

function jsonPost(body?: unknown): Request {
  return new Request("http://localhost/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

type FakeTrust = {
  trusted?: boolean;
  stillTrustedAfterUninstall?: boolean;
  uninstallThrows?: boolean;
  passwordRequired?: boolean;
};

function fakeTrustDeps(opts: FakeTrust = {}) {
  let trusted = opts.trusted === true;
  const uninstallCalls: { sudoPassword: string; certPath: string; pemAtCall: string }[] = [];
  return {
    uninstallCalls,
    deps: {
      checkCertInstalled: async (certPath: string) => trusted && fs.existsSync(certPath),
      uninstallCert: async (sudoPassword: string, certPath: string) => {
        uninstallCalls.push({ sudoPassword, certPath, pemAtCall: read(certPath) });
        if (opts.uninstallThrows) throw new Error("sudo failed at /etc/secret/path");
        if (!opts.stillTrustedAfterUninstall) trusted = false;
      },
      isSudoPasswordRequired: (sudoPassword: string) =>
        opts.passwordRequired === true && !sudoPassword,
    },
  };
}

async function loadHelper() {
  return import("../../src/mitm/cert/regenerate.ts");
}

const { isRegenerateFailure } = await loadHelper();

// ── POST /api/tools/agent-bridge/cert/regenerate ─────────────────────────────

test("cert/regenerate: fresh install stays on the root-CA model (mints ca.crt, no legacy leaf)", async () => {
  await withCertDir({}, undefined, async (certDir) => {
    const res = await regenerateRoute.POST(jsonPost({}));
    assert.equal(res.status, 200);
    const body = (await res.json()) as Record<string, unknown>;
    assert.equal(
      fs.existsSync(path.join(certDir, "server.crt")),
      false,
      "a fresh install must not get a legacy server.crt — that flips it to the legacy model"
    );
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
    assert.equal(fs.existsSync(path.join(certDir, "ca.crt")), true);
    assert.equal(body.mode, "use-root-ca");
    assert.equal(body.certPath, path.join(certDir, "ca.crt"));
    assert.equal(body.trustRequired, true);
  });
});

test("cert/regenerate: root-CA install rotates ca.crt and leaves the legacy leaf alone", async () => {
  await withCertDir({ ca: true, leaf: true }, undefined, async (certDir) => {
    const res = await regenerateRoute.POST(jsonPost({}));
    assert.equal(res.status, 200);
    const body = (await res.json()) as Record<string, unknown>;
    assert.notEqual(read(path.join(certDir, "ca.crt")), CA_PEM, "the root CA must be rotated");
    assert.notEqual(read(path.join(certDir, "ca.key")), FAKE_KEY, "the CA key must be rotated");
    assert.equal(read(path.join(certDir, "server.crt")), LEAF_PEM, "legacy leaf untouched");
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
    assert.equal(body.mode, "use-root-ca");
    assert.equal(body.trustRequired, true);
    assert.match(String(body.message), /trust/i, "the operator must be told to re-trust");
  });
});

test("cert/regenerate: MITM_ROOT_CA_ENABLED=true with only a legacy pair mints the CA, not a leaf", async () => {
  await withCertDir({ leaf: true }, "true", async (certDir) => {
    const res = await regenerateRoute.POST(jsonPost({}));
    assert.equal(res.status, 200);
    assert.equal(fs.existsSync(path.join(certDir, "ca.crt")), true);
    assert.equal(read(path.join(certDir, "server.crt")), LEAF_PEM);
  });
});

test("cert/regenerate: legacy-leaf install keeps minting a fresh leaf (unchanged behavior)", async () => {
  await withCertDir({ leaf: true }, undefined, async (certDir) => {
    const res = await regenerateRoute.POST();
    assert.equal(res.status, 200);
    const body = (await res.json()) as Record<string, unknown>;
    assert.equal(body.ok, true);
    assert.equal(body.certPath, path.join(certDir, "server.crt"));
    assert.equal(body.keyPath, path.join(certDir, "server.key"));
    assert.notEqual(read(path.join(certDir, "server.crt")), LEAF_PEM, "leaf must be re-minted");
    assert.equal(fs.existsSync(path.join(certDir, "ca.crt")), false, "no CA on a legacy install");
    assert.equal(decideCertMigration(certDir, false), "use-legacy-leaf");
    assert.equal(body.mode, "use-legacy-leaf");
  });
});

// ── POST /api/tools/agent-bridge/server {action:"regenerate-cert"} (dashboard) ─

test("server route regenerate-cert: fresh install stays on the root-CA model", async () => {
  await withCertDir({}, undefined, async (certDir) => {
    const res = await serverRoute.POST(jsonPost({ action: "regenerate-cert" }));
    assert.equal(res.status, 200);
    const body = (await res.json()) as Record<string, unknown>;
    assert.equal(fs.existsSync(path.join(certDir, "server.crt")), false);
    assert.equal(decideCertMigration(certDir, false), "use-root-ca");
    assert.equal(body.mode, "use-root-ca");
  });
});

test("server route regenerate-cert: root-CA install rotates the CA", async () => {
  await withCertDir({ ca: true }, undefined, async (certDir) => {
    const res = await serverRoute.POST(jsonPost({ action: "regenerate-cert" }));
    assert.equal(res.status, 200);
    assert.notEqual(read(path.join(certDir, "ca.crt")), CA_PEM);
  });
});

// ── regenerateActiveMitmCert() — trust handling ───────────────────────────────

test("helper: untrusts the currently trusted root CA BEFORE rotating it", async () => {
  const { regenerateActiveMitmCert } = await loadHelper();
  await withCertDir({ ca: true }, undefined, async (certDir) => {
    const fake = fakeTrustDeps({ trusted: true });
    const result = await regenerateActiveMitmCert(
      { sudoPassword: "pw", running: false },
      fake.deps
    );
    assert.equal(result.ok, true);
    assert.equal(fake.uninstallCalls.length, 1);
    assert.equal(fake.uninstallCalls[0].certPath, path.join(certDir, "ca.crt"));
    assert.equal(fake.uninstallCalls[0].sudoPassword, "pw");
    assert.equal(fake.uninstallCalls[0].pemAtCall, CA_PEM, "must untrust the OLD CA");
    assert.ok(result.ok && result.mode === "use-root-ca" && result.previousCaUntrusted === true);
    assert.notEqual(read(path.join(certDir, "ca.crt")), CA_PEM);
  });
});

test("helper: an untrusted root CA is rotated without any trust-store call", async () => {
  const { regenerateActiveMitmCert } = await loadHelper();
  await withCertDir({ ca: true }, undefined, async () => {
    const fake = fakeTrustDeps({ trusted: false });
    const result = await regenerateActiveMitmCert({ sudoPassword: "", running: false }, fake.deps);
    assert.ok(result.ok && result.mode === "use-root-ca");
    assert.equal(result.ok && result.mode === "use-root-ca" && result.previousCaUntrusted, false);
    assert.equal(fake.uninstallCalls.length, 0);
  });
});

test("helper: trusted CA + no sudo password refuses instead of leaving the old CA trusted", async () => {
  const { regenerateActiveMitmCert } = await loadHelper();
  await withCertDir({ ca: true }, undefined, async (certDir) => {
    const fake = fakeTrustDeps({ trusted: true, passwordRequired: true });
    const result = await regenerateActiveMitmCert({ sudoPassword: "", running: false }, fake.deps);
    assert.equal(result.ok, false);
    assert.ok(isRegenerateFailure(result) && result.status === 400);
    assert.ok(isRegenerateFailure(result) && /sudoPassword/.test(result.message));
    assert.equal(fake.uninstallCalls.length, 0);
    assert.equal(read(path.join(certDir, "ca.crt")), CA_PEM, "CA must not be rotated");
  });
});

test("helper: a failed untrust aborts the rotation and does not leak the error", async () => {
  const { regenerateActiveMitmCert } = await loadHelper();
  await withCertDir({ ca: true }, undefined, async (certDir) => {
    const fake = fakeTrustDeps({ trusted: true, uninstallThrows: true });
    const result = await regenerateActiveMitmCert(
      { sudoPassword: "pw", running: false },
      fake.deps
    );
    assert.ok(isRegenerateFailure(result) && result.status === 500);
    assert.ok(isRegenerateFailure(result) && !result.message.includes("/etc/secret/path"));
    assert.equal(read(path.join(certDir, "ca.crt")), CA_PEM, "CA must not be rotated");
  });
});

test("helper: a CA still trusted after the untrust attempt aborts the rotation", async () => {
  const { regenerateActiveMitmCert } = await loadHelper();
  await withCertDir({ ca: true }, undefined, async (certDir) => {
    const fake = fakeTrustDeps({ trusted: true, stillTrustedAfterUninstall: true });
    const result = await regenerateActiveMitmCert(
      { sudoPassword: "pw", running: false },
      fake.deps
    );
    assert.ok(isRegenerateFailure(result) && result.status === 500);
    assert.equal(read(path.join(certDir, "ca.crt")), CA_PEM);
  });
});

test("helper: root-CA rotation is refused while the bridge is running (CA is loaded at start)", async () => {
  const { regenerateActiveMitmCert } = await loadHelper();
  await withCertDir({ ca: true }, undefined, async (certDir) => {
    const fake = fakeTrustDeps({ trusted: true });
    const result = await regenerateActiveMitmCert({ sudoPassword: "pw", running: true }, fake.deps);
    assert.ok(isRegenerateFailure(result) && result.status === 409);
    assert.ok(isRegenerateFailure(result) && /stop/i.test(result.message));
    assert.equal(fake.uninstallCalls.length, 0);
    assert.equal(read(path.join(certDir, "ca.crt")), CA_PEM);
  });
});

test("helper: legacy mode while running still regenerates and flags the restart", async () => {
  const { regenerateActiveMitmCert } = await loadHelper();
  await withCertDir({ leaf: true }, undefined, async (certDir) => {
    const fake = fakeTrustDeps();
    const result = await regenerateActiveMitmCert({ sudoPassword: "", running: true }, fake.deps);
    assert.ok(result.ok && result.mode === "use-legacy-leaf");
    assert.equal(result.ok && result.restartRequired, true);
    assert.notEqual(read(path.join(certDir, "server.crt")), LEAF_PEM);
    assert.equal(fake.uninstallCalls.length, 0);
  });
});

test(
  "helper: the rotated CA key is owner-only (0600)",
  { skip: process.platform === "win32" },
  async () => {
    const { regenerateActiveMitmCert } = await loadHelper();
    await withCertDir({ ca: true }, undefined, async (certDir) => {
      await regenerateActiveMitmCert({ sudoPassword: "", running: false }, fakeTrustDeps().deps);
      const mode = fs.statSync(path.join(certDir, "ca.key")).mode & 0o777;
      assert.equal(mode, 0o600);
      const leftovers = fs.readdirSync(certDir).filter((f) => f.includes(".rotate-"));
      assert.deepEqual(leftovers, [], "no temp files left behind");
    });
  }
);
