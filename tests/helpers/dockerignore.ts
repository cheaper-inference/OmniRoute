/**
 * .dockerignore evaluation with Docker's own rule semantics (moby/patternmatcher, which
 * BuildKit's context transfer uses): rules apply in file order, the LAST rule that matches a
 * path or any of its parent directories decides, and `!` re-includes. Glob support is the
 * subset this repo's .dockerignore uses: literal segments, `*` and `*` inside one segment
 * (never crossing `/`), and `**` for any depth including none. The matcher walks segments
 * instead of compiling the patterns into RegExps, so a pattern can never backtrack badly.
 */

export type DockerignoreRule = { exclude: boolean; segments: string[] };

export function parseDockerignore(text: string): DockerignoreRule[] {
  const rules: DockerignoreRule[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const exclude = !line.startsWith("!");
    const pattern = (exclude ? line : line.slice(1)).replace(/^\/+/, "").replace(/\/+$/, "");
    if (pattern) rules.push({ exclude, segments: pattern.split("/") });
  }
  return rules;
}

export function segmentMatches(pattern: string, segment: string): boolean {
  if (pattern === "*") return true;
  if (!pattern.includes("*")) return pattern === segment;
  const parts = pattern.split("*");
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (segment.length < first.length + last.length) return false;
  if (!segment.startsWith(first) || !segment.endsWith(last)) return false;
  let cursor = first.length;
  const endLimit = segment.length - last.length;
  for (let i = 1; i < parts.length - 1; i++) {
    const idx = segment.indexOf(parts[i], cursor);
    if (idx === -1 || idx + parts[i].length > endLimit) return false;
    cursor = idx + parts[i].length;
  }
  return true;
}

function matchSegments(p: string[], pi: number, f: string[], fi: number): boolean {
  while (pi < p.length) {
    if (p[pi] === "**") {
      if (pi === p.length - 1) return true;
      for (let k = fi; k <= f.length; k++) {
        if (matchSegments(p, pi + 1, f, k)) return true;
      }
      return false;
    }
    if (fi >= f.length || !segmentMatches(p[pi], f[fi])) return false;
    pi++;
    fi++;
  }
  return fi === f.length;
}

// Parent directories repeat across thousands of files; remember each rule's verdict on them.
const parentMatchCache = new WeakMap<DockerignoreRule, Map<string, boolean>>();

/** True when the build context leaves `file` (repo-relative, forward slashes) out. */
export function isDockerIgnored(file: string, rules: DockerignoreRule[]): boolean {
  const segments = file.split("/");
  const parents: Array<{ key: string; segments: string[] }> = [];
  for (let depth = 1; depth < segments.length; depth++) {
    const dirSegments = segments.slice(0, depth);
    parents.push({ key: dirSegments.join("/"), segments: dirSegments });
  }

  let ignored = false;
  for (const rule of rules) {
    // A literal first segment that differs can match neither the path nor a parent of it.
    const head = rule.segments[0];
    if (head !== "**" && !head.includes("*") && head !== segments[0]) continue;

    let cache = parentMatchCache.get(rule);
    if (!cache) parentMatchCache.set(rule, (cache = new Map()));
    let matched = matchSegments(rule.segments, 0, segments, 0);
    for (let i = 0; !matched && i < parents.length; i++) {
      let parentMatched = cache.get(parents[i].key);
      if (parentMatched === undefined) {
        parentMatched = matchSegments(rule.segments, 0, parents[i].segments, 0);
        cache.set(parents[i].key, parentMatched);
      }
      matched = parentMatched;
    }
    if (matched) ignored = rule.exclude;
  }
  return ignored;
}
