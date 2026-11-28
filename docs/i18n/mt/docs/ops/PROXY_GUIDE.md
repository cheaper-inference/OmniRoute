# 🌐 OmniRoute Proxy Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Aqbeż l-imblokki ġeografiċi, ipproteġi l-identità tiegħek, u għaddi t-traffiku tal-IA minn kwalunkwe proxy — mingħajr ebda kumplessità ta’ konfigurazzjoni.**

OmniRoute jinkludi sistema kompluta għall-ġestjoni tal-proxy li tippermettilek tgħaddi t-traffiku lejn il-fornituri upstream tal-IA permezz ta’ proxies HTTP, HTTPS, jew SOCKS5. Kemm jekk tinsab f’reġjun imblokkat, teħtieġ rotazzjoni tal-IP, jew trid fingerprinting diskret — din il-gwida tkopri kollox.

---

## Werrej

- [Għaliex Tuża Proxies?](#why-use-proxies)
- [Ħarsa Ġenerali lejn l-Arkitettura](#architecture-overview)
- [Sistema ta’ Proxy fuq 4 Livelli](#4-level-proxy-system)
- [Reġistru tal-Proxy (CRUD)](#proxy-registry-crud)
- [Suq Bla Ħlas ta’ 1proxy](#1proxy-free-proxy-marketplace)
- [Rotazzjoni tal-Proxy](#proxy-rotation)
- [Kontra s-Sejbien u Diskrezzjoni](#anti-detection--stealth)
- [Modi tal-Proxy Upstream](#upstream-proxy-modes)
- [Interfaċċa tad-Dashboard](#dashboard-ui)
- [Referenza tal-API](#api-reference)
- [Varjabbli tal-Ambjent](#environment-variables)
- [Soluzzjoni tal-Problemi](#troubleshooting)

---

## Għaliex Tuża Proxies?

Ħafna fornituri tal-IA jirrestrinġu l-aċċess skont ir-reġjun ġeografiku. Żviluppaturi fir-**Russja, iċ-Ċina, l-Iran, Kuba, it-Turkija**, u pajjiżi oħra jiltaqgħu ma’ żbalji bħal:

```
unsupported_country_region_territory
```

Anki barra mir-reġjuni mblokkati, il-proxies huma utli għal:

| Każ ta’ Użu           | Deskrizzjoni                                                           |
| --------------------- | ---------------------------------------------------------------------- |
| **Qbiż ġeografiku**   | Aċċessa OpenAI, Anthropic, Codex, Copilot minn pajjiżi mblokkati       |
| **Rotazzjoni tal-IP** | Qassam it-talbiet bejn diversi IPs biex tevita l-limitazzjoni tar-rata |
| **Privatezza**        | Aħbi l-IP reali tiegħek mill-fornituri upstream                        |
| **Konformità**        | Għaddi t-traffiku minn ġurisdizzjonijiet speċifiċi                     |
| **Ittestjar**         | Issimula talbiet minn reġjuni differenti                               |

---

## Ħarsa Ġenerali lejn l-Arkitettura

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Reġistru    │    │ Dispatcher   │    │ Fetch (undici)   │  │
│  │ tal-Proxy   │───▶│ tal-Proxy    │───▶│                  │  │
│  │ (SQLite)    │    │ (fil-cache)  │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sinkr. ta’  │                        │ API tal-Fornitur │  │
│  │ 1proxy      │                        │ Upstream         │  │
│  │ (pool bla   │                        └──────────────────┘  │
│  │ ħlas)       │                                              │
│  └─────────────┘                                              │
└───────────────────────────────────────────────────────────────┘
```

### Komponenti Ewlenin

| Komponent                | Fajl                                         | Rwol                                                          |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------- |
| **Reġistru tal-Proxy**   | `src/lib/db/proxies.ts`                      | CRUD għall-entrati tal-proxy u l-assenjazzjonijiet tal-ambitu |
| **Dispatcher tal-Proxy** | `open-sse/utils/proxyDispatcher.ts`          | Joħloq dispatchers ProxyAgent/SOCKS ta’ `undici` bil-caching  |
| **Fetch tal-Proxy**      | `open-sse/utils/proxyFetch.ts`               | Jinkapsula `fetch()` bl-injezzjoni tad-dispatcher tal-proxy   |
| **Rotta tas-Settings**   | `src/app/api/settings/proxy/route.ts`        | API tal-konfigurazzjoni legacy tal-proxy (GET/PUT/DELETE)     |
| **Rotta tal-Ġestjoni**   | `src/app/api/v1/management/proxies/route.ts` | API CRUD tar-reġistru (GET/POST/PATCH/DELETE)                 |
| **DB ta’ 1proxy**        | `src/lib/db/oneproxy.ts`                     | Persistenza tas-suq tal-proxies bla ħlas                      |

---

## Stat prokura default għal kontijiet ġodda

Fil** Settings → Proxy → Konfigurazzjoni globali** , uża** Ippermetti proxy awtomatikament għal konnessjonijiet ġodda** biex tagħżel l-istat inizjali tal-prokura tal-kontijiet tal-fornitur li għadhom kif ġew miżjuda.

L-issettjar il-ġdid jikkontrolla l-istat inizjali tal-prokura tal-kontijiet tal-fornitur li għadhom kif ġew miżjuda. Ma tbiddilx il-kontijiet eżistenti jew tissostitwixxi l-iswiċċ tal-prokura globali. Il-valur inizjali tiegħu jippreserva l-imġieba preċedenti. Itfiha darba biex toħloq kontijiet futuri bi proxy diżattivat awtomatikament.

Il-preferenza tinħażen bħala `defaultNewConnectionProxyEnabled` permezz tas-Settings API eżistenti. Huwa default għal `true` meta qatt ma jiġi salvat. L-iffrankar `false` jidħol fis-seħħ għal kontijiet ġodda sussegwenti mingħajr bidu mill-ġdid. `POST /api/providers` jaċċetta `proxyEnabled` boolean strett fakultattiv; `true` jew `false` espliċitu jieħu preċedenza fuq id-default tal-ħolqien. Omissjoni fuq kont duplikat jew OAuth reconnect jippreserva l-istat maħżun ta' dak il-kont. Il-kontijiet individwali xorta jistgħu jiġu attivati jew diżattivati wara.

It-trasferimenti tal-fornituri selettivi jużaw il-mod awtomatiku tal-installazzjoni tad-destinazzjoni għal kontijiet ġodda u jippreservaw il-politika tad-destinazzjoni meta jissostitwixxu l-kontijiet eżistenti. Proxy toggles mhumiex oqsma ta 'trasferiment portabbli. Ir-restawr sħiħ tal-backup u l-migrazzjoni storika JSON/SQL jżommu s-semantika tar-restawr eżistenti tagħhom, inklużi l-valuri tal-kont issejvjati u l-inadempjenzi tal-iskema tal-legat; restawr tas-settings sħiħ jista 'wkoll jirrestawra din il-preferenza.

Din il-preferenza ma tassenjax prokura jew tistabbilixxi li wieħed huwa b'saħħtu jew qed jintuża. Ir-rotot attwali għadu jiddependi fuq is-swiċċ tal-prokura globali u l-konfigurazzjoni tal-prokura applikabbli. Fornituri sintetiċi mingħajr kont persistenti, traffiku OAuth qabel il-ħolqien tal-kont, prokuri environment/system, u netwerking ta 'backends esterni huma barra l-ambitu tiegħu.

## Sistema ta’ Proxy fuq 4 Livelli

OmniRoute jappoġġja konfigurazzjoni tal-proxy f’**erba’ ambiti indipendenti**, solvuti skont l-ordni ta’ prijorità:

```
Ordni tar-Riżoluzzjoni tal-Prijorità (l-ogħla → l-aktar baxxa):

  1. 🔵 Proxy tal-Kont/Konnessjoni  →  għal kull ċavetta API / konnessjoni OAuth
  2. 🟡 Proxy tal-Fornitur          →  għal kull fornitur (eż., it-traffiku kollu ta’ OpenAI)
  3. 🟠 Proxy tal-Kombinazzjoni     →  għal kull kombinazzjoni/konfigurazzjoni tar-routing
  4. 🟢 Proxy Globali               →  it-traffiku kollu, il-fornituri kollha
```

### Kif Taħdem ir-Riżoluzzjoni

Meta OmniRoute jibgħat talba lil fornitur upstream, isejjaħ `resolveProxyForConnectionFromRegistry()` li jiċċekkja kull livell fl-ordni:

1. **Livell tal-kont** — Hemm proxy assenjat lil dan l-ID speċifiku tal-konnessjoni?
2. **Livell tal-fornitur** — Hemm proxy assenjat lil dan il-fornitur (eż., `openai`)?
3. **Livell globali** — Hemm proxy globali kkonfigurat?
4. **L-ebda proxy** — Konnessjoni diretta mal-fornitur.

L-ewwel taqbila tirbaħ. Dan ifisser li tista’ tissettja proxy globali bħala alternattiva, iżda tissostitwih għal fornituri jew konnessjonijiet speċifiċi.

### X’Jgħaddi mill-Proxy

| Tip ta’ Traffiku              | Jgħaddi mill-Proxy? | Noti                                             |
| ----------------------------- | ------------------- | ------------------------------------------------ |
| Kompletamenti taċ-chat        | ✅                  | It-talbiet kollha lil `/v1/chat/completions`     |
| Embeddings                    | ✅                  | `/v1/embeddings`                                 |
| Ġenerazzjoni tal-immaġnijiet  | ✅                  | `/v1/images/generations`                         |
| Awdjo (TTS/STT)               | ✅                  | `/v1/audio/*`                                    |
| Skambju tat-token OAuth       | ✅                  | Issolvi `unsupported_country_region_territory`   |
| Testijiet tal-konnessjoni     | ✅                  | Il-buttuna "Ittestja l-Konnessjoni" tuża l-proxy |
| Aġġornament tat-token         | ✅                  | Tiġdid ta’ OAuth fl-isfond                       |
| Sinkronizzazzjoni tal-mudelli | ✅                  | Elenkar u skoperta tal-mudelli                   |

---

## Reġistru tal-Proxy (CRUD)

Ir-reġistru tal-proxy huwa tabella SQLite (`proxy_registry`) li taħżen il-proxies kollha tiegħek. Kull proxy għandu:

| Qasam      | Tip     | Deskrizzjoni                                                 |
| ---------- | ------- | ------------------------------------------------------------ |
| `id`       | UUID    | Identifikatur uniku                                          |
| `name`     | String  | Tikketta li tinqara mill-bniedem                             |
| `type`     | String  | Protokoll: `http`, `https`, `socks5`                         |
| `host`     | String  | Isem tal-host jew IP tal-proxy                               |
| `port`     | Integer | Numru tal-port                                               |
| `username` | String  | Isem tal-utent għall-awtentikazzjoni (kriptat waqt il-ħażna) |
| `password` | String  | Password għall-awtentikazzjoni (kriptata waqt il-ħażna)      |
| `region`   | String  | Tikketta tar-reġjun ġeografiku                               |
| `notes`    | String  | Noti b’test liberu                                           |
| `status`   | String  | `active` jew `inactive`                                      |
| `source`   | String  | `manual` jew `oneproxy`                                      |

### Ħolqien ta’ Proxy

**Permezz tad-Dashboard:**

1. Mur f’**Settings → Proxy**
2. Ikklikkja **Add Proxy**
3. Imla t-tip, il-host, il-port, u l-kredenzjali fakultattivi tal-awtentikazzjoni
4. Issejvja

**Permezz tal-API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Aġġornament ta’ Proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Nota:** Il-kredenzjali jinżammu sakemm ma tibgħatx sostituzzjonijiet mhux vojta b’mod espliċitu. Jekk tibgħat strings vojta għal `username`/`password`, il-valuri maħżuna jinżammu.

### Tħassir ta’ Proxy

```bash
# Ifalli jekk il-proxy ikun assenjat lil xi ambitu
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Tħassir sfurzat (ineħħi wkoll l-assenjazzjonijiet)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Elenkar tal-Proxies

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Assenjazzjoni ta’ Proxies lill-Ambiti

```bash
# Assenja lill-ambitu globali
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Assenja lil fornitur speċifiku
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Assenja lil konnessjoni/ċavetta speċifika
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Riżoluzzjoni tal-Proxy Effettiv

Iċċekkja liema proxy jintuża għal konnessjoni partikolari:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Jirritorna l-proxy riżolt flimkien mal-livell tiegħu (`account`, `provider`, jew `global`) u s-sors.

### Assenjazzjoni tal-Massa

Assenja proxy wieħed lil diversi fornituri jew konnessjonijiet f’daqqa:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importazzjoni/Esportazzjoni

Il-proxies huma inklużi fis-sistema ta’ **Backup/Restore**. Meta tesporta l-konfigurazzjoni tiegħek ta’ OmniRoute:

1. Mur f’**Dashboard → Settings → Backup**
2. Ikklikkja **Export** — ir-reġistru tal-proxy u l-assenjazzjonijiet huma inklużi
3. Biex tirrestawra, ikklikkja **Import** u tella’ l-fajl tal-backup

Ir-reġistru tal-proxy jappoġġja wkoll **upsert skont host+port** — jekk timporta proxy li diġà jeżisti (bl-istess host u port), dan jiġi aġġornat minflok ma tinħoloq kopja duplikata.

### Migrazzjoni Legata

Jekk ikkonfigurajt proxies f’verżjoni eqdem (qabel ir-reġistru), OmniRoute jemigrahom awtomatikament:

```
Legacy key_value store → proxy_registry + proxy_assignments
```

Dan iseħħ darba biss mal-ewwel tnedija wara l-aġġornament. Uża `migrateLegacyProxyConfigToRegistry({ force: true })` biex terġa’ tħaddem il-migrazzjoni.

---

## 1Prokura Prokura Ħieles Suq

> 🆕** Kontribut minn [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (Ħruġ [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute tintegra mal-** [1prokura](https://1proxy-api.aitradepulse.com)** pjattaforma komunitarja biex tipprovdi aċċess għal** mijiet ta’ prokuraturi b’xejn u validati** minn madwar id-dinja. Dan huwa perfett għal utenti li m'għandhomx l-infrastruttura tal-prokura tagħhom stess.

### Kif Taħdem

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Sinkronizzazzjoni** — OmniRoute iġib prokuri validati mill-1proxy API
2. **Aħżen** — Proxies huma ssejvjati fl-istess tabella `proxy_registry` ma `source = 'oneproxy'`
3. **Iffiltra** — Iffiltra skond il-protokoll, il-pajjiż, il-punteġġ tal-kwalità
4. **Dawwar** — Agħżel l-aħjar prokura billi tuża strateġiji ta' kwalità, każwali jew sekwenzjali
5. **Auto-degrada** — Prokuraturi falluti jnaqqsu l-punteġġ tal-kwalità tagħhom; taħt il-limitu → immarkat inattiv

### Is-sinkronizzazzjoni tal-Prokuri

**Permezz tad-Dashboard:**

1. Mur fuq** Settings → 1proxy** tab
2. Ikklikkja** "Ssinkronizza Issa"**
3. Ara l-istatistiċi: prokuri totali, għadd attiv, kwalità medja, tqassim skont il-pajjiż

**Via API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Iffiltrar ta' Prokuri

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Punteġġi ta' Kwalità Prokura

Kull proxy 1 proxy jiġi b'metadejta:

| Qasam           | Deskrizzjoni                                    |
| --------------- | ----------------------------------------------- |
| `qualityScore`  | 0-100 klassifikazzjoni mill-validazzjoni 1proxy |
| `latencyMs`     | Latenza tan-netwerk imkejla                     |
| `anonymity`     | `transparent`, `anonymous`, jew `elite`         |
| `googleAccess`  | Jekk il-prokura jistax jaċċessa servizzi Google |
| `countryCode`   | Kodiċi tal-pajjiż ISO b'żewġ ittri              |
| `lastValidated` | Timestamp tal-aħħar validazzjoni                |

Il-punteġġi tal-kwalità huma aġġustati dinamikament:

- **Talbiet falluti** tnaqqas il-punteġġ b'10 punti
- **Score jinżel għal ≤ 10** → proxy huwa mmarkat `inactive`
- Prokuri inattivi huma esklużi mir-rotazzjoni

### Strateġiji ta' Rotazzjoni

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Circuit Breaker

Is-sinkronizzazzjoni 1proxy għandha circuit breaker inkorporat:

- Wara** 5 fallimenti konsekuttivi tas-sinkronizzazzjoni** , aktar tentattivi ta' sinkronizzazzjoni huma mblukkati
- Irrisettja bi: `resetOneproxyCircuitBreaker()` jew ibda mill-ġdid is-server
- L-istatus tas-sinkronizzazzjoni huwa disponibbli fuq `GET /api/settings/oneproxy?action=status`

### Ikklerjar ta' Prokuraturi 1

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Kontra d-Detezzjoni u l-Ħabi

OmniRoute mhux biss jgħaddi t-traffiku minn proxy — jagħmel it-traffiku jidher leġittimu:

### Falsifikazzjoni tal-Marka Diġitali TLS

Juża `wreq-js` biex jiġġenera marki diġitali TLS simili għal dawk tal-brawżers, u b’hekk jevita sistemi ta’ detezzjoni tal-bots li jimmarkaw handshakes TLS mhux ġejjin minn brawżer.

### Tqabbil tal-Marka Diġitali tas-CLI

It-**Toggle tal-Marka Diġitali tas-CLI** (`Settings → Security`) jirranġa mill-ġdid l-headers HTTP u l-fields tal-body JSON biex jaqblu eżattament mal-firma tal-binaries CLI nattivi (Claude Code, Codex, eċċ.). Dan jaħdem **flimkien mal-** proxy:

```
L-IP tiegħek (imblukkat) → IP tal-Proxy (US) → API tal-Fornitur
                            + falsifikazzjoni TLS
                            + marka diġitali tas-CLI
```

Tikseb kemm **ħabi tal-IP** kif ukoll **awtentiċità tat-talba** simultanjament.

### Preservazzjoni tal-IP tal-Proxy

Badges ikkodifikati bil-kuluri fid-dashboard juru liema livell tal-proxy huwa attiv:

| Badge | Livell      | Tifsira                                                 |
| ----- | ----------- | ------------------------------------------------------- |
| 🟢    | Globali     | It-traffiku kollu jgħaddi minn dan il-proxy             |
| 🟡    | Fornitur    | It-traffiku ta’ dan il-fornitur biss jgħaddi mill-proxy |
| 🔵    | Konnessjoni | Din il-key/kont speċifiku juża dan il-proxy             |

Il-badge juri wkoll l-IP riżolt tal-proxy għall-verifika.

---

## Modi tal-Proxy Upstream

Għall-fornituri li jużaw il-mudell CLIProxyAPI, OmniRoute jappoġġja tliet modi ta’ proxy upstream:

| Modalità      | Deskrizzjoni                                                          |
| ------------- | --------------------------------------------------------------------- |
| `native`      | OmniRoute jimmaniġġja direttament ir-routing tal-proxy (default)      |
| `cliproxyapi` | Jiddelega lil istanza esterna ta’ CLIProxyAPI                         |
| `fallback`    | L-ewwel jipprova l-modalità nattiva, imbagħad jaqleb għal CLIProxyAPI |

Ikkonfigura għal kull fornitur:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## UI tad-Dashboard

### Settings → Tab tal-Proxy

- Konfigurazzjoni tal-**proxy globali** (issettjaha darba għat-traffiku kollu)
- Overrides tal-**proxy għal kull fornitur**
- Assenjazzjonijiet tal-**proxy għal kull konnessjoni**
- **Test tal-konnessjoni** permezz tal-proxy kkonfigurat
- **Badges ikkodifikati bil-kuluri** li juru l-livell attiv tal-proxy

### Settings → Tab ta’ 1proxy

- Buttuna **Issinkronizza Issa** biex jinġabru proxies bla ħlas
- **Kards tal-istatistika**: Total, Attivi, Kwalità Medja, L-Aħħar Sinkronizzazzjoni
- **Filtri**: Protokoll, Kodiċi tal-Pajjiż, Kwalità Minima
- **Tabella tal-proxies** b’host, protokoll, pajjiż, punteġġ tal-kwalità, latenza, anonimità u aċċess għal Google
- Panew tal-**istatus tas-sinkronizzazzjoni** b’monitoraġġ tas-suċċessi/fallimenti u għadd ta’ fallimenti konsekuttivi
- **Ħassar Kollox** biex jitneħħew l-entrati kollha ta’ 1proxy

---

## Referenza tal-API

### API tas-Settings tal-Proxy

| Metodu   | Endpoint                                       | Deskrizzjoni                             |
| -------- | ---------------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Ikseb il-konfigurazzjoni sħiħa tal-proxy |
| `GET`    | `/api/settings/proxy?level=global`             | Ikseb il-proxy globali                   |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Ikseb il-proxy tal-fornitur              |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Irrisolvi l-proxy effettiv               |
| `PUT`    | `/api/settings/proxy`                          | Aġġorna l-konfigurazzjoni tal-proxy      |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Neħħi l-proxy f’dan il-livell            |

### API tar-Reġistru tal-Proxies

| Metodu   | Endpoint                                          | Deskrizzjoni                        |
| -------- | ------------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Elenka l-proxies kollha             |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Ikseb proxy skont l-ID              |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Ikseb l-assenjazzjonijiet tal-proxy |
| `POST`   | `/api/v1/management/proxies`                      | Oħloq proxy                         |
| `PATCH`  | `/api/v1/management/proxies`                      | Aġġorna proxy                       |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Ħassar proxy                        |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Sforza t-tħassir                    |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Assenja bil-massa                   |
| `GET`    | `/api/v1/management/proxies/assignments`          | Elenka l-assenjazzjonijiet          |
| `GET`    | `/api/v1/management/proxies/health`               | Statistika tas-saħħa tal-proxies    |

### API tat-Tunnels

Biex tesponi l-istanza OmniRoute tiegħek għall-internet pubbliku (Cloudflare/ngrok/Tailscale) minflok tibgħat it-traffiku ’l barra permezz ta’ proxy, ara [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). L-API REST tat-tunnel tinsab taħt `/api/tunnels/{cloudflared,ngrok,tailscale}/*` u hija indipendenti mill-katina tal-proxy outbound dokumentata hawn fuq.

### API ta’ 1proxy

| Metodu   | Endpoint                               | Deskrizzjoni                                          |
| -------- | -------------------------------------- | ----------------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Elenka l-proxies ta’ 1proxy                           |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Ikseb l-istatistika + l-istatus tas-sinkronizzazzjoni |
| `GET`    | `/api/settings/oneproxy?action=status` | Ikseb biss l-istatus tas-sinkronizzazzjoni            |
| `POST`   | `/api/settings/oneproxy`               | Ibda s-sinkronizzazzjoni                              |
| `POST`   | `/api/settings/oneproxy/rotate`        | Aqleb għall-proxy li jmiss                            |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Ħassar wieħed                                         |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Ħassar kollox                                         |

### API tal-Proxy Upstream

| Metodu   | Endpoint                          | Deskrizzjoni                                |
| -------- | --------------------------------- | ------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Ikseb il-konfigurazzjoni tal-proxy upstream |
| `PUT`    | `/api/upstream-proxy/:providerId` | Issettja l-modalità tal-proxy upstream      |
| `DELETE` | `/api/upstream-proxy/:providerId` | Neħħi l-konfigurazzjoni tal-proxy upstream  |

---

## Varjabbli tal-Ambjent

| Varjabbli             | Valur Predefinit | Deskrizzjoni                                                                              |
| --------------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`           | Ippermetti l-appoġġ għall-proxy SOCKS5 (il-valur predefinit huwa `true` f'`.env.example`) |

---

## Soluzzjoni tal-Problemi

### "Il-proxy SOCKS5 huwa diżattivat"

Issettja `ENABLE_SOCKS5_PROXY=true` fil-fajl `.env` tiegħek u erġa' ibda.

### Żbalji "socket hang up" permezz tal-proxy

Dan huwa normali bi proxies irħas li jagħlqu konnessjonijiet inattivi. OmniRoute diġà jittratta dan billi:

- Jiddiżattiva keep-alive fuq il-konnessjonijiet tal-proxy (`keepAliveTimeout: 1`)
- Jiddiżattiva l-pipelining (`pipelining: 0`)
- Jaħżen id-dispatchers fil-cache biex jevita handshakes ripetuti

Jekk il-problema tippersisti, ipprova proxy differenti jew uża l-karatteristika ta' rotazzjoni ta' 1proxy.

### "unsupported_country_region_territory" matul OAuth

Kun żgur li l-proxy huwa kkonfigurat **qabel** tibda l-fluss OAuth. OmniRoute jidderieġi l-iskambju tat-token OAuth permezz tal-proxy kkonfigurat. L-ewwel issettja proxy globali jew fil-livell tal-fornitur, imbagħad ikkonnettja.

### Il-proxy mhux qed jintuża

Iċċekkja l-ordni tar-riżoluzzjoni:

1. Ivverifika b'`GET /api/settings/proxy?resolve=your-connection-id`
2. Iċċekkja jekk l-`status` tal-proxy huwiex `active` (mhux `inactive`)
3. Kun żgur li l-ambitu tal-assenjazzjoni tal-proxy jaqbel mal-konnessjoni tiegħek

### Is-sinkronizzazzjoni ta' 1proxy qed tfalli

Iċċekkja l-istatus tas-sinkronizzazzjoni:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Jekk `consecutiveFailures >= 5`, is-circuit breaker ikun ġie attivat. Erġa' ibda s-server biex tirrisettjah, jew stenna għal risettjar manwali.

---

## Skema tad-Database

### Tabella `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' jew 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (1proxy biss)
  latency_ms INTEGER,                        -- millisekondi (1proxy biss)
  anonymity TEXT,                            -- trasparenti/anonimu/elite
  google_access INTEGER DEFAULT 0,           -- jista' jaċċessa Google? (1proxy)
  last_validated TEXT,                       -- timestamp ISO (1proxy)
  country_code TEXT,                         -- kodiċi ISO b'2 ittri (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabella `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID tal-fornitur, ID tal-konnessjoni, jew ID tal-combo
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Verifika tas-Saħħa tal-Proxy (v3.8.16+)

Il-mekkaniżmu **proxy fast-fail** ta' OmniRoute (`src/lib/proxyHealth.ts`) jiskopri proxies li ma jaħdmux f'<2s permezz ta' verifika rapida tal-konnessjoni TCP, imbagħad **jaħżen ir-riżultat fil-cache** biex jevita spejjeż addizzjonali għal kull talba.

### Kif Jaħdem

```
Talba ──▶ ProxyHealthCache.get(url)
             │
             ├─ Instab fil-cache + għadu validu?  ──▶ irritorna l-istatus mill-cache
             │
             └─ Mhux fil-cache / skadut?  ──▶ konnessjoni TCP ma' host:port
                                          (timeout: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ aħżen fil-cache għal HEALTH_CACHE_TTL_MS
                                          ──▶ irritorna r-riżultat
```

Mingħajr dan, proxy li ma jaħdimx jimblokka kull talba għall-`PROXY_TIMEOUT_MS` sħiħ (il-valur predefinit huwa 30s) qabel ma jfalli.

### Varjabbli tal-Ambjent Aġġustabbli

| Varjabbli                    | Valur Predefinit | Għan                                                     |
| ---------------------------- | ---------------- | -------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`           | Timeout tal-konnessjoni TCP għal kull verifika tas-saħħa |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`          | Kemm idum maħżun fil-cache riżultat tas-saħħa            |

**Valuri rakkomandati:**

| Xenarju                            | Timeout fast-fail | TTL tal-cache | Raġunament                                                                  |
| ---------------------------------- | ----------------- | ------------- | --------------------------------------------------------------------------- |
| Gateway tal-API bi fluss għoli     | 1500ms            | 60000ms       | Fail-fast aggressiv, cache itwal biex jitnaqqsu l-verifiki                  |
| Nodi ġeografikament distribwiti    | 3000ms            | 15000ms       | Networks aktar bil-mod jeħtieġu aktar ħin; cache iqsar għal failover rapidu |
| Żvilupp / ittestjar                | 1000ms            | 10000ms       | Iterazzjoni rapida fuq proxies lokali                                       |
| Stealth / kontra l-individwazzjoni | 2500ms            | 45000ms       | Evita probing rapidu li jista' jattiva limiti tar-rata                      |

### Spezzjoni tas-Saħħa tal-Proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Ġiegħel verifika mill-ġdid ta' proxy speċifiku
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Il-flag `stale` ikun `true` meta l-entrata fil-cache tkun qabżet `HEALTH_CACHE_TTL_MS` u t-talba li jmiss tiskatta verifika ġdida.

### Valuri Predefiniti għal Kull Tip ta' Proxy

Il-verifika tas-saħħa tuża valuri predefiniti raġonevoli bbażati fuq l-iskema tal-URL:

| Skema                      | Port predefinit |
| -------------------------- | --------------- |
| `http://`                  | 8080            |
| `https://`                 | 443             |
| `socks5://` / `socks5h://` | 1080            |

Ports personalizzati fil-URL (`http://host:9999`) dejjem jieħdu preċedenza fuq il-valur predefinit tal-iskema.

---

## Analitika u Osservabbiltà tal-Proxy

OmniRoute jimmonitorja l-użu ta’ kull proxy biex jgħin lill-operaturi jiddijanjostikaw ix-xejriet tar-routing, iż-żidiet f’daqqa fil-latenza, u l-ħsarat rikorrenti.

### X’Jiġi Mmonitorjat

Għal kull talba li tgħaddi minn proxy kkonfigurat, OmniRoute jirreġistra:

| Metrika      | Deskrizzjoni                                                     |
| ------------ | ---------------------------------------------------------------- |
| `proxy_url`  | URL sħiħ tal-proxy (bil-kredenzjali tal-awtentikazzjoni moħbija) |
| `provider`   | ID tal-fornitur upstream (openai, anthropic, eċċ.)               |
| `latency_ms` | Ħin totali tar-ritorn, inkluż il-handshake tal-proxy             |
| `connect_ms` | Ħin tal-konnessjoni TCP biss                                     |
| `status`     | Kodiċi tal-istatus HTTP mill-upstream                            |
| `error`      | Klassi tal-iżball jekk it-talba falliet                          |
| `timestamp`  | ISO 8601 UTC                                                     |

### Aċċess għad-Data

```bash
# Avvenimenti reċenti tal-proxy
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

L-endpoint reali huwa `/api/usage/proxy-logs` (ara `src/app/api/usage/proxy-logs/route.ts`). Dan l-endpoint jappoġġja:

- `GET /api/usage/proxy-logs` — irkupra l-logs tal-proxy
- `DELETE /api/usage/proxy-logs` — ħassar il-logs kollha tal-proxy

Jekk ikun meħtieġ, l-istatistika aggregata tista’ tiġi kkonsultata direttament mit-tabella `proxy_logs` permezz ta’ SQL. L-interfaċċa tad-dashboard tista’ toffri veduti aggregati.

### Xejriet Komuni

**Identifika proxy instabbli** (jalterna bejn suċċess u falliment):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Sib proxies bil-mod** (latenza p95 > 2s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Siġra tad-Deċiżjonijiet għall-Istrateġija ta’ Rotazzjoni

Meta diversi proxies jiġu assenjati lil ambitu, OmniRoute juża **strateġija ta’ rotazzjoni** biex jagħżel liema wieħed juża għal kull talba. L-istrateġija tiġi kkonfigurata fil-livell tal-ambitu (globali, għal kull fornitur, għal kull kont, għal kull kombinazzjoni).

### Strateġiji Disponibbli

| Strateġija          | Meta għandha tintuża                          | Kompromess                                                                                         |
| ------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `quality` (default) | Produzzjoni bi proxies ta’ kwalità differenti | Jiffavorixxi proxies bi klassifikazzjoni għolja; jista’ jċaħħad lil dawk bi klassifikazzjoni baxxa |
| `random`            | Distribuzzjoni tat-tagħbija, privatezza       | Distribuzzjoni uniformi; jinjora s-sinjali tal-kwalità                                             |
| `sequential`        | Debugging, ittestjar deterministiku           | Idur mal-proxies skont l-ordni; faċli biex tifhem il-loġika tiegħu                                 |

### Siġra tad-Deċiżjonijiet

```
                    Għandek punteġġi tal-kwalità għall-proxies tiegħek?
                    │
        ┌───────────┴───────────┐
        │                       │
       IVA                     LE
        │                       │
   Il-proxies kollha           │
   huma bejn wieħed u ieħor    │
   tal-istess kwalità?          │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  IVA       LE                Uża
   │         │              `random`
   │         │              (distribuzzjoni
   │         │              uniformi tibni data
   │         │              dwar il-kwalità maż-żmien)
   │         │
   │    Uża `quality`
   │    (l-aħjar għal
   │    kwalità mħallta)
   │
Uża `random`
(qassam it-tagħbija
b’mod uniformi)
```

## Esklużjoni ta' Falliment Awtomatiku għall-Prokuri Tiegħek stess

Il-pool tas-suq 1proxy diġà jiddegrada awtomatikament il-prokuri falluti waħdu (ara [Punteġġi tal-Kwalità tal-Prokura](#proxy-quality-scores) ). Għal prokuri** int** miżjud mar-reġistru, l-iskedar tas-saħħa fl-isfond (`src/lib/proxyHealth/scheduler.ts`) jipprovdi l-istess imġieba "eskludi membru mejjet mill-katina awtomatikament", mingħajr ma tħassar xejn:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Kif tidħol f'katina multi-prokura:

1. L-iskeder jistħarreġ kull proxy reġistrat kull `PROXY_HEALTH_INTERVAL_MS` (default 10 min; minimu 1 min).
2. Wara `PROXY_AUTO_REMOVE_AFTER` konsekuttiva** konklussiv** fallimenti (falliment ta' konnessjoni reali — a timeout jew il-5xx tal-mira tas-sonda stess qatt ma jgħodd, ara [Proxy Health Checking](#proxy-health-checking-v3816) ), `status` tal-prokura huwa ssettjat għal `dead`.
3. `dead` huwa wieħed mill-istatus li l-filtru tal-istatus ħaj użat mir-riżoluzzjoni pool/rotation jeskludi, għalhekk rotazzjoni ta 'skop (round-robin / każwali / twaħħal / latency / sessjoni — ara [Siġra tad-Deċiżjoni tal-Istrateġija ta' Rotazzjoni](#rotation-strategy-decision-tree) ) immedjatament tieqaf tagħti dik il-prokura għal talbiet ġodda. L-ebda prokuri oħra fil-pool ma huma affettwati, u l-pool kollu qatt ma jaqa’ lura fis-skiet għal konnessjoni diretta — ara s [-Sistema ta’ Prokura ta’ 4 Livelli](#4-level-proxy-system) fail-closed guard.
4. L-iskeder ikompli jfittex `dead` proxies fuq l-istess intervall. Is-sonda ta' suċċess li jmiss taqleb `status` lura għal `active` u terġa' tidħol fir-rotazzjoni — l-ebda żieda manwali meħtieġa.

Dan huwa apposta** opt-in u mhux distruttiv** : b'mod awtomatiku l-iskeduler jgħodd u jirreġistra biss il-fallimenti (ara l-politika C `decision.ts`), u `PROXY_AUTO_DISABLE` qatt ma jħassar ringiela — li hija għaliha l-bandiera `PROXY_AUTO_REMOVE` separata u aktar aggressiva. Jekk it-tnejn huma ssettjati għal `true`, `PROXY_AUTO_REMOVE` jirbaħ (prokura li waslet biex titħassar m'għandha l-ebda użu għal soft-disable bejniethom). Ara r-referenza [tal-Konfigurazzjoni tal-Ambjent](../reference/ENVIRONMENT.md) għal-lista varjabbli sħiħa.

---

> 📖** Dokumentazzjoni relatata:**
>
> - [Gwida għall-Utent](../guides/USER_GUIDE.md) — Setup u konfigurazzjoni ġenerali - [API Reference](../reference/API_REFERENCE.md) — Dokumentazzjoni sħiħa API - [Environment Config](../reference/ENVIRONMENT.md) — Il-varjabbli ambjentali kollha
