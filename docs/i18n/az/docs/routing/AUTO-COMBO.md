# OmniRoute Auto-Combo Engine (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **İstifadəçilər üçün**: Sürətli başlanğıc axtarırsınız? Sadə izahlar və nümunələr üçün [Auto-Combo İstifadəçi Təlimatına](../getting-started/AUTO-COMBO-GUIDE.md) baxın.

> Adaptiv qiymətləndirmə + sıfır konfiqurasiyalı avtomatik marşrutlaşdırma ilə özünü idarə edən model zəncirləri

## Sıfır konfiqurasiyalı avtomatik marşrutlaşdırma (`auto/` prefiksi)

> **YENİ:** Kombinasiya yaratmağa ehtiyac yoxdur. İstənilən klientdə birbaşa `auto/` prefiksindən istifadə edin.

### Sürətli nümunələr

| Model ID-si    | Variant | Davranış                                                                                |
| -------------- | ------- | --------------------------------------------------------------------------------------- |
| `auto`         | default | Bütün qoşulmuş provayderlər, LKGP strategiyası, balanslaşdırılmış çəkilər               |
| `auto/coding`  | coding  | Keyfiyyət prioritetli çəkilər, kod yaratmaq üçün uyğundur                               |
| `auto/fast`    | fast    | Aşağı gecikmə əsasında çəkili seçim                                                     |
| `auto/cheap`   | cheap   | Xərc baxımından optimallaşdırılmış marşrutlaşdırma (əvvəlcə ən aşağı xərc)              |
| `auto/offline` | offline | Ən yüksək kvota əlçatanlığına malik provayderlərə üstünlük verir                        |
| `auto/smart`   | smart   | Daha yaxşı model kəşfi üçün keyfiyyət prioriteti + daha yüksək araşdırma dərəcəsi (10%) |
| `auto/lkgp`    | lkgp    | Açıq şəkildə LKGP (standart `auto` ilə eynidir)                                         |
| `auto/chaos`   | chaos   | Paralel yayım, hər provayder üçün bir model (xəta inyeksiyası deyil)                    |

### Kateqoriya × Səviyyə kompozisiyası (`auto/<category>:<tier>`)

OpenRouter üslublu suffikslər **marşrutun hansı növdə olduğunu** (kateqoriya) **onun necə optimallaşdırılmasından** (səviyyə) ayırır, beləliklə onları sərbəst şəkildə birləşdirə bilərsiniz (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kateqoriyalar** (namizədlər hovuzunu imkanlara görə filtrləyir): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` görüntü imkanlı modelləri saxlayır; `reasoning` məntiqi əsaslandırma/düşünmə modellərini saxlayır.
- **Səviyyələr** (qiymətləndirmə çəkilərini / hovuz filtrini seçir): `fast` (sürətli çatdırılma) · `cheap` (`floor` aliası, xərcə qənaət) · `reliable` (dövrə kəsicisinin sağlamlığı + gecikmə sabitliyi) · `free` / `pro` (`classifyTier` vasitəsilə hovuzu model səviyyəsinə görə filtrləyir — pulsuz səviyyə ilə premium arasında).

| Nümunə                 | Nəticə                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `auto/coding:fast`     | kodlaşdırma hovuzu, aşağı gecikmə çəkiləri                                             |
| `auto/coding:cheap`    | kodlaşdırma hovuzu, xərc baxımından optimallaşdırılmış (`auto/coding:floor` aliasıdır) |
| `auto/reasoning:pro`   | yalnız məntiqi əsaslandırma/düşünmə modelləri, premium səviyyə                         |
| `auto/vision`          | görüntü imkanlı modellər (səviyyə yoxdur → balanslaşdırılmış çəkilər)                  |
| `auto/multimodal:free` | multimodal imkanlı modellər, yalnız pulsuz səviyyə                                     |

İstənilən etibarlı `auto/<category>[:<tier>]` tələb əsasında həll olunur; seçilmiş bir alt çoxluq `/v1/models` daxilində və idarəetmə panelində elan edilir (`open-sse/services/autoCombo/builtinCatalog.ts` daxilində `AUTO_SUFFIX_VARIANTS`). Filtrləmə **uğursuzluqda açıqdır** — məhdudiyyət heç bir qoşulmuş modellə uyğun gəlməzsə, marşrutlaşdırmanın heç vaxt pozulmaması üçün tam hovuz istifadə olunur. Əsas qiymətləndirici (`combo.ts`) dəyişməz qalır; kateqoriya/səviyyə filtri `buildAutoCandidates` daxilində tətbiq edilir.

> **Canlı model analitikası:** `ARENA_ELO_SYNC_ENABLED` bayrağı aktiv olduqda avtomatik marşrutlaşdırmanın uyğunluğu canlı **Arena ELO** reytinqləri + **models.dev** səviyyə məlumatları əsasında müəyyən edilir (əks halda statik uyğunluq xəritəsinə geri qayıdır).

**İstifadə qaydası:**

```bash
# OpenAI formatını dəstəkləyən istənilən IDE və ya CLI aləti
Baza URL-i: http://localhost:20128/v1
API açarı:  <your-endpoint-key>

# Kodunuzda/konfiqurasiyanızda modeli belə təyin edin:
model: "auto"                 # balanslaşdırılmış standart
model: "auto/coding"          # kodlaşdırma tapşırıqları üçün ən yaxşısı
model: "auto/fast"            # mövcud olan ən sürətli
model: "auto/cheap"           # hər token üzrə ən ucuz
```

**Nə baş verir:**

1. OmniRoute `src/sse/handlers/chat.ts` daxilində `auto/` prefiksini aşkarlayır
2. Verilənlər bazasından bütün **aktiv provayder bağlantılarını** sorğulayır
3. Etibarlı etimadnamələri (API açarı və ya OAuth tokeni) olanları filtrləyir
4. Hər bağlantı üzrə modeli müəyyən edir (`connection.defaultModel` və ya provayderin ilk modeli)
5. Yaddaşda **virtual kombinasiya** qurur (DB-də saxlanılmır)
6. Seçilmiş variantın çəki profili + LKGP strategiyası ilə marşrutlaşdırır

**Əsas xüsusiyyətlər:**

- ✅ **Həmişə aktiv:** Heç bir keçid, kombinasiya yaratma və ya konfiqurasiya tələb olunmur
- ✅ **Dinamik:** Cari qoşulmuş provayderləri avtomatik əks etdirir
- ✅ **Sessiya bağlılığı:** LKGP son uğurlu provayderin prioritetləşdirilməsini təmin edir
- ✅ **Çoxhesablılığı nəzərə alır:** Hər provayder bağlantısı ayrıca namizədə çevrilir
- ✅ **DB-yə yazı yoxdur:** Virtual kombinasiya yalnız sorğu müddətində mövcuddur, saxlanma üçün əlavə xərc sıfırdır

### Hər açar üzrə namizəd nəzarəti (#7819, Səviyyə 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = `auto/` sonrasındakı suffiks və ya
əsas kanal üçün literal `auto`) mövcud dayanıqlılıq oxumalarından istifadə edərək
(heç vaxt xam kəsici `state` deyil), `auto/*` kanalının canlı əlçatanlıq məlumatları
ilə zənginləşdirilmiş cari namizədlər hovuzunu sadalayan **yalnız oxuma** son nöqtəsidir:

- provayder dövrə kəsicisi — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- bağlantının soyuma müddəti — həll edilmiş `provider_connections` sətrindəki
  `rateLimitedUntil` / `testStatus`
- model bloklanması — `isModelLocked(provider, connectionId, model)`

Hər namizəd həmçinin bu API açarının `excluded` bayrağını daşıyır. İstisnalar
hər API açarı üzrə saxlanılır (`auto_candidate_overrides` cədvəli, `128` miqrasiyası) —
OmniRoute `users` cədvəli olmayan tək icarəçili sistemdir, buna görə də `apiKeyId`
real çağırışçı identifikasiyasına ən yaxın seçimdir — və saf, vahid testlərlə sınaqdan
keçirilmiş `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`)
vasitəsilə `open-sse/services/autoCombo/virtualFactory.ts` daxilində namizəd hovuzunun
dar keçid nöqtəsində tətbiq edilir. Filtr **uğursuzluqda açıqdır**: təyin edilməmiş
apiKeyId/kanal və ya DB axtarış xətası hovuzu filtrsiz saxlayır; beləliklə, heç bir
əvəzləmə konfiqurasiya etməmiş operator üçün marşrutlaşdırma bu funksiyadan əvvəlki
vəziyyətlə bayt səviyyəsində tam eyni qalır.

**Sonrakı məsələyə təxirə salınıb:** namizəd üzrə çəkilər + açıq sıralama (Səviyyə 3
— mövcud çəkili/prioritet strategiya yollarına daxil edilir) və hər `auto/*` kanalı üçün konkret
`combo.ts` strategiyasının sabitlənməsi (Səviyyə 4). Tək tenantlı model nəzərə alınmaqla,
əvəzləmələrin hər API açarı üzrə qalmalı, yoxsa qlobal olmalı olduğu barədə açıq sual üçün #7819 planına baxın.

**Pərdə arxasında:**

```txt
Sorğu: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts prefiksi aşkarlayır
   ↓
createVirtualAutoCombo('coding') → aktiv bağlantılardan candidatePool
   ↓
handleComboChat (saxlanılan kombinasiyalarla eyni mühərrik)
   ↓
Avtomatik qiymətləndirmə hər sorğu üçün ən yaxşı provayderi/modeli seçir
```

**İcra faylları:**

| Fayl                                                      | Məqsəd                                                   |
| --------------------------------------------------------- | -------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefiks analizatoru (`parseAutoPrefix`)                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Virtual `AutoComboConfig` obyektləri yaradır             |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Provayder reyestrini imitasiya etmək üçün test mexanizmi |
| `src/sse/handlers/chat.ts`                                | İnteqrasiya: auto prefiksi üzrə qısaqapanma              |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` sistem qeydi                     |

## Saxlanmış Avtomatik kombinlər üçün hesab tərcihləri

Ağıllı Avto redaktor isteğe bağlı təklif edir** Hesab üstünlükləri** bölmə. Hər bir əlaqə Üstünlüklü, Normal (standart), Ehtiyat və ya Xaric edilə bilər. Birdən çox əlaqə bir səviyyəni paylaşa bilər. Avtomatik birinci uyğun səviyyə daxilində scoring/router davranışını saxlayaraq seçir; uğursuz cəhdlər qalan konkret hesablara düşür, ehtiyatdan əvvəl normaldan əvvəl üstünlük verilir. İstisna edilən bağlantılar bu kombin tərəfindən heç vaxt istifadə edilmir.

Parametr `config.accountPreferences` kimi saxlanılır, ID bağlantısı ilə açar:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

Buraxılmış və ya boş xəritə mövcud marşrutu saxlayır. Tərcihlər deaktiv edilmiş əlaqələri aktivləşdirmir, API açarı girişi vermir, kvota ilə bloklanmış namizədləri bərpa etmir və ya büdcə yoxlamalarını keçmir. Hər cəhd onun konkret əlaqəsi ilə məhdudlaşır, ona görə də hesabın geri qaytarılması kombo marşrutlaşdırıcının arxasına keçə bilməz. Mövcud sessiya yaxınlığı uyğun hesabı saxlaya bilər; yerli növbəyə bağlı hesab istisna olmaqla, hesabları səssizcə dəyişmək əvəzinə dönən dayanacaqlar.

Konfiqurasiya edilmiş üstünlüklər hesabdan xəbərdar olan Avto yolundan istifadə edir: bağlanmamış kontekst-keş, smart-pipeline, xaos və kölgə qısa yolları göndərilmir. Spekulyativ hedcinq bu sorğular üçün deaktiv edilib, ona görə də ehtiyat hesablar üstünlük verilən hesablarla yarışa bilməz. Digər kombinasiya strategiyaları bu parametri şərh etmir. Kombo-nun Avtomatikdən uzağa dəyişdirilməsi daha sonra geriyə keçid üçün yadda saxlanmış üstünlükləri saxlayır.

## Real Model Id-si ilə Uyğun Gələn Combo Adları

`name` dəyəri prefikssiz model id-si ilə eyni olan combo (məsələn, `gpt-5.5`
adlı combo) xəta deyil, **qəsdən yaradılmış və dəstəklənən nümunədir**: bu,
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940)-da sənədləşdirilmiş
hər model id-si üzrə provayderə ehtiyat keçid mexanizmidir. Combo həlli
prefikssiz model id-sinin həllindən əvvəl yoxlanıldığına görə
(`src/sse/services/model.ts` faylındakı `getComboForModel()`), prefikssiz
`gpt-5.5` id-si üçün sorğu birbaşa tək provayderə deyil, combo-nun hədəfləri
(məsələn, `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) vasitəsilə
yönləndirilir — bu, [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227)
üçün yaradılmış combo-nun yenidən yazmadan əvvəl gəlməsi prioritetindən təkrar
istifadə edir və `tests/unit/responses-combo-resolution-3227.test.ts` və
`tests/unit/combo-name-codex-responses-rewrite.test.ts` vasitəsilə reqressiya
testindən keçirilir.

Real model id-sini kölgədə qoyan ada malik combo yaratmaq və ya combo-nun adını
belə bir ada dəyişmək **heç vaxt rədd edilmir** — bunu etmək sənədləşdirilmiş
iş axınını pozardı. Bunun əvəzinə (#8530), (yeni) ad real model id-si ilə
toqquşduqda `POST /api/combos` və `PUT /api/combos/[id]` cavaba əməliyyatı
bloklamayan `warning` sahəsi əlavə edir:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

İşəsalma zamanı `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) həmçinin model id-sini kölgədə qoyan bütün
mövcud combo-ları sadalayan birsətirlik `[STARTUP]` xəbərdarlığını jurnala
yazır; beləliklə, bunu qəsdən deyil (#6940-da göstərildiyi kimi), təsadüfən
edən operatorlar xəbərdar edilir. Aşkarlama köməkçisi
`src/lib/combos/modelNameCollision.ts` faylında yerləşir.

## Müştəridən Fərdi Combo-nun Çağırılması

Yadda saxlanılan combo-lar (Settings → Combos) yalnız müştəri `model` sahəsində
combo-nun **dəqiq adını** göndərdikdə istifadə olunur — combo adı üçün qeyri-dəqiq
və ya qismən uyğunlaşdırma yoxdur və `auto/` prefiksi istifadə edilmir. Həll
ardıcıllığı (`src/sse/services/model.ts` faylındakı `getComboForModel()`):

1. combo adı ilə dəqiq uyğunluq (`model: "my-combo"`),
2. `combo/<name>` prefiksi (`model: "combo/my-combo"`),
3. model→combo qlob uyğunlaşdırmaları (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

İki geniş yayılmış yanlışlıq:

- **`auto` sizin combo-larınızdan istifadə etmir.** `auto`/`auto/*` öz sıfır
  konfiqurasiyalı namizəd hovuzunu yaradır və yalnız combo-nun adı sözün əsl
  mənasında `auto` olduqda yadda saxlanılan combo-lara müraciət edir (tövsiyə
  edilmir). Combo vasitəsilə yönləndirmək üçün `auto` deyil, onun dəqiq adını
  göndərin.
- **`openrouter/auto` real, ödənişli OpenRouter məhsuludur** ("Auto Best
  Available"), OmniRoute aliası deyil. O, OpenRouter reyestrinin
  (`open-sse/config/providers/registry/openrouter/index.ts`) yeganə statik model
  qeydidir və ayrıca hesablanır. Onu `auto` hovuzlarından çıxarmaq üçün
  Settings → Routing → Hide paid models seçimindən istifadə edin.

Burada sənədləşdirilən ilkin anlaşılmazlıq üçün
[#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) və
[#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111)-ə baxın.

## Necə işləyir (Davamlı Avtomatik Kombolar)

Avtomatik Kombo Mühərrik a istifadə edərək hər sorğu üçün ən yaxşı provider/model dinamik olaraq seçir** 16 faktorlu qiymətləndirmə funksiyası** ( `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS` ilə müəyyən edilir). Defolt çəkilər `1.0` ilə cəmlənir; xüsusi çəkilər `normalizeScoringWeights()` tərəfindən yenidən normallaşdırılır. On altı — `cacheAffinity` və `resetWindowAffinity` — -dan ikisi standart çəkisi `0` daşıyır; `reliability` `DEFAULT_WEIGHTS` -də `0`, lakin ümumi paketlərdə `0.03` və `0.04` `reliability-first`-də daşıyır və `quality` `0.02` paketlərdə daşıyır (`0.03` -da `quality-first`): onlar hələ də hər bir namizəd üçün hesablanır və `cacheAffinity` qapıları keş-keş təkmilləşdirməni təklif edir, xaldan kənarda isə sadəcə olaraq səs vermir.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Mənbə: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) ( `npm run docs:render-diagrams` vasitəsilə bərpa edin). Fayl adı tarixidir; mənbə və göstərilən diaqram `DEFAULT_WEIGHTS`-də elan edilmiş 16 faktorun hamısını göstərir.

| Amil                  | Defolt Çəki | Təsvir                                                                                                                                                                                                                                       |
| :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429      | Qalan kvota / tarif limiti hüdudları [0..1]                                                                                                                                                                                                  |
| `health`              | 0.1605      | Elektron açardan sağlamlıq balı (CLOSED= 1.0, HALF_OPEN= 0.5, OPEN= 0.0)                                                                                                                                                                     |
| `costInv`             | 0.1429      | Tərs** qarışdırılır** xərc (60% giriş + 40% çıxış token qiyməti, normallaşdırılmış) — daha ucuz = yüksək xal                                                                                                                                 |
| `latencyInv`          | 0.1143      | Tərs p95 gecikmə — daha sürətli = daha yüksək xal toplamaq üçün normallaşdırıldı                                                                                                                                                             |
| `taskFit`             | 0.0762      | Tapşırıq tipli uyğunluq (kodlaşdırma, nəzərdən keçirmə, planlaşdırma, təhlil, sazlama, sənədlər)                                                                                                                                             |
| `stability`           | 0.0476      | Cavab müddəti daha aşağı olan namizəd üçün gecikmə standart sapmasından fərqlilik əsaslı sabitlik —                                                                                                                                          |
| `tierPriority`        | 0.0476      | Hesab səviyyəli prioritet — Ultra = 1.0, Pro = 0.67, Standard = 0.33, Pulsuz = 0.0                                                                                                                                                           |
| `tierAffinity`        | 0.0476      | Namizədin səviyyəsi ilə manifest tərəfindən tövsiyə olunan səviyyə arasında yaxınlıq                                                                                                                                                         |
| `specificityMatch`    | 0.0476      | Sorğu spesifikliyi (açıq göstəriş) və model səviyyəsi arasında uyğunluq                                                                                                                                                                      |
| `contextAffinity`     | 0.0476      | Sorğunun kontekst pəncərəsi ehtiyacı ilə modelin kontekst pəncərəsi arasında yaxınlıq                                                                                                                                                        |
| `sessionAvailability` | 0.0476      | OAuth sessiyası bu sessiya üçün namizəd bağlantısının mövcudluğu (`getOAuthSessionAvailability()`; qeyri-OAuth bağlantıları balı 1.0)                                                                                                        |
| `connectionDensity`   | 0.0476      | Yükü eyni provayderin əlaqələri arasında yayır (anti-konsentrasiya)                                                                                                                                                                          |
| `cacheAffinity`       | 0.00        | Bu sorğunun prompt-cache prefiksini (`open-sse/services/combo/promptCacheAffinity.ts`) artıq saxlayacaq ən çox ehtimal olunan əlaqə ilə görüş-hash yaxınlığı ; default olaraq qeyri-aktivdir (#8008)                                         |
| `resetWindowAffinity` | 0.00        | Kvota sıfırlama pəncərəsi əlverişli olan bağlantılara meyl (defolt olaraq qeyri-aktivdir)                                                                                                                                                    |
| `quality`             | 0.03        | Marşrutlaşdırma-hadisə keyfiyyətinin izləyicisindən rəylə idarə olunan çıxış keyfiyyət siqnalı; müşahidəsi olmayan namizədlər neytral 0,5 bal alırlar                                                                                        |
| `reliability`         | 0.00        | Müşahidə edilmiş müvəffəqiyyət payı, `1 - failureRate`, 24 saatlıq istifadə tarixçəsindən on nümunəli mərtəbə arxasında (real vaxt göstəriciləri əks halda); heç bir müşahidəsi olmayan namizədlər 1.0 kimi oxunur. Defolt olaraq deaktivdir |

Yaddaşdaxili `quality` izləyicisi (`open-sse/services/routing/quality.ts`) soyuq yenidən başladıqdan sonra boşdur, ona görə də hər bir namizəd ilk müşahidələr düşənə qədər neytral `0.5` bal toplayır.

> **Oxunmaz kvota (#15347).** Provayderin kvota alıcısı olduqda, lakin o, oxuna bilən heç nə qaytarmırsa (uğursuz gətirmə, çatışmayan etimadnamələr, yalnız mesajdan istifadə və ya təhlil edilə bilən `windows` və sonlu `percentUsed` olmayan, `percentUsed: null` daxil olmaqla səhv formalaşdırılmış snapshot), namizəd `quota` oxunda `0` bal verir və onun yekun balı `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` 5-ə bərabərdir `autoStrategy.ts`), əlaqə statusu cəzası ilə eyni yumşaq cəza nümunəsi. Uğursuz istifadə oxunması provayder deyil, telemetriya haqqında sübutdur, ona görə də o, təsdiqlənmiş 100%-used də daxil olmaqla, hər hansı real oxunuşdan ciddi şəkildə aşağıda yer alır, lakin heç vaxt sərt şəkildə bloklanmır və ya çıxarılmır. Başlığı olmayan provayder `unlimited: true` və balları tam kvota kimi bildirir; qeydiyyatdan keçmiş kvota alıcısı olmayan provayderin ümumiyyətlə telemetriya mənbəyi yoxdur və `100` defoltunu saxlayır.

**Cəmi:** `DEFAULT_WEIGHTS`-də elan edildiyi kimi `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` ; istifadəçi tərəfindən konfiqurasiya edilmiş çəkilər hesablamadan əvvəl `normalizeScoringWeights()` tərəfindən paylanmaya yenidən normallaşdırılır.

## Rejim Paketləri

`open-sse/services/autoCombo/modePacks.ts` faylında əvvəlcədən təyin edilmiş 6 çəki profili var. Hər paket seçimi müəyyən bir məqsədə yönəltmək üçün standart çəkiləri tamamilə əvəz edir. Hər paketin cəmi artıq `1.0`-dır (dörd onluq mərtəbə ilə göstərildikdə `0.9999`), buna görə də paket aktiv olduqda `normalizeScoringWeights()` funksiyasının düzəldə biləcəyi əhəmiyyətli heç nə yoxdur — aşağıdakı dəyərlər, yuvarlaqlaşdırma nəzərə alınmaqla, qiymətləndiricinin tətbiq etdiyi dəyərlərdir.

| Amil                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Qeydlər:

- **Paketlərə `quality` və `reliability` daxildir** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) və onlar çəki xəritəsini bütünlüklə əvəz edir (`weights = pack`, birləşdirmə deyil). `DEFAULT_WEIGHTS` daxilində `quality 0.03 / reliability 0` var; `balanced`/`default` seçildikdə bu standart dəyərlər saxlanılır, paket seçildikdə isə paketin yuxarıdakı dəyərlərindən istifadə olunur. Soyuq hovuzda (hələ heç bir müşahidə yoxdur, buna görə `quality 0.5` və `reliability 1` olur) bu iki amil adi paketdə `+0.04` (`0.03 + 0.01`), `quality-first` paketində `+0.045`, `reliability-first` paketində isə `+0.05` əlavə edir.
- `tierAffinity`, `specificityMatch` və `resetWindowAffinity` hər paketdə açıq şəkildə `0` olaraq təyin edilib.
- Hər paketin əsas vurğusu qısa şəkildə:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (aşağı gecikməli, sağlam bağlantılar)
  - **cost-saver** → costInv 0.3324 (ən ucuz tokenlər üstün gəlir)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03 — bütün paketlər arasında ən yüksək göstərici (tapşırıq üçün ən yaxşı və ardıcıl model)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (sürət/xərcdən asılı olmayaraq maksimum ehtiyat)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04 — bütün paketlər arasında ən yüksək göstərici (ən az gözlənilməz hal)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (`auto/chaos` çəki paketinin panel üzvlərinə təyin etdiyi çəkilər; paralel şaxələnmə bu çəkiləri oxumur və bu, nasazlıq yeritmə profili deyil, baxın: [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Sorğu Üzrə İdarəetmə Vasitələri (başlıqlar) — #6023 / #6024 / #6025 / #3470

`auto` kombosu saxlanılan konfiqurasiyanı dəyişdirmədən üç başlıq vasitəsilə **hər sorğu üzrə** yönləndirilə bilər. Bunlar yalnız `auto` strategiyasına və yalnız onları daşıyan sorğuya tətbiq olunur; başlıq olmadıqda kombonun saxlanılmış `modePack`/`budgetCap`/`budgetFallback` dəyərlərindən istifadə olunur.

| Başlıq                        | Qəbul edilən dəyərlər                                                                                                                                                                                    | Təsir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | əvvəlcədən təyin edilmiş alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) və ya xam paket adı (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Bu sorğu üçün qiymətləndirmə çəkilərini əvəz edir. `balanced`/`default` standart çəkiləri məcburi tətbiq edir (paket olmadan). Naməlum dəyərlər nəzərə alınmır (konfiqurasiya qorunur).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Budget`          | müsbət ədəd (hər sorğu üçün maksimum USD)                                                                                                                                                                | Sərt xərc limiti: təxmini xərci bu limiti aşan namizədlər seçimdən əvvəl süzgəcdən keçirilir. **Bütün** namizədlər bu limiti aşdıqda baş verəcək davranış aşağıdakı `X-OmniRoute-Budget-Fallback` ilə idarə olunur.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (standart, aliaslar: `cheapest-viable`, `soft`) və ya `strict` (aliaslar: `block`, `hard`)                                                                                                    | `cheapest`: limiti hələ də aşmasına baxmayaraq, qlobal olaraq ən ucuz namizədə geri qayıdır (köhnə davranış). `strict`: seçim etməkdən imtina edir — səssizcə limiti aşan xərcə yol vermək əvəzinə, sorğu `HTTP 402` ilə dərhal uğursuz olur. Naməlum dəyərlər nəzərə alınmır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Effort`          | `auto` (digər dəyərlər rezerv edilib)                                                                                                                                                                    | Adaptiv düşünmə büdcəsi: sorğuda heç bir formada əsaslandırma sahəsi (`reasoning_effort`, `reasoning`, `thinking`) olmadıqda, şlüz deterministik sorğu strukturu siqnallarına (son istifadəçi mesajının uzunluğu, son istifadəçi mesajınadək kontekst ölçüsü, əvvəlki alət nəticələri, alət dövrəsinin dərinliyi) əsasən `auto` dəyərini `low`/`medium`/`high` kimi müəyyən edir. Siqnallar cari addımla məhdudlaşır — son istifadəçi mesajından sonrakı hər şey nəzərə alınmır — buna görə də alət dövrəsindəki hər sorğu eyni səviyyədə müəyyən edilir (hər addım üçün vəziyyətsiz sabitləmə, sessiya vəziyyəti yoxdur, yuxarı axındakı prompt keşinin prefikslərini poza biləcək dövrə ortası yüksəltmə yoxdur). Klient tərəfindən açıq şəkildə göstərilən əsaslandırma sahəsi həmişə üstünlük təşkil edir. Yuxarı axın yönləndirilməsi OpenAI Chat Completions strukturuna (`targetFormat === FORMATS.OPENAI`) uyğun olan sorğularla məhdudlaşır — `reasoning_effort` OpenAI strukturlu sahədir, buna görə də başlıq Claude və ya Gemini-yə yönəldilmiş sorğuda heç bir təsir göstərmir (baxın: `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Ən sürətli profili məcburi seçin, bu sorğunu $0.05 ilə məhdudlaşdırın və büdcəni aşmaq əvəzinə sərt şəkildə bloklayın
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Müəyyənləşdirmə xalis funksiyadır (`open-sse/services/autoCombo/requestControls.ts`);
müəyyən edilmiş dəyərlər mühərrikin mövcud `config.modePack` / `config.budgetCap` /
`config.budgetFallback` girişlərinə ötürülür. Kombinasiyada saxlanılan `config.budgetFallback` ("strict" |
"cheapest") davamlı siyasəti təyin edir; başlıq isə onu tək bir sorğu üçün əvəz edir.

## Bütün marşrutlaşdırma strategiyaları

OmniRoute-nın kombo mühərriki dəstəkləyir** 22 marşrutlaşdırma strategiyası** ( `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`-da elan edilmişdir). Auto Combo mühərrikinin özü `auto` strategiyası altında ifşa olunur; digərləri davamlı kombinasiyalar üçün mövcuddur.

| Strategiya          | Təsvir                                                                                                                                                                                                                                                            |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Açıq prioritetli birinci hədəf sıralanan siyahı                                                                                                                                                                                                                   |
| `weighted`          | Hədəf başına çəki ilə təsadüfi çəkilmiş                                                                                                                                                                                                                           |
| `round-robin`       | Hədəflər arasında ardıcıllıqla keçin (toplanmış; aşağıya baxın)                                                                                                                                                                                                   |
| `context-relay`     | Kontekstləri hədəflər arasında təhvil verin (uzun söhbətlər)                                                                                                                                                                                                      |
| `fill-first`        | Növbəti keçidə keçməzdən əvvəl hər bir hədəfin kvotasını doldurun                                                                                                                                                                                                 |
| `p2c`               | Power-of-2-choices təsadüfi yük balansı                                                                                                                                                                                                                           |
| `random`            | Vahid təsadüfi seçim                                                                                                                                                                                                                                              |
| `least-used`        | Ən aşağı cari yüklə hədəf seçin                                                                                                                                                                                                                                   |
| `cost-optimized`    | Kataloq qiymətinə görə hər sorğu üçün $ minimuma endirin                                                                                                                                                                                                          |
| `reset-aware` ⭐    | Kvota sıfırlama vaxtı ilə prioritetləşdirin — qısa sıfırlama pəncərələri daha yüksək yer tutur                                                                                                                                                                    |
| `reset-window`      | Kvota pəncərəsi ən tez sıfırlanan hədəflərə üstünlük verin                                                                                                                                                                                                        |
| `expiry-first`      | İstifadə olunmamış ilk — kvotası bitəcək hesabı xərcləyin, ən yaxın sıfırlama tarixi birinci keçir.                                                                                                                                                               |
| `headroom`          | Ən çox qalan kvota başlığı olan hədəfi seçin                                                                                                                                                                                                                      |
| `quota-weighted`    | Tükənmiş hesabları keçin, sonra qalanlar arasında uçuş zamanı yükə bölünmüş qalan kvotaya nisbətdə seçin; mövcud söhbətlər bağlanır                                                                                                                               |
| `strict-random`     | Təkrarların təkrarlanması olmadan təsadüfi                                                                                                                                                                                                                        |
| `auto`              | Avtomatik Combo hesabından istifadə edin (16 faktorlu) —** tövsiyə olunur**                                                                                                                                                                                       |
| `lkgp`              | Son Bilinən-Yaxşı Yol (son uğurlu provayderə işarə edir, sonra qaydalara qayıdır)                                                                                                                                                                                 |
| `context-optimized` | Cari kontekst ölçüsünə ən uyğun olan hədəfi seçin                                                                                                                                                                                                                 |
| `cache-optimized`   | Hədəfləri operativ keş yaxınlığı — ilə yenidən sıralayın. Bu sorğunun keşlənmiş prefiksini artıq saxlamaq ehtimalı olan əlaqə əvvəlcə sınaqdan keçirilir (`open-sse/services/combo/promptCacheAffinity.ts`, #8008)                                                |
| `fusion` 🧬         | Paralel olaraq modellər panelinə havalandırın, sonra hakim vasitəsilə bir cavabı sintez edin (aşağıya baxın)                                                                                                                                                      |
| `pipeline`          | Hədəfləri ardıcıl olaraq işə salın, hər bir addımın çıxışını növbəti addımın girişinə birləşdirin; yalnız son cavab qaytarılır (#6396)                                                                                                                            |
| `jev`               | İstifadəçi tərəfindən seçilən üstünlüklər siyahısı; TypeSafe Jev bu sorğu üçün hansı girişlərin işlədiyini etiraf edir. Qalib ilk olaraq, digər qəbul edilmiş hədəflər istifadəçi sırasını qoruyur. Jev əlçatmaz olduqda istifadəçi sifarişinə açıq olur (#15276) |

⭐ = v3.8.0-da yenilik · 🧬 = v3.8.36-da yeniliklər

### `weighted` semantikası

`weighted` a** istəyə görə mütənasib təsadüfi heç-heçə** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), ekvalayzer deyil:

- Hər sorğu çəkilir** bir** `weight / totalWeight` ehtimalı ilə addım; qalan addımlar həmin sorğu üçün ehtiyat zənciri kimi azalan çəki ilə sıralanır.
- Ağırlığı `0` (yaxud əskik) olan bir addımdır** heç vaxt çəkilməyib** hər hansı digər addımın çəkisi > 0 — olsa da, o, yalnız çəkilmiş addım uğursuz olduqdan sonra ehtiyat kimi xidmət edə bilər. Yalnız nə vaxt** hamısı** çəkilər 0-dır, seçim vahid olur.
- Hədəfləri — provayderinin dövrə açarı `OPEN`, əlaqənin soyudulması, model kilidlənməsi — olan addımlar baş verməmişdən əvvəl tirajdan çıxarılır (`open-sse/services/combo/targetResolution.ts`), beləliklə tək sağlam addım müvəqqəti olaraq hər sorğunu qazana bilər.
- `stickyWeightedLimit` (kombo konfiqurasiya, defolt `1` = söndürülür) yenidən çəkməzdən əvvəl çoxlu ardıcıl müvəffəqiyyətlər üçün çəkilmiş addımı sabitləyir.

Ciddi fırlanma üçün `round-robin` istifadə edin; `weighted` üzrə bərabər çəkilər statistik — deyil, ciddi — balansını verir.

### Agent boru kəməri rejimi

Ən azı iki modeli olan `pipeline` kombinatı `config.agenticOrchestration.enabled` ilə planner/executor marşrutlaşdırmasına qoşula bilər. Birinci hədəf planlaşdırma və yekun cavablara sahibdir; ikinci hədəf müştəri-doğma alət zənglərini yayır. OmniRoute sorğu protokolundan alət nəticələrinin davamını aşkarlayır, planlaşdırıcıdan başqa bir alət dövrəsinə ehtiyac olub-olmadığını soruşur və dinamik olaraq ya icraçı, ya da planlaşdırıcını müştərinin üzləşdiyi son addım edir.

Könüllü `config.agenticOrchestration.contextCompaction` hər planlaşdırıcı və ya icraçı göndərişindən əvvəl ayrıca faydalı yük büdcəsi tətbiq edir. Bunu açıq şəkildə aktivləşdirin:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Bunlar operator tərəfindən seçilmiş seriallaşdırılmış JSON simvol büdcələridir, token kontekst pəncərələri və ya zəmanətli yuxarı axın limitləri deyil. Dəqiq model IDs standartı ləğv edir. Həddən yuxarı olan sıxlaşdırma eyni alət təriflərini silir, həzmlə böyük ölçülü alət sübutlarını kəsir və hədəf nisbətinə doğru köhnə tam tarix qruplarını silir. O system/developer təlimatlarını, ən son istifadəçi sorğusunu, paralel calls/results daxil olmaqla sonuncu alət dövrəsini və Gemini-nin aparıcı marşrutlaşdırma təlimatını saxlayır. Ən yüksək səviyyəli təlimatlar və alət parametrləri qorunur. Boşluq işarəsi silinmiş tarixçəni qeyd edir; bu semantik xülasə deyil, deterministik kəsmədir. Sabitlənmiş kontekst hələ də büdcəni aşırsa, modellə əlaqə saxlamazdan əvvəl sorğu 413 qaytarır. Sıxlaşdırma qeyri-aktiv olduqda və ya həddən aşağı olduqda sorğu dəyişməz olaraq keçir.

Alət-nəticə davamlarında, iki ardıcıl tamamlanmış tur eyni alət çağırışlarını dəyişməz nəticələrlə təkrar etdikdə və ya ardıcıl iki raundda hər bir açıq şəkildə qeyd olunan nəticə uğursuz olduqda OmniRoute icranı dayandırır. Dəyişən nəticələr təkrar zənglərə icazə verir (məsələn, sorğu). Mühafizəçi yeni istifadəçi tələbi ilə sıfırlanır, paralel zəngləri bir raundda qruplaşdırır və Anthropic, Söhbət Tamamlamaları, Cavablar və Gemini tarixçələrini dəstəkləyir. Planlaşdırıcı səbəbi alır və başqa bir alət turu tələb etsə belə, yekun cavabın sahibidir.

İkinci hədəfdən sonra əlavə modellərə icraçı ehtiyat nüsxələri sifariş edilir. Uğursuz HTTP cavabı və ya nəqliyyat istisnası eyni planlaşdırıcı qərarını və yerli alətləri daşıyaraq növbəti icraçıya doğru irəliləyir, lakin həmin icraçının öz addımı tez və həll edilmiş əlaqədir. İlk uğurlu cavab SSE axını da daxil olmaqla dəyişməz olaraq qaytarılır; uğurlu yayımdan sonra uğursuzluqlar burada təkrar sınaqdan keçirilə bilməz. Bütün icraçılar uğursuz olarsa, sonuncu uğursuzluq qaytarılır. Müştəri göndərməni dayandırır.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

İcraçı bir cavabda çoxlu müstəqil zənglər verə bilər. Asılı zənglər sonradan müştəri aləti-nəticə növbələrində idarə olunur, planlaşdırıcı hər bir nəticəni nəzərdən keçirir. `maxToolRounds` defolt olaraq `8` və `1` qəbul edir –`32`; çatdıqdan sonra planlayıcı ən yaxşı mövcud yekun cavabı verməlidir. Daxili planlaşdırıcı qərarları buferlənir, seçilmiş müştəri ilə bağlı cavab isə ilkin axın üstünlüklərini qoruyur.

### `round-robin` yapışqan toplu və hesab genişləndirilməsi

Dairəvi sistem topludur, hər addım üçün bir sorğu deyil:

- `stickyRoundRobinLimit` (kombo konfiqurasiya, sonra `comboStickyRoundRobinLimit`, sonra `settings.stickyRoundRobinLimit`, default** 3** ) fırlanmadan əvvəl o qədər ardıcıl uğur üçün eyni hədəfi saxlayır. Bir sorğunun fırlanması üçün kombinasiyanın ləğvini `1` olaraq təyin edin. Kombo redaktor effektiv dəyəri və onun hansı təbəqədən gəldiyini göstərir.
- `connectionAwareExpansion` (kombo konfiqurasiya, sonra parametrlər, standart** yalan** ) rotasiyadan əvvəl hər bir provayder səviyyəli addımı hər hesab üçün hədəflərə genişləndirir. B qrupu strategiyaları (prioritet, çəkili, dairəvi sistem, təsadüfi, p2c, ən az istifadə edilən, xərc optimallaşdırılmış, lkgp, birinci doldurma, ciddi təsadüfi, kontekst üçün optimallaşdırılmış, keş-optimallaşdırılmış, kontekst-rele, qaynaşma, boru kəməri, jev) bu provayder səviyyəsində görünüşü olana qədər saxlayır. Combo redaktor miras / aktiv / söndürülür; inherit qlobal defoltdan istifadə edir (off).
- Prompt-cache lokali marşrutlaşdırma (`promptCacheAffinityEnabled`, default** doğrudur** ) bağlanmış əlaqələri yenidən sıralayır ki, uyğun keş açarları bir hesabda qalsın. O, hər hesaba bərkidilmiş addımlar üzrə dairəvi və çəkili fırlanma üzərində üstünlük təşkil edir. Ciddi fırlanma lazımdırsa, onu Parametrlər → Combo defaults altında söndürün. Kombo başına heç bir əvəzetmə yoxdur.

Bir modeldə çox hesablı fırlanma üçün üstünlük verin** bir dinamik hesab addımı** (boş `connectionId`, bütün hovuz) yapışqan limiti ilə `1`, üç bağlanmış `connectionId` s deyil. Saxlanmış addımlar və yaxınlıq RR sayğacı irəliləyərkən belə eyni hesaba düşür.

## Fusion Strategiyası

`fusion` tək bir hədəf seçməyən **yeganə** strategiyadır. O, sorğunu paralel şəkildə
**hər bir panel modelinə** göndərir, sonra konfiqurasiya edilə bilən **hakim model**
bütün panel cavablarından vahid yekun cavab sintez edir. Yuxarı axındakı `decolua/9router`
layihəsindən (OpenRouter-in Fusion dizaynı) portlaşdırılıb; reallaşdırma `open-sse/services/fusion.ts` faylındadır.

İş prinsipi:

0. **Alət ehtiva edən sorğuların yan keçməsi** — boş olmayan `tools` massivi daşıyan və
   `tool_choice` dəyəri açıq şəkildə `"none"` olmayan sorğu paneli tamamilə ötür: o,
   `tools`/`tool_choice` dəyişdirilmədən birbaşa tək modelə (konfiqurasiya edilmiş hakimə
   və ya `panel[0]`-a) yönləndirilir. Panel üzvlərinin alətlərə çıxışı yoxdur və hakimin
   sintez göstərişi alət çağırışlarının yaradılmasını təşviq etmir; beləliklə, agent əsaslı/alət çağıran
   klientlər sintez edilmiş mətn əvəzinə real alət çağırışı qərarı əldə edir (#6771).
1. **Paralel paylama** (yalnız alət ehtiva etməyən sorğular üçün) — sorğu eyni anda bütün
   panel modellərinə göndərilir, alətlər çıxarılmaqla axınsız rejim məcburi edilir
   (hakimə sintez üçün tam mətn lazımdır).
2. **Kvorum və güzəşt müddəti ilə toplama** — `minPanel` sayda cavab daxil olan kimi,
   gecikənlər üçün qısa güzəşt taymeri başladılır, sonra fusion toplanmış cavablarla
   davam edir. Bu, sərt vaxt limiti çərçivəsində ən yavaş modelin ümumi gözləmə vaxtına
   təsirini məhdudlaşdırır.
3. **Hakim sintezi** — panel cavabları anonimləşdirilir (`Source 1`, `Source 2`, … —
   beləliklə, hakim model brendini deyil, məzmunu qiymətləndirir) və hakimə təqdim edilir;
   hakim konsensusu / ziddiyyətləri / qismən əhatəni / unikal fikirləri / nəzərdən qaçan
   məqamları təhlil edir, sonra **bir** mötəbər cavab yazır. Hakim çağırışı klientin orijinal
   `stream` bayrağını və alətləri saxlayır, buna görə axın və sonrakı alət istifadəsi işləməyə davam edir.
4. **Zərif deqradasiya** — 0 panel cavabı → `503`; yalnız 1 cavab qaldıqda → həmin cavab
   birbaşa qaytarılır (sintez ediləcək heç nə yoxdur); tək modelli panel birbaşa cavab verir.

Panel üzvü başqa bir komboya istinad edən `combo-ref` addımı
(`{kind: "combo-ref", comboName: "..."}`) da ola bilər — o, istinad edilən komboya tam rekursiv
yönləndirmə ilə **vahid qara qutu panel səsi** kimi həll olunur (həmin kombonun öz hədəflərinə
paralel paylama kimi deyil) və digər bütün combo-ref istifadə edən strategiyalarda artıq mövcud olan
eyni dərinlik/dövr qorunmasından istifadə edir (#6764).

### Konfiqurasiya

Kombonun `config` obyektində konfiqurasiya edilir (sxem miqrasiyası yoxdur — mövcud
`combos` cədvəlindən yenidən istifadə edir):

| Sahə                                     | Növ      | İlkin dəyər      | Məqsəd                                                                                                       |
| :--------------------------------------- | :------- | :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | ilk panel modeli | Yekun cavabı sintez edən model                                                                               |
| `config.fusionTuning.minPanel`           | `number` | `2`              | Güzəşt taymeri başlamazdan əvvəl tələb olunan uğurlu cavabların sayı (`[2, panelSize]` ilə məhdudlaşdırılır) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`           | Kvoruma çatdıqdan sonra gecikənləri nə qədər gözləmək lazımdır                                               |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`          | Bir ilişmiş modelin sorğunu dayandırmaması üçün mütləq vaxt həddi                                            |

İlkin dəyərlər `FUSION_DEFAULTS` daxilindədir (`open-sse/services/fusion.ts`).

### Nümunə

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Sonra onu istənilən digər kombo kimi çağırın: `{"model":"fusion-panel","messages":[...]}`.

## Virtual Auto-Combo Fabriki

Auto Combo mühərriki əvvəlcədən müəyyən edilmiş kombinasiyalar tələb etmir. Bunun əvəzinə, `open-sse/services/autoCombo/virtualFactory.ts` namizədləri dinamik şəkildə yaradır:

1. `getProviderConnections({ isActive: true })` çağırışı ilə bütün aktiv bağlantıları əldə edir
2. Etibarlı giriş məlumatları olanları filtrləyir (API açarı və ya `hasUsableOAuthToken()` vasitəsilə müddəti bitməmiş OAuth tokeni)
3. Model əlçatanlığını və qiymətləri müəyyən etmək üçün `getProviderRegistry()` ilə çarpaz yoxlama aparır
4. Hər `(provider, model, connection)` korteji üçün bir `VirtualAutoComboCandidate` yaradır
5. Yönləndirmə hədəfi kimi `connection.defaultModel` modelini (və ya reyestrdəki ilk modeli) seçir
6. Hər namizədi 16 faktorlu `scorePool()` və variantın çəki paketi ilə qiymətləndirir
7. Yaranmış yaddaşdaxili `AutoComboConfig` obyektini `handleComboChat()` üçün qaytarır — heç vaxt DB-də saxlanmır

Bu o deməkdir ki, **`auto/*` aktiv edilmiş yeni provayder əlavə etmək namizəd hovuzunu avtomatik olaraq genişləndirir** — kombinasiyanı əl ilə redaktə etməyə ehtiyac yoxdur. Virtual kombinasiya hər sorğu üçün yenidən qurulur, buna görə yeni əlavə edilmiş və ya sağlamlığı yenicə bərpa olunmuş bağlantılar dərhal nəzərə alınır.

## Özünübərpa

- **Müvəqqəti istisna**: Qiymət < 0.2 → 5 dəqiqəlik istisna edilir (proqressiv gecikmə, maksimum 30 dəqiqə)
- **Dövrə açarının vəziyyətinin nəzərə alınması**: OPEN → avtomatik istisna edilir; HALF_OPEN → sınaq sorğuları
- **İnsident rejimi**: >50% OPEN → araşdırmanı deaktiv edir, stabilliyi maksimuma çatdırır
- **Soyuma müddətindən sonra bərpa**: İstisna müddəti bitdikdən sonra ilk sorğu azaldılmış taymautla bir "sınaq" olur

## Bandit Araşdırması

Sorğuların 5%-i (konfiqurasiya edilə bilər) araşdırma məqsədilə təsadüfi provayderlərə yönləndirilir. İnsident rejimində deaktiv edilir.

## API

var** xüsusi `POST /api/combos/auto` son nöqtəsi yoxdur** — Auto-Combo iki şəkildə istehlak olunur:

1. **Sıfır konfiqurasiya (tövsiyə olunur):** `model: "auto"` və ya `model: "auto/<variant>"` ilə istənilən söhbətin tamamlanması sorğusu göndərin. Virtual fabrik — heç bir əzmkarlıq, API zənglərinə ehtiyac duymadan hər sorğu üçün kombin yaradır.

2. **`strategy: "auto"` ilə davamlı kombinasiya:** `POST /api/combos` vasitəsilə adi bir kombin yaradın və `strategy: "auto"` plus `config.auto.weights` / `config.auto.candidatePool` təyin edin. Eyni hesablama mühərriki istifadə olunur; Combo `combos` -də saxlanılır və ID tərəfindən təkrar istifadə edilə bilər.

Kəşf etmək üçün `GET /api/combos/auto` həll edilmiş namizəd hovuzu və `context_length` / `max_output_tokens` — namizəd hovuzunun pəncərələrində MAX ilə hər variantı siyahıya alır. Müştərilər (məsələn, opencode plagini) `0` əvəzinə bu dəyərləri reklam etməlidirlər: sıfır kontekst opencode-un avtomatik sıxılmasını tamamilə söndürərək, şlüz tarixinin təmizlənməsi konteksti məhv edənə qədər seansların böyüməsinə imkan verir. MAX reklam etmək təhlükəsizdir, çünki avtomatik birləşmə kontekstində əvvəlcədən filtr böyük ölçülü sorğuları böyük pəncərəli namizədlərə yönləndirir.

```bash
# Zero-config usage (no combo creation)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Persisted auto combo via the regular combos endpoint
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Avtomatik marşrutlaşdırıcı strategiyaları

Davamlı `strategy: "auto"` kombinləri `config.routerStrategy` (və ya köhnə `config.auto.routerStrategy`) parametrini aşağıdakılardan birinə təyin edə bilər:

- `rules` — defolt çəkili bal
- `score` — ən yüksək konfiqurasiya edilmiş ölçülmüş balı seçir. Dəqiq əlaqələr konfiqurasiya edilmiş namizəd sırasını qoruyur; tam reytinqli hovuzdan mövcud `explorationRate` nümunələri.
- `cost` / `eco` — ən ucuz sağlam provayder
- `latency` / `fast` — etibarlılıq cəzası ilə ən aşağı p95 gecikmə
- `sla-aware` / `sla` — p95 gecikmə, xəta dərəcəsi və isteğe bağlı xərc SLOs tələblərinə cavab verən namizədlərə üstünlük verir
- `lkgp` — son tanınmış yaxşı provayder ilk
- `nadir` — [Nadirin](https://getnadir.com) qərarını soruşun API hovuzda hansı modelə ehtiyac var; daxil olun, `rules`-a açıq olun
- `decision` — konfiqurasiya edilmiş qərar verəndən soruşun (TypeSafe System One, öz qərarınız URL və ya kombinin öz modellərindən biri) hovuzdakı hansı modelin sorğuya uyğun olduğunu; defolt-off `COMBO_DECISION_ROUTER_ENABLED` bayrağının arxasında, `rules`-də uğursuz

### Router strategiyaları ətraflı

Avtomatik kombinə edilmiş mühərrik 7 ədəd qoşula bilən mühərriki ifşa edir**RouterStrategy** `config.routerStrategy` (və ya köhnə `config.auto.routerStrategy`) vasitəsilə dəyişdirə biləcəyiniz tətbiqlər. Hər bir strategiya `RoutingContext` (tapşırıq növü, tool/vision göstərişləri, token təxmini, isteğe bağlı SLA siyasəti, isteğe bağlı sonuncu tanınmış-yaxşı provayder) verilməklə, namizəd fondundan bir provayder seçir.

#### 1. `rules` (defolt) — 16 faktorlu ölçülmüş bal

Mövcud hesablama mühərrikini əhatə edir. `OPEN` elektrik kəsici namizədlərini süzgəcdən keçirir, sonra ən yüksək nəticə göstərən provayderi seçərək cari tapşırıq növü və `getTaskFitness()` ilə `scorePool()` işə salır.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Nə vaxt istifadə etməli** : Defolt. Bütün siqnallar arasında balanslı bir ticarət etmək istədiyiniz zaman istifadə edin.

**ləqəb** : `rules` (ləqəb yoxdur)

---

#### 2. `cost` / `eco` — ən ucuz sağlam provayder

Namizəd fondunu `costPer1MTokens` (artan) üzrə çeşidləyir və ən ucuzunu seçir. Əvvəlcə `OPEN` namizədlərini süzgəcdən keçirir.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Nə vaxt istifadə etməli** : Xərclərə həssas iş yükləri, toplu emal və ya arxa plan işləri.

**ləqəblər** : `cost`, `eco`

---

#### 3. etibarlılıq cəzası ilə `latency` / `fast` — ən aşağı p95 gecikmə

`p95LatencyMs + (errorRate * 1000)` ilə çeşidləyin. Səhv dərəcəsi cəzası etibarsız provayderlərin nominal gecikmə müddəti aşağı olsa belə, daha aşağı sıralanmasını təmin edir.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Nə vaxt istifadə etməli** : Real vaxt söhbəti, avtomatik tamamlama və ya interaktiv kodlaşdırma köməkçiləri kimi gecikməyə həssas iş yükləri.

**ləqəblər** : `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — latency/error/cost SLO uyğunluğu

Hər bir namizədi konfiqurasiya edilmiş SLO siyasətinə nə dərəcədə uyğun olduğuna görə qiymətləndirir:

| Amil            | Çəki | Formula                                                 |
| --------------- | ---- | ------------------------------------------------------- |
| Gecikmə hesabı  | 35%  | `threshold / max(value, ε)`                             |
| Xəta hesabı     | 35%  | `threshold / max(value, ε)`                             |
| Sağlamlıq balı  | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)       |
| Xərc hesabı     | 10%  | `threshold / max(value, ε)` və ya tərs normallaşdırılır |
| Sabitlik hesabı | 5%   | tərs normallaşdırılmış gecikmə stddev                   |

Zaman `hardConstraints: true`, namizədlər ilk növbədə sıralanır** pozuntu balı** (hər hansı SLO nə qədər üstələyirlər), sonra kompozit hesabla. Əks təqdirdə, bu, yalnız birləşmiş hesabdır.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA sahələri** (kombo konfiqurasiyada quraşdırılmışdır):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Nə vaxt istifadə etməli** : Ciddi gecikmə, səhv dərəcəsi və ya xərc büdcələri ilə istehsal iş yükləri.

**ləqəblər** : `sla-aware`, `sla`

---

#### 5. `lkgp` — son tanınmış yaxşı provayder ilk

Çalışır** son tanınmış yaxşı provayder** (əgər təyin edilərsə), əvvəlcə `rules` strategiyasına qayıdır. Seansın yapışqanlığı üçün faydalıdır — eyni provayder söhbətdə sonrakı sorğuları idarə edir.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}
```

**Nə vaxt istifadə etməli** : Eyni provayderin təqib sorğularını idarə etməsini istədiyiniz çox növbəli söhbətlər (məsələn, keşləmə, kontekstin davamlılığı və ya qiymət uyğunluğu üçün).

**ləqəb** : `lkgp` (ləqəb yoxdur)

---

#### 6. Nadir vasitəsilə `nadir` — operativ məlumatlı model seçimi

Yuxarıdakı hər bir strategiya namizədləri öz telemetriyası ilə sıralayır; onların heç biri sorğunu oxumur. `nadir` sonuncu istifadəçi növbəsini və hovuzun model idlərini [Nadirin](https://getnadir.com) qərarına göndərir API (`POST /v1/bucket`) və Nadirin həmin menyudan seçdiyi modelə marşrutlar (`simple` → ən ucuz bacarıqlı model, `complex` → sərhəd olan). Həmin modelə xidmət edən əlaqə hələ də `rules` tərəfindən seçilir, buna görə də kvota, sağlamlıq və xərclər hansı hesaba qərar verməkdə davam edir.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` və `OMNIROUTE_NADIR_BASE_URL` iki sətir üçün env ehtiyatlarıdır. `baseUrl` yalnız özünü idarə edən Nadir üçün lazımdır (arxadan gələn `/v1` tolere edilir). Açarsız zənglər Nadirin hər IP üçün tarif məhdudiyyəti olan anonim səviyyəsinə düşür. Açarla ( [birini yaradın](https://app.getnadir.com/dashboard/api-keys) ) hər bir qərar Nadir idarə panelinizə daxil edilir. Tam quraşdırma və doğrulama: [getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Qutunu tərk edənlər: son istifadəçi mesajının mətni (ilk 16k simvol), namizəd model identifikatorları və `source: "omniroute"` kanal teqi. Sistem sorğusu, tarixçə, alətlər və ya başlıqlar yoxdur.

Uğursuzluq davranışı açıqdır: vaxt aşımı (defolt 2000 ms), non-2xx, əlçatmaz host, səhv formalaşdırılmış cavab və ya hovuzdan kənar seçim `rules` qərarını həll edir və səbəb `NadirStrategy: fallback (…)` prefiksi ilə verilir. Uğursuz zəngdən sonra strategiya şəbəkəni 30 saniyə ərzində atlayır, beləliklə, kəsilmə hər sorğu üçün bir deyil, 30 saniyədə bir fasiləyə başa gəlir. Marşrutlaşdırma hadisələri yalnız Nadir həqiqətən seçim etdikdə `strategy: "nadir"` bildirir.

**Nə vaxt istifadə etməli** : model səviyyələrini əhatə edən hovuzda qarışıq çətinlikli trafik (kiçik, orta və sərhəd modeli), burada həmişə sərhəd kəsmək istədiyiniz xərcdir.

**ləqəb** : `nadir` (ləqəb yoxdur)

---

#### 7. `decision` — qoşula bilən qərar verən modeli seçir

`decision` soruşur a** qərar verən** hovuzdakı hansı model sorğuya uyğun gəlir, sonra hovuzu həmin modelə daraldır və `rules` əlaqəni seçməyə imkan verir (kvota, sağlamlıq və xərc hələ də hesabı seçir). Yönləndirici düymələri `config` nin yuxarısında (iş panelində yazılanlar) və ya `config.auto.routerStrategy` yanında `config.auto.decision` oturduqda qərar verən kombinin qərar blokunda — `config.decision` təyin edilir:

| `decider`     | Kim cavab verir                                                                                                      | Ehtiyaclar                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `systemone`   | TypeSafe System One (`POST https://api.typesafe.ai/v1/systemone`), standart model `jev-latest`                       | `typesafe` bağlantısı və ya env açarı        |
| `http`        | `baseUrl`-da öz qərarınız: `wire: "systemone"` (`{baseUrl}/v1/systemone`) və ya `"openai-chat"` (chat tamamlamaları) | `baseUrl` + `model`; açar isteğe bağlıdır    |
| `combo-model` | provayder modellərinizdən biri, qaynaşma hakimi kimi prosesdə çağırılır                                              | `model` kimi `provider/model` (kombo yoxdur) |

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "decision",
    "decision": {
      "decider": "http",
      "baseUrl": "https://decider.example.com",
      "wire": "openai-chat",
      "model": "qwen-small",
      "connectionId": "<stored connection id>",
      "timeoutMs": 2000,
      "minConfidence": 0.6,
      "descriptions": { "gpt-4o-mini": "Quick drafts and short answers" }
    }
  }
}
```

Sahələr (saxlama zamanı ciddi sxemlə təsdiqlənir və sorğu zamanı yenidən):

- `decider` — `systemone`, `http` və ya `combo-model`.
- `model` — TypeSafe modeli, URL-də qərar modeli və ya birləşmiş model çağırışının `provider/model` (200 simvola qədər).
- yalnız `baseUrl` — `http` : 500 simvola qədər `http(s)` URL, etimadnamə, sorğu və ya fraqment olmadan. Bu OmniRoute (döngü + `PORT`) işarə edən URL rədd edilir.
- yalnız `wire` — `http` : `systemone` (standart) və ya `openai-chat`.
- `connectionId` — açarı istifadə edilən saxlanılan əlaqə (yalnız zəng edən API açarının icazə verilən əlaqələri daxilində). Onsuz, `systemone` `typesafe` bağlantısını oxuyur və hər bir şəbəkə qərarçısı `OMNIROUTE_DECISION_API_KEY` ə qayıdır. `apiKey` sahəsi yoxdur: açar heç vaxt kombinasiyada saxlanmır.
- `timeoutMs` — tam, 100–5000, standart 2000.
- `minConfidence` — 0–1; aşağı inamlı cavab `rules` -ə qayıdır (etibarsızlığı bildirən qərar verən 0 kimi sayılır).
- `descriptions` — 50-yə qədər giriş (300-ə qədər açar, 1000 simvola qədər mətn), model id və ya `provider/model` ilə açar; təyin edilməmiş qeydlər yaradılan qiymət dərəcəsi təsvirini əldə edir.

**bayraq.** `COMBO_DECISION_ROUTER_ENABLED` (defolt `false`) hər qərar verənin qapısını açır. O, söndürüldükdə, `decision` kombo etimadnaməni oxumur, zəng etmir və `rules` ilə marşrutlar; log `fallback (disabled)` deyir. Yalnız saxlanılan açar onu heç vaxt açmır. Qərar bloku olmayan kombinlər ümumiyyətlə təsirlənmir.

**Qutudan nə qalır.** Yalnız son istifadəçi mesajının mətni (8000 simvola qədər; chat/Claude `messages` və ya Cavablar `input`) və onların təsviri ilə model identifikatorlarının menyusu. Heç vaxt sistem sorğusu, Responses `instructions`, alətlər, tarixçə, başlıqlar və ya hesab məlumatları. Şəbəkə zəngləri təkrar cəhdlər, yönləndirmələr və 64 KB cavab məhdudiyyəti olmadan provayderin gedən mühafizəçisindən keçir. `combo-model` zəngi yayımlanmır, alətsizdir, `temperature: 0`, 256-token büdcəsi ilə; qərar qəbulu daxilində başlayan qərar qəbul edilməz.

**Failure behavior** is fail-open: any failure resolves to the `rules` decision, and the reason reads `decision(<decider>): fallback (<reason>)`, with `<reason>` one of `disabled`, `not_configured`, `missing_credential`, `timeout`, `http_error`, `invalid_response`, `out_of_menu`, `refused`, `cooldown`, `network_error`, `recursion`, `low_confidence`, `single_option` or `no_user_text`. After a timeout, HTTP error or network error the endpoint is skipped for 30 s. A successful pick reads `decision(<decider>): selected <model> from <n>; confidence <c> (<rules reason>)`. No URL, key, prompt or upstream body reaches the log.

Kombinə qurucu bu sahələri marşrutlaşdırıcı strategiyası `decision` olduqda, yer tutucular kimi yaradılan təsvirlərlə göstərir.** Test qərarı** saxlanmamış parametrlərlə (eyni bayraq) bir dəfə `POST /api/combos/decision-preview` çağıran düymə.

**Nə vaxt istifadə etməli** : Nadir tərəfindən deyil, seçdiyiniz klassifikator tərəfindən hər sorğuya görə seçilmiş səviyyənin seçilməsini istədiyiniz qarışıq çətinlik trafiki.

**ləqəb** : `decision` (ləqəb yoxdur)

---

### Fərdi marşrutlaşdırıcı strategiyaları

Siz ictimai API vasitəsilə öz `RouterStrategy` tətbiqinizi qeydiyyatdan keçirə bilərsiniz:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Your routing logic here
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Sonra istifadə edin:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Router strategiyasının seçilməsi təlimatı

| İstifadə işi               | Strategiya  | Səbəb                                  |
| -------------------------- | ----------- | -------------------------------------- |
| Balanslaşdırılmış iş yükü  | `rules`     | Standart — bütün amilləri nəzərə alır  |
| Xərcləri minimuma endirmək | `cost`      | Həmişə ən ucuzunu seçir                |
| Gecikməni minimuma endir   | `latency`   | Ən sürətli etibarlı provayderi seçir   |
| Ciddi SLOs                 | `sla-aware` | p95/error/cost hədləri üzrə filtrlər   |
| Çox növbəli söhbət         | `lkgp`      | Sessiyaya yapışqanlıq                  |
| Qarışıq çətinlik           | `nadir`     | Hər sorğu üçün model səviyyəsini seçir |
| Öz təsnifatçısı            | `decision`  | Qərar verəniniz modeli seçir           |

SLA-dan xəbərdar olan sahələr:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Tapşırığa uyğunluq

30-dan çox model 6 tapşırıq növü (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`) üzrə qiymətləndirilib. Joker simvol nümunələrini dəstəkləyir (məsələn, `*-coder` → yüksək kodlaşdırma balı).

## Avtomatik variantların xülasəsi

Sadə `auto` (standart) və `autoPrefix.ts` faylında elan edilmiş 6 `AutoVariant` dəyəri daxil olmaqla, **7 çağırıla bilən model ID-si** var:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` özü 6 dəyəri sadalayır; 7-ci seçim «variantsız» — sadə `auto` — olub, `parseAutoPrefix()` tərəfindən `variant: undefined` kimi emal edilir.)

## Səviyyələrin Auto-Combo-ya uyğunluğu

16 amilli qiymətləndirmə funksiyası (`open-sse/services/autoCombo/scoring.ts`) səviyyə
üzvlüyünü iki siqnal kimi nəzərə alır: `tierPriority` (0.0476) və `tierAffinity` (0.0476). Tam
`DEFAULT_WEIGHTS` dəsti üçün yuxarıdakı kanonik [qiymətləndirmə amilləri cədvəlinə](#how-it-works-persisted-auto-combos) baxın — hər paket üzrə əvəzləmələr (ship-fast/cost-saver/quality-first/
offline-friendly) "Hər paket üçün çəki profilləri" cədvəlində göstərilib.

Təkcə səviyyə **Tier 1**-in birinci olmasını təmin etmir — əgər **Tier 1** gecikməsi yüksəkdirsə və ya
xərc-keyfiyyət nisbəti optimal deyilsə, **Tier 2** üstün gəlir. Səviyyə sıralamasını məcburi etmək üçün
`priority` kombinasiya strategiyasından istifadə edin və provayderləri səviyyələrə görə düzün.

**Tier 1**-ə (abunəlik) güclü üstünlük vermək üçün `tierPriority` çəkisini artırın:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Səviyyə tərifləri və provayder təsnifatı üçün [`docs/guides/TIERS.md`](../guides/TIERS.md) sənədinə baxın.

## Test və Əhatə

### Deterministik marşrutlaşdırma-qərar matrisi (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` marşrutlaşdırmanı sübut edir** qərar** ictimai strategiyaların o, istehzalı yuxarı axını ilə real kombinasiya boru kəməri vasitəsilə başdan sona əhatə edir. Əhatəyə daxildir:

- Bütün 21 `ROUTING_STRATEGY_VALUES` strategiyası (sifarişli, ölçülmüş, qiymət, kontekst, birləşmə, …).
- `quota-share` (daxili) end-to-end: DRR ədalətlilik + saturation deprioritization real `selectQuotaShareTarget` seam (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay` hər bir hədəf sayı üzrə universal ötürülmə əhatəsi.

Bu paket `--test-concurrency=1` və `--test-force-exit` ilə CI (`test:integration` işi) ilə işləyir, ona görə də deterministikdir və canlı etimadnaməsini tələb etmir.

### Qapalı canlı tüstü (NOT in CI — real provayderlər)

| Əmr                                    | Nə edir                                                                            |
| :------------------------------------- | :--------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | `RUN_COMBO_LIVE=1` ilə prosesdə real marşrutlaşdırma; canlı OmniRoute DB snapshots |
| `npm run test:combo:live:vps`          | HTTP canlı OmniRoute serverinə qarşı zənglər ( `COMBO_LIVE_BASE_URL` təyin edin)   |
| `npm run test:combo:live:vps:failover` | Eynilə, qəsdən uğursuzluq ssenariləri ilə                                          |

Bu tüstü testləri real tel yolunu həyata keçirir (kombo → provayderi → tamamlanması). Onlar CI dən bilərəkdən xaric edilirlər, çünki onlar canlı etimadnamələr və VPS girişi tələb edir.

---

## Fayllar

| Fayl                                                      | Məqsəd                                                                                                                     |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 faktorlu qol funksiyası, `DEFAULT_WEIGHTS`, hovuz norması                                                               |
| `open-sse/services/autoCombo/taskFitness.ts`              | Model × tapşırığı fitness axtarışı                                                                                         |
| `open-sse/services/autoCombo/engine.ts`                   | Seçim məntiqi, quldur, büdcə qapağı                                                                                        |
| `open-sse/services/autoCombo/selfHealing.ts`              | İstisna, zondlar, insident rejimi                                                                                          |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 çəki profili (göndərmə sürəti, xərclərə qənaət, keyfiyyət birinci, oflayn dostluq, ilk növbədə etibarlılıq, xaos rejimi) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefiksi parser + 6 variantları                                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Canlı bağlantılardan yaddaşda `AutoComboConfig` qurur                                                                      |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Provayder reyestrini lağa qoymaq üçün test çəngəl                                                                          |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 strategiya)                                                                                  |
| `src/sse/handlers/chat.ts`                                | İnteqrasiya: avtomatik prefiks qısaqapanma                                                                                 |
