import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { installManagedCliCandidate } from "../../src/lib/cliTools/managedCliInstall";
import { getManagedCliDefinition } from "../../src/shared/services/managedCliRuntime";

for (const platform of ["linux", "win32"] as const) {
  test(`approved lifecycle policy is staged before install on ${platform}`, async (t) => {
    t.mock.method(os, "platform", () => platform);
    const prefix = await fs.mkdtemp(path.join(os.tmpdir(), "managed-policy-"));
    t.after(() => fs.rm(prefix, { recursive: true, force: true }));
    const definition = getManagedCliDefinition("claude")!;
    const calls: string[][] = [];
    await installManagedCliCandidate(
      definition,
      "2.1.328",
      prefix,
      async (command, args, options) => {
        calls.push(args);
        assert.equal(command, platform === "win32" ? "npm.cmd" : "npm");
        assert.equal(Boolean(options.shell), platform === "win32");
        assert.equal(options.cwd, prefix);
        if (args[0] === "--version") return "11.18.0\n";
        const manifest = JSON.parse(await fs.readFile(path.join(prefix, "package.json"), "utf8"));
        assert.deepEqual(manifest.allowScripts, { "@anthropic-ai/claude-code": true });
        assert.ok(args.includes("--strict-allow-scripts"));
        assert.ok(!args.some((arg) => arg.startsWith("--allow-scripts=")));
        assert.equal(await fs.readFile(path.join(prefix, ".npmrc"), "utf8"), "");
        return "";
      }
    );
    assert.deepEqual(
      calls.map((args) => args[0]),
      ["--version", "install"]
    );
  });
}

for (const version of ["11.9.0", "11.15.0", "11.16.0", "11.17.9", "12.0.0-beta.1", "unknown"]) {
  test(`npm ${version} fails closed before a lifecycle install`, async (t) => {
    const prefix = await fs.mkdtemp(path.join(os.tmpdir(), "managed-policy-"));
    t.after(() => fs.rm(prefix, { recursive: true, force: true }));
    const calls: string[][] = [];
    await assert.rejects(
      installManagedCliCandidate(
        getManagedCliDefinition("droid")!,
        "1.2.3",
        prefix,
        async (_command, args) => {
          calls.push(args);
          return version;
        }
      ),
      { code: "npm_policy_unsupported", httpStatus: 409 }
    );
    assert.deepEqual(calls, [["--version"]]);
    assert.deepEqual(await fs.readdir(prefix), []);
  });
}

for (const toolId of ["codex", "qoder"]) {
  test(`${toolId} remains script-free without a newer npm requirement`, async (t) => {
    const prefix = await fs.mkdtemp(path.join(os.tmpdir(), "managed-policy-"));
    t.after(() => fs.rm(prefix, { recursive: true, force: true }));
    let installs = 0;
    await installManagedCliCandidate(
      getManagedCliDefinition(toolId)!,
      "1.2.3",
      prefix,
      async (_command, args) => {
        installs += 1;
        assert.equal(args[0], "install");
        assert.ok(args.includes("--ignore-scripts"));
        const manifest = JSON.parse(await fs.readFile(path.join(prefix, "package.json"), "utf8"));
        assert.deepEqual(manifest.allowScripts, {});
        return "";
      }
    );
    assert.equal(installs, 1);
  });
}
