/**
 * Issue #2352 — Tooltip must render in a React portal by default so it can
 * escape ancestor stacking contexts (modal `overflow-hidden`). Without the
 * portal, tooltips in the combo edit modal were clipped.
 *
 * Since KEA-7886 the shared Tooltip is an adapter over the kit Tooltip (Radix):
 * the portal, the `position: fixed` placement and the viewport clamping are the
 * kit's/Radix's. Browser DOM is not available in this Node test runner, so this
 * regression guard verifies the same contract at source level: (1) the adapter
 * renders through the kit's TooltipContent, which always portals, (2) the portal
 * target is document.body, (3) the `multiline` opt-out replaces the
 * `whitespace-nowrap` clamp, (4) placement is fixed and collision-aware.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLTIP_SRC = path.resolve(__dirname, "../../src/shared/components/Tooltip.tsx");
const KIT_TOOLTIP_SRC = path.resolve(__dirname, "../../packages/ui-kit/src/tooltip.tsx");
const RADIX_POPPER_DIST = path.resolve(
  __dirname,
  "../../node_modules/@radix-ui/react-popper/dist/index.mjs"
);

const src = fs.readFileSync(TOOLTIP_SRC, "utf8");
const kitSrc = fs.readFileSync(KIT_TOOLTIP_SRC, "utf8");

test("#2352 Tooltip renders through the kit TooltipContent, which portals unconditionally", () => {
  assert.ok(
    /import \{[^}]*\bTooltipContent\b[^}]*\} from "@omniroute\/ui-kit\/tooltip"/.test(src),
    "Tooltip must render its content through the kit TooltipContent"
  );
  assert.ok(
    /<TooltipContent\b/.test(src),
    "Tooltip must mount the kit TooltipContent for the tooltip body"
  );
  assert.ok(
    /<TooltipPrimitive\.Portal\b/.test(kitSrc),
    "The kit TooltipContent must wrap the content in the Radix Portal so it escapes clipping ancestors"
  );
  // A conditional use (`usePortal ? …`, `usePortal && …`, `!usePortal`) — not the optional
  // `usePortal?: boolean` declaration the next test requires.
  const portalBranch = /usePortal\s*(?:\?\s*[^:\s]|&&)|!\s*usePortal/;
  assert.ok(
    !portalBranch.test(kitSrc) && !portalBranch.test(src),
    "There must be no portal opt-out branch — the portal is unconditional (the unsafe-by-default was the bug)"
  );
});

test("#2352 Tooltip keeps the usePortal prop for API compatibility (always on)", () => {
  assert.ok(
    /usePortal\s*\?:\s*boolean/.test(src),
    "TooltipProps must still declare the optional usePortal prop callers pass"
  );
});

test("#2352 portal target is document.body", () => {
  // The kit forwards `portalContainer` to the Radix Portal's `container`; the adapter never
  // sets it, and Radix's Portal falls back to document.body.
  assert.ok(
    /container=\{portalContainer\}/.test(kitSrc),
    "The kit must forward portalContainer to the Radix Portal container"
  );
  assert.ok(!/portalContainer/.test(src), "The adapter must not redirect the portal elsewhere");
  const radixPortal = fs.readFileSync(
    path.resolve(__dirname, "../../node_modules/@radix-ui/react-portal/dist/index.mjs"),
    "utf8"
  );
  assert.ok(
    /globalThis\?\.document\?\.body|document\.body/.test(radixPortal),
    "Radix Portal must default its container to document.body"
  );
});

test("#2352 multiline prop swaps whitespace-nowrap for wrap-friendly classes", () => {
  assert.ok(
    /multiline\s*\?\s*"max-w-xs whitespace-normal break-words"\s*:\s*"whitespace-nowrap"/.test(src),
    "multiline=true must enable wrapping; default keeps the legacy single-line layout"
  );
});

test("#2352 portal tooltip uses fixed positioning (not absolute)", () => {
  // Radix Popper positions the portaled content with floating-ui's `fixed` strategy, so
  // it aligns to the trigger's viewport coordinates instead of an ancestor's box.
  const popper = fs.readFileSync(RADIX_POPPER_DIST, "utf8");
  assert.ok(
    /strategy:\s*"fixed"/.test(popper),
    "Portal-rendered tooltip must use position:fixed to align with computed coords"
  );
});

test("#2352 portal tooltip clamps to viewport bounds (overflow-aware)", () => {
  // The kit passes `collisionPadding` to the Radix Content, which shifts/flips the tooltip
  // so a trigger near the viewport edge keeps its tooltip on screen.
  assert.ok(
    /collisionPadding\s*=\s*\d+/.test(kitSrc) &&
      /collisionPadding=\{collisionPadding\}/.test(kitSrc),
    "Portal tooltip must clamp horizontally so a trigger near the viewport edge stays visible"
  );
});
