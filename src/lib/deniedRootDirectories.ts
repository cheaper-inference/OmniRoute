import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * System directories that must never become the root of a host-filesystem surface (the local
 * corpus indexed for the MCP search tools, the read/write Obsidian WebDAV vault). The directory
 * itself and everything below it are refused, unless the canonical path lives inside the user's
 * home directory (a service account whose home is `/root` or `/var/lib/<app>` keeps its folders).
 * POSIX only: on Windows the drive root and the home directory itself are refused.
 */
const POSIX_SYSTEM_DIRECTORIES = [
  "/etc",
  "/usr",
  "/bin",
  "/sbin",
  "/var",
  "/proc",
  "/sys",
  "/dev",
  "/boot",
  "/root",
] as const;

/** Fixed refusal message: it never echoes the requested path back to the caller. */
export const DENIED_ROOT_DIRECTORY_ERROR =
  "This directory cannot be used as a root: choose a dedicated folder, not the filesystem root, the home directory itself or a system directory";

/** Canonical (symlink-resolved) absolute form of a path; falls back to the lexical resolve. */
function canonicalPath(target: string): string {
  const resolved = path.resolve(target);
  try {
    return fs.realpathSync.native(resolved);
  } catch {
    return resolved;
  }
}

/** True when `child` is `parent` itself or lives anywhere below it. */
function isSameOrInside(parent: string, child: string): boolean {
  const rel = path.relative(parent, child);
  if (rel === "") return true;
  if (path.isAbsolute(rel)) return false; // different drive (win32)
  return rel !== ".." && !rel.startsWith(`..${path.sep}`);
}

function isFilesystemRoot(target: string): boolean {
  return path.parse(target).root === target;
}

/**
 * Is `candidate` a directory that must not be exposed as a corpus or vault root? Both the lexical
 * (`path.resolve`) and canonical (`realpath`) forms are checked, so a symlink cannot dodge the
 * comparison in either direction. Refused: the filesystem root (`/`, a drive root on Windows), the
 * user's home directory itself (its subfolders stay allowed) and the POSIX system directories
 * above.
 */
export function isDeniedRootDirectory(candidate: string): boolean {
  const lexical = path.resolve(candidate);
  const canonical = canonicalPath(candidate);
  const forms = lexical === canonical ? [canonical] : [lexical, canonical];

  if (forms.some(isFilesystemRoot)) return true;

  const homeForms = [path.resolve(os.homedir()), canonicalPath(os.homedir())];
  if (forms.some((form) => homeForms.includes(form))) return true;

  if (process.platform === "win32") return false;

  const canonicalHome = homeForms[1];
  if (isFilesystemRoot(canonicalHome) === false && isSameOrInside(canonicalHome, canonical)) {
    return false;
  }

  return POSIX_SYSTEM_DIRECTORIES.some((dir) => {
    const dirForms = [dir, canonicalPath(dir)];
    return dirForms.some((dirForm) => forms.some((form) => isSameOrInside(dirForm, form)));
  });
}
