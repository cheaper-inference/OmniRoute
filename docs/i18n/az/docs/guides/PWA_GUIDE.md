# Progressive Web App (PWA) Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Əsas ekranınızdan və ya masaüstünüzdən müstəqil pəncərədə açmaq üçün OmniRoute tablosunu Proqressiv Veb Tətbiqi kimi quraşdırın. Quraşdırılmış proqram hələ də naviqasiya, idarə paneli məlumatları və API sorğuları üçün OmniRoute serverinizə qoşulmalıdır. Keşlənmiş statik aktivlər oflayn şlüz və ya oflayn idarə paneli təmin etmir.

## PWA nədir?

Proqressiv Veb Tətbiqi proqram piktoqramı və ayrıca pəncərəsi olan veb tablosundan istifadə edir. Quraşdırıldıqdan sonra OmniRoute:

- Əsas ekranınızdan və ya masaüstünüzdən işə salınır
- Brauzerin adi ünvan çubuğu və nişanları olmadan müstəqil rejimdə açılır
- Seçilmiş statik aktivləri keşləyir
- Portret və landşaft istiqamətlərini dəstəkləyir

## Quraşdırma

Başqa bir cihazdakı server üçün HTTPS ünvanından istifadə edin. Server eyni cihazda işlədikdə, `http://localhost:20128` brauzerin quraşdırılması tələblərinə də cavab verir. Düz `http://YOUR_IP:20128` ünvanı bu tələblərə cavab vermir. Quraşdırma menyuları və göstərişləri brauzerdən və əməliyyat sistemindən asılıdır. [MDN-nin PWA quraşdırma tələblərinə](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required) baxın.

### Android (Chrome)

1. OmniRoute HTTPS ünvanınızı və ya eyni telefonda server üçün `http://localhost:20128` açın.
2. açın**⋮** menyu və seçin** Proqramı quraşdırın** və ya** Əsas ekrana əlavə edin** , təklif olunarsa.
3. Sorğunu təsdiq edin.
4. Əsas ekrandan OmniRoute açın.

### iOS (Safari)

1. Safari-də OmniRoute HTTPS ünvanınızı açın.
2. vurun** Paylaşın** →** Əsas Ekrana əlavə edin** .
3. Adı təsdiqləyin və vurun** Əlavə et** .
4. Əsas ekrandan OmniRoute açın.

### Masaüstü (Chrome / Edge)

1. OmniRoute idarə panelinizi açın.
2. Brauzerin quraşdırma simgesini və ya istifadə edin** Proqramı quraşdırın** təklif olunarsa, menyu girişi.
3. OmniRoute öz pəncərəsində açmaq üçün sorğunu təsdiqləyin.

## Xüsusiyyətlər

### Bağımsız Pəncərə

Manifest `display: "standalone"` və `start_url: "/dashboard"` dəstləridir. Quraşdırılmış proqram idarəetmə panelini proqram pəncərəsində açır. Brauzer və əməliyyat sistemi idarəetmə elementləri hələ də görünə bilər; manifest tam ekran rejimi tələb etmir.

### Keşlənmiş Aktivlər və Şəbəkə Tələbləri

[Xidmət işçisi](../../public/sw.js) seçilmiş eyni mənşəli resursları keşləyir:

| Sorğu və ya aktiv                             | Strategiya     | Davranış                                                                                                                   |
| --------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Quraşdırma vaxtı resursları                   | Əvvəlcədən keş | `/`, `/manifest.webmanifest`, `/icon-512.png` və `/apple-touch-icon.png` işçinin quraşdırılması zamanı yaddaşda saxlanılır |
| Next.js statik aktivlər (`/_next/`)           | Şəbəkə - ilk   | Uğurlu cavablar keşi yeniləyir; şəbəkə xətası mövcud keşlənmiş cavaba qayıdır                                              |
| Digər statik CSS, JS, şəkillər və şriftlər    | Keş-ilk        | Mövcud keşlənmiş cavab təkrar istifadə olunur; Uğurlu şəbəkə cavabları buraxılmış halda yaddaşda saxlanılır                |
| Səhifə naviqasiyası                           | Yan keçin      | Brauzer birbaşa səhifəni alır; heç bir oflayn geri dönüş təmin edilmir                                                     |
| API, tablosuna və autentifikasiya marşrutları | Yan keçin      | İşçi bu sorğulara müdaxilə etmir və ya keş etmir                                                                           |
| Digər qeyri-statik sorğular                   | Şəbəkə         | Keş axtarışı və ya yaddaş yoxdur                                                                                           |

İstisna edilən marşrutlar `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` və `/login`, yol sərhədlərində hərf hərfləri ilə uyğunlaşdırılmışdır. Çarpaz mənşəli və qeyri-GET sorğuları da işçidən yan keçir.

### Əlaqə səhifəsi

`/offline` səhifəsi əlaqə mesajı, online/offline göstəricisi, a** Bağlantıya yenidən cəhd edin** düyməsi və status səhifəsinə keçid. elədir** qabaqcadan yaddaşda saxlanmayıb** və xidmət işçisi edir** yox** uğursuz naviqasiyaları ona yönləndirin. Onun mövcudluğu yeni səhifələri server olmadan əlçatan etmir.

### Proqram İkonları

Manifest bu PNG nişanlarını reklam edir:

| Fayl                   | Ölçü    | istifadə edin                            |
| ---------------------- | ------- | ---------------------------------------- |
| `icon-192.png`         | 192×192 | Ümumi proqram simvolu                    |
| `icon-512.png`         | 512×512 | Ümumi və maskalana bilən proqram simvolu |
| `apple-touch-icon.png` | 180×180 | Apple ana ekranı simvolu                 |

Brauzer quraşdırma hədəfi üçün uyğun simvolu seçir.

### Avtomatik Qeydiyyat

Brauzer xidmət işçilərini dəstəklədiyi zaman `PwaRegister` işçini istehsalda qeyd edir. İnkişaf rejimi işçiləri qeydiyyatdan çıxarır və köhnə aktivlərin isti yenidən yükləməyə mane olmasının qarşısını almaq üçün keşləri təmizləyir. Quraşdırma göstərişləri brauzer qərarı olaraq qalır.

## Texniki Memarlıq

### Veb Tətbiq Manifest

Next.js [`src/app/manifest.ts`](../../src/app/manifest.ts) dən `/manifest.webmanifest` yaradır. Onun əsas parametrləri bunlardır:

| Parametr              | Dəyər                                          |
| --------------------- | ---------------------------------------------- |
| `short_name`          | `OmniRoute`                                    |
| `start_url`           | `/dashboard`                                   |
| `scope`               | `/`                                            |
| `display`             | `standalone`                                   |
| `orientation`         | `any`                                          |
| Fon və mövzu rəngləri | `PWA_THEME_COLORS` dan standart işıq palitrası |

Manifestin adı və təsviri həmin mənbə faylındakı statik dəyərlərdir. Quraşdırılmış manifest hər səfərdə nümunə adı parametrinə və ya aktiv palitraya əməl etmir.

### Xidmət işçisi

[`public/sw.js`](../../public/sw.js) xidmət işçisi çərçivəsindən asılılığı yoxdur:

- **Quraşdırın:** yuxarıda sadalanan dörd resursu qabaqcadan yaddaşa alır və yeni işçini aktivləşdirir.
- **Aktivləşdirin:** köhnə keş nəsillərini silir və müştəriləri iddia edir.
- **Alın:** yuxarıdakı statik aktiv strategiyalarını və marşrut istisnalarını tətbiq edir.
- **Versiya:** mənbə keşinin adı `omniroute-pwa-v3`; istehsal quruluşu keş identifikasiyasına möhür vurur.
- **Bildirişlər:** daxil olan `push` hadisələrini idarə edir və bildiriş kliklədikdə fokuslanır və ya pəncərəni açır.

Təkcə təkan hadisəsi idarəçiləri aktiv təkan abunəsi və ya konfiqurasiya edilmiş server çatdırılması yaratmır. Yalnız PWA quraşdırıldığı üçün bildirişlərin aktiv olduğunu düşünməyin.

### Layout Metadata və Qeydiyyat

[`src/app/layout.tsx`](../../src/app/layout.tsx) manifest keçidi, Apple müstəqil metadata, mövzu rəngləri və `viewport-fit: cover` təmin edir. Səhifənin başlığı və Apple veb tətbiqinin başlığı nümunə adından istifadə edir. Canlı brauzer mövzu rəngi palitranı izləyir; quraşdırma manifesti standart açıq rəngdən istifadə edir.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) müştəri üzərində işləyir və URL də ID quruluşu ilə `/sw.js` qeyd edir. O, uyğun olmayan keş nəsillərini aşkar edir və işçini sıfırlaya və köhnə quraşdırmadan bərpa etmək üçün bir dəfə yenidən yükləyə bilər. Qeydiyyatın uğursuzluğu tablosunu bloklamır.

## Termux ilə istifadə edin (Android)

1. Termux-da OmniRoute başlayın: `npx -y omniroute@latest`.
2. Eyni telefonda Chrome-u açın: `http://localhost:20128`.
3. Brauzerin quraşdırma menyusu vasitəsilə PWA quraşdırın.
4. Paneldən istifadə edərkən Termux serverini işlək vəziyyətdə saxlayın.

Telefon həm şluz, həm də onun idarə panelinə sahibdir. Uzaqdan AI provayderlərinə edilən sorğular hələ də şəbəkəyə giriş tələb edir. Quraşdırma və Android prosesinin ömrü boyu mülahizələr üçün [Termux bələdçisinə](TERMUX_GUIDE.md) baxın.

## Digər Cihazlardan istifadə edin

Telefonda, planşetdə və ya masaüstündə serverin HTTPS ünvanını açın, sonra həmin brauzerin quraşdırma prosesini izləyin. Server hər bir cihazdan əlçatan olmalıdır. Uzaqdan giriş seçimləri üçün [tunel bələdçisinə](../ops/TUNNELS_GUIDE.md) baxın.

## Fərdiləşdirmə

### Nümunə Adı

The** Nümunə Adı** parametr səhifə başlığı və Apple veb tətbiqinin başlığı daxil olmaqla, tablosunun metadatasını dəyişir. Yaradılmış manifest statik addan istifadə edir, ona görə də bu parametr artıq quraşdırılmış tətbiqin adının dəyişdirilməsinə zəmanət vermir.

### Fərdi Favikon

Fərdi favikon brauzerin favikonunu dəyişir. Quraşdırma manifesti hələ də yuxarıdakı PNG fayllarını reklam edir; favikonun dəyişdirilməsi həmin ev ekranı nişanlarını əvəz etmir.

## Məhdudiyyətlər

- **Server bağlantısı tələb olunur:** səhifə naviqasiyası, tablosunun vəziyyəti və API sorğularının oflayn geri qaytarılması yoxdur.
- **Fon sinxronizasiyası yoxdur:** oflayn hərəkətlər təkrar oxunmaq üçün növbəyə qoyulmur.
- **Brauzer fərqləri:** quraşdırma menyuları, pəncərə təqdimatı və bildiriş dəstəyi platformaya görə dəyişir.
- **API cavab keşi yoxdur:** işçi API, tablosunu və autentifikasiya marşrutlarını istisna edir.
- **Statik quraşdırma nişanları:** həmin nişanların yenilənməsi reklam edilən aktivlərin dəyişdirilməsini tələb edir; brauzerlər quraşdırılmış metadatanı saxlaya bilər.

## Fayllara istinad

| Fayl                                                                                   | Məqsəd                                                |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Yaradılmış veb tətbiq manifest                        |
| [public/sw.js](../../public/sw.js)                                                     | Keşləmə, istisnalar və bildiriş hadisəsi işləyiciləri |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | İstehsalın qeydiyyatı və köhnəlmiş keşin bərpası      |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Qoşulma səhifəsi, avtomatik oflayn geri dönüş deyil   |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Səhifə metadatası və görünüş pəncərəsi parametrləri   |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Paylaşılan mövzu-rəng dəyərləri                       |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 proqram simvolu                             |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple nişanı                                |
