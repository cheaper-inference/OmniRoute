import { type ChildProcess } from "node:child_process";
import { Readable, Writable } from "node:stream";
import * as acp from "@agentclientprotocol/sdk";
import { boundedFrames } from "./acpFrames.ts";

export class NativeAcpClient {
  readonly connection: acp.ClientConnection;
  private sessionId?: string;

  constructor(child: ChildProcess, onText: (text: string) => void) {
    if (!child.stdin || !child.stdout) throw new Error("ACP agent stdio is unavailable");
    const input = Readable.toWeb(child.stdout) as ReadableStream<Uint8Array>;
    const output = Writable.toWeb(child.stdin) as WritableStream<Uint8Array>;
    const app = acp
      .client({ name: "omniroute" })
      .onRequest(acp.methods.client.session.requestPermission, () => ({
        outcome: { outcome: "cancelled" },
      }))
      .onNotification(acp.methods.client.session.update, ({ params }) => {
        if (params.sessionId !== this.sessionId) return;
        const update = params.update;
        if (update.sessionUpdate === "agent_message_chunk" && update.content.type === "text")
          onText(update.content.text);
      });
    this.connection = app.connect(acp.ndJsonStream(output, input.pipeThrough(boundedFrames())));
  }

  async initialize(cwd: string, expected?: { mode: string; model: string }): Promise<void> {
    const response = await this.connection.agent.request(acp.methods.agent.initialize, {
      protocolVersion: acp.PROTOCOL_VERSION,
      clientCapabilities: {},
    });
    if (response.protocolVersion !== acp.PROTOCOL_VERSION)
      throw new Error("ACP protocol version is unsupported");
    const session = await this.connection.agent.request(acp.methods.agent.session.new, {
      cwd,
      mcpServers: [],
    });
    this.sessionId = session.sessionId;
    if (expected) {
      const option = (category: string) =>
        session.configOptions?.find((entry) => entry.category === category);
      const current = (category: string) => {
        const entry = option(category);
        return entry && "currentValue" in entry ? entry.currentValue : undefined;
      };
      const selected = session as { models?: { currentModelId?: string } };
      if (
        (session.modes?.currentModeId ?? current("mode")) !== expected.mode ||
        (selected.models?.currentModelId ?? current("model")) !== expected.model
      ) {
        throw new Error("ACP session did not confirm the requested mode and model");
      }
    }
  }

  async prompt(text: string, requireEndTurn = false): Promise<void> {
    if (!this.sessionId) throw new Error("ACP session is not initialized");
    const result = await this.connection.agent.request(acp.methods.agent.session.prompt, {
      sessionId: this.sessionId,
      prompt: [{ type: "text", text }],
    });
    if (requireEndTurn && result.stopReason !== "end_turn") throw new Error("Incomplete ACP turn");
  }

  async cancel(): Promise<void> {
    if (this.sessionId)
      await this.connection.agent.notify(acp.methods.agent.session.cancel, {
        sessionId: this.sessionId,
      });
  }

  close(): void {
    this.connection.close();
  }
}
