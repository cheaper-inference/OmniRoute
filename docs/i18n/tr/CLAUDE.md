# CLAUDE.md (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Tüm proje kuralları [`AGENTS.md`](AGENTS.md) yaşıyor** — her AI asistanı için tek gerçek kaynaktır; yukarıdaki içe aktarma işlemi zaten onu yüklüyor. Proje kurallarını buraya yeniden eklemeyin. Aşağıdaki her şey ONLY Claude Code — halihazırda `AGENTS.md` tanımlanmış olan kuralların operasyonel iyileştirmelerine uygular.

## Çalışma ağacı izolasyonu — Claude Kod özellikleri

- Operatör size daha önce söylemediği sürece ana dalı `AskUserQuestion` (Zor Kural #19) aracılığıyla operatörle onaylayın.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ile çalışma ağacını oluşturun ( `.claude/worktrees/` altına girer, `node_modules` sabit bağlantılarını kurar ve `.husky/_` kopyalar), ardından `EnterWorktree` `path` ile çağırın. Her zaman tabanı iletin: bu olmadan komut dosyası en yüksek `release/*` seçer, bu da operatörün onayladığı olmayabilir. `EnterWorktree` kendi başına oluşturduğu bir çalışma ağacında ne sabit bağlantılar ne de kancalar bulunur, dolayısıyla içinde hiçbir ön işleme kapısı çalışmaz.

## Alt aracılar ve git

Git'e (Ajan aracı veya İş Akışı betiği) dokunan her alt aracı, #22 a'nın `git stash` yasağını kelimesi kelimesine kendi komut isteminde alır — saklama olayının kaydedilen yinelemesi bir alt aracı aracılığıyla gelir.

## Yapılar — süper güçlerinin yol geçersiz kılmalarını planlama

Süper güçlerin becerileri `docs/superpowers/plans/`, `docs/superpowers/specs/` ve `docs/research/` altındaki varsayılanları duyurur. Yazmadan önce her birini `AGENTS.md` → "Planlama ve Araştırma Eserleri" içindeki `_tasks/` eşdeğerine yeniden yazın ve bunu asla ana depoda değil `git -C _tasks …` ile işleyin.

## Dosyaları kazıyın `_artifacts/` değil — `/tmp`

Bu proje, koşumun oturum karalama defterini (`/tmp/claude-*/…`) geçersiz kılar. Geçici dosyalar — dışa aktarmaları, oluşturulan zip'ler, — `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` tek seferlik ara çıktılar yazın: gitignored kök `_*` yolu, böylece operatör tüm çizikleri tek bir yerde bulur ve siler. Dayanıklı planlar, spesifikasyonlar, araştırmalar ve devredilenler bunun yerine `_tasks/` (Zor Kural #23) gider.

## Kırmızı taban

Birikmiş kırmızı durumu (taban ucu + kırmızı PRs) boşaltmak için `/sweep-reds` becerisini kullanın.
