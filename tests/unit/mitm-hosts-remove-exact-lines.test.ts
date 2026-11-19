/**
 * removeDNSEntries must delete only the two loopback lines OmniRoute writes
 * (`127.0.0.1 <host>` and `::1 <host>`), never an operator's own mapping that
 * happens to name the same host.
 *
 * The real remove script (the one sudo would run) is captured from the command
 * dependency and executed with node against a temp hosts file. Only the read of
 * /etc/hosts and the privileged spawn are replaced.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { removeDNSEntries } from "../../src/mitm/dns/dnsConfig.ts";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mitm-hosts-remove-"));
test.after(() => fs.rmSync(tmpDir, { recursive: true, force: true }));

const HOST = "intranet.corp";
const OPERATOR_LINES = [
  "127.0.0.1 localhost",
  "10.1.2.3 intranet.corp keepme",
  "10.1.2.3 intranet.corp",
  "127.0.0.1 localhost intranet.corp",
  "# 127.0.0.1 intranet.corp",
  "192.168.0.9 other.example",
];
const OMNIROUTE_LINES = ["127.0.0.1 intranet.corp", "::1 intranet.corp"];

type Captured = { script: string; hostsArg: string; hostArg: string };

async function captureRemoveCommand(
  hostsContent: string,
  platform: NodeJS.Platform
): Promise<{ posix?: Captured; powershell?: string }> {
  const previousSkip = process.env.OMNIROUTE_SKIP_DNS_WRITE;
  delete process.env.OMNIROUTE_SKIP_DNS_WRITE;
  const platformMock = mock.method(os, "platform", () => platform);
  const realRead = fs.readFileSync;
  const readMock = mock.method(fs, "readFileSync", ((file: unknown, ...rest: unknown[]) => {
    if (String(file).endsWith("hosts")) return hostsContent;
    return (realRead as (...a: unknown[]) => unknown)(file, ...rest);
  }) as typeof fs.readFileSync);
  const out: { posix?: Captured; powershell?: string } = {};
  try {
    await removeDNSEntries([HOST], "unused", {
      execFileWithPassword: async (_command, args) => {
        // sudo -S <node> -e <script> <hosts file> <host>
        out.posix = { script: args[3], hostsArg: args[4], hostArg: args[5] };
        return "";
      },
      runElevatedPowerShell: async (script) => {
        out.powershell = script;
        return "";
      },
    });
  } finally {
    readMock.mock.restore();
    platformMock.mock.restore();
    if (previousSkip === undefined) delete process.env.OMNIROUTE_SKIP_DNS_WRITE;
    else process.env.OMNIROUTE_SKIP_DNS_WRITE = previousSkip;
  }
  return out;
}

test("removeDNSEntries keeps operator lines that name the host and removes only OmniRoute's two", async () => {
  const original = [...OPERATOR_LINES, ...OMNIROUTE_LINES].join("\n") + "\n";
  const { posix } = await captureRemoveCommand(original, "linux");
  assert.ok(posix, "the POSIX remove command must run");
  assert.equal(posix.hostArg, HOST);

  const hostsFile = path.join(tmpDir, "hosts");
  fs.writeFileSync(hostsFile, original);
  const run = spawnSync(process.execPath, ["-e", posix.script, hostsFile, posix.hostArg], {
    encoding: "utf8",
  });
  assert.equal(run.status, 0, run.stderr);

  assert.equal(fs.readFileSync(hostsFile, "utf8"), OPERATOR_LINES.join("\n") + "\n");
});

test("the Windows remove script only matches the loopback lines with exactly that one host", async () => {
  const original = [...OPERATOR_LINES, ...OMNIROUTE_LINES].join("\n") + "\n";
  const { powershell } = await captureRemoveCommand(original, "win32");
  assert.ok(powershell, "the PowerShell remove command must run");
  // No PowerShell here to run it, so pin the filter's three conditions in the script text.
  assert.match(powershell, /\$part\.Length -eq 2/);
  assert.match(powershell, /\$part\[0\] -eq '127\.0\.0\.1'/);
  assert.match(powershell, /\$part\[0\] -eq '::1'/);
});

test("the Windows remove script compares the host case-sensitively, like the POSIX filter", async () => {
  const original =
    [...OPERATOR_LINES, "127.0.0.1 Intranet.Corp", ...OMNIROUTE_LINES].join("\n") + "\n";
  const { powershell } = await captureRemoveCommand(original, "win32");
  assert.ok(powershell, "the PowerShell remove command must run");
  // PowerShell -contains ignores case, so it would also drop "127.0.0.1 Intranet.Corp".
  assert.match(powershell, /\$targetHosts -ccontains \$part\[1\]/);
  assert.doesNotMatch(powershell, /-contains/);
});
