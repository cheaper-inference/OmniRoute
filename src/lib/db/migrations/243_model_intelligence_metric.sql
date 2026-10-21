-- 243_model_intelligence_metric.sql
-- Add metric column to model_intelligence (e.g. 'artificial-analysis:intelligence',
-- 'artificial-analysis:coding', 'design-arena:elo', 'openrouter:gpqa_diamond', 'arena-ai')
-- so downstream consumers (Free Provider Rankings, UI, AutoCombo) know the exact metric type.
ALTER TABLE model_intelligence ADD COLUMN metric TEXT;
