# CORS Configuration & Security (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute inadhibiti ambayo **asili ya kivinjari** inaweza kusoma majibu ya asili tofauti kutoka kwa orodha moja ya kibali ya kati. Mfano ni **kushindwa-imefungwa kwa chaguo-msingi** : asili hairuhusiwi hadi uchague kuingia. Ukurasa huu unaandika jinsi orodha ya wanaoruhusiwa itasuluhisha, ni nini `CORS_ALLOW_ALL=true` inafichua (na, muhimu zaidi, inachofanya.**sivyo** ), jinsi ya kusanidi uzalishaji dhidi ya dev kwa usalama, na onyo la wakati wa utekelezaji dashibodi huonyesha kadi-mwitu inapopatikana.

**Chanzo cha ukweli:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Orodha ya wanaoruhusiwa inatumika mara moja, kwenye kifaa cha kati (`src/server/authz/pipeline.ts`) Vidhibiti vya — kwa kila njia haviweki `Access-Control-Allow-Origin` wenyewe.

## Jinsi asili inavyotatuliwa

Kwa kila ombi kifaa cha kati kinajumuisha thamani ya `Access-Control-Allow-Origin` kwa mpangilio huu:

1. **`CORS_ALLOW_ALL=true`** (au urithi `CORS_ORIGIN=*`) → inarudia `Origin` ya mpigaji nyuma (au `*` wakati hakuna kichwa cha `Origin` ), na `Vary: Origin` ili kache zisalie sawa. Chokepoint hiyo hiyo `applyCorsHeaders()` pia inaambatanisha `Vary: Accept-Encoding` kwa kila jibu la 2xx-na-mwili kwenye uso ulioidhinishwa `/v1*`/`/v1beta*` (`relaxForTokenAuth`, RFC 9110 §12.5.5, toleo la #6737), ili kache za downstream/shared ziweze kutofautisha kwa usahihi vibadala vilivyobanwa na visivyobanwa.
2. Vinginevyo, ombi la `Origin` linasawazishwa (kwenye sura ya chini, kufyeka nyuma kukatwa) na kuendana na **orodha ya ruhusa iliyounganishwa** :
   - env **`CORS_ALLOWED_ORIGINS`** — orodha iliyotenganishwa kwa koma, na
   - wakati wa kukimbia **`corsOrigins`** mpangilio (Dashibodi → Usalama → _CORS Chimbuko Zinazoruhusiwa_), hudungwa kupitia `setRuntimeAllowedOrigins()` kutoka `src/lib/config/runtimeSettings.ts`.
3. Hakuna inayolingana na →**hakuna kichwa cha `Access-Control-Allow-Origin` kinachotolewa** . Kivinjari huzuia usomaji wa asili tofauti. Hii ndio chaguo-msingi iliyokusudiwa ya kutofaulu.

| Env var                | Maana                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ya asili halisi ya kuruhusu (inapendekezwa).                                                   |
| `CORS_ALLOW_ALL`       | `true`/`1` → echo asili yoyote (kadi ya mwitu). Dev pekee.                                         |
| `CORS_ORIGIN`          | Urithi. `*` inatenda kama `CORS_ALLOW_ALL`; thamani moja huongezwa kwenye orodha ya wanaoruhusiwa. |

## Tishio mfano — nini `CORS_ALLOW_ALL=true` kweli kufichua

Onyo la kawaida la OWASP ("wildcard CORS = tovuti yoyote inaweza kuita API yako ") inafaa kuchukuliwa kwa uzito, lakini mfiduo wa OmniRoute ni **nyembamba kuliko kesi ya kawaida** , kwa sababu ya ukweli mmoja wa utekelezaji:

> **`applyCorsHeaders()` ya kati haitoi `Access-Control-Allow-Credentials` kamwe.** Kivinjari hakitafichua _credentialed_ (inayobeba kuki) majibu ya asili mtambuka isipokuwa seva itume `Access-Control-Allow-Credentials: true`. Njia CORS OmniRoute haifanyi kamwe.

Hiyo inamaanisha nini kwa kila uso, hata na `CORS_ALLOW_ALL=true`:

| Uso                                        | Utaratibu wa uthibitishaji     | Madhara ya wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashibodi / MANAGEMENT `/api/*`            | Kipindi cha kuki               | Asili ni aliunga, lakini **bila `Allow-Credentials`** kivinjari **vitalu** waliosoma wenye sifa. Tovuti hasidi yenye asili tofauti **hawezi kusoma** majibu yako ya dashibodi yaliyothibitishwa, na kidakuzi cha kipindi hakijafichuliwa.                                                                                                                                                                                                                                                                                                                                 |
| Mteja API `/v1/*`, `/v1beta/*`             | Mbeba / kichwa cha `x-api-key` | Tayari inaruhusiwa **kwa kubuni** (`relaxForTokenAuth`): vivinjari kamwe haambatishi kiotomatiki `Authorization`/`x-api-key`, kwa hivyo ukurasa wa mshambulizi hauwezi kutoa ufunguo wako. Mwangwi uliolegezwa unahitaji somo lililothibitishwa (kitufe cha API kilichoidhinishwa au kikao cha dashibodi), si tu kichwa cha kitambulisho, na kamwe hakijumuishi `Access-Control-Allow-Credentials`. Majibu yasiyojulikana (`REQUIRE_API_KEY=false`) hutumia orodha ya viruhusu asili iliyosanidiwa, ikijumuisha chaguo dhahiri la kuchagua kuingia `CORS_ALLOW_ALL=true`. |
| Inasomwa kwa umma pekee (`/api/health`, …) | Hakuna                         | Sio nyeti; wildcard haina madhara.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

Kwa hivyo **mabaki** mfiduo wa `CORS_ALLOW_ALL=true` ni mdogo kwa: (a) asili mtambuka isiyo na sifa **inasoma** ya data ambayo tayari haijathibitishwa, na (b) kuruhusu CORS**kupita kabla ya ndege** kwenye njia za usimamizi — ambazo bado zinahitaji uthibitisho ambao ukurasa wa asili tofauti hauwezi kutoa. Ni **sivyo** kikao-nyara au vekta ya wizi wa kitambulisho kwenye njia ya pamoja CORS.

### Isipokuwa moja ya kweli — `/api/v1/agents/`

Njia za Wakala wa Wingu (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) zimeweka zao **mwenyewe** Vichwa vya CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) na **fanya** toa `Access-Control-Allow-Origin: <origin>|*` pamoja na `Access-Control-Allow-Credentials: true`. Huu ndio uso mmoja ambapo asili-echo na sifa huishi pamoja, na ndivyo ilivyo **kujitegemea `CORS_ALLOW_ALL`** . Njia hizi zimethibitishwa na usimamizi (`requireManagementAuth`); waendeshaji wanaofichua dashibodi isiyokuwa ya seva pangishi wanapaswa kufahamu kuwa hapa ni sehemu moja ambapo cheti cha asili-mwingi kinasomwa panaruhusiwa na vichwa vya majibu. Kuikaza kwa orodha ya wazi ya ruhusa kunafuatiliwa kando na mwongozo huu CORS.

## Orodha ya ukaguzi wa uzalishaji

- **Kamwe usiweke `CORS_ALLOW_ALL=true` katika uzalishaji.** Iache bila kuwekwa.
- Weka **wazi** orodha ya asili — ama env var au uga wa kichupo cha Usalama:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ikiwa OmniRoute inaendesha nyuma ya proksi / handaki ya kinyume (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS iko **sivyo** udhibiti wako pekee — mlinzi wa njia ya kurudi nyuma bado hulinda njia zinazoweza kuzaa (angalia [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Usighushi `X-Forwarded-For: 127.0.0.1` ili "kurekebisha" 403; ambayo hufungua tena darasa la RCE mlinzi wa njia hufunga.
- Thibitisha hali ya wakati wa utekelezaji: dashibodi inaonyesha a **bendera ya kaharabu inayoendelea** chini ya Dashibodi → Usalama Malipo ya Uidhinishaji wa → wakati wowote `CORS_ALLOW_ALL=true` inapatikana, na `/api/settings/authz-inventory` hurejesha zana za ufuatiliaji za bahasha `cors: { allowAll, allowedOrigins }` zinaweza kupiga kura.

## Urahisi wa maendeleo — huruhusu asili mahususi za ndani

Huhitaji kadi-mwitu hata kwenye dev. Ruhusu seva za dev tu unazotumia:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Asili hulinganishwa kwa ukubwa na mfgo unaofuata ukipuuzwa, kwa hivyo `http://localhost:3000` na `http://localhost:3000/` ni sawa. CSV hiyo hiyo inaweza kuwekwa wakati wa kukimbia **Dashibodi → Usalama → CORS Asili Zinazoruhusiwa** bila kuanza upya.

## Vifunguo vya API dhidi ya vipindi vya vidakuzi

- **Mbebaji / `x-api-key` (uso wa uelekezaji `/v1/*` ):** vivinjari kamwe haziambatanishi hizi kiotomatiki. CORS sio kizuizi cha maana hapa — ufunguo wa API ndio kizuizi — ndio maana uso huo unaruhusu kwa makusudi ili kivinjari na wateja wa Electron wasome majibu ambayo tayari wanayo haki. Mwangwi uliolegezwa unahitaji somo lililothibitishwa (kitufe cha API kilichoidhinishwa au kikao cha dashibodi), si tu kichwa cha kitambulisho, na kamwe hakijumuishi `Access-Control-Allow-Credentials`. Majibu yasiyojulikana (`REQUIRE_API_KEY=false`) hutumia orodha ya viruhusu asili iliyosanidiwa, ikijumuisha chaguo dhahiri la kuchagua kuingia `CORS_ALLOW_ALL=true`. Kukataliwa kwa uthibitisho (401) kusalia kusomeka ili wateja waweze kuwasilisha kitufe kilichobatilishwa au kuchapwa vibaya (#5242): 401 ya bomba yenyewe huweka mwangwi, na njia inayokataa ufunguo yenyewe baada ya bomba kuutumia kama kutokujulikana (`/v1/models` na `/v1beta/models` na uthibitisho wa usimamizi umesanidiwa, njia ya `/v1/files`, `/v1/batches` iliyo na upeo wa mmiliki, `/v1/media` na `/v1/session-leases` otomatiki). inaongeza mwangwi kwa hiyo 401 kupitia `credentialRejectionHeaders()`. Mwangwi umewekwa kwenye ombi linalobeba kichwa cha sifa (`Authorization`, `x-api-key`, `x-goog-api-key` au kidakuzi cha `auth_token` ), sio ni ipi kati yao njia iliyoangaliwa, na haioanishwi kamwe na `Access-Control-Allow-Credentials`; mwili ni bahasha ya makosa ya kudumu. Njia za usimamizi chini ya `/api/v1/` zinalindwa na `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) hazitumii ubaguzi huu wa kukataliwa kwa sifa: pamoja na `REQUIRE_API_KEY=false`, majibu yao ya 401/403 yanafuata sera ya asili CORS iliyosanidiwa.
- **Kipindi cha kuki (dashibodi):** imelindwa na chaguo-msingi iliyofungwa **na** kwa kutokuwepo `Access-Control-Allow-Credentials` kwenye njia ya pamoja. Weka asili za management/dashboard nje ya usanidi wowote unaoruhusu; lazima zibaki zimefungwa kabisa.

## Kupeana mikono WebSocket (`/v1/responses`, `/v1/ws`)

Vivinjari havitumii CORS kwa WebSocket, kwa hivyo WebSocket husafirisha ambayo inarejesha matokeo ya makisio angalia kupeana mkono `Origin` wenyewe (`src/server/origin/wsOrigin.ts`): Majibu WebSocket (`/v1/responses`) na, wakati OmniRoute inapitia `npm start` / `npm run dev`, daraja la `/v1/ws` na `/api/v1/ws`, ambalo hutiririsha `/v1/chat/completions`, `/v1/messages` kama fremu na `/v1/responses`. Daraja linauliza `/api/v1/ws?handshake=1` kwa uamuzi huo na linakataa kuboresha isipokuwa njia hiyo iliendesha ukaguzi. Masharti ya uthibitishaji bado yanatumika kando. Cheki asili hupita wakati:

- haina kichwa cha `Origin` (Codex CLI, SDKs na wateja wengine wasio na kivinjari);
- `Origin` inakubaliwa na orodha ya ruhusa hapo juu (`CORS_ALLOWED_ORIGINS`, mpangilio wa `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` ni mojawapo ya asili za umma za OmniRoute(msingi wa umma uliosanidiwa URL, asili ya seva mbadala inayoaminika, au mwenyeji wa moja kwa moja loopback/LAN aliyepewa kama IP halisi au `localhost` — wagombea sawa na ukaguzi wa mabadiliko ya dashibodi); au
- ina ufunguo halali API, kama kwenye uso wa HTTP `/v1/*`.

Kitu kingine chochote kinapata `403 ws_origin_forbidden`. Kidakuzi cha kipindi cha dashibodi hakiondoi `Origin` ngeni , kwa sababu kivinjari hukiambatisha kwenye soketi ya ukurasa wowote. `localhost` kwenye bandari nyingine haijachukuliwa kuwa ya asili moja; ongeza asili kama hizo kwa `CORS_ALLOWED_ORIGINS`.

## Mfano: geuza wakala mbele ya OmniRoute

CORS inatekelezwa na OmniRoute yenyewe, kwa hivyo wakala kwa ujumla anapaswa **sivyo** ongeza au andika upya vichwa vya `Access-Control-*` (vijajuu viwili vinavunja vivinjari). Simamisha TLS na usonge mbele — acha OmniRoute ijibu utangulizi:

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

Weka asili za kivinjari zinazoruhusiwa katika OmniRoute (`CORS_ALLOWED_ORIGINS` au kichupo cha Usalama), sio kwenye seva mbadala.

## Chanzo faili

| Wasiwasi                                               | Faili                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| Ubora wa orodha ya wanaoruhusiwa + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| Programu ya kati (chanzo kimoja cha ukweli)            | `src/server/authz/pipeline.ts`                                       |
| Mipangilio sindano ya asili ya wakati wa utekelezaji → | `src/lib/config/runtimeSettings.ts`                                  |
| Hali ya muda wa utekelezaji wa dashibodi               | `src/app/api/settings/authz-inventory/route.ts`                      |
| Bango la onyo la Dashibodi                             | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Sehemu ya CORS Zinazoruhusiwa                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent kwa kila njia CORS (isipokuwa)             | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handshake `Origin` check                     | `src/server/origin/wsOrigin.ts`                                      |

## Tazama pia

- [Viwango vya Walinzi wa Njia](./ROUTE_GUARD_TIERS.md) Utekelezaji wa mzunguko — kwa njia zinazoweza kuzaa (udhibiti tofauti, unaosaidia).
- [Mwongozo wa Uidhinishaji](../architecture/AUTHZ_GUIDE.md) — bomba kamili la uthibitishaji.
