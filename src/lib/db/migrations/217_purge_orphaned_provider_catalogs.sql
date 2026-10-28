-- 217_purge_orphaned_provider_catalogs.sql
-- Provider removal migrations delete provider connections in SQL; the ones
-- that don't purge the synced catalog namespace leave their synced catalogs
-- behind: the synced catalog of every removed connection stayed there
-- forever (130, 152, 159 and 162 left five entries behind). This migration
-- drops the leftovers: a store row whose connection no longer exists belongs
-- to no live connection.
--
-- The purge is keyed on the CONNECTION, not on a provider prefix list: a
-- connection that still exists keeps its catalog even when its provider id was
-- renamed. Migration 207 purged the `opencode:` and `oc:` prefixes and so
-- dropped the catalog of the connections it moved to `opencode-zen`; a
-- connection-keyed purge cannot do that.
--
-- The purge drops every row whose key carries a colon, and it keeps the rows
-- whose key carries none: a key without a colon cannot be attributed to a
-- connection, so it is not provably dead. Every key that carries a colon is
-- treated as the catalog of a connection — the shape is `<provider>:<connection>`
-- — so a truncated key (`provider:`, `:conn`, `::x`) goes with the others.
--
-- This migration applies the rule enforced by
-- tests/unit/db/provider-removal-migration-purges-store.test.ts
--
-- Renumbering: this migration takes the number its file name carries. If
-- another migration takes that number before this one lands, this one takes
-- the number that comes right after it, the file name included: the file
-- 217_purge_orphaned_provider_catalogs.sql becomes the same name with that
-- number. The number is written in twelve places, and each of them takes the
-- new number:
--   1. the file name of this migration
--   2. the first line of this header, which repeats that file name
--   3. this paragraph, which quotes the file name in its example: it is
--      rewritten with the new number, and the example it gives then reads the
--      new number followed by the number that comes right after it
--   4. the mention of the version in the rule text that exempts the removals
--      recorded before it (the `discoveryState` namespace), in the header of
--      tests/unit/db/provider-removal-migration-purges-store.test.ts
--   5. the mention of the version in the rule text that opens the
--      connection-keyed requirement, in the same header
--   6. the mention of the version in the rule text that exempts the removals
--      recorded before it (the provider-anchored purge), in the same header
--   7. the mention of the version in the rule text that names the cleanup
--      migration, in the same header
--   8. CLEANUP_MIGRATION_FILE in
--      tests/unit/db/provider-removal-migration-purges-store.test.ts
--   9. RULE_APPLIES_FROM_VERSION in
--      tests/unit/db/provider-removal-migration-purges-store.test.ts
--   10. the file name of the test that carries the number:
--       tests/unit/db/migration-*-purge-orphaned-provider-catalogs.test.ts
--   11. CLEANUP_MIGRATION_FILE in that test file
--   12. CLEANUP_MIGRATION_FILE in
--       tests/unit/db/provider-connection-delete-clears-catalog.test.ts

DELETE FROM key_value
WHERE namespace = 'syncedAvailableModels'
  AND instr(key_value.key, ':') > 0
  AND NOT EXISTS (
    SELECT 1
    FROM provider_connections c
    WHERE c.id = substr(key_value.key, instr(key_value.key, ':') + 1)
  );
