---
title: "Demon Route API-key Provider Guide"
version: 3.8.52
lastUpdated: 2026-10-17
---

# Demon Route (API-key gateway)

Demon Route provides an OpenAI-compatible, **externally hosted** model gateway. Its catalog
contains open-weight and independently fine-tuned models; there are no OpenAI/Anthropic/
Google closed-model SKUs. See the [official API docs](https://demonroute.com/docs),
[catalog](https://demonroute.com/models), and [pricing](https://demonroute.com/pricing)
for current model IDs, costs, entitlement and privacy policy.

## Configure a connection

1. Create a Demon Route account and an API key on [demonroute.com](https://demonroute.com).
   A confirmed deposit is required for paid models **and** to unlock its conditional
   complimentary lane. OmniRoute deliberately does not mark this provider as `hasFree`:
   the complimentary lane is **not** unconditional.
2. In **Providers → API Key Providers → Demon Route**, create a connection and paste
   the key. The built-in endpoint is `https://api.demonroute.com/v1`; do **not**
   enter the `/chat/completions` suffix as an OpenAI-compatible node URL.
3. In the connection's **Available Models**, choose **Import from /models** or enable
   Auto-Sync to obtain the models your key can access. The small bundled seed list is
   for offline fallback, **not** proof of current entitlement, model health or price.
4. Choose an exact, case-sensitive upstream channel ID, retaining its vendor prefix
   (for example `dphn/Dolphin3.0-Llama3.1-8B`). On the OmniRoute API, prefix
   it **once** with `demonroute/`, giving
   `demonroute/dphn/Dolphin3.0-Llama3.1-8B`. The extra slash is intentional:
   the upstream vendor/model string must not be truncated or rewritten.
5. Test both non-streaming and streaming chat via the dashboard before inserting
   it as a member of a fallback combo. Tool support, context lengths, modalities and
   pricing vary **by model**; do not assume every model supports tools or vision.

## Request example

With a separate **OmniRoute gateway** API key, a local non-streaming smoke request is:

```bash
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer ${OMNIROUTE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"model":"demonroute/dphn/Dolphin3.0-Llama3.1-8B","stream":false,"messages":[{"role":"user","content":"Say hello."}]}'
```

Use the same endpoint with `"stream":true` and `curl -N` to verify SSE.
The key above authenticates the **client to OmniRoute**. Demon Route's own
Bearer key belongs only in its stored provider connection; **do not paste the
provider key into source code, combo definitions, logs, or screenshots**.
Smoke requests are real upstream requests and may consume balance or daily quotas.

## Endpoint support and operational boundaries

| Surface                          | Behavior                                                                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Chat Completions                 | `/v1/chat/completions`, JSON and SSE streaming                                                                                          |
| Model discovery                  | `/v1/models`, **requires** the connected Bearer key; import the live per-key list                                                       |
| Embeddings                       | Not declared: no embedding-capable model is verified for this gateway, so it is not listed as an embedding provider                     |
| Responses, images, speech, video | Not advertised by this integration: no provider support is inferred merely because it resembles OpenAI                                  |
| Timing                           | 120-second request and first-byte cap in the built-in configuration; upstream advises clients to allow at least 120 seconds             |
| Balance / quotas                 | Prepaid gateway; `402` indicates insufficient credit, `429` indicates per-key rate limiting, and `401` indicates authentication trouble |

Demon Route currently describes a conditional complimentary lane of up to 50 requests/day
after a confirmed deposit, and claims failed requests are refunded. These are **provider
policies**, not features implemented or verified by OmniRoute. Check the official pricing
before enabling automatic fallback: OmniRoute does not guarantee refunds or zero cost.
A `429` can be transient; a `402` needs balance rather than repeated immediate retries.
Its own documentation advertises a 30-day notice and 90-day successor policy for
retired IDs, but old IDs are not guaranteed by the local seed list. Privacy statements
about third-party upstream hosts are also governed by Demon Route and its hosts.

If model import fails, first check the key and its per-key model entitlement; do not
interpret an offline seed fallback as a successful live sync. If chat fails with
`404` on an old model, re-import the catalog and choose the current upstream
channel name. If streaming stalls, inspect the client timeout and account limits
without disabling OmniRoute's normal outbound URL, proxy, or credential safeguards.

## Acceptance and troubleshooting checklist

- **Before testing:** confirm the connection is enabled, its Bearer key belongs to the intended Demon Route account, and the selected model appears in that account's live catalog. Static seeds are not proof of access.
- **Discovery:** use **Import from /models**, then check the imported identifiers without changing their case or the `vendor/model` slash. If the live request fails, distinguish the fallback seed from a successful sync.
- **Chat:** issue a short non-streaming request first, then verify streaming returns valid SSE events and terminates. Client-side timeouts may need to exceed the built-in 120-second upstream timeout.
- **Routing:** check a direct model call before adding it to a combo. Then verify fallback behavior and that client-visible errors, traces, and logs do not disclose the stored provider key.
- **Errors:** troubleshoot `401` by rechecking the key, `402` by checking prepaid balance, `429` by respecting the provider's rate limit, and `404` by re-importing the live model list. Avoid immediate unbounded retries.
- **Costs:** successful live chat tests can be billable. No live account entitlement, upstream refund, quota, or pricing assertions are established by offline tests in this PR.

For broader provider and combo workflows, see the [User Guide](../guides/USER_GUIDE.md).
