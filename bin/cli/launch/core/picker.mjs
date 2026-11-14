// bin/cli/launch/core/picker.mjs: choose the launch model:
// --model > saved default > last launch > interactive picker (TTY, not --yes) >
// "auto/best-coding" when in the view > first view row.

import { LaunchError, rowLabel } from "../contract.mjs";

export const AUTO_DEFAULT_ID = "auto/best-coding";

function suitable(row, minContextTokens) {
  if (typeof minContextTokens !== "number") return true;
  return typeof row.contextTokens !== "number" || row.contextTokens >= minContextTokens;
}

function distance(a, b) {
  const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

/** Up to `max` view ids close to `query` (substring first, then edit distance). */
export function suggestIds(query, ids, max = 3) {
  const q = String(query).toLowerCase();
  const scored = ids.map((id) => {
    const lower = id.toLowerCase();
    const tail = lower.includes("/") ? lower.slice(lower.indexOf("/") + 1) : lower;
    const contains = lower.includes(q) || q.includes(tail);
    return { id, score: contains ? 0 : Math.min(distance(q, lower), distance(q, tail)) };
  });
  const limit = Math.max(3, Math.floor(q.length / 2));
  return scored
    .filter((entry) => entry.score <= limit)
    .sort((a, b) => a.score - b.score || ids.indexOf(a.id) - ids.indexOf(b.id))
    .slice(0, max)
    .map((entry) => entry.id);
}

/**
 * @param {object} input
 * @param {import("../contract.d.ts").LaunchModelView} input.view
 * @param {string} input.tool
 * @param {"required"|"optional"|"none"} input.modelPolicy adapter capabilities.model
 * @param {number} [input.minContextTokens] adapter capabilities.minContextTokens
 * @param {string} [input.flagModel] --model (already composed with --provider)
 * @param {string} [input.savedDefault] --set-default value for this tool
 * @param {string} [input.lastModel] last launch's model for this tool
 * @param {boolean} [input.interactive] TTY and not --yes
 * @param {boolean} [input.forcePick] --pick: open the picker even with a saved default
 * @param {(req: { tool: string, rows: object[], defaultId?: string }) => Promise<string | null | undefined>} [input.selector]
 * @returns {Promise<{ model: import("../contract.d.ts").LaunchModelRow | undefined, source: string }>}
 */
export async function pickModel(input) {
  const { view, tool, modelPolicy, minContextTokens } = input;
  if (modelPolicy === "none") {
    if (input.flagModel) {
      throw new LaunchError("UsageError", `${tool} does not take a model; drop --model`);
    }
    return { model: undefined, source: "none" };
  }
  const rows = view.rows;
  const byId = new Map(rows.map((row) => [row.id, row]));

  if (input.flagModel) {
    const row = byId.get(input.flagModel);
    if (!row) {
      const close = suggestIds(input.flagModel, [...byId.keys()]);
      throw new LaunchError(
        "ModelNotFound",
        `model ${input.flagModel} is not in the ${tool} launch view (${rows.length} models)`,
        {
          hint:
            close.length > 0
              ? `did you mean: ${close.join(", ")}`
              : "list models with `omniroute models`",
        }
      );
    }
    if (!suitable(row, minContextTokens)) {
      throw new LaunchError(
        "ModelUnsuitable",
        `model ${row.id} has a ${row.contextTokens}-token context; ${tool} needs at least ${minContextTokens}`
      );
    }
    return { model: row, source: "flag" };
  }

  const candidates = rows.filter((row) => suitable(row, minContextTokens));
  const usable = (id) =>
    id && byId.has(id) && suitable(byId.get(id), minContextTokens) ? byId.get(id) : undefined;

  if (!input.forcePick) {
    const saved = usable(input.savedDefault);
    if (saved) return { model: saved, source: "default" };
    const last = usable(input.lastModel);
    if (last) return { model: last, source: "last" };
  }

  const fallback = usable(AUTO_DEFAULT_ID) ?? candidates[0];

  if (input.interactive && typeof input.selector === "function" && candidates.length > 0) {
    const chosen = await input.selector({
      tool,
      rows: candidates.map((row) => ({ ...row, label: rowLabel(row) })),
      defaultId: usable(input.savedDefault)?.id ?? fallback?.id,
    });
    const row = usable(chosen ?? undefined);
    if (row) return { model: row, source: "picker" };
    if (chosen) {
      throw new LaunchError("ModelNotFound", `model ${chosen} is not in the ${tool} launch view`);
    }
  }

  if (fallback)
    return { model: fallback, source: fallback.id === AUTO_DEFAULT_ID ? "auto" : "first" };
  if (modelPolicy === "required") {
    throw new LaunchError("ModelRequired", `${tool} needs a model and none is available`, {
      hint: "pass --model <id>",
    });
  }
  return { model: undefined, source: "none" };
}
