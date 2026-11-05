---
title: "Providers — Microsoft 365 Copilot"
version: 3.8.53
lastUpdated: 2026-11-04
---

# Providers — Microsoft 365 Copilot

`copilot-m365-web` (alias `m365copilot`) sends OpenAI-format chat requests through an
authenticated Microsoft 365 Copilot session at `m365.cloud.microsoft/chat`. This is an
unofficial native integration: no separate proxy process or localhost upstream is required.
The provider ID, alias and existing imported connections are unchanged. `copilot-web` is a
different provider for the consumer service at `copilot.microsoft.com`.

> **New to Web Cookie providers?**
>
> Read **`docs/getting-started/WEB-COOKIE-GUIDE.md`** for the general setup process, authentication guidance, limitations, and troubleshooting before following this provider-specific guide.
>
> **For legacy imports:** The credential for this provider is **not a cookie**. Do not copy
> cookies from `m365.cloud.microsoft`. The credential is a WebSocket URL query
> parameter and path segment, both read from the DevTools Network tab.

## Prerequisites

- A Microsoft 365 account with access to Copilot at `m365.cloud.microsoft/chat`
- A Chromium-based browser (Chrome, Edge) for DevTools WebSocket inspection
- Access to the requested model on that account; availability varies by tenant and licence

## Native sign-in (work or school accounts)

Choose **Microsoft 365 Copilot → Connect** and prepare a sign-in attempt. The dashboard uses
an authorization-code flow with PKCE; it does not ask for your Microsoft password or MFA code.

1. Open a **blank browser tab**, then open **DevTools → Network** and enable **Preserve log**.
   Do this before navigating to Microsoft: Windows SSO may finish immediately.
2. Copy the authorization URL shown by the connection dialog and navigate to it in that
   prepared tab. Complete Microsoft's account selection or MFA if requested.
3. In the preserved Network log, find the request to
   `https://login.microsoftonline.com/common/oauth2/nativeclient` and copy its full **Request URL**.
4. Paste that URL into the connection dialog and connect. Do not paste a raw code or the final
   `wrongplace` address-bar URL: the required callback is a transient navigation.

Each attempt expires after ten minutes and can be used only once. The server checks its
state, PKCE verifier and reauthentication target before exchanging the code. After expiry or
an exchange failure, start a new attempt. An attempt cannot survive a server restart.

Tokens use the existing connection credential store and refresh path. Reauthenticating a
connection requires the same Microsoft tenant/object identity, not merely the same email.
It preserves operator naming/settings and replaces obsolete imported credentials. Native
sign-in is for work/school accounts; the legacy import path remains available for existing
connections and supported tier configurations.

The full callback URL is a one-time credential. Never include it in screenshots, logs,
support messages or commits. This flow does not open a browser on the server, inspect your
browser history, or start a local callback server.

## Credential capture (WebSocket method)

1. Sign in at `https://m365.cloud.microsoft/chat` and start a conversation.
2. Open **DevTools → Network**.
3. Filter by **WS** (WebSocket).
4. Click the Chathub WebSocket connection. Look for a URL beginning with
   `wss://substrate.office.com/m365Copilot/Chathub/`.
5. From its **Request URL**, copy:
   - The `access_token` query parameter value (a short-lived JWT).
   - The Chathub path segment after `/Chathub/` (e.g. `<oid>@<tenant>`).

The full URL has the form:

```
wss://substrate.office.com/m365Copilot/Chathub/<oid>@<tenant>?...&access_token=<jwt>
```

6. In OmniRoute, select **Microsoft 365 Copilot**, choose the legacy API-key/import option,
   and paste the credential in the format:

```
access_token=<jwt>; chathubPath=<oid>@<tenant>
```

7. Click **Test Connection** and **Save**.

## Credential capture (HAR import)

Instead of manually copying values from the WebSocket URL, you can export a DevTools HAR
file:

1. Open **DevTools → Network**.
2. Start or continue a Microsoft 365 Copilot conversation (this triggers the WebSocket connection).
3. Right-click in the Network panel and select **Save all as HAR with content**.
4. In OmniRoute, use the **Import .har file** button on the provider connection dialog.

OmniRoute scans the HAR for the Chathub WebSocket URL, extracts the
`access_token` and `chathubPath`, and populates the credential fields automatically. The
HAR import decodes the JWT expiry and shows the remaining token lifetime.

> **Never commit a real HAR export, access token, or refresh token.** Test and
> documentation values must always be placeholders.

## Token lifetime and refresh

The `access_token` is short-lived (typically **~75 minutes**). Without a usable refresh
token, you must re-capture the credential after expiry.

### Automatic refresh with `refreshToken`

In the Microsoft 365 provider's **Add connection** or **Edit connection** dialog, open
**Advanced Settings → Refresh token (optional)**. Paste a Microsoft OAuth refresh token
for the `substrate.office.com/sydney` scope and save. The input is masked and never
prefilled with the stored token. When editing, leave it blank to keep the existing token;
paste a new token to replace it.

Native sign-in acquires the refresh token when Microsoft returns one. For legacy imports,
use an existing compatible Microsoft authorization-code grant; this provider does not
implement or promise a device-code flow.
With a refresh token configured, OmniRoute checks the `access_token` before requests
and refreshes it only when it needs refreshing. A successful refresh also persists
the rotated refresh token, avoiding manual re-capture while the refresh token remains valid.

If `refreshToken` is not set, you must re-capture the WebSocket credential manually
after each expiry.

### Tier selection

| Tier         | Alias       | Surface                |
| ------------ | ----------- | ---------------------- |
| `individual` | _(default)_ | Consumer M365 Copilot  |
| `edu`        | `included`  | Education M365 Copilot |
| `enterprise` | `work`      | M365 Copilot for Work  |

Set the tier in **Advanced Settings → Copilot tier**. Native sign-in does not set it, so a
work account must select `enterprise` (alias `work`) and an education account `edu`, also when
using documented model IDs: those select their own tone, scenario and licence type, but the
agent and invocation options still come from the tier, and the individual defaults can fail on
a work tenant. Changing the tier does not grant a model licence. Explicit advanced protocol overrides
take precedence and should only be used when you know the required wire values.

## Models and routing

The native catalog includes all documented standalone IDs plus the four original native IDs.
The catalog is static, not an account entitlement probe. The standalone proxy's
**Import from /models** instructions do not apply to this native WebSocket provider.

| Model family      | Canonical IDs                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Automatic         | `m365-copilot`                                                                                   |
| GPT-5.5 / GPT-5.6 | `gpt-5.5`, `gpt-5.5-think-deeper`, `gpt-5.6`, `gpt-5.6-think-deeper`                             |
| Earlier GPT       | `gpt-5.4`, `gpt-5.4-quick`, `gpt-5.3`, `gpt-5.3-think-deeper`, `gpt-5.2`, `gpt-5.2-think-deeper` |
| GPT-6             | `gpt-6-think-deeper`, `gpt-6-sol`, `gpt-6.1-sol`                                                 |
| Claude Sonnet     | `claude-sonnet`, `claude-sonnet-think-deeper`, `claude-sonnet-5`, `claude-sonnet-5.5`            |
| Claude Opus       | `claude-opus`, `claude-opus-4.8`                                                                 |

Aliases such as `auto`, `quick`, `think-deeper`, and version aliases are also registered.
The existing `copilot-m365`, `copilot-m365-claude-opus`,
`copilot-m365-gpt-5-6-reasoning` and `copilot-m365-gpt-5-5-chat` remain valid.
Registration is not a promise that Microsoft serves that model to every account.

- An explicit model licence refusal returns **403** `m365_model_not_licensed`, not 502.
  Routing locks that connection/model pair, leaving licensed models on the connection usable.
- `InvalidCopilotLicense` is an account-level licence refusal, reported separately as
  `m365_account_not_licensed`.
- A per-user throttle returns **429** `m365_throttled` and cools down the connection.
  Priority-access exhaustion returns **429** `priority_access_exhausted` and is model-scoped.
  Supplied retry hints are preserved; a missing reset is not advertised as a known reset time.
- A Copilot safety refusal (`Disengaged`) returns **400** `provider_safety_rejection`, the
  shared provider safety-stop label. It never counts against the connection's health, client
  SDKs do not retry a 400, and with `PROVIDER_SAFETY_STOPS_TERMINAL` enabled combo routing
  stops there instead of replaying the request against another target.
- Requests on one connection are serialized through the existing account semaphore. Prefer
  priority fallback rather than parallel panels; serialization alone does not eliminate
  Microsoft's conversation-rate limits.

## Request behavior and limits

- Tools are **prompt-emulated**, not native Microsoft function calls. A tool-enabled request
  uses one buffered generation; it does not spend another generation selecting tools.
  Only declared tools with valid supported argument shapes are returned as calls.
- A long structured answer with a single trailing example is preserved as prose. This is a
  heuristic, not proof of intent; applications must still enforce their own tool permissions.
- This native integration is **text-only**. Images and other non-text message parts are
  rejected explicitly, not silently dropped. Image upload in the separate proxy is not a
  capability of this provider.
- Each request starts a fresh upstream conversation and replays the supplied message history.
  There is no cache keyed on the first user message, which could mix independent callers.
  This consumes more upstream conversation starts than a persistent-thread integration;
  avoid rapid fan-out or long unattended tool loops on constrained accounts.
- A turn has a 120-second idle deadline and a bounded overall deadline. Final-only answers,
  progress filtering and cancellation are handled by the native transport/composer.
- Before any content, licence/throttle failures retain HTTP 403/429 even when streaming was
  requested. After content starts, failures are SSE error events, never a successful finish.
  An upstream rewrite that cannot be represented by append-only streaming is an explicit
  stream error; non-streaming and buffered tool responses retain the final text.

## Security model

- **Unofficial integration.** This provider reverse-engineers the BizChat WebSocket
  protocol. It may break without notice when Microsoft changes the endpoint.
- The `subscriptionRisk: true` flag reflects that the integration relies on an
  undocumented endpoint. Account restrictions are possible but not confirmed.
- The access token is a short-lived JWT. Treat it like a password: do not commit,
  log, or share it.
- The refresh token grants ongoing access to the Microsoft 365 surface. Store it with the
  same care as an API key.

## Troubleshooting

### Authentication fails immediately

- Verify you copied from the **WebSocket URL**, not from an XHR/Fetch request. The
  credential is in the `access_token` query parameter of the Chathub WebSocket
  connection — not in an `Authorization: Bearer` header.
- Ensure the `chathubPath` includes the full `<oid>@<tenant>` segment from the URL
  path.

### Token expires after ~75 minutes

This is expected. Without a `refreshToken`, the access token is short-lived. Either:

- Re-capture the credential from DevTools, or
- Configure **Advanced Settings → Refresh token (optional)** in the Add or Edit
  connection dialog for automatic refresh.

### Test Connection passes but chat returns 401

The token may have expired between validation and the first request. Re-capture a
fresh credential.

### Copilot does not appear in the provider list

Ensure `copilot-m365-web` is enabled in **Dashboard → Providers**. The provider may
be hidden by default in some tiers.

## References

- Issue: [#12779](https://github.com/diegosouzapw/OmniRoute/issues/12779)
- Discussion: [#12756](https://github.com/diegosouzapw/OmniRoute/discussions/12756)
- Source: `src/shared/constants/providers/web-cookie.ts` (provider definition)
- HAR import: `src/shared/utils/m365HarImport.ts`
- Credential fields: `src/shared/providers/webSessionCredentials.ts`
- Tier modal: `src/app/(dashboard)/dashboard/providers/[id]/components/modals/m365Tier.ts`
