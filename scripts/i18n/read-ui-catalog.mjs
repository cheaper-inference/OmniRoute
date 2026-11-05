import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

export const MAX_UI_CATALOG_BYTES = 8 * 1024 * 1024;

function parseCatalog(text, label) {
  let catalog;
  try {
    catalog = JSON.parse(text);
  } catch {
    throw new Error("Invalid UI catalog JSON: " + label);
  }
  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
    throw new Error("UI catalog must be an object: " + label);
  }
  return catalog;
}

/** Only a path absent from a valid tree may count as a genuinely new locale. */
export function readUiCatalogAtRef(
  cwd,
  ref,
  relativePath,
  { optional = false, maxBytes = MAX_UI_CATALOG_BYTES } = {}
) {
  if (!/^[0-9a-f]{40}$/.test(ref)) throw new Error("UI catalog ref must be an immutable SHA");
  const git = (args, maxBuffer) => {
    try {
      return execFileSync("git", args, {
        cwd,
        encoding: "utf8",
        timeout: 30000,
        maxBuffer,
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch {
      throw new Error("Cannot read UI catalog from Git: " + relativePath);
    }
  };
  const entry = git(["ls-tree", "-lz", ref, "--", relativePath], 64 * 1024);
  if (!entry) {
    if (optional) return null;
    throw new Error("Required UI catalog absent: " + relativePath);
  }
  const match = /^(\d+) blob ([0-9a-f]{40})\s+(\d+)\t([^\0]+)\0$/.exec(entry);
  if (!match || match[4] !== relativePath || match[1] === "120000") {
    throw new Error("Invalid UI catalog tree entry: " + relativePath);
  }
  if (Number(match[3]) > maxBytes) {
    throw new Error("UI catalog exceeds " + maxBytes + " bytes: " + relativePath);
  }
  const text = git(["cat-file", "blob", match[2]], maxBytes);
  if (Buffer.byteLength(text) !== Number(match[3])) {
    throw new Error("Incomplete UI catalog read: " + relativePath);
  }
  return parseCatalog(text, relativePath);
}

export function readUiCatalogFromDisk(absolutePath, { maxBytes = MAX_UI_CATALOG_BYTES } = {}) {
  let text;
  try {
    if (statSync(absolutePath).size > maxBytes) {
      throw new Error("limit");
    }
    text = readFileSync(absolutePath, "utf8");
  } catch {
    throw new Error("Unreadable or oversized UI catalog: " + absolutePath);
  }
  if (Buffer.byteLength(text) > maxBytes) {
    throw new Error("UI catalog exceeds byte limit: " + absolutePath);
  }
  return parseCatalog(text, absolutePath);
}
