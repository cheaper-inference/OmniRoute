// The legacy marker is conservative; field evidence also covers mixed receipts.
export const ESTIMATED_USAGE_SQL = `CASE WHEN usage_provenance = 'estimated' OR
  EXISTS (SELECT 1 FROM json_each(CASE WHEN json_valid(usage_evidence) THEN usage_evidence ELSE '{}' END)
    WHERE json_extract(value, '$.source') = 'estimated') THEN 1 ELSE 0 END`;
export const UNKNOWN_USAGE_SQL = `CASE WHEN usage_evidence IS NULL THEN 1 ELSE 0 END`;
