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
  let releaseTag: string | null = null;
  let contextSize: string | null = null;

  const generationTokens = tokens.filter((token) => {
    if (!contextSize && CONTEXT_RE.test(token)) {
      contextSize = token.toLowerCase();
      return false;
    }
    if (!releaseTag && DATE_RE.test(token)) {
      releaseTag = token;
      return false;
    }
    return true;
  });

  for (let index = 0; index < generationTokens.length; index++) {
    const parsed = generationFromToken(generationTokens[index]);
    if (!parsed) continue;
    generation = [...parsed];
    for (let next = index + 1; next < generationTokens.length; next++) {
      if (!/^\d+$/.test(generationTokens[next])) break;
      generation.push(Number.parseInt(generationTokens[next], 10));
    }
    break;
  }

  if (!generation) return null;
  return {
    generation,
    display: generation.join("."),
    releaseTag,
    contextSize,
  };
}

export function compareVersionNewestFirst(a: VersionIdentity, b: VersionIdentity): number {
  const length = Math.max(a.generation.length, b.generation.length);
  for (let index = 0; index < length; index++) {
    const av = a.generation[index] ?? 0;
    const bv = b.generation[index] ?? 0;
    if (av !== bv) return bv - av;
  }
  const release = (b.releaseTag ?? "").localeCompare(a.releaseTag ?? "");
  if (release !== 0) return release;
  return (b.contextSize ?? "").localeCompare(a.contextSize ?? "", undefined, {
    numeric: true,
  });
}
