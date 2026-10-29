// @vitest-environment jsdom
/**
 * F4 (wave-2/3 checkpoint §6.11): MCP/A2A step hints use ICU *arguments* (`Run via {code}`).
 * t.rich takes functions only for <tag> placeholders, so `code: (chunks) => <code/>` rendered a
 * function ("Functions are not valid as a React child") and a node is a type error. The helper
 * passes sentinels through the real ICU formatter and swaps them for nodes.
 */
import React from "react";
import { render } from "@testing-library/react";
// The global setup mocks next-intl; its formatter lives in use-intl.
import { createTranslator } from "use-intl/core";
import { describe, expect, it } from "vitest";
import { interpolateNodes, nodeArgs } from "@/shared/utils/interpolateNodes";
import en from "@/i18n/messages/en.json";

const t = createTranslator({ locale: "en", messages: en as never, namespace: "mcpDashboard" });
const ta = createTranslator({ locale: "en", messages: en as never, namespace: "a2aDashboard" });

describe("interpolateNodes", () => {
  it("renders the mcpStep1 hint with its command as a <code> node", () => {
    const { container } = render(
      <p>
        {interpolateNodes(
          (t as never as (k: string, v: object) => string)("mcpStep1", nodeArgs(["code"])),
          {
            code: <code>omniroute --mcp</code>,
          }
        )}
      </p>
    );
    expect(container.textContent).toBe("Run via omniroute --mcp");
    expect(container.querySelector("code")?.textContent).toBe("omniroute --mcp");
  });

  it("handles several arguments in one message (a2aStep2)", () => {
    const { container } = render(
      <p>
        {interpolateNodes(
          (ta as never as (k: string, v: object) => string)(
            "a2aStep2",
            nodeArgs(["code1", "code2", "code3"])
          ),
          {
            code1: <code>/a2a</code>,
            code2: <code>message/send</code>,
            code3: <code>message/stream</code>,
          }
        )}
      </p>
    );
    expect([...container.querySelectorAll("code")].map((c) => c.textContent)).toEqual([
      "/a2a",
      "message/send",
      "message/stream",
    ]);
    expect(container.textContent).not.toMatch(/\u0000/);
  });

  it("ignores prototype keys and renders nothing for a sentinel without a node", () => {
    const text = `a ${nodeArgs(["toString"]).toString} b ${nodeArgs(["missing"]).missing} c`;
    const { container } = render(<p>{interpolateNodes(text, {})}</p>);
    expect(container.textContent).toBe("a  b  c");
  });
});
