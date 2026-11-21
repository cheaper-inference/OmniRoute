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

## Sürətli qaçış

> **Bir komandada öz-özünə ev sahibi?** [Self-Host Bələdçisinə](../getting-started/SELF_HOST_GUIDE.md) baxın — `docker compose -f docker-compose.selfhost.yml up -d` (dərc edilmiş şəkil + Redis, yalnız geri dönmə, profil seçimi yoxdur). Aşağıdakı Quick Run artıq başqa yerdə Redis işlədən istifadəçilər üçün tək konteynerli yoldur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Ətraf Mühit Faylı ilə

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
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

## Dockerfile Mərhələləri

Repozitoriya çoxmərhələli Dockerfile (`Dockerfile`) göndərir. Dörd mərhələ ifşa olunur; istifadə vəziyyətiniz üçün düzgün `target` seçin.

| Mərhələ       | Əsas şəkil            | Məqsəd                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Deps (`npm ci --legacy-peer-deps`) quraşdırır və `npm run build` işləyir (Turbopack standart olaraq — aşağıda Quraşdırma vaxtı resurslarına baxın)                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Next.js müstəqil çıxışı ilə istehsal müddəti.** Heç CLIs provayderi yığılmayıb.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` və qlobal CLIs əlavə edir : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Agent iş axını üçün bunu seçin.**                                                                                                                 |
| `runner-web`  | `runner-base`         | Veb-sessiya provayderləri üçün Playwright + Chromium brauzeri (`--with-deps`) əlavə edir: `gemini-web`, `claude-web`, `claude-turnstile`.** Həmin provayderlərdən istifadə edərkən bunu seçin** — düz şəkil sorğu zamanı uğursuz olur (Bunsuz Kanallar altındakı `-web` qeydinə baxın). |

Müəyyən bir hədəfi əl ilə qurun:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Quraşdırma vaxtı resursları

Üç qurma args `builder` mərhələsinin nəyə başa gəldiyinə nəzarət edir. Onlar yalnız qurma vaxtıdır — `OMNIROUTE_MEMORY_MB` (aşağıda) ayrı, iş vaxtı düyməsidir.

| arg qurun                   | Defolt | Effekt                                                                                                    |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` veb paketi ilə qurulur: daha aşağı pik yaddaş, daha yavaş. `1` Turbopack-ə daxil olur.                |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Yaranan `next build` üçün V8 yığın tavanı (`--max-old-space-size`).                                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL` qidalanır; Sonrakı səhifə məlumatlarının toplanması üçün `workers = N - 1` əldə edir. |

`OMNIROUTE_BUILD_WORKERS` böyük bir inşaatçıya yetişdiriləcək və məhdud bir quruluş öləndə şübhələnəcək şəxsdir** sonra** `✓ Compiled successfully`. Hər bir səhifə məlumat işçisi öz prosesidir və ana `next build` özü də; canlı VPS reproduksiyası ( #7518 məsələsi) `NODE_OPTIONS` yığın bayrağından asılı olmayaraq hər bir prosesin zirvəsi RSS ~ 4,5 GB -da ölçdü (Turbopack V8 yığınından kənar native/Rust yaddaşında tərtib edir). Defolt `2` (→ 1 işçi, cəmi 2 proses) dərc boru kəmərinin istifadə etdiyi 16 GB / 4 vCPU GitHub-da yerləşdirilmiş qaçışçılar üçün ölçülür. `8` də (→ 7 işçi) həmin qaçışçının yaddaşı tükəndi və buildkit `ResourceExhausted: ... cannot allocate memory` ilə addımı atmadı; `3` (→ 2 işçi) hər bir proses üzrə RSS nəticə çıxarmaq əvəzinə birbaşa ölçüldükdən sonra hələ də uyğun gəlmədi. `tests/unit/docker-build-memory-budget.test.ts` ölçülmüş rəqəmə qarşı hesab edir və hər iki düymə qaçışçını üstələyirsə uğursuz olur.

Turbopack yaşayan yerli Rust yaddaşında tərtib edir** kənarda** V8 yığını, buna görə də `OMNIROUTE_BUILD_MEMORY_MB` onu bağlamır. Yaddaş tavanı olan hostda qurulma daha sonra OOM killer tərəfindən heç bir xəta mətni olmadan SIGKILLed edilir — o, sadəcə olaraq yaddaşdan çıxmış deyil, asılma kimi oxunan orta `Creating an optimized production build` dayandırır. Məhz buna görə də `Dockerfile` defolt olaraq veb paketinə (`OMNIROUTE_USE_TURBOPACK=0`), Turbopack defolt kodu olduğu `npm run dev` -dan fərqli olaraq veb paketi ( `npm run build` təyin edir: heç bir qurma argları olmayan çılpaq `docker build .` (Dəmiryolu və digər bir kliklə hostların işlədiyi) yaddaşla təchiz edilmiş qurucuda səssizcə ölməməlidir. Dərc edilmiş şəkillər artıq `OMNIROUTE_USE_TURBOPACK=0` -də açıq şəkildə `docker-publish.yml` dən keçir. Bol RAM olan inşaatçıda daha sürətli qurmaq üçün Turbopack ə daxil olun:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` aktivdir, ona görə də `next build` valideyni idarə edir** və** bir işçi prosesi və hər biri `OMNIROUTE_BUILD_MEMORY_MB` ayrıca qiymətləndirir. Konteyner tavanını bir dəfə deyil, təxminən iki dəfə yuxarı ölçün.

Bu ağac üzərində ölçülən (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler    | Konteyner tavanı | Nəticə                                   |
| ---------- | ---------------- | ---------------------------------------- |
| Turbopack  | 8 GiB / 16 GiB   | OOM-hər ikisi də səssizcə öldürüldü      |
| veb paketi | 8 GiB            | işçi SIGKILLed qurmaq                    |
| veb paketi | 12 GiB           | müvəffəq oldu, 11,1 GiB-da zirvəyə çatdı |

### Defolt icra vaxtı

`runner-base` tərəfindən ixrac edilən defoltlar : `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker-da yaddaş davranışı:

- Təsvir `OMNIROUTE_MEMORY_MB=1024` təyin edir və ondan `NODE_OPTIONS=--max-old-space-size=1024` alır.
- Faktiki server prosesi `OMNIROUTE_MEMORY_MB` oxuyan və `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` əlavə edən müstəqil başlatma vasitəsi ilə başlayır.
- Node son təkrarlanan `--max-old-space-size` dəyərindən istifadə edir, ona görə də `OMNIROUTE_MEMORY_MB` parametri effektiv Docker yığın limitinə nəzarət edir.
- Şəkil həmişə onu təyin etdiyi üçün başlatma cihazının öz RAM ilə kalibrlənmiş geri qaytarılması heç vaxt Docker altında tətbiq edilmir. İş yükü üçün onu açıq şəkildə qaldırın (aşağıdakı cədvəl). `2048` hələ də kodlaşdırma agenti `/v1/responses` üçün çox kiçikdir.

### Kodlaşdırma agentləri üçün iş vaxtı RAM

1 GiB Docker standartı istehsal ölçüsü deyil, dashboard/light-chat mərtəbəsidir. Uzun `POST /v1/responses` gövdələri (yüzlərlə mesaj, onlarla alət) sıxılma zamanı çoxlu yaddaşdaxili qrafikləri saxlayır. Üst-üstə düşən iki ~ 3 MiB / ~ 750k-token sorğusu V8-i dayandırdı** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) və həmçinin 16 GiB cgroup OOM vurdu. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) baxın.

Ölçü** cgroup `--memory` yığının üstündə** — yerli buferləri, SQLite və sıxılma aralıqları V8-dən kənarda oturur.

| İş yükü                                    | `OMNIROUTE_MEMORY_MB`       | Konteyner / qrup         | Qeydlər                                                                                     |
| ------------------------------------------ | --------------------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| İdarə paneli, bir işıqlı söhbət            | `1024` (defolt şəkil)       | ≥2 GiB                   |                                                                                             |
| Bir kodlaşdırma agenti (Claude/Codex/Grok) | `8192`                      | ≥10 GiB                  | Tipik bir seanslı `/v1/responses`                                                           |
| İki eyni vaxtda uzun `/v1/responses`       | `10240`–`12288`             | ≥12–16 GiB               | ~ 12 GiB yığınında ölçülən V8 abort                                                         |
| Üç + eyni vaxtda uzun kontekstlər          | bir proses üzərində etməyin | serialize / daha çox RAM | Defolt ağır çəkidə qəbul uçuşda 1-dir; RAM olmadan yüksəldilməsi abortu yenidən tətbiq edir |

çılpaq metal üzərində `omniroute serve` `OMNIROUTE_MEMORY_MB` olduqda ~ 35% RAM -ni kalibrləyir (qısqaclı `[512, 4096]`)** təyin olunmadı** . Docker həmişə `1024` təyin edir, beləliklə, kalibrləmə heç vaxt rəsmi şəkildə işləməsin.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

Next.js `basePath` müstəqil paketə yığılmışdır. OmniRoute bişmiş dəyəri tətbiq kökündəki gözətçi faylında qeyd edir ( `npm run build` zamanı yazılır; `scripts/docker/ensure-docker-base-path.mjs` tərəfindən oxunur) və konteyner başlayanda onu `OMNIROUTE_BASE_PATH` ilə müqayisə edir. Onlar fərqləndikdə və təsvir domen kökü üçün qurulduqda, giriş nöqtəsi müstəqil manifestləri, daxil edilmiş `basePath`/`assetPrefix` literallarını yenidən yazır (Növbəti 16 yalnız `assetPrefix` -dan SSR aktivi URLs göstərir — yamaq alt yolunu ona əks etdirir URLs, bişmiş media manifestləri, `/_next/static` manifests- kimi əvvəlcədən göstərilən xəta səhifələri) və `node dev/run-standalone.mjs` işləmədən əvvəl müştəri `process.env` shim.

### Quraşdırma tərtib edin (tövsiyə olunur)

Hər iki dəyişəni `.env`-da təyin edin, sonra yenidən qurun ki, şəkil və icra müddəti razılaşsın:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker build-arg və icra zamanı mühit dəyişəni kimi irəliləyir.

### Əvvəlcədən qurulmuş kök şəkli + icra zamanı alt yolu

Nəşr edilmiş `cheaperinference/omniroute:*` şəkilləri domen kökü üçün qurulur. Siz hələ də iş vaxtında `OMNIROUTE_BASE_PATH` təyin edə bilərsiniz; konteyner işə salındıqda paketi bir dəfə yamaqlayır. Onu uyğun ictimai mənşə ilə cütləşdirin:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

yönləndirmək üçün əks proxy-ni konfiqurasiya edin** dolu** xarici yol (prefiksi soymayın). Traefik `PathPrefix(`/omniroute `)` `StripPrefix` olmadan konteynerə yönləndirməlidir, beləliklə Next.js `/omniroute/...` alır və `/omniroute/_next/...` dən aktivlərə xidmət edir.

Docker Healthcheck aktiv `OMNIROUTE_BASE_PATH` ilə prefiks edilmiş yüngül `/healthz` həyat dövrünün son nöqtəsini yoxlayır. `/api/monitoring/health` human/dashboard diaqnostikası üçün əlçatan olaraq qalır; HEALTHCHECK konteynerini ona tərəf yönəltmək üçün (məsələn, dərin sağlamlıq tətbiqi üçün), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` təyin edin. O yol a** dərin** yoxlayın (DB + monitorinq xülasəsi) — Docker ın nadir `HEALTHCHECK` üçün uyğun olub-olmadığını yoxlayın, əgər yenidən daxil olsanız** yox** Kubernetes `livenessProbe` intervalları üçün.

Orkestrlər üçün (Kubernetes, Nomad və s.):

| Prob              | üstünlük verin                                                    | çəkinin                                            |
| ----------------- | ----------------------------------------------------------------- | -------------------------------------------------- |
| Canlılıq          | HTTP `GET /livez` və ya əsas portda TCP (`PORT`, default `20128`) | `/api/monitoring/health` canlılıq kimi             |
| Hazırlıq          | HTTP `GET /healthz`                                               | Hadisə döngəsini ölü kimi qəbul edən sıx fasilələr |
| Dərin / qara qutu | `/api/monitoring/health`                                          | —                                                  |

`/healthz` prosesin həyat dövrü haqqında hesabat verir (`ok` / `starting` / `stopping`). `/livez` yalnız proses canlıdır (işləyici işləyə bildikdə 200; hazır olmağı gözləmir). Hər ikisi hələ də sorğunun idarə edilməsi kimi eyni Node hadisə dövrəsində işləyir, ona görə də CPU ilə əlaqəli kataloq və ya sıxılma işləri onları — məşğul ≠ ölü gecikdirə bilər. HTTP zondlarının vaxtı aşıbsa, TCP canlılığına üstünlük verin. Tam araşdırma təlimatı: [Monitorinq təlimatı — Kubernetes zond tövsiyələri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Caddy ilə Yarat (HTTPS Auto-TLS)

OmniRoute Caddy-nin avtomatik SSL təminatından istifadə edərək təhlükəsiz şəkildə ifşa edilə bilər. Domeninizin DNS A qeydinin serverinizin IP işarə etdiyinə əmin olun.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
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

Caddy yuxarı axın konteyneri üçün standart yönləndirmə başlıqlarını təyin edir. OmniRoute OAuth -dən `NEXT_PUBLIC_BASE_URL` geri çağırışları və yaradılan ictimai bağlantılar üçün kanonik ictimai mənşə kimi istifadə edir; autentifikasiya edilmiş tablosuna yazılar eyni mənşəli sorğulardan və seansa bağlı CSRF qorunmasından istifadə edir. Yalnız OmniRoute açıq konfiqurasiya əvəzinə etibarlı yönləndirilmiş başlıqlardan ictimai mənşəyi əldə etməsini qəsdən istədiyiniz yerlərdə təkmil yerləşdirmələr üçün `OMNIROUTE_TRUST_PROXY` aktivləşdirin.

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

## Şəkil Teqləri

| Şəkil                        | Tag      | Ölçü    | Təsvir                                                        |
| ---------------------------- | -------- | ------- | ------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Ən yüksək** nəşr edilmişdir** sabit SemVer (git `main` deyil) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | GitOps üçün bu etiket sinfini pin edin                        |

Eyni şəkillər eyni memarlıq həzmləri ilə üç depoda dərc olunur: `cheaperinference/omniroute` (Docker Hub, Cheaper Inference təşkilatı, 3.8.53-dən etibarən), `ghcr.io/cheaper-inference/omniroute` və çəkilmə tarixini saxlayan və hələ də hər buraxılışı qəbul edən miras `diegosouzapw/omniroute`. Mövcud `diegosouzapw/omniroute` yerləşdirmələri yenilənməyə davam edir; şəkil adının dəyişdirilməsi isteğe bağlıdır. Aşağıdakı `:next` / `:next-web` pre-reliz kanalı yalnız `diegosouzapw/omniroute` və GHCR üçün yayımlanır.

Çox platformalı manifest: `linux/amd64` + `linux/arm64` yerli (Apple Silicon, AWS Graviton, Raspberry Pi). Docker uyğun arxitekturanı avtomatik seçir; ARM hostlarında AMD64 emulyasiyasını məcbur etmək lazımdırsa, `--platform linux/amd64` keçin.

### Kanalları buraxın

OmniRoute sabit buraxılışlar, aktiv buraxılış filialı testi və inkişaf qurmaları üçün ayrıca Docker kanallarını dərc edir.

| Kanal                           | Mənbə                                      | Dəyişkənlik                          | Tövsiyə olunan istifadə                                                                                                                |
| ------------------------------- | ------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned buraxılışı                | Dəyişməz                             | Dəqiq buraxılışları birləşdirən istehsal yerləşdirmələri                                                                               |
| `:latest` / `:latest-web`       | Ən yüksək** nəşr edilmişdir** sabit SemVer | Dəyişən sabit göstərici              | Stabil buraxılışları izləyir** sonra** bir SemVer nəşr işi — edir** yox** `main` və ya buraxılmamış `release/v*` törətmələrini izləyin |
| `:next` / `:next-web`           | Cari defolt `release/v*` filialı           | Dəyişən buraxılışdan əvvəl göstərici | Aktiv buraxılış filialına düşmüş, lakin hələ stabil buraxılışda olmayan düzəlişlərin sınaqdan keçirilməsi                              |
| `:main` / `:main-web`           | `main` filialı                             | Dəyişən inkişaf göstəricisi          | Yalnız inkişaf və inteqrasiya testi                                                                                                    |

#### Veb-sessiya provayderləri: `-web` şəkilləri

Yuxarıdakı hər bir kanal `runner-web` mərhələsindən tikilmiş `-web` teqi (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) funksiyasını yerinə yetirir, — eyni şəkil və Playwright və Chromium brauzeri. Sadə görüntü göndərilir** olmadan** xrom; `gemini-web`, `claude-web` və `claude-turnstile` lazımdır.

Uğursuzluq işə başlama vaxtı deyil, təxirə salınıb: həmin provayderlər modellərini siyahıya alır və tablosuna qoşulmuş kimi göstərirlər və yalnız ilk sorğu uğursuz olur.

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Əgər həmin provayderlərdən istifadə edirsinizsə, artıq — də olduğunuz kanalın `-web` etiketini çəkin, başqa heç nə dəyişmir. Bir npm/CLI quraşdırmasında ( Docker təsviri yoxdur), ekvivalent çatışmayan parça brauzer binarıdır: hostda `npx playwright install chromium` işə salın.

#### Buraxılışdan əvvəl kanaldan istifadə

`next` kanalı cari standart `release/v*` filialına hər təkanda yenidən qurulur və həm AMD64, həm də ARM64 üçün dərc olunur. Köhnə texniki xidmət filialları onun üzərinə yaza bilməz. Kanal növbəti stabil etiket kəsilməmişdən əvvəl aktiv buraxılış filialına birləşmiş düzəlişlər üçün çəkilə bilən bir şəkil təqdim edir.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose üçün seçilmiş profil tərəfindən istifadə edilən şəkil teqini ləğv edin, sonra xidməti çəkin və yenidən yaradın:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Təhlükəsizlik və geri çəkilmə

`next` üzən buraxılışdan əvvəl kanaldır. O, aktiv buraxılış şöbəsinə istənilən təkanla dəyişə bilər və belədir** istehsalda istifadə üçün dəstəklənmir** . Müəyyən bir quruluşu qiymətləndirərkən şəkil həzmini bərkidin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sınaqdan əvvəl OmniRoute məlumat həcminin və ya bağlanmış məlumat kataloqunun ehtiyat nüsxəsini çıxarın. Geri qaytarmaq üçün əvvəllər istifadə edilmiş stabil versiyanı bərpa edin və ya konteyneri həzm edib yenidən yaradın:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Buraxılış filialı heç vaxt hərəkət edə bilməz `latest`; yalnız uyğun sabit semantik versiya sabit göstəricini təşviq edə bilər. `next` şəkilləri buraxılış şəklinin yoxlanılmasını və KRİTİK zəiflik qapısını bloklayır.

**`latest` git üçün valyuta zəmanəti deyil.** `main` və ya aktiv `release/v*` filialında birləşdirilmiş düzəlişlər var** yox** sabit SemVer şəkli dərc olunana və dərc işi `:latest` təşviq edənə qədər `:latest` də (bu SemVer ilə eyni həzm). Əgər GitHub artıq düzəlişi göstərdiyi halda `latest` donmuş görünürsə, buraxılış qolunu sınamaq üçün `:next` çəkin və ya SemVer teqini gözləyin.

| İstəyirsən                                                                    | istifadə edin                    |
| ----------------------------------------------------------------------------- | -------------------------------- |
| GitOps / sürüşməməli olan istehsal                                            | Pin `:X.Y.Z` (və ya şəkil həzmi) |
| Yayımlanmış tövlələri izləyin və hər buraxılışda yenidən yaratmağı qəbul edin | `:latest`                        |
| Yayımlanmamış `release/v*` öhdəliklərini sınayın                              | `:next` (istehsal deyil)         |
| Test `main`                                                                   | `:main` (istehsal deyil)         |

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

## Mövcudluq: standart SQLite tək replikadır

Fond Docker / Kubernetes OmniRoute edir** bir Node prosesi + bir SQLite yazıçısı** . Yüksək əlçatanlıqdır** dəstəklənmir** həmin topologiyada.

| Məhdudiyyət                                              | Nəticə                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tək yazıçı                                               | Et** yox** eyni SQLite faylına qarşı bir neçə replika işlədin. Bu DB korlayır.                                                                                                                                                                                                                          |
| Yenidən yaradın / yenidən başladın / HEALTHCHECK öldürün | **Tam kəsinti** uçuş zamanı SSE, tablosuna seanslar və yaddaşda olan vəziyyət. Hər bağlı müştəri düşür. Boş son nöqtə pəncərəsi zamanı yeni sorğular əks proksi əldə edir**`502 Bad Gateway: Unknown error`** , OmniRoute JSON deyil — müştərilər bunu provayderin nasazlığından ayıra bilmir (#11015). |
| `/healthz` ilə eyni hadisə dövrəsi                       | Məşğul olan kataloq və ya sıxılma işarəsi zondları gecikdirə bilər; qısa bir fasilədən sonra proqramı yenidən işə salır** yalnız** replika.                                                                                                                                                             |

**Prob matrisi** (həmçinin [Kubernetes araşdırma tövsiyələrinə](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) baxın):

| Prob             | Hədəf                                                        | istifadə etməyin                                   |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| Canlılıq         | TCP -də `PORT` (defolt `20128`) və ya yumşaq HTTP `/healthz` | `/api/monitoring/health`                           |
| Hazırlıq         | HTTP `GET /healthz`                                          | Hadisə döngəsini ölü kimi qəbul edən sıx fasilələr |
| Dərin / insanlar | `/api/monitoring/health`                                     | Avtomatlaşdırılmış kubelet canlılığı               |

**Təkmilləşdirmələr:** hər seansın düşəcəyini gözləyin. Mümkünsə, müştəriləri boşaltın; default SQLite-da yuvarlanan yeniləmə yoxdur. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` eyni zamanda konteyner qeyri-sağlam olduqda yeganə prosesi əvəz edəcək - eyni partlayış radiusu.

Hazır manifestlər və Helm diaqramı `deploy/kubernetes/` və `deploy/helm/omniroute/` də yaşayır — [Kubernetes yerləşdirmə təlimatına](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) baxın.

a üçün Kubernetes fraqmenti** tək replika** (Yenidən yaratmaq tələb olunur; `replicas` bir SQLite faylına qarşı qaldırmayın):

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

`preStop` yuxu, SIGTERM dən əvvəl Xidmət son nöqtələrini kube buraxmağa imkan verir** yeni** Trafik ölüm prosesini vuraraq dayanır. Uçuş zamanı `/v1/responses` SSE ağır çəkili qəbul icarələri (#11015) vasitəsilə `SHUTDOWN_TIMEOUT_MS` ə qədər (defolt 30s) boşaldılır. Hələ də prosesə çatan yeni sorğular `503` + `Retry-After: 5` alır. Dəyişdirmə Hazır olana qədər boş son nöqtə boşluğunu yenidən yarat çətin bir kəsinti olaraq qalır - bu, SQLite topologiyasıdır, yanlış konfiqurasiya yox.

Xarici Postgres / çox yazıçı HA edir** yox** sənədləşdirilmiş ehtiyat yolu. Əgər sizə HA lazımdırsa, tək nüsxə saxlayın və ya layihənin ayrıca sınaqdan keçirdiyi və sənədləşdirdiyi topologiyanı işə salın. Postgres/MySQL işi [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) -də yaşayır. O qədər gəmilər, çoxaltmaq üçün yeganə dəstəklənir** böyük** `/v1/responses` tutumu bir cilddə `replicas > 1` deyil, N müstəqil prosesdir (növbəti bölmə).

## Ölçəyi azaltmaq: N müstəqil proses

### Codex token fırlanma mülkiyyəti

Bir Codex hesabının nüsxələri müstəqil olaraq onun birdəfəlik yeniləmə nişanını istehlak etməməlidir. Yalnız sinxronlaşdırılmış etimadnamələri istehlak edən nümunələrdə `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (ləqəb `cx`) təyin edin. Onu tək fırlanma sahibində ayarlanmamış buraxın. Hər bir proses hələ də öz `DATA_DIR` lazımdır; bu seçim nə SQLite paylaşır, nə də token sinxronizasiyasını və ya paylanmış kilidi təmin etmir.

Passiv instansiya yeniləməyə ehtiyac olduqda əlaqəni yenidən oxuyur və yalnız fərqli, müddəti bitmiş giriş nişanını qəbul edir. Əks halda, yeniləmə müddəti bitmədən və ya əlaqəni deaktiv etmədən və ya yeniləmə kəsicisinin nasazlığını hesablamadan deaktiv edilir. Real upstream autentifikasiya uğursuzluqları hələ də normal uğursuzluq uçotu, eksponensial soyutma və normal müştəri xətası istifadə edir; hesabın deaktivasiyası daimi olaraq qalır. Giriş tokenlərinin müddəti bitməzdən əvvəl sahibinin fırlanan tokenlərini sinxronlaşdırın (defolt aktiv yeniləmə potensialı beş dəqiqədir) və ya Codex auth faylını yenidən idxal edin. Passiv idxallar, tədarük edilmiş tokenləri tokenin son nöqtəsində təsdiq etmədən saxlayır. Manual dashboard/API yeniləmə `409 refresh_disabled` qaytarır; yeni OAuth girişləri dəyişməyib. [Ətraf mühit istinadına](../reference/ENVIRONMENT.md#passive-codex-token-refresh) baxın.

Bir Node prosesidir** bir V8 yığını** . İki üst-üstə düşən ~ 3 MiB / ~ 750k-token kodlaşdırma agenti `POST /v1/responses` (RTK + Caveman) həmin yığını ~ 12 Gi (`FATAL ERROR: Reached heap limit`) ilə dayandırır və 16 Gi cqrupunu OOM edə bilər. Bax [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Həmin ölçü a** yaddaş büdcəsi** xəbərdarlıq, iki eyni vaxtda uzun `/v1/responses` olan bir məhsul hard-max deyil. Ağır çəkili söhbətə giriş, eyni V8/cgroup tavan — ilə ölçülən avtomatik əldə edilən qəbul bayt büdcəsi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ilə təmin edilir və onu yuxarıya doğru üstələyir (yaxud köhnə `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` sorğu sayı həddini təyin etməklə) artıq ölçülü prosesdə ləğvi yenidən tətbiq edir. Kiçik söhbətlər, `/healthz`, `/v1/models` və MCP** yox** o qapaqda.

### Bir proses: ikidən çox uzun `/v1/responses`

A** sağlam** proses ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` altındakı yığın, standart `0.75`)** bilər** Proses üzrə geniş uçuş bayt büdcəsində (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hələ də yer olduqda ikidən çox eyni vaxtda uzun `POST /v1/responses` işlədin. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` və ya yuxarıda olan orqanlar (defolt 256 KiB) struktur tələbləri ilə eyni ağır çəkili icarəni götürür və eyni [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) istifadə edir. Onlarla eyni vaxtda uzun SSE müştərisi (operatorlara çox vaxt 40-50 lazımdır)** yaddaş büdcəsi** sual — size heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — çətin “max 2” məhsul limiti deyil. Təzyiqli yığın yenə də təkrar cəhd edilə bilən `503` ilə tökülür, beləliklə #7849 geri qayıtmır.

Kimə** yığınları çoxaltmaq** (müstəqil V8 köhnə məkanlar)** bu gün** :

| Et                                                                                                                             | etməyin                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Qaç** N containers/pods** , hər biri öz** sahibi** `DATA_DIR` / həcm                                                           | Bir SQLite faylına qarşı `replicas > 1` təyin edin              |
| Ölçü ağır uçuşda + sağlam-boş yerdən yığın / uçuş bayt büdcəsi; 1–2 mühafizəkar #7849 standartıdır, maksimum sərt məhsul deyil | Bir prosesə 8 × RAM və qeyri-məhdud sayma həddi verin           |
| Könüllü: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` üçün** paylaşılan kvota sayğacları**                             | Redis nı paylaşılan SQLite — kimi qəbul edin                    |
| Hər bir nüsxədə provayder sirlərini dublikat edin (və ya bölmələrə ayrılmış panelləri qəbul edin)                              | Nümunələr arasında bir tablosunu / bir zəng qeydini gözləyin    |
| İstənilən yük balanslayıcısı ilə ön; API düyməsi və ya sessiya ilə yapışqan kifayətdir                                         | Satıcı üçün xüsusi ölçüdən xəbərdar olan ara proqram tələb edin |

Sessiyadan hesaba yaxınlıq Redis vasitəsilə də paylaşıla bilər: eyni `REDIS_KEY_PREFIX` və müsbət `sessionAffinityTtlMs` parametri ilə hər bir prosesdə `OMNIROUTE_SESSION_AFFINITY_STORE=redis` və `REDIS_URL` təyin edin. Sancaqlar hər bir prosesin uyğun yerli bağlantısına hash edilmiş istifadə hesabı identifikatorlarını həll edir, ona görə də uyğun identifikasiya metadatası olan OAuth hesablarında uyğun əlaqə IDs olmamalıdır. Məlum hesab identifikasiyası pin həllində və mühafizə olunan çıxarılmada ziddiyyətli yerli IDs dan üstündür; şəxsiyyəti olmayan qeydlər (və ya şəxsiyyəti olmayan evakuasiya edənlər) miras ID mühafizəsini saxlayır. Sabit istifadə identifikasiyası olmayan hesablar hələ də uyğun IDs tələb edir. Redis səhvləri və ya 100 ms-dən çox zənglər yerli SQLite ə qayıdır. Hər bir Redis yaxınlıq mağazası görkəmli əməliyyatları 8-də saxlayır, dolduqda dərhal Redis yan keçir və zəng edənin son tarixində deyil, yalnız əsas iş həll edildikdə yuvaları buraxır. Redis kəsilməsi zamanı ortaq bir həqiqət yoxdur: hər bir nümunə öz yerli yaxınlığına qayıdır, seanslar hər instansiyada bir dəfə yenidən bağlana bilər və nümunələr fərqli ola bilər. Yapışqanlıq bərpa edildikdə Redis vasitəsilə yenidən birləşir. Taymout gözləmə həddinə çatır, göndərilən EVAL deyil, geri qayıtdıqdan sonra enə bilər. Marşrutlaşdırma yazıları yeni mutasiya vaxtı oxunuşu deyil, marşrutlaşdırma qərarının müşahidə etdiyi dəqiq dəyəri müqayisə edir; müşahidə edilmiş qaçırma və ya SQLite ehtiyat müşahidəsi olmayan Redis açarı kimi müqayisə edilir. Köhnəlmiş sancaqlar bir CAS-da dəyişdirilir, buna görə də gecikmiş əmr daha yeni, fərqli pin əvəz edə və ya silə bilməz. Redis oxuyur atomik olaraq dəyəri qaytarır və qalan server TTL; müsbət PTTL (və ya müddəti bitməmiş) yazıçının JSON vaxt damğasını və ya oxucunun saatını deyil, canlılığı müəyyən edir. Yerli son tarixə qədər TTL yerli snapshots xəritəsi; mövcud JSON açarları oxunaqlı qalır və onların xam baytları CAS üçün saxlanılır. Redis cavab verərkən həqiqətin yeganə mənbəyidir. Təsdiqlənmiş paylaşılan əlavələr, toxunmalar və silmələr yerli girişi silir, heç vaxt quraşdırmayın və ya yeniləməyin. Redis yolunda SQLite əvvəlki kimi TTL ilə məhdudlaşan Redis xətaları, fasilələr və ya qəbul doymalarından yalnız bu instansiyanın öz ehtiyat qərarlarını saxlayır. Sonrakı kəsilmədə çatışmayan yerli pin səhv və ya çıxarılan hesaba deyil, bir təzə seçimə (bir tez keş buraxılmasına) başa gəlir. Rədd edilmiş əlavələr paylaşılan qalibi və onun qalan TTL atomik şəkildə qaytarır: adi seçim xəritələşdirilmiş yerli son tarixi yenidən yoxlayır və hələ də canlı uyğun qalibdən istifadə edir, istifadəyə toxunur və başqa paylaşılan yazma olmadan həmin hesaba daxil olur. Əgər o, mövcud deyilsə, seçim yerli namizədi saxlayır, paylaşılan pin dəyişdirilmədən qalır və bir sazlama mesajı verir. Rədd edilmiş CAS SQLite yazmır; Redis səhvləri, fasilələr və ya qəbul doyması əvəzinə mövcud yerli əməliyyatı tətbiq edir. Göndərilən mutasiyanın cavabı fasilədən sonra (qəbul edilib, rədd edilib və ya xəta) gəlsə, sinxron dəqiq seriallaşdırılmış dəyər müqayisəsi və silinməsi yalnız bayt-eyni zaman aşımı ehtiyat sırasını silir. Bu müqayisə ilə silinmə arasında heç bir gözləmə yoxdur; daha yeni kəsilmə yazısı saxlanılır. Mühafizəli çıxarma, hətta Redis aşağı olsa belə, uğursuz hesabın yerli pinini silir və paylaşılan çıxarılma təsdiqləndikdən sonra onu yenidən təmizləyir. Gözlənilən əvvəlki paylaşılan cavablar çıxarılan yerli pin bərpa edə bilməz, çünki paylaşılan uğurlar heç vaxt SQLite yazmır. Sonrakı kəsilmə geri dönüşü hesabı yenidən işlədə bilər; sonra qəbul edilən paylaşılan yazı yalnız Redis-də mövcuddur. Redis buraxılışları yerli ehtiyat vəziyyətinə müraciət etmir. Sürücü söndürüldükdə, yeni seçilmiş sancaqlar köhnə dörd sahəli SQLite JSON formasını saxlayır; yalnız Redis marşrutlaşdırma hashed hesab şəxsiyyətini əlavə edir. Əvvəlcədən gətirilən sancaqlar, istifadə müddəti bitdikdə yenidən yoxlanılır. Redis qeyri-icarə seçimi mağazanı yenidən oxuyur, lakin sinxron icarə planlaması hələ də əvvəlcədən gətirmə və planlaşdırma arasında çıxarılan pindən istifadə edə bilər (qəbul edilmiş ən yaxşı səy pəncərəsi). İcarə öhdəliyi uzunmüddətli iddiadan sonra hesabları dəyişə bilməz: rədd cavabı verildikdə o, yalnız həmin sorğu üçün iddia edilən namizədi saxlayır və paylaşılan qalibi toxunulmaz qoyur, beləliklə, instansiyalar arasında razılaşma həmin yolda məhdudlaşdırılır. Cədvəlin qalan hissəsi hələ də tətbiq olunur: bu, kombinasiya seansının yapışqanlığını, yerli Codex dönmə pinlərini, hesab semaforlarını, bloklamaları, xərcləmə limitlərini, konfiqurasiyanı və ya zəng qeydlərini paylaşmır.

Avadanlıq: instansiya başına paralel uzun `/v1/responses` a** yaddaş büdcəsi** sual (heap + inflight-byte / #10110). `N` müstəqil `DATA_DIR` s hələ də yığınları çoxaldır: host RAM “N = 8 ilə bir 16 Gi pod” deyil, `N × cgroup` əhatə etməlidir. Heç vaxt bir SQLite faylında `replicas > 1`.

Eskiz tərtib edin (iki yığın, iki cild — deyil `deploy.replicas: 2`):

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

Prosesdaxili sıxlıq ( HTTP izolyatının sıxılması) [#11023-](https://github.com/diegosouzapw/OmniRoute/issues/11023) dür. Paylaşılan davamlı vəziyyətdə bir məntiqi klaster [#8075-](https://github.com/diegosouzapw/OmniRoute/issues/8075) dir.

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
