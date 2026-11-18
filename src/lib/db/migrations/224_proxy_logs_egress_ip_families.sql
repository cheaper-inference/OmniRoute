-- The address observed for each address family, one column per family: a tunnel
-- exposes one address per family, so measuring one family leaves the other
-- unknown. A NULL column means that family was not observed — never "no
-- address". No index by design, like egress_ip: these columns are read with
-- the rows that carry them, not queried on their own.
ALTER TABLE proxy_logs ADD COLUMN egress_ip_v4 TEXT;
ALTER TABLE proxy_logs ADD COLUMN egress_ip_v6 TEXT;
