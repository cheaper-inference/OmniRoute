/**
 * Best-effort build of the TPROXY IP_TRANSPARENT native addon so the production
 * build can copy `build/Release/transparent.node` into the standalone bundle
 * (assembleStandalone's NATIVE_ASSET_ENTRIES). Called from build-next-isolated.mjs
 * before the standalone is assembled.
 *
 * IP_TRANSPARENT is Linux-only, so this is a no-op everywhere else. A missing C
 * toolchain is NOT fatal — the TPROXY capture mode degrades gracefully when the
 * addon is absent (transparentSocket.ts returns "unavailable"). Every effectful
 * seam (platform/run/exists) is injectable so the decision logic is unit-testable.
 *
 * Security (#21014) + Hard Rule #13: never invoke `npx --yes node-gyp` (which
 * downloads and executes an unpinned registry package). Instead, resolve npm's
 * own bundled `node-gyp/bin/node-gyp.js` (or fall back to a local `node-gyp` on
 * PATH) with fixed argv arrays and zero shell interpolation.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, realpathSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Locate npm's bundled `node-gyp/bin/node-gyp.js` without touching the network.
 *
 * @param {{ exists?: (p: string) => boolean, realpath?: (p: string) => string, whichNpm?: () => string | null }} [deps]
 * @returns {string | null}
 */
export function resolveBundledNodeGyp(deps = {}) {
  const exists = deps.exists ?? existsSync;
  const realpath = deps.realpath ?? realpathSync;
  const whichNpm =
    deps.whichNpm ??
    (() => {
      try {
        const cmd = process.platform === "win32" ? "where" : "which";
        const res = spawnSync(cmd, ["npm"], { encoding: "utf8", timeout: 5_000 });
        if (res.status === 0 && res.stdout) {
          return res.stdout.split(/\r?\n/)[0].trim() || null;
        }
      } catch {
        // ignore
      }
      return null;
    });

  const candidates = [
    path.resolve(
      path.dirname(process.execPath),
      "../lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js"
    ),
    "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",
    "/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",
  ];

  const npmBin = whichNpm();
  if (npmBin) {
    try {
      const realNpm = realpath(npmBin);
      candidates.unshift(
        path.resolve(path.dirname(realNpm), "../node_modules/node-gyp/bin/node-gyp.js")
      );
    } catch {
      // ignore broken symlink
    }
  }

  for (const candidate of candidates) {
    if (exists(candidate)) return candidate;
  }
  return null;
}

/**
 * @param {string} projectRoot
 * @param {{ platform?: string, run?: (cmd:string, args:string[], cwd:string) => void,
 *           exists?: (p:string) => boolean, nodeGypScript?: string | null }} [opts]
 * @returns {{ built: boolean, reason?: string }}
 */
export function buildTproxyNative(projectRoot, opts = {}) {
  const platform = opts.platform ?? process.platform;
  const run = opts.run ?? defaultRun;
  const exists = opts.exists ?? existsSync;

  if (platform !== "linux") {
    return { built: false, reason: "non-linux host (IP_TRANSPARENT is Linux-only)" };
  }

  const nativeDir = path.join(projectRoot, "src", "mitm", "tproxy", "native");
  if (!exists(path.join(nativeDir, "binding.gyp"))) {
    return { built: false, reason: "native sources absent (binding.gyp not found)" };
  }

  const bundledGyp =
    "nodeGypScript" in opts ? opts.nodeGypScript : resolveBundledNodeGyp({ exists });

  const out = path.join(nativeDir, "build", "Release", "transparent.node");
  try {
    if (bundledGyp) {
      run(process.execPath, [bundledGyp, "rebuild"], nativeDir);
    } else {
      run("node-gyp", ["rebuild"], nativeDir);
    }
  } catch (err) {
    return { built: false, reason: `toolchain/build failed: ${err?.message ?? String(err)}` };
  }
  if (!exists(out)) {
    return { built: false, reason: "node-gyp produced no transparent.node" };
  }
  return { built: true };
}

/** @type {(cmd: string, args: string[], cwd: string) => void} */
function defaultRun(cmd, args, cwd) {
  execFileSync(cmd, args, { cwd, stdio: "inherit" });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const res = buildTproxyNative(process.cwd());
  if (!res.built) {
    console.error(`[build:native:tproxy] skipped/failed: ${res.reason}`);
    if (process.platform === "linux") process.exitCode = 1;
  }
}
