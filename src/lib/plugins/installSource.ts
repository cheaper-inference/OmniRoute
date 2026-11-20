/**
 * Install-source containment for the local-path plugin install.
 *
 * `POST /api/plugins` installs (and, with `enabledByDefault`, activates) the code
 * found at a caller-supplied path. That path must live inside one operator-managed
 * directory: the `plugin-sources` directory next to the plugin root
 * (`~/.omniroute/plugin-sources` by default, or `<dirname(OMNIROUTE_PLUGINS_DIR)>/
 * plugin-sources` when the plugin root is overridden). Anything else is refused.
 *
 * Every check fails closed: a missing root, a path that does not exist, a path that
 * resolves (through symlinks) outside the root, or a symlink inside the source tree
 * whose target escapes the root all reject the install.
 *
 * @module plugins/installSource
 */

import { lstat, readdir, realpath } from "fs/promises";
import { dirname, isAbsolute, join, resolve, sep } from "path";

export const PLUGIN_SOURCES_DIRNAME = "plugin-sources";

export class PluginInstallSourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PluginInstallSourceError";
  }
}

/** The directory local-path installs may read from, derived from the plugin root. */
export function getPluginSourcesDir(pluginDir: string): string {
  return join(dirname(resolve(pluginDir)), PLUGIN_SOURCES_DIRNAME);
}

function isStrictlyInside(root: string, target: string): boolean {
  return target.startsWith(root + sep);
}

async function assertNoEscapingSymlinks(dir: string, realRoot: string): Promise<void> {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isSymbolicLink()) continue;
    const entryPath = join(entry.parentPath, entry.name);
    const target = await realpath(entryPath).catch(() => null);
    if (!target || !isStrictlyInside(realRoot, target)) {
      throw new PluginInstallSourceError(
        "Plugin source contains a symlink that resolves outside the plugin sources directory"
      );
    }
  }
}

/**
 * Validate a caller-supplied install path against the plugin sources root and
 * return its canonical (symlink-free) form, which is what the installer must use.
 */
export async function resolvePluginInstallSource(
  requestedPath: string,
  sourcesRoot: string
): Promise<string> {
  if (
    typeof requestedPath !== "string" ||
    requestedPath.length === 0 ||
    requestedPath.includes("\0") ||
    !isAbsolute(requestedPath)
  ) {
    throw new PluginInstallSourceError("Plugin path must be an absolute path");
  }

  const root = resolve(sourcesRoot);
  const realRoot = await realpath(root).catch(() => null);
  if (!realRoot) {
    throw new PluginInstallSourceError("Plugin sources directory does not exist");
  }

  // Lexical check first, so a path outside the root is refused without ever being
  // touched on disk (no existence probe of arbitrary host paths).
  const lexical = resolve(requestedPath);
  if (!isStrictlyInside(root, lexical) && !isStrictlyInside(realRoot, lexical)) {
    throw new PluginInstallSourceError("Plugin path is outside the plugin sources directory");
  }

  const realSource = await realpath(requestedPath).catch(() => null);
  if (!realSource) {
    throw new PluginInstallSourceError("Plugin path does not exist");
  }
  if (!isStrictlyInside(realRoot, realSource)) {
    throw new PluginInstallSourceError("Plugin path is outside the plugin sources directory");
  }

  const info = await lstat(realSource);
  if (!info.isDirectory()) {
    throw new PluginInstallSourceError("Plugin path must be a directory");
  }

  await assertNoEscapingSymlinks(realSource, realRoot);
  return realSource;
}
