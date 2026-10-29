# SQLite Runtime Resolution (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute გაშვებისას SQLite-ის დრაივერს 5-საფეხურიანი სარეზერვო ჯაჭვის მეშვეობით განსაზღვრავს:

1. **ჩაშენებული `better-sqlite3`** (`package.json`-ის `dependencies`-ის მეშვეობით)
   — ყველაზე სწრაფი, ნატიური ბინარული ფაილი, რომელსაც `npm install` აყენებს, როდესაც აგების ხელსაწყოები ხელმისაწვდომია.

2. **შესრულების დროს დაყენებული `better-sqlite3`** (`~/.omniroute/runtime/`-ში)
   — ზარმაცად ყენდება პირველი გაშვებისას **ან** `scripts/build/postinstall.mjs → scripts/postinstall.mjs`-ის მიერ.
   ჩატვირთვამდე ამოწმებს ნატიური `.node` ფაილის მაგიურ ბაიტებს (ELF / Mach-O / PE),
   რათა დაცული იყოს დაზიანებული ან სხვა პლატფორმისთვის განკუთვნილი ბინარული ფაილებისგან.

3. **`node:sqlite`** (Node ≥22.5-ის სტანდარტული ბიბლიოთეკა) — ნატიური აგება არ სჭირდება; გამოიყენება, როდესაც
   better-sqlite3-ის ორივე გზა წარუმატებელია. ფუნქციების შეზღუდული ნაკრები აქვს.

4. **`sql.js`** (WASM) — საბოლოო სარეზერვო ვარიანტი. ყველგან მუშაობს, თუმცა უფრო ნელია
   და მონაცემებს სინქრონულად ჩაწერის ნაცვლად პერიოდული ინტერვალით წერს.

## რატომ არის საჭირო ასეთი სირთულე?

- **Windows EBUSY**: `npm install -g omniroute@latest` შეიძლება წარუმატებელი იყოს, თუ წინა
  ვერსიის `better_sqlite3.node` გაშვებული პროცესის მიერ არის დაბლოკილი. შესრულების დროს
  `~/.omniroute/runtime/`-ში დაყენება გვერდს უვლის npm-ის გლობალურ კეშს.
- **აგების ხელსაწყოების არარსებობა**: ზოგიერთ გარემოს (კორპორაციული Windows VS Build
  Tools-ის გარეშე, მინიმალური Docker-ის იმიჯები) არ შეუძლია `better-sqlite3`-ის კომპილაცია. შესრულების დროის
  ინსტალატორი npm-ის რეესტრიდან წინასწარ აგებულ ბინარულ ფაილს იღებს; სარეზერვო
  დრაივერები უზრუნველყოფენ, რომ OmniRoute მაინც გაეშვას, თუნდაც ეს პროცესი წარუმატებელი იყოს.
- **ინტერნეტისგან იზოლირებული სისტემები**: თუ npm-ის რეესტრი მიუწვდომელია, `node:sqlite`
  ან `sql.js` საბაზისო ფუნქციონირებას უზრუნველყოფს.

## მაგიური ბაიტების ვალიდაცია

შესრულების დროს დაყენებული `.node` ფაილის ჩატვირთვამდე OmniRoute კითხულობს პირველ 8
ბაიტს და ცნობილ პლატფორმათა მაგიურ მნიშვნელობებს ადარებს:

| პლატფორმა                | ბაიტები (hex) | ჭდე         |
| ------------------------ | ------------- | ----------- |
| Linux                    | `7F 45 4C 46` | `elf`       |
| macOS 64-ბიტიანი BE      | `FE ED FA CF` | `macho`     |
| macOS 64-ბიტიანი LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (უნივერსალური) | `CA FE BA BE` | `macho-fat` |
| Windows                  | `4D 5A` (MZ)  | `pe`        |

შეუსაბამო მაგიური მნიშვნელობა → ფაილი უგულებელყოფილია და სარეზერვო პროცესი შემდეგ საფეხურზე გადადის.

## აქტიური დრაივერის შემოწმება

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ხელით მართვა

```bash
# postinstall-ის წინასწარი მომზადების გამოტოვება (CI-ში სწრაფი დაყენებისთვის)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# შესრულების დროის better-sqlite3-ის იძულებით ხელახლა დაყენება
rm -rf ~/.omniroute/runtime
omniroute  # ხელახლა დაყენდება მომდევნო გაშვებისას

# აქტიური დრაივერის შემოწმება
omniroute config db-info  # (თუ CLI ბრძანება არსებობს)
```

## სინქრონული შეფერხებების დიაგნოსტიკა

`better-sqlite3`-ის გამოყენებისას, გაშვებამდე დააყენეთ `OMNIROUTE_SQLITE_SLOW_MS=200`, რათა
ჩართოთ სინქრონული ადაპტერის დროის გაზომვა. ნაგულისხმევად ეს გამორთულია. დასრულებული ოპერაცია, რომელსაც
მინიმუმ ამდენი მილიწამი სჭირდება, გამოსცემს `[SQLITE-SLOW]` გაფრთხილებას, თითოეული
ადაპტერისთვის არაუმეტეს ერთხელ ათ წამში. გაფრთხილება შეიცავს მხოლოდ დრაივერს, ოპერაციის კლასს
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, ტრანზაქცია ან ტექნიკური მომსახურება) და
გასულ მილიწამებს: არ შეიცავს SQL-ს, დაკავშირებულ მნიშვნელობებს, სტრიქონებს, ბილიკებს ან გამონაკლისის ტექსტს.

ეს არის დიაგნოსტიკური დამხმარე საშუალება და არა დროის ლიმიტი ან მოთხოვნის ოპტიმიზაცია. ის ვერ შეატყობინებს
ოპერაციის შესახებ, რომელიც არასდროს სრულდება, ვერ განასხვავებს CPU-ის სამუშაოს დისკის ლოდინისგან, ვერ განსაზღვრავს
ზუსტ SQL-ს და ვერ დააკვირდება დრაივერის დაუმუშავებელი სახელურის მეშვეობით შესრულებულ ოპერაციებს.
ასინქრონული სარეზერვო ასლის შექმნის ხანგრძლივობა განზრახ გამორიცხულია; SQLite-ის სხვა დრაივერებზე
ეს არჩევითი ინსტრუმენტაცია არ ვრცელდება. ცვლადის გამორთვა აღადგენს თავდაპირველ ადაპტერს
დროის საზომი გარსების გარეშე. მონაცემთა ბაზის სქემა და შენახული კონფიგურაცია არ იცვლება.

`/healthz`-ის დაყოვნების გაფრთხილება ასახავს მოვლენათა ციკლის პიკურ მნიშვნელობას წინა ნიმუშის აღებიდან,
და არა მთელი მუშაობის პერიოდის საშუალო მნიშვნელობას. სანამ შეფერხებას SQLite-ს ან დისკის გაუმართაობას მიაწერთ,
მისი დროის ნიშნულები შეადარეთ ნელი ოპერაციების გაფრთხილებებსა და ჰოსტის/საცავის მეტრიკებს.

## ცნობარი

იმპლემენტაცია:

- `bin/cli/runtime/magicBytes.mjs` — ბინარული მაგიური ბაიტების ვალიდაციის დამხმარე ფუნქციები
- `bin/cli/runtime/sqliteRuntime.mjs` — შესრულების დროის 5-საფეხურიანი განმსაზღვრელი + ზარმაცი ინსტალატორი
- `bin/cli/runtime/index.mjs` — გაშვების ორკესტრატორი (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-ის ინსტალაციის შემდგომი ჰუკი (არაფატალური წინასწარი მომზადება)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ექსპორტები

## ერთი ჩამწერის ტოპოლოგია (HA არ არის მხარდაჭერილი)

ზემოთ აღწერილი დრაივერების სარეზერვო ჯაჭვი კვლავ **ერთ პროცესში** მუშაობს. ნაგულისხმევი SQLite
OmniRoute არის **ერთი ჩამწერი**:

- არ დაუკავშიროთ OmniRoute-ის ორი რეპლიკა ერთსა და იმავე `storage.sqlite` ფაილს.
- კონტეინერის ხელახლა გაშვება, Recreate განთავსება, OOM-ით დასრულება ან HEALTHCHECK-ით ხელახლა გაშვება წყვეტს
  ყველა მიმდინარე SSE სესიას. სტანდარტულ გზაზე სესიების ეტაპობრივი დაცლა არ ხდება.
- ორკესტრატორის სიცოცხლისუნარიანობის შემოწმება, რომელიც ნელ `/healthz`-ს გათიშულად მიიჩნევს, ერთადერთ
  რეპლიკას გააჩერებს. უპირატესობა მიანიჭეთ TCP სიცოცხლისუნარიანობას + HTTP `/healthz` მზადყოფნას. იხილეთ
  [Docker-ის სახელმძღვანელო — ხელმისაწვდომობა](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  და [Kubernetes-ის შემოწმებების რეკომენდაციები](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
