import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

type Compose = {
  services: Record<string, { image?: string; build?: { target?: string } }>;
};

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

test("the codex-app-server sidecar builds an image with the Codex CLI", () => {
  const composeText = fs.readFileSync(path.join(REPO_ROOT, "docker-compose.yml"), "utf8");
  const compose: Compose = parse(composeText, { merge: true });
  const sidecar = compose.services["codex-app-server"];
  assert.ok(sidecar, "codex-app-server service must exist");
  assert.notEqual(sidecar.image, "omniroute:base", "omniroute:base has no Codex CLI");
  const target = sidecar.build?.target;
  assert.ok(target, "codex-app-server must declare a Dockerfile build target");

  const dockerfile = fs.readFileSync(path.join(REPO_ROOT, "Dockerfile"), "utf8");
  const stagesWithCodex = new Set<string>();
  for (const stage of dockerfile.split(/(?=^FROM[ \t])/im)) {
    const declaration = /^FROM[ \t]+(?:--platform=\S+[ \t]+)?(\S+)[ \t]+AS[ \t]+(\S+)/i.exec(stage);
    if (!declaration) continue;

    const [, parent, name] = declaration;
    const npmInstallArgs = stage
      .replace(/\\\r?\n/g, " ")
      .match(/^RUN[ \t]+(?:--\S+[ \t]+)*npm[ \t]+(?:install|i)([ \t]+[^\r\n;&|]*)/gm);
    const installsCodex = npmInstallArgs?.some((command) =>
      /[ \t]@openai\/codex(?:@\S+)?(?=[ \t]|$)/.test(command)
    );
    if (installsCodex || stagesWithCodex.has(parent.toLowerCase())) {
      stagesWithCodex.add(name.toLowerCase());
    }
  }

  assert.ok(
    stagesWithCodex.has(target.toLowerCase()),
    `${target} must install or inherit Codex CLI`
  );
});
