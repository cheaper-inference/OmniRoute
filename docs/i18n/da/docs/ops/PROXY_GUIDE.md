# 🌐 OmniRoute Proxy Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Omgå geografiske blokeringer, beskyt din identitet, og diriger AI-trafik gennem enhver proxy — helt uden kompleks konfiguration.**

OmniRoute indeholder et komplet proxyadministrationssystem, der giver dig mulighed for at dirigere trafik til opstrøms AI-udbydere gennem HTTP-, HTTPS- eller SOCKS5-proxyer. Uanset om du befinder dig i en blokeret region, har brug for IP-rotation eller ønsker skjult fingerprinting — dækker denne vejledning det hele.

---

## Indholdsfortegnelse

- [Hvorfor bruge proxyer?](#why-use-proxies)
- [Oversigt over arkitekturen](#architecture-overview)
- [Proxysystem med 4 niveauer](#4-level-proxy-system)
- [Proxyregister (CRUD)](#proxy-registry-crud)
- [1proxy-markedsplads med gratis proxyer](#1proxy-free-proxy-marketplace)
- [Proxyrotation](#proxy-rotation)
- [Beskyttelse mod registrering og skjult tilstand](#anti-detection--stealth)
- [Tilstande for opstrøms proxyer](#upstream-proxy-modes)
- [Dashboardbrugerflade](#dashboard-ui)
- [API-reference](#api-reference)
- [Miljøvariabler](#environment-variables)
- [Fejlfinding](#troubleshooting)

---

## Hvorfor bruge proxyer?

Mange AI-udbydere begrænser adgangen efter geografisk region. Udviklere i **Rusland, Kina, Iran, Cuba, Tyrkiet** og andre lande oplever fejl såsom:

```
unsupported_country_region_territory
```

Selv uden for blokerede regioner er proxyer nyttige til:

| Anvendelse                 | Beskrivelse                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| **Geografisk omgåelse**    | Få adgang til OpenAI, Anthropic, Codex og Copilot fra blokerede lande     |
| **IP-rotation**            | Fordel anmodninger på tværs af flere IP'er for at undgå hastighedsgrænser |
| **Privatliv**              | Skjul din rigtige IP-adresse for opstrøms udbydere                        |
| **Overholdelse af regler** | Diriger trafik gennem bestemte jurisdiktioner                             |
| **Test**                   | Simuler anmodninger fra forskellige regioner                              |

---

## Oversigt over arkitekturen

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute-server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy-      │    │ Proxy-       │    │ Proxy-           │  │
│  │ register    │───▶│ dispatcher   │───▶│ fetch (undici)   │  │
│  │ (SQLite)    │    │ (cachelagret)│    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy-     │                        │ Opstrøms         │  │
│  │ synkronisering│                      │ udbyder-API      │  │
│  │ (gratis pulje)│                      │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Nøglekomponenter

| Komponent               | Fil                                          | Rolle                                                            |
| ----------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| **Proxyregister**       | `src/lib/db/proxies.ts`                      | CRUD for proxyposter og tildelinger af anvendelsesområder        |
| **Proxydispatcher**     | `open-sse/utils/proxyDispatcher.ts`          | Opretter `undici` ProxyAgent-/SOCKS-dispatchere med cachelagring |
| **Proxy-fetch**         | `open-sse/utils/proxyFetch.ts`               | Omslutter `fetch()` med injektion af proxydispatcher             |
| **Indstillingsrute**    | `src/app/api/settings/proxy/route.ts`        | API til ældre proxykonfiguration (GET/PUT/DELETE)                |
| **Administrationsrute** | `src/app/api/v1/management/proxies/route.ts` | CRUD-API til registeret (GET/POST/PATCH/DELETE)                  |
| **1proxy-database**     | `src/lib/db/oneproxy.ts`                     | Permanent lagring for markedspladsen med gratis proxyer          |

---

## Standard proxy-tilstand for nye konti

I** Indstillinger → Proxy → Global konfiguration** , brug** Aktiver proxy som standard for nye forbindelser** for at vælge den oprindelige proxy-tilstand for nyligt tilføjede udbyderkonti.

Den nye indstilling styrer den indledende proxy-tilstand for nyligt tilføjede udbyderkonti. Det ændrer ikke eksisterende konti eller erstatter den globale proxy-switch. Dens startværdi bevarer den tidligere adfærd. Slå det fra én gang for at oprette fremtidige konti med proxy deaktiveret som standard.

Præferencen gemmes som `defaultNewConnectionProxyEnabled` gennem de eksisterende indstillinger API. Den er som standard `true` når den aldrig bliver gemt. At gemme `false` træder i kraft for efterfølgende nye konti uden genstart. `POST /api/providers` accepterer en valgfri streng boolesk `proxyEnabled`; en eksplicit `true` eller `false` har forrang over oprettelsesstandarden. Udeladelse af en dubletkonto eller OAuth genopret forbindelse bevarer denne kontos lagrede tilstand. Individuelle konti kan stadig aktiveres eller deaktiveres efterfølgende.

Selektive udbyderoverførsler bruger destinationsinstallationens standard for nye konti og bevarer destinationspolitikken, når eksisterende konti erstattes. Proxy-skift er ikke bærbare overførselsfelter. Fuld backupgendannelse og historisk JSON/SQL -migrering bevarer deres eksisterende gendannelsessemantik, inklusive gemte kontoværdier og ældre skemastandarder; en fuld gendannelse af indstillinger kan også gendanne denne præference.

Denne præference tildeler ikke en proxy eller fastslår, at en er sund eller i brug. Den faktiske routing afhænger stadig af den globale proxy-switch og gældende proxy-konfiguration. Syntetiske udbydere uden en vedvarende konto, OAuth -trafik før kontooprettelse, environment/system proxyer og eksterne backends' netværk er uden for dets omfang.

## Proxysystem med 4 niveauer

OmniRoute understøtter proxykonfiguration på **fire uafhængige niveauer**, som bestemmes i prioriteret rækkefølge:

```
Prioriteret rækkefølge for bestemmelse (højeste → laveste):

  1. 🔵 Konto-/forbindelsesproxy  →  pr. API-nøgle/OAuth-forbindelse
  2. 🟡 Udbyderproxy              →  pr. udbyder (f.eks. al OpenAI-trafik)
  3. 🟠 Kombinationsproxy         →  pr. kombinations-/routingkonfiguration
  4. 🟢 Global proxy              →  al trafik, alle udbydere
```

### Sådan fungerer bestemmelsen

Når OmniRoute sender en anmodning til en ekstern udbyder, kalder den `resolveProxyForConnectionFromRegistry()`, som kontrollerer hvert niveau i rækkefølge:

1. **Kontoniveau** — Er der tildelt en proxy til dette specifikke forbindelses-id?
2. **Udbyderniveau** — Er der tildelt en proxy til denne udbyder (f.eks. `openai`)?
3. **Globalt niveau** — Er der konfigureret en global proxy?
4. **Ingen proxy** — Direkte forbindelse til udbyderen.

Det første match anvendes. Det betyder, at du kan angive en global proxy som reserve, men tilsidesætte den for bestemte udbydere eller forbindelser.

### Hvad sendes gennem proxyen

| Trafiktype            | Via proxy? | Bemærkninger                                 |
| --------------------- | ---------- | -------------------------------------------- |
| Chatfuldførelser      | ✅         | Alle `/v1/chat/completions`-anmodninger      |
| Embeddings            | ✅         | `/v1/embeddings`                             |
| Billedgenerering      | ✅         | `/v1/images/generations`                     |
| Lyd (TTS/STT)         | ✅         | `/v1/audio/*`                                |
| OAuth-tokenudveksling | ✅         | Løser `unsupported_country_region_territory` |
| Forbindelsestest      | ✅         | Knappen "Test forbindelse" bruger proxyen    |
| Tokenfornyelse        | ✅         | OAuth-fornyelse i baggrunden                 |
| Modelsynkronisering   | ✅         | Modelliste og -registrering                  |

---

## Proxyregister (CRUD)

Proxyregisteret er en SQLite-tabel (`proxy_registry`), som gemmer alle dine proxyer. Hver proxy har:

| Felt       | Type    | Beskrivelse                                         |
| ---------- | ------- | --------------------------------------------------- |
| `id`       | UUID    | Entydigt id                                         |
| `name`     | String  | Letlæselig etiket                                   |
| `type`     | String  | Protokol: `http`, `https`, `socks5`                 |
| `host`     | String  | Proxyværtsnavn eller IP-adresse                     |
| `port`     | Integer | Portnummer                                          |
| `username` | String  | Brugernavn til godkendelse (krypteret ved lagring)  |
| `password` | String  | Adgangskode til godkendelse (krypteret ved lagring) |
| `region`   | String  | Etiket for geografisk område                        |
| `notes`    | String  | Fritekstnoter                                       |
| `status`   | String  | `active` eller `inactive`                           |
| `source`   | String  | `manual` eller `oneproxy`                           |

### Oprettelse af en proxy

**Via kontrolpanelet:**

1. Gå til **Indstillinger → Proxy**
2. Klik på **Tilføj proxy**
3. Udfyld type, vært, port og eventuelle godkendelsesoplysninger
4. Gem

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

### Opdatering af en proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Bemærk:** Godkendelsesoplysninger bevares, medmindre du udtrykkeligt sender ikke-tomme erstatninger. Hvis der sendes tomme strenge for `username`/`password`, bevares de gemte værdier.

### Sletning af en proxy

```bash
# Mislykkes, hvis proxyen er tildelt et niveau
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Gennemtving sletning (fjerner også tildelinger)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Visning af proxyer

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Tildeling af proxyer til niveauer

```bash
# Tildel til det globale niveau
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Tildel til en bestemt udbyder
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Tildel til en bestemt forbindelse/nøgle
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Bestemmelse af den gældende proxy

Kontrollér, hvilken proxy der vil blive brugt til en given forbindelse:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Returnerer den bestemte proxy med dens niveau (`account`, `provider` eller `global`) og kilde.

### Massetildeling

Tildel én proxy til flere udbydere eller forbindelser på én gang:

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

Proxyer er inkluderet i systemet til **sikkerhedskopiering/gendannelse**. Når du eksporterer din OmniRoute-konfiguration:

1. Gå til **Kontrolpanel → Indstillinger → Sikkerhedskopiering**
2. Klik på **Eksportér** — proxyregisteret og tildelingerne inkluderes
3. Klik på **Importér** for at gendanne, og upload sikkerhedskopifilen

Proxyregisteret understøtter også **upsert efter vært+port** — hvis du importerer en proxy, der allerede findes (samme vært og port), opdateres den i stedet for at oprette en dublet.

### Migrering af ældre konfigurationer

Hvis du konfigurerede proxyer i en ældre version (før registreringsdatabasen), migrerer OmniRoute dem automatisk:

```
Ældre key_value-lager → proxy_registry + proxy_assignments
```

Dette sker én gang ved den første opstart efter opgraderingen. Brug `migrateLegacyProxyConfigToRegistry({ force: true })` for at køre migreringen igen.

---

## 1proxy gratis proxy markedsplads

> 🆕** Bidraget af [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (udgave [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute integreres med** [1 proxy](https://1proxy-api.aitradepulse.com)** fællesskabsplatform at give adgang til** hundredvis af gratis, validerede fuldmagter** fra hele verden. Dette er perfekt til brugere, der ikke har deres egen proxy-infrastruktur.

### Hvordan det virker

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Synkroniser** — OmniRoute henter validerede proxyer fra 1proxy API
2. **Butik** — Proxies gemmes i den samme `proxy_registry` tabel som `source = 'oneproxy'`
3. **Filter** — Filtrer efter protokol, land, kvalitetsscore
4. **Rotere** — Vælg den bedste proxy ved hjælp af kvalitets-, tilfældige eller sekventielle strategier
5. **Automatisk nedbrydning** — Mislykkede fuldmagter får deres kvalitetsscore reduceret; under tærskel → markeret inaktiv

### Synkroniserer proxyer

**Via Dashboard:**

1. Gå til** Indstillinger → 1proxy** fanen
2. Klik** "Synkroniser nu"**
3. Se statistikker: samlede fuldmagter, aktivt antal, gennemsnitlig kvalitet, opdeling efter land

**Via API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrering af proxyer

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

### Proxy kvalitetsresultater

Hver 1proxy proxy leveres med metadata:

| Felt            | Beskrivelse                                   |
| --------------- | --------------------------------------------- |
| `qualityScore`  | 0-100 rating fra 1 proxy validering           |
| `latencyMs`     | Målt netværksforsinkelse                      |
| `anonymity`     | `transparent`, `anonymous` eller `elite`      |
| `googleAccess`  | Om proxyen kan få adgang til Google tjenester |
| `countryCode`   | To bogstaver ISO landekode                    |
| `lastValidated` | Tidsstempel for sidste validering             |

Kvalitetsresultater justeres dynamisk:

- **Mislykkede anmodninger** reducere scoren med 10 point
- **Resultatet falder til ≤ 10** → proxy er markeret med `inactive`
- Inaktive fuldmagter er udelukket fra rotation

### Rotationsstrategier

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

### Strømafbryder

1proxy sync har en indbygget afbryder:

- Efter** 5 på hinanden følgende synkroniseringsfejl** , blokeres yderligere synkroniseringsforsøg
- Nulstil med: `resetOneproxyCircuitBreaker()` eller genstart serveren
- Synkroniseringsstatus er tilgængelig på `GET /api/settings/oneproxy?action=status`

### Rydning af 1 proxy proxyer

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-detektion og stealth

OmniRoute dirigerer ikke kun trafik gennem en proxy — det får trafikken til at se legitim ud:

### TLS Fingeraftrykspoofing

Bruger `wreq-js` til at generere browserlignende TLS -fingeraftryk og omgår botdetektionssystemer, der markerer ikke-browser TLS håndtryk.

### CLI Fingerprint Matching

De**CLI Fingerprint Toggle** (`Settings → Security`) omarrangerer HTTP -overskrifter og JSON -legemefelter for at matche den nøjagtige signatur af native CLI binære filer (Claude kode, Codex, osv.). Dette virker** ovenpå** proxy:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Du får begge dele**IP maskering** og** anmode om ægthed** samtidigt.

### Proxy IP Bevarelse

Farvekodede badges i dashboardet viser, hvilket proxyniveau der er aktivt:

| Badge | Niveau      | Mening                                          |
| ----- | ----------- | ----------------------------------------------- |
| 🟢    | Global      | Al trafik går gennem denne proxy                |
| 🟡    | Udbyder     | Kun denne udbyders trafik er proxy              |
| 🔵    | Forbindelse | Denne specifikke key/account bruger denne proxy |

Badget viser også den løste proxy IP til verifikation.

---

## Upstream-proxytilstande

For udbydere, der bruger CLIProxyAPI-mønstret, understøtter OmniRoute tre upstream-proxytilstande:

| Tilstand      | Beskrivelse                                             |
| ------------- | ------------------------------------------------------- |
| `native`      | OmniRoute håndterer proxydirigering direkte (standard)  |
| `cliproxyapi` | Delegerer til en ekstern CLIProxyAPI-instans            |
| `fallback`    | Forsøger først native og falder tilbage til CLIProxyAPI |

Konfigurer pr. udbyder:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Kontrolpanelets brugergrænseflade

### Indstillinger → Fanen Proxy

- Konfiguration af **global proxy** (indstil én gang for al trafik)
- **Proxytilsidesættelser pr. udbyder**
- **Proxytildelinger pr. forbindelse**
- **Forbindelsestest** gennem den konfigurerede proxy
- **Farvekodede badges**, der viser det aktive proxyniveau

### Indstillinger → Fanen 1proxy

- Knappen **Synkroniser nu** til hentning af gratis proxyer
- **Statistikkort**: I alt, Aktive, Gennemsnitlig kvalitet, Seneste synkronisering
- **Filtre**: Protokol, Landekode, Minimumskvalitet
- **Proxytabel** med vært, protokol, land, kvalitetsscore, latenstid, anonymitet og Google-adgang
- Panelet **Synkroniseringsstatus** med registrering af vellykkede/mislykkede forsøg og antal på hinanden følgende fejl
- **Ryd alle** for at fjerne alle 1proxy-poster

---

## API-reference

### API til proxyindstillinger

| Metode   | Slutpunkt                                      | Beskrivelse                     |
| -------- | ---------------------------------------------- | ------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Hent komplet proxykonfiguration |
| `GET`    | `/api/settings/proxy?level=global`             | Hent global proxy               |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Hent udbyderproxy               |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Find den effektive proxy        |
| `PUT`    | `/api/settings/proxy`                          | Opdater proxykonfiguration      |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Fjern proxy på niveauet         |

### API til proxyregister

| Metode   | Slutpunkt                                         | Beskrivelse                |
| -------- | ------------------------------------------------- | -------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Vis alle proxyer           |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Hent proxy efter ID        |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Hent proxytildelinger      |
| `POST`   | `/api/v1/management/proxies`                      | Opret proxy                |
| `PATCH`  | `/api/v1/management/proxies`                      | Opdater proxy              |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Slet proxy                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Gennemtving sletning       |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Foretag massetildeling     |
| `GET`    | `/api/v1/management/proxies/assignments`          | Vis tildelinger            |
| `GET`    | `/api/v1/management/proxies/health`               | Proxyens sundhedsstatistik |

### API til tunneler

Du kan læse [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) om, hvordan du eksponerer din OmniRoute-instans på det offentlige internet (Cloudflare/ngrok/Tailscale) i stedet for at dirigere udgående trafik gennem en proxy. Tunnelens REST-API findes under `/api/tunnels/{cloudflared,ngrok,tailscale}/*` og er uafhængig af den udgående proxykæde, der er dokumenteret ovenfor.

### API til 1proxy

| Metode   | Slutpunkt                              | Beskrivelse                            |
| -------- | -------------------------------------- | -------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Vis 1proxy-proxyer                     |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Hent statistik + synkroniseringsstatus |
| `GET`    | `/api/settings/oneproxy?action=status` | Hent kun synkroniseringsstatus         |
| `POST`   | `/api/settings/oneproxy`               | Udløs synkronisering                   |
| `POST`   | `/api/settings/oneproxy/rotate`        | Skift til næste proxy                  |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Slet én                                |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Ryd alle                               |

### API til upstream-proxy

| Metode   | Slutpunkt                         | Beskrivelse                       |
| -------- | --------------------------------- | --------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Hent upstream-proxykonfiguration  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Indstil upstream-proxytilstand    |
| `DELETE` | `/api/upstream-proxy/:providerId` | Fjern upstream-proxykonfiguration |

---

## Miljøvariabler

| Variabel              | Standardværdi | Beskrivelse                                                                         |
| --------------------- | ------------- | ----------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`        | Aktivér understøttelse af SOCKS5-proxy (standardværdien er `true` i `.env.example`) |

---

## Fejlfinding

### "SOCKS5-proxyen er deaktiveret"

Angiv `ENABLE_SOCKS5_PROXY=true` i din `.env`-fil, og genstart.

### Fejl af typen "socket hang up" via proxy

Dette er normalt med billige proxyer, der afbryder inaktive forbindelser. OmniRoute håndterer allerede dette ved at:

- Deaktivere keep-alive på proxyforbindelser (`keepAliveTimeout: 1`)
- Deaktivere pipelining (`pipelining: 0`)
- Cache dispatchere for at undgå gentagne handshakes

Hvis problemet fortsætter, kan du prøve en anden proxy eller bruge rotationsfunktionen i 1proxy.

### "unsupported_country_region_territory" under OAuth

Sørg for, at proxyen er konfigureret, **før** du starter OAuth-flowet. OmniRoute sender udvekslingen af OAuth-tokens gennem den konfigurerede proxy. Angiv først en global proxy eller en proxy på udbyderniveau, og opret derefter forbindelsen.

### Proxyen bliver ikke brugt

Kontrollér opløsningsrækkefølgen:

1. Bekræft med `GET /api/settings/proxy?resolve=your-connection-id`
2. Kontrollér, om proxyens `status` er `active` (ikke `inactive`)
3. Sørg for, at proxytildelingens omfang matcher din forbindelse

### Synkronisering med 1proxy mislykkes

Kontrollér synkroniseringsstatussen:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Hvis `consecutiveFailures >= 5`, er kredsløbsafbryderen blevet udløst. Genstart serveren for at nulstille den, eller vent på manuel nulstilling.

---

## Databaseskema

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
  quality_score INTEGER,                     -- 0-100 (kun 1proxy)
  latency_ms INTEGER,                        -- millisekunder (kun 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- kan tilgå Google? (1proxy)
  last_validated TEXT,                       -- ISO-tidsstempel (1proxy)
  country_code TEXT,                         -- ISO-landekode på 2 bogstaver (1proxy)
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
  scope_id TEXT,              -- udbyder-id, forbindelses-id eller kombinations-id
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Kontrol af proxystatus (v3.8.16+)

OmniRoutes mekanisme til **hurtig proxyfejl** (`src/lib/proxyHealth.ts`) registrerer utilgængelige proxyer på <2s via en hurtig kontrol af TCP-forbindelsen og **cacher derefter resultatet** for at undgå ekstra belastning pr. anmodning.

### Sådan fungerer det

```
Anmodning ──▶ ProxyHealthCache.get(url)
               │
               ├─ Cachefund + aktuelt?  ──▶ returnér cachelagret status
               │
               └─ Intet cachefund / forældet?  ──▶ TCP-forbindelse til host:port
                                                    (timeout: FAST_FAIL_TIMEOUT_MS)
                                                    ──▶ cachelagr i HEALTH_CACHE_TTL_MS
                                                    ──▶ returnér resultat
```

Uden dette ville en utilgængelig proxy blokere hver anmodning i hele `PROXY_TIMEOUT_MS` (standardværdien er 30s), før den mislykkes.

### Justerbare miljøvariabler

| Variabel                     | Standardværdi | Formål                                         |
| ---------------------------- | ------------- | ---------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`        | Timeout for TCP-forbindelsen pr. statuskontrol |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`       | Hvor længe et statusresultat cachelagres       |

**Anbefalede værdier:**

| Scenarie                                  | Timeout for hurtig fejl | Cache-TTL | Begrundelse                                                                 |
| ----------------------------------------- | ----------------------- | --------- | --------------------------------------------------------------------------- |
| API-gateway med høj kapacitet             | 1500ms                  | 60000ms   | Aggressiv hurtig fejl, længere cache for at reducere antallet af kontroller |
| Geografisk distribuerede noder            | 3000ms                  | 15000ms   | Langsommere netværk kræver mere tid; kortere cache til hurtigt failover     |
| Udvikling/test                            | 1000ms                  | 10000ms   | Hurtig iteration med lokale proxyer                                         |
| Skjult tilstand/undgåelse af registrering | 2500ms                  | 45000ms   | Undgå hurtige sonderinger, der kan udløse hastighedsbegrænsninger           |

### Inspektion af proxystatus

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Gennemtving en ny kontrol af en specifik proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Flaget `stale` er `true`, når cacheposten har overskredet `HEALTH_CACHE_TTL_MS`, og den næste anmodning vil udløse en ny kontrol.

### Standardværdier pr. proxytype

Statuskontrollen bruger fornuftige standardværdier baseret på URL-skemaet:

| Skema                      | Standardport |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

Brugerdefinerede porte i URL'en (`http://host:9999`) har altid forrang over skemaets standardværdi.

---

## Proxyanalyse og observerbarhed

OmniRoute sporer brugen pr. proxy for at hjælpe operatører med at diagnosticere routingmønstre, stigninger i latenstid og tilbagevendende fejl.

### Hvad der spores

For hver anmodning gennem en konfigureret proxy registrerer OmniRoute:

| Måling       | Beskrivelse                                      |
| ------------ | ------------------------------------------------ |
| `proxy_url`  | Fuld proxy-URL (med skjulte loginoplysninger)    |
| `provider`   | ID for upstream-udbyder (openai, anthropic osv.) |
| `latency_ms` | Samlet tur-retur-tid inklusive proxy-handshake   |
| `connect_ms` | Kun TCP-forbindelsestid                          |
| `status`     | HTTP-statuskode fra upstream                     |
| `error`      | Fejlklasse, hvis anmodningen mislykkedes         |
| `timestamp`  | ISO 8601 UTC                                     |

### Adgang til dataene

```bash
# Seneste proxyhændelser
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Det faktiske endpoint er `/api/usage/proxy-logs` (se `src/app/api/usage/proxy-logs/route.ts`). Dette endpoint understøtter:

- `GET /api/usage/proxy-logs` — hent proxylogfiler
- `DELETE /api/usage/proxy-logs` — ryd alle proxylogfiler

Aggregerede statistikker kan om nødvendigt forespørges direkte fra tabellen `proxy_logs` via SQL. Dashboardets brugergrænseflade kan tilbyde aggregerede visninger.

### Almindelige mønstre

**Registrer en ustabil proxy** (skifter mellem succes og fejl):

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

**Find langsomme proxyer** (p95-latenstid > 2 s):

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

## Beslutningstræ for rotationsstrategi

Når flere proxyer er tildelt et anvendelsesområde, bruger OmniRoute en **rotationsstrategi** til at vælge, hvilken der skal bruges til hver anmodning. Strategien konfigureres på anvendelsesområdeniveau (globalt, pr. udbyder, pr. konto, pr. kombination).

### Tilgængelige strategier

| Strategi             | Hvornår den skal bruges                    | Afvejning                                                            |
| -------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| `quality` (standard) | Produktion med proxyer af blandet kvalitet | Foretrækker højt vurderede proxyer; kan sulte lavt vurderede proxyer |
| `random`             | Belastningsfordeling, privatliv            | Jævn fordeling; ignorerer kvalitetssignaler                          |
| `sequential`         | Fejlfinding, deterministisk testning       | Gennemløber proxyer i rækkefølge; let at forstå                      |

### Beslutningstræ

```
                    Har du kvalitetsscorer for dine proxyer?
                    │
        ┌───────────┴───────────┐
        │                       │
        JA                     NEJ
        │                       │
   Er alle proxyer              │
   omtrent ens                  │
   i kvalitet?                  │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  JA        NEJ                Brug
   │         │              `random`
   │         │              (jævn fordeling
   │         │              opbygger kvalitets-
   │         │              data over tid)
   │         │
   │    Brug `quality`
   │    (bedst til
   │    blandet kvalitet)
   │
Brug `random`
(fordel belastningen
jævnt)
```

## Automatisk fejludelukkelse for dine egne fuldmagter

1proxy-markedspladspuljen nedbryder allerede automatisk mislykkede proxyer af sig selv (se [Proxykvalitetsresultater](#proxy-quality-scores) ). Til fuldmagter** du** tilføjet til registreringsdatabasen, giver baggrundssundhedsplanlæggeren (`src/lib/proxyHealth/scheduler.ts`) den samme "udelukke et dødt medlem fra kæden automatisk" adfærd uden at slette noget:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Sådan passer det ind i en multi-proxy-kæde:

1. Planlæggeren sonderer hver registreret proxy hver `PROXY_HEALTH_INTERVAL_MS` (standard 10 min; minimum 1 min).
2. Efter `PROXY_AUTO_REMOVE_AFTER` i træk** afgørende** fejl (en reel forbindelsesfejl — en timeout eller sondemålets egen 5xx tæller aldrig, se [Proxy Health Checking](#proxy-health-checking-v3816) ), proxyens `status` er sat til `dead`.
3. `dead` er en af de statusser, som live-status-filteret, der bruges af pool/rotation -opløsning, udelukker, så et scopes rotation (round-robin / random / sticky / latency / session — se [Rotation Strategy Decision Tree](#rotation-strategy-decision-tree) ) stopper straks med at give den proxy til nye anmodninger. Ingen andre proxyer i poolen er påvirket, og hele poolen falder aldrig lydløst tilbage til en [direkte](#4-level-proxy-system) forbindelse —
4. Planlæggeren bliver ved med at sondere `dead` proxyer i det samme interval. Den næste vellykkede sonde vender `status` tilbage til `active`, og den går igen i rotation — der kræves ingen manuel gentilføjelse.

Dette er bevidst** opt-in og ikke-destruktiv** : Som standard tæller og logger skemalæggeren kun fejl (se politik C i `decision.ts`), og `PROXY_AUTO_DISABLE` sletter aldrig en række — det er det, det separate, mere aggressive `PROXY_AUTO_REMOVE` flag er til for. Hvis begge er indstillet til `true`, vinder `PROXY_AUTO_REMOVE` (en proxy, der er ved at blive slettet, kan ikke bruges til en soft-deaktivering imellem). Se [Environment Config-](../reference/ENVIRONMENT.md) referencen for den fulde variabelliste.

---

> 📖** Relateret dokumentation:**
>
> - [Brugervejledning](../guides/USER_GUIDE.md) — Generel opsætning og konfiguration - [API Reference](../reference/API_REFERENCE.md) — Fuld API dokumentation - [Environment Config](../reference/ENVIRONMENT.md) — Alle miljøvariabler
