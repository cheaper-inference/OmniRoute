# CORS Configuration & Security (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute վերահսկում է, թե որն է **բրաուզերի ծագումը** կարող է կարդալ խաչաձև ծագման պատասխանները մեկ կենտրոնացված թույլտվության ցուցակից: Մոդելն է **fail-փակված է լռելյայն** Ոչ մի ծագում չի թույլատրվում, քանի դեռ չեք ընտրել: Այս էջը փաստում է, թե ինչպես է լուծվում թույլտվությունների ցանկը, ինչ է իրականում բացահայտում `CORS_ALLOW_ALL=true` (և, որ կարևոր է, ինչ է անում այն **ոչ** ), ինչպես ապահով կերպով կարգավորել զարգացն ընդդեմ արտադրության, և աշխատատեղի նախազգուշացումը ցուցադրվում է վահանակի վրա, երբ նիշը ակտիվ է:

**Ճշմարտության աղբյուրը.** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`): Թույլտվությունների ցանկը կիրառվում է մեկ անգամ, միջին ծրագրում (`src/server/authz/pipeline.ts`) — յուրաքանչյուր երթուղու մշակողները իրենք չեն սահմանում `Access-Control-Allow-Origin` :

## Ինչպես է լուծվում ծագումը

Յուրաքանչյուր հարցման համար միջին ծրագիրը հաշվարկում է `Access-Control-Allow-Origin` արժեքը հետևյալ հաջորդականությամբ.

1. **`CORS_ALLOW_ALL=true`** (կամ ժառանգված `CORS_ORIGIN=*`) → արձագանքում է զանգահարողի `Origin` (կամ `*`, երբ `Origin` վերնագիր չկա), `Vary: Origin` ով, որպեսզի քեշերը ճիշտ մնան: Նույն `applyCorsHeaders()` chokepoint-ը նաև ավելացնում է `Vary: Accept-Encoding` յուրաքանչյուր 2xx-մարմնի պատասխանին խորհրդանիշով վավերացված `/v1*`/`/v1beta*` մակերեսին (`relaxForTokenAuth`, RFC 9110 §12.5.5, թողարկում #6737), այնպես որ downstream/shared քեշերը կարող են ճիշտ տարբերակել սեղմված և չսեղմված տարբերակները:
2. Հակառակ դեպքում, `Origin` հարցումը նորմալացվում է (փոքրատառ, հետևի շեղը հանվում է) և համընկնում է **միավորված թույլտվությունների ցուցակը** :
   - նախանձ **`CORS_ALLOWED_ORIGINS`** — ստորակետերով բաժանված ցուցակ, և
   - գործարկման ժամանակը **`corsOrigins`** կարգավորում (Dashboard → Security → _CORS Allowed Origins_), ներարկվել է `setRuntimeAllowedOrigins()` միջոցով `src/lib/config/runtimeSettings.ts` ից:
3. Ոչ մի համընկնում →**`Access-Control-Allow-Origin` վերնագիր չի արտանետվում** . Զննարկիչը արգելափակում է խաչաձեւ ծագման ընթերցումը: Սա նախատեսված ձախողմամբ փակված լռելյայն է:

| Env var                | Իմաստը                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Ճշգրիտ ծագման CSV թույլ տալու համար (խորհուրդ է տրվում):                                                  |
| `CORS_ALLOW_ALL`       | `true`/`1` → արձագանքում է ցանկացած ծագման (վայրի նշան): Միայն մշակող:                                    |
| `CORS_ORIGIN`          | Ժառանգություն. `*` իրեն պահում է `CORS_ALLOW_ALL` նման. թույլտվությունների ցանկին ավելացվում է մեկ արժեք: |

## Վտանգեք — մոդելը, ինչ `CORS_ALLOW_ALL=true` իրականում բացահայտում է

Ընդհանուր OWASP նախազգուշացումը («ցանկացած կայք CORS = կարող է անվանել ձեր API») արժե լուրջ վերաբերվել, բայց OmniRoute ի բացահայտումը.**ավելի նեղ, քան ընդհանուր դեպքը** Իրականացման մեկ կոնկրետ փաստի պատճառով.

> **Կենտրոնական `applyCorsHeaders()` երբեք չի արտանետում `Access-Control-Allow-Credentials`:** Բրաուզերը չի բացահայտի _credentialed_ (քուքի կրող) խաչաձև ծագման պատասխան, եթե սերվերը չուղարկի `Access-Control-Allow-Credentials: true`: OmniRoute ի ընդհանուր CORS ուղին երբեք չի լինում:

Ինչ է դա նշանակում յուրաքանչյուր մակերեսի համար, նույնիսկ `CORS_ALLOW_ALL=true` դեպքում.

| Մակերեւութային                                  | Հաստատման մեխանիզմ          | Զուգահեռագրի CORS ի ազդեցությունը                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Վահանակ / MANAGEMENT `/api/*`                   | Cookie նիստ                 | Ծագումը կրկնվում է, բայց **առանց `Allow-Credentials`** զննարկիչը **բլոկներ** հավատարմագրերը կարդացել են. Խաչաձև ծագման վնասակար կայք **չի կարող կարդալ** ձեր իսկականացված վահանակի պատասխանները, և նիստի թխուկը չի բացահայտվում:                                                                                                                                                                                                                                                                                                            |
| Հաճախորդ API `/v1/*`, `/v1beta/*`               | Կրող / `x-api-key` վերնագիր | Արդեն թույլատրելի **դիզայնով** (`relaxForTokenAuth`). բրաուզերները երբեք ավտոմատ կերպով չեն կցում `Authorization`/`x-api-key`, այնպես որ հարձակվողի էջը չի կարող ապահովել ձեր բանալին: Հանգիստ արձագանքը պահանջում է վավերացված թեմա (վավերացված API բանալի կամ վահանակի նիստ), ոչ միայն հավատարմագրերի վերնագիր և երբեք չի ներառում `Access-Control-Allow-Credentials`: Անանուն պատասխանները (`REQUIRE_API_KEY=false`) օգտագործում են կազմաձևված սկզբնաղբյուրի թույլտվությունների ցանկը, ներառյալ `CORS_ALLOW_ALL=true` բացահայտ միացումը: |
| Հանրային միայն կարդալու համար (`/api/health`,…) | Ոչ մեկը                     | Ոչ զգայուն; wildcard-ը անվնաս է:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Այսպիսով,**մնացորդային** `CORS_ALLOW_ALL=true` ի բացահայտումը սահմանափակվում է հետևյալով **կարդում է** արդեն իսկ չհաստատված տվյալների, և (բ) թույլ տալով CORS**թռիչքից առաջ անցում** կառավարման երթուղիների վրա —, որոնք դեռ պահանջում են վավերացում, որը խաչաձեւ ծագման էջը չի կարող ապահովել: Դա է **ոչ** նիստ-առեւանգում կամ հավատարմագրերի գողության վեկտոր՝ ընդհանուր CORS ուղու վրա:

### Մեկ իսկական բացառություն — `/api/v1/agents/`

Cloud-Agent երթուղիները (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) սահմանել են իրենց **սեփական** CORS վերնագրեր (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) և **անել** արտանետել `Access-Control-Allow-Origin: <origin>|*` `Access-Control-Allow-Credentials: true` հետ միասին: Սա այն միակ մակերեսն է, որտեղ ծագում-արձագանքը և հավատարմագրերը գոյակցում են, և դա այդպես է **անկախ `CORS_ALLOW_ALL` ից** . Այս երթուղիները հաստատված են կառավարման կողմից (`requireManagementAuth`); օպերատորները, ովքեր ցուցադրում են վահանակը առանց հոսթինգի, պետք է տեղյակ լինեն, որ սա այն վայրն է, որտեղ թույլատրվում է խաչաձև ծագման հավատարմագրերի ընթերցում պատասխանի վերնագրերի կողմից: Այն խստացնելը դեպի բացահայտ թույլտվությունների ցանկը հետագծվում է այս CORS ուղեցույցից առանձին:

## Արտադրության ստուգաթերթ

- **Երբեք մի դրեք `CORS_ALLOW_ALL=true` արտադրության մեջ:** Թողեք այն չկարգավորված:
- Սահմանել ան **բացահայտ** ծագման ցուցակ — կամ env var կամ Security-tab դաշտը.

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Եթե OmniRoute աշխատում է հակադարձ վստահված անձի/թունելի հետևում (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS է.**ոչ** ձեր միակ կառավարումը — հետադարձ կապի երթուղու պահակը դեռևս պաշտպանում է ձվադրման ընդունակ երթուղիները (տես [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ): Մի կեղծեք `X-Forwarded-For: 127.0.0.1` 403-ը «շտկելու» համար; որը կրկին բացում է RCE դասը, երթուղու պահակը փակում է:
- Հաստատեք գործարկման ժամանակի վիճակը. վահանակը ցույց է տալիս a **համառ սաթ պաստառ** տակ Dashboard → Security → Թույլտվության գույքագրում, երբ `CORS_ALLOW_ALL=true` ակտիվ է, և `/api/settings/authz-inventory` վերադարձնում է `cors: { allowAll, allowedOrigins }` ծրար մոնիտորինգի գործիքները կարող են հարցում:

## Զարգացման հարմարավետություն — թույլ է տալիս կոնկրետ տեղական ծագում

Ձեզ հազվադեպ է անհրաժեշտ նիշը նույնիսկ dev-ում: Թույլ տվեք միայն ձեր օգտագործած մշակող սերվերներին.

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Ծագումները համընկնում են մեծատառերով անզգայուն, հետին շեղը անտեսվում է, ուստի `http://localhost:3000` և `http://localhost:3000/` համարժեք են: Նույն CSV կարող է սահմանվել գործարկման ժամանակ **Գործակալության վահանակ → Security → CORS Թույլատրված ծագում** առանց վերագործարկման:

## API ստեղներ ընդդեմ թխուկների նիստերի

- **կրող / `x-api-key` (թ `/v1/*` եզրակացության մակերես):** բրաուզերները երբեք դրանք ինքնաբերաբար չեն միացնում: CORS այստեղ իմաստալից խոչընդոտ չէ — որ API բանալին արգելքն է — ահա թե ինչու է այդ մակերեսը միտումնավոր թույլատրելի, այնպես որ զննարկիչը և Electron հաճախորդները կարող են կարդալ պատասխանները, որոնք արդեն իսկ իրավունք ունեն: Հանգիստ արձագանքը պահանջում է վավերացված թեմա (հաստատված API բանալի կամ վահանակի նիստ), ոչ միայն հավատարմագրերի վերնագիր և երբեք չի ներառում `Access-Control-Allow-Credentials`. Անանուն պատասխաններ (`REQUIRE_API_KEY=false`) օգտագործել կազմաձևված ծագման թույլտվության ցուցակը, ներառյալ բացահայտը `CORS_ALLOW_ALL=true` միանալ. Հավաստագրման մերժումները (401) մնում են ընթեռնելի, որպեսզի հաճախորդները կարողանան ցուցադրել չեղյալ կամ սխալ մուտքագրված բանալի (#5242): գազատարի սեփական 401-ը պահպանում է արձագանքը, և այն երթուղին, որն ինքն է հրաժարվում բանալին այն բանից հետո, երբ գազամուղն այն ծառայեց որպես անանուն (`/v1/models` և `/v1beta/models` կառավարման հեղինակությունը կազմաձևված է, սեփականատիրոջ շրջանակը `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` և ավտոմատ համակցված թեկնածու երթուղիներ) ավելացնում է արձագանքը այդ 401-ի միջոցով `credentialRejectionHeaders()`. Արձագանքը միացված է հավատարմագրերի վերնագիր կրող հարցումի վրա (`Authorization`, `x-api-key`, `x-goog-api-key` կամ `auth_token` cookie), ոչ թե դրանցից ո՞ւմ հետ է ստուգվել երթուղին և երբեք չի զուգակցվել `Access-Control-Allow-Credentials`; մարմինը ֆիքսված սխալի ծրար է: Կառավարման երթուղիները տակ `/api/v1/` հսկվում է `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) մի օգտագործեք այս հավատարմագրման մերժման բացառությունը՝ with `REQUIRE_API_KEY=false`, նրանց 401/403 պատասխանները հետևում են կազմաձևվածին CORS ծագման քաղաքականություն։
- **Թխուկների աշխատաշրջան (վահանակ).** պաշտպանված է ձախողմամբ փակ լռելյայնով **և** ընդհանուր ճանապարհին `Access-Control-Allow-Credentials` ի բացակայությամբ: Պահպանեք management/dashboard սկզբնաղբյուրը ցանկացած թույլատրելի կազմաձևից. դրանք պետք է մնան ճիշտ փակված:

## WebSocket ձեռքսեղմումներ (`/v1/responses`, `/v1/ws`)

Զննարկիչները չեն կիրառում CORS WebSocket վրա, ուստի WebSocket փոխադրողները, որոնք վերադարձնում են եզրակացության ելքը, ստուգում են ձեռքսեղմումը `Origin` իրենք (`src/server/origin/wsOrigin.ts`). Պատասխանները WebSocket (`/v1/responses`) և, երբ OmniRoute անցնում է `npm start` / `npm run dev`, `/v1/ws` և `/api/v1/ws` կամուրջը, որը հոսում է `/v1/chat/completions`, `/v1/messages` և `/v1/responses` շրջանակները: Կամուրջը հարցնում է `/api/v1/ws?handshake=1` դատավճիռը և հրաժարվում է արդիականացնել, քանի դեռ այդ երթուղին չի անցել ստուգումը: Authentication requirements still apply separately. Ծագման ստուգումն անցնում է, երբ.

- այն չունի `Origin` վերնագիր (Codex CLI, SDKs և այլ ոչ զննարկիչ հաճախորդներ);
- `Origin` ն ընդունվում է վերը նշված թույլտվությունների ցանկով (`CORS_ALLOWED_ORIGINS`, `corsOrigins` պարամետր, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute ի սեփական հանրային սկզբնաղբյուրներից մեկն է (կարգավորված հանրային բազան URL, վստահելի վստահված անձի փոխանցված սկզբնաղբյուրը կամ ուղղակի loopback/LAN հոսթինգը, որը տրված է որպես IP բառացի կամ `localhost` — նույն թեկնածուները, որոնք օգտագործում է վահանակի մուտացիայի ստուգումը); կամ
- այն կրում է վավեր API բանալի, ինչպես HTTP `/v1/*` մակերեսի վրա:

Ցանկացած այլ բան ստանում է `403 ws_origin_forbidden`: Վահանակի նստաշրջանի թխուկը չի ազատում օտարերկրյա `Origin` ին, քանի որ զննարկիչը այն կցում է ցանկացած էջի վարդակից: `localhost` on another port is not treated as same-origin; `CORS_ALLOWED_ORIGINS` ին ավելացրեք նման մշակողների ծագումը:

## Օրինակ՝ հակառակ պրոքսի OmniRoute դիմաց

CORS պարտադրվում է հենց OmniRoute ի կողմից, ուստի վստահված անձը սովորաբար պետք է **ոչ** ավելացնել կամ վերաշարադրել `Access-Control-*` վերնագրերը (կրկնակի վերնագրերը խախտում են բրաուզերները): Դադարեցրեք TLS և փոխանցեք — թույլ տվեք OmniRoute պատասխանել նախնական թռիչքին՝

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

Սահմանեք զննարկչի թույլատրված սկզբնաղբյուրը OmniRoute ում (`CORS_ALLOWED_ORIGINS` կամ Անվտանգության ներդիրում), այլ ոչ թե վստահված անձի մեջ:

## Աղբյուր ֆայլեր

| Մտահոգություն                                          | Ֆայլ                                                                 |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| Թույլատրել ցանկի լուծում + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| Միջին ծրագիր (ճշմարտության մեկ աղբյուր)                | `src/server/authz/pipeline.ts`                                       |
| Կարգավորումներ → գործարկման սկզբնական ներարկում        | `src/lib/config/runtimeSettings.ts`                                  |
| Գործարկման ժամանակի կարգավիճակը վահանակի համար         | `src/app/api/settings/authz-inventory/route.ts`                      |
| Վահանակի նախազգուշացման պաստառ                         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Թույլատրված ծագման դաշտ                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent յուրաքանչյուր երթուղու CORS (բացառություն) | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ձեռքսեղմում `Origin` ստուգում                | `src/server/origin/wsOrigin.ts`                                      |

## Տես նաև

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback-ի կիրառում ձվադրման հնարավորություն ունեցող երթուղիների համար (առանձին, լրացուցիչ հսկողություն):
- [Լիազորման ուղեցույց](../architecture/AUTHZ_GUIDE.md) — ամբողջական հեղինակային խողովակաշարը:
