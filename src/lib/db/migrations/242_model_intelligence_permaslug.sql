-- 242_model_intelligence_permaslug.sql
-- Add original upstream benchmark permaslug (e.g. 'google/gemini-2.5-flash',
-- 'meta-llama/llama-3.3-70b-instruct') to model_intelligence entries so downstream
-- consumers (Free Provider Rankings, UI, AutoCombo) can attribute and verify the
-- benchmark mapping.
ALTER TABLE model_intelligence ADD COLUMN permaslug TEXT;
