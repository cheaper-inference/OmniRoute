import test from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../../src/shared/utils/formatting.ts";

test("formatBytes formats bytes, KB, MB, and GB accurately", () => {
  assert.equal(formatBytes(null), "—");
  assert.equal(formatBytes(undefined), "—");
  assert.equal(formatBytes(0), "—");
  assert.equal(formatBytes(-10), "—");
  assert.equal(formatBytes(NaN), "—");

  assert.equal(formatBytes(512), "512 B");
  assert.equal(formatBytes(1023), "1023 B");
  assert.equal(formatBytes(1024), "1.0 KB");
  assert.equal(formatBytes(1536), "1.5 KB");
  assert.equal(formatBytes(1048576), "1.0 MB");
  assert.equal(formatBytes(4708845), "4.5 MB");
  assert.equal(formatBytes(9495580), "9.1 MB");
  assert.equal(formatBytes(1073741824), "1.00 GB");
  assert.equal(formatBytes(2684354560), "2.50 GB");
});
