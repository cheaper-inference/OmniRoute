# Recurring free catalog evidence

This gate implements the gradual migration approved for #17028. It checks the
`recurring-uncapped` rows in `open-sse/config/freeModelCatalog.data.ts`. It does not
change routing or turn a source record into a runtime billing guarantee.

Run with Node 24:

```sh
npm run check:free-catalog-evidence -- --base-ref <reviewed-base-commit>
node --test tests/unit/build/free-catalog-evidence.test.mjs
```

Both CI workflows run the gate in their change-classification job, before optional
fast paths and dependency installation. Pull requests supply their exact base SHA;
merge groups supply their base SHA and pushes supply the event's `before` commit.
These three events fail if their base is missing; dispatch runs are current-state audits.
An absent or unreadable base fails; it is not a reason to skip the check. Locally,
without an explicit base, HEAD is used. For a committed change, always pass the
reviewed base to verify the shrinking-debt constraint across commits.

## Evidence records

`free-catalog-evidence.json` gives each active uncapped row exactly one disposition:
a source record in `evidence`, or an exact identity in the remaining `debt` list.
An evidence record includes provider, model ID, economics fingerprint, source URL,
source type, check date, reviewer, the recurring-free-access claim, a source summary
and limitations. The URL must be HTTPS without embedded credentials. Dates cannot
be invalid or in the future. Console verification must use a public landing URL
and a nonsensitive summary; never commit account URLs, tokens or screenshots with
credentials. A free-weights license or a different regional endpoint is not proof
of free API access for this row.

The gate verifies traceability and schema, not the truth or continued availability
of upstream claims. Reviewers must read the cited source for the exact provider,
model and conditions. No numeric monthly cap published means unknown, not unlimited
capacity. Record quotas, regional restrictions and billable optional features in
limitations. Recheck sources when economics change or contradictory evidence arrives.

## Shrinking legacy debt

`free-catalog-legacy-seed.json` is the immutable bootstrap captured from commit
40523566e611838978835adbb6b84cda99602504. Its canonical JSON hash is pinned by the CLI.
It records historical identities and economic fingerprints; it is not free-access
evidence. Do not add entries or regenerate the seed to make a gate pass.

A debt entry must be in that seed, retain its original economics, and already be in
the base commit's debt. Debt cannot grow or return after audit. Removing or changing
a row also requires removing its stale debt. To discharge a row, add verified
metadata and remove its debt entry together. If a row is paid or discontinued,
prepare the corresponding catalog correction with its own tests; don't invent a
source or downgrade it to another free regime to evade this policy.

## Audit batches

The executable ledger is the source of counts. Audit providers independently:

1. GLM international and China: verify exact IDs, endpoint, pricing, aliases and
   retirement notices separately. The first batch must not infer a CN alias from
   a similar dated model ID or transfer CN conditions to international Z.AI.
2. Gemini and Ollama Cloud: verify each model's free eligibility and account limits;
   plan-level free credits alone do not prove eligibility of every catalog model.
3. Kilo, Requesty and Routeway: reconcile exact model IDs with current official
   catalogs and input/output prices, including temporary promotions.
4. Baidu, Tencent, Agnes/Agnes-CN, AINative, Aion and SEA-LION: confirm current
   hosted API access, region/account conditions and whether signup credit expires.
5. OpenCode legacy rows: first reconcile the removed-provider policy before any
   eligibility claim or reintroduction. The ledger grants no permission to restore
   a provider removed at its operator's request.

Keep #17028 open until its remaining acceptance criteria and integrations are met.
The separate discovery/cache repair #17121 does not complete this catalog audit.
