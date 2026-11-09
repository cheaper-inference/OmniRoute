# CORS Configuration & Security (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrollerer hvilke **nettleseropprinnelse** kan lese kryssopprinnelsessvar fra en enkelt sentralisert godkjenningsliste. Modellen er **fail-closed som standard** : ingen opprinnelse er tillatt før du melder deg på. Denne siden dokumenterer hvordan godkjenningslisten løser seg, hva `CORS_ALLOW_ALL=true` faktisk avslører (og, viktigere, hva den gjør **ikke** ), hvordan du konfigurerer dev vs produksjon på en sikker måte, og kjøretidsadvarselen dashbordet viser når et jokertegn er live.

**Kilde til sannhet:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Godkjenningslisten brukes én gang, i mellomvaren (`src/server/authz/pipeline.ts`) setter ikke — per rute-behandlere `Access-Control-Allow-Origin` selv.

## Hvordan en opprinnelse løses

For hver forespørsel beregner mellomvaren `Access-Control-Allow-Origin` verdien i denne rekkefølgen:

1. **`CORS_ALLOW_ALL=true`** (eller den eldre `CORS_ORIGIN=*`) → ekko anroperens `Origin` tilbake (eller `*` når det ikke er noen `Origin` header), med `Vary: Origin` slik at cachene forblir korrekte. Det samme `applyCorsHeaders()` chokepunktet legger også til `Vary: Accept-Encoding` til hver 2xx-med-kropp-respons på den token-autentiserte `/v1*`/`/v1beta*` overflaten (`relaxForTokenAuth`, RFC 9110 §12.5.5, utgave #6737), slik at downstream/shared cacher kan skille komprimerte og ukomprimerte varianter riktig.
2. Ellers normaliseres forespørselen `Origin` (med små bokstaver, skråstrek fjernet) og matches mot **sammenslått godkjenningsliste** :
   - env **`CORS_ALLOWED_ORIGINS`** — kommadelt liste, og
   - kjøretiden **`corsOrigins`** innstilling (Dashboard → Security → _CORS Allowed Origins_), injisert via `setRuntimeAllowedOrigins()` fra `src/lib/config/runtimeSettings.ts`.
3. Ingen match →**ingen `Access-Control-Allow-Origin` header sendes ut** . Nettleseren blokkerer kryssopprinnelseslesingen. Dette er den tiltenkte feillukkede standarden.

| Env var                | Betydning                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV av eksakt opprinnelse for å tillate (anbefalt).                                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → ekko enhver opprinnelse (jokertegn). Kun utvikler.                            |
| `CORS_ORIGIN`          | Arv. `*` oppfører seg som `CORS_ALLOW_ALL`; en enkelt verdi legges til godkjenningslisten. |

## Trusselmodell — hva `CORS_ALLOW_ALL=true` virkelig avslører

Den generiske OWASP advarselen ("wildcard CORS = ethvert nettsted kan kalle din API") er verdt å ta på alvor, men OmniRoute eksponering er **smalere enn det generiske tilfellet** , på grunn av ett konkret implementeringsfakta:

> **Den sentrale `applyCorsHeaders()` avgir aldri `Access-Control-Allow-Credentials`.** En nettleser vil ikke avsløre et _credentialed_ (cookie-bærende) kryssopprinnelsessvar med mindre serveren sender `Access-Control-Allow-Credentials: true`. OmniRoute delte CORS bane gjør det aldri.

Hva det betyr per overflate, selv med `CORS_ALLOW_ALL=true`:

| Flate                                        | Auth-mekanisme             | Effekt av jokertegn CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`              | Cookie-økt                 | Opprinnelse er ekko, men **uten `Allow-Credentials`** nettleseren **blokker** den legitimerte lesningen. Et ondsinnet nettsted med kryssopprinnelse **kan ikke lese** dine autentiserte dashbordsvar, og øktinformasjonskapselen blir ikke eksponert.                                                                                                                                                                                                                                                                           |
| Klient API `/v1/*`, `/v1beta/*`              | Bærer / `x-api-key` header | Allerede tillatt **etter design** (`relaxForTokenAuth`): nettlesere legger aldri automatisk ved `Authorization`/`x-api-key`, så en angripers side kan ikke oppgi nøkkelen din. Det avslappede ekkoet krever et autentisert emne (en validert API nøkkel eller dashbordøkt), ikke bare en legitimasjonsoverskrift, og inkluderer aldri `Access-Control-Allow-Credentials`. Anonyme svar (`REQUIRE_API_KEY=false`) bruker den konfigurerte opprinnelsesgodkjenningslisten, inkludert en eksplisitt `CORS_ALLOW_ALL=true` -opt-in. |
| Offentlig skrivebeskyttet (`/api/health`, …) | Ingen                      | Ikke-sensitiv; jokertegn er ufarlig.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Så den **gjenværende** eksponering av `CORS_ALLOW_ALL=true` er begrenset til: (a) ikke-godkjent kryssopprinnelse **leser** av allerede uautentiserte data, og (b) la CORS**preflight pass** på administrasjonsruter — som fortsatt krever godkjenning som en side med kryssopprinnelse ikke kan gi. Det er det **ikke** en øktkapring eller legitimasjonstyveri-vektor på den delte CORS banen.

### Et ekte unntak — `/api/v1/agents/`

Cloud-Agent-rutene (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) setter sine **egen** CORS overskrifter (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) og **gjøre** sender ut `Access-Control-Allow-Origin: <origin>|*` sammen med `Access-Control-Allow-Credentials: true`. Dette er den eneste overflaten der opprinnelsesekko og legitimasjon eksisterer side om side, og det er det **uavhengig av `CORS_ALLOW_ALL`** . Disse rutene er administrasjonsautentisert (`requireManagementAuth`); operatører som avslører dashbordet utenfor verten, bør være klar over at dette er det eneste stedet en kryssopprinnelseslegitimasjonslesing tillates av svarhodene. Å stramme den til en eksplisitt godkjenningsliste spores separat fra denne CORS veiledningen.

## Sjekkliste for produksjon

- **Sett aldri `CORS_ALLOW_ALL=true` i produksjon.** La den være uaktivert.
- Sett en **eksplisitt** opprinnelsesliste — enten env var eller Sikkerhet-fanen:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Hvis OmniRoute kjører bak en omvendt proxy / tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale), er CORS**ikke** din eneste kontroll — loopback-rutevakten beskytter fortsatt spawn-kompatible ruter (se [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Ikke forfal `X-Forwarded-For: 127.0.0.1` for å "fikse" en 403; som gjenåpner RCE klassen, stenger rutevakten.
- Bekreft kjøretidstilstanden: dashbordet viser en **vedvarende gult banner** under Dashboard → Security → Authorization Inventory når `CORS_ALLOW_ALL=true` er live, og `/api/settings/authz-inventory` returnerer en `cors: { allowAll, allowedOrigins }` konvolutt som overvåkingsverktøy kan polle.

## Utviklingskomfort — tillater spesifikk lokal opprinnelse

Du trenger sjelden jokertegnet selv i dev. Tillat bare utviklerserverne du bruker:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Opprinnelse matches ufølsomt for store og små bokstaver med den etterfølgende skråstreken ignorert, så `http://localhost:3000` og `http://localhost:3000/` er likeverdige. Den samme CSV kan stilles inn under kjøretid **Dashboard → Sikkerhet → CORS Tillatte opprinnelser** uten omstart.

## API -nøkler vs informasjonskapseløkter

- **Bærer / `x-api-key` (de `/v1/*` slutningsoverflate):** nettlesere legger aldri til disse automatisk. CORS er ikke en meningsfull barriere her — de API nøkkelen er barrieren — som er grunnen til at overflaten er med vilje tillatt så nettleser og Electron klienter kan lese svar de allerede har krav på. Det avslappede ekkoet krever et autentisert emne (en validert API nøkkel- eller dashbordøkt), ikke bare en påloggingsoverskrift, og inkluderer aldri `Access-Control-Allow-Credentials`. Anonyme svar (`REQUIRE_API_KEY=false`) bruk den konfigurerte godkjenningslisten for opprinnelse, inkludert en eksplisitt `CORS_ALLOW_ALL=true` melde deg på. Godkjenningsavvisninger (401) forblir lesbare slik at klienter kan vise en tilbakekalt eller feilskrevet nøkkel (#5242): rørledningens egen 401 holder ekkoet, og en rute som nekter selve nøkkelen etter at rørledningen tjente den som anonym (`/v1/models` og `/v1beta/models` med administrasjonsautorisasjon konfigurert, eieromfanget `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` og auto-combo kandidatruter) legger til ekkoet til den 401 via `credentialRejectionHeaders()`. Ekkoet tastes inn på forespørselen med en legitimasjonsoverskrift (`Authorization`, `x-api-key`, `x-goog-api-key` eller den `auth_token` informasjonskapsel), ikke på hvilken av dem ruten sjekket, og er aldri sammenkoblet med `Access-Control-Allow-Credentials`; kroppen er en fast feilkonvolutt. Forvaltningsruter under `/api/v1/` bevoktet av `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ikke bruk dette unntaket for avvisning av legitimasjon: med `REQUIRE_API_KEY=false`, deres 401/403 svarene følger de konfigurerte CORS opprinnelsespolitikk.
- **Cookie-økt (dashbordet):** beskyttet av fail-closed standard **og** ved fravær av `Access-Control-Allow-Credentials` på den delte banen. Hold management/dashboard opprinnelse unna enhver tillatende konfigurasjon; de må forbli nøyaktig feillukket.

## WebSocket -håndtrykk (`/v1/responses`, `/v1/ws`)

Nettlesere bruker ikke CORS til WebSocket, så WebSocket transportene som returnerer inferensutgang sjekker selve håndtrykket `Origin` (`src/server/origin/wsOrigin.ts`): Svarene WebSocket (`/v1/responses`) og, når OmniRoute går gjennom `npm start` / `npm run dev`, `/v1/ws` og `/api/v1/ws` broen, som streamer `/v1/chat/completions`, `/v1/messages` og `/v1/responses` som rammer. Broen ber `/api/v1/ws?handshake=1` om dommen og nekter å oppgradere med mindre den ruten kjørte sjekken. Krav til autentisering gjelder fortsatt separat. Opprinnelseskontrollen består når:

- den har ingen `Origin` header (Codex CLI, SDKs og andre ikke-nettleserklienter);
- `Origin` er godkjent av tillatelseslisten ovenfor (`CORS_ALLOWED_ORIGINS`, `corsOrigins` -innstillingen, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` er en av OmniRoute egne offentlige opprinnelser (den konfigurerte offentlige basen URL, en pålitelig proxys videresendte opprinnelse, eller en direkte loopback/LAN vert gitt som en IP literal eller `localhost` — de samme kandidatene som mutasjonssjekken på dashbordet bruker); eller
- den har en gyldig API nøkkel, som på HTTP `/v1/*` overflaten.

Alt annet får `403 ws_origin_forbidden`. En dashboard-sesjonsinformasjonskapsel fritar ikke en utenlandsk `Origin`, fordi nettleseren kobler den til en hvilken som helst sides socket. `localhost` på en annen port behandles ikke som samme opprinnelse; legg til slike dev-opprinnelser til `CORS_ALLOWED_ORIGINS`.

## Eksempel: omvendt proxy foran OmniRoute

CORS håndheves av OmniRoute selv, så proxyen bør vanligvis **ikke** legg til eller omskriv `Access-Control-*` overskrifter (doble overskrifter bryter nettlesere). Avslutt TLS og videresend — la OmniRoute svare på forhåndskontroll:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Angi tillatt nettleseropprinnelse i OmniRoute (`CORS_ALLOWED_ORIGINS` eller kategorien Sikkerhet), ikke i proxyen.

## Kildefiler

| Bekymring                                        | Fil                                                                  |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Tillatelseslisteoppløsning + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| Mellomvareapplikasjon (enkelt kilde til sannhet) | `src/server/authz/pipeline.ts`                                       |
| Innstillinger → runtime origin injection         | `src/lib/config/runtimeSettings.ts`                                  |
| Kjøretidsstatus for dashbordet                   | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard advarselsbanner                        | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins-feltet                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per rute CORS (unntaket)             | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket -håndtrykk `Origin` sjekk              | `src/server/origin/wsOrigin.ts`                                      |

## Se også

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback-håndhevelse for spawn-kompatible ruter (en separat, komplementær kontroll).
- [Autorisasjonsveiledning](../architecture/AUTHZ_GUIDE.md) — hele auth-pipeline.
