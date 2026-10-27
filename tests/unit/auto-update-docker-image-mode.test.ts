/**
 * Docker-aware dashboard update (image installs without the Docker socket).
 *
 * A published-image container has no `.git` and does not run from `node_modules`, so the
 * updater used to fall back to "source" and tell the operator "Not a git repository. Download
 * source or use npm install -g." — wrong advice inside a container. The container is now
 * detected and either:
 *   - `docker-image`: auto-update unsupported, the reason carries the host compose command;
 *   - `docker-trigger`: `DOCKER_UPDATE_TRIGGER_FILE` (inside DATA_DIR) is written as a JSON
 *     request that a host-side watcher turns into `docker compose pull` + recreate. No shell,
 *     no Docker socket.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const autoUpdate = await import("../../src/lib/system/autoUpdate.ts");

const nothingExists = () => false;
const IMAGE_PROBE = {
  compiledDir: "/ROOT/src/lib/system",
  entryScripts: ["/app/dev/run-standalone.mjs"],
  exists: nothingExists,
  isContainer: () => true,
};

const failingExec = (async () => {
  throw new Error("exec must not run for docker image modes");
}) as unknown as Parameters<typeof autoUpdate.validateAutoUpdateRuntime>[1];

function makeDataDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-docker-trigger-"));
}

test("resolveAutoUpdateMode: container without git/node_modules → docker-image (was source)", () => {
  assert.equal(
    autoUpdate.resolveAutoUpdateMode("npm", {
      isGitRepo: false,
      currentDir: "/app",
      isContainer: true,
    }),
    "docker-image"
  );
  assert.equal(
    autoUpdate.resolveAutoUpdateMode("npm", {
      isGitRepo: false,
      currentDir: "/app",
      isContainer: true,
      hasTriggerFile: true,
    }),
    "docker-trigger"
  );
});

test("resolveAutoUpdateMode: git checkout and explicit modes win over container detection", () => {
  assert.equal(
    autoUpdate.resolveAutoUpdateMode("npm", {
      isGitRepo: true,
      currentDir: "/workspace",
      isContainer: true,
      hasTriggerFile: true,
    }),
    "source"
  );
  assert.equal(
    autoUpdate.resolveAutoUpdateMode("docker-compose", {
      isGitRepo: false,
      currentDir: "/app",
      isContainer: true,
      hasTriggerFile: true,
    }),
    "docker-compose"
  );
  // npm install inside a container keeps the npm flow unless a trigger file is configured.
  assert.equal(
    autoUpdate.resolveAutoUpdateMode("npm", {
      isGitRepo: false,
      currentDir: "/usr/lib/node_modules/omniroute/bin",
      isContainer: true,
    }),
    "npm"
  );
  // Outside a container the old behavior is unchanged.
  assert.equal(
    autoUpdate.resolveAutoUpdateMode("npm", { isGitRepo: false, currentDir: "/opt/app" }),
    "source"
  );
});

test("getAutoUpdateConfig: image container → docker-image with a host compose command", () => {
  const config = autoUpdate.getAutoUpdateConfig({ DATA_DIR: "/app/data" }, IMAGE_PROBE);
  assert.equal(config.mode, "docker-image");
  assert.equal(
    config.manualUpdateCommand,
    "docker compose pull omniroute && docker compose up -d --force-recreate omniroute"
  );
  assert.equal(config.dockerTriggerFile, null);

  const custom = autoUpdate.getAutoUpdateConfig(
    { DATA_DIR: "/app/data", AUTO_UPDATE_SERVICE: "omniroute-web" },
    IMAGE_PROBE
  );
  assert.match(custom.manualUpdateCommand ?? "", /pull omniroute-web && /);

  // A service name with shell metacharacters is never echoed into a copyable command.
  const hostile = autoUpdate.getAutoUpdateConfig(
    { DATA_DIR: "/app/data", AUTO_UPDATE_SERVICE: "x; rm -rf /" },
    IMAGE_PROBE
  );
  assert.equal(
    hostile.manualUpdateCommand,
    "docker compose pull omniroute && docker compose up -d --force-recreate omniroute"
  );
});

test("getAutoUpdateConfig: explicit AUTO_UPDATE_MODE=docker-compose is unchanged in a container", () => {
  const config = autoUpdate.getAutoUpdateConfig(
    {
      DATA_DIR: "/app/data",
      AUTO_UPDATE_MODE: "docker-compose",
      DOCKER_UPDATE_TRIGGER_FILE: "/app/data/update/request.json",
    },
    IMAGE_PROBE
  );
  assert.equal(config.mode, "docker-compose");
  assert.equal(config.manualUpdateCommand, null);
});

test("validateAutoUpdateRuntime: docker-image is unsupported and explains the host command", async () => {
  const config = autoUpdate.getAutoUpdateConfig({ DATA_DIR: "/app/data" }, IMAGE_PROBE);
  const validation = await autoUpdate.validateAutoUpdateRuntime(config, failingExec);
  assert.equal(validation.supported, false);
  assert.match(validation.reason ?? "", /docker compose pull omniroute/);
  assert.match(validation.reason ?? "", /DOCKER_UPDATE_TRIGGER_FILE/);
  assert.doesNotMatch(validation.reason ?? "", /Not a git repository/);
});

test("docker-trigger: trigger inside DATA_DIR is supported and launch writes the JSON request", async () => {
  const dataDir = makeDataDir();
  try {
    const env = {
      DATA_DIR: dataDir,
      DOCKER_UPDATE_TRIGGER_FILE: path.join(dataDir, "update", "docker-update.request"),
    };
    const config = autoUpdate.getAutoUpdateConfig(env, IMAGE_PROBE);
    assert.equal(config.mode, "docker-trigger");
    assert.equal(config.dockerTriggerFile, env.DOCKER_UPDATE_TRIGGER_FILE);

    const validation = await autoUpdate.validateAutoUpdateRuntime(config, failingExec);
    assert.deepEqual(validation, { supported: true, reason: null, composeCommand: null });

    let spawned = false;
    const result = await autoUpdate.launchAutoUpdate({
      latest: "3.9.1",
      env,
      runtime: IMAGE_PROBE,
      execFileImpl: failingExec,
      spawnImpl: (() => {
        spawned = true;
        throw new Error("docker-trigger must not spawn a process");
      }) as unknown as Parameters<typeof autoUpdate.launchAutoUpdate>[0]["spawnImpl"],
    });

    assert.equal(spawned, false);
    assert.equal(result.started, true);
    assert.equal(result.channel, "docker-trigger");
    const request = JSON.parse(fs.readFileSync(env.DOCKER_UPDATE_TRIGGER_FILE, "utf8"));
    assert.equal(request.targetVersion, "3.9.1");
    assert.ok(!Number.isNaN(Date.parse(request.requestedAt)));
    // Atomic write: no temp file is left next to the request.
    assert.deepEqual(fs.readdirSync(path.join(dataDir, "update")), ["docker-update.request"]);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("docker-trigger: a relative trigger path resolves inside DATA_DIR", () => {
  const config = autoUpdate.getAutoUpdateConfig(
    { DATA_DIR: "/app/data", DOCKER_UPDATE_TRIGGER_FILE: "update/request.json" },
    IMAGE_PROBE
  );
  assert.equal(config.mode, "docker-trigger");
  assert.equal(config.dockerTriggerFile, "/app/data/update/request.json");
});

test("docker-trigger: paths outside DATA_DIR are rejected and nothing is written", async () => {
  const dataDir = makeDataDir();
  const outsideDir = makeDataDir();
  try {
    for (const triggerFile of [
      path.join(outsideDir, "request.json"),
      "../escape.json",
      path.join(dataDir, "..", path.basename(outsideDir), "request.json"),
      dataDir,
    ]) {
      const env = { DATA_DIR: dataDir, DOCKER_UPDATE_TRIGGER_FILE: triggerFile };
      const config = autoUpdate.getAutoUpdateConfig(env, IMAGE_PROBE);
      assert.equal(config.mode, "docker-trigger", triggerFile);
      const validation = await autoUpdate.validateAutoUpdateRuntime(config, failingExec);
      assert.equal(validation.supported, false, triggerFile);
      assert.match(validation.reason ?? "", /inside DATA_DIR/, triggerFile);

      const result = await autoUpdate.launchAutoUpdate({
        latest: "3.9.1",
        env,
        runtime: IMAGE_PROBE,
        execFileImpl: failingExec,
      });
      assert.equal(result.started, false, triggerFile);
    }
    assert.deepEqual(fs.readdirSync(outsideDir), []);
    assert.equal(fs.existsSync(path.join(path.dirname(dataDir), "escape.json")), false);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    fs.rmSync(outsideDir, { recursive: true, force: true });
  }
});

test("docker-trigger: a symlinked directory escaping DATA_DIR is rejected at write time", async () => {
  const dataDir = makeDataDir();
  const outsideDir = makeDataDir();
  try {
    fs.symlinkSync(outsideDir, path.join(dataDir, "update"));
    const env = {
      DATA_DIR: dataDir,
      DOCKER_UPDATE_TRIGGER_FILE: path.join(dataDir, "update", "request.json"),
    };
    const result = await autoUpdate.launchAutoUpdate({
      latest: "3.9.1",
      env,
      runtime: IMAGE_PROBE,
      execFileImpl: failingExec,
    });
    assert.equal(result.started, false);
    assert.deepEqual(fs.readdirSync(outsideDir), []);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    fs.rmSync(outsideDir, { recursive: true, force: true });
  }
});

test("docker-trigger: a malformed target version is refused without writing", async () => {
  const dataDir = makeDataDir();
  try {
    const env = {
      DATA_DIR: dataDir,
      DOCKER_UPDATE_TRIGGER_FILE: path.join(dataDir, "request.json"),
    };
    const result = await autoUpdate.launchAutoUpdate({
      latest: "3.9.1; reboot",
      env,
      runtime: IMAGE_PROBE,
      execFileImpl: failingExec,
    });
    assert.equal(result.started, false);
    assert.equal(fs.existsSync(env.DOCKER_UPDATE_TRIGGER_FILE), false);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});
