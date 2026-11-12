import { grokBotReadStream } from "./read";

type ComputerFile = { data?: unknown; last?: unknown };
type ComputerFrame = { file?: ComputerFile; fileError?: { error?: unknown } };

/** A single management request must not be able to buffer an unbounded file. */
export const COMPUTER_FILE_LIMIT = 8 * 1024 * 1024;

export async function grokBotComputerFile(input: {
  accessToken: string;
  machineId: string;
  path: string;
  requestId?: string;
  signal?: AbortSignal;
  limitBytes?: number;
  fetch?: (url: string, init: RequestInit) => Promise<Response>;
}): Promise<Uint8Array> {
  const requestId = input.requestId ?? crypto.randomUUID();
  const limit = input.limitBytes ?? COMPUTER_FILE_LIMIT;
  const chunks: Uint8Array[] = [];
  let total = 0;
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
    signal: input.signal,
    fetch: input.fetch,
  })) {
    const row = frame as ComputerFrame;
    const message = row.fileError?.error;
    if (typeof message === "string" && message !== "") throw new Error(message);
    const data = typeof row.file?.data === "string" ? Buffer.from(row.file.data, "base64") : null;
    if (data) {
      total += data.byteLength;
      if (total > limit) throw new Error("computer file too large");
      chunks.push(data);
    }
    if (row.file?.last === true) {
      complete = true;
      break;
    }
  }
  if (!complete) throw new Error("incomplete computer file");
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}
