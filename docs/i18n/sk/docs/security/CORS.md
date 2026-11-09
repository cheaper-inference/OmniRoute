# CORS Configuration & Security (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ovláda ktoré **pôvod prehliadača** môže čítať krížové odpovede z jedného centralizovaného zoznamu povolených. Model je **predvolene zatvorené pri poruche** : žiadny pôvod nie je povolený, kým sa neprihlásite. Táto stránka dokumentuje, ako sa rieši zoznam povolených, čo `CORS_ALLOW_ALL=true` skutočne odhaľuje (a čo je dôležité, čo robí **nie** ), ako bezpečne nakonfigurovať dev vs production a varovanie za behu, ktoré sa zobrazí na paneli, keď je aktívny zástupný znak.

**Zdroj pravdy:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Zoznam povolených sa použije raz, v middlevéri (`src/server/authz/pipeline.ts`) — per-route handlery nenastavujú `Access-Control-Allow-Origin` sami.

## Ako sa rieši pôvod

Pre každú požiadavku middleware vypočíta hodnotu `Access-Control-Allow-Origin` v tomto poradí:

1. **`CORS_ALLOW_ALL=true`** (alebo staršie `CORS_ORIGIN=*`) → odzrkadľuje `Origin` volajúceho späť (alebo `*`, keď neexistuje hlavička `Origin` ), so `Vary: Origin`, takže vyrovnávacie pamäte zostávajú správne. Rovnaký škrtiaci bod `applyCorsHeaders()` tiež pripojí `Vary: Accept-Encoding` ku každej odpovedi 2xx-with-body na povrchu `/v1*`/`/v1beta*` overenom tokenom (`relaxForTokenAuth`, RFC 9110 §12.5.5, vydanie #6737), takže vyrovnávacie pamäte downstream/shared dokážu správne rozlíšiť komprimované a nekomprimované varianty.
2. V opačnom prípade sa požiadavka `Origin` normalizuje (malé písmená, koncová lomka sa odstráni) a porovná sa s **zlúčený zoznam povolených** :
   - env **`CORS_ALLOWED_ORIGINS`** — zoznam oddelený čiarkami a
   - čas spustenia **`corsOrigins`** nastavenie (Dashboard → Security → _CORS Allowed Origins_), vstrekované cez `setRuntimeAllowedOrigins()` od `src/lib/config/runtimeSettings.ts`.
3. Žiadny zápas →**nevysiela sa hlavička `Access-Control-Allow-Origin`** . Prehliadač blokuje čítanie krížového pôvodu. Toto je zamýšľaná predvolená hodnota so zatvorením zlyhania.

| Env var                | Význam                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Povoliť CSV presného pôvodu (odporúča sa).                                                   |
| `CORS_ALLOW_ALL`       | `true`/`1` → odráža akýkoľvek pôvod (zástupný znak). Iba pre vývojárov.                      |
| `CORS_ORIGIN`          | Dedičstvo. `*` sa správa ako `CORS_ALLOW_ALL`; do zoznamu povolených sa pridá jedna hodnota. |

## Model ohrozenia — to, čo `CORS_ALLOW_ALL=true` skutočne odhaľuje

Všeobecné varovanie OWASP („zástupná karta CORS = môže každá stránka volať vaše API“) sa oplatí brať vážne, ale vystavenie OmniRoute je **užší ako všeobecný prípad** z dôvodu jednej konkrétnej implementačnej skutočnosti:

> **Centrálna `applyCorsHeaders()` nikdy nevyžaruje `Access-Control-Allow-Credentials`.** Prehliadač nevystaví _credentialed_ (súborom cookie) odpoveď krížového pôvodu, pokiaľ server nepošle `Access-Control-Allow-Credentials: true`. Zdieľaná cesta CORS OmniRoute nikdy nerobí.

Čo to znamená pre každý povrch, dokonca aj so `CORS_ALLOW_ALL=true`:

| Povrch                                    | Mechanizmus autorizácie      | Účinok zástupného znaku CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prístrojová doska / MANAGEMENT `/api/*`   | Relácia cookies              | Pôvod sa ozýva, ale **bez `Allow-Credentials`** prehliadač **bloky** overené čítanie. Škodlivá stránka s viacerými pôvodmi **nevie čítať** vaše overené odpovede ovládacieho panela a súbor cookie relácie nebude odhalený.                                                                                                                                                                                                                                                                          |
| Klient API `/v1/*`, `/v1beta/*`           | Nosič / hlavička `x-api-key` | Už povoľný **podľa návrhu** (`relaxForTokenAuth`): prehliadače nikdy automaticky nepripájajú `Authorization`/`x-api-key`, takže stránka útočníka nemôže poskytnúť váš kľúč. Uvoľnená odozva vyžaduje overený subjekt (overený kľúč API alebo reláciu dashboardu), nielen hlavičku poverení, a nikdy nezahŕňa `Access-Control-Allow-Credentials`. Anonymné odpovede (`REQUIRE_API_KEY=false`) používajú nakonfigurovaný zoznam povolených zdrojov vrátane explicitného súhlasu `CORS_ALLOW_ALL=true`. |
| Verejné iba na čítanie (`/api/health`, …) | žiadne                       | Necitlivé; zástupný znak je neškodný.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

Takže **zvyškový** vystavenie `CORS_ALLOW_ALL=true` je obmedzené na: (a) nekreditovaný krížový pôvod **číta** už neoverených údajov a (b) prenechanie CORS**predletový preukaz** na riadiacich cestách —, ktoré stále vyžadujú overenie, ktoré stránka s krížovým pôvodom nemôže poskytnúť. je to tak **nie** vektor únosu relácie alebo krádeže poverení na zdieľanej ceste CORS.

### Jedna skutočná výnimka — `/api/v1/agents/`

Cesty Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) nastavujú svoje **vlastné** CORS hlavičky (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) a **robiť** emitujú `Access-Control-Allow-Origin: <origin>|*` spolu so `Access-Control-Allow-Credentials: true`. Toto je jediný povrch, kde koexistujú pôvodná odozva a poverenia, a to je **nezávislé od `CORS_ALLOW_ALL`** . Tieto cesty sú overené manažmentom (`requireManagementAuth`); Operátori, ktorí odhaľujú dashboard mimo hostiteľa, by si mali byť vedomí toho, že toto je jediné miesto, kde je povolené čítanie s krížovým pôvodom v hlavičkách odpovede. Jeho utiahnutie do explicitného zoznamu povolených sa sleduje oddelene od tohto usmernenia CORS.

## Kontrolný zoznam výroby

- **Nikdy nenastavujte `CORS_ALLOW_ALL=true` vo výrobe.** Nechajte ho nenastavené.
- Nastaviť **explicitné** zoznam pôvodu — buď pole env var alebo pole na karte Zabezpečenie:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ak OmniRoute beží za reverzným proxy / tunelom (nginx, Caddy, Cloudflare tunel, Tailscale), CORS je **nie** vaša jediná kontrola — chránič trasy so spätnou slučkou stále chráni trasy schopné spúšťania (pozri [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Nefalšujte `X-Forwarded-For: 127.0.0.1` na "opravu" 403; čím sa znovu otvorí trieda RCE strážnik sa zatvorí.
- Potvrďte stav runtime: na ovládacom paneli sa zobrazí a **perzistentný jantárový banner** pod Dashboard → Security → Autorizačný inventár vždy, keď je `CORS_ALLOW_ALL=true` v prevádzke, a `/api/settings/authz-inventory` vráti nástroj na monitorovanie obálok `cors: { allowAll, allowedOrigins }`, ktorý môžu získať.

## Pohodlie vývoja — umožňuje špecifický miestny pôvod

Zriedkavo potrebujete zástupný znak aj vo vývoji. Povoľte iba servery pre vývojárov, ktoré používate:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Počiatky sa priraďujú bez ohľadu na veľkosť písmen a ignoruje sa koncová lomka, takže `http://localhost:3000` a `http://localhost:3000/` sú ekvivalentné. Rovnaké CSV je možné nastaviť za behu v **Dashboard → Security → CORS Povolené pôvody** bez reštartu.

## Kľúče API verzus relácie súborov cookie

- **Nosič / `x-api-key` (inferenčný povrch `/v1/*` ):** prehliadače ich nikdy nepripájajú automaticky. CORS tu nie je zmysluplná bariéra — kľúč API je bariéra —, a preto je tento povrch zámerne povolený, takže klienti prehliadača a Electron môžu čítať odpovede, na ktoré už majú nárok. Uvoľnená odozva vyžaduje overený subjekt (overený kľúč API alebo reláciu dashboardu), nielen hlavičku poverení, a nikdy nezahŕňa `Access-Control-Allow-Credentials`. Anonymné odpovede (`REQUIRE_API_KEY=false`) používajú nakonfigurovaný zoznam povolených zdrojov vrátane explicitného súhlasu `CORS_ALLOW_ALL=true`. Odmietnutia autorizácie (401) zostávajú čitateľné, takže klienti môžu zobraziť odvolaný alebo chybne zadaný kľúč (#5242): vlastný kanál 401 uchováva odozvu a trasa, ktorá odmietne samotný kľúč po tom, čo kanál poslúži ako anonymný (`/v1/models` a `/v1beta/models` s nakonfigurovaným overením správy, smerovanie v rozsahu vlastníka `/v1/files`, `/v1/batches` `/v1/media`) autocom `/v1/session-leases` pridá sa echo do toho 401 cez `credentialRejectionHeaders()`. Odozva je kľúčovaná na požiadavku nesúcu hlavičku poverenia (`Authorization`, `x-api-key`, `x-goog-api-key` alebo cookie `auth_token` ), nie na tom, na ktorej z nich bola trasa kontrolovaná, a nikdy sa nespáruje so `Access-Control-Allow-Credentials`; telo je obálka s pevnou chybou. Riadiace cesty pod `/api/v1/` strážené `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) nepoužívajú túto výnimku odmietnutia poverenia: pri `REQUIRE_API_KEY=false` sa ich odpovede 401/403 riadia nakonfigurovanou politikou pôvodu CORS.
- **Relácia súboru cookie (hlavný panel):** chránené predvolenou chybou zatvorenia **a** absenciou `Access-Control-Allow-Credentials` na zdieľanej ceste. Udržujte pôvod management/dashboard mimo akejkoľvek povolenej konfigurácie; musia zostať presne zatvorené.

## WebSocket handshake (`/v1/responses`, `/v1/ws`)

Prehliadače neaplikujú CORS na WebSocket, takže prenosy WebSocket, ktoré vracajú odvodený výstup, kontrolujú samotné handshake `Origin` (`src/server/origin/wsOrigin.ts`): odpovede WebSocket (`/v1/responses`) a keď OmniRoute prechádza cez `npm start` / `npm run dev`, most `/v1/ws` a `/api/v1/ws`, ktorý streamuje snímky `/v1/chat/completions`, `/v1/messages` a `/v1/responses`. Most žiada `/api/v1/ws?handshake=1` o verdikt a odmietne aktualizovať, pokiaľ táto trasa neprebehla kontrolou. Požiadavky na autentizáciu stále platia samostatne. Kontrola pôvodu prebehne, keď:

- nemá hlavičku `Origin` (Codex CLI, SDKs a iní klienti mimo prehliadača);
- `Origin` je povolená vyššie uvedeným zoznamom povolených (`CORS_ALLOWED_ORIGINS`, nastavenie `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` je jedným z vlastných verejných zdrojov OmniRoute(konfigurovaná verejná základňa URL, preposielaný pôvod dôveryhodného proxy alebo priamy hostiteľ loopback/LAN daný ako literál IP alebo `localhost` — rovnakých kandidátov, ktorých používa kontrola mutácie na dashboarde); alebo
- nesie platný kľúč API, ako na povrchu HTTP `/v1/*`.

Čokoľvek iné dostane `403 ws_origin_forbidden`. Súbor cookie relácie dashboardu neoslobodzuje cudzí `Origin`, pretože ho prehliadač pripojí k soketu ľubovoľnej stránky. `localhost` na inom porte sa nepovažuje za rovnaký pôvod; pridajte takýto pôvod pre vývojárov do `CORS_ALLOWED_ORIGINS`.

## Príklad: reverzný proxy pred OmniRoute

CORS je presadzovaný samotným OmniRoute, takže proxy by vo všeobecnosti mal **nie** pridať alebo prepísať hlavičky `Access-Control-*` (dvojité hlavičky prerušia prehliadače). Ukončite TLS a pošlite ďalej — nechajte OmniRoute odpovedať na predletovú kontrolu:

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

Nastavte povolený pôvod prehliadača v OmniRoute (`CORS_ALLOWED_ORIGINS` alebo karta Zabezpečenie), nie v serveri proxy.

## Zdrojové súbory

| Obavy                                             | Súbor                                                                |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Rozlíšenie zoznamu povolených + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Aplikácia Middleware (jediný zdroj pravdy)        | `src/server/authz/pipeline.ts`                                       |
| Nastavenia Vloženie pôvodu runtime →              | `src/lib/config/runtimeSettings.ts`                                  |
| Stav spustenia pre dashboard                      | `src/app/api/settings/authz-inventory/route.ts`                      |
| Výstražný banner na palubnej doske                | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Pole povoleného pôvodu CORS                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent na trase CORS (výnimka)               | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handshake Kontrola `Origin`             | `src/server/origin/wsOrigin.ts`                                      |

## Pozri tiež

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) Vynútenie spätnej väzby — pre trasy schopné spúšťania (samostatná, doplnková kontrola).
- [Autorizačná príručka](../architecture/AUTHZ_GUIDE.md) — úplná autorizácia.
