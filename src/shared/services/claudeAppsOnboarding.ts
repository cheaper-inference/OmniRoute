// Builds the shell export lines, the local network base URL and the Claude Desktop model list
// shown by the quota page tool setup. Pure string builders that read no network, database or
// environment, so client components can import them.

import { modelSupportsLongContext } from "./claudeCliConfig";

const DEFAULT_LISTING_LIMIT = 40;

/** One `export NAME='value'` line per entry, in insertion order, joined by "\n". */
export function buildShellExports(env: Record<string, string>): string {
  return Object.entries(env)
    .map(([name, value]) => `export ${name}='${value.replaceAll("'", "'\\''")}'`)
    .join("\n");
}

/** The API origin as reached from the page's own host, or null when it cannot be derived. */
export function deriveLocalNetworkBaseUrl(
  apiBaseUrl: string | null,
  pageHostname: string
): string | null {
  if (apiBaseUrl === null || pageHostname === "") return null;
  try {
    const url = new URL(apiBaseUrl);
    if (url.protocol !== "http:" || url.port === "") return null;
    const publicOrigin = url.origin;
    url.hostname = pageHostname;
    return url.origin === publicOrigin ? null : url.origin;
  } catch {
    return null;
  }
}

/** `main` first, then the others in order, at most `limit` ids (default 40, a private constant). */
export function listOnboardingModels(
  models: readonly string[],
  main: string | null,
  limit: number = DEFAULT_LISTING_LIMIT
): string[] {
  const ordered =
    main !== null && models.includes(main)
      ? [main, ...models.filter((id) => id !== main)]
      : [...models];
  return ordered.slice(0, limit);
}

/** `{ "inferenceModels": [{ "name": id, "supports1m": true }?] }` with two-space indentation. */
export function buildDesktopInferenceModels(
  models: readonly string[],
  longContext: boolean
): string {
  const inferenceModels = models.map((name) =>
    longContext && modelSupportsLongContext(name) ? { name, supports1m: true } : { name }
  );
  return JSON.stringify({ inferenceModels }, null, 2);
}
