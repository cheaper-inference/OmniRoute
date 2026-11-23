# Authorization Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **სიმართლის წყარო:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ბოლოს განახლდა:** 2026-09-22 — scope namespaces point at MCP-SERVER.md

OmniRoute-ს აქვს მარშრუტის ამომცნობი ავტორიზაციის კონვეიერი, რომელიც ყველა API მოთხოვნას აკონტროლებს. კლასიფიკაცია არის **დეტერმინისტული** და **ჩავარდნისას იკეტება** — ყველაფერი, რისი კლასიფიცირებაც შეუძლებელია, ხვდება `MANAGEMENT` კატეგორიაში და მოითხოვს სესიას ან მენეჯმენტის დონის ტოკენს. ეს გვერდი განმარტავს მოდელს ინჟინრებისთვის, რომლებიც მარშრუტებს ინარჩუნებენ ან ახალ ენდპოინტებს აპროექტებენ.

![AuthZ კონვეიერი (3 მარშრუტის კლასი + პოლიტიკის შეფასება)](../diagrams/exported/authz-pipeline.svg)

> წყარო: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ორი ავთენტიფიკაციის რეჟიმი

### 1. API გასაღები (Bearer)

გამოიყენება OpenAI/Anthropic/Gemini-თან თავსებადი client API-ებისთვის და რამდენიმე მართვის მარშრუტისთვის, როცა გასაღებს აქვს `manage` scope.

```
Authorization: Bearer <api-key>
```

მოწმდება `src/sse/services/auth.ts`-ის `isValidApiKey()` / `extractApiKey()`-ით და ხელმეორედ ექსპორტდება `src/shared/utils/apiAuth.ts`-ის მეშვეობით. ვალიდატორი ასევე იღებს `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` გარემოს ცვლადებს, როგორც მუდმივ passthrough გასაღებებს (issue #1350).

### 2. დაფის სესია (cookie `auth_token`)

დაფის გვერდებისა და ადმინისტრატორის ოპერაციებისთვის.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

cookie არის სესია მხოლოდ იმ შემთხვევაში, როცა JWT ვერიფიცირდება **და** შეიცავს `authenticated: true`-ს (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). cookie-ს ყოველი მომხმარებელი (დაფის მარშრუტის guard (`isDashboardSessionAuthenticated()`), authz pipeline-ის განახლება, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`) ამ დამხმარე ფუნქციის გავლით მუშაობს.
ასევე არსებობს სხვა JWT-ები, რომლებიც ხელმოწერილია `JWT_SECRET`-ით — Cursor CLI passthrough გასაღების მფლობელებისთვის ამზადებს `iss "omniroute" / aud "cursor-cli"` ტოკენებს — და ისინი არასდროს არიან სესიები (#13298).

ვერიფიცირდება `src/shared/utils/apiAuth.ts`-ის `isDashboardSessionAuthenticated()`-ით. pipeline ავტომატურად ანახლებს JWT-ს, როცა მის 30-დღიან სიცოცხლეში 7 დღეზე ნაკლები დარჩა.

სესია შეიძლება 30 დღემდე დასრულდეს, რადგან ყველა გამცემი გადის `mintDashboardSessionToken`-ზე (გაცემის დრო `iat` და იდენტიფიკატორი `jti`), ხოლო ვერიფიკატორი ამოწმებს ორ პარამეტრს: `sessionsValidAfter`, რომელსაც პაროლის შეცვლა ადგენს, რათა მასამდე გაცემული ყველა სესია აღარ ვერიფიცირდეს (პაროლის შემცვლელი ბრაუზერი ახალ cookie-ს იღებს), და `revokedDashboardSessions`, რომელსაც `POST /api/auth/logout` უმატებს გასული სესიის `jti`-ს. ადრინდელი გამოშვებით გაცემულ სესიებს ეს მახასიათებლები არ აქვთ და პირველ პაროლის შეცვლამდე რჩებიან ვალიდურები. თუ პარამეტრების წაკითხვა შეუძლებელია, სესია არ ენდობა.

ზოგიერთი მართვის მარშრუტი იღებს **ან** ერთ, **ან** მეორე რეჟიმს: cookie ან `Bearer <key>`, როცა API გასაღებს აქვს `manage` (ან `admin`) scope. სწორედ ეს უზრუნველყოფს v3.8-ში დამატებულ „API გამოძახებით კონფიგურირებად“ სამუშაო პროცესს.

#### არასავალდებულო OIDC შესვლის კარიბჭე (#6973)

დაფის ადმინისტრატორის შესვლა ასევე უჭერს მხარს **არასავალდებულო** OIDC (OpenID Connect) ნაკადს ნაგულისხმევი პაროლით შესვლის გვერდით — პაროლით შესვლა არასდროს იშლება, მხოლოდ ემატება:

- გამორთულია, თუ `settings.oidcEnabled === true` **და** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ყველა არაა კონფიგურირებული (Settings → Auth).
  წინააღმდეგ შემთხვევაში `GET /api/auth/oidc/login` აბრუნებს `400`-ს.
- `GET /api/auth/oidc/login` იპოვის `authorization_endpoint`-ს issuer-ის
  `/.well-known/openid-configuration`-იდან (სარეზერვოდ `<issuer>/authorize`), შემომავალი
  მოთხოვნიდან აშენებს redirect URI-ს (`x-forwarded-proto`-ს გათვალისწინებით) და
  გადამისამართებს IdP-ზე შემთხვევითი `state`-ით, რომელიც ინახება `httpOnly` `oidc_state`
  cookie-ში.
- `GET /api/auth/oidc/callback` ამოწმებს `state`-ს, ცვლის ავტორიზაციის კოდს და ამოწმებს
  ID token-ის ხელმოწერას issuer-ის JWKS-ით (`jose`-ის `createRemoteJWKSet`, ქეშირებული
  თითო JWKS URI-ზე) `issuer`/`audience` შემოწმებებით. `oidcAllowedSubjects` დაშვებული
  სიის მითითება სავალდებულოა: ის ემთხვევა token-ის `sub` მოთხოვნას ან მის `email`
  მოთხოვნას — email მოთხოვნა მხოლოდ მაშინ მიიღება, როცა `email_verified === true`, ასე
  რომ IdP-ზე დაუდასტურებელი email არასდროს გაივლის კარიბჭეს — და ჩანაწერების გარეშე
  callback უარყოფს ყველა შესვლას (`not_configured`).
- წარმატების შემთხვევაში ის გასცემს **ზუსტად იმავე** 30-დღიან `auth_token` JWT-ს, რომელსაც
  პაროლით შესვლა (`src/app/api/auth/login/route.ts`), ასე რომ დაფის სესიის დანარჩენი
  pipeline (ავტომატური განახლება, cookie-ის დროშები) უცვლელი რჩება — OIDC ცვლის მხოლოდ
  cookie-ის გაცემის გზას, არა იმას, რასაც ის ანიჭებს.
- ყველა `oidc*` პარამეტრი (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`,
  `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`)
  არის `SECURITY_IMPACTING_SETTINGS_KEYS`-ში (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` პასუხობს `400 PASSWORD_REQUIRED`-ით, თუ სხეული არ შეიცავს მართვის
  პაროლს როგორც `currentPassword`-ს (`401 PASSWORD_MISMATCH`, როცა ის არასწორია).
  `oidcDisablePasswordLogin` კრძალავს პაროლით _შესვლას_ (`POST /api/auth/login`), მაგრამ
  ინახავს შენახულ პაროლის hash-ს, ხოლო ხელახალი ავთენტიფიკაცია მაინც ამოწმებს
  `currentPassword`-ს მის მიმართ.
- `corsOrigins` და `bruteForceProtection` ასევე `SECURITY_IMPACTING_SETTINGS_KEYS`-ში არიან:
  ორივეს შერბილება არღვევს შესვლის დაცვას, ამიტომ მათ იგივე ხელახალი ავთენტიფიკაცია
  სჭირდებათ `currentPassword`-ით (Security ჩანართი ითხოვს მას), ხოლო JSON იმპორტი მათ
  აშორებს.
- უსაფრთხოების პოლიტიკის ყველა გასაღები — `SECURITY_IMPACTING_SETTINGS_KEYS`-ის ჩანაწერები,
  ყველა `oidc*` გასაღები და დაფის სესიის მდგომარეობა — **მხოლოდ ოპერატორისთვისაა**
  `PATCH /api/settings`-ზე: manage scope-ის API გასაღები ან `oma_` წვდომის token იღებს `403`-ს
  მაშინაც კი, თუ სწორ `currentPassword`-ს აგზავნის, და უარყოფა აუდიტირდება როგორც
  `settings.update_failed` `reason: OPERATOR_REQUIRED`-ით (`requireOperatorCredential()`
  `src/lib/api/operatorCredential.ts`-ში). ჩვეულებრივი პარამეტრები (თემა, ჩვენების
  უპირატესობები) რჩება ჩასაწერი `manage` გასაღებისთვის ან `admin` წვდომის token-ისთვის.
  `/api/settings`-ის ყოველი ცვლილება (და `/api/settings/require-login`-ის) ასევე მოითხოვს
  `admin` წვდომის token-ის scope-ს (`ADMIN_MUTATION_EXACT_PATHS` `src/server/authz/accessScopes.ts`-ში,
  ზუსტი გზის დამთხვევა); `GET` რჩება `read`-ად, ხოლო `/api/settings/*` სხვა ქვემარშრუტები
  (proxies, combo ნაგულისხმევები, მოდელების მეტსახელები, შეკუმშვა, გასუფთავებები…) ინარჩუნებენ
  მეთოდიდან მიღებულ `write` scope-ს.
- `POST /api/settings/import-json` ამ ხელახალ ავთენტიფიკაციას გვერდს უვლის, ამიტომ წერამდე
  აშორებს `IMPORT_STRIPPED_SETTINGS_KEYS`-ის ყველა გასაღებს (იმავე ფაილში): პაროლსა და
  `currentPassword`-ს, `SECURITY_IMPACTING_SETTINGS_KEYS`-ის ყველა ჩანაწერს და დაფის სესიის
  მდგომარეობას (`sessionsValidAfter`, `revokedDashboardSessions`). ამიტომ ძველი სარეზერვო
  ასლის იმპორტი ვერ აღადგენს სესიას, რომელიც პაროლის შეცვლამ ან გასვლამ დაასრულა.

## მარშრუტების კლასები

`src/server/authz/types.ts` განსაზღვრავს სამ კლასს; ნებისმიერი მარშრუტი, რომლის დეტერმინისტულად კლასიფიცირებაც შეუძლებელია, უბრუნდება `MANAGEMENT`-ს.

| კლასი        | აღწერა                                                                                                                                                                | საჭირო ავთენტიფიკაცია                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | აშკარად უსაფრთხო მარშრუტები — შესვლა, გასვლა, სტატუსი, ინიციალიზაცია, ჯანმრთელობა, onboarding-ის bootstrap.                                                           | არცერთი                                                         |
| `CLIENT_API` | მოდელების მომსახურების endpoint-ები — `/api/v1/*`, `/api/v1beta/*`, ასევე მეტსახელები `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer გასაღები, როცა ჩართულია `REQUIRE_API_KEY` feature flag-ი |
| `MANAGEMENT` | დაფის გვერდები, პარამეტრები, providers, გასაღებები, ადმინისტრატორისა და დიაგნოსტიკის endpoint-ები.                                                                    | დაფის სესია ან Bearer `manage` scope-ით                         |

`MANAGEMENT`-ის ზოგიერთი მოქმედება **მხოლოდ ოპერატორისთვისაა**: `manage` გასაღები არ არის საკმარისი. შენახული credential-ების ექსპორტი (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), სარეზერვო ასლის აღდგენა ცოცხალ მონაცემებზე (`POST /api/db-backups/import`, მათ შორის `dryRun=true`, `POST /api/db-backups` აღდგენა id-ით, `POST /api/settings/import-json`), აღდგენის წერტილების განადგურება (`DELETE /api/db-backups` გასუფთავება და `PATCH /api/db-backups`, რადგან მის მიერ შენახული შენარჩუნების პოლიტიკა მართავს ყოველი სარეზერვო ასლის შემდეგ ავტომატურ წაშლას) მოითხოვს დაფის სესიას, ლოკალურ CLI სუბიექტს ან გამორთულ შესვლას. სინქრონიზაციის token-ის გაცემა (`POST /api/sync/tokens`) და `admin` CLI წვდომის token-ის მოჭრა (`POST /api/cli/tokens`) მოითხოვს დაფის სესიას ან ლოკალურ CLI სუბიექტს შესვლის ყველა რეჟიმში. API გასაღებები ნებისმიერი scope-ით და `oma_` წვდომის token-ები არ არიან ოპერატორის credential-ები: როცა ისინი საჭიროა, იღებენ `403`-ს. შემოწმება მდებარეობს `src/lib/api/operatorCredential.ts`-ში (`resolveOperatorCredential()` / `requireOperatorCredential()`). შესვლის პარამეტრების შეცვლაც მხოლოდ ოპერატორისთვისაა: `POST /api/settings/require-login` (მართვის პაროლის დაყენება / `requireLogin`-ის გადართვა) პაროლის არსებობის შემდეგ იღებს მხოლოდ ამ credential-ებს — პირველი გაშვების bootstrap ფანჯარა (როცა პაროლი ჯერ არ არსებობს) უცვლელი რჩება — ხოლო დაფის სესიამ პაროლის შესაცვლელად უნდა გააგზავნოს `currentPassword` (`403`, როცა ის აკლია ან არასწორია, აუდიტირდება როგორც `settings.update_failed`). ლოკალური CLI და გამორთული შესვლის მქონე ინსტალაცია ინარჩუნებენ აღდგენის გზას და პაროლის დაყენებას შეუძლიათ მის გარეშეც, რადგან ორივე მიბმულია ჰოსტზე, რომელიც მონაცემთა დირექტორიას ფლობს.

## დამუშავების კონვეიერი

```
შემომავალი მოთხოვნა → src/proxy.ts
  → runAuthzPipeline() ფაილში src/server/authz/pipeline.ts
    1. სანდო შიდა სათაურების მოცილება (x-omniroute-auth-*, x-omniroute-route-class)
    2. მოთხოვნის იდენტიფიკატორის გენერირება, მარშრუტის კლასიფიცირება classifyRoute()-ის მეშვეობით
    3. თუ pathname == "/" → გადამისამართება /dashboard-ზე
    4. თუ მიმდინარეობს მოთხოვნების ამოწურვა (კორექტული გამორთვა) და /api/* → 503
    5. თუ მოთხოვნა არა-GET ტიპისაა და მიმართულია /api/*-ზე → checkBodySize() დამცავი შემოწმება
    6. თუ OPTIONS → CORS-ის წინასწარი მოთხოვნის პასუხი 204
    7. თუ options.enforce == false → უცვლელად გატარება მარშრუტის კლასის სათაურებით
    8. წინააღმდეგ შემთხვევაში: POLICIES[routeClass].evaluate(ctx)
       - დაშვება  → x-omniroute-auth-{kind,id,label,scopes}-ის მითითება → NextResponse.next()
       - უარყოფა → JSON შეცდომა correlation_id-ით (მართვის პანელის გვერდები → 302 /login)
```

სანდო შიდა სათაურები (განსაზღვრულია `src/server/authz/headers.ts`-ში) კლასიფიკაციამდე **იშლება შემომავალი მოთხოვნებიდან** — კლიენტებს არ შეუძლიათ `x-omniroute-auth-*`-ის წინასწარ შევსება სუბიექტის გასასაღებლად.

### პოლიტიკების კონტრაქტები

მარშრუტის თითოეულ კლასს აქვს პოლიტიკა `src/server/authz/policies/`-ში:

- **`publicPolicy`** (`policies/public.ts`) — ყოველთვის აბრუნებს `allow({ kind: "anonymous", id: "anonymous" })`-ს.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ამოიღებს Bearer-ს და ამოწმებს `validateApiKey()`-ის მეშვეობით. ანონიმურ წვდომაზე გადადის მხოლოდ მაშინ, როდესაც ეფექტური `REQUIRE_API_KEY` ფუნქციური ალამი გამორთულია. ეფექტური ალამი განისაზღვრება `isRequireApiKeyEnabled()`-ის მეშვეობით (`DB ფუნქციური ალმის უპირატესი მნიშვნელობა > process.env.REQUIRE_API_KEY > ნაგულისხმევი მნიშვნელობა`), რათა მართვის პანელის ფუნქციურმა ალმებმა და გარემოს ცვლადებმა თანმიმდევრულად მართონ `/api/v1/*`, `/api/v1beta/*` და მათი ფსევდონიმები; გამხსნელის შეცდომის შემთხვევაში წვდომა იკეტება. კლიენტის API მარშრუტებზე უშვებს მართვის პანელის სესიის მქონე მოთხოვნებსაც (მათ შორის `/api/v1/models`, რომელსაც მართვის პანელის მოდელების კატალოგი იყენებს).
- **`managementPolicy`** (`policies/management.ts`) — იღებს მართვის პანელის სესიას, მოდელების სინქრონიზაციის შიდა მოთხოვნებს (რომლებიც ემთხვევა `/api/providers/[name]/(sync-models|models)`-ს), ან შემოწმებას მთლიანად გამოტოვებს, თუ `isAuthRequired()` დააბრუნებს false-ს. აბრუნებს 403-ს (`AUTH_001`), როდესაც Bearer ტოკენი წარმოდგენილია, მაგრამ არავალიდურია; სხვა შემთხვევაში — 401-ს. ასევე, ავთენტიფიკაციის ნებისმიერ განშტოებამდე უზრუნველყოფს მარშრუტის დამცავი დონეების (LOCAL_ONLY / ALWAYS_PROTECTED) დაცვას — იხილეთ [მარშრუტის დამცავი დონეები](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ში მოქცეულ LOCAL_ONLY ბილიკებზე (ამჟამად: `/api/mcp/`) წვდომა შესაძლებელია არა-loopback მისამართებიდანაც, როდესაც Bearer გასაღებს აქვს `manage` წვდომის სფერო; ყველა სხვა LOCAL_ONLY ბილიკი წვდომის სფეროს მიუხედავად მხოლოდ loopback-ზე რჩება მკაცრად შეზღუდული.

წარმატებული პოლიტიკა აბრუნებს `AuthSubject`-ს, სადაც `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. შემდგომ დამმუშავებლებს მისი წაკითხვა შეუძლიათ `assertAuth(request, "CLIENT_API")`-ის მეშვეობით `src/server/authz/assertAuth.ts`-ში, ავთენტიფიკაციის ლოგიკის ხელახლა შესრულების ნაცვლად.

## საჯარო მარშრუტების სია

`src/shared/constants/publicApiRoutes.ts` არის მკაფიოდ განსაზღვრული ნებადართული მარშრუტების სია:

სია დაყოფილია **ფორმის** მიხედვით და ამ დაყოფას კრიტიკული მნიშვნელობა აქვს (GHSA-74g9-q8f6-793h): პრეფიქსი მოწმდება `startsWith()`-ით, ამიტომ ის ასევე ემთხვევა ყველა მომიჯნავე ბილიკს, რომელსაც იგივე საწყისი სიმბოლოები აქვს.
`/api/usage/om-usage`-ის პრეფიქსად მითითებამ `/api/usage/om-usage<anything>` საჯარო გახადა, ხოლო Next ამას მიმართავს
`/api/usage/[connectionId]`-ზე — დამმუშავებელზე, რომელსაც საკუთარი ავტორიზაციის შემოწმება არ აქვს.

```ts
// ნამდვილი ქვეხეები. ყოველი ჩანაწერი აუცილებლად უნდა მთავრდებოდეს სიმბოლოთი "/" (ამას მოდულური ტესტი ამოწმებს).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ში განიხილება როგორც CLIENT_API და არა როგორც „ავთენტიფიკაციის გარეშე საჯარო“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ცალკეული მარშრუტები, რომლებიც ზუსტად უნდა დაემთხვეს (ბოლო დახრილი ხაზით ან მის გარეშე).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// მხოლოდ წასაკითხი ცალკეული მარშრუტები, რომლებზეც ასევე ვრცელდება CORS origin-ის შემსუბუქება.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// მხოლოდ წასაკითხი ცალკეული მარშრუტი CORS-ის შემსუბუქების გარეშე.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

მხოლოდ წასაკითხი მარშრუტები საჯაროა **მხოლოდ** უსაფრთხო მეთოდებისთვის. შენიშვნა: `classifyRoute()` გამორიცხავს `/api/v1/*`-სა და `/api/v1beta/*`-ს PUBLIC-ში ნაგულისხმევად მოხვედრისგან — ისინი ყოველთვის `CLIENT_API`-ად კლასიფიცირდება, რათა Bearer-გასაღების პოლიტიკა კვლავ მოქმედებდეს.

## ახალი მარშრუტის დამატება

### ნიმუში 1 — საჯარო კლიენტის API-ის საბოლოო წერტილი (Bearer-ავთენტიფიკაცია)

`/api/v1/`-ისა და `/api/v1beta/`-ის ქვეშ არსებული მარშრუტები ავტომატურად კლასიფიცირდება როგორც `CLIENT_API`. შუამავალი პროგრამული უზრუნველყოფა Bearer-ის შემოწმებას უზრუნველყოფს; მარშრუტის დამმუშავებლებს მისი ხელახლა შესრულება არ სჭირდებათ, თუმცა საჭიროების შემთხვევაში შეუძლიათ სუბიექტის წაკითხვა.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... დამმუშავებლის ლოგიკა
}
```

### ნიმუში 2 — მართვის საბოლოო წერტილი (სესია ან Bearer + manage)

გამოიყენეთ `requireManagementAuth()` ფაილიდან `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... დამმუშავებლის ლოგიკა
}
```

წარმატების შემთხვევაში `requireManagementAuth()` აბრუნებს `null`-ს, ხოლო შეცდომისას — JSON შეცდომის `Response`-ს:

- 401 `AUTH_001` "ავთენტიფიკაცია აუცილებელია" — ავტორიზაციის მონაცემები საერთოდ არ არის წარმოდგენილი
- 403 — არასწორი Bearer **ან** Bearer წარმოდგენილია, მაგრამ გასაღებს `manage` / `admin` მოქმედების სფერო არ აქვს

`hasManageScope(scopes)` აბრუნებს true-ს `"manage"`-ის ან `"admin"`-ის შემთხვევაში.

### ნიმუში 3 — საჯარო ნებადართულ სიაში დამატება

სიმრავლე აირჩიეთ ფორმის მიხედვით და არა მოხერხებულობისთვის. ერთი მარშრუტი უნდა მოთავსდეს `PUBLIC_API_ROUTES_EXACT`-ში (ან მხოლოდ GET-ისთვის — `PUBLIC_READONLY_CORS_API_ROUTES`-ში); მხოლოდ ნამდვილი ქვეხე უნდა მოთავსდეს `PUBLIC_API_ROUTE_PREFIXES`-ში და ის **აუცილებლად უნდა მთავრდებოდეს `/`-ით**. ერთი მარშრუტის პრეფიქსების სიაში მოთავსება ასევე საჯაროს ხდის ყველა მომიჯნავე ბილიკს, რომელსაც იგივე საწყისი სიმბოლოები აქვს — მათ შორის მოგვიანებით დამატებულ დინამიკური სეგმენტების მქონე მეზობელ მარშრუტებსაც (GHSA-74g9-q8f6-793h). განაახლეთ მოდულური ტესტები ფაილებში `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` და `tests/unit/authz/classify.test.ts`.

## ფარგლები

სამი სახელთა სივრცე. თითოეული შემმოწმებელი კითხულობს მხოლოდ საკუთარ სტრიქონებს. გვერდიგვერდ შედარება, მათ შორის, თუ რატომ ვერ ახერხებს `manage` `scopeMatches`-ს `read:compression`-ისთვის და რატომ არ შეუძლია `read` წვდომის ტოკენს `PATCH /api/keys/{id}`-ის შესრულება, მოცემულია [სამი ფარგლის სახელთა სივრცეში](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API გასაღებები შეიცავს `scopes` მასივს (შენახულია JSON ფორმატში `api_keys.scopes`-ში, იხილეთ `src/lib/db/apiKeys.ts`).

### მართვის ფარგლები

- `manage` / `admin` — `hasManageScope`. Bearer წვდომა მართვის API მარშრუტებზე.
- `mcp:connect`, `self:usage`, `self:account-quota` და
  `policy:bypass-provider-quota` არის დამატებითი ზუსტი შესატყვისობის ფარგლები. ისინი `MANAGEMENT_API_KEY_SCOPES`-ის გარეთ არიან. `mcp:connect` ხსნის მხოლოდ `/api/mcp/` არა-loopback ნაწილს.

### MCP ხელსაწყოს ფარგლები

კატალოგი და შესატყვისობის წესები (იდენტური სტრიქონი, ან მინიჭებული ფარგალი, რომელიც მთავრდება `*`-ით): [MCP ხელსაწყოს ფარგლები](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` `src/shared/constants/mcpScopes.ts`-ში არის ორიგინალური ტიპის ქვეჯგუფი და არა სრული კატალოგი. აღსრულება ხორციელდება
`open-sse/mcp-server/scopeEnforcement.ts`-ში მას შემდეგ, რაც `resolveCallerScopeContext()` გადაწყვეტს ფარგლებს MCP ავთენტიფიკაციის ინფორმაციიდან, მოთხოვნის მეტამონაცემებიდან, ან `OMNIROUTE_MCP_SCOPES`-დან.
ის გამორთული რჩება, თუ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` არ არის.

### წვდომის ტოკენის ფარგლები

`read` / `write` / `admin` `oma_live_…` ტოკენებზე, რანჟირებული `scopeSatisfies`-ის მიხედვით
(`src/lib/accessTokens/scopes.ts`). ეს რანგი ვრცელდება მხოლოდ წვდომის ტოკენის სერთიფიკატზე. იხილეთ [მართვის ავთენტიფიკაცია](../guides/MANAGEMENT-AUTH.md).

## ავთენტიფიკაციის საჭიროების გადამრთველი

`src/shared/utils/apiAuth.ts`-ის `isAuthRequired()` განსაზღვრავს, ვრცელდება თუ არა **რაიმე** ავთენტიფიკაცია მოთხოვნაზე:

- `settings.requireLogin === false` → ავთენტიფიკაცია გლობალურად გამორთულია, გარდა ყოველთვის დაცული იარუსისა (იხ. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) და იმ გამოძახებებისა, რომლებიც გასცემენ credential-ს, რომელსაც ის იღებს. ეს მოითხოვს იმავე credential-ს, რაც შესვლის ჩართულობისას: სინქრონიზაციის token-ების გაცემა, CLI წვდომის token-ების მოჭრა ნებისმიერი scope-ით, და `manage`/`admin` scope-ის მქონე API გასაღების შექმნა, ამ scope-ის მინიჭება გასაღებისთვის, ან ასეთი გასაღების ხელახლა გენერირება ან გამჟღავნება (`requireCredentialForManagementScopedKey()`, `src/lib/api/requireManagementAuth.ts`). მხოლოდ inference გასაღებები რჩება ღია.
- პაროლი არ არის კონფიგურირებული **და** არ არსებობს `INITIAL_PASSWORD` გარემოს ცვლადი → bootstrap რეჟიმი უშვებს onboarding wizard-სა და loopback მოთხოვნებს, მაგრამ ქსელიდან გახსნილ მოთხოვნებს კვლავ სჭირდებათ credential-ები.
- ნებისმიერი DB შეცდომა → დახურულად ვერ ხერხდება (secure-by-default).

კლიენტის API გასაღების აღსრულება იყენებს `src/shared/utils/featureFlags.ts`-ის `isRequireApiKeyEnabled()`-ს და არა `process.env.REQUIRE_API_KEY`-ის პირდაპირ წაკითხვას. ეს მნიშვნელოვანია განლაგებული ინსტანციებისთვის: Dashboard → Feature Flags-ში `REQUIRE_API_KEY`-ის შეცვლა ინახავს DB-ის გადაფარვას და მაშინვე მოქმედებს `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` და კლიენტის API-ის სხვა ავთენტიფიკაციის შემოწმებებზე, რომლებიც ამ დამხმარეს იზიარებენ. თუ feature flag-ების საცავი ვერ იკითხება, კლიენტის API-ის ავთენტიფიკაცია დახურულად ვერ ხერხდება და გასაღებს ითხოვს.

## შეუთავსებელი ცვლილება — v3.8.0

`/api/v1/agents/tasks/*` და `/api/resilience/model-cooldowns` საბოლოო წერტილები **ახლა მართვის ავთენტიფიკაციას მოითხოვს** (კომიტი `588a0333`). კლიენტები, რომლებიც მანამდე `manage` მოქმედების არეს მოკლებულ ჩვეულებრივ API გასაღებს აგზავნიდნენ, იღებენ `403`-ს. მიგრაცია: ან API Keys მართვის პანელში გასაღებს მიანიჭეთ `manage` მოქმედების არე, ან გამოიყენეთ მართვის პანელში ავტორიზებული სესია.

## ქცევის ცვლილება — v3.8.2

`/api/mcp/*` (დისტანციური MCP სერვერი) ნაგულისხმევად კვლავ LOCAL_ONLY-ია, თუმცა ახლა იღებს არაუკუმარყუჟის მოთხოვნებს, როდესაც `Authorization: Bearer <api-key>` სათაური შეიცავს `manage` მოქმედების არეს. ეს გამონაკლისი თითოეული ბილიკისთვის ცალსახად კონტროლდება `src/server/authz/routeGuard.ts`-ში არსებული `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ის მეშვეობით; მონათესავე LOCAL_ONLY პრეფიქსის, `/api/cli-tools/runtime/*`-ის, გვერდის ავლა განზრახ შეუძლებელია, რადგან მას ნებისმიერი ქვეპროცესის გაშვება შეუძლია. არაუკუმარყუჟიდან `/api/mcp/*`-ზე გაგზავნილი ანონიმური მოთხოვნები კვლავ აბრუნებს `403 LOCAL_ONLY`-ს — ნებისმიერი ახალი LOCAL_ONLY ბილიკისთვის ნაგულისხმევი რეჟიმი კვლავაც მხოლოდ უკუმარყუჟზე მკაცრი შეზღუდვაა. იხილეთ [მარშრუტის დაცვის დონეები](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## ტესტირება

- მოდულური ტესტები: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- საჯარო დასაშვები სია: `tests/unit/public-api-routes.test.ts`.
- მიზნობრივი გაშვება: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## გამართვა

კონვეიერი პასუხებს ყოველთვის ამ სათაურებით აღნიშნავს:

```
x-request-id:               <კორელაციის იდენტიფიკატორი, გამეორებულია შეცდომის სხეულებში>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ავთენტიფიცირებული მოთხოვნებისთვის ზემდგომი მხარის (დამმუშავებლის მხარეს არსებული) მოთხოვნის სათაურები ასევე მოიცავს:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ბოლო-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (არასავალდებულო)
x-omniroute-auth-scopes:    მძიმით გამოყოფილი სია
```

დამმუშავებლებში გამოიყენეთ `assertAuth(req, expectedClass)` — თუ შუამავალი პროგრამული შრე გამოტოვებულია, ის აგენერირებს `AuthzAssertionError`-ს კოდით `AUTHZ_NOT_INITIALIZED` (სასარგებლოა ტესტებში კონფიგურაციის რეგრესიების აღმოსაჩენად).

## იხილეთ აგრეთვე

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ავთენტიფიკაციის მარკერი თითოეული ენდპოინტისთვის
- [COMPLIANCE.md](../security/COMPLIANCE.md) — აუდიტის ჟურნალი ავთენტიფიკაციის მოვლენებისთვის
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — სამი სკოპის სახელთა სივრცე და MCP ინსტრუმენტების სკოპის კატალოგი
- წყარო: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
