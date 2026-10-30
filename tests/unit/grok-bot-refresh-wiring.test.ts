import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { supportsTokenRefresh, formatProviderCredentials } from "../../open-sse/services/tokenRefresh.ts";
import { ROTATION_LOCK_GROUP, serializeRefresh } from "../../open-sse/services/refreshSerializer.ts";
import { providerAllowsOptionalApiKey } from "../../src/shared/constants/providers.ts";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-bot-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;

describe("grok-bot refresh wiring", () => {
  it("lists grok-bot in supportsTokenRefresh", () => {
    assert.equal(supportsTokenRefresh("grok-bot"), true);
  });

  it("maps credentials to accessToken + refreshToken", () => {
    const mapped = formatProviderCredentials(
      "grok-bot",
      { accessToken: "a", refreshToken: "r" },
      undefined
    );
    assert.deepEqual(mapped, { accessToken: "a", refreshToken: "r" });
  });

  it("allows connection creation without a generic API key", () => {
    assert.equal(providerAllowsOptionalApiKey("grok-bot"), true);
  });

  it("serializes concurrent refreshes on the grok-bot lane", async () => {
    process.env.CODEX_REFRESH_SPACING_MS = "0";
    assert.equal(ROTATION_LOCK_GROUP["grok-bot"], "grok-bot");
    const order: string[] = [];
    const task = (name: string) => async () => {
      order.push(`${name}:start`);
      await new Promise((r) => setTimeout(r, 20));
      order.push(`${name}:end`);
      return name;
    };
    await Promise.all([serializeRefresh("grok-bot", task("a")), serializeRefresh("grok-bot", task("b"))]);
    const aStart = order.indexOf("a:start");
    const bStart = order.indexOf("b:start");
    const aEnd = order.indexOf("a:end");
    const bEnd = order.indexOf("b:end");
    const overlapped =
      (aStart < bEnd && bStart < aEnd) || (bStart < aEnd && aStart < bEnd);
    assert.equal(overlapped, false, `refreshes overlapped: ${order.join(" ")}`);
  });

  it("overlaps when the grok-bot lane entry is removed", async () => {
    process.env.CODEX_REFRESH_SPACING_MS = "0";
    const saved = ROTATION_LOCK_GROUP["grok-bot"];
    delete ROTATION_LOCK_GROUP["grok-bot"];
    try {
      const order: string[] = [];
      const task = (name: string) => async () => {
        order.push(`${name}:start`);
        await new Promise((r) => setTimeout(r, 20));
        order.push(`${name}:end`);
        return name;
      };
      await Promise.all([serializeRefresh("grok-bot", task("a")), serializeRefresh("grok-bot", task("b"))]);
      const aStart = order.indexOf("a:start");
      const bStart = order.indexOf("b:start");
      const aEnd = order.indexOf("a:end");
      const bEnd = order.indexOf("b:end");
      const overlapped =
        (aStart < bStart && bStart < aEnd) || (bStart < aStart && aStart < bEnd);
      assert.equal(overlapped, true, `refreshes did not overlap: ${order.join(" ")}`);
    } finally {
      ROTATION_LOCK_GROUP["grok-bot"] = saved;
    }
  });
});

test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});
