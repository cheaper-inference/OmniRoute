# Router Backends & Embedded Services — architecture contract (ADR) (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Būsena:** Priimta · **Kontekstas:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Sutartis:** `domain/routing/routerBackends.ts`
> (tipizuotas registras — kodas pateikiamas su [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Šiame ADR tiksliai apibrėžiama, kaip `ts` (savasis), `bifrost`, `cliproxy`, `9router` ir
su VibeProxy suderinami varikliai yra susiję tarpusavyje, kad bendraautoriai
nebepainiotų dviejų architektūriniu požiūriu skirtingų dalykų. Jame dokumentuojamas
maršruto parinkimo posistemių registro pakeitimais įdiegtas tipizuotas registras,
kuris yra vienintelis patikimas šio modelio informacijos šaltinis.

## Esminis skirtumas — dvi ortogonalios ašys

Variklio vaidmuo aprašomas pagal **dvi nepriklausomas ašis**, kurios registre
kartu užkoduotos kaip `RouterBackendDefinition`:

1. **Gyvavimo ciklas** (`RouterBackendLifecycle`) — _kaip variklis vykdomas_:
   - `in-process` — vykdomas OmniRoute Node proceso viduje (savasis TS konvejeris).
   - `supervised` — vietinis antrinis procesas, kurį OmniRoute įdiegia, paleidžia,
     sustabdo ir tikrina jo būklę per `ServiceSupervisor`, o tada naudoja kaip
     teikėjo ryšį.
   - `external` — HTTP galinis taškas, į kurį OmniRoute nukreipia užklausas, tačiau
     kurio **nevaldo** (konfigūruojamas naudojant aplinkos kintamajame nurodytą bazinį URL).
   - `disabled` — užregistruotas, bet jo negalima pasirinkti.
2. **Pasirinkimo ašis** (perdavimo maršruto parinkimo posistemė) — _ar perdavimo
   sluoksnis nukreipia užklausas į ją_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` faile
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Klaida, kurios reikia vengti: „įterptąją paslaugą“ ir „maršruto parinkimo posistemę“
laikyti vienu sąrašu. Tai nėra tas pats. `supervised` variklis (9router/cliproxy) yra
**teikėjo ryšys, kurį naudoja savasis konvejeris**, o ne alternatyvi perdavimo
užklausų nukreipimo posistemė. `bifrost` yra priešingas atvejis — perdavimo užklausų
nukreipimo posistemė, kuri (istoriškai) buvo tik `external`.

## Registras — vienintelis patikimas informacijos šaltinis

`domain/routing/routerBackends.ts` sutartyje (kodas pateikiamas su
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) kiekvienas variklis deklaruojamas vieną kartą,
nurodant jo gyvavimo ciklą, galimybes, paslaugos tapatybę, numatytąjį prievadą,
būklės tikrinimo konfigūraciją ir telemetrijos palaikymą. Naudotojai variklių ieško
naudodami `getRouterBackend(id)`, `listRouterBackends()` ir
`listRouterBackendsByCapability(cap)`, užuot kiekvienam pagalbiniam procesui taikę
atskiras specialiąsias sąlygas.

| Posistemė   | Gyvavimo ciklas | Paslauga (A ašis) | Perdavimo posistemė (B ašis) | Būklė         | Numatytasis prievadas |
| ----------- | --------------- | ----------------- | ---------------------------- | ------------- | --------------------- |
| `ts`        | `in-process`    | —                 | `ts` (savasis)               | —             | —                     |
| `bifrost`   | `external`¹     | —¹                | `bifrost` / `auto`           | `/health`     | —                     |
| `cliproxy`  | `supervised`    | `cliproxy`        | — (teikėjas)                 | `/v1/models`  | 8317                  |
| `9router`   | `supervised`    | `9router`         | — (teikėjas)                 | `/api/health` | 20130                 |
| `vibeproxy` | `external`      | —                 | — (teikėjo adapteris)        | `/v1/models`  | —                     |

¹ Bifrost perkėlimas į `supervised` įterptąją paslaugą (kurią galima įdiegti ir
paleisti iš `/api/services/bifrost/`) stebimas
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); kol šis pakeitimas nebus sujungtas,
Bifrost veikia tik kaip `external` (pasiekiamas tik per `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) leidžia
kvietėjams filtruoti pagal tai, ką variklis iš tiesų gali atlikti, užuot programos
kode įrašius atskiras sąlygines šakas kiekvienam identifikatoriui.

## A ašies — įterptosios paslaugos (prižiūrimo proceso pusė)

- **Prižiūrimų procesų registras:** `src/lib/services/bootstrap.ts` `SERVICES[]` (šiandien: `9router`, `cliproxy`).
- **Gyvenimo ciklo savininkas:** `src/lib/services/ServiceSupervisor.ts` — `start()` neršia vaiką, vartai ant `waitForHealthy()`, bakstelėja stdout/stderr į žiedo buferį; `stop()` SIGTERM→SIGKILL; viskas serializuota po užraktu.
- **Valstybės sąjunga** (`src/lib/services/types.ts`): `not_installed | stopped | starting | running | stopping | error`, plius stačiakampis `HealthState = healthy | unhealthy | unknown`.
- **Kodėl atskiras procesas (ne in-proc SDK)?** Proceso izoliacija yra tai, kas leidžia install/start/stop/health/logs valdyti nepriklausomai nuo kiekvienos šoninės priekabos ir suteikia galimybę naudoti kilpą, apsaugančią nuo atsiradimo. In-proc adapterio modeliavimas yra būsimas darbas — `native-hot-path` galimybių vėliavėlė yra ta vieta, kur tai būtų išreikšta.

### Gyvenimo ciklo maršruto sutartis (`/api/services/<tool>/…`)

Būsenos kodai yra**state/verb/path-specific pagal dizainą** — tai yra sutartis, o ne nenuoseklumas:

| Skambinti                      | Būklė                            | Būsena                               |
| ------------------------------ | -------------------------------- | ------------------------------------ |
| `POST .../start`               | servisas `not_installed`         | **409** (sąlyga)                     |
| `POST .../stop`                | jau sustojo                      | **200** (idempotentas ne-op)         |
| `GET .../status`               | OK                               | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | neršto gedimas                   | **503** (trumpalaikis)               |
| `GET .../status`, `.../stop`   | nepastebėta klaida               | **500**                              |
| `GET /api/services/<x>/logs`   | nežinomas įrankis `<x>`          | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | trūksta `X-Reveal-Confirm: yes`  | **403** (tik 9 maršrutizatorius)     |
| **bet koks** `/api/services/*` | skambina ne loopback/private-LAN | **403 LOCAL_ONLY**                   |

Visi klaidų elementai yra suformuoti pagal `createErrorResponse()` → `{ error: { message, type }, requestId }`, kur `type` gaunamas iš būsenos (`500→server_error`, `404→not_found`, `409→conflict`, else `invalid_request`) ir yra mašininiu būdu veikiamas diskriminatorius. Pranešimai yra iš anksto dezinfekuojami (`sanitizeErrorMessage()`, griežta taisyklė #12).

**Atgalinė apsauga** yra labiausiai paplitęs `403` šaltinis: `/api/services/` yra `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ir `src/server/authz/policies/management.ts` atmeta bet kokį negrįžtamąjį / ne privatų LAN skambintoją** prieš patvirtinimą** , nes šie maršrutai sukuria vaikų procesus (15 ir 17 griežtos taisyklės). Pasiekti juos viešuoju tuneliu yra `403` pagal dizainą.

## B ašis — retransliavimo maršrutizavimo posistemė (paskirstymo pusė)

Tik retransliavimo tarpinio serverio kelias `/api/v1/relay/chat/completions` pasirenka
paskirstymo posistemę; pagrindinė `/api/v1/chat/completions` sąsaja niekada nenaudoja
`routingBackend.ts`.

- **Pasirinkimas** (`resolveRelayRoutingBackend`): vienas visuotinis aplinkos perjungiklis —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Jei nenustatytas, naudojama `auto`, kai Bifrost yra sukonfigūruotas ir įjungtas, kitu atveju — `ts`.
- **Veikimas:**
  - `bifrost` (priverstinis): Bifrost triktis → griežtas `502`, be atsarginio varianto.
  - `auto`: bandoma naudoti Bifrost, o įvykus trikčiai arba galiojant laukimo laikotarpiui,
    nepastebimai pereinama prie savosios posistemės.
  - `ts` / po perėjimo prie atsarginio varianto: savasis `open-sse` transformavimo / vykdymo konvejeris.
- **Laukimo laikotarpis:** kiekvienam `baseUrl` taikomas laukimo po trikties laikotarpis,
  apibrėžtas `bifrostCooldown.ts`.

Šiuo metu pasirinkimas retransliavimo lygmeniu yra **viskas arba nieko** — `release/v3.8.43`
nėra galimybės keisti variklio pagal tiekėją ar užklausą. Užklausos lygmens valdiklis pridedamas
atliekant šalutinio proceso aprašo darbus
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) aprašas +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
todėl `auto` per Bifrost galės nukreipti tik aprašo reikalavimus atitinkančių tiekėjų užklausas.

## Integravimas į valdymo skydelį

Paslaugų valdymo skydelis kas 5 sek. siunčia užklausą `GET /api/services/<tool>/status` per
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
kuri grąžina `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Bendro pasiekiamumo konteksto teikėjo nėra —
kiekvienas komponentas iškviečia kiekvienam įrankiui skirtą „hook“. Gavus `!res.ok`, „hook“
šiuo metu pateikia tik `HTTP <status>`; `error.type` lauko susiejimas su žmogui
suprantamu paaiškinimu yra numatytas UX patobulinimas, o ne sutarties pakeitimas.

## Pasekmės

- Nauji varikliai vieną kartą užregistruojami `ROUTER_BACKENDS`; naudotojai juos gauna
  per galimybių užklausas be naujų konkrečiam ID skirtų šakų.
- Į klausimą „Ar tai paslauga, ar maršruto parinkimo posistemė?“ atsakoma pagal
  `lifecycle` lauką, o ne pagal tai, kuriame sąraše pasitaiko ID.
- „Bifrost“ priežiūra (#5817) ir savosios sparčiosios vykdymo trajektorijos perkėlimas
  (#5670) grindžiami šia bendra sutartimi, užuot kiekvieną pagalbinį procesą apdorojus
  kaip specialų atvejį.
