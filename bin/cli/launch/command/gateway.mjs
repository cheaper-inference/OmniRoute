// bin/cli/launch/command/gateway.mjs: `omnirouter gateway status|keep|stop`.

import { io, jsonLine, reportError, resolveStateDir, usageExitOverride } from "./shared.mjs";

/** Core gateway functions, injectable one by one through `deps`. */
const GATEWAY_API = ["gatewayStatus", "keepGateway", "stopOwnedGateway"];

async function gatewayApi(deps) {
  if (GATEWAY_API.every((name) => deps[name])) return deps;
  const mod = await loadGatewayCore();
  return Object.fromEntries(GATEWAY_API.map((name) => [name, deps[name] ?? mod[name]]));
}

function ownerOf(s) {
  if (s.owned) return `started by a launcher${s.state ? ` (${s.state})` : ""}`;
  return s.kept
    ? "kept after a launch (now a normal gateway)"
    : "external (not started by a launcher)";
}

function describeStatus(s) {
  if (!s.running) return `gateway at ${s.baseUrl}: not running`;
  const pid = s.pid ? `, pid ${s.pid}` : "";
  return `gateway at ${s.baseUrl}: running, ${ownerOf(s)}${pid}, ${s.leases} active launches`;
}

function keepText(result) {
  return result?.kept
    ? "gateway kept: it now runs until `omniroute stop`\n"
    : "no launcher-started gateway to keep\n";
}

/** Subcommands: name, description, extra options, core call, text renderer. */
const SUBCOMMANDS = [
  {
    name: "status",
    description: "Show whether the gateway runs and who owns it",
    options: [["--port <n>", "gateway port"]],
    call: (api, stateDir, opts) => api.gatewayStatus({ stateDir, port: opts.port }),
    text: (status) => `${describeStatus(status)}\n`,
  },
  {
    name: "keep",
    description: "Keep the launcher-started gateway running after the last launch exits",
    options: [],
    call: (api, stateDir) => api.keepGateway({ stateDir }),
    text: keepText,
  },
  {
    name: "stop",
    description: "Stop the gateway a launcher started (not one you started yourself)",
    options: [],
    call: (api, stateDir) => api.stopOwnedGateway({ stateDir }),
    text: () => "launcher gateway stopped\n",
  },
];

function subcommandAction(spec, deps) {
  return async (rawOpts) => {
    const out = io(deps);
    try {
      const opts = rawOpts || {};
      const api = await gatewayApi(deps);
      const result = await spec.call(api, resolveStateDir(deps), opts);
      out.stdout.write(opts.json ? jsonLine(result) : spec.text(result));
      out.setExitCode(0);
    } catch (error) {
      reportError(error, { json: Boolean(rawOpts?.json), ...out });
    }
  };
}

/**
 * Register `gateway status|keep|stop`.
 * @param {import("commander").Command} program
 * @param {{ deps?: { gatewayStatus?, keepGateway?, stopOwnedGateway?, stateDir?, stdout?, stderr?, setExitCode? } }} [options]
 */
export function registerGatewayCommand(program, { deps = {} } = {}) {
  const gateway = program
    .command("gateway")
    .description("Inspect or control the gateway a launcher started");
  gateway.exitOverride(usageExitOverride);
  for (const spec of SUBCOMMANDS) {
    const sub = gateway.command(spec.name).description(spec.description);
    for (const [flags, description] of spec.options) sub.option(flags, description);
    sub.option("--json", "JSON output").action(subcommandAction(spec, deps));
  }
  for (const sub of gateway.commands) sub.exitOverride(usageExitOverride);
  return gateway;
}

// Lazy loaders stay last: the test loader rewrites dynamic import() in place, which shifts
// the coverage offsets of any code that follows it.

/** Gateway lifecycle code is only needed when a gateway subcommand runs. */
function loadGatewayCore() {
  return import("../core/gateway.mjs");
}
