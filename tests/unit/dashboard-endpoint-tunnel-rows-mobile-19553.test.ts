import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// #19553: on /dashboard/endpoint at ~375px the Cloudflare / Tailscale / ngrok tunnel rows were
// single-line non-wrapping flex rows. The status pill, the action Button and the chevron are
// all `shrink-0`, so only the title could shrink; the row then overflowed its card and was
// clipped by the dashboard shell's `overflow-x-hidden`. They must wrap like the cloud-sync row.
const source = readFileSync(
  new URL("../../src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx", import.meta.url),
  "utf8"
);

const ROWS = [
  {
    name: "Cloudflare Quick Tunnel",
    marker: "{/* Cloudflare Quick Tunnel */}",
    icon: "cloud_queue",
  },
  { name: "Tailscale Funnel", marker: "{/* Tailscale Funnel */}", icon: "vpn_lock" },
  { name: "ngrok Tunnel", marker: "{/* ngrok Tunnel */}", icon: "public" },
];

/**
 * className of the row container and of its title wrapper. The icon sits inside the title wrapper
 * on the Tailscale and ngrok rows (it moved into the toggle Button, #18071) and before it on the
 * Cloudflare row, so the wrapper is located from the row, not from the icon.
 */
function rowClasses(marker: string, icon: string) {
  const start = source.indexOf(marker);
  assert.ok(start > 0, `${marker} section must be present`);
  const section = source.slice(start);
  const iconIdx = section.indexOf(`<Icon name="${icon}"`);
  assert.ok(iconIdx > 0, `row icon ${icon} must be present`);
  const beforeIcon = section.slice(0, iconIdx);
  const rowMatches = [...beforeIcon.matchAll(/<div[^>]*?className="([^"]*\bpy-3\b[^"]*)"/g)];
  const rowMatch = rowMatches.at(-1);
  assert.ok(rowMatch, `${marker} row container must be present`);
  const row = rowMatch[1];
  const afterRow = section.slice(rowMatch.index + rowMatch[0].length);
  const title = afterRow.match(/<div className="([^"]*\bflex-1\b[^"]*)">/)?.[1] ?? "";
  return { row: row.split(/\s+/), title: title.split(/\s+/) };
}

for (const { name, marker, icon } of ROWS) {
  test(`${name} row wraps instead of overflowing its card on mobile`, () => {
    const { row, title } = rowClasses(marker, icon);
    assert.ok(row.includes("flex"), `row must be flex; got "${row.join(" ")}"`);
    assert.ok(row.includes("flex-wrap"), `row must wrap; got "${row.join(" ")}"`);
    assert.ok(row.includes("gap-y-2"), `wrapped lines need a row gap; got "${row.join(" ")}"`);
    assert.ok(
      title.includes("flex-1") && title.includes("min-w-[10rem]"),
      `title wrapper needs a min-width so the pill and action wrap before it collapses; got "${title.join(" ")}"`
    );
  });
}

test("Tailscale and ngrok rows keep their full-width click target and hover styling", () => {
  for (const { marker, icon } of ROWS.slice(1)) {
    const { row } = rowClasses(marker, icon);
    for (const cls of ["w-full", "hover:bg-surface/40", "cursor-pointer"]) {
      assert.ok(row.includes(cls), `${marker} row must keep ${cls}`);
    }
  }
});
