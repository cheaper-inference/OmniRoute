-- Existing summaries cannot prove that all source rows still exist. Preserve
-- them conservatively; new publications opt in while their raw set is complete.
ALTER TABLE usage_daily_summary ADD COLUMN raw_rebuild_safe INTEGER NOT NULL DEFAULT 0;
