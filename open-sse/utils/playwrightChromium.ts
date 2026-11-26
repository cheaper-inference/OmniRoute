import { constants } from "node:fs";
import { access, stat } from "node:fs/promises";
import * as nodeModule from "node:module";
import { join } from "node:path";

export async function importPlaywright(): Promise<typeof import("playwright")> {
  try {
    return await import("playwright");
  } catch {
    throw new Error(
      "Playwright is not available. Install it (npm i playwright && npx playwright install chromium) or set CLOUDFLARE_PLAYGROUND_CHROME_PATH to a Chrome binary."
    );
  }
}

export function resolveChromiumOverride(executablePath?: string): string | undefined {
  return executablePath || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
}

export function resolveCloudflareChromiumOverride(executablePath?: string): string | undefined {
  return resolveChromiumOverride(executablePath ?? process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH);
}

/** Check the same executable Playwright selects for a default headless launch. */
export async function hasPlaywrightChromium(executablePath?: string): Promise<boolean> {
  try {
    await importPlaywright();
    if (!executablePath) {
      // chromium.executablePath() points to the full browser. A launch with
      // headless:true and no channel uses chromium-headless-shell instead.
      // Resolve from the running server so bundled and standalone builds use
      // Playwright's installed registry, including nested dependencies.
      const runtimeRequire = nodeModule.createRequire(
        process.argv[1] || join(process.cwd(), "package.json")
      );
      const playwrightRequire = nodeModule.createRequire(runtimeRequire.resolve("playwright"));
      const { registry } = Reflect.apply(playwrightRequire, undefined, [
        "playwright-core/lib/coreBundle",
      ]) as {
        registry: {
          registry: {
            findExecutable(name: string): { executablePath(): string | undefined } | undefined;
          };
        };
      };
      executablePath = registry.registry
        .findExecutable("chromium-headless-shell")
        ?.executablePath();
    }
    if (!executablePath || !(await stat(executablePath)).isFile()) return false;
    await access(executablePath, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}
