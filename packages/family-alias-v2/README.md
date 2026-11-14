# Family Alias Auto-Maintainer v2

Dry-run-first reconciler for exact model-family aliases.

## Safety

- Default command is `plan`.
- `apply` requires a saved, hash-verified plan artifact.
- Only resources marked `managed-by:family-alias-maintainer/v2` are mutable.
- models.dev is metadata only.
- Only explicitly configured subscription entitlements are routable.
- No cross-family fallback.

This package is not deployed. Deployment requires Task 9 verification and explicit approval.
