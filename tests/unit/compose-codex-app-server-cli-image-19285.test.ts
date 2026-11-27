import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

type Compose = {
  services: Record<
    string,
    {
      image?: string;
      build?: { target?: string };
      volumes?: Array<string | { type: string; source?: string; target: string }>;
    }
  >;
};

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

const composeText = fs.readFileSync(path.join(REPO_ROOT, "docker-compose.yml"), "utf8");
const compose: Compose = parse(composeText, { merge: true });
const sidecar = compose.services["codex-app-server"];
assert.ok(sidecar, "codex-app-server service must exist");
const target = sidecar.build?.target;
assert.ok(target, "codex-app-server must declare a Dockerfile build target");

function readDockerfileStages() {
  const dockerfile = fs.readFileSync(path.join(REPO_ROOT, "Dockerfile"), "utf8");
  const stages = new Map<string, { parent: string; instructions: string }>();
  for (const stage of dockerfile.split(/(?=^FROM[ \t])/im)) {
    const declaration = /^FROM[ \t]+(?:--platform=\S+[ \t]+)?(\S+)[ \t]+AS[ \t]+(\S+)/i.exec(stage);
    if (!declaration) continue;

    const [, parent, name] = declaration;
    stages.set(name.toLowerCase(), {
      parent: parent.toLowerCase(),
      instructions: stage.replace(/\\\r?\n/g, " "),
    });
  }
  return stages;
}

const stages = readDockerfileStages();

test("the codex-app-server sidecar builds an image with the Codex CLI", () => {
  assert.notEqual(sidecar.image, "omniroute:base", "omniroute:base has no Codex CLI");
  const stagesWithCodex = new Set<string>();
  for (const [name, { parent, instructions }] of stages) {
    const npmInstallArgs = instructions.match(
      /^RUN[ \t]+(?:--\S+[ \t]+)*npm[ \t]+(?:install|i)([ \t]+[^\r\n;&|]*)/gm
    );
    const installsCodex = npmInstallArgs?.some((command) =>
      /[ \t]@openai\/codex(?:@\S+)?(?=[ \t]|$)/.test(command)
    );
    if (installsCodex || stagesWithCodex.has(parent)) {
      stagesWithCodex.add(name);
    }
  }

  assert.ok(
    stagesWithCodex.has(target.toLowerCase()),
    `${target} must install or inherit Codex CLI`
  );
});

test("the codex-app-server image creates its named volume mount points owned by node", () => {
  const mountPoints = (sidecar.volumes ?? []).flatMap((volume) => {
    if (typeof volume !== "string") {
      return volume.type === "volume" && volume.source ? [volume.target] : [];
    }

    const [source, destination] = volume.split(":");
    return source && destination && !source.startsWith(".") && !source.startsWith("/")
      ? [destination]
      : [];
  });
  assert.ok(mountPoints.length, "codex-app-server must mount named volumes");

  const commands: string[][] = [];
  for (let stage = stages.get(target.toLowerCase()); stage; stage = stages.get(stage.parent)) {
    for (const [, script] of stage.instructions.matchAll(
      /^RUN[ \t]+(?:--\S+[ \t]+)*([^\r\n]+)/gim
    )) {
      commands.push(...script.split(/&&|\|\||;/).map((step) => step.trim().split(/\s+/)));
    }
  }

  const unpreparedMountPoints = mountPoints.filter((mountPoint) => {
    const created = commands.some(
      ([program, ...args]) => program === "mkdir" && args.includes(mountPoint)
    );
    const ownedByNode = commands.some(
      ([program, ...args]) =>
        program === "chown" &&
        args.find((arg) => !arg.startsWith("-")) === "node:node" &&
        args.includes(mountPoint)
    );
    return !created || !ownedByNode;
  });
  assert.deepEqual(
    unpreparedMountPoints,
    [],
    `${target} must create and chown mount points to node:node`
  );
});
