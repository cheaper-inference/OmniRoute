# CORS Configuration & Security (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute nadzoruje, kateri **izvor brskalnika** lahko bere odgovore različnih izvorov z enega centraliziranega seznama dovoljenih. Model je **privzeto zaprto** : noben izvor ni dovoljen, dokler ga ne izberete. Ta stran dokumentira, kako razrešuje seznam dovoljenih, kaj `CORS_ALLOW_ALL=true` dejansko izpostavlja (in, kar je pomembno, kaj počne **ne** ), kako varno konfigurirati razvijalce v primerjavi s proizvodnjo, in opozorilo med izvajanjem, ki ga nadzorna plošča prikaže, ko je nadomestni znak v živo.

**Vir resnice:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Seznam dovoljenih se uporabi enkrat, v vmesni programski opremi (`src/server/authz/pipeline.ts`) — obdelovalci na pot sami ne nastavijo `Access-Control-Allow-Origin`.

## Kako se razreši izvor

Za vsako zahtevo vmesna programska oprema izračuna vrednost `Access-Control-Allow-Origin` v tem vrstnem redu:

1. **`CORS_ALLOW_ALL=true`** (ali podedovani `CORS_ORIGIN=*`) → odmeva klicateljev `Origin` nazaj (ali `*`, če ni glave `Origin` ), z `Vary: Origin`, tako da predpomnilniki ostanejo pravilni. Ista dušilna točka `applyCorsHeaders()` prav tako doda `Vary: Accept-Encoding` vsakemu odzivu 2xx-with-body na površini `/v1*`/`/v1beta*`, ki je overjena z žetonom (`relaxForTokenAuth`, RFC 9110 §12.5.5, izdaja #6737), tako da lahko predpomnilniki downstream/shared pravilno ločijo stisnjene in nestisnjene različice.
2. V nasprotnem primeru je zahteva `Origin` normalizirana (napisana z malimi črkami, odstranjena končna poševnica) in primerjana z **združen seznam dovoljenih** :
   - okolj **`CORS_ALLOWED_ORIGINS`** — seznam, ločen z vejico, in
   - čas izvajanja **`corsOrigins`** nastavitev (Dashboard → Varnost → _CORS Allowed Origins_), vbrizgana prek `setRuntimeAllowedOrigins()` iz `src/lib/config/runtimeSettings.ts`.
3. Ni ujemanja →**glava `Access-Control-Allow-Origin` ni oddana** . Brskalnik blokira navzkrižno branje. To je predvidena privzeta vrednost za zaprtje ob napaki.

| Env var                | Pomen                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV točnega izvora, ki ga je treba dovoliti (priporočeno).                                  |
| `CORS_ALLOW_ALL`       | `true`/`1` → odmev katerega koli izvora (nadomestni znak). Samo razvijalci.                 |
| `CORS_ORIGIN`          | Zapuščina. `*` se obnaša kot `CORS_ALLOW_ALL`; ena vrednost je dodana na seznam dovoljenih. |

## Model groženj —, kaj `CORS_ALLOW_ALL=true` v resnici izpostavlja

Splošno opozorilo OWASP ("nadomestni znak CORS = lahko vsako spletno mesto kliče vaš API") je vredno jemati resno, vendar je izpostavljenost OmniRoute**ožji od splošnega primera** , zaradi enega konkretnega izvedbenega dejstva:

> **Centralni `applyCorsHeaders()` nikoli ne oddaja `Access-Control-Allow-Credentials`.** Brskalnik ne bo izpostavil _credentialed_ (s piškotki) odgovora navzkrižnega izvora, razen če strežnik pošlje `Access-Control-Allow-Credentials: true`. Skupna pot CORS OmniRoute nikoli ne.

Kaj to pomeni na površino, tudi z `CORS_ALLOW_ALL=true`:

| Površina                                | Avtoristični mehanizem      | Učinek nadomestnega znaka CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Armaturna plošča / MANAGEMENT `/api/*`  | Seja piškotkov              | Izvor je odmeven, vendar **brez `Allow-Credentials`** brskalnik **bloki** pooblaščenec bere. Zlonamerno navzkrižno spletno mesto **ne more brati** vaši preverjeni odgovori nadzorne plošče in sejni piškotek ni izpostavljen.                                                                                                                                                                                                                                                                                          |
| Stranka API `/v1/*`, `/v1beta/*`        | Nosilec / glava `x-api-key` | Že permisivno **po zasnovi** (`relaxForTokenAuth`): brskalniki nikoli samodejno ne pripnejo `Authorization`/`x-api-key`, zato stran napadalca ne more posredovati vašega ključa. Sproščen odmev zahteva preverjen subjekt (preverjen ključ API ali sejo nadzorne plošče), ne le glavo poverilnice, in nikoli ne vključuje `Access-Control-Allow-Credentials`. Anonimni odgovori (`REQUIRE_API_KEY=false`) uporabljajo konfiguriran izvorni seznam dovoljenih, vključno z eksplicitno odobritvijo `CORS_ALLOW_ALL=true`. |
| Javno samo za branje (`/api/health`, …) | Noben                       | neobčutljivo; nadomestni znak je neškodljiv.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Torej **ostanek** izpostavljenost `CORS_ALLOW_ALL=true` je omejena na: (a) navzkrižni izvor brez poverilnic **bere** že nepreverjenih podatkov in (b) prepuščanje CORS**predpoletna karta** na upravljalnih poteh —, ki še vedno zahtevajo avtorizacijo, ki je navzkrižna izvorna stran ne more zagotoviti. Je **ne** vektor ugrabitve seje ali kraje poverilnic na skupni poti CORS.

### Ena prava izjema — `/api/v1/agents/`

Poti Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) nastavijo svoje **lasten** CORS glave (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) in **narediti** oddajajo `Access-Control-Allow-Origin: <origin>|*` skupaj z `Access-Control-Allow-Credentials: true`. To je edina površina, kjer soobstajajo izvorni odmev in poverilnice, in tudi je **neodvisno od `CORS_ALLOW_ALL`** . Te poti so potrjene z upravljanjem (`requireManagementAuth`); Operaterji, ki razkrijejo nadzorno ploščo zunaj gostitelja, se morajo zavedati, da je to edino mesto, kjer glave odgovorov dovoljujejo branje s poverilnicami navzkrižnega izvora. Zaostritev na eksplicitni seznam dovoljenih se spremlja ločeno od teh smernic CORS.

## Kontrolni seznam proizvodnje

- **`CORS_ALLOW_ALL=true` nikoli ne nastavite v produkcijo.** Pustite nenastavljeno.
- Nastavite an **eksplicitno** izvorni seznam — bodisi env var ali polje zavihka Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Če OmniRoute deluje za obratnim proxyjem/tunelom (nginx, Caddy, Cloudflare Tunnel, Tailscale), je CORS**ne** vaš edini nadzor — varovalo povratne poti še vedno ščiti poti, ki so zmožne drstiti (glejte [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Ne ponarejajte `X-Forwarded-For: 127.0.0.1`, da "popravite" 403; ki ponovno odpre razred RCE, ki ga varovalo poti zapre.
- Potrdite stanje izvajalnega časa: nadzorna plošča prikazuje a **obstojna jantarna zastava** pod Dashboard Varnost → → Authorization Inventory, ko je `CORS_ALLOW_ALL=true` v živo, `/api/settings/authz-inventory` pa vrne `cors: { allowAll, allowedOrigins }` ovojnico, ki jo lahko anketirajo orodja za spremljanje.

## Priročnost razvoja — omogoča specifično lokalno poreklo

Nadomestni znak redko potrebujete celo v dev. Dovoli samo strežnikom razvijalcev, ki jih uporabljaš:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Izvori se ujemajo brez upoštevanja velikih in malih črk, poševnica na koncu pa se ne upošteva, zato sta `http://localhost:3000` in `http://localhost:3000/` enakovredna. Isti CSV lahko nastavite med izvajanjem v **Nadzorna plošča → Varnost → CORS Dovoljeni izvori** brez ponovnega zagona.

## Ključi API proti sejam piškotkov

- **Nosilec / `x-api-key` (sklepna površina `/v1/*` ):** brskalniki jih nikoli ne pripnejo samodejno. CORS tukaj ni pomembna ovira — ključ API je ovira —, zato je ta površina namenoma permisivna, tako da lahko brskalnik in odjemalci Electron berejo odgovore, do katerih so že upravičeni. Sproščen odmev zahteva preverjeno zadevo (preverjen ključ API ali sejo nadzorne plošče), ne le glavo poverilnice, in nikoli ne vključuje `Access-Control-Allow-Credentials`. Anonimni odgovori (`REQUIRE_API_KEY=false`) uporabljajo konfiguriran izvorni seznam dovoljenih, vključno z eksplicitno odobritvijo `CORS_ALLOW_ALL=true`. Zavrnitve avtifikacije (401) ostanejo berljive, tako da lahko odjemalci prikažejo preklican ali napačno vpisan ključ (#5242): lastni 401 cevovoda ohranja odmev in pot, ki sama zavrne ključ, potem ko ga je cevovod serviral kot anonimnega (`/v1/models` in `/v1beta/models` s konfiguriranim preverjanjem upravljanja, `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` in kandidat za samodejno kombiniranje z lastniškim obsegom poti) doda odmev temu 401 prek `credentialRejectionHeaders()`. Odmev je vpisan na zahtevo, ki nosi glavo poverilnice (`Authorization`, `x-api-key`, `x-goog-api-key` ali piškotek `auth_token` ), ne na tem, na katerem od njih je pot preverila, in ni nikoli seznanjen z `Access-Control-Allow-Credentials`; telo je popravljena ovojnica napake. Poti upravljanja pod `/api/v1/` ki jih varuje `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`), ne uporabljajo te izjeme za zavrnitev poverilnic: z `REQUIRE_API_KEY=false` njihovi odgovori 401/403 sledijo konfiguriranemu izvornemu pravilniku CORS.
- **Seja piškotkov (nadzorna plošča):** zaščiten s privzetim zaprtjem ob napaki **in** zaradi odsotnosti `Access-Control-Allow-Credentials` na skupni poti. Izvore management/dashboard ne vključite v morebitne permisivne konfiguracije; ostati morajo natančno zaprti.

## Rokovanje WebSocket (`/v1/responses`, `/v1/ws`)

Brskalniki ne uporabljajo CORS za WebSocket, tako da transporti WebSocket, ki vrnejo sklepanje, sami preverijo rokovanje `Origin` (`src/server/origin/wsOrigin.ts`): odzive WebSocket (`/v1/responses`) in, ko OmniRoute teče skozi `npm start` / `npm run dev`, most `/v1/ws` in `/api/v1/ws`, ki pretaka `/v1/chat/completions`, `/v1/messages` in `/v1/responses` kot okvirje. Most prosi `/api/v1/ws?handshake=1` za razsodbo in noče nadgraditi, razen če je ta pot opravila preverjanje. Zahteve za preverjanje pristnosti še vedno veljajo ločeno. Preverjanje porekla je uspešno, ko:

- nima glave `Origin` (Codex CLI, SDKs in drugi odjemalci brez brskalnika);
- `Origin` je dovoljen na zgornjem seznamu dovoljenih (`CORS_ALLOWED_ORIGINS`, nastavitev `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` je eden od lastnih javnih izvorov OmniRoute(konfigurirana javna baza URL, posredovani izvor zaupanja vrednega proxyja ali neposredni gostitelj loopback/LAN ki je podan kot literal IP ali `localhost` — isti kandidati, ki jih uporablja preverjanje mutacije na nadzorni plošči); oz
- nosi veljaven ključ API, kot na površini HTTP `/v1/*`.

Karkoli drugega dobi `403 ws_origin_forbidden`. Piškotek seje nadzorne plošče ne izvzame tujega `Origin`, ker ga brskalnik pripne v vtičnico katere koli strani. `localhost` na drugih vratih se ne obravnava kot istega izvora; dodajte takšne izvore razvijalcev v `CORS_ALLOWED_ORIGINS`.

## Primer: obratni proxy pred OmniRoute

CORS uveljavlja sam OmniRoute, zato bi ga na splošno moral posrednik **ne** dodajte ali prepišite glave `Access-Control-*` (dvojne glave pokvarijo brskalnike). Prekini TLS in posreduj — naj OmniRoute odgovori pred tiskom:

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

Nastavite dovoljene izvore brskalnika v OmniRoute (`CORS_ALLOWED_ORIGINS` ali zavihek Varnost), ne v strežniku proxy.

## Izvorne datoteke

| Zaskrbljenost                                            | Datoteka                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| Ločljivost seznama dovoljenih + `getCorsStatus()`        | `src/server/cors/origins.ts`                                         |
| Aplikacija vmesne programske opreme (en sam vir resnice) | `src/server/authz/pipeline.ts`                                       |
| Nastavitve → runtime origin injection                    | `src/lib/config/runtimeSettings.ts`                                  |
| Stanje izvajalnega časa za nadzorno ploščo               | `src/app/api/settings/authz-inventory/route.ts`                      |
| Opozorilna pasica na armaturni plošči                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Dovoljeno polje izvora CORS                              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent na pot CORS (izjema)                         | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket rokovanje `Origin` preverjanje                 | `src/server/origin/wsOrigin.ts`                                      |

## Glej tudi

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — uveljavljanje povratne zanke za poti, ki omogočajo drstenje (ločen, dopolnilni nadzor).
- [Avtorizacijski vodnik](../architecture/AUTHZ_GUIDE.md) — cevovod za popolno avtorizacijo.
