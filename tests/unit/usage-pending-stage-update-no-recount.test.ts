import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A stage-only update changes scalars, so it must not re-walk the retained
// payload previews (the byte total cannot change). Payload replacements must
// still be re-measured so the pending byte ceiling keeps working.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pending-stage-"));
process.env.DATA_DIR = tmpDir;

const {
  trackPendingRequest,
  updatePendingRequest,
  updatePendingRequestById,
  getPendingById,
  getPendingRetainedBytes,
  clearPendingRequests,
} = await import("../../src/lib/usage/usageHistory.ts");

test.beforeEach(() => clearPendingRequests());
test.after(() => clearPendingRequests());

/** Plant a payload whose every enumeration is counted. */
function plantCountingPayload(id: string) {
  const counter = { walks: 0 };
  const payload = new Proxy(
    { messages: "x".repeat(100) },
    {
      ownKeys(target) {
        counter.walks++;
        return Reflect.ownKeys(target);
      },
    }
  );
  const detail = getPendingById().get(id)!;
  detail.providerRequest = payload;
  return counter;
}

test("updatePendingRequestById with scalar-only metadata does not re-walk payloads", () => {
  const id = trackPendingRequest("m", "p", "c", true)!;
  const counter = plantCountingPayload(id);
  assert.equal(updatePendingRequestById(id, { stage: "streaming", status: 200 }), true);
  assert.equal(counter.walks, 0);
  assert.equal(getPendingById().get(id)?.stage, "streaming");
});

test("updatePendingRequest with scalar-only metadata does not re-walk payloads", () => {
  const id = trackPendingRequest("m", "p", "c", true)!;
  const counter = plantCountingPayload(id);
  updatePendingRequest("m", "p", "c", { stage: "streaming" });
  assert.equal(counter.walks, 0);
  assert.equal(getPendingById().get(id)?.stage, "streaming");
});

test("a payload replacement is still re-measured into the retained byte total", () => {
  const id = trackPendingRequest("m", "p", "c", true)!;
  const empty = getPendingRetainedBytes();
  updatePendingRequestById(id, { providerRequest: { prompt: "y".repeat(800) } });
  const withPayload = getPendingRetainedBytes();
  assert.ok(withPayload >= empty + 800, `grew by payload: ${withPayload - empty}`);
  updatePendingRequestById(id, { providerRequest: { prompt: "z" } });
  assert.ok(getPendingRetainedBytes() < withPayload - 700, "shrinks when payload is replaced");
  updatePendingRequestById(id, { stage: "done" });
  assert.ok(getPendingRetainedBytes() < withPayload - 700, "scalar update keeps the total");
});
