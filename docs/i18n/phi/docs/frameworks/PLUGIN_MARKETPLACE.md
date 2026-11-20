# Plugin Marketplace (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, at
> `src/app/(dashboard)/dashboard/plugins/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Kasama sa OmniRoute ang isang plugin system na tulad ng sa WordPress. Ang mga plugin ay mga nagsasariling
directory — bawat isa ay may `plugin.json` manifest at isang entry file — na kumokonekta
sa request pipeline (`onRequest` / `onResponse` / `onError`) at sa
mga lifecycle event (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

Ang **Plugin Marketplace** ang discovery layer sa ibabaw ng sistemang iyon. Nagbibigay ito
ng catalog ng mga mai-install na plugin na maaaring i-browse. Bilang default, ang catalog ay isang
maliit na built-in na seed registry; maaari itong ituro ng isang operator sa isang pasadyang remote
registry URL, kung saan pinatitibay ang pag-fetch gamit ang DNS-resolving na SSRF guard
(tingnan ang [Seguridad](#security)).

Ang bawat ruta ng plugin ay **loopback-only** (Tier 1 — `LOCAL_ONLY`): naglo-load
at nagpapatakbo ng code ang mga plugin sa mga child process, kaya hindi maaabot ang mga ruta mula sa
isang non-loopback origin anuman ang auth. Tingnan ang
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Paano Ito Nababagay Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Layer ng rehistro** — `src/lib/plugins/marketplace.ts`: naglilista / naghahanap sa catalog, bumabalik sa seed registry sa anumang pagkabigo.
- **Layer ng lifecycle** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): i-install, i-upgrade, i-activate, i-deactivate, i-uninstall, i-scan, startup load.
- **Manifest na layer** — `src/lib/plugins/manifest.ts`: Zod schema + default para sa `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: natutuklasan ang mga plugin sa disk sa ilalim ng direktoryo ng plugin.
- **Loader** — `src/lib/plugins/loader.ts`: nagpapalabas ng bawat plugin sa isang hiwalay Node.js child na proseso at ang mga broker ay nag-hook ng mga tawag sa IPC. Ang bata ay hindi isang sandbox (tingnan ang "Paghihiwalay ng pagpapatupad ng plugin" sa ibaba).

## Catalog ng Marketplace

Ang `listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) ay nagbabalik ng listahan ng
mga `MarketplaceEntry` object:

| Field         | Type     | Mga Tala                                              |
| ------------- | -------- | ----------------------------------------------------- |
| `name`        | string   | Pangalan ng plugin na nasa kebab-case                 |
| `version`     | string   | semver                                                |
| `description` | string   | Maikling buod                                         |
| `author`      | string   | May-akda / organisasyon                               |
| `license`     | string   | SPDX-style na license id                              |
| `downloadUrl` | string   | URL ng pag-download ng source (maaaring walang laman) |
| `repository`  | string?  | Opsyonal na URL ng repository                         |
| `tags`        | string[] | Mga tag para sa paghahanap/pag-filter                 |
| `downloads`   | number   | Bilang ng mga pag-download                            |
| `rating`      | number   | 0–5                                                   |
| `verified`    | boolean  | Kung minarkahan bilang verified ang entry             |
| `lastUpdated` | string   | ISO-ish na string ng petsa                            |

Kapag walang naka-configure na pasadyang registry URL, ang catalog ay ang built-in na
`SEED_REGISTRY` (sa kasalukuyan ay `request-logger`, `rate-limiter`, `cost-tracker`, at
`theme-manager`). Palaging available ang seed registry — kung hindi maabot ang isang naka-configure na remote
registry, nagbalik ito ng non-`200` na status, o nagbalik ito ng hindi nakikilalang
body, nagla-log ng babala ang `listMarketplacePlugins()` at bumabalik sa seed list.

> Paalala: ang **catalog** ng marketplace (pag-browse/paghahanap) ay ganap nang nakakonekta, ngunit
> hindi pa naipapatupad ang isang-click na **pag-install** mula sa catalog — ang
> button na "I-install" ng dashboard sa isang marketplace entry ay kasalukuyang nagpapakita ng
> abisong "malapit na". Sa ngayon, isinasagawa ang pag-install sa pamamagitan ng local-path install
> flow (`POST /api/plugins`) at on-disk discovery (`POST /api/plugins/scan`).

## REST API

Ang lahat ng endpoint ay nangangailangan ng management auth (`requireManagementAuth`)** at** ay loopback-only — `/api/plugins` at `/api/plugins/` ay nakalista sa `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Pamamaraan | Paglalarawan                                                               |
| -------------------------------- | ---------- | -------------------------------------------------------------------------- |
| `/api/plugins`                   | GET        | Maglista ng mga naka-install na plugin (opsyonal `?status=` filter)        |
| `/api/plugins`                   | POST       | Mag-install ng plugin mula sa direktoryo ng mga pinagmumulan ng plugin     |
| `/api/plugins/scan`              | POST       | I-scan ang direktoryo ng plugin at magrehistro ng mga bagong plugin        |
| `/api/plugins/marketplace`       | GET        | Maglista ng mga entry sa catalog ng marketplace                            |
| `/api/plugins/[name]`            | GET        | Kunin ang mga detalye ng naka-install na plugin                            |
| `/api/plugins/[name]`            | DELETE     | Mag-uninstall ng plugin                                                    |
| `/api/plugins/[name]/activate`   | POST       | I-activate (i-load + register hook)                                        |
| `/api/plugins/[name]/deactivate` | POST       | I-deactivate (fire `onDeactivate`, alisin sa pagkakarehistro ang mga hook) |
| `/api/plugins/[name]/config`     | GET        | Kunin ang plugin config + config schema                                    |
| `/api/plugins/[name]/config`     | PUT        | I-update ang config ng plugin (na-validate laban sa schema)                |

Ang `GET /api/plugins` `status` filter ay tumatanggap ng isa sa `installed` / `active` / `inactive` / `error`. Ang isang di-wastong halaga ay nagbabalik `400`.

### Maglista ng mga naka-install na plugin

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### I-install mula sa isang lokal na landas

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Ang `path` ay dapat na isang** ganap** landas patungo sa isang direktoryo** sa loob ng direktoryo ng mga mapagkukunan ng plugin** : `plugin-sources` sa tabi ng ugat ng plugin, kaya `~/.omniroute/plugin-sources/` bilang default, o `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` kapag nakatakda ang variable na iyon (`getPluginSourcesDir()` sa `src/lib/plugins/installSource.ts`). Kopyahin o i-clone muna ang plugin doon. Ang pag-install ay tinanggihan ng `400` kapag ang path ay naglalaman ng `..` o isang null byte, nasa labas ng direktoryo na iyon, nalutas sa labas nito sa pamamagitan ng isang symlink, naglalaman ng isang symlink na ang target ay nasa labas nito, o kapag ang direktoryo ay wala. Ang direktoryo ng pinagmulan ay dapat maglaman ng wastong `plugin.json` (o maging magulang ng isa). Sa tagumpay ang tugon ay `201` na may naka-install na hilera ng plugin.

Hindi tulad ng iba pang mga ruta ng plugin, ang isang ito ay nangangailangan ng kredensyal ng pamamahala (isang sesyon ng dashboard o isang API key na nasasakupan ng pamamahala) kahit na hindi pinagana ang pag-log in (`requireLogin=false`): ang pag-install ng code ay hindi kailanman isang hindi kilalang aksyon.

### Mag-browse sa marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### I-update ang config ng plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

pinapatunayan ng `PUT .../config` ang bawat ibinigay na halaga laban sa `configSchema` ng plugin (ipinahayag sa manifest): `number` fields honor `min`/`max`, dapat tumugma ang mga field `select` sa ipinahayag na `enum`. Ang mga key na wala sa schema ay pinahihintulutan.

## Configuration

### Direktoryo ng plugin

Nakalagay ang mga plugin sa ilalim ng data directory ng OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (o anumang tinutukoy ng manifest.main)
```

Nire-resolve ng `getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) ang direktoryong iyon sa
tatlong hakbang:

1. **`OMNIROUTE_PLUGINS_DIR`**, kapag nakatakda — ginagamit nang eksakto, anuman ang sinasabi ng `HOME`. Ito ang
   tahasang setting para sa Docker/K8s, kung saan bind-mounted ang plugin tree sa isang path
   na karaniwang walang kaugnayan sa home directory ng container (#11827).
2. `<home>/.omniroute/plugins`, kung saan nagmumula ang `<home>` sa mga environment variable na `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kapag walang home na ine-export ang process.

Isang beses na nila-log sa startup ang na-resolve na direktoryo bilang `scanner.dir_resolved`, at tinutukoy ang
input na napili (`OMNIROUTE_PLUGINS_DIR`, `home`, o `no-home-fallback`) — kaya malinaw na sinasabi ng isang image
na tahimik na napunta sa hakbang 3, sa halip na mag-ulat lamang ng walang-lamang listahan ng plugin.
Tinutuklasan ng `POST /api/plugins/scan` ang anumang subdirectory roon na naglalaman ng wastong
`plugin.json` at inirehistro ito; ang direktoryo ring iyon ang root kung saan kinokopya ng
`pluginManager.install()` ang mga plugin, kaya sabay na inililipat ng override ang discovery at
installation.

> **Ang `OMNIROUTE_PLUGINS_DIR` ay hindi `OMNIROUTE_PLUGIN_PATH`.** Binabasa lamang ang huli ng
> CLI command-plugin loader (`bin/cli/plugins.mjs`) upang hanapin ang mga `omniroute-cmd-*` npm
> package na nagdaragdag ng mga `omniroute` subcommand — wala itong epekto sa runtime scanner
> na inilalarawan dito. Tingnan ang [PLUGINS.md](./PLUGINS.md) para sa bahaging iyon.

### Custom na URL ng marketplace registry

Binabasa ang source ng marketplace catalog mula sa setting na `pluginMarketplaceUrl`
(binabasa ng `src/lib/plugins/marketplace.ts` ang `settings.pluginMarketplaceUrl`). Kapag
nakatakda sa isang `http(s)` URL, kinukuha ng `listMarketplacePlugins()` ang URL na iyon at tumatanggap
ito ng alinman sa top-level na JSON array ng mga entry o isang object na may `plugins` array;
sinasala ang mga entry na walang string na `name`. Kapag hindi nakatakda (o kapag hindi pumasa ang fetch
sa SSRF guard / nagbalik ng maling response), ginagamit ang built-in na seed registry.

Nagbibigay ang tab na "Marketplace" ng dashboard ng field para sa URL na ito (muling binabasa mula sa
`GET /api/settings`).

> Tala sa implementation: ipinapadala ng action na "Save" ng dashboard ang
> `pluginMarketplaceUrl` sa `PATCH /api/settings`. Sa oras ng pagsulat nito,
> hindi nakadeklara ang key na ito sa `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), kaya tiyakin ang persistence sa inyong
> release bago umasa rito — sinusunod ng **read** path (`getSettings()` →
> `listMarketplacePlugins()`) ang key kapag naroon na ito sa settings
> store.

## Seguridad

### Route tier — loopback lang

Ang mga plugin ay nagpapatupad ng code sa mga spawned child na proseso, kaya ang buong `/api/plugins` surface ay nauuri `LOCAL_ONLY` (Tier 1). Ang pagpapatupad ng loopback ay tumatakbo nang walang kondisyon** dati** anumang auth check, kaya hindi pa rin makapag-install, makapag-activate, o makapag-uninstall ng plugin ang isang leaked na token ng pamamahala na umaabot sa kahon sa ibabaw ng tunnel. Tingnan ang [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) at Hard Rules #15 / #17.

### Marketplace registry SSRF guard

Ang custom na registry URL ay maimpluwensyang configuration ng attacker, kaya bago ito kunin, pinapatakbo ito ng `listMarketplacePlugins()` sa dalawang layer:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Tinatanggihan ang anumang bagay na hindi `http:` / `https:`.
   - Tinatanggihan ang mga literal na private/loopback/link-local/ULA host (IPv4** at** IPv6, kabilang ang IPv4-mapped) sa pamamagitan ng canonical `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Resolve** pareho** `A` at `AAAA` record at tinatanggihan kung** anuman** Ang nalutas na address ay pribadong — na isinasara ang public-hostname → private-IP bypass.
   - **Nabigo sarado** : tinatanggihan ng pagkabigo DNS resolution ang URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): muling inilalapat ang pampublikong-lamang URL guard sa oras ng pagkuha at** hinaharangan ang mga pag-redirect** (walang pampublikong → pribadong `30x` pivot).

Ang isang URL na nabigo sa alinmang layer ay hindi naa-abort ang kahilingan — ang marketplace ay tahimik na bumabalik sa built-in na seed registry at nag-log ng isang babala.

> Ang guard na ito ay pinatigas sa PR #3774 partikular na upang malutas ang A + AAAA at gamitin ang canonical `isPrivateHost` sa halip na isang IPv4-only check.

### Paghihiwalay ng pagpapatupad ng plugin

> **Ang mga plugin ay hindi naka-sandbox.** Ang bata ay isang ordinaryong proseso Node.js na tumatakbo bilang gumagamit ng OmniRoute, na walang konteksto VM at walang mga flag ng pahintulot ng Node.js, kaya maaaring basahin at isulat ng plugin code ang anumang file na magagawa ng user, magpatakbo ng mga programa at maabot ang network. `requires.permissions` ay nagpapasya lamang kung aling mga variable ng kapaligiran ang matatanggap ng bata; ang iba pang mga pahintulot ay hindi ipinapatupad. Mag-install lamang ng mga plugin na pinagkakatiwalaan mo. Ang hangganan ng proseso sa ibaba ay naglalaman ng mga pag-crash at hang; hindi ito hangganan ng seguridad.

- **Pagbubukod ng proseso** — `loadPlugin()` (`src/lib/plugins/loader.ts`) ay naglalabas ng bawat plugin sa isang hiwalay Node.js child na proseso at nakikipag-ugnayan sa IPC. Ang mga hook call ay may timeout na may `SIGTERM` → `SIGKILL` escalation.
- **Env allowlist** — ang bata ay tumatanggap lamang ng isang pinapahintulutang hanay ng mga variable ng kapaligiran; ang mas malawak na hanay ay ibinibigay lamang kapag ang manifest ay humiling ng pahintulot ng `env`.
- **I-install ang source containment** — `POST /api/plugins` ay nagbabasa lamang mula sa direktoryo ng mga pinagmumulan ng plugin (tingnan ang "I-install mula sa isang lokal na landas"): ang landas ay na-canonicalize sa `realpath`, dapat na mahigpit na manatili sa loob ng direktoryo na iyon, at ang isang punong pinagmumulan na may dalang symlink na lumalabas dito ay tinanggihan bago makopya ang anuman.
- **Pagpigil sa landas** iginiit — install/upgrade/uninstall na ang direktoryo ng plugin at `manifest.main` ay nalutas** sa loob** ang pinamamahalaang ugat ng plugin bago ang anumang kopya o recursive na tanggalin (nagbabantay laban sa mga tampered DB path at `../` traversal sa `manifest.main`). Niresolba ng activation ang mga symlink sa pamamagitan ng `realpath` at tumatangging mag-load ng entry point na lumalabas sa direktoryo ng plugin.
- **Opsyonal na pin ng integridad** — a manifest ay maaaring magdeklara ng `integrity` (`sha256-<base64>`, SRI format) na field. Kapag naroroon, ibe-verify ng loader ang entry file hash sa oras ng pag-load at tumangging mag-activate sa mismatch. Ito ay opt-in tamper-detection,** hindi** isang hangganan ng seguridad: hindi nito nililimitahan kung ano ang magagawa ng isang na-load na plugin.
- **Walang mga kredensyal ng kliyente sa mga kawit** — ang konteksto na ipinasa sa `onRequest`, `onResponse` at `onError` ay may mga `authorization`, `x-api-key`, `proxy-authorization` at `cookie` na mga header na inalis, at ang API key record ay hindi nagdadala ng key value (`redactPluginContext()` sa `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Napatunayan ni `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Patlang            | Uri        | Mga Tala                                                                       |
| ------------------ | ---------- | ------------------------------------------------------------------------------ |
| `name`             | string     | Kinakailangan; kebab-case (`^[a-z0-9-]+$`), 1–100 character                    |
| `version`          | string     | Kinakailangan; semver (`MAJOR.MINOR.PATCH`)                                    |
| `description`      | string?    | ≤ 500 character                                                                |
| `author`           | string?    | ≤ 200 character                                                                |
| `license`          | string?    | Default sa `MIT`                                                               |
| `main`             | string?    | Entry file; default sa `index.js`                                              |
| `source`           | enum?      | `local` \| `marketplace` (mga default sa `local`)                              |
| `tags`             | string []? | Maghanap ng mga tag                                                            |
| `requires`         | object?    | `{ omniroute?, permissions[] }`                                                |
| `hooks`            | object?    | Ang mga Boolean ay nagdedeklara kung aling mga hook ang ipinapatupad ng plugin |
| `skills`           | bagay[]?   | Opsyonal na mga kahulugan ng kasanayan                                         |
| `enabledByDefault` | boolean?   | Awtomatikong i-activate sa pag-install                                         |
| `configSchema`     | object?    | Mapa ng config fields (`string`/`number`/`boolean`/`select`)                   |
| `integrity`        | string?    | Opsyonal `sha256-<base64>` entry-file pin                                      |

Ang mga pahintulot ay nakuha mula sa enum `network` / `file-read` / `file-write` / `env` / `exec`. Ang `env` lang ang may runtime effect (isang bahagyang mas malaking environment-variable allowlist para sa bata); ang iba ay mga deklarasyon at hindi ipinapatupad.

## Daloy ng Lifecycle

```
install (POST /api/plugins, path)
  → i-scan/i-validate ang manifest → kopyahin sa staging → tiyaking nasa loob ng dir ang main
  → atomic rename papunta sa ~/.omniroute/plugins/<name> → maglagay ng row sa DB
  → patakbuhin ang onInstall → kung enabledByDefault: i-activate

activate (POST /api/plugins/{name}/activate)
  → pagsusuri sa containment ng realpath → loadPlugin() (mag-spawn ng child process)
  → irehistro ang mga idineklarang hook → status = "active" → patakbuhin ang onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → patakbuhin ang onDeactivate (BAGO mag-unregister) → i-unregister ang mga hook
  → i-kill ang child process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → i-deactivate kung active → patakbuhin ang onUninstall
  → containment-checked na recursive na pagbura ng plugin dir → burahin ang row sa DB
```

Ang muling pagpapatakbo ng `install` sa isang directory na ang bersyon ng manifest ay **tiyak na
mas bago** kaysa sa naka-install na bersyon ay awtomatikong nag-a-upgrade (malinis na muling pag-install; mare-reset ang config
sa mga default). Tatanggihan ang bersyong kapareho o mas luma.

## Database

Talahanayang `plugins` (migration na `076_create_plugins.sql`):

| Column          | Uri     | Mga Tala                                                         |
| --------------- | ------- | ---------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                             |
| `name`          | TEXT    | Natatangi                                                        |
| `version`       | TEXT    | semver; default na `1.0.0`                                       |
| `description`   | TEXT    | Opsyonal                                                         |
| `author`        | TEXT    | Opsyonal                                                         |
| `license`       | TEXT    | Default na `MIT`                                                 |
| `main`          | TEXT    | Entry file; default na `index.js`                                |
| `source`        | TEXT    | Default na `local`                                               |
| `tags`          | TEXT    | JSON array; default na `[]`                                      |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                 |
| `enabled`       | INT     | 0/1; default na 0                                                |
| `manifest`      | TEXT    | Buong manifest JSON                                              |
| `config`        | TEXT    | JSON; default na `{}`                                            |
| `config_schema` | TEXT    | JSON; default na `{}`                                            |
| `hooks`         | TEXT    | JSON array ng mga idineklarang pangalan ng hook; default na `[]` |
| `permissions`   | TEXT    | JSON array; default na `[]`                                      |
| `plugin_dir`    | TEXT    | Absolute na directory ng pag-install                             |
| `error_message` | TEXT    | Itinatakda kapag `status = "error"`                              |
| `installed_at`  | TEXT    | `datetime('now')`                                                |
| `updated_at`    | TEXT    | `datetime('now')`                                                |
| `activated_at`  | TEXT    | Itinatakda sa pag-activate                                       |

Sinusubaybayan ang mga metric/analytics ng plugin sa mga karagdagang talahanayan
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Ang pahina ng dashboard sa `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) ay nagbibigay ng dalawang tab:

- **Naka-install** — ay naglilista ng mga naka-install na plugin gamit ang kanilang mga ipinahayag na hook, isang activate/deactivate toggle, isang uninstall button, at isang "I-scan para sa mga plugin" na aksyon (`POST /api/plugins/scan`).
- **Marketplace** Ipinapakita ng — ang catalog mula sa `GET /api/plugins/marketplace` na may field para itakda ang custom na registry URL.

Palaging nagpapakita ang page ng babala na tumatakbo ang mga plugin na may ganap na mga pribilehiyo ng proseso ng OmniRoute.

Ang isang per-plugin config page ay nakatira sa `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Tingnan Din

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  kung bakit loopback-only ang `/api/plugins` (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — ang kaugnay na framework ng mga skill
  (`src/lib/skills/`); maaaring magdeklara ang mga plugin ng mga skill sa kanilang manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — mga outbound integration na
  pinapatakbo ng mga event
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  ang pattern na `buildErrorBody()` na ginagamit ng bawat ruta ng plugin para sa mga error response
