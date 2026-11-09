import assert from "node:assert";
import { test } from "node:test";
import { spawn } from "node:child_process";
import {
  isUpstreamNetworkError,
  shouldSwallowUncaught,
} from "../../src/shared/utils/httpClientAbortGuard.mjs";

test("isUpstreamNetworkError matches TypeError: terminated with allowlisted transport causes (#19214)", () => {
  const allowlistedCodes = ["ECONNRESET", "EPIPE", "UND_ERR_SOCKET", "UND_ERR_BODY_TIMEOUT"];

  for (const code of allowlistedCodes) {
    const cause = Object.assign(new Error(`network error: ${code}`), { code });
    const err = new TypeError("terminated", { cause });
    assert.strictEqual(
      isUpstreamNetworkError(err),
      true,
      `expected isUpstreamNetworkError to match TypeError: terminated with cause.code=${code}`
    );
    assert.strictEqual(
      shouldSwallowUncaught(err, "unhandledRejection"),
      true,
      `expected shouldSwallowUncaught to swallow unhandledRejection with cause.code=${code}`
    );
    assert.strictEqual(
      shouldSwallowUncaught(err, "uncaughtException"),
      true,
      `expected shouldSwallowUncaught to swallow uncaughtException with cause.code=${code}`
    );
  }
});

test("isUpstreamNetworkError rejects TypeError: terminated without allowlisted transport evidence (#19214)", () => {
  // Bare terminated without cause
  assert.strictEqual(isUpstreamNetworkError(new TypeError("terminated")), false);

  // Terminated with cause that has no code
  assert.strictEqual(
    isUpstreamNetworkError(new TypeError("terminated", { cause: new Error("unknown") })),
    false
  );

  // Terminated with cause having non-transport code
  assert.strictEqual(
    isUpstreamNetworkError(
      new TypeError("terminated", {
        cause: Object.assign(new Error("invalid arg"), { code: "ERR_INVALID_ARG_TYPE" }),
      })
    ),
    false
  );

  // Terminated with non-object cause
  assert.strictEqual(
    isUpstreamNetworkError(new TypeError("terminated", { cause: "string-cause" })),
    false
  );

  // Non-terminated TypeErrors
  assert.strictEqual(
    isUpstreamNetworkError(new TypeError("Cannot read properties of undefined")),
    false
  );
});

test("process crash guard survives unhandledRejection of TypeError: terminated with ECONNRESET (#19214)", async () => {
  const childScript = `
    import { installProcessCrashGuard } from "./src/shared/utils/httpClientAbortGuard.mjs";
    installProcessCrashGuard();
    const cause = Object.assign(new Error("read ECONNRESET"), { code: "ECONNRESET" });
    Promise.reject(new TypeError("terminated", { cause }));
    setTimeout(() => {
      console.log("ALIVE");
      process.exit(0);
    }, 100);
  `;

  const child = spawn(process.execPath, ["--input-type=module", "-e", childScript], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (data) => {
    stdout += data.toString();
  });
  child.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  const exitCode = await new Promise((resolve) => {
    child.on("close", resolve);
  });

  assert.strictEqual(exitCode, 0, `child exited with ${exitCode}, stderr: ${stderr}`);
  assert.ok(stdout.includes("ALIVE"), `expected ALIVE in stdout, got: ${stdout}`);
});
