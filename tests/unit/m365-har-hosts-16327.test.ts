import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateCopilotM365WebProvider } from "../../src/lib/providers/validation/webProvidersB.ts";
import { extractM365CredentialFromHar } from "../../src/shared/utils/m365HarImport.ts";
import {
  resolveConnectionParams,
  buildWsUrl,
} from "../../open-sse/executors/copilot-m365-connection.ts";

const path = "user-oid@tenant-id";
const token = "synthetic.token.value";
const url = (host: string) => `wss://${host}/m365Copilot/Chathub/${path}?access_token=${token}`;
const har = (...urls: string[]) =>
  JSON.stringify({ log: { entries: urls.map((url) => ({ request: { url } })) } });

describe("M365 HAR host compatibility (#16327)", () => {
  for (const host of [
    "m365.cloud.microsoft",
    "eu.m365.cloud.microsoft",
    "copilot.microsoft.com",
    "substrate.office.com",
    "substrate.svc.cloud.microsoft",
    "SUBSTRATE.SVC.CLOUD.MICROSOFT:443",
    "M365.CLOUD.MICROSOFT:443",
  ]) {
    it(`preserves ${host} from HAR through validation and execution`, async () => {
      const imported = extractM365CredentialFromHar(har(url(host)));
      assert.equal(imported.ok, true);
      if (!imported.ok) return;
      assert.equal((await validateCopilotM365WebProvider({ apiKey: imported.apiKey })).valid, true);
      const params = resolveConnectionParams({ apiKey: imported.apiKey });
      assert.ok(!("error" in params));
      assert.equal(params.host, host.toLowerCase().replace(":443", ""));
      assert.equal(params.accessToken, token);
      assert.equal(params.chathubPath, path);
      assert.equal(new URL(buildWsUrl(params)).hostname, params.host);
    });
  }

  it("accepts pasted current-host URLs and preserves explicit host overrides", () => {
    const params = resolveConnectionParams({ apiKey: url("eu.m365.cloud.microsoft") });
    assert.ok(!("error" in params));
    assert.equal(params.host, "eu.m365.cloud.microsoft");
    const override = resolveConnectionParams({
      apiKey: url("m365.cloud.microsoft"),
      providerSpecificData: { host: "substrate.svc.cloud.microsoft" },
    });
    assert.ok(!("error" in override));
    assert.equal(override.host, "substrate.svc.cloud.microsoft");
  });

  it("selects the last eligible HAR URL", () => {
    const imported = extractM365CredentialFromHar(
      har(url("substrate.office.com"), url("eu.m365.cloud.microsoft"), url("attacker.invalid"))
    );
    assert.equal(imported.ok, true);
    if (!imported.ok) return;
    const params = resolveConnectionParams({ apiKey: imported.apiKey });
    assert.ok(!("error" in params));
    assert.equal(params.host, "eu.m365.cloud.microsoft");
  });

  for (const unsafe of [
    url("m365.cloud.microsoft.attacker.invalid"),
    url("attacker.invalid"),
    url("substrate.svc.cloud.microsoft.attacker.invalid"),
    url("sub.substrate.svc.cloud.microsoft"),
    url("other.svc.cloud.microsoft"),
    url("user@substrate.svc.cloud.microsoft"),
    url("substrate.svc.cloud.microsoft:8443"),
    url("substrate.svc.cloud.microsoft").replace("wss:", "ws:"),
    url("substrate.svc.cloud.microsoft").replace("wss:", "https:"),
    url("substrate.svc.cloud.microsoft").replace("Chathub", "StreamHub"),
    url("substrate.svc.cloud.microsoft").replace(path, "user@tenant/extra"),
    url("substrate.svc.cloud.microsoft").replace(path, "%ZZ"),
    url("m365.cloud.microsoft:8443"),
    url("user@m365.cloud.microsoft"),
    url("m365.cloud.microsoft").replace("wss:", "ws:"),
    url("substrate.office.com").replace(path, "%ZZ"),
    url("substrate.office.com").replace(path, "user@tenant%3Bhost=attacker.invalid"),
    url("substrate.office.com").replace(path, "user@tenant%3Faccess_token=other"),
  ]) {
    it(`rejects unsafe HAR URL ${unsafe.replace(token, "REDACTED")}`, async () => {
      const imported = extractM365CredentialFromHar(har(unsafe));
      assert.equal(imported.ok, false);
      assert.equal((await validateCopilotM365WebProvider({ apiKey: unsafe })).valid, false);
      const params = resolveConnectionParams({ apiKey: unsafe });
      assert.ok("error" in params);
      if ("error" in params) assert.ok(!params.error.includes(token));
    });
  }

  it("preserves opaque tokens containing separators without credential injection", () => {
    const source = new URL(url("substrate.office.com"));
    const opaqueToken = "opaque; chathubPath=attacker@tenant+with=padding";
    source.searchParams.set("access_token", opaqueToken);
    const imported = extractM365CredentialFromHar(har(source.toString()));
    assert.equal(imported.ok, true);
    if (!imported.ok) return;
    const params = resolveConnectionParams({ apiKey: imported.apiKey });
    assert.ok(!("error" in params));
    assert.equal(params.accessToken, opaqueToken);
    assert.equal(params.chathubPath, path);
    assert.equal(new URL(buildWsUrl(params)).searchParams.get("access_token"), opaqueToken);
  });

  it("handles null HAR data without throwing", () => {
    assert.deepEqual(extractM365CredentialFromHar("null"), { ok: false, error: "noEntries" });
  });
});
