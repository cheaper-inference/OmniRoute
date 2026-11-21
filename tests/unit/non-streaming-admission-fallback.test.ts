import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("nonstream-admission-fallback-");
const { runNonStreamingProviderLeg } =
  await import("../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
const {
  AuxiliaryAdmissionRejected,
  isPrivateAdmissionError,
  withAuxiliaryAdmission,
  acquireAuxiliaryAdmissions,
} = await import("../../open-sse/services/combo/auxiliaryAdmission.ts");
const { baseInput, makeExecutorResult } =
  await import("./_helpers/nonStreamingProviderLegFixtures.ts");

test.after(cleanup);

for (const failure of ["model-unavailable", "context-overflow"] as const) {
  for (const admission of ["auxiliary", "capacity", "cancellation", "ordinary"] as const) {
    test(`${failure} family fallback preserves ${admission} failure identity and policy`, async () => {
      const error =
        admission === "auxiliary"
          ? new AuxiliaryAdmissionRejected({}, "SEMAPHORE_QUEUE_FULL")
          : admission === "capacity"
            ? Object.assign(new Error("fixture admission expired"), {
                code: "COMBO_CAPACITY_TIMEOUT",
              })
            : new Error("fixture ordinary executor failure");
      if (admission === "cancellation") {
        const controller = new AbortController();
        controller.abort(error);
        await assert.rejects(
          withAuxiliaryAdmission(
            {
              owner: {},
              kind: "round-robin",
              key: "fixture-fallback-cancellation",
              maxConcurrency: 1,
              timeoutMs: 100,
              maxQueueSize: 1,
            },
            () => acquireAuxiliaryAdmissions(null, controller.signal, 100)
          ),
          (caught: unknown) => caught === error
        );
      }
      assert.equal(isPrivateAdmissionError(error), admission !== "ordinary");
      const models: string[] = [];
      const status = failure === "model-unavailable" ? 404 : 400;
      const message =
        failure === "model-unavailable" ? "model_not_found" : "maximum context length exceeded";
      const pending = runNonStreamingProviderLeg(
        baseInput({
          provider: failure === "model-unavailable" ? "gemini" : "anthropic",
          model: failure === "model-unavailable" ? "gemini-3-pro" : "claude-opus-5-5",
          clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
          executeProviderRequest: async (model) => {
            models.push(model);
            if (models.length === 1) return makeExecutorResult({ error: { message } }, status);
            throw error;
          },
        })
      );
      if (admission === "ordinary") {
        const result = await pending;
        assert.equal(result.kind, "error");
        if (result.kind === "error") {
          assert.equal(result.result.status, status);
          assert.ok(result.result.error.includes(message));
        }
      } else {
        await assert.rejects(pending, (caught: unknown) => caught === error);
      }
      assert.equal(models.length, 2, "the real family selector must reach the fallback executor");
      assert.notEqual(models[0], models[1]);
    });
  }
}
