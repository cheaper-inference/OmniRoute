# Monitoring & Observability Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Qısa xülasə**: OmniRoute daxili sağlamlıq monitorinqi, provayder avtopilotu, kvota izləmə və müşahidə ediləbilənlik inteqrasiya nöqtələri ilə təchiz edilir. Bu təlimatda idarəetmə paneli, xəbərdarlıqlar və problemlərin aradan qaldırılması əhatə olunur.

**Mənbələr:**

- `src/lib/monitoring/observability.ts` — müşahidə ediləbilənlik anlıq görüntüsü
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinasiya sağlamlığı avtopilotu
- `src/lib/monitoring/providerHealthAutopilot.ts` — provayder avtopilotu
- `src/lib/monitoring/providerHealthMatrix.ts` — provayder sağlamlığı matrisi
- `src/lib/localHealthCheck.ts` — lokal sağlamlıq yoxlaması
- `src/lib/tokenHealthCheck.ts` — token yeniləmə sağlamlığı
- `src/lib/proxyHealth.ts` — proksi sağlamlığı keşi (PROXY_GUIDE.md faylında əhatə olunur)

---

## İcmal

OmniRoute **3 monitorinq səviyyəsinə** malikdir:

```
┌──────────────────────────────────────────────────────────────┐
│  Səviyyə 1: Sistem sağlamlığı (server səviyyəsində)           │
│  ├─ localHealthCheck.ts — DB, portlar, yerli asılılıqlar      │
│  ├─ db/healthCheck.ts — bütövlük, FK, sahibsiz artefaktlar    │
│  └─ İdarəetmə paneli: /dashboard/health                      │
├──────────────────────────────────────────────────────────────┤
│  Səviyyə 2: Provayder sağlamlığı (hər provayder üzrə dayanıqlılıq) │
│  ├─ providerHealthAutopilot.ts — dövrə açarı, fasilələr       │
│  ├─ providerHealthMatrix.ts — provayder/model üzrə sağlamlıq balları │
│  └─ İdarəetmə paneli: /dashboard/providers                   │
├──────────────────────────────────────────────────────────────┤
│  Səviyyə 3: Canlı müşahidə ediləbilənlik (icra vaxtı görüntüləri) │
│  ├─ observability.ts — dövrə açarları, sessiyalar, kvota      │
│  ├─ tokenHealthCheck.ts — OAuth token yeniləmə sağlamlığı    │
│  └─ MCP alətləri: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## İdarəetmə Paneli Səhifələri

### `/dashboard/health` (Sistem Sağlamlığı)

Yuxarı səviyyəli sağlamlıq idarəetmə panelində aşağıdakılar göstərilir:

| Bölmə                  | Nəyi göstərir                                              |
| ---------------------- | ---------------------------------------------------------- |
| **Server statusu**     | İşləmə müddəti, versiya, port, aktiv bağlantılar           |
| **Verilənlər bazası**  | Bağlantı, bütövlük, WAL ölçüsü, son miqrasiyalar           |
| **Provayder xülasəsi** | Aktiv say, sağlam say, açıq dövrə açarlarının sayı         |
| **Kvota monitorları**  | Aktiv sessiyalar, xəbərdarlıq vəziyyəti, tükənmiş kvotalar |
| **Son xətalar**        | Stek izləri ilə birlikdə son 10 xəta                       |
| **Resurs istifadəsi**  | Yaddaş, CPU, hip təzyiqi göstəricisi                       |

### `/dashboard/providers` (Provayder Sağlamlığı)

Hər provayder üzrə idarəetmə paneli:

| Sütun       | Təsvir                                                         |
| ----------- | -------------------------------------------------------------- |
| Provayder   | Provayder ID-si + göstərilən ad                                |
| Sağlamlıq   | Yaşıl/sarı/qırmızı status                                      |
| Dövrə       | Açıq/qapalı/yarıaçıq vəziyyət                                  |
| Bağlantılar | Bağlantıların sayı, son yenilənmə                              |
| Modellər    | Mövcud modellər, hər model üzrə sağlamlıq                      |
| Xərc        | Bugünkü xərc, 7 günlük tendensiya                              |
| Xətalar     | Son 24 saatdakı xətaların sayı, ən çox rast gəlinən xəta sinfi |

Aşağıdakı məlumatları görmək üçün provayderə klikləyin:

- Gecikmə bölgüsü ilə son sorğular
- Hər bağlantı üzrə sağlamlıq balları
- Hər model üzrə bloklamalar
- Avtopilot tövsiyələri

### `/dashboard/quota` (Kvota İzləmə)

Hər API açarı üçün:

- Cari istifadə və limitin müqayisəsi (irəliləyiş zolağı)
- Kvota tendensiyası (30 günlük qrafik)
- Növbəti sıfırlanma vaxtı
- Xəbərdarlıq tarixçəsi

### `/dashboard/combos` (Kombinasiya Sağlamlığı)

Hər kombinasiya üzrə:

- Strategiya + hədəflər
- Hər hədəf üzrə sağlamlıq
- Son ehtiyat hədəfə keçid hadisələri
- Uğur faizi (24 saat, 7 gün, 30 gün)

---

## Sağlamlıq yoxlanışı API

OmniRoute ifşa edir** iki** HTTP sağlamlıq səthləri. Onlar orkestrlər üçün əvəz edilə bilməz.

| Yol                          | Məqsəd                                                                | Çəki                                      | üçün istifadə edin                                                            |
| ---------------------------- | --------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| `GET /healthz`               | Həyat dövrü liveness/readiness (`ok` / `starting` / `stopping`)       | Önəmsiz (yalnız mərhələ bayrağı)          | Kubernetes** hazırlıq** ; yumşaq** canlılıq** HTTP istifadə etməlisinizsə     |
| `GET /api/monitoring/health` | Dərin sistem + provayderinin xülasəsi (DB, yığın, kataloq sayları, …) | Ağır (sinxronizasiya DB / monitorinq işi) | Tablolar, qara qutunun dərin yoxlanışı, Docker-nın daxili sağlamlıq yoxlaması |

> **Qeyd:** Provayderin sağlamlıq matrisləri, avtopilot məsələləri, kvota monitorları, token sağlamlığı və `/api/monitoring/health` kənar gecikmə təfərrüatları vasitəsilə əldə edilə bilər.**MCP aləti** `observability_snapshot` və ya** idarə paneli** pages — bunlar üçün xüsusi REST marşrutları yoxdur.

Hər iki marşrut xətti üzərində işləyir** eyni Node hadisə döngəsi** sorğunun işlənməsi kimi. CPU ilə əlaqəli yol (böyük `GET /v1/models` kataloqu işi, uzun kontekstdə sıxılma / işarələrin hesablanması) gecikdirə bilər** hamısı** HTTP işləyiciləri, o cümlədən `/healthz`. Hadisə döngəsi məşğul ≠ prosesi bitdi. Donuzu düzəltməyə üstünlük verin; zond tənzimləməsi yalnız yalançı öldürmələri azaldır.

### Yüngül orkestr zondu

```bash
GET /healthz
# or HEAD /healthz
```

- **200** serverin həyat dövrü mərhələsi hazır olduqda + body `ok`
- **503** + `starting` / `stopping` açılış və ya bağlanma zamanı
- İcra: `src/app/healthz/route.ts` ( DB ping yoxdur)

### Sistem Sağlamlığı (dərin)

```bash
GET /api/monitoring/health
```

Cavab:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: probe-cache vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` edir** yaddaşdaxili prob-keş ölçmə cihazı** , `provider_connections.test_status` canlı dump deyil . #12532 dən sonra sorğu yolu yalnız `getCachedCredentialHealthSummary()` oxuyur; fon zondları hadisə dövrəsindən kənar yaddaşı təzələyir.

| Qat                    | Harada                                                                | Nə deməkdir                                                                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zond-keş ölçer         | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Son etimadnamə-sağlamlıq araşdırması nəticələri hələ də proses yaddaşında saxlanılır. `source` həmişə `probe-cache`.                                                                                                      |
| Uğursuz əlaqə detalı   | `credentialHealth.failedConnections`                                  | təqdim** yalnız `failed > 0` olduqda** . `status=error` (`connectionId`, `status`, təmizlənmiş `lastError` / `lastErrorType`) ilə keş sətirlərinin məhdud siyahısı. `failedOmitted` siyahıya son qoyulduqda təyin edilir. |
| SQLite yapışqan status | `credentialHealth.staleDbNonOkCount`                                  | sayı** aktiv** (`is_active=1`) davamlı `test_status` qeyri-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) olan əlaqə sıraları.                                                      |

İki təbəqə məqsədlə razılaşa bilməz:

- `staleDbNonOkCount>0` — SQLite hələ də yapışqan `test_status` (məsələn `expired` və ya `credits_exhausted`) olduğu halda `failed=0` ölçün, ən son prob-keş snapshot `status=error` kimi sayılmır.
- SQLite sağlam göründüyü halda `failed>0` ölçün — son zond uğursuz oldu və keşləndi; DB cərgəsi yenilənməyib və ya sonradan silinib.

Bu son nöqtəni qırarkən yalnız `provider_connections.test_status` ilə bağlı xəbərdarlıq etməyin. Canlı zond uğursuzluqları üçün `failed` + `failedConnections` və davamlı yapışqan status sayına ehtiyacınız olduqda `staleDbNonOkCount` istifadə edin.

### Kubernetes araşdırma tövsiyələri

OmniRoute a** tək Node prosesi** (bir hadisə dövrü). Fond Docker `HEALTHCHECK` yüngül `/healthz` hədəfləyir. `/api/monitoring/health` edir** çox ağır** kubelet canlılıq intervalları üçün.

| Prob                | Tövsiyə olunan hədəf                                                            | Qeydlər                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Başlanğıc**       | uzun `failureThreshold` (və ya böyük `startPeriod`) ilə HTTP `GET /healthz`     | Soyuq başlanğıc + SQLite miqrasiyası bir neçə saniyədən çox ola bilər                                                                                                                                                                                                                                                                     |
| **Hazırlıq**        | HTTP `GET /healthz`                                                             | Həyat dövrü `ok` / `starting` / `stopping` (200 vs 503). Döngə CPU tərəfindən bloklanırsa, yenə də çırpılır. A** Bir neçə saniyədə 200 sağlam deyil** (#10303) — o deməkdir ki, 3 baytlıq işləyici işə düşməmişdən əvvəl hadisə dövrəsi ac qalmışdır                                                                                      |
| **Canlılıq**        | HTTP `GET /livez`,** və ya TCP** əsas xidmət portunda (`PORT`, default `20128`) | `/livez` yalnız prosesdədir (işləyici işləyirsə həmişə 200). O, hələ də — busy ≠ dead hadisə döngəsini paylaşır və hadisə döngəsinin aclığını (#10303) TCP dən daha yaxşı aşkar etmir. üstünlük verin**TCP** HTTP probları catalog/compression yükü altında vaxt aşıbsa; et** yox** hər iki şəkildə qısa hadisə döngələrində podu öldürün |
| **Dərin sağlamlıq** | xarici yoxlayıcıdan `GET /api/monitoring/health`                                | Kubelet `livenessProbe` / sıx `readinessProbe` üçün deyil                                                                                                                                                                                                                                                                                 |

Nümunə forma (soyuq başlanğıc və sıxılma yükünə hədləri tənzimləyin):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**etməyin** nöqtə kubelet** canlılıq** `/api/monitoring/health`. Bu yol real DB/monitoring işləyir və yük altında yanlış müsbət olacaq.

Əlaqədar: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (hadisə dövrəsi məşğul olarkən zondlar), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (kataloq qiymətləri), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (sıxılma işarəsi sayının hesablanması).

### systemd watchdog (dondurulmuş hadisə dövrəsi)

Sistemli hostda OmniRoute xidmət menecerinə hazır olduqda xəbər verir və onu pingləməyə davam edir, beləliklə, hadisə dövrəsi ilişib qalan server ayağa qalxıb susmaq əvəzinə öldürülür və yenidən işə salınır. Pinqlər serverin öz hadisə döngəsindən gəlir: bloklayanda onlar dayanır və `WatchdogSec` bitdikdən sonra systemd xidməti yenidən işə salır.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) bununla artıq istifadəçi vahidi yazır. Özünüz yazdığınız vahid (standart `Type=simple`) heç bir nəzarətçi almır, ona görə də onun `[Service]` bölməsinə bu sətirləri əlavə edin:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Yaradılan vahid `Restart=on-failure` təyin edir, ona görə də bu xətti əlavə edin və — onsuz da nəzarətçi onu yenidən işə salmaq əvəzinə sadəcə yapışmış xidməti öldürür.

- `Type=notify`: xidmət server `READY=1` göndərdikdə "başlanır", proses çəngəlləndikdə deyil. `TimeoutStartSec` yavaş başlanğıcı məhdudlaşdırır.
- `NotifyAccess=all`: pinglər `omniroute serve` nəzarətçisinin övladı olan server prosesi tərəfindən göndərilir.
- `WatchdogSec`: pinglər hər 60 saniyədən bir sönür, ona görə də istifadə edin** 120 və ya daha çox** . Daha kiçik dəyərlər sağlam serveri yenidən işə salacaq.
- Ön planda `omniroute serve` işə salın. `--daemon` serveri bölmənin qruplarından ayırır və bildiriş əl sıxması heç vaxt tamamlanmır.

Yenidən başladıqdan sonra onun aktiv olub olmadığını yoxlayın:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` konfiqurasiya edilmiş gecikməni göstərir və `WatchdogTimestamp` hər dəqiqə irəliləyir. Gözətçi iti tərəfindən yenidən işə salınma `Result=watchdog` olaraq qeyd olunur. Cihazı olduğu kimi saxlayarkən pingləri söndürmək üçün `OMNIROUTE_DISABLE_SD_NOTIFY=1` seçin; `NOTIFY_SOCKET` olmadan (terminal, Docker, Electron, Windows) heç nə göndərilmir.

Gözətçi yalnız hadisə dövrəsinin işləməyə davam etdiyini yoxlayır. Yavaş işləyən, lakin yenə də dönən server yenidən işə salınmayıb.

### İsteğe bağlı sorğu yolu işi (yaddaş, bacarıqlar, token yeniləməsi)

Yaddaşın çıxarılması, bacarıqların inyeksiyası və OAuth tokeninin yenilənməsi paylaşılır** əsas Node hadisə dövrəsi** `/healthz` ilə. Onlar işçi hovuzu deyil, tablosuna keçid funksiyalarıdır (`memoryEnabled`, `skillsEnabled`). [Ətraf mühit — hadisə dövriyyəsi dəyərinə](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) baxın.

### Provayder Sağlamlığı

> **REST son nöqtəsi yoxdur.** Provayderin sağlamlıq məlumatları MCP aləti `observability_snapshot` və ya idarə paneli `/dashboard/providers` səhifəsi vasitəsilə əldə edilə bilər.

### Provayder Təfərrüatı

> **REST son nöqtəsi yoxdur.** Hər provayder təfərrüatını tablosuna `/dashboard/providers` səhifəsindən əldə etmək olar.

---

## Provayder Sağlamlığı Avtopilotu

`providerHealthAutopilot.ts` modulu aşağıdakıları yerinə yetirən **özünü bərpa edən sistemdir**:

1. Provayder problemlərini aşkarlayır (dövrə açıqdır, gözləmə müddətləri, bloklamalar, kvota xəbərdarlıqları)
2. Onları həll etmək üçün **tövsiyə olunan tədbirlər** yaradır
3. Aşağı riskli tədbirləri istəyə bağlı olaraq **avtomatik icra edir**

### Aşkarlanan Problem Növləri

| Problem növü                 | Ciddilik    | Nümunə şərt                                    |
| ---------------------------- | ----------- | ---------------------------------------------- |
| `provider_circuit_open`      | kritik      | 5 uğursuzluqdan sonra dövrə qoruyucusu açıqdır |
| `provider_circuit_half_open` | xəbərdarlıq | Dövrənin bərpası sınaqdan keçirilir            |
| `connection_cooldown`        | xəbərdarlıq | 429-dan sonra bağlantı gözləmə müddətindədir   |
| `stale_connection_error`     | xəbərdarlıq | Son yeniləmə 30+ dəqiqə əvvəl uğursuz olub     |
| `terminal_connection_error`  | kritik      | OAuth ləğv edilib, açar etibarsızdır           |
| `inactive_connection`        | məlumat     | Bağlantı ayarlarda deaktiv edilib              |
| `model_lockout`              | xəbərdarlıq | Konkret model karantindədir                    |
| `quota_monitor_warning`      | xəbərdarlıq | Kvota istifadəsi 80%+ səviyyəsindədir          |

### Yaradılan Tədbir Növləri

| Tədbir                         | Risk   | Təsvir                                            |
| ------------------------------ | ------ | ------------------------------------------------- |
| `clear_provider_breaker`       | orta   | Dövrə qoruyucusunu qapalı vəziyyətə sıfırlamaq    |
| `clear_connection_cooldown`    | aşağı  | Bağlantının gözləmə müddətini aradan qaldırmaq    |
| `clear_stale_connection_error` | aşağı  | Köhnəlmiş xəta bayrağını təmizləmək               |
| `clear_model_lockout`          | aşağı  | Karantinə alınmış modeli yenidən aktivləşdirmək   |
| `reactivate_connection`        | orta   | Deaktiv edilmiş bağlantını yenidən aktivləşdirmək |
| `deactivate_connection`        | yüksək | Problemli bağlantını deaktiv etmək                |

### API

> **REST son nöqtəsi yoxdur.** Avtopilot problemləri MCP aləti `observability_snapshot` və ya idarəetmə paneli vasitəsilə əlçatandır. Avtopilot daxildə işləyir; onun davranışı mühit dəyişənləri ilə deyil, ayarlar verilənlər bazası vasitəsilə (hər bağlantı üçün `autopilotMode` sahəsi) konfiqurasiya edilir — avtopilot rejimi üçün mühit dəyişənini axtaran `grep -rn` sıfır nəticə qaytarır.

### Avtopilot Rejimi

Avtopilot standart olaraq **əl rejimində** işləyir — problemləri aşkarlayır və tövsiyə olunan tədbirlər yaradır, lakin onları avtomatik tətbiq etmir. Tədbirlər idarəetmə paneli vasitəsilə tətbiq edilə bilər.

---

## Kombinasiya Sağlamlığı Avtopilotu

`comboHealthAutopilot.ts` provayder avtopilotunun **kombinasiyalara xas** ekvivalentidir. O:

- Sağlam olmayan kombinasiyaları aşkarlayır
- Hədəflərin yenidən sıralanmasını tövsiyə edir
- İşləməyən hədəflərin deaktiv edilməsini təklif edir
- N sayda uğursuzluqdan sonra işləməyən hədəfləri avtomatik silir

### Kombinasiya Problemi Nümunələri

```
Kombinasiya "always-on" (prioritet strategiyası)
├─ Hədəf 1: openai/gpt-5 (sağlam)
├─ Hədəf 2: anthropic/claude-opus-4-6 (⚠️ model saat 14:00-a qədər bloklanıb)
└─ Hədəf 3: kiro/claude-sonnet-4-5 (sağlam)

Tövsiyə olunan tədbir: Yenidən sırala — bloklama bitənə qədər kiro-nu anthropic-dən yuxarı daşı
```

---

## Kvota Monitorları

`observability.ts` abunə əsaslı provayderlər (Claude Code, Codex, GitHub Copilot) üçün **hər sessiyaya aid kvota monitorlarını** təqdim edir:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Statusların Mənaları

| Status      | Nə zaman               | UI tədbiri                                 |
| ----------- | ---------------------- | ------------------------------------------ |
| `starting`  | İlkin sorğu davam edir | Yüklənmə indikatoru                        |
| `idle`      | Son fəaliyyət yoxdur   | İdarəetmə panelində gizlədilir             |
| `healthy`   | Kvotanın > 50%-i qalıb | Yaşıl nöqtə                                |
| `warning`   | Kvotanın < 50%-i qalıb | Sarı xəbərdarlıq                           |
| `exhausted` | Kvota = 0%             | Qırmızı blok, növbəti provayderə yönləndir |
| `error`     | Sorğulama uğursuz oldu | Qırmızı nöqtə, tezliklə yenidən cəhd et    |

### API

> **REST son nöqtəsi yoxdur.** Kvota monitoru məlumatları MCP aləti `observability_snapshot` və ya idarəetmə paneli vasitəsilə əlçatandır.

---

## Müşahidəolunma Anlıq Görüntüsü

MCP aləti `observability_snapshot` AI agentləri üçün **sistemin tam anlıq görüntüsünü** qaytarır:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* yuxarıya baxın */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agentlər bundan **marşrutlaşdırma qərarları** vermək üçün istifadə edirlər — məsələn, "əgər openai dövrəsi açıqdırsa, əvvəlcə anthropic-ə yönləndir".

---

## Token Sağlamlığının Yoxlanılması

OAuth provayderləri (Claude Code, GitHub Copilot, Cursor) **tokenlərin vaxtaşırı yenilənməsini** tələb edir. `src/lib/tokenHealthCheck.ts` arxa fon planlaşdırıcısını işə salır:

- **Yoxlama dövrü**: hər 60 saniyədən bir (`src/lib/tokenHealthCheck.ts:30` ünvanında `TICK_MS = 60 * 1000` ilə yoxlama)
- **Hər bağlantı üzrə sağlamlıq yoxlaması intervalı**: standart olaraq 60 dəqiqə (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); parametrlər verilənlər bazası vasitəsilə konfiqurasiya edilə bilər
- **401 zamanı qabaqlayıcı yeniləmə**: hər bağlantı üzrə interceptor tərəfindən idarə olunur

### Token Sağlamlığı Statusu

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfiqurasiya

Token sağlamlığı yoxlamasının konfiqurasiyası `tokenHealthCheck.ts` tərəfindən daxili şəkildə idarə olunur.

### Token Sağlamlığı

> **REST son nöqtəsi yoxdur.** Token sağlamlığı məlumatları idarəetmə paneli və ya MCP aləti `observability_snapshot` vasitəsilə əlçatandır.

---

## Xəbərdarlıq

### Daxili Kanallar

OmniRoute **3 xəbərdarlıq kanalını** dəstəkləyir:

| Kanal                    | Quraşdırma               | İstifadə halı                   |
| ------------------------ | ------------------------ | ------------------------------- |
| İdarəetmə paneli banneri | Həmişə aktivdir          | Tətbiqdaxili bildirişlər        |
| Webhook                  | URL-i konfiqurasiya edin | Slack, Discord, PagerDuty       |
| Jurnal                   | Standart                 | Xarici jurnal aqreqasiyası üçün |

### Webhook Konfiqurasiyası

> **Qeyd:** Webhook xəbərdarlıq konfiqurasiyası idarəetmə panelindəki Parametrlər səhifəsi vasitəsilə idarə olunur. Webhook URL-i, hadisə filtrasiyası və faydalı yükün fərdiləşdirilməsi üçün Parametrlər istifadəçi interfeysinə baxın.

### Xəbərdarlıq Növləri

| Xəbərdarlıq                  | Nə zaman                                            | Standart ciddilik |
| ---------------------------- | --------------------------------------------------- | ----------------- |
| `provider_circuit_open`      | Dövrə açıldıqda                                     | kritik            |
| `provider_circuit_half_open` | Dövrənin bərpası sınaqdan keçirildikdə              | məlumat           |
| `quota_warning`              | Kvota 80% və ya daha çox olduqda                    | xəbərdarlıq       |
| `quota_exhausted`            | Kvota 100% olduqda                                  | kritik            |
| `token_refresh_failed`       | Ardıcıl 3 və ya daha çox yeniləmə uğursuz olduqda   | xəbərdarlıq       |
| `token_expired`              | Tokenin müddəti bitdikdə                            | kritik            |
| `combo_target_unhealthy`     | Combo hədəfi 1 saatdan çox soyuma rejimində olduqda | xəbərdarlıq       |
| `db_integrity_warning`       | FK pozuntularının sayı 0-dan çox olduqda            | xəbərdarlıq       |
| `heap_pressure`              | Heap istifadəsi həddin 80%-ni keçdikdə              | xəbərdarlıq       |

---

## Performans Metrikaları

### İzlənilən Metrikalar

| Metrika                 | Növ       | Mənbə                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | sayğac    | `services/usage.ts`             |
| `request_latency_ms`    | histoqram | `services/usage.ts`             |
| `tokens_consumed`       | sayğac    | `services/usage.ts`             |
| `cost_usd`              | sayğac    | `services/usage.ts`             |
| `provider_errors`       | sayğac    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | sayğac    | `services/resilience.ts`        |
| `cache_hits`            | sayğac    | `services/signatureCache.ts`    |
| `compression_savings`   | histoqram | `services/compression/stats.ts` |
| `quota_used`            | göstərici | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | göstərici | `observability.ts`              |

### Gecikmə Persentilləri (p50/p95/p99)

> **REST son nöqtəsi yoxdur.** Gecikmə persentili məlumatları idarəetmə panelinin `/dashboard/health` səhifəsində mövcuddur. Prometheus/OpenTelemetry ixracı v3.9 üçün planlaşdırılıb.

### Prometheus / OpenTelemetry İxracı (Mərhələ 2)

v3.9 üçün planlaşdırılıb: Prometheus, OpenTelemetry və Datadog sistemlərinə yerli ixrac.

Hələlik, istənilən HTTP əsaslı monitorinq sistemi (Prometheus blackbox exporter, Datadog HTTP yoxlaması və s.) ilə `/api/monitoring/health` ünvanından məlumatları toplayın.

---

## Xəbərdarlıq Reseptləri

### Slack

> **Qeyd:** Webhook xəbərdarlıqları idarəetmə panelinin Settings səhifəsindən konfiqurasiya edilir — ayrıca webhook mühit dəyişənləri yoxdur (`grep -rn` sıfır nəticə qaytarır). Webhook URL-i, hadisələrin filtrlənməsi və faydalı yükün fərdiləşdirilməsi üçün Settings interfeysinə baxın.

### Discord

> Webhook xəbərdarlıqları Slack ilə eyni Settings interfeysi axınından istifadə edir. Discord eyni JSON faydalı yük strukturunu qəbul edir.

### PagerDuty

> Webhook xəbərdarlıqları eyni Settings interfeysi axınından istifadə edir. PagerDuty Events API v2 marşrutlaşdırma açarları Settings interfeysində konfiqurasiya edilir.

### Fərdi Webhook (JSON)

> JSON gövdəsi ilə POST sorğularını qəbul edən istənilən HTTP son nöqtəsi işləyəcək. URL-i Settings interfeysində konfiqurasiya edin.

---

## İdarəetmə Panelinin Konfiqurasiyası

### Sağlamlıq İdarəetmə Panelini Fərdiləşdirin

`~/.omniroute/dashboard.json` faylı yaradın:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Təchizatçını Yuxarıda Sabitləyin

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Problemlərin Aradan Qaldırılması

### "Təchizatçı sağlam olduğunu bildirir, lakin sorğular uğursuz olur"

1. **Avtopilot problemlərini** yoxlayın — ola bilsin ki, model bloklanıb
2. Konkret xəta sinfi üçün **son xətalara** baxın
3. Təchizatçı kartındakı **bağlantı testini** sınayın
4. Təchizatçının **yuxarı axında sürət məhdudiyyətinə məruz qalıb-qalmadığını** yoxlayın (lokal olaraq görünmür)

### "Kvota sağlam görünür, lakin 429 xətaları alıram"

- 429 təchizatçının kvotanızı istifadə edib bitirdiyinizi bildirməsi deməkdir
- OmniRoute-un kvota izləməsi **köhnəlmiş** ola bilər — əsas həqiqət təchizatçının yuxarı axınındadır
- Kvota məlumatları daxili kvota monitoru vasitəsilə avtomatik yenilənir

### "Kombinasiya uğursuz olur, lakin bütün hədəflər sağlam görünür"

- Hədəflərin sıralanması ilə bağlı problemlər üçün **kombinasiya sağlamlığı** idarəetmə panelini yoxlayın
- **Ehtiyat varianta keçid hadisələrinə** baxın — ola bilsin ki, kombinasiya imkanlarını həddən artıq tez tükəndirir
- **Strategiyanın** istifadə ssenarinizə uyğun olduğunu yoxlayın (prioritet, növbəli və ya avtomatik)

### "Verilənlər bazasının sağlamlıq yoxlaması uğursuz olur"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` əmrini işə salın
- Nəticə "ok" olarsa — bu, yanlış həyəcan siqnalıdır, sağlamlıq yoxlaması həddindən artıq sərtdir
- Başqa nəticə olarsa — **OmniRoute-u dayandırın** və [fəlakətdən sonra bərpa təlimatına](./DATABASE_GUIDE.md#disaster-recovery) əməl edin

### "Yaddaş yığınına düşən yük kritikdir"

```bash
# Cari yaddaş yığınını yoxlayın
node -e "console.log(process.memoryUsage())"

# GC-ni əl ilə başladın (--expose-gc istifadə edilirsə)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Paralel sorğuların sayını azaldın (mühit dəyişəni ilə deyil, idarəetmə panelinin Settings səhifəsindən təyin edilir)
# `MAX_CONCURRENT_REQUESTS` mühit dəyişəni yoxdur — bunu Settings → Concurrency bölməsində konfiqurasiya edin.
```

---

## Həmçinin baxın

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — istifadə və xərcin izlənməsi
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB sxemi + sağlamlıq vəziyyəti
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proksi sağlamlığı (ayrıca keş)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sistem arxitekturası
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — dövrə açarının təfərrüatları
- Mənbə: `src/lib/monitoring/` (4 fayl, 2121 LOC)
