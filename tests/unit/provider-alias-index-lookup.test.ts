/**
 * resolveProviderId / getProviderByAlias must answer from one prebuilt index.
 * Before the fix every call walked all provider sections (~380 entries), and a miss
 * (for example an openai-compatible-* id) walked all of them and still returned the input.
 */
import test from "node:test";
import assert from "node:assert/strict";

const providers = await import("../../src/shared/constants/providers.ts");
const { getProviderByAlias, resolveProviderId } = providers;

const SECTIONS = [
  providers.NOAUTH_PROVIDERS,
  providers.OAUTH_PROVIDERS,
  providers.APIKEY_PROVIDERS,
  providers.WEB_COOKIE_PROVIDERS,
  providers.LOCAL_PROVIDERS,
  providers.SEARCH_PROVIDERS,
  providers.AUDIO_ONLY_PROVIDERS,
  providers.UPSTREAM_PROXY_PROVIDERS,
  providers.CLOUD_AGENT_PROVIDERS,
  providers.SYSTEM_PROVIDERS,
] as const;

/** The pre-fix rule: first provider in section order whose alias or id equals the input. */
function referenceLookup(key: string): unknown {
  for (const section of SECTIONS) {
    for (const provider of Object.values(section) as Array<{ alias?: string; id: string }>) {
      if (provider.alias === key || provider.id === key) return provider;
    }
  }
  return null;
}

test("every alias and id resolves to the same provider as the linear scan", () => {
  let checked = 0;
  for (const section of SECTIONS) {
    for (const provider of Object.values(section) as Array<{ alias?: string; id: string }>) {
      for (const key of [provider.alias, provider.id]) {
        if (!key) continue;
        assert.equal(getProviderByAlias(key), referenceLookup(key), `lookup of "${key}"`);
        checked++;
      }
    }
  }
  assert.ok(checked > 300, `expected to check the whole catalog, checked ${checked}`);
});

test("an alias that equals another provider's id keeps the earlier provider (poe)", () => {
  assert.equal(getProviderByAlias("poe"), referenceLookup("poe"));
  assert.equal(resolveProviderId("poe"), (referenceLookup("poe") as { id: string }).id);
});

test("a miss returns null and resolveProviderId returns the input", () => {
  assert.equal(getProviderByAlias("openai-compatible-chat-0000"), null);
  assert.equal(resolveProviderId("openai-compatible-chat-0000"), "openai-compatible-chat-0000");
});

test("lookups after the first do not walk the provider catalog", () => {
  const providersSeen: Array<{ alias?: string; id: string }> = [];
  for (const section of SECTIONS) {
    providersSeen.push(...(Object.values(section) as Array<{ alias?: string; id: string }>));
  }
  // Count reads of `alias`: the linear scan reads it once per provider per call.
  let aliasReads = 0;
  for (const provider of providersSeen) {
    const own = Object.getOwnPropertyDescriptor(provider, "alias");
    if (own && !own.configurable) continue;
    let value = own?.value;
    Object.defineProperty(provider, "alias", {
      configurable: true,
      enumerable: own ? own.enumerable : false,
      get() {
        aliasReads++;
        return value;
      },
      set(next) {
        value = next;
      },
    });
  }

  resolveProviderId("openai"); // first call may build the index
  aliasReads = 0;
  for (let i = 0; i < 50; i++) {
    resolveProviderId("openai");
    resolveProviderId("openai-compatible-chat-0000");
    getProviderByAlias("anthropic");
  }
  assert.equal(aliasReads, 0, `lookups read provider.alias ${aliasReads} times`);
});
