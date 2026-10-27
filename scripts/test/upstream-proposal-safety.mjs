// Reproducer-only TCP fence. Loopback fixture servers only; no real providers.
// No real provider tokens, operator DB, external TCP targets, trust-store writes or browser warmup.
import net from "node:net";
import { syncBuiltinESMExports } from "node:module";

const marker = Symbol.for("upstreamProposal.loopbackFence");
if (!net.Socket.prototype[marker]) {
  const connect = net.Socket.prototype.connect;
  net.Socket.prototype.connect = function (...args) {
    let options = Array.isArray(args[0]) ? args[0][0] : args[0];
    let host;
    if (typeof options === "object" && options !== null) {
      if (!options.path) host = options.host || options.hostname || "localhost";
    } else if (typeof options === "number" || /^\d+$/.test(String(options))) {
      host = typeof args[1] === "string" ? args[1] : "localhost";
    }
    if (host) {
      host = String(host)
        .toLowerCase()
        .replace(/^\[|\]$/g, "");
      const local =
        host === "localhost" ||
        host === "::1" ||
        host === "::" ||
        host === "0.0.0.0" ||
        /^127\.(?:\d{1,3}\.){2}\d{1,3}$/.test(host) ||
        /^::ffff:127\.(?:\d{1,3}\.){2}\d{1,3}$/.test(host);
      if (!local) {
        const error = new Error(`UPSTREAM_PROPOSAL_NETWORK_FENCE: external TCP denied (${host})`);
        error.code = "ERR_UPSTREAM_PROPOSAL_NETWORK_FENCE";
        throw error;
      }
    }
    return Reflect.apply(connect, this, args);
  };
  Object.defineProperty(net.Socket.prototype, marker, { value: true });
  syncBuiltinESMExports();
}
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_SKIP_DNS_WRITE = "1";
process.env.ADOBE_FIREFLY_BROWSER_REFRESH ||= "0";
process.env.APP_LOG_TO_FILE ||= "false";
