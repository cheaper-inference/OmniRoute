---
title: "OmniRoute + Neon Durability"
version: 3.8.52
lastUpdated: 2026-10-05
---

# OmniRoute + Neon durability

## Deployment model

OmniRoute remains a SQLite-native application at runtime. This is intentional: the project has a large, mature SQLite schema and migration system, and replacing it with PostgreSQL would require a separate database-porting project.

When `DATABASE_URL` is configured, the deployment gains a Neon durability layer:

1. The container starts with `DATA_DIR=/app/data`.
2. If `storage.sqlite` is absent, the newest compressed SQLite snapshot is restored from Neon.
3. OmniRoute runs its normal SQLite migrations and health checks.
4. A background job periodically creates a consistent SQLite backup, dumps it, compresses it, and stores it in Neon.
5. Only the configured number of recent snapshots are retained.

The snapshot table is:

```text
omniroute_sqlite_snapshots
```

It is created automatically on first use. No Neon schema migration has to be run manually.

## Required deployment secret

Set the complete Neon connection string as the runtime secret:

```text
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

Do not commit the value to the repository, `.env.example`, Dockerfile, GitHub workflow, or logs. For GitHub Actions, use a repository/environment secret and inject it into the backend deployment.

If a live database password has ever been pasted into source control, an issue, a chat transcript, or a CI log, rotate that password before production deployment.

## Configuration

```text
DATABASE_URL=...
OMNIROUTE_NEON_PERSISTENCE=1
OMNIROUTE_NEON_SNAPSHOT_INTERVAL_MS=300000
OMNIROUTE_NEON_SNAPSHOT_RETENTION=12
```

Set `OMNIROUTE_NEON_PERSISTENCE=0` to disable the integration even when `DATABASE_URL` is present.

## Operational commands

```bash
npm run neon:ensure
npm run neon:snapshot
npm run neon:restore
```

The Docker image includes the `sqlite3` and `psql` clients required by the durability helper.

## Important boundary

This is **durability**, not a PostgreSQL query adapter.

The live request path still uses SQLite. Neon therefore acts as the cloud source of truth for recovery snapshots, not as a multi-writer transactional database. Multiple simultaneously active OmniRoute instances should not share this snapshot stream as if it were a replicated database.

That boundary keeps this change safe and reversible. A future PostgreSQL-native backend can be built behind the existing persistence interfaces without pretending that a connection string alone converts SQLite SQL into PostgreSQL SQL.

## GitHub Pages

GitHub Pages can host static frontend assets, documentation, or a dedicated static shell. It cannot execute the OmniRoute Node.js backend or provide the Neon connection server-side.

The production topology should therefore be:

```text
GitHub repository
      |
      +--> GitHub Actions --> static frontend / Pages
      |
      +--> GitHub Actions --> Docker image / backend runtime
                                  |
                                  +--> Neon Postgres
                                  |
                                  +--> transient SQLite runtime
```

The `DATABASE_URL` secret must only reach the backend runtime. It must never be exposed as a `NEXT_PUBLIC_*` variable or embedded into the Pages bundle.
