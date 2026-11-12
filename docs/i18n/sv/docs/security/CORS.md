# CORS Configuration & Security (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute styr vilken **webbläsarens ursprung** kan läsa korsvisa svar från en enda centraliserad godkännandelista. Modellen är **fail-closed som standard** : inget ursprung är tillåtet förrän du väljer en. Den här sidan dokumenterar hur godkännandelistan löser sig, vad `CORS_ALLOW_ALL=true` faktiskt avslöjar (och, viktigare, vad den gör **inte** ), hur man konfigurerar dev vs produktion säkert, och körtidsvarningen på instrumentpanelen visar när ett jokertecken är live.

**Sanningens källa:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Tillståndslistan tillämpas en gång, i middleware (`src/server/authz/pipeline.ts`) ställer — per rutthanterare inte in `Access-Control-Allow-Origin` själva.

## Hur ett ursprung löses

För varje begäran beräknar mellanvaran `Access-Control-Allow-Origin` värdet i denna ordning:

1. **`CORS_ALLOW_ALL=true`** (eller den äldre `CORS_ORIGIN=*`) → ekar anroparens `Origin` back (eller `*` när det inte finns någon `Origin` header), med `Vary: Origin` så att cacher förblir korrekta. Samma `applyCorsHeaders()` chokepoint lägger också till `Vary: Accept-Encoding` till varje 2xx-med-kroppssvar på den token-autentiserade `/v1*`/`/v1beta*` -ytan (`relaxForTokenAuth`, RFC 9110 §12.5.5, utfärda #6737), så att downstream/shared cacher kan särskilja komprimerade och okomprimerade varianter korrekt.
2. Annars normaliseras begäran `Origin` (små bokstäver, snedstreck avskalad) och matchas mot **sammanslagen godkännandelista** :
   - env **`CORS_ALLOWED_ORIGINS`** — kommaseparerad lista och
   - körtiden **`corsOrigins`** inställning (Dashboard → Security → _CORS Allowed Origins_), injicerad via `setRuntimeAllowedOrigins()` från `src/lib/config/runtimeSettings.ts`.
3. Ingen match →**ingen `Access-Control-Allow-Origin` huvud sänds ut** . Webbläsaren blockerar läsningen av korsorigin. Detta är den avsedda felstängda standarden.

| Env var                | Menande                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV av exakt ursprung för att tillåta (rekommenderas).                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → ekar vilket ursprung som helst (jokertecken). Endast utvecklare.         |
| `CORS_ORIGIN`          | Arv. `*` beter sig som `CORS_ALLOW_ALL`; ett enda värde läggs till godkännandelistan. |

## Hotmodell — vad `CORS_ALLOW_ALL=true` verkligen avslöjar

Den generiska OWASP -varningen ("wildcard CORS = vilken webbplats som helst kan kalla din API") är värd att ta på allvar, men OmniRoute:s exponering är **smalare än det generiska fallet** , på grund av ett konkret implementeringsfaktum:

> **Den centrala `applyCorsHeaders()` avger aldrig `Access-Control-Allow-Credentials`.** En webbläsare kommer inte att exponera ett _credentialed_ (cookie-bärande) korsursprungssvar om inte servern skickar `Access-Control-Allow-Credentials: true`. OmniRoute:s delade CORS väg gör det aldrig.

Vad det betyder per yta, även med `CORS_ALLOW_ALL=true`:

| Yta                                    | Auth-mekanism               | Effekt av jokertecken CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instrumentpanel / MANAGEMENT `/api/*`  | Cookie session              | Ursprung ekar, men **utan `Allow-Credentials`** webbläsaren **block** den legitimerade läsningen. En skadlig webbplats med flera ursprung **kan inte läsa** dina autentiserade svar på instrumentpanelen och sessionscookien exponeras inte.                                                                                                                                                                                                                                                                                             |
| Klient API `/v1/*`, `/v1beta/*`        | Bärare / `x-api-key` header | Redan tillåtande **genom design** (`relaxForTokenAuth`): webbläsare bifogar aldrig `Authorization`/`x-api-key` automatiskt, så en angripares sida kan inte tillhandahålla din nyckel. Det avslappnade ekot kräver ett autentiserat ämne (en validerad API nyckel eller instrumentpanelsession), inte bara en referensrubrik och inkluderar aldrig `Access-Control-Allow-Credentials`. Anonyma svar (`REQUIRE_API_KEY=false`) använder den konfigurerade ursprungsgodkännandelistan, inklusive en explicit `CORS_ALLOW_ALL=true` -opt-in. |
| Allmän skrivskyddad (`/api/health`, …) | Ingen                       | Ej känslig; jokertecken är ofarligt.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

Så den **resterande** exponeringen av `CORS_ALLOW_ALL=true` är begränsad till: (a) icke-godkänd korsursprung **läser** av redan oautentiserade data, och (b) låta CORS**preflight pass** på hanteringsrutter — som fortfarande kräver autentisering som en sida med korsorigin inte kan tillhandahålla. Det är det **inte** en session-kapning eller referensstöldvektor på den delade CORS sökvägen.

### Ett verkligt undantag — `/api/v1/agents/`

Cloud-Agent-rutterna (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ställer in sina **egen** CORS rubriker (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) och **do** avger `Access-Control-Allow-Origin: <origin>|*` tillsammans med `Access-Control-Allow-Credentials: true`. Detta är den enda ytan där ursprung-eko och referenser samexisterar, och det är det **oberoende av `CORS_ALLOW_ALL`** . Dessa rutter är förvaltningsautentiserade (`requireManagementAuth`); Operatörer som exponerar instrumentpanelen utanför värddatorn bör vara medvetna om att det här är den plats där en korsoriginalt läsning är tillåten av svarsrubriker. Att dra åt den till en explicit godkännandelista spåras separat från denna CORS vägledning.

## Produktionschecklista

- **Sätt aldrig `CORS_ALLOW_ALL=true` i produktion.** Lämna den oinställd.
- Ställ in en **explicit** ursprungslista — antingen env var eller fältet Säkerhet-fliken:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Om OmniRoute körs bakom en omvänd proxy/tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale) är CORS**inte** din enda kontroll — loopback-ruttskyddet skyddar fortfarande spawn-kapabla rutter (se [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Förfalska inte `X-Forwarded-For: 127.0.0.1` för att "fixa" en 403; som återöppnar RCE klassen stänger vägvakten.
- Bekräfta körtidstillståndet: instrumentpanelen visar en **ihållande bärnstensfärgad banderoll** under Dashboard → Security → Authorization Inventory närhelst `CORS_ALLOW_ALL=true` är live, och `/api/settings/authz-inventory` returnerar ett `cors: { allowAll, allowedOrigins }` kuvert som övervakningsverktyg kan polla.

## Utvecklingsbekvämlighet — tillåter specifika lokala ursprung

Du behöver sällan jokertecken även i dev. Tillåt bara de dev-servrar du använder:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Ursprung matchas skiftlägesokänsligt med det avslutande snedstrecket ignorerat, så `http://localhost:3000` och `http://localhost:3000/` är likvärdiga. Samma CSV kan ställas in vid körning i **Dashboard → Säkerhet → CORS Tillåtna ursprung** utan omstart.

## API -nycklar vs cookie-sessioner

- **Bärare / `x-api-key` ( `/v1/*` -inferensytan):** webbläsare bifogar aldrig dessa automatiskt. CORS är inte en meningsfull barriär här — API nyckeln är barriären — vilket är anledningen till att den ytan är avsiktligt tillåtande så att webbläsare och Electron -klienter kan läsa svar de redan har rätt till. Det avslappnade ekot kräver ett autentiserat ämne (en validerad API nyckel eller instrumentpanelsession), inte bara en referensrubrik och inkluderar aldrig `Access-Control-Allow-Credentials`. Anonyma svar (`REQUIRE_API_KEY=false`) använder den konfigurerade ursprungsgodkännandelistan, inklusive en explicit `CORS_ALLOW_ALL=true` -opt-in. Auth-avslag (401) förblir läsbara så att klienter kan visa upp en återkallad eller felskriven nyckel (#5242): pipelinens egen 401 behåller ekot, och en rutt som vägrar själva nyckeln efter att pipelinen tjänade den som anonym (`/v1/models` och `/v1beta/models` med hanteringsautentisering konfigurerad, de ägaromfattade `/v1/files`, `/v1/batches`, `/v1/media`, ZQ-, `/v1/session-leases`, ) lägger till ekot till den där 401:an via `credentialRejectionHeaders()`. Ekot nycklas på begäran med en referensrubrik (`Authorization`, `x-api-key`, `x-goog-api-key` eller `auth_token` -cookien), inte på vilken av dem rutten kontrollerade, och är aldrig ihopparad med `Access-Control-Allow-Credentials`; kroppen är ett fast felomslag. Hanteringsvägar under `/api/v1/` som skyddas av `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) använder inte detta autentiserings-avvisningundantag: med `REQUIRE_API_KEY=false` följer deras 401/403 -svar den konfigurerade CORS ursprungspolicyn.
- **Cookiesession (instrumentpanelen):** skyddas av felstängd standard **och** av frånvaron av `Access-Control-Allow-Credentials` på den delade vägen. Håll management/dashboard ursprung borta från alla tillåtande konfigurationer; de måste vara exakt stängda.

## WebSocket handslag (`/v1/responses`, `/v1/ws`)

Webbläsare tillämpar inte CORS på WebSocket, så WebSocket transporterna som returnerar slutledningsutgång kontrollerar själva handskakningen `Origin` (`src/server/origin/wsOrigin.ts`): Svaren WebSocket (`/v1/responses`) och, när OmniRoute går genom `npm start` / `npm run dev`, `/v1/ws` och `/api/v1/ws` bryggan, som strömmar `/v1/chat/completions`, `/v1/messages` och `/v1/responses`. Bron ber `/api/v1/ws?handshake=1` om domen och vägrar att uppgradera om inte den rutten körde kontrollen. Autentiseringskrav gäller fortfarande separat. Ursprungskontrollen godkänns när:

- den har ingen `Origin` header (Codex CLI, SDKs och andra klienter som inte är webbläsare);
- `Origin` godkänns av godkännandelistan ovan (`CORS_ALLOWED_ORIGINS`, `corsOrigins` inställningen, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` är ett av OmniRoute:s egna offentliga ursprung (den konfigurerade offentliga basen URL, en betrodd proxys vidarebefordrade ursprung, eller en direkt loopback/LAN värd som ges som en IP literal eller `localhost` — samma kandidater som instrumentpanelens mutationskontroll använder); eller
- den bär en giltig API nyckel, som på HTTP `/v1/*` ytan.

Allt annat får `403 ws_origin_forbidden`. En dashboard-sessionscookie undantar inte en utländsk `Origin`, eftersom webbläsaren kopplar den till en sidas socket. `localhost` på en annan port behandlas inte som samma ursprung; lägg till sådana dev-ursprung till `CORS_ALLOWED_ORIGINS`.

## Exempel: omvänd proxy framför OmniRoute

CORS upprätthålls av OmniRoute själv, så proxyn bör i allmänhet **inte** lägg till eller skriv om `Access-Control-*` rubriker (dubbla rubriker bryter webbläsare). Avsluta TLS och vidarebefordra — låt OmniRoute svara preflight:

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

Ställ in det tillåtna webbläsarursprunget i OmniRoute (`CORS_ALLOWED_ORIGINS` eller fliken Säkerhet), inte i proxyn.

## Källfiler

| Oro                                              | Fil                                                                  |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Tillåtelseupplösning + `getCorsStatus()`         | `src/server/cors/origins.ts`                                         |
| Middleware-applikation (enda källa till sanning) | `src/server/authz/pipeline.ts`                                       |
| Inställningar → runtime origin injection         | `src/lib/config/runtimeSettings.ts`                                  |
| Körtidsstatus för instrumentpanelen              | `src/app/api/settings/authz-inventory/route.ts`                      |
| Instrumentpanel varningsbanner                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins-fält                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per rutt CORS (undantaget)           | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket -handslag `Origin` -kontroll           | `src/server/origin/wsOrigin.ts`                                      |

## Se även

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback-tillämpning för spawn-kapabla rutter (en separat, kompletterande kontroll).
- [Auktoriseringsguide](../architecture/AUTHZ_GUIDE.md) — hela autentiseringspipeline.
