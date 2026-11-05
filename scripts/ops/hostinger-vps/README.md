# VPS service operations

These templates support running the standalone application behind Nginx with systemd, private environment configuration, SQLite backups and release activation.

Adapt all hostnames and paths to the target environment. Generate unique credentials outside the repository. Keep populated environment files, backup archives, recovery instructions and infrastructure inventories private.

The backup utility uses SQLite's online backup API and verifies an isolated restoration. The activation utility checks database readiness and retains a previous code release for rollback. Review migration compatibility before downgrading.

The login regression test verifies that clients behind one reverse proxy retain separate attempt budgets, while caller-controlled forwarding headers cannot change the validated client identity. The existing five-failure protection remains enabled.

Detailed deployment and recovery procedures are maintained privately on the server.
