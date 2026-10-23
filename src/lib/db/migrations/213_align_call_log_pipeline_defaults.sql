-- The logging defaults were seeded twice with opposite values: migration 014
-- wrote settings.call_log_pipeline_enabled='false' for the request hot path,
-- while migration 046 wrote databaseSettings.callLogPipelineEnabled='true' for
-- the dashboard. The panel therefore reported detailed logging as enabled while
-- the request path never recorded anything.
--
-- Remove the duplicated rows instead of rewriting them: absence means "never
-- configured", so DEFAULT_DATABASE_SETTINGS answers for the dashboard and the
-- flat setting keeps answering for the hot path. Once an operator saves the
-- panel, updateDatabaseSettings writes both surfaces and they stay in step.
DELETE FROM key_value
WHERE namespace = 'databaseSettings'
  AND key IN (
    'callLogPipelineEnabled',
    'detailedLogsEnabled',
    'logs.callLogPipelineEnabled',
    'logs.detailedLogsEnabled'
  );
