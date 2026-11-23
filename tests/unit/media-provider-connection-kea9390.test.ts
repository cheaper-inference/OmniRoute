// KEA-9390 — the Media page must know, before sending anything, that a provider with no
// saved connection cannot run. These tests pin the pure rule behind that, and that it never
// reports "not-connected" for a provider the server would actually serve.
import assert from "node:assert/strict";
import test from "node:test";

const {
  collectConnectedProviderIds,
  pickPreferredMediaProvider,
  resolveMediaProviderConnectionState,
} = await import("../../src/app/(dashboard)/dashboard/cache/media/mediaProviderConnection.ts");
const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistryData.ts");
const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");
const { AUDIO_SPEECH_PROVIDERS, AUDIO_TRANSCRIPTION_PROVIDERS } =
  await import("../../open-sse/config/audioRegistry.ts");
const { MUSIC_PROVIDERS } = await import("../../open-sse/config/musicRegistry.ts");
const { getProviderSearchPool } = await import("../../open-sse/services/providerConnectionPool.ts");

const connected = (...providers: string[]) =>
  collectConnectedProviderIds({ connections: providers.map((provider) => ({ provider })) });

test("collectConnectedProviderIds reads every payload shape of /api/providers", () => {
  assert.deepEqual([...(connected("openai") ?? [])], ["openai"]);
  assert.deepEqual([...(collectConnectedProviderIds([{ provider: "openai" }]) ?? [])], ["openai"]);
  assert.deepEqual(
    [...(collectConnectedProviderIds({ providers: [{ provider: "openai" }, {}, null] }) ?? [])],
    ["openai"]
  );
  // Not a connection list: the caller must treat the state as unknown, not as "none".
  assert.equal(collectConnectedProviderIds({ error: "unauthorized" }), null);
  assert.equal(collectConnectedProviderIds(null), null);
  assert.equal(connected()?.size, 0);
});

test("a provider that needs a connection and has none is not-connected (the ticket's case)", () => {
  assert.equal(
    resolveMediaProviderConnectionState("adobe-firefly", IMAGE_PROVIDERS, connected()),
    "not-connected"
  );
  assert.equal(
    resolveMediaProviderConnectionState("adobe-firefly", IMAGE_PROVIDERS, connected("openai")),
    "not-connected"
  );
  assert.equal(
    resolveMediaProviderConnectionState("adobe-firefly", VIDEO_PROVIDERS, connected()),
    "not-connected"
  );
});

test("a saved connection under the id, its alias or a paired id counts as connected", () => {
  assert.equal(
    resolveMediaProviderConnectionState(
      "adobe-firefly",
      IMAGE_PROVIDERS,
      connected("adobe-firefly")
    ),
    "connected"
  );
  // Alias-keyed row (`firefly` is adobe-firefly's alias).
  assert.equal(
    resolveMediaProviderConnectionState("adobe-firefly", IMAGE_PROVIDERS, connected("firefly")),
    "connected"
  );
  // PROVIDER_SEARCH_PAIRS: the Antigravity CLI card stores its row under `agy`, NVIDIA under
  // `nvidia_nim` — the server lookup finds both, so the page must too.
  assert.equal(
    resolveMediaProviderConnectionState("antigravity", IMAGE_PROVIDERS, connected("agy")),
    "connected"
  );
  assert.equal(
    resolveMediaProviderConnectionState("nvidia", IMAGE_PROVIDERS, connected("nvidia_nim")),
    "connected"
  );
});

test("no media provider is flagged while the server-side lookup would find a connection", async () => {
  // The page's rule must never be stricter than the server's: for every provider of every
  // media registry that the page can flag, a connection saved under ANY id the real
  // `getProviderSearchPool()` searches has to count as connected. This is also what keeps the
  // page's copy of the connection-sharing groups (nvidia/nvidia_nim, antigravity/agy, …) in
  // step with `PROVIDER_SEARCH_PAIRS`.
  const registries = {
    image: IMAGE_PROVIDERS,
    video: VIDEO_PROVIDERS,
    music: MUSIC_PROVIDERS,
    speech: AUDIO_SPEECH_PROVIDERS,
    transcription: AUDIO_TRANSCRIPTION_PROVIDERS,
  };
  let flaggable = 0;
  for (const [kind, registry] of Object.entries(registries)) {
    for (const [providerId, config] of Object.entries(registry)) {
      if (
        resolveMediaProviderConnectionState(providerId, registry, connected()) !== "not-connected"
      ) {
        continue;
      }
      flaggable += 1;
      const credentialKey =
        (config as { credentialProviderId?: string }).credentialProviderId || providerId;
      for (const searchedId of await getProviderSearchPool(credentialKey)) {
        assert.equal(
          resolveMediaProviderConnectionState(providerId, registry, connected(searchedId)),
          "connected",
          `${kind}/${providerId}: a connection saved under "${searchedId}" is found by the server`
        );
      }
    }
  }
  assert.ok(flaggable > 50, `expected the registries to be exercised (got ${flaggable})`);

  // The groups the page mirrors, checked against the server lookup id by id.
  for (const id of ["nvidia", "nvidia_nim", "antigravity", "agy", "kimi-coding", "jina-ai"]) {
    const pool = await getProviderSearchPool(id);
    assert.ok(pool.length > 1, `${id} shares connections with another id on the server`);
  }
});

test("providers that run without a saved connection are never flagged", () => {
  // Local servers (authType "none").
  assert.equal(
    resolveMediaProviderConnectionState("comfyui", IMAGE_PROVIDERS, connected()),
    "not-required"
  );
  // Keyless (no-auth) cloud providers.
  assert.equal(
    resolveMediaProviderConnectionState("aihorde", IMAGE_PROVIDERS, connected()),
    "not-required"
  );
  assert.equal(
    resolveMediaProviderConnectionState("veoaifree-web", VIDEO_PROVIDERS, connected()),
    "not-required"
  );
});

test("whatever cannot be decided statically stays unknown (never blocks)", () => {
  // Connections not loaded yet / the request failed.
  assert.equal(
    resolveMediaProviderConnectionState("adobe-firefly", IMAGE_PROVIDERS, null),
    "unknown"
  );
  // Ids outside the static provider catalog resolve through custom provider nodes on the
  // server (and googleflow borrows the Antigravity credential): not decidable here.
  assert.equal(
    resolveMediaProviderConnectionState("googleflow", VIDEO_PROVIDERS, connected()),
    "unknown"
  );
  assert.equal(
    resolveMediaProviderConnectionState("nanobanana", IMAGE_PROVIDERS, connected()),
    "unknown"
  );
  assert.equal(
    resolveMediaProviderConnectionState("nope", IMAGE_PROVIDERS, connected()),
    "unknown"
  );
});

test("credentialProviderId decides where a speech provider's connection is looked up", () => {
  const withCredentialKey = Object.entries(AUDIO_SPEECH_PROVIDERS).find(
    ([id, config]) => config.credentialProviderId && config.credentialProviderId !== id
  );
  assert.ok(withCredentialKey, "the speech registry has a provider with a credentialProviderId");
  const [providerId, config] = withCredentialKey;
  assert.equal(
    resolveMediaProviderConnectionState(
      providerId,
      AUDIO_SPEECH_PROVIDERS,
      connected(config.credentialProviderId as string)
    ),
    "connected"
  );
});

test("transcription: a connected gateway listing the same model keeps the provider usable", () => {
  // /v1/audio/transcriptions retries another provider that lists the same model id when the
  // selected one has no credentials (`deepgram/nova-3` served by a gateway).
  const registry = {
    deepgram: { authType: "apikey", models: [{ id: "nova-3" }] },
    openrouter: { authType: "apikey", models: [{ id: "deepgram/nova-3" }] },
    groq: { authType: "apikey", models: [{ id: "whisper-large-v3" }] },
  };
  assert.equal(
    resolveMediaProviderConnectionState("deepgram", registry, connected("openrouter"), {
      gatewayFallback: true,
    }),
    "unknown"
  );
  // Without the route's gateway retry (every other media route) it is simply not connected.
  assert.equal(
    resolveMediaProviderConnectionState("deepgram", registry, connected("openrouter")),
    "not-connected"
  );
  // A connected provider that does not list the model is no fallback.
  assert.equal(
    resolveMediaProviderConnectionState("deepgram", registry, connected("groq"), {
      gatewayFallback: true,
    }),
    "not-connected"
  );
  // Real registry, nothing connected: no gateway can serve it either.
  assert.equal(
    resolveMediaProviderConnectionState("deepgram", AUDIO_TRANSCRIPTION_PROVIDERS, connected(), {
      gatewayFallback: true,
    }),
    "not-connected"
  );
});

test("pickPreferredMediaProvider prefers a connected provider and never guesses otherwise", () => {
  const providers = [{ id: "adobe-firefly" }, { id: "aihorde" }, { id: "openai" }];
  const stateFor = (ids: Set<string> | null) => (id: string) =>
    resolveMediaProviderConnectionState(id, IMAGE_PROVIDERS, ids);

  // The alphabetical default is replaced by the connected provider.
  assert.equal(
    pickPreferredMediaProvider(providers, "adobe-firefly", stateFor(connected("openai"))),
    "openai"
  );
  // A connected current choice is kept.
  assert.equal(
    pickPreferredMediaProvider(providers, "openai", stateFor(connected("openai", "adobe-firefly"))),
    "openai"
  );
  // Nothing connected: the current choice stays (and is shown as not connected).
  assert.equal(
    pickPreferredMediaProvider(providers, "adobe-firefly", stateFor(connected())),
    "adobe-firefly"
  );
  // Unknown state changes nothing.
  assert.equal(
    pickPreferredMediaProvider(providers, "adobe-firefly", stateFor(null)),
    "adobe-firefly"
  );
  // A current id that is not listed falls back to the first listed provider.
  assert.equal(
    pickPreferredMediaProvider(providers, "gone", stateFor(connected())),
    "adobe-firefly"
  );
  assert.equal(pickPreferredMediaProvider([], "gone", stateFor(connected())), "");
});
