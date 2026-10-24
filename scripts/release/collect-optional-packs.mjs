import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  archiveChecksum,
  packArchiveName,
  verifyArchiveChecksum,
} from "../packs/optionalPackManifest.mjs";

/** Publish only the archives named by this build's bundled integrity index. */
export async function collectOptionalPacks(indexFile, packsDir, outputDir) {
  const index = JSON.parse(fs.readFileSync(indexFile, "utf8"));
  const collected = [];
  fs.mkdirSync(outputDir, { recursive: true });
  for (const entry of index.packs) {
    const name = packArchiveName(entry);
    if (!entry.sha256 || name !== `optional-pack-${entry.name}-${entry.sha256}.tar.gz`) {
      throw new Error(`optional pack release archive must be content-addressed: ${entry.name}`);
    }
    const source = path.join(packsDir, name);
    await verifyArchiveChecksum(entry, source);
    const target = path.join(outputDir, name);
    if (fs.existsSync(target)) {
      if ((await archiveChecksum(target)) !== entry.sha256) {
        throw new Error(`optional pack release collision: ${name}`);
      }
    } else {
      fs.copyFileSync(source, target, fs.constants.COPYFILE_EXCL);
    }
    collected.push(name);
  }
  return collected;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [indexFile, packsDir, outputDir] = process.argv.slice(2);
  if (!indexFile || !packsDir || !outputDir) {
    throw new Error("usage: collect-optional-packs <index-file> <packs-dir> <output-dir>");
  }
  await collectOptionalPacks(indexFile, packsDir, outputDir);
}
