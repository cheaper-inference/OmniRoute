/**
 * Copy-to-clipboard snippets for the Traffic Inspector "HTTP proxy" card.
 *
 * The HTTP_PROXY listener (`src/mitm/inspector/httpProxyServer.ts`) forwards
 * HTTPS as an opaque CONNECT tunnel — it never terminates TLS — so clients keep
 * seeing the real upstream certificate and need NO TLS override at all.
 *
 * The snippets must never disable certificate verification process-wide
 * (Node's reject-unauthorized kill switch, `verify=False`, `curl -k`, ...).
 * When a client is pointed at a decrypting OmniRoute MITM listener instead, the
 * only acceptable advice is
 * scoped trust in the OmniRoute root CA (`<DATA_DIR>/mitm/ca.crt`, written by
 * `src/mitm/cert/rootCa.ts`), shown as commented-out lines.
 *
 * Explanations live as comments inside the snippet text on purpose: they are
 * code, not translatable UI copy.
 */

export const HTTP_PROXY_SNIPPET_LANGS = ["bash", "python", "node"] as const;

export type HttpProxySnippetLang = (typeof HTTP_PROXY_SNIPPET_LANGS)[number];

/** Default location of the OmniRoute MITM root CA (DATA_DIR defaults to ~/.omniroute). */
const CA_PATH_SHELL = '"${DATA_DIR:-$HOME/.omniroute}/mitm/ca.crt"';
const CA_PATH_PY = 'os.path.expanduser("~/.omniroute/mitm/ca.crt")';

export function buildHttpProxySnippets(port: number): Record<HttpProxySnippetLang, string> {
  const proxyUrl = `http://127.0.0.1:${port}`;

  const bash = [
    `export HTTP_PROXY=${proxyUrl}`,
    `export HTTPS_PROXY=${proxyUrl}`,
    "# TLS verification stays ON: this listener tunnels HTTPS (CONNECT) without",
    "# decrypting it, so no certificate override is needed.",
    "# Only if a client talks to an OmniRoute MITM listener that decrypts TLS,",
    "# trust just the OmniRoute CA (never disable verification globally):",
    `#   curl --cacert ${CA_PATH_SHELL} https://...`,
    `#   export NODE_EXTRA_CA_CERTS=${CA_PATH_SHELL}   # Node-based CLIs`,
    "# then run your command:",
    "curl https://api.openai.com/v1/models",
  ].join("\n");

  const python = [
    "import os",
    `os.environ["HTTP_PROXY"] = "${proxyUrl}"`,
    `os.environ["HTTPS_PROXY"] = "${proxyUrl}"`,
    "# TLS verification stays ON: HTTPS is tunneled (CONNECT), not decrypted.",
    "# Only for an OmniRoute MITM listener that decrypts TLS, trust just its CA",
    "# (default path shown; adjust if DATA_DIR is set):",
    `# os.environ["REQUESTS_CA_BUNDLE"] = ${CA_PATH_PY}  # requests`,
    `# os.environ["SSL_CERT_FILE"] = ${CA_PATH_PY}  # httpx / ssl`,
    "# then use requests or httpx as usual",
  ].join("\n");

  const node = [
    `process.env.HTTP_PROXY = "${proxyUrl}";`,
    `process.env.HTTPS_PROXY = "${proxyUrl}";`,
    "// TLS verification stays ON: HTTPS is tunneled (CONNECT), not decrypted.",
    "// Only for an OmniRoute MITM listener that decrypts TLS, trust just its CA.",
    "// NODE_EXTRA_CA_CERTS is read at startup, so set it when launching node:",
    `//   NODE_EXTRA_CA_CERTS=${CA_PATH_SHELL} node app.js`,
    "// then use fetch / axios / undici as usual",
  ].join("\n");

  return { bash, python, node };
}
