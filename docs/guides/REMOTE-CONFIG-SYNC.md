---
title: "Free encrypted remote config sync"
version: 3.8.54
---

# Free encrypted remote config sync

OmniRoute's built-in Cloud Sync requires a premium `CLOUD_URL` relay. **`omniroute sync remote`
is a free alternative**: it stores an AES-256-GCM encrypted backup in storage you already own
(a private GitHub repository or any `rclone` remote) and restores it on another machine.

## What it syncs

The remote bundle is the full operator backup produced by `omniroute sync pull`, so it includes
provider connections, credentials, combos, routing settings, dashboard API keys, memory and
usage history. Nothing is written to the remote in plaintext: the backup is encrypted locally
with a password you choose, using scrypt for key derivation and AES-256-GCM for encryption.

## Setup

On the first machine:

```bash
# private GitHub repo (uses the already-authenticated gh CLI)
omniroute sync remote configure --backend github --target owner/repo:omniroute/bundle.json

# or any rclone remote
omniroute sync remote configure --backend rclone --target mydrive:omniroute/bundle.json

omniroute sync remote push          # prompts for the master password
```

On a new machine, install OmniRoute, run the same `configure` command, then:

```bash
omniroute sync remote pull          # restores the backup
```

The password is never stored. Pass it non-interactively with the
`OMNIROUTE_REMOTE_SYNC_PASSWORD` environment variable if needed.

## Automatic sync

```bash
omniroute sync remote daemon --interval 60000
```

The daemon pulls once at startup, then pushes whenever the local database changes. Before an
import it downloads a fresh local snapshot, so a last-write-wins restore never silently loses
the previous state.

## Storage requirements

- **github**: `gh auth login` must be done, with write access to a private repository.
- **rclone**: `rclone` must be installed and configured (`rclone config`).

Permissions: the local config file is written with owner-only mode (`0600`); the encrypted
bundle contains only ciphertext.
