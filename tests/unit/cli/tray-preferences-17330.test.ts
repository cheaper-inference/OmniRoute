import test from "node:test";
import assert from "node:assert/strict";
import { Command } from "commander";
import { registerAutostart } from "../../../bin/cli/commands/autostart.mjs";

test("autostart enable and toggle accept an explicit tray choice", async () => {
  for (const name of ["enable", "toggle"]) {
    const program = new Command().exitOverride().configureOutput({ writeErr() {} });
    registerAutostart(program);
    const sub = program.commands[0].commands.find((c) => c.name() === name);
    assert.ok(sub);
    let selected: boolean | undefined;
    sub.action((opts) => {
      selected = opts.tray;
    });
    await program.parseAsync(["autostart", name, "--no-tray"], { from: "user" });
    assert.equal(selected, false);
  }
});

import { buildWinVbsContent } from "../../../bin/cli/tray/autostart.mjs";

test("Windows startup honors an explicitly disabled tray", () => {
  const script = buildWinVbsContent("C:\\Program Files\\OmniRoute\\omniroute.mjs", { tray: false });
  assert.match(script, /serve --no-open --no-tray/);
  assert.doesNotMatch(script, /--tray(?: |")/);
});

import { mkdtempSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadTrayPreference, saveTrayPreference } from "../../../bin/cli/tray/preferences.mjs";
import { registerServe, resolveServeTrayOptions } from "../../../bin/cli/commands/serve.mjs";
import {
  buildMacPlistContent,
  buildLinuxDesktopContent,
  buildLinuxSystemdUnitContent,
  enable as enableAutostart,
} from "../../../bin/cli/tray/autostart.mjs";

function isolatedPreferences(run: (directory: string) => void | Promise<void>) {
  const directory = mkdtempSync(join(tmpdir(), "tray17330-"));
  const keys = ["HOME", "DATA_DIR", "PATH", "DISPLAY", "WAYLAND_DISPLAY", "XDG_CURRENT_DESKTOP"];
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  process.env.HOME = directory;
  process.env.DATA_DIR = directory;
  const cleanup = () => {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
    rmSync(directory, { recursive: true, force: true });
  };
  return Promise.resolve()
    .then(() => run(directory))
    .finally(cleanup);
}

test("invalid and missing preferences preserve the plain serve default", async () => {
  await isolatedPreferences((directory) => {
    assert.equal(loadTrayPreference(), undefined);
    assert.equal(resolveServeTrayOptions().tray, false);
    for (const value of [
      "{",
      "null",
      "[]",
      '{"tray":true}',
      '{"version":1,"tray":"false"}',
      '{"version":2,"tray":true}',
    ]) {
      writeFileSync(join(directory, "tray-preferences.json"), value);
      assert.equal(loadTrayPreference(), undefined, value);
      assert.equal(resolveServeTrayOptions().tray, false);
    }
  });
});

test("saved choice survives reload, explicit serve flags win without overwriting it", async () => {
  await isolatedPreferences(async (directory) => {
    saveTrayPreference(true);
    assert.equal(loadTrayPreference(), true);
    assert.equal(resolveServeTrayOptions().tray, true);
    for (const args of [["serve"], ["serve", "--no-tray"], ["serve", "--tray"]]) {
      const program = new Command();
      registerServe(program);
      let selected: boolean | undefined;
      program.commands[0].action((opts) => {
        selected = resolveServeTrayOptions(opts).tray;
      });
      await program.parseAsync(args, { from: "user" });
      assert.equal(selected, !args.includes("--no-tray"));
    }
    assert.equal(loadTrayPreference(), true);
    assert.equal(resolveServeTrayOptions({ daemon: true }).tray, false);
    assert.equal(resolveServeTrayOptions({ headless: true }).tray, false);
    assert.equal(resolveServeTrayOptions({}, { OMNIROUTE_HEADLESS: "true" }).tray, false);
    assert.equal(resolveServeTrayOptions({ tray: true, headless: true }).tray, true);
    saveTrayPreference(false);
    assert.equal(resolveServeTrayOptions().tray, false);
    assert.equal(resolveServeTrayOptions({ tray: true }).tray, true);
    assert.throws(() => saveTrayPreference("false"));
    assert.equal(loadTrayPreference(), false);
    assert.deepEqual(JSON.parse(readFileSync(join(directory, "tray-preferences.json"), "utf8")), {
      version: 1,
      tray: false,
    });
    if (process.platform !== "win32")
      assert.equal(statSync(join(directory, "tray-preferences.json")).mode & 0o777, 0o600);
  });
});

test("desktop generators retain tray default and honor an explicit disabled choice", () => {
  const path = "/opt/Omni Route/omniroute.mjs";
  for (const render of [buildWinVbsContent, buildMacPlistContent, buildLinuxDesktopContent]) {
    assert.match(render(path), /--tray/);
    assert.match(render(path, { tray: false }), /--no-tray/);
    assert.doesNotMatch(render(path, { tray: false }), /--tray(?:["< ]|$)/);
  }
  assert.match(buildLinuxDesktopContent(path), /Exec=.*"\/opt\/Omni Route\/omniroute.mjs" serve/);
  assert.match(buildMacPlistContent('/opt/A&B<test>"/omniroute.mjs'), /A&amp;B&lt;test&gt;&quot;/);
});

test("Windows VBS preserves literal Windows path separators and quotes spaces", () => {
  const script = buildWinVbsContent(String.raw`C:\Program Files\OmniRoute\omniroute.mjs`, {
    tray: false,
  });
  assert.ok(script.includes(String.raw`""C:\Program Files\OmniRoute\omniroute.mjs""`));
  assert.match(script, /, 0, False\n$/);
});

test("systemd always suppresses the persisted tray preference", async () => {
  await isolatedPreferences(() => {
    saveTrayPreference(true);
    const unit = buildLinuxSystemdUnitContent("/opt/Omni Route/omniroute.mjs");
    assert.match(unit, /ExecStart=.*serve --no-open --no-tray/);
    assert.doesNotMatch(unit, /--tray(?: |$)/m);
    assert.match(unit, /Type=notify/);
    assert.match(unit, /WatchdogSec=180/);
  });
});

test(
  "CLI autostart persists a successful explicit choice and reuses it in the XDG entry",
  { skip: process.platform !== "linux" },
  async () => {
    await isolatedPreferences(async (directory) => {
      const stubBin = join(directory, "stub-bin");
      mkdirSync(stubBin);
      for (const name of ["systemctl", "loginctl"])
        writeFileSync(join(stubBin, name), "#!/bin/sh\nexit 1\n", { mode: 0o755 });
      process.env.PATH = stubBin;
      process.env.DISPLAY = ":synthetic";
      async function enable(args: string[]) {
        const program = new Command();
        registerAutostart(program);
        await program.parseAsync(["autostart", "enable", ...args], { from: "user" });
      }
      const desktop = join(directory, ".config", "autostart", "omniroute.desktop");
      await enable(["--no-tray"]);
      assert.equal(loadTrayPreference(), false);
      assert.match(readFileSync(desktop, "utf8"), /serve --no-open --no-tray/);
      await enable([]);
      assert.match(readFileSync(desktop, "utf8"), /serve --no-open --no-tray/);
      await enable(["--tray"]);
      assert.equal(loadTrayPreference(), true);
      assert.match(readFileSync(desktop, "utf8"), /serve --no-open --tray/);
    });
  }
);

test(
  "failed autostart registration does not change the saved preference",
  { skip: process.platform !== "linux" },
  async () => {
    await isolatedPreferences((directory) => {
      const stubBin = join(directory, "stub-bin");
      mkdirSync(stubBin);
      for (const name of ["systemctl", "loginctl"])
        writeFileSync(join(stubBin, name), "#!/bin/sh\nexit 1\n", { mode: 0o755 });
      process.env.PATH = stubBin;
      for (const key of ["DISPLAY", "WAYLAND_DISPLAY", "XDG_CURRENT_DESKTOP"])
        delete process.env[key];
      saveTrayPreference(false);
      assert.equal(enableAutostart({ tray: true }), false);
      assert.equal(loadTrayPreference(), false);
    });
  }
);

test("explicit foreground modes suppress a saved tray default, but never override an explicit tray", async () => {
  const { validateTrayOptions } = await import("../../../bin/cli/tray/detachedTray.mjs");
  await isolatedPreferences(() => {
    saveTrayPreference(true);
    for (const mode of [{ log: true }, { recovery: false }, { noRecovery: true }]) {
      const implicit = resolveServeTrayOptions(mode);
      assert.equal(implicit.tray, false, JSON.stringify(mode));
      assert.equal(validateTrayOptions(implicit), null);
      const explicit = resolveServeTrayOptions({ ...mode, tray: true });
      assert.equal(explicit.tray, true);
      assert.match(validateTrayOptions(explicit), /--tray cannot use/);
    }
    assert.equal(loadTrayPreference(), true);
  });
});

test(
  "preference persistence failure reports that autostart registration already succeeded",
  { skip: process.platform !== "linux" },
  async () => {
    await isolatedPreferences((directory) => {
      const stubBin = join(directory, "stub-bin");
      mkdirSync(stubBin);
      for (const name of ["systemctl", "loginctl"])
        writeFileSync(join(stubBin, name), "#!/bin/sh\nexit 1\n", { mode: 0o755 });
      process.env.PATH = stubBin;
      process.env.DISPLAY = ":synthetic";
      mkdirSync(join(directory, "tray-preferences.json"));
      assert.throws(
        () => enableAutostart({ tray: false }),
        /Autostart was enabled, but the tray preference could not be saved/
      );
      assert.match(
        readFileSync(join(directory, ".config", "autostart", "omniroute.desktop"), "utf8"),
        /--no-tray/
      );
      assert.equal(statSync(join(directory, "tray-preferences.json")).isDirectory(), true);
    });
  }
);
