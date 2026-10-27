# 🐳 Docker Guide — OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Tam Docker yerləşdirmə arayışı. Sürətli başlamaq üçün [README-dəki Docker bölməsinə](../README.md#-docker) baxın.

## Mündəricat

- [Sürətli işə salma](#quick-run)
- [Mühit faylı ilə](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Mövcud profillər](#available-profiles)
- [OmniRoute Docker-də işləyərkən host CLI alətlərinin konfiqurasiyası](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [İstehsal mühiti üçün Compose](#production-compose)
- [Dockerfile mərhələləri](#dockerfile-stages)
- [Kritik mühit dəyişənləri](#critical-environment-variables)
- [Caddy (HTTPS) ilə Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare sürətli tuneli](#cloudflare-quick-tunnel)
- [İmaj teqləri](#image-tags)
- [Docker-də idarəetmə paneli yeniləmələri](#dashboard-updates-in-docker)
- [Əlçatanlıq: standart SQLite yalnız bir replikanı dəstəkləyir](#availability-default-sqlite-is-single-replica)
- [Docker daxilində Gemini regional xətaları](#gemini-regional-errors-inside-docker)
- [Vacib qeydlər](#important-notes)

---

## Sürətli işə salma

> **Bir əmrlə öz serverinizdə yerləşdirmək istəyirsiniz?**
> [Öz serverinizdə yerləşdirmə təlimatına](../getting-started/SELF_HOST_GUIDE.md) baxın —
> `docker compose -f docker-compose.selfhost.yml up -d` (dərc edilmiş imaj +
> Redis, yalnız loopback, profil seçimi yoxdur). Aşağıdakı sürətli işə salma bölməsi
> Redis-i artıq başqa yerdə işlədən istifadəçilər üçün tək konteynerli üsuldur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Mühit faylı ilə

```bash
# Əvvəlcə .env faylını kopyalayın və redaktə edin
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Əsas profil (CLI alətləri yoxdur)
docker compose --profile base up -d

# CLI profili (Claude Code, Codex, OpenClaw daxildir)
docker compose --profile cli up -d

# Host profili (ilk növbədə Linux üçün; host CLI icra fayllarını yalnız oxuma rejimində qoşur)
docker compose --profile host up -d

# Veb profili (veb sessiya provayderləri üçün Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar kombinasiyası
docker compose --profile cli --profile cliproxyapi up -d
```

## Mövcud profillər

OmniRoute əsas yerləşdirmə formaları üçün Compose profilləri ilə təqdim olunur. Mühitinizə uyğun olanı seçin.

| Profil            | Xidmət           | Nə zaman istifadə etməli                                                                                                                                | Əmr                                          |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standart) | `omniroute-base` | Başsız server / minimal icra mühiti, provayder CLI-ləri daxil deyil                                                                                     | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` və daxili CLI-ləri (Codex, Claude Code, Droid, OpenClaw) çağıran agent əsaslı iş axınları                            | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` və s. faylları yalnız oxuma rejimində qoşaraq host CLI-lərinə `network_mode` tipli giriş istəyən Linux hostları | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Yuxarı axın CLI proksiləməsi üçün [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar-ını `8317` portunda işə salmaq                    | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Brauzer tələb edən veb sessiya provayderləri: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` qurulur, Chromium daxildir)                  | `docker compose --profile web up -d`         |

> Bir neçə profil birləşdirilə bilər: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker-də işləyərkən host CLI alətlərinin konfiqurasiyası

`omniroute setup-codex`, `setup-claude`, `config set <tool>` və idarəetmə panelindəki
**Konfiqurasiyanı yadda saxla** düyməsi `~/.codex/*.config.toml` kimi fayllara yazır. Bu yollar
yalnız CLI-nin faktiki işlədiyi maşında məna daşıyır. Onları konteyner daxilində
işlətdikdə məlumat konteynerin öz ev qovluğuna (`/home/node` —
obraz `USER node` ilə işləyir) yazılır; hostdakı heç bir CLI bu məlumatı oxumayacaq
və konteyner yenidən yaradılan kimi həmin məlumat silinəcək.

OmniRoute bunu aşkarlayır və istifadə edə bilməyəcəyiniz uğurlu nəticə bildirmək
əvəzinə, təlimatlar təqdim edərək yazma əməliyyatından imtina edir: CLI `2` kodu ilə
çıxır, API isə `containerEphemeralTarget: true` ilə `422` cavabı verir.

### Tövsiyə olunur: CLI-ni hostda, OmniRoute-u Docker-də işlədin

Konteyner API-ni təqdim edir; CLI isə host alətlərinizi konfiqurasiya edir.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-ni konteynerə yönəldin
omniroute setup-codex                      # hostunuzdakı həqiqi ~/.codex qovluğuna yazır
```

Codex, Claude Code, Cursor və ya oxşar alətlər noutbukunuzda işləyirsə, bu düzgün
seçimdir — adətən istifadə olunan quraşdırma məhz budur.

### Alternativ: host konfiqurasiya qovluqlarını bind-mount edin (`host` profili)

Konteynerin özünün host konfiqurasiyanıza yazmasını istəyirsinizsə, qovluqları
qoşun və `CLI_CONFIG_HOME` dəyişənini qoşulma kökünə yönəldin. `host` profili
bunu artıq edir:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Yolu etibarlı edən bind mount-dur: OmniRoute `/proc/self/mountinfo` faylını oxuyur
və qoşulmuş yollara, eləcə də alt qovluqları qoşulma nöqtəsi olan qovluqlara
(yuxarıdakı `/host-home` strukturu məhz belədir) yazmağa icazə verir, qoşulmamış
yollara yazmaqdan isə yenə də imtina edir.

### Ehtiyat çıxış yolu: konteynerin öz CLI-lərini konfiqurasiya edin (ehtiyatla istifadə edin)

CLI-lər həqiqətən konteyner daxilində yerləşdikdə (`cli` profili), yazma əməliyyatı
məqsədyönlüdür. İstənilən `setup-*` əmrinə `--allow-container-write` ötürün və ya
server üçün `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` təyin edin. Yazma əməliyyatı
məlumatın konteynerdən sonra saxlanmayacağı barədə xəbərdarlıqla davam edir.

> **Təhlükəsizlik xəbərdarlığı — `cli` profili + `docker.sock` qoşulması.**
> `cli` profili `/var/run/docker.sock` yolunu bind-mount edir ki, konteyner daxilindəki
> avtomatik yeniləyici host demonu vasitəsilə steki yenidən yarada bilsin
> (`src/lib/system/autoUpdate.ts` həmin soketin mövcudluğunu yoxlayır və o olmadıqda
> Docker yolunu ötürür). Bu soket **host root səviyyəli etibar
> sərhədidir**: ona çata bilən istənilən komponent hostun Docker demonunu root
> kimi idarə edir — hostdakı istənilən konteyneri yarada, yoxlaya, dayandıra və silə bilər.
> Nəticələr:
>
> 1. **`cli` profilinin portunu heç vaxt şəbəkəyə açmayın.** Onu
>    `127.0.0.1` üzərində yayımlayın (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN üzərindən əlçatan `cli` profili idarəetmə paneli səviyyəsindəki istənilən RCE-ni
>    hostun tam ələ keçirilməsinə çevirir.
> 2. **`cli` profilinə əlavə host qovluqları qoşmayın.**
>    Docker soketi ilə birlikdə hər hansı əlavə qoşulma konteynerə fayl sisteminizə və
>    host konfiqurasiyanıza tam oxuma/yazma imkanı verir. Alətin hər hansı layihəni
>    görməsi lazımdırsa, onu CLI binar faylı ilə lokal olaraq işlədin — layihəni
>    `cli` konteynerinə qoşmayın.
>
> Konteyner daxilində avtomatik yeniləməyə ehtiyacınız yoxdursa, `cli` profilini deaktiv saxlayın
> (`COMPOSE_PROFILES=core,redis` və ya daha qısa variant). Digər profillər
> Docker soketini qoşmur.
>
> MITM ilə əlaqəli təhlükə modeli üçün `docs/security/MITM-TPROXY-DECRYPT.md` faylına (git-dədir;
> `/docs` daxilində kompilyasiya edilmir), `codex`/`claude-code`/`droid`/`openclaw`
> binar fayllarının mənşə zənciri üçün isə `docs/security/SUPPLY_CHAIN.md` faylına baxın.

## Redis Sidecar

OmniRoute paylanmış sorğu tezliyi məhdudlaşdırıcısını və ortaq keşi dəstəkləmək üçün Redis-dən istifadə edir. `redis` xidməti `docker-compose.yml` faylında **həmişə müəyyən edilir** (onun profil məhdudiyyəti yoxdur) və istənilən digər profillə birlikdə işə düşür.

| Təfərrüat                  | Dəyər                                           |
| -------------------------- | ----------------------------------------------- |
| İmaj                       | `redis:7-alpine`                                |
| Konteyner adı              | `omniroute-redis`                               |
| Daxili port                | `6379`                                          |
| Host portu (əvəzləmə)      | `REDIS_PORT` (standart olaraq `6379`)           |
| Host bağlantısı (əvəzləmə) | `REDIS_BIND_HOST` (standart olaraq `127.0.0.1`) |
| Həcm                       | `omniroute-redis-data` → `/data`                |
| Sağlamlıq yoxlaması        | `redis-cli ping` (10s interval)                 |

Əlaqəli mühit dəyişənləri:

- `REDIS_URL` — tətbiqə ötürülən bağlantı sətri (standart olaraq `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri üçün host tərəfindəki port uyğunlaşdırması.
- `REDIS_BIND_HOST` — portun yayımlandığı host interfeysi. Standart olaraq `127.0.0.1`.

> **Niyə standart olaraq loopback:** sidecar `requirepass` olmadan işləyir və tətbiq
> konteynerləri ona compose şəbəkəsi (`redis:6379`) üzərindən çatır — yayımlanmış port
> yalnız host tərəfindəki alətlər (`redis-cli`, lokal `npm run dev`) üçündür. Portun
> `0.0.0.0` ünvanında yayımlanması autentifikasiyasız Redis-i LAN şəbəkənizdəki bütün hostlara açar.
> `REDIS_BIND_HOST=0.0.0.0` təyin etsəniz, xidmətin `command:` hissəsinə `--requirepass` də əlavə edin.

**Redis-i deaktiv etmək** tövsiyə edilmir (sorğu tezliyi məhdudlaşdırıcısı yaddaşdaxili ehtiyat rejiminə keçəcək). Bunu etməlisinizsə, `docker-compose.yml` faylındakı `redis:` xidmət blokunu silin/şərhə çevirin və ya miqyasını sıfıra endirin:

```bash
docker compose up -d --scale redis=0
```

## İstehsal üçün Compose

Dev mühiti ilə yanaşı işləyən təcrid olunmuş istehsal snapshot-u üçün `docker-compose.prod.yml` istifadə edin.

| Təfərrüat                   | Dəyər                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| Fayl                        | `docker-compose.prod.yml`                                                                       |
| Standart idarə paneli portu | `PROD_DASHBOARD_PORT=20130` (daxili `${DASHBOARD_PORT:-20128}` portuna uyğunlaşdırılır)         |
| Standart API portu          | `PROD_API_PORT=20131`                                                                           |
| İmaj                        | `omniroute:prod` (`runner-cli` hədəfindən qurulur)                                              |
| Redis konteyneri            | `omniroute-redis-prod` (`redis:8.6.2`, ayrıca `redis-prod-data` həcmi)                          |
| Məlumat həcmi               | `omniroute-prod-data` (adlandırılmış, yenidən qurmalar arasında saxlanılır)                     |
| Sağlamlıq yoxlamaları       | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` Redis-in sağlamlıq vəziyyətinə bağlıdır |

İstifadə qaydası:

```bash
# İstehsal stekini qurun və başladın
docker compose -f docker-compose.prod.yml up -d --build

# Jurnalları real vaxt rejimində izləyin
docker compose -f docker-compose.prod.yml logs -f

# Dayandırın və silin (həcmləri saxlayın)
docker compose -f docker-compose.prod.yml down
```

İstehsal steki dev compose ilə paralel işləyir (konteyner adları, portlar və həcmlər fərqlidir), buna görə istehsal mühiti işlək qaldığı müddətdə lokal olaraq təkmilləşdirməyə davam edə bilərsiniz.

## Dockerfile mərhələləri

Repozitoriya çoxmərhələli Dockerfile (`Dockerfile`) ilə təqdim olunur. Dörd mərhələ əlçatandır; istifadə ssenariniz üçün uyğun `target` seçin.

| Mərhələ       | Baza təsviri          | Məqsəd                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Asılılıqları quraşdırır (`npm ci --legacy-peer-deps`) və `npm run build` əmrini işə salır (standart olaraq Turbopack — aşağıdakı Yığım vaxtı resursları bölməsinə baxın)                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Next.js-in müstəqil çıxışı ilə istehsal icra mühiti. **Provayder CLI-ləri daxil deyil.**                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` və qlobal CLI-lər əlavə edir: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agent əsaslı iş axınları üçün bunu seçin.**                                                                                                             |
| `runner-web`  | `runner-base`         | Veb sessiyası provayderləri üçün Playwright + Chromium brauzeri (`--with-deps`) əlavə edir: `gemini-web`, `claude-web`, `claude-turnstile`. **Bu provayderlərdən istifadə edərkən bunu seçin** — adi təsvir onsuz sorğu zamanı xəta verir (Buraxılış kanalları altındakı `-web` qeydinə baxın). |

Konkret `target`-i əl ilə yığın:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Yığım vaxtı resursları

Üç yığım arqumenti `builder` mərhələsinin resurs sərfini idarə edir. Bunlar yalnız yığım vaxtına aiddir —
`OMNIROUTE_MEMORY_MB` (aşağıda) ayrıca icra vaxtı parametridir.

| Yığım arqumenti             | Standart dəyər | Təsir                                                                                                            |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`            | `0` webpack ilə yığır: pik yaddaş daha az, daha yavaş. `1` Turbopack-i aktivləşdirir.                            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`         | İşə salınan `next build` üçün V8 heap həddi (`--max-old-space-size`).                                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`            | `CIRCLE_NODE_TOTAL` parametrini ötürür; Next səhifə məlumatlarının toplanması üçün `workers = N - 1` hesablayır. |

`OMNIROUTE_BUILD_WORKERS` böyük yığım serverində artırılmalı, məhdud resurslu yığım **`✓ Compiled successfully` mesajından sonra** dayanarsa isə ilk növbədə şübhələnilməli parametrdir. Hər səhifə məlumatı işçisi ayrıca prosesdir və əsas `next build` prosesinin özü də ayrıca prosesdir; işlək VPS-də aparılmış reproduksiya (məsələ #7518) hər prosesin pik RSS göstəricisini `NODE_OPTIONS` heap parametrindən asılı olmayaraq təxminən 4,5 GB ölçmüşdür (Turbopack V8 heap-indən kənarda, yerli/Rust yaddaşında kompilyasiya edir). Standart `2` dəyəri (→ 1 işçi, cəmi 2 proses) dərcetmə konveyerinin istifadə etdiyi GitHub tərəfindən təmin olunan 16 GB / 4 vCPU-lu icra mühitləri üçün nəzərdə tutulub. `8` dəyərində (→ 7 işçi) həmin icra mühitinin yaddaşı tükəndi və buildkit addımı `ResourceExhausted: ... cannot allocate memory` xətası ilə uğursuz oldu; hər proses üzrə RSS təxmin edilmək əvəzinə birbaşa ölçüldükdə, `3` (→ 2 işçi) dəyəri də yaddaşa sığmadı. `tests/unit/docker-build-memory-budget.test.ts` ölçülmüş göstərici əsasında hesablamaları aparır və parametrlərdən hər hansı biri icra mühitinin imkanlarını aşarsa, uğursuz olur.

Turbopack V8 heap-indən **kənarda** yerləşən yerli Rust yaddaşında kompilyasiya edir, buna görə də `OMNIROUTE_BUILD_MEMORY_MB` onu məhdudlaşdırmır. Yaddaş həddi olan hostda yığım OOM dayandırıcısı tərəfindən heç bir xəta mətni olmadan SIGKILL siqnalı ilə dayandırılır — proses sadəcə `Creating an optimized production build` mərhələsinin ortasında dayanır və bu, yaddaş çatışmazlığından daha çox donma kimi görünür. Buna görə `Dockerfile`, Turbopack-in kod üzrə standart seçim olduğu `npm run dev` / `npm run build` əmrlərindən fərqli olaraq, standart şəkildə webpack-dən (`OMNIROUTE_USE_TURBOPACK=0`) istifadə edir: heç bir yığım arqumenti olmadan sadə `docker build .` əmri (Railway və digər bir kliklə işləyən hostların icra etdiyi əməl) yaddaşı məhdudlaşdırılmış yığım serverində səssizcə dayanmamalıdır. Dərc olunmuş təsvirlər `docker-publish.yml` daxilində artıq `OMNIROUTE_USE_TURBOPACK=0` parametrini açıq şəkildə ötürür. Kifayət qədər RAM-a malik yığım serverində daha sürətli yığım üçün Turbopack-i aktivləşdirin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` aktivdir, buna görə `next build` həm əsas, həm də işçi prosesi işə salır və onların hər biri `OMNIROUTE_BUILD_MEMORY_MB` dəyərinə ayrıca riayət edir. Konteyner həddini bu dəyərin bir misli deyil, təxminən iki mislindən yuxarı təyin edin.

Bu ağacda ölçülüb (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketləyici | Konteyner həddi | Nəticə                                            |
| ----------- | --------------- | ------------------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB  | Hər ikisində səssizcə OOM tərəfindən dayandırıldı |
| webpack     | 8 GiB           | Yığım işçisi SIGKILL siqnalı ilə dayandırıldı     |
| webpack     | 12 GiB          | Uğurlu oldu, pik istifadə 11,1 GiB-a çatdı        |

### İcra vaxtı üzrə standart dəyərlər

`runner-base` tərəfindən ixrac edilən standart dəyərlər: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker-də yaddaş davranışı:

- Təsvir `OMNIROUTE_MEMORY_MB=1024` dəyərini təyin edir və ondan `NODE_OPTIONS=--max-old-space-size=1024` dəyərini törədir.
- Faktiki server prosesi `OMNIROUTE_MEMORY_MB` dəyərini oxuyan və `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` əlavə edən müstəqil işəsalma proqramı tərəfindən başladılır.
- Node təkrarlanan `--max-old-space-size` parametrinin sonuncu dəyərindən istifadə edir, buna görə `OMNIROUTE_MEMORY_MB` parametrinin təyin edilməsi Docker üçün effektiv heap limitini idarə edir.
- Təsvir bu parametri həmişə təyin etdiyinə görə işəsalma proqramının RAM-a uyğun kalibrlənən ehtiyat dəyəri Docker altında heç vaxt tətbiq edilmir. İş yükü üçün onu açıq şəkildə artırın (aşağıdakı cədvələ baxın). `2048` kodlaşdırma agentinin `/v1/responses` sorğuları üçün yenə də çox azdır.

### Kodlaşdırma agentləri üçün icra zamanı RAM

Docker üçün standart 1 GiB istehsal ölçüsü deyil, idarəetmə paneli/yüngül söhbət üçün minimum həddir. Uzun `POST /v1/responses` gövdələri (yüzlərlə mesaj, onlarla alət) sıxılma zamanı yaddaşda bir neçə qraf saxlayır. Üst-üstə düşən, hər biri təxminən 3 MiB / 750k token olan iki sorğu **12 GiB** old-space həddində V8-in dayanmasına (`FATAL ERROR: Reached heap limit`) səbəb olub və həmçinin 16 GiB-lıq cgroup OOM həddinə çatıb. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) bölməsinə baxın.

**cgroup `--memory` dəyərini heap həddindən yuxarı təyin edin** — native buferlər, SQLite və sıxılmanın aralıq məlumatları V8-dən kənarda yerləşir.

| İş yükü                                     | `OMNIROUTE_MEMORY_MB`             | Konteyner / cgroup          | Qeydlər                                                                                                                              |
| ------------------------------------------- | --------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| İdarəetmə paneli, bir yüngül söhbət         | `1024` (təsvirin standart dəyəri) | ≥2 GiB                      |                                                                                                                                      |
| Bir kodlaşdırma agenti (Claude/Codex/Grok)  | `8192`                            | ≥10 GiB                     | Tipik tək sessiyalı `/v1/responses`                                                                                                  |
| Eyni vaxtda iki uzun `/v1/responses`        | `10240`–`12288`                   | ≥12–16 GiB                  | Təxminən 12 GiB heap həddində V8 dayanması ölçülüb                                                                                   |
| Eyni vaxtda üç və ya daha çox uzun kontekst | bir prosesdə istifadə etməyin     | ardıcıl icra / daha çox RAM | Standart ağır iş yükü qəbulu icrada olan 1 sorğu ilə məhdudlaşır; RAM artırılmadan bu həddin yüksəldilməsi dayanmanı yenidən yaradır |

`omniroute serve` bare metal üzərində `OMNIROUTE_MEMORY_MB` **təyin edilmədikdə** RAM-ın təxminən 35%-nə uyğun kalibrlənir (`[512, 4096]` aralığı ilə məhdudlaşdırılır). Docker həmişə `1024` təyin etdiyinə görə rəsmi təsvirdə bu kalibrləmə heç vaxt işləmir.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritik Mühit Dəyişənləri

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) sənədində göstərilən standartlardan əlavə, Docker altında işləyərkən aşağıdakı dəyişənlər ən vacibdir:

| Dəyişən                       | Məqsəd                                                                                                                                                                                                                                                                                                       | Standart dəyər                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket körpüsü üçün ortaq məxfi açar. **İstehsal mühitində tələb olunur** — güclü təsadüfi sətir təyin edin.                                                                                                                                                                                              | təyin edilməyib (verilməlidir) |
| `REDIS_URL`                   | Sorğu tezliyi məhdudlaşdırıcısı / keş arxa sistemi üçün bağlantı sətri                                                                                                                                                                                                                                       | `redis://redis:6379`           |
| `REDIS_PORT`                  | Daxili Redis konteyneri üçün host tərəfindəki port                                                                                                                                                                                                                                                           | `6379`                         |
| `REDIS_BIND_HOST`             | Daxili Redis portunun yayımlandığı host interfeysi (AUTH əlavə etmədiyiniz halda geri döngə interfeysi)                                                                                                                                                                                                      | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Özünü yeniləmə iş axınları üçün `cli` profilində `/workspace/omniroute` ünvanına qoşulan host yolu                                                                                                                                                                                                           | `.` (cari qovluq)              |
| `OMNIROUTE_MEMORY_MB`         | Docker avtonom serveri üçün Node icra mühitinin yığın yaddaşı limiti; yuxarıdakı image standartını əvəz edir. Kodlaşdırma agentləri: `8192`+ (baxın: [icra mühiti RAM-ı](#runtime-ram-for-coding-agents)).                                                                                                   | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | İdarəetmə paneli (20128) və API (20129) üçün əlçatan portları əvəz edir                                                                                                                                                                                                                                      | `20128` / `20129`              |
| `APP_BIND_HOST`               | docker-compose-un idarəetmə paneli/API/canlı WS portlarını yayımladığı host interfeysi. `REQUIRE_API_KEY=false` olduqda (standart dəyər), `0.0.0.0` anonim `/v1` proksisini LAN üçün əlçatan edir — yalnız `REQUIRE_API_KEY=true` olduqda və ya qarşısında əks proksi olduqda əhatə dairəsini genişləndirin. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | docker-compose-un `cliproxyapi` yan konteynerini yayımladığı host interfeysi — onun məlumat həcmi provayder giriş məlumatlarını saxlayır.                                                                                                                                                                    | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | İcra mühitinin plagin skanerinin oxuduğu və plaginləri quraşdırdığı qovluq. Plaginlər bind-mount vasitəsilə qoşulduqda bunu təyin edin: standart dəyər image-in ixrac etməyə biləcəyi `HOME` dəyişənini izləyir.                                                                                             | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Tətbiq əks proksi arxasında yayımlandıqda URL alt yolu (məsələn, `/omniroute`)                                                                                                                                                                                                                               | _(boş = kök)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Alt yol daxil olmaqla açıq brauzer origin-i (məsələn, `https://host/omniroute`)                                                                                                                                                                                                                              | təyin edilməyib                |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` üçün host tərəfindəki idarəetmə paneli portu                                                                                                                                                                                                                                       | `20130`                        |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yan konteyneri üçün host tərəfindəki port                                                                                                                                                                                                                                                      | `8317`                         |

## Alt yolda əks proksi (Traefik / nginx)

Next.js `basePath` dəyəri müstəqil paketə kompilyasiya olunur. OmniRoute daxilə yerləşdirilmiş
dəyəri tətbiqin kökündəki nəzarət faylında qeyd edir (`npm run build` zamanı yazılır;
`scripts/docker/ensure-docker-base-path.mjs` tərəfindən oxunur) və konteyner başladıqda
onu `OMNIROUTE_BASE_PATH` ilə müqayisə edir. Dəyərlər fərqli olduqda və obraz domen
kökü üçün qurulduqda, giriş nöqtəsi `node dev/run-standalone.mjs` işə düşməzdən əvvəl
müstəqil manifestləri, daxilə yerləşdirilmiş `basePath`/`assetPrefix` literallarını
(Next 16 SSR resurs URL-lərini yalnız `assetPrefix` əsasında yaradır — yamaqlayıcı alt
yolu ona da köçürür), daxilə yerləşdirilmiş `/_next/static` resurs URL-lərini
(müştəri istinad manifestləri, media idxalları, əvvəlcədən render edilmiş xəta
səhifələri) və müştəri `process.env` uyğunlaşdırıcısını yenidən yazır.

### Compose vasitəsilə qurma (tövsiyə olunur)

Hər iki dəyişəni `.env` daxilində təyin edin, sonra obraz və icra mühitinin uyğun olması
üçün yenidən qurun:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` faylı `OMNIROUTE_BASE_PATH` dəyişənini Docker qurma arqumenti və
icra mühiti dəyişəni kimi ötürür.

### Əvvəlcədən qurulmuş kök obrazı + icra zamanı alt yol

Dərc edilmiş `diegosouzapw/omniroute:*` obrazları domen kökü üçün qurulub. Buna baxmayaraq,
icra zamanı `OMNIROUTE_BASE_PATH` təyin edə bilərsiniz; konteyner başlanğıcda paketi bir
dəfə yamayır. Onu uyğun ictimai mənbə ilə birlikdə istifadə edin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Əks proksini **tam** xarici yolu ötürəcək şəkildə konfiqurasiya edin (prefiksi
silməyin). Traefik `PathPrefix(`/omniroute`)` yolunu `StripPrefix` olmadan konteynerə
yönləndirməlidir ki, Next.js `/omniroute/...` qəbul etsin və resursları
`/omniroute/_next/...` yolundan təqdim etsin.

Docker sağlamlıq yoxlaması aktiv `OMNIROUTE_BASE_PATH` prefiksi əlavə edilmiş yüngül
`/healthz` həyat dövrü son nöqtəsini yoxlayır. `/api/monitoring/health` insan və idarəetmə
paneli diaqnostikası üçün əlçatan qalır; konteynerin HEALTHCHECK yoxlamasını yenidən ona
yönəltmək üçün (məsələn, dərin sağlamlıq yoxlamasını tətbiq etmək məqsədilə)
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` təyin edin. Bu yol **dərin**
yoxlamadır (verilənlər bazası + monitorinq xülasəsi) — yenidən aktiv etməyi seçsəniz,
Docker-in seyrək `HEALTHCHECK` yoxlaması üçün uyğundur, lakin Kubernetes
`livenessProbe` intervalları üçün **uyğun deyil**.

Orkestratorlar üçün (Kubernetes, Nomad və s.):

| Yoxlama        | Üstünlük verin                                                     | Çəkinin                                                             |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Canlılıq       | HTTP `GET /livez` və ya əsas portda TCP (`PORT`, standart `20128`) | Canlılıq yoxlaması kimi `/api/monitoring/health`                    |
| Hazırlıq       | HTTP `GET /healthz`                                                | Hadisə dövrəsinin məşğul olmasını dayanma sayan qısa vaxt limitləri |
| Dərin / xarici | `/api/monitoring/health`                                           | —                                                                   |

`/healthz` prosesin həyat dövrünü (`ok` / `starting` / `stopping`) bildirir. `/livez`
yalnız prosesin işlək olub-olmadığını yoxlayır (emaledici işləyə bildiyi müddətdə 200
qaytarır; hazırlığı gözləmir). Hər ikisi sorğuların emalı ilə eyni Node hadisə
dövrəsində işləyir, buna görə də CPU tələb edən kataloq və ya sıxılma işləri onları
gecikdirə bilər — məşğul ≠ dayanmış. HTTP yoxlamalarının vaxtı bitirsə, TCP canlılıq
yoxlamasına üstünlük verin. Tam yoxlama təlimatı:
[Monitorinq təlimatı — Kubernetes yoxlamaları üzrə tövsiyələr](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy ilə Docker Compose (HTTPS Auto-TLS)

OmniRoute Caddy-nin avtomatik SSL təminatından istifadə etməklə təhlükəsiz şəkildə yayımlana bilər. Domeninizin DNS A qeydinin serverinizin IP ünvanını göstərdiyinə əmin olun.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # OAuth geri çağırışları, idarə paneli keçidləri və yaradılan açıq URL-lər üçün brauzerə görünən mənbə.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Planlaşdırılmış tapşırıqlar / özünə sorğular üçün daxili serverdən-serverə URL.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy yuxarı axın konteyneri üçün standart yönləndirmə başlıqlarını təyin edir. OmniRoute OAuth geri çağırışları və yaradılan açıq keçidlər üçün `NEXT_PUBLIC_BASE_URL` dəyərindən kanonik açıq mənbə kimi istifadə edir; autentifikasiya edilmiş idarə paneli yazma əməliyyatları eyni mənbəli sorğulardan və sessiyaya bağlı CSRF qorunmasından istifadə edir. `OMNIROUTE_TRUST_PROXY` parametrini yalnız OmniRoute-un açıq mənbəni açıq konfiqurasiyadan deyil, etibarlı yönləndirmə başlıqlarından əldə etməsini bilərəkdən istədiyiniz təkmil yerləşdirmələr üçün aktivləşdirin.

## Cloudflare Quick Tunnel

Docker yerləşdirmələri üçün idarə paneli dəstəyi `Dashboard → Endpoints` bölməsində bir kliklə aktivləşdirilən **Cloudflare Quick Tunnel** funksiyasını ehtiva edir. İlk aktivləşdirmə zamanı `cloudflared` yalnız ehtiyac olduqda endirilir, cari `/v1` son nöqtənizə müvəqqəti tunel başladılır və yaradılmış `https://*.trycloudflare.com/v1` URL-i adi açıq URL-inizin birbaşa altında göstərilir.

Son nöqtə tuneli panelləri (Cloudflare, Tailscale, ngrok) aktiv tunel vəziyyətini dəyişmədən `Settings → Appearance` bölməsindən göstərilə və ya gizlədilə bilər.

### Tunel haqqında qeydlər

- Quick Tunnel URL-ləri müvəqqətidir və hər yenidən başlatmadan sonra dəyişir.
- Quick Tunnel-lər OmniRoute və ya konteyner yenidən başladıldıqdan sonra avtomatik bərpa edilmir. Ehtiyac olduqda onları idarə panelindən yenidən aktivləşdirin.
- İdarə olunan quraşdırma hazırda `x64` / `arm64` arxitekturalarında Linux, macOS və Windows-u dəstəkləyir.
- Məhdud konteyner mühitlərində səs-küylü QUIC UDP bufer xəbərdarlıqlarının qarşısını almaq üçün idarə olunan Quick Tunnel-lər standart olaraq HTTP/2 nəqliyyatından istifadə edir. Fərqli nəqliyyat istəyirsinizsə, `CLOUDFLARED_PROTOCOL=quic` və ya `auto` təyin edin.
- Docker obrazları sistem CA kök sertifikatlarını özündə birləşdirir və onları idarə olunan `cloudflared` prosesinə ötürür; bu, tunel konteyner daxilində başladılarkən TLS etibar xətalarının qarşısını alır.
- OmniRoute-un yeni binar faylı endirmək əvəzinə mövcud binar fayldan istifadə etməsini istəyirsinizsə, `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` təyin edin.

## Obraz teqləri

| Obraz                    | Teq      | Ölçü   | Təsvir                                                      |
| ------------------------ | -------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Ən yüksək **dərc edilmiş** stabil SemVer (git `main` deyil) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps üçün bu teq sinfini sabitləyin                       |

Çoxplatformalı manifest: yerli `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker uyğun arxitekturanı avtomatik seçir; ARM hostlarında AMD64 emulyasiyasını məcbur etmək lazımdırsa, `--platform linux/amd64` ötürün.

### Buraxılış kanalları

OmniRoute stabil buraxılışlar, aktiv buraxılış budağının sınağı və inkişaf yığımları üçün ayrıca Docker kanalları dərc edir.

| Kanal                           | Mənbə                                    | Dəyişkənlik                          | Tövsiyə olunan istifadə                                                                                                        |
| ------------------------------- | ---------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | İmzalanmış/versiyalaşdırılmış buraxılış  | Dəyişməz                             | Dəqiq buraxılışa sabitlənən istehsal yerləşdirmələri                                                                           |
| `:latest` / `:latest-web`       | Ən yüksək **dərc edilmiş** stabil SemVer | Dəyişkən stabil göstərici            | SemVer dərc tapşırığından **sonra** stabil buraxılışları izləyir — `main` və ya buraxılmamış `release/v*` kommitlərini izləmir |
| `:next` / `:next-web`           | Cari standart `release/v*` budağı        | Dəyişkən ilkin buraxılış göstəricisi | Aktiv buraxılış budağına əlavə edilmiş, lakin hələ stabil buraxılışa daxil edilməmiş düzəlişlərin sınağı                       |
| `:main` / `:main-web`           | `main` budağı                            | Dəyişkən inkişaf göstəricisi         | Yalnız inkişaf və inteqrasiya sınaqları                                                                                        |

#### Veb-sessiya provayderləri: `-web` obrazları

Yuxarıdakı hər kanal `runner-web` mərhələsindən yığılmış `-web` teqi (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) kimi də mövcuddur — bu, eyni obraza Playwright və Chromium brauzerinin əlavə edildiyi variantdır. Adi obraz Chromium **olmadan** təqdim edilir; `gemini-web`, `claude-web` və `claude-turnstile` üçün isə Chromium tələb olunur.

Xəta başlanğıc zamanı deyil, sonraya təxirə salınır: həmin provayderlər modellərini siyahıya alır və idarə panelində qoşulmuş kimi görünür, yalnız ilk sorğu aşağıdakı xəta ilə uğursuz olur:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Həmin provayderlərdən istifadə edirsinizsə, artıq istifadə etdiyiniz kanalın `-web` teqini endirin — başqa heç nə dəyişmir. npm/CLI quraşdırmasında (Docker obrazı olmadan) çatışmayan ekvivalent komponent brauzerin binar faylıdır: hostda `npx playwright install chromium` icra edin.

#### İlkin buraxılış kanalından istifadə

`next` kanalı cari standart `release/v*` budağına hər push zamanı yenidən yığılır və həm AMD64, həm də ARM64 üçün yayımlanır. Köhnə texniki xidmət budaqları onun üzərinə yaza bilməz. Bu kanal növbəti stabil teq yaradılmazdan əvvəl aktiv buraxılış budağına birləşdirilmiş düzəlişləri ehtiva edən, pull edilə bilən image təqdim edir.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose üçün seçilmiş profilin istifadə etdiyi image teqini dəyişdirin, sonra servisi pull edib yenidən yaradın:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Təhlükəsizlik və geri qaytarma

`next` dəyişkən ilkin buraxılış kanalıdır. Aktiv buraxılış budağına edilən istənilən push zamanı dəyişə bilər və **istehsal mühitində istifadə üçün dəstəklənmir**. Konkret yığımı qiymətləndirərkən image digest-ini sabitləyin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sınaqdan əvvəl OmniRoute məlumat həcminin və ya bind-mount edilmiş məlumat qovluğunun ehtiyat nüsxəsini yaradın. Geri qaytarmaq üçün əvvəllər istifadə edilmiş stabil versiyanı və ya digest-i bərpa edin və konteyneri yenidən yaradın:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Buraxılış budağının yığımı heç vaxt `latest` göstəricisini dəyişə bilməz; stabil göstəricini yalnız uyğun stabil semantik versiya irəli çəkə bilər. `next` image-ləri buraxılış image-inin yoxlanmasını və CRITICAL səviyyəli zəifliklər üçün bloklayıcı keçidi saxlayır.

**`latest` git üçün aktuallıq zəmanəti deyil.** `main` və ya aktiv `release/v*` budağına birləşdirilmiş düzəlişlər stabil SemVer image-i yayımlanana və yayımlama tapşırığı `:latest` teqini həmin SemVer ilə eyni digest-ə irəli çəkənədək `:latest` daxilində **olmur**. GitHub artıq düzəlişi göstərdiyi halda `latest` donmuş görünürsə, buraxılış budağını sınaqdan keçirmək üçün `:next` image-ini pull edin və ya SemVer teqini gözləyin.

| İstədiyiniz                                                                             | İstifadə edin                                       |
| --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Dəyişməməli olan GitOps / istehsal mühiti                                               | `:X.Y.Z` teqini (və ya image digest-ini) sabitləyin |
| Yayımlanmış stabil versiyaları izləmək və hər buraxılışda yenidən yaratmanı qəbul etmək | `:latest`                                           |
| Yayımlanmamış `release/v*` commit-lərini sınaqdan keçirmək                              | `:next` (istehsal üçün deyil)                       |
| `main` budağını sınaqdan keçirmək                                                       | `:main` (istehsal üçün deyil)                       |

## Docker-də idarəetmə paneli yeniləmələri

Dərc edilmiş obrazdan yaradılmış konteyner özünü əvəz edə bilməz. OmniRoute konteyner daxilində işlədiyini aşkar etdikdə (`.git` checkout-u yoxdur və npm quraşdırması deyil), əsas idarəetmə panelindəki yeniləmə banneri npm/git təlimatları əvəzinə hostda icra edilməli əmri və onu kopyalamaq üçün düyməni göstərir:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Xidmət adı `AUTO_UPDATE_SERVICE` dəyişənindən götürülür (standart olaraq `omniroute`, yəni `docker-compose.selfhost.yml` faylındakı xidmət). `pull` yalnız dəyişən teqi (`latest`, `next`) yeniləyir; sabitlənmiş `:X.Y.Z` teqindən istifadə edərkən əvvəlcə teqi dəyişdirin.

### Hostdakı tetik faylı ilə bir kliklə yeniləmələr

Konteynerə hostda root səlahiyyəti verən `/var/run/docker.sock` faylını qoşmadan (**yuxarıdakı `cli` profili xəbərdarlığına baxın**) **İndi Yenilə** funksiyasının işləməsini təmin etmək üçün OmniRoute xidmətində `DOCKER_UPDATE_TRIGGER_FILE` təyin edin və hostda izləyici işə salın:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Yol `DATA_DIR` daxilində olmalıdır (nisbi dəyərlər ona nəzərən müəyyən edilir); digər bütün yollar rədd edilir. Bundan sonra **İndi Yenilə** həmin fayla `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` yazır, `202` cavabı qaytarır və yeni versiya aktiv olana qədər idarəetmə paneli `/api/system/version` ünvanını sorğulayaraq səhifəni yenidən yükləyir. Bu rejimdə OmniRoute heç vaxt shell və ya Docker əmri icra etmir. Bütün yeniləmə əməliyyatlarında olduğu kimi, sorğu yalnız loopback/LAN müştərilərindən qəbul edilir.

Bind vasitəsilə qoşulmuş məlumat kataloqu hosta izləmək üçün sabit yol verir. Nümunə `systemd` vahidləri (`/srv/omniroute` yolunu compose faylınızın və `data/` kataloqunun yerləşdiyi kataloqa uyğunlaşdırın):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute idarəetmə panelinin yeniləmə sorğularını izlə

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute konteynerini endir və yenidən yarat

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

Uğursuz icranın dövrə düşməməsi üçün xidmət endirmədən əvvəl sorğu faylını silir. `DOCKER_UPDATE_TRIGGER_FILE` olmadan idarəetmə paneli əl ilə əmr icrası axınından istifadə etməyə davam edir.

## Əlçatanlıq: standart SQLite yalnız bir replikanı dəstəkləyir

Standart Docker / Kubernetes OmniRoute konfiqurasiyası **bir Node prosesi + bir SQLite yazıcısından** ibarətdir. Bu topologiyada yüksək əlçatanlıq **dəstəklənmir**.

| Məhdudiyyət                                                   | Nəticə                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tək yazıcı                                                    | Eyni SQLite faylı ilə bir neçə replika **işə salmayın**. Bu, verilənlər bazasını korlayır.                                                                                                                                                                                                                                                                                                  |
| Yenidən yaratma / yenidən başlatma / HEALTHCHECK dayandırması | İcrada olan SSE bağlantıları, idarəetmə paneli sessiyaları və yaddaşdaxili vəziyyət üçün **tam dayanma** baş verir. Bütün qoşulmuş müştərilərin bağlantısı kəsilir. Endpoint-in mövcud olmadığı müddətdə yeni sorğular OmniRoute JSON-u deyil, reverse proxy-dən **`502 Bad Gateway: Unknown error`** cavabı alır — müştərilər bunu provayder nasazlığından fərqləndirə bilmirlər (#11015). |
| `/healthz` ilə eyni hadisə dövrü                              | Məşğul kataloq və ya sıxılma taktı yoxlamaları gecikdirə bilər; qısa timeout isə **yeganə** replikanı yenidən başladar.                                                                                                                                                                                                                                                                     |

**Yoxlama matrisi** (həmçinin [Kubernetes yoxlamaları üçün tövsiyələrə](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) baxın):

| Yoxlama               | Hədəf                                                                | İstifadə etməyin                                                             |
| --------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Canlılıq              | `PORT` üzərindən TCP (standart `20128`) və ya yumşaq HTTP `/healthz` | `/api/monitoring/health`                                                     |
| Hazırlıq              | HTTP `GET /healthz`                                                  | Hadisə dövrünün məşğul olmasını dayanma kimi qiymətləndirən qısa timeout-lar |
| Dərin / insanlar üçün | `/api/monitoring/health`                                             | Avtomatlaşdırılmış kubelet canlılıq yoxlaması                                |

**Yeniləmələr:** bütün sessiyaların kəsiləcəyini nəzərə alın. Mümkündürsə, müştəri trafikini əvvəlcədən dayandırın; standart SQLite ilə mərhələli yeniləmə yoxdur. Compose `restart: unless-stopped` və Docker `HEALTHCHECK` birlikdə konteyner Unhealthy vəziyyətinə düşdükdə yeganə prosesi də əvəz edəcək — təsir dairəsi eynidir.

**Tək replika** üçün Kubernetes fraqmenti (Recreate tələb olunur; bir SQLite faylı ilə `replicas` sayını artırmayın):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` gözləməsi kube-a SIGTERM-dən əvvəl Service endpoint-lərini çıxarmağa imkan verir ki, **yeni** trafik dayandırılmaqda olan prosesə yönəlməsin. Davam edən `/v1/responses` SSE sorğularının tamamlanması ağır çəkili qəbul icarələri (#11015) vasitəsilə `SHUTDOWN_TIMEOUT_MS` müddətinədək (standart olaraq 30 san.) gözlənilir. Prosesə hələ də çatan yeni sorğular `503` + `Retry-After: 5` cavabı alır. Əvəzləyici Ready olana qədər Recreate nəticəsində endpoint-lərin boş qaldığı interval tam xidmət kəsintisi olaraq qalır — bu, probe-un yanlış konfiqurasiyası deyil, SQLite topologiyasının xüsusiyyətidir.

Xarici Postgres / multi-writer HA **sənədləşdirilmiş standart istifadə ssenarisi deyil**. HA-ya ehtiyacınız varsa, tək replikanı saxlayın və ya layihənin ayrıca sınaqdan keçirib sənədləşdirdiyi topologiyadan istifadə edin. Postgres/MySQL üzrə işlər [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) çərçivəsində aparılır. Bu hazır olana qədər **böyük** `/v1/responses` tutumunu artırmağın dəstəklənən yeganə yolu bir volume üzərində `replicas > 1` istifadə etmək deyil, N müstəqil proses işlətməkdir (növbəti bölmə).

## Üfüqi miqyaslama: N müstəqil proses

Bir Node prosesi **bir V8 heap-i** deməkdir. Üst-üstə düşən iki ~3 MiB / ~750k-token kodlaşdırma agenti `POST /v1/responses` sorğusu (RTK + Caveman) təxminən 12 GiB-də həmin heap-i dayandırır (`FATAL ERROR: Reached heap limit`) və 16 GiB-lıq cgroup-da OOM-a səbəb ola bilər. Baxın: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Bu ölçmə eyni vaxtda işləyən uzun `/v1/responses` sorğuları üçün məhsulun iki sorğuluq sərt maksimumu deyil, **yaddaş büdcəsi** xəbərdarlığıdır. Ağır çəkili çat sorğularının qəbulu eyni V8/cgroup həddinə əsasən avtomatik hesablanan giriş bayt büdcəsi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ilə məhdudlaşdırılır — ölçüsü artıq təyin edilmiş prosesdə bunu yuxarı istiqamətdə dəyişdirmək (və ya köhnə `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` sorğu sayı limitini təyin etmək) dayanmanı yenidən yaradır. Kiçik çatlar, `/healthz`, `/v1/models` və MCP bu limitə **daxil deyil**.

### Bir proses: ikidən çox uzun `/v1/responses`

**Sağlam** proses (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` nisbətindən aşağıdır, standart dəyər `0.75`) proses üzrə icradakı bayt büdcəsində (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hələ yer olduqda eyni vaxtda ikidən çox uzun `POST /v1/responses` sorğusu işlədə **bilər**. Ölçüsü `OMNIROUTE_CHAT_LARGE_BODY_BYTES` həddinə bərabər və ya ondan böyük olan gövdələr (standart dəyər 256 KiB) struktur baxımından ağır sorğularla eyni ağır çəkili icazəni götürür və eyni [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` keçidindən (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) istifadə edir. Eyni vaxtda işləyən onlarla uzun SSE klienti (operatorlara çox vaxt 40–50 lazımdır) sərt “maksimum 2” məhsul limiti deyil, **yaddaş büdcəsi** məsələsidir — heap-i, əsas/headroom slotlarını və `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` parametrini uyğun ölçüləndirin. Təzyiq altında olan heap #7849 probleminin təkrarlanmaması üçün yenə də təkrar cəhd edilə bilən `503` cavabı ilə yükü rədd edir.

Heap-ləri (müstəqil V8 old-space-lərini) **hazırda** çoxaltmaq üçün:

| Edin                                                                                                                                                               | Etməyin                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Hər birinin **öz** `DATA_DIR` / volume-u olan **N konteyner/pod** işlədin                                                                                          | Bir SQLite faylı üçün `replicas > 1` təyin etməyin                                 |
| Heap / icradakı bayt büdcəsinə əsasən ağır icradakı sorğu + sağlam headroom ölçülərini təyin edin; 1–2 sərt məhsul maksimumu deyil, konservativ #7849 standartıdır | Bir prosesə 8× RAM və qeyri-məhdud say limiti verməyin                             |
| **Paylaşılan kvota sayğacları** üçün istəyə bağlı olaraq `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` istifadə edin                                        | Redis-i paylaşılan SQLite kimi qəbul etməyin — o, belə deyil                       |
| Provayder sirlərini hər instansiyaya köçürün (və ya ayrı-ayrı idarəetmə panellərini qəbul edin)                                                                    | Bütün instansiyalar üzrə vahid idarəetmə paneli / vahid çağırış jurnalı gözləməyin |
| Ön tərəfdə istənilən yük balanslaşdırıcısından istifadə edin; API açarı və ya sessiya üzrə yapışqanlıq kifayətdir                                                  | Təchizatçıya xas, ölçünü nəzərə alan middleware tələb etməyin                      |

Avadanlıq: hər instansiya üzrə eyni vaxtda işləyən uzun `/v1/responses` sorğularının sayı **yaddaş büdcəsi** məsələsidir (heap + icradakı bayt / #10110). Müstəqil `DATA_DIR`-lərə malik `N` instansiya yenə də heap-lərin sayını çoxaldır: host RAM-i “N=8 olan bir 16 GiB pod” deyil, `N × cgroup` həcmini qarşılamalıdır. Bir SQLite faylı üçün heç vaxt `replicas > 1` təyin etməyin.

Compose nümunəsi (iki heap, iki volume — `deploy.replicas: 2` deyil):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Prosesdaxili sıxlıq (sıxışdırmanın HTTP izolyatından çıxarılması) üçün baxın: [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Paylaşılan davamlı vəziyyət üzərində vahid məntiqi klaster üçün baxın: [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker daxilində Gemini regional xətaları

Google AI Studio / Gemini API HTTP 400, FAILED_PRECONDITION və
`User location is not supported for the API use.` xətasını qaytara bilər. Sorğunun hostda
uğurlu olması konteynerin eyni çıxış marşrutundan istifadə etdiyini sübut etmir. DNS sıralaması,
IPv4/IPv6 bağlantısı, VPN marşrutlaşdırması və konfiqurasiya edilmiş proksilər fərqli ola bilər.
Faktiki bağlantı marşrutu ilə yanaşı,
[Google-un dəstəklədiyi regionları](https://ai.google.dev/gemini-api/docs/available-regions)
da yoxlayın; təkcə bu xəta API açarının etibarsız olduğunu göstərmir.

### Bağlantıya məxsus proksiyə üstünlük verin

Təsirə məruz qalan Gemini bağlantısı üçün OmniRoute-un
[hər bağlantı üzrə proksi konfiqurasiyasından](../ops/PROXY_GUIDE.md#4-level-proxy-system)
istifadə edin, sonra eyni modellə **Test Connection** əməliyyatını və kiçik bir sorğunu
təkrarlayın. Bu, marşrut dəyişikliyini yalnız həmin bağlantı ilə məhdudlaşdırır.
Proksinin konteynerdən əlçatan olduğunu və bağlantının həqiqətən onu seçdiyini yoxlayın.
Marşrutun dəyişdirilməsi yuxarı səviyyəli xidmətin regional uyğunluğuna zəmanət vermir.

### Host və konteyner şəbəkələrini müqayisə edin

Autentifikasiya edilmiş nəticələri müqayisə edərkən açarı, modeli və sorğunu eyni saxlayın;
heç vaxt giriş məlumatlarını, proksi parollarını və ya tam avtorizasiya başlıqlarını problem
hesabatına yerləşdirməyin. Əvvəlcə hostda və konteyner daxilində eyni əmrdən istifadə edərək
əməliyyat sistemi rezolverinin hansı ünvan ailələrini təqdim etdiyini yoxlayın:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` əvəzinə işlətdiyiniz xidməti yazın (məsələn, `omniroute-web`). Bu əmrlər giriş
məlumatlarını və ya IP ünvanlarını göstərmədən ünvan ailələrini çap edir. Qaytarılan `6`
yalnız IPv6 DNS nəticəsinin olduğunu göstərir: bu, işlək IPv6 marşrutunu və ya API-yə
çıxışı **sübut etmir**. `curl` quraşdırılıbsa, hər iki mühitdə
`curl -4 -I https://generativelanguage.googleapis.com` ilə
`curl -6 -I https://generativelanguage.googleapis.com` nəticələrini müqayisə edin.
Autentifikasiyasız xəta olsa belə, HTTP cavabı həmin yoxlama üçün bağlantının mövcudluğunu
sübut edir; Gemini uyğunluğunu yalnız autentifikasiya edilmiş model sorğusu yoxlayır.

### Host səviyyəli alternativ: işlək IPv6 və rezolver siyasəti

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) hesabatının müəllifi
konteyner IPv6-nı aktivləşdirərək və glibc ünvan seçimini dəyişərək öz mühitində çıxışı
bərpa edib. Bunu mühitə xas alternativ kimi qəbul edin. Rezolver üstünlüklərini
dəyişməzdən əvvəl host IPv6-nın işlədiyini, konteynerin çıxışını/marşrutlaşdırmasını və
firewall qaydalarını yoxlayın. Təkcə şəxsi ULA ünvanının olması ictimai IPv6 bağlantısının
mövcudluğunu təsdiqləmir.

Artıq Compose-un standart şəbəkəsinə qoşulmuş xidmətlər üçün bu fraqment həmin şəbəkədə
IPv6-nı aktivləşdirir; xidmətinizin, portların, cildlərin və konfiqurasiyanın qalan
hissəsini saxlayın:

```yaml
networks:
  default:
    enable_ipv6: true
```

Adlandırılmış şəbəkə üçün bunu xidmətin faktiki qoşulduğu şəbəkədə aktivləşdirin. Docker
ULA altşəbəkəsi ayıra bilər; yalnız şəbəkəniz bunu tələb etdikdə açıq şəkildə göstərilmiş,
üst-üstə düşməyən altşəbəkə seçin. Baxın:
[Docker IPv6 şəbəkəsi](https://docs.docker.com/engine/daemon/ipv6/) və
[Compose şəbəkə seçimləri](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc əsaslı təsvirdə** `/etc/gai.conf` ünvan seçimini dəyişə bilər. Repozitoriyanın
cari Dockerfile faylı Debian istifadə edir; fərdiləşdirilmiş musl əsaslı təsvirlərdə bu
mexanizm yoxdur. Bildirilən dəyişiklik ULA etiketini `label fc00::/7 6` sətrindən
`label fc00::/7 1` sətrinə dəyişir. Təsvirin tam siyasət cədvəlindən başlayın və onun
digər qeydlərini qoruyun: `label` və ya `precedence` qeydinin əlavə edilməsi həmin
standart cədvəli əvəz edir, buna görə də yalnız dəyişdirilmiş sətri ehtiva edən fayl
kifayət deyil.
[glibc konfiqurasiya arayışında](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
bu semantika sənədləşdirilib. Nəzərdən keçirilmiş faylı yalnız oxuma rejimində
`/etc/gai.conf` ünvanına bind-mount edin və tətbiq olunması üçün xidməti yenidən yaradın.

Bu, həmin konteynerdəki **bütün çıxış trafiki üçün** əməliyyat sisteminin ünvan seçimini
dəyişir. Bu, hər tətbiqi IPv6 seçməyə məcbur etmir: Node-un DNS sıralaması və bağlantı
seçimi də əhəmiyyətlidir. Xüsusilə, `--dns-result-order=ipv4first` IPv4-ə üstünlük verir
və yalnız IPv4-də baş verən nasazlığın həlli deyil. Baxın:
[Node DNS sıralaması](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Host səviyyəsində hər hansı dəyişiklikdən sonra Gemini-ni və digər provayderlərinizi
yenidən yoxlayın. Geri qaytarmaq üçün fərdiləşdirilmiş `gai.conf` mount-unu silin, əvvəlki
şəbəkə konfiqurasiyasını bərpa edin və texniki xidmət müddətində təsirə məruz qalan
xidməti/şəbəkəni yenidən yaradın. Şəbəkənin yenidən yaradılması ona qoşulmuş digər
konteynerlərin işini dayandıra bilər; daimi məlumat cildini silməyin.

## Vacib qeydlər

- **SQLite WAL rejimi:** OmniRoute-un ən son dəyişiklikləri yenidən `storage.sqlite` faylına nəzarət nöqtəsi kimi yaza bilməsi üçün `docker stop` əməliyyatının tamamlanmasına icazə verilməlidir. Daxil edilmiş Compose fayllarında artıq 40 saniyəlik dayandırma möhləti təyin edilib. Obrazı birbaşa işlədirsinizsə, `--stop-timeout 40` parametrini saxlayın.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Müntəzəm/yazmadan əvvəl ehtiyat nüsxələmələr xaricdən idarə olunursa, `true` olaraq təyin edin. Mövcud verilənlər bazasının miqrasiyaları üçün yenə də ayrıca dayanıqlı təhlükəsizlik ani görüntüsü və kütləvi miqrasiya qoruyucusu tələb olunur.
- **Verilənlərin davamlı saxlanması:** Konteyner yenidən başladıldıqda verilənlər bazanızı, açarlarınızı və konfiqurasiyalarınızı qorumaq üçün həmişə `/app/data` yoluna bir cild qoşun.
- **Port konfiqurasiyası:** Standart `20128` portunu dəyişmək üçün `PORT` mühit dəyişənini əvəz edin.

## Həmçinin baxın

- [VM-də yerləşdirmə təlimatı](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare quraşdırılması
- [Fly.io-da yerləşdirmə təlimatı](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-da yerləşdirmə
- [Mühit konfiqurasiyası](../reference/ENVIRONMENT.md) — Tam `.env` istinad sənədi
