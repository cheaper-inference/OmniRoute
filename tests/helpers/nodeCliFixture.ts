import fs from "node:fs";
import path from "node:path";

/** A real disposable Node CLI process; Windows uses the test's exact executable. */
export function writeNodeCliFixture(directory: string, name: string, source: string): string {
  if (!/^[a-zA-Z0-9_.-]+$/.test(name)) throw new Error("Invalid CLI fixture name");
  const scriptName = `${name}.cjs`;
  const script = path.join(directory, scriptName);
  fs.writeFileSync(script, `#!/usr/bin/env node\n${source}\n`, { mode: 0o755 });
  if (process.platform !== "win32") return script;

  const wrapper = path.join(directory, `${name}.cmd`);
  const executable = process.execPath.replace(/%/g, "%%");
  fs.writeFileSync(
    wrapper,
    `@echo off\r\n"${executable}" "%~dp0${scriptName}" %*\r\nexit /b %errorlevel%\r\n`
  );
  return wrapper;
}
