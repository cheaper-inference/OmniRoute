/**
 * Best-effort build of the optional Antigravity Go crypto/tls HTTP/1.1 sidecar
 * binary (`open-sse/native/antigravity-go-tls/build/antigravity-go-tls(.exe)`).
 *
 * Called from `build-next-isolated.mjs` before assembling the standalone bundle
 * so `assembleStandalone.mjs`'s `NATIVE_ASSET_ENTRIES` copies the compiled
 * binary when Go is available. A missing Go toolchain is NOT fatal — runtime
 * gracefully falls back to Node `fetch()` whenever the binary is absent.
 *
 * Security (Hard Rule #13): never use shell interpolation or download remote
 * build tools; invoke `go` directly with fixed argv arrays.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export function resolveAntigravityGoTlsPaths(projectRoot, platform = process.platform) {
  const nativeDir = path.join(projectRoot, "open-sse", "native", "antigravity-go-tls");
  const binaryName = platform === "win32" ? "antigravity-go-tls.exe" : "antigravity-go-tls";
  const outputPath = path.join(nativeDir, "build", binaryName);
  return { nativeDir, binaryName, outputPath };
}

export function resolveGoBinary(deps = {}) {
  if (typeof deps.goBinary === "string" && deps.goBinary.trim().length > 0) {
    return deps.goBinary.trim();
  }
  const platform = deps.platform ?? process.platform;
  const cmd = platform === "win32" ? "where" : "which";
  try {
    const res = spawnSync(cmd, ["go"], { encoding: "utf8", timeout: 5_000 });
    if (res.status === 0 && res.stdout) {
      const first = res.stdout.split(/\r?\n/)[0]?.trim();
      if (first) return first;
    }
  } catch {
    // ignore lookup failure
  }
  return null;
}

/**
 * @param {string} projectRoot
 * @param {{
 *   platform?: string,
 *   run?: (cmd: string, args: string[], cwd: string) => void,
 *   exists?: (p: string) => boolean,
 *   mkdir?: (p: string) => void,
 *   goBinary?: string | null,
 * }} [opts]
 * @returns {{ built: boolean, outputPath?: string, reason?: string }}
 */
export function buildAntigravityGoTlsNative(projectRoot, opts = {}) {
  const platform = opts.platform ?? process.platform;
  const run = opts.run ?? defaultRun;
  const exists = opts.exists ?? existsSync;
  const mkdir = opts.mkdir ?? ((dir) => mkdirSync(dir, { recursive: true }));

  const { nativeDir, outputPath } = resolveAntigravityGoTlsPaths(projectRoot, platform);
  if (!exists(path.join(nativeDir, "go.mod")) || !exists(path.join(nativeDir, "main.go"))) {
    return { built: false, reason: "Go sidecar sources absent (go.mod/main.go not found)" };
  }

  const goBin = "goBinary" in opts ? opts.goBinary : resolveGoBinary({ platform });
  if (!goBin) {
    return { built: false, reason: "go toolchain not found on PATH" };
  }

  try {
    mkdir(path.dirname(outputPath));
    run(goBin, ["build", "-trimpath", "-ldflags=-s -w", "-o", outputPath, "."], nativeDir);
  } catch (err) {
    return { built: false, reason: `go build failed: ${err?.message ?? String(err)}` };
  }

  if (!exists(outputPath)) {
    return { built: false, reason: "go build produced no sidecar binary" };
  }

  return { built: true, outputPath };
}

/** @type {(cmd: string, args: string[], cwd: string) => void} */
function defaultRun(cmd, args, cwd) {
  execFileSync(cmd, args, { cwd, stdio: "inherit" });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const res = buildAntigravityGoTlsNative(process.cwd());
  if (!res.built) {
    console.warn(`[build:native:antigravity-go-tls] skipped: ${res.reason}`);
  } else {
    console.log(`[build:native:antigravity-go-tls] built: ${res.outputPath}`);
  }
}
