import { existsSync, mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { persistTrayFailure } from "./processSupervisor.mjs";

const RUNTIME_DIR = join(homedir(), ".omniroute", "runtime");
// systray2 is a maintained fork with prebuilt binaries — installed lazily at runtime,
// not in dependencies, to avoid npm install overhead for users who don't use --tray.
//
// Pin: stay on the 2.x line. The original `systray@1.0.5` package bundles a 2017
// x86_64 Go binary whose Mach-O headers modern dyld (macOS 14+) rejects, so the
// tray silently fails to register on Apple Silicon. systray2 2.x ships newer
// getlantern/systray-portable binaries that work under Rosetta. Inherited from
// upstream decolua/9router#1080.
export const SYSTRAY_PACKAGE = "systray2";
export const SYSTRAY_VERSION = "2.1.4";
const SYSTRAY_SPEC = `${SYSTRAY_PACKAGE}@${SYSTRAY_VERSION}`;

// Resolve the package entry first: native ESM cannot import a directory URL.
// Convert that file path to a URL so Windows drive letters and special path
// characters are also accepted by import().
export function systrayModuleSpecifier(runtimeDir: string): string {
  const runtimeRequire = createRequire(join(runtimeDir, "package.json"));
  return pathToFileURL(runtimeRequire.resolve(SYSTRAY_PACKAGE)).href;
}

type SystrayConstructor = new (...args: unknown[]) => unknown;

function resolveSystrayConstructor(mod: {
  default?: unknown;
  SysTray?: unknown;
}): SystrayConstructor | null {
  const exported = mod.default ?? mod.SysTray ?? mod;
  // systray2's transpiled CJS module adds another default inside the namespace.
  const candidate =
    typeof exported === "object" && exported !== null && "default" in exported
      ? exported.default
      : exported;
  if (typeof candidate !== "function") return null;
  try {
    // Check [[Construct]] without invoking the tray constructor/native binary.
    Reflect.construct(Object, [], candidate);
    return candidate as SystrayConstructor;
  } catch {
    return null;
  }
}

export function resolveSystrayBinName(platform: NodeJS.Platform): string | null {
  if (platform === "win32") return "tray_windows_release.exe";
  if (platform === "darwin") return "tray_darwin_release";
  return "tray_linux_release";
}

export interface ChmodResult {
  changed: boolean;
  reason?: "win32-skip" | "missing" | "chmod-failed";
}

// systray2's npm tarball sometimes ships the bundled Go binary without the
// executable bit set on macOS/Linux, causing spawn() to fail with EACCES.
// Set +x best-effort so the tray actually starts. Inherited from
// upstream decolua/9router#1080.
export function chmodSystrayBinAt(runtimeRoot: string, platform: NodeJS.Platform): ChmodResult {
  const binName = resolveSystrayBinName(platform);
  if (!binName) return { changed: false, reason: "win32-skip" };
  const binPath = join(runtimeRoot, "node_modules", SYSTRAY_PACKAGE, "traybin", binName);
  if (!existsSync(binPath)) return { changed: false, reason: "missing" };
  try {
    chmodSync(binPath, 0o755);
    return { changed: true };
  } catch {
    return { changed: false, reason: "chmod-failed" };
  }
}

export async function loadSystray(): Promise<SystrayConstructor | null> {
  ensureRuntimeDir();
  if (!isInstalled()) {
    try {
      installSystray();
    } catch (err) {
      persistTrayFailure("install", err);
      console.warn("[omniroute] tray runtime install failed; run omniroute doctor for details");
      return null;
    }
  }
  // Best-effort: ensure the bundled Go binary is executable. Some npm tarballs
  // drop the +x bit on extraction (observed on macOS).
  chmodSystrayBinAt(RUNTIME_DIR, process.platform);
  try {
    const mod = await import(systrayModuleSpecifier(RUNTIME_DIR));
    const constructor = resolveSystrayConstructor(mod);
    if (!constructor) persistTrayFailure("constructor", new TypeError("Invalid tray export"));
    return constructor;
  } catch (err) {
    persistTrayFailure("import", err);
    console.warn("[omniroute] tray runtime import failed; run omniroute doctor for details");
    return null;
  }
}

function ensureRuntimeDir(): void {
  if (!existsSync(RUNTIME_DIR)) mkdirSync(RUNTIME_DIR, { recursive: true });
  const pkg = join(RUNTIME_DIR, "package.json");
  if (!existsSync(pkg)) {
    writeFileSync(pkg, JSON.stringify({ name: "omniroute-runtime", private: true }), "utf-8");
  }
}

function isInstalled(): boolean {
  return existsSync(join(RUNTIME_DIR, "node_modules", SYSTRAY_PACKAGE, "package.json"));
}

function installSystray(): void {
  // --save-exact persists systray2 to the runtime package.json so installing it does not
  // prune a sibling runtime dep (e.g. better-sqlite3 from nativeDeps.mjs, which writes to the
  // same runtime dir) as "extraneous", and so the tray dep survives a later sibling install.
  // Without it, a sibling install reproduces "No SQLite driver available".
  execSync(
    `npm install --prefix "${RUNTIME_DIR}" ${SYSTRAY_SPEC} --no-audit --no-fund --save-exact --silent`,
    { stdio: ["ignore", "ignore", "pipe"], timeout: 120_000 }
  );
}
