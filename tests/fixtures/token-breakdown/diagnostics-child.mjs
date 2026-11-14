import { channel } from "node:diagnostics_channel";
const request = {
  origin: "https://api.openai.com",
  path: "/v1/responses",
  method: "POST",
  headers: ["authorization", "synthetic-secret"],
};
const send = (name, value) => channel(`undici:request:${name}`).publish({ request, ...value });
send("create", {});
send("bodyChunkSent", {
  chunk: Buffer.from('{"model":"synthetic-model","input":"PRIVATE PROMPT فارسی 😀"}'),
});
send("bodySent", {});
send("headers", {
  response: { headers: [Buffer.from("content-type"), Buffer.from("text/event-stream")] },
});
send("bodyChunkReceived", {
  chunk: Buffer.from(
    'data: {"type":"response.completed","response":{"usage":{"input_tokens":12,"input_tokens_details":{"cached_tokens":0,"cache_write_tokens":5}}}}\n\n'
  ),
});
send("trailers", {});
await new Promise((resolve) => setTimeout(resolve, 25));
