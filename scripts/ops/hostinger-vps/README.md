# OmniRoute on the fitoway.tech VPS

This deployment uses Ubuntu 24.04, Node.js 22.23.4, native better-sqlite3 and SWC,
Next.js standalone, systemd, Nginx and Let's Encrypt. No additional paid service
is required. The source base is `hostinger-build-compatibility` at
`243ab58bdfd3d2ba493e2529806bfaad7be71afe`. The original release branch is unchanged.

## Paths and access

- Source: `/opt/omniroute`; immutable bundles: `/opt/omniroute-releases`.
- Active bundle: `/opt/omniroute/current` (symlink).
- Persistent SQLite files and runtime state: `/var/lib/omniroute`.
- Environment: `/etc/omniroute/omniroute.env`, root:omniroute, mode 0640.
- Initial dashboard password: `/etc/omniroute/initial-admin-password`, root-only.
  Read it over your authenticated SSH connection in your own terminal; do not
  paste it into an issue or chat. Change it in dashboard security settings.
- Backups: `/var/backups/omniroute`, root-only, containing private configuration
  and encryption keys. Keep those keys with the database when restoring.
- Build/install logs: `/var/log/omniroute`; runtime: `journalctl -u omniroute`.

`OMNIROUTE_HOSTNAME=127.0.0.1` is required: the standalone launcher derives
`HOSTNAME` from this variable. Setting only `HOSTNAME` is overridden.

The application runs as the unprivileged `omniroute` user on 127.0.0.1:20128.
Nginx terminates TLS and rebuilds forwarding headers from the client connection.
API keys and dashboard login are required. Firewall ingress allows TCP 22/80/443
on IPv4 and IPv6. SSH passwords are disabled; the x230 Ed25519 key is retained.
The Hostinger web console remains the recovery path.

## Build a candidate without changing live code

Use an isolated worktree under `/opt/omniroute/.claude/worktrees/`, following
`AGENTS.md` and `docs/ops/WORKTREE_ISOLATION.md`. Fetch the selected commit first;
never move the original release branch. In the candidate worktree, as omniroute:

```sh
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci --no-audit --no-fund
NEXT_TELEMETRY_DISABLED=1 NEXT_DIST_DIR=.build/next OMNIROUTE_USE_TURBOPACK=0 \
NEXT_PUBLIC_BASE_URL=https://fitoway.tech NODE_OPTIONS=--max-old-space-size=8192 \
npm run build
```

SWC stays native. Do not set `OMNIROUTE_BETTER_SQLITE3_STUB` or
`OMNIROUTE_BUILDING` in the production environment. The build's own temporary
SQLite stub is intentional and is not the production database implementation.
Do not update dependency versions or the lockfile as part of routine deployment.
Check the build exit status and the generated `server.js`, `server-ws.mjs`,
`dev/run-standalone.mjs`, `.build/next/static`, `public` and native SQLite dependency.
Copy the complete standalone directory to a NEW directory under
`/opt/omniroute-releases`, then set its owner to root (read/execute for the service).
Do not compile over an active bundle or copy production environment files into it.

## Activate, check and roll back

As root, activate a fully built candidate:

```sh
/usr/local/sbin/omniroute-activate /opt/omniroute-releases/RELEASE
systemctl status omniroute --no-pager
curl --fail https://fitoway.tech/api/health/ping
journalctl -u omniroute -n 80 --no-pager
```

The activation script takes and restore-tests a backup, switches the symlink,
restarts systemd and requires database readiness. On a failed startup it restores
the previous code symlink when one exists. The previous path is also recorded in
`/etc/omniroute/previous-release` after a successful activation. Backups and old
bundles are retained; no automatic deletion is configured.

Database migrations may be incompatible with old code. A code rollback alone
cannot undo migrations: before a downgrade, inspect the migration compatibility
and restore the matching database AND secret configuration from the pre-update
backup if needed. Preserve the current state separately before any manual restore;
never overwrite live data while the service is running.

## Backups, restoration and monitoring

```sh
/usr/local/sbin/omniroute-backup
systemctl status omniroute-backup.timer --no-pager
journalctl -u omniroute-backup.service --no-pager
systemctl status certbot.timer --no-pager
certbot renew --dry-run
```

The backup timer runs daily around 03:30 America/Sao_Paulo (up to 15 minutes of
jitter). Every archive snapshots each SQLite database through SQLite's online
backup API, includes `/etc/omniroute`, extracts into a fresh private temporary
directory and runs `PRAGMA integrity_check` on all restored databases. Independent
databases are consistent individually; they do not share one transaction boundary.
Caches and old runtime backup directories are excluded.

Archives contain `data/`, `config/` and a release manifest. For a manual restoration,
stop omniroute, extract a selected archive into a private staging directory, verify
SQLite integrity, preserve the current data/config elsewhere, install the restored
`data/` at `/var/lib/omniroute` and `config/` at `/etc/omniroute`, restore ownership
(data: omniroute; configuration: root:omniroute, 0640; initial password: root, 0600),
select its matching release and start the service. Check login and database readiness.
The backup program's isolated restore test never overwrites production data.

These backups are local to this VPS. To survive total VPS loss, copy an archive
to an existing private off-server location; no paid storage has been provisioned.
Monitor disk usage because archives and old releases are deliberately retained.

The service is enabled at boot, restarts on failures and uses its built-in systemd
watchdog (180 seconds). Secrets and SQLite data stay outside the immutable bundle.
Let's Encrypt renewal is scheduled; its deploy hook validates and reloads Nginx.
Native WebSocket upgrades and SSE are supported by the wrapper and Nginx config.
Provider generation requests require your own provider credentials; deployment
checks do not spend external API credits.

Runtime WebSocket discovery uses `LIVE_WS_PUBLIC_URL=wss://fitoway.tech/live-ws`
and `LIVE_WS_ALLOWED_ORIGINS=https://fitoway.tech`. The internal live event server
remains loopback-only; the standalone wrapper relays its upgrades.

The optional Arena ELO synchronizer returned HTTP 404 from its external leaderboard
on the deployment date. `ARENA_ELO_SYNC_ENABLED=false` disables only that optional
ranking refresh; provider configuration and inference routing remain available.
