import type { VersionIdentity } from "./types.ts";

const CONTEXT_RE = /^(?:\d+(?:\.\d+)?)(?:b|k|m)$/i;
const DATE_RE = /^(?:19|20)\d{6}$|^\d{4}$/;

function generationFromToken(token: string): number[] | null {
  const normalized = token.toLowerCase();
  const match = /^(?:v|m|k)?(\d+(?:\.\d+)*)$/.exec(normalized);
  if (!match) return null;
  const parts = match[1].split(".").map((part) => Number.parseInt(part, 10));
  return parts.every(Number.isFinite) ? parts : null;
}

export function parseVersionIdentity(tokens: string[]): VersionIdentity | null {
  let generation: number[] | null = null;
  let display = "";
  let releaseTag: string | null = null;
  let contextSize: string | null = null;

  for (const token of tokens) {
    if (!contextSize && CONTEXT_RE.test(token)) {
      contextSize = token.toLowerCase();
      continue;
    }
    if (!releaseTag && DATE_RE.test(token)) {
      releaseTag = token;
      continue;
    }
    if (!generation) {
      const parsed = generationFromToken(token);
      if (parsed) {
        generation = parsed;
        display = parsed.join(".");
      }
    }
  }

  if (!generation) return null;
  return { generation, display, releaseTag, contextSize };
}

export function compareVersionNewestFirst(a: VersionIdentity, b: VersionIdentity): number {
  const length = Math.max(a.generation.length, b.generation.length);
  for (let index = 0; index < length; index++) {
    const av = a.generation[index] ?? 0;
    const bv = b.generation[index] ?? 0;
    if (av !== bv) return bv - av;
  }
  return (b.releaseTag ?? "").localeCompare(a.releaseTag ?? "");
}
