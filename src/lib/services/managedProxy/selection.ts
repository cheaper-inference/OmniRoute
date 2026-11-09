import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { readPrivateConfigFile, writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import { ensureManagedDirectory } from "./directories";
import type { ManagedCore } from "./config";

const digest = z.string().regex(/^[a-f0-9]{64}$/);
export const CoreSelectionSchema = z.discriminatedUnion("source", [
  z.object({ source: z.literal("custom"), sha256: digest }).strict(),
  z
    .object({
      source: z.literal("official"),
      distribution: z.enum(["singbox", "xray", "mahsa"]),
      version: z.string().regex(/^v?[0-9][a-zA-Z0-9._-]{0,63}$/),
      asset: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,159}$/),
      sha256: digest,
    })
    .strict(),
]);
export type CoreSelection = z.infer<typeof CoreSelectionSchema>;
export type CustomSelection = Extract<CoreSelection, { source: "custom" }>;

export function validateCoreSelection(core: ManagedCore, input: unknown): CoreSelection {
  const result = CoreSelectionSchema.parse(input);
  if (result.source === "official" && (core === "singbox") !== (result.distribution === "singbox"))
    throw new Error("Managed core distribution does not match its configuration format");
  return result;
}

function selectionPath(core: ManagedCore, root: string) {
  ensureManagedDirectory(path.join(root, core));
  return path.join(root, core, "selection.json");
}

export function readCoreSelection(core: ManagedCore, root: string): CoreSelection | null {
  try {
    return validateCoreSelection(
      core,
      JSON.parse(readPrivateConfigFile(selectionPath(core, root)))
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw new Error("Managed core selection is invalid; restore it before starting");
  }
}

export function writeCoreSelection(core: ManagedCore, input: unknown, root: string): void {
  const selection = validateCoreSelection(core, input);
  writePrivateConfigFile(selectionPath(core, root), JSON.stringify(selection) + "\n");
}

export async function clearCoreSelection(core: ManagedCore, root: string): Promise<void> {
  await fs.rm(selectionPath(core, root), { force: true });
}

function customPath(core: ManagedCore, sha256: string, root: string): string {
  const directory = path.join(root, "binaries", core, `custom-${sha256}`);
  ensureManagedDirectory(directory);
  return path.join(directory, process.platform === "win32" ? "core.exe" : "core");
}

const MAX_BINARY = 384 * 1024 * 1024;
async function readRegularBinary(file: string): Promise<Buffer> {
  const sourceInfo = await fs.lstat(file);
  if (!sourceInfo.isFile() || sourceInfo.isSymbolicLink())
    throw new Error("Managed core source must be a regular file, not a link");
  const handle = await fs.open(
    file,
    fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK
  );
  try {
    const info = await handle.stat();
    const location = await fs.lstat(file);
    if (!info.isFile() || location.isSymbolicLink() || info.size < 1 || info.size > MAX_BINARY)
      throw new Error("Managed core source must be a bounded regular file, not a link");
    // Bound each read even if another process grows the file after stat().
    const chunks: Buffer[] = [];
    let total = 0;
    while (true) {
      const chunk = Buffer.alloc(Math.min(1024 * 1024, MAX_BINARY + 1 - total));
      const { bytesRead } = await handle.read(chunk, 0, chunk.length, total);
      if (!bytesRead) break;
      total += bytesRead;
      if (total > MAX_BINARY || total > info.size)
        throw new Error("Managed core file changed during import");
      chunks.push(chunk.subarray(0, bytesRead));
    }
    if (total !== info.size) throw new Error("Managed core file changed during import");
    return Buffer.concat(chunks);
  } finally {
    await handle.close();
  }
}

/** Copy only after explicit local operator trust acknowledgement; never select or execute here. */
export async function importCustomBinary(
  core: ManagedCore,
  sourcePath: string,
  expectedSha256: string,
  acknowledgeUntrustedCode: boolean,
  root: string
): Promise<CustomSelection> {
  if (acknowledgeUntrustedCode !== true)
    throw new Error("Managed custom core requires explicit untrusted-code acknowledgement");
  if (!path.isAbsolute(sourcePath)) throw new Error("Managed custom core path must be absolute");
  const sha256 = digest.parse(expectedSha256.toLowerCase());
  let bytes: Buffer;
  try {
    bytes = await readRegularBinary(sourcePath);
  } catch {
    throw new Error("Managed custom core must be a readable regular file, not a link");
  }
  if (createHash("sha256").update(bytes).digest("hex") !== sha256)
    throw new Error("Managed custom core SHA-256 does not match the supplied digest");
  const destination = customPath(core, sha256, root);
  try {
    await fs.writeFile(destination, bytes, { mode: 0o700, flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }
  const selection: CustomSelection = { source: "custom", sha256 };
  await verifyCustomBinary(core, selection, root);
  return selection;
}

export async function verifyCustomBinary(
  core: ManagedCore,
  selection: CustomSelection,
  root: string
): Promise<string> {
  const validated = validateCoreSelection(core, selection);
  const file = customPath(core, validated.sha256, root);
  try {
    const bytes = await readRegularBinary(file);
    if (createHash("sha256").update(bytes).digest("hex") !== validated.sha256)
      throw new Error("digest mismatch");
    return file;
  } catch {
    throw new Error("Managed custom core verification failed; import a verified copy again");
  }
}
