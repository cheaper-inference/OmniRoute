-- Per-compression-combo output styles (issue #18097). JSON array of
-- { id, level } consumed by open-sse/services/compression/outputStyles.
-- Empty means "inherit the global Compression Engine panel selection".
ALTER TABLE compression_combos ADD COLUMN output_styles TEXT DEFAULT '[]';
