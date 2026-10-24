/**
 * PERF-09 drift gate: the committed open-sse/config/providers/metadata.json
 * must exactly match what scripts/build/gen-provider-metadata.ts regenerates
 * from the live REGISTRY. A newly registered provider (or a changed alias /
 * authType / model catalog) makes this test fail until the generator is
 * re-run — stale metadata can never reach consumers silently.
 *
 * Also proves consumer parity: for every provider, the metadata view agrees
 * with the REGISTRY view on the fields consumers actually read
 * (alias/authType/format/anonymousApiKey/models, claude-wire membership).
 *
 * Run: node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
 *        --import ./tests/_setup/isolateDataDir.ts --test tests/unit/provider-metadata-sync.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import {
  PROVIDER_METADATA,
  CLAUDE_WIRE_PROVIDERS,
  providerMetaAlias,
  providerMetaAuthType,
  providerMetaFormat,
  providerMetaModels,
} from "../../open-sse/config/providers/metadata.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const COMMITTED = JSON.parse(
  fs.readFileSync(path.join(ROOT, "open-sse", "config", "providers", "metadata.json"), "utf8")
);

function regenerate() {
  const providers: Record<string, Record<string, unknown>> = {};
  const claudeWire: string[] = [];
  let modelTotal = 0;
  for (const [id, entry] of Object.entries(REGISTRY as Record<string, Record<string, unknown>>)) {
    const meta: Record<string, unknown> = {};
    if (entry.alias && entry.alias !== id) meta.alias = entry.alias;
    if (entry.authType) meta.authType = entry.authType;
    if (entry.format) meta.format = entry.format;
    if (entry.anonymousApiKey) meta.anonymousApiKey = true;
    if (entry.reasoningTransport) meta.reasoningTransport = entry.reasoningTransport;
    const models = entry.models as Array<{ id: string; name?: string }> | undefined;
    if (models && models.length > 0) {
      meta.models = models.map((m) => ({ id: m.id, name: m.name || m.id }));
      modelTotal += (meta.models as unknown[]).length;
    }
    providers[id] = meta;
    if (entry.format === "claude") claudeWire.push(id.toLowerCase());
  }
  const sorted: Record<string, Record<string, unknown>> = {};
  for (const id of Object.keys(providers).sort()) sorted[id] = providers[id];
  claudeWire.sort();
  return {
    count: Object.keys(sorted).length,
    modelTotal,
    claudeWireProviders: claudeWire,
    providers: sorted,
  };
}

test("PERF-09: committed metadata.json matches regeneration from live REGISTRY", () => {
  assert.deepEqual(COMMITTED, regenerate());
});

test("PERF-09: metadata keyed by id matches REGISTRY keys exactly", () => {
  const registryIds = Object.keys(REGISTRY).sort();
  const metaIds = Object.keys(PROVIDER_METADATA).sort();
  assert.deepEqual(metaIds, registryIds);
});

test("PERF-09: claude-wire set agrees with REGISTRY format=claude entries", () => {
  const expected = new Set(
    Object.entries(REGISTRY)
      .filter(([, e]) => e.format === "claude")
      .map(([id]) => id.toLowerCase())
  );
  assert.equal(CLAUDE_WIRE_PROVIDERS.size, expected.size);
  for (const id of expected) assert.ok(CLAUDE_WIRE_PROVIDERS.has(id), id);
});

test("PERF-09: consumer helpers agree with REGISTRY for every provider", () => {
  for (const [id, entry] of Object.entries(REGISTRY)) {
    const meta = PROVIDER_METADATA[id];
    assert.ok(meta, `missing metadata for ${id}`);

    const expectedAlias = entry.alias || id;
    const expectedAuthType = entry.authType;
    const expectedFormat = entry.format;
    const expectedModels = entry.models?.length
      ? entry.models.map((m) => ({ id: m.id, name: m.name || m.id }))
      : undefined;

    assert.equal(providerMetaAlias(id), expectedAlias, `${id} alias`);
    assert.equal(providerMetaAuthType(id), expectedAuthType, `${id} authType`);
    assert.equal(providerMetaFormat(id), expectedFormat, `${id} format`);
    if (expectedModels) {
      assert.deepEqual(providerMetaModels(id), expectedModels, `${id} models`);
    } else {
      assert.equal(providerMetaModels(id), undefined, `${id} should have no models`);
    }
    // anonymousApiKey is boolean-true only in the registry sense
    assert.equal(
      meta.anonymousApiKey === true,
      Boolean(entry.anonymousApiKey),
      `${id} anonymousApiKey`
    );
  }
});

test("PERF-09: unknown provider ids resolve safely through helpers", () => {
  assert.equal(providerMetaAlias("does-not-exist"), "does-not-exist");
  assert.equal(providerMetaAuthType("does-not-exist"), undefined);
  assert.equal(providerMetaFormat("does-not-exist"), undefined);
  assert.equal(providerMetaModels("does-not-exist"), undefined);
});
