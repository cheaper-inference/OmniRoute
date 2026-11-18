# OmniRoute Provider Failover

Failures are classified before retry decisions are made.

Transient failures such as timeouts, network errors, rate limits, and provider 5xx responses may fail over. Exhausted quota or credit (a quota 429, or 402 Payment Required) is never retried on the same provider but does fail over to another one, whose quota is separate. Authentication errors, permission errors, invalid requests, unavailable models, and unknown failures are not retried blindly.

The default cross-provider policy allows up to three provider attempts, retries rate limits and timeouts, fails over on exhausted quota, and keeps administrative disablement separate from temporary circuit state.

## Where it applies

- **Combos** fail over between their targets according to the combo's own strategy and settings.
- **A bare model id** (no `provider/` prefix) that several active providers serve, with no combo of that exact name, is first sent to the provider inference picks. If that attempt fails in a way the policy fails over on, the same request is sent to the next active provider that serves the id. The response carries `x-omniroute-fallback-attempts` with the number of providers tried before the one that answered.
  - Each alternate is authorized exactly as if inference had picked it. A target the API key blocks or does not admit is skipped without an upstream call, and the client gets the real upstream error, not a policy rejection for a target it never named.
  - Only a failed response moves on: nothing fails over after the first streamed byte.
  - The emergency fallback model swap applies only after every provider of the requested model has failed.
  - A request pinned to a connection (`x-omniroute-connection`) stays on it.
  - A prefixed id (`provider/model`) is never rerouted to another provider.

Circuit states are `closed`, `open`, and `half_open`. A cooldown schedules a bounded probe; a successful probe closes the circuit and a failed probe reopens it.
