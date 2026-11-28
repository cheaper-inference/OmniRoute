# 🌐 OmniRoute Proxy Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Mööduge geograafilistest blokeeringutest, kaitske oma identiteeti ja suunake tehisintellekti liiklus mis tahes puhverserveri kaudu — ilma keeruka seadistamiseta.**

OmniRoute sisaldab täisfunktsionaalset puhverserverite haldussüsteemi, mis võimaldab suunata tehisintellekti teenusepakkujate ülesvooluliikluse HTTP-, HTTPS- või SOCKS5-puhverserverite kaudu. Olenemata sellest, kas asute blokeeritud piirkonnas, vajate IP-aadresside roteerimist või soovite varjatud sõrmejäljestamist — see juhend hõlmab kõike.

---

## Sisukord

- [Miks kasutada puhverservereid?](#why-use-proxies)
- [Arhitektuuri ülevaade](#architecture-overview)
- [4-tasemeline puhverserverisüsteem](#4-level-proxy-system)
- [Puhverserverite register (CRUD)](#proxy-registry-crud)
- [1proxy tasuta turg](#1proxy-free-proxy-marketplace)
- [Puhverserverite roteerimine](#proxy-rotation)
- [Tuvastamisvastane kaitse ja varjatud režiim](#anti-detection--stealth)
- [Ülesvoolu puhverserveri režiimid](#upstream-proxy-modes)
- [Juhtpaneeli kasutajaliides](#dashboard-ui)
- [API viide](#api-reference)
- [Keskkonnamuutujad](#environment-variables)
- [Tõrkeotsing](#troubleshooting)

---

## Miks kasutada puhverservereid?

Paljud tehisintellekti teenusepakkujad piiravad juurdepääsu geograafilise piirkonna alusel. Arendajad **Venemaal, Hiinas, Iraanis, Kuubal, Türgis** ja teistes riikides puutuvad kokku näiteks järgmise veaga:

```
unsupported_country_region_territory
```

Puhverserverid on kasulikud ka väljaspool blokeeritud piirkondi:

| Kasutusjuht                   | Kirjeldus                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------- |
| **Geograafiline möödapääs**   | Juurdepääs OpenAI-le, Anthropicule, Codexile ja Copilotile blokeeritud riikidest |
| **IP-aadresside roteerimine** | Päringute jaotamine mitme IP-aadressi vahel kiirusepiirangute vältimiseks        |
| **Privaatsus**                | Oma tegeliku IP-aadressi varjamine ülesvoolu teenusepakkujate eest               |
| **Nõuetele vastavus**         | Liikluse suunamine kindlate jurisdiktsioonide kaudu                              |
| **Testimine**                 | Eri piirkondadest pärinevate päringute simuleerimine                             |

---

## Arhitektuuri ülevaade

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute'i server                      │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Puhverserverite│  │ Puhverserveri│    │ Puhverserveri   │  │
│  │ register    │───▶│ dispetšer    │───▶│ fetch (undici)   │  │
│  │ (SQLite)    │    │ (vahemälus)  │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy      │                        │ Ülesvoolu        │  │
│  │ sünkroonimine│                       │ teenusepakkuja API│  │
│  │ (tasuta kogum)│                      │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Põhikomponendid

| Komponent                    | Fail                                         | Roll                                                                 |
| ---------------------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| **Puhverserverite register** | `src/lib/db/proxies.ts`                      | Puhverserverikirjete CRUD ja ulatuste määramine                      |
| **Puhverserveri dispetšer**  | `open-sse/utils/proxyDispatcher.ts`          | Loob vahemällu salvestatavaid `undici` ProxyAgent/SOCKS-dispetšereid |
| **Puhverserveri fetch**      | `open-sse/utils/proxyFetch.ts`               | Mähib `fetch()`-i puhverserveri dispetšeri lisamisega                |
| **Seadete marsruut**         | `src/app/api/settings/proxy/route.ts`        | Pärand-puhverserveri konfiguratsiooni API (GET/PUT/DELETE)           |
| **Haldusmarsruut**           | `src/app/api/v1/management/proxies/route.ts` | Registri CRUD API (GET/POST/PATCH/DELETE)                            |
| **1proxy andmebaas**         | `src/lib/db/oneproxy.ts`                     | Tasuta puhverserverite turu andmete püsiv salvestamine               |

---

## Uute kontode puhverserveri vaikeolek

sisse** Seaded → Puhverserver → Globaalne konfiguratsioon** , kasutage** Luba uute ühenduste jaoks vaikimisi puhverserver** äsja lisatud pakkujakontode esialgse puhverserveri oleku valimiseks.

Uus säte juhib äsja lisatud pakkujakontode esialgset puhverserveri olekut. See ei muuda olemasolevaid kontosid ega asenda globaalset puhverserveri lülitit. Selle algväärtus säilitab varasema käitumise. Lülitage see üks kord välja, et luua tulevasi kontosid, kus puhverserver on vaikimisi keelatud.

Eelistus salvestatakse `defaultNewConnectionProxyEnabled` -na olemasolevate sätete API kaudu. Kui seda pole kunagi salvestatud, on see vaikimisi `true`. `false` salvestamine jõustub järgmiste uute kontode puhul ilma taaskäivitamiseta. `POST /api/providers` aktsepteerib valikulist ranget tõeväärtust `proxyEnabled`; selgesõnaline `true` või `false` on loomise vaikeväärtuse suhtes ülimuslik. Duplikaatkonto väljajätmine või OAuth uuesti ühendamine säilitab selle konto salvestatud oleku. Individuaalseid kontosid saab ka hiljem lubada või keelata.

Pakkuja valikulised ülekanded kasutavad uute kontode jaoks sihtinstalli vaikeseadet ja säilitavad olemasolevate kontode asendamisel sihtkoha poliitika. Puhverserveri lülitid ei ole kaasaskantavad edastusväljad. Täielik varukoopia taastamine ja ajalooline JSON/SQL migratsioon säilitavad olemasoleva taastamise semantika, sealhulgas salvestatud kontoväärtused ja pärandskeemi vaikeseaded; seadete täielik taastamine võib ka selle eelistuse taastada.

See eelistus ei määra puhverserverit ega kinnita, et see on terve või kasutusel. Tegelik marsruutimine sõltub endiselt globaalsest puhverserveri lülitist ja kohaldatavast puhverserveri konfiguratsioonist. Ilma püsiva kontota sünteetilised pakkujad, OAuth -liiklus enne konto loomist, environment/system puhverserverid ja väliste taustaprogrammide võrgud jäävad selle kohaldamisalast välja.

## 4-tasemeline puhverserverisüsteem

OmniRoute toetab puhverserveri seadistamist **neljas sõltumatus ulatuses**, mis lahendatakse prioriteetsuse järjekorras:

```
Prioriteetsuse lahendamise järjekord (kõrgeim → madalaim):

  1. 🔵 Konto/ühenduse puhverserver  →  API-võtme / OAuth-ühenduse kohta
  2. 🟡 Teenusepakkuja puhverserver  →  teenusepakkuja kohta (nt kogu OpenAI liiklus)
  3. 🟠 Kombinatsiooni puhverserver  →  kombinatsiooni/marsruutimise konfiguratsiooni kohta
  4. 🟢 Globaalne puhverserver        →  kogu liiklus, kõik teenusepakkujad
```

### Kuidas lahendamine toimib

Kui OmniRoute saadab päringu ülesvoolu teenusepakkujale, kutsub see välja funktsiooni `resolveProxyForConnectionFromRegistry()`, mis kontrollib iga taset järjekorras:

1. **Kontotase** — kas sellele konkreetsele ühenduse ID-le on määratud puhverserver?
2. **Teenusepakkuja tase** — kas sellele teenusepakkujale (nt `openai`) on määratud puhverserver?
3. **Globaalne tase** — kas globaalne puhverserver on seadistatud?
4. **Puhverserver puudub** — otseühendus teenusepakkujaga.

Kasutatakse esimest vastet. See tähendab, et saate määrata globaalse puhverserveri varuvariandiks, kuid kasutada konkreetsete teenusepakkujate või ühenduste jaoks teistsuguseid seadistusi.

### Milline liiklus suunatakse läbi puhverserveri

| Liikluse tüüp          | Puhverserveri kaudu? | Märkused                                            |
| ---------------------- | -------------------- | --------------------------------------------------- |
| Vestluse lõpetamised   | ✅                   | Kõik `/v1/chat/completions` päringud                |
| Manused                | ✅                   | `/v1/embeddings`                                    |
| Piltide genereerimine  | ✅                   | `/v1/images/generations`                            |
| Heli (TTS/STT)         | ✅                   | `/v1/audio/*`                                       |
| OAuth-loa vahetamine   | ✅                   | Lahendab vea `unsupported_country_region_territory` |
| Ühenduse testid        | ✅                   | Nupp „Testi ühendust” kasutab puhverserverit        |
| Loa värskendamine      | ✅                   | OAuthi taustal uuendamine                           |
| Mudelite sünkroonimine | ✅                   | Mudelite loetlemine ja tuvastamine                  |

---

## Puhverserverite register (CRUD)

Puhverserverite register on SQLite'i tabel (`proxy_registry`), mis talletab kõik teie puhverserverid. Igal puhverserveril on:

| Väli       | Tüüp    | Kirjeldus                                            |
| ---------- | ------- | ---------------------------------------------------- |
| `id`       | UUID    | Kordumatu identifikaator                             |
| `name`     | String  | Inimloetav silt                                      |
| `type`     | String  | Protokoll: `http`, `https`, `socks5`                 |
| `host`     | String  | Puhverserveri hostinimi või IP                       |
| `port`     | Integer | Pordinumber                                          |
| `username` | String  | Autentimise kasutajanimi (talletamisel krüpteeritud) |
| `password` | String  | Autentimise parool (talletamisel krüpteeritud)       |
| `region`   | String  | Geograafilise piirkonna silt                         |
| `notes`    | String  | Vabas vormis märkmed                                 |
| `status`   | String  | `active` või `inactive`                              |
| `source`   | String  | `manual` või `oneproxy`                              |

### Puhverserveri loomine

**Juhtpaneeli kaudu:**

1. Avage **Seaded → Puhverserver**
2. Klõpsake **Lisa puhverserver**
3. Sisestage tüüp, host, port ja valikulised autentimisandmed
4. Salvestage

**API kaudu:**

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

### Puhverserveri värskendamine

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Märkus:** autentimisandmed säilitatakse, kui te ei saada sõnaselgelt mittetühje asendusväärtusi. Tühjade stringide saatmisel väljade `username`/`password` jaoks säilitatakse talletatud väärtused.

### Puhverserveri kustutamine

```bash
# Nurjub, kui puhverserver on määratud mis tahes ulatusele
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Sundkustutamine (eemaldab ka määrangud)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Puhverserverite loetlemine

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Puhverserverite määramine ulatustele

```bash
# Määramine globaalsele ulatusele
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Määramine konkreetsele teenusepakkujale
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Määramine konkreetsele ühendusele/võtmele
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Kehtiva puhverserveri lahendamine

Kontrollige, millist puhverserverit antud ühenduse jaoks kasutataks:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Tagastab lahendatud puhverserveri koos selle taseme (`account`, `provider` või `global`) ja allikaga.

### Hulgimääramine

Määrake üks puhverserver korraga mitmele teenusepakkujale või ühendusele:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/eksport

Puhverserverid sisalduvad **varundus-/taastesüsteemis**. OmniRoute'i konfiguratsiooni eksportimiseks:

1. Avage **Juhtpaneel → Seaded → Varundamine**
2. Klõpsake **Ekspordi** — kaasatakse puhverserverite register ja määrangud
3. Taastamiseks klõpsake **Impordi** ja laadige varundusfail üles

Puhverserverite register toetab ka **hosti+pordi alusel lisamist või värskendamist** — kui impordite juba olemasoleva puhverserveri (sama host ja port), värskendatakse seda duplikaadi loomise asemel.

### Pärandandmete migreerimine

Kui seadistasite puhverserverid vanemas versioonis (enne registri kasutuselevõttu), migreerib OmniRoute need automaatselt:

```
Vana key_value hoidla → proxy_registry + proxy_assignments
```

See toimub üks kord esimesel käivitamisel pärast versiooniuuendust. Uuesti käivitamiseks kasutage funktsiooni `migrateLegacyProxyConfigToRegistry({ force: true })`.

---

## 1 puhverserveri tasuta puhverserveri turg

> 🆕** Panustas [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (probleem [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute integreerub** [1 puhverserver](https://1proxy-api.aitradepulse.com)** kogukonna platvorm, millele juurdepääsu pakkuda** sadu tasuta kinnitatud puhverservereid** kogu maailmast. See sobib suurepäraselt kasutajatele, kellel pole oma puhverserveri infrastruktuuri.

### Kuidas see töötab

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Sünkroonimine** — OmniRoute toob kinnitatud puhverserverid 1-puhverserverist API
2. **Kauplus** — Puhverserverid salvestatakse `source = 'oneproxy'`-ga samasse `proxy_registry` tabelisse
3. **Filter** — Filtreeri protokolli, riigi, kvaliteediskoori järgi
4. **Pööra** — Valige parim puhverserver, kasutades kvaliteetseid, juhuslikke või järjestikuseid strateegiaid
5. **Automaatne lagunemine** — Ebaõnnestunud puhverserverite kvaliteediskoor väheneb; alla läve → märgitud passiivseks

### Puhverserverite sünkroonimine

**Juhtpaneeli kaudu:**

1. Mine aadressile** Seaded → 1 puhverserver** sakk
2. Klõpsake** "Sünkrooni kohe"**
3. Vaata statistikat: puhverserverid kokku, aktiivsete arv, keskmine kvaliteet, jaotus riikide kaupa

**API kaudu:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Puhverserverite filtreerimine

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

### Puhverserveri kvaliteediskoorid

Igal 1-puhverserveril on metaandmed:

| Väli            | Kirjeldus                                          |
| --------------- | -------------------------------------------------- |
| `qualityScore`  | Hinnang 0–100 alates 1 puhverserveri kinnitamisest |
| `latencyMs`     | Mõõdetud võrgu latentsusaeg                        |
| `anonymity`     | `transparent`, `anonymous` või `elite`             |
| `googleAccess`  | Kas puhverserver pääseb juurde Google teenustele   |
| `countryCode`   | Kahetäheline ISO riigikood                         |
| `lastValidated` | Viimase kinnitamise ajatempel                      |

Kvaliteediskoore kohandatakse dünaamiliselt:

- **Ebaõnnestunud taotlused** vähendage punktisummat 10 punkti võrra
- **Tulemus langeb ≤ 10-ni** → puhverserver on tähistatud kui `inactive`
- Mitteaktiivsed puhverserverid jäetakse pööramisest välja

### Rotatsioonistrateegiad

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

### Kaitselüliti

1 puhverserveri sünkroonimisel on sisseehitatud kaitselüliti:

- Pärast** 5 järjestikust sünkroonimistõrget** , edasised sünkroonimiskatsed on blokeeritud
- Lähtestage: `resetOneproxyCircuitBreaker()` või taaskäivitage server
- Sünkroonimise olek on saadaval aadressil `GET /api/settings/oneproxy?action=status`

### 1 puhverserveri tühjendamine

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Tuvastamisvastased meetmed ja varjamine

OmniRoute ei suuna liiklust lihtsalt puhverserveri kaudu — see muudab liikluse ehtsana näivaks:

### TLS-sõrmejälje võltsimine

Kasutab `wreq-js`-i brauserilaadsete TLS-sõrmejälgede genereerimiseks, möödudes robotituvastussüsteemidest, mis märgistavad mittebrauseripõhised TLS-kätlused.

### CLI-sõrmejälje sobitamine

**CLI-sõrmejälje lüliti** (`Settings → Security`) järjestab HTTP-päised ja JSON-keha väljad ümber, et need vastaksid täpselt natiivsete CLI-binaarfailide (Claude Code, Codex jne) signatuurile. See toimib puhverserverile **lisaks**:

```
Teie IP (blokeeritud) → Puhverserveri IP (USA) → Teenusepakkuja API
                         + TLS-i võltsimine
                         + CLI-sõrmejälg
```

Saate korraga nii **IP-aadressi varjamise** kui ka **päringu autentsuse**.

### Puhverserveri IP säilitamine

Juhtpaneeli värvikoodiga märgid näitavad, milline puhverserveri tase on aktiivne:

| Märk | Tase      | Tähendus                                                 |
| ---- | --------- | -------------------------------------------------------- |
| 🟢   | Globaalne | Kogu liiklus läbib seda puhverserverit                   |
| 🟡   | Pakkuja   | Ainult selle teenusepakkuja liiklus läbib puhverserverit |
| 🔵   | Ühendus   | See konkreetne võti/konto kasutab seda puhverserverit    |

Märk näitab kontrollimiseks ka lahendatud puhverserveri IP-aadressi.

---

## Ülesvoolu puhverserveri režiimid

CLIProxyAPI mustrit kasutavate teenusepakkujate jaoks toetab OmniRoute kolme ülesvoolu puhverserveri režiimi:

| Režiim        | Kirjeldus                                                       |
| ------------- | --------------------------------------------------------------- |
| `native`      | OmniRoute haldab puhverserveri kaudu suunamist otse (vaikimisi) |
| `cliproxyapi` | Delegeerib välisele CLIProxyAPI eksemplarile                    |
| `fallback`    | Proovib esmalt natiivrežiimi, seejärel CLIProxyAPI-t            |

Seadistage teenusepakkuja kaupa:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Juhtpaneeli kasutajaliides

### Settings → Proxy vahekaart

- **Globaalse puhverserveri** seadistus (määrake üks kord kogu liikluse jaoks)
- **Teenusepakkujakohased puhverserveri** alistused
- **Ühendusepõhised puhverserveri** määramised
- **Ühenduse testimine** seadistatud puhverserveri kaudu
- **Värvikoodiga märgid**, mis näitavad aktiivset puhverserveri taset

### Settings → 1proxy vahekaart

- Nupp **Sync Now** tasuta puhverserverite hankimiseks
- **Statistikakaardid**: kokku, aktiivsed, keskmine kvaliteet, viimane sünkroonimine
- **Filtrid**: protokoll, riigikood, minimaalne kvaliteet
- **Puhverserverite tabel**, mis sisaldab hosti, protokolli, riiki, kvaliteediskoori, latentsust, anonüümsust ja Google'ile juurdepääsu
- **Sünkroonimise oleku** paneel õnnestumiste, nurjumiste ja järjestikuste nurjumiste arvu jälgimiseks
- **Clear All** kõigi 1proxy kirjete eemaldamiseks

---

## API viitedokumentatsioon

### Puhverserveri seadete API

| Meetod   | Lõpp-punkt                                     | Kirjeldus                             |
| -------- | ---------------------------------------------- | ------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Hangi täielik puhverserveri seadistus |
| `GET`    | `/api/settings/proxy?level=global`             | Hangi globaalne puhverserver          |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Hangi teenusepakkuja puhverserver     |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Määra kehtiv puhverserver             |
| `PUT`    | `/api/settings/proxy`                          | Uuenda puhverserveri seadistust       |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Eemalda puhverserver sellelt tasemelt |

### Puhverserverite registri API

| Meetod   | Lõpp-punkt                                        | Kirjeldus                           |
| -------- | ------------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Loetle kõik puhverserverid          |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Hangi puhverserver ID järgi         |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Hangi puhverserveri määramised      |
| `POST`   | `/api/v1/management/proxies`                      | Loo puhverserver                    |
| `PATCH`  | `/api/v1/management/proxies`                      | Uuenda puhverserverit               |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Kustuta puhverserver                |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Sundkustuta                         |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Määra hulgi                         |
| `GET`    | `/api/v1/management/proxies/assignments`          | Loetle määramised                   |
| `GET`    | `/api/v1/management/proxies/health`               | Puhverserverite seisundi statistika |

### Tunnelite API

Oma OmniRoute'i eksemplari avalikus internetis kättesaadavaks tegemise kohta (Cloudflare/ngrok/Tailscale), selle asemel et suunata väljaminevat liiklust puhverserveri kaudu, vaadake dokumenti [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). Tunneli REST API asub teekonna `/api/tunnels/{cloudflared,ngrok,tailscale}/*` all ja on eespool dokumenteeritud väljamineva puhverserveriahelaga sõltumatu.

### 1proxy API

| Meetod   | Lõpp-punkt                             | Kirjeldus                              |
| -------- | -------------------------------------- | -------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Loetle 1proxy puhverserverid           |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Hangi statistika ja sünkroonimise olek |
| `GET`    | `/api/settings/oneproxy?action=status` | Hangi ainult sünkroonimise olek        |
| `POST`   | `/api/settings/oneproxy`               | Käivita sünkroonimine                  |
| `POST`   | `/api/settings/oneproxy/rotate`        | Lülitu järgmisele puhverserverile      |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Kustuta üks                            |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Kustuta kõik                           |

### Ülesvoolu puhverserveri API

| Meetod   | Lõpp-punkt                        | Kirjeldus                                 |
| -------- | --------------------------------- | ----------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Hangi ülesvoolu puhverserveri seadistus   |
| `PUT`    | `/api/upstream-proxy/:providerId` | Määra ülesvoolu puhverserveri režiim      |
| `DELETE` | `/api/upstream-proxy/:providerId` | Eemalda ülesvoolu puhverserveri seadistus |

---

## Keskkonnamuutujad

| Muutuja               | Vaikeväärtus | Kirjeldus                                                               |
| --------------------- | ------------ | ----------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`       | Luba SOCKS5-puhverserveri tugi (vaikimisi `true` failis `.env.example`) |

---

## Tõrkeotsing

### „SOCKS5-puhverserver on keelatud”

Määrake oma `.env`-failis `ENABLE_SOCKS5_PROXY=true` ja taaskäivitage.

### „socket hang up” vead puhverserveri kasutamisel

See on tavaline odavate puhverserverite puhul, mis katkestavad jõudeolekus ühendused. OmniRoute juba tegeleb sellega järgmiselt:

- Keelab puhverserveri ühendustes keep-alive'i (`keepAliveTimeout: 1`)
- Keelab konveierdamise (`pipelining: 0`)
- Salvestab dispetšerid vahemällu, et vältida korduvaid käepigistusi

Kui probleem püsib, proovige teist puhverserverit või kasutage 1proxy roteerimisfunktsiooni.

### „unsupported_country_region_territory” OAuthi ajal

Veenduge, et puhverserver oleks seadistatud **enne** OAuthi voo käivitamist. OmniRoute suunab OAuthi pääsmikuvahetuse seadistatud puhverserveri kaudu. Esmalt määrake globaalne või teenusepakkuja taseme puhverserver ja seejärel looge ühendus.

### Puhverserverit ei kasutata

Kontrollige lahendusjärjekorda:

1. Kontrollige päringuga `GET /api/settings/proxy?resolve=your-connection-id`
2. Kontrollige, et puhverserveri `status` oleks `active` (mitte `inactive`)
3. Veenduge, et puhverserveri määramise ulatus vastaks teie ühendusele

### 1proxy sünkroonimine ebaõnnestub

Kontrollige sünkroonimise olekut:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Kui `consecutiveFailures >= 5`, on kaitselüliti rakendunud. Lähtestamiseks taaskäivitage server või oodake käsitsi lähtestamist.

---

## Andmebaasiskeem

### Tabel `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' või 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (ainult 1proxy)
  latency_ms INTEGER,                        -- millisekundid (ainult 1proxy)
  anonymity TEXT,                            -- läbipaistev/anonüümne/eliit
  google_access INTEGER DEFAULT 0,           -- kas pääseb Google'ile ligi? (1proxy)
  last_validated TEXT,                       -- ISO ajatempel (1proxy)
  country_code TEXT,                         -- ISO kahetäheline kood (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabel `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- teenusepakkuja ID, ühenduse ID või kombinatsiooni ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Puhverserveri töökorra kontrollimine (v3.8.16+)

OmniRoute'i **puhverserveri kiire tõrke** mehhanism (`src/lib/proxyHealth.ts`) tuvastab mittetöötavad puhverserverid kiire TCP-ühenduse kontrolli abil vähem kui 2 sekundiga ja **salvestab tulemuse vahemällu**, et vältida iga päringuga kaasnevat lisakulu.

### Kuidas see töötab

```
Päring ──▶ ProxyHealthCache.get(url)
             │
             ├─ Vahemälutabamus + värske?  ──▶ tagasta vahemällu salvestatud olek
             │
             └─ Vahemälust puudub / aegunud?  ──▶ TCP-ühendus hosti ja pordiga
                                                   (ajalõpp: FAST_FAIL_TIMEOUT_MS)
                                                   ──▶ salvesta vahemällu ajaks HEALTH_CACHE_TTL_MS
                                                   ──▶ tagasta tulemus
```

Ilma selleta blokeeriks mittetöötav puhverserver enne ebaõnnestumist iga päringu kogu `PROXY_TIMEOUT_MS` ajaks (vaikimisi 30 s).

### Kohandatavad keskkonnamuutujad

| Muutuja                      | Vaikeväärtus | Otstarve                                         |
| ---------------------------- | ------------ | ------------------------------------------------ |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`       | TCP-ühenduse ajalõpp iga töökorrakontrolli kohta |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`      | Kui kaua töökorratulemust vahemälus hoitakse     |

**Soovituslikud väärtused:**

| Stsenaarium                      | Kiire tõrke ajalõpp | Vahemälu TTL | Põhjendus                                                                       |
| -------------------------------- | ------------------- | ------------ | ------------------------------------------------------------------------------- |
| Suure läbilaskega API-lüüs       | 1500ms              | 60000ms      | Agressiivne kiire tõrge, pikem vahemälu kontrollide vähendamiseks               |
| Geograafiliselt hajutatud sõlmed | 3000ms              | 15000ms      | Aeglasemad võrgud vajavad rohkem aega; lühem vahemälu kiireks ümberlülitumiseks |
| Arendus / testimine              | 1000ms              | 10000ms      | Kohalike puhverserverite kiire iteratsioon                                      |
| Varjatud / tuvastamisvastane     | 2500ms              | 45000ms      | Väldi kiiret sondeerimist, mis võib käivitada päringusageduse piirangud         |

### Puhverserveri töökorra kontrollimine

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Sunni konkreetset puhverserverit uuesti kontrollima
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Lipp `stale` on `true`, kui vahemälukirje on ületanud `HEALTH_CACHE_TTL_MS` ja järgmine päring käivitab uue kontrolli.

### Puhverserveri tüübipõhised vaikeväärtused

Töökorrakontroll kasutab URL-i skeemi põhjal mõistlikke vaikeväärtusi:

| Skeem                      | Vaikeport |
| -------------------------- | --------- |
| `http://`                  | 8080      |
| `https://`                 | 443       |
| `socks5://` / `socks5h://` | 1080      |

URL-is määratud kohandatud pordid (`http://host:9999`) on alati skeemi vaikeväärtusest ülimuslikud.

---

## Puhverserverite analüütika ja vaadeldavus

OmniRoute jälgib iga puhverserveri kasutust, et aidata operaatoritel tuvastada marsruutimismustreid, latentsuse järske tõuse ja korduvaid tõrkeid.

### Mida jälgitakse

OmniRoute salvestab iga konfigureeritud puhverserveri kaudu tehtud päringu kohta järgmised andmed:

| Mõõdik       | Kirjeldus                                                |
| ------------ | -------------------------------------------------------- |
| `proxy_url`  | Puhverserveri täielik URL (autentimisandmed on peidetud) |
| `provider`   | Ülesvooluteenuse pakkuja ID (openai, anthropic jne)      |
| `latency_ms` | Edasi-tagasi koguaeg koos puhverserveri käepigistusega   |
| `connect_ms` | Ainult TCP-ühenduse loomise aeg                          |
| `status`     | Ülesvooluteenuse tagastatud HTTP-olekukood               |
| `error`      | Tõrkeklass, kui päring ebaõnnestus                       |
| `timestamp`  | ISO 8601 UTC                                             |

### Andmetele juurdepääs

```bash
# Hiljutised puhverserveri sündmused
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Tegelik lõpp-punkt on `/api/usage/proxy-logs` (vt `src/app/api/usage/proxy-logs/route.ts`). See lõpp-punkt toetab järgmisi päringuid:

- `GET /api/usage/proxy-logs` — puhverserveri logide hankimine
- `DELETE /api/usage/proxy-logs` — kõigi puhverserveri logide kustutamine

Vajaduse korral saab koondstatistikat SQL-i kaudu otse tabelist `proxy_logs` pärida. Juhtpaneeli kasutajaliides võib pakkuda koondvaateid.

### Levinud mustrid

**Ebastabiilse puhverserveri tuvastamine** (vaheldumisi õnnestub ja ebaõnnestub):

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

**Aeglaste puhverserverite leidmine** (p95 latentsus > 2 s):

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

## Rotatsioonistrateegia otsustuspuu

Kui ühe ulatusega on seostatud mitu puhverserverit, kasutab OmniRoute **rotatsioonistrateegiat**, et valida, millist neist iga päringu jaoks kasutada. Strateegia konfigureeritakse ulatuse tasemel (globaalne, pakkuja-, konto- või kombinatsioonipõhine).

### Saadaolevad strateegiad

| Strateegia            | Millal kasutada                                          | Kompromiss                                                                                      |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `quality` (vaikimisi) | Tootmiskeskkonnas erineva kvaliteediga puhverserveritega | Eelistab kõrgelt hinnatud puhverservereid; madalama hinnanguga serverid võivad jääda kasutuseta |
| `random`              | Koormuse jaotamine, privaatsus                           | Ühtlane jaotus; eirab kvaliteedisignaale                                                        |
| `sequential`          | Silumine, deterministlik testimine                       | Läbib puhverservereid järjekorras; lihtne mõista                                                |

### Otsustuspuu

```
                    Kas teie puhverserveritel on kvaliteedihinnangud?
                    │
        ┌───────────┴───────────┐
        │                       │
       JAH                     EI
        │                       │
   Kas kõik puhverserverid      │
   on kvaliteedilt              │
   ligikaudu võrdsed?           │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  JAH       EI                Kasutage
   │         │              `random`
   │         │              (ühtlane jaotus
   │         │              kogub aja jooksul
   │         │              kvaliteediandmeid)
   │         │
   │    Kasutage `quality`
   │    (sobib kõige paremini
   │    erineva kvaliteedi korral)
   │
Kasutage `random`
(jaotab koormuse
ühtlaselt)
```

## Automaatne rikete välistamine teie enda puhverserveritele

1-puhverserveri turukogum degradeerib juba automaatselt ebaõnnestunud puhverserverid iseseisvalt (vt [puhverserveri kvaliteediskoorid](#proxy-quality-scores) ). Puhverserveritele** sina** Registrisse lisatuna pakub tausta tervise ajakava (`src/lib/proxyHealth/scheduler.ts`) sama käitumist "välja surnud liige automaatselt ketist välja" ilma midagi kustutamata:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Kuidas see sobib mitme puhverserveri ahelasse:

1. Planeerija uurib iga registreeritud puhverserverit iga `PROXY_HEALTH_INTERVAL_MS` järel (vaikimisi 10 min; minimaalselt 1 min).
2. Pärast `PROXY_AUTO_REMOVE_AFTER` järjest** veenev** tõrkeid (tõeline ühenduse tõrge — ajalõpp või sondi sihtmärgi enda 5xx ei lähe kunagi arvesse, vt [Puhverserveri tervisekontroll](#proxy-health-checking-v3816) ), puhverserveri `status` on seatud väärtusele `dead`.
3. `dead` on üks olekutest, mille pool/rotation eraldusvõimega kasutatav elusoleku filter välistab, seega peatab ulatuse pööramine (ümber-robin / juhuslik / kleepuv / latentsus / seanss — vt [Rotation Strategy Decision Tree](#rotation-strategy-decision-tree) ) koheselt selle puhverserveri üleandmise uutele päringutele. Ühtegi teist puhverserverit basseinis see ei mõjuta ja kogu bassein ei lange kunagi vaikselt tagasi otseühendusse — vt [4-tasemelise puhverserveri süsteemi](#4-level-proxy-system) tõrkesulgemise kaitset.
4. Planeerija uurib `dead` puhverservereid samal intervallil. Järgmine edukas sond pöörab `status` tagasi `active` ja see siseneb uuesti pöörlemisse — käsitsi uuesti lisamist pole vaja.

See on meelega** vabatahtlik ja mittepurustav** : vaikimisi loendab ja logib planeerija ainult tõrkeid (vt poliitikat C jaotises `decision.ts`) ja `PROXY_AUTO_DISABLE` ei kustuta kunagi rida — selleks on eraldiseisev, agressiivsem `PROXY_AUTO_REMOVE` lipp. Kui mõlemad on seatud väärtusele `true`, võidab `PROXY_AUTO_REMOVE` (kustutaval puhverserveril pole vahepealset pehmet keelamist kasu). Täieliku muutujate loendi leiate viitest [Environment Config](../reference/ENVIRONMENT.md).

---

> 📖** Seotud dokumentatsioon:**
>
> - [Kasutusjuhend](../guides/USER_GUIDE.md) — Üldine häälestus ja konfiguratsioon – [API Viide](../reference/API_REFERENCE.md) — Täielik API dokumentatsioon – [Keskkonna konfiguratsioon](../reference/ENVIRONMENT.md) — Kõik keskkonnamuutujad
