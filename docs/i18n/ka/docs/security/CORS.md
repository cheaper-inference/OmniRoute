# CORS Configuration & Security (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute აკონტროლებს რომელი **ბრაუზერის წარმოშობა** შეუძლია წაიკითხოს ჯვარედინი წარმოშობის პასუხები ერთი, ცენტრალიზებული დაშვებული სიიდან. მოდელი არის **fail-დახურულია ნაგულისხმევად** : არ არის ნებადართული წარმოშობა, `CORS_ALLOW_ALL=true` არ აირჩევთ.**არა** ), როგორ უნდა დააკონფიგურიროთ dev vs წარმოება უსაფრთხოდ, და გაშვების გაფრთხილება დაფა აჩვენებს, როდესაც wildcard არის ცოცხალი.

**სიმართლის წყარო:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). დაშვების სია გამოიყენება ერთხელ, შუა პროგრამაში (`src/server/authz/pipeline.ts`) — თითო მარშრუტის დამმუშავებლები თავად არ აყენებენ `Access-Control-Allow-Origin`.

## როგორ წყდება წარმოშობა

თითოეული მოთხოვნისთვის შუა პროგრამა ითვლის `Access-Control-Allow-Origin` მნიშვნელობას შემდეგი თანმიმდევრობით:

1. **`CORS_ALLOW_ALL=true`** (ან მემკვიდრეობითი `CORS_ORIGIN=*`) → ეხმიანება აბონენტის `Origin` უკან (ან `*`, როდესაც არ არის `Origin` სათაური), `Vary: Origin` ით, რათა ქეში დარჩეს სწორი. იგივე `applyCorsHeaders()` chokepoint ასევე ანიჭებს `Vary: Accept-Encoding` ყოველ 2xx-თან სხეულის პასუხს ჟეტონით დამოწმებულ `/v1*`/`/v1beta*` ზედაპირზე (`relaxForTokenAuth`, RFC 9110 §12.5.5, გამოშვება #6737), ასე რომ, downstream/shared ქეშებს შეუძლიათ სწორად განასხვავონ შეკუმშული და არაკომპრესირებული ვარიანტები.
2. წინააღმდეგ შემთხვევაში, მოთხოვნა `Origin` ნორმალიზდება (მცირე რეგისტრირებული, უკანა ზოლი ამოღებულია) და შეესაბამება **გაერთიანებული ნებართვების სია** :
   - env **`CORS_ALLOWED_ORIGINS`** — მძიმით გამოყოფილი სია და
   - გაშვების დრო **`corsOrigins`** პარამეტრი (Dashboard → Security → _CORS Allowed Origins_), ინექცია `setRuntimeAllowedOrigins()` მეშვეობით `src/lib/config/runtimeSettings.ts` დან.
3. არ ემთხვევა →**`Access-Control-Allow-Origin` სათაური არ არის გამოშვებული** . ბრაუზერი ბლოკავს ჯვარედინი წარმოშობის წაკითხვას. ეს არის ნაგულისხმევი ჩავარდნებით დახურული ნაგულისხმევი.

| Env var                | მნიშვნელობა                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ზუსტი წარმოშობის CSV დასაშვებად (რეკომენდებულია).                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → ეხმიანება ნებისმიერ წარმომავლობას (wildcard). მხოლოდ დეველოპერები.           |
| `CORS_ORIGIN`          | მემკვიდრეობა. `*` იქცევა როგორც `CORS_ALLOW_ALL`; დაშვებულ სიას ემატება ერთი მნიშვნელობა. |

## საფრთხე ემუქრება — მოდელს, რასაც `CORS_ALLOW_ALL=true` ნამდვილად ამხელს

ზოგადი OWASP გაფრთხილება ("დამატებითი ბარათი CORS = ნებისმიერ საიტს შეუძლია დაურეკოს თქვენს API") სერიოზულად უნდა იქნას მიღებული, მაგრამ OmniRoute ს ექსპოზიცია არის **უფრო ვიწრო ვიდრე ზოგადი შემთხვევა** ერთი კონკრეტული განხორციელების ფაქტის გამო:

> **ცენტრალური `applyCorsHeaders()` არასოდეს ასხივებს `Access-Control-Allow-Credentials`.** ბრაუზერი არ გამოავლენს _credentialed_ (ქუქის შემცველი) ჯვარედინი წარმოშობის პასუხს, თუ სერვერი არ გამოაგზავნის `Access-Control-Allow-Credentials: true`. OmniRoute ის გაზიარებული CORS გზა არასოდეს არ ხდება.

რას ნიშნავს ეს თითო ზედაპირზე, თუნდაც `CORS_ALLOW_ALL=true`:

| ზედაპირი                                   | ავტორიზაციის მექანიზმი           | wildcard CORS ეფექტი                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| დაფა / MANAGEMENT `/api/*`                 | ქუქიების სესია                   | წარმოშობა ეხმიანება, მაგრამ **`Allow-Credentials` გარეშე** ბრაუზერი **ბლოკები** დადასტურებული წაკითხული. მავნე ჯვარედინი წარმოშობის საიტი **ვერ წაიკითხავს** თქვენი ავთენტიფიცირებული დაფის პასუხები და სესიის ქუქი არ არის გამოვლენილი.                                                                                                                                                                                                                                                                                      |
| კლიენტი API `/v1/*`, `/v1beta/*`           | მატარებელი / `x-api-key` სათაური | უკვე დასაშვებია **დიზაინით** (`relaxForTokenAuth`): ბრაუზერები არასოდეს ამაგრებენ ავტომატურ `Authorization`/`x-api-key` ს, ამიტომ თავდამსხმელის გვერდი ვერ მიაწვდის თქვენს გასაღებს. მოდუნებული ექო მოითხოვს ავთენტიფიცირებულ საგანს (დამოწმებული API გასაღები ან დაფის სესია), არა მხოლოდ რწმუნებათა სიგელის სათაურს და არასოდეს მოიცავს `Access-Control-Allow-Credentials`. ანონიმური პასუხები (`REQUIRE_API_KEY=false`) იყენებს კონფიგურირებულ წარმოშობის ნებადართულ სიას, მათ შორის აშკარა `CORS_ALLOW_ALL=true` ჩართვას. |
| მხოლოდ საჯარო წასაკითხად (`/api/health`,…) | არცერთი                          | არამგრძნობიარე; wildcard უვნებელია.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

ასე რომ **ნარჩენი** `CORS_ALLOW_ALL=true` ს ექსპოზიცია შემოიფარგლება: (ა) არასპეციფიკური ჯვარედინი წარმოშობით **კითხულობს** უკვე არაავთენტიფიცირებული მონაცემების შესახებ და (ბ) CORS დაშვება **გაფრენისწინა საშვი** მართვის მარშრუტებზე —, რომლებიც ჯერ კიდევ საჭიროებენ ავთენტურობას, რომელსაც ჯვარედინი წარმოშობის გვერდი ვერ უზრუნველყოფს. ეს არის **არა** სესიის გატაცების ან რწმუნებათა სიგელების ქურდობის ვექტორი საერთო CORS გზაზე.

### ერთი ნამდვილი გამონაკლისი — `/api/v1/agents/`

Cloud-Agent მარშრუტები (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ადგენს მათ **საკუთარი** CORS სათაურები (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) და **გააკეთე** გამოსცემს `Access-Control-Allow-Origin: <origin>|*` `Access-Control-Allow-Credentials: true` თან ერთად. ეს არის ერთი ზედაპირი, სადაც წარმოშობა-ექო და რწმუნებათა სიგელები თანაარსებობენ და არის **დამოუკიდებელი `CORS_ALLOW_ALL`** . ეს მარშრუტები დამოწმებულია მენეჯმენტის მიერ (`requireManagementAuth`); ოპერატორებმა, რომლებიც ავლენენ საინფორმაციო პანელს ჰოსტის გარეთ, უნდა იცოდნენ, რომ ეს არის ის ადგილი, სადაც ჯვარედინი წარმოშობის სერთიფიკატების წაკითხვა ნებადართულია პასუხის სათაურებით. მისი გამკაცრება მკაფიო დაშვებულ სიაზე განიხილება ამ CORS სახელმძღვანელოსგან დამოუკიდებლად.

## წარმოების ჩამონათვალი

- **არასოდეს დააყენოთ `CORS_ALLOW_ALL=true` წარმოებაში.** დატოვეთ დაუყენებელი.
- დააყენეთ ა **გამოკვეთილი** საწყისი სია — ან env var ან უსაფრთხოების ჩანართის ველი:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- თუ OmniRoute გადის საპირისპირო პროქსის / გვირაბის უკან (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS არის **არა** თქვენი ერთადერთი კონტროლი — მარშრუტის მარშრუტის მცველი კვლავ იცავს ქვირითის შესაძლებლობის მქონე მარშრუტებს (იხ. [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). არ გააყალბოთ `X-Forwarded-For: 127.0.0.1` 403-ის "გამოსწორებისთვის"; რომ ხელახლა ხსნის RCE კლასს მარშრუტის მცველი იხურება.
- დაადასტურეთ გაშვების მდგომარეობა: დაფა აჩვენებს a **მუდმივი ქარვის ბანერი** Dashboard → Security → ავტორიზაციის ინვენტარის ქვეშ, როდესაც `CORS_ALLOW_ALL=true` პირდაპირ ეთერშია და `/api/settings/authz-inventory` აბრუნებს `cors: { allowAll, allowedOrigins }` კონვერტის მონიტორინგის ხელსაწყოებს შეუძლია გამოკითხვა.

## განვითარების მოხერხებულობა — საშუალებას იძლევა კონკრეტული ადგილობრივი წარმოშობის

თქვენ იშვიათად გჭირდებათ wildcard თუნდაც dev-ში. დაუშვით მხოლოდ თქვენს მიერ გამოყენებული დეველოპერის სერვერები:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

საწყისები ემთხვევა რეგისტრის უცვლელად და უკანა ხაზის იგნორირებას ახდენს, ამიტომ `http://localhost:3000` და `http://localhost:3000/` ექვივალენტურია. იგივე CSV შეიძლება დაყენდეს გაშვების დროს **Dashboard → Security → CORS Allowed Origins** გადატვირთვის გარეშე.

## API კლავიშები ქუქიების სესიების წინააღმდეგ

- **მატარებელი / `x-api-key` ( `/v1/*` დასკვნის ზედაპირი):** ბრაუზერები არასოდეს ანიჭებენ მათ ავტომატურად. CORS აქ არ არის მნიშვნელოვანი ბარიერი — The API გასაღები არის ბარიერი — რის გამოც ის ზედაპირი განზრახ ნებადართულია ასე ბრაუზერში და Electron კლიენტებს შეუძლიათ წაიკითხონ პასუხები, რომლებსაც უკვე აქვთ უფლება. მოდუნებული ექო მოითხოვს ავთენტიფიცირებულ საგანს (დამოწმებული API გასაღები ან დაფის სესია), არა მხოლოდ რწმუნებათა სიგელის სათაური და არასოდეს მოიცავს `Access-Control-Allow-Credentials`. ანონიმური პასუხები (`REQUIRE_API_KEY=false`) გამოიყენეთ კონფიგურირებული წარმოშობის ნებადართული სია, მათ შორის აშკარა `CORS_ALLOW_ALL=true` აირჩიე. ავტორიზაციის უარყოფა (401) რჩება იკითხებადი, რათა კლიენტებმა შეძლონ გაუქმებული ან არასწორად აკრეფილი გასაღები (#5242): მილსადენის საკუთარი 401 ინარჩუნებს ექოს და მარშრუტი, რომელიც უარს ამბობს გასაღებზე მას შემდეგ, რაც მილსადენი მას ანონიმურად ემსახურებოდა (`/v1/models` და `/v1beta/models` მენეჯმენტის ავტორიზაცია კონფიგურირებულია, მფლობელის ფარგლებში `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` და ავტომატური კომბინირებული კანდიდატის მარშრუტები) ამატებს ექოს იმ 401 via-ს `credentialRejectionHeaders()`. ექო ჩართულია მოთხოვნაზე, რომელსაც აქვს რწმუნებათა სიგელის სათაური (`Authorization`, `x-api-key`, `x-goog-api-key` ან `auth_token` ქუქი), არა რომელ მათგანზეა შემოწმებული მარშრუტი და არასოდეს არის დაწყვილებული `Access-Control-Allow-Credentials`; სხეული არის ფიქსირებული შეცდომის კონვერტი. მართვის მარშრუტები ქვეშ `/api/v1/` იცავდა `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) არ გამოიყენოთ ეს სერთიფიკატის უარყოფის გამონაკლისი: ერთად `REQUIRE_API_KEY=false`, მათი 401/403 პასუხები მოჰყვება კონფიგურაციას CORS წარმოშობის პოლიტიკა.
- **ქუქიების სესია (დაფა):** დაცულია მარცხით დახურული ნაგულისხმევი **და** `Access-Control-Allow-Credentials` ს არარსებობით საერთო გზაზე. შეინახეთ management/dashboard საწყისები ნებისმიერი ნებადართული კონფიგურაციისგან; ისინი ზუსტად დახურული უნდა დარჩეს.

## WebSocket ხელის ჩამორთმევა (`/v1/responses`, `/v1/ws`)

ბრაუზერები არ იყენებენ CORS WebSocket ზე, ასე რომ, WebSocket ტრანსპორტი, რომელიც აბრუნებს დასკვნის გამომავალს, თავად ამოწმებს ხელის ჩამორთმევას `Origin` (`src/server/origin/wsOrigin.ts`): პასუხები WebSocket (`/v1/responses`) და როდესაც OmniRoute გადის `npm start` / `npm run dev` ზე, `/v1/ws` და `/api/v1/ws` ხიდზე, რომელიც გადასცემს `/v1/chat/completions`, `/v1/messages` და `/v1/responses` ჩარჩოებს. ხიდი სთხოვს `/api/v1/ws?handshake=1` განაჩენს და უარს ამბობს განახლებაზე, თუ ეს მარშრუტი არ გაივლის შემოწმებას. ავთენტიფიკაციის მოთხოვნები კვლავ მოქმედებს ცალკე. წარმოშობის შემოწმება გადის, როდესაც:

- მას არ აქვს `Origin` სათაური (Codex CLI, SDKs და სხვა არაბრაუზერის კლიენტები);
- `Origin` დაშვებულია ზემოთ მოყვანილი ნებადართული სიით (`CORS_ALLOWED_ORIGINS`, `corsOrigins` პარამეტრი, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` არის OmniRoute ის ერთ-ერთი საკუთარი საჯარო წარმოშობა (კონფიგურირებული საჯარო ბაზა URL, სანდო პროქსის გადაგზავნილი საწყისი, ან პირდაპირი loopback/LAN ჰოსტი, რომელიც მოცემულია როგორც IP სიტყვასიტყვით ან `localhost` — იგივე კანდიდატები, რომელსაც იყენებს დაფის მუტაციის შემოწმება); ან
- მას აქვს მოქმედი API გასაღები, როგორც HTTP `/v1/*` ზედაპირზე.

ნებისმიერი სხვა იღებს `403 ws_origin_forbidden`. დაფის სესიის ქუქი-ფაილი არ ათავისუფლებს უცხოურ `Origin`, რადგან ბრაუზერი მას ანიჭებს ნებისმიერი გვერდის სოკეტს. სხვა პორტზე `localhost` არ განიხილება როგორც იგივე წარმოშობის; დაამატეთ ასეთი დეველოპმენტები `CORS_ALLOWED_ORIGINS` ს.

## მაგალითი: საპირისპირო პროქსი OmniRoute წინ

CORS ახორციელებს თავად OmniRoute, ამიტომ პროქსი ჩვეულებრივ უნდა **არა** დაამატეთ ან გადაწერეთ `Access-Control-*` სათაურები (ორმაგი სათაური არღვევს ბრაუზერებს). შეწყვიტე TLS და გააგზავნე — ნება მიეცით OmniRoute უპასუხოს ფრენამდე:

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

დააყენეთ დაშვებული ბრაუზერის საწყისი OmniRoute (`CORS_ALLOWED_ORIGINS` ან უსაფრთხოების ჩანართი) და არა პროქსიში.

## წყარო ფაილები

| შეშფოთება                                      | ფაილი                                                                |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| დაშვებული სიის გარჩევადობა + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware აპლიკაცია (სიმართლის ერთი წყარო)    | `src/server/authz/pipeline.ts`                                       |
| პარამეტრები → გაშვების საწყისი ინექცია         | `src/lib/config/runtimeSettings.ts`                                  |
| დაფის გაშვების სტატუსი                         | `src/app/api/settings/authz-inventory/route.ts`                      |
| დაფის გამაფრთხილებელი ბანერი                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS დაშვებული წარმოშობის ველი                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent თითო მარშრუტი CORS (გამონაკლისი)   | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ხელის ჩამორთმევა `Origin` შემოწმება  | `src/server/origin/wsOrigin.ts`                                      |

## აგრეთვე იხილეთ

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback აღსრულება ქვირითის უნარიანი მარშრუტებისთვის (ცალკე, დამატებითი კონტროლი).
- [ავტორიზაციის გზამკვლევი](../architecture/AUTHZ_GUIDE.md) — სრული ავტორიზაციის მილსადენი.
