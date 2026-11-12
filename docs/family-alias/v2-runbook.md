# Family Alias Auto-Maintainer v2 Runbook

## Current state

Not deployed. The v1 experiment was stopped and rolled back. V2 remains isolated until review and explicit approval.

## Planning

1. Configure explicit connection billing policy (`subscription` only).
2. Run `plan`; retain the signed/hash-verified JSON artifact.
3. Review conflicts, omitted models, endpoint/account identities, probe usage, and target operations.
4. Verify each family contains only its exact lineage.

## Applying

Apply is forbidden without explicit deployment approval.

When approved:

1. Create an OmniRoute DB backup.
2. Re-fetch live state and verify the plan precondition hash.
3. Apply OmniRoute owned subset.
4. Read back and verify.
5. Apply CPA owned subset independently.
6. Read back and verify unrelated entries remain byte-identical.
7. Retain sanitized plan/result evidence.

## Rollback

- Stop the reconciler.
- Restore only v2-owned resources using retained plan/readback artifacts.
- If target consistency is uncertain, restore the OmniRoute DB backup.
- CPA reconciliation never owns unrelated providers/aliases; remove only the dedicated managed provider/channel.

## Alerts

Alert on precondition mismatch, readback mismatch, target partial failure, probe-budget exhaustion, or consecutive plan failures. Never log keys/tokens.
