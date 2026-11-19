/**
 * Pack-report view of a tarball produced by `npm pack`, plus the `--from-tarball` CLI
 * argument. Kept out of `validate-pack-artifact.ts`, which runs its policy at import
 * time, so the unit tests can exercise these helpers directly.
 */
import { statSync } from "node:fs";
import { basename } from "node:path";

import { listTarballFiles } from "./tarballFileList.ts";

export type TarballPackReport = {
  files: Array<{ path: string }>;
  filename: string;
  entryCount: number;
  size: number;
};

export function resolveTarballArg(argv: string[]): string | undefined {
  const index = argv.indexOf("--from-tarball");
  if (index === -1) return undefined;
  const value = argv[index + 1];
  // A path never starts with "-": reject the next option instead of handing it to tar.
  if (!value || value.startsWith("-")) {
    throw new Error("--from-tarball expects the path of a packed .tgz");
  }
  return value;
}

export function runTarballReport(tarballPath: string): TarballPackReport {
  const files = listTarballFiles(tarballPath).map((path) => ({ path }));
  return {
    filename: basename(tarballPath),
    entryCount: files.length,
    files,
    size: statSync(tarballPath).size,
  };
}
