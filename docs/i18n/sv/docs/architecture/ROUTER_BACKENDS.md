# Router Backends & Embedded Services — architecture contract (ADR) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Godkänd · **Kontext:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrakt:** `domain/routing/routerBackends.ts`
> (typat register — koden levereras med [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Detta ADR fastställer hur `ts` (inbyggd), `bifrost`, `cliproxy`, `9router` och
VibeProxy-kompatibla motorer förhåller sig till varandra, så att bidragsgivare slutar
blanda ihop två saker som är arkitektoniskt åtskilda. Det dokumenterar det typade
register som introduceras av arbetet med router-backend-registret som den enda
sanningskällan för denna modell.

## Den grundläggande skillnaden — två ortogonala axlar

En motors roll beskrivs av **två oberoende axlar**, som tillsammans kodas i
registrets `RouterBackendDefinition`:

1. **Livscykel** (`RouterBackendLifecycle`) — _hur motorn körs_:
   - `in-process` — körs inuti OmniRoutes Node-process (den inbyggda TS-pipelinen).
   - `supervised` — en lokal underprocess som OmniRoute installerar/startar/stoppar/hälsokontrollerar
     via `ServiceSupervisor` och sedan använder som en leverantörsanslutning.
   - `external` — en HTTP-slutpunkt som OmniRoute skickar anrop till men **inte** hanterar
     (konfigureras genom en bas-URL i en miljövariabel).
   - `disabled` — registrerad men inte valbar.
2. **Urvalsaxel** (reläets routningsbackend) — _om reläet skickar anrop till den_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` i
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Misstaget som ska undvikas är att behandla ”inbäddad tjänst” och ”routningsbackend” som en
och samma lista. Det är de inte. En `supervised`-motor (9router/cliproxy) är en **leverantörsanslutning
som används av den inbyggda pipelinen**, inte en alternativ backend för relädispatch.
`bifrost` är motsatsen — en backend för relädispatch som (historiskt)
endast var `external`.

## Registret — den enda sanningskällan

Kontraktet `domain/routing/routerBackends.ts` (koden levereras med
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklarerar varje motor en gång, med dess
livscykel, funktioner, tjänsteidentitet, standardport, hälsokonfiguration och
telemetristöd. Konsumenter slår upp motorer via `getRouterBackend(id)`,
`listRouterBackends()` och `listRouterBackendsByCapability(cap)` i stället för
att specialhantera varje sidoprocess.

| Backend     | Livscykel    | Tjänst (axel A) | Reläbackend (axel B)   | Hälsa         | Standardport |
| ----------- | ------------ | --------------- | ---------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —               | `ts` (inbyggd)         | —             | —            |
| `bifrost`   | `external`¹  | —¹              | `bifrost` / `auto`     | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`      | — (leverantör)         | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`       | — (leverantör)         | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —               | — (leverantörsadapter) | `/v1/models`  | —            |

¹ Bifrosts uppgradering till en `supervised` inbäddad tjänst (som kan installeras/startas
från `/api/services/bifrost/`) följs i
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); fram till dess att den slås samman
är Bifrost endast `external` (kan enbart nås via `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) låter anropare
filtrera efter vad en motor faktiskt kan göra i stället för att hårdkoda förgreningar per id.

## Axis A — inbäddade tjänster (övervakad processsida)

- **Register över övervakade processer:** `src/lib/services/bootstrap.ts` `SERVICES[]` (idag: `9router`, `cliproxy`).
- **Livscykelägare:** `src/lib/services/ServiceSupervisor.ts` — `start()` skapar barnet, slussar på `waitForHealthy()`, tappar stdout/stderr i en ringbuffert; `stop()` SIGTERM→SIGKILL; allt serialiserat under ett lås.
- **Statsförbundet** (`src/lib/services/types.ts`): `not_installed | stopped | starting | running | stopping | error`, plus en ortogonal `HealthState = healthy | unhealthy | unknown`.
- **Varför en separat process (inte en i-proc SDK)?** Processisolering är det som gör install/start/stop/health/logs oberoende styrbar per sidovagn och låter loopback spawn-guard tillämpas. Att modellera en in-proc-adapter är framtida arbete — `native-hot-path` -flaggan är där det skulle uttryckas.

### Livscykelvägskontrakt (`/api/services/<tool>/…`)

Statuskoder är**state/verb/path-specific av design** — detta är kontraktet, inte inkonsekvens:

| Samtal                       | Skick                                    | Status                               |
| ---------------------------- | ---------------------------------------- | ------------------------------------ |
| `POST .../start`             | service `not_installed`                  | **409** (förutsättning)              |
| `POST .../stop`              | redan slutat                             | **200** (idempotent no-op)           |
| `GET .../status`             | OK                                       | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | spawn misslyckande                       | **503** (övergående)                 |
| `GET .../status`, `.../stop` | oupptäckt fel                            | **500**                              |
| `GET /api/services/<x>/logs` | okänt verktyg `<x>`                      | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | saknas `X-Reveal-Confirm: yes`           | **403** (endast 9-router)            |
| **några** `/api/services/*`  | den som ringer inte loopback/private-LAN | **403 LOCAL_ONLY**                   |

Alla felkroppar formas av `createErrorResponse()` → `{ error: { message, type }, requestId }`, där `type` härleds från status (`500→server_error`, `404→not_found`, `409→conflict`, else `invalid_request`) och är den maskiningripbara diskriminatorn. Meddelanden är försanerade (`sanitizeErrorMessage()`, Hard Rule #12).

**Loopback-skyddet** är den vanligaste källan till en `403`: `/api/services/` är i `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) och `src/server/authz/policies/management.ts` avvisar alla icke-loopback/icke-privat-LAN-anropare** före aut** , eftersom dessa rutter skapar underordnade processer (hårda regler 15 och 17). Att nå dem genom en offentlig tunnel är `403` av design.

## Axel B — routningsbackend för relä (dirigeringssidan)

Endast reläproxysökvägen `/api/v1/relay/chat/completions` väljer en backend för
dirigering; huvudytan `/api/v1/chat/completions` konsulterar aldrig
`routingBackend.ts`.

- **Val** (`resolveRelayRoutingBackend`): en enda global miljövariabel —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Om den inte är angiven används `auto` när Bifrost är konfigurerat och aktiverat, annars `ts`.
- **Beteende:**
  - `bifrost` (framtvingat): Bifrost-fel → direkt `502`, ingen reservlösning.
  - `auto`: prova Bifrost och fall tyst tillbaka till den inbyggda lösningen vid fel/nedkylning.
  - `ts` / efter reservlösning: den inbyggda `open-sse`-pipelinekedjan för översättning/exekvering.
- **Nedkylning:** felbaserad nedkylning per `baseUrl` i `bifrostCooldown.ts`.

Valet är **allt-eller-inget på relänivå i dag** — det finns inget byte av motor per leverantör
eller per begäran i `release/v3.8.43`. Grinden per begäran läggs till
genom arbetet med sidecar-manifestet
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
vilket gör att `auto` endast kan routa manifestberättigade leverantörer genom Bifrost.

## Dashboardintegration

Tjänstedashboarden avfrågar `GET /api/services/<tool>/status` var 5:e sekund via
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
och returnerar `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Det finns ingen gemensam kontextprovider för tillgänglighet —
varje komponent anropar hooken per verktyg. Vid `!res.ok` visar hooken för närvarande endast
`HTTP <status>`; att mappa fältet `error.type` till en begriplig förklaring är en
planerad UX-förbättring, inte en kontraktsändring.

## Konsekvenser

- Nya motorer registreras en gång i `ROUTER_BACKENDS`; konsumenter får tillgång till dem via kapabilitetsfrågor
  utan nya grenar per id.
- Frågan ”Är detta en tjänst eller en routingbackend?” besvaras av fältet `lifecycle`, inte
  av vilken lista ett id råkar förekomma i.
- Bifrost-övervakningen (#5817) och den inbyggda migreringen av den prestandakritiska kodvägen (#5670) bygger vidare på detta
  gemensamma kontrakt i stället för att specialhantera varje sidecar.
