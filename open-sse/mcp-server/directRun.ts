import { pathToFileURL } from "node:url";

/**
 * True when the module at `metaUrl` is the entry script Node was started with.
 *
 * `import.meta.url` is a percent-encoded `file:` URL while `process.argv[1]` is the raw
 * filesystem path, so the two are compared as URLs. Comparing the URL's tail to the raw
 * path fails for any install directory containing a space, `%`, `#` or a non-ASCII
 * character (for example `C:\Program Files\…` or `~/Library/Application Support/…`).
 */
export function isDirectRun(metaUrl: string, argv1: string | undefined): boolean {
  return Boolean(argv1) && metaUrl === pathToFileURL(argv1 as string).href;
}
