/**
 * File list of a packed npm tarball, in the same shape as the `npm pack --dry-run`
 * payload (`package/` stripped, directories dropped).
 *
 * The pack-artifact gate can run in two modes:
 *  - source mode (default): asks npm for a dry-run file list before a tarball exists;
 *  - tarball mode (`--from-tarball`): validates the artifact that was actually built.
 *
 * Both lists must describe the same published payload. Tarball mode is the stronger
 * check (it inspects the real bytes) and it saves one full `npm pack` walk per build.
 */
import { execFileSync } from "node:child_process";

const TAR_MAX_BUFFER = 256 * 1024 * 1024;

export function listTarballFiles(tarballPath: string): string[] {
  const output = execFileSync("tar", ["-tzf", tarballPath], {
    encoding: "utf8",
    maxBuffer: TAR_MAX_BUFFER,
  });
  return (
    output
      .split("\n")
      .filter((entry) => entry.length > 0)
      // npm tarballs list directories with a trailing slash; the policy works on files only.
      .filter((entry) => !entry.endsWith("/"))
      .map((entry) => {
        // npm always packs under `package/`; an unprefixed entry would be normalized into a
        // package-looking path the policy cannot distinguish from the real artifact.
        if (!entry.startsWith("package/")) {
          throw new Error(`tarball entry is not under package/: ${entry}`);
        }
        return entry.slice("package/".length);
      })
      .filter((entry) => entry.length > 0)
  );
}
