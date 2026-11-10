import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL("../../src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx", import.meta.url),
  "utf8"
);

test("endpoint tunnel rows wrap and keep minimum title width on mobile (#19553)", () => {
  // Cloudflare Quick Tunnel row
  assert.match(
    source,
    /<div className="flex flex-wrap items-center gap-3 py-3">\s*<Icon name="cloud_queue" size=\{18\} className="text-warning shrink-0" \/>\s*<div className="flex-1 min-w-\[12rem\]">/,
    "Cloudflare Quick Tunnel row must wrap on mobile and give the title a min-w floor"
  );

  // Tailscale Funnel row
  assert.match(
    source,
    /className="w-full flex flex-wrap items-center gap-3 py-3 hover:bg-surface\/40 transition-colors rounded -mx-1 px-1 text-left cursor-pointer"\s*onClick=\{\(\) => toggleTunnelRow\("ts"\)\}\s*>\s*<div className="flex-1 min-w-\[12rem\]">[\s\S]*?<Icon name="vpn_lock" size=\{18\} className="text-chart-3 shrink-0" \/>/,
    "Tailscale Funnel row must wrap on mobile and give the title a min-w floor"
  );

  // ngrok Tunnel row
  assert.match(
    source,
    /className="w-full flex flex-wrap items-center gap-3 py-3 hover:bg-surface\/40 transition-colors rounded -mx-1 px-1 text-left cursor-pointer"\s*onClick=\{\(\) => toggleTunnelRow\("ngrok"\)\}\s*>\s*<div className="flex-1 min-w-\[12rem\]">[\s\S]*?<Icon name="public" size=\{18\} className="text-chart-3 shrink-0" \/>/,
    "ngrok Tunnel row must wrap on mobile and give the title a min-w floor"
  );
});

test("tunnel rows do not have non-wrapping single-line layout (#19553)", () => {
  assert.doesNotMatch(
    source,
    /\{showCloudflaredTunnel && \(\s*<div className="border-t border-border\/30">\s*<div className="flex items-center gap-3 py-3">/,
    "Cloudflare Quick Tunnel must not use non-wrapping flex items-center"
  );
  assert.doesNotMatch(
    source,
    /\{showTailscaleFunnel && \([\s\S]*?className="w-full flex items-center gap-3 py-3/,
    "Tailscale Funnel must not use non-wrapping flex items-center"
  );
  assert.doesNotMatch(
    source,
    /\{showNgrokTunnel && \([\s\S]*?className="w-full flex items-center gap-3 py-3/,
    "ngrok Tunnel must not use non-wrapping flex items-center"
  );
});
