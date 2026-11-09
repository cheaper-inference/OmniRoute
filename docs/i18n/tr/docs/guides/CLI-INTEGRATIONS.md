# CLI Integrations (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Paylaşılan yürütülebilir bildirim, kısıtlı alt ortamlar ve kalıcı Gemini kurulumu için [CLI başlatma sözleşmelerine](./CLI-LAUNCH-CONTRACTS.md) bakın.

OmniRoute CLI kodlamasını (Codex, Claude Code, OpenCode, Cline, …) arka uç olarak OmniRoute kullanacak şekilde yapılandıran bir `setup-*` komut ailesi gönderir; böylece araç,** bir** otomatik geri dönüş ile uç nokta ve OmniRoute doğru sağlayıcıya yönlendirilir. Her komut şunu okur:** canlı** çalışan bir OmniRoute (yerel veya uzak) model kataloğu alır ve aracın kendi yapılandırma dosyasını** senin** makine. API anahtarına, aracın desteklediği her yerde bir ortam değişkeni tarafından başvurulur. Araç yerel ortam dosyasını sürdüren komutlar aşağıda belirtilmiştir.

Ayrıca hiçbir yapılandırma yazmadan `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` veya `whycodes` doğru env enjekte edilerek üreten genel bir başlatıcı - `omniroute run <target>` - vardır. Hedefler ve takma adları kanonik bildirim `bin/cli/cli-manifest.mjs` gelir (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`) ve `omniroute completion` aynı bildirimden türetilmiş hedef kelimeleri sunar. Eski araç başına başlatıcılar — `omniroute launch` (Claude Code) ve `omniroute launch-codex` (Codex) — kullanılabilir olmaya devam edecek.

Sağlayıcının katılımı aynı local/remote bağlamından yapılabilir. Aşağıdaki API öncelikli komutlar, yönetim kimlik doğrulamasını sağlayıcı kimlik bilgilerinden ayrı tutar ve yapılandırılmış çıktıda asla bir kimlik bilgisi yazdırmaz:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Komut dosyaları için `--credential-stdin` veya `--credential-env` tercih edin; `--credential` kontrollü yerel kullanım için saklanır. `providers remove` etkileşimli olmayan bir terminalde `--yes` gerektirir ve beş komutun tümü, aktif bağlamı veya genel `--base-url`/`--api-key` seçeneklerini dikkate alır.

Sağlayıcı seçiciler, belirsiz ID öneklerini, adlarını veya sağlayıcı adlarını reddeder; Birkaç bağlantı eşleştiğinde tam bağlantı ID kullanın. Oluşturma ve düzenleme komutları kaydedilen bağlantıyı geri okur ve kaldırma, bağlantının artık okunamaz olduğunu doğrular. Bir içe aktarma işlemi mevcut bir provider/name çiftini atlar. İçe aktarılan girişler, CLI sağlanan yönetim uç noktası, bağlam veya yönetim kimlik bilgilerini geçersiz kılamaz.

En zengin iki entegrasyonun tek seferlik, elle yazılmış temel kurulumu için, araca özel ayrıntılı incelemelere bakın:

- [Claude Kodu yapılandırması](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI yapılandırması](./CODEX-CLI-CONFIGURATION.md)
- [Uzak Mod](./REMOTE-MODE.md) — dizüstü bilgisayarınızdan uzak bir OmniRoute (VPS / Tailnet) sürün
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot uzantısı; ayrıca bu `setup-*` komutlarını sizin için düzenleyicinin içinden çalıştırabilir

---

## Ana tablo

Her komut onu onurlandırır** aktif bağlam** ( `omniroute connect` ile ayarlayın, bkz. [Uzak Mod](./REMOTE-MODE.md) ) veya açık `--remote <url> --api-key <key>` bayrakları. Aşağıdaki "Yerel vs uzak" şu anlama gelir: hiçbir bayrak olmadan `http://localhost:20128` hedefler; `--remote` (veya etkin bir uzak bağlam) ile kataloğu o sunucudan alır ve yapılandırmayı yerel olarak yazar.

| Emretmek                   | Alet                            | Ne yazıyor                                                                                                                                                                                          | Anahtar bayraklar                                                                                                                          | Yerel ve uzak |
| -------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                | `~/.codex/<name>.config.toml` — uyumlu metin modeli başına bir profil (`codex --profile <name>`)                                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | İkisi birden  |
| `omniroute setup-claude`   | Claude Kodu                     | `~/.claude/profiles/<name>/settings.json` — eşleşen model başına bir profil (`CLAUDE_CONFIG_DIR`)                                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | İkisi birden  |
| `omniroute setup-opencode` | OpenCode (openai uyumlu)        | `~/.config/opencode/opencode.json` — her katalog modeline sahip `omniroute` sağlayıcısı (`opencode -m omniroute/<model>`)                                                                           | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | İkisi birden  |
| `omniroute setup-cline`    | Cline                           | `~/.cline/data/{globalState,secrets}.json` (CLI modu) + VS Kod uzantısı ayarlarını yazdırır                                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | İkisi birden  |
| `omniroute setup-kilo`     | Kilo Kodu                       | `~/.local/share/kilo/auth.json` (CLI) + `kilocode.*` VS Kodu (varsa) ile birleştirir `settings.json`                                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | İkisi birden  |
| `omniroute setup-continue` | Devam / `cn` CLI                | `~/.continue/config.yaml` — `provider: openai` modelleri, `${{ secrets.OMNIROUTE_API_KEY }}` aracılığıyla anahtar                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | İkisi birden  |
| `omniroute setup-cursor`   | Cursor                          | Hiçbir şey — uygulama içi adımları yazdırır (Cursor config opaktır SQLite)                                                                                                                          | `--remote` `--api-key` `--only` `--port`                                                                                                   | İkisi birden  |
| `omniroute setup-roo`      | Roo Kodu                        | `~/.omniroute/roo-settings.json` (içe aktarma belgesi) + VS Kodu `settings.json` mevcutsa `roo-cline.autoImportSettingsPath` ayarlar                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | İkisi birden  |
| `omniroute setup-crush`    | Ezmek                           | `~/.config/crush/crush.json` — `openai-compat` sağlayıcısı, `$OMNIROUTE_API_KEY` aracılığıyla anahtar                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | İkisi birden  |
| `omniroute setup-zed`      | Zed                             | `~/.config/zed/settings.json` — `openai_compatible.omniroute` sağlayıcısı (≤ 25 araç özellikli modeller), `$OMNIROUTE_API_KEY` aracılığıyla anahtar                                                 | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | İkisi birden  |
| `omniroute setup-goose`    | Kaz                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + env tarifini yazdırır                                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | İkisi birden  |
| `omniroute setup-aider`    | yardımcı                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + env tarifini yazdırır                                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | İkisi birden  |
| `omniroute setup-qwen`     | Qwen Kodu                       | `~/.qwen/settings.json` — `~/.qwen/.env` V4 `modelProviders.openai` dizisi + `OMNIROUTE_API_KEY`                                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | İkisi birden  |
| `omniroute setup-5dive`    | 5dive (acente filosu)           | `$HOME` altında hiçbir şey yok - 5dive yazıyor** kimlik doğrulama profili** (`/var/lib/5dive/auth-profiles/<name>/`) `5dive agent auth set` yoluyla; yalnızca root, filo ana bilgisayarında çalışır | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | İkisi birden  |
| `omniroute setup-whycodes` | WhyCodes                        | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); yol `$WHYCODES_HOME/config.toml` veya `~/.whycodes/config.toml`                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | İkisi birden  |
| `omniroute run <target>`   | Çalışma zamanı başlatma (genel) | Hiçbir şey — doğru env ve argümanlarla `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` doğurun; Qwen ve Gemini geçici olarak izole edilmiş bir ev kullanıyor                 | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | İkisi birden  |
| `omniroute launch`         | Claude Kodu                     | Hiçbir şey — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` enjekte edilmiş olarak `claude` doğurur                                                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | İkisi birden  |
| `omniroute launch-codex`   | OpenAI Codex CLI                | Hiçbir şey — `-c` bayrakları aracılığıyla enjekte edilen `omniroute` sağlayıcısıyla `codex` doğurur                                                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | İkisi birden  |

Bayraklarla ilgili notlar (komut kaynağında doğrulanmıştır):

- `--remote <url>` — kataloğu uzak bir OmniRoute getirir ( `--port` ve aktif bağlamı geçersiz kılar). `--api-key <key>` söz konusu sunucunun kimlik bilgilerini sağlar (varsayılan olarak `OMNIROUTE_API_KEY` env var veya etkin bağlamın belirtecidir).
- `--only <patterns>` — virgülle ayrılmış alt dizeler; yalnızca eşleşen IDs modelini saklayın (örn. `--only glm,kimi`). `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed` mevcuttur.
- `--dry-run` - dosya sistemine dokunmadan tam olarak yazılanları yazdırın. Her `setup-*` komutunda mevcuttur** hariç** `setup-cursor` (asla dosya yazmayan).
- `--model <id>` — otomatik model bulma özelliği olmayan araçlar için gereklidir (veya etkileşimli olarak seçilir): Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Bu araçlar ayrıca etkileşimli olmayan çalıştırmalar için `--yes` de kabul eder (bu durumda `--model` gerekir). `setup-opencode` varsayılan üst düzey modeli ayarlamak için `--model` alır.
- `omniroute run` `--model <id>` bildirimin hedef başına kablolamasını (`bin/cli/cli-manifest.mjs`) takip eder:** yardımcı** `--model openai/<id>` alır ve** açık kod** `--model omniroute/<id>` (ön ek yalnızca kimlik zaten onu taşımadığında eklenir);** Qwen** Ve** ikizler burcu** kimliği aynen alın;** Claude** `ANTHROPIC_MODEL` aracılığıyla alır,** Kaz** `GOOSE_MODEL` aracılığıyla,** neden kodları** `-P omniroute -m <id>` aracılığıyla ve** kodeks** `-c model_providers.omniroute.*` argümanları aracılığıyla.**Qwen `--model` zor gerektiren tek çalıştırma hedefidir** — `omniroute run qwen` onsuz `2` açık bir hatayla çıkar.
- `--port <port>` — yerel OmniRoute bağlantı noktası (varsayılan `20128`, `--remote` ayarlandığında göz ardı edilir). Tüm `setup-*` ve her iki başlatıcıda da mevcut.
- `omniroute run` çıkış kodları: alt CLI kendi çıkış kodu aynen yayılır; `2` = geçersiz argümanlar (desteklenmeyen hedef, gerekli `--model` eksik, kapsayıcı koruması); `127` = hedef ikili dosya `PATH` değil; `130`/`143`/`129` başlatma `SIGINT`/`SIGTERM`/`SIGHUP` ile sonlandırıldığında; `1` = diğer çalışma zamanı başlatma hatası.
- İki başlatıcı (`launch`, `launch-codex`), `setup-claude` / `setup-codex` tarafından yazılan bir profili seçmek için `--profile <name>` ve ayrıca temeldeki `claude` / `codex` ikili dosyası için geçiş argümanlarını kabul eder.

Etkileşimli seçici aynı zamanda kurulum tarifleri tarafından da paylaşılır:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` şu anda `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` ve `5dive` için test edilmiş tariflere yetki vermektedir. Yalnızca IDE, MITM ve yalnızca kılavuz katalog girişleri açık `setup-*`/manual akışları olarak kalır ve başlatılabilir hedefler olarak sunulmaz.

> `setup-opencode` şudur** hafif openai uyumlu** OpenCode entegrasyonu. Ayrıca `@omniroute/opencode-plugin` yükleyen daha zengin bir eklenti entegrasyonu - `omniroute setup opencode` - vardır. Bunlar farklı komutlardır; yukarıdaki tablo `setup-opencode` belgeler.
>
> Eklenti, OpenCode major başına bir tane olmak üzere iki paket halinde gelir, çünkü iki yükleyici farklı giriş noktaları bekler: OpenCode v1 için `@omniroute/opencode-plugin` ve OpenCode v2 için `@omniroute/opencode-plugin-v2`. V2 paketi yenidir (`0.1.0`) ve hala hareket halinde olan bir ana bilgisayar sözleşmesini takip eder, bu nedenle OpenCode tohumlarını varsaymak yerine katalog taslağına okur. `opencode.json` bir `plugins` girişi ekleyerek yükleyin; `omniroute setup opencode` hala v1 paketini yüklüyor. Seçenekler ve kimlik bilgisi arama sırası README paketindedir.

---

## Yerel kullanım

OmniRoute `localhost:20128` üzerinde çalışırken aracınız için kurulum komutunu çalıştırmanız yeterlidir. Katalog yerel sunucudan alınır.

```bash
# Codex: eşleşen her model için ~/.codex/ içine bir profil yaz
omniroute setup-codex
codex --profile glm52            # oluşturulan bir profili kullan

# Claude Code: model başına profilleri yaz, ardından birini başlat
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: openai uyumlu sağlayıcıyı tüm katalog modelleriyle yaz
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} üzerinden başvurulur, asla diske yazılmaz
opencode -m omniroute/glm/glm-5.2 "..."

# Otomatik keşif özelliği olmayan araçlar açıkça belirtilen bir modele ihtiyaç duyar:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Hiçbir şey yazmadan önizle:
omniroute setup-continue --dry-run
```

Hiçbir yapılandırma yazmadan başlatın (yalnızca ortam değişkeni enjeksiyonu):

```bash
omniroute launch                 # Claude Code → yerel OmniRoute
omniroute launch-codex           # Codex CLI → yerel OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Açık komut yolu: -- sonrasında gelen her şeyi olduğu gibi aktar
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Uzak kullanım

Herhangi bir kurulum komutunu `--remote` + `--api-key` ile uzak bir OmniRoute'a yönlendirin. Katalog uzak sunucudan alınır; yapılandırma ise yerel makinenize yazılır.

```bash
# Uzak bir VPS üzerindeki OpenCode; yalnızca glm/kimi modellerini tut
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # önce OMNIROUTE_API_KEY değerini dışa aktar

# Uzak bir katalogdan Codex profilleri
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Bir CLI'ı doğrudan uzak sunucuya karşı başlat
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Her seferinde `--remote`/`--api-key` geçirmek yerine bir kez oturum açın ve **etkin bağlamın** bunları otomatik olarak sağlamasına izin verin:

```bash
omniroute connect 192.168.0.15        # kapsamlı bir belirteç oluşturur, bağlamı saklar
omniroute setup-codex                 # ← artık uzak kataloğu kullanır
omniroute setup-opencode              # ← aynı şekilde
omniroute launch                      # ← uzak sunucuya karşı Claude Code
```

Bağlamlar, kapsamlar ve belirteç yönetimi için [Uzak Mod](./REMOTE-MODE.md) bölümüne bakın.

---

## 5dive ajan filoları

[5dive](https://5dive.ai), her biri kendi Unix kullanıcısı altında bir systemd birimi olan, uzun süre çalışan kodlama ajanlarından oluşan bir filo çalıştırır. Kendisi bir kodlama CLI'ı değildir; dolayısıyla `omniroute run` tarafından başlatılacak bir şey yoktur — `5dive` **yalnızca yapılandırma** hedefidir.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Her iki biçim de bir 5dive **kimlik doğrulama profili** yazar ve bu profile bağlı her `claude` lisansı bundan sonra OmniRoute ile iletişim kurar. Bu hedefe özgü üç nokta vardır:

- **Filo ana makinesinde root olarak çalışır.** 5dive komutları yerel systemd birimleri ve root'a ait bir durum dizini üzerinde işlem yapar; uzak mod yoktur. Tarif, zaten root olarak çalışmıyorsa `sudo` üzerinden kendini yeniden çalıştırır (`--no-sudo` bunu devre dışı bırakır ve bunun yerine komutu yazdırır).
- **Geri döngü adresi olmadığı sürece uç nokta `https://` olmalıdır.** Ajanın API anahtarı her istekte bu URL üzerinden taşınır ve 5dive, makine dışındaki şifrelenmemiş bir uç noktayı reddeder. Özel bir LAN adresi de istisna değildir.
- **Her lisansın kendi model sabitlemesi, profile göre önceliklidir.** Profil `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` değerlerini taşır; ancak standart bir model kimliğine sabitlenmiş bir lisans, ilk turunda _"Seçilen modelle ilgili bir sorun var"_ hatasıyla başarısız olur. Lisansları da sabitlemek için `--agent <name>` seçeneğini (tekrarlanabilir) geçirin; bunu yapmadığınızda tarif komutu yazdırır.

API anahtarı 5dive'a **stdin** üzerinden (`--api-key=-`) verildiği için hiçbir zaman `ps` çıktısında görünmez.

Profili tek bir model yerine bir OmniRoute **kombosuna** yönlendirmek, filoya sağlayıcı yük devretme özelliğini kazandırır: [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) üzerinde kaydedilen çalıştırmada birincil uç nokta turun ortasında tamamen devre dışı kaldığında ajan, kalan adımlarını yedek uç noktada tamamladı ve kesintiyi hiçbir zaman kullanıcıya yansıtmadı.

---

## Temel URL kuralları (hangi araçlar `/v1` ister)

OmniRoute `/v1` OpenAI yüzeyini, kökteki Anthropic yüzeyini ve `/v1beta` doğal bir Gemini yüzeyini açığa çıkarır. Her entegrasyon, aracının beklediği forma göre bağlanır (komut kaynağında doğrulanmıştır):

| Entegrasyon                                                                | Temel URL yazılı | `/v1`?                                         |
| -------------------------------------------------------------------------- | ---------------- | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | kök              | Hayır — Cline `/v1/chat/completions` ekler     |
| `setup-goose` (`OPENAI_HOST`)                                              | kök              | Hayır — Goose yolu ekler                       |
| `setup-aider` (`OPENAI_API_BASE`)                                          | kök              | Hayır — LiteLLM `/v1/chat/completions` ekler   |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` ile        | Evet                                           |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | `/v1` ile        | Evet                                           |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | kök              | Hayır — Claude Kodu `/v1/messages` ekler       |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` ile        | Evet                                           |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` ile        | Evet                                           |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | kök              | Hayır — SDK, `/v1beta/models/…` ekler          |
| `setup-5dive` ( kimlik doğrulama profilinde `ANTHROPIC_BASE_URL` )         | kök              | Hayır — Claude Kodu `/v1/messages` ekler       |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | `/v1` ile        | Evet — WhyCodes `/chat/completions` yayınlıyor |

---

## Güncelleme sırasında yerel bağımlılıkları koruma: `--include=optional`

`omniroute update` ile güncelleme yaptığınızda (onayladıktan sonra veya `--apply`
ile), OmniRoute kurulumu yerleşik olarak `--include=optional` seçeneğiyle çalıştırır:

```bash
npm install -g omniroute@latest --include=optional
```

Bu, `omniroute update` komutuna ilettiğiniz bir seçenek **değildir** — güncelleyici
tarafından her zaman uygulanır. npm yapılandırmanızda `omit=optional` ayarlanmış
olsa bile `optionalDependencies` bağımlılıklarının (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM yığını) güncelleme sonrasında korunmasını garanti eder;
aksi takdirde yerel SQLite sürücüsü ve işletim sistemi anahtarlığı bağlaması sessizce
kaldırılırdı. Uygulamadan tam komutu önizlemek için:

```bash
omniroute update --dry-run
# [KURU ÇALIŞTIRMA] Çalıştırılacak komut: npm install -g omniroute@latest --include=optional
```

Diğer `omniroute update` seçenekleri (kaynakta doğrulanmıştır): `--check` (güncel
değilse 1 koduyla çık), `--apply` (sormadan kur), `--changelog`, `--no-backup`,
`--yes`.

---

## `omniroute run gemini` aracılığıyla Google Gemini CLI

Sözleşme `@google/gemini-cli` 0.50.0 ile doğrulanmıştır: CLI,
`GOOGLE_GEMINI_BASE_URL` değişkenini dikkate alır ve buna karşı
`POST /v1beta/models/<model>:generateContent` (ve
`:streamGenerateContent?alt=sse`) isteklerini gönderir — bu, OmniRoute'un yerel
Gemini yüzeyiyle (`/v1beta`) tam olarak eşleşir. `omniroute run gemini` bunu
otomatik olarak yapılandırır:

- `GOOGLE_GEMINI_BASE_URL` → etkin OmniRoute temel URL'si (kök, `/v1` olmadan);
- `GEMINI_API_KEY` → çözümlenen OmniRoute kimlik bilgisi (seçenek/ortam/bağlam);
- `.gemini/settings.json` dosyası `gemini-api-key` kimlik doğrulamasını seçen
  **geçici ve yalıtılmış bir `GEMINI_CLI_HOME`**; böylece saklanan bir Google OAuth
  oturumu (Code Assist), OmniRoute'a yönlendirilen başlatmayı hiçbir zaman geçersiz
  kılmaz — çıkıştan sonra kaldırılır;
- **ortam hijyeni**: alt işlemin ortamından `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ve `GOOGLE_GENAI_USE_GCA` kaldırılır (bunlar kimlik
  doğrulamayı Vertex/Code Assist'e yönlendirirdi) ve ek güvence olarak
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` ayarlanır — diğer `run` hedefleri de
  kendi çakışan değişkenleri için aynı işleme tabi tutulur;
- `--provider`/`--model` üzerinden `--model <id>` ekleme.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini'nin çalışma alanı güven koruması başsız modda da geçerlidir — `--skip-trust`
seçeneğini kendiniz iletin (veya dizine etkileşimli olarak güvenin); başlatıcı bunu
bilerek atlamaz. Bu başlatıcı, `/dashboard/acp-agents` için aracı protokolü
entegrasyonu olarak kalmaya devam eden **ACP kaydından**
(`src/lib/acp/registry.ts`, `gemini --acp`) farklıdır.

---

## Gerçek smoke taraması (isteğe bağlı)

Deterministik başlatma planı regresyon testleri CI'da (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`) çalışır. GERÇEK çalıştırılabilir dosyaları GERÇEK bir
OmniRoute sunucusuna karşı doğrulamak için
`tests/integration/upstream-cli-smoke.int.test.ts` konumunda isteğe bağlı bir test düzeneği bulunur. Bu düzenek hiçbir zaman otomatik olarak çalışmaz
(`RUN_CLI_SMOKE=1` ayarlanmadıkça her alt test atlanır), kimlik bilgisini DEĞER olarak değil, ortam değişkeni ADI olarak iletir, kaydedilen tüm çıktılardaki anahtar biçimli dizeleri maskeler, çalıştırılabilir dosyası yüklü olmayan hedefleri atlar ve hataları yalnızca bir mantıksal değer yerine
kimlik doğrulama / upstream / yapılandırma olarak sınıflandırır:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

İsteğe bağlı: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` taramayı belirtilen hedeflerle sınırlar;
`OMNIROUTE_SMOKE_TIMEOUT_MS`, hedef başına 120 saniyelik zaman aşımını geçersiz kılar.

---

## Ayrıca bkz.

- [Claude Code yapılandırması](./CLAUDE-CODE-CONFIGURATION.md) — ayrıntılı Claude Code kılavuzu
- [Codex CLI yapılandırması](./CODEX-CLI-CONFIGURATION.md) — tek seferlik `[model_providers.omniroute]` temel kurulumu
- [Uzak Mod](./REMOTE-MODE.md) — bağlamlar, kapsamlı erişim token'ları ve uzak bir sunucunun yönetilmesi
- [CLI Araçları referansı](../reference/CLI-TOOLS.md) — desteklenen araçların ve pano sayfalarının eksiksiz kataloğu
- [Kurulum Kılavuzu](./SETUP_GUIDE.md) — yükleme yöntemleri ve ilk çalıştırma süreci
