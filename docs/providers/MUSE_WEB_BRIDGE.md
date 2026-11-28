---
title: "Providers - Muse Web (browser bridge)"
version: 3.8.55
lastUpdated: 2026-11-23
---

# Providers - Muse Web (browser bridge)

`muse.ai` is Meta's consumer agent. It has no HTTP chat endpoint: the client streams turns over
a WebSocket end-to-end encrypted with Noise to the account's Secure VM, and the developer API
(`api.meta.ai`, "Muse Code" / "Model API") requires a paid plan — without one the dashboard's
**Create API key** control stays disabled and every request is refused before a key exists.

Consequence for OmniRoute: no `muse-code` OAuth connection and no API key can be minted from a
free Muse account. The account's plan tokens are only spendable by the Muse client itself.

To use such an account anyway, run the bridge in `contrib/muse-bridge/`: it drives the real client
in headless Chromium and exposes an OpenAI-compatible surface, so OmniRoute attaches it as an
ordinary compatible node — no core provider code is involved.

## Requirements

- A Muse account, plus a mailbox the bridge can read (the login is an email code).
- An HTTP proxy that egresses in the US or Canada; muse.ai refuses other regions.
- Docker on the OmniRoute host, or any host reachable from the OmniRoute container.

## Run the bridge

```bash
cd contrib/muse-bridge
cp .env.example .env                      # proxy + account + mailbox
docker compose run --rm muse-bridge node src/cli-login.js
docker compose up -d
curl -s http://127.0.0.1:8791/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{"model":"muse-agent","messages":[{"role":"user","content":"say hi"}]}'
```

The first run performs the email-code login and stores the browser profile under `data/`; later
runs reuse it, and a session that goes missing triggers a fresh login on the next request.

## Register the node

Management API, in this order:

```bash
# 1. compatible node
POST /api/provider-nodes
{"type":"openai-compatible","apiType":"chat","name":"Muse","prefix":"muse","baseUrl":"http://muse-bridge:8791/v1"}

# 2. one connection on that node
POST /api/providers
{"provider":"<node id>","authType":"apikey","apiKey":"muse-bridge-local","name":"muse-agent","priority":1}

# 3. activate, and keep OmniRoute's proxy pool out of the path
PUT /api/providers/<connection id>
{"isActive":true,"proxyEnabled":false}
```

`proxyEnabled` must stay `false`: the bridge already exits through its own US proxy, and pushing
the hop OmniRoute -> bridge through a proxy pool breaks both the routing and the hostname
resolution. The node is reachable as `muse/muse-agent` afterwards.

## What to expect

- Selector-driven: `hatch-chat-groupable-bubble` plus the assistant's `hatch-agent` bubble class
  is the contract with the Muse front end; a redesign breaks the extraction first.
- Serialized: one browser page and one Muse thread, roughly 10-15 s per call.
- Every reply spends the account's plan tokens. Scheduled tasks configured inside Muse (for
  example a heartbeat every 30 minutes) spend them too, independent of OmniRoute traffic.
- The bridge is a runtime dependency, not a provider implementation: it belongs in
  `contrib/`, and its failures show up as `upstream_error` from the node rather than as
  OmniRoute provider errors.
