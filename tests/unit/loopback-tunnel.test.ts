// The two loopback-mismatch hints of the OAuth modal share two helpers: the dashboard port the
// browser reached (an empty `window.location.port` means the protocol default) and the `ssh -L`
// command that forwards the loopback ports of the provider redirect to the OmniRoute host.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildSshLocalForward,
  resolveDashboardPort,
} from "../../src/lib/oauth/utils/loopbackTunnel.ts";

test("an explicit port is returned as is, whatever the protocol", () => {
  assert.equal(resolveDashboardPort({ hostname: "192.168.1.20", port: "20128" }), "20128");
  assert.equal(
    resolveDashboardPort({ hostname: "192.168.1.20", port: "8443", protocol: "https:" }),
    "8443"
  );
});

test("an empty port on https resolves to 443", () => {
  assert.equal(resolveDashboardPort({ hostname: "omni.lan", port: "", protocol: "https:" }), "443");
});

test("an empty port on http, or with no protocol, resolves to 80", () => {
  assert.equal(resolveDashboardPort({ hostname: "omni.lan", port: "", protocol: "http:" }), "80");
  assert.equal(resolveDashboardPort({ hostname: "omni.lan", port: "" }), "80");
});

test("a single port builds one -L flag with the detected host filled in", () => {
  assert.equal(
    buildSshLocalForward(["20128"], "192.168.1.20"),
    "ssh -L 20128:127.0.0.1:20128 <user>@192.168.1.20"
  );
});

test("several ports build one flag each, in the order given", () => {
  assert.equal(
    buildSshLocalForward(["20128", "1455"], "omni.lan"),
    "ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@omni.lan"
  );
});

test("duplicate ports collapse to a single flag", () => {
  assert.equal(
    buildSshLocalForward(["1455", "20128", "1455", "20128"], "omni.lan"),
    "ssh -L 1455:127.0.0.1:1455 -L 20128:127.0.0.1:20128 <user>@omni.lan"
  );
});

test("the user placeholder is always left for the operator", () => {
  assert.match(buildSshLocalForward(["20128"], "omni.lan"), /<user>@omni\.lan$/);
});
