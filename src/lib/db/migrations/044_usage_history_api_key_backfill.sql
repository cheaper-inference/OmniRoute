-- Usage History API Key Backfill
-- Backfills missing API key names and IDs in usage_history using the connection_id.
--
-- The most used name (and id) of each connection is computed once per connection into
-- a temp table, then joined to the rows that miss it. The old form ran two correlated
-- GROUP BY / ORDER BY subqueries per missing row, so the cost grew with the missing
-- rows times the history of their connection. The result is the same: the most used
-- non-empty value wins, a count tie goes to the greater value, the name and the id are
-- picked independently, and a connection with no value anywhere is left as it was.

DROP TABLE IF EXISTS temp.uh044_name;
DROP TABLE IF EXISTS temp.uh044_id;

CREATE TEMP TABLE uh044_name AS
SELECT connection_id, api_key_name
FROM (
  SELECT connection_id, api_key_name,
         ROW_NUMBER() OVER (
           PARTITION BY connection_id ORDER BY COUNT(*) DESC, api_key_name DESC
         ) AS rank
  FROM usage_history
  WHERE connection_id IS NOT NULL AND api_key_name IS NOT NULL AND api_key_name != ''
  GROUP BY connection_id, api_key_name
)
WHERE rank = 1;

CREATE TEMP TABLE uh044_id AS
SELECT connection_id, api_key_id
FROM (
  SELECT connection_id, api_key_id,
         ROW_NUMBER() OVER (
           PARTITION BY connection_id ORDER BY COUNT(*) DESC, api_key_id DESC
         ) AS rank
  FROM usage_history
  WHERE connection_id IS NOT NULL AND api_key_id IS NOT NULL AND api_key_id != ''
  GROUP BY connection_id, api_key_id
)
WHERE rank = 1;

CREATE INDEX temp.uh044_name_connection ON uh044_name(connection_id);
CREATE INDEX temp.uh044_id_connection ON uh044_id(connection_id);

UPDATE usage_history
SET
  api_key_name = (
    SELECT api_key_name FROM uh044_name WHERE uh044_name.connection_id = usage_history.connection_id
  ),
  api_key_id = (
    SELECT api_key_id FROM uh044_id WHERE uh044_id.connection_id = usage_history.connection_id
  )
WHERE (api_key_name IS NULL OR api_key_name = '')
  AND connection_id IS NOT NULL;

DROP TABLE temp.uh044_name;
DROP TABLE temp.uh044_id;
