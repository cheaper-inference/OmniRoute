---
title: "Native decision models"
version: "3.8.53"
lastUpdated: "2026-10-27"
---

# Native decision models

Decision models answer bounded, typed questions instead of generating a chat response.
They have a separate native endpoint, model capability and dashboard editor. Adding a
decision model does not make it usable through chat completions, embeddings or a smart
routing strategy.

## Connect and discover

1. Configure the provider through the normal Providers dashboard. Native requests reuse
   that connection's credential store, outbound restrictions and proxy configuration.
2. Select an active connection and use **Discover decision models**, then **Import
   decision models**, where that provider publishes a supported catalog. Discovery reads
   metadata; it does not run inference. Import updates only that connection's inventory
   and preserves other accounts, custom models and ordinary model capabilities.
3. In Models, select the **Decisions** type. The model and endpoint editors also support
   decision metadata. A registered adapter, a documented model and a configured account
   are different facts; none establishes account entitlement or a successful request.

`GET /v1/models?kind=decision` reads local imported/custom metadata and documented model
entries for eligible configured connections. It makes no provider request. `decisions`
and `systemone` are accepted filter aliases; the canonical model kind is `decision` and
the canonical supported endpoint is `systemone`.

`GET /v1/systemone/models` deliberately reads eligible remote native catalogs. Its
status distinguishes complete, partial and unavailable discovery. Providers without a
verified catalog URL do not receive a guessed discovery request. Their documented
model entries can be selected locally, or an operator can add a documented model.
Fireworks deployment names must be supplied by the operator; they are not invented.

Public IDs include the serving provider, for example
`openrouter/cloudflare/clef` or `deepinfra/Cloudflare/clef`. The first component selects
the credential/billing provider; a model author's name is not an account destination.
Provider-qualified IDs round-trip without changing providers. Mixed chat/decision models
retain both capabilities; a native-only refresh does not remove proven chat support.

## Run a standalone decision

Open Endpoint → **Decisions**, load the client-key list and select a client key. **Load
saved decision models** reads the local inventory; **Discover decision models** explicitly
contacts provider catalogs. Select a model, enter text state and question instructions,
then choose Noul, Choice or Score. The editor builds one named question. Nothing runs
automatically on opening the page, choosing a model or editing the form.

**Run decision** sends the state and question to the selected provider and may incur
charges. Cancel stops subsequent work and aborts the active request where supported;
it cannot undo work already accepted by a provider. Drafts and key secrets are not saved
in browser storage by this editor. Normal server/provider retention policies still apply.

The API accepts batches and structured JSON state within each adapter's supported subset:

```http
POST /v1/systemone
Authorization: Bearer <your-client-key>
Content-Type: application/json

{
  "model": "typesafe/jev-1.14.0",
  "state": "The lamp is on.",
  "questions": {
    "lamp_on": {"type": "noul", "instructions": "Is the lamp on?"}
  }
}
```

- **Noul** returns a probability in `[0, 1]`.
- **Choice** selects from the caller's option keys and preserves the reported distribution.
- **Score** uses an ordered rubric and may return a fractional score.

Question names, refusal outcomes, zero values and missing values retain their meaning.
Confidence is a provider field, not measured accuracy or permission to perform an action.
Unsupported options and malformed responses do not trigger an ordinary-chat substitute.

## Provider contracts

The registered native lane includes TypeSafe, OpenRouter, Vercel's TypeSafe-compatible
API, DeepInfra, direct OpenAI Decisions, Liquid, Perplexity, Inception, Baseten, Fireworks
and the optional OpenCode Console adapter. Registration is contract support, not live
authentication, availability or entitlement evidence.

TypeSafe, OpenRouter, Vercel compatibility, DeepInfra and the five additional hosted
adapters use explicit System One request contracts. Direct OpenAI uses its distinct
`/v1/decisions` upstream contract through a codec. An OpenRouter model identifier is not
substituted for a direct vendor identifier. Each provider keeps its own destination,
authentication, limits and model rules. Baseten's documented Api-Key authentication
variant is selected explicitly; no authentication-scheme retry occurs.

OmniRoute also exposes `POST /v1/decisions`: the named OpenAI-shaped
predicate/choice/score text/JSON subset. It delegates once, in process, to the same native
admission, dispatch and accounting service. Use a provider-qualified model such as
`openai/gpt-6-luna`. This route is a conversion, not a URL alias for different JSON.
String choices and labeled score levels are supported; image input, conversation/tool
histories, caching controls and arbitrary complex instructions explicitly reject.

The standalone editor uses text state. Images, Inception extraction and additional
vendor options are outside this integration's advertised subset. The five additional
hosted adapters reject recognized framed media inputs before dispatch. Vendor image
capabilities shown in catalog metadata do not mean that this gateway adapter supports
them. Limits displayed by OmniRoute can be stricter local guards, not vendor limits;
conflicting DeepInfra Drex Max documentation is handled with a conservative local bound.

## Admission, recovery and accounting

Client-key endpoint/model/connection policy is checked before every physical attempt,
then refreshed after a capacity wait. The selected provider connection is also checked
again: deletion, disabling, relevant policy or identity changes stop stale dispatch.
An exact model and provider cannot be replaced by a suggestion or an error response.

The current default stops on access, entitlement, billing and rate/quota denials.
Generic HTTP429 does not establish account-specific quota exhaustion. Transient service
recovery is bounded by the existing attempt and dispatch-deadline limits, honors
cancellation and accounts for each physical attempt. Provider-qualified IDs prevent
cross-provider alias fallback. A free variant never becomes a paid model fallback.
Zen free access still requires explicit opt-in; ordinary OpenRouter credentials can
address an exact free SKU without pretending to be a different client or account.

Reported USD charges, including genuine zero, are preserved separately from estimates.
Absent cost is unknown, not free. Dedicated decision tariffs do not inherit a chat or GPU
deployment tariff merely because a model name matches. Catalog prices identify their
source and units; incomplete or incompatible prices remain unknown.

Usage views label incomplete native cost coverage as a known subtotal and unknown-cost
request count. Unallocated API-key ledger amounts stay separate and are not added twice.
Unknown native history is retained instead of being converted to a fabricated zero
archive. Token-based estimates use the current compatible pricing configuration and are
not a provider invoice. Existing client-key limits are best-effort admission/accounting,
not a provider-enforced dollar ceiling or a new crash-safe reservation system.

The native API uses current server timestamps and positive retention intervals. Arbitrary
backdated partial imports into already deleted historical groups lack legacy archive
identities; exact reconciliation of those imports is not claimed. Legacy JSON migration
also does not preserve every native endpoint/billing field. Neither is an authoritative
native billing replay.

Native decision inference works independently of automatic chat model/effort routing.
This integration does not enable smart routing, alter ordinary routing defaults or
establish model-selection quality.
