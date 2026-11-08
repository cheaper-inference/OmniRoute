# SQLite Runtime Resolution (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute işə salınarkən SQLite drayverini 5 mərhələli ehtiyat keçid zənciri vasitəsilə müəyyən edir:

1. **Paketə daxil edilmiş `better-sqlite3`** (`package.json` daxilindəki `dependencies` vasitəsilə)
   — ən sürətli variantdır, yerli ikili fayldan istifadə edir və qurma alətləri mövcud olduqda `npm install` tərəfindən quraşdırılır.

2. **İcra zamanı quraşdırılan `better-sqlite3`** (`~/.omniroute/runtime/` daxilində)
   — ilk işə salınma zamanı **VƏ YA** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` tərəfindən təxirə salınaraq quraşdırılır.
   Yükləməzdən əvvəl yerli `.node` faylının magic baytlarını (ELF / Mach-O / PE) yoxlayaraq
   zədələnmiş və ya yanlış platformaya aid ikili fayllardan qoruyur.

3. **`node:sqlite`** (Node ≥22.5 standart kitabxanası) — yerli qurma tələb etmir; hər iki
   better-sqlite3 yolu uğursuz olduqda istifadə edilir. Məhdud funksiyalar dəstinə malikdir.

4. **`sql.js`** (WASM) — son ehtiyat variantdır. Hər yerdə işləyir, lakin daha yavaşdır
   və məlumatları sinxron şəkildə deyil, müəyyən intervallarla yazır.

## Bu mürəkkəblik nə üçün lazımdır?

- **Windows EBUSY**: Əvvəlki versiyanın `better_sqlite3.node` faylı işləyən proses
  tərəfindən kilidlənibsə, `npm install -g omniroute@latest` uğursuz ola bilər. İcra zamanı
  `~/.omniroute/runtime/` daxilində quraşdırma qlobal npm keşindən yan keçir.
- **Qurma alətlərinin olmaması**: Bəzi mühitlər (VS Build Tools olmayan korporativ Windows
  sistemləri, minimal Docker təsvirləri) `better-sqlite3` paketini kompilyasiya edə bilmir. İcra zamanı
  quraşdırıcı npm reyestrindən əvvəlcədən qurulmuş ikili faylı əldə edir; ehtiyat
  drayverlər isə bu proses uğursuz olsa belə OmniRoute-un işə düşməsini təmin edir.
- **Şəbəkədən təcrid olunmuş sistemlər**: npm reyestri əlçatmazdırsa, `node:sqlite`
  və ya `sql.js` baza funksionallığına zəmanət verir.

## Magic baytların yoxlanması

İcra zamanı quraşdırılmış `.node` faylını yükləməzdən əvvəl OmniRoute ilk 8
baytı oxuyur və onları məlum platforma magic baytları ilə müqayisə edir:

| Platforma             | Baytlar (hex) | Etiket      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Magic baytlar uyğun gəlmədikdə → fayl nəzərə alınmır və ehtiyat keçid növbəti mərhələdən davam edir.

## Aktiv drayverin yoxlanması

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Əl ilə idarəetmə

```bash
# Sürətli CI quraşdırmaları üçün postinstall hazırlığını keç
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# İcra zamanı istifadə edilən better-sqlite3 paketini məcburi şəkildə yenidən quraşdır
rm -rf ~/.omniroute/runtime
omniroute  # növbəti işə salınmada yenidən quraşdırılacaq

# Hansı drayverin aktiv olduğunu yoxla
omniroute config db-info  # (CLI əmri mövcuddursa)
```

## Sinxron ləngimələrin diaqnostikası

`better-sqlite3` ilə sinxron adapter vaxt ölçməsini aktivləşdirmək üçün işə salmazdan əvvəl
`OMNIROUTE_SQLITE_SLOW_MS=200` təyin edin. Standart olaraq bu funksiya deaktivdir. Tamamlanmış
əməliyyat ən azı göstərilən sayda millisaniyə çəkdikdə hər adapter üçün ən çoxu on saniyədə
bir dəfə `[SQLITE-SLOW]` xəbərdarlığı yaradılır. Xəbərdarlıq yalnız drayveri, əməliyyat sinfini
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, tranzaksiya və ya texniki xidmət) və
keçən millisaniyə sayını ehtiva edir: SQL, bağlamalar, sətirlər, yollar və ya istisna mətni daxil edilmir.

Bu, taymaut və ya sorğu optimallaşdırması deyil, diaqnostik köməkçi vasitədir. O, heç vaxt
geri qayıtmayan əməliyyat barədə məlumat verə, CPU işini disk gözləmələrindən fərqləndirə, dəqiq
SQL-i müəyyən edə və ya xam drayver handle-i vasitəsilə yerinə yetirilən əməliyyatları müşahidə
edə bilməz. Asinxron ehtiyat nüsxələmənin müddəti qəsdən istisna edilir; digər SQLite drayverləri
bu seçimlə instrumentasiya edilmir. Dəyişənin deaktiv edilməsi vaxt ölçmə örtükləri olmadan
orijinal adapteri bərpa edir. Verilənlər bazası sxemində və ya saxlanmış konfiqurasiyada heç bir dəyişiklik edilmir.

`/healthz` gecikmə xəbərdarlığı bütün işləmə müddətinin ortalamasını deyil, əvvəlki nümunədən
bəri hadisə dövrəsinin pik göstəricisini bildirir. Ləngiməni SQLite və ya disk nasazlığı ilə
əlaqələndirməzdən əvvəl onun zaman nişanlarını yavaş əməliyyat xəbərdarlıqları və host/yaddaş
metrikləri ilə tutuşdurun.

## İstinad

İmplementasiya:

- `bin/cli/runtime/magicBytes.mjs` — ikili faylların magic baytlarını yoxlamaq üçün köməkçi funksiyalar
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 mərhələli icra zamanı müəyyənləşdirici + təxirə salınmış quraşdırıcı
- `bin/cli/runtime/index.mjs` — işəsalma orkestratoru (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm quraşdırmadan sonrakı hook-u (kritik olmayan hazırlıq)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ixracları

## Tək-yazıcı topologiyası (HA dəstəklənmir)

Yuxarıdakı drayver ehtiyat keçid zənciri yenə də **bir prosesdə** işləyir. Standart SQLite
ilə OmniRoute **tək yazıcıdır**:

- İki OmniRoute replikasını eyni `storage.sqlite` faylına qoşmayın.
- Konteynerin yenidən başladılması, Recreate yerləşdirməsi, OOM səbəbilə dayandırılması və ya HEALTHCHECK tərəfindən yenidən başladılması
  icrada olan bütün SSE sessiyalarını kəsir. Standart yolda sessiyaların mərhələli bağlanması yoxdur.
- Yavaş `/healthz` cavabını dayanmış vəziyyət kimi qəbul edən orkestrator liveness yoxlaması yeganə
  replikanı dayandıracaq. TCP liveness + HTTP `/healthz` readiness yoxlamalarına üstünlük verin. Baxın:
  [Docker Təlimatı — əlçatanlıq](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  və [Kubernetes probe tövsiyələri](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
