// Docker Hub keeps the pull histories separate across namespaces. Legacy releases use
// docker-publish.yml and the organization gets the same releases via docker-org-mirror.yml.
export const DOCKER_PULLS_REPOSITORIES = ["diegosouzapw/omniroute", "cheaperinference/omniroute"];
export const DOCKER_PULLS_BADGE_PATH = "docs/badges/docker-pulls.json";

const PULL_COUNT_UNITS = [
  [1_000, "k"],
  [1_000_000, "M"],
  [1_000_000_000, "B"],
];

export function formatPullCount(n) {
  if (n < 1_000) return String(n);
  for (const [divisor, suffix] of PULL_COUNT_UNITS) {
    const rounded =
      n < 100 * divisor ? Math.round(n / (divisor / 10)) / 10 : Math.round(n / divisor);
    if (rounded < 1_000 || suffix === "B") return `${rounded}${suffix}`;
  }
}

export async function fetchDockerPullCounts({
  fetchImpl = globalThis.fetch,
  repositories = DOCKER_PULLS_REPOSITORIES,
  timeoutMs = 15_000,
} = {}) {
  const entries = await Promise.all(
    repositories.map(async (repo) => {
      let res;
      try {
        res = await fetchImpl(`https://hub.docker.com/v2/repositories/${repo}/`, {
          signal: AbortSignal.timeout(timeoutMs),
        });
      } catch {
        throw new Error(`${repo} (no HTTP response): request failed`);
      }
      const status = `${repo} (HTTP ${res.status})`;
      if (!res.ok) throw new Error(`${status}: request failed`);

      let payload;
      try {
        payload = await res.json();
      } catch {
        throw new Error(`${status}: invalid JSON`);
      }
      const count = payload?.pull_count;
      if (!Number.isSafeInteger(count) || count < 0) {
        throw new Error(`${status}: invalid pull_count`);
      }
      return [repo, count];
    })
  );
  const counts = Object.fromEntries(entries);
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  return { total, counts };
}

export function buildDockerPullsBadge(total) {
  return {
    schemaVersion: 1,
    label: "docker pulls",
    message: formatPullCount(total),
    color: "2496ED",
    namedLogo: "docker",
    cacheSeconds: 3600,
  };
}

export function serializeDockerPullsBadge(badge) {
  return JSON.stringify(badge, null, 2) + "\n";
}
