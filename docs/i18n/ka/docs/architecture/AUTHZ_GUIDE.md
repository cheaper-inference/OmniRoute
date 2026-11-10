# Authorization Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **სიმართლის წყარო:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ბოლოს განახლდა:** 2026-09-22 — scope namespaces point at MCP-SERVER.md

OmniRoute-ს აქვს მარშრუტის ამომცნობი ავტორიზაციის კონვეიერი, რომელიც ყველა API მოთხოვნას აკონტროლებს. კლასიფიკაცია არის **დეტერმინისტული** და **ჩავარდნისას იკეტება** — ყველაფერი, რისი კლასიფიცირებაც შეუძლებელია, ხვდება `MANAGEMENT` კატეგორიაში და მოითხოვს სესიას ან მენეჯმენტის დონის ტოკენს. ეს გვერდი განმარტავს მოდელს ინჟინრებისთვის, რომლებიც მარშრუტებს ინარჩუნებენ ან ახალ ენდპოინტებს აპროექტებენ.

![AuthZ კონვეიერი (3 მარშრუტის კლასი + პოლიტიკის შეფასება)](../diagrams/exported/authz-pipeline.svg)

> წყარო: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ავტორიზაციის ორი რეჟიმი

### 1. API გასაღები (Bearer)

გამოიყენება OpenAI/Anthropic/Gemini-თან თავსებადი კლიენტის API-ებისთვის და მართვის რამდენიმე მარშრუტისთვის, როდესაც გასაღებს `manage` scope აქვს.

```
Authorization: Bearer <api-key>
```

მოწმდება `src/sse/services/auth.ts`-ში `isValidApiKey()` / `extractApiKey()` ფუნქციებით და ხელახლა ექსპორტდება `src/shared/utils/apiAuth.ts`-ის გავლით. ვალიდატორი ასევე იღებს `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env ცვლადებს მუდმივ passthrough გასაღებებად (issue #1350).

### 2. Dashboard სესია (auth_token cookie)

Dashboard-ის გვერდებისა და ადმინისტრატორის ოპერაციებისთვის.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie სესიად ითვლება მხოლოდ მაშინ, როდესაც JWT წარმატებით გადის ვერიფიკაციას **და** შეიცავს `authenticated: true` მნიშვნელობას
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Cookie-ის ყველა მომხმარებელი (Dashboard-ის route guard (`isDashboardSessionAuthenticated()`), authz pipeline-ის განახლება, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) ამ დამხმარე ფუნქციის გავლით მუშაობს.
არსებობს `JWT_SECRET`-ით ხელმოწერილი სხვა JWT-ებიც — Cursor CLI passthrough გასაღებების მფლობელებისთვის ქმნის
`iss "omniroute" / aud "cursor-cli"` ტოკენებს — და ისინი არასოდეს წარმოადგენენ სესიებს
(#13298).

მოწმდება `src/shared/utils/apiAuth.ts`-ში `isDashboardSessionAuthenticated()` ფუნქციით. Pipeline ავტომატურად აახლებს JWT-ს, როდესაც მის 30-დღიან მოქმედების ვადამდე 7 დღეზე ნაკლები რჩება.

სესია ასევე შეიძლება დასრულდეს 30 დღის გასვლამდე, რადგან ყველა token minter გადის `mintDashboardSessionToken`-ის გავლით (შეიცავს issue time `iat`-სა და id `jti`-ს), ხოლო verifier ამოწმებს ორ პარამეტრს: `sessionsValidAfter`, რომელიც პაროლის შეცვლისას ივსება და რის გამოც მანამდე გაცემული ყველა სესია ვეღარ გაივლის ვერიფიკაციას (ბრაუზერი, რომელმაც პაროლი შეცვალა, ახალ cookie-ს იღებს), და `revokedDashboardSessions`, რომელსაც `POST /api/auth/logout` ამატებს გასული სესიის `jti`-ს. ძველი რელიზით შექმნილ სესიებს არცერთი claim არ აქვთ და ძალაში რჩებიან პაროლის პირველად შეცვლამდე. თუ პარამეტრების წაკითხვა შეუძლებელია, სესია სანდოდ არ ითვლება.

მართვის ზოგიერთი მარშრუტი იღებს **რომელიმე** რეჟიმს: cookie-ს ან `Bearer <key>`-ს, როდესაც API გასაღებს `manage` (ან `admin`) scope აქვს. სწორედ ეს იძლევა v3.8-ში დამატებული „API call-ებით კონფიგურირებადი“ workflow-ის გამოყენების შესაძლებლობას.

#### არასავალდებულო OIDC login gate (#6973)

Dashboard-ის ადმინისტრატორის შესვლა ნაგულისხმევი პაროლით შესვლასთან ერთად ასევე მხარს უჭერს **ნებაყოფლობით ჩართულ** OIDC (OpenID Connect) flow-ს —
პაროლით შესვლა არასოდეს იშლება, ის მხოლოდ
ემატება:

- გამორთულია, გარდა იმ შემთხვევისა, როდესაც `settings.oidcEnabled === true` **და**
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` ყველა კონფიგურირებულია (Settings → Auth).
  `GET /api/auth/oidc/login` წინააღმდეგ შემთხვევაში აბრუნებს `400`-ს.
- `GET /api/auth/oidc/login` issuer-ის `/.well-known/openid-configuration`-დან
  აღმოაჩენს `authorization_endpoint`-ს (სათადარიგოდ იყენებს
  `<issuer>/authorize`-ს), შემომავალი მოთხოვნიდან აგებს redirect URI-ს
  (`x-forwarded-proto`-ის გათვალისწინებით) და გადამისამართებას ახორციელებს IdP-ზე
  შემთხვევითი `state`-ით, რომელიც `httpOnly` `oidc_state` cookie-ში ინახება.
- `GET /api/auth/oidc/callback` ამოწმებს `state`-ს, ცვლის ავტორიზაციის
  კოდს და ამოწმებს ID token-ის ხელმოწერას issuer-ის JWKS-ის მეშვეობით
  (`jose`-ის `createRemoteJWKSet`, ქეშირებული თითოეულ JWKS URI-ზე), `issuer`/`audience`
  შემოწმებებით. Dashboard-ში დაშვებისთვის საჭიროა არაცარიელი
  `oidcAllowedSubjects` სია, `oidcAdmissionClaim` პოლიტიკა, ან ორივე.
  Subject-ების სია `sub`-ს ან `email`-ს მხოლოდ მაშინ ადარებს, როდესაც
  `email_verified === true`. არჩევითი claim-ების პოლიტიკა იღებს წერტილებით
  გამოყოფილ ID-token claim-ის გზას (მაგალითად, `realm_access.roles`) და
  მიღებული მნიშვნელობების მასივს; ამოხსნილი claim უნდა იყოს სტრიქონების მასივი,
  რომელიც შეიცავს სულ მცირე ერთ მიღებულ მნიშვნელობას. თუ ორივე პოლიტიკაა
  კონფიგურირებული, ორივემ უნდა გაიაროს შემოწმება. არმყოფი ან არასწორად
  ჩამოყალიბებული claim-ები უსაფრთხოების მიზნით უარყოფილია, ხოლო ორივე პოლიტიკის
  გარეშე callback უარს ამბობს შესვლაზე (`not_configured`). მხოლოდ subject-ზე
  დაფუძნებული არსებული კონფიგურაციები უცვლელად განაგრძობს მუშაობას.
- Keycloak ჩვეულებრივ realm-ის როლებს access token-ებში ასახავს და არა
  აუცილებლად ID token-ებში. realm-ის `admin` როლის მოთხოვნისთვის ამ კლიენტისთვის
  დააკონფიგურირეთ protocol mapper, რომელიც `realm_access.roles`-ს მის
  **ID token**-ში ჩასვამს, შემდეგ კი `oidcAdmissionClaim` დააყენეთ მნიშვნელობაზე
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  როლებზე დაფუძნებული დაშვების ჩართვამდე შეამოწმეთ ამ კლიენტის ID-token-ის
  რეალური claim; აპლიკაცია access-token-ის როლებს არ კითხულობს. IdP-ის მხრიდან
  token-ის გაცემაზე უარმა შეიძლება ეს შემოწმება შეავსოს, მაგრამ აპლიკაციის
  მხრიდან შემოწმებას ვერ ჩაანაცვლებს.
- წარმატების შემთხვევაში სისტემა გასცემს პაროლით შესვლისას გაცემულ
  **ზუსტად იგივე** 30-დღიან `auth_token` JWT-ს
  (`src/app/api/auth/login/route.ts`), ამიტომ dashboard-ის სესიის დანარჩენი
  pipeline (ავტომატური განახლება, cookie-ის დროშები) უცვლელი რჩება —
  OIDC მხოლოდ ცვლის cookie-ის გაცემის მეთოდს და არა იმას, თუ რა უფლებებს
  ანიჭებს იგი. IdP-ის როლებსა და ჯგუფებში ცვლილებები არსებულ OmniRoute
  სესიებს არ აუქმებს; მათი მოქმედების ვადას კვლავ logout, პაროლის შეცვლა ან
  სესიის ვადის გასვლა განსაზღვრავს.
- ყველა `oidc*` პარამეტრი (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) შედის
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ში
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  აბრუნებს `400 PASSWORD_REQUIRED`-ს, თუ body-ში `currentPassword`-ის სახით
  მართვის პაროლი არ არის გადმოცემული (`401 PASSWORD_MISMATCH`, როდესაც ის
  არასწორია). `oidcDisablePasswordLogin` უარს ამბობს პაროლით _შესვლაზე_
  (`POST /api/auth/login`), მაგრამ შენახულ პაროლის ჰეშს ინარჩუნებს და
  ხელახალი ავთენტიფიკაციისას კვლავ ამოწმებს `currentPassword`-ს მის წინააღმდეგ.
- `corsOrigins` და `bruteForceProtection` ასევე შედის
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ში: რომელიმე მათგანის შესუსტება შესვლის
  დაცვის მექანიზმებს ასუსტებს, ამიტომ მათაც სჭირდებათ იგივე
  `currentPassword`-ით ხელახალი ავთენტიფიკაცია (Security ჩანართი მას ითხოვს),
  ხოლო JSON-ის იმპორტი მათ ამოშლის.
- უსაფრთხოების პოლიტიკის ყველა გასაღები — `SECURITY_IMPACTING_SETTINGS_KEYS`-ის
  ჩანაწერები, ყოველი `oidc*` გასაღები და dashboard-ის სესიის მდგომარეობა —
  `PATCH /api/settings`-ზე არის **მხოლოდ ოპერატორისთვის**: manage-სკოპიანი API
  key ან `oma_` access token უარყოფილია `403`-ით მაშინაც კი, თუ ის სწორ
  `currentPassword`-ს აგზავნის, ხოლო უარი აუდიტში ფიქსირდება როგორც
  `settings.update_failed` მიზეზით: `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()`-ში `src/lib/api/operatorCredential.ts`).
  ჩვეულებრივი პარამეტრები (თემა, ჩვენების პარამეტრები) კვლავ რედაქტირებადია
  `manage` key-ის ან `admin` access token-ისთვის. `/api/settings`-ის ყოველი
  მუტაცია (და `/api/settings/require-login`-ისაც) ასევე საჭიროებს `admin`
  access-token scope-ს (`ADMIN_MUTATION_EXACT_PATHS`-ში
  `src/server/authz/accessScopes.ts`, ზუსტი path-ის დამთხვევით); `GET`
  კვლავ რჩება `read`-ად, ხოლო `/api/settings/*`-ის სხვა ქვე-როუტები
  (პროქსები, combo-ის ნაგულისხმევი მნიშვნელობები, model alias-ები,
  შეკუმშვა, purge-ები…) ინარჩუნებს მეთოდით განსაზღვრულ `write` scope-ს.
- `POST /api/settings/import-json` ამ ხელახალ ავთენტიფიკაციას გამოტოვებს,
  ამიტომ ჩაწერამდე ამოშლის `IMPORT_STRIPPED_SETTINGS_KEYS`-ში ჩამოთვლილ ყველა
  გასაღებს (იმავე ფაილში): პაროლსა და `currentPassword`-ს,
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ის ყველა ჩანაწერს და dashboard-ის სესიის
  მდგომარეობას (`sessionsValidAfter`, `revokedDashboardSessions`).
  შესაბამისად, ძველი backup-ის იმპორტი ვერ აღადგენს სესიას, რომელიც პაროლის
  შეცვლამ ან sign-out-მა უკვე დაასრულა.

#### არჩევითი TOTP ორ-ფაქტორიანი შესვლა (#16619)

ჩაირთვება Settings → Security-დან; გამორთულია მანამ, სანამ ოპერატორი არ
ჩართავს მას (`src/server/auth/dashboardMfa.ts`).

- **რას მოიცავს:** პაროლით შესვლას (`POST /api/auth/login`, რომელსაც შემდეგ სჭირდება
  `POST /api/auth/mfa/verify`) და `omniroute connect`-ს (`POST /api/cli/connect`,
  რომელიც უარს ამბობს მხოლოდ პაროლზე დაფუძნებულ გაცვლაზე და კოდს იღებს როგორც `totp`).
- **რას არ მოიცავს:** OIDC / SSO-ით შესვლა (`/api/auth/oidc/callback`) არ ითხოვს OmniRoute TOTP-ს.
  ის ეყრდნობა იდენტობის პროვაიდერის საკუთარ მეორე ფაქტორს, ამიტომ OIDC-ის ჩართვის შემთხვევაში
  MFA იდენტობის პროვაიდერში უნდა გაააქტიუროთ.
- **აღდგენა** (მოწყობილობის დაკარგვის, აღდგენის კოდების ამოწურვის ან ფაქტორის ვეღარ
  დადასტურების შემთხვევაში, მაგალითად `STORAGE_ENCRYPTION_KEY`-ის შეცვლის შემდეგ):
  1. გადატვირთეთ სერვერი `OMNIROUTE_DISABLE_MFA=true`-ით.
  2. უშუალოდ ჰოსტზე (loopback peer-ით და loopback `Host`-ით, მაგალითად
     `http://localhost:20128`) შედით პაროლით. მეორე ფაქტორი გამოტოვებული იქნება მხოლოდ
     ამ origin-ისთვის; ყველა სხვა origin-ს კვლავ დასჭირდება კოდი.
  3. Settings → Security → Disable-ში შეიყვანეთ პაროლი და კოდის ველი ცარიელი დატოვეთ. `POST /api/auth/mfa/disable` იღებს `code`-ის გარეშე სხეულს მხოლოდ მაშინ, როდესაც
     ცვლადი დაყენებულია და მოთხოვნა ჰოსტიდან მოდის; ამასთან, კვლავ საჭიროა dashboard-ის
     სესია და მიმდინარე პაროლი, ხოლო მოქმედება აღირიცხება როგორც
     `auth.mfa.disabled` `secondFactor: "recovery_switch"`-ით.
  4. გააუქმეთ `OMNIROUTE_DISABLE_MFA`-ის დაყენება, გადატვირთეთ სერვერი და საჭიროების შემთხვევაში
     ხელახლა გაიარეთ რეგისტრაცია.

## მარშრუტების კლასები

`src/server/authz/types.ts` განსაზღვრავს სამ კლასს; ნებისმიერი მარშრუტი, რომლის დეტერმინისტულად კლასიფიცირებაც შეუძლებელია, უბრუნდება `MANAGEMENT`-ს.

| კლასი        | აღწერა                                                                                                                                                                | საჭირო ავთენტიფიკაცია                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | აშკარად უსაფრთხო მარშრუტები — შესვლა, გასვლა, სტატუსი, ინიციალიზაცია, ჯანმრთელობა, onboarding-ის bootstrap.                                                           | არცერთი                                                         |
| `CLIENT_API` | მოდელების მომსახურების endpoint-ები — `/api/v1/*`, `/api/v1beta/*`, ასევე მეტსახელები `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer გასაღები, როცა ჩართულია `REQUIRE_API_KEY` feature flag-ი |
| `MANAGEMENT` | დაფის გვერდები, პარამეტრები, providers, გასაღებები, ადმინისტრატორისა და დიაგნოსტიკის endpoint-ები.                                                                    | დაფის სესია ან Bearer `manage` scope-ით                         |

`MANAGEMENT`-ის ზოგიერთი მოქმედება **მხოლოდ ოპერატორისთვისაა**: `manage` გასაღები არ არის საკმარისი. შენახული credential-ების ექსპორტი (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), სარეზერვო ასლის აღდგენა ცოცხალ მონაცემებზე (`POST /api/db-backups/import`, მათ შორის `dryRun=true`, `POST /api/db-backups` აღდგენა id-ით, `POST /api/settings/import-json`), აღდგენის წერტილების განადგურება (`DELETE /api/db-backups` გასუფთავება და `PATCH /api/db-backups`, რადგან მის მიერ შენახული შენარჩუნების პოლიტიკა მართავს ყოველი სარეზერვო ასლის შემდეგ ავტომატურ წაშლას) მოითხოვს დაფის სესიას, ლოკალურ CLI სუბიექტს ან გამორთულ შესვლას. სინქრონიზაციის token-ის გაცემა (`POST /api/sync/tokens`) და `admin` CLI წვდომის token-ის მოჭრა (`POST /api/cli/tokens`) მოითხოვს დაფის სესიას ან ლოკალურ CLI სუბიექტს შესვლის ყველა რეჟიმში. API გასაღებები ნებისმიერი scope-ით და `oma_` წვდომის token-ები არ არიან ოპერატორის credential-ები: როცა ისინი საჭიროა, იღებენ `403`-ს. შემოწმება მდებარეობს `src/lib/api/operatorCredential.ts`-ში (`resolveOperatorCredential()` / `requireOperatorCredential()`). შესვლის პარამეტრების შეცვლაც მხოლოდ ოპერატორისთვისაა: `POST /api/settings/require-login` (მართვის პაროლის დაყენება / `requireLogin`-ის გადართვა) პაროლის არსებობის შემდეგ იღებს მხოლოდ ამ credential-ებს — პირველი გაშვების bootstrap ფანჯარა (როცა პაროლი ჯერ არ არსებობს) უცვლელი რჩება — ხოლო დაფის სესიამ პაროლის შესაცვლელად უნდა გააგზავნოს `currentPassword` (`403`, როცა ის აკლია ან არასწორია, აუდიტირდება როგორც `settings.update_failed`). ლოკალური CLI და გამორთული შესვლის მქონე ინსტალაცია ინარჩუნებენ აღდგენის გზას და პაროლის დაყენებას შეუძლიათ მის გარეშეც, რადგან ორივე მიბმულია ჰოსტზე, რომელიც მონაცემთა დირექტორიას ფლობს.

## მილსადენი

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

სანდო შიდა სათაურები (განსაზღვრულია `src/server/authz/headers.ts`) არის** ჩამოშორებულია შემოსული მოთხოვნებისგან** კლასიფიკაციამდე — კლიენტებს არ შეუძლიათ წინასწარ დაასახლონ `x-omniroute-auth-*` სუბიექტის იმიტაციისთვის.

### პოლიტიკის კონტრაქტები

მარშრუტის თითოეულ კლასს აქვს პოლიტიკა `src/server/authz/policies/` ში:

- **`publicPolicy`** (`policies/public.ts`) — ყოველთვის აბრუნებს `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ექსტრაქტები Bearer, ამოწმებს `validateApiKey()` მეშვეობით. ანონიმურად გადადის მხოლოდ მაშინ, როდესაც ეფექტური `REQUIRE_API_KEY` ფუნქციის დროშა გამორთულია. ეფექტური დროშა წყდება `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) მეშვეობით, ასე რომ, დაფის ფუნქციების დროშები და გარემოს ცვლადები მუდმივად მართავენ `/api/v1/*`, `/api/v1beta/*` და მეტსახელებს; გადამწყვეტის წარუმატებლობა ვერ დაიხურება. ნებას რთავს დაფის სესიის მოთხოვნას კლიენტის API მარშრუტებზე (მათ შორის, `/api/v1/models`, რომელსაც იყენებს დაფის მოდელების კატალოგი). როდესაც Entra ID SSO ჩართულია, Bearer, რომელიც სტრუქტურულად არის Entra ტოკენი (სამი base64url სეგმენტი, `RS*` alg, `kid`) განიხილება SSO ფილიალში.** ადრე** `validateApiKey()` და მისი ვერდიქტი საბოლოოა — ის არასოდეს გადადის API-გასაღების გზაზე ან დეგრადაციის ანონიმურ ფილიალში, ამიტომ პირადობის პროვაიდერის შეწყვეტა არ შეიძლება გახდეს ღია წვდომა. სტატიკური API კლავიშები არ იმოქმედებს. იხილეთ [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — იღებს დაფის სესიას, შიდა მოდელის სინქრონიზაციის მოთხოვნებს (შეესაბამება `/api/providers/[name]/(sync-models|models)`) ან მთლიანად გამოტოვებს, თუ `isAuthRequired()` დააბრუნებს false-ს. აბრუნებს 403-ს (`AUTH_001`), როდესაც არსებობს Bearer ჟეტონი, მაგრამ არასწორია, წინააღმდეგ შემთხვევაში 401. ასევე ახორციელებს მარშრუტის მცველი იარუსებს (LOCAL_ONLY / ALWAYS_PROTECTED) ნებისმიერი auth ფილიალამდე — იხ. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY ბილიკები `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ში (დღეს: `/api/mcp/`) შეიძლება იყოს წვდომა არა loopback-დან, როდესაც Bearer key ატარებს `manage` სკოპს; ყველა სხვა LOCAL_ONLY ბილიკი რჩება მკაცრი მარყუჟის გარეშე, მასშტაბის მიუხედავად.

წარმატებული პოლიტიკა აბრუნებს `AuthSubject` `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ით. ქვედა დინების დამმუშავებლებს შეუძლიათ მისი წაკითხვა `assertAuth(request, "CLIENT_API")` ით `src/server/authz/assertAuth.ts` ში, auth ლოგიკის ხელახლა გაშვების ნაცვლად.

## საჯარო მარშრუტების სია

`src/shared/constants/publicApiRoutes.ts` წარმოადგენს მკაფიო დაშვებულ სიას:

სია დაყოფილია **ფორმის** მიხედვით და ეს დაყოფა კრიტიკულია (GHSA-74g9-q8f6-793h): პრეფიქსი
ემთხვევა `startsWith()`-ის გამოყენებით, ამიტომ ის ასევე ემთხვევა ყველა მიმდებარე გზას, რომელსაც
მისი საწყისი სიმბოლოები აქვს.
`/api/usage/om-usage` პრეფიქსის სახით მონიშნულია `/api/usage/om-usage<anything>` PUBLIC-ად, ხოლო Next მას ხსნის
`/api/usage/[connectionId]`-ზე — ჰენდლერზე, რომელსაც საკუთარი ავტორიზაცია არ გააჩნია.

```ts
// ნამდვილი ქვესიმრავლეები. თითოეული ჩანაწერი MUST დასრულდეს "/"-ით (მოწმდება unit test-ით).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ში განიხილება როგორც CLIENT_API და არა როგორც "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ცალკეული მარშრუტები, რომლებიც ემთხვევა EXACTLY (ბოლო სლეშით ან მის გარეშე).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // შესვლის მე-2 ეტაპი opt-in TOTP-ისთვის; საჭიროებს MFA-pending cookie-ს
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// მხოლოდ წაკითხვისთვის განკუთვნილი ცალკეული მარშრუტები, რომლებზეც ასევე ვრცელდება CORS origin-ის გამარტივებული წესი.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// მხოლოდ წაკითხვისთვის განკუთვნილი ცალკეული მარშრუტი CORS-ის გამარტივებული წესის გარეშე.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

მხოლოდ უსაფრთხო მეთოდებისთვისაა მხოლოდ წაკითხვის მარშრუტები საჯარო. შენიშვნა: `classifyRoute()` `/api/v1/*`-სა და `/api/v1beta/*`-ს გამორიცხავს PUBLIC-ის შემდგომი დამთხვევიდან — ისინი ყოველთვის `CLIENT_API`-ია, ამიტომ Bearer-key პოლიტიკა კვლავ მოქმედებს.

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

მილსადენი ყოველთვის აწერს პასუხებს:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ავთენტიფიცირებული მოთხოვნებისთვის, ზედა დინების (დამმუშავებლის მხრიდან) მოთხოვნის სათაურები ასევე მოიცავს:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

გამოიყენეთ `assertAuth(req, expectedClass)` დამმუშავებლების შიგნით — ის აგდებს `AuthzAssertionError` კოდით `AUTHZ_NOT_INITIALIZED` თუ შუალედური პროგრამა გვერდის ავლით მოხდა (გამოადგება ტესტებში კონფიგურაციის რეგრესიების დასაჭერად).

## იხილეთ აგრეთვე

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ავთენტიფიკაციის მარკერი თითოეული ენდპოინტისთვის
- [COMPLIANCE.md](../security/COMPLIANCE.md) — აუდიტის ჟურნალი ავთენტიფიკაციის მოვლენებისთვის
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — სამი სკოპის სახელთა სივრცე და MCP ინსტრუმენტების სკოპის კატალოგი
- წყარო: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
