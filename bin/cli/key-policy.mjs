import { apiFetch, isServerUp } from "./api.mjs";
import { t } from "./i18n.mjs";

class PolicyCommandError extends Error {}

function numericOption(value, flag, integer = false) {
  const number = Number(value);
  if (
    String(value).trim() === "" ||
    !Number.isFinite(number) ||
    number < 0 ||
    (integer && (!Number.isSafeInteger(number) || number === 0))
  ) {
    throw new PolicyCommandError(`Invalid ${flag}`);
  }
  return number;
}

function modelPolicy(opts) {
  const mode = opts.unrestricted ? "all" : opts.modelAccessMode;
  if (opts.unrestricted && opts.modelAccessMode && opts.modelAccessMode !== "all") {
    throw new PolicyCommandError("--unrestricted conflicts with --model-access-mode restricted");
  }
  if (mode !== undefined && !["all", "restricted"].includes(mode)) {
    throw new PolicyCommandError("--model-access-mode must be all or restricted");
  }
  const body = {};
  if (mode !== undefined) body.modelAccessMode = mode;
  if (opts.allowedModels !== undefined) {
    body.allowedModels = String(opts.allowedModels)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (mode === "all" && body.allowedModels.length) {
      throw new PolicyCommandError("Unrestricted model access conflicts with --allowed-models");
    }
    body.modelAccessMode ??= body.allowedModels.length ? "restricted" : "all";
  }
  return body;
}

export function publicKeyPolicy(data) {
  const fields = [
    "id",
    "modelAccessMode",
    "allowedModels",
    "blockedModels",
    "allowedCombos",
    "connectionAccessMode",
    "allowedConnections",
    "scopes",
    "rateLimits",
    "usageLimitEnabled",
    "dailyUsageLimitUsd",
    "weeklyUsageLimitUsd",
    "allowAutoCombos",
    "disableNonPublicModels",
  ];
  return Object.fromEntries(
    fields.filter((field) => data[field] !== undefined).map((field) => [field, data[field]])
  );
}

async function policyRequest(id, opts, method = "GET", body) {
  const response = await apiFetch(`/api/keys/${encodeURIComponent(id)}`, {
    ...opts,
    method,
    body,
    acceptNotOk: true,
    retry: false,
  });
  if (!response.ok) {
    const hint = [401, 403].includes(response.status)
      ? ": verify the active context or supply a management credential with --api-key; inference-only keys cannot manage policies"
      : "";
    throw new PolicyCommandError(`HTTP ${response.status}${hint}`);
  }
  return response.json();
}

function reportError(error) {
  console.error(
    t("common.error", {
      message:
        error instanceof PolicyCommandError
          ? error.message
          : "Unable to read or update key policy; check the active context and server connection",
    })
  );
  return 1;
}

export async function showKeyPolicy(id, opts = {}) {
  try {
    if (!(await isServerUp(opts))) throw new PolicyCommandError(t("common.serverOffline"));
    const policy = publicKeyPolicy(await policyRequest(id, opts));
    if (opts.output === "json" || opts.json) console.log(JSON.stringify(policy, null, 2));
    else {
      console.log(t("keys.policy.title") + ` (${id}):`);
      for (const [field, value] of Object.entries(policy))
        console.log(`  ${field}: ${JSON.stringify(value)}`);
    }
    return 0;
  } catch (error) {
    return reportError(error);
  }
}

export async function setKeyPolicy(id, opts = {}) {
  try {
    const body = modelPolicy(opts);
    const minuteLimit =
      opts.rateLimit == null ? undefined : numericOption(opts.rateLimit, "--rate-limit", true);
    if (opts.maxCost != null) {
      body.dailyUsageLimitUsd = numericOption(opts.maxCost, "--max-cost");
      if (body.dailyUsageLimitUsd > 0) body.usageLimitEnabled = true;
    }
    if (!Object.keys(body).length && minuteLimit === undefined)
      throw new PolicyCommandError(t("keys.policy.nothingToSet"));
    if (!(await isServerUp(opts))) throw new PolicyCommandError(t("common.serverOffline"));
    if (minuteLimit !== undefined) {
      const current = await policyRequest(id, opts);
      body.rateLimits = [
        ...(current.rateLimits ?? []).filter((rule) => rule.window !== 60),
        { limit: minuteLimit, window: 60 },
      ];
    }
    await policyRequest(id, opts, "PATCH", body);
    console.log(t("keys.policy.updated"));
    return 0;
  } catch (error) {
    return reportError(error);
  }
}
