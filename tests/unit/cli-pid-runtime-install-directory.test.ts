import assert from "node:assert/strict";
import { test } from "node:test";
import { classifyPidIdentity } from "../../bin/cli/utils/pid.mjs";

const windowsSeparator = String.fromCharCode(92);
const nul = String.fromCharCode(0);
const runtimes = ["node", "nodejs", "bun", "node24"];

function classify(
  platform: "linux" | "darwin" | "win32",
  executable: string,
  script: string,
  quoted = true
) {
  const argv = [executable, "--no-warnings", script, "--log=/tmp/OmniRoute.log"];
  const command = argv.map((arg) => (quoted ? '"' + arg + '"' : arg)).join(" ");
  return classifyPidIdentity(42, {
    platform,
    readFileSync: () => argv.join(nul) + nul,
    execFileSync: () => command,
    isFile: (file: string) => file === executable || file === script,
  });
}

for (const runtime of runtimes) {
  const posixExecutable = "/opt/OmniRoute Runtime/bin/" + runtime;
  const windowsExecutable = ["C:", "OmniRoute Runtime", runtime + ".exe"].join(windowsSeparator);

  test(runtime + " installed under OmniRoute does not own an unrelated Linux process", () => {
    assert.equal(classify("linux", posixExecutable, "/srv/unrelated/server.mjs"), "foreign");
  });

  for (const quoted of [true, false]) {
    test(
      runtime + " directory is not application identity in macOS command text, quoted=" + quoted,
      () => {
        assert.equal(
          classify("darwin", posixExecutable, "/srv/unrelated/server.mjs", quoted),
          "foreign"
        );
      }
    );

    test(
      runtime + " directory is not application identity in Windows command text, quoted=" + quoted,
      () => {
        assert.equal(
          classify("win32", windowsExecutable, "C:/unrelated/server.mjs", quoted),
          "foreign"
        );
      }
    );
  }

  test(runtime + " still identifies the actual OmniRoute script", () => {
    assert.equal(classify("linux", posixExecutable, "/srv/OmniRoute/bin/cli.mjs"), "ours");
    assert.equal(classify("darwin", posixExecutable, "/srv/OmniRoute/bin/cli.mjs"), "ours");
    assert.equal(classify("win32", windowsExecutable, "C:/OmniRoute/bin/cli.mjs"), "ours");
  });
}

test("an OmniRoute process title remains application identity", () => {
  assert.equal(
    classifyPidIdentity(42, {
      platform: "linux",
      readFileSync: () => "omniroute (v3.8.55)" + nul.repeat(8),
    }),
    "ours"
  );
});

test("an unproven joined executable path stays unknown", () => {
  assert.equal(
    classifyPidIdentity(42, {
      platform: "darwin",
      execFileSync: () => "/opt/OmniRoute Runtime/bin/node /srv/unrelated/server.mjs",
      isFile: () => false,
    }),
    "unknown"
  );
});
