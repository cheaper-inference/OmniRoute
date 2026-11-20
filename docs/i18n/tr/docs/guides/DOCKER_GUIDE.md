# 🐳 Docker Guide — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Eksiksiz Docker dağıtım referansı. Hızlı başlangıç için [README Docker bölümüne](../README.md#-docker) bakın.

## İçindekiler

- [Hızlı Çalıştırma](#quick-run)
- [Ortam Dosyasıyla](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Kullanılabilir Profiller](#available-profiles)
- [OmniRoute Docker'da çalışırken ana makinedeki CLI araçlarını yapılandırma](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Üretim Compose Yapılandırması](#production-compose)
- [Dockerfile Aşamaları](#dockerfile-stages)
- [Kritik Ortam Değişkenleri](#critical-environment-variables)
- [Caddy (HTTPS) ile Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Hızlı Tüneli](#cloudflare-quick-tunnel)
- [İmaj Etiketleri](#image-tags)
- [Docker'da Dashboard güncellemeleri](#dashboard-updates-in-docker)
- [Kullanılabilirlik: Varsayılan SQLite tek replikalıdır](#availability-default-sqlite-is-single-replica)
- [Docker içindeki Gemini bölgesel hataları](#gemini-regional-errors-inside-docker)
- [Önemli Notlar](#important-notes)

---

## Hızlı Çalıştır

> **Tek komutla kendi kendine barındırma?** [Kendi Kendine Barındırma Kılavuzu](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` bakın (yayınlanan resim + Redis, yalnızca geridöngü, profil seçeneği yok). Aşağıdaki Hızlı Çalıştırma, Redis zaten başka bir yerde çalıştıran kullanıcılar için tek kapsayıcı yoldur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Ortam Dosyası ile

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
# Temel profil (CLI araçları yok)
docker compose --profile base up -d

# CLI profili (Claude Code, Codex ve OpenClaw yerleşik olarak bulunur)
docker compose --profile cli up -d

# Ana makine profili (öncelikli olarak Linux için; ana makinedeki CLI ikili dosyalarını salt okunur olarak bağlar)
docker compose --profile host up -d

# Web profili (web oturumu sağlayıcıları için Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar bileşenini birleştirin
docker compose --profile cli --profile cliproxyapi up -d
```

## Kullanılabilir Profiller

OmniRoute, başlıca dağıtım biçimleri için Compose profilleriyle birlikte gelir. Ortamınıza uygun olanı seçin.

| Profil              | Hizmet           | Kullanım amacı                                                                                                                                                | Komut                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (varsayılan) | `omniroute-base` | Başsız sunucu / minimum çalışma zamanı; paketlenmiş sağlayıcı CLI'ları yok                                                                                    | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | `omniroute providers/setup/doctor` ve paketlenmiş CLI'ları (Codex, Claude Code, Droid, OpenClaw) çağıran aracı tabanlı iş akışları                            | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` vb. dizinleri salt okunur bağlayarak ana makine CLI'larına `network_mode` benzeri erişim isteyen Linux ana makineleri | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Üst akış CLI proxy işlemleri için [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar bileşenini `8317` portunda çalıştırın                   | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Tarayıcı gerektiren web oturumu sağlayıcıları: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` oluşturulur, Chromium dahildir)                   | `docker compose --profile web up -d`         |

> Birden fazla profil birleştirilebilir: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker'da çalışırken ana makine CLI araçlarını yapılandırma

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ve kontrol panelindeki
**Yapılandırmayı kaydet** düğmesi, `~/.codex/*.config.toml` gibi dosyalara yazar. Bu yollar
yalnızca CLI'ın gerçekten çalıştığı makinede anlamlıdır. Bunları container'ın içinde
çalıştırırsanız dosya container'ın kendi ana dizinine (`/home/node` —
imaj `USER node` ile çalışır) yazılır; ana makinedeki hiçbir CLI bu dosyayı okumaz ve
container yeniden oluşturulduğu anda dosya silinir.

OmniRoute bunu algılar ve kullanamayacağınız bir başarı bildirmek yerine
talimatlarla birlikte yazma işlemini reddeder: CLI `2` koduyla sonlanır ve API,
`containerEphemeralTarget: true` ile `422` yanıtı verir.

### Önerilen: CLI'ı ana makinede, OmniRoute'u Docker'da çalıştırın

Container API'ı sunar; CLI ise ana makinenizdeki araçları yapılandırır.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI'ı container'a yönlendirin
omniroute setup-codex                      # ana makinenizdeki gerçek ~/.codex dizinine yazar
```

Codex, Claude Code, Cursor veya benzeri araçlar dizüstü bilgisayarınızda
çalışıyorsa doğru tercih budur — olağan kurulum da budur.

### Alternatif: ana makine yapılandırma dizinlerini bind mount ile bağlayın (`host` profili)

Container'ın doğrudan ana makine yapılandırmanıza yazmasını istiyorsanız
dizinleri bağlayın ve `CLI_CONFIG_HOME` değişkenini bağlama köküne yönlendirin. `host` profili
bunu zaten yapar:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Yolun güvenilir olmasını sağlayan şey bind mount'tur: OmniRoute,
`/proc/self/mountinfo` dosyasını okur ve bağlı yollara (ayrıca alt öğeleri
bağlama noktası olan dizinlere; yukarıdaki `/host-home` yapısı tam olarak böyledir)
yazılmasına izin verirken bağlı olmayan yolları reddetmeye devam eder.

### Son çare: container'ın kendi CLI'larını yapılandırın (ölçülü kullanın)

CLI'lar gerçekten container'ın içinde bulunuyorsa (`cli` profili), yazma işlemi
bilinçli olarak yapılır. Herhangi bir `setup-*` komutuna `--allow-container-write`
iletin veya sunucu için `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ayarını yapın.
Yazma işlemi, container'dan sonra kalıcı olmayacağına ilişkin bir uyarıyla gerçekleştirilir.

> **Güvenlik uyarısı — `cli` profili + `docker.sock` bağlaması.**
> `cli` profili, container içindeki otomatik güncelleyicinin ana makine daemon'ı
> üzerinden stack'i yeniden oluşturabilmesi için `/var/run/docker.sock` yolunu bind mount
> ile bağlar (`src/lib/system/autoUpdate.ts` bu socket'i yoklar ve mevcut olmadığında
> Docker yolunu atlar). Bu socket **ana makine root yetkileri açısından bir güven
> sınırıdır**: ona erişebilen herhangi bir şey, ana makinenin Docker daemon'ını root
> olarak yönetir — ana makinedeki herhangi bir container'ı oluşturabilir, inceleyebilir,
> durdurabilir ve kaldırabilir. Bunun sonuçları şunlardır:
>
> 1. **`cli` profilinin portunu hiçbir zaman ağa açmayın.** Portu
>    `127.0.0.1` üzerinde yayımlayın (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN üzerinden erişilebilen bir `cli` profili, kontrol paneli düzeyindeki herhangi
>    bir RCE'nin ana makinenin tamamen ele geçirilmesine dönüşmesine yol açar.
> 2. **`cli` profiline başka ana makine dizinlerini bağlamayın.**
>    Docker socket'iyle birlikte eklenen herhangi bir bağlama, container'a dosya
>    sisteminiz ve ana makine yapılandırmanız üzerinde tam okuma/yazma erişimi verir.
>    Bir aracın projeyi görmesi gerekiyorsa onu CLI binary'siyle yerel olarak çalıştırın
>    — projeyi `cli` container'ına bağlamayın.
>
> Container içi otomatik güncellemeye ihtiyacınız yoksa `cli` profilini kapalı bırakın
> (`COMPOSE_PROFILES=core,redis` veya daha kısa bir değer). Diğer profiller
> Docker socket'ini bağlamaz.
>
> MITM ile ilgili tehdit modeli için `docs/security/MITM-TPROXY-DECRYPT.md` dosyasına
> (git'tedir; `/docs` içine derlenmez), `codex`/`claude-code`/`droid`/`openclaw`
> binary'lerinin kaynak zinciri içinse `docs/security/SUPPLY_CHAIN.md` dosyasına bakın.

## Redis Sidecar

OmniRoute, dağıtık hız sınırlayıcıyı ve paylaşılan önbelleği desteklemek için Redis'e dayanır. `redis` hizmeti `docker-compose.yml` içinde **her zaman tanımlıdır** (herhangi bir profil kısıtlaması yoktur) ve diğer tüm profillerle birlikte başlatılır.

| Ayrıntı                                     | Değer                                       |
| ------------------------------------------- | ------------------------------------------- |
| İmaj                                        | `redis:7-alpine`                            |
| Konteyner adı                               | `omniroute-redis`                           |
| Dahili port                                 | `6379`                                      |
| Ana makine portu (geçersiz kılma)           | `REDIS_PORT` (varsayılan: `6379`)           |
| Ana makine bağlantı adresi (geçersiz kılma) | `REDIS_BIND_HOST` (varsayılan: `127.0.0.1`) |
| Birim                                       | `omniroute-redis-data` → `/data`            |
| Sağlık denetimi                             | `redis-cli ping` (10 sn. aralıkla)          |

İlgili ortam değişkenleri:

- `REDIS_URL` — uygulamaya aktarılan bağlantı dizesi (varsayılan olarak `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri için ana makine tarafındaki port eşlemesi.
- `REDIS_BIND_HOST` — portun yayımlandığı ana makine arayüzü. Varsayılan değer `127.0.0.1`'dir.

> **Neden varsayılan olarak geri döngü adresi kullanılır:** sidecar, `requirepass` olmadan çalışır ve uygulama
> konteynerleri ona compose ağı (`redis:6379`) üzerinden erişir — yayımlanan port yalnızca
> ana makine tarafındaki araçlar (`redis-cli`, yerel bir `npm run dev`) içindir. Portu
> `0.0.0.0` üzerinde yayımlamak, kimlik doğrulaması olmayan bir Redis'i LAN'ınızdaki tüm ana makinelere açar. Eğer
> `REDIS_BIND_HOST=0.0.0.0` olarak ayarlarsanız hizmetin `command:` alanına `--requirepass` seçeneğini de ekleyin.

**Redis'in devre dışı bırakılması** önerilmez (hız sınırlayıcı, bellek içi yedek çözüme geriler). Bunu yapmak zorundaysanız `docker-compose.yml` içindeki `redis:` hizmet bloğunu kaldırın/yorum satırı hâline getirin ya da sıfıra ölçeklendirin:

```bash
docker compose up -d --scale redis=0
```

## Üretim Compose Yapılandırması

Geliştirme ortamıyla birlikte çalışan yalıtılmış bir üretim anlık görüntüsü için `docker-compose.prod.yml` dosyasını kullanın.

| Ayrıntı               | Değer                                                                             |
| --------------------- | --------------------------------------------------------------------------------- |
| Dosya                 | `docker-compose.prod.yml`                                                         |
| Varsayılan pano portu | `PROD_DASHBOARD_PORT=20130` (dahili `${DASHBOARD_PORT:-20128}` portuna eşlenir)   |
| Varsayılan API portu  | `PROD_API_PORT=20131`                                                             |
| İmaj                  | `omniroute:prod` (`runner-cli` hedefinden derlenir)                               |
| Redis konteyneri      | `omniroute-redis-prod` (`redis:8.6.2`, ayrılmış `redis-prod-data` birimi)         |
| Veri birimi           | `omniroute-prod-data` (adlandırılmış, yeniden derlemeler arasında kalıcı)         |
| Sağlık denetimleri    | `node healthcheck.mjs` + `redis-cli ping`; `depends_on`, Redis sağlığına bağlıdır |

Kullanım:

```bash
# Üretim yığınını derleyin ve başlatın
docker compose -f docker-compose.prod.yml up -d --build

# Günlükleri akış hâlinde görüntüleyin
docker compose -f docker-compose.prod.yml logs -f

# Kapatın (birimleri koruyun)
docker compose -f docker-compose.prod.yml down
```

Üretim yığını, geliştirme compose yapılandırmasıyla paralel çalışır (konteyner adları, portlar ve birimler farklıdır); böylece üretim çalışmaya devam ederken yerel olarak geliştirmeyi sürdürebilirsiniz.

## Docker Dosyası Aşamaları

Depo, çok aşamalı bir Dockerfile (`Dockerfile`) gönderir. Dört aşama ortaya çıkıyor; kullanım durumunuz için doğru `target` seçin.

| Sahne         | Temel resim           | Amaç                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Deps'i (`npm ci --legacy-peer-deps`) yükler ve `npm run build` çalıştırır (varsayılan olarak Turbopack — aşağıdaki Derleme zamanı kaynaklarına bakın)                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Next.js bağımsız çıkışıyla üretim çalışma zamanı.** Sağlayıcı CLIs paketi yok.**                                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` ve global CLIs ekler: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Temsilci iş akışları için bunu seçin.**                                                                                                                    |
| `runner-web`  | `runner-base`         | Web oturumu sağlayıcıları için Playwright + bir Chromium tarayıcısı (`--with-deps`) ekler: `gemini-web`, `claude-web`, `claude-turnstile`.** Bu sağlayıcıları kullanırken bunu seçin** — düz görüntü istek zamanında onsuz başarısız olur (Yayın Kanalları altındaki `-web` notuna bakın). |

Belirli bir hedefi manuel olarak oluşturun:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Derleme zamanı kaynakları

Üç yapı argümanı, `builder` aşamasının maliyetini kontrol eder. Bunlar yalnızca yapım aşamasındadır — `OMNIROUTE_MEMORY_MB` (aşağıda) ayrı bir çalışma zamanı düğmesidir.

| Bağımsız değişken oluştur   | Varsayılan | Etki                                                                                                    |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` webpack ile derlenir: belleğin en yüksek noktası daha düşük, daha yavaş. `1` Turbopack tercih eder. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Oluşturulan `next build` için V8 yığın tavanı (`--max-old-space-size`).                                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL` besler; Daha sonra sayfa verilerinin toplanması için `workers = N - 1` türetir.     |

`OMNIROUTE_BUILD_WORKERS` büyük bir inşaatçıya karşı yükselen ve kısıtlı bir yapı öldüğünde şüphelenilen kişidir** sonrasında** `✓ Compiled successfully`. Her sayfa veri çalışanı ve üst `next build` kendisi de kendi sürecidir; canlı bir VPS çoğaltımı ( #7518 sorunu), `NODE_OPTIONS` yığın bayrağından bağımsız olarak her işlemin RSS zirvesini ~ 4,5 GB ölçtü (Turbopack V8 yığınının dışındaki native/Rust belleğinde derlenir). `2` varsayılan değeri (→ 1 çalışan, toplam 2 işlem), yayınlama hattının kullandığı 16 GB / 4 vCPU GitHub tarafından barındırılan çalıştırıcılara göre boyutlandırılmıştır. `8` (→ 7 işçi) koşucunun belleği tükendi ve buildkit `ResourceExhausted: ... cannot allocate memory` adımında başarısız oldu; `3` (→ 2 işçi), süreç başına RSS çıkarım yapmak yerine doğrudan ölçüldüğünde hala uymuyordu. `tests/unit/docker-build-memory-budget.test.ts` ölçülen rakama göre aritmetik yapar ve düğmelerden herhangi biri koşucuyu aşarsa başarısız olur.

Turbopack yaşayan yerel Rust belleğinde derlenir** dıştan** V8 yığını olduğundan `OMNIROUTE_BUILD_MEMORY_MB` onu bağlamaz. Bellek tavanına sahip bir ana bilgisayarda yapı daha sonra OOM katili tarafından hiçbir hata metni olmadan SIGKILLed dönüştürülür — basitçe orta `Creating an optimized production build` durdurur, bu da yetersiz bellek yerine bir askıda kalma gibi görünür. `Dockerfile` varsayılan olarak webpack (`OMNIROUTE_USE_TURBOPACK=0`) olmasının nedeni budur, `npm run dev` / `npm run build` farklı olarak, burada Turbopack varsayılan koddur: derleme bağımsız değişkenleri olmayan çıplak bir `docker build .` (Demiryolu ve diğer tek tıklamalı ana bilgisayarların çalıştırdığı), bellek sınırı olan bir oluşturucuda sessizce ölmemelidir. Yayınlanan görüntüler zaten `docker-publish.yml` açıkça `OMNIROUTE_USE_TURBOPACK=0` geçiyor. Bol miktarda RAM içeren bir oluşturucuda, daha hızlı bir yapı için Turbopack tercih edin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` etkin olduğundan `next build` bir ebeveyni çalıştırır** Ve** bir çalışan sürecidir ve her biri `OMNIROUTE_BUILD_MEMORY_MB` ayrı ayrı onurlandırır. Konteyner tavanını bir kez değil, kabaca bu değerin iki katının üzerinde boyutlandırın.

Bu ağaçta ölçülmüştür (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketleyici | Konteyner tavanı | Sonuç                                      |
| ----------- | ---------------- | ------------------------------------------ |
| Turbopack   | 8 GiB / 16 GiB   | OOM-ikisini de sessizce öldürdü            |
| web paketi  | 8 GiB            | inşaat işçisi SIGKILLed                    |
| web paketi  | 12 GiB           | Başarılı oldu, 11,1 GiB ile zirveye ulaştı |

### Çalışma zamanı varsayılanları

`runner-base` tarafından dışa aktarılan varsayılanlar: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker bellek davranışı:

- Görüntü `OMNIROUTE_MEMORY_MB=1024` ayarlar ve `NODE_OPTIONS=--max-old-space-size=1024` ondan türetir.
- Gerçek sunucu işlemi, `OMNIROUTE_MEMORY_MB` okuyan ve `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` ekleyen bağımsız başlatıcı tarafından başlatılır.
- Düğüm, tekrarlanan son `--max-old-space-size` değerini kullanır; dolayısıyla `OMNIROUTE_MEMORY_MB` ayarlanması, etkili Docker yığın sınırını kontrol eder.
- Görüntü bunu her zaman ayarladığından, başlatıcının kendi RAM kalibreli geri dönüşü hiçbir zaman Docker altında geçerli olmaz. İş yükü için açıkça yükseltin (aşağıdaki tablo). `2048` `/v1/responses` kodlama aracısı için hala çok küçük.

### Kodlama aracıları için çalışma zamanı RAM

1 GiB Docker varsayılanı bir üretim boyutu değil, bir dashboard/light-chat tabanıdır. Uzun `POST /v1/responses` gövdeleri (yüzlerce mesaj, onlarca araç) sıkıştırma sırasında birden fazla bellek içi grafiği korur. Çakışan iki ~ 3 MiB / ~ 750k-token isteği, V8'i bir anda iptal etti** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) ve ayrıca 16 GiB cgroup OOM ulaştı. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) bakın.

Boyut** yığının üstündeki cgroup `--memory`** — yerel arabellekleri, SQLite ve sıkıştırma ara öğeleri V8'in dışında bulunur.

| İş yükü                                 | `OMNIROUTE_MEMORY_MB`        | Konteyner / grup              | Notlar                                                                                               |
| --------------------------------------- | ---------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| Kontrol paneli, tek bir hafif sohbet    | `1024` (görüntü varsayılanı) | ≥2 GiB                        |                                                                                                      |
| Bir kodlama aracısı (Claude/Codex/Grok) | `8192`                       | ≥10 GiB                       | Tipik tek oturumlu `/v1/responses`                                                                   |
| İki eşzamanlı uzun `/v1/responses`      | `10240`–`12288`              | ≥12–16 GiB                    | ~ 12 GiB yığınında ölçülen V8 iptali                                                                 |
| Üç + eşzamanlı uzun bağlam              | tek bir süreçte yapmayın     | serileştirme / daha fazla RAM | Varsayılan ağır sıklet kabulü uçuş sırasında 1'dir; RAM olmadan yükseltmek, kürtajı yeniden başlatır |

Çıplak metaldeki `omniroute serve` `OMNIROUTE_MEMORY_MB` şu durumdayken RAM %35'ini (sabitlenmiş `[512, 4096]`) ~ kalibre eder** ayarsız** . Docker her zaman `1024` ayarlar, böylece kalibrasyon hiçbir zaman resmi görüntüde çalışmaz.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Kritik Ortam Değişkenleri

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) belgesinde açıklanan varsayılanların yanı sıra, Docker altında çalıştırırken aşağıdaki değişkenler en büyük öneme sahiptir:

| Değişken                      | Amaç                                                                                                                                                                                                                                                                              | Varsayılan                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket köprüsü için paylaşılan gizli anahtar. **Üretim ortamında zorunludur** — güçlü ve rastgele bir dize olarak ayarlayın.                                                                                                                                                   | ayarlanmamış (sağlanmalıdır) |
| `REDIS_URL`                   | Hız sınırlayıcı / önbellek arka ucu için bağlantı dizesi                                                                                                                                                                                                                          | `redis://redis:6379`         |
| `REDIS_PORT`                  | Paketle gelen Redis konteyneri için ana makine tarafındaki bağlantı noktası                                                                                                                                                                                                       | `6379`                       |
| `REDIS_BIND_HOST`             | Paketle gelen Redis bağlantı noktasının yayımlandığı ana makine arayüzü (AUTH eklemediğiniz sürece geri döngü arayüzü)                                                                                                                                                            | `127.0.0.1`                  |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Otomatik güncelleme iş akışları için `cli` profilinde `/workspace/omniroute` konumuna bağlanan ana makine yolu                                                                                                                                                                    | `.` (geçerli dizin)          |
| `OMNIROUTE_MEMORY_MB`         | Docker bağımsız sunucusu için çalışma zamanı Node yığın belleği üst sınırı; yukarıdaki imaj varsayılanını geçersiz kılar. Kodlama ajanları: `8192`+ ([çalışma zamanı RAM'i](#runtime-ram-for-coding-agents) bölümüne bakın).                                                      | `1024`                       |
| `DASHBOARD_PORT` / `API_PORT` | Pano (20128) ve API (20129) için dışa açılan bağlantı noktalarını geçersiz kılar                                                                                                                                                                                                  | `20128` / `20129`            |
| `APP_BIND_HOST`               | docker-compose'un pano/API/canlı WS bağlantı noktalarını yayımladığı ana makine arayüzü. `REQUIRE_API_KEY=false` (varsayılan) olduğunda `0.0.0.0`, anonim `/v1` proxy'sini LAN'a açar — yalnızca `REQUIRE_API_KEY=true` ile veya önünde bir ters proxy varken erişimi genişletin. | `127.0.0.1`                  |
| `CLIPROXY_BIND_HOST`          | docker-compose'un `cliproxyapi` yardımcı konteynerini yayımladığı ana makine arayüzü — veri birimi sağlayıcı kimlik bilgilerini barındırır.                                                                                                                                       | `127.0.0.1`                  |
| `OMNIROUTE_PLUGINS_DIR`       | Çalışma zamanı eklenti tarayıcısının okuduğu ve kurulum yaptığı dizin. Eklentiler bağlama yoluyla monte edildiğinde bunu ayarlayın: varsayılan değer, bir imajın dışa aktarması gerekmeyen `HOME` değişkenini izler.                                                              | `~/.omniroute/plugins`       |
| `OMNIROUTE_BASE_PATH`         | Uygulama bir ters proxy arkasında yayımlandığında kullanılan URL alt yolu (ör. `/omniroute`)                                                                                                                                                                                      | _(boş = kök)_                |
| `NEXT_PUBLIC_BASE_URL`        | Alt yolu içeren genel tarayıcı kaynağı (ör. `https://host/omniroute`)                                                                                                                                                                                                             | ayarlanmamış                 |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` için ana makine tarafındaki pano bağlantı noktası                                                                                                                                                                                                       | `20130`                      |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yardımcı konteyneri için ana makine tarafındaki bağlantı noktası                                                                                                                                                                                                    | `8317`                       |

## Bir Alt Yolda Ters Proxy (Traefik / nginx)

Next.js `basePath` bağımsız pakette derlenmiştir. OmniRoute pişmiş değeri uygulama kökündeki bir sentinel dosyasına kaydeder ( `npm run build` sırasında yazılır; `scripts/docker/ensure-docker-base-path.mjs` tarafından okunur) ve kap başlatıldığında bunu `OMNIROUTE_BASE_PATH` ile karşılaştırır. Bunlar farklılaştığında ve görüntü etki alanı kökü için oluşturulduğu zaman, giriş noktası bağımsız bildirimleri, gömülü `basePath`/`assetPrefix` değişmezlerini yeniden yazar (Sonraki 16, SSR varlığını URLs yalnızca `assetPrefix` işler — yamalı alt yolu ona yansıtır), pişmiş `/_next/static` varlığı URLs (istemci referans bildirimleri, medya içe aktarmaları, önceden oluşturulmuş hata sayfaları) ve `node dev/run-standalone.mjs` çalıştırılmadan önce istemci `process.env` dolgusunu yeniden yazar.

### Derleme oluştur (önerilir)

Her iki değişkeni de `.env` olarak ayarlayın, ardından görüntü ve çalışma zamanının aynı olması için yeniden oluşturun:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker build-arg ve çalışma zamanı ortam değişkeni olarak iletir.

### Önceden oluşturulmuş kök görüntüsü + çalışma zamanı alt yolu

Yayınlanan `cheaperinference/omniroute:*` görselleri alan adı kökü için oluşturulmuştur. Çalışma zamanında `OMNIROUTE_BASE_PATH` hala ayarlayabilirsiniz; kapsayıcı başlangıçta paketi bir kez yamalar. Eşleşen genel kaynakla eşleştirin:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

İletmek için ters proxy'yi yapılandırın** tam dolu** harici yol (ön eki çıkarmayın). Traefik `PathPrefix(`/omniroute `)` `StripPrefix` olmadan konteynere yönlendirmelidir, böylece Next.js `/omniroute/...` alır ve `/omniroute/_next/...` varlıklara hizmet eder.

Docker sağlık kontrolü, etkin `OMNIROUTE_BASE_PATH` ön ekine sahip hafif `/healthz` yaşam döngüsü uç noktasını araştırır. `/api/monitoring/health` human/dashboard tanılaması için kullanılabilir durumda kalır; HEALTHCHECK kapsayıcısını ona doğru yönlendirmek için (örneğin kapsamlı sağlık uygulaması için), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ayarlayın. Bu yol bir** derin** kontrol edin (DB + izleme özeti) — tekrar etkinleştirirseniz Docker nadir `HEALTHCHECK` için uygundur, ancak** Olumsuz** Kubernetes `livenessProbe` aralıkları için.

Orkestratörler için (Kubernetes, Nomad vb.):

| Prob              | Tercih etmek                                                                    | Kaçınmak                                                            |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| canlılık          | HTTP `GET /livez` veya ana bağlantı noktasında TCP (`PORT`, varsayılan `20128`) | canlılık olarak `/api/monitoring/health`                            |
| Hazırlık          | HTTP `GET /healthz`                                                             | Olay döngüsü meşgulünü ölü olarak değerlendiren sıkı zaman aşımları |
| Derin / kara kutu | `/api/monitoring/health`                                                        | —                                                                   |

`/healthz` süreç yaşam döngüsünü (`ok` / `starting` / `stopping`) raporlar. `/livez` yalnızca canlı bir süreçtir (işleyici çalışabildiğinde 200; hazır olmayı beklemez). Her ikisi de hala istek işlemeyle aynı Düğüm olay döngüsünde çalışıyor, bu nedenle CPU'ya bağlı katalog veya sıkıştırma çalışması onları geciktirebilir — meşgul ≠ ölü. HTTP araştırmaları zaman aşımına uğrarsa TCP canlılığını tercih edin. Tam araştırma kılavuzu: [İzleme kılavuzu — Kubernetes araştırma önerileri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Caddy ile Oluşturun (HTTPS Auto-TLS)

OmniRoute Caddy'nin otomatik SSL provizyonu kullanılarak güvenli bir şekilde açığa çıkarılabilir. Etki alanınızın DNS A kaydının sunucunuzun IP işaret ettiğinden emin olun.

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

Caddy, yukarı akış konteyneri için standart yönlendirme başlıklarını ayarlar. OmniRoute OAuth geri çağrıları ve oluşturulan genel bağlantılar için standart genel kaynak olarak `NEXT_PUBLIC_BASE_URL` kullanır; kimliği doğrulanmış kontrol paneli yazma işlemleri, aynı kaynaklı isteklerin yanı sıra oturuma bağlı CSRF korumasını kullanır. `OMNIROUTE_TRUST_PROXY` yalnızca OmniRoute açık yapılandırma yerine genel kaynağı güvenilen iletilen başlıklardan türetmesini kasıtlı olarak istediğiniz gelişmiş dağıtımlar için etkinleştirin.

## Cloudflare Quick Tunnel

Docker dağıtımları için pano desteği, `Dashboard → Endpoints` altında tek tıklamayla kullanılabilen bir **Cloudflare Quick Tunnel** içerir. İlk etkinleştirme, yalnızca gerektiğinde `cloudflared` dosyasını indirir, mevcut `/v1` uç noktanıza geçici bir tünel başlatır ve oluşturulan `https://*.trycloudflare.com/v1` URL'sini normal herkese açık URL'nizin hemen altında gösterir.

Uç nokta tüneli panelleri (Cloudflare, Tailscale, ngrok), etkin tünel durumu değiştirilmeden `Settings → Appearance` bölümünden gösterilebilir veya gizlenebilir.

### Tünel Notları

- Quick Tunnel URL'leri geçicidir ve her yeniden başlatmadan sonra değişir.
- Quick Tunnel'lar, OmniRoute veya kapsayıcı yeniden başlatıldıktan sonra otomatik olarak geri yüklenmez. Gerektiğinde bunları panodan yeniden etkinleştirin.
- Yönetilen kurulum şu anda `x64` / `arm64` üzerinde Linux, macOS ve Windows'u destekler.
- Yönetilen Quick Tunnel'lar, kısıtlı kapsayıcı ortamlarında gürültülü QUIC UDP arabellek uyarılarını önlemek için varsayılan olarak HTTP/2 aktarımını kullanır. Farklı bir aktarım istiyorsanız `CLOUDFLARED_PROTOCOL=quic` veya `auto` olarak ayarlayın.
- Docker imajları, sistem CA köklerini içerir ve bunları yönetilen `cloudflared` işlemine aktarır; böylece tünel kapsayıcı içinde başlatılırken TLS güven hataları önlenir.
- OmniRoute'un bir dosyayı indirmek yerine mevcut bir ikili dosyayı kullanmasını istiyorsanız `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` olarak ayarlayın.

## Resim Etiketleri

| Resim                        | Etiket   | Boyut   | Tanım                                                      |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | En yüksek** yayınlandı** kararlı SemVer (git `main` değil) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Bu etiket sınıfını GitOps için sabitle                     |

Aynı görüntüler, aynı mimari özetlerle üç depoda yayınlanır: `cheaperinference/omniroute` (Docker Hub, Ucuz Çıkarım organizasyonu, 3.8.53'ten itibaren), `ghcr.io/cheaper-inference/omniroute` ve çekme geçmişini tutan ve yine de her sürümü alan eski `diegosouzapw/omniroute`. Mevcut `diegosouzapw/omniroute` dağıtımları güncellenmeye devam ediyor; görüntü adını değiştirmek isteğe bağlıdır. Aşağıdaki `:next` / `:next-web` ön yayın kanalı yalnızca `diegosouzapw/omniroute` ve GHCR yayınlanmaktadır.

Çoklu platform manifestosu: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker eşleşen mimariyi otomatik olarak seçer; ARM ana bilgisayarlarında AMD64 emülasyonunu zorlamanız gerekiyorsa `--platform linux/amd64` iletin.

### Yayın Kanalları

OmniRoute kararlı sürümler, aktif sürüm şube testleri ve geliştirme yapıları için ayrı Docker kanalları yayınlamaktadır.

| Kanal                           | Kaynak                                     | Değişkenlik                              | Önerilen kullanım                                                                                                                                          |
| ------------------------------- | ------------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned sürümü                    | Değişmez                                 | Tam bir sürümü sabitleyen üretim dağıtımları                                                                                                               |
| `:latest` / `:latest-web`       | En yüksek** yayınlandı** istikrarlı SemVer | Değişken kararlı işaretçi                | Kararlı sürümleri takip eder** sonrasında** bir SemVer yayınlama işi — yaptığı** Olumsuz** `main` veya yayınlanmamış `release/v*` taahhütlerini takip edin |
| `:next` / `:next-web`           | Mevcut varsayılan `release/v*` şubesi      | Değiştirilebilir yayın öncesi işaretçisi | Aktif sürüm dalına ulaşan ancak henüz kararlı sürümde olmayan düzeltmelerin test edilmesi                                                                  |
| `:main` / `:main-web`           | `main` şubesi                              | Değişken geliştirme işaretçisi           | Yalnızca geliştirme ve entegrasyon testleri                                                                                                                |

#### Web oturumu sağlayıcıları: `-web` görüntüleri

Yukarıdaki her kanal, `runner-web` aşamasından — aynı görüntü artı Playwright ve bir Chromium tarayıcıdan oluşturulmuş bir `-web` etiketi (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) olarak ikiye katlanır. Düz görüntü gönderilir** olmadan** Krom; `gemini-web`, `claude-web` ve `claude-turnstile` buna ihtiyacı var.

Arıza, başlangıç zamanı değil ertelenir: bu sağlayıcılar modellerini listeler ve kontrol panelinde bağlı olarak gösterirler ve yalnızca ilk istek başarısız olur.

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Bu sağlayıcıları kullanıyorsanız, halihazırda — olduğunuz kanalın `-web` etiketini çekin, başka hiçbir şey değişmez. Bir npm/CLI kurulumunda ( Docker görüntüsü yok), eşdeğer eksik parça tarayıcı ikili dosyasıdır: Ana bilgisayarda `npx playwright install chromium` çalıştırın.

#### Yayın öncesi kanalı kullanma

`next` kanalı, mevcut varsayılan `release/v*` dalına yapılan her gönderimde yeniden oluşturulur ve hem AMD64 hem de ARM64 için yayınlanır. Daha eski bakım dalları bunun üzerine yazamaz. Kanal, bir sonraki kararlı etiket kesilmeden önce aktif sürüm dalıyla birleştirilen düzeltmeler için çekilebilir bir görüntü sağlar.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose için seçilen profil tarafından kullanılan resim etiketini geçersiz kılın, ardından hizmeti çekip yeniden oluşturun:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Güvenlik ve geri alma

`next` değişken bir ön yayın kanalıdır. Aktif sürüm dalına yapılan herhangi bir baskıda değişebilir ve** üretimde kullanım için desteklenmiyor** . Belirli bir yapıyı değerlendirirken görüntü özetini sabitleyin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Test etmeden önce OmniRoute veri birimini veya bağlamaya bağlı veri dizinini yedekleyin. Geri almak için önceden kullanılan kararlı sürümü geri yükleyin veya kapsayıcıyı özetleyip yeniden oluşturun:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Bir sürüm şubesi yapısı asla `latest` hareket ettiremez; yalnızca uygun bir kararlı anlamsal sürüm, kararlı işaretçiyi destekleyebilir. `next` görüntüleri, yayın görüntüsü incelemesini ve KRİTİK güvenlik açığı kapısını engellemeyi korur.

**`latest` git için bir para birimi garantisi değildir.** `main` veya aktif `release/v*` dalındaki birleştirilmiş düzeltmeler** Olumsuz** kararlı bir SemVer görüntüsü yayınlanana ve yayınlama işi `:latest` ( SemVer ile aynı özet) destekleyene kadar `:latest`. GitHub zaten düzeltmeyi gösterirken `latest` donmuş görünüyorsa, serbest bırakma dalını test etmek için `:next` çekin veya SemVer etiketini bekleyin.

| Sen istiyorsun                                                               | Kullanmak                                 |
| ---------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / sürüklenmemesi gereken üretim                                       | `:X.Y.Z` sabitleyin (veya görsel özetini) |
| Yayınlanan ahırları takip edin ve her sürümde yeniden oluşturmayı kabul edin | `:latest`                                 |
| Yayınlanmamış `release/v*` taahhütlerini test edin                           | `:next` (üretim değil)                    |
| `main` test edin                                                             | `:main` (üretim değil)                    |

## Docker'da pano güncellemeleri

Yayımlanmış bir imajdan oluşturulan container kendini değiştiremez. OmniRoute, bir container
içinde çalıştığını algıladığında (`.git` çalışma kopyası yoksa ve npm kurulumu değilse), ana panodaki güncelleme başlığı
npm/git talimatları yerine çalıştırılacak host komutunu bir kopyalama düğmesiyle gösterir:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Servis adı `AUTO_UPDATE_SERVICE` üzerinden alınır (varsayılan olarak `omniroute`;
`docker-compose.selfhost.yml` içindeki servis). `pull` yalnızca hareketli bir etiketi (`latest`, `next`) günceller;
sabitlenmiş bir `:X.Y.Z` etiketi kullanıyorsanız önce etiketi düzenleyin.

### Host tetikleyici dosyasıyla tek tıklamalı güncellemeler

Host üzerinde container'a root erişimi veren `/var/run/docker.sock` dosyasını bağlamadan
(**Update Now** özelliğini çalışır durumda tutmak için yukarıdaki `cli` profili uyarısına bakın),
OmniRoute servisinde `DOCKER_UPDATE_TRIGGER_FILE` değişkenini ayarlayın ve host üzerinde bir izleyici çalıştırın:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Yol `DATA_DIR` içinde olmalıdır (göreli değerler buna göre çözümlenir); diğer tüm yollar
reddedilir. Ardından **Update Now**, söz konusu dosyaya
`{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` yazar, `202` yanıtı verir ve yeni sürüm
etkinleşip sayfa yeniden yüklenene kadar pano `/api/system/version` uç noktasını yoklar. OmniRoute bu modda
hiçbir zaman shell veya Docker komutu çalıştırmaz. Her güncelleme işleminde olduğu gibi istek yalnızca
loopback/LAN istemcilerinden kabul edilir.

Bind mount ile bağlanmış bir veri dizini, host'a izlenecek kararlı bir yol sağlar. Örnek `systemd` birimleri
(`/srv/omniroute` yolunu compose dosyanızı ve `data/` dizinini içeren dizine göre ayarlayın):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute pano güncelleme isteklerini izle

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute container'ını çek ve yeniden oluştur

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

Servis, başarısız bir çalıştırmanın döngüye girmemesi için çekme işleminden önce istek dosyasını kaldırır.
`DOCKER_UPDATE_TRIGGER_FILE` olmadan pano, manuel komut akışını kullanmaya devam eder.

## Kullanılabilirlik: varsayılan SQLite tek kopyadır

Stok Docker / Kubernetes OmniRoute :** bir Düğüm süreci + bir SQLite yazıcı** . Yüksek kullanılabilirlik** desteklenmiyor** bu topoloji üzerinde.

| Kısıtlama                                           | Sonuçlar                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tek yazar                                           | Yapmak** Olumsuz** aynı SQLite dosyasında birden fazla kopya çalıştırın. Bu DB bozar.                                                                                                                                                                                                             |
| Yeniden oluştur / yeniden başlat / HEALTHCHECK kill | **Tam kesinti** uçuş içi SSE, kontrol paneli oturumları ve bellek içi durum. Bağlı her istemci düşer. Boş uç nokta penceresi sırasında yeni istekler ters proxy alır**`502 Bad Gateway: Unknown error`** , OmniRoute JSON değil — istemciler bunu bir sağlayıcı hatasından ayırt edemez (#11015). |
| `/healthz` ile aynı olay döngüsü                    | Meşgul bir katalog veya sıkıştırma işareti, araştırmaları geciktirebilir; kısa bir zaman aşımı ardından yeniden başlatır** sadece** kopya.                                                                                                                                                        |

**Prob matrisi** (Ayrıca bkz. [Kubernetes araştırma önerileri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Prob             | Hedef                                                       | Kullanma                                                            |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| canlılık         | TCP `PORT` varsayılan `20128`) veya yumuşak HTTP `/healthz` | `/api/monitoring/health`                                            |
| Hazırlık         | HTTP `GET /healthz`                                         | Olay döngüsü meşgulünü ölü olarak değerlendiren sıkı zaman aşımları |
| Derin / insanlar | `/api/monitoring/health`                                    | Otomatik kubelet canlılığı                                          |

**Yükseltmeler:** Her oturumun düşmesini bekliyoruz. Mümkünse müşterileri boşaltın; varsayılan SQLite sürekli güncelleme yoktur. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` konteyner Sağlıksız olduğunda (aynı patlama yarıçapı) tek işlemin yerini alacaktır.

Hazır bildirimler ve Helm grafiği `deploy/kubernetes/` ve `deploy/helm/omniroute/` yayında — [Kubernetes dağıtım kılavuzuna](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) bakın.

Kubernetes snippet'i** tek kopya** (Yeniden oluşturma gereklidir; `replicas` bir SQLite dosyasına karşı yükseltmeyin):

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

`preStop` uyku, kube'nin SIGTERM önce Hizmet uç noktalarını bırakmasına izin verir, böylece** yeni** trafik ölme sürecine çarpmayı bırakır. Uçuş sırasındaki `/v1/responses` SSE ağır giriş kiralamaları (#11015) aracılığıyla `SHUTDOWN_TIMEOUT_MS` (varsayılan 30 saniye) kadar boşaltılır. Hala sürece ulaşan yeni istekler `503` + `Retry-After: 5` alır. Değiştirme Hazır olana kadar boş uç nokta boşluğunu yeniden oluştur, ciddi bir kesinti olmaya devam eder; bu, bir prob yanlış yapılandırması değil, SQLite topolojisidir.

Harici Postgres / çoklu yazarlı HA** Olumsuz** belgelenmiş bir stok yolu. HA ihtiyacınız varsa tek bir kopya tutun veya projenin ayrı olarak test ettiği ve belgelediği bir topolojiyi çalıştırın. Postgres/MySQL çalışması [#8075'te](https://github.com/diegosouzapw/OmniRoute/issues/8075) yaşıyor. O gemiye kadar çoğalmanın desteklenen tek yolu** büyük** `/v1/responses` kapasitesi, tek bir birimdeki `replicas > 1` değil, N bağımsız süreçtir (sonraki bölüm).

## Ölçeklendirme: N bağımsız süreç

### Codex token rotasyon sahipliği

Bir Codex hesabının kopyaları, tek kullanımlık yenileme jetonunu bağımsız olarak tüketmemelidir. Yalnızca senkronize edilmiş kimlik bilgilerini kullanan örneklerde `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (takma ad `cx`) ayarlayın. Tek rotasyon sahibinde bunu ayarlamadan bırakın. Her sürecin hâlâ kendi `DATA_DIR` ihtiyacı vardır; bu seçenek ne SQLite paylaşır ne de belirteç senkronizasyonu veya dağıtılmış kilit sağlar.

Pasif örnek, yenileme gerektiğinde bağlantıyı yeniden okur ve yalnızca farklı, süresi dolmamış bir erişim belirtecini benimser. Aksi takdirde yenileme, bağlantının süresi dolmadan veya devre dışı bırakılmadan veya bir yenileme kesici hatası sayılmadan devre dışı bırakılır. Gerçek yukarı akış kimlik doğrulama hataları hala normal hata hesaplamasını, üstel bekleme süresini ve normal istemci hatasını kullanıyor; Hesabın devre dışı bırakılması kalıcı olarak kalır. Erişim belirteçlerinin süresi dolmadan önce sahibinin döndürülen belirteçlerini senkronize edin (varsayılan proaktif yenileme süresi beş dakikadır) veya Codex kimlik doğrulama dosyasını yeniden içe aktarın. Pasif içe aktarmalar, sağlanan belirteçleri, belirteç uç noktasında doğrulamadan saklar. Manuel dashboard/API yenileme `409 refresh_disabled` değerini döndürür; yeni OAuth oturum açma bilgileri değişmedi. Bkz. [ortam referansı](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Bir Düğüm süreci** bir V8 yığını** . Üst üste binen iki ~ 3 MiB / ~ 750k-token kodlama aracısı `POST /v1/responses` (RTK + Caveman), ~ 12 Gi (`FATAL ERROR: Reached heap limit`)'deki yığını iptal eder ve 16 Gi cgroup'u OOM edebilir. Bkz. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Bu ölçüm bir** bellek bütçesi** uyarı, hard-max iki eşzamanlı uzun `/v1/responses` ürünü değil. Ağır sohbet kabulü, aynı V8/cgroup tavanından boyutlandırılmış otomatik olarak türetilmiş bir besleme bayt bütçesi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) tarafından engellenir — zaten boyutlandırılmış bir süreçte bunu yukarı doğru geçersiz kılar (veya eski `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` istek sayısı sınırını ayarlayarak) iptali yeniden başlatır. Küçük sohbetler, `/healthz`, `/v1/models` ve MCP** Olumsuz** o şapkanın içinde.

### Tek işlem: ikiden fazla uzun `/v1/responses`

A** sağlıklı** süreç ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` altındaki yığın, varsayılan `0.75`)** mayıs** süreç genelindeki uçuş bayt bütçesinde (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hala yer olduğunda ikiden fazla eşzamanlı uzun `POST /v1/responses` çalıştırın. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (varsayılan 256 KiB) veya üzerindeki gövdeler, yapı ağırlıklı isteklerle aynı ağır kiralamayı alır ve aynı [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` kaçışını (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) kullanır. Onlarca eşzamanlı uzun SSE istemcisi (operatörler genellikle 40-50'ye ihtiyaç duyar)** bellek bütçesi** soru — boyutu yığın + primary/headroom yuvaları + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — zor bir “maksimum 2” ürün sınırı değildir. Baskılı bir yığın yeniden denenebilir `503` ile hala tutuluyor, dolayısıyla #7849 geri dönmüyor.

İle** yığınları çoğalt** (bağımsız V8 eski alanları)** Bugün** :

| Yapmak                                                                                                                                       | Yapamaz                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Koşmak** N containers/pods** , her biri kendi** sahip olmak** `DATA_DIR` / hacim                                                             | `replicas > 1` bir SQLite dosyasına göre ayarlayın             |
| Yığın / uçuş bayt bütçesinden ağır uçuş sırasında + sağlıklı boşluk payı; 1-2, muhafazakar #7849 varsayılanıdır, maksimum sert ürün değildir | Bir işleme 8 × RAM ve sınırsız bir sayım sınırı verin          |
| İsteğe bağlı: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` için** paylaşılan kota sayaçları**                                        | Redis paylaşılan SQLite — gibi davran                          |
| Sağlayıcı sırlarını her bir örneğe kopyalayın (veya bölümlenmiş kontrol panellerini kabul edin)                                              | Örnekler arasında bir kontrol paneli/bir çağrı kaydı bekleyin  |
| Herhangi bir yük dengeleyiciyle ön; API anahtarı veya oturumu ile yapışkanlık yeterlidir                                                     | Satıcıya özel, boyuta duyarlı bir ara katman yazılımı gerektir |

Oturumdan hesaba benzeşim aynı zamanda Redis aracılığıyla da paylaşılabilir: her işlemde aynı `REDIS_KEY_PREFIX` ve pozitif `sessionAffinityTtlMs` ayarıyla `OMNIROUTE_SESSION_AFFINITY_STORE=redis` ve `REDIS_URL` ayarlayın. Pinler, karma kullanımlı hesap kimliklerini her işlemin uygun yerel bağlantısına çözer; dolayısıyla eşleşen kimlik meta verilerine sahip OAuth hesaplarının eşleşen IDs bağlantısına sahip olması gerekmez. Bilinen hesap kimlikleri, pin çözümünde ve korumalı tahliyede çelişkili yerel IDs göre önceliklidir; kimliği olmayan kayıtlar (veya kimliği olmayan tahliye arayanlar) eski ID korumasını korur. Sabit bir kullanım kimliğine sahip olmayan hesaplar yine de IDs ile eşleşmeyi gerektirir. Redis hataları veya 100 ms'yi aşan çağrılar yerel SQLite geri döner. Her Redis benzeşim deposu olağanüstü işlemleri 8 ile sınırlandırır, dolduğunda Redis hemen atlar ve yuvaları arayanın son teslim tarihinde değil, yalnızca temel iş yerleştiğinde serbest bırakır. Redis kesintisi sırasında paylaşılan bir gerçek yoktur: her örnek kendi yerel benzeşimine geri döner, oturumlar örnek başına bir kez yeniden sabitlenebilir ve örnekler farklılaşabilir. Yapışkanlık düzeldiğinde Redis aracılığıyla yeniden birleşir. Zaman aşımı, geri dönüşten sonra inebilecek gönderilen bir EVAL değil, beklemeyi sınırlar. Yönlendirme yazmaları, yeni bir mutasyon zamanı okumasını değil, yönlendirme kararı tarafından gözlemlenen tam değeri karşılaştırır; gözlemlenen bir kayıp veya SQLite geri dönüş gözlemi, eksik bir Redis anahtarıyla karşılaştırılır. Eski pinler tek bir CAS değiştirilir, dolayısıyla geç bir komut daha yeni, farklı bir pini değiştiremez veya silemez. Redis okur, değeri ve kalan sunucuyu atomik olarak döndürür TTL; pozitif PTTL (veya süre sonu olmaması) canlılığı belirler, yazarın JSON zaman damgasını veya okuyucunun saatini değil. Yerel anlık görüntüler, kalan TTL yerel bir son tarihe kadar eşleştirir; mevcut JSON anahtarları okunabilir durumda kalır ve bunların ham baytları CAS için korunur. Redis cevap verirken gerçeğin tek kaynağıdır. Onaylanan paylaşılan yükseltmeler, dokunuşlar ve silmeler yerel girişi kaldırır, asla kurmayın veya yenilemeyin. Redis yolundaki SQLite daha önce olduğu gibi TTL ile sınırlı olarak yalnızca bu örneğin Redis hatalarından, zaman aşımlarından veya kabul doygunluğundan kaynaklanan kendi geri dönüş kararlarını tutar. Daha sonraki bir kesintide eksik bir yerel pin, yanlış veya tahliye edilmiş bir hesaba değil, bir yeni seçime (bir anlık önbellek kaçırma) mal olur. Reddedilen yükselişler, paylaşılan kazananı ve kalan TTL atomik olarak döndürür: sıradan seçim, eşlenen yerel son tarihi yeniden kontrol eder ve hala canlı olan uygun bir kazananı kullanır, kullanıma dokunur ve başka bir paylaşılan yazma olmadan bu hesap için oturum açar. Mevcut değilse, seçim yerel adayı korur, paylaşılan pini değiştirmeden bırakır ve bir hata ayıklama mesajı gönderir. Reddedilen CAS SQLite yazmaz; Redis hataları, zaman aşımları veya kabul doygunluğu bunun yerine mevcut yerel işlemi uygular. Gönderilen bir mutasyonun yanıtı zaman aşımından sonra (kabul edildi, reddedildi veya hata) gelirse, senkronize bir tam serileştirilmiş değer karşılaştırma ve silme işlemi yalnızca baytla aynı zaman aşımı geri dönüş satırını kaldırır. O karşılaştırma ile silme arasında hiçbir bekleme yoktur; daha yeni bir kesinti yazma işlemi korunur. Korumalı tahliye, Redis kapalı olsa bile başarısız olan hesabın kendi yerel pinini kaldırır ve paylaşılan tahliye onaylandıktan sonra tekrar temizler. Bekleyen daha önceki paylaşılan yanıtlar, çıkarılan bir yerel pini geri yükleyemez çünkü paylaşılan başarılar hiçbir zaman SQLite yazmaz. Daha sonraki bir kesinti geri dönüşü, bir hesabı yeniden tanımlayabilir; daha sonra kabul edilen bir paylaşılan yazma yalnızca Redis mevcuttur. Redis hatalarında yerel geri dönüş durumuna başvurmaz. Sürücü kapalıyken, yeni seçilen pinler eski dört alanlı SQLite JSON şeklini korur; yalnızca Redis yönlendirmesi karma hesap kimliğini ekler. Önceden getirilen pinler, son kullanma sınırlarında yeniden kontrol edilir. Redis kiralama dışı seçim, depoyu yeniden okur, ancak eşzamanlı kiralama planlaması, önceden alma ve planlama arasında çıkarılan bir pini kullanmaya devam edebilir (kabul edilen en iyi çaba penceresi). Kira taahhüdü, kalıcı bir hak talebinden sonra hesap değiştiremez: reddedilen bir artış durumunda, yalnızca bu istek için talep edilen adayı tutar ve paylaşılan kazanana dokunulmaz, dolayısıyla örnekler arasındaki anlaşma bu yol ile sınırlıdır. Tablonun geri kalanı hala geçerlidir: bu, birleşik oturum yapışkanlığını, yerel Codex dönüş pinlerini, hesap semaforlarını, kilitlemeleri, harcama limitlerini, yapılandırmayı veya çağrı günlüklerini paylaşmaz.

Donanım: örnek başına eşzamanlı uzun `/v1/responses` bir** bellek bütçesi** soru (yığın + uçuş baytı / #10110). `N` bağımsız `DATA_DIR` hâlâ yığınları çoğaltır: RAM ana bilgisayarı "N = 8'e sahip bir 16 Gi pod"u değil, `N × cgroup` kapsamalıdır. Asla bir SQLite dosyasında `replicas > 1`.

Taslak oluşturun (iki yığın, iki cilt — değil `deploy.replicas: 2`):

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

İşlem içi yoğunluk ( HTTP izolatının sıkıştırılması) [#11023'tür](https://github.com/diegosouzapw/OmniRoute/issues/11023). Paylaşılan dayanıklı durumdaki mantıksal kümelerden biri [#8075'tir](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker içindeki Gemini bölgesel hataları

Google AI Studio / Gemini API FAILED_PRECONDITION ve `User location is not supported for the API use.` ile HTTP 400 döndürebilir Ana bilgisayardaki başarılı bir istek, konteynerin aynı giden yolu kullandığını kanıtlamaz. DNS sıralaması, IPv4/IPv6 bağlantısı, VPN yönlendirmesi ve yapılandırılmış proxy'ler farklılık gösterebilir. [Google desteklediği bölgelerin](https://ai.google.dev/gemini-api/docs/available-regions) yanı sıra gerçek bağlantı yolunu da kontrol edin; Bu hata tek başına hatalı bir API anahtarını tanımlamaz.

### Bağlantıya özel bir proxy tercih edin

Etkilenen Gemini bağlantısı için OmniRoute[bağlantı başına proxy yapılandırmasını](../ops/PROXY_GUIDE.md#4-level-proxy-system) kullanın ve işlemi tekrarlayın** Bağlantıyı Test Et** ve aynı modelle küçük bir istek. Bu, yönlendirme değişikliğinin söz konusu bağlantı kapsamında kalmasını sağlar. Proxy'ye kapsayıcıdan erişilebildiğini ve bağlantının onu gerçekten seçtiğini doğrulayın. Rotayı değiştirmek, yukarı havza bölgesel uygunluğunu garanti etmez.

### Ana bilgisayar ve konteyner ağını karşılaştırın

Kimliği doğrulanmış sonuçları karşılaştırırken anahtarı, modeli ve isteği aynı tutun; Kimlik bilgilerini, proxy şifrelerini veya tam yetkilendirme başlıklarını asla bir soruna yapıştırmayın. Öncelikle ana bilgisayarda ve kapsayıcının içinde aynı komutu kullanarak OS çözümleyicinin hangi adres ailelerini sunduğunu inceleyin:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` çalıştırdığınız hizmetle değiştirin (örneğin, `omniroute-web`). Bu komutlar, kimlik bilgileri veya IP adresleri olmadan adres ailelerini yazdırır. Döndürülen bir `6` yalnızca IPv6 DNS sonucunu gösterir: öyle olur** Olumsuz** Kullanılabilir bir IPv6 rotasını veya API erişimini kanıtlayın. `curl` kurulu olduğu yerde, her iki ortamda da `curl -4 -I https://generativelanguage.googleapis.com` `curl -6 -I https://generativelanguage.googleapis.com` ile karşılaştırın. Bir HTTP yanıtı, kimliği doğrulanmamış bir hata olsa bile o araştırma için bağlantıyı kanıtlar; yalnızca kimliği doğrulanmış model isteği Gemini'nin uygunluğunu test eder.

### Ana bilgisayar düzeyinde alternatif: çalışan IPv6 ve çözümleyici politikası

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) muhabiri, IPv6 konteynerini etkinleştirerek ve glibc adres seçimini değiştirerek kendi ortamındaki erişimi yeniden sağladı. Bunu çevreye özgü bir alternatif olarak değerlendirin. Çözümleyici tercihlerini ayarlamadan önce çalışan ana bilgisayar IPv6, kapsayıcı egress/routing ve güvenlik duvarı kurallarını onaylayın. Özel bir ULA adresi tek başına genel IPv6 bağlantısı kurmaz.

Compose'un varsayılan ağına zaten bağlı olan hizmetler için bu parça, o ağda IPv6 etkinleştirir; Hizmetinizin geri kalanını, bağlantı noktalarını, birimleri ve yapılandırmayı koruyun:

```yaml
networks:
  default:
    enable_ipv6: true
```

Adlandırılmış bir ağ için, onu hizmetin gerçekten katıldığı ağda etkinleştirin. Docker bir ULA alt ağı tahsis edebilir; yalnızca ağınız gerektirdiğinde açık, örtüşmeyen bir alt ağ seçin. Bkz. [Docker IPv6 ağ iletişimi](https://docs.docker.com/engine/daemon/ipv6/) ve [Ağ oluşturma seçenekleri](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

bir** glibc tabanlı görüntü** , `/etc/gai.conf` adres seçimini değiştirebilir. Mevcut Dockerfile deposu Debian'ı kullanıyor; özel musl tabanlı görüntüler bu mekanizmayı paylaşmaz. Bildirilen düzenleme, ULA etiketini `label fc00::/7 6` `label fc00::/7 1` değiştirir. Görüntünün tam politika tablosundan başlayın ve diğer girişlerini koruyun: bir `label` veya `precedence` girişi eklemek, bu varsayılan tablonun yerini alır, bu nedenle yalnızca değiştirilen satırı içeren bir dosya yeterli değildir. [Glibc yapılandırma referansı](https://github.com/bminor/glibc/blob/master/posix/gai.conf) bu anlambilimi belgelemektedir. İncelenen dosyayı salt okunur olarak `/etc/gai.conf` bağlayın ve uygulamak için hizmeti yeniden oluşturun.

Bu, OS adresi seçimini değiştirir** o kapsayıcıdaki tüm giden trafik** . Her uygulamayı IPv6 seçmeye zorlamaz: Düğümün DNS sırası ve bağlantı seçimi de önemlidir. Özellikle `--dns-result-order=ipv4first`, IPv4 tercih eder ve IPv4-only başarısızlığına çare değildir. Bkz. [Düğüm DNS sıralaması](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Ana makine düzeyinde herhangi bir değişiklikten sonra Gemini'yi ve diğer sağlayıcılarınızı yeniden test edin. Geri almak için özel `gai.conf` montajını kaldırın, önceki ağ yapılandırmasını geri yükleyin ve bakım penceresi sırasında etkilenen service/network yeniden oluşturun. Bir ağı yeniden oluşturmak, ona bağlı diğer kapsayıcıları kesintiye uğratabilir; kalıcı veri birimini silmeyin.

## Önemli Notlar

- **SQLite WAL Modu:** OmniRoute'un en son değişiklikleri `storage.sqlite` dosyasına denetim noktası olarak yazabilmesi için `docker stop` işleminin tamamlanmasına izin verilmelidir. Paketlenmiş Compose dosyalarında 40 saniyelik durdurma ek süresi zaten ayarlanmıştır. İmajı doğrudan çalıştırıyorsanız `--stop-timeout 40` ayarını koruyun.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Rutin/yazma öncesi yedeklemeler harici olarak yönetiliyorsa `true` olarak ayarlayın. Mevcut veritabanı geçişleri yine de kendilerine ait kalıcı bir güvenlik anlık görüntüsü ve toplu geçiş koruması gerektirir.
- **Veri Kalıcılığı:** Konteyner yeniden başlatmalarında veritabanınızı, anahtarlarınızı ve yapılandırmalarınızı korumak için her zaman `/app/data` konumuna bir birim bağlayın.
- **Port Yapılandırması:** Varsayılan `20128` portunu değiştirmek için `PORT` ortam değişkenini geçersiz kılın.

## Ayrıca Bkz.

- [VM Dağıtım Kılavuzu](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare kurulumu
- [Fly.io Dağıtım Kılavuzu](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io'ya dağıtım
- [Ortam Yapılandırması](../reference/ENVIRONMENT.md) — Eksiksiz `.env` referansı
