import test from "node:test";
import assert from "node:assert/strict";

import { UPSTREAM_MEDIA_LIMITS } from "../../src/shared/network/remoteImageFetch.ts";
import {
  SYNTX_MEDIA_DOWNLOAD_TIMEOUT_MS,
  SYNTX_MEDIA_MAX_BYTES,
} from "../../open-sse/services/syntxMedia.ts";

// The per-site download tests take their caps from these constants, so a changed value
// would still pass there. The changelog documents the size caps; pin them and the
// timeouts here.
const MiB = 1024 * 1024;

test("upstream media downloads keep their documented size caps and timeouts", () => {
  assert.deepEqual(UPSTREAM_MEDIA_LIMITS, {
    image: { maxBytes: 25 * MiB, timeoutMs: 60_000 },
    audio: { maxBytes: 50 * MiB, timeoutMs: 120_000 },
    video: { maxBytes: 100 * MiB, timeoutMs: 300_000 },
  });
});

test("SYNTX media downloads keep a 50 MiB cap and a 300 s timeout", () => {
  assert.equal(SYNTX_MEDIA_MAX_BYTES, 50 * MiB);
  assert.equal(SYNTX_MEDIA_DOWNLOAD_TIMEOUT_MS, 300_000);
});
