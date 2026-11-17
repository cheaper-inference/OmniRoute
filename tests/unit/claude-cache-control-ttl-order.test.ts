import test from "node:test";
import assert from "node:assert/strict";
import { normalizeCacheControlTtl } from "../../open-sse/services/claudeCodeConstraints.ts";

test("normalizeCacheControlTtl raises earlier breakpoints before a later 1h breakpoint", () => {
  const body = {
    tools: [{ name: "bash", cache_control: { type: "ephemeral", ttl: "5m" } }],
    system: [
      {
        type: "text",
        text: "stable",
        cache_control: { type: "ephemeral", ttl: undefined as string | undefined },
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "long-lived history",
            cache_control: { type: "ephemeral", ttl: "1h" },
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "new turn",
            cache_control: { type: "ephemeral", ttl: "5m" },
          },
        ],
      },
    ],
  };

  normalizeCacheControlTtl(body);

  assert.equal(body.tools[0].cache_control.ttl, "1h");
  assert.equal(body.system[0].cache_control.ttl, "1h");
  assert.equal(body.messages[0].content[0].cache_control.ttl, "1h");
  assert.equal(body.messages[1].content[0].cache_control.ttl, "5m");
});
