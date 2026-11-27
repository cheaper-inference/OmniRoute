// bin/cli/launch/core/picker.mjs: choose the launch model:
// --model > saved default > last launch > interactive picker (TTY, not --yes) >
// "auto/best-coding" when in the view > first view row.

import { LaunchError, rowLabel } from "../contract.mjs";

const AUTO_DEFAULT_ID = "auto/best-coding";

function suitable(row, minContextTokens) {
  if (typeof minContextTokens !== "number") return true;
  return typeof row.contextTokens !== "number" || row.contextTokens >= minContextTokens;
}

function cellCost(above, left, diag, differs) {
  return Math.min(above + 1, left + 1, diag + Number(differs));
}

/** One Levenshtein row update in place: `dp` holds the previous row, `ch` is a[i - 1]. */
function updateRow(dp, i, ch, b) {
  let diag = dp[0];
  dp[0] = i;
  for (let j = 1; j <= b.length; j++) {
    const above = dp[j];
    dp[j] = cellCost(above, dp[j - 1], diag, ch !== b[j - 1]);
    diag = above;
  }
}

function distance(a, b) {
  const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) updateRow(dp, i, a[i - 1], b);
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

function pickNone(input) {
  if (input.flagModel) {
    throw new LaunchError("UsageError", `${input.tool} does not take a model; drop --model`);
  }
  return { model: undefined, source: "none" };
}

function notFoundHint(query, ids) {
  const close = suggestIds(query, ids);
  return close.length > 0
    ? `did you mean: ${close.join(", ")}`
    : "list models with `omniroute models`";
}

function pickFlag(input, rows, byId) {
  const { tool, minContextTokens, flagModel } = input;
  const row = byId.get(flagModel);
  if (!row) {
    throw new LaunchError(
      "ModelNotFound",
      `model ${flagModel} is not in the ${tool} launch view (${rows.length} models)`,
      { hint: notFoundHint(flagModel, [...byId.keys()]) }
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

/** Row for `id` when it is in the view and suitable, else undefined. */
function makeUsable(byId, minContextTokens) {
  return (id) =>
    id && byId.has(id) && suitable(byId.get(id), minContextTokens) ? byId.get(id) : undefined;
}

function pickRemembered(input, usable) {
  if (input.forcePick) return undefined;
  const saved = usable(input.savedDefault);
  if (saved) return { model: saved, source: "default" };
  const last = usable(input.lastModel);
  if (last) return { model: last, source: "last" };
  return undefined;
}

function canPrompt(input, candidates) {
  return (
    Boolean(input.interactive) && typeof input.selector === "function" && candidates.length > 0
  );
}

function selectorDefaultId(input, usable, fallback) {
  const saved = usable(input.savedDefault);
  if (saved) return saved.id;
  return fallback ? fallback.id : undefined;
}

async function pickInteractive(input, candidates, usable, fallback) {
  if (!canPrompt(input, candidates)) return undefined;
  const chosen = await input.selector({
    tool: input.tool,
    rows: candidates.map((row) => ({ ...row, label: rowLabel(row) })),
    defaultId: selectorDefaultId(input, usable, fallback),
  });
  const row = usable(chosen ?? undefined);
  if (row) return { model: row, source: "picker" };
  if (chosen) {
    throw new LaunchError(
      "ModelNotFound",
      `model ${chosen} is not in the ${input.tool} launch view`
    );
  }
  return undefined;
}

function pickFallback(input, fallback) {
  if (fallback) {
    return { model: fallback, source: fallback.id === AUTO_DEFAULT_ID ? "auto" : "first" };
  }
  if (input.modelPolicy === "required") {
    throw new LaunchError("ModelRequired", `${input.tool} needs a model and none is available`, {
      hint: "pass --model <id>",
    });
  }
  return { model: undefined, source: "none" };
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
  if (input.modelPolicy === "none") return pickNone(input);
  const rows = input.view.rows;
  const byId = new Map(rows.map((row) => [row.id, row]));
  if (input.flagModel) return pickFlag(input, rows, byId);

  const usable = makeUsable(byId, input.minContextTokens);
  const remembered = pickRemembered(input, usable);
  if (remembered) return remembered;

  const candidates = rows.filter((row) => suitable(row, input.minContextTokens));
  const fallback = usable(AUTO_DEFAULT_ID) ?? candidates[0];
  const picked = await pickInteractive(input, candidates, usable, fallback);
  if (picked) return picked;
  return pickFallback(input, fallback);
}
