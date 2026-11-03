import { z } from "zod";

// ─── skills.sh API response schemas ───

export const SkillsShSkillSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  name: z.string(),
  installs: z.number().optional().default(0),
  source: z.string(),
});

export const SkillsShSearchResponseSchema = z.object({
  query: z.string().optional(),
  searchType: z.string().optional(),
  skills: z.array(SkillsShSkillSchema).default([]),
  count: z.number().optional(),
  duration_ms: z.number().optional(),
});

export type SkillsShSearchResponse = z.infer<typeof SkillsShSearchResponseSchema>;

const SKILLSSH_BASE_URL = "https://skills.sh/api";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";
const DEFAULT_SEARCH_LIMIT = 20;
const REQUEST_TIMEOUT_MS = 15_000;

// ─── skills.sh install input schemas ───
//
// `source` and `skillId` become path segments of the GitHub raw URL that
// `fetchSkillMd` requests, so they are constrained to a single plain path
// segment each: no `/` (beyond the one owner/repo separator), no `.`/`..`
// segments, no `?`, `#`, `%` or whitespace. The install route and the fetch
// boundary both use these schemas, so direct callers get the same contract.

/** One GitHub owner or repository name: letters, digits, `_`, `.` and `-` only. */
const GITHUB_PATH_SEGMENT = /^[A-Za-z0-9_.-]+$/;
/** GitHub caps owners at 39 and repositories at 100 characters. */
const SOURCE_MAX_LENGTH = 140;
const SKILL_ID_MAX_LENGTH = 100;

export function isValidSkillsShSource(source: string): boolean {
  const segments = source.split("/");
  if (segments.length !== 2) return false;
  return segments.every(
    (segment) => GITHUB_PATH_SEGMENT.test(segment) && segment !== "." && segment !== ".."
  );
}

/** GitHub `owner/repo` the skill is fetched from (e.g. `supabase/agent-skills`). */
export const SkillsShSourceSchema = z
  .string()
  .min(3)
  .max(SOURCE_MAX_LENGTH)
  .refine(isValidSkillsShSource, {
    message: "source must be a GitHub owner/repo using letters, digits, '_', '.' or '-'",
  });

/** Skill directory name under `skills/` in that repository. */
export const SkillsShSkillIdSchema = z
  .string()
  .min(1)
  .max(SKILL_ID_MAX_LENGTH)
  .regex(/^[A-Za-z0-9_-]+$/, "skillId must use letters, digits, '_' or '-' only");

/** Same `X.Y.Z` contract the skill registry stores (`SkillCreateInputSchema`). */
export const SkillsShVersionSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+$/, "version must be semver (e.g. 1.0.0)")
  .default("1.0.0");

/**
 * Search the skills.sh public directory.
 * No authentication required.
 */
export async function searchSkillsSh(
  query: string,
  limit: number = DEFAULT_SEARCH_LIMIT
): Promise<SkillsShSearchResponse> {
  const url = `${SKILLSSH_BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`skills.sh API error: ${res.status} ${body}`);
    }
    const data = await res.json();
    return SkillsShSearchResponseSchema.parse(data);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch SKILL.md content from GitHub for a skills.sh skill.
 *
 * @param source - GitHub "owner/repo" (e.g. "supabase/agent-skills")
 * @param skillId - Skill name (last segment of the full id, e.g. "supabase-postgres-best-practices")
 */
export async function fetchSkillMd(source: string, skillId: string): Promise<string> {
  // Re-validate at the fetch boundary so callers that bypass the install route
  // (CLI, tools, tests) cannot pivot the request to another GitHub path. The
  // messages deliberately do not echo the rejected input.
  if (!SkillsShSourceSchema.safeParse(source).success) {
    throw new Error("Invalid skills.sh source: expected a GitHub owner/repo");
  }
  if (!SkillsShSkillIdSchema.safeParse(skillId).success) {
    throw new Error("Invalid skills.sh skill id: expected letters, digits, '_' or '-'");
  }
  const url = `${GITHUB_RAW_BASE}/${source}/main/skills/${skillId}/SKILL.md`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`Failed to fetch SKILL.md: ${res.status} (${url})`);
    }
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}
