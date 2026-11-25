import { constants } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createRequire } from "node:module";

const resolveFromRuntime = createRequire(import.meta.url);

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
      const resolveFromPlaywright = createRequire(resolveFromRuntime.resolve("playwright"));
      const { registry } = resolveFromPlaywright("playwright-core/lib/coreBundle") as {
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
