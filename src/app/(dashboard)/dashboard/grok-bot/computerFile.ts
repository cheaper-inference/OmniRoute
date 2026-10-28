import { grokBotReadStream } from "./read";

type ComputerFile = { data?: unknown; last?: unknown };
type ComputerFrame = { file?: ComputerFile; fileError?: { error?: unknown } };

export async function grokBotComputerFile(input: {
  accessToken: string;
  machineId: string;
  path: string;
  requestId?: string;
  fetch?: (url: string, init: RequestInit) => Promise<Response>;
}): Promise<Uint8Array> {
  const requestId = input.requestId ?? crypto.randomUUID();
  const chunks: Uint8Array[] = [];
  let complete = false;
  for await (const frame of grokBotReadStream({
    accessToken: input.accessToken,
    method: "OpenGrokBotUserComputerRequest",
    payload: {
      machineId: input.machineId,
      idempotencyKey: requestId,
      frame: {
        requestId,
        download: {
          path: input.path,
          authorizedByStanding: false,
          authorizedByApproval: false,
        },
      },
    },
    fetch: input.fetch,
  })) {
    const row = frame as ComputerFrame;
    const message = row.fileError?.error;
    if (typeof message === "string" && message !== "") throw new Error(message);
    const data = typeof row.file?.data === "string" ? Buffer.from(row.file.data, "base64") : null;
    if (data) chunks.push(data);
    if (row.file?.last === true) {
      complete = true;
      break;
    }
  }
  if (!complete) throw new Error("incomplete computer file");
  const length = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const out = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}
