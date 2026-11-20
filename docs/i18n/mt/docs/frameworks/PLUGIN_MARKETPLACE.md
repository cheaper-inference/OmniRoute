# Plugin Marketplace (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sors awtorevoli:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, u
> `src/app/(dashboard)/dashboard/plugins/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jiġi b'sistema ta' plugins fuq l-istil ta' WordPress. Il-plugins huma
direttorji awtonomi — kull wieħed b'manifest `plugin.json` u fajl tad-dħul — li
jintegraw mal-pipeline tat-talbiet (`onRequest` / `onResponse` / `onError`) u
mal-avvenimenti taċ-ċiklu tal-ħajja (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

Il-**Marketplace tal-Plugins** huwa s-saff tal-iskoperta mibni fuq dik is-sistema.
Dan jipprovdi katalogu li jista' jiġi esplorat ta' plugins li jistgħu jiġu
installati. B'mod awtomatiku, il-katalogu huwa reġistru żgħir inizjali integrat;
operatur jista' jikkonfigurah biex juża URL ta' reġistru remot personalizzat,
f'liema każ it-talba tiġi protetta minn kontroll kontra l-SSRF li jirriżolvi d-DNS
(ara [Sigurtà](#security)).

Kull rotta tal-plugins hija **għal loopback biss** (Livell 1 — `LOCAL_ONLY`):
il-plugins jgħabbu u jeżegwixxu kodiċi fi proċessi sekondarji, għalhekk ir-rotot
ma jistgħux jintlaħqu minn oriġini li mhijiex loopback, irrispettivament
mill-awtentikazzjoni. Ara
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kif Taqbel Together

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

- **Saff tar-reġistru** — `src/lib/plugins/marketplace.ts`: telenka/tfittex fil-katalgu, li taqa' lura għar-reġistru taż-żerriegħa fuq kwalunkwe falliment.
- **Saff taċ-ċiklu tal-ħajja** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installa, jaġġorna, jattiva, iddiżattiva, iddiżinstalla, skennja, tagħbija tal-istartjar.
- **Saff manifest** — `src/lib/plugins/manifest.ts`: Zod schema + defaults għal `plugin.json`.
- **Skaner** — `src/lib/plugins/scanner.ts`: jiskopri plugins fuq disk taħt id-direttorju tal-plugins.
- **Loader** — `src/lib/plugins/loader.ts`: ibid kull plugin fi proċess tat-tfal Node.js separat u s-sensara jgħaqqdu sejħiet fuq IPC. It-tifel mhuwiex sandbox (ara "Iżolament tal-eżekuzzjoni tal-Plugin" hawn taħt).

## Katalogu tal-Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) jirritorna lista
ta' oġġetti `MarketplaceEntry`:

| Qasam         | Tip      | Noti                                              |
| ------------- | -------- | ------------------------------------------------- |
| `name`        | string   | Isem tal-plugin f'kebab-case                      |
| `version`     | string   | semver                                            |
| `description` | string   | Sommarju qasir                                    |
| `author`      | string   | Awtur / organizzazzjoni                           |
| `license`     | string   | ID tal-liċenzja fl-istil SPDX                     |
| `downloadUrl` | string   | URL tat-tniżżil tas-sors (jista' jkun vojt)       |
| `repository`  | string?  | URL fakultattiv tar-repożitorju                   |
| `tags`        | string[] | Tikketti għat-tiftix/filtrazzjoni                 |
| `downloads`   | number   | Għadd ta' tniżżiliet                              |
| `rating`      | number   | 0–5                                               |
| `verified`    | boolean  | Jekk l-entrata hijiex immarkata bħala vverifikata |
| `lastUpdated` | string   | Stringa tad-data bejn wieħed u ieħor ISO          |

Meta ma jkun ikkonfigurat ebda URL ta' reġistru personalizzat, il-katalogu jkun
is-`SEED_REGISTRY` integrat (bħalissa `request-logger`, `rate-limiter`,
`cost-tracker`, u `theme-manager`). Ir-reġistru inizjali jkun dejjem disponibbli
— jekk reġistru remot ikkonfigurat ma jkunx jista' jintlaħaq, jirritorna status
li mhuwiex `200`, jew jirritorna kontenut mhux rikonoxxut,
`listMarketplacePlugins()` jirreġistra twissija u jerġa' juża l-lista inizjali.

> Nota: il-**katalogu** tal-marketplace (esplorazzjoni/tiftix) huwa integrat minn
> tarf sa tarf, iżda l-**installazzjoni** b'klikk waħda mill-katalogu tal-marketplace
> għadha mhijiex implimentata — il-buttuna "Installa" tad-dashboard fuq entrata
> tal-marketplace bħalissa turi avviż li l-funzjonalità "ġejja dalwaqt".
> Bħalissa, l-installazzjoni ssir permezz tal-fluss ta' installazzjoni minn passaġġ
> lokali (`POST /api/plugins`) u l-iskoperta fuq id-diska
> (`POST /api/plugins/scan`).

## REST API

L-endpoints kollha jeħtieġu awtorizzazzjoni tal-ġestjoni (`requireManagementAuth`)** u** huma loopback-only — `/api/plugins` u `/api/plugins/` huma elenkati fi `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Metodu | Deskrizzjoni                                                    |
| -------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Lista plugins installati (filtru `?status=` mhux obbligatorju)  |
| `/api/plugins`                   | POST   | Installa plugin mid-direttorju tas-sorsi tal-plugin             |
| `/api/plugins/scan`              | POST   | Skennja d-direttorju tal-plugins u rreġistra plugins ġodda      |
| `/api/plugins/marketplace`       | GET    | Elenka l-entrati fil-katalgu tas-suq                            |
| `/api/plugins/[name]`            | GET    | Ikseb id-dettalji tal-plugin installat                          |
| `/api/plugins/[name]`            | DELETE | Iddiżinstalla plugin                                            |
| `/api/plugins/[name]/activate`   | POST   | Attiva (tagħbija + reġistru ganċi)                              |
| `/api/plugins/[name]/deactivate` | POST   | Iddiżattiva (fire `onDeactivate`, unregister hooks)             |
| `/api/plugins/[name]/config`     | GET    | Ikseb plugin config + config schema                             |
| `/api/plugins/[name]/config`     | PUT    | Aġġorna l-konfigurazzjoni tal-plugin (validata kontra l-iskema) |

Il-filtru `GET /api/plugins` `status` jaċċetta wieħed minn `installed` / `active` / `inactive` / `error`. Valur invalidu jirritorna `400`.

### Lista plugins installati

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installa minn mogħdija lokali

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` trid tkun an** assoluta** mogħdija għal direttorju** ġewwa d-direttorju tas-sorsi tal-plugin** : `plugin-sources` ħdejn l-għerq tal-plugin, għalhekk `~/.omniroute/plugin-sources/` b'mod awtomatiku, jew `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` meta dik il-varjabbli tkun issettjata (`getPluginSourcesDir()` `src/lib/plugins/installSource.ts`). Ikkopja jew ikklonja l-plugin hemm l-ewwel. L-installazzjoni tiġi rrifjutata `400` meta l-mogħdija jkun fiha `..` jew byte null, tinsab barra dak id-direttorju, issolvi barra minnu permezz ta' symlink, ikun fiha symlink li l-mira tiegħu tkun barra minnu, jew meta d-direttorju ma jeżistix. Id-direttorju tas-sors għandu jkun fih `plugin.json` validu (jew ikun ġenitur ta' wieħed). Fuq suċċess ir-rispons huwa `201` bir-ringiela tal-plugin installat.

B'differenza mir-rotot tal-plugins l-oħra, din teħtieġ il-kredenzjali tal-ġestjoni (sessjoni dashboard jew ċavetta API b'ambitu ta' ġestjoni) anki meta l-login huwa diżattivat (`requireLogin=false`): l-installazzjoni tal-kodiċi qatt ma hija azzjoni anonima.

### Fittex is-suq

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aġġorna l-konfigurazzjoni tal-plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` jivvalida kull valur ipprovdut kontra `configSchema` tal-plugin (iddikjarat fil-manifest): `number` fields jonoraw `min`/`max`, `select` fields għandhom jaqblu maż `enum` iddikjarat . Ċwievet mhux preżenti fl-iskema huma permessi.

## Konfigurazzjoni

### Direttorju tal-plugins

Il-plugins jinsabu taħt id-direttorju tad-data ta’ OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (jew kwalunkwe fajl li manifest.main jipponta lejh)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) jirriżolvi dak id-direttorju fi
tliet passi:

1. **`OMNIROUTE_PLUGINS_DIR`**, meta jkun issettjat — jintuża eżatt kif inhu, ikun xi jkun jgħid `HOME`. Dan huwa
   l-kontroll espliċitu għal Docker/K8s, fejn is-siġra tal-plugins tkun immuntata b’bind f’path
   li normalment ma jkollu xejn x’jaqsam mad-direttorju home tal-container (#11827).
2. `<home>/.omniroute/plugins`, fejn `<home>` jiġi mill-variables tal-ambjent `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, meta l-proċess ma jesporta l-ebda home.

Id-direttorju riżolt jiġi rreġistrat darba fl-istartjar bħala `scanner.dir_resolved`, filwaqt li jsemmi
l-input li ntgħażel (`OMNIROUTE_PLUGINS_DIR`, `home`, jew `no-home-fallback`) — sabiex image
li taqa’ fis-skiet fuq il-pass 3 tiddikjara dan, minflok tirrapporta biss lista vojta ta’ plugins.
`POST /api/plugins/scan` jiskopri kwalunkwe sottodirettorju hemmhekk li jkun fih
`plugin.json` validu u jirreġistrah; l-istess direttorju huwa l-għerq li fih
`pluginManager.install()` jikkopja l-plugins, għalhekk override jmexxi flimkien l-iskoperta u
l-installazzjoni.

> **`OMNIROUTE_PLUGINS_DIR` mhuwiex `OMNIROUTE_PLUGIN_PATH`.** Dan tal-aħħar jinqara biss
> mil-loader tal-command plugins tas-CLI (`bin/cli/plugins.mjs`) biex isib packages npm
> `omniroute-cmd-*` li jżidu subcommands ta’ `omniroute` — ma għandu l-ebda effett fuq l-iskanner tar-runtime
> deskritt hawnhekk. Ara [PLUGINS.md](./PLUGINS.md) għal dik in-naħa.

### URL personalizzat tar-reġistru tal-marketplace

Is-sors tal-katalgu tal-marketplace jinqara mis-setting `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` jaqra `settings.pluginMarketplaceUrl`). Meta
jkun issettjat għal URL `http(s)`, `listMarketplacePlugins()` jiġbed dak il-URL u jaċċetta
jew array JSON tal-ogħla livell ta’ entrati, jew object b’array `plugins`;
l-entrati mingħajr `name` tat-tip string jiġu ffiltrati. Meta ma jkunx issettjat (jew meta l-fetch
ifalli l-protezzjoni SSRF / jirritorna rispons ħażin), jintuża r-reġistru seed
inkorporat.

It-tab "Marketplace" tad-dashboard turi field għal dan il-URL (li jinqara lura minn
`GET /api/settings`).

> Nota dwar l-implimentazzjoni: l-azzjoni "Save" tad-dashboard tibgħat
> `pluginMarketplaceUrl` lil `PATCH /api/settings`. Fil-ħin tal-kitba, din
> il-key mhijiex iddikjarata f’`updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), għalhekk ivverifika l-persistenza fir-release tiegħek
> qabel ma tiddependi fuqha — il-path tal-**qari** (`getSettings()` →
> `listMarketplacePlugins()`) jirrispetta l-key ladarba tkun preżenti fl-istore
> tas-settings.

## Sigurtà

### Rotta tier — loopback biss

Il-plugins jeżegwixxu kodiċi fi proċessi tfal imnissla, għalhekk il-wiċċ kollu `/api/plugins` huwa kklassifikat `LOCAL_ONLY` (Livell 1). L-infurzar tal-loopback jaħdem mingħajr kundizzjonijiet** qabel** kwalunkwe verifika ta' awtorizzazzjoni, għalhekk token ta' ġestjoni leaked li jilħaq il-kaxxa fuq mina xorta ma jistax jinstalla, jattiva jew jiddiżinstalla plugin. Ara [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) u Hard Rules #15 / #17.

### Reġistru tas-suq SSRF guard

Reġistru personalizzat URL huwa konfigurazzjoni influwenzabbli mill-attakkant, għalhekk qabel ma jġibu `listMarketplacePlugins()` jgħaddiha minn żewġ saffi:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Jirrifjuta kull ħaġa li mhix `http:` / `https:`.
   - Jirrifjuta l-ospiti private/loopback/link-local/ULA letterali (IPv4** u** IPv6, inkluż IPv4-mapped) permezz tal-kanoniku `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Issolvi** it-tnejn** `A` u `AAAA` jirreġistra u jiċħad jekk** kwalunkwe** l-indirizz riżolt huwa — privat li jagħlaq il-bypass ta' l-isem pubbliku tal-host → privat-IP.
   - **Jfalli magħluq** : nuqqas ta ' riżoluzzjoni DNS jirrifjuta l URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): jerġa’ japplika l-gwardja URL għall-pubbliku biss fil-ħin tal-ġbir u** jimblokka indirizzi mill-ġdid** (l-ebda public → privat `30x` pivot).

A URL li tfalli kwalunkwe saff ma abort it-talba — is-suq skiet jaqa lura għar-reġistru taż-żerriegħa mibni u jirreġistra twissija.

> Din il-gwardja kienet imwebbsa fiż PR #3774 speċifikament biex tissolva A + AAAA u tuża `isPrivateHost` kanoniku minflok IPv4-only check.

### Iżolament tal-eżekuzzjoni tal-plugin

> **Il-plugins mhumiex sandboxed.** It-tifel huwa proċess Node.js ordinarju li jaħdem bħala l-utent OmniRoute, mingħajr l-ebda kuntest VM u l-ebda bnadar ta 'permess Node.js, għalhekk il-kodiċi tal-plugin jista' jaqra u jikteb kwalunkwe fajl li l-utent jista ', imexxi programmi u jilħaq in-netwerk. `requires.permissions` jiddeċiedi biss liema varjabbli ambjentali jirċievi t-tifel; il-permessi l-oħra mhumiex infurzati. Installa biss plugins li tafda. Il-konfini tal-proċess hawn taħt fih ħabtiet u hang; mhuwiex konfini tas-sigurtà.

- **Iżolament tal-proċess** — `loadPlugin()` (`src/lib/plugins/loader.ts`) ibid kull plugin fi proċess separat Node.js child u jikkomunika fuq IPC. Is-sejħiet tal-ganċ għandhom timeout b'eskalazzjoni `SIGTERM` → `SIGKILL`.
- **Env lista ta' permessi** — it-tifel jirċievi biss sett allowlisted ta' varjabbli ambjentali; is-sett usa' jingħata biss meta l-manifest jitlob il-permess `env`.
- **Installa konteniment tas-sors** — `POST /api/plugins` jaqra biss mid-direttorju tas-sorsi tal-plugin (ara "Installa minn mogħdija lokali"): il-mogħdija hija canonicalized `realpath`, trid tibqa' strettament ġewwa dak id-direttorju, u siġra tas-sors li ġġorr symlink li taħrab minnha tiġi rrifjutata qabel ma tiġi kkupjata xi ħaġa.
- **Konteniment tal-mogħdija** — install/upgrade/uninstall jasserixxu li d-direttorju tal-plugin u `manifest.main` isolvu** fi ħdan** l-għerq tal-plugin ġestit qabel kwalunkwe kopja jew tħassir rikorsiv (gwardji kontra mogħdijiet DB imbagħbsa u traversal `../` `manifest.main`). L-attivazzjoni ssolvi symlinks permezz ta' `realpath` u tirrifjuta li tgħabbi punt ta' dħul li jaħrab mid-direttorju tal-plugin.
- **Pin ta 'integrità fakultattiv** — manifest jista' jiddikjara qasam `integrity` (`sha256-<base64>`, SRI format). Meta jkun preżenti, il-loader jivverifika l-hash tal-fajl tad-dħul fil-ħin tat-tagħbija u jirrifjuta li jattiva fuq nuqqas ta 'qbil. Hija skoperta ta' tbagħbis opt-in,** le** fruntiera tas-sigurtà: ma tillimitax dak li jista 'jagħmel plugin mgħobbi.
- **L-ebda kredenzjali tal-klijent fil-ganċijiet** — il-kuntest mgħoddi lil `onRequest`, `onResponse` u `onError` għandu l-headers `authorization`, `x-api-key`, `proxy-authorization` u `cookie` imneħħija, u r-rekord ewlieni API ma jġorr l-ebda valur ewlieni (`redactPluginContext()` `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Ivvalidat minn `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Qasam              | Tip       | Noti                                                                       |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| `name`             | spag      | Meħtieġa; kebab-case (`^[a-z0-9-]+$`), 1–100 chars                         |
| `version`          | spag      | Meħtieġa; semver (`MAJOR.MINOR.PATCH`)                                     |
| `description`      | spag?     | ≤ 500 chars                                                                |
| `author`           | spag?     | ≤ 200 chars                                                                |
| `license`          | spag?     | Defaults li `MIT`                                                          |
| `main`             | spag?     | Fajl tad-dħul; defaults li `index.js`                                      |
| `source`           | enum?     | `local` \| `marketplace` (defaults għal `local`)                           |
| `tags`             | spag[]?   | Fittex tags                                                                |
| `requires`         | oġġett?   | `{ omniroute?, permissions[] }`                                            |
| `hooks`            | oġġett?   | Booleans li jiddikjaraw liema ganċijiet jimplimenta l-plugin               |
| `skills`           | oġġett[]? | Definizzjonijiet tal-ħiliet fakultattivi                                   |
| `enabledByDefault` | boolean?  | Attiva awtomatikament mal-installazzjoni                                   |
| `configSchema`     | oġġett?   | Mappa tal-oqsma tal-konfigurazzjoni (`string`/`number`/`boolean`/`select`) |
| `integrity`        | spag?     | Fakultattiv `sha256-<base64>` entry-file pin                               |

Il-permessi jittieħdu mill-enum `network` / `file-read` / `file-write` / `env` / `exec`. `env` biss għandu effett runtime (allowlist varjabbli għall-ambjent kemmxejn akbar għat-tifel); l-oħrajn huma dikjarazzjonijiet u mhumiex infurzati.

## Fluss taċ-Ċiklu tal-Ħajja

```
install (POST /api/plugins, path)
  → skennja/vvalida l-manifest → ikkopja fiż-żona temporanja → ivverifika li main jinsab fid-direttorju
  → semmi mill-ġdid b’mod atomiku għal ~/.omniroute/plugins/<name> → daħħal ringiela fid-DB
  → attiva onInstall → jekk enabledByDefault: attiva

activate (POST /api/plugins/{name}/activate)
  → verifika tal-konteniment ta’ realpath → loadPlugin() (niedi proċess sekondarju)
  → irreġistra l-hooks iddikjarati → status = "active" → attiva onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → attiva onDeactivate (QABEL it-tneħħija tar-reġistrazzjoni) → neħħi r-reġistrazzjoni tal-hooks
  → waqqaf il-proċess sekondarju → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → iddiżattiva jekk attiv → attiva onUninstall
  → ħassar b’mod rikursiv id-direttorju tal-plugin wara verifika tal-konteniment → ħassar ir-ringiela mid-DB
```

Jekk terġa’ tħaddem `install` fuq direttorju li l-verżjoni tal-manifest tiegħu hija **strettament
aktar ġdida** mill-verżjoni installata, isir aġġornament awtomatiku (installazzjoni mill-ġdid nadifa; il-konfigurazzjoni terġa’
għall-valuri predefiniti). Verżjoni ugwali jew eqdem tiġi rrifjutata.

## Bażi tad-Data

Tabella `plugins` (migrazzjoni `076_create_plugins.sql`):

| Kolonna         | Tip     | Noti                                                                 |
| --------------- | ------- | -------------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                                 |
| `name`          | TEXT    | Uniku                                                                |
| `version`       | TEXT    | semver; valur predefinit `1.0.0`                                     |
| `description`   | TEXT    | Fakultattiv                                                          |
| `author`        | TEXT    | Fakultattiv                                                          |
| `license`       | TEXT    | Valur predefinit `MIT`                                               |
| `main`          | TEXT    | Fajl tad-dħul; valur predefinit `index.js`                           |
| `source`        | TEXT    | Valur predefinit `local`                                             |
| `tags`          | TEXT    | Array JSON; valur predefinit `[]`                                    |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                     |
| `enabled`       | INT     | 0/1; valur predefinit 0                                              |
| `manifest`      | TEXT    | Il-manifest JSON sħiħ                                                |
| `config`        | TEXT    | JSON; valur predefinit `{}`                                          |
| `config_schema` | TEXT    | JSON; valur predefinit `{}`                                          |
| `hooks`         | TEXT    | Array JSON tal-ismijiet tal-hooks iddikjarati; valur predefinit `[]` |
| `permissions`   | TEXT    | Array JSON; valur predefinit `[]`                                    |
| `plugin_dir`    | TEXT    | Direttorju assolut tal-installazzjoni                                |
| `error_message` | TEXT    | Issettjat meta `status = "error"`                                    |
| `installed_at`  | TEXT    | `datetime('now')`                                                    |
| `updated_at`    | TEXT    | `datetime('now')`                                                    |
| `activated_at`  | TEXT    | Issettjat mal-attivazzjoni                                           |

Il-metrika/l-analitika tal-plugins tiġi ssorveljata f’tabelli addizzjonali
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Daxxbord

Il-paġna tad-dashboard `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) tipprovdi żewġ tabs:

- **Installat** — telenka plugins installati bil-ganċijiet iddikjarati tagħhom, toggle activate/deactivate, buttuna ta' uninstall, u azzjoni "Scan għall-plugins" (`POST /api/plugins/scan`).
- **Suq** — juri l-katalgu minn `GET /api/plugins/marketplace` b'field biex tissettja r-reġistru tad-dwana URL.

Il-paġna dejjem turi twissija li l-plugins jaħdmu bil-privileġġi sħaħ tal-proċess OmniRoute.

Paġna ta 'konfigurazzjoni għal kull plugin tgħix `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Ara Wkoll

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  għaliex `/api/plugins` huwa aċċessibbli biss permezz tal-loopback (Livell 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — il-qafas relatat tal-ħiliet
  (`src/lib/skills/`); il-plugins jistgħu jiddikjaraw ħiliet fil-manifest tagħhom
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrazzjonijiet ħerġin
  xprunati minn avvenimenti
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  il-mudell `buildErrorBody()` li tuża kull rotta tal-plugin għat-tweġibiet ta’ żball
