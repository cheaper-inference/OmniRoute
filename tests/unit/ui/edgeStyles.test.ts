import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { edgeStyle, FLOW_EDGE_COLORS } from "../../../src/shared/components/flow/edgeStyles.ts";
import { ciTokenReferences } from "../../../packages/ui-kit/src/tokens.ts";

describe("flow edgeStyles (U0 — extracted from ProviderTopology)", () => {
  // Kit #287 (flow-primitives): the palette is the kit's flow-edge tokens, 3:1 or better on the
  // canvas and on every content surface in the four themes.
  it("exposes the kit flow-edge tokens as the shared flow palette", () => {
    assert.equal(FLOW_EDGE_COLORS.active, "var(--ci-flow-edge-active)");
    assert.equal(FLOW_EDGE_COLORS.error, "var(--ci-flow-edge-error)");
    assert.equal(FLOW_EDGE_COLORS.last, "var(--ci-flow-edge-warning)");
    assert.equal(FLOW_EDGE_COLORS.idle, "var(--ci-flow-edge-idle)");
    assert.deepEqual(
      [
        FLOW_EDGE_COLORS.active,
        FLOW_EDGE_COLORS.last,
        FLOW_EDGE_COLORS.error,
        FLOW_EDGE_COLORS.idle,
      ],
      [
        ciTokenReferences.flowEdge.active,
        ciTokenReferences.flowEdge.warning,
        ciTokenReferences.flowEdge.error,
        ciTokenReferences.flowEdge.idle,
      ]
    );
  });

  it("styles an error edge", () => {
    assert.deepEqual(edgeStyle(false, false, true), {
      stroke: "var(--ci-flow-edge-error)",
      strokeWidth: 2,
      opacity: 0.85,
    });
  });

  it("styles an active edge", () => {
    assert.deepEqual(edgeStyle(true, false, false), {
      stroke: "var(--ci-flow-edge-active)",
      strokeWidth: 2.5,
      opacity: 1,
    });
  });

  it("styles a last-used edge", () => {
    assert.deepEqual(edgeStyle(false, true, false), {
      stroke: "var(--ci-flow-edge-warning)",
      strokeWidth: 1.5,
      opacity: 0.6,
    });
  });

  // The idle token already meets 3:1 on its own, so the edge is drawn opaque (it used to be the
  // muted text colour at 30%).
  it("styles an idle edge, opaque", () => {
    assert.deepEqual(edgeStyle(false, false, false), {
      stroke: "var(--ci-flow-edge-idle)",
      strokeWidth: 1,
      opacity: 1,
    });
  });

  it("styles a healthy (connected, no in-flight traffic) edge as static dim green", () => {
    assert.deepEqual(edgeStyle(false, false, false, true), {
      stroke: "var(--ci-flow-edge-active)",
      strokeWidth: 1.5,
      opacity: 0.4,
    });
  });

  it("defaults healthy to false so 3-arg callers stay idle", () => {
    assert.deepEqual(edgeStyle(false, false, false), {
      stroke: "var(--ci-flow-edge-idle)",
      strokeWidth: 1,
      opacity: 1,
    });
  });

  it("applies precedence error > active > last > healthy", () => {
    assert.equal(edgeStyle(true, true, true).stroke, "var(--ci-flow-edge-error)"); // error wins
    assert.equal(edgeStyle(true, true, false).stroke, "var(--ci-flow-edge-active)"); // active beats last
    assert.equal(edgeStyle(false, false, true, true).stroke, "var(--ci-flow-edge-error)"); // error beats healthy
    assert.equal(edgeStyle(false, true, false, true).stroke, "var(--ci-flow-edge-warning)"); // last beats healthy
    // healthy green is dimmer/thinner than the active pulse green
    assert.equal(edgeStyle(false, false, false, true).opacity, 0.4);
    assert.equal(edgeStyle(true, false, false, true).opacity, 1); // active still wins
  });
});
