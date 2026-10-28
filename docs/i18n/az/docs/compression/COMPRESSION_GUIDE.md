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

## Sıxılma Rejimləri

### Söndürülüb

Sıxılma tətbiq edilmir. Bütün mesajlar dəyişmədən keçir.

### Lite Rejimi (~15% qənaət, <1ms gecikmə)

Ən təhlükəsiz rejim — sıfır semantik dəyişiklik, yalnız formatlaşdırma təmizliyi:

| Texnika                  | Təsvir                                                  |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Ardıcıl boş sətirləri və sondakı boşluqları birləşdirir |
| `dedupSystemPrompt`      | Təkrarlanan sistem mesajlarını silir                    |
| `compressToolResults`    | Ətraflı alət/funksiya çıxışlarını sıxır                 |
| `removeRedundantContent` | Təkrarlanan təlimatları aradan qaldırır                 |
| `replaceImageUrls`       | base64 şəkil data URI-lərini qısaldır                   |

**Ən uyğundur:** Daimi istifadə, təhlükəsizlik baxımından kritik iş axınları.

### Standart Rejim (~30% qənaət)

[Caveman](https://github.com/JuliusBrussee/caveman)-dən ilhamlanıb — mənanı qoruyarkən doldurucu sözləri və uzun ifadələri aradan qaldırır:

- Doldurucu sözləri silir ("please", "I think", "basically", "actually")
- Uzun ifadələri qısaldır ("in order to" → "to", "as a result of" → "because")
- Nəzakətli yayındırma ifadələrini aradan qaldırır ("Would you mind...", "If you could possibly...")
- Kodlaşdırma promptları üçün tənzimlənmiş 30+ regex qaydası

**Ən uyğundur:** Gündəlik kodlaşdırma iş axınları, xərclərə həssas komandalar.

### Aqressiv Rejim (~50% qənaət)

Uzun sessiyalar üçün ağıllı tarixçə idarəetməsi:

- **Mesajların Köhnəlməsi** — köhnə mesajlar getdikcə daha çox sıxılır
- **Alət Nəticələrinin Sıxılması** — uzun alət çıxışları kəsilir və ya qısaldılır (ilk/son sətirlər,
  uyğunluq-sətri filtrasiyası, JSON açar sıxılması)
- **Struktur Bütövlük Mühafizələri** — `tool_use` + `tool_result` cütlərinin uyğun qalmasını təmin edir
- **Kontekst Pəncərəsi Nəzərəalması** — hər modelin token limitlərinə riayət edir

**Ən uyğundur:** Uzunmüddətli sazlama sessiyaları, böyük kod bazaları.

### Ultra Rejim (~75% qənaət)

Token baxımından kritik ssenarilər üçün maksimum sıxılma:

- **Evristik Budama** — nəsr hissənin bal əsaslı token budanması
- **Strukturun Qorunması** — qapalı kod blokları, sətirdaxili kod, URL-lər və identifikatorlar
  olduğu kimi qorunub sözü-sözünə yenidən birləşdirilir, heç vaxt budanmır
- **İstəyə bağlı SLM səviyyəsi** — konfiqurasiya edildikdə kiçik lokal model budamanı təkmilləşdirə bilər
- Aqressiv rejimdən müstəqildir: mesaj köhnəlməsini, alət-nəticəsi sıxılmasını
  və ya ehtiyat ümumiləşdiricini işə salmır (yalnız SLM səviyyəsinin uğursuzluğu ehtiyat keçidi
  aqressiv rejim üzərindən yönləndirə bilər)

**Ən uyğundur:** Kontekst limitlərinə təkrar-təkrar çatdığınız hallar.

### RTK Rejimi (60-90% yuxarı axın aralığı)

RTK rejimi kodlaşdırma agenti sessiyalarında yaranan ətraflı alət çıxışları üçün optimallaşdırılıb:

- `git status`, `git diff`, `git log`, test icraçıları,
  TypeScript/Vite/Webpack yığınları, ESLint/Biome/Prettier, npm audit/quraşdırmaları, Docker loqları, infra
  çıxışı və ümumi shell çıxışı kimi əmr/çıxış siniflərini aşkarlayır
- `open-sse/services/compression/engines/rtk/filters/` qovluğundan JSON filtr paketlərini tətbiq edir
- Layihə və ya qlobal `filters.toml` fayllarından RTK TOML sxemi v1 filtrlərini idxal edir, layihə faylları üçün daxili test
  yoxlaması və etibar məhdudlaşdırması ilə
- Daxili yoxlama nümunələri ilə 56 hazır filtr təqdim edir
- ANSI idarəetmə ardıcıllıqlarını, tərəqqi çubuqlarını, təkrarlanan sətirləri və əməliyyata yararsız səs-küyü aradan qaldırır
- Uğursuzluqları, xətaları, xəbərdarlıqları, dəyişdirilmiş faylları, xülasələri və uzun çıxışın sonunu qoruyur
- Etibar məhdudlaşdırılmış layihə filtrlərini, qlobal filtrləri və istəyə bağlı gizlədilmiş xam-çıxış bərpasını dəstəkləyir

**Ən uyğundur:** shell, build, test, git, grep və fayl-çıxışı transkriptləri olan agent sessiyaları.

### Yığılmış Rejim (78-95% tətbiq oluna bilən aralıq)

Yığılmış rejim bir neçə sıxılma mühərrikini deterministik ardıcıllıqla işə salır. Defolt boru xətti belədir:

```txt
RTK -> Caveman
```

Bu ardıcıllıq əvvəlcə terminal/alət çıxışını yığcam saxlayır, sonra qalan təbii dil promptuna
Caveman semantik qısaltmasını tətbiq edir. Yığılmış boru xətləri qlobal olaraq və ya
yönləndirmə kombinasiyalarına təyin edilmiş sıxılma kombinasiyaları vasitəsilə konfiqurasiya edilə bilər.

**Ən uyğundur:** Böyük alət loqları ilə yanaşı insan təlimatları və ya köməkçi xülasələri olan qarışıq kontekst.

---

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

### İdarəetmə paneli

`Dashboard → Context & Cache` bölməsinə keçin:

- **Caveman** — rejim seçimi, dil paketləri, önizləmə və qlobal standart parametrlər
- **RTK** — əmr filtrinin önizləməsi, RTK təhlükəsizlik parametrləri və filtr kataloqu
- **Compression Combos** — marşrutlaşdırma kombinasiyalarına təyin edilən adlandırılmış mühərrik konveyerləri
- **Auto-Trigger Threshold** — token sayı həddi keçdikdə sıxılmanı avtomatik aktivləşdirir

### Kombinasiya üzrə əvəzləmə

`Dashboard → Context & Cache → Compression Combos` bölməsində marşrutlaşdırma kombinasiyasına sıxılma
kombinasiyası təyin edin:

```txt
Kombinasiya: "free-tier-fallback"
  Sıxılma kombinasiyası: "coding-agent-stack"
  Konveyer: RTK -> Caveman
  Hədəflər:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu, ödənişli abunəliklərdə yüngül rejimi saxlayaraq pulsuz/kodlaşdırma provayderlərində mərhələli
sıxılmadan istifadə etməyə imkan verir.

Bu "Kombinasiya üzrə əvəzləmə" təyinatı **marşrutlaşdırma kombinasiyasının sıxılma rejimi**
əvəzləməsindən (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — sahənin
sxemi həmçinin `rtk`, `stacked` və `omniglyph` dəyərlərini qəbul edir) fərqli idarəetmə elementidir —
həmin əvəzləmə adlandırılmış sıxılma kombinasiyası konveyerini seçmir; o, sadəcə
`resolveCompressionPlan` tərəfindən istifadə edilən `compressionMode` sahəsini təyin edir. Bu,
kombinasiya kartında (`Dashboard → Combos`) və ya #6760-dan etibarən
`Dashboard → Context & Cache → Compression Combos` bölməsindəki "Assign to routing" siyahısında,
yuxarıda sənədləşdirilmiş konveyer təyinatı seçiminin yanında hər marşrutlaşdırma kombinasiyası üçün
təyin edilə bilər. Hər iki interfeys dəyişiklikləri eyni `PUT /api/combos/{id}` son nöqtəsi vasitəsilə saxlayır.

### Sorğu üzrə əvəzləmə

Tək bir sorğu üçün sıxılma planını əvəzləmək məqsədilə `x-omniroute-compression` sorğu başlığını
göndərin. O, ən yüksək prioritetə malikdir — marşrutlaşdırma kombinasiyası əvəzləməsindən, aktiv profildən,
avtomatik aktivləşdirmədən və paneldəki Default seçimindən üstündür. Naməlum dəyərlər nəzərə alınmır
(sorğu heç vaxt rədd edilmir) və qlobal əsas keçid yenə də hər şeyi idarə edir: sıxılma qlobal səviyyədə
söndürülübsə, başlıq onu aktivləşdirə bilməz. Dəyərlər:

| Dəyər         | Təsir                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | Bu sorğu üçün sıxılma yoxdur.                                                                                  |
| `default`     | Paneldən əldə edilən Default profili (aktiv profili nəzərə almır). İtkili mühərriklər söndürülmüş qalır.       |
| `safe`        | Başlığın buraxılması ilə eynidir: yalnız dublikatların silinməsi və boşluqların yığcamlaşdırılması.            |
| `allow-lossy` | Xülasələr, uyğunluq filtrləri və üslub yenidən yazmaları daxil olmaqla, bu sorğunun operator planını saxlayır. |
| `engine:<id>` | Aktiv olduqda tək mühərrik, məsələn, `engine:rtk`. Bu, həmin mühərrik üçün sorğu üzrə qoşulma seçimidir.       |
| `<combo>`     | Əvvəlcə ada görə (registrdən asılı olmayaraq), sonra isə id-yə görə uyğunlaşdırılan adlandırılmış kombinasiya. |

`allow-lossy`, `engine:<id>` və ya adlandırılmış kombinasiya olmadan itkili mühərriklər tətbiq edilmir.
Sıxılma aktiv olduqda sorğu yenə də sessiya dublikatlarının silinməsindən və boşluqların
yığcamlaşdırılmasından keçir.

Tətbiq edilən plan `X-OmniRoute-Compression: <mode>; source=<source>` cavab başlığında geri qaytarılır;
burada `<source>` `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`
və ya `off` dəyərlərindən biridir.

### API

```bash
# Sıxılma parametrlərini əldə edin
curl http://localhost:20128/api/settings/compression

# Sıxılma parametrlərini yeniləyin
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Müəyyən RTK/stacked faydalı yükünü önizləyin
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtr paketlərini siyahıya alın
curl http://localhost:20128/api/context/rtk/filters

# Əlavə əmr metadatası ilə RTK-nı birbaşa sınaqdan keçirin
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

## Təkmil Sıxışdırma Sistemləri

Yuxarıda təsvir edilən 7 rejimdən əlavə (mənbə həmçinin bu təlimatda əhatə olunmayan
`codex-responses` və `omniglyph` rejimlərini qəbul edir), aşağıdakı bölmələr həmin
rejimlərin daxilində və ya onlarla yanaşı işləyən funksiyaları əhatə edir: Alət Nəticəsinin
Sıxışdırılması və Proqressiv Köhnəlmə aqressiv mühərrikin 1-ci və 2-ci addımlarıdır
(Aqressiv rejim və yığılmış konveyerin `aggressive` addımı), Yığılmış Konveyer Yığılmış
rejimin necə işlədiyini müəyyən edir, Keşdən Xəbərdar Sıxışdırma sıxışdırma aktiv olduqda
keşləmə provayderləri üçün `aggressive` və `ultra` strategiyalarını `standard` səviyyəsinə
endirir, Mağara Adamı Çıxış Rejimi və Çıxış Üslubları isə standart olaraq deaktiv olan,
sorğunu sıxışdırmaq əvəzinə modelin çıxışını formalaşdıran, seçimlə aktivləşdirilən sistem
promptu təlimatlarıdır.

### Keşdən Xəbərdar Sıxışdırma

Bəzi provayderlər (məsələn, prompt keşləməsi ilə Anthropic) **prompt keşləməsini**
dəstəkləyir; bu, xərcləri və gecikməni azaltmaq üçün promptun müəyyən hissələrini
keşləməyə imkan verir. Keşləmə aktiv olduqda aqressiv sıxışdırma, keşlənmiş tokenləri
dəyişdirərək keşi etibarsız etdiyinə görə, performansa əslində **zərər verə bilər**.

`cachingAware.ts` modulu bunu **keşləmə kontekstini aşkarlamaqla** və
**sıxışdırma strategiyasını** müvafiq qaydada tənzimləməklə həll edir.

#### Necə işləyir

1. **Keşləmə kontekstini aşkarlayır** — Sorğunun gövdəsində `cache_control` markerlərini axtarır
2. **Keşləmə provayderlərini müəyyənləşdirir** — Hədəf provayderin keşləməni dəstəkləyib-dəstəkləmədiyini yoxlayır
3. **Strategiyanı tənzimləyir** — Keşləmə provayderləri üçün `aggressive`/`ultra` strategiyalarını `standard` səviyyəsinə endirir
4. **Sistem promptunu ötürür** — Sistem promptları adətən keşlənir, buna görə də onları sıxışdırmır

Strategiya köməkçisi həmçinin `deterministicOnly` bayrağını qaytarır, lakin plan qurucusu
yalnız strategiyadan istifadə edir — hazırda sonrakı mərhələlərin heç biri bu bayrağı oxumur.

#### Kod nümunəsi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Keş markeri
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Nə zaman istifadə edilməlidir

Keşdən xəbərdar sıxışdırma **həmişə aktivdir** — heç bir konfiqurasiya tələb olunmur.
Sıxışdırma aktiv olduqda və hədəf provayder prompt keşləməsini dəstəklədikdə (Anthropic,
OpenAI və s.) işə düşür; açıq şəkildə göstərilmiş `cache_control` markerləri tələb olunmur —
təkcə keşləmə provayderinin olması səviyyənin endirilməsini işə salır, təkcə markerlər isə
bunu heç vaxt etmir (marker aşkarlaması strategiya qərarına deyil, keş telemetriyasına
məlumat verir).

### Proqressiv Köhnəlmə

Uzun söhbətlərdə çoxsaylı mesaj növbələri toplanır, lakin köhnə növbələrin aktuallığı
azalır. `progressiveAging.ts` modulu **mesajları növbə məsafəsinə görə zəiflədir**
(məsafə söhbətin sonundan hesablanır). Təqdim edilən standart parametrlərlə
(`verbatim: 2, light: 2, moderate: 3`):

- **Son 2 növbə (məsafə ≤ 2)**: Olduğu kimi saxlanılır
- **Məsafə 3**: Mağara adamı sıxışdırması (doldurucu ifadələrin silinməsi)
- **Məsafə 4+**: Assistent mesajları xülasə edilir; istifadəçi mesajları ilk
  sətirlə məhdudlaşdırılır və maksimum 120 simvol saxlanılır; digər rollara toxunulmur.
  Sistem promptları, artıq köhnəldilmiş mesajlar və ən son istifadəçi mesajı məsafədən
  asılı olmayaraq həmişə olduğu kimi saxlanılır. Heç nə tamamilə silinmir və təqdim
  edilən standart parametrlərlə `light` diapazonu əlçatmazdır (`light`, `verbatim`
  ilə eynidir).

#### Kod nümunəsi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... daha 50 növbə ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // son 3 növbə: olduğu kimi
  light: 8, // məsafə <= 8: yüngül sıxışdırma
  moderate: 20, // məsafə <= 20: mağara adamı sıxışdırması
  fullSummary: 5, // tip tərəfindən tələb olunur, diapazonlaşdırma kodu tərəfindən oxunmur
  // məsafə > 20: xülasə edilir (assistent) / ilk sətir saxlanılır (istifadəçi)
});

// saved = qənaət edilən tokenlərin sayı
```

#### Nə zaman istifadə edilməlidir

Proqressiv köhnəlmə `aggressive` rejimi üçün **həmişə aktivdir** — bu,
`compressAggressive()` funksiyasının 2-ci addımıdır. Ultra rejimində işə salınmır.
Xüsusilə aşağıdakılar üçün effektivdir:

- Uzunmüddətli kodlaşdırma sessiyaları
- Bir neçə gün davam edən söhbətlər
- Çoxsaylı alət çağırışları olan agent əsaslı iş axınları

### Mağara Adamı Çıxış Rejimi

Mağara adamı çıxış rejimi modelin özündən qısa çıxış verməsini istəyən **sistem promptu
təlimatları** əlavə edir — `lite` səviyyəsi tam cümlələri saxlayan yığcam cavablar istəyir,
`full` ondan "ağıllı mağara adamı kimi qısa cavab verməsini", `ultra` isə teleqrafik çıxış
verməsini istəyir; təlimatlar bunu yalnız tələb edir, ona zəmanət verə bilməz. Sorğular bu
təlimatları `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)
vasitəsilə alır: `open-sse/handlers/chatCore.ts` əvvəlcə seçimi geriyə uyğunluq adaptoru
(`open-sse/services/compression/outputStyles/backCompat.ts` daxilindəki
`resolveOutputStyleSelection()`) ilə müəyyənləşdirir; `outputStyles` boş olduqda bu
adapter aktiv `cavemanOutputMode` parametrini `cavemanOutputMode.intensity`
intensivliyində `terse-prose` çıxış üslubuna uyğunlaşdırır (aşağıdakı Geriyə uyğunluq
bölməsinə baxın); boş olmayan `outputStyles` seçimi olduğu kimi istifadə edilir və bundan
sonra `cavemanOutputMode.enabled` və `intensity` heç bir təsir göstərmir, lakin onun
`autoClarity` keçidi hələ də tətbiq olunur. `outputMode.ts` təlimat mətnlərini
(`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), məzmunun yan keçmə mexanizmini və daxil etmənin
istifadə etdiyi yerləşdirmə köməkçisini ehtiva edir; onun öz `applyCavemanOutputMode()`
daxiledicisinin istehsal mühitində çağırıcısı yoxdur.

#### Necə işləyir

Bu rejim girişi sıxmır. O, sistem promptuna təlimat bloku əlavə edir
(aşağıda İnyeksiyanın necə işlədiyinə baxın) və sorğu üçün seçilmiş istənilən giriş sıxılma rejimi
daha sonra, artıq bloku daşıyan mətn üzərində yenə işləyir. Hər səviyyənin sonunda olan ortaq
məhdudiyyətlər bəndindən əvvəl ingiliscə `full` səviyyəsi belədir:

> "Ağıllı mağara adamı kimi qısa cavab ver. Artiklləri (a/an/the), doldurucu sözləri (just/really/basically/actually/simply), nəzakət ifadələrini və qeyri-müəyyən ifadələri çıxar. Natamam cümlələr olar. Qısa sinonimlər işlət (extensive yox, big; implement yox, fix). Bütün texniki məzmunu, kodu, xətaları, URL-ləri və identifikatorları dəqiq saxla."

Bu, xüsusilə aşağıdakılar üçün yaxşı işləyir:

- Kod generasiyası (daha yığcam çıxış = daha az token)
- Sürətli sual-cavab (ətraflı izahlara ehtiyac yoxdur)
- Paket emalı (məhsuldarlığı maksimuma çatdırır)

#### Nə vaxt istifadə etməli

Caveman çıxış rejimi **istəyə bağlıdır**. Sıxılma aktiv olduqda (`enabled: true`, Compression Settings səhifəsindəki əsas keçid
aktivdir), onu `cavemanOutputMode.enabled` ilə aktivləşdirin; `intensity`
`lite`, `full` və ya `ultra` səviyyəsini seçir:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Sıxılma kombinasiyasının **Output Mode** keçidi (`outputMode`, səviyyə isə `outputModeIntensity` daxilindədir)
həmin kombinasiyanın tətbiq olunduğu sorğular üçün eyni keçidi təyin edir və
`omniroute_set_compression_engine` MCP aləti bunu özünün məntiqi `outputMode`
arqumenti vasitəsilə yazır. Boş olmayan `outputStyles` seçimi bu keçiddən üstündür. İdarəetmə
panelində **Terse prose** çıxış stilinin aktivləşdirilməsi eyni bloku inyeksiya edir (aşağıda Output
Styles bölməsinə baxın).

### Çıxış stilləri (kataloq)

Yuxarıdakı Caveman çıxış rejimi **köhnə tək-stil yoludur**. Phase 4 bunu
birləşdirilə bilən çıxış stilləri kataloquna ümumiləşdirdi: `open-sse/services/compression/outputStyles/catalog.ts` daxilindəki
`OUTPUT_STYLE_CATALOG`. Hər stil modelin özündən daha ucuz çıxış istəyən sistem promptu
təlimatıdır; stillər birlikdə aktivləşdirilə bilər və kataloq sırası ilə inyeksiya edilir.

| Stil                               | `id`            | Nə edir                                                                                                                                                                                                                                                                                            | Təlimat dilləri                               |
| ---------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Yığcam mətn                        | `terse-prose`   | Doldurucu sözləri/artiklləri/qeyri-müəyyən ifadələri çıxarır; texniki məzmunu dəqiq saxlayır. Köhnə caveman çıxış rejimi ilə eyni mətndir (yenidən yazılmır, ona istinad edilir).                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Daha az kod                        | `less-code`     | YAGNI pilləsi: işləyən ən kiçik dəyişiklik, istənilməyən abstraksiyalar yoxdur.                                                                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| At quyruğu (tənbəl baş tərtibatçı) | `ponytail`      | "Ən yaxşı kod heç vaxt yazılmayan koddur": təkrar istifadə > yenidən yazma, əsas səbəb > simptom, işləyən ən qısa diff.                                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Məndə ADHD var (öncə fəaliyyət)    | `i-have-adhd`   | Əvvəl fəaliyyət (mətndən əvvəl əmr/yol/snippet), nömrələnmiş məhdud addımlar, BİR konkret növbəti addım, giriş/xülasə/sonluq yoxdur. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) layihəsindən uyğunlaşdırılıb (MIT).                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filtri                 | `antislop-ui`   | Hər vizual üsul məqsəd testindən keçməlidir (iyerarxiya, kimlik, oxunaqlılıq); standart qradientlər/şüşə effekti/parıltı yoxdur, palitra məhduddur, şablon tərtibatlar yoxdur. Hər iki antislop stili işləməyən idarəetmə elementlərinin və uydurma iddiaların olmaması məhdudiyyətini əlavə edir. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop mətn və insan filtri      | `antislop-copy` | Konkret mətn (uzun tire, ümumi CTA-lar, dəbdə olan sözlər, çatbot sonluqları və uydurma faktlar yoxdur), üstəlik insanlara dair qaydalar: WCAG AA kontrastı, görünən fokus, klaviatura ilə əlçatanlıq, boş/yüklənmə/xəta vəziyyətləri, mobil uyğunlaşma.                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Yığcam CJK (文言)                  | `terse-cjk`     | `full`/`ultra` cavabları Klassik Çin dilindədir (文言); `lite` yalnız köməkçi sözlər, nəzakət ifadələri və bəzəklər olmadan qısa cavablar istəyir.                                                                                                                                                 | zh (lokalla məhdudlaşdırılıb, aşağıya baxın)  |

Hər stil üç intensivlik səviyyəsi ilə təqdim olunur — `lite`, `full`, `ultra` — və hər səviyyə
ortaq məhdudiyyətlər bəndi ilə bitir (`outputMode.ts` daxilindəki `SHARED_BOUNDARIES`); bu bənd
kod bloklarını, fayl yollarını, əmrləri, xətaları və URL-ləri dəqiq saxlayır. `terse-prose` və
`terse-cjk` səviyyə mətnləri həmin siyahıya identifikatorları da əlavə edir.

`terse-cjk` iki yerdə `zh` lokalı ilə məhdudlaşdırılıb. Compression Settings səhifəsi
onun sətrini yalnız idarəetmə panelinin UI dili Çin dili (`zh-CN` və ya `zh-TW`) olduqda göstərir və
`applyOutputStyles()` onu yalnız sorğunun müəyyən edilmiş dili (aşağıda Dil
seçiminə baxın) `zh` olduqda inyeksiya edir. Sətrin gizlədilməsi yadda saxlanmış `terse-cjk` seçimini silmir:
parametrlər API-si istənilən stil id-sini qəbul edir və səhifədə digər stillərin yadda saxlanması onu qoruyur. Sorğu
zamanı `applyOutputStyles()` dil yoxlaması yeganə lokal məhdudiyyətidir.

#### İnyeksiya necə işləyir

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) seçimi
kataloqla tutuşdurur (naməlum id-lər və lokalı uyğun olmayan üslublar kənarlaşdırılır,
heç vaxt xəta baş vermir; heç bir üsluba uyğun gəlməyən seçim gövdəni dəyişməz saxlayır
və `no_styles` kimi ötürülür), seçilmiş təlimatları kataloq sırası ilə birləşdirir,
sərhədlər bəndini **bir dəfə** əlavə edir (həmçinin `less-code` və ya `ponytail`
seçildikdə təhlükəsizlik bəndini, `SAFETY_BOUNDARIES` və ya onun tərcüməsini əlavə edir)
və bloku vahid idempotentlik markeri (`[OmniRoute Output Styles]`) ilə başladır; beləliklə,
təkrar tətbiq heç bir əməliyyat yaratmır. Müəyyən edilmiş dilin (aşağıdakı Dil seçimi
bölməsinə baxın) tərcüməsi olduqda ingiliscə təlimat əvəzinə lokallaşdırılmış təlimat
daxil edilir.

Boş olmayan `messages` massivi olan gövdədə idempotentlik yoxlaması məzmuna görə yan
keçmədən əvvəl icra olunur: `[OmniRoute Output Styles]` markeri artıq yuxarı səviyyəli
`system` sahəsində (sətir və ya məzmun blokları massivi) yaxud sətir məzmunlu sistem
mesajında olduqda gövdə `already_applied` kimi dəyişməz saxlanılır və açar söz yoxlaması
aparılmır. Əks halda məzmuna görə yan keçmə
(`open-sse/services/compression/outputMode.ts` daxilində
`shouldBypassCavemanOutputMode()`) rolundan asılı olmayaraq son üç mesajın mətnini
yoxlayır və həmin mətn təhlükəsizlik, geri qaytarılması mümkün olmayan əməl və ya
aydınlaşdırma açar sözlərinə, yaxud ardıcıllığa həssas olan bir kombinasiyaya uyğun
gəldikdə bütün növbə üçün üslubları ötürür: `first`, `then`, `after that`, `before`,
`rollback` və ya `backup` sözündən sonra 240 simvol daxilində `delete`, `drop`,
`migrate`, `deploy` və ya `release` gəlməsi. Yan keçmə **Auto-Clarity Bypass** keçidi
(`cavemanOutputMode.autoClarity`, standart olaraq aktivdir) aktiv olduğu müddətdə işləyir;
keçidin söndürülməsi açar söz yoxlamasını ötürür.

Yan keçmə növbənin davam etməsinə icazə verdikdə `placeSystemInstruction()` (eyni fayl)
heç vaxt yeni `messages[0]` yaratmır və bloku aşağıdakılardan ilk tapdığı yerə
yerləşdirir:

1. Sətir məzmunlu başlanğıc sistem mesajı: blok onun mətnindən sonra əlavə edilir.
2. Yuxarı səviyyəli `system` sahəsi: blok sətirin mətnindən sonra əlavə edilir və ya
   məzmun blokları massivinə yeni mətn bloku kimi daxil edilir.
3. Daha sonra gələn ilk sətir məzmunlu sistem mesajı: blok onun mətnindən sonra əlavə
   edilir.
4. Yuxarıdakılardan heç biri: blok `messages` massivinin sonunda yeni sistem mesajına
   yerləşdirilir.

`messages` massivi olmayan (və ya massivi boş olan) gövdədə məzmuna görə yan keçmə
işləmir və yuxarı səviyyəli `system` sahəsi nəzərə alınmır. Blok sətir tipli
`instructions` sahəsinin mətnindən sonra əlavə edilir; həmin sahədə artıq
`[OmniRoute Output Styles]` markeri varsa, gövdə `already_applied` kimi dəyişməz
saxlanılır. Gövdədə sətir tipli `instructions` sahəsi olmadıqda, lakin `input` (sətir və
ya massiv) olduqda blok `instructions` dəyərinə çevrilərək bu sahənin əvvəlki qeyri-sətir
dəyərini əvəz edir. Nə sətir tipli `instructions` sahəsi, nə də sətir və ya massiv tipli
`input` olan gövdə dəyişməz saxlanılır və `no_messages` kimi ötürülür.

#### Necə aktivləşdirməli

İdarəetmə panelində: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles bölməsi: hər üslub üçün aktiv/deaktiv
keçidi və səviyyə seçicisi olan bir sətir. Üslublar sıxışdırmanın özü (səhifənin əsas
`enabled` keçidi) aktiv olduqda daxil edilir. **Auto-Clarity Bypass** keçidi **Caveman**
səhifəsində (`/dashboard/context/caveman`), onun **Output Mode** kartındadır. Proqram
vasitəsilə sıxışdırma konfiqurasiyası seçimi belə saxlayır:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Geriyə uyğunluq: `outputStyles` boş olduğu müddətdə köhnə
`cavemanOutputMode.enabled` parametri `cavemanOutputMode.intensity` səviyyəsində
`terse-prose` ilə əlaqələndirilir. Bundan sonra blok `[OmniRoute Output Styles]` markeri
ilə başlayır; köhnə `applyCavemanOutputMode()` inyektoru isə
`[OmniRoute Caveman Output Mode]` yazırdı. Markerin altında mətn en, pt-BR, es, de, fr,
it, ru, id və vi dillərində köhnə inyeksiya ilə eynidir; ja və zh dillərində sərhədlər
bəndindən əvvəl bir əlavə boşluq olur. `terse-prose` pt-BR, es, de, fr, it, ru, zh, ja,
id və vi dillərinə tərcümə olunur; buna görə müəyyən edilmiş dili `hu` olan sorğuya köhnə
inyektorun macar dilindəki mətnindən fərqli olaraq ingiliscə mətn verilir.

Çıxış üslubunun dil seçimi (`outputStyles/apply.ts` daxilində
`resolveOutputStyleLanguage()`): `languageConfig.enabled` aktiv olduqda `autoDetect`
sorğunun `messages` massivində mətni olan ən son istifadəçi mesajından nümunə götürür
(sətir məzmun və ya onun məzmun hissələrinin `text` dəyəri) və Caveman mühərrikinin
detektorunu (`detectCompressionLanguage()`) onun üzərində işlədir. Mətn kana olmadan Han
simvolları ehtiva etdikdə detektor `zh` qaytarır; əks halda `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` və `id` arasından ən çox işarə uyğunluğu olan dili, heç bir uyğunluq
olmadıqda isə `en` qaytarır — təsnif edə bilmədiyi mətn üçün `defaultLanguage` deyil,
həmişə ingilis dili seçilir və üslublarda `vi` mətni olsa da `vi` heç vaxt aşkar edilmir.
Responses API gövdəsi növbələri `input` daxilində saxlayır və bu sahədən nümunə
götürülmür; buna görə əvvəlcə `defaultLanguage`, sonra isə ingilis dili seçilir.
`messages` daxilində mətni olan istifadəçi mesajı olmadıqda və ya `autoDetect` deaktiv
olduqda əvvəlcə `defaultLanguage`, sonra ingilis dili tətbiq edilir.
`languageConfig.enabled` deaktiv olduqda dil ingilis dilidir — sorğuya sıxışdırma
kombinasiyası tətbiq edilmədiyi halda (sorğunun marşrutlaşdırma kombinasiyasına təyin
edilmiş kombinasiya və ya daxili yığılmış konveyer üçün chatCore-un geri qayıtdığı
standart sıxışdırma kombinasiyası): kombinasiyanın tətbiqi həmin sorğu üçün
`languageConfig.enabled` parametrini aktivləşdirir və `defaultLanguage` dəyərini
kombinasiyanın dil paketlərindən müəyyən edir (saxlanmış dəyər kombinasiyanın
paketlərindən biridirsə həmin dəyər, əks halda standart olaraq `en` olan kombinasiyanın
ilk paketi), bu zaman saxlanmış `autoDetect` dəyəri (standart olaraq aktivdir) yenə də
tətbiq olunur. Caveman giriş mühərriki qayda paketinin dilini fərqli şəkildə — hər mətn
hissəsi üzrə və avtomatik aşkarlama deaktiv olduqda `enabledPacks` əsasında məhdudlaşdıraraq
seçir.

Stil × dil matrisi
`tests/unit/compression/output-styles-i18n-matrix.test.ts` tərəfindən sabitlənir: hər bir kataloq stilinin testdəki `BASELINE_LANGUAGES` daxilində qeydi olmalıdır; lokal ilə məhdudlaşdırılmayan stil pt-BR tərcüməsi ilə təqdim edilməlidir (lokal ilə məhdudlaşdırılan `terse-cjk` bu qaydadan azaddır), yalnız `KNOWN_ENGLISH_ONLY` siyahısında olduğu hallar istisnadır; bu siyahıda yalnız heç bir tərcüməsi olmayan stillər ola bilər — siyahıya daxil edilmiş stilin hər hansı tərcüməsi varsa, test uğursuz olur; həmçinin stil `BASELINE_LANGUAGES` qeydində göstərilən dillərdən birini itirdikdə test uğursuz olur. Stil əlavə etmək üçün
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) sənədinə baxın.

### Alət Nəticəsinin Sıxılması

`open-sse/services/compression/toolResultCompressor.ts` faylındakı `compressToolResult()`
alət nəticəsinin mətnini **5 strategiya** ilə sıxır. O, bunları aşağıdakı ardıcıllıqla
sınayır və yoxlaması məzmuna uyğun gələn ilk aktiv strategiya nəticəni müəyyən edir:

1. **`fileContent`**: 3 və ya daha çox sətirdən ibarət olan və aparıcı girintilər nəzərə
   alınmadıqda ən azı bir sətri `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` və ya `return ` ilə (açar söz və ardınca boşluq), yaxud
   `(` və ya ` (` ilə davam edən `if`, `for` və ya `while` ilə başlayan məzmunun ilk
   20 və son 5 sətrini saxlayır, ixtisar edilmiş orta hissəni isə işarələyir.
2. **`grepSearch`**: `<path>:<digits>:` formasında ən azı bir sətri olan məzmunda,
   ilk iki nöqtədən əvvəlki mətndə boşluq yoxdursa, yalnız belə sətirləri saxlayır;
   maksimum 30 sətirdən sonra əlavə uyğunluqların sayı və uyğunluq tapılan faylların
   siyahısı verilir; bütün digər sətirlər silinir. Strategiyanın işə düşməsi üçün belə
   bir sətir kifayətdir, buna görə `12:30:45` kimi vaxt möhürü ilə başlayan jurnal
   sətri də uyğunluq sayılır.
3. **`shellOutput`**: ANSI CSI ardıcıllığı (`ESC[`, ardınca rəqəmlər və ya nöqtəli
   vergüllər, sonra isə rəng kodlarında olduğu kimi hərf) və ya mətnin istənilən yerində
   ardınca boşluq gələn `$` ehtiva edən çıxışda həmin ardıcıllıqlar silinir (digər
   escape ardıcıllıqları, məsələn `ESC[?25l` və ya OSC pəncərə başlığı ardıcıllığı
   saxlanılır) və ardıcıl təkrarlanan sətirlər birləşdirilməklə son 50 sətir saxlanılır.
   Bu yoxlama `json` və `errorMessage` strategiyalarından əvvəl icra edildiyinə görə,
   belə bir `$` ehtiva edən JSON və ya xəta çıxışı `shellOutput` aktiv olduqda heç vaxt
   onlara çatmır.
4. **`json`**: istəyə bağlı boşluqlardan sonra `{` və ya `[` ilə başlayan, düzgün
   təhlil olunan və 2.000 simvoldan uzun JSON faydalı yükü xülasə edilir: 7-dən çox
   elementli massivdə ilk 5 və son 2 element, həmçinin elementlərin ümumi sayı
   saxlanılır; obyektdə isə ilk 20 açar saxlanılır, hər daxili obyekt və ya massiv
   dəyəri `{…N keys}` yer tutucusu ilə əvəz olunur (massiv üçün N onun uzunluğudur) və
   ilk 20 açardan sonra silinən açarların sayını göstərən `_remaining_<N>_keys`
   işarəsi əlavə edilir. Skalyar dəyərlər bütövlükdə köçürülür, buna görə daxili
   dəyərləri olmayan və 20 və ya daha az açara malik obyekt yalnız yenidən girintilənir
   — minifikasiya edilmiş obyekt uzanır və dəyişmədən saxlanılır.
5. **`errorMessage`**: istənilən yerdə və böyük-kiçik hərfdən asılı olmayaraq `error:`,
   `error ` (`no error found` nümunəsində olduğu kimi ardınca boşluq gələn söz),
   `[error]`, `exception:`, `exception `, `[exception]` və ya `traceback` ehtiva edən
   çıxış ilk sətri, sonrakı 10 sətri və son 3 sətri saxlayır, aradakı sətirləri isə
   `… [N frames elided] …` işarəsi ilə əvəz edir. İşarə yalnız ilk sətirdən sonra
   13-dən çox sətir olduqda görünür, buna görə 14 və ya daha az sətirli xəta çıxışı
   qısaldılmır (12 və ya 13 sətir olduqda son 3 sətir artıq saxlanılmış sətirləri
   təkrarlayır).

Strategiya uyğun gəldikdən sonra, hətta heç bir qənaət təmin etməsə belə, sonrakı
strategiyalar sınanmır. Uyğun gələn strategiya təxmini tokenlərə (uzunluq ÷ 4,
yuxarıya yuvarlaqlaşdırılmaqla) qənaət etmədikdə — məsələn, 25 və ya daha az sətirli
koda bənzər fayl, yaxud 2.000 simvoldan uzun və 7 və ya daha az elementli JSON massivi
olduqda — aqressiv mühərrik ilkin alət nəticəsini saxlayır: hər iki çağıran
(`compressAggressive()` və `compressAnthropicToolResultBlock()`) `saved` dəyəri 0 və
ya daha az olduqda ilkin nəticəni saxlayır, `compressToolResult()` özü isə yenə də
həmin strategiyanın çıxışını qaytarır. Alət nəticəsi addımı son qərar deyil: mühərrikin
ehtiyat xülasələyicisi 8.192 simvoldan uzun `tool` və ya `function` mesajını yenə də
qısalda bilər (`maxTokensPerMessage`, 2.048, 4-ə vurulmaqla).

#### Nə zaman istifadə etməli

Alət nəticəsinin sıxılması aqressiv mühərrikin 1-ci addımıdır
(`open-sse/services/compression/aggressive.ts` faylındakı `compressAggressive()`), buna
görə o, Aggressive rejimində və yığılmış konveyerin `aggressive` addımında işləyir.
O, OpenAI formatlı `tool` və `function` mesajlarını, həmçinin Anthropic `tool_result`
bloklarının daxilindəki mətni sıxır. Hər strategiyanın `aggressive.toolStrategies`
altında öz keçidi var və onların hamısı standart olaraq aktivdir. İdarəetmə panelində,
sıxılma aktiv və standart rejim Aggressive olduqda, keçidlər Caveman səhifəsinin
**Advanced** görünüşündə yerləşir.

### Yığılmış Konveyer

Yığılmış rejim **bir neçə mühərriki ardıcıllıqla** işə salır — adətən əvvəlcə RTK
(alət çıxışında 60-90% qənaət), sonra isə qalan mətn üzərində Caveman (~46% giriş
qənaəti). Birləşdirildikdə bu, **78-95% uyğun diapazon** deməkdir (yuxarıdakı Upstream
Savings Math bölməsinə baxın): `1 - (1 - 0.60..0.90) × (1 - 0.46)` orta hesabla ≈89%
təşkil edir.

#### Necə işləyir

```
Giriş (1000 token)
  → RTK (əmri nəzərə alan filtr) → 200 token
    → Caveman (artıq mətnin silinməsi) → 108 token
  → Çıxış (108 token, ~89% qənaət)
```

#### Nə zaman istifadə etməli

Yığılmış rejimi aşağıdakı hallarda istifadə edin:

- Alətlərdən intensiv istifadə edən iş axınları (agent əsaslı kodlaşdırma, araşdırma)
- Xərclərə həssas paket emalı
- Maksimum token qənaətinə ehtiyacınız olduqda

Yığılmış konveyerlər qlobal `stackedPipeline` sıxılma parametri vasitəsilə və ya
marşrutlaşdırma kombinasiyasına təyin edilmiş adlandırılmış sıxılma kombinasiyası
vasitəsilə konfiqurasiya olunur (yuxarıdakı Per-Combo Override bölməsinə baxın) —
avtomatik kombinasiyanın `modePack` sahəsi vasitəsilə deyil (həmin sahə yalnız avtomatik
kombinasiyanın model seçimi çəkilərini yenidən tənzimləyir və `stacked` etibarlı paket
adı deyil).

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
