/**
 * Credential of the gated OpenCode free-tier lane.
 *
 * Since 2026-10-21 every gated (free) model is routed by `buildUrl()` to the anonymous
 * `https://opencode.ai/inference/v1` lane, and that lane refuses a real API key with 403
 * `Model access is disabled` while serving the literal `Bearer public` credential
 * (measured live 2026-10-21 on Chat Completions and Responses, v1 and v2 identity shapes,
 * `x-api-key` and `Authorization` header styles alike).
 *
 * So the credential follows the lane, not the connection: a gated request always carries
 * `OPENCODE_FREE_TIER_CREDENTIAL` (default `public`), and the operator's key — which the
 * keyed `/zen/v1` lane still needs for paid models — never reaches `/inference` unless
 * `OPENCODE_FREE_TIER_CREDENTIAL=key` asks for it.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  _setOpencodeFreeModelsForTests,
  FREE_TIER_INFERENCE_BASE_URL,
  FREE_TIER_PUBLIC_CREDENTIAL,
  isGatedFreeTierRequest,
  resolveFreeTierCredential,
  resolveGatedCredential,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

const FREE_MODEL = "deepseek-v4.1-flash-free";
const PREMIUM_MODEL = "gpt-5.6-luna";
const REAL_KEY = "oc_sk_real_key_for_tests";

/** Run `fn` with OPENCODE_FREE_TIER_CREDENTIAL set to `value` (undefined = unset). */
function withCredentialEnv(value: string | undefined, fn: () => void): void {
  const previous = process.env.OPENCODE_FREE_TIER_CREDENTIAL;
  if (value === undefined) delete process.env.OPENCODE_FREE_TIER_CREDENTIAL;
  else process.env.OPENCODE_FREE_TIER_CREDENTIAL = value;
  try {
    fn();
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_FREE_TIER_CREDENTIAL;
    else process.env.OPENCODE_FREE_TIER_CREDENTIAL = previous;
  }
}

test("the credential resolves to the anonymous public literal by default", () => {
  withCredentialEnv(undefined, () => {
    assert.deepEqual(resolveFreeTierCredential(), {
      mode: "literal",
      value: FREE_TIER_PUBLIC_CREDENTIAL,
    });
  });
  withCredentialEnv("", () => {
    assert.deepEqual(resolveFreeTierCredential(), {
      mode: "literal",
      value: FREE_TIER_PUBLIC_CREDENTIAL,
    });
  });
});

test("the credential env accepts the documented overrides", () => {
  withCredentialEnv("key", () => {
    assert.deepEqual(resolveFreeTierCredential(), { mode: "key" });
  });
  withCredentialEnv("none", () => {
    assert.deepEqual(resolveFreeTierCredential(), { mode: "none" });
  });
  withCredentialEnv("off", () => {
    assert.deepEqual(resolveFreeTierCredential(), { mode: "none" });
  });
  withCredentialEnv("Bearer custom-token", () => {
    assert.deepEqual(resolveFreeTierCredential(), {
      mode: "literal",
      value: "Bearer custom-token",
    });
  });
});

test("a gated free model sends the anonymous credential instead of the operator key", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  withCredentialEnv(undefined, () => {
    try {
      const executor = new OpencodeExecutor("opencode-zen");
      assert.equal(isGatedFreeTierRequest("zen", "opencode-zen", FREE_MODEL), true);
      const headers = executor.buildHeaders(
        { apiKey: REAL_KEY } as never,
        true,
        null,
        FREE_MODEL
      ) as Record<string, string>;
      assert.equal(headers["Authorization"], `Bearer ${FREE_TIER_PUBLIC_CREDENTIAL}`);
    } finally {
      _setOpencodeFreeModelsForTests(null);
    }
  });
});

test("a keyless gated free model still authenticates with the public credential", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  withCredentialEnv(undefined, () => {
    try {
      const executor = new OpencodeExecutor("opencode-zen");
      const headers = executor.buildHeaders(null, true, null, FREE_MODEL) as Record<string, string>;
      // An absent Authorization header is what the pre-2026-10-21 gate accepted;
      // the anonymous lane expects the literal instead.
      assert.equal(headers["Authorization"], `Bearer ${FREE_TIER_PUBLIC_CREDENTIAL}`);
    } finally {
      _setOpencodeFreeModelsForTests(null);
    }
  });
});

test("a premium model keeps the operator's key (the keyed lane still needs it)", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  withCredentialEnv(undefined, () => {
    try {
      const executor = new OpencodeExecutor("opencode-zen");
      assert.equal(isGatedFreeTierRequest("zen", "opencode-zen", PREMIUM_MODEL), false);
      const headers = executor.buildHeaders(
        { apiKey: REAL_KEY } as never,
        true,
        null,
        PREMIUM_MODEL
      ) as Record<string, string>;
      assert.equal(headers["Authorization"], `Bearer ${REAL_KEY}`);
    } finally {
      _setOpencodeFreeModelsForTests(null);
    }
  });
});

test("OPENCODE_FREE_TIER_CREDENTIAL=key restores the operator key on a gated request", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  withCredentialEnv("key", () => {
    try {
      const executor = new OpencodeExecutor("opencode-zen");
      const headers = executor.buildHeaders(
        { apiKey: REAL_KEY } as never,
        true,
        null,
        FREE_MODEL
      ) as Record<string, string>;
      assert.equal(headers["Authorization"], `Bearer ${REAL_KEY}`);
    } finally {
      _setOpencodeFreeModelsForTests(null);
    }
  });
});

test("OPENCODE_FREE_TIER_CREDENTIAL=none sends no credential header on a gated request", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  withCredentialEnv("none", () => {
    try {
      const executor = new OpencodeExecutor("opencode-zen");
      const headers = executor.buildHeaders(
        { apiKey: REAL_KEY } as never,
        true,
        null,
        FREE_MODEL
      ) as Record<string, string>;
      assert.equal(headers["Authorization"], undefined);
      assert.equal(headers["x-api-key"], undefined);
    } finally {
      _setOpencodeFreeModelsForTests(null);
    }
  });
});

test("the claude wire format carries the free-tier credential as x-api-key", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  withCredentialEnv(undefined, () => {
    const executor = new OpencodeExecutor("opencode-zen");
    executor._requestFormat = "claude";
    try {
      const headers = executor.buildHeaders(
        { apiKey: REAL_KEY } as never,
        true,
        null,
        FREE_MODEL
      ) as Record<string, string>;
      assert.equal(headers["x-api-key"], FREE_TIER_PUBLIC_CREDENTIAL);
      assert.equal(headers["Authorization"], undefined);
    } finally {
      executor._requestFormat = null;
      _setOpencodeFreeModelsForTests(null);
    }
  });
});

test("a gated request is built against the /inference lane the credential belongs to", () => {
  _setOpencodeFreeModelsForTests([FREE_MODEL]);
  try {
    const executor = new OpencodeExecutor("opencode-zen");
    executor._requestFormat = null;
    const url = executor.buildUrl(FREE_MODEL, true);
    assert.ok(
      url.startsWith(`${FREE_TIER_INFERENCE_BASE_URL}/`),
      `expected ${url} to start with ${FREE_TIER_INFERENCE_BASE_URL}/`
    );
    const premiumUrl = executor.buildUrl(PREMIUM_MODEL, true);
    assert.ok(
      premiumUrl.startsWith("https://opencode.ai/zen/v1/"),
      `expected ${premiumUrl} to stay on the keyed lane`
    );
  } finally {
    _setOpencodeFreeModelsForTests(null);
  }
});

test("resolveGatedCredential: lane credential vs operator key, operator key read lazily", () => {
  let reads = 0;
  const operatorKey = () => {
    reads += 1;
    return REAL_KEY;
  };
  assert.equal(resolveGatedCredential(null, operatorKey), REAL_KEY);
  assert.equal(resolveGatedCredential({ mode: "key" }, operatorKey), REAL_KEY);
  assert.equal(reads, 2);
  assert.equal(resolveGatedCredential({ mode: "literal", value: "public" }, operatorKey), "public");
  assert.equal(resolveGatedCredential({ mode: "none" }, operatorKey), undefined);
  assert.equal(reads, 2, "literal/none must not consume the operator key");
});
