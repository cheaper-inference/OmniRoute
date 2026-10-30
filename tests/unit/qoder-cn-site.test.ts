import test from "node:test";
import assert from "node:assert/strict";

import { qoderProvider } from "../../open-sse/config/providers/registry/qoder/index.ts";
import { qoderCnProvider } from "../../open-sse/config/providers/registry/qoder/cn/index.ts";
import { QODER_CONFIG, QODER_CN_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import {
  QODER_SITES,
  buildQoderSiteHeaders,
  isQoderSite,
  resolveQoderSite,
} from "../../src/lib/oauth/qoderSite.ts";
import { newQoderMachineId, isQoderMachineId } from "../../src/lib/oauth/qoderMachineId.ts";

test("Qoder global registry entry is untouched by the CN addition", () => {
  assert.equal(qoderProvider.id, "qoder");
  assert.equal(qoderProvider.baseUrl, "https://api.qoder.com/v1/chat/completions");
});

test("Qoder CN is registered as its own provider on the CN host", () => {
  assert.equal(qoderCnProvider.id, "qoder-cn");
  assert.equal(qoderCnProvider.executor, "qoder");
  assert.match(qoderCnProvider.baseUrl, /^https:\/\/api\.qoder\.cn\//);
  assert.equal(qoderCnProvider.authType, "apikey");
});

test("Qoder CN keeps the global model catalog in sync", () => {
  const globalIds = qoderProvider.models.map((m) => m.id).sort();
  const cnIds = qoderCnProvider.models.map((m) => m.id).sort();
  assert.deepEqual(cnIds, globalIds);
});

test("Qoder CN config never borrows the retired embedded client credentials", () => {
  // #7866 deleted the literal client_id/client_secret that lived in QODER_CONFIG.
  // The CN config must stay env-only, exactly like the global one.
  for (const value of [QODER_CN_CONFIG.clientId, QODER_CN_CONFIG.clientSecret]) {
    assert.equal(value, process.env.QODER_CN_OAUTH_CLIENT_ID || "");
  }
  assert.doesNotMatch(JSON.stringify(QODER_CN_CONFIG), /4Z3YjXycVsQvyGF1etiNlIBB4RsqSDtW/);
  assert.doesNotMatch(JSON.stringify(QODER_CN_CONFIG), /10009311001/);
});

test("Qoder CN config points at qoder.cn while the global config stays off it", () => {
  assert.match(QODER_CN_CONFIG.authorizeUrl, /qoder\.cn/);
  assert.match(QODER_CN_CONFIG.tokenUrl, /qoder\.cn/);
  assert.match(QODER_CN_CONFIG.userInfoUrl, /qoder\.cn/);
  assert.doesNotMatch(QODER_CONFIG.authorizeUrl, /qoder\.cn/);
});

test("Qoder CN browser OAuth stays disabled unless every env var is set", () => {
  assert.equal(QODER_CN_CONFIG.enabled, false);
});

test("resolveQoderSite maps ids to sites and defaults to global", () => {
  assert.equal(isQoderSite("qoder-cn"), true);
  assert.equal(isQoderSite("qoder"), false);
  assert.equal(resolveQoderSite("qoder-cn"), QODER_SITES.CN);
  assert.equal(resolveQoderSite("qoder"), QODER_SITES.GLOBAL);
  assert.equal(resolveQoderSite(undefined), QODER_SITES.GLOBAL);
  assert.equal(resolveQoderSite("something-else"), QODER_SITES.GLOBAL);
});

test("buildQoderSiteHeaders carries the devin-style site marker without leaking secrets", () => {
  const headers = buildQoderSiteHeaders("qoder-cn", "machine-abc");
  assert.equal(headers["x-qoder-site"], "cn");
  assert.equal(headers["x-qoder-machine-id"], "machine-abc");
  assert.equal(Object.keys(buildQoderSiteHeaders("qoder")).includes("x-qoder-site"), false);
});

test("newQoderMachineId returns a stable, valid UUID v4", () => {
  const id = newQoderMachineId();
  assert.equal(isQoderMachineId(id), true);
  assert.equal(isQoderMachineId("not-a-uuid"), false);
  assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  // Derived from a seed it must be deterministic, so a connection keeps its id.
  assert.equal(newQoderMachineId("seed-1"), newQoderMachineId("seed-1"));
  assert.notEqual(newQoderMachineId("seed-1"), newQoderMachineId("seed-2"));
});
