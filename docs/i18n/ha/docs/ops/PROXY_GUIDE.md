# 🌐 OmniRoute Proxy Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Ketare shingen yanki, kare ainihinka, kuma bi da zirga-zirgar AI ta kowace proxy — ba tare da rikitarwar saitawa ba.**

OmniRoute ya ƙunshi cikakken tsarin sarrafa proxy wanda ke ba ka damar bi da zirga-zirgar masu samar da AI na upstream ta HTTP, HTTPS, ko SOCKS5 proxies. Ko kana yankin da aka toshe, kana buƙatar sauya IP akai-akai, ko kuma kana son ɓoye sawun gano na’ura — wannan jagorar ta ƙunshi komai.

---

## Jerin Abubuwan da ke Ciki

- [Me Ya Sa Ake Amfani da Proxies?](#why-use-proxies)
- [Bayanin Tsarin Gine-gine](#architecture-overview)
- [Tsarin Proxy Mai Matakai 4](#4-level-proxy-system)
- [Rajistar Proxy (CRUD)](#proxy-registry-crud)
- [Kasuwar Proxies Kyauta ta 1proxy](#1proxy-free-proxy-marketplace)
- [Sauya Proxy](#proxy-rotation)
- [Kariya Daga Ganowa & Ɓoyewa](#anti-detection--stealth)
- [Yanayin Upstream Proxy](#upstream-proxy-modes)
- [Dashboard UI](#dashboard-ui)
- [Manazartar API](#api-reference)
- [Environment Variables](#environment-variables)
- [Warware Matsaloli](#troubleshooting)

---

## Me Ya Sa Ake Amfani da Proxies?

Yawancin masu samar da AI suna ƙuntata damar shiga bisa yankin ƙasa. Masu haɓaka software a **Rasha, Sin, Iran, Cuba, Turkiyya**, da sauran ƙasashe suna cin karo da kurakurai kamar:

```
unsupported_country_region_territory
```

Ko da a wajen yankunan da aka toshe, proxies suna da amfani ga:

| Yanayin Amfani           | Bayani                                                                   |
| ------------------------ | ------------------------------------------------------------------------ |
| **Ketare shingen yanki** | Samun damar OpenAI, Anthropic, Codex, Copilot daga ƙasashen da aka toshe |
| **Sauya IP**             | Rarraba buƙatu tsakanin IPs da yawa don guje wa iyakance yawan buƙatu    |
| **Sirri**                | Ɓoye ainihin IP ɗinka daga masu samar da upstream                        |
| **Bin ƙa’idoji**         | Bi da zirga-zirga ta takamaiman yankunan ikon shari’a                    |
| **Gwaji**                | Kwaikwayon buƙatu daga yankuna daban-daban                               |

---

## Bayanin Tsarin Gine-gine

```
┌───────────────────────────────────────────────────────────────┐
│                       Sabar OmniRoute                         │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Rajistar    │    │ Mai Rarraba  │    │ Proxy            │  │
│  │ Proxy       │───▶│ Proxy        │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (cached)     │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Daidaitawar │                        │ API na Mai       │  │
│  │ 1proxy      │                        │ Samar da Upstream│  │
│  │ (free pool) │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Muhimman Sassa

| Sashi                 | Fayil                                        | Aiki                                                           |
| --------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| **Rajistar Proxy**    | `src/lib/db/proxies.ts`                      | CRUD don bayanan proxy + rabon scopes                          |
| **Mai Rarraba Proxy** | `open-sse/utils/proxyDispatcher.ts`          | Ƙirƙirar `undici` ProxyAgent/SOCKS dispatchers tare da caching |
| **Proxy Fetch**       | `open-sse/utils/proxyFetch.ts`               | Na lulluɓe `fetch()` tare da shigar da proxy dispatcher        |
| **Settings Route**    | `src/app/api/settings/proxy/route.ts`        | API na tsohon tsarin proxy (GET/PUT/DELETE)                    |
| **Management Route**  | `src/app/api/v1/management/proxies/route.ts` | API na CRUD na rajista (GET/POST/PATCH/DELETE)                 |
| **1proxy DB**         | `src/lib/db/oneproxy.ts`                     | Adana bayanan kasuwar proxies kyauta                           |

---

## Tsohuwar jihar wakili don sababbin asusu

A ciki** Saituna → Proxy → Tsarin Duniya** , amfani** Kunna wakili ta tsohuwa don sababbin haɗi** don zaɓar matsayin wakili na farko na sabbin ƙarin asusun mai ba da sabis.

Sabon saitin yana sarrafa yanayin wakili na farko na sabbin asusun masu bada da aka ƙara. Ba ya canza asusu masu wanzuwa ko maye gurbin canjin wakili na duniya. Ƙimar farko ta tana kiyaye halayen da suka gabata. Kashe shi sau ɗaya don ƙirƙirar asusun nan gaba tare da kashe wakili ta tsohuwa.

Ana adana zaɓin azaman `defaultNewConnectionProxyEnabled` ta cikin Saitunan da ke akwai API. Yana saɓawa zuwa `true` lokacin da ba a adana shi ba. Ajiye `false` yana aiki don sabbin asusu na gaba ba tare da sake farawa ba. `POST /api/providers` ya yarda da wani zaɓi na zaɓi mai tsauri `proxyEnabled`; bayyanannen `true` ko `false` yana ɗaukan fifiko akan tsohowar halitta. Ragewa akan kwafin asusu ko sake haɗin OAuth yana adana yanayin da aka adana asusu. Har yanzu ana iya kunna ko kashe asusun ɗaya bayan haka.

Canja wurin mai ba da zaɓaɓɓu yana amfani da tsohowar shigarwar wurin da za a shigar don sababbin asusu da adana manufofin manufa lokacin da ake maye gurbin asusun da ke akwai. Toggles wakili ba filayen canja wuri ba ne. Cikakkun gyare-gyaren ajiyar ajiya da ƙaura JSON/SQL na tarihi suna riƙe da abubuwan da suka dace na maido da su, gami da ajiyayyun ƙimar asusu da gazawar tsarin gado; cikakken saituna mayar kuma zai iya mayar da wannan zaɓin.

Wannan zaɓin baya sanya wakili ko tabbatar da cewa mutum yana da koshin lafiya ko ana amfani dashi. Haƙiƙan hanyar tuƙi har yanzu ya dogara da canjin wakili na duniya da daidaitawar wakili. Masu samar da roba ba tare da dagewar asusu ba, zirga-zirgar OAuth kafin ƙirƙirar asusun, environment/system proxies, da hanyoyin sadarwar mara waya na waje ba su da iyaka.

## Tsarin Proxy Mai Matakai 4

OmniRoute yana goyon bayan daidaita proxy a **matakai huɗu masu zaman kansu**, waɗanda ake tantancewa bisa jerin fifiko:

```
Jerin Tantance Fifiko (mafi girma → mafi ƙanƙanta):

  1. 🔵 Proxy na Asusu/Haɗi       →  ga kowane API key / haɗin OAuth
  2. 🟡 Proxy na Mai Bayarwa      →  ga kowane mai bayarwa (misali, duk zirga-zirgar OpenAI)
  3. 🟠 Proxy na Combo            →  ga kowane tsarin combo/routing
  4. 🟢 Proxy na Duniya           →  duk zirga-zirga, duk masu bayarwa
```

### Yadda Tantancewa Ke Aiki

Lokacin da OmniRoute ya aika buƙata zuwa wani mai bayarwa na waje, yana kiran `resolveProxyForConnectionFromRegistry()` wanda ke duba kowane mataki bisa jeri:

1. **Matakin asusu** — Shin akwai proxy da aka sanya wa wannan takamaiman ID na haɗi?
2. **Matakin mai bayarwa** — Shin akwai proxy da aka sanya wa wannan mai bayarwa (misali, `openai`)?
3. **Matakin duniya** — Shin an daidaita proxy na duniya?
4. **Babu proxy** — Haɗi kai tsaye zuwa mai bayarwa.

Wanda aka fara samu shi ake amfani da shi. Wannan yana nufin za ka iya saita proxy na duniya a matsayin madadin, amma ka maye gurbinsa ga takamaiman masu bayarwa ko haɗe-haɗe.

### Abubuwan da Ake Bi ta Proxy

| Nau'in Zirga-zirga     | Ana Bi ta Proxy? | Bayanan kula                                        |
| ---------------------- | ---------------- | --------------------------------------------------- |
| Kammalawar tattaunawa  | ✅               | Duk buƙatun `/v1/chat/completions`                  |
| Embeddings             | ✅               | `/v1/embeddings`                                    |
| Ƙirƙirar hoto          | ✅               | `/v1/images/generations`                            |
| Sauti (TTS/STT)        | ✅               | `/v1/audio/*`                                       |
| Musayar token na OAuth | ✅               | Yana warware `unsupported_country_region_territory` |
| Gwajin haɗi            | ✅               | Maɓallin "Gwada Haɗi" yana amfani da proxy          |
| Sabunta token          | ✅               | Sabunta OAuth a bayan fage                          |
| Daidaita samfurori     | ✅               | Jera da gano samfurori                              |

---

## Rijistar Proxy (CRUD)

Rijistar proxy tebur ne na SQLite (`proxy_registry`) wanda ke adana dukkan proxy-proxy ɗinka. Kowane proxy yana da:

| Filin      | Nau'i   | Bayani                                                   |
| ---------- | ------- | -------------------------------------------------------- |
| `id`       | UUID    | Mai ganowa na musamman                                   |
| `name`     | String  | Lakabi mai sauƙin fahimta                                |
| `type`     | String  | Ka'ida: `http`, `https`, `socks5`                        |
| `host`     | String  | Sunan host ko IP na proxy                                |
| `port`     | Integer | Lambar port                                              |
| `username` | String  | Sunan mai amfani na tantancewa (an ɓoye shi yayin ajiya) |
| `password` | String  | Kalmar sirrin tantancewa (an ɓoye ta yayin ajiya)        |
| `region`   | String  | Lakabin yankin ƙasa                                      |
| `notes`    | String  | Bayanan rubutu na zaɓi                                   |
| `status`   | String  | `active` ko `inactive`                                   |
| `source`   | String  | `manual` ko `oneproxy`                                   |

### Ƙirƙirar Proxy

**Ta Dashboard:**

1. Je zuwa **Settings → Proxy**
2. Danna **Add Proxy**
3. Cika nau'i, host, port, da bayanan tantancewa na zaɓi
4. Ajiye

**Ta API:**

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

### Sabunta Proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Lura:** Ana kiyaye bayanan tantancewa sai dai idan ka aika sabbin bayanai marasa fanko kai tsaye. Aika zaren da babu komai a ciki don `username`/`password` zai sa a ci gaba da amfani da ƙimomin da aka adana.

### Share Proxy

```bash
# Zai gaza idan an sanya proxy ga kowane mataki
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Share da ƙarfi (yana cire abubuwan da aka sanya masa ma)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Jera Proxy-Proxies

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Sanya Proxy-Proxies ga Matakai

```bash
# Sanya ga matakin duniya
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Sanya ga takamaiman mai bayarwa
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Sanya ga takamaiman haɗi/key
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Tantance Proxy da Za a Yi Amfani da Shi

Bincika proxy ɗin da za a yi amfani da shi ga wani takamaiman haɗi:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Yana dawo da proxy da aka tantance tare da matakinsa (`account`, `provider`, ko `global`) da tushensa.

### Sanya ga Abubuwa da Yawa

Sanya proxy ɗaya ga masu bayarwa ko haɗe-haɗe da yawa a lokaci guda:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Shigo da/Fitar da Bayanai

Ana haɗa proxy-proxies cikin tsarin **Backup/Restore**. Lokacin da ka fitar da daidaitawar OmniRoute ɗinka:

1. Je zuwa **Dashboard → Settings → Backup**
2. Danna **Export** — an haɗa rijistar proxy da abubuwan da aka sanya
3. Don maidowa, danna **Import** sannan ka loda fayil ɗin ajiyar bayanai

Rijistar proxy kuma tana goyon bayan **upsert ta host+port** — idan ka shigo da proxy wanda ya riga ya wanzu (host da port iri ɗaya), za a sabunta shi maimakon ƙirƙirar kwafi.

### Ƙaura daga Tsohon Tsari

Idan ka saita proxies a tsohuwar sigar (kafin registry), OmniRoute zai ƙaura da su ta atomatik:

```
Tsohon ma’ajin key_value → proxy_registry + proxy_assignments
```

Wannan yana faruwa sau ɗaya a fara kunnawa bayan sabuntawa. Yi amfani da `migrateLegacyProxyConfigToRegistry({ force: true })` don sake gudanar da shi.

---

## 1 Wakili Kyautar Kasuwa

> 🆕** [@oyi77](https://github.com/oyi77) ne ya bayar da gudunmawa** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (Batun [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute hadewa da** [1 wakili](https://1proxy-api.aitradepulse.com)** dandalin al'umma don samar da dama ga** ɗaruruwan kyauta, ingantattun wakilai** daga ko'ina cikin duniya. Wannan cikakke ne ga masu amfani waɗanda ba su da nasu kayan aikin wakili.

### Yadda Ake Aiki

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Aiki tare** — OmniRoute yana ɗaukar ingantattun wakilai daga 1proxy API
2. **Store** — ana ajiye wakilai a cikin tebur `proxy_registry` ɗaya tare da `source = 'oneproxy'`
3. **Tace** — Tace ta hanyar yarjejeniya, ƙasa, ƙimar inganci
4. **Juyawa** — Zaɓi mafi kyawun wakili ta amfani da inganci, bazuwar, ko dabarun jeri
5. **Ƙaddamarwa ta atomatik** — Waɗanda suka gaza sun sami raguwar ƙimar ƙimar su; kasa bakin kofa → alamar mara aiki

### Ana daidaita Proxies

**Ta hanyar Dashboard:**

1. Je zuwa** Saituna → 1proxy** tab
2. Danna** "Sync Now"**
3. Duba ƙididdiga: jimlar wakilai, ƙidayar aiki, matsakaicin inganci, rugujewar ƙasa

**Ta API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Tace Proxies

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

### Makin Nagartattun Wakilai

Kowane wakili na 1 yana zuwa da metadata:

| Filin           | Bayani                                       |
| --------------- | -------------------------------------------- |
| `qualityScore`  | 0-100 rating daga 1 wakili ingantacce        |
| `latencyMs`     | An auna jinkirin hanyar sadarwa              |
| `anonymity`     | `transparent`, `anonymous`, ko `elite`       |
| `googleAccess`  | Ko wakili zai iya samun damar ayyukan Google |
| `countryCode`   | Harafi biyu ISO lambar ƙasa                  |
| `lastValidated` | Tambarin tabbatarwa na ƙarshe                |

Ana daidaita makin masu inganci sosai:

- **Buƙatun da ba a yi nasara ba** rage maki da maki 10
- **Maki ya ragu zuwa ≤ 10** → wakili ana yiwa alama `inactive`
- An keɓe wakilai marasa aiki daga juyawa

### Dabarun Juyawa

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

### Mai Satar Zama

Aiki tare na wakili na 1 yana da ginanniyar keɓaɓɓiyar kewayawa:

- Bayan** gazawar daidaitawa guda 5 a jere** , Ana toshe ƙarin ƙoƙarin daidaitawa
- Sake saitin tare da: `resetOneproxyCircuitBreaker()` ko sake kunna uwar garken
- Ana samun halin daidaitawa a `GET /api/settings/oneproxy?action=status`

### Share Proxy Proxies 1

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Kauce wa Ganowa & Ɓoye Kai

OmniRoute ba wai kawai yana tura zirga-zirga ta cikin proxy ba ne — yana sa zirga-zirgar ta yi kama da halastacciya:

### Kwaikwayon Sawun Yatsa na TLS

Yana amfani da `wreq-js` don samar da sawun yatsan TLS mai kama da na burauza, yana kauce wa tsarin gano bot da ke yi wa musayar haɗin TLS da ba ta burauza ba alama.

### Daidaita Sawun Yatsan CLI

**Maɓallin Kunna/Kashe Sawun Yatsan CLI** (`Settings → Security`) yana sake tsara HTTP headers da filayen JSON body don su dace da ainihin sa hannun binaries na CLI na asali (Claude Code, Codex, da sauransu). Wannan yana aiki **a saman** proxy:

```
IP ɗinka (an toshe) → IP na Proxy (US) → API na Mai Bayarwa
                      + kwaikwayon TLS
                      + sawun yatsan CLI
```

Za ka samu duka **ɓoye IP** da **ingancin buƙata** a lokaci guda.

### Kiyaye IP na Proxy

Alamomi masu launuka a dashboard suna nuna matakin proxy da ke aiki:

| Alama | Mataki      | Ma’ana                                                    |
| ----- | ----------- | --------------------------------------------------------- |
| 🟢    | Na Duniya   | Duk zirga-zirga tana bi ta wannan proxy                   |
| 🟡    | Mai Bayarwa | Zirga-zirgar wannan mai bayarwa kaɗai ake bi ta proxy     |
| 🔵    | Haɗi        | Wannan takamaiman key/account yana amfani da wannan proxy |

Alamar kuma tana nuna IP na proxy da aka tantance domin tabbatarwa.

---

## Yanayin Upstream Proxy

Ga masu bayarwa da ke amfani da tsarin CLIProxyAPI, OmniRoute yana goyon bayan yanayin upstream proxy guda uku:

| Yanayi        | Bayani                                                   |
| ------------- | -------------------------------------------------------- |
| `native`      | OmniRoute yana sarrafa tura proxy kai tsaye (na asali)   |
| `cliproxyapi` | Yana miƙa aikin ga wata instance ta CLIProxyAPI ta waje  |
| `fallback`    | Yana fara gwada native, idan ya gaza ya koma CLIProxyAPI |

Saita ga kowane mai bayarwa:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Fuskar Dashboard

### Settings → Shafin Proxy

- Saitin **global proxy** (saita sau ɗaya domin duk zirga-zirga)
- Sauye-sauyen **proxy na kowane mai bayarwa**
- Sanya **proxy na kowane haɗi**
- **Gwajin haɗi** ta cikin proxy da aka saita
- **Alamomi masu launuka** da ke nuna matakin proxy mai aiki

### Settings → Shafin 1proxy

- Maɓallin **Sync Now** don ɗauko proxies na kyauta
- **Katunan ƙididdiga**: Jimilla, Masu Aiki, Matsakaicin Inganci, Daidaitawa ta Ƙarshe
- **Matatu**: Protocol, Lambar Ƙasa, Mafi Ƙarancin Inganci
- **Teburin proxy** mai ɗauke da host, protocol, ƙasa, makin inganci, latency, ɓoye-suna, damar shiga Google
- Sashen **matsayin daidaitawa** mai bin diddigin nasara/rashin nasara da adadin gazawa a jere
- **Clear All** don cire duk shigarwar 1proxy

---

## Bayanin API

### API na Saitunan Proxy

| Hanya    | Endpoint                                       | Bayani                      |
| -------- | ---------------------------------------------- | --------------------------- |
| `GET`    | `/api/settings/proxy`                          | Samu cikakken saitin proxy  |
| `GET`    | `/api/settings/proxy?level=global`             | Samu global proxy           |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Samu proxy na mai bayarwa   |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Tantance proxy mai aiki     |
| `PUT`    | `/api/settings/proxy`                          | Sabunta saitin proxy        |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Cire proxy a wannan matakin |

### API na Rijistar Proxy

| Hanya    | Endpoint                                          | Bayani                    |
| -------- | ------------------------------------------------- | ------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Jera duk proxies          |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Samu proxy ta ID          |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Samu wuraren sanya proxy  |
| `POST`   | `/api/v1/management/proxies`                      | Ƙirƙiri proxy             |
| `PATCH`  | `/api/v1/management/proxies`                      | Sabunta proxy             |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Share proxy               |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Tilasta sharewa           |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Sanya da yawa lokaci guda |
| `GET`    | `/api/v1/management/proxies/assignments`          | Jera wuraren sanya proxy  |
| `GET`    | `/api/v1/management/proxies/health`               | Ƙididdigar lafiyar proxy  |

### API na Tunnels

Don fallasa instance ɗinka na OmniRoute ga intanet na jama'a (Cloudflare/ngrok/Tailscale) maimakon tura zirga-zirga mai fita ta cikin proxy, duba [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST API na tunnel yana ƙarƙashin `/api/tunnels/{cloudflared,ngrok,tailscale}/*` kuma ya zaman kansa daga jerin proxy mai fita da aka bayyana a sama.

### API na 1proxy

| Hanya    | Endpoint                               | Bayani                               |
| -------- | -------------------------------------- | ------------------------------------ |
| `GET`    | `/api/settings/oneproxy`               | Jera proxies na 1proxy               |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Samu ƙididdiga + matsayin daidaitawa |
| `GET`    | `/api/settings/oneproxy?action=status` | Samu matsayin daidaitawa kawai       |
| `POST`   | `/api/settings/oneproxy`               | Fara daidaitawa                      |
| `POST`   | `/api/settings/oneproxy/rotate`        | Juya zuwa proxy na gaba              |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Share guda ɗaya                      |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Share duka                           |

### API na Upstream Proxy

| Hanya    | Endpoint                          | Bayani                       |
| -------- | --------------------------------- | ---------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Samu saitin upstream proxy   |
| `PUT`    | `/api/upstream-proxy/:providerId` | Saita yanayin upstream proxy |
| `DELETE` | `/api/upstream-proxy/:providerId` | Cire saitin upstream proxy   |

---

## Sauye-sauyen Muhalli

| Sauyi                 | Tsoho  | Bayani                                                                      |
| --------------------- | ------ | --------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | Kunna tallafin proxy na SOCKS5 (tsoho shi ne `true` a cikin `.env.example`) |

---

## Magance Matsaloli

### "An kashe proxy na SOCKS5"

Saita `ENABLE_SOCKS5_PROXY=true` a cikin fayil ɗin `.env` sannan ka sake farawa.

### Kurakuran "socket hang up" ta hanyar proxy

Wannan abu ne na yau da kullum ga proxy masu arha waɗanda ke katse haɗin da ba ya aiki. OmniRoute ya riga ya magance wannan ta hanyar:

- Kashe keep-alive a haɗin proxy (`keepAliveTimeout: 1`)
- Kashe pipelining (`pipelining: 0`)
- Adana dispatchers a cache don guje wa maimaita handshakes

Idan matsalar ta ci gaba, gwada wani proxy daban ko amfani da fasalin juyawar 1proxy.

### "unsupported_country_region_territory" yayin OAuth

Tabbatar an saita proxy **kafin** fara tsarin OAuth. OmniRoute yana bi da musayar token na OAuth ta proxy da aka saita. Da farko saita proxy na gaba ɗaya ko na matakin provider, sannan ka haɗa.

### Ba a amfani da proxy

Duba tsarin warwarewa:

1. Tabbatar da `GET /api/settings/proxy?resolve=your-connection-id`
2. Duba ko `status` na proxy shi ne `active` (ba `inactive` ba)
3. Tabbatar cewa iyakar sanya proxy ta dace da haɗinka

### Aiki tare na 1proxy yana gazawa

Duba matsayin aiki tare:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Idan `consecutiveFailures >= 5`, circuit breaker ya kunna. Sake kunna uwar garken don sake saita shi, ko jira a sake saita shi da hannu.

---

## Tsarin Bayanai

### Jadawalin `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' ko 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (1proxy kawai)
  latency_ms INTEGER,                        -- milliseƙan (1proxy kawai)
  anonymity TEXT,                            -- bayyane/maras suna/elite
  google_access INTEGER DEFAULT 0,           -- zai iya shiga Google? (1proxy)
  last_validated TEXT,                       -- hatimin lokaci na ISO (1proxy)
  country_code TEXT,                         -- lambar haruffa 2 ta ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Jadawalin `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID na provider, ID na connection, ko ID na combo
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Duba Lafiyar Proxy (v3.8.16+)

Tsarin **proxy fast-fail** na OmniRoute (`src/lib/proxyHealth.ts`) yana gano proxy da ba sa aiki cikin <2s ta hanyar saurin duba haɗin TCP, sannan ya **adana sakamakon a cache** don guje wa ƙarin nauyi ga kowace buƙata.

### Yadda Yake Aiki

```
Buƙata ──▶ ProxyHealthCache.get(url)
             │
             ├─ An same shi a cache + sabo ne?  ──▶ mayar da matsayin da aka adana
             │
             └─ Babu a cache / ya tsufa?  ──▶ haɗa TCP zuwa host:port
                                               (lokacin ƙarewa: FAST_FAIL_TIMEOUT_MS)
                                               ──▶ adana a cache na HEALTH_CACHE_TTL_MS
                                               ──▶ mayar da sakamako
```

Ba tare da wannan ba, proxy da ba ya aiki zai toshe kowace buƙata har tsawon cikakken `PROXY_TIMEOUT_MS` (tsoho 30s) kafin ya gaza.

### Sauye-sauyen Muhalli Masu Daidaituwa

| Sauyi                        | Tsoho   | Manufa                                              |
| ---------------------------- | ------- | --------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | Lokacin ƙarewar haɗin TCP ga kowane binciken lafiya |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | Tsawon lokacin adana sakamakon lafiya a cache       |

**Ƙimomin da aka ba da shawara:**

| Yanayi                          | Lokacin ƙarewar fast-fail | Cache TTL | Dalili                                                                                      |
| ------------------------------- | ------------------------- | --------- | ------------------------------------------------------------------------------------------- |
| Ƙofar API mai yawan zirga-zirga | 1500ms                    | 60000ms   | Gaggauta gazawa, cache mai tsawo don rage bincike                                           |
| Nodes da aka rarraba ta wurare  | 3000ms                    | 15000ms   | Hanyoyin sadarwa masu jinkiri na buƙatar ƙarin lokaci; gajeren cache don saurin sauya hanya |
| Haɓakawa / gwaji                | 1000ms                    | 10000ms   | Saurin maimaita gwaji a kan proxy na gida                                                   |
| Ɓoyewa / hana ganowa            | 2500ms                    | 45000ms   | Guje wa bincike akai-akai wanda zai iya kunna iyakokin ƙima                                 |

### Bincika Lafiyar Proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Tilasta sake duba wani takamaiman proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Alamar `stale` tana zama `true` idan shigarwar cache ta wuce `HEALTH_CACHE_TTL_MS` kuma buƙata ta gaba za ta jawo sabon bincike.

### Tsoffin Ƙimomi Bisa Nau'in Kowane Proxy

Binciken lafiya yana amfani da tsoffin ƙimomi masu dacewa bisa tsarin URL:

| Tsari                      | Tsohuwar tashar |
| -------------------------- | --------------- |
| `http://`                  | 8080            |
| `https://`                 | 443             |
| `socks5://` / `socks5h://` | 1080            |

Tashoshin da aka keɓance a cikin URL (`http://host:9999`) koyaushe suna da fifiko a kan tsohuwar tashar tsarin.

---

## Nazarin Proxy da Sa Ido

OmniRoute yana bin diddigin amfani da kowane proxy don taimaka wa masu gudanarwa gano tsarin zaɓin hanya, hauhawar jinkiri, da matsalolin da ke maimaituwa.

### Abubuwan da Ake Bibiyarsu

Ga kowace buƙata da ta bi ta wani proxy da aka saita, OmniRoute yana adana:

| Ma'auni      | Bayani                                                         |
| ------------ | -------------------------------------------------------------- |
| `proxy_url`  | Cikakken URL na proxy (an ɓoye bayanan tabbatarwa)             |
| `provider`   | ID na mai samarwa na upstream (openai, anthropic, da sauransu) |
| `latency_ms` | Jimillar lokacin tafiya da dawowa, har da haɗawar proxy        |
| `connect_ms` | Lokacin haɗin TCP kaɗai                                        |
| `status`     | Lambar matsayin HTTP daga upstream                             |
| `error`      | Nau'in kuskure idan buƙatar ta gaza                            |
| `timestamp`  | ISO 8601 UTC                                                   |

### Samun Bayanai

```bash
# Abubuwan da suka faru kwanan nan na proxy
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Ainihin endpoint ɗin shi ne `/api/usage/proxy-logs` (duba `src/app/api/usage/proxy-logs/route.ts`). Wannan endpoint yana tallafawa:

- `GET /api/usage/proxy-logs` — dawo da rajistocin proxy
- `DELETE /api/usage/proxy-logs` — share duk rajistocin proxy

Idan ana buƙata, ana iya neman ƙididdigar jimilla kai tsaye daga teburin `proxy_logs` ta hanyar SQL. UI na dashboard na iya samar da duban ƙididdigar jimilla.

### Tsarukan da Aka Saba Gani

**Gano proxy mai sauyawa akai-akai** (yana canzawa tsakanin nasara da gazawa):

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

**Nemo proxy masu jinkiri** (jinkirin p95 > 2s):

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

## Bishiyar Yanke Shawarar Dabarar Juyawa

Lokacin da aka sanya proxy da yawa ga wani fage, OmniRoute yana amfani da **dabarar juyawa** don zaɓar wanda zai yi amfani da shi ga kowace buƙata. Ana saita dabarar a matakin fage (na gaba ɗaya, na kowane mai samarwa, na kowane asusu, na kowane haɗi).

### Dabarun da Ake Da Su

| Dabara            | Lokacin amfani                                        | Sakamakon rangwame                                                        |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| `quality` (tsoho) | Aiki na zahiri tare da proxy masu inganci daban-daban | Yana fifita proxy masu ƙima mai kyau; ƙila ya hana marasa ƙima samun aiki |
| `random`          | Rarraba nauyi, sirri                                  | Rarrabawa daidai; yana yin watsi da alamun inganci                        |
| `sequential`      | Gyaran kurakurai, gwaji mai tabbataccen tsari         | Yana zagayawa ta proxy bisa jeri; yana da sauƙin fahimta                  |

### Bishiyar Yanke Shawara

```
                    Kuna da makin inganci na proxy ɗinku?
                    │
        ┌───────────┴───────────┐
        │                       │
       EH                      A'A
        │                       │
   Shin duk proxy              │
   kusan daidai suke              │
   wajen inganci?                │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  EH       A'A                Yi amfani da
   │         │              `random`
   │         │              (rarrabawa daidai
   │         │              tana tara bayanan
   │         │              inganci a hankali)
   │         │
   │    Yi amfani da `quality`
   │    (shi ya fi dacewa da
   │    inganci iri-iri)
   │
Yi amfani da `random`
(rarraba nauyi
daidai)
```

## Keɓewar Kasawar atomatik don Wakilan ku

Wurin wakilta na 1proxy ya riga ya lalata abubuwan wakilci da kansa (duba [Proxy Quality Scores](#proxy-quality-scores) ). Domin wakilai** ka** ƙara zuwa wurin yin rajista, mai tsara tsarin kiwon lafiya na baya (`src/lib/proxyHealth/scheduler.ts`) yana ba da irin wannan "ban da mataccen memba daga sarkar ta atomatik", ba tare da share wani abu ba:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Yadda ya dace da sarkar wakili mai yawa:

1. Mai tsara jadawalin yana bincika kowane wakili mai rijista kowane `PROXY_HEALTH_INTERVAL_MS` (tsoho 10 min; ƙaramar min 1).
2. Bayan `PROXY_AUTO_REMOVE_AFTER` a jere** m** gazawar (rashin haɗin kai na gaske — lokacin ƙarewa ko nasa 5xx na bincike bai taɓa ƙidaya ba, duba [Proxy Health Checking](#proxy-health-checking-v3816) ), an saita `status` na wakili zuwa `dead`.
3. `dead` yana ɗaya daga cikin ma'aunin tace mai rai da ƙudurin pool/rotation ke amfani da shi, don haka jujjuyawar iyaka (zagaye-robin / random / sticky / latency / session — duba [Juya Dabarun Yanke shawarar Bishiyar](#rotation-strategy-decision-tree) ) nan da nan ya daina mika wannan wakili ga sababbin buƙatun. Babu wasu wakilai a cikin tafkin da abin ya shafa, kuma duk tafkin bai taɓa yin shuru ba ya koma ga haɗin kai tsaye — duba [Tsarin Proxy-Level 4](#4-level-proxy-system) ya kasa rufewa.
4. Mai tsara jadawalin yana ci gaba da binciken `dead` a lokaci guda. Binciken nasara na gaba yana jujjuya `status` zuwa `active` kuma yana sake shigar da juyawa — babu sake ƙarawa da hannu da ake buƙata.

Wannan shi ne da gangan** ficewa da mara lalacewa** : ta tsohuwa mai tsara jadawalin kawai yana ƙididdigewa kuma ya yi rikodin gazawar (duba manufofin C a cikin `decision.ts`), kuma `PROXY_AUTO_DISABLE` baya share — jere wanda shine abin da ya bambanta, tuta ta `PROXY_AUTO_REMOVE` mai tsananin zafi. Idan an saita su zuwa `true`, `PROXY_AUTO_REMOVE` yayi nasara (wakilin da ke shirin sharewa ba shi da wani amfani ga mai laushi mai laushi a tsakanin). Dubi ma'anar Saitin [Muhalli](../reference/ENVIRONMENT.md) don cikakken jerin m.

---

> 📖** Takaddun da ke da alaƙa:**
>
> - [Jagorar mai amfani](../guides/USER_GUIDE.md) — Gabaɗaya saitin da daidaitawa - [API Reference](../reference/API_REFERENCE.md) — Cikakkun takaddun API - [Tsarin Muhalli](../reference/ENVIRONMENT.md) — Duk masu canjin yanayi
