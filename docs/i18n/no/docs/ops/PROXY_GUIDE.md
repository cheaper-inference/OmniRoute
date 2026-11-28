# 🌐 OmniRoute Proxy Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Omgå geografiske blokkeringer, beskytt identiteten din og rut AI-trafikk gjennom hvilken som helst proxy — helt uten komplisert konfigurasjon.**

OmniRoute inkluderer et komplett system for proxyadministrasjon som lar deg rute trafikk til eksterne AI-leverandører gjennom HTTP-, HTTPS- eller SOCKS5-proxyer. Enten du befinner deg i en blokkert region, trenger IP-rotasjon eller ønsker skjult fingeravtrykksbeskyttelse — denne veiledningen dekker alt.

---

## Innholdsfortegnelse

- [Hvorfor bruke proxyer?](#why-use-proxies)
- [Arkitekturoversikt](#architecture-overview)
- [Proxysystem med 4 nivåer](#4-level-proxy-system)
- [Proxyregister (CRUD)](#proxy-registry-crud)
- [1proxy – gratis markedsplass](#1proxy-free-proxy-marketplace)
- [Proxyrotasjon](#proxy-rotation)
- [Antideteksjon og skjult modus](#anti-detection--stealth)
- [Moduser for oppstrømsproxy](#upstream-proxy-modes)
- [Brukergrensesnitt for kontrollpanelet](#dashboard-ui)
- [API-referanse](#api-reference)
- [Miljøvariabler](#environment-variables)
- [Feilsøking](#troubleshooting)

---

## Hvorfor bruke proxyer?

Mange AI-leverandører begrenser tilgangen basert på geografisk region. Utviklere i **Russland, Kina, Iran, Cuba, Tyrkia** og andre land støter på feil som:

```
unsupported_country_region_territory
```

Selv utenfor blokkerte regioner er proxyer nyttige for:

| Bruksområde             | Beskrivelse                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| **Geografisk omgåelse** | Få tilgang til OpenAI, Anthropic, Codex og Copilot fra blokkerte land      |
| **IP-rotasjon**         | Fordel forespørsler mellom flere IP-adresser for å unngå hastighetsgrenser |
| **Personvern**          | Skjul den virkelige IP-adressen din for eksterne leverandører              |
| **Samsvar**             | Rut trafikk gjennom bestemte jurisdiksjoner                                |
| **Testing**             | Simuler forespørsler fra ulike regioner                                    |

---

## Arkitekturoversikt

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute-server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy-      │    │ Proxy-       │    │ Proxy-           │  │
│  │ register    │───▶│ fordeler     │───▶│ henting (undici) │  │
│  │ (SQLite)    │    │ (bufret)     │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy-     │                        │ Ekstern          │  │
│  │ synkronisering│                      │ leverandør-API   │  │
│  │ (gratis utvalg)│                     │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Nøkkelkomponenter

| Komponent               | Fil                                          | Rolle                                                              |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| **Proxyregister**       | `src/lib/db/proxies.ts`                      | CRUD for proxyoppføringer og omfangstildelinger                    |
| **Proxyfordeler**       | `open-sse/utils/proxyDispatcher.ts`          | Oppretter `undici` ProxyAgent-/SOCKS-dispatchere med hurtigbufring |
| **Proxyhenting**        | `open-sse/utils/proxyFetch.ts`               | Pakker inn `fetch()` med injisering av proxyfordeler               |
| **Innstillingsrute**    | `src/app/api/settings/proxy/route.ts`        | Eldre API for proxykonfigurasjon (GET/PUT/DELETE)                  |
| **Administrasjonsrute** | `src/app/api/v1/management/proxies/route.ts` | CRUD-API for registeret (GET/POST/PATCH/DELETE)                    |
| **1proxy-database**     | `src/lib/db/oneproxy.ts`                     | Vedvarende lagring for markedsplassen med gratis proxyer           |

---

## Standard proxy-status for nye kontoer

I** Innstillinger → Proxy → Global konfigurasjon** , bruk** Aktiver proxy som standard for nye tilkoblinger** for å velge den opprinnelige proxy-statusen for nylig lagt til leverandørkontoer.

Den nye innstillingen kontrollerer den opprinnelige proxy-statusen til nylig lagt til leverandørkontoer. Den endrer ikke eksisterende kontoer eller erstatter den globale proxy-svitsjen. Startverdien bevarer den forrige oppførselen. Slå den av én gang for å opprette fremtidige kontoer med proxy deaktivert som standard.

Preferansen lagres som `defaultNewConnectionProxyEnabled` gjennom de eksisterende innstillingene API. Den er standard til `true` når den aldri lagres. Lagring av `false` trer i kraft for påfølgende nye kontoer uten omstart. `POST /api/providers` aksepterer en valgfri streng boolsk `proxyEnabled`; en eksplisitt `true` eller `false` har forrang over opprettelsesstandarden. Utelatelse av en duplikatkonto eller OAuth reconnect bevarer kontoens lagrede tilstand. Individuelle kontoer kan fortsatt aktiveres eller deaktiveres etterpå.

Selektive leverandøroverføringer bruker destinasjonsinstallasjonens standard for nye kontoer og bevarer destinasjonspolicyen når de erstatter eksisterende kontoer. Proxy-vekslere er ikke bærbare overføringsfelt. Full sikkerhetskopigjenoppretting og historisk JSON/SQL -migrering beholder sin eksisterende gjenopprettingssemantikk, inkludert lagrede kontoverdier og eldre skjemastandarder; en fullstendig gjenoppretting av innstillinger kan også gjenopprette denne preferansen.

Denne preferansen tildeler ikke en proxy eller fastslår at en er sunn eller i bruk. Faktisk ruting avhenger fortsatt av den globale proxy-svitsjen og gjeldende proxy-konfigurasjon. Syntetiske leverandører uten en vedvarende konto, OAuth -trafikk før kontooppretting, environment/system proxyer og eksterne backends nettverk er utenfor omfanget.

## 4-nivåers proxysystem

OmniRoute støtter proxykonfigurasjon på **fire uavhengige nivåer**, som løses i prioritert rekkefølge:

```
Prioritert løsningsrekkefølge (høyest → lavest):

  1. 🔵 Konto-/tilkoblingsproxy  →  per API-nøkkel / OAuth-tilkobling
  2. 🟡 Leverandørproxy          →  per leverandør (f.eks. all OpenAI-trafikk)
  3. 🟠 Kombinasjonsproxy        →  per kombinasjons-/rutingskonfigurasjon
  4. 🟢 Global proxy             →  all trafikk, alle leverandører
```

### Slik fungerer løsningen

Når OmniRoute sender en forespørsel til en oppstrømsleverandør, kalles `resolveProxyForConnectionFromRegistry()`, som kontrollerer hvert nivå i rekkefølge:

1. **Kontonivå** — Er en proxy tilordnet denne spesifikke tilkoblings-ID-en?
2. **Leverandørnivå** — Er en proxy tilordnet denne leverandøren (f.eks. `openai`)?
3. **Globalt nivå** — Er en global proxy konfigurert?
4. **Ingen proxy** — Direkte tilkobling til leverandøren.

Det første treffet vinner. Dette betyr at du kan angi en global proxy som reserve, men overstyre den for bestemte leverandører eller tilkoblinger.

### Hva som rutes gjennom proxy

| Trafikktype           | Via proxy? | Merknader                                    |
| --------------------- | ---------- | -------------------------------------------- |
| Chat-fullføringer     | ✅         | Alle `/v1/chat/completions`-forespørsler     |
| Embeddings            | ✅         | `/v1/embeddings`                             |
| Bildegenerering       | ✅         | `/v1/images/generations`                     |
| Lyd (TTS/STT)         | ✅         | `/v1/audio/*`                                |
| OAuth-tokenutveksling | ✅         | Løser `unsupported_country_region_territory` |
| Tilkoblingstester     | ✅         | Knappen «Test tilkobling» bruker proxy       |
| Tokenfornyelse        | ✅         | OAuth-fornyelse i bakgrunnen                 |
| Modellsynkronisering  | ✅         | Modelliste og -oppdagelse                    |

---

## Proxyregister (CRUD)

Proxyregisteret er en SQLite-tabell (`proxy_registry`) som lagrer alle proxyene dine. Hver proxy har:

| Felt       | Type    | Beskrivelse                                         |
| ---------- | ------- | --------------------------------------------------- |
| `id`       | UUID    | Unik identifikator                                  |
| `name`     | String  | Menneskelesbar etikett                              |
| `type`     | String  | Protokoll: `http`, `https`, `socks5`                |
| `host`     | String  | Proxyens vertsnavn eller IP-adresse                 |
| `port`     | Integer | Portnummer                                          |
| `username` | String  | Brukernavn for autentisering (kryptert ved lagring) |
| `password` | String  | Passord for autentisering (kryptert ved lagring)    |
| `region`   | String  | Etikett for geografisk region                       |
| `notes`    | String  | Fritekstnotater                                     |
| `status`   | String  | `active` eller `inactive`                           |
| `source`   | String  | `manual` eller `oneproxy`                           |

### Opprette en proxy

**Via kontrollpanelet:**

1. Gå til **Innstillinger → Proxy**
2. Klikk på **Legg til proxy**
3. Fyll ut type, vert, port og eventuelle autentiseringsopplysninger
4. Lagre

**Via API:**

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

### Oppdatere en proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Merk:** Påloggingsopplysninger beholdes med mindre du uttrykkelig sender ikke-tomme erstatninger. Hvis du sender tomme strenger for `username`/`password`, beholdes de lagrede verdiene.

### Slette en proxy

```bash
# Mislykkes hvis proxyen er tilordnet et nivå
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Tving sletting (fjerner også tilordninger)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Vise proxyer

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Tilordne proxyer til nivåer

```bash
# Tilordne til globalt nivå
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Tilordne til en bestemt leverandør
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Tilordne til en bestemt tilkobling/nøkkel
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Fastslå gjeldende proxy

Kontroller hvilken proxy som vil bli brukt for en gitt tilkobling:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Returnerer den valgte proxyen med nivået (`account`, `provider` eller `global`) og kilden.

### Massetilordning

Tilordne én proxy til flere leverandører eller tilkoblinger samtidig:

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

Proxyer er inkludert i systemet for **sikkerhetskopiering/gjenoppretting**. Når du eksporterer OmniRoute-konfigurasjonen:

1. Gå til **Kontrollpanel → Innstillinger → Sikkerhetskopiering**
2. Klikk på **Eksporter** — proxyregisteret og tilordningene er inkludert
3. For å gjenopprette klikker du på **Importer** og laster opp sikkerhetskopifilen

Proxyregisteret støtter også **upsert etter vert+port** — hvis du importerer en proxy som allerede finnes (samme vert og port), oppdateres den i stedet for at det opprettes et duplikat.

### Migrering fra eldre versjoner

Hvis du konfigurerte proxyer i en eldre versjon (før registeret), migrerer OmniRoute dem automatisk:

```
Eldre key_value-lager → proxy_registry + proxy_assignments
```

Dette skjer én gang ved første oppstart etter oppgraderingen. Bruk `migrateLegacyProxyConfigToRegistry({ force: true })` for å kjøre migreringen på nytt.

---

## 1proxy gratis proxy-markedsplass

> 🆕** Bidraget av [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (utgave [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute integreres med** [1 proxy](https://1proxy-api.aitradepulse.com)** fellesskapsplattform å gi tilgang til** hundrevis av gratis, validerte proxyer** fra hele verden. Dette er perfekt for brukere som ikke har sin egen proxy-infrastruktur.

### Hvordan det fungerer

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Synkroniser** — OmniRoute henter validerte proxyer fra 1proxy API
2. **Lager** — Proxyer lagres i samme `proxy_registry` tabell som `source = 'oneproxy'`
3. **Filter** — Filtrer etter protokoll, land, kvalitetspoeng
4. **Rotere** — Velg den beste proxyen ved å bruke kvalitets-, tilfeldige eller sekvensielle strategier
5. **Automatisk nedbrytning** — Mislykkede fullmakter får redusert kvalitetspoengsum; under terskel → markert som inaktiv

### Synkroniserer proxyer

**Via Dashboard:**

1. Gå til** Innstillinger → 1proxy** fanen
2. Klikk** "Synkroniser nå"**
3. Se statistikk: totalt antall fullmakter, antall aktive, gjennomsnittlig kvalitet, fordeling etter land

**Via API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrering av proxyer

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

### Proxy kvalitetspoeng

Hver 1proxy proxy kommer med metadata:

| Felt            | Beskrivelse                                    |
| --------------- | ---------------------------------------------- |
| `qualityScore`  | 0-100 rangering fra 1 proxy-validering         |
| `latencyMs`     | Målt nettverksforsinkelse                      |
| `anonymity`     | `transparent`, `anonymous` eller `elite`       |
| `googleAccess`  | Om proxyen kan få tilgang til Google tjenester |
| `countryCode`   | To-bokstavs ISO -landskode                     |
| `lastValidated` | Tidsstempel for siste validering               |

Kvalitetspoeng justeres dynamisk:

- **Mislykkede forespørsler** redusere poengsummen med 10 poeng
- **Poengsummen synker til ≤ 10** → proxy er merket med `inactive`
- Inaktive fullmakter er ekskludert fra rotasjon

### Rotasjonsstrategier

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

### Strømbryter

1proxy sync har en innebygd kretsbryter:

- Etter** 5 påfølgende synkroniseringsfeil** , blokkeres ytterligere synkroniseringsforsøk
- Tilbakestill med: `resetOneproxyCircuitBreaker()` eller start serveren på nytt
- Synkroniseringsstatus er tilgjengelig på `GET /api/settings/oneproxy?action=status`

### Sletting av 1 proxy-fullmakter

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-deteksjon og stealth

OmniRoute ruter ikke bare trafikk gjennom en proxy — det får trafikken til å se legitim ut:

### TLS Fingeravtrykkspoofing

Bruker `wreq-js` til å generere nettleserlignende TLS -fingeravtrykk, og omgår botdeteksjonssystemer som flagger TLS -håndtrykk som ikke er nettlesere.

### CLI Fingerprint Matching

De**CLI Fingerprint Toggle** (`Settings → Security`) omorganiserer HTTP overskrifter og JSON kroppsfelt for å matche den nøyaktige signaturen til opprinnelige CLI binærfiler (Claude -kode, Codex, etc.). Dette fungerer** på toppen av** proxy:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Du får begge deler**IP maskering** og** be om autentisitet** samtidig.

### Proxy IP Bevaring

Fargekodede merker i dashbordet viser hvilket proxy-nivå som er aktivt:

| Skilt | Nivå        | Betydning                                       |
| ----- | ----------- | ----------------------------------------------- |
| 🟢    | Global      | All trafikk går gjennom denne proxyen           |
| 🟡    | Leverandør  | Bare denne leverandørens trafikk er proxy       |
| 🔵    | Forbindelse | Denne spesifikke key/account bruker denne proxy |

Merket viser også den løste proxy IP for verifisering.

---

## Oppstrøms proxymoduser

For leverandører som bruker CLIProxyAPI-mønsteret, støtter OmniRoute tre oppstrøms proxymoduser:

| Modus         | Beskrivelse                                                   |
| ------------- | ------------------------------------------------------------- |
| `native`      | OmniRoute håndterer proxyruting direkte (standard)            |
| `cliproxyapi` | Delegerer til en ekstern CLIProxyAPI-instans                  |
| `fallback`    | Prøver opprinnelig modus først og går tilbake til CLIProxyAPI |

Konfigurer per leverandør:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Brukergrensesnitt for kontrollpanelet

### Innstillinger → Proxy-fanen

- Konfigurasjon av **global proxy** (angi én gang for all trafikk)
- **Proxyoverstyringer per leverandør**
- **Proxytildelinger per tilkobling**
- **Tilkoblingstest** gjennom konfigurert proxy
- **Fargekodede merker** som viser aktivt proxynivå

### Innstillinger → 1proxy-fanen

- **Synkroniser nå**-knapp for å hente gratis proxyer
- **Statistikkort**: Totalt, Aktive, Gjennomsnittlig kvalitet, Siste synkronisering
- **Filtre**: Protokoll, Landskode, Minimumskvalitet
- **Proxytabell** med vert, protokoll, land, kvalitetspoeng, ventetid, anonymitet og Google-tilgang
- **Synkroniseringsstatuspanel** med sporing av vellykkede/mislykkede forsøk og antall påfølgende feil
- **Fjern alle** for å fjerne alle 1proxy-oppføringer

---

## API-referanse

### API for proxyinnstillinger

| Metode   | Endepunkt                                      | Beskrivelse                         |
| -------- | ---------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Hent fullstendig proxykonfigurasjon |
| `GET`    | `/api/settings/proxy?level=global`             | Hent global proxy                   |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Hent leverandørproxy                |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Fastslå gjeldende proxy             |
| `PUT`    | `/api/settings/proxy`                          | Oppdater proxykonfigurasjon         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Fjern proxy på angitt nivå          |

### API for proxyregister

| Metode   | Endepunkt                                         | Beskrivelse                 |
| -------- | ------------------------------------------------- | --------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Vis alle proxyer            |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Hent proxy etter ID         |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Hent proxytildelinger       |
| `POST`   | `/api/v1/management/proxies`                      | Opprett proxy               |
| `PATCH`  | `/api/v1/management/proxies`                      | Oppdater proxy              |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Slett proxy                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Tving sletting              |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Massetildel                 |
| `GET`    | `/api/v1/management/proxies/assignments`          | Vis tildelinger             |
| `GET`    | `/api/v1/management/proxies/health`               | Helsestatistikk for proxyer |

### API for tunneler

Hvis du vil eksponere OmniRoute-instansen din på det offentlige internettet (Cloudflare/ngrok/Tailscale) i stedet for å rute utgående trafikk gjennom en proxy, kan du se [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST-API-et for tunneler ligger under `/api/tunnels/{cloudflared,ngrok,tailscale}/*` og er uavhengig av den utgående proxykjeden som er dokumentert ovenfor.

### API for 1proxy

| Metode   | Endepunkt                              | Beskrivelse                             |
| -------- | -------------------------------------- | --------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Vis 1proxy-proxyer                      |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Hent statistikk + synkroniseringsstatus |
| `GET`    | `/api/settings/oneproxy?action=status` | Hent bare synkroniseringsstatus         |
| `POST`   | `/api/settings/oneproxy`               | Utløs synkronisering                    |
| `POST`   | `/api/settings/oneproxy/rotate`        | Bytt til neste proxy                    |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Slett én                                |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Fjern alle                              |

### API for oppstrøms proxy

| Metode   | Endepunkt                         | Beskrivelse                        |
| -------- | --------------------------------- | ---------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Hent oppstrøms proxykonfigurasjon  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Angi oppstrøms proxymodus          |
| `DELETE` | `/api/upstream-proxy/:providerId` | Fjern oppstrøms proxykonfigurasjon |

---

## Miljøvariabler

| Variabel              | Standardverdi | Beskrivelse                                                             |
| --------------------- | ------------- | ----------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`        | Aktiver støtte for SOCKS5-proxy (standardverdi `true` i `.env.example`) |

---

## Feilsøking

### «SOCKS5-proxyen er deaktivert»

Angi `ENABLE_SOCKS5_PROXY=true` i `.env`-filen, og start på nytt.

### «socket hang up»-feil via proxy

Dette er normalt med billige proxyer som lukker inaktive tilkoblinger. OmniRoute håndterer allerede dette ved å:

- Deaktivere keep-alive på proxytilkoblinger (`keepAliveTimeout: 1`)
- Deaktivere pipelining (`pipelining: 0`)
- Mellomlagre dispatchere for å unngå gjentatte håndtrykk

Hvis problemet vedvarer, kan du prøve en annen proxy eller bruke rotasjonsfunksjonen i 1proxy.

### «unsupported_country_region_territory» under OAuth

Kontroller at proxyen er konfigurert **før** du starter OAuth-flyten. OmniRoute ruter utvekslingen av OAuth-tokener gjennom den konfigurerte proxyen. Angi først en global proxy eller en proxy på leverandørnivå, og koble deretter til.

### Proxyen brukes ikke

Kontroller oppløsningsrekkefølgen:

1. Bekreft med `GET /api/settings/proxy?resolve=your-connection-id`
2. Kontroller om proxyens `status` er `active` (ikke `inactive`)
3. Kontroller at omfanget for proxytilordningen samsvarer med tilkoblingen din

### Synkronisering med 1proxy mislykkes

Kontroller synkroniseringsstatusen:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Hvis `consecutiveFailures >= 5`, er kretsbryteren utløst. Start serveren på nytt for å tilbakestille den, eller vent på manuell tilbakestilling.

---

## Databaseskjema

### Tabellen `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' eller 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (kun 1proxy)
  latency_ms INTEGER,                        -- millisekunder (kun 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- tilgang til Google? (1proxy)
  last_validated TEXT,                       -- ISO-tidsstempel (1proxy)
  country_code TEXT,                         -- ISO-kode på 2 bokstaver (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabellen `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- leverandør-ID, tilkoblings-ID eller kombinasjons-ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Helsesjekk av proxyer (v3.8.16+)

OmniRoutes mekanisme for **rask proxyfeil** (`src/lib/proxyHealth.ts`) oppdager døde proxyer på <2s via en rask kontroll av TCP-tilkoblingen og **mellomlagrer deretter resultatet** for å unngå ekstraarbeid per forespørsel.

### Slik fungerer det

```
Forespørsel ──▶ ProxyHealthCache.get(url)
                 │
                 ├─ Treff i mellomlager + ferskt?  ──▶ returner mellomlagret status
                 │
                 └─ Bom i mellomlager / foreldet?  ──▶ TCP-tilkobling til vert:port
                                                        (tidsavbrudd: FAST_FAIL_TIMEOUT_MS)
                                                        ──▶ mellomlagre i HEALTH_CACHE_TTL_MS
                                                        ──▶ returner resultat
```

Uten dette ville en død proxy blokkert hver forespørsel i hele `PROXY_TIMEOUT_MS` (standardverdi 30s) før den mislyktes.

### Justerbare miljøvariabler

| Variabel                     | Standardverdi | Formål                                        |
| ---------------------------- | ------------- | --------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`        | Tidsavbrudd for TCP-tilkobling per helsesjekk |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`       | Hvor lenge et helseresultat mellomlagres      |

**Anbefalte verdier:**

| Scenario                      | Tidsavbrudd for rask feil | TTL for mellomlager | Begrunnelse                                                                |
| ----------------------------- | ------------------------- | ------------------- | -------------------------------------------------------------------------- |
| API-gateway med høy trafikk   | 1500ms                    | 60000ms             | Aggressiv rask feil, lengre mellomlagring for å redusere antall kontroller |
| Geografisk distribuerte noder | 3000ms                    | 15000ms             | Tregere nettverk trenger mer tid; kortere mellomlagring for rask failover  |
| Utvikling/testing             | 1000ms                    | 10000ms             | Rask iterasjon på lokale proxyer                                           |
| Skjult modus / anti-deteksjon | 2500ms                    | 45000ms             | Unngå hyppig sondering som kan utløse hastighetsbegrensninger              |

### Kontrollere proxyhelse

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Tving en ny kontroll av en bestemt proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Flagget `stale` er `true` når mellomlageroppføringen har overskredet `HEALTH_CACHE_TTL_MS`, og den neste forespørselen vil utløse en ny kontroll.

### Standardverdier per proxytype

Helsesjekken bruker fornuftige standardverdier basert på URL-skjemaet:

| Skjema                     | Standardport |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

Egendefinerte porter i URL-en (`http://host:9999`) har alltid prioritet over standardverdien for skjemaet.

---

## Proxyanalyse og observerbarhet

OmniRoute sporer bruk per proxy for å hjelpe operatører med å diagnostisere rutingsmønstre, forsinkelsestopper og gjentakende feil.

### Hva som spores

For hver forespørsel gjennom en konfigurert proxy registrerer OmniRoute:

| Måleverdi    | Beskrivelse                                         |
| ------------ | --------------------------------------------------- |
| `proxy_url`  | Fullstendig proxy-URL (med maskerte påloggingsdata) |
| `provider`   | ID for oppstrømsleverandør (openai, anthropic osv.) |
| `latency_ms` | Total tur-retur-tid, inkludert proxy-håndtrykk      |
| `connect_ms` | Kun TCP-tilkoblingstid                              |
| `status`     | HTTP-statuskode fra oppstrømstjenesten              |
| `error`      | Feilklasse hvis forespørselen mislyktes             |
| `timestamp`  | ISO 8601 UTC                                        |

### Tilgang til dataene

```bash
# Nylige proxyhendelser
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Det faktiske endepunktet er `/api/usage/proxy-logs` (se `src/app/api/usage/proxy-logs/route.ts`). Dette endepunktet støtter:

- `GET /api/usage/proxy-logs` — hent proxylogger
- `DELETE /api/usage/proxy-logs` — slett alle proxylogger

Aggregert statistikk kan ved behov hentes direkte fra tabellen `proxy_logs` via SQL. Brukergrensesnittet i kontrollpanelet kan tilby aggregerte visninger.

### Vanlige mønstre

**Oppdag en ustabil proxy** (veksler mellom vellykkede og mislykkede forespørsler):

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

**Finn trege proxyer** (p95-forsinkelse > 2 s):

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

## Beslutningstre for rotasjonsstrategi

Når flere proxyer er tilordnet et virkeområde, bruker OmniRoute en **rotasjonsstrategi** for å velge hvilken som skal brukes for hver forespørsel. Strategien konfigureres på virkeområdenivå (globalt, per leverandør, per konto, per kombinasjon).

### Tilgjengelige strategier

| Strategi             | Når den bør brukes                            | Avveining                                                     |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------- |
| `quality` (standard) | Produksjon med proxyer av varierende kvalitet | Foretrekker høyt vurderte proxyer; kan forsømme lavt vurderte |
| `random`             | Lastfordeling, personvern                     | Jevn fordeling; ignorerer kvalitetssignaler                   |
| `sequential`         | Feilsøking, deterministisk testing            | Går gjennom proxyene i rekkefølge; lett å forstå              |

### Beslutningstre

```
                    Har du kvalitetspoeng for proxyene dine?
                    │
        ┌───────────┴───────────┐
        │                       │
       JA                      NEI
        │                       │
   Er alle proxyene            │
   omtrent like                │
   i kvalitet?                 │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  JA        NEI              Bruk
   │         │              `random`
   │         │              (jevn spredning
   │         │              bygger kvalitetsdata
   │         │              over tid)
   │         │
   │    Bruk `quality`
   │    (best for
   │    varierende kvalitet)
   │
Bruk `random`
(fordel belastningen
jevnt)
```

## Automatisk utestenging av feil for dine egne proxyer

1proxy-markedsplasspoolen degraderer allerede mislykkede proxyer automatisk på egen hånd (se [Proxy-kvalitetspoeng](#proxy-quality-scores) ). For fullmakter** du** added to the registry, the background health scheduler (`src/lib/proxyHealth/scheduler.ts`) provides the same "exclude a dead member from the chain automatically" behavior, without deleting anything:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Slik passer den inn i en multi-proxy-kjede:

1. Planleggeren sonderer hver registrerte proxy hver `PROXY_HEALTH_INTERVAL_MS` (standard 10 min; minimum 1 min).
2. Etter `PROXY_AUTO_REMOVE_AFTER` på rad** avgjørende** failures (a real connection failure — a timeout or the probe target's own 5xx never counts, see [Proxy Health Checking](#proxy-health-checking-v3816) ), the proxy's `status` is set to `dead`.
3. `dead` is one of the statuses the alive-status filter used by pool/rotation resolution excludes, so a scope's rotation (round-robin / random / sticky / latency / session — see [Rotation Strategy Decision Tree](#rotation-strategy-decision-tree)) immediately stops handing that proxy to new requests. No other proxies in the pool are affected, and the whole pool never silently falls back to a direct connection — see the [4-Level Proxy System](#4-level-proxy-system) fail-closed guard.
4. Planleggeren fortsetter å undersøke `dead` proxyer på samme intervall. Den neste vellykkede sonden snur `status` tilbake til `active` og den går inn igjen i rotasjon — uten manuell re-add.

Dette er bevisst** opt-in og ikke-destruktiv** : by default the scheduler only counts and logs failures (see policy C in `decision.ts`), and `PROXY_AUTO_DISABLE` never deletes a row — that is what the separate, more aggressive `PROXY_AUTO_REMOVE` flag is for. Hvis begge er satt til `true`, vinner `PROXY_AUTO_REMOVE` (en proxy som skal slettes har ingen bruk for en myk deaktivering i mellom). Se [Environment Config-](../reference/ENVIRONMENT.md) referansen for hele variabellisten.

---

> 📖** Relatert dokumentasjon:**
>
> - [Brukerveiledning](../guides/USER_GUIDE.md) — Generell oppsett og konfigurasjon - [API Referanse](../reference/API_REFERENCE.md) — Full API dokumentasjon - [Environment Config](../reference/ENVIRONMENT.md) — Alle miljøvariabler
