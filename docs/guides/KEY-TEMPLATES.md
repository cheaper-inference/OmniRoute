---
title: "Key Templates"
version: 3.8.54
lastUpdated: 2026-11-08
---

# Key Templates

A key template is a reusable snapshot of an API key's settings. It contains no
credential. Selecting a template fills a draft key; you can edit its settings
before creating a fresh key. Editing or deleting the template does not change
keys already created from it.

## Dashboard workflow

In API Keys, use the Key Templates library to create, edit, delete or use a
template. Use **Save as template** on an existing key to preview the settings
being captured. Notices identify lifecycle changes and settings that cannot be
copied. Required notices must be acknowledged before saving.

When creating a key, choose a template or start with the default policy. The
summary shows its permissions and limits. Expand the full editor to change
general settings, models/catalog, combos, connections, limits and behaviour.
Advanced controls include group membership, budgets, token-limit timing,
automatic candidate exclusions and per-key reasoning rules.

Switching templates after editing asks before replacing the draft. Closing a
form invalidates its pending template lookup. Invalid input, including an empty
relative lifetime, blocks creation instead of silently supplying a default.

## Access and model discovery

Execution permissions and the `/v1/models` listing are separate:

- `modelAccessMode: restricted` with an empty model list denies every raw model.
- An empty combo list denies every combo; `combo/*` explicitly allows all combos.
- Empty connection, quota-pool, endpoint and IP restrictions retain their existing
  unrestricted meaning. Missing references are never silently pruned to empty.
  Clearing the final quota-pool restriction in the editor requires confirmation.
  Removing a stale rule affects only that rule, including when another rule
  refers to the same missing connection.
- `catalogScope` lists all authorized entries, combos only, or provider models
  only. It does not change permission to execute a model.
- `disableNonPublicModels` affects both discovery and execution. Routing pins,
  automatic combos and discovery aliases retain their existing key semantics.

An intentionally empty catalog is valid. For example, a key can permit direct
model calls while advertising combos only and permitting no combos.

## Snapshot boundaries

Templates capture supported key permissions, routing/behaviour settings and
related configuration. They exclude credentials, key identity, usage history,
counters and SSO bindings. Lifetimes are relative or unlimited; lifecycle
normalization is disclosed when capturing an existing key.

Group membership references the existing group. Group-level changes and shared
limits still affect members normally; template edits do not alter membership of
existing keys. Weighted pool allocations, billing identity and context-source
credentials are not copied. Capture reports these limitations explicitly.

Reasoning rules in a key template are bound to the new key. They cannot install
global rules or change routing for other keys. Invalid or unsupported stored
policy versions are refused rather than interpreted with broader defaults.

## Management API

Template endpoints use API-key administration's management authentication. A
policy granting management scope retains the additional credential check. Remote CLI
access tokens require `admin` for template creation, editing and deletion; `read`
remains sufficient for template reads.

The list response contains healthy `templates` and a separate `unreadable` array
with each corrupt row's ID, name, revision and error code. The dashboard shows
those rows with a delete action and never applies an unreadable policy. A detail
request for an unreadable row continues to fail closed.

| Operation                                      | Endpoint                                           |
| ---------------------------------------------- | -------------------------------------------------- |
| List / create                                  | `GET` / `POST /api/key-templates`                  |
| Read / edit / delete                           | `GET` / `PATCH` / `DELETE /api/key-templates/{id}` |
| Preview an existing key without its credential | `GET /api/keys/{id}/template-policy`               |
| Create a key from the final edited policy      | `POST /api/keys`                                   |

Create a template with `{name, description?, policy}` or with
`{name, description?, fromKeyId, acknowledge?}`. Editing requires the current
`revision`; a stale revision returns 409. Preview and detail responses expose
reference issues so a missing target can be replaced or removed explicitly.

For key creation, submit `{name, policy, templateRef?}`. The policy contains
`schemaVersion`, `key`, `related` and `expiry`; use the complete policy returned
by template detail or the editor. `templateRef` is informational provenance,
not a request to overwrite the submitted edits with the stored template.

The key and related configuration are committed atomically. Failure leaves no
partially configured key. A fresh credential is returned once with `no-store`;
handle it securely rather than logging the response. Existing legacy create
payloads remain supported.
