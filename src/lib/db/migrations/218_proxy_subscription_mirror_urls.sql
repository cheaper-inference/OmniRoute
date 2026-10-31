-- 218_proxy_subscription_mirror_urls.sql
-- Optional extra feed URLs for proxy subscriptions: one subscription can
-- ingest its primary `url` plus up to five mirror feeds. Each mirror is
-- validated and isolated per source: a failing mirror only skips its own
-- nodes while the other feeds still render.
--
-- Purely additive: no backfill, no index, existing rows read NULL (no
-- mirrors, single-feed behavior unchanged).

ALTER TABLE proxy_subscriptions ADD COLUMN mirror_urls TEXT;
