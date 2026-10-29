import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cavemanCompress } from "../../../open-sse/services/compression/caveman.ts";

const context =
  "Context: the repository keeps the tagged build on the release branch and the dashboard reads the same configuration file that the worker writes at startup.";
const history =
  "The build runs on the machine and the output is written to the log file, then the worker reads the file and the dashboard shows the result of the run.";

describe("caveman: latest user turn", () => {
  it("keeps the latest user message intact when earlier turns exist", () => {
    const latest = `sure\n\n${context}`;
    const body = {
      messages: [
        { role: "user", content: history },
        { role: "assistant", content: "Understood." },
        { role: "user", content: latest },
      ],
    };
    const out = cavemanCompress(body, { enabled: true, intensity: "full" });
    const messages = out.body.messages as Array<{ content: string }>;
    assert.equal(messages[2].content, latest);
    assert.notEqual(messages[0].content, history);
  });

  it("still compresses a lone user message", () => {
    const body = { messages: [{ role: "user", content: history }] };
    const out = cavemanCompress(body, { enabled: true, intensity: "full" });
    const messages = out.body.messages as Array<{ content: string }>;
    assert.notEqual(messages[0].content, history);
  });
});
