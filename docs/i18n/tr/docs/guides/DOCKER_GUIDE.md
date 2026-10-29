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

## Hızlı Çalıştırma

> **Tek komutla kendi sunucunuzda barındırmak mı istiyorsunuz?**  
> [Kendi Sunucunuzda Barındırma Kılavuzu'na](../getting-started/SELF_HOST_GUIDE.md) bakın —
> `docker compose -f docker-compose.selfhost.yml up -d` (yayımlanmış imaj +
> Redis, yalnızca geri döngü arayüzü, profil seçimi yok). Aşağıdaki Hızlı Çalıştırma,
> Redis'i hâlihazırda başka bir yerde çalıştıran kullanıcılar için tek konteynerli
> yöntemdir.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Ortam Dosyasıyla

```bash
# Önce .env dosyasını kopyalayın ve düzenleyin
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

## Dockerfile Aşamaları

Depo, çok aşamalı bir Dockerfile (`Dockerfile`) ile birlikte gelir. Dört aşama kullanıma sunulur; kullanım durumunuza uygun `target` değerini seçin.

| Aşama         | Temel imaj            | Amaç                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Bağımlılıkları yükler (`npm ci --legacy-peer-deps`) ve `npm run build` komutunu çalıştırır (varsayılan olarak Turbopack — aşağıdaki Derleme zamanı kaynakları bölümüne bakın)                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Next.js bağımsız çıktısını içeren üretim çalışma zamanı. **Sağlayıcı CLI'ları dahil değildir.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` ve genel CLI'ları ekler: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Aracı tabanlı iş akışları için bunu seçin.**                                                                                                                       |
| `runner-web`  | `runner-base`         | Web oturumu sağlayıcıları için Playwright ve bir Chromium tarayıcısı (`--with-deps`) ekler: `gemini-web`, `claude-web`, `claude-turnstile`. **Bu sağlayıcıları kullandığınızda bunu seçin** — düz imaj bunlar olmadan istek sırasında başarısız olur (Sürüm Kanalları altındaki `-web` notuna bakın). |

Belirli bir hedefi manuel olarak derleyin:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Derleme zamanı kaynakları

Üç derleme argümanı, `builder` aşamasının kaynak maliyetini kontrol eder. Bunlar yalnızca derleme zamanında geçerlidir —
`OMNIROUTE_MEMORY_MB` (aşağıda) ayrı bir çalışma zamanı ayarıdır.

| Derleme argümanı            | Varsayılan | Etki                                                                                                     |
| --------------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0`, webpack ile derler: daha düşük tepe bellek kullanımı, daha yavaş. `1`, Turbopack'i etkinleştirir.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Başlatılan `next build` için V8 yığın üst sınırı (`--max-old-space-size`).                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL` değerini besler; Next, sayfa verisi toplama için `workers = N - 1` değerini türetir. |

`OMNIROUTE_BUILD_WORKERS`, büyük bir derleyicide artırılması gereken ve kaynakları
kısıtlı bir derleme `✓ Compiled successfully` mesajından **sonra** başarısız olduğunda
şüphelenilmesi gereken ayardır. Her sayfa verisi işçisi ayrı bir işlemdir ve üst
`next build` işlemi de öyledir; canlı bir VPS yeniden üretiminde (issue #7518),
her işlemin tepe RSS değerinin `NODE_OPTIONS` yığın bayrağından bağımsız olarak
~4.5 GB olduğu ölçüldü (Turbopack, V8 yığınının dışındaki yerel/Rust belleğinde
derleme yapar). Varsayılan `2` değeri (→ 1 işçi, toplam 2 işlem), yayımlama işlem
hattının kullandığı 16 GB / 4 vCPU GitHub tarafından barındırılan çalıştırıcılar
için boyutlandırılmıştır. `8` değerinde (→ 7 işçi) bu çalıştırıcının belleği tükendi
ve buildkit, `ResourceExhausted: ... cannot allocate memory` hatasıyla adımı
başarısız kıldı; işlem başına RSS doğrudan ölçüldüğünde, çıkarım yoluyla hesaplanmak
yerine, `3` değeri (→ 2 işçi) bile sığmadı.
`tests/unit/docker-build-memory-budget.test.ts`, ölçülen değere göre hesaplama
yapar ve ayarlardan herhangi biri çalıştırıcının kapasitesini aşarsa başarısız olur.

Turbopack, V8 yığınının **dışında** bulunan yerel Rust belleğinde derleme yaptığından
`OMNIROUTE_BUILD_MEMORY_MB` bunu sınırlamaz. Bellek üst sınırı olan bir ana makinede
derleme, hiçbir hata metni olmadan OOM sonlandırıcısı tarafından SIGKILL ile
sonlandırılır — işlem `Creating an optimized production build` sırasında aniden
durur; bu da bellek yetersizliğinden ziyade takılma gibi görünür. Bu nedenle
`Dockerfile`, Turbopack'in kod düzeyinde varsayılan olduğu `npm run dev` /
`npm run build` komutlarından farklı olarak varsayılan biçimde webpack kullanır
(`OMNIROUTE_USE_TURBOPACK=0`): derleme argümanı olmadan çalıştırılan yalın bir
`docker build .` komutu (Railway ve diğer tek tıklamalı barındırma hizmetlerinin
çalıştırdığı biçim), belleği sınırlı bir derleyicide sessizce ölmemelidir.
Yayımlanan imajlar, `docker-publish.yml` içinde zaten açıkça
`OMNIROUTE_USE_TURBOPACK=0` değerini geçirir. Bol miktarda RAM'e sahip bir
derleyicide daha hızlı derleme için Turbopack'i etkinleştirin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` etkin olduğundan `next build`, bir üst işlem **ve** bir işçi
işlemi çalıştırır; her biri `OMNIROUTE_BUILD_MEMORY_MB` değerine ayrı ayrı uyar.
Kapsayıcı üst sınırını bu değerin bir katının değil, yaklaşık iki katının üzerinde
boyutlandırın.

Bu ağaç üzerinde ölçülen değerler (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketleyici | Kapsayıcı üst sınırı | Sonuç                                                |
| ----------- | -------------------- | ---------------------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB       | Her ikisinde de sessizce OOM nedeniyle sonlandırıldı |
| webpack     | 8 GiB                | Derleme işçisi SIGKILL ile sonlandırıldı             |
| webpack     | 12 GiB               | Başarılı oldu, tepe kullanım 11.1 GiB idi            |

### Çalışma zamanı varsayılanları

`runner-base` tarafından dışa aktarılan varsayılanlar: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker'daki bellek davranışı:

- İmaj `OMNIROUTE_MEMORY_MB=1024` değerini ayarlar ve bundan `NODE_OPTIONS=--max-old-space-size=1024` değerini türetir.
- Asıl sunucu işlemi, `OMNIROUTE_MEMORY_MB` değerini okuyan ve `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` seçeneğini ekleyen bağımsız başlatıcı tarafından başlatılır.
- Node, yinelenen `--max-old-space-size` değerlerinden sonuncusunu kullanır; dolayısıyla `OMNIROUTE_MEMORY_MB` ayarı etkin Docker heap sınırını kontrol eder.
- İmaj bu değeri her zaman ayarladığı için başlatıcının RAM'e göre kalibre edilen geri dönüş değeri Docker altında hiçbir zaman uygulanmaz. İş yüküne göre bu değeri açıkça artırın (aşağıdaki tablo). `2048`, kodlama ajanlarının `/v1/responses` istekleri için hâlâ çok küçüktür.

### Kodlama ajanları için çalışma zamanı RAM'i

1 GiB'lık varsayılan Docker değeri, üretim boyutu değil; gösterge paneli/hafif sohbet için alt sınırdır. Uzun `POST /v1/responses` gövdeleri (yüzlerce mesaj, onlarca araç), sıkıştırma sırasında birden fazla bellek içi grafiği tutar. Birbiriyle çakışan yaklaşık 3 MiB / yaklaşık 750 bin token'lık iki istek, **12 GiB** old-space değerinde V8'i durdurmuş (`FATAL ERROR: Reached heap limit`) ve ayrıca 16 GiB'lık cgroup OOM sınırına ulaşmıştır. Bkz. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

**cgroup `--memory` değerini heap'in üzerinde** boyutlandırın — yerel tamponlar, SQLite ve sıkıştırma ara verileri V8'in dışında bulunur.

| İş yükü                               | `OMNIROUTE_MEMORY_MB`     | Konteyner / cgroup               | Notlar                                                                                                                      |
| ------------------------------------- | ------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Gösterge paneli, tek hafif sohbet     | `1024` (imaj varsayılanı) | ≥2 GiB                           |                                                                                                                             |
| Tek kodlama ajanı (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                          | Tipik tek oturumlu `/v1/responses`                                                                                          |
| Eş zamanlı iki uzun `/v1/responses`   | `10240`–`12288`           | ≥12–16 GiB                       | Yaklaşık 12 GiB heap değerinde ölçülen V8 durması                                                                           |
| Eş zamanlı üçten fazla uzun bağlam    | tek işlemde kullanmayın   | seri çalıştırın / daha fazla RAM | Varsayılan ağır iş yükü kabul sınırı, devam eden 1 istektir; RAM'i artırmadan bu sınırı yükseltmek durmayı yeniden tetikler |

Çıplak metalde `omniroute serve`, `OMNIROUTE_MEMORY_MB` **ayarlanmamışsa** RAM'in yaklaşık %35'ine göre kalibrasyon yapar (`[512, 4096]` aralığıyla sınırlandırılmıştır). Docker her zaman `1024` değerini ayarladığı için bu kalibrasyon resmî imajda hiçbir zaman çalışmaz.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Alt Yol Üzerinde Ters Proxy (Traefik / nginx)

Next.js `basePath` değeri bağımsız pakete derlenir. OmniRoute, derlemeye gömülen
değeri uygulama kökündeki bir işaretçi dosyasına kaydeder (`npm run build` sırasında
yazılır; `scripts/docker/ensure-docker-base-path.mjs` tarafından okunur) ve konteyner
başlatıldığında bunu `OMNIROUTE_BASE_PATH` ile karşılaştırır. Değerler farklıysa ve imaj
alan adı kökü için derlenmişse giriş noktası, `node dev/run-standalone.mjs`
çalışmadan önce bağımsız manifestleri, gömülü `basePath`/`assetPrefix` sabit değerlerini
(Next 16, SSR varlık URL'lerini yalnızca `assetPrefix` üzerinden oluşturur — yama aracı
alt yolu buraya da yansıtır), derlemeye gömülü `/_next/static` varlık URL'lerini
(istemci referans manifestleri, medya içe aktarımları, önceden oluşturulmuş hata
sayfaları) ve istemci `process.env` uyumluluk katmanını yeniden yazar.

### Compose ile derleme (önerilen)

İmaj ve çalışma zamanı ayarlarının eşleşmesi için `.env` dosyasında her iki değişkeni
de ayarlayın, ardından yeniden derleyin:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` değişkenini hem Docker derleme argümanı
hem de çalışma zamanı ortam değişkeni olarak iletir.

### Önceden derlenmiş kök imajı + çalışma zamanı alt yolu

Yayımlanan `diegosouzapw/omniroute:*` imajları alan adı kökü için derlenmiştir. Yine de
çalışma zamanında `OMNIROUTE_BASE_PATH` ayarlayabilirsiniz; konteyner, başlatma sırasında
paketi bir kez yamalar. Bunu eşleşen herkese açık kaynak adresiyle birlikte kullanın:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ters proxy'yi **tam** harici yolu iletecek şekilde yapılandırın (öneki kaldırmayın).
Traefik, `StripPrefix` kullanmadan `PathPrefix(`/omniroute`)` yolunu konteynere
yönlendirmelidir; böylece Next.js `/omniroute/...` yolunu alır ve varlıkları
`/omniroute/_next/...` üzerinden sunar.

Docker sağlık denetimi, etkin `OMNIROUTE_BASE_PATH` ile öneklenmiş hafif `/healthz`
yaşam döngüsü uç noktasını yoklar. `/api/monitoring/health`, insan/pano tanılamaları
için kullanılabilir durumda kalır; konteyner HEALTHCHECK denetimini tekrar bu uç
noktaya yönlendirmek için (örneğin kapsamlı sağlık denetimi uygulamak amacıyla)
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ayarını kullanın. Bu yol, **derin**
bir denetimdir (veritabanı + izleme özeti) — yeniden etkinleştirmeyi seçerseniz
Docker'ın seyrek çalışan `HEALTHCHECK` denetimi için uygundur, ancak Kubernetes
`livenessProbe` aralıkları için **uygun değildir**.

Orkestratörler (Kubernetes, Nomad vb.) için:

| Yoklama           | Tercih edin                                                                     | Kaçının                                                                      |
| ----------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Canlılık          | HTTP `GET /livez` veya ana bağlantı noktasında TCP (`PORT`, varsayılan `20128`) | Canlılık denetimi olarak `/api/monitoring/health`                            |
| Hazır olma        | HTTP `GET /healthz`                                                             | Olay döngüsünün meşgul olmasını ölü olarak değerlendiren kısa zaman aşımları |
| Derin / kara kutu | `/api/monitoring/health`                                                        | —                                                                            |

`/healthz`, süreç yaşam döngüsünü (`ok` / `starting` / `stopping`) bildirir. `/livez`
yalnızca sürecin çalıştığını denetler (işleyici çalışabildiği sürece 200 döndürür;
hazır olma durumunu beklemez). Her ikisi de istek işleme ile aynı Node olay döngüsünde
çalıştığından, CPU'ya bağımlı katalog veya sıkıştırma işleri bu uç noktaları
geciktirebilir — meşgul ≠ ölü. HTTP yoklamaları zaman aşımına uğruyorsa TCP canlılık
yoklamasını tercih edin. Tüm yoklama yönergeleri:
[İzleme kılavuzu — Kubernetes yoklama önerileri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy ile Docker Compose (HTTPS Auto-TLS)

OmniRoute, Caddy'nin otomatik SSL sağlama özelliği kullanılarak güvenli biçimde erişime açılabilir. Alan adınızın DNS A kaydının sunucunuzun IP adresine yönlendirildiğinden emin olun.

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
      # OAuth geri çağrıları, pano bağlantıları ve oluşturulan herkese açık URL'ler için tarayıcıya yönelik kaynak.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Zamanlanmış işler / kendi kendine yapılan istekler için sunucudan sunucuya dahili URL.
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

Caddy, yukarı akış kapsayıcısı için standart yönlendirme üstbilgilerini ayarlar. OmniRoute,
OAuth geri çağrıları ve oluşturulan herkese açık bağlantılar için `NEXT_PUBLIC_BASE_URL` değerini
kanonik herkese açık kaynak olarak kullanır; kimliği doğrulanmış pano yazma işlemleri, aynı kaynaklı
isteklerle birlikte oturuma bağlı CSRF korumasını kullanır. `OMNIROUTE_TRUST_PROXY` seçeneğini yalnızca,
OmniRoute'un herkese açık kaynağı açık yapılandırma yerine güvenilir yönlendirme üstbilgilerinden
türetmesini bilerek istediğiniz gelişmiş dağıtımlarda etkinleştirin.

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

## İmaj Etiketleri

| İmaj                     | Etiket   | Boyut  | Açıklama                                                       |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | En yüksek **yayımlanmış** kararlı SemVer (git `main` değildir) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps için bu etiket sınıfını sabitleyin                      |

Çok platformlu manifest: yerel `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker, eşleşen mimariyi otomatik olarak seçer; ARM ana makinelerinde AMD64 emülasyonunu zorlamanız gerekiyorsa `--platform linux/amd64` parametresini iletin.

### Sürüm Kanalları

OmniRoute; kararlı sürümler, etkin sürüm dalı testleri ve geliştirme derlemeleri için ayrı Docker kanalları yayımlar.

| Kanal                           | Kaynak                                   | Değiştirilebilirlik                    | Önerilen kullanım                                                                                                                |
| ------------------------------- | ---------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | İmzalanmış/sürümlendirilmiş sürüm        | Değiştirilemez                         | Tam bir sürüme sabitlenen üretim dağıtımları                                                                                     |
| `:latest` / `:latest-web`       | En yüksek **yayımlanmış** kararlı SemVer | Değiştirilebilir kararlı işaretçi      | Bir SemVer yayımlama işinden **sonra** kararlı sürümleri izler — `main` veya yayımlanmamış `release/v*` işlemelerini **izlemez** |
| `:next` / `:next-web`           | Geçerli varsayılan `release/v*` dalı     | Değiştirilebilir ön sürüm işaretçisi   | Etkin sürüm dalına eklenmiş ancak henüz kararlı bir sürümde bulunmayan düzeltmeleri test etme                                    |
| `:main` / `:main-web`           | `main` dalı                              | Değiştirilebilir geliştirme işaretçisi | Yalnızca geliştirme ve entegrasyon testleri                                                                                      |

#### Web oturumu sağlayıcıları: `-web` imajları

Yukarıdaki her kanal, `runner-web` aşamasından oluşturulan bir `-web` etiketi (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) olarak da sunulur — aynı imaja Playwright ve Chromium tarayıcısının eklenmiş hâlidir. Düz imaj Chromium **olmadan** sunulur; `gemini-web`, `claude-web` ve `claude-turnstile` bunu gerektirir.

Hata başlangıç sırasında değil, ertelenmiş olarak ortaya çıkar: bu sağlayıcılar modellerini listeler ve panoda bağlı olarak görünür; yalnızca ilk istek aşağıdaki hatayla başarısız olur:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Bu sağlayıcıları kullanıyorsanız hâlihazırda bulunduğunuz kanalın `-web` etiketini çekin — başka hiçbir şey değişmez. npm/CLI kurulumunda (Docker imajı olmadan) eksik olan eşdeğer bileşen tarayıcı ikili dosyasıdır: ana makinede `npx playwright install chromium` komutunu çalıştırın.

#### Ön sürüm kanalını kullanma

`next` kanalı, mevcut varsayılan `release/v*` dalına yapılan her gönderimde yeniden oluşturulur ve hem AMD64 hem de ARM64 için yayımlanır. Eski bakım dalları bu kanalın üzerine yazamaz. Bu kanal, bir sonraki kararlı etiket oluşturulmadan önce etkin sürüm dalıyla birleştirilmiş düzeltmeler için çekilebilir bir imaj sağlar.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose için seçilen profilin kullandığı imaj etiketini geçersiz kılın, ardından hizmeti çekip yeniden oluşturun:

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

`next`, değişken bir ön sürüm kanalıdır. Etkin sürüm dalına yapılan herhangi bir gönderimde değişebilir ve **üretim ortamında kullanım için desteklenmez**. Belirli bir derlemeyi değerlendirirken imaj özetini sabitleyin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Test etmeden önce OmniRoute veri birimini veya bağlama yoluyla eklenmiş veri dizinini yedekleyin. Geri almak için daha önce kullanılan kararlı sürümü ya da özeti geri yükleyin ve kapsayıcıyı yeniden oluşturun:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Bir sürüm dalı derlemesi hiçbir zaman `latest` etiketini değiştiremez; kararlı işaretçiyi yalnızca uygun bir kararlı semantik sürüm yükseltebilir. `next` imajları, sürüm imajı incelemesini ve engelleyici CRITICAL güvenlik açığı denetimini korur.

**`latest`, git için güncellik garantisi değildir.** `main` veya etkin `release/v*` dalıyla birleştirilen düzeltmeler, kararlı bir SemVer imajı yayımlanana ve yayımlama işi `:latest` etiketini yükseltene kadar (ilgili SemVer ile aynı özet) `:latest` içinde yer almaz. GitHub düzeltmeyi zaten gösterirken `latest` donmuş görünüyorsa sürüm dalını test etmek için `:next` etiketini çekin veya SemVer etiketini bekleyin.

| İstediğiniz                                                                             | Kullanım                                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Sapma olmaması gereken GitOps / üretim ortamı                                           | `:X.Y.Z` etiketini (veya imaj özetini) sabitleyin |
| Yayımlanan kararlı sürümleri takip etmek ve her sürümde yeniden oluşturmayı kabul etmek | `:latest`                                         |
| Yayımlanmamış `release/v*` commit'lerini test etmek                                     | `:next` (üretim için değil)                       |
| `main` dalını test etmek                                                                | `:main` (üretim için değil)                       |

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

## Yatay ölçeklendirme: N bağımsız süreç

Bir Node süreci **tek bir V8 heap'i** demektir. Birbiriyle çakışan, yaklaşık 3 MiB / 750 bin token'lık iki kodlama aracısı `POST /v1/responses` isteği (RTK + Caveman), yaklaşık 12 Gi düzeyinde bu heap'in durdurulmasına (`FATAL ERROR: Reached heap limit`) ve 16 Gi'lık bir cgroup'da OOM oluşmasına neden olabilir. Bkz. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Bu ölçüm, eşzamanlı uzun `/v1/responses` istekleri için ürünün sabit maksimum sınırı olan iki sayısını değil, bir **bellek bütçesi** uyarısını ifade eder. Ağır sohbetlerin kabulü, aynı V8/cgroup sınırından otomatik olarak türetilen bir alım bayt bütçesi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) tarafından kontrol edilir — zaten boyutlandırılmış bir süreçte bunu yukarı doğru geçersiz kılmak (veya eski `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` istek sayısı üst sınırını ayarlamak) sürecin yeniden durdurulmasına yol açar. Küçük sohbetler, `/healthz`, `/v1/models` ve MCP bu sınıra **dahil değildir**.

### Tek süreç: ikiden fazla uzun `/v1/responses`

**Sağlıklı** bir süreç (heap, varsayılan değeri `0.75` olan `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` değerinin altındaysa), süreç genelindeki uçuş hâlindeki bayt bütçesinde (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hâlâ yer olduğunda ikiden fazla eşzamanlı uzun `POST /v1/responses` isteği çalıştırabilir. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` değerine (varsayılan 256 KiB) eşit veya bundan büyük gövdeler, yapı bakımından ağır isteklerle aynı ağır iş yükü iznini alır ve aynı [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` kaçış mekanizmasını (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) kullanır. Onlarca eşzamanlı uzun SSE istemcisi (operatörler çoğu zaman 40–50 istemciye ihtiyaç duyar) bir **bellek bütçesi** meselesidir — heap'i, birincil/ek kapasite yuvalarını ve `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` değerini uygun şekilde boyutlandırın — ürünün sabit bir “maksimum 2” sınırı değildir. Baskı altındaki bir heap, #7849'un tekrar oluşmaması için yeniden denenebilir `503` yanıtlarıyla yük azaltmaya devam eder.

Heap'leri (bağımsız V8 old-space alanlarını) **çoğaltmak** için **bugün**:

| Yapın                                                                                                                                                                                | Yapmayın                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Her biri **kendi** `DATA_DIR` / volume değerine sahip **N container/pod** çalıştırın                                                                                                 | Tek bir SQLite dosyasına karşı `replicas > 1` ayarlamayın                   |
| Uçuş hâlindeki ağır istekleri ve sağlıklı ek kapasiteyi heap / uçuş hâlindeki bayt bütçesine göre boyutlandırın; 1–2, sabit bir ürün maksimumu değil, ihtiyatlı #7849 varsayılanıdır | Tek bir sürece 8 kat RAM ve sınırsız bir sayı üst sınırı vermeyin           |
| İsteğe bağlı: **paylaşılan kota sayaçları** için `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                | Redis'i paylaşılan SQLite olarak değerlendirmeyin — öyle değildir           |
| Sağlayıcı secret'larını her instance'a çoğaltın (veya bölümlenmiş dashboard'ları kabul edin)                                                                                         | Instance'lar genelinde tek bir dashboard / tek bir çağrı günlüğü beklemeyin |
| Önüne herhangi bir load balancer koyun; API anahtarına veya oturuma göre sticky yönlendirme yeterlidir                                                                               | Sağlayıcıya özgü, boyutu dikkate alan bir middleware gerektirmeyin          |

Donanım açısından, instance başına eşzamanlı uzun `/v1/responses` sayısı bir **bellek bütçesi** meselesidir (heap + uçuş hâlindeki bayt / #10110). `N` bağımsız `DATA_DIR` yine heap'leri çoğaltır: ana makine RAM'i, “N=8 olan tek bir 16 Gi pod”u değil, `N × cgroup` miktarını karşılamalıdır. Tek bir SQLite dosyasında asla `replicas > 1` kullanmayın.

Compose taslağı (iki heap, iki volume — `deploy.replicas: 2` değil):

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

Süreç içi yoğunluk (sıkıştırmanın HTTP isolate'ı dışına alınması) için bkz. [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Paylaşılan kalıcı durum üzerinde tek bir mantıksal küme için bkz. [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker içindeki Gemini bölgesel hataları

Google AI Studio / Gemini API, FAILED_PRECONDITION ile birlikte HTTP 400 ve
`Kullanıcı konumu API kullanımı için desteklenmiyor.` hatasını döndürebilir. Ana makinede
başarılı olan bir istek, konteynerin aynı giden rotayı kullandığını kanıtlamaz. DNS sıralaması,
IPv4/IPv6 bağlantısı, VPN yönlendirmesi ve yapılandırılmış proxy'ler farklılık gösterebilir. Hatalı
bir API anahtarı tek başına bu hatayla belirlenemeyeceğinden, gerçek bağlantı rotasının yanı sıra
[Google'ın desteklenen bölgelerini](https://ai.google.dev/gemini-api/docs/available-regions)
de kontrol edin.

### Bağlantıya özel bir proxy'yi tercih edin

Etkilenen Gemini bağlantısı için OmniRoute'un [bağlantı başına proxy yapılandırmasını](../ops/PROXY_GUIDE.md#4-level-proxy-system)
kullanın, ardından aynı modelle **Bağlantıyı Test Et** işlemini ve küçük bir isteği
tekrarlayın. Bu, yönlendirme değişikliğini söz konusu bağlantıyla sınırlı tutar. Proxy'ye
konteynerden erişilebildiğini ve bağlantının gerçekten bu proxy'yi seçtiğini doğrulayın.
Rotanın değiştirilmesi, üst sağlayıcıdaki bölgesel uygunluğu garanti etmez.

### Ana makine ve konteyner ağını karşılaştırın

Kimliği doğrulanmış sonuçları karşılaştırırken anahtarı, modeli ve isteği aynı tutun; kimlik
bilgilerini, proxy parolalarını veya eksiksiz yetkilendirme üst bilgilerini asla bir soruna
yapıştırmayın. Önce, ana makinede ve konteynerin içinde aynı komutu kullanarak işletim sistemi
çözümleyicisinin hangi adres ailelerini sunduğunu inceleyin:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` yerine çalıştırdığınız servisi yazın (örneğin, `omniroute-web`). Bu
komutlar, kimlik bilgileri veya IP adresleri olmadan adres ailelerini yazdırır. Döndürülen `6`
yalnızca bir IPv6 DNS sonucunu gösterir: kullanılabilir bir IPv6 rotasını veya API erişimini
**kanıtlamaz**. `curl` kuruluysa her iki ortamda da
`curl -4 -I https://generativelanguage.googleapis.com` ile
`curl -6 -I https://generativelanguage.googleapis.com` sonuçlarını karşılaştırın.
Kimliği doğrulanmamış bir hata olsa bile HTTP yanıtı, bu yoklama için bağlantının kurulduğunu
kanıtlar; Gemini uygunluğunu yalnızca kimliği doğrulanmış model isteği sınar.

### Ana makine düzeyinde alternatif: çalışan IPv6 ve çözümleyici politikası

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) sorununu bildiren kişi,
kendi ortamında konteyner IPv6'sını etkinleştirerek ve glibc adres seçimini değiştirerek
erişimi yeniden sağladı. Bunu ortama özgü bir alternatif olarak değerlendirin. Çözümleyici
tercihlerini ayarlamadan önce ana makine IPv6'sının çalıştığını, konteyner çıkışını/yönlendirmesini
ve güvenlik duvarı kurallarını doğrulayın. Özel bir ULA adresi tek başına genel IPv6
bağlantısının bulunduğunu göstermez.

Compose'un varsayılan ağına zaten bağlı olan servisler için bu parça, söz konusu ağda
IPv6'yı etkinleştirir; servisinizin, portlarınızın, birimlerinizin ve yapılandırmanızın geri
kalanını koruyun:

```yaml
networks:
  default:
    enable_ipv6: true
```

Adlandırılmış bir ağ için IPv6'yı servisin gerçekten katıldığı ağda etkinleştirin. Docker
bir ULA alt ağı tahsis edebilir; yalnızca ağınız gerektiriyorsa açıkça belirtilmiş ve
çakışmayan bir alt ağ seçin. Bkz. [Docker IPv6 ağı](https://docs.docker.com/engine/daemon/ipv6/)
ve [Compose ağ seçenekleri](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc tabanlı bir imajda** `/etc/gai.conf`, adres seçimini değiştirebilir. Mevcut
depo Dockerfile'ı Debian kullanır; özel musl tabanlı imajlar bu mekanizmayı paylaşmaz.
Bildirilen ayarlama, ULA etiketini `label fc00::/7 6` değerinden
`label fc00::/7 1` değerine değiştirir. İmajın eksiksiz politika tablosuyla başlayın ve diğer
girdileri koruyun: bir `label` veya `precedence` girdisi eklemek varsayılan tablonun yerini
aldığından yalnızca değiştirilen satırı içeren bir dosya yetersizdir.
[glibc yapılandırma referansı](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
bu davranışları belgeler. İncelenmiş dosyayı `/etc/gai.conf` konumuna salt okunur olarak
bağlama yoluyla bağlayın ve uygulamak için servisi yeniden oluşturun.

Bu işlem, **söz konusu konteynerdeki tüm giden trafik** için işletim sistemi adres seçimini
değiştirir. Her uygulamayı IPv6'yı seçmeye zorlamaz: Node'un DNS sırası ve bağlantı seçimi
de önemlidir. Özellikle `--dns-result-order=ipv4first`, IPv4'ü tercih eder ve yalnızca
IPv4'te oluşan bir hata için çözüm değildir. Bkz. [Node DNS sıralaması](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Ana makine düzeyindeki herhangi bir değişiklikten sonra Gemini'yi ve diğer sağlayıcılarınızı
yeniden test edin. Geri almak için özel `gai.conf` bağlamasını kaldırın, önceki ağ
yapılandırmasını geri yükleyin ve bakım aralığı sırasında etkilenen servisi/ağı yeniden
oluşturun. Bir ağın yeniden oluşturulması, ona bağlı diğer konteynerleri kesintiye
uğratabilir; kalıcı veri birimini silmeyin.

## Önemli Notlar

- **SQLite WAL Modu:** OmniRoute'un en son değişiklikleri `storage.sqlite` dosyasına denetim noktası olarak yazabilmesi için `docker stop` işleminin tamamlanmasına izin verilmelidir. Paketlenmiş Compose dosyalarında 40 saniyelik durdurma ek süresi zaten ayarlanmıştır. İmajı doğrudan çalıştırıyorsanız `--stop-timeout 40` ayarını koruyun.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Rutin/yazma öncesi yedeklemeler harici olarak yönetiliyorsa `true` olarak ayarlayın. Mevcut veritabanı geçişleri yine de kendilerine ait kalıcı bir güvenlik anlık görüntüsü ve toplu geçiş koruması gerektirir.
- **Veri Kalıcılığı:** Konteyner yeniden başlatmalarında veritabanınızı, anahtarlarınızı ve yapılandırmalarınızı korumak için her zaman `/app/data` konumuna bir birim bağlayın.
- **Port Yapılandırması:** Varsayılan `20128` portunu değiştirmek için `PORT` ortam değişkenini geçersiz kılın.

## Ayrıca Bkz.

- [VM Dağıtım Kılavuzu](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare kurulumu
- [Fly.io Dağıtım Kılavuzu](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io'ya dağıtım
- [Ortam Yapılandırması](../reference/ENVIRONMENT.md) — Eksiksiz `.env` referansı
