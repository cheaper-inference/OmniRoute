# muse-bridge

OpenAI-compatible bridge for a **Muse** account on muse.ai (Meta). It exists because Muse has
no usable API for a consumer account:

- the chat runs over a WebSocket end-to-end encrypted with Noise to the account's Secure VM,
  so there is no HTTP endpoint to replay;
- `api.meta.ai` (Muse Code / Model API) needs a paid plan or a payment method, and the
  dashboard's **Create API key** stays disabled without one.

The bridge therefore drives the real Muse client in headless Chromium and speaks OpenAI to the
caller, which lets OmniRoute attach it as an ordinary `openai-compatible` node.

```
client -> POST /v1/chat/completions -> muse-bridge -> Chromium (US/CA proxy) -> muse.ai
```

## Behaviour

- Login happens once: the email is submitted on muse.ai, the six-digit code is read from the
  mailbox (tmail.pk by default) and the session is kept in the Chromium profile under
  `DATA_DIR/profile`. A missing session re-logs in on demand.
- Requests are serialized: one page, one Muse thread. Concurrency is the caller's queue.
- Only the last `user` message of each request is typed; Muse keeps the thread context.
- A reply is the run of assistant bubbles that follows the request's own user bubble. Bubbles
  already on screen are tagged before sending, so a repeated prompt (same text, same answer) or
  a late reply to an earlier turn cannot be returned. It is final once its text stays unchanged
  for `REPLY_SETTLE_MS`.

## Endpoints

| Method | Path                   | Notes                                                 |
| ------ | ---------------------- | ----------------------------------------------------- |
| GET    | `/health`              | liveness                                              |
| GET    | `/debug`               | last chat bubbles the bridge sees, for selector drift |
| GET    | `/v1/models`           | returns `MODEL_ID`                                    |
| POST   | `/v1/chat/completions` | OpenAI schema, `stream` supported                     |

## Run

```bash
cp .env.example .env   # proxy, Muse account and mailbox credentials
docker compose run --rm muse-bridge node src/cli-login.js
docker compose up -d
curl -s http://127.0.0.1:8791/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"muse-agent","messages":[{"role":"user","content":"say hi"}]}'
```

`docker-compose.yml` joins an external `omniroute_default` network so the OmniRoute container
reaches the bridge as `http://muse-bridge:8791/v1`; the published port stays on loopback.
Attach the bridge to whichever network your OmniRoute container uses, or publish the port and
point the node at the host address.

## Register in OmniRoute

1. `POST /api/provider-nodes` with
   `{"type":"openai-compatible","apiType":"chat","name":"Muse","prefix":"muse","baseUrl":"http://muse-bridge:8791/v1"}`
2. `POST /api/providers` with
   `{"provider":"<node id>","authType":"apikey","apiKey":"muse-bridge-local","name":"muse-agent","priority":1}`
3. `PUT /api/providers/<connection id>` with `{"isActive":true,"proxyEnabled":false}` — the
   connection must not also go through OmniRoute's proxy pool, the bridge already exits through
   its own US proxy.

The model then answers as `muse/muse-agent`.

## Limits

- DOM automation: `hatch-chat-groupable-bubble` and the `hatch-agent` bubble class in
  `src/muse.js` are what break first when the front end changes.
- One reply at a time, roughly 10-15 s per call.
- The account plan tokens pay for every reply; Muse's own scheduled tasks also spend them.

See `docs/providers/MUSE_WEB_BRIDGE.md` for the full guide.
