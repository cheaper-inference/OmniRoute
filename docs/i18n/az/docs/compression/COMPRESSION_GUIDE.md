# 🗜️ Prompt Compression Guide — OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Uyğun kontekstdə avtomatik olaraq 15-95% qənaət edin. Qısa icmal üçün [README-dəki Sıxılma bölməsinə](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) baxın.

## İcmal

OmniRoute sorğular yuxarı axın provayderlərinə çatmazdan əvvəl **proaktiv şəkildə** işləyən modul tipli prompt sıxılma konveyerini həyata keçirir. Bu o deməkdir ki, token qənaəti şəffaf şəkildə baş verir — iş prosesinizdə heç bir dəyişiklik tələb olunmur.

```
Müştəri sorğusu
  → Sıxılma strategiyasının seçicisi
    → Kombinasiya üzrə üstün təyin edilmiş parametr var? → Kombinasiya parametrindən istifadə et
    → Avtomatik işə düşmə həddi keçilib? → Avtomatik rejimdən istifadə et
    → Defolt rejim var? → Qlobal parametrdən istifadə et
    → Söndürülüb? → Sıxılmanı ötür
  → Seçilmiş sıxılma rejimi
    → Söndürülüb: Sıxılma yoxdur
    → Yüngül: Təhlükəsiz boşluq/formatlama təmizlənməsi (~15%)
    → Standart: Mağara adamı üslubunda doldurucu sözlərin silinməsi (~30%)
    → Aqressiv: Tarixçənin köhnəldilməsi + xülasələşdirmə (~50%)
    → Ultra: Evristik seyrəltmə + kod bloklarının incəldilməsi (~75%)
    → RTK: Əmr əsaslı terminal/alət çıxışı filtrləməsi (yuxarı axında 60-90% diapazon)
    → Yığılmış: Ardıcıllığı müəyyən edilmiş çoxmühərrikli konveyer, adətən əvvəl RTK, sonra Caveman (uyğun kontekstdə 78-95% diapazon)
  → Sıxılmış sorğu → Provayder
```

---

## Sıxışdırma Rejimləri

### Söndürülüb

Heç bir sıxışdırma tətbiq edilmir. Bütün mesajlar dəyişdirilmədən ötürülür.

### Lite rejimi (~15% qənaət, <1ms gecikmə)

Ən təhlükəsiz rejim — formatın təmizlənməsi. Onun alət nəticələrinin qısaldılması itkilidir, buna görə də standart
marşrut (`allow-lossy`, `engine:lite` və ya adlandırılmış kombinasiyaya qoşulma olmadan) `compressToolResults: false` ilə lite rejimində işləyir:
əvvəlki alət nəticələri provayderə dəyişdirilmədən çatdırılır.

| Texnika                  | Təsvir                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Ardıcıl boş sətirləri və sətir sonundakı boşluqları birləşdirir                                |
| `dedupSystemPrompt`      | Təkrarlanan sistem mesajlarını silir                                                           |
| `compressToolResults`    | Əvvəlki alət nəticələrini lite həddinə qədər qısaldır (itkilidir: yalnız sorğu ilə qoşulduqda) |
| `removeRedundantContent` | Təkrarlanan təlimatları çıxarır                                                                |
| `replaceImageUrls`       | Base64 təsvir məlumatı URI-lərini qısaldır                                                     |

**Ən uyğun olduğu hallar:** Daimi istifadə, təhlükəsizlik baxımından kritik iş axınları.

### Standart rejim (~30% qənaət)

[Caveman](https://github.com/JuliusBrussee/caveman)-dan ilhamlanıb — mənanı qoruyaraq doldurucu sözləri və ətraflı ifadələri aradan qaldırır:

- Doldurucu sözləri silir ("please", "I think", "basically", "actually")
- Ətraflı ifadələri yığcamlaşdırır ("in order to" → "to", "as a result of" → "because")
- Nəzakətli tərəddüd ifadələrini çıxarır ("Would you mind...", "If you could possibly...")
- Kodlaşdırma sorğuları üçün uyğunlaşdırılmış 30-dan çox regex qaydası

**Ən uyğun olduğu hallar:** Gündəlik kodlaşdırma iş axınları, xərclərə həssas komandalar.

### Aqressiv rejim (~50% qənaət)

Uzun sessiyalar üçün ağıllı tarixçə idarəetməsi:

- **Mesajların köhnəlməsi** — daha köhnə mesajlar tədricən sıxışdırılır
- **Alət nəticələrinin sıxışdırılması** — uzun alət çıxışları qısaldılır və ya ixtisar edilir (ilk/son sətirlər,
  uyğunluq sətrinə görə filtrləmə, JSON açarlarının yığcamlaşdırılması)
- **Struktur bütövlüyü qoruyucuları** — `tool_use` + `tool_result` cütlərinin uyğun qalmasını təmin edir
- **Kontekst pəncərəsindən xəbərdarlıq** — hər model üçün token limitlərinə riayət edir

**Ən uyğun olduğu hallar:** Genişləndirilmiş sazlama sessiyaları, böyük kod bazaları.

### Ultra rejimi (~75% qənaət)

Token baxımından kritik ssenarilər üçün maksimum sıxışdırma:

- **Evristik budama** — nəsrin ballara əsaslanan token budaması
- **Strukturun qorunması** — hasarlanmış kod blokları, daxili kod, URL-lər və identifikatorlar
  toxunulmaz saxlanılır və yenidən olduğu kimi birləşdirilir, heç vaxt budanmır
- **İstəyə bağlı SLM səviyyəsi** — konfiqurasiya edildikdə kiçik lokal model budamanı dəqiqləşdirə bilər
- Aqressiv rejimdən müstəqildir: mesajların köhnəlməsini, alət nəticələrinin sıxışdırılmasını
  və ehtiyat xülasəçini işə salmır (yalnız SLM səviyyəsinin uğursuzluğu ehtiyat keçidi aqressiv rejimə yönləndirə bilər)

**Ən uyğun olduğu hallar:** Kontekst limitləri ilə təkrarən qarşılaşdıqda.

### RTK rejimi (upstream aralığında 60-90%)

RTK rejimi kodlaşdırma agenti sessiyalarında görünən ətraflı alət çıxışları üçün optimallaşdırılıb:

- `git status`, `git diff`, `git log`, test işə salıcıları,
  TypeScript/Vite/Webpack build-ləri, ESLint/Biome/Prettier, npm audit/quraşdırmaları, Docker logları, infrastruktur
  çıxışları və ümumi shell çıxışı kimi əmr/çıxış siniflərini aşkarlayır
- `open-sse/services/compression/engines/rtk/filters/` qovluğundakı JSON filtr paketlərini tətbiq edir
- Layihə və ya qlobal `filters.toml` fayllarından RTK TOML sxeması v1 filtrlərini idxal edir; layihə faylları üçün daxili test
  yoxlaması və etibar nəzarəti tətbiq edir
- Daxili yoxlama nümunələri ilə 56 daxili filtr təqdim edir
- ANSI idarəetmə ardıcıllıqlarını, tərəqqi indikatorlarını, təkrarlanan sətirləri və əməli əhəmiyyəti olmayan səs-küyü silir
- Uğursuzluqları, xətaları, xəbərdarlıqları, dəyişdirilmiş faylları, xülasələri və uzun çıxışın son hissəsini qoruyur
- Etibar nəzarətli layihə filtrlərini, qlobal filtrləri və istəyə bağlı redaktə edilmiş xam çıxışın bərpasını dəstəkləyir

**Ən uyğun olduğu hallar:** Shell, build, test, git, grep və fayl çıxışı transkriptləri olan agent sessiyaları.

### Yığılmış rejim (uyğun diapazonda 78-95%)

Yığılmış rejim bir neçə sıxışdırma mühərrikini deterministik ardıcıllıqla işlədir. Standart boru xətti:

```txt
RTK -> Caveman
```

Bu ardıcıllıq əvvəlcə terminal/alət çıxışını yığcam saxlayır, sonra qalan təbii dilli sorğuya Caveman semantik yığcamlaşdırmasını tətbiq edir.
Yığılmış boru xətləri qlobal şəkildə və ya marşrutlaşdırma kombinasiyalarına təyin edilmiş sıxışdırma kombinasiyaları vasitəsilə konfiqurasiya edilə bilər.

**Ən uyğun olduğu hallar:** Böyük alət logları ilə insan təlimatlarının və ya köməkçi xülasələrinin qarışıq olduğu kontekst.

## Yuxarı Axın Qənaətlərinin Hesablanması

OmniRoute sıxılma qənaətlərini iki mənbə əsasında sənədləşdirir: yuxarı axın layihələrinin bençmarkları və
OmniRoute-un öz mühərrik kombinasiyası.

| Mənbə   | Burada istifadə edilən yuxarı axın README göstəricisi                                                                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` daha az çıxış tokeni, bençmark üzrə orta hesabla `65%` çıxış qənaəti, `22-87%` diapazonu və `~46%` giriş sıxılma aləti |
| RTK     | Komanda çıxışında `60-90%` qənaət; nümunə sessiya: `~118,000 -> ~23,900` token və ya `79.7%` qənaət (`~80%`)                  |

Üst-üstə düşən alət/kontekst yükləri üçün standart OmniRoute kombinasiyası mühərrikləri ardıcıl tətbiq edir:

```txt
RTK -> Caveman
```

Birləşdirilmiş qənaətlər toplanmır, vurulur:

```txt
combined = 1 - (1 - RTK qənaəti) * (1 - Caveman giriş qənaəti)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Bu `78-95%` göstəricisi həm RTK, həm də Caveman eyni giriş/kontekst yükünü azalda bildikdə tətbiq olunur.
Caveman cavab çıxışı rejimi ayrıdır: aktivləşdirildikdə Caveman-in öz çıxış qənaətlərindən (orta hesabla `65%`,
əsas göstərici `~75%`, diapazon `22-87%`) istifadə edin. Ümumi ödəniş qənaətləri sorğu/çıxış nisbətinizdən asılıdır.

### "Uyğun" əslində nə deməkdir

Başlıqda göstərilən 15-95% diapazonu realdır, lakin o yalnız **təkrarlanan və ya həddindən artıq təfərrüatlı**
məzmuna — təkrarlanan xəta sətirlərinə, eyni xəbərdarlığı durmadan çıxaran yığım jurnalına, həddindən artıq böyük
`grep`/fayl oxuma çıxışına tətbiq olunur. Bu, hər sorğunun bu qədər qənaət təmin etdiyi
**demək deyil**.

Empirik olaraq təsdiqlənib (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 eyni
xəta sətrindən ibarət Anthropic formalı `tool_result` bloku üzərində `stacked` (RTK + Caveman) icrası
**95.93% token qənaəti / 96.26% simvol qənaəti** təmin edib — bu da elan edilən diapazona tam uyğundur.
Lakin eyni emal xətti normal, təkrarlanmayan alət çıxışı (təmiz `grep` uyğunluq siyahısı,
qısa fayl oxunuşu, adi danışıq mətni) üzərində işlədildikdə haqlı olaraq **sıfıra yaxın qənaət** təmin edir, çünki
silinəcək təkrarlanan heç nə yoxdur və `validateCompression()` (`validation.ts`) kod bloklarını, URL-ləri,
başlıqları, versiyaları və ya TAMAMILƏ-BÖYÜK-HƏRFLƏRLƏ yazılmış sabit identifikatorları siləcək və ya dəyişdirəcək
yenidən yazılmış məzmunun göndərilməsinə icazə vermir.

Bu, xəta deyil, gözlənilən və təhlükəsiz davranışdır: əsasən təmiz faylları oxuyan/`grep` ilə axtaran kodlaşdırma sessiyasında
sıxılma tam aktiv olsa belə, ümumi qənaət az olacaq, uğursuzluq dövrəsinə və ya həddindən artıq çox məlumat çıxaran
linterə rast gələn sessiyada isə həmin trafik üzrə tam 78-95% diapazonu müşahidə ediləcək. Tək bir sessiyanın
aşağı məcmu qənaət faizini sıxılmanın yanlış konfiqurasiya edildiyinə sübut kimi istifadə etməyin — əvvəlcə
əsas alət çıxışının həqiqətən təkrarlanan olub-olmadığını yoxlayın.

---

## Token Qənaətinin Vizual Təqdimatı

```
Sıxılma olmadan:       LLM-ə 47K token göndərilir
Lite ilə:              40K token göndərilir          (15% qənaət — təhlükəsiz, həmişə aktiv)
Standard ilə:          33K token göndərilir          (30% qənaət — caveman-speak qaydaları)
Aggressive ilə:        24K token göndərilir          (50% qənaət — köhnəlmə + ümumiləşdirmə)
Ultra ilə:             12K token göndərilir          (75% qənaət — evristik budama)
RTK ilə:               19K-5K token göndərilir       (komanda/alət çıxışında 60-90% qənaət)
Stacked ilə:           10K-2.5K token göndərilir     (uyğun RTK+Caveman məzmununda 78-95% diapazonu)
```

---

## Konfiqurasiya

### İdarə paneli

`Dashboard → Context & Cache` bölməsinə keçin:

- **Caveman** — rejim seçimi, dil paketləri, ilkin baxış və qlobal standartlar
- **RTK** — əmrlər üzrə filtr ilkin baxışı, RTK təhlükəsizlik parametrləri və filtr kataloqu
- **Compression Combos** — marşrutlaşdırma kombinasiyalarına təyin edilmiş adlı mühərrik konveyerləri
- **Auto-Trigger Threshold** — token sayı həddi keçdikdə sıxılmanı avtomatik aktivləşdirir

### Kombinasiya üzrə əvəzləmə

`Dashboard → Context & Cache → Compression Combos` bölməsində marşrutlaşdırma
kombinasiyasına sıxılma kombinasiyası təyin edin:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu, ödənişli abunəliklərdə lite rejimini saxlayaraq pulsuz/kodlaşdırma provayderlərində
ardıcıl sıxılmadan istifadə etməyə imkan verir.

Bu “Per-Combo Override” təyinatı **marşrutlaşdırma kombinasiyasının sıxılma rejimi
əvəzləməsindən** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — sahənin sxemi
həmçinin `rtk`, `stacked` və `omniglyph` dəyərlərini qəbul edir) fərqli idarəetmə vasitəsidir —
həmin əvəzləmə adlı sıxılma kombinasiyası konveyerini seçmir; sadəcə
`resolveCompressionPlan` tərəfindən nəzərə alınan `compressionMode` sahəsini təyin edir. Bu,
kombinasiya kartında (`Dashboard → Combos`) və ya #6760-dan etibarən
`Dashboard → Context & Cache → Compression Combos` bölməsindəki “Assign to routing” siyahısında,
yuxarıda sənədləşdirilmiş konveyer təyinatı onay qutusunun dərhal yanında, hər marşrutlaşdırma
kombinasiyası üzrə təyin edilə bilər. Hər iki interfeys eyni `PUT /api/combos/{id}` endpoint-i
vasitəsilə saxlanılır.

### Sorğu üzrə əvəzləmə

Tək bir sorğu üçün sıxılma planını əvəzləmək məqsədilə `x-omniroute-compression` sorğu
başlığını göndərin. Bu, ən yüksək üstünlüyə malikdir — marşrutlaşdırma kombinasiyasının
əvəzləməsindən, aktiv profildən, avtomatik işə salmadan və paneldəki Default-dan üstündür.
Naməlum dəyərlər nəzərə alınmır (sorğu heç vaxt rədd edilmir) və qlobal əsas keçid hər şeyi
idarə etməyə davam edir: sıxılma qlobal olaraq söndürülübsə, başlıq onu aktivləşdirə bilməz.
Dəyərlər:

| Dəyər         | Təsir                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | Bu sorğu üçün sıxılma tətbiq edilmir.                                                                          |
| `default`     | Paneldən törədilmiş Default profili (aktiv profil nəzərə alınmır). İtkili mühərriklər söndürülmüş qalır.       |
| `safe`        | Başlığın buraxılması ilə eynidir.                                                                              |
| `allow-lossy` | Xülasələr, uyğunluq filtrləri və üslub yenidən yazmaları daxil olmaqla, bu sorğunun operator planını saxlayır. |
| `engine:<id>` | Aktiv olduqda tək mühərrik, məsələn, `engine:rtk`. Bu, həmin mühərrik üçün sorğu üzrə açıq seçimdir.           |
| `<combo>`     | Adla (əvvəlcə böyük-kiçik hərf həssaslığı olmadan), sonra isə id ilə uyğunlaşdırılan adlı kombinasiya.         |

`allow-lossy`, `engine:<id>` və ya adlı kombinasiya olmadan itkilə işləyən mühərriklər tətbiq
edilmir. İtkili Default, avtomatik işə salma və ya marşrutlaşdırma əvəzləməsi aşağı salındıqda,
OmniRoute konfiqurasiya edilmiş ardıcıl konveyerdən tanınmış itkisiz addımları konfiqurasiya
edilmiş ardıcıllıqla saxlayır. Yalnız konfiqurasiya edilmiş heç bir itkisiz addım qalmadıqda
`session-dedup → lite` variantına keçir.

Settings panelinin **Effective pipeline** ilkin baxışı adi, saxlanılan planı göstərir. Avtomatik
işə salma işləyə bildikdə, eyni ilkin baxış şərti effektiv konveyeri də göstərir ki, panel və
başlıqsız icra zamanı həlli uyğun olaraq qalsın.

Tətbiq edilmiş plan `X-OmniRoute-Compression: <mode>; source=<source>` cavab başlığında geri
qaytarılır; burada `<source>` aşağıdakılardan biridir: `request-header`, `routing-override`,
`active-profile`, `auto-trigger`, `default` və ya `off`.

### API

```bash
# Sıxılma parametrlərini əldə edin
curl http://localhost:20128/api/settings/compression

# Sıxılma parametrlərini yeniləyin
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Müəyyən RTK/stacked yükünü ilkin baxışdan keçirin
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtr paketlərini siyahıya alın
curl http://localhost:20128/api/context/rtk/filters

# İxtiyari əmr metadatası ilə RTK-nı birbaşa sınaqdan keçirin
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Nələr Qorunur

Sıxılma mühərriki **həmişə bunları qoruyur:**

- ✅ Kod blokları (çərçivələnmiş və sətirdaxili)
- ✅ URL-lər və fayl yolları
- ✅ JSON strukturları və strukturlaşdırılmış verilənlər
- ✅ İdentifikatorlar və qorunan texniki tokenlər
- ✅ Riyazi ifadələr
- ✅ Alət/funksiya çağırışı tərifləri
- ✅ Sistem promptları (lite rejimində)

RTK xam çıxışın bərpası hər hansı məlumat yadda saxlanmazdan əvvəl geniş yayılmış API açarlarını, bearer tokenlərini, Slack tokenlərini, AWS giriş açarlarını, parolları, tokenləri və məxfi məlumatları redaktə edir.

---

## Sıxılma Statistikası

Hər sıxılmış sorğu server jurnallarında statistikanı ehtiva edir:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Mərhələlər üzrə Yol Xəritəsi

| Mərhələ    | Rejimlər                                                                                                                                                                       | Status       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| Mərhələ 1  | Söndürülmüş, Lite                                                                                                                                                              | ✅ Buraxılıb |
| Mərhələ 2  | Standard, Aggressive, Ultra                                                                                                                                                    | ✅ Buraxılıb |
| Mərhələ 3  | RTK, Stacked, Sıxılma Kombinasiyaları                                                                                                                                          | ✅ Buraxılıb |
| Mərhələ 4  | Çıxış Üslubları, SLM səviyyəli Ultra, qiymətləndirmə mexanizmi                                                                                                                 | ✅ Buraxılıb |
| Mərhələ 4C | Adaptiv kontekst büdcəsi ("tənzimləyici") — hesablama mühərriki + API (`PUT /api/settings/compression` üzərində `contextBudget`) + idarə panelində rejim/siyasət idarəetmələri | ✅ Buraxılıb |

---

## Təşəkkürlər

Standard rejiminin sıxılma qaydaları **[JuliusBrussee](https://github.com/JuliusBrussee)** tərəfindən hazırlanmış **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — viral "az token işi görərkən niyə çox token istifadə etməli" layihəsindən ilhamlanıb. Caveman çıxış tokenlərinin `~75%` azaldığını, bençmark üzrə orta çıxış qənaətinin `65%` olduğunu, çıxış diapazonunun `22-87%` təşkil etdiyini və `~46%` giriş sıxılma alətini bildirir.

RTK rejimi **[RTK AI](https://github.com/rtk-ai)** tərəfindən hazırlanmış **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — terminal, yığma, sınaq, git və alət çıxışlarının filtrlənməsi üçün yüksək məhsuldarlıqlı əmr çıxışı sıxılma layihəsindən ilhamlanıb. RTK `60-90%` qənaət bildirilir və onun README nümunə sessiyasında `~80%` qənaət göstərilir.

---

## Qabaqcıl Sıxılma Sistemləri

Yuxarıda təsvir edilən 7 rejimdən başqa (mənbə bu təlimatda əhatə olunmayan `codex-responses` və `omniglyph` rejimlərini də qəbul edir), aşağıdakı bölmələr həmin rejimlərin daxilində və ya onların yanında işləyən funksiyaları əhatə edir: Alət Nəticələrinin Sıxılması və Proqressiv Yaşlanma aqressiv mühərrikin 1 və 2-ci addımlarıdır (Aqressiv rejim və yığılmış boru xəttinin `aggressive` addımı, yığılmış boru xəttinin necə işləndiyi), Keşdən xəbərdar olan sıxılma sıxılma aktiv olduğu halda keşləmə provayderləri üçün `aggressive` və `ultra` -ni `standard` səviyyəsinə endirir və Caveman Çıxış Rejimi və Çıxış Üslubları sorğunu sıxışdırmaq əvəzinə modelin çıxışını formalaşdıran, defolt olaraq deaktiv olan sistemə qoşulma təlimatlarıdır.

### Cache-aware sıxılma

Bəzi provayderlər (tez keşləmə ilə Anthropic kimi) dəstəkləyir** operativ keşləmə** , bu onlara xərcləri və gecikməni azaltmaq üçün sorğunun hissələrini önbelleğe almağa imkan verir. Keşləmə aktiv olduqda, aqressiv sıxılma əslində ola bilər** incitmək** performans, çünki o, keşlənmiş nişanları dəyişir, keşi etibarsız edir.

`cachingAware.ts` modulu bunu həll edir** keş kontekstinin aşkarlanması** və** sıxılma strategiyasının tənzimlənməsi** müvafiq olaraq.

#### Necə işləyir

1. **Keşləmə kontekstini aşkar edin** — `cache_control` markerləri üçün sorğu orqanını skan edir
2. **Keşləmə təminatçılarını müəyyənləşdirin** — provayderin keşləşdirməni dəstəklədiyini yoxlayır
3. **Strategiyanı tənzimləyin** — Keşləmə provayderləri üçün `aggressive`/`ultra` ni `standard` a endirir
4. **Sistem sorğusunu atlayın** — Sistem göstərişləri adətən keşlənir, ona görə də onları sıxmayın

Strategiya köməkçisi də `deterministicOnly` bayrağını qaytarır, lakin plan qurucusu yalnız strategiya — istifadə edir, aşağı axın heç bir şey bu gün bayrağı oxumur.

#### Kod nümunəsi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Nə vaxt istifadə etməli

Keş məlumatlı sıxılmadır** həmişə açıq** — konfiqurasiyaya ehtiyac yoxdur. O, sıxılma aktiv olduqda işə başlayır və hədəf provayder operativ keşləşdirməni dəstəkləyir (Anthropic, OpenAI və s.); açıq `cache_control` markerləri tələb olunmur — keşləmə provayderi təkbaşına endirməyə təkan verir və yalnız markerlər heç vaxt bunu etmir (markerin aşkarlanması strategiya qərarını deyil, keş telemetriyasını verir).

OpenRouter yalnız `anthropic/*` modelləri üçün keşləmə provayderi kimi sayılır: Claude Kod sorğuları `cache_control` kəsilmə nöqtələrini (ən çoxu 4) saxlayır və qoruyucu prefiksi qoruyur, digər OpenRouter ailəsi (`openai/`, `google/`, `qwen/`, …) isə soyulmuş və qorunmamış qalır.

### Proqressiv Yaşlanma

Uzun söhbətlər çoxlu mesaj növbələrini toplayır, lakin köhnə növbələr daha az aktuallaşır. `progressiveAging.ts` modulu** mesajları növbə məsafəsinə görə pisləşdirir** (söhbətin sonundan ölçülən məsafə). Göndərilən defoltlarla (`verbatim: 2, light: 2, moderate: 3`):

- **Son 2 döngə (məsafə ≤ 2)** : Sözlə saxlanılır
- **Məsafə 3** : Mağara adamının sıxılması (doldurucunun çıxarılması)
- **Məsafə 4 +** : Köməkçi mesajlarının xülasəsi; istifadəçi mesajları ilk sətirə endirilib, 120 simvolla məhdudlaşır; başqa rollar toxunulmaz. Sistem göstərişləri, artıq köhnə mesajlar və ən son istifadəçi mesajı məsafədən asılı olmayaraq həmişə sözlə saxlanılır. Heç bir şey birbaşa atılmır və `light` diapazonu göndərilən defoltlarla əlçatmazdır (`light` `verbatim` bərabərdir).

#### Kod nümunəsi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Nə vaxt istifadə etməli

Proqressiv yaşlanmadır** həmişə açıq** `aggressive` rejimi — üçün `compressAggressive()` nin 2-ci addımıdır. Ultra rejimi onu işlətmir. Xüsusilə aşağıdakılar üçün təsirlidir:

- Uzun müddət davam edən kodlaşdırma sessiyaları
- Çox günlük söhbətlər
- Çoxlu alət çağırışları ilə agent iş axınları

### Caveman Çıxış Rejimi

Caveman çıxış rejimi əlavə edir** sistem tez təlimatlar** modelin özündən qısa çıxış üçün xahiş edən — `lite` səviyyəsi tam cümlələri saxlayan qısa cavablar soruşur, `full` ondan "ağıllı mağara adamı kimi qısaca cavab verməyi" xahiş edir və `ultra` teleqraf çıxışını soruşur; təlimatlar yalnız soruşur, onlar buna zəmanət verə bilməzlər. Sorğular onları `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) vasitəsilə qəbul edir: `open-sse/handlers/chatCore.ts` əvvəlcə seçimi arxa uyğunluq şim ilə həll edir (`resolveOutputStyleSelection()` -də `open-sse/services/compression/outputStyles/backCompat.ts`), bu, `outputStyles` boş olduğu halda, aktivləşdirilmiş `cavemanOutputMode` `cavemanOutputMode.intensity` -də `terse-prose` çıxış üslubuna uyğunlaşdırır (aşağıda Back-compat-a baxın); boş olmayan `outputStyles` seçimi olduğu kimi istifadə olunur və `cavemanOutputMode.enabled` və `intensity` heç bir təsir göstərmir, halbuki onun `autoClarity` keçidi hələ də tətbiq olunur. `outputMode.ts` inyeksiyanın istifadə etdiyi təlimat mətnlərini (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), məzmun keçidini və yerləşdirmə köməkçisini saxlayır; öz `applyCavemanOutputMode()` injector heç bir istehsal zəng var.

#### Necə işləyir

Bu rejim girişi sıxışdırmır. O, sistem sorğusuna təlimat bloku əlavə edir (aşağıda inyeksiyanın necə işlədiyinə baxın) və sorğu üçün seçilmiş hər hansı daxiletmə sıxılma rejimi hələ də bloku daşıyan bədəndə bundan sonra da işləyir. Hər səviyyənin bitdiyi paylaşılan sərhədlər müddəasından əvvəl İngilis `full` səviyyəsi oxuyur:

> "Ağıllı mağara adamı kimi qısaca cavab verin. Məqalələri buraxın (a/an/the), doldurucu (just/really/basically/actually/simply), ləzzətlər, hedcinq. Fraqmentlər OK. Qısa sinonimlər (böyük geniş deyil, düzəldin həyata keçirilmir. Bütün texniki məzmunu, kodu, səhvləri, URLs, identifikatorları dəqiq saxlayın."

Bu xüsusilə yaxşı işləyir:

- Kod istehsalı (terser çıxışı = daha az token)
- Sürətli sual-cavab (ətraflı izahata ehtiyac yoxdur)
- Toplu emal (keçirmə qabiliyyətini maksimuma çatdırmaq)

#### Nə vaxt istifadə etməli

Caveman çıxış rejimidir** daxil olun** . Sıxılma aktiv olduqda (`enabled: true`, Sıxılma Parametrləri səhifəsində master keçidi), onu `cavemanOutputMode.enabled` ilə yandırın; `intensity` `lite`, `full` və ya `ultra` seçir:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompressiya kombinatı** Çıxış rejimi** keçid (`outputMode`, səviyyə `outputModeIntensity`) kombinatın tətbiq olunduğu sorğular üçün eyni keçidi təyin edir və `omniroute_set_compression_engine` MCP aləti onu mantiqi `outputMode` arqumenti vasitəsilə yazır. Boş olmayan `outputStyles` seçimi bu keçiddən üstündür. İdarə panelində, imkan verir** Tərs nəsr** çıxış üslubu eyni bloku daxil edir (aşağıdakı Çıxış Üslublarına baxın).

### Çıxış Üslubları (kataloq)

Yuxarıdakı Caveman çıxış rejimidir** miras tək üslublu yol** . 4-cü mərhələ onu tərtib edilə bilən çıxış üslubları kataloqunda ümumiləşdirdi: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Hər bir üslub modelin özündən daha ucuz çıxış tələb edən bir sistem təlimatıdır; üslublar birlikdə aktivləşdirilə bilər və kataloq sırasına daxil edilir.

| Stil                                     | `id`            | Nə edir                                                                                                                                                                                                                                                             | Təlimat dilləri                               |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Tərs nəsr                                | `terse-prose`   | filler/articles/hedging buraxın; texniki maddəni dəqiq saxlamaq. Köhnə mağara adamı çıxış rejimi ilə eyni mətn (istinad edilir, yenidən yazılmır).                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Daha az kod                              | `less-code`     | YAGNI nərdivanı: ən kiçik iş dəyişikliyi, tələb olunmayan abstraksiyalar yoxdur.                                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| At quyruğu (tənbəl baş inkişaf etdirici) | `ponytail`      | "Ən yaxşı kod heç vaxt yazılmayan koddur": > yenidən yazmağı təkrar istifadə edin, kök səbəb > simptomu, ən qısa iş fərqi.                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Məndə ADHD var (birinci hərəkət)         | `i-have-adhd`   | Əvvəlcə hərəkət ( nəsrdən əvvəl command/path/snippet ), nömrələnmiş məhdud addımlar, ONE konkret növbəti addım, preamble/recap/closers. yoxdur [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) dən uyğunlaşdırılmışdır.                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filtri                       | `antislop-ui`   | Hər bir vizual texnika məqsəd testindən keçməlidir (iyerarxiya, şəxsiyyət, oxunaqlılıq); heç bir standart gradients/glass/glow, qapaqlı palitrası, şablon tərtibatı yoxdur. Hər iki antislop üslubu heç bir ölü-nəzarət / heç bir uydurma iddia sərhədi əlavə edir. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop surəti və insan filtri          | `antislop-copy` | Xüsusi nüsxə (em tiresiz, ümumi CTAs, buzzwords, chatbot bağlayıcılar, icad edilmiş faktlar) üstəgəl insanlar qaydaları: WCAG AA kontrast, görünən fokus, klaviaturaya çatma, empty/loading/error dövlətləri, mobil reflow.                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                         | `terse-cjk`     | Klassik Çin dilində `full`/`ultra` cavabı (文言); `lite` yalnız funksional sözlər, xoş sözlər və ya bəzəklər olmadan qısa cavablar soruşur.                                                                                                                         | zh (yerli qapalı, aşağıya baxın)              |

Hər bir üslub üç intensivlik səviyyəsini göndərir — `lite`, `full`, `ultra` — və hər səviyyə kod bloklarını, fayl yollarını, əmrləri, səhvləri və URLs dəqiqliyini saxlayan paylaşılan sərhədlər bəndi ( `outputMode.ts`-də `SHARED_BOUNDARIES` ) ilə bitir. `terse-prose` və `terse-cjk` səviyyəli mətnlər həmin siyahıya identifikatorlar əlavə edir.

`terse-cjk` iki yerdə `zh` üçün yerli qapalıdır. Sıxılma Parametrləri səhifəsi onun cərgəsini yalnız tablosuna UI dili Çin dili (`zh-CN` və ya `zh-TW`) olduqda sadalayır və `applyOutputStyles()` onu yalnız sorğunun həll edilmiş dili (aşağıdakı Dil seçiminə baxın) `zh` olduqda daxil edir. Sətirin gizlədilməsi saxlanmış `terse-cjk` seçimini silmir: API parametrləri istənilən stil identifikatorunu qəbul edir və səhifədə digər üslubların saxlanması onu saxlayır. Sorğu zamanı `applyOutputStyles()` dil yoxlanışı yeganə yerli qapıdır.

#### Enjeksiyon necə işləyir

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) kataloqa qarşı seçimi həll edir (naməlum identifikatorlar və yerli dilə uyğun olmayan üslublar atılır, heç vaxt xəta baş vermir; heç bir üsluba uyğun olmayan seçim gövdəni dəyişməz qalır, `no_styles` kimi atlanır), seçilmiş təlimatları kataloq sırasına uyğunlaşdırır, sərhədlər bəndini əlavə edir** bir dəfə** (üstəlik təhlükəsizlik bəndi, `SAFETY_BOUNDARIES` və ya onun tərcüməsi, `less-code` və ya `ponytail` seçildikdə) və bloku tək identifikasiya markeri (`[OmniRoute Output Styles]`) ilə başlayır, ona görə də yenidən müraciət etmək qeyri-op edir. Həll edilmiş dildə (aşağıdakı Dil seçiminə baxın) tərcüməsi olduqda, ingilis dili əvəzinə lokallaşdırılmış təlimat yeridilir.

Qeyri-boş `messages` massivi olan gövdədə idempotensiyanın yoxlanışı məzmunun keçməsindən əvvəl həyata keçirilir: `[OmniRoute Output Styles]` markeri artıq yuxarı səviyyəli `system` sahəsində (sətir və ya məzmun bloku massivi) və ya sətir məzmunlu sistem mesajında olduqda, gövdə `already_applied` kimi dəyişməz qalır və açar söz yoxlanılmır. Əks halda, məzmun ötürməsi (`shouldBypassCavemanOutputMode()` ilə `open-sse/services/compression/outputMode.ts`) rolundan asılı olmayaraq son üç mesajın mətnini yoxlayır və həmin mətn onun təhlükəsizliyinə, geri dönməz fəaliyyətə və ya aydınlaşdırma açar sözlərinə və ya sıraya həssas ardıcıllıqla uyğunlaşdıqda bütün növbə üçün üslubları ötür: `first`, `then`, `after that` daxilində , `before`, `rollback`. `delete`, `drop`, `migrate`, `deploy` və ya `backup` ilə 240 `release`. Dolama yolu işləyərkən işləyir** Auto-Clarity Bypass** keçid (`cavemanOutputMode.autoClarity`, default olaraq aktivdir) aktivdir; keçidin söndürülməsi açar söz yoxlamasını keçir.

Bypass dönüşə icazə verdikdə, heç vaxt yeni `messages[0]` yaratmayan `placeSystemInstruction()` (eyni fayl), bloku tapdığı birinciyə yerləşdirir:

1. Simli məzmunlu aparıcı sistem mesajı: blok mətnindən sonra əlavə olunur.
2. Üst səviyyəli `system` sahəsi: blok sətir mətnindən sonra əlavə olunur və ya məzmun bloku massivinə yeni mətn bloku kimi əlavə olunur.
3. Simli məzmunlu ilk sonrakı sistem mesajı: blok mətnindən sonra əlavə olunur.
4. Yuxarıda göstərilənlərin heç biri: blok `messages` sonunda yeni sistem mesajına keçir.

`messages` massivi olmayan (və ya boş olan) gövdədə heç bir məzmun keçidi işləmir və yuxarı səviyyəli `system` sahəsinə müraciət edilmir. Blok `instructions` sətirinin mətnindən sonra əlavə olunur, əgər həmin sahədə artıq `[OmniRoute Output Styles]` markeri yoxdursa, bu halda gövdə `already_applied` kimi dəyişməz qalır. Bədəndə heç bir `instructions` sətir sahəsi olmadıqda, lakin `input` (sətir və ya massiv) daşıdıqda, blok `instructions` olur, bu sahədə saxlanılan istənilən qeyri-sətir dəyərini əvəz edir. Nə `instructions` sahəsi, nə də sətri və ya `input` massivi olmayan gövdə dəyişməz qalır və `no_messages` kimi atlanır.

#### Necə aktivləşdirmək olar

İdarə panelində:** Sıxılma Konteksti → Sıxılma Parametrləri** (`/dashboard/context/settings`), Çıxış üslubları bölməsi: on/off keçidi və səviyyə seçicisi ilə hər üslub üçün bir sıra. Sıxılmanın özü aktiv olduqda üslublar yeridilir (səhifənin əsas keçidi, `enabled`). The** Auto-Clarity Bypass** keçid üzərindədir** Mağara adamı** səhifə (`/dashboard/context/caveman`), onun** Çıxış rejimi** kart. Proqramlı olaraq, sıxılma konfiqurasiyası seçimi aşağıdakı kimi saxlayır:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: `outputStyles` boş olarkən, köhnə `cavemanOutputMode.enabled` parametri `cavemanOutputMode.intensity`-də `terse-prose` ə xəritələr verir. Daha sonra blok `[OmniRoute Output Styles]` markerindən başlayır, burada köhnə `applyCavemanOutputMode()` injektoru `[OmniRoute Caveman Output Mode]` yazıb. Markerin altındakı mətn en, pt-BR, es, de, fr, it, ru, id və vi ilə köhnə inyeksiyaya uyğun gəlir; ja və zh-də sərhədlər bəndindən əvvəl bir əlavə boşluq daşıyır. `terse-prose` pt-BR, es, de, fr, it, ru, zh, ja, id və vi dillərinə tərcümə olunur, buna görə də həll olunan dili `hu` olan sorğu köhnə injektorun öz macar dilindən istifadə etdiyi ingilis mətnini alır.

Çıxış üslubunda dil seçimi (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): `languageConfig.enabled` aktiv olduqda `autoDetect` sorğunun `messages` massivində mətni (sətir məzmunu və ya onun məzmun hissələrinin `text` ) olan ən son istifadəçi mesajını seçir və üzərində Caveman mühərrikinin detektorunu (`detectCompressionLanguage()`) işlədir. Detektor Han simvolları olan və kana olmayan mətn üçün `zh` qaytarır; əks halda `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` və `id` ən çox işarə uyğunluğu olanı qaytarır və `en` heç biri — mətninə uyğun gəlmədikdə onun təsnif edə bilmədiyi ingiliscəni alır, heç vaxt `defaultLanguage`, və `vi` `vi` vaxt aşkar edilmir. Responses API gövdəsi öz növbələrini `input`-də saxlayır, hansı ki, nümunə götürülmür, ona görə də `defaultLanguage`, sonra ingilis dilini alır. `messages` də heç bir istifadəçi mesajında mətn olmadıqda və ya `autoDetect` söndürüldükdə, `defaultLanguage`, sonra isə ingilis dili tətbiq olunur. `languageConfig.enabled` söndürüldükdə, sorğuya sıxılma kombinasiyası tətbiq olunmadıqda (sorğunun marşrutlaşdırma kombinasiyasına təyin edilən kombinasiya və ya defolt sıxılma kombinatı chatCore daxili yığılmış boru kəməri üçün geri düşərsə) dil ingiliscə — dir): kombinasiyanın tətbiqi həmin sorğu üçün `languageConfig.enabled` aktivləşdirir və `defaultLanguage` paketindən bir dəyəri təyin edir. kombo paketlərinin, əks halda, defolt olaraq `en` olan kombinin ilk paketi, saxlanmış `autoDetect` isə (defolt olaraq aktivdir) hələ də tətbiq olunur. Caveman daxiletmə mühərriki hər mətn hissəsinə görə öz qayda paketinin dilini fərqli şəkildə — seçir və avtomatik aşkarlama söndürüldükdə, `enabledPacks` də qapalıdır.

Stil × dil matrisi `tests/unit/compression/output-styles-i18n-matrix.test.ts` tərəfindən bərkidilir: hər bir kataloq üslubu testin `BASELINE_LANGUAGES`-də qeyd tələb edir; `KNOWN_ENGLISH_ONLY` siyahısında qeyd edilmədiyi halda yerli-qapılı olmayan üslub pt-BR tərcüməsini göndərməlidir (yerli qapalı `terse-cjk` bu qaydadan azaddır), hansı ki, yalnız tərcüməsi olmayan üslubları saxlaya bilər — hər hansı tərcüməsi olan sadalanan üslub testdən keçmir; və stil öz `BASELINE_LANGUAGES` girişinin siyahısında olan dili itirdikdə testdən keçmir. Üslub əlavə etmək üçün [EXTENDING_COMPRESSION.md-ə](./EXTENDING_COMPRESSION.md#adding-an-output-style) baxın.

### Alət Nəticələrinin Sıxılması

`open-sse/services/compression/toolResultCompressor.ts` -də `compressToolResult()` alət-nəticə mətnini sıxışdırır** 5 strategiya** . Onları bu ardıcıllıqla sınayır və yoxlanışı məzmuna uyğun gələn ilk effektiv strategiya nəticəyə qərar verir:

1. **`fileContent`** : ən azı bir sətirin `import `, `export `, `function `, `class `, `const `, `let `, `var ` və ya `return ` (açar söz üstəgəl boşluq) ilə başlayan və ya `if`, `for` və ya `while` ilə başlayan, ən azı bir sətirdən ` (` `(`. və son 5 sətir, örtülmüş ortası işarələnmişdir.
2. **`grepSearch`** : `<path>:<digits>:` formasının ən azı bir sətri ilə məzmun, burada birinci iki nöqtədən əvvəl mətndə boşluq yoxdur, yalnız bu sətirləri saxlayır, ən çoxu 30, ardınca hər hansı digər uyğunluqların sayı və uyğun gələn faylların siyahısı; hər bir digər xətt atılır. Belə bir xətt strategiyanı işə salmaq üçün kifayətdir, ona görə də `12:30:45` kimi vaxt damğası ilə başlayan jurnal xətti də sayılır.
3. **`shellOutput`** : ANSI CSI ardıcıllığı (`ESC[` sonra rəqəmlər və ya nöqtəli vergüllər, sonra hərf, rəng kodlarında olduğu kimi) və ya mətnin hər hansı bir yerində boşluqdan sonra `$` olan çıxış həmin ardıcıllıqları itirir ( `ESC[?25l` və ya OSC pəncərə başlıq ardıcıllığı kimi digər qaçışlar, təkrarlanan sətirlər50 ilə saxlanılır) və ardıcıl 50 çökdü. Bu yoxlama `json` və `errorMessage` dən əvvəl işlədiyi üçün belə bir `$` ehtiva edən JSON və ya səhv çıxışı `shellOutput` aktiv olduqda onlara heç vaxt çatmır.
4. **`json`** : `{` və ya `[` (isteğe bağlı boşluqdan sonra) ilə başlayan və təhlil edən 2000 simvoldan çox JSON faydalı yükü ümumiləşdirilir: 7-dən çox elementdən ibarət massiv ilk 5 və son 2 elementi və ümumi sayını saxlayır, obyekt isə ilk 20 açarını saxlayır, hər bir iç `{…N keys}` içə yerləşdirilmiş obyekt və ya aarr ilə əvəz olunur. massiv, N onun uzunluğudur) və ilk 20-dən sonra düşmüş düymələri sayan `_remaining_<N>_keys` markeri. Skalar dəyərlər bütöv surətdə kopyalanır, beləliklə, 20 və ya daha az açardan ibarət obyekt daxili dəyərləri olmayan yalnız yenidən girintilənir — kiçildilmiş bir simvol qazanır və dəyişməz qalır.
5. **`errorMessage`** : istənilən yerdə və istənilən hərf halda, `error:`, `error ` ( `no error found` olduğu kimi boşluqdan sonra gələn söz), `[error]`, `exception:`, `exception `, `[exception]` və ya `traceback` olan çıxış, onların arasında `… [N frames elided] …` işarəsi olmaqla birinci sətri, sonrakı 10 sətri və sonuncu 3-ü saxlayır. Marker yalnız ilk sətirdən sonra 13-dən çox sətir olduqda görünür, beləliklə, 14 və ya daha az sətirdən ibarət olan xətanın çıxışı qısalmır (12 və ya 13 sətirdə son 3 təkrar sətir artıq saxlanılır).

Heç bir şeyə qənaət etməyən bir strategiya uyğunlaşdıqdan sonra, sonrakı strategiyalar sınaqdan keçirilmir. Uyğun strategiya heç bir təxmin edilən işarələri (uzunluq ÷ 4, yuvarlaqlaşdırılmış) — məsələn, 25 və ya daha az sətirdən ibarət kod kimi faylı və ya 7 element və ya daha az — olan 2000 simvoldan çox JSON massivini yadda saxlamadıqda, aqressiv mühərrik orijinal alət nəticəsini saxlayır: həm zəng edənlər, həm də `compressAnthropicToolResultBlock()` `saved` (`compressAggressive()` ) 0 və ya aşağı, `compressToolResult()` isə hələ də həmin strategiyanın nəticəsini qaytarır. Alət-nəticə addımı son söz deyil: mühərrikin ehtiyat xülasəsi hələ də 8192 simvoldan (`maxTokensPerMessage`, 2048, dəfə 4) uzun `tool` və ya `function` mesajını qısalda bilər.

#### Nə vaxt istifadə etməli

Alət nəticəsində sıxılma aqressiv mühərrikin 1-ci pilləsidir ( `open-sse/services/compression/aggressive.ts`-da `compressAggressive()` ), ona görə də o, Aqressiv rejimdə və yığılmış boru kəmərinin `aggressive` addımında işləyir. O, OpenAI formalı `tool` və `function` mesajlarını və Anthropic `tool_result` bloklarındakı mətni sıxışdırır. Hər bir strategiyanın `aggressive.toolStrategies` altında öz açarı var, hamısı standart olaraq aktivdir. İdarə panelində açarlar Caveman səhifəsindədir** Qabaqcıl** sıxılma aktiv olduqda və defolt rejim Aqressiv olduqda baxın.

### Yığılmış boru kəməri

Yığılmış rejim işləyir** ardıcıl olaraq çoxlu mühərriklər** — adətən əvvəlcə RTK (alət çıxışında 60-90% qənaət), sonra qalan mətndə Caveman (~ 46% daxiletmə qənaəti). Bəstələnmiş, yəni** 78-95% uyğun diapazon** (yuxarıda Yuxarı Əmanət Riyaziyyatına baxın): `1 - (1 - 0.60..0.90) × (1 - 0.46)` orta hesabla ≈ 89%.

#### Necə işləyir

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Nə vaxt istifadə etməli

Yığılmış rejimdən istifadə edin:

- Alət-ağır iş axınları (agent kodlaşdırma, araşdırma)
- Xərclərə həssas toplu emal
- Maksimum token qənaətinə ehtiyacınız olduqda

Yığılmış boru kəmərləri qlobal `stackedPipeline` sıxılma parametrləri vasitəsilə və ya marşrutlaşdırma kombinasiyasına təyin edilmiş adlandırılmış sıxılma kombinasiyası vasitəsilə konfiqurasiya edilir (yuxarıda Kombo Başına Dəyişdirməyə baxın) — avtomatik kombinasiya `modePack` vasitəsilə deyil (bu sahə yalnız avtomatik kombinasiya modelinin seçimini yenidən çəkilər və `stacked` etibarlı paket adı deyil).

---

## Kombinasiya üzrə sıxılma əvəzləmələri

Müxtəlif istifadə halları üçün davranışı dəqiq tənzimləmək məqsədilə qlobal sıxılma rejimini **hər kombinasiya üzrə** əvəzləyə bilərsiniz:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Bu, aşağıdakı hallar üçün faydalıdır:

- **Kodlaşdırma kombinasiyaları**: Uzun sessiyalar üçün `aggressive` rejimindən istifadə edin
- **Sürətli sual-cavab kombinasiyaları**: Sürətli cavablar üçün `lite` rejimindən istifadə edin
- **Alətlərdən intensiv istifadə edən kombinasiyalar**: Maksimum qənaət üçün `stacked` rejimindən istifadə edin
- **İstehsal kombinasiyaları**: Keşləmə provayderləri üçün əvəzləməni söndürülmüş saxlayın — daim aktiv olan
  keşdən xəbərdar tənzimləmə `aggressive`/`ultra` rejimlərini avtomatik olaraq `standard` rejiminə endirir
  (seçilə bilən `cache-aware` rejimi yoxdur)

---

## Həmçinin baxın

- [Mühit konfiqurasiyası](../reference/ENVIRONMENT.md) — Sıxılma mühiti dəyişənləri
- [Arxitektura bələdçisi](../architecture/ARCHITECTURE.md) — Sıxılma konveyerinin daxili mexanizmləri
- [İstifadəçi bələdçisi](../guides/USER_GUIDE.md) — Sıxılma ilə işə başlama
- [RTK sıxılması](./RTK_COMPRESSION.md) — RTK filtrləri, etibar modeli, yoxlama keçidi, emal edilməmiş çıxışın bərpası
- [Sıxılma mühərrikləri](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-lər, MCP, idarə paneli
- [Sıxılma qaydalarının formatı](./COMPRESSION_RULES_FORMAT.md) — JSON qayda paketi formatı
- [Sıxılma dil paketləri](./COMPRESSION_LANGUAGE_PACKS.md) — Dilə xas Caveman qaydaları
