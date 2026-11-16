// The turn state machine's pure surface: the workspace it claims to trust, the
// dialog it refuses, and what it says on a host that cannot run it at all.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";

import {
  AgyTuiTurnError,
  runAgyTuiTurn,
  trustedWorkspaceSettings,
  workspaceMatches,
} from "../../open-sse/services/agyTuiRunner.ts";

const dirs: string[] = [];

function temporaryDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-tui-runner-test-"));
  dirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of dirs) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* a handle Windows has not released yet */
    }
  }
});

const dialog = (workspace: string): string =>
  [
    `Accessing workspace: ${workspace}`,
    "Do you trust the contents of this project?",
    "> Yes, I trust this folder",
    "  No, exit",
    "↑/↓ to navigate · Enter to confirm",
  ].join("\n");

describe("agyTuiRunner — the trusted workspace", () => {
  it("trusts the dispatched folder and only that folder", () => {
    const dir = temporaryDir();
    const settings = JSON.parse(trustedWorkspaceSettings(dir, {})) as {
      trustedWorkspaces: string[];
    };
    assert.ok(settings.trustedWorkspaces.includes(dir));
    assert.ok(settings.trustedWorkspaces.length >= 1);
    for (const workspace of settings.trustedWorkspaces) {
      assert.equal(fs.realpathSync(workspace), fs.realpathSync(dir));
    }
  });

  it("adds $PWD when it names the same folder", () => {
    const dir = temporaryDir();
    const settings = JSON.parse(trustedWorkspaceSettings(dir, { PWD: dir })) as {
      trustedWorkspaces: string[];
    };
    assert.ok(settings.trustedWorkspaces.includes(dir));
  });

  it("ignores a $PWD that names another folder", () => {
    const dir = temporaryDir();
    const elsewhere = temporaryDir();
    const settings = JSON.parse(trustedWorkspaceSettings(dir, { PWD: elsewhere })) as {
      trustedWorkspaces: string[];
    };
    assert.equal(settings.trustedWorkspaces.includes(elsewhere), false);
  });

  it("accepts the dialog for the workspace we dispatched into", () => {
    const dir = temporaryDir();
    assert.equal(workspaceMatches(dialog(dir), dir), true);
  });

  it("refuses the dialog for another folder", () => {
    assert.equal(workspaceMatches(dialog(temporaryDir()), temporaryDir()), false);
  });

  it("refuses a dialog that names no absolute path", () => {
    assert.equal(
      workspaceMatches(
        "Do you trust the contents of this project?\n> Yes, I trust this folder",
        process.cwd()
      ),
      false
    );
  });

  it("refuses a dialog naming two folders", () => {
    const first = temporaryDir();
    const second = temporaryDir();
    const text = `Accessing workspace: ${first}\nAccessing workspace: ${second}\nDo you trust the contents of this project?`;
    assert.equal(workspaceMatches(text, first), false);
  });

  it("expands a home-relative path before comparing", () => {
    const text = "Accessing workspace: ~\nDo you trust the contents of this project?";
    assert.equal(workspaceMatches(text, os.homedir()), true);
  });
});

describe("agyTuiRunner — refusals", () => {
  const request = {
    executable: "/usr/local/bin/agy",
    conversationId: null,
    prompt: "hi",
    cwd: "/tmp",
  };

  it("refuses a host with no pseudo-terminal before touching anything", async () => {
    if (process.platform !== "win32") return; // the only host this can assert on
    await assert.rejects(
      () => runAgyTuiTurn(request),
      (error: unknown) =>
        error instanceof AgyTuiTurnError && error.status === 501 && /POSIX/.test(error.message)
    );
  });

  it("refuses a relative executable", async () => {
    if (process.platform === "win32") return;
    await assert.rejects(
      () => runAgyTuiTurn({ ...request, executable: "agy" }),
      (error: unknown) => error instanceof AgyTuiTurnError && error.status === 500
    );
  });

  it("refuses a conversation id agy could not resolve", async () => {
    if (process.platform === "win32") return;

    await assert.rejects(
      () =>
        runAgyTuiTurn({
          ...request,
          conversationId: "../../etc/passwd",
        }),
      (error: unknown) => error instanceof AgyTuiTurnError && error.status === 400
    );
  });

  it("honours a signal aborted before the turn starts", async () => {
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(
      () => runAgyTuiTurn({ ...request, signal: controller.signal }),
      (error: unknown) => error instanceof AgyTuiTurnError && error.status === 499
    );
  });
});
