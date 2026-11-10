// Safety helpers of the opencode server executor: what the spawned CLI may
// inherit, which hosts count as local, and which URLs may be forwarded to it.
// Kept apart from the executor so the rules are small and unit-testable.

// The spawned `opencode serve` must not inherit OmniRoute's own environment:
// JWT_SECRET, API_KEY_SECRET, STORAGE_ENCRYPTION_KEY and every provider key would
// otherwise be readable by (and logged from) a child that never needs them. Only
// what a CLI needs to run, reach its own upstream and find its own config/auth is
// forwarded, plus the operator's OPENCODE_* variables.
const SERVER_ENV_ALLOWLIST = [
  "PATH",
  "HOME",
  "USERPROFILE",
  "APPDATA",
  "LOCALAPPDATA",
  "XDG_CONFIG_HOME",
  "XDG_DATA_HOME",
  "XDG_CACHE_HOME",
  "XDG_STATE_HOME",
  "TMPDIR",
  "TMP",
  "TEMP",
  "SHELL",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "TERM",
  "SystemRoot",
  "SYSTEMROOT",
  "ComSpec",
  "PATHEXT",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "no_proxy",
  "NODE_EXTRA_CA_CERTS",
  "SSL_CERT_FILE",
];

export function buildServerEnv(source: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const key of SERVER_ENV_ALLOWLIST) {
    const value = source[key];
    if (typeof value === "string") env[key] = value;
  }
  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith("OPENCODE_") && typeof value === "string") env[key] = value;
  }
  return env;
}

export function isLoopbackHost(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  return host === "localhost" || host === "::1" || /^127(?:\.\d{1,3}){3}$/.test(host);
}

// Hostname checks alone cannot see a public DNS name that resolves to an internal
// address; they only refuse the literal and reserved spellings below.
function isInternalHost(hostname: string): boolean {
  // `localhost.` names the same host as `localhost`: drop the trailing root dot.
  const host = hostname
    .replace(/^\[|\]$/g, "")
    .toLowerCase()
    .replace(/\.+$/, "");
  if (!host || isLoopbackHost(host) || host.endsWith(".localhost")) return true;
  if (host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (/^(?:10|0)\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host)) return true;
  if (/^172\.(?:1[6-9]|2\d|3[01])\./.test(host)) return true;
  // 100.64.0.0/10, carrier-grade NAT space.
  if (/^100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(host)) return true;
  if (!host.includes(":")) return false;
  // `::` (unspecified) and IPv4-mapped literals (`::ffff:7f00:1` is 127.0.0.1).
  if (host === "::" || host.startsWith("::ffff:")) return true;
  return /^f[cd]/.test(host) || host.startsWith("fe80:");
}

// Forwarded URLs end up in opencode "file" parts that the LOCAL server fetches or
// reads. Anything but https: or an inline data: URL (file:, http: to loopback or
// LAN hosts, ftp:, relative paths...) would let a chat client make that server
// read local files or probe the internal network, so those parts are dropped.
export function isForwardableFileUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (/^data:/i.test(trimmed)) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" && !isInternalHost(parsed.hostname);
  } catch {
    return false;
  }
}
