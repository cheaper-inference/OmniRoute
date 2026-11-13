import test from "node:test";
import assert from "node:assert/strict";
import { resolveZcodeSelection } from "../../open-sse/executors/zcode.ts";
import { NativeSessionError } from "../../open-sse/executors/zcode/nativeSession.ts";
import { isProviderModelUnsupported400 } from "../../open-sse/services/accountFallback.ts";

test("a missing Start model is a 400 and a fresh registry can enable it", () => {
  const providerId = "account:zai-start-plan";
  const absent = { providers: [{ providerId, models: [{ modelId: "GLM-5.3-Flash" }] }] };
  assert.throws(
    () => resolveZcodeSelection(absent, "glm-5.3", providerId),
    (error: unknown) => {
      assert.ok(error instanceof NativeSessionError);
      assert.equal(error.status, 400);
      assert.match(error.message, /model.*not supported/i);
      assert.match(error.message, /not enabled/i);
      assert.equal(isProviderModelUnsupported400(error.status, error.message), true);
      return true;
    }
  );
  const available = { providers: [{ providerId, models: [{ modelId: "GLM-5.3", config: {} }] }] };
  assert.deepEqual(resolveZcodeSelection(available, "glm-5.3", providerId), {
    providerId,
    modelId: "GLM-5.3",
  });
});
