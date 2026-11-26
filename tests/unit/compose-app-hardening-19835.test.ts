import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

type Service = {
  "<<"?: Service;
  cap_drop?: string[];
  cap_add?: string[];
  security_opt?: string[];
  privileged?: boolean;
  profiles?: string[];
  volumes?: (string | { source?: string; target?: string })[];
};

type Compose = {
  "x-common": Service;
  services: Record<string, Service>;
};

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const composeText = fs.readFileSync(path.join(REPO_ROOT, "docker-compose.yml"), "utf8");
const compose: Compose = parse(composeText, { merge: true });
const rawCompose: Compose = parse(composeText, { merge: false });

test("the shared app configuration drops all capabilities and prevents new privileges", () => {
  const common = compose["x-common"];
  assert.deepEqual(common.cap_drop, ["ALL"]);
  assert.ok(common.security_opt?.includes("no-new-privileges:true"));
});

for (const name of ["omniroute-base", "omniroute-web", "omniroute-cli", "omniroute-host"]) {
  test(`${name} inherits the app hardening settings`, () => {
    const rawService = rawCompose.services[name];
    assert.equal(rawService["<<"], rawCompose["x-common"], "must merge *common");
    assert.ok(!Object.hasOwn(rawService, "cap_drop"), "must inherit cap_drop");
    assert.ok(!Object.hasOwn(rawService, "security_opt"), "must inherit security_opt");

    const service = compose.services[name];
    assert.deepEqual(service.cap_drop, ["ALL"]);
    assert.ok(service.security_opt?.includes("no-new-privileges:true"));
    assert.ok(!Object.hasOwn(service, "cap_add"), "must not add capabilities");
    assert.notEqual(service.privileged, true, "must not run in privileged mode");
  });
}

test("only the cli profile mounts the Docker socket", () => {
  const dockerSocketMounts = Object.entries(compose.services).flatMap(([name, service]) =>
    (service.volumes ?? [])
      .map((volume) =>
        typeof volume === "string" ? volume.split(":", 2) : [volume.source, volume.target]
      )
      .filter((paths) =>
        paths.some((mountPath) => path.posix.basename(mountPath ?? "") === "docker.sock")
      )
      .map(([source, target]) => ({ name, source, target }))
  );

  assert.deepEqual(dockerSocketMounts, [
    {
      name: "omniroute-cli",
      source: "/var/run/docker.sock",
      target: "/var/run/docker.sock",
    },
  ]);
  assert.deepEqual(compose.services["omniroute-cli"].profiles, ["cli"]);
});
