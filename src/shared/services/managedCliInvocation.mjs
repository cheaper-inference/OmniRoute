import fs from "node:fs";
import os from "node:os";

/**
 * Build a shell-free invocation from an installation already verified by the
 * managed-runtime reader. npm's Windows shims cannot be executed directly;
 * launch their verified JavaScript entry with Node or their native PE instead.
 */
export function buildManagedCliInvocation(
  installation,
  definition,
  { platform = os.platform(), nodePath = process.execPath } = {}
) {
  if (platform !== "win32") return { command: installation.command, argsPrefix: [] };

  const entry = installation.executableEntryPath;
  const header = Buffer.alloc(256);
  const fd = fs.openSync(entry, "r");
  let bytesRead;
  try {
    bytesRead = fs.readSync(fd, header, 0, header.length, 0);
  } finally {
    fs.closeSync(fd);
  }

  if (bytesRead >= 2 && header[0] === 0x4d && header[1] === 0x5a) {
    return { command: entry, argsPrefix: [] };
  }
  if (/\.[cm]?js$/i.test(entry) || /^#![^\r\n]{0,240}\bnode\b/.test(header.toString("utf8"))) {
    return { command: nodePath, argsPrefix: [entry] };
  }
  throw new Error(`Unsupported managed CLI executable for ${definition.id}`);
}
