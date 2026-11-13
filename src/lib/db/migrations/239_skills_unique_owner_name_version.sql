-- Migration 239: one skill row per (api_key_id, name, version).
--
-- skillRegistry.register() inserted a new row on every call, so installing the same
-- skill twice left duplicate rows, and unregister() removed only one of them.
-- register() is now an upsert on this key. A unique index needs the old duplicates
-- gone first: keep the newest row per key (latest updated_at, then created_at, then
-- insert order) and move the run history of the removed rows to the kept row before
-- the delete, because skill_executions.skill_id is ON DELETE CASCADE.
-- Safe to re-run.

DROP TABLE IF EXISTS temp.skills_239_keep;
CREATE TEMP TABLE skills_239_keep AS
SELECT id,
       FIRST_VALUE(id) OVER (
         PARTITION BY api_key_id, name, version
         ORDER BY julianday(updated_at) DESC, julianday(created_at) DESC, rowid DESC
       ) AS keep_id
FROM skills;

UPDATE skill_executions
SET skill_id = (SELECT keep_id FROM temp.skills_239_keep WHERE id = skill_executions.skill_id)
WHERE skill_id IN (SELECT id FROM temp.skills_239_keep WHERE id <> keep_id);

DELETE FROM skills WHERE id IN (SELECT id FROM temp.skills_239_keep WHERE id <> keep_id);

DROP TABLE temp.skills_239_keep;

CREATE UNIQUE INDEX IF NOT EXISTS idx_skills_owner_name_version
  ON skills(api_key_id, name, version);
