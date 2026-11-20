# Plugin Marketplace (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Əsas istinad mənbəyi:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` və
> `src/app/(dashboard)/dashboard/plugins/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute WordPress üslublu plagin sistemi ilə təchiz olunur. Plaginlər sorğu emalı ardıcıllığına (`onRequest` / `onResponse` / `onError`) və həyat dövrü hadisələrinə (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`) qoşulan, hər birində `plugin.json` manifesti və giriş faylı olan müstəqil qovluqlardır.

**Plagin Marketpleysi** həmin sistemin üzərindəki aşkarlama qatıdır. O, quraşdırıla bilən plaginlərin nəzərdən keçirilə bilən kataloqunu təqdim edir. Standart olaraq kataloq kiçik, daxili ilkin reyestrdən ibarətdir; operator onu fərdi uzaq reyestr URL-inə yönəldə bilər. Bu halda sorğu DNS həllindən istifadə edən SSRF qoruyucusu ilə mühafizə olunur (bax: [Təhlükəsizlik](#security)).

Bütün plagin marşrutları **yalnız loopback üçün əlçatandır** (Səviyyə 1 — `LOCAL_ONLY`): plaginlər alt proseslərdə kod yükləyib icra etdiyinə görə, autentifikasiyadan asılı olmayaraq, marşrutlar loopback olmayan mənbələrdən əlçatmazdır. Bax:
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Necə Uyğundur Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Qeydiyyat təbəqəsi** — `src/lib/plugins/marketplace.ts`: kataloqu sadalayır/axtarır, hər hansı bir nasazlıq olduqda toxum reyestrinə qayıdır.
- **Həyat dövrü təbəqəsi** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): quraşdırmaq, təkmilləşdirmək, aktivləşdirmək, deaktiv etmək, silmək, skan etmək, başlanğıc yükləmə.
- **Manifest təbəqəsi** — `src/lib/plugins/manifest.ts`: Zod sxemi + `plugin.json` üçün defoltdur.
- **Skaner** — `src/lib/plugins/scanner.ts`: plagin kataloqu altında diskdə plaginləri aşkar edir.
- **Yükləyici** — `src/lib/plugins/loader.ts`: hər bir plaqini ayrıca Node.js uşaq prosesində yaradır və IPC üzərindən brokerlər zəngləri bağlayır. Uşaq qum qutusu deyil (aşağıda "Plugin icra təcridinə" baxın).

## Marketpleys Kataloqu

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) `MarketplaceEntry` obyektlərinin siyahısını qaytarır:

| Sahə          | Tip      | Qeydlər                                               |
| ------------- | -------- | ----------------------------------------------------- |
| `name`        | string   | kebab-case formatında plagin adı                      |
| `version`     | string   | semver                                                |
| `description` | string   | Qısa xülasə                                           |
| `author`      | string   | Müəllif / təşkilat                                    |
| `license`     | string   | SPDX üslublu lisenziya identifikatoru                 |
| `downloadUrl` | string   | Mənbənin endirilmə URL-i (boş ola bilər)              |
| `repository`  | string?  | İxtiyari repozitoriya URL-i                           |
| `tags`        | string[] | Axtarış/filtrləmə teqləri                             |
| `downloads`   | number   | Endirmə sayı                                          |
| `rating`      | number   | 0–5                                                   |
| `verified`    | boolean  | Elementin təsdiqlənmiş kimi işarələnib-işarələnməməsi |
| `lastUpdated` | string   | ISO-ya bənzər tarix sətri                             |

Fərdi reyestr URL-i konfiqurasiya edilmədikdə kataloq daxili `SEED_REGISTRY`-dən ibarət olur (hazırda `request-logger`, `rate-limiter`, `cost-tracker` və `theme-manager`). İlkin reyestr həmişə əlçatandır — konfiqurasiya edilmiş uzaq reyestr əlçatmaz olduqda, `200`-dən fərqli status qaytardıqda və ya tanınmayan məzmun qaytardıqda `listMarketplacePlugins()` xəbərdarlıq qeyd edir və ilkin siyahıya geri qayıdır.

> Qeyd: marketpleys **kataloqu** (nəzərdən keçirmə/axtarış) başdan sona inteqrasiya edilib, lakin kataloqdan bir kliklə marketpleys **quraşdırması** hələ həyata keçirilməyib — marketpleys elementindəki idarə panelinin "Quraşdır" düyməsi hazırda "tezliklə" bildirişi göstərir. Hazırda quraşdırma lokal yol vasitəsilə quraşdırma axını (`POST /api/plugins`) və diskdə aşkarlama (`POST /api/plugins/scan`) vasitəsilə həyata keçirilir.

## REST API

Bütün son nöqtələr idarəetmə auth (`requireManagementAuth`) tələb edir** və** yalnız loopback-dir — `/api/plugins` və `/api/plugins/` `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) siyahısında verilmişdir.

| Son nöqtə                        | Metod  | Təsvir                                                                |
| -------------------------------- | ------ | --------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Quraşdırılmış plaginlərin siyahısı (isteğe bağlı `?status=` filtri)   |
| `/api/plugins`                   | POST   | Plugin mənbələri kataloqundan plagin quraşdırın                       |
| `/api/plugins/scan`              | POST   | Plugin kataloqunu skan edin və yeni plaginləri qeyd edin              |
| `/api/plugins/marketplace`       | GET    | Bazar kataloqu girişlərini siyahıya alın                              |
| `/api/plugins/[name]`            | GET    | Quraşdırılmış plagin təfərrüatlarını əldə edin                        |
| `/api/plugins/[name]`            | DELETE | Plugini silin                                                         |
| `/api/plugins/[name]/activate`   | POST   | Aktivləşdirin ( + qeydiyyat qarmaqlarını yükləyin)                    |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiv edin (yanğın `onDeactivate`, qarmaqları qeydiyyatdan çıxarın) |
| `/api/plugins/[name]/config`     | GET    | Plugin konfiqurasiya + konfiqurasiya sxemini əldə edin                |
| `/api/plugins/[name]/config`     | PUT    | Plugin konfiqurasiyasını güncəlləyin (sxemlə təsdiqlənib)             |

`GET /api/plugins` `status` filtri `installed` / `active` / `inactive` / `error`-dan birini qəbul edir. Yanlış dəyər `400` qaytarır.

### Quraşdırılmış plaginləri sadalayın

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Yerli yoldan quraşdırın

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` bir olmalıdır** mütləq** qovluğa gedən yol** plugin mənbələri qovluğunda** : `plugin-sources` plugin kökünün yanındadır, buna görə defolt olaraq `~/.omniroute/plugin-sources/` və ya dəyişən təyin edildikdə `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Əvvəlcə plaqini kopyalayın və ya klonlayın. Yolda `..` və ya null bayt olduqda, həmin kataloqdan kənarda olduqda, simvolik keçid vasitəsilə onun xaricində həll edildikdə, hədəfi ondan kənarda olan simvolik əlaqə olduqda və ya kataloq mövcud olmadıqda quraşdırma `400` ilə rədd edilir. Mənbə kataloqunda etibarlı `plugin.json` olmalıdır (yaxud birinin valideyni olmalıdır). Uğurla cavab quraşdırılmış plagin sırası ilə `201` dir.

Digər plagin marşrutlarından fərqli olaraq, bu, giriş deaktiv olduqda belə idarəetmə etimadnaməsini (baxış paneli seansı və ya idarə olunan API açarı) tələb edir (`requireLogin=false`): kodu quraşdırmaq heç vaxt anonim əməliyyat deyil.

### Bazara göz atın

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Plugin konfiqurasiyasını yeniləyin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` hər bir təqdim edilmiş dəyəri plaqinin `configSchema` (manifestdə elan edilmiş) ilə təsdiqləyir: `number` sahələri honor `min`/`max`, `select` sahələri elan edilmiş `enum` ilə uyğun olmalıdır. Sxemdə olmayan açarlara icazə verilir.

## Konfiqurasiya

### Plagin kataloqu

Plaginlər OmniRoute məlumat kataloqunda yerləşir:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (və ya manifest.main-ın göstərdiyi fayl)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) həmin kataloqu üç mərhələdə müəyyən edir:

1. **`OMNIROUTE_PLUGINS_DIR`**, təyin edildikdə — `HOME` dəyərindən asılı olmayaraq olduğu kimi istifadə edilir. Bu, plagin ağacının adətən konteynerin ev kataloqu ilə heç bir əlaqəsi olmayan yola bind-mount edildiyi Docker/K8s üçün açıq idarəetmə parametridir (#11827).
2. `<home>/.omniroute/plugins`, burada `<home>` `HOME` / `USERPROFILE` mühit dəyişənlərindən əldə edilir.
3. Proses heç bir ev kataloqu ixrac etmədikdə `/tmp/.omniroute/plugins`.

Müəyyən edilmiş kataloq başlanğıc zamanı `scanner.dir_resolved` kimi bir dəfə jurnala yazılır və hansı girişin üstün gəldiyi (`OMNIROUTE_PLUGINS_DIR`, `home` və ya `no-home-fallback`) göstərilir — beləliklə, səssizcə 3-cü mərhələyə keçən obraz yalnız boş plagin siyahısı bildirmək əvəzinə bunu açıq şəkildə göstərir.
`POST /api/plugins/scan` orada etibarlı `plugin.json` saxlayan istənilən alt kataloqu aşkarlayır və qeydiyyata alır; həmin kataloq eyni zamanda `pluginManager.install()` metodunun plaginləri köçürdüyü kökdür, buna görə də dəyərin dəyişdirilməsi aşkarlama və quraşdırmanı birlikdə başqa yerə daşıyır.

> **`OMNIROUTE_PLUGINS_DIR`, `OMNIROUTE_PLUGIN_PATH` deyil.** Sonuncu yalnız
> `omniroute` alt əmrləri əlavə edən `omniroute-cmd-*` npm paketlərini tapmaq üçün
> CLI əmr-plağini yükləyicisi (`bin/cli/plugins.mjs`) tərəfindən oxunur — onun burada təsvir edilən icra zamanı skanerinə heç bir təsiri yoxdur. Bu tərəf haqqında məlumat üçün [PLUGINS.md](./PLUGINS.md) sənədinə baxın.

### Fərdi marketpleys reyestrinin URL-i

Marketpleys kataloqunun mənbəyi `pluginMarketplaceUrl` parametrindən oxunur
(`src/lib/plugins/marketplace.ts` faylı `settings.pluginMarketplaceUrl` dəyərini oxuyur). Bu parametr `http(s)` URL-i olaraq təyin edildikdə, `listMarketplacePlugins()` həmin URL-i əldə edir və ya üst səviyyəli JSON qeydlər massivini, ya da `plugins` massivi olan obyekti qəbul edir; sətir tipli `name` dəyəri olmayan qeydlər filtrlənir. Parametr təyin edilmədikdə (və ya sorğu SSRF qorumasından keçmədikdə / yanlış cavab qaytardıqda) daxili ilkin reyestrdən istifadə olunur.

İdarəetmə panelindəki "Marketplace" tabı bu URL üçün sahə təqdim edir (dəyər
`GET /api/settings` vasitəsilə geri oxunur).

> İcra qeydi: idarəetmə panelindəki "Save" əməliyyatı
> `pluginMarketplaceUrl` dəyərini `PATCH /api/settings` son nöqtəsinə göndərir. Yazı zamanı bu
> açar `updateSettingsSchema` daxilində elan edilməyib
> (`src/shared/validation/settingsSchemas.ts`), buna görə də ona etibar etməzdən əvvəl buraxılışınızda dəyərin saxlanmasını yoxlayın — açar parametrlər anbarında mövcud olduqdan sonra **oxuma** yolu (`getSettings()` →
> `listMarketplacePlugins()`) onu nəzərə alır.

## Təhlükəsizlik

### Yalnız marşrut səviyyəsi — geri dönmə

Pluginlər kodu yaranmış uşaq proseslərdə icra edir, buna görə də bütün `/api/plugins` səthi `LOCAL_ONLY` (Tier 1) təsnif edilir. Geri dönmə tətbiqi qeyd-şərtsiz işləyir** əvvəl** hər hansı auth yoxlanışı, buna görə də tunel üzərindən qutuya çatan sızmış idarəetmə nişanı hələ də plaqini quraşdıra, aktivləşdirə və ya silə bilməz. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) və Sərt Qaydalara baxın #15 / #17.

### Marketplace reyestrinin SSRF mühafizəçisi

Fərdi reyestr URL təcavüzkar tərəfindən təsirlənən konfiqurasiyadır, ona görə də onu götürməzdən əvvəl `listMarketplacePlugins()` onu iki təbəqədən keçir:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` olmayan hər şeyi rədd edir.
   - Hərfi private/loopback/link-local/ULA hostlarını rədd edir (IPv4** və** IPv6, o cümlədən IPv4-mapped) kanonik `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`) vasitəsilə.
   - Həll edir** hər ikisi** `A` və `AAAA` qeyd edir və əgər rədd edir** hər hansı** həll edilən ünvan özəl — dir, ümumi host adı → şəxsi IP keçidini bağlayır.
   - **Uğursuzluq bağlandı** : DNS həlli uğursuzluğu URL ni rədd edir.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): yalnız ictimai URL qoruyucunu gətirmə vaxtı və yenidən tətbiq edir** yönləndirmələri bloklayır** (ictimai → özəl `30x` pivotu yoxdur).

Hər iki təbəqəni uğursuz edən URL sorğunu dayandırmır — bazar yeri səssizcə daxili toxum reyestrinə qayıdır və xəbərdarlıq edir.

> Bu qoruyucu xüsusi olaraq A + AAAA həll etmək və IPv4-only çeki əvəzinə kanonik `isPrivateHost` istifadə etmək üçün PR #3774 -də sərtləşdirilmişdir.

### Plugin icra izolyasiyası

> **Pluginlər qum qutusuna daxil edilməyib.** Uşaq OmniRoute istifadəçisi kimi işləyən, VM konteksti və Node.js icazə bayraqları olmayan adi Node.js prosesidir, ona görə də plagin kodu istifadəçinin bacardığı istənilən faylı oxuya və yaza, proqramları işlədə və şəbəkəyə daxil ola bilər. `requires.permissions` yalnız uşağın hansı mühit dəyişənlərini alacağına qərar verir; digər icazələr tətbiq edilmir. Yalnız etibar etdiyiniz plaginləri quraşdırın. Aşağıdakı proses sərhədində qəzalar və asılmalar var; təhlükəsizlik sərhədi deyil.

- **Prosesin izolyasiyası** — `loadPlugin()` (`src/lib/plugins/loader.ts`) hər bir plaqini ayrıca Node.js uşaq prosesində yaradır və IPC üzərindən əlaqə qurur. Hook zənglərində `SIGTERM` → `SIGKILL` eskalasiyası ilə vaxt aşımı var.
- **Env icazə siyahısı** — uşaq yalnız icazə verilmiş ətraf mühit dəyişənləri dəstini alır; daha geniş dəst yalnız manifest `env` icazəsi tələb etdikdə verilir.
- **Mənbə mühafizəsini quraşdırın** — `POST /api/plugins` yalnız plagin mənbələri kataloqundan oxuyur (bax: "Yerli yoldan quraşdırma"): yol `realpath` ilə kanonikləşdirilib, ciddi şəkildə həmin kataloqun daxilində qalmalıdır və ondan qaçan simvolik keçidi daşıyan mənbə ağacı hər hansı bir şey kopyalanmazdan əvvəl rədd edilir.
- **Yolun tutulması** — install/upgrade/uninstall təsdiq edir ki, plagin kataloqu və `manifest.main` həll edir** daxilində** hər hansı nüsxə və ya rekursiv silinmədən əvvəl idarə olunan plagin kökü ( `manifest.main` DB yollarının dəyişdirilməsi və `../` keçidindən qoruyur). Aktivləşdirmə `realpath` vasitəsilə simvolik əlaqələri həll edir və plagin kataloqundan qaçan giriş nöqtəsini yükləməkdən imtina edir.
- **İsteğe bağlı bütövlük pin** — manifest `integrity` (`sha256-<base64>`, SRI formatı) sahəsini elan edə bilər. Mövcud olduqda, yükləyici yükləmə zamanı giriş faylının hashini yoxlayır və uyğunsuzluq zamanı aktivləşdirməkdən imtina edir. Bu, müdaxilənin aşkarlanmasıdır,** yox** təhlükəsizlik sərhədi: yüklənmiş plaqinin edə biləcəyini məhdudlaşdırmır.
- **Qarmaqlarda müştəri etimadnaməsi yoxdur** — `onRequest`, `onResponse` və `onError` -ə ötürülən kontekstdə `authorization`, `x-api-key`, `proxy-authorization` və `cookie` başlıqları silinib və API açar qeydi heç bir açar dəyəri daşımır ( `src/lib/plugins/hooks.ts`-da `redactPluginContext()` ).

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) tərəfindən təsdiq edilmişdir:

| Sahə               | Növ       | Qeydlər                                                                   |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `name`             | simli     | Tələb olunur; kabab qabı (`^[a-z0-9-]+$`), 1–100 simvol                   |
| `version`          | simli     | Tələb olunur; semver (`MAJOR.MINOR.PATCH`)                                |
| `description`      | simli?    | ≤ 500 simvol                                                              |
| `author`           | simli?    | ≤ 200 simvol                                                              |
| `license`          | simli?    | Defolt olaraq `MIT`                                                       |
| `main`             | simli?    | Giriş faylı; defolt olaraq `index.js`                                     |
| `source`           | enum?     | `local` \| `marketplace` (defolt olaraq `local`)                          |
| `tags`             | string[]? | Axtarış etiketləri                                                        |
| `requires`         | obyekt?   | `{ omniroute?, permissions[] }`                                           |
| `hooks`            | obyekt?   | Pluginin hansı qarmaqları tətbiq etdiyini bildirən Booleanlar             |
| `skills`           | obyekt[]? | Könüllü bacarıq tərifləri                                                 |
| `enabledByDefault` | boolean?  | Quraşdırma zamanı avtomatik aktivləşdirin                                 |
| `configSchema`     | obyekt?   | Konfiqurasiya sahələrinin xəritəsi (`string`/`number`/`boolean`/`select`) |
| `integrity`        | simli?    | Könüllü `sha256-<base64>` giriş faylı pin                                 |

İcazələr `network` / `file-read` / `file-write` / `env` / `exec` enumundan götürülür. Yalnız `env` iş vaxtı effektinə malikdir (uşaq üçün bir az daha böyük mühit dəyişkənliyinə icazə verilən siyahı); digərləri bəyannamədir və icra olunmur.

## Həyat dövrü axını

```
quraşdırma (POST /api/plugins, yol)
  → manifesti skan et/yoxla → mərhələləmə sahəsinə kopyala → əsas faylın qovluq daxilində olduğunu təsdiqlə
  → atomik şəkildə ~/.omniroute/plugins/<name> ünvanına köçür → verilənlər bazasına sətir əlavə et
  → onInstall hadisəsini işə sal → əgər enabledByDefault: aktivləşdir

aktivləşdirmə (POST /api/plugins/{name}/activate)
  → realpath üzrə qovluq daxilində olma yoxlaması → loadPlugin() (alt proses başlat)
  → elan edilmiş hukları qeydiyyatdan keçir → status = "active" → onActivate hadisəsini işə sal

deaktivləşdirmə (POST /api/plugins/{name}/deactivate)
  → onDeactivate hadisəsini işə sal (qeydiyyatdan çıxarmazdan ƏVVƏL) → hukları qeydiyyatdan çıxar
  → alt prosesi dayandır → status = "inactive"

silmə (DELETE /api/plugins/{name})
  → aktivdirsə deaktivləşdir → onUninstall hadisəsini işə sal
  → plagin qovluğunu qovluq daxilində olma yoxlaması ilə rekursiv sil → verilənlər bazası sətrini sil
```

Manifest versiyası quraşdırılmış versiyadan **ciddi şəkildə daha yeni** olan
qovluq üçün `install` əməliyyatının yenidən icrası avtomatik təkmilləşdirmə həyata
keçirir (təmiz yenidən quraşdırma; konfiqurasiya standart dəyərlərə sıfırlanır).
Eyni və ya daha köhnə versiya rədd edilir.

## Verilənlər bazası

`plugins` cədvəli (`076_create_plugins.sql` miqrasiyası):

| Sütun           | Növ     | Qeydlər                                                |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Unikal                                                 |
| `version`       | TEXT    | semver; standart `1.0.0`                               |
| `description`   | TEXT    | İxtiyari                                               |
| `author`        | TEXT    | İxtiyari                                               |
| `license`       | TEXT    | Standart `MIT`                                         |
| `main`          | TEXT    | Giriş faylı; standart `index.js`                       |
| `source`        | TEXT    | Standart `local`                                       |
| `tags`          | TEXT    | JSON massivi; standart `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; standart 0                                        |
| `manifest`      | TEXT    | Tam manifest JSON-u                                    |
| `config`        | TEXT    | JSON; standart `{}`                                    |
| `config_schema` | TEXT    | JSON; standart `{}`                                    |
| `hooks`         | TEXT    | Elan edilmiş huk adlarının JSON massivi; standart `[]` |
| `permissions`   | TEXT    | JSON massivi; standart `[]`                            |
| `plugin_dir`    | TEXT    | Mütləq quraşdırma qovluğu                              |
| `error_message` | TEXT    | `status = "error"` olduqda təyin edilir                |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Aktivləşdirmə zamanı təyin edilir                      |

Plagin metrikaları/analitikası əlavə cədvəllərdə izlənilir
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## İdarə paneli

`/dashboard/plugins` -da (`src/app/(dashboard)/dashboard/plugins/page.tsx`) idarə paneli səhifəsi iki nişanı təmin edir:

- **Quraşdırılıb** — elan edilmiş qarmaqları, activate/deactivate keçidi, silmə düyməsi və "Pluginləri skan et" əməliyyatı (`POST /api/plugins/scan`) ilə quraşdırılmış plaginləri siyahıya alır.
- **Bazar yeri** — URL xüsusi reyestrini təyin etmək üçün sahə ilə `GET /api/plugins/marketplace` dən kataloqu göstərir.

Səhifədə həmişə plaginlərin OmniRoute prosesinin tam imtiyazları ilə işlədiyi barədə xəbərdarlıq göstərilir.

Hər plagin konfiqurasiya səhifəsi `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`) üzərində yaşayır.

## Həmçinin baxın

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` marşrutunun niyə yalnız loopback üçün əlçatan olduğu (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — əlaqəli bacarıqlar çərçivəsi
  (`src/lib/skills/`); plaginlər öz manifestlərində bacarıqları elan edə bilər
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hadisələr əsasında işləyən çıxış
  inteqrasiyaları
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  hər bir plagin marşrutunun xəta cavabları üçün istifadə etdiyi `buildErrorBody()` nümunəsi
