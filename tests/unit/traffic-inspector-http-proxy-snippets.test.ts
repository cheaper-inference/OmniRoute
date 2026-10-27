/**
 * Traffic Inspector "HTTP proxy" snippet card must never hand out a
 * process-wide TLS verification kill switch. The HTTP_PROXY listener tunnels
 * HTTPS (CONNECT) without decrypting it, so no override is needed at all; when
 * a decrypting OmniRoute MITM listener is involved, only scoped trust in the
 * OmniRoute CA is acceptable (NODE_EXTRA_CA_CERTS / --cacert /
 * REQUESTS_CA_BUNDLE / SSL_CERT_FILE).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  buildHttpProxySnippets,
  HTTP_PROXY_SNIPPET_LANGS,
} from "../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/httpProxySnippets.ts";

const COMPONENT_DIR = path.resolve(
  "src/app/(dashboard)/dashboard/tools/traffic-inspector/components"
);

const INSECURE_PATTERNS: RegExp[] = [
  /NODE_TLS_REJECT_UNAUTHORIZED/,
  /rejectUnauthorized/,
  /verify\s*=\s*False/,
  /(^|\s)--insecure(\s|$)/m,
  /(^|\s)-k(\s|$)/m,
  /PYTHONHTTPSVERIFY/,
  /CURL_SSL_NO_VERIFY|--no-check-certificate/,
];

test("every snippet variant is free of TLS-verification kill switches", () => {
  const snippets = buildHttpProxySnippets(8080);
  for (const lang of HTTP_PROXY_SNIPPET_LANGS) {
    const snippet = snippets[lang];
    assert.equal(typeof snippet, "string", `${lang} snippet missing`);
    for (const pattern of INSECURE_PATTERNS) {
      assert.doesNotMatch(snippet, pattern, `${lang} snippet matches ${pattern}`);
    }
  }
});

test("snippets still point HTTP_PROXY/HTTPS_PROXY at the inspector port", () => {
  const snippets = buildHttpProxySnippets(18080);
  for (const lang of HTTP_PROXY_SNIPPET_LANGS) {
    assert.match(snippets[lang], /HTTP_PROXY/);
    assert.match(snippets[lang], /HTTPS_PROXY/);
    assert.match(snippets[lang], /http:\/\/127\.0\.0\.1:18080/);
  }
});

test("bash variant uses scoped CA trust (curl --cacert / NODE_EXTRA_CA_CERTS)", () => {
  const { bash } = buildHttpProxySnippets(8080);
  assert.match(bash, /--cacert\s+\S*\/mitm\/ca\.crt/);
  assert.match(bash, /NODE_EXTRA_CA_CERTS=\S*\/mitm\/ca\.crt/);
});

test("python variant uses REQUESTS_CA_BUNDLE / SSL_CERT_FILE pointing at the OmniRoute CA", () => {
  const { python } = buildHttpProxySnippets(8080);
  assert.match(python, /REQUESTS_CA_BUNDLE.*\/mitm\/ca\.crt/);
  assert.match(python, /SSL_CERT_FILE.*\/mitm\/ca\.crt/);
});

test("node variant uses NODE_EXTRA_CA_CERTS at launch (not set from inside the process)", () => {
  const { node } = buildHttpProxySnippets(8080);
  assert.match(node, /NODE_EXTRA_CA_CERTS=\S*\/mitm\/ca\.crt"?\s+node\b/);
  // NODE_EXTRA_CA_CERTS is only read at process startup — assigning it via
  // process.env inside the script would silently do nothing.
  assert.doesNotMatch(node, /process\.env\.NODE_EXTRA_CA_CERTS\s*=/);
});

test("no source file in the traffic-inspector components ships the kill switch", () => {
  for (const entry of fs.readdirSync(COMPONENT_DIR)) {
    if (!/\.(tsx?|jsx?)$/.test(entry)) continue;
    const source = fs.readFileSync(path.join(COMPONENT_DIR, entry), "utf8");
    assert.doesNotMatch(source, /NODE_TLS_REJECT_UNAUTHORIZED/, `${entry} still references it`);
  }
});
