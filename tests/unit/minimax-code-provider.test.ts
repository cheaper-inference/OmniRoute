import test from "node:test";
import assert from "node:assert/strict";
import { minimaxCodeProvider } from "../../open-sse/config/providers/registry/minimax-code/index.ts";

test("MiniMax Code provider registry exposes a local no-auth MiniMax Code backend", () => {
  assert.equal(minimaxCodeProvider.id, "minimax-code");
  assert.equal(minimaxCodeProvider.alias, "mmcode");
  assert.equal(minimaxCodeProvider.executor, "minimax-code");
  assert.equal(minimaxCodeProvider.format, "openai");
  assert.equal(minimaxCodeProvider.baseUrl, "minimax-code://gateway");
  assert.equal(minimaxCodeProvider.authType, "none");
  assert.equal(minimaxCodeProvider.authHeader, "none");
  assert.equal(
    minimaxCodeProvider.models.some((model) => model.id === "MiniMax-M3.1-Flash"),
    true
  );
  assert.equal(
    minimaxCodeProvider.models.some((model) => model.id === "MiniMax-M3"),
    true
  );
  assert.equal(
    minimaxCodeProvider.models.some((model) => model.id === "MiniMax-M3.1-Flash-Preview"),
    false
  );
});
