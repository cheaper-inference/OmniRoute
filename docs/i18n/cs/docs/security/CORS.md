# CORS Configuration & Security (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute řídí které **původ prohlížeče** může číst odpovědi napříč původem z jediného centralizovaného seznamu povolených. Model je **ve výchozím nastavení zavřené** : žádný původ není povolen, dokud se nepřihlásíte. Tato stránka dokumentuje, jak seznam povolených řeší, co `CORS_ALLOW_ALL=true` skutečně odhaluje (a co je důležité, co dělá **ne** ), jak bezpečně nakonfigurovat dev vs production, a upozornění za běhu, které řídicí panel zobrazuje, když je zástupný znak aktivní.

**Zdroj pravdy:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Seznam povolených se použije jednou, v middlewaru (`src/server/authz/pipeline.ts`) — per-route handlery nenastavují `Access-Control-Allow-Origin` sami.

## Jak se řeší původ

Pro každý požadavek middleware vypočítá hodnotu `Access-Control-Allow-Origin` v tomto pořadí:

1. **`CORS_ALLOW_ALL=true`** (nebo starší `CORS_ORIGIN=*`) → odráží zpět `Origin` volajícího (nebo `*`, když není hlavička `Origin` ), se `Vary: Origin`, takže mezipaměti zůstávají správné. Stejný chokepoint `applyCorsHeaders()` také připojuje `Vary: Accept-Encoding` ke každé odpovědi 2xx-with-body na povrchu `/v1*`/`/v1beta*` ověřeném tokenem (`relaxForTokenAuth`, RFC 9110 §12.5.5, vydání #6737), takže mezipaměti downstream/shared mohou správně rozlišovat komprimované a nekomprimované varianty.
2. V opačném případě je požadavek `Origin` normalizován (malá písmena, koncové lomítko odstraněno) a porovnáno s **sloučený seznam povolených** :
   - env **`CORS_ALLOWED_ORIGINS`** — seznam oddělený čárkami a
   - běhový čas **`corsOrigins`** nastavení (Dashboard → Security → _CORS Allowed Origins_), vstřikované přes `setRuntimeAllowedOrigins()` ze `src/lib/config/runtimeSettings.ts`.
3. Žádný zápas →**není vysílána hlavička `Access-Control-Allow-Origin`** . Prohlížeč blokuje čtení z různých zdrojů. Toto je zamýšlená výchozí hodnota pro zavření při selhání.

| Env var                | Význam                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV přesného původu umožnit (doporučeno).                                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → odráží jakýkoli původ (zástupný znak). Pouze pro vývojáře.                       |
| `CORS_ORIGIN`          | Dědictví. `*` se chová jako `CORS_ALLOW_ALL`; do seznamu povolených je přidána jedna hodnota. |

## Model hrozby — to, co `CORS_ALLOW_ALL=true` skutečně odhaluje

Obecné varování OWASP („zástupný znak CORS = jakýkoli web může volat vaše API“) stojí za to brát vážně, ale vystavení OmniRoute je **užší než obecný případ** , kvůli jedné konkrétní realizační skutečnosti:

> **Centrální `applyCorsHeaders()` nikdy nevyzařuje `Access-Control-Allow-Credentials`.** Prohlížeč nevystaví _credentialed_ (soubory cookie) odpověď mezi původem, pokud server neodešle `Access-Control-Allow-Credentials: true`. Sdílená cesta CORS OmniRoute nikdy nedělá.

Co to znamená pro každý povrch, dokonce i se `CORS_ALLOW_ALL=true`:

| Povrch                                     | Mechanismus autorizace       | Účinek zástupného znaku CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Palubní deska / MANAGEMENT `/api/*`        | Relace cookie                | Ozývá se původ, ale **bez `Allow-Credentials`** prohlížeče **bloky** ověřené čtení. Škodlivý web z různých zdrojů **neumí číst** vaše ověřené odpovědi řídicího panelu a soubor cookie relace nebude vystaven.                                                                                                                                                                                                                                                                                           |
| Klient API `/v1/*`, `/v1beta/*`            | Nosič / hlavička `x-api-key` | Již povolné **podle návrhu** (`relaxForTokenAuth`): prohlížeče nikdy automaticky nepřipojují `Authorization`/`x-api-key`, takže stránka útočníka nemůže poskytnout váš klíč. Uvolněné echo vyžaduje ověřený subjekt (ověřený klíč API nebo relaci řídicího panelu), nejen záhlaví pověření, a nikdy neobsahuje `Access-Control-Allow-Credentials`. Anonymní odpovědi (`REQUIRE_API_KEY=false`) používají nakonfigurovaný seznam povolených zdrojů, včetně explicitního přihlášení `CORS_ALLOW_ALL=true`. |
| Veřejné pouze pro čtení (`/api/health`, …) | Žádný                        | Necitlivé; zástupný znak je neškodný.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

Takže **reziduální** expozice `CORS_ALLOW_ALL=true` je omezena na: (a) nekreditovaný křížový původ **čte** již neověřených dat a (b) ponechání CORS**předletový průkaz** na trasách správy —, které stále vyžadují ověření, které stránka s více zdroji nemůže poskytnout. To je **ne** vektor únosu relace nebo krádeže pověření na sdílené cestě CORS.

### Jedna skutečná výjimka — `/api/v1/agents/`

Cesty Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) nastavují své **vlastní** CORS hlavičky (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) a **dělat** emitují `Access-Control-Allow-Origin: <origin>|*` společně s `Access-Control-Allow-Credentials: true`. Toto je jediný povrch, kde koexistují ozvěna původu a pověření, a také je **nezávislé na `CORS_ALLOW_ALL`** . Tyto cesty jsou ověřeny managementem (`requireManagementAuth`); Operátoři, kteří odhalují řídicí panel mimo hostitele, by si měli být vědomi toho, že toto je jediné místo, kde je povoleno v hlavičkách odpovědí pověřené čtení z různých zdrojů. Jeho utažení na explicitní seznam povolených se sleduje odděleně od tohoto návodu CORS.

## Kontrolní seznam výroby

- **Nikdy nenastavujte `CORS_ALLOW_ALL=true` ve výrobě.** Nechte jej nenastavený.
- Nastavit **explicitní** seznam původu — buď pole env var nebo pole na kartě Zabezpečení:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Pokud OmniRoute běží za reverzním proxy / tunelem (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS je **ne** vaše jediné ovládání — ochrana zpětné smyčky, stále chrání cesty schopné rozmnožování (viz [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Nefalšujte `X-Forwarded-For: 127.0.0.1`, abyste „opravili“ 403; že se znovu otevře třída RCE strážce trasy se zavře.
- Potvrďte stav běhového prostředí: na řídicím panelu se zobrazí a **perzistentní jantarový prapor** pod řídicím panelem → Security → Authorization Inventory, kdykoli je `CORS_ALLOW_ALL=true` aktivní, a `/api/settings/authz-inventory` vrátí nástroj pro monitorování obálky `cors: { allowAll, allowedOrigins }`, který mohou provádět dotazování.

## Pohodlí při vývoji — umožňuje specifický místní původ

Zástupný znak potřebujete jen zřídka, dokonce i ve vývoji. Povolte pouze servery pro vývojáře, které používáte:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Počátky jsou porovnávány bez ohledu na velikost písmen, přičemž koncové lomítko je ignorováno, takže `http://localhost:3000` a `http://localhost:3000/` jsou ekvivalentní. Stejné CSV lze nastavit za běhu v **Dashboard → Security → CORS Povolené zdroje** bez restartu.

## Klíče API vs relace souborů cookie

- **Nosič / `x-api-key` (odvozovací plocha `/v1/*` ):** prohlížeče je nikdy nepřipojují automaticky. CORS zde není smysluplná bariéra — klíč API je bariéra —, proto je tento povrch záměrně povolen, takže klienti prohlížeče a Electron mohou číst odpovědi, na které již mají nárok. Uvolněné echo vyžaduje ověřený subjekt (ověřený klíč API nebo relaci řídicího panelu), nejen záhlaví pověření, a nikdy neobsahuje `Access-Control-Allow-Credentials`. Anonymní odpovědi (`REQUIRE_API_KEY=false`) používají nakonfigurovaný seznam povolených zdrojů, včetně explicitního přihlášení `CORS_ALLOW_ALL=true`. Odmítnutí ověření (401) zůstává čitelné, takže klienti mohou zobrazit odvolaný nebo chybně zadaný klíč (#5242): vlastní kanál 401 zachovává ozvěnu a cesta, která samotný klíč odmítne poté, co jí kanál posloužil jako anonymní (`/v1/models` a `/v1beta/models` s konfigurovaným ověřením správy, směrovaný `/v1/files`, `/v1/batches` v rozsahu vlastníka a kandidát `/v1/session-leases` `/v1/media` přidá auto echo do toho 401 přes `credentialRejectionHeaders()`. Odezva je klíčována na požadavek nesoucí hlavičku pověření (`Authorization`, `x-api-key`, `x-goog-api-key` nebo cookie `auth_token` ), nikoli na tom, na kterém z nich byla cesta zkontrolována, a nikdy není spárována se `Access-Control-Allow-Credentials`; tělo je obálka s pevnou chybou. Cesty správy pod `/api/v1/` střežené `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) tuto výjimku odmítnutí pověření nepoužívají: u `REQUIRE_API_KEY=false` se jejich odpovědi 401/403 řídí nakonfigurovanou zásadou původu CORS.
- **Relace cookie (hlavní panel):** chráněno výchozím nastavením při selhání **a** nepřítomností `Access-Control-Allow-Credentials` na sdílené cestě. Udržujte původy management/dashboard mimo jakoukoli povolenou konfiguraci; musí zůstat přesně zavřené.

## WebSocket handshake (`/v1/responses`, `/v1/ws`)

Prohlížeče neaplikují CORS na WebSocket, takže přenosy WebSocket, které vracejí odvozený výstup, kontrolují samy handshake `Origin` (`src/server/origin/wsOrigin.ts`): odpovědi WebSocket (`/v1/responses`) a když OmniRoute prochází přes `npm start` / `npm run dev`, most `/v1/ws` a `/api/v1/ws`, který streamuje snímky `/v1/chat/completions`, `/v1/messages` a `/v1/responses`. Most žádá `/api/v1/ws?handshake=1` o verdikt a odmítá upgrade, pokud tato trasa neproběhla kontrolou. Požadavky na autentizaci stále platí samostatně. Kontrola původu projde, když:

- nemá hlavičku `Origin` (Codex CLI, SDKs a další klienti mimo prohlížeč);
- `Origin` je povoleno výše uvedeným seznamem povolených (`CORS_ALLOWED_ORIGINS`, nastavení `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` je jedním z vlastních veřejných zdrojů OmniRoute(konfigurovaná veřejná základna URL, předávaný původ důvěryhodného proxy nebo přímý hostitel loopback/LAN daný jako literál IP nebo `localhost` — stejní kandidáti, jaké používá kontrola mutace na řídicím panelu); nebo
- nese platný klíč API, jako na povrchu HTTP `/v1/*`.

Cokoli jiného dostane `403 ws_origin_forbidden`. Soubor cookie relace řídicího panelu nevyjímá cizí `Origin`, protože jej prohlížeč připojí k soketu libovolné stránky. `localhost` na jiném portu se nepovažuje za stejný původ; přidat takový původ vývoje do `CORS_ALLOWED_ORIGINS`.

## Příklad: reverzní proxy před OmniRoute

CORS je vynucován samotným OmniRoute, takže proxy by obecně měl **ne** přidat nebo přepsat záhlaví `Access-Control-*` (dvojitá záhlaví rozbijí prohlížeče). Ukončete TLS a předejte —, nechte OmniRoute odpovědět na předletovou kontrolu:

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

Nastavte povolený původ prohlížeče v OmniRoute (`CORS_ALLOWED_ORIGINS` nebo karta Zabezpečení), nikoli v proxy.

## Zdrojové soubory

| Znepokojení                                      | Soubor                                                               |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Rozlišení seznamu povolených + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware aplikace (jediný zdroj pravdy)        | `src/server/authz/pipeline.ts`                                       |
| Nastavení → runtime origin injection             | `src/lib/config/runtimeSettings.ts`                                  |
| Stav běhu řídicího panelu                        | `src/app/api/settings/authz-inventory/route.ts`                      |
| Panel varování                                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Pole CORS Povolený původ                         | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent na trase CORS (výjimka)              | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handshake `Origin` kontrola            | `src/server/origin/wsOrigin.ts`                                      |

## Viz také

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) Vynucení zpětné smyčky — pro trasy schopné rozmnožování (samostatná, doplňková kontrola).
- [Autorizační průvodce](../architecture/AUTHZ_GUIDE.md) — úplný kanál ověřování.
