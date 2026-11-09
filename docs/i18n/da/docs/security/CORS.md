# CORS Configuration & Security (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrollerer hvilke **browser oprindelse** kan læse svar på tværs af oprindelse fra en enkelt centraliseret tilladelsesliste. Modellen er **fail-closed som standard** : ingen oprindelse er tilladt, før du tilmelder dig en. Denne side dokumenterer, hvordan tilladelseslisten løser sig, hvad `CORS_ALLOW_ALL=true` rent faktisk afslører (og, vigtigst af alt, hvad den gør **ikke** ), hvordan man konfigurerer dev vs produktion sikkert, og kørselstidsadvarslen på dashboardet viser, når et jokertegn er live.

**Sandhedens kilde:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Tilladelseslisten anvendes én gang, i middleware (`src/server/authz/pipeline.ts`) indstiller — per-rute-handlere ikke `Access-Control-Allow-Origin` selv.

## Hvordan en oprindelse løses

For hver anmodning beregner middlewaren `Access-Control-Allow-Origin` værdien i denne rækkefølge:

1. **`CORS_ALLOW_ALL=true`** (eller den gamle `CORS_ORIGIN=*`) → ekko opkalderens `Origin` tilbage (eller `*` når der ikke er nogen `Origin` header), med `Vary: Origin` så caches forbliver korrekte. Det samme `applyCorsHeaders()` chokepoint tilføjer også `Vary: Accept-Encoding` til hver 2xx-med-krops-respons på den token-autentificerede `/v1*`/`/v1beta*` overflade (`relaxForTokenAuth`, RFC 9110 §12.5.5, udstede #6737), så downstream/shared caches korrekt kan skelne mellem komprimerede og ukomprimerede varianter.
2. Ellers normaliseres anmodningen `Origin` (med små bogstaver, skråstreg fjernet) og matches mod **sammenlagt tilladelsesliste** :
   - env **`CORS_ALLOWED_ORIGINS`** — kommasepareret liste, og
   - køretiden **`corsOrigins`** indstilling (Dashboard → Security → _CORS Allowed Origins_), injiceret via `setRuntimeAllowedOrigins()` fra `src/lib/config/runtimeSettings.ts`.
3. Ingen match →**ingen `Access-Control-Allow-Origin` header udsendes** . Browseren blokerer læsningen på tværs af oprindelse. Dette er den tilsigtede fail-closede standard.

| Env var                | Mening                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV af nøjagtig oprindelse for at tillade (anbefales).                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → ekko enhver oprindelse (wildcard). Kun udvikler.                              |
| `CORS_ORIGIN`          | Arv. `*` opfører sig som `CORS_ALLOW_ALL`; en enkelt værdi tilføjes til tilladelseslisten. |

## Trusselsmodel — hvad `CORS_ALLOW_ALL=true` virkelig afslører

Den generiske OWASP advarsel ("wildcard CORS = ethvert websted kan kalde din API") er værd at tage alvorligt, men OmniRoute's eksponering er **smallere end det generiske tilfælde** , på grund af et konkret implementeringsfaktum:

> **Den centrale `applyCorsHeaders()` udsender aldrig `Access-Control-Allow-Credentials`.** En browser vil ikke afsløre et _credentialed_ (cookie-bærende) krydsoprindelsessvar, medmindre serveren sender `Access-Control-Allow-Credentials: true`. OmniRoute delte CORS sti gør det aldrig.

Hvad det betyder pr. overflade, selv med `CORS_ALLOW_ALL=true`:

| Overflade                                    | Auth mekanisme             | Effekt af jokertegn CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`              | Cookie session             | Oprindelse er gentaget, men **uden `Allow-Credentials`** browseren **blokke** den legitimerede læsning. Et ondsindet websted med krydsoprindelse **ikke kan læse** dine autentificerede dashboard-svar, og sessionscookien bliver ikke afsløret.                                                                                                                                                                                                                                                                                  |
| Kunde API `/v1/*`, `/v1beta/*`               | Bærer / `x-api-key` header | Allerede eftergivende **ved design** (`relaxForTokenAuth`): browsere vedhæfter aldrig automatisk `Authorization`/`x-api-key`, så en angribers side kan ikke levere din nøgle. Det afslappede ekko kræver et autentificeret emne (en valideret API nøgle eller dashboard-session), ikke kun en legitimationsoverskrift og inkluderer aldrig `Access-Control-Allow-Credentials`. Anonyme svar (`REQUIRE_API_KEY=false`) bruger den konfigurerede oprindelsestilladelsesliste, inklusive en eksplicit `CORS_ALLOW_ALL=true` -opt-in. |
| Offentlig skrivebeskyttet (`/api/health`, …) | Ingen                      | Ikke-følsomme; jokertegn er harmløst.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Så den **resterende** eksponering af `CORS_ALLOW_ALL=true` er begrænset til: (a) ikke-godkendt krydsoprindelse **læser** af allerede uautentificerede data, og (b) lade CORS**preflight pass** på administrationsruter —, som stadig kræver godkendelse, som en side med krydsoprindelse ikke kan levere. Det er det **ikke** en session-hijack- eller credential-theft-vektor på den delte CORS sti.

### En ægte undtagelse — `/api/v1/agents/`

Cloud-Agent-ruterne (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) sætter deres **egen** CORS overskrifter (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) og **gør** udsender `Access-Control-Allow-Origin: <origin>|*` sammen med `Access-Control-Allow-Credentials: true`. Dette er den enkelte overflade, hvor oprindelses-ekko og legitimationsoplysninger sameksisterer, og det er det **uafhængig af `CORS_ALLOW_ALL`** . Disse ruter er ledelsesgodkendte (`requireManagementAuth`); operatører, der afslører dashboardet uden for værten, skal være opmærksomme på, at dette er det ene sted, hvor en cross-origin legitimationslæsning er tilladt af svaroverskrifterne. Stramning af den til en eksplicit tilladelsesliste spores separat fra denne CORS vejledning.

## Produktionstjekliste

- **Sæt aldrig `CORS_ALLOW_ALL=true` i produktion.** Lad den være ude af drift.
- Indstil en **eksplicit** oprindelsesliste — enten env var eller feltet Security-faneblad:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Hvis OmniRoute kører bag en omvendt proxy / tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale), er CORS**ikke** din eneste kontrol —, loopback-rutevagten beskytter stadig spawn-kompatible ruter (se [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Forfals ikke `X-Forwarded-For: 127.0.0.1` for at "fikse" en 403; der genåbner RCE klassen, lukker rutevagten.
- Bekræft køretidstilstanden: dashboardet viser en **vedvarende ravfarvet banner** under Dashboard → Security → Authorization Inventory, når `CORS_ALLOW_ALL=true` er live, og `/api/settings/authz-inventory` returnerer en `cors: { allowAll, allowedOrigins }` konvolut, overvågningsværktøjer kan polle.

## Udviklings bekvemmelighed — tillader specifik lokal oprindelse

Du har sjældent brug for jokertegn, selv i dev. Tillad kun de udviklerservere, du bruger:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Oprindelse matches uafhængigt af store og små bogstaver med den efterfølgende skråstreg ignoreret, så `http://localhost:3000` og `http://localhost:3000/` er ækvivalente. Den samme CSV kan indstilles ved runtime i **Dashboard → Sikkerhed → CORS Tilladte oprindelser** uden genstart.

## API nøgler vs cookie-sessioner

- **Bærer / `x-api-key` ( `/v1/*` -inferensoverfladen):** browsere vedhæfter aldrig disse automatisk. CORS er ikke en meningsfuld barriere her — API nøglen er barrieren — hvilket er grunden til, at overfladen er bevidst tolerant, så browser- og Electron klienter kan læse svar, de allerede har ret til. Det afslappede ekko kræver et autentificeret emne (en valideret API -nøgle eller dashboard-session), ikke kun en legitimationsoverskrift og inkluderer aldrig `Access-Control-Allow-Credentials`. Anonyme svar (`REQUIRE_API_KEY=false`) bruger den konfigurerede oprindelsestilladelsesliste, inklusive en eksplicit `CORS_ALLOW_ALL=true` -opt-in. Godkendelsesafvisninger (401) forbliver læsbare, så klienter kan se en tilbagekaldt eller forkert indtastet nøgle (#5242): pipelinens egen 401 beholder ekkoet, og en rute, der nægter selve nøglen, efter at pipelinen tjente den som anonym (`/v1/models` og `/v1beta/models` med konfigureret administrationsgodkendelse, ejerbestemte `/v1/files`, `/v1/batches`, ZQ-, `/v1/media`, ZQ-, `/v1/session-leases`, )-ruter. tilføjer ekkoet til den 401 via `credentialRejectionHeaders()`. Ekkoet indtastes på anmodningen med en legitimationsoverskrift (`Authorization`, `x-api-key`, `x-goog-api-key` eller `auth_token` cookien), ikke på hvilken af dem ruten tjekkede, og er aldrig parret med `Access-Control-Allow-Credentials`; kroppen er en fast fejlkonvolut. Administrationsruter under `/api/v1/` bevogtet af `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) bruger ikke denne legitimationsafvisning-undtagelse: med `REQUIRE_API_KEY=false` følger deres 401/403 -svar den konfigurerede CORS oprindelsespolitik.
- **Cookiesession (dashboardet):** beskyttet af fail-closed standard **og** ved fraværet af `Access-Control-Allow-Credentials` på den fælles vej. Hold management/dashboard oprindelse ude af enhver tilladelig konfiguration; de skal forblive nøjagtigt lukkede.

## WebSocket håndtryk (`/v1/responses`, `/v1/ws`)

Browsere anvender ikke CORS til WebSocket, så WebSocket transporterne, der returnerer inferensoutput, kontrollerer selv håndtrykket `Origin` (`src/server/origin/wsOrigin.ts`): Svarene WebSocket (`/v1/responses`) og, når OmniRoute løber gennem `npm start` / `npm run dev`, `/v1/ws` og `/api/v1/ws` broen, som streamer `/v1/chat/completions`, `/v1/messages` og `/v1/responses`. Broen beder `/api/v1/ws?handshake=1` om dommen og nægter at opgradere, medmindre den rute kørte kontrollen. Godkendelseskrav gælder stadig separat. Oprindelseskontrollen består, når:

- den har ingen `Origin` header (Codex CLI, SDKs og andre ikke-browserklienter);
- `Origin` er godkendt af tilladelseslisten ovenfor (`CORS_ALLOWED_ORIGINS`, `corsOrigins` indstillingen, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` er en af OmniRoute's egne offentlige oprindelser (den konfigurerede offentlige base URL, en betroet proxy's videresendte oprindelse eller en direkte loopback/LAN -vært givet som en IP literal eller `localhost` — de samme kandidater, som dashboardmutationskontrollen bruger); eller
- den bærer en gyldig API nøgle, som på HTTP `/v1/*` overfladen.

Alt andet får `403 ws_origin_forbidden`. En dashboard-sessionscookie fritager ikke en udenlandsk `Origin`, fordi browseren vedhæfter den til enhver sides socket. `localhost` på en anden port behandles ikke som samme oprindelse; tilføje sådanne dev-oprindelser til `CORS_ALLOWED_ORIGINS`.

## Eksempel: omvendt proxy foran OmniRoute

CORS håndhæves af OmniRoute selv, så proxyen bør generelt **ikke** tilføje eller omskrive `Access-Control-*` headere (dobbelte overskrifter bryder browsere). Afslut TLS og fremad — lad OmniRoute besvare preflight:

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

Indstil den tilladte browseroprindelse i OmniRoute (`CORS_ALLOWED_ORIGINS` eller fanen Sikkerhed), ikke i proxyen.

## Kildefiler

| Bekymring                                         | Fil                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Tilladelseslisteopløsning + `getCorsStatus()`     | `src/server/cors/origins.ts`                                         |
| Middleware-applikation (enkelt kilde til sandhed) | `src/server/authz/pipeline.ts`                                       |
| Indstillinger → runtime origin injection          | `src/lib/config/runtimeSettings.ts`                                  |
| Kørselsstatus for dashboardet                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard advarselsbanner                         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Feltet CORS Tilladte oprindelser                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-agent CORS per rute (undtagelsen)           | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket -håndtryk `Origin` tjek                 | `src/server/origin/wsOrigin.ts`                                      |

## Se også

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback håndhævelse for spawn-kompatible ruter (en separat, komplementær kontrol).
- [Autorisationsvejledning](../architecture/AUTHZ_GUIDE.md) — den fulde godkendelsespipeline.
