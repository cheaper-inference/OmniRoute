import { gzipSync } from "node:zlib";

/**
 * Minimal ustar writer for tests. It can emit entry kinds a well-behaved packer never
 * produces (links, absolute paths, ".." segments), which is the point: the marketplace
 * extractor has to refuse them.
 */
export type TarFixtureEntry = {
  name: string;
  /** File body. Ignored for directories and links. */
  content?: string | Buffer;
  /** ustar type flag: "0" file (default), "5" directory, "2" symlink, "1" hard link. */
  type?: "0" | "5" | "2" | "1" | "3" | "x" | "L";
  linkName?: string;
};

function octal(value: number, width: number): string {
  return value.toString(8).padStart(width - 1, "0") + "\0";
}

function header(entry: TarFixtureEntry, size: number): Buffer {
  const block = Buffer.alloc(512, 0);
  block.write(entry.name, 0, 100, "utf8");
  block.write(octal(entry.type === "5" ? 0o755 : 0o644, 8), 100, 8, "ascii");
  block.write(octal(0, 8), 108, 8, "ascii");
  block.write(octal(0, 8), 116, 8, "ascii");
  block.write(octal(size, 12), 124, 12, "ascii");
  block.write(octal(0, 12), 136, 12, "ascii");
  block.write("        ", 148, 8, "ascii");
  block.write(entry.type ?? "0", 156, 1, "ascii");
  if (entry.linkName) block.write(entry.linkName, 157, 100, "utf8");
  block.write("ustar\0", 257, 6, "ascii");
  block.write("00", 263, 2, "ascii");
  let sum = 0;
  for (const byte of block) sum += byte;
  block.write(sum.toString(8).padStart(6, "0") + "\0 ", 148, 8, "ascii");
  return block;
}

export function buildTar(entries: readonly TarFixtureEntry[]): Buffer {
  const parts: Buffer[] = [];
  for (const entry of entries) {
    const body =
      entry.type === "5" || entry.type === "2" || entry.type === "1" || entry.type === "3"
        ? Buffer.alloc(0)
        : Buffer.from(entry.content ?? "");
    parts.push(header(entry, body.length), body);
    const pad = (512 - (body.length % 512)) % 512;
    if (pad) parts.push(Buffer.alloc(pad, 0));
  }
  parts.push(Buffer.alloc(1024, 0));
  return Buffer.concat(parts);
}

export function buildTarGz(entries: readonly TarFixtureEntry[]): Buffer {
  return gzipSync(buildTar(entries));
}

/** A well-formed single-plugin package. */
export function pluginPackageEntries(
  name: string,
  version: string,
  options: { directory?: string } = {}
): TarFixtureEntry[] {
  const prefix = options.directory ? `${options.directory}/` : "";
  const manifest = JSON.stringify({ name, version, main: "index.js", hooks: {} });
  return [
    ...(options.directory ? [{ name: `${prefix}`, type: "5" as const }] : []),
    { name: `${prefix}plugin.json`, content: manifest },
    { name: `${prefix}index.js`, content: "module.exports = {};\n" },
  ];
}
