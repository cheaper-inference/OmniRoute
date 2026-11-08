# README (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇪🇹 [am](../am/README.md) · 🇸🇦 [ar](../ar/README.md) · 🇦🇿 [az](../az/README.md) · 🇧🇬 [bg](../bg/README.md) · 🇧🇩 [bn](../bn/README.md) · 🇧🇦 [bs](../bs/README.md) · 🇨🇿 [cs](../cs/README.md) · 🇩🇰 [da](../da/README.md) · 🇩🇪 [de](../de/README.md) · 🇬🇷 [el](../el/README.md) · 🇪🇸 [es](../es/README.md) · 🇪🇪 [et](../et/README.md) · 🇮🇷 [fa](../fa/README.md) · 🇫🇮 [fi](../fi/README.md) · 🇫🇷 [fr](../fr/README.md) · 🇮🇪 [ga](../ga/README.md) · 🇮🇳 [gu](../gu/README.md) · 🇳🇬 [ha](../ha/README.md) · 🇮🇱 [he](../he/README.md) · 🇮🇳 [hi](../hi/README.md) · 🇭🇷 [hr](../hr/README.md) · 🇭🇺 [hu](../hu/README.md) · 🇦🇲 [hy](../hy/README.md) · 🇮🇩 [id](../id/README.md) · 🇳🇬 [ig](../ig/README.md) · 🇮🇹 [it](../it/README.md) · 🇯🇵 [ja](../ja/README.md) · 🇬🇪 [ka](../ka/README.md) · 🇰🇭 [km](../km/README.md) · 🇮🇳 [kn](../kn/README.md) · 🇰🇷 [ko](../ko/README.md) · 🇱🇹 [lt](../lt/README.md) · 🇱🇻 [lv](../lv/README.md) · 🇮🇳 [ml](../ml/README.md) · 🇮🇳 [mr](../mr/README.md) · 🇲🇾 [ms](../ms/README.md) · 🇲🇲 [my](../my/README.md) · 🇳🇵 [ne](../ne/README.md) · 🇳🇱 [nl](../nl/README.md) · 🇳🇴 [no](../no/README.md) · 🇮🇳 [or](../or/README.md) · 🇮🇳 [pa](../pa/README.md) · 🇵🇭 [phi](../phi/README.md) · 🇵🇱 [pl](../pl/README.md) · 🇵🇹 [pt](../pt/README.md) · 🇧🇷 [pt-BR](../pt-BR/README.md) · 🇷🇴 [ro](../ro/README.md) · 🇷🇺 [ru](../ru/README.md) · 🇱🇰 [si](../si/README.md) · 🇸🇰 [sk](../sk/README.md) · 🇸🇮 [sl](../sl/README.md) · 🇷🇸 [sr](../sr/README.md) · 🇸🇪 [sv](../sv/README.md) · 🇰🇪 [sw](../sw/README.md) · 🇮🇳 [ta](../ta/README.md) · 🇮🇳 [te](../te/README.md) · 🇹🇭 [th](../th/README.md) · 🇹🇷 [tr](../tr/README.md) · 🇺🇦 [uk-UA](../uk-UA/README.md) · 🇵🇰 [ur](../ur/README.md) · 🇺🇿 [uz](../uz/README.md) · 🇻🇳 [vi](../vi/README.md) · 🇳🇬 [yo](../yo/README.md) · 🇨🇳 [zh-CN](../zh-CN/README.md) · 🇹🇼 [zh-TW](../zh-TW/README.md)

---

<div align="center">

<img src="./docs/screenshots/MainOmniRoute.png" alt="Dashboard ta’ OmniRoute" width="820"/>

<br/>
<br/>

# 🚀 OmniRoute — Il-Bieb Ħieles għall-IA

**Maħluq minn [Diego Souza](https://github.com/diegosouzapw)**

<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — Qatt tieqaf tikkodifika. Kull għodda tal-IA → 380 fornitur — 150+ b’xejn — permezz ta’ endpoint wieħed. Claude Code, Codex, Cursor, Cline, Copilot u Antigravity f’Claude / GPT / Gemini B’XEJN b’fallback awtomatiku. Il-kompressjoni kombinata ta’ RTK + Caveman tiffranka 15–95% tat-tokens (~89% bħala medja) — qatt ma tilħaq il-limiti. 380 fornitur tal-IA · 150+ pjan b’livell b’xejn · ~1.62B token b’xejn/xahar · 20 strateġija ta’ routing · $0 biex tibda."/>

</div>

<div align="center">

## 💰 ~1.62B Token fix-Xahar Madwar Livelli B’Xejn ta’ Partijiet Terzi

</div>

> **Uża l-kontijiet tal-fornituri tiegħek.** Dan huwa aggregat stmat bejn livelli b’xejn ta’ partijiet terzi eliġibbli separatament, mhux għotja ta’ tokens minn OmniRoute. Irreġistra, ikseb il-kredenzjali fejn meħtieġ, u qabbad il-fornituri li tista’ tuża; kull fornitur jikkontrolla l-limiti, id-disponibbiltà u t-termini tiegħu.
>
> Li tgħaqqad il-livelli b’xejn manwalment huwa ta’ tbatija — għexieren ta’ SDKs, għexieren ta’ limiti tar-rata, u l-ebda idea ta’ kemm għandek verament. OmniRoute jikkataloga **485 entrata ta’ livelli b’xejn bejn 34 ċavetta ta’ pool rikorrenti** u jikkalkula ċ-ċifra ewlenija tat-tokens mill-**17-il pool b’baġit pubblikat pożittiv ta’ kull xahar flimkien ma’ ħames limiti Groq għal kull mudell**, deduplikati skont il-pool komuni. Il-kwoti li jinfetħu biss wara verifika tal-identità reġjonali (illum: ModelScope) jintwerew separatament, +~6M wara verifika tal-identità reġjonali, u qatt ma jingħaddu fiċ-ċifra ewlenija. Ir-riżultat jibqa’ viżibbli fid-dashboard (`/dashboard/free-tiers`).

<img src="./docs/diagrams/free-tier-budget.svg" width="100%" alt="Karta tal-baġit ta’ OmniRoute għal-livelli b’xejn: ~1.62B token b’xejn fix-xahar b’mod stabbli, sa ~2.22B fl-ewwel xahar bil-krediti tar-reġistrazzjoni, minn 34 ċavetta ta’ pool rikorrenti dokumentata li jkopru 485 entrata ta’ livelli b’xejn katalogati wara endpoint wieħed. Kalkolu onest dedupikat skont il-pool — kull pool komuni jingħadd darba biss, inklużi 17-il pool rikorrenti b’baġit pubblikat pożittiv ta’ tokens fix-xahar flimkien ma’ ħames limiti Groq għal kull mudell; 12-il fornitur huma mmarkati bħala evitabbli fil-katalgu tar-riskju tat-termini sabiex tiddeċiedi int. Il-bar tal-baġit jinkludi Mistral 1B, Nara 210M, LLM7 150M, xKiro 150M, Groq 30M (ħames limiti għal kull mudell) u pools iżgħar, flimkien ma’ krediti tar-reġistrazzjoni tal-ewwel xahar u fornituri li huma b’xejn għal dejjem mingħajr limitu ta’ tokens, murija separatament sabiex qatt ma jintefħu ċ-ċifra ewlenija. Użat/jifdal attwali fuq /dashboard/free-tiers."/>

> Sommarju animat tal-paġna attwali `/dashboard/free-tiers`. Il-metodoloġija sħiħa (deduplikazzjoni tal-pools, livelli ta’ kreditu, termini tal-fornituri): **[docs/reference/FREE_TIERS.md](docs/reference/FREE_TIERS.md)**.
>
> <sub>Dawn iċ-ċifri jiġu awditjati mill-ġdid kull ġimagħtejn kontra l-katalgu attwali u **jistgħu jiżdiedu jew jonqsu** — fornitur itemm livell b’xejn u n-numru jonqos; jidħol wieħed ġdid u jiżdied. Aħna nippubblikaw dak li l-katalgu fil-fatt jikkalkula, qatt l-aħjar każ arrotondat ’il fuq.</sub>

<br/>

<div align="center">

<h3>

⭐ Agħti Star lir-repo jekk OMNIROUTE għinek tiffranka l-flus u tagħmel xogħlok aktar faċli.

</h3>

[![Stilel](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute)
<a href="https://trendshift.io/repositories/23589" target="_blank"><img src="https://trendshift.io/api/badge/repositories/23589" alt="diegosouzapw%2FOmniRoute | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
[![Pożizzjoni fl-istorja tal-istilel](https://api.star-history.com/badge?repo=diegosouzapw/OmniRoute&theme=dark)](https://www.star-history.com/diegosouzapw/omniroute)
[![olud.ai](https://olud.ai/badge.php?tool=diegosouzapw-omniroute)](https://olud.ai/project/diegosouzapw-omniroute.html)

### 💬 Ingħaqad mal-komunità

**👋 Segwi lill-mantenitur — ikseb l-ewwel l-aħbarijiet dwar fornituri ġodda, ħarġiet u pariri:**

[![Segwi lil Diego fuq LinkedIn](https://img.shields.io/badge/Follow_Diego_on-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diegosouzapw/)
[![Segwi lil @diegosouzapw fuq GitHub](https://img.shields.io/github/followers/diegosouzapw?style=for-the-badge&logo=github&logoColor=white&label=Follow%20on%20GitHub&color=181717)](https://github.com/diegosouzapw)

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/U47eFqAXCn)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/omnirouteOficial)
[![WhatsApp Global](https://img.shields.io/badge/WhatsApp_Global-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)
[![WhatsApp Brażil](https://img.shields.io/badge/WhatsApp_Brasil-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)
[![Websajt](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)

**Mistoqsijiet, pariri dwar il-fornituri, pjan direzzjonali u appoġġ → [Discord](https://discord.gg/U47eFqAXCn) · [Telegram](https://t.me/omnirouteOficial) · WhatsApp [🌍 Globali](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4) / [🇧🇷 Brażil](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4) / [Portal](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)**

<br/>

## 📈 Il-Gateway Ikompli Jikber

<div align="center">

|                                    |          v3.8.50           | **v3.8.51** |      `v3.8.54+`       |
| ---------------------------------- | :------------------------: | :---------: | :-------------------: |
| 🌐 Fornituri                       |            352             |   **358**   |          380          |
| 🧠 IDs uniċi tal-mudelli taċ-chat  |            1320            |  **1374**   |         1491          |
| 🖼️ Pont tal-modalitajiet           | 🆕 viżjoni + awdjo + vidjo |      ✓      |           ✓           |
| 📡 Katalgu b’xejn ta’ Radar        |         🆕 opt-in          |      ✓      |           ✓           |
| ⚖️ Skedar konxju mill-kwota        |       🆕 Quota-Share       |      ✓      |           ✓           |
| 📊 Telemetrija tal-kwoti           |         🆕 diretta         |      ✓      |           ✓           |
| 🧰 Modalità mingħajr interfaċċa    |             —              |      —      | 🆕 `serve --headless` |
| 🛤️ Infrastruttura tal-linja LTS    |             —              |      —      | 🆕 kanali tar-rilaxx  |
| 🔎 API għall-iskoperta tal-mudelli |             —              |      —      | 🆕 `/v1/models/query` |

**→ [Pjan direzzjonali](ROADMAP.md) — insuqu fuq il-linja lejn `v3.9.0 LTS`**

</div>

<br/>

## 🧩 Disponibbli

[![Verżjoni npm](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
![NPM ta' Kull Xahar](https://img.shields.io/npm/dm/omniroute?label=npm/month&color=cb3837&logo=npm)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Liċenzja: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![Downloads ta' Docker](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?label=docker%20pulls&logo=docker&color=2496ED)
![Downloads ta' Electron](https://img.shields.io/github/downloads/diegosouzapw/omniroute/total?style=flat&label=electron%20downloads&logo=electron&color=47848F)

<table>
  <tr>
    <td align="right"><b>🚀 Ibda</b></td>
    <td align="center"><a href="#-quick-start">🚀 Bidu malajr</a></td>
    <td align="center"><a href="#-more-install-methods--docker-source-pnpm-arch">📦 Installa</a></td>
    <td align="center"><a href="#first-run">🆓 Qabbad fornitur</a></td>
  </tr>
  <tr>
    <td align="right"><b>💡 Tgħallem</b></td>
    <td align="center"><a href="#-the-promise">💥 Il-wegħda</a></td>
    <td align="center"><a href="#-why-omniroute">🤔 Għaliex OmniRoute</a></td>
    <td align="center"><a href="#-what-sets-omniroute-apart">🏆 X’jagħmel lil OmniRoute differenti</a></td>
  </tr>
  <tr>
    <td align="right"><b>⚙️ Karatteristiċi</b></td>
    <td align="center"><a href="#-combos--the-flagship">🎯 Kombinazzjonijiet</a></td>
    <td align="center"><a href="#-380-ai-providers--153-catalog-marked-free">🌐 Fornituri</a></td>
    <td align="center"><a href="#-full-cli--a2a--mcp">🔌 CLI &amp; MCP</a></td>
  </tr>
  <tr>
    <td align="right"></td>
    <td align="center"><a href="#%EF%B8%8F-save-1595-tokens--automatically">🗜️ Kompressjoni</a></td>
    <td align="center"><a href="#%EF%B8%8F-where-omniroute-runs--anywhere">🖥️ Fejn jaħdem</a></td>
    <td align="center"><a href="#-private--local-first">🔒 Privat</a></td>
  </tr>
  <tr>
    <td align="right"><b>👀 Araha</b></td>
    <td align="center"><a href="#-omniroute-in-action">🎬 Fl-azzjoni</a></td>
    <td align="center"><a href="#-whats-new">✨ X’hemm ġdid</a></td>
    <td align="center"><a href="#-compatible-clis--coding-agents">🤖 CLI kompatibbli</a></td>
  </tr>
  <tr>
    <td align="right"><b>💚 Appoġġ</b></td>
    <td align="center"><a href="#-support-omniroute">💚 Appoġġ / Agħti donazzjoni</a></td>
    <td align="center"><a href="#-community--help">💬 Komunità</a></td>
    <td align="center"><a href="#-sponsors">💖 Sponsers</a></td>
  </tr>
  <tr>
    <td align="right"><b>📦 Proġett</b></td>
    <td align="center"><a href="#%EF%B8%8F-tech-stack">🛠️ Munzell teknoloġiku</a></td>
    <td align="center"><a href="#-documentation">📖 Dokumentazzjoni</a></td>
    <td align="center"><a href="#-1000-contributors">👥 Kontributuri</a></td>
  </tr>
</table>

</div>

<div align="center">
  <b>🌐 F’67 lingwa</b>
  <br/><br/>
  <a href="README.md"><img src="docs/assets/flags/us.svg" width="30" alt="Ingliż (en)" title="Ingliż (en)"></a>
  <a href="docs/i18n/pt-BR/README.md"><img src="docs/assets/flags/br.svg" width="30" alt="Português — Brasil (pt-BR)" title="Português — Brasil (pt-BR)"></a>
  <a href="docs/i18n/pt/README.md"><img src="docs/assets/flags/pt.svg" width="30" alt="Português (pt)" title="Português (pt)"></a>
  <a href="docs/i18n/es/README.md"><img src="docs/assets/flags/es.svg" width="30" alt="Español (es)" title="Español (es)"></a>
  <a href="docs/i18n/fr/README.md"><img src="docs/assets/flags/fr.svg" width="30" alt="Français (fr)" title="Français (fr)"></a>
  <a href="docs/i18n/it/README.md"><img src="docs/assets/flags/it.svg" width="30" alt="Italiano (it)" title="Italiano (it)"></a>
  <a href="docs/i18n/de/README.md"><img src="docs/assets/flags/de.svg" width="30" alt="Deutsch (de)" title="Deutsch (de)"></a>
  <a href="docs/i18n/nl/README.md"><img src="docs/assets/flags/nl.svg" width="30" alt="Nederlands (nl)" title="Nederlands (nl)"></a>
  <a href="docs/i18n/ru/README.md"><img src="docs/assets/flags/ru.svg" width="30" alt="Русский (ru)" title="Русский (ru)"></a>
  <a href="docs/i18n/uk-UA/README.md"><img src="docs/assets/flags/ua.svg" width="30" alt="Українська (uk-UA)" title="Українська (uk-UA)"></a>
  <a href="docs/i18n/pl/README.md"><img src="docs/assets/flags/pl.svg" width="30" alt="Polski (pl)" title="Polski (pl)"></a>
  <a href="docs/i18n/cs/README.md"><img src="docs/assets/flags/cz.svg" width="30" alt="Čeština (cs)" title="Čeština (cs)"></a>
  <a href="docs/i18n/sk/README.md"><img src="docs/assets/flags/sk.svg" width="30" alt="Slovenčina (sk)" title="Slovenčina (sk)"></a>
  <a href="docs/i18n/ro/README.md"><img src="docs/assets/flags/ro.svg" width="30" alt="Română (ro)" title="Română (ro)"></a>
  <a href="docs/i18n/hu/README.md"><img src="docs/assets/flags/hu.svg" width="30" alt="Magyar (hu)" title="Magyar (hu)"></a>
  <a href="docs/i18n/bg/README.md"><img src="docs/assets/flags/bg.svg" width="30" alt="Български (bg)" title="Български (bg)"></a>
  <a href="docs/i18n/da/README.md"><img src="docs/assets/flags/dk.svg" width="30" alt="Dansk (da)" title="Dansk (da)"></a>
  <a href="docs/i18n/fi/README.md"><img src="docs/assets/flags/fi.svg" width="30" alt="Suomi (fi)" title="Suomi (fi)"></a>
  <a href="docs/i18n/no/README.md"><img src="docs/assets/flags/no.svg" width="30" alt="Norsk (no)" title="Norsk (no)"></a>
  <a href="docs/i18n/sv/README.md"><img src="docs/assets/flags/se.svg" width="30" alt="Svenska (sv)" title="Svenska (sv)"></a>
  <a href="docs/i18n/zh-CN/README.md"><img src="docs/assets/flags/cn.svg" width="30" alt="中文 — 简体 (zh-CN)" title="中文 — 简体 (zh-CN)"></a>
  <a href="docs/i18n/zh-TW/README.md"><img src="docs/assets/flags/tw.svg" width="30" alt="中文 — 繁體 (zh-TW)" title="中文 — 繁體 (zh-TW)"></a>
  <a href="docs/i18n/ja/README.md"><img src="docs/assets/flags/jp.svg" width="30" alt="日本語 (ja)" title="日本語 (ja)"></a>
  <a href="docs/i18n/ko/README.md"><img src="docs/assets/flags/kr.svg" width="30" alt="한국어 (ko)" title="한국어 (ko)"></a>
  <a href="docs/i18n/th/README.md"><img src="docs/assets/flags/th.svg" width="30" alt="ไทย (th)" title="ไทย (th)"></a>
  <a href="docs/i18n/vi/README.md"><img src="docs/assets/flags/vn.svg" width="30" alt="Tiếng Việt (vi)" title="Tiếng Việt (vi)"></a>
  <a href="docs/i18n/id/README.md"><img src="docs/assets/flags/id.svg" width="30" alt="Bahasa Indonesia (id)" title="Bahasa Indonesia (id)"></a>
  <a href="docs/i18n/ms/README.md"><img src="docs/assets/flags/my.svg" width="30" alt="Bahasa Melayu (ms)" title="Bahasa Melayu (ms)"></a>
  <a href="docs/i18n/phi/README.md"><img src="docs/assets/flags/ph.svg" width="30" alt="Filipino (phi)" title="Filipino (phi)"></a>
  <a href="docs/i18n/hi/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="हिन्दी (hi)" title="हिन्दी (hi)"></a>
  <a href="docs/i18n/gu/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ગુજરાતી (gu)" title="ગુજરાતી (gu)"></a>
  <a href="docs/i18n/mr/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="मराठी (mr)" title="मराठी (mr)"></a>
  <a href="docs/i18n/ta/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="தமிழ் (ta)" title="தமிழ் (ta)"></a>
  <a href="docs/i18n/te/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="తెలుగు (te)" title="తెలుగు (te)"></a>
  <a href="docs/i18n/bn/README.md"><img src="docs/assets/flags/bd.svg" width="30" alt="বাংলা (bn)" title="বাংলা (bn)"></a>
  <a href="docs/i18n/ur/README.md"><img src="docs/assets/flags/pk.svg" width="30" alt="اردو (ur)" title="اردو (ur)"></a>
  <a href="docs/i18n/fa/README.md"><img src="docs/assets/flags/ir.svg" width="30" alt="فارسی (fa)" title="فارسی (fa)"></a>
  <a href="docs/i18n/ar/README.md"><img src="docs/assets/flags/sa.svg" width="30" alt="العربية (ar)" title="العربية (ar)"></a>
  <a href="docs/i18n/he/README.md"><img src="docs/assets/flags/il.svg" width="30" alt="עברית (he)" title="עברית (he)"></a>
  <a href="docs/i18n/tr/README.md"><img src="docs/assets/flags/tr.svg" width="30" alt="Türkçe (tr)" title="Türkçe (tr)"></a>
  <a href="docs/i18n/az/README.md"><img src="docs/assets/flags/az.svg" width="30" alt="Azərbaycan (az)" title="Azərbaycan (az)"></a>
  <a href="docs/i18n/sw/README.md"><img src="docs/assets/flags/tz.svg" width="30" alt="Kiswahili (sw)" title="Kiswahili (sw)"></a>
  <a href="docs/i18n/el/README.md"><img src="docs/assets/flags/gr.svg" width="30" alt="Ελληνικά (el)" title="Ελληνικά (el)"></a>
  <a href="docs/i18n/hr/README.md"><img src="docs/assets/flags/hr.svg" width="30" alt="Hrvatski (hr)" title="Hrvatski (hr)"></a>
  <a href="docs/i18n/sr/README.md"><img src="docs/assets/flags/rs.svg" width="30" alt="Српски (sr)" title="Српски (sr)"></a>
  <a href="docs/i18n/lt/README.md"><img src="docs/assets/flags/lt.svg" width="30" alt="Lietuvių (lt)" title="Lietuvių (lt)"></a>
  <a href="docs/i18n/et/README.md"><img src="docs/assets/flags/ee.svg" width="30" alt="Eesti (et)" title="Eesti (et)"></a>
  <a href="docs/i18n/lv/README.md"><img src="docs/assets/flags/lv.svg" width="30" alt="Latviešu (lv)" title="Latviešu (lv)"></a>
  <a href="docs/i18n/sl/README.md"><img src="docs/assets/flags/si.svg" width="30" alt="Slovenščina (sl)" title="Slovenščina (sl)"></a>
  <a href="docs/i18n/mt/README.md"><img src="docs/assets/flags/mt.svg" width="30" alt="Malti (mt)" title="Malti (mt)"></a>
  <a href="docs/i18n/ga/README.md"><img src="docs/assets/flags/ie.svg" width="30" alt="Gaeilge (ga)" title="Gaeilge (ga)"></a>
  <a href="docs/i18n/kn/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ಕನ್ನಡ (kn)" title="ಕನ್ನಡ (kn)"></a>
  <a href="docs/i18n/ml/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="മലയാളം (ml)" title="മലയാളം (ml)"></a>
  <a href="docs/i18n/or/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ଓଡ଼ିଆ (or)" title="ଓଡ଼ିଆ (or)"></a>
  <a href="docs/i18n/pa/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ਪੰਜਾਬੀ (pa)" title="ਪੰਜਾਬੀ (pa)"></a>
  <a href="docs/i18n/ne/README.md"><img src="docs/assets/flags/np.svg" width="30" alt="नेपाली (ne)" title="नेपाली (ne)"></a>
  <a href="docs/i18n/si/README.md"><img src="docs/assets/flags/lk.svg" width="30" alt="සිංහල (si)" title="සිංහල (si)"></a>
  <a href="docs/i18n/my/README.md"><img src="docs/assets/flags/mm.svg" width="30" alt="မြန်မာ (my)" title="မြန်မာ (my)"></a>
  <a href="docs/i18n/km/README.md"><img src="docs/assets/flags/kh.svg" width="30" alt="ខ្មែរ (km)" title="ខ្មែរ (km)"></a>
  <a href="docs/i18n/ha/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="Hausa (ha)" title="Hausa (ha)"></a>
  <a href="docs/i18n/yo/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="Yorùbá (yo)" title="Yorùbá (yo)"></a>
  <a href="docs/i18n/ig/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="Igbo (ig)" title="Igbo (ig)"></a>
  <a href="docs/i18n/am/README.md"><img src="docs/assets/flags/et.svg" width="30" alt="አማርኛ (am)" title="አማርኛ (am)"></a>
  <a href="docs/i18n/uz/README.md"><img src="docs/assets/flags/uz.svg" width="30" alt="Oʻzbekcha (uz)" title="Oʻzbekcha (uz)"></a>
  <a href="docs/i18n/ka/README.md"><img src="docs/assets/flags/ge.svg" width="30" alt="ქართული (ka)" title="ქართული (ka)"></a>
  <a href="docs/i18n/hy/README.md"><img src="docs/assets/flags/am.svg" width="30" alt="Հայերեն (hy)" title="Հայերեն (hy)"></a>
  <a href="docs/i18n/bs/README.md"><img src="docs/assets/flags/ba.svg" width="30" alt="Bosanski (bs)" title="Bosanski (bs)"></a>
</div>

<br/>
<br/>

<div align="center">

<a id="first-run"></a>

## 🆓 Installa, qabbad fornitur, imbagħad irrotta permezz ta’ endpoint wieħed

</div>

<img src="./docs/diagrams/works-zero-config.svg" width="100%" alt="Tliet passi: installa u ibda OmniRoute, qabbad fornitur eliġibbli bil-kont jew iċ-ċavetta tal-API tiegħek, imbagħad ipponta l-għodda tiegħek lejn localhost:20128/v1 billi tuża ċavetta tal-API ta’ OmniRoute u l-mudell auto. Ir-routing jiddependi mill-konnessjonijiet eliġibbli disponibbli u mil-limiti tal-fornitur."/>

```bash
# Wara li tikkonnettja fornitur, ikkopja ċ-ċavetta ta’ OmniRoute tiegħek minn Dashboard → Endpoints:
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

<sub>`auto` jeħtieġ rotta eliġibbli. Installazzjoni ġdida jista’ ma jkollha l-ebda destinazzjoni eliġibbli mingħajr ċavetta, u fornitur mingħajr ċavetta jista’ jirrifjuta klijenti ta’ partijiet terzi. Il-fornituri mmarkati b’`tos: avoid`, inkluż Kiro, huma esklużi mir-routing awtomatiku b’mod awtomatiku; il-konnessjoni ta’ kont ma taqbiżx din is-settings. Ara l-[Gwida tal-Livelli B’xejn](docs/getting-started/FREE-TIERS-GUIDE.md) qabel tagħżel fornitur.</sub>

<sub>📦 Skripts ta’ quickstart għall-ikkopjar u t-twaħħil għal **Python, Node.js, PHP, u cURL** → [`examples/quickstart/`](examples/quickstart/)</sub>

<br/>

<div align="center">

# 💥 Il-Wegħda

</div>

<img src="./docs/diagrams/promise-pillars.svg" width="100%" alt="Il-Wegħda — Endpoint wieħed u 380 fornitur. Il-fallback awtomatiku jżomm ir-routing għaddej sakemm ikun hemm destinazzjoni oħra b’saħħitha disponibbli. Sitt pilastri: fallback reżiljenti fost 380 fornitur · sa 95% iffrankar fuq it-tokens għall-ammonti ta’ xogħol eliġibbli · $0 biex tibda b’aktar minn 150 livell b’xejn u 54 fornitur rikorrenti/bla ċavetta b’xejn għal dejjem · 39 integrazzjoni ta’ CLI/aġenti permezz ta’ konfigurazzjoni waħda · kompatibbiltà mal-APIs ta’ OpenAI, Claude, Gemini u Responses fuq /v1 · kontrolli għall-produzzjoni inklużi circuit breakers, stealth tat-TLS, 110 għodda MCP, A2A, memorja, guardrails, evals u aktar minn 56,000 dikjarazzjoni ta’ test statiku fost aktar minn 7,800 fajl tat-test tracked."/>

<br/>
<br/>

<div align="center">

# 🤔 Għaliex OmniRoute?

</div>

<img src="./docs/diagrams/why-pain-fix.svg" width="100%" alt="Għaliex OmniRoute — ieqaf taqleb bejn 10 dashboards, ċwievet tal-API mejta u kontijiet mhux mistennija. Għaxar problemi ta’ kuljum kontra s-soluzzjonijiet: kwota tiskadi mingħajr ma tintuża → immassimizza l-abbonamenti; limiti tar-rata waqt il-kodifikazzjoni → fallback awtomatiku f’4 livelli (Abbonament → API → Irħis → B’xejn); outputs tal-għodod jaħarqu t-tokens → kompressjoni RTK + Caveman (15–95%); APIs għaljin → routing ottimizzat għall-ispiża; kull għodda teħtieġ konfigurazzjoni tagħha → endpoint wieħed, dashboard wieħed; l-AI tkun imblukkata → proxy f’3 livelli + stealth tat-TLS; ċwievet mejta → reżiljenza f’3 saffi (circuit breakers, cooldown taċ-ċavetta, lockout tal-mudell); tim jaqsam abbonament wieħed → pools taċ-ċwievet bi kwoti ġusti skont is-sehem; prompts jgħaddu mill-cloud ta’ xi ħadd ieħor → lokali l-ewwel b’ċwievet kriptati b’AES-256-GCM; l-ebda viżibbiltà tal-infiq → analitika diretta (użu, kwota, iffrankar, latency p95)."/>

<div align="center">

<img src="./docs/diagrams/tier-cascade.svg" width="100%" alt="Fluss ta’ talba ta’ OmniRoute: l-IDE jew CLI tiegħek (Claude Code, Cursor, Cline…) isejjaħ endpoint lokali wieħed (http://localhost:20128/v1); l-Smart Router ta’ OmniRoute (kompressjoni RTK + Caveman, 20 strateġija ta’ routing, circuit breakers, stealth tat-TLS, MCP, A2A, guardrails) jista’ jaqleb bejn 4 livelli ta’ fornituri sakemm jibqa’ disponibbli destinazzjoni eliġibbli u b’saħħitha — Livell 1 Abbonament, Livell 2 Ċavetta tal-API, Livell 3 Irħis u Livell 4 B’xejn."/>

</div>

<br/>

<div align="center">

## 🤝 Appoġġjati mill-Ħbieb tagħna tal-Open Source

</div>

<p align="center">
  <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
    <img src="public/sponsors/kimi-k3-banner.png" width="100%" alt="Kimi K3 — Open Frontier Intelligence · 2.8T parametri · 1M-token kuntest"/>
  </a>
</p>

> **Trid tingħaqad bħala Ħabib tal-Open Source?** Dawn huma l-kumpaniji li jappoġġjaw l-open source u jgħinu biex OmniRoute jibqa' miexi — u aħna ngħidu pubblikament fejn imur kull token li jagħtuna. Ikkuntattjana: [diegosouza.pw@outlook.com](mailto:diegosouza.pw@outlook.com)

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/providers/kimi-logomark-dark.svg">
          <img src="public/providers/kimi-logomark-light.svg" width="64" alt="Kimi (Moonshot AI)"/>
        </picture>
      </a>
      <br/><b>Kimi</b><br/><sub>Moonshot AI</sub><br/><br/>
      <img src="https://img.shields.io/badge/Founding_Friend-1783FF?style=flat-square" alt="Ħabib Fundatur tal-Open Source"/>
    </td>
    <td>
      Grazzi lil <b>Kimi (Moonshot AI)</b>, il-Ħabib Fundatur tagħna tal-Open Source, talli appoġġja dan il-proġett! Kimi huwa l-laboratorju tal-AI wara l-familji ta' mudelli K2 u K3 b'piż miftuħ — <b>Kimi K3</b> joffri tieqa ta' kuntest ta' 1M-token, viżjoni nattiva u kodifikazzjoni ta' livell avvanzat bi frazzjoni tal-prezzijiet tal-mudelli magħluqa, u jaħdem direttament ma' Claude Code, Codex u kull għodda ta' kodifikazzjoni li OmniRoute jservi.
      <br/><br/>
      <b>X'jappoġġja l-appoġġ ta' Kimi:</b> Il-krediti tal-API ta' Kimi jappoġġjaw il-pipeline ta' rilaxx validat mill-AI ta' OmniRoute — l-istadju ta' <i>validazzjoni tal-għaqda mħaddma minn Kimi K3</i> li jirrevedi kull talba ta' pull qabel ma tiġi rilaxxata — flimkien mal-iżvilupp ta' karatteristiċi ta' kuljum. L-appoġġ ta' Kimi ta' l-ewwel klassi jintbagħat fuq iż-żewġ binarji: l-<a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">API diretta ta' Kimi</a> (<code>kimi-k3</code>) u l-<a href="https://www.kimi.ai/code?aff=omniroute">pjan ta' kodifikazzjoni ta' Kimi Code</a> (OAuth u ċavetta API). OmniRoute huwa wkoll l-ewwel proġett open-source Brażiljan fil-programm ta' appoġġ ta' Kimi. <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute"><b>Ikseb ċavetta API ta' Kimi bi 15% krediti żejda →</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://cheaperinference.com/?utm_source=omniroute">
        <img src="./public/providers/cli-generic.svg" width="64" alt="Inferenzja Orħos"/>
      </a>
      <br/><b>Inferenzja Orħos</b><br/><sub>cheaperinference.com</sub><br/><br/>
      <img src="https://img.shields.io/badge/Open_Source_Friend-31f889?style=flat-square&labelColor=04170d" alt="Ħabib tal-Open Source"/>
    </td>
    <td>
      Grazzi lil <b>Cheaper Inference</b>, Ħabib tal-Open Source ta' OmniRoute, talli appoġġja dan il-proġett! Cheaper Inference huwa gateway ikklassifikat skont l-ispiża li jbiegħ mill-ġdid 42 mudell avvanzat — Claude, GPT-5.x, Gemini, Kimi K3, GLM, DeepSeek, Grok u MiniMax — wara endpoint wieħed kompatibbli ma' OpenAI, li jidderieġi kull talba lill-fornitur l-irħas eliġibbli mingħajr qatt ma jitlob aktar mill-prezz tal-lista tal-manifattur tal-mudell.
      <br/><br/>
      <b>Appoġġ ta' l-ewwel klassi f'OmniRoute:</b> Chat Completions, l-endpoint nattiv <code>/v1/responses</code>, viżjoni, sejħa ta' għodda u 3 mudelli ta' immaġni (<code>grok-imagine</code>, <code>nano-banana-pro</code>, <code>nano-banana-2</code>, li jistgħu jintlaħqu bħala <code>cheaperinference/&lt;model&gt;</code>). <a href="https://cheaperinference.com/?utm_source=omniroute"><b>Ikseb ċavetta API →</b></a>
    </td>
  </tr>
</table>

<sub>Links bit-tikketta <code>aff=omniroute</code> huma links ta' sħubija. Huma jiffinanzjaw il-proġett mingħajr ebda spiża żejda għalik.</sub>

<br/>

<details open>
<summary><sub><b>🎟️ Promo tal-Affiljati</b> — kupuni ta' reġistrazzjoni b'xejn minn fornituri li ma nisponsorjawx (ikklikkja biex tespandi)</sub></summary>

<sub><i>Din it-taqsima hija għal kodiċijiet ta' riferiment/kupuni biss. Sħubijiet sponsorjati jinsabu f'<b>🤝 Appoġġjati mill-Ħbieb tagħna tal-Open Source</b> hawn fuq. OmniRoute m'għandu l-ebda sponsorizzazzjoni jew sħubija mal-fornituri elenkati hawn — dawn huma kupuni pubbliċi li kulħadd jista' juża.</i></sub>

<table>
  <tr>
    <td align="center" width="120">
      <a href="https://agentrouter.org/register?aff=70LM">
        <img src="./public/providers/cli-generic.svg" width="32" alt="AgentRouter"/>
      </a>
      <br/><sub><b>AgentRouter</b></sub><br/><sub>agentrouter.org</sub>
    </td>
    <td>
      <sub><b><a href="https://agentrouter.org/register?aff=70LM">AgentRouter</a></b> — reġistrazzjoni affiljata · <b>$100 krediti b'xejn</b> mar-reġistrazzjoni (server b'xejn, stenna latenza ogħla — l-aħjar għall-ittestjar, mhux għall-produzzjoni). Appoġġ ta' l-ewwel klassi f'OmniRoute minn <b>v3.8.50</b>: Chat Completions, il-format tal-wajer kompatibbli ma' Anthropic u l-path kompatibbli ma' OpenAI. Mudelli disponibbli jinkludu <code>claude-opus-4-8</code>, <code>claude-opus-5</code>, <code>gpt-5.6-sol</code> u aktar. <b><a href="https://agentrouter.org/register?aff=70LM">Aqbad il-$100 tiegħek →</a></b></sub>
      <br/><br/>
      <sub>⚠️ <i>Link affiljata — OmniRoute m'għandu l-ebda sponsorizzazzjoni jew sħubija ma' dan il-fornitur.</i></sub>
    </td>
  </tr>
</table>

<sub>Taf fornitur ieħor b'kupun ta' reġistrazzjoni b'xejn ġeneruż li jibbenefika lill-utenti ta' OmniRoute? Iftaħ issue u aħna nżiduh hawn.</sub>

</details>

<br/>

<div align="center">

## 🎯 Combos — Il-Prodott Ewlieni

</div>

<img src="./docs/diagrams/strategies-grid.svg" width="100%" alt="Eżempji animati għal 18 mill-20 strateġija ta’ routing tal-combos — maduma waħda għal kull strateġija: priority, fill-first, weighted, round-robin, p2c, least-used, random, strict-random, cost-optimized, headroom, reset-window, reset-aware, context-relay, context-optimized, lkgp, auto, fusion, pipeline. cache-optimized u quota-weighted mhumiex animati; it-tabella t’hawn taħt tiddeskrivi l-20 kollha."/>

> **Combo** huwa katina ta’ mudelli li OmniRoute jgħaddi bejniethom **awtomatikament**. Jekk il-kwota tispiċċa, fornitur ifalli, jew l-ispejjeż jogħlew f’daqqa, il-combo jista’ jgħaddi għall-mudell eliġibbli u operattiv li jmiss. 🛡️

### ⚡ Mingħajr konfigurazzjoni — uża biss `auto`

M’hemmx għalfejn toħloq combo. Issettja l-mudell tiegħek għal `auto` (jew varjant) u OmniRoute jibni combo virtwali mill-fornituri konnessi tiegħek, b’punteġġ ikkalkulat f’ħin reali:

<table>
  <tr><th align="left">ID tal-Mudell</th><th align="left">Għal xiex jottimizza</th></tr>
  <tr><td align="left" nowrap><code>auto</code></td><td align="left">🎯 Għażla predefinita bbilanċjata (LKGP — jibqa’ mal-aħħar fornitur tajjeb tiegħek)</td></tr>
  <tr><td align="left" nowrap><code>auto/coding</code></td><td align="left">🧑💻 Piżijiet li jagħtu prijorità lill-kwalità għall-ġenerazzjoni tal-kodiċi</td></tr>
  <tr><td align="left" nowrap><code>auto/fast</code></td><td align="left">⚡ L-inqas latenza l-ewwel</td></tr>
  <tr><td align="left" nowrap><code>auto/cheap</code></td><td align="left">💰 L-orħos għal kull token l-ewwel</td></tr>
  <tr><td align="left" nowrap><code>auto/subscription</code></td><td align="left">🎟️ Il-kwota tal-abbonament li diġà tħallas għaliha biss — jagħlaq f’każ ta’ falliment, mingħajr qatt ma jaqa’ lura fuq għażla bi ħlas (<a href="./docs/routing/SUBSCRIPTION_LADDER.md">gwida</a>)</td></tr>
  <tr><td align="left" nowrap><code>auto/thrifty</code></td><td align="left">🪜 Il-kwota tal-pjan l-ewwel, imbagħad tarġa waħda kull darba lejn l-orħos għażliet bi ħlas — jerġa’ lura fuq il-pjan wara li dan jiġi ssettjat mill-ġdid (<a href="./docs/routing/SUBSCRIPTION_LADDER.md">gwida</a>)</td></tr>
  <tr><td align="left" nowrap><code>auto/offline</code></td><td align="left">🔋 L-akbar marġni tal-kwota / tal-limitu tar-rata l-ewwel</td></tr>
  <tr><td align="left" nowrap><code>auto/smart</code></td><td align="left">🔭 Il-kwalità l-ewwel + esplorazzjoni ta’ 10% biex jiskopri mudelli aħjar</td></tr>
  <tr><td align="left" nowrap><code>auto/lkgp</code></td><td align="left">📌 Żamma espliċita mal-aħħar fornitur magħruf li kien tajjeb</td></tr>
  <tr><td align="left" nowrap><code>auto/chaos</code></td><td align="left">🧪 Tifrix parallel lejn grupp ta’ mudelli (wieħed għal kull fornitur, 5 b’mod predefinit), u jirritorna tweġiba waħda; sejħa upstream waħda għal kull mudell fil-grupp, mhux injezzjoni ta’ ħsarat</td></tr>
</table>

##

### 🔀 Jew ibni tiegħek — 20 strateġija ta’ routing

L-**20** strateġija kollha — ħallat u qabbel f’kull pass tal-combo:

<table>
  <tr>
    <th>#</th>
    <th align="left">Strateġija</th>
    <th align="left">X’tagħmel</th>
  </tr>
  <tr>
    <td align="center">1</td>
    <td nowrap><code>priority</code></td>
    <td>Lista ordnata bl-ewwel mira — eżawrixxi kull waħda qabel ma jgħaddi għal dik li jmiss 🥇</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td nowrap><code>fill-first</code></td>
    <td>Uża l-kwota kollha ta’ kull mira qabel ma jgħaddi għal oħra</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td nowrap><code>weighted</code></td>
    <td>Għażla każwali ppeżata skont il-piż ta’ kull mira</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td nowrap><code>round-robin</code></td>
    <td>Jdur mal-miri waħda wara l-oħra fl-ordni</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td nowrap><code>p2c</code></td>
    <td>Ibbilanċjar każwali tat-tagħbija bil-qawwa ta’ żewġ għażliet</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td nowrap><code>least-used</code></td>
    <td>Jagħżel il-mira bl-inqas tagħbija attwali</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td nowrap><code>random</code></td>
    <td>Għażla każwali uniformi (mingħajr duplikati)</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td nowrap><code>strict-random</code></td>
    <td>Għażla każwali mingħajr ma jneħħi r-ripetizzjonijiet 🎲</td>
  </tr>
  <tr>
    <td align="center">9</td>
    <td nowrap><code>cost-optimized</code></td>
    <td>Jimminimizza l-$ għal kull talba mill-prezzijiet diretti tal-katalgu 💸</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td nowrap><code>headroom</code></td>
    <td>Jagħżel il-mira bl-akbar kwota li fadal</td>
  </tr>
  <tr>
    <td align="center">11</td>
    <td nowrap><code>quota-weighted</code></td>
    <td>Jaqbeż il-kontijiet eżawriti, imbagħad jagħżel fi proporzjon mal-kwota li fadal ÷ it-tagħbija kurrenti — il-konverżazzjonijiet eżistenti jibqgħu marbuta mal-istess mira ⚖️</td>
  </tr>
  <tr>
    <td align="center">12</td>
    <td nowrap><code>reset-window</code></td>
    <td>Jippreferi l-mira li t-tieqa tal-kwota tagħha tiġi ssettjata mill-ġdid l-aktar kmieni</td>
  </tr>
  <tr>
    <td align="center">13</td>
    <td nowrap><code>reset-aware</code></td>
    <td>Jikklassifika skont il-ħin tal-issettjar mill-ġdid tal-kwota — twieqi qosra l-ewwel 📊</td>
  </tr>
  <tr>
    <td align="center">14</td>
    <td nowrap><code>context-relay</code></td>
    <td>Jgħaddi l-kuntest bejn il-miri għal konverżazzjonijiet twal 🧠</td>
  </tr>
  <tr>
    <td align="center">15</td>
    <td nowrap><code>context-optimized</code></td>
    <td>Jagħżel l-aħjar għażla għad-daqs attwali tal-kuntest</td>
  </tr>
  <tr>
    <td align="center">16</td>
    <td nowrap><code>cache-optimized</code></td>
    <td>Jorbot kull prefiss tal-prompt li jista’ jerġa’ jintuża mal-istess kont — jimmassimizza l-hits tal-cache tal-prompt 🎯</td>
  </tr>
  <tr>
    <td align="center">17</td>
    <td nowrap><code>lkgp</code></td>
    <td>L-Aħħar Rotta Magħrufa bħala Tajba — jorbot mal-aħħar fornitur li rnexxa, imbagħad jaqa’ lura fuq ir-regoli</td>
  </tr>
  <tr>
    <td align="center">18</td>
    <td nowrap><code>auto</code></td>
    <td>Punteġġ dirett ibbażat fuq 16-il fattur fil-konnessjonijiet kollha 🤖</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td nowrap><code>fusion</code></td>
    <td>Jifrex it-talba lejn grupp ta’ mudelli + ġudikant jissintetizza tweġiba waħda 🧬</td>
  </tr>
  <tr>
    <td align="center">20</td>
    <td nowrap><code>pipeline</code></td>
    <td>Jikkatina l-passi — l-output ta’ kull mira jiddaħħal f’dik li jmiss 🔗</td>
  </tr>
</table>

<sub>Il-magna Auto-Combo tagħti punteġġ lil kull kandidat abbażi ta’ **16-il fattur** (saħħa, kwota, spiża, latenza, adattament għall-kompitu, kwalità, disponibbiltà tas-sessjoni…) — ara [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md).</sub>

##

### 🧱 Ir-reżiljenza hija integrata (3 saffi indipendenti)

<img src="./docs/diagrams/resilience-layers.svg" width="100%" alt="Ir-reżiljenza ta’ OmniRoute — 3 saffi indipendenti li jsewwu lilhom infushom, bis-saff it-tajjeb għall-ħsara t-tajba. Saff 1: salvavita taċ-ċirkwit tal-fornitur (il-fornitur kollu): jinqata’ biss fuq 408/5xx, limiti OAuth 8× / ċavetta API 12× / lokali 2×, jiġi ssettjat mill-ġdid wara 60s/30s/15s għal prova HALF-OPEN, irkupru għażżien; waqt li jkun OPEN, il-combo jidderieġi mill-ġdid lejn il-fornitur li jmiss. Saff 2: perjodu ta’ stennija tal-konnessjoni (ċavetta/kont wieħed): bażi ta’ 5s għal OAuth / 3s għal ċavetta API, dewmien esponenzjali ×2 bi protezzjoni kontra l-anti-thundering-herd, 429 jirrispetta Retry-After, suċċess ineħħi l-istat kollu tal-iżbalji; ċavetta waħda fil-perjodu ta’ stennija tinqabeż filwaqt li ċ-ċwievet l-oħra jibqgħu jservu. Saff 3: imblukkar tal-mudell (mudell wieħed): 429 għal kull mudell, 404 lokali jew rifjuti tal-modalità jimblukkaw biss dak il-mudell — qatt il-konnessjoni kollha. L-istati terminali (ipprojbit, skadut, krediti eżawriti) huma għall-operatur, mhux għal perjodi ta’ stennija."/>

<sub>📖 [Magna Auto-Combo](docs/routing/AUTO-COMBO.md) · [Gwida għar-Reżiljenza](docs/architecture/RESILIENCE_GUIDE.md)</sub>

<br/>

<div align="center">

## 🏆 X'Jagħmel lil OmniRoute Differenti

</div>

<img src="./docs/diagrams/comparison-table.svg" width="100%" alt="X'jagħmel lil OmniRoute differenti — snapshot ta' karatteristiċi skaduti kontra 9router, OpenRouter, CLIProxyAPI u LiteLLM fuq 13-il kapaċità. OmniRoute: 380 providers, 150+ free tiers mibnija ġewwa, 20 strateġija ta' routing, 12-engine token compression, MCP server mibni ġewwa b'110 għodda, protokoll agent A2A, memorja persistenti, guardrails, agents fuq il-cloud, stealth TLS fingerprint, Desktop/Termux/PWA u 67 lokalità UI għal i18n. OmniRoute hija liċenzjata MIT u tista' tospita waħdek. Il-kapaċitajiet u n-numri tal-kompetituri jistgħu jinbidlu; ara l-metodoloġija marbuta."/>

<sub>📊 Metodoloġija sħiħa &amp; dettalji għal kull karatteristika kontra 9router, OpenRouter, CLIProxyAPI &amp; LiteLLM → [`docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`](docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)</sub>

<br/>

## 💚 Appoġġja lil OmniRoute

OmniRoute huwa liċenzjat taħt MIT u miżmum b’mod miftuħ. Jekk jiffrankalek il-ħin jew il-flus, hawn kif tista’ tgħinu jibqa’ indipendenti — agħżel dak li jaqbillek. L-isponsorizzazzjoni qatt ma taffettwa l-prijorità tar-routing; tixtri viżibbiltà, mhux klassifikazzjoni.

<table>
  <tr><td nowrap>⭐ <b>Agħti stilla lir-repożitorju</b></td><td>Bla ħlas — tassew jgħin il-viżibbiltà</td><td><a href="https://github.com/diegosouzapw/OmniRoute">Agħti stilla lil OmniRoute</a></td></tr>
  <tr><td nowrap>🐙 <b>GitHub Sponsors</b></td><td>Ta’ darba jew kull xahar · ebda tariffa tal-pjattaforma</td><td><a href="https://github.com/sponsors/diegosouzapw">github.com/sponsors/diegosouzapw</a></td></tr>
  <tr><td nowrap>☕ <b>Ko-fi</b></td><td>Donazzjoni ta’ darba u malajr, mingħajr reġistrazzjoni għad-donatur</td><td><a href="https://ko-fi.com/diegosouzapw">ko-fi.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🧋 <b>Buy Me a Coffee</b></td><td>Ġest żgħir u informali</td><td><a href="https://www.buymeacoffee.com/diegosouzapw">buymeacoffee.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🖐 <b>Liberapay</b></td><td>Rikorrenti · mingħajr skop ta’ qligħ · sors miftuħ</td><td><a href="https://liberapay.com/diegosouzapw">liberapay.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🇧🇷 <b>PIX</b> (Brażil)</td><td>Immedjat, mingħajr tariffi</td><td>iċ-ċavetta &amp; il-QR hawn taħt</td></tr>
  <tr><td nowrap>₿ <b>Kripto</b></td><td>BTC · ETH · USDT-TRC20 · USDC-Solana</td><td>l-indirizzi hawn taħt</td></tr>
</table>

**🇧🇷 PIX** — immedjat, mingħajr tariffi (Brażil)

<img src="docs/assets/pix-qr.png" width="140" align="right" alt="Kodiċi QR PIX ta’ OmniRoute"/>

Ċavetta (każwali): `5d865059-bc44-483a-962d-43ceb80126eb`

Pix biex tikkopja u twaħħal:

```
00020101021126580014br.gov.bcb.pix01365d865059-bc44-483a-962d-43ceb80126eb5204000053039865802BR5922OMNIROUTE CONTRIBUICAO6006BRASIL62070503***630475DD
```

<br clear="right"/>

<details>
<summary><b>₿ Kripto</b> — BTC · ETH · USDT-TRC20 · USDC-Solana (ikklikkja biex tiftaħ)</summary>

<table>
  <tr><td nowrap><b>₿ BTC</b></td><td nowrap>Bitcoin (SegWit)</td><td><code>bc1qh00smz004sy85wyl28v77tenkt3ckl6eaep7fd</code></td></tr>
  <tr><td nowrap><b>Ξ ETH</b></td><td nowrap>Ethereum (ERC20)</td><td><code>0x64Cf6B68A6Ff34288e89172950a2d00102337a84</code></td></tr>
  <tr><td nowrap><b>₮ USDT</b></td><td nowrap>Tron (TRC20)</td><td><code>TKAF41JpuQrHbKTnsQa9svJE2T192Hvsc2</code></td></tr>
  <tr><td nowrap><b>$ USDC</b></td><td nowrap>Solana</td><td><code>2emNNZzVVWQc3FQ2wk9M6qXUQmW8AKdjjL174fXR28Tu</code></td></tr>
</table>

<sub>⚠️ Ibgħat kull munita biss fuq in-network indikat — jekk tibgħatha fuq network ħażin tista’ titlef il-fondi.</sub>

</details>

🐛 Sibt bug jew għandek kummenti? Iftaħ [Diskussjoni](https://github.com/diegosouzapw/OmniRoute/discussions).

<br/>

<p><strong>Noti għall-iżviluppaturi:</strong> Il-proġett jista’ jiġġenera fajl lokali <code>.env</code> waqt npm install/postinstall għall-konvenjenza tal-iżviluppaturi. Dan il-fajl jiġi injorat intenzjonalment permezz ta’ <code>.gitignore</code> (ara <code>.gitignore</code>) u qatt ma għandu jiġi kkommittjat — jekk jiġi kkommittjat bi żball, dawwar kwalunkwe sigriet espost u neħħi l-fajl mill-istorja. Ara <a href="docs/DEVELOPER-ENVIRONMENT.md">docs/DEVELOPER-ENVIRONMENT.md</a> għal gwida dwar il-ġestjoni tal-fajls tal-ambjent lokali u tas-sigrieti.</p>

## 📡 Radar OmniRoute

Iċ-ċifra ewlenija tal-livell bla ħlas tibqa’ **~1.62B tokens/xahar** mill-katalogu dokumentat u deduplikat skont il-pool hawn fuq. Il-krediti temporanji ta’ reġistrazzjoni mingħand il-fornituri jistgħu separatament jgħollu l-ewwel xahar għal **~2.22B**. Radar huwa overlay fakultattiv u ffirmat tal-katalogu għal dawk li jixtiequ disponibbiltà aktar aġġornata ta’ mudelli bla ħlas bejn ir-rilaxxi ta’ OmniRoute; il-katalogu tal-komunità u kull karatteristika eżistenti bla ħlas jibqgħu bla ħlas.

Is-sostenituri jistgħu jirċievu l-katalogu dirett u opportunitajiet addizzjonali mingħand il-fornituri. Il-limitu separat u varjabbli tiegħu huwa ta’ **madwar 3B tokens/xahar l-aktar**, skont id-disponibbiltà tal-fornituri. Dak il-limitu mhuwiex garanzija: il-fornituri jistgħu jibdlu l-kwoti, l-eliġibbiltà, il-mudelli jew ir-reġjuni fi kwalunkwe ħin.

Radar huwa fakultattiv u juża GET biss. Il-klijent OmniRoute ma jtellax prompts, traffiku, konfigurazzjoni tal-fornituri, telemetrija tal-użu jew l-istat lokali tat-twarrib tal-avviżi. Sir af dwar l-eliġibbiltà u l-katalogu attwali fuq **[radar.omniroute.online/planos](https://radar.omniroute.online/planos)**.

<br/>

<div align="center">

## ✨ X'hemm Ġdid

</div>

> Highlights reċenti minn **v3.8.20 → v3.8.54**. Storja sħiħa f'[`CHANGELOG.md`](CHANGELOG.md).

- **⚖️ `quota-weighted` routing** — l-20 strateġija ta' combo taqbeż kontijiet eżawriti, imbagħad tagħżel fost il-bqija skont il-kwota li fadal ÷ tagħbija in-flight, u żżomm konversazzjonijiet eżistenti pinned. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🧰 Modalità headless** — `omniroute serve --headless` (jew `OMNIROUTE_HEADLESS=1`) taħdem biss il-magna tal-proxy `/v1/*`, bil-dashboard u s-sistemi biss tal-dashboard mitfija. → [Modalità Headless](docs/guides/HEADLESS.md)
- **🔎 Skoperta tal-mudelli** — `/v1/models` jiffiltra skont il-kapaċità, kuntest, tip u test, u `POST /v1/models/query` jirritorna shortlist deterministika qasira bl-istess viżibilità għal kull key. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🔑 Kontroll tar-routing għal kull key** — pinja API key għal mudell jew combo wieħed b'`forcedModel`, u żid jew neħħi mudelli u combos ta' key b'mod atomiku (`/api/keys/{id}/access`). → [Referenza API](docs/reference/API_REFERENCE.md) · [OpenAPI](docs/openapi.yaml)
- **🛡️ Kontrolli PII aktar preċiżi** — għażla għal kull tip, sa 20 pattern ta' masking personalizzati validati u counters ta' skoperta għal kull tip; il-masking jibqa' opt-in. → [Guardrails](docs/security/GUARDRAILS.md)
- **🌍 67 lingwa** — dashboard, mirja tad-dokumenti u CLI, b'`npm run i18n:add-locale` iżżid lingwa kullimkien b'kmand wieħed. → [Gwida i18n](docs/guides/I18N.md)
- **🎛️ OmniConductor** — delegazzjoni inbound A2A lejn il-fleet tal-agents tiegħek, skills Conductor fuq il-Agent Card, u panel tal-dashboard b'Faro push-to-talk voice chat. → [A2A Server](docs/frameworks/A2A-SERVER.md)
- **🛂 Ammissjoni adattiva & protezzjoni minn overload** — talbiet ta' chat heavy-weight jiġu fil-kju minflok 503, b'RPM rolling leases atomici għal kull konnessjoni. → [Gwida Reżiljenza](docs/architecture/RESILIENCE_GUIDE.md)
- **🗂️ Ordni kanonika ta' `/v1/models`** — blokka waħda kontinwa għal kull provider (combos pinned l-ewwel), stabbli fuq kull sors ta' katalogu. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🗜️ Imsaħħa kompressjoni** — inflation guard default-on, Caveman packs għal DE / FR / JA + Ċiniż (wényán), RTK filters għal Gradle & .NET. → [Kompressjoni](docs/compression/COMPRESSION_ENGINES.md)
- **💸 Spiża flat-rate onesta** — providers ta' subscription / coding-plan jaqraw **$0** fl-analitika tal-ispiża; budget, kwota & routing jibqgħu jistimaw. → [Referenza API](docs/reference/API_REFERENCE.md)
- **⚖️ Routing Quota-Share** — qsim ġust tal-kwota ta' kont maqsum fuq keys pooled, b'mod li slices idle jinqalgħu. → [Gwida Reżiljenza](docs/architecture/RESILIENCE_GUIDE.md)
- **🤖 Setup CLI/agent b'kmand wieħed** — 15-il kmand `setup-*` irreġistrati; `omniroute run` tniedi 7 CLI (Claude Code, Codex, Aider, Goose, OpenCode, Qwen Code, Gemini CLI); `omniroute configure` jappoġġja 11-il target b'provider+model picker interattiv u favorites għal kull kuntest. → [CLI Integrations](docs/guides/CLI-INTEGRATIONS.md)
- **🛰️ Modalità remota** — imexxi OmniRoute remot b'tokens skopjati (`connect` / `contexts` / `tokens`) + helper OAuth `antigravity` għal installs VPS. → [Modalità Remota](docs/guides/REMOTE-MODE.md)
- **🧭 Auto-routing aktar intelliġenti** — combos `auto/<category>:<tier>`, **Fusion** (panel tal-mudell + judge), routing konxju tat-task, overrides għal kull talba fuq mudell / modalità / USD-budget. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🗜️ Kompressjoni pluggable** — 12-il magna kompostabbli + Compression Studios: LLMLingua-2, Ultra b'żewġ livelli, omniglyph, fidelity gate għal kull pass, GCF v3.2, editur drag-reorder. → [Kompressjoni](docs/compression/COMPRESSION_ENGINES.md)
- **🕵️ MITM decrypt trasparenti (TPROXY)** — jaqbad CLI li jinjoraw env vars tal-proxy, b'CA għal kull SNI + installer trust-store. → [MITM/TPROXY](docs/security/MITM-TPROXY-DECRYPT.md)
- **💸 Telemetrija tal-ispiża kullimkien** — headers ta' cost/usage `X-OmniRoute-*` fuq kull endpoint, header ta' savings cache-HIT, kwoti ta' nefqa USD għal kull key. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🧠 Memorja taħt il-kontroll tiegħek** — mitfija b'mod default, opt-in int8 vector quantization + typed decay, għal kull talba `x-omniroute-no-memory`. → [Memorja](docs/frameworks/MEMORY.md)
- **🛡️ Sigurtà** — guard kontra prompt-injection fuq kull route LLM (red-team suite), guardrail opt-in għal masking ta' credentials (jirredata API keys/secrets leaked fiż-żewġ direzzjonijiet), tfittxija web DuckDuckGo b'xejn bħala l-aħħar għażla, u optional OIDC login gate għall-dashboard (login bil-password dejjem disponibbli). → [Guardrails](docs/security/GUARDRAILS.md)
- **🖼️ Endpoints ġodda** — `/v1/ocr` (Mistral OCR) u `/v1/audio/translations` (stil Whisper) jikkumplimentaw is-surface tal-media. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🎨 Ġenerazzjoni ta' immaġni / vidjo / awdjo** — API waħda għall-media: xAI Grok Imagine & Novita AI video, ComfyUI, Magnific, Adobe Firefly, Segmind, u providers tal-leħen bħal ElevenLabs. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🌍 Deploy & operazzjonijiet** — `basePath` reverse-proxy, auto-detect tal-lingwa tal-browser, tracking tal-apparat għal kull key, MITM trust mingħajr root, lokalizzazzjoni zh-TW. → [Ambjent](docs/reference/ENVIRONMENT.md)
- **🤝 Aktar providers & agents** — agents cloud (Codex Cloud, Cursor, Devin, Jules), Grok Build (xAI) b'login browser + OAuth, Ollama first-class card, Claude Opus 5 & Sonnet 5, sħubija uffiċjali ma' Kimi (Code/Web/Moonshot), Zed, Requesty, SenseNova, Yuanbao, Agnes AI… u katalogu aġġornat ta' **380 provider**. → [Providers](docs/reference/PROVIDER_REFERENCE.md)
- **📡 Trasparenza fir-routing** — kull risposta ġġorr header `X-OmniRoute-Decision` li jismu l-istrateġija/provider/latency li serviet, strateġija ġdida ta' combo `cache-optimized` + Auto-Combo `cacheAffinity` factor jirritornaw talbiet ripetuti lura għall-konnessjoni li għandha l-prefix cached, u endpoint read-only `/v1/auto-combo/{channel}/candidates` jesponi pool ta' kandidati ħajjin ta' channel `auto/*`. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **⚡ Prestazzjoni u infrastruttura lokali** — Redis lokali b’klikk waħda, deployers ta’ relay għal Cloudflare Workers / Deno Deploy, Bifrost & Mux bħala servizzi inkorporati u ssorveljati. → [Servizzi Inkorporati](docs/frameworks/EMBEDDED-SERVICES.md)
- **🧩 Kollox fil-kaxxa wkoll** — qafas ta’ plugins + suq, qfief ta’ ħiliet Omni/Agent/GitHub, integrazzjoni ma’ Obsidian vault (22 għodda MCP), APIs Batch & Files kompatibbli ma’ OpenAI, cache semantiku tar-risposti, gamifikazzjoni b’leaderboards, skoperta ta’ aġenti ACP (15 aġent mibni ġewwa), esportazzjoni skedata tal-logs għal BigQuery, `auto/chaos` fan-out parallel b’diversi mudelli, bridge għal bot ta’ Telegram, maniġer tal-verżjoni fl-app u klassifiki ta’ fornituri ħielsa LMArena-ELO. → [Dokumentazzjoni](docs/README.md)

<br/>

<div align="center">

## 🤖 CLI u Aġenti tal-Kodiċi Kompatibbli

> Konfigurazzjoni waħda — `http://localhost:20128/v1` — u **kull** IDE jew CLI tal-AI jaħdem fuq mudelli b'xejn u bi prezz baxx.

<div align="center">
<table>
  <tr>
    <td align="center" width="76"><a href="https://github.com/anthropics/claude-code"><img src="./public/providers/claude.svg" width="40" alt="Claude Code"/><br/><sub><b>Claude Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><a href="https://github.com/openai/codex"><img src="./public/providers/codex.svg" width="40" alt="Codex CLI"/><br/><sub><b>Codex CLI</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/cline.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cline.svg" width="40" alt="Cline"/></picture><br/><sub><b>Cline</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/Kilo-Org/kilocode"><img src="./public/providers/cli-generic.svg" width="40" alt="Kilo Code"/><br/><sub><b>Kilo Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><a href="https://github.com/Zoo-Code-Org/Zoo-Code"><img src="./public/providers/cli-generic.svg" width="40" alt="Zoo Code"/><br/><sub><b>Zoo Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><img src="./public/providers/continue.svg" width="40" alt="Continue"/><br/><sub><b>Continue</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Aider"/><br/><sub><b>Aider</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="ForgeCode"/><br/><sub><b>ForgeCode</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="jcode"/><br/><sub><b>jcode</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/deepseek.svg" width="40" alt="DeepSeek TUI"/><br/><sub><b>DeepSeek TUI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="CodeWhale"/><br/><sub><b>CodeWhale</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/anomalyco/opencode"><img src="./public/providers/cli-generic.svg" width="40" alt="OpenCode"/><br/><sub><b>OpenCode</b></sub><br/><sub>                           </sub></a></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Factory Droid"/><br/><sub><b>Factory Droid</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/copilot.svg" width="40" alt="GitHub Copilot CLI"/><br/><sub><b>Copilot CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cursor.svg" width="40" alt="Cursor CLI"/><br/><sub><b>Cursor CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Smelt"/><br/><sub><b>Smelt</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Pi (pi-coding-agent)"/><br/><sub><b>Pi</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/grok.svg" width="40" alt="Grok Build (xAI)"/><br/><sub><b>Grok Build</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/nousresearch.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nousresearch.svg" width="40" alt="Hermes Agent (Nous Research)"/></picture><br/><sub><b>Hermes Agent</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/openclaw.svg" width="40" alt="OpenClaw"/><br/><sub><b>OpenClaw</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/goose.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/goose.svg" width="40" alt="Goose"/></picture><br/><sub><b>Goose</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Open Interpreter"/><br/><sub><b>Open Interpreter</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Warp AI"/><br/><sub><b>Warp AI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://deyin.ai"><img src="./public/deyin.svg" width="40" alt="deyin.ai"/><br/><sub><b>deyin.ai</b></sub><br/><sub>                           </sub></a></td>
  </tr>
</table>
</div>

<div align="center">
<b>＋ jaħdem ukoll ma'</b> · Agent Deck · Kiro · Command Code · Antigravity · Windsurf · AMP · <b>kull għodda kompatibbli ma' OpenAI</b>
</div>

<sub>📖 Setup għal kull għodda individwali għat-39 għodod kollha (28 CLI Code's + 11 CLI Agents) → [`docs/reference/CLI-TOOLS.md`](docs/reference/CLI-TOOLS.md) · 🧩 Plugin OpenCode → [`@omniroute/opencode-provider`](https://www.npmjs.com/package/@omniroute/opencode-provider)</sub>

</div>

<br/>

**Nedja kwalunkwe CLI appoġġjata permezz ta’ OmniRoute b’kmand wieħed** — l-ebda fajls ta’ konfigurazzjoni miktuba,
kredenzjali injettati għal kull proċess, Qwen/Gemini jingħataw home iżolat temporanju:

```bash
omniroute run claude   --model openai/gpt-5.4          # Claude Code
omniroute run codex    --model glm/glm-5.2             # OpenAI Codex CLI
omniroute run aider    --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose    --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen     --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Jew agħżel provider+model b’mod interattiv u ikteb il-konfigurazzjoni tal-għodda:
omniroute configure codex          # ukoll: claude opencode qwen aider goose gemini cline continue kilo 5dive
```

Kull kmand josserva l-kuntest remot attiv (`omniroute connect <host>`), `--dry-run`
juri preview eżatt tal-env/args mingħajr eżekuzzjoni, u `--api-key-env NAME` iżomm sigrieti barra
mill-istorja tas-shell tiegħek. → [CLI Integrations](docs/guides/CLI-INTEGRATIONS.md)

<br/>

<div align="center">

## 🌐 380 Fornitur tal-IA — 153 Immarkati bħala B’xejn fil-Katalgu

</div>

> **380 fornitur irreġistrat** fil-kollezzjonijiet kanoniċi taċ-chat, tal-midja, tat-tfittxija, lokali, tal-aġenti tal-cloud u tas-sistema, inklużi **153 li għandhom metadata ta’ skoperta `hasFree: true`**. Ir-reġistru tal-mudelli taċ-chat ikopri **239 fornitur / 3,059 par distint ta’ fornitur-mudell / 1,475 ID mhux ipproċessat tal-mudelli**; il-katalgu separat tal-baġit b’xejn għandu **471 ringiela għal kull mudell**, **34 pool rikorrenti** u **54 fornitur rikorrenti/bla ċavetta b’xejn għal dejjem**. Dawn huma denominaturi differenti skont id-disinn; id-definizzjonijiet u l-kalkoli deduplikati skont il-pool jinsabu fir-[Referenza tal-Fornituri](docs/reference/PROVIDER_REFERENCE.md) u fil-[Livelli B’xejn](docs/reference/FREE_TIERS.md).

<div align="center">

### 🏢 Kull laboratorju ewlieni — permezz ta’ endpoint wieħed

<table>
  <tr>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/openai.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/openai.svg" width="40" alt="OpenAI"/></picture><br/><sub>OpenAI</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/claude-color.svg" width="40" alt="Anthropic"/><br/><sub>Anthropic</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/gemini-color.svg" width="40" alt="Gemini"/><br/><sub>Gemini</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/grok.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/grok.svg" width="40" alt="xAI Grok"/></picture><br/><sub>xAI Grok</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/deepseek-color.svg" width="40" alt="DeepSeek"/><br/><sub>DeepSeek</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/mistral-color.svg" width="40" alt="Mistral"/><br/><sub>Mistral</sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qwen-color.svg" width="40" alt="Qwen"/><br/><sub>Qwen</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/meta-color.svg" width="40" alt="Meta Llama"/><br/><sub>Meta Llama</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/groq.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/groq.svg" width="40" alt="Groq"/></picture><br/><sub>Groq</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nvidia-color.svg" width="40" alt="NVIDIA"/><br/><sub>NVIDIA</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/minimax-color.svg" width="40" alt="MiniMax"/><br/><sub>MiniMax</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cohere-color.svg" width="40" alt="Cohere"/><br/><sub>Cohere</sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/perplexity-color.svg" width="40" alt="Perplexity"/><br/><sub>Perplexity</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/huggingface-color.svg" width="40" alt="Hugging Face"/><br/><sub>HuggingFace</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/together-color.svg" width="40" alt="Together"/><br/><sub>Together</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/fireworks-color.svg" width="40" alt="Fireworks"/><br/><sub>Fireworks</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cloudflare-color.svg" width="40" alt="Cloudflare"/><br/><sub>Cloudflare</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/baidu-color.svg" width="40" alt="Baidu"/><br/><sub>Baidu</sub><br/><sub>                           </sub></td>
  </tr>
</table>

<sub>…u 350+ oħra — kull ikona tissolva direttament mill-katalgu tal-fornituri tad-dashboard. 📖 [Referenza tal-Fornituri](docs/reference/PROVIDER_REFERENCE.md)</sub>

<br/>

### 🆓 B’xejn għal Dejjem — $0, l-ebda kard</

<table>
  <tr>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="OpenCode Zen"/><br/><b>OpenCode Zen</b><br/><sub>DeepSeek V4, Nemotron 3<br/>L-ebda limit fuq it-tokens</sub></td>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="Kilo Code"/><br/><b>Kilo Code</b><br/><sub>Auto-router, Tencent Hy3<br/>B’xejn għal dejjem</sub></td>
    <td align="center" width="150"><img src="./public/providers/requesty.svg" width="42" alt="Requesty"/><br/><b>Requesty</b><br/><sub>GPT-OSS 120B, Nemotron<br/>B’xejn għal dejjem</sub></td>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/siliconcloud-color.svg" width="42" alt="SiliconFlow"/><br/><b>SiliconFlow</b><br/><sub>DeepSeek V3.2 / R1<br/>Livell b’xejn</sub></td>
    <td align="center" width="150"><img src="./public/providers/zhipu.svg" width="42" alt="Z.AI GLM"/><br/><b>Z.AI GLM</b><br/><sub>GLM-4.7 / 4.5-Flash<br/>B’xejn għal dejjem</sub></td>
    <td align="center" width="150"><img src="./public/providers/baidu.svg" width="42" alt="Baidu ERNIE"/><br/><b>Baidu ERNIE</b><br/><sub>ERNIE 4.0<br/>B’xejn għal dejjem</sub></td>
  </tr>
  <tr>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qoder-color.svg" width="42" alt="Qoder AI"/><br/><b>Qoder AI</b><br/><sub>Qwen3-Max, Kimi-K2<br/>B’XEJN bla limitu</sub></td>
    <td align="center" width="150"><img src="./public/providers/pollinations.svg" width="42" alt="Pollinations"/><br/><b>Pollinations</b><br/><sub>GPT, Llama, Claude<br/>M’hemmx bżonn ċavetta</sub></td>
    <td align="center" width="150"><img src="./public/providers/cloudflare.svg" width="42" alt="Cloudflare AI"/><br/><b>Cloudflare AI</b><br/><sub>Aktar minn 50 mudell<br/>10K newron kuljum</sub></td>
    <td align="center" width="150"><img src="./public/providers/nvidia.svg" width="42" alt="NVIDIA NIM"/><br/><b>NVIDIA NIM</b><br/><sub>GLM, MiniMax<br/>~40 RPM b’xejn</sub></td>
    <td align="center" width="150"><img src="./public/providers/cerebras.svg" width="42" alt="Cerebras"/><br/><b>Cerebras</b><br/><sub>GLM 4.7, GPT-OSS<br/>Kreditu ta’ $5 darba waħda; karta meħtieġa</sub></td>
    <td align="center" width="150"><img src="./public/providers/openrouter.svg" width="42" alt="OpenRouter"/><br/><b>OpenRouter</b><br/><sub>:free models<br/>+$10 → RPM ogħla</sub></td>
  </tr>
</table>

📖 Katalgu sħiħ li jinqara mill-magni → [`docs/reference/PROVIDER_REFERENCE.md`](docs/reference/PROVIDER_REFERENCE.md)

<br/>
</div>

<div align="center">

## 🖥️ Fejn OmniRoute Runs — Kullimkien

</div>

> L-istess app, il-magna tiegħek, ir-regoli tiegħek. Minn npm globali jinstallaw għal** telefon tiegħek** permezz ta’ Termux.

<table>
  <tr><th align="left"> Pjattaforma </th><th align="left"> Installa </th><th align="left"> Highlights </th></tr>
  <tr><td align="left" nowrap>📦 <b> npm (globali)</b></td><td align="left" nowrap><code> npm install -g omniroute </code></td><td align="left"> Kmand wieħed, kwalunkwe OS</td></tr>
  <tr><td align="left" nowrap>⚡ <b>Bun (globali)</b></td><td align="left" nowrap><code> bun add -g omniroute </code></td><td align="left"> L-istess tarball tar-reġistru, installs faster </td></tr>
  <tr><td align="left" nowrap>🐳 <b>Docker</b></td><td align="left" nowrap><code> docker run … diegosouzapw/omniroute</code></td><td align="left"> Multi-arch <b>AMD64 + ARM64</b></td></tr>
  <tr><td align="left" nowrap>🖥️ <b> Desktop (Electron)</b></td><td align="left" nowrap><code> npm run electron:build </code></td><td align="left"> Native window + system trey — <b>Windows / macOS / Linux</b></td></tr>
  <tr><td align="left" nowrap>🎩 <b> Menu-bar (OmniRouteTray)</b></td><td align="left" nowrap><code> brew install --cask zoispag/tap/omniroute-tray</code></td><td align="left"> Jissorvelja &amp; auto-updates the server — <b>macOS</b></td></tr>
  <tr><td align="left" nowrap>💪 <b>ARM</b></td><td align="left" nowrap> native <code> arm64 </code></td><td align="left"> Raspberry Pi, ARM servers, Apple Silicon </td></tr>
  <tr><td align="left" nowrap>📱 <b> Android (Termux)</b></td><td align="left" nowrap><code> pkg install nodejs && npx -y omniroute </code></td><td align="left"> Runs <b> on your phone </b>, 24/7, no root </td></tr>
  <tr><td align="left" nowrap>📲 <b>PWA</b></td><td align="left" nowrap>"Żid mal-Iskrin tad-Dar"</td><td align="left"> Skrin sħiħ, offline, jistallabbli mill-browser </td></tr>
  <tr><td align="left" nowrap>🧩 <b>OpenCode plugin </b></td><td align="left" nowrap><code>@omniroute/opencode-provider</code></td><td align="left"> Native OpenCode integration </td></tr>
  <tr><td align="left" nowrap>🤖 <b>VS Kodiċi Copilot Chat </b></td><td align="left" nowrap> install <b>OmniCopilot</b> extension </td><td align="left">OmniRoute mudell zqo fl-indiġeni Copilot Chat picker — stabbli &amp; Insiders </td></tr>
  <tr><td align="left" nowrap>🛠️ <b> Minn sors </b></td><td align="left" nowrap><code> npm install && npm run dev </code></td><td align="left"> Hack fuqha, tikkontribwixxi </td></tr>
</table>

<sub>📖 [Docker Guide](docs/guides/DOCKER_GUIDE.md) · [Desktop](electron/README.md) · [Menu-bar trey](https://github.com/zoispag/omniroute-tray) · [Termux](docs/guides/TERMUX_GUIDE.md) · [PWA](docs/guides/PWA_GUIDE.md) · [OpenCode](docs/frameworks/OPENCODE.md)</sub>

<br/>

<div align="center">

### 🧩 Ġdid: OmniRoute ġewwa VS Kodiċi nattiv Copilot Chat

</div>

> L-ebda sidebar ġdida, l-ebda chat UI ġdida — kull mudell OmniRoute iservi jidher dritt fil-**Copilot Chat model picker li diġà tuża** . Minn VS Code 1.122, il-mudelli tal-fornituri jaħdmu mingħajr GitHub sign-in jew abbonament Copilot — mod ta 'aġent, sejħa ta' għodda u viżjoni, b'xejn.

Installa l-** [OmniCopilot](https://github.com/diegosouzapw/OmniCopilot)** estensjoni, ippuntah lejn is-server OmniRoute tiegħek (defaults għal `localhost:20128`), imbagħad iftaħ Copilot Chat → model picker →** Immaniġġja Mudelli...** →**OmniRoute** .

<table>
  <tr><th align="left"> Aħżen </th><th align="left"> Link </th><th align="left"> Jaħdem ma </th></tr>
  <tr><td align="left" nowrap>🧩 <b>VS Code Marketplace </b></td><td align="left"><a href="https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot"> Install →</a ></td >< td align ="left">VS Code — stable &amp; Insiders </td></tr>
  <tr><td align="left" nowrap>🔓 <b> Iftaħ VSX Reġistru </b></td><td align="left"><a href="https://open-vsx.org/extension/diegosouzapw/omnicopilot"> Installa →</a ></td >< td align ="left">Cursor, Windsurf, VSCodium, Theia, code-server </tr>AntigravityKiro…</td>
</table>

Minn ġewwa l-editur: iftaħ il-** Estensjonijiet** ħsieb, tfittxija** "OmniRoute"** , ikklikkja** Installa** — jaħdem bl-istess mod fiż-żewġ ħwienet. Sors, kwistjonijiet u r-runbook tal-pubblikazzjoni ħajjin fuq [diegosouzapw/OmniCopilot](https://github.com/diegosouzapw/OmniCopilot).

<sub>📖 [VS Kodiċi Copilot Gwida taċ-chat](docs/guides/VSCODE-COPILOT.md) — setup, dak li juri l-picker, dashboard-in-a-tab, issolvi l-problemi </sub>

<br/>

<div align="center">

### 🎩 Ġdid: OmniRouteTray — il-portal tiegħek, li tgħix fil-menu bar

</div>

> `omniroute serve` huwa happiest meta dejjem mixghul.** [OmniRouteTray](https://github.com/zoispag/omniroute-tray)** jibdel dan f'app tal-menu-bar issettja u tinsa għal macOS: jibda s-server, iżżommu ħaj matul reboots, jaġġornah f'postu, u jpoġġi l-baġit tat-tokens ħajjin tiegħek klikk waħda bogħod -** l-ebda tieqa terminali ma tithalla miftuha, l-ebda `npm install -g omniroute` ghal babysitting.**

Mibnija [b'Tauri v2](https://v2.tauri.app/) (qalba Rust tad-daqs ta 'żball ta' arrotondament), tibgħat il-ħin tar-runtime Node 24 iffirmat tagħha stess u tamministra OmniRoute install ta' app, u għalhekk qatt ma tiġġieled `node`/`bun` globali tiegħek. Huwa** jaqsam il-konfigurazzjoni u d-database `~/.omniroute/` eżistenti tiegħek** — allura huwa l-istess OmniRoute li diġà tmexxi, biss bil-kappell fuq. 🎩

<table>
  <tr><th align="left"></th><th align="left"> Kif </th></tr>
  <tr><td align="left" nowrap>🟢 <b> Jissorvelja s-server </b></td><td align="left"> Spawns <code> omniroute serve </code>, jadotta istanza li diġà qed taħdem minflok ma tidduplikaha </td></tr>
  <tr><td align="left" nowrap>📊 <b> Użu dirett f'daqqa t'għajn </b><td align="left"></td> tal-kwoti tal-fornitur, Claude session/weekly limiti b'reset countdowns, tqassim tal-ispejjeż ta' 30 jum </td></tr>
  <tr><td align="left" nowrap>🔄 <b> Aġġornamenti awtomatiċi fis-seħħ </b></td><td align="left"> Installazzjoni fi stadji, skambju atomiku, rollback fuq falliment — dejjem fuq l-aktar rilaxx ġdid </td></tr>
  <tr><td align="left" nowrap>🚀 <b> Ibda mal-login </b></td><td align="left"> Tnedija mhux obbligatorja mal-login; trej biss, l-ebda ikona tal-baċir </td></tr>
  <tr><td align="left" nowrap>🩺 <b> Tabib &amp; logs </b></td><td align="left"> Dijanjostika b'klikk waħda u aċċess għall-log tas-server </td></tr>
</table>

```sh
brew install --cask zoispag/tap/omniroute-tray
```

<sub> Jippreferi download? Aqbad l-aħħar <code>.dmg </code> minn
<a href="https://github.com/zoispag/omniroute-tray/releases"> Releases </a>. Sors, kwistjonijiet u bini
docs live at <a href="https://github.com/zoispag/omniroute-tray">zoispag/omniroute-tray</a>.
<br/>💛 Proġett komunitarju minn <a href="https://github.com/zoispag">@zoispag </a> — mhux rilaxx uffiċjali OmniRoute.</sub>

<br/>

<div align="center">

## 🔒 Privat u Lokali mill-Bidu

</div>

<img src="./docs/diagrams/privacy-local.svg" width="100%" alt="Privat u lokali mill-bidu — il-gateway u l-pjan ta' kontroll ta' OmniRoute jaħdmu fuq il-magna tiegħek. Il-prompts jintbagħtu lill-fornitur upstream magħżul għal kull talba; OmniRoute ma jżid l-ebda pass ospitat għall-ipproċessar tal-prompts u t-telemetrija hija diżattivata b'mod awtomatiku. Il-kredenzjali jiġu ċċifrati waqt il-ħżin b'AES-256-GCM; il-kontrolli jinkludu l-limitazzjoni tal-ambitu taċ-ċwievet API, l-iffiltrar tal-IP, limiti tar-rata, protezzjonijiet kontra l-injezzjoni tal-prompts, it-tneħħija tal-headers upstream, ir-redazzjoni fakultattiva tal-PII, żbalji sanitizzati u traċċa tal-awditjar lokali f'SQLite. OmniRoute huwa lliċenzjat taħt MIT u jista' jiġi ospitat minnek stess."/>

<sub>📖 [Awtorizzazzjoni](docs/architecture/AUTHZ_GUIDE.md) · [Miżuri ta' Protezzjoni](docs/security/GUARDRAILS.md) · [Konformità](docs/security/COMPLIANCE.md)</sub>

<br/>

<div align="center">

## 🔌 CLI Sħiħa + A2A u MCP

</div>

> Lil hinn mis-server, OmniRoute huwa **ċentru ta’ kontroll sħiħ mil-linja tal-kmand** b’**aktar minn 80 kmand**, flimkien ma’ protokolli miftuħa għall-aġenti sabiex aġent tal-IA jkun jista’ jħaddmu **waħdu**.

### ⌨️ CLI vera (mhux biss `start`)

```bash
omniroute               # ħaddem il-gateway + id-dashboard (port 20128)
omniroute chat          # klijent taċ-chat TUI interattiv (slash: /model /combo /skill /memory)
omniroute setup         # assistent iggwidat għall-ewwel tħaddim
omniroute doctor        # iddijanjostika l-fornituri, il-ports u d-dipendenzi nattivi
```

### 🛰️ Modalità remota — ħaddem is-CLI hawnhekk, u OmniRoute fuq VPS

OmniRoute fuq server? Ikkontrollah mil-laptop tiegħek bl-**istess CLI**. Idħol darba
b’token ta’ aċċess b’ambitu definit; wara dan, kull kmand jimmira lejn is-server remot.

```bash
omniroute connect 192.168.0.15            # password → token b’ambitu definit, issejvjat bħala kuntest
omniroute models                         # ← jitħaddem fuq is-server REMOT
omniroute configure codex                 # ← jagħżel mudell remot, jikteb profil Codex lokali
omniroute tokens create --name ci --scope read   # oħloq tokens b’ambitu idjaq għal magni oħra
omniroute contexts use default            # ← erġa’ aqleb għas-server lokali
```

It-tokens għandhom ambitu `read` / `write` / `admin`; ir-rotot li jniedu proċessi jibqgħu disponibbli biss permezz tal-loopback.
<sub>📖 [Modalità Remota](docs/guides/REMOTE-MODE.md)</sub>

<div align="left">

<img src="./docs/diagrams/cli-terminal.svg" width="50%" alt="Dimostrazzjoni animata fit-terminal tas-CLI ta’ OmniRoute — omniroute providers list, omniroute combo list u omniroute health — li ddur bejn id-89 kmand ewlenin: providers · oauth · keys · combo · nodes · models · cache · compression · cost · usage · quota · health · resilience · telemetry · logs · audit · mcp · a2a · cloud · memory · skills · eval · tunnel · backup · sync · webhooks · policy · pricing · translator · simulate …"/>

</div>

### 🤝 Qabbad aġent — u dan jikkontrolla lil OmniRoute nnifsu

Esponi lil OmniRoute permezz ta’ **MCP**, **A2A**, **REST API**, **webhooks** jew **CLI remota** — kwalunkwe aġent kapaċi (jew il-kodiċi tiegħek stess) jikseb iċ-ċwievet għall-gateway kollu: ir-rotot, il-fornituri, il-kombinazzjonijiet, il-cache, il-kompressjoni u l-memorja — b’mod awtonomu. L-endpoints HTTP ta’ hawn taħt jiġu pprovduti taħt `http://localhost:20128`.

<table>
  <tr><th align="left">Interfaċċa</th><th align="left">Endpoint / kmand</th><th align="left">Użaha għal</th></tr>
  <tr><td align="left" nowrap>🧰 <b>MCP (stdio)</b></td><td align="left" nowrap><code>omniroute --mcp</code></td><td align="left">Qabbadha ma’ Claude Desktop, Cursor jew kwalunkwe klijent MCP</td></tr>
  <tr><td align="left" nowrap>🌊 <b>MCP (HTTP)</b></td><td align="left" nowrap><code>/api/mcp/stream</code></td><td align="left">MCP remot — <b>110 għodda</b>, 33 ambitu (l-infurzar jiġi attivat b’għażla), rekord sħiħ tal-awditjar</td></tr>
  <tr><td align="left" nowrap>📡 <b>MCP (SSE)</b></td><td align="left" nowrap><code>/api/mcp/sse</code></td><td align="left">Trasport MCP bi streaming</td></tr>
  <tr><td align="left" nowrap>🤝 <b>A2A</b></td><td align="left" nowrap><code>/.well-known/agent.json</code></td><td align="left">Minn aġent għal aġent, <b>JSON-RPC 2.0</b> + SSE, 6 ħiliet</td></tr>
  <tr><td align="left" nowrap>🌐 <b>REST API</b></td><td align="left" nowrap><code>/v1/*</code></td><td align="left">Kompatibbli ma’ OpenAI — chat, embeddings, stampi, awdjo, OCR</td></tr>
  <tr><td align="left" nowrap>🔔 <b>Webhooks</b></td><td align="left" nowrap><code>/api/webhooks</code></td><td align="left">Ibgħat avvenimenti ta’ talbiet / kwoti lil Slack, Discord, Telegram jew kwalunkwe URL</td></tr>
  <tr><td align="left" nowrap>🛰️ <b>CLI Remota</b></td><td align="left" nowrap><code>omniroute connect <host></code></td><td align="left">Ikkontrolla istanza remota b’tokens ta’ aċċess b’ambitu definit</td></tr>
</table>

```bash
# Agħti lil Claude Code is-sett sħiħ ta’ għodod ta’ OmniRoute permezz ta’ MCP:
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

<sub>📖 [Server MCP](docs/frameworks/MCP-SERVER.md) · [Server A2A](docs/frameworks/A2A-SERVER.md) · [Protokolli tal-Aġenti](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md)</sub>

<br/>

<div align="center">

## 🗜️ Iffranka 15–95% tat-Tokens — Awtomatikament

</div>

### 📖 Kif jaħdem — il-pipeline, l-arkitettura u l-matematika tal-iffrankar

<img src="./docs/diagrams/compression-pipeline.svg" width="100%" alt="Pipeline tal-kompressjoni ta' OmniRoute: talba illustrattiva tal-klijent ta' 10,000 token tgħaddi minn 12-il magna komponibbli — Session-Dedup, CCR, Lite, RTK, Responses Tool Output, Headroom, Relevance, Caveman, Aggressive, LLMLingua-2, Ultra u OmniGlyph — u tista' tilħaq il-fornitur b'madwar 1,080 token fl-eżempju stacked dokumentat. Il-kontenut strutturat huwa protett b'salvagwardji tal-preservazzjoni u xatbijiet ta' fidelità għal kull pass; modalitajiet lossy jew sperimentali espliċiti jistgħu trasformaw kontenut eliġibbli."/>

Il-kombo stacked default tmexxi `RTK → Caveman`. Meta it-tnejn jaġixxu fuq l-istess payload tal-għodda/kuntest, l-iffrankar jikber b'mod kumulattiv:

```txt
combined = 1 − (1 − RTK) × (1 − Caveman_input)
average  = 1 − (1 − 0.80) × (1 − 0.46) = 89.2%
range    = 78.4 – 94.6%
```

Il-blokki tal-kodiċi, l-URLs, JSON u d-data strutturata huma **dejjem protetti** mill-magna tal-preservazzjoni.

> **Għaliex tuża ħafna tokens meta ftit jagħmlu x-xogħol?** Kull talba tgħaddi mill-pipeline tal-kompressjoni ta' OmniRoute **b'mod trasparenti** — mingħajr ebda bidla fil-klijent. Issa hija **stack ta' 12-il magna komponibbli** li jaħdmu skont l-ordni u jitħalltu u jitqabblu skont il-kombo tar-rottar — ibbażata fuq ideat minn [RTK](https://github.com/rtk-ai/rtk), [Caveman](https://github.com/JuliusBrussee/caveman) (⭐ 90K+), [LLMLingua-2](https://github.com/microsoft/LLMLingua), u [Troglodita](https://github.com/leninejunior/troglodita) (PT-BR).

### 🧱 L-stack tal-12-il magna

Il-magni jaħdmu skont l-ordni tal-pipeline; kull waħda tista' tiġi attivata jew diżattivata u kkunfigurata b'mod indipendenti għal kull kombo:

<table>
  <tr><th align="center">#</th><th align="left">Magna</th><th align="left">X'tagħmel</th></tr>
  <tr><td align="center" nowrap>1</td><td align="left" nowrap><b>Session-Dedup</b></td><td align="left">Tneħħi kontenut ripetut tul id-dawriet (indirizzat skont il-kontenut, bejn id-dawriet)</td></tr>
  <tr><td align="center" nowrap>2</td><td align="left" nowrap><b>CCR</b></td><td align="left">Tarxivja blokki kbar wara indikaturi ta' rkupru, li jinġabru fuq talba</td></tr>
  <tr><td align="center" nowrap>3</td><td align="left" nowrap><b>Lite</b></td><td align="left">Qtugħ tal-whitespace u tal-URLs tal-istampi (bażi b'latenza baxxa)</td></tr>
  <tr><td align="center" nowrap>4</td><td align="left" nowrap><b>RTK</b></td><td align="left">Filtrazzjoni intelliġenti tar-riżultati tal-għodod, deduplikazzjoni u qtugħ (konxja tal-kmandi)</td></tr>
  <tr><td align="center" nowrap>5</td><td align="left" nowrap><b>Responses Tool Output</b></td><td align="left">JSON b'prijorità lossless + kompressjoni djanjostika delimitata għall-outputs ta' shell/patch/search/build (Responses API)</td></tr>
  <tr><td align="center" nowrap>6</td><td align="left" nowrap><b>Headroom</b></td><td align="left">Kompressjoni tabulari lossless ta' arrays JSON (~30%) permezz ta' codec <b>GCF</b> inkorporat</td></tr>
  <tr><td align="center" nowrap>7</td><td align="left" nowrap><b>Relevance</b></td><td align="left">Punteġġ estrattiv tas-sentenzi relattiv għall-aħħar mistoqsija tal-utent</td></tr>
  <tr><td align="center" nowrap>8</td><td align="left" nowrap><b>Caveman</b></td><td align="left">Kompressjoni tal-proża bbażata fuq regoli (~65–75% fuq l-output)</td></tr>
  <tr><td align="center" nowrap>9</td><td align="left" nowrap><b>Aggressive</b></td><td align="left">Qosor + tqadim progressiv tad-dawriet il-qodma</td></tr>
  <tr><td align="center" nowrap>10</td><td align="left" nowrap><b>LLMLingua-2</b></td><td align="left">Qtugħ semantiku ML permezz ta' MobileBERT ONNX — sigur għall-kodiċi, async</td></tr>
  <tr><td align="center" nowrap>11</td><td align="left" nowrap><b>Ultra</b></td><td align="left">Qtugħ eweristiku tat-tokens b'livell opzjonali ta' mudell żgħir (SLM)</td></tr>
  <tr><td align="center" nowrap>12</td><td align="left" nowrap><b>OmniGlyph</b></td><td align="left">Kodifikazzjoni sperimentali tal-kuntest bħala stampa għal Claude Fable 5 imkejjel fuq il-konnessjoni diretta ta' Anthropic; it-transformers GPT 5.6 jibqgħu fail-closed sakemm jaslu l-irċevuti tal-fornitur. Erba' profili ta' kompressjoni (aggressive default, balanced, coding-safe, passthrough) (l-aktar aggressiv; opt-in)</td></tr>
</table>

Il-blokki tal-kodiċi, l-URLs u d-data strutturata huma **dejjem ippreservati** byte-perfect. **Presets ta' klikka waħda** jgħaqqdu l-magni:

<table>
  <tr><th align="left">Modalità</th><th align="left">Iffrankar</th><th align="left">L-aħjar għal</th></tr>
  <tr><td align="left" nowrap>🪶 <b>Lite</b></td><td align="left" nowrap>~15%</td><td align="left">Default sigur li jibqa' dejjem attiv</td></tr>
  <tr><td align="left" nowrap>🪨 <b>Standard (Caveman)</b></td><td align="left" nowrap>~30%</td><td align="left">Programmazzjoni ta' kuljum</td></tr>
  <tr><td align="left" nowrap>⚡ <b>Aggressive</b></td><td align="left" nowrap>~50%</td><td align="left">Sessjonijiet twal bi ħafna għodod</td></tr>
  <tr><td align="left" nowrap>🔥 <b>Ultra</b></td><td align="left" nowrap>~75%</td><td align="left">Iffrankar massimu</td></tr>
  <tr><td align="left" nowrap>🧰 <b>RTK</b></td><td align="left" nowrap>60–90%</td><td align="left">Output ta' shell/test/build/git</td></tr>
  <tr><td align="left" nowrap>🔗 <b>Stacked (RTK → Caveman)</b></td><td align="left" nowrap><b>78–95%</b></td><td align="left">Prompts mħallta + logs tal-għodod</td></tr>
</table>

**Eżempju reali — modalità Standard:**

> **Qabel (69 tokens):** _"Ir-raġuni għaliex il-komponent React tiegħek qed jerġa' jirrendi hija x'aktarx li qed toħloq referenza ġdida ta' oġġett f'kull ċiklu ta' render. Meta tgħaddi oġġett inline bħala prop, il-komparazzjoni shallow ta' React tarah bħala oġġett differenti kull darba, li jwassal għal re-render. Nirrakkomanda li tuża useMemo biex timmemoizza l-oġġett."_
>
> **Wara (19 tokens):** _"Ref ġdida ta' oġġett f'kull render. Prop ta' oġġett inline = ref ġdida = re-render. Fih f'useMemo."_
>
> **L-istess tweġiba. 72% inqas tokens. Zero telf ta' preċiżjoni.** ✅

**Eżempju PT-BR — modalità [Troglodita](https://github.com/leninejunior/troglodita):**

> **Qabel (42 tokens):** _"Il-problema hija li l-komponent qed jagħmel re-render minħabba li qed tinħoloq referenza ġdida ta' oġġett f'kull ċiklu ta' render. Nirrakkomanda li tuża useMemo."_
>
> **Wara (12 tokens):** _"Re-render: ref ġdida f'kull ċiklu (oġġett inline rikreat mill-ġdid). Uża `useMemo`."_
>
> **L-istess risposta. ~70% inqas tokens. Il-preċiżjoni teknika intatta.** ✅

<br/>

### 🎚️ Lil hinn mill-magni — stili tal-output, il-kontroll adattattiv u l-kontroll għal kull talba

It-12-il magna hawn fuq jinaqqsu dak li **jidħol**. Tliet saffi oħra jiffurmaw **kif**, **meta** u x'**joħroġ**:

- **🪄 Stili tal-Output** _(tmexxija fuq l-assi tal-output)_ — jinjetta struzzjonijiet deterministiċi u sikuri għall-cache li jiffurmaw ir-risposta; jistgħu jingħaqqdu, kull wieħed b'intensità `lite` / `full` / `ultra`. Biex iżżid stil huwa biżżejjed daħla ta' linja waħda fir-reġistru:
  - **Prosa konċiża** — neħħi l-mili / l-artikli / il-lingwaġġ evażiv; żomm is-sustanza teknika eżatta.
  - **Inqas kodiċi** — YAGNI ta' "senior dev għażżien": l-iżgħar bidla li taħdem, mingħajr scaffolding mhux mitlub.
  - **Ponytail (senior dev għażżien)** — itla' s-sellum tal-YAGNI, sewwi l-kawża mill-għerq, l-iżgħar diff li jaħdem.
  - **Għandi ADHD (l-azzjoni l-ewwel)** — l-azzjoni li jmiss tiġi l-ewwel, passi nnumrati, pass konkret wieħed li jmiss, mingħajr preambolu.
  - **CJK konċiż (文言)** — stil Ċiniż klassiku ultra-konċiż (limitat għall-locale `zh`).
- **🎯 Baġit tal-kuntest adattattiv** _(il-kontroll gradwali)_ — minflok limitu wieħed ta' tokens mixgħul/mitfi, żid l-irħas u l-aktar magni mingħajr telf biss sakemm ikun meħtieġ biex **tiddaħħal fit-tieqa tal-kuntest tal-mudell**. Politika: `reserve-output` (default, konxja tal-mudell) · `percentage` · `absolute`. Modalità: `floor` (iggarantixxi li jidħol kollox) · `replace-autotrigger` (l-għażla espliċita tiegħek tirbaħ) · `off` (limitu legacy).
- **🎛️ Fejn titteħed id-deċiżjoni dwar il-kompressjoni** _(preċedenza, għolja → baxxa)_ — header `x-omniroute-compression` għal kull talba › override tal-kombo tar-rottar › profil attiv imsemmi › adattattiv / auto-trigger › default tal-pannell › mitfi. Il-pjan applikat jerġa' jidhir fil-header tar-risposta `X-OmniRoute-Compression: <mode>; source=<source>`.

Skatta awtomatikament skont limitu ta' tokens, ixgħel il-kontroll adattattiv, waħħal profil imsemmi, issettja għal darba għal talba waħda, jew assenja pipeline għal kull kombo tar-rottar — skont x'jaqbel mat-tagħbija tax-xogħol. **Harness għall-evalwazzjoni** offline, opt-in (`npm run eval:compression`) jagħti punteġġ għall-fideltà kontra l-iffrankar fuq korpus fiss qabel ma tippromwovi bidla.

📖 [`COMPRESSION_GUIDE.md`](docs/compression/COMPRESSION_GUIDE.md) · [`RTK_COMPRESSION.md`](docs/compression/RTK_COMPRESSION.md) · [`COMPRESSION_ENGINES.md`](docs/compression/COMPRESSION_ENGINES.md)

<br/>

<div align="center">

# ⚡ Bidu Mgħaġġel

</div>

**1) Installa u mexxi**

```bash
npm install -g omniroute
omniroute
```

> 💡 Tara `npm warn ERESOLVE` jew twissijiet ta' peer-dep? [Huma bla ħsara](docs/guides/TROUBLESHOOTING.md#npm-install-warnings-eresolve--peer--deprecated).
> **Qed tuża npm 11 jew aktar reċenti?** npm jista' jimblokka l-iskripts taċ-ċiklu tal-ħajja tal-pakketti sakemm ma jkunux permessi. Il-`postinstall` ta' OmniRoute (`node scripts/build/postinstall.mjs`) huwa meħtieġ biex jipprepara l-fajls native tar-runtime. Ippermetti l-pakketti msemmija fit-twissija ta' npm meta tkun qed tinstalla globalment. Għas-sett ta' pakketti rrappurtat minn OmniRoute 3.8.54:
>
> ```bash
> npm install -g --allow-scripts=omniroute,keytar,onnxruntime-node,@parcel/watcher,@swc/core,protobufjs,esbuild omniroute
> ```
>
> Biex terġa' tuża din l-allowlist għal installazzjonijiet globali futuri, kkonfiguraha darba, u mbagħad installa bħas-soltu:
>
> ```bash
> npm config set allow-scripts=omniroute,keytar,onnxruntime-node,@parcel/watcher,@swc/core,protobufjs,esbuild --location=user
> npm install -g omniroute
> ```
>
> Il-lista tad-dipendenzi tista' tinbidel bejn rilaxx u ieħor; jekk npm jirrapporta lista differenti, uża l-ismijiet tal-pakketti minn dik it-twissija. Li tippermetti pakkett tfisser li l-iskripts tal-installazzjoni tiegħu jistgħu jimxu.
> **Qed tuża Gemini Web jew fornitur ieħor ibbażat fuq cookies tal-web?** Il-pakkett npm jinkludi
> Playwright iżda mhux il-binarju Chromium tiegħu. Ara n-nota dwar is-
> [setup ta' Playwright Chromium](docs/guides/TROUBLESHOOTING.md#gemini-web-and-playwright-chromium)
> qabel ma tagħmel l-ewwel talba lejn fornitur tal-web.

Dashboard fuq `http://localhost:20128` · API fuq `http://localhost:20128/v1`.

**2) Qabbad fornitur eliġibbli billi tuża l-kont tiegħek stess**

Dashboard → **Providers** → agħżel fornitur li t-termini u l-kwota attwali tiegħu jaqblu mal-każ tal-użu tiegħek → żid iċ-ċavetta API tiegħu jew ikkompleta l-fluss tal-kont tiegħu. Il-livelli b'xejn jistgħu jitolbu reġistrazzjoni, approvazzjoni, jew metodu ta' ħlas. Irrevedi l-[Gwida dwar il-Livelli b'Xejn](docs/getting-started/FREE-TIERS-GUIDE.md); id-disponibbiltà mingħajr ċavetta mhix garantita, u l-fornituri mmarkati `tos: avoid` huma esklużi minn `auto` awtomatikament.

**3) Indirizza l-għodda tal-ikkowdjar tiegħek**

```txt
Base URL: http://localhost:20128/v1
API Key:  [ikkopja minn Dashboard → Endpoints]
Model:    auto            (jagħmel ir-rottar bejn konnessjonijiet eliġibbli — jew agħżel fornitur/mudell)
```

**4) Ivverifika li qed jaħdem**

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

Għandek tara l-mudelli konnessi tiegħek fil-lista. 🎉 Dak kollox — ibda kkowdja, u OmniRoute jagħmel ir-rottar awtomatiku u l-fallback għalik.

Jekk il-klijent tiegħek ma jistax jibgħat headers personalizzati, OmniRoute jesponi wkoll aliases ta' kompatibbiltà b'tokens:

```txt
OpenAI catalog:   http://localhost:20128/vscode/YOUR_KEY/
OpenAI models:    http://localhost:20128/vscode/YOUR_KEY/models
OpenAI chat:      http://localhost:20128/vscode/YOUR_KEY/chat/completions
OpenAI responses: http://localhost:20128/vscode/YOUR_KEY/responses
Ollama chat:      http://localhost:20128/vscode/YOUR_KEY/api/chat
Ollama tags:      http://localhost:20128/vscode/YOUR_KEY/api/tags
```

Uża dawn biss għal klijenti li ma jistgħux inqabbdu `Authorization: Bearer ...`. L-awtentikazzjoni permezz tal-header tibqa' l-modalità preferuta.

<br/>

## 📦 Aktar metodi ta’ installazzjoni — Docker, sors, pnpm, Arch

**🐳 Docker**

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

`:latest` isegwi l-ogħla SemVer stabbli **ppubblikat**. Ma jsegwix il-`main` ta’ git. Uża `:X.Y.Z` għal GitOps. Ara [Kanali tar-Rilaxxi ta’ Docker](docs/guides/DOCKER_GUIDE.md#release-channels). L-immaġni tissettja **`OMNIROUTE_MEMORY_MB=1024`**. Dan huwa biżżejjed għad-dashboard u għal chat ħafif. **Aġenti tal-kodifikazzjoni** (`POST /v1/responses` minn Claude Code, Codex, Grok, …) jeħtieġu heap V8 ferm akbar, inkella l-proċess jagħti `FATAL ERROR` madwar 12 GiB meta jkun hemm żewġ kuntesti twal li jikkoinċidu. Issettja d-daqs tal-container ogħla mill-heap (il-buffers nattivi jinsabu barra minn V8):

| Tagħbija tax-xogħol                  | Heap (`-e OMNIROUTE_MEMORY_MB`) | Container (`--memory`) |
| ------------------------------------ | ------------------------------- | ---------------------- |
| Dashboard / chat ħafif               | `1024` (default tal-immaġni)    | ≥2 g                   |
| Aġent wieħed tal-kodifikazzjoni      | `8192`                          | ≥10 g                  |
| Żewġ `/v1/responses` twal simultanji | `10240`–`12288`                 | ≥12–16 g               |

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

It-tabella sħiħa: [Gwida ta’ Docker — RAM waqt it-tħaddim](docs/guides/DOCKER_GUIDE.md#runtime-ram-for-coding-agents).

> **Kanal ta’ Docker għall-verżjonijiet preliminari:** `diegosouzapw/omniroute:next` u
> `diegosouzapw/omniroute:next-web` isegwu l-fergħa default attwali `release/v*`.
> Dawn it-tags mutabbli huma maħsuba biss għall-ittestjar ta’ tiswijiet li għadhom ma ġewx
> rilaxxati u **mhumiex appoġġjati għall-produzzjoni**. Ara
> [Kanali tar-Rilaxxi ta’ Docker](docs/guides/DOCKER_GUIDE.md#release-channels).

**🥟 Bun**

L-`bun install` standard u l-installazzjoni globali (`bun install -g omniroute`) huma appoġġjati permezz tal-identifikazzjoni tar-runtime Bun:

- **`bun:sqlite` inkorporat**: OmniRoute juża d-driver `bun:sqlite` inkorporat ta’ Bun meta jitħaddem taħt Bun, u jaqleb għal `better-sqlite3` fuq Node.js jew `sql.js`.
- **Għażla awtomatika tal-bundler Webpack fl-iżvilupp**: L-iżvilupp (`bun run dev`) jidentifika awtomatikament lil Bun u jiddiżattiva Turbopack favur Webpack biex jiġu evitati inkompatibbiltajiet mal-bindings nattivi ta’ V8. Il-builds tal-produzzjoni (`bun run build`) isegwu `OMNIROUTE_USE_TURBOPACK` eżattament bħal fuq Node: Turbopack b’mod default, jew `OMNIROUTE_USE_TURBOPACK=0` biex tibni b’Webpack (`Dockerfile.bun` jesponih bħala `--build-arg`).
- **Dockerfile apposta għal Bun**: `Dockerfile.bun` b’diversi stadji għal deployments tal-produzzjoni nattivi ta’ Bun (`docker build -f Dockerfile.bun -t omniroute:bun .`).

```bash
# Installa u ħaddem b’Bun
bun install
bun run dev
```

**🛠️ Mis-sors**

```bash
cp .env.example .env && npm install
PORT=20128 npm run dev
```

**📦 pnpm**

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core && omniroute
```

**🐧 Arch Linux (AUR)**

```bash
yay -S omniroute-bin && systemctl --user enable --now omniroute.service
```

**🔧 Nix (Flake)**

```bash
# Bl-użu ta’ Nix flakes
nix develop
npm run dev

# Jew bl-użu ta’ devbox
devbox run npm run dev
```

📖 [Gwida ta’ Docker](docs/guides/DOCKER_GUIDE.md) — Profili ta’ Compose, Caddy HTTPS, mini ta’ Cloudflare.

**🦭 Podman**

```bash
# 1. Ipprepara d-direttorju tad-data bind-mounted
mkdir -p data

# 2. Linux + Podman lokali rootless biss (qatt klijent remot ta’ Podman Machine):
podman unshare chown 1000:1000 ./data

# 3. Issettja l-ħjiel tar-runtime, ibni l-immaġni lokali ta’ Compose, u ibda
echo "CONTAINER_HOST=podman" >> .env
podman compose --profile base up -d --build
```

Fuq macOS jew Windows, Podman juża Podman Machine remota: aqbeż `podman unshare` u
segwi l-[gwida tad-direttorju tad-data speċifika għat-topoloġija](contrib/podman/README.md#data-directory-permissions-by-topology).

📖 [Gwida ta’ Podman](contrib/podman/README.md) — Builds ta’ Compose, Podman Machine, u
konfigurazzjoni ta’ Quadlet għal Linux/systemd.

**⚡ Installazzjoni aktar veloċi / ħafifa (aqbeż il-build nattiva)**

L-engine nattiv ta’ SQLite (`better-sqlite3`) huwa dipendenza **mhux obbligatorja**, għalhekk installazzjoni
globali qatt ma teħel waqt il-kompilazzjoni mis-sors: tuża binary mibnija minn qabel meta jkun hemm waħda kompatibbli
mal-pjattaforma/Node tiegħek, u inkella taqleb b’mod trasparenti għal engine JavaScript pur
(`node:sqlite` fuq Node 22+, inkella l-WASM `sql.js` inkluż) — mingħajr il-ħtieġa ta’ għodod tal-build.

Biex taqbeż għalkollox it-tħejjija nattiva ta’ wara l-installazzjoni (CI, ambjenti headless, jew magni kajmana):

```bash
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute   # CI=1 jaqbiżha wkoll
```

Għall-aktar installazzjonijiet veloċi, ippreferi **pnpm** (ħażna indirizzata skont il-kontenut + hard links — ara hawn fuq).
Għal runtime headless mingħajr dashboard, uża l-profil `base` ta’ Docker (hawn fuq) jew il-
[gwida ta’ Termux](docs/guides/TERMUX_GUIDE.md). Is-CLI u d-dashboard tal-web jiġu servuti mill-
istess proċess fuq port wieħed, għalhekk bħalissa m’hemm l-ebda pakkett separat għas-CLI biss.

<br/>

<div align="center">

# 🎬 OmniRoute fl-Azzjoni

</div>

## 📹 Gwidi bil-Vidjo

<div align="center">

<sub>Ritratt tal-pannell fl-2026-10-18 · Katalgu mhux ipproċessat: YT 1.352 | TT 334 | IG 290 · Reċenza (jiem): YT 5 | TT 48 | IG 49</sub>

<table>
  <tr>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Da8ZthUPK98/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nick_saraev&font=montserrat&bold=true" alt="Instagram Reel — nick_saraev" width="300"/>
      </a><br/>
      <b>🎬 #1 — Instagram</b><br/>
      <sub>nick_saraev — 3,042,474 darba li ntwera</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Dbp7wv_CIO0/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nnapier7&font=montserrat&bold=true" alt="Instagram Reel — nnapier7" width="300"/>
      </a><br/>
      <b>🎬 #2 — Instagram</b><br/>
      <sub>nnapier7 — 1,454,535 darba li ntwera</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.youtube.com/watch?v=NJ0TQ-pyMDY">
        <img src="https://img.youtube.com/vi/NJ0TQ-pyMDY/maxresdefault.jpg" alt="YouTube — Amidia AI & Tech" width="300"/>
      </a><br/>
      <b>🎬 #3 — YouTube</b><br/>
      <sub>Amidia AI & Tech — 794,974 darba li ntwera</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/DaSs65mMrHk/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+theopenstack&font=montserrat&bold=true" alt="Instagram Reel — theopenstack" width="300"/>
      </a><br/>
      <b>🎬 #4 — Instagram</b><br/>
      <sub>theopenstack — 692,419 darba li ntwera</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.tiktok.com/@migue.baena/video/7670919268216622358">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=TikTok+%7C+migue.baena&font=montserrat&bold=true" alt="TikTok — migue.baena" width="300"/>
      </a><br/>
      <b>🎬 #5 — TikTok</b><br/>
      <sub>migue.baena — 685,788 darba li ntwera</sub>
    </td>
  </tr>
</table>

</div>

**Klassifika sħiħa (URLs kanoniċi mingħajr duplikati, `v > 0`, l-akbar firxa):**

| #1                                                                                     | #2                                                                                  | #3                                                                                      | #4                                                                                    | #5                                                                                                  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [nick_saraev — Instagram](https://www.instagram.com/reel/Da8ZthUPK98/) — **3,042,474** | [nnapier7 — Instagram](https://www.instagram.com/reel/Dbp7wv_CIO0/) — **1,454,535** | [Amidia AI & Tech — YouTube](https://www.youtube.com/watch?v=NJ0TQ-pyMDY) — **794,974** | [theopenstack — Instagram](https://www.instagram.com/reel/DaSs65mMrHk/) — **692,419** | [migue.baena — TikTok](https://www.tiktok.com/@migue.baena/video/7670919268216622358) — **685,788** |

| #6                                                                                                      | #7                                                                                                  | #8                                                                                     | #9                                                                                        | #10                                                                                 |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [milesreevesai — TikTok](https://www.tiktok.com/@milesreevesai/video/7667980059189366019) — **620,400** | [nikothetech — TikTok](https://www.tiktok.com/@nikothetech/video/7671890769665477918) — **610,803** | [Vaibhav Sisinty — YouTube](https://www.youtube.com/watch?v=QucgvbO5gsM) — **509,281** | [buildwithai.club — Instagram](https://www.instagram.com/reel/DbIt9AjK7-U/) — **347,652** | [nivedan.ai — Instagram](https://www.instagram.com/reel/DbIrCksJiqq/) — **331,973** |

Metriċi kanoniċi fl-2026-10-18: **1.976 vidjo uniku** · **20.220.289 darba magħrufa li ntwerew** (`v > 0`) · **1.210 kanali/profili għal kull netwerk**. Il-pannell mhux ipproċessat fih 1.976 ringiela (YouTube 1.352 = 740 twal + 612 Shorts · TikTok 334 · Instagram 290); ma baqa’ ebda duplikat wara n-normalizzazzjoni skont il-URL kanoniku, li żżomm l-ogħla għadd għal kull vidjo. Il-ġbir minn YouTube ilu ffriżat mill-2026-10-13 (il-kwota tal-API ntużat kollha mill-14 sat-18/10) u dak minn TikTok/Instagram ilu ffriżat mill-2026-09-02 (mingħajr krediti għall-ġbir); 76 vidjo għad m’għandhomx għadd ta’ kemm-il darba ntwerew.

> 🎬 **Għamilt vidjo dwar OmniRoute?** Iftaħ [issue](https://github.com/diegosouzapw/OmniRoute/issues/new) jew [discussion](https://github.com/diegosouzapw/OmniRoute/discussions) bil-link — se nuruh hawnhekk.

<br/>

<div align="center">

# 📧 Komunità u Għajnuna

> Kollox f’post wieħed — segwi lill-manutentur, tkellem mal-komunità, jew iftaħ issue.

| Kanal                                       | Fejn / kif                                                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 💼 **LinkedIn** — segwi lill-manutenzjonist | [linkedin.com/in/diegosouzapw](https://www.linkedin.com/in/diegosouzapw/)                                                     |
| 🐙 **GitHub** — segwi għal ħarġiet u pariri | [@diegosouzapw](https://github.com/diegosouzapw)                                                                              |
| 💬 **Discord**                              | [discord.gg/U47eFqAXCn](https://discord.gg/U47eFqAXCn)                                                                        |
| ✈️ **Telegram**                             | [t.me/omnirouteOficial](https://t.me/omnirouteOficial)                                                                        |
| 🟢 **WhatsApp — 🌍 Globali**                | [ingħaqad mal-grupp](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)                                         |
| 🟢 **WhatsApp — 🇧🇷 Brażil**                 | [ingħaqad mal-grupp](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)                                         |
| 🌍 **Sit web**                              | [omniroute.online](https://omniroute.online)                                                                                  |
| 🌍 **🌍Komunità StHub OmniRoute (b’xejn)**  | [portal StHub](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)                         |
| 📦 **Kodiċi sors**                          | [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)                                                |
| 🐛 **Irrapporta bug**                       | [iftaħ issue](https://github.com/diegosouzapw/OmniRoute/issues) — ehmeż l-output ta’ `npm run system-info`                    |
| 🤝 **Ikkontribwixxi**                       | [CONTRIBUTING.md](CONTRIBUTING.md) · [Mudell tal-Fergħat u tal-Ħruġ](docs/ops/BRANCHING_MODEL.md) · agħżel `good first issue` |
| 💚 **Appoġġja l-proġett**                   | [Modi kif tappoġġja ↑](#-support-omniroute) · [GitHub Sponsors](https://github.com/sponsors/diegosouzapw)                     |

</div>

---

<br/>
<div align="center">

## 🛠️ Munzell teknoloġiku

</div>

<table>
  <tr><th align="left">Saff</th><th align="left">Teknoloġija</th></tr>
  <tr><td nowrap><b>Runtime</b></td><td>Node.js 22.x / 24.x LTS — <code>&gt;=22.22.2 &lt;23 || &gt;=24.0.0 &lt;27</code></td></tr>
  <tr><td nowrap><b>Lingwa</b></td><td>TypeScript 6.0 — <b>100% TypeScript</b> madwar <code>src/</code> u <code>open-sse/</code> (<code>any</code> żero fil-qalba minn v2.0)</td></tr>
  <tr><td nowrap><b>Qafas</b></td><td>Next.js 16 + React 19 + Tailwind CSS 4</td></tr>
  <tr><td nowrap><b>Bażi tad-dejta</b></td><td>better-sqlite3 (SQLite, journaling WAL) + LowDB (JSON legat) — 147-il modulu tad-dominju, 224 migrazzjoni</td></tr>
  <tr><td nowrap><b>Memorja</b></td><td>FTS5 ta' SQLite għal test sħiħ + embeddings vettorjali kwantizzati b'int8, tħassir ittajpjat</td></tr>
  <tr><td nowrap><b>Skemi</b></td><td>Zod 4 — validazzjoni tal-I/O tal-għodod MCP + kuntratti tal-API</td></tr>
  <tr><td nowrap><b>Protokolli</b></td><td>MCP (stdio / HTTP / SSE) + A2A v0.3 (JSON-RPC 2.0 + SSE)</td></tr>
  <tr><td nowrap><b>Streaming</b></td><td>Server-Sent Events (SSE) + pont WebSocket (<code>/v1/ws</code>)</td></tr>
  <tr><td nowrap><b>Kompressjoni</b></td><td>Pipeline bi 12-il magna — RTK, Caveman, LLMLingua-2 (MobileBERT ONNX), GCF, OmniGlyph</td></tr>
  <tr><td nowrap><b>Awtentikazzjoni &amp; sigurtà</b></td><td>OAuth 2.0 (PKCE) + JWT + Ċwievet API + awtentikazzjoni MCP skont l-ambitu · AES-256-GCM waqt il-ħażna · DOMPurify</td></tr>
  <tr><td nowrap><b>Ħabi</b></td><td>wreq-js — impersonifikazzjoni tal-marki tas-swaba' TLS JA3 / JA4, proxy bi 3 livelli</td></tr>
  <tr><td nowrap><b>Reżiljenza</b></td><td>Circuit breaker, backoff esponenzjali, prevenzjoni tal-effett tal-merħla, awto-tiswija b'kombinazzjonijiet awtomatiċi</td></tr>
  <tr><td nowrap><b>Logging</b></td><td>pino — logs JSON strutturati bil-kuntest tat-talba</td></tr>
  <tr><td nowrap><b>Ittestjar</b></td><td>Node.js test runner + Vitest — <b>aktar minn 60,000 dikjarazzjoni statika tat-test</b> f'aktar minn 8,400 fajl tat-test traċċat (unità, integrazzjoni, E2E, sigurtà, ekosistema)</td></tr>
  <tr><td nowrap><b>Pjattaformi</b></td><td>Desktop (Electron) · Android (Termux) · PWA (kwalunkwe browser)</td></tr>
  <tr><td nowrap><b>CI/CD</b></td><td>GitHub Actions — pubblikazzjoni awtomatika fuq npm + Docker Hub mar-rilaxx</td></tr>
  <tr><td nowrap><b>Rabtiet</b></td><td><a href="https://omniroute.online">Websajt</a> · <a href="https://www.npmjs.com/package/omniroute">npm</a> · <a href="https://hub.docker.com/r/diegosouzapw/omniroute">Docker Hub</a></td></tr>
</table>

<div align="center">

<br/>

## 📖 Dokumentazzjoni

</div>

### 📘 Kif Tibda

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/guides/USER_GUIDE.md">Gwida għall-Utent</a></b></td><td>Providers, kombinazzjonijiet, integrazzjoni ma’ CLI, skjerament</td></tr>
  <tr><td nowrap><b><a href="docs/guides/SETUP_GUIDE.md">Gwida għall-Konfigurazzjoni</a></b></td><td>Metodi kompleti ta’ installazzjoni, konfigurazzjonijiet tal-għodod CLI, konfigurazzjoni tal-protokolli, aġġustament tal-timeout</td></tr>
  <tr><td nowrap><b><a href="docs/reference/CLI-TOOLS.md">Gwida għall-Għodod CLI</a></b></td><td>Konfigurazzjoni għal kull għodda għal Claude Code, Codex, Cursor, Cline, OpenClaw, Kilo, Copilot</td></tr>
  <tr><td nowrap><b><a href="docs/guides/REMOTE-MODE.md">Modalità Remota</a></b></td><td>Ħaddem OmniRoute remot (VPS) mill-CLI tal-laptop tiegħek permezz ta’ tokens ta’ aċċess b’ambitu limitat</td></tr>
  <tr><td nowrap><b><a href="docs/guides/CLAUDE-CODE-CONFIGURATION.md">Konfigurazzjoni ta’ Claude Code</a></b></td><td>Indika lil Claude Code lejn OmniRoute (lokali/remot) b’<code>launch</code> + profili għal kull mudell</td></tr>
  <tr><td nowrap><b><a href="README.md#-quick-start">Bidu Mgħaġġel</a></b></td><td>Installazzjoni → konnessjoni → konfigurazzjoni fi 3 passi</td></tr>
</table>

### 🔧 Operazzjonijiet u Skjerament

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/guides/DOCKER_GUIDE.md">Gwida ta’ Docker</a></b></td><td>Ħaddem Docker, profili Compose, HTTPS ta’ Caddy, tunnels, tags tal-immaġni</td></tr>
  <tr><td nowrap><b><a href="contrib/podman/README.md">Gwida ta’ Podman</a></b></td><td>Integrazzjoni ma’ Quadlet systemd, podman-compose, SELinux</td></tr>
  <tr><td nowrap><b><a href="docs/ops/VM_DEPLOYMENT_GUIDE.md">Skjerament fuq VM</a></b></td><td>Gwida kompleta: konfigurazzjoni ta’ VM + nginx + Cloudflare</td></tr>
  <tr><td nowrap><b><a href="docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md">Skjerament fuq Fly.io</a></b></td><td>Skjera fuq Fly.io b’ħażna persistenti</td></tr>
  <tr><td nowrap><b><a href="docs/guides/TERMUX_GUIDE.md">Gwida ta’ Termux</a></b></td><td>Ħaddem OmniRoute fuq Android permezz ta’ Termux</td></tr>
  <tr><td nowrap><b><a href="docs/guides/PWA_GUIDE.md">Gwida tal-PWA</a></b></td><td>Installazzjoni, caching u arkitettura ta’ Progressive Web App</td></tr>
  <tr><td nowrap><b><a href="docs/guides/UNINSTALL.md">Gwida għad-Disinstallazzjoni</a></b></td><td>Tneħħija nadifa għall-metodi kollha ta’ installazzjoni</td></tr>
  <tr><td nowrap><b><a href="docs/reference/ENVIRONMENT.md">Konfigurazzjoni tal-Ambjent</a></b></td><td>Varjabbli u referenzi kompleti ta’ <code>.env</code></td></tr>
</table>

### 🧠 Karatteristiċi u Arkitettura

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/architecture/ARCHITECTURE.md">Arkitettura</a></b></td><td>Arkitettura tas-sistema, fluss tad-dejta u elementi interni</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_GUIDE.md">Gwida għall-Kompressjoni</a></b></td><td>Pipeline b’7 għażliet: mitfija / lite / standard / aggressiva / ultra / RTK / stacked</td></tr>
  <tr><td nowrap><b><a href="docs/compression/RTK_COMPRESSION.md">Kompressjoni RTK</a></b></td><td>Kompressjoni tal-output tal-kmandi, filtri, fiduċja, verifika, irkupru tal-output mhux ipproċessat</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_ENGINES.md">Magni tal-Kompressjoni</a></b></td><td>Caveman, RTK, pipelines stacked, interfaces tad-dashboard/API/MCP</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_RULES_FORMAT.md">Format tar-Regoli tal-Kompressjoni</a></b></td><td>Skemi JSON għal pakketti ta’ regoli għall-filtri ta’ Caveman u RTK</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_LANGUAGE_PACKS.md">Pakketti Lingwistiċi tal-Kompressjoni</a></b></td><td>Sejbien tal-lingwa u ħolqien ta’ pakketti ta’ regoli għal Caveman</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/RESILIENCE_GUIDE.md">Gwida għar-Reżiljenza</a></b></td><td>Circuit breakers, cooldowns, kju, prevenzjoni ta’ thundering herd, spoofing tat-TLS</td></tr>
  <tr><td nowrap><b><a href="docs/routing/AUTO-COMBO.md">Magna tal-Auto-Combo</a></b></td><td>Valutazzjoni b’16-il fattur, pakketti tal-modalità, self-healing</td></tr>
  <tr><td nowrap><b><a href="docs/ops/PROXY_GUIDE.md">Gwida tal-Proxy</a></b></td><td>Sistema ta’ proxy bi 3 livelli, suq ta’ 1proxy, CRUD tar-reġistru</td></tr>
  <tr><td nowrap><b><a href="docs/reference/FREE_TIERS.md">Livelli B’xejn</a></b></td><td>Direttorju kkonsolidat: 34-il pool rikorrenti dokumentat / 485-il entrata katalogata tal-livell b’xejn</td></tr>
  <tr><td nowrap><b><a href="docs/guides/FEATURES.md">Gallerija tal-Karatteristiċi</a></b></td><td>Żjara viżwali fid-dashboard bi screenshots</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/CODEBASE_DOCUMENTATION.md">Dokumentazzjoni tal-Codebase</a></b></td><td>Spjegazzjoni tal-codebase faċli għall-bidu</td></tr>
</table>

### 🤖 Protokolli u APIs

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/reference/API_REFERENCE.md">Referenza tal-API</a></b></td><td>Endpoints kollha b’eżempji</td></tr>
  <tr><td nowrap><b><a href="docs/openapi.yaml">Speċifikazzjoni OpenAPI</a></b></td><td>Speċifikazzjoni OpenAPI 3.0</td></tr>
  <tr><td nowrap><b><a href="open-sse/mcp-server/README.md">Server MCP</a></b></td><td>110 għodda MCP, konfigurazzjonijiet tal-IDE, klijenti Python/TS/Go</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/MCP-SERVER.md">Gwida tas-Server MCP</a></b></td><td>Installazzjoni ta’ MCP, trasporti u referenza tal-għodod</td></tr>
  <tr><td nowrap><b><a href="src/lib/a2a/README.md">Server A2A</a></b></td><td>Protokoll JSON-RPC 2.0, ħiliet, streaming, ġestjoni tal-kompiti</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/A2A-SERVER.md">Gwida tas-Server A2A</a></b></td><td>Agent card ta’ A2A, kompiti, ħiliet u streaming</td></tr>
</table>

### 📋 Proġett u Kwalità

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="CONTRIBUTING.md">Kontribut</a></b></td><td>Konfigurazzjoni u linji gwida għall-iżvilupp</td></tr>
  <tr><td nowrap><b><a href="docs/ops/BRANCHING_MODEL.md">Mudell tal-Fergħat u tar-Rilaxx</a></b></td><td>Fejn jimmiraw il-PRs (<code>release/*</code>), xi jfissru <code>main</code> u t-tikketti</td></tr>
  <tr><td nowrap><b><a href="CHANGELOG.md">Reġistru tal-Bidliet</a></b></td><td>Storja sħiħa tar-rilaxxi għal kull verżjoni</td></tr>
  <tr><td nowrap><b><a href="SECURITY.md">Politika tas-Sigurtà</a></b></td><td>Rappurtar ta' vulnerabbiltajiet u prattiki tas-sigurtà</td></tr>
  <tr><td nowrap><b><a href="docs/guides/I18N.md">Gwida tal-i18n</a></b></td><td>Appoġġ għal 67 lingwa, fluss tax-xogħol tat-traduzzjoni, RTL</td></tr>
  <tr><td nowrap><b><a href="docs/ops/RELEASE_CHECKLIST.md">Lista ta' Kontroll tar-Rilaxx</a></b></td><td>Passi ta' validazzjoni qabel ir-rilaxx</td></tr>
  <tr><td nowrap><b><a href="docs/ops/COVERAGE_PLAN.md">Pjan tal-Kopertura</a></b></td><td>Strateġija tal-kopertura tat-testijiet għal aktar minn 60,000 dikjarazzjoni statika tat-testijiet mifruxa fuq aktar minn 8,400 fajl tat-testijiet ittraċċat</td></tr>
</table>

<br/>

<div align="center">

# ⭐ L-Aqwa Kontributuri

> OmniRoute huwa ffurmat minn komunità passjonata ta' sors miftuħ. Dawn l-individwi għamlu kontribuzzjonijiet eċċezzjonali li għandhom impatt dirett fuq il-kwalità, l-istabbiltà u l-firxa tal-proġett. **Grazzi.**

### Kontributuri esterni skont il-pull requests magħquda

<table>
  <tr><th align="center">Pożizzjoni</th><th align="left">Kontributur</th><th align="center">PRs magħquda</th><th align="right">Linji mibdula ~</th></tr>
  <tr><td align="center">1</td><td align="left"><a href="https://github.com/maxmad64bis"><b>maxmad64bis</b></a></td><td align="center">418</td><td align="right">25,367,739</td></tr>
  <tr><td align="center">2</td><td align="left"><a href="https://github.com/HouMinXi"><b>HouMinXi</b></a></td><td align="center">295</td><td align="right">13,557,796</td></tr>
  <tr><td align="center">3</td><td align="left"><a href="https://github.com/pacocartones"><b>pacocartones</b></a></td><td align="center">222</td><td align="right">81,551</td></tr>
  <tr><td align="center">4</td><td align="left"><a href="https://github.com/backryun"><b>backryun</b></a></td><td align="center">210</td><td align="right">270,562</td></tr>
  <tr><td align="center">5</td><td align="left"><a href="https://github.com/JxnLexn"><b>JxnLexn</b></a></td><td align="center">198</td><td align="right">3,570,623</td></tr>
  <tr><td align="center">6</td><td align="left"><a href="https://github.com/oyi77"><b>oyi77</b></a></td><td align="center">190</td><td align="right">411,243</td></tr>
  <tr><td align="center">7</td><td align="left"><a href="https://github.com/KooshaPari"><b>KooshaPari</b></a></td><td align="center">151</td><td align="right">5,972,314</td></tr>
  <tr><td align="center">8</td><td align="left"><a href="https://github.com/rdself"><b>rdself</b></a></td><td align="center">145</td><td align="right">80,663</td></tr>
  <tr><td align="center">9</td><td align="left"><a href="https://github.com/RaviTharuma"><b>RaviTharuma</b></a></td><td align="center">123</td><td align="right">500,065</td></tr>
  <tr><td align="center">10</td><td align="left"><a href="https://github.com/herjarsa"><b>herjarsa</b></a></td><td align="center">88</td><td align="right">230,872</td></tr>
  <tr><td align="center">11</td><td align="left"><a href="https://github.com/hartmark"><b>hartmark</b></a></td><td align="center">85</td><td align="right">2,849,623</td></tr>
  <tr><td align="center">12</td><td align="left"><a href="https://github.com/jonlwheat2-gif"><b>jonlwheat2-gif</b></a></td><td align="center">68</td><td align="right">69,097</td></tr>
  <tr><td align="center">13</td><td align="left"><a href="https://github.com/artickc"><b>artickc</b></a></td><td align="center">62</td><td align="right">43,502</td></tr>
  <tr><td align="center">14</td><td align="left"><a href="https://github.com/xiaoyaner0201"><b>xiaoyaner0201</b></a></td><td align="center">59</td><td align="right">126,220</td></tr>
  <tr><td align="center">15</td><td align="left"><a href="https://github.com/chirag127"><b>chirag127</b></a></td><td align="center">52</td><td align="right">6,661</td></tr>
  <tr><td align="center">16</td><td align="left"><a href="https://github.com/xz-dev"><b>xz-dev</b></a></td><td align="center">50</td><td align="right">245,976</td></tr>
  <tr><td align="center">17</td><td align="left"><a href="https://github.com/woodsonl"><b>woodsonl</b></a></td><td align="center">48</td><td align="right">811,771</td></tr>
  <tr><td align="center">18</td><td align="left"><a href="https://github.com/rqzbeh"><b>rqzbeh</b></a></td><td align="center">46</td><td align="right">151,229</td></tr>
  <tr><td align="center">19</td><td align="left"><a href="https://github.com/MumuTW"><b>MumuTW</b></a></td><td align="center">43</td><td align="right">28,166</td></tr>
  <tr><td align="center">19</td><td align="left"><a href="https://github.com/QuangBlue"><b>QuangBlue</b></a></td><td align="center">43</td><td align="right">13,112</td></tr>
</table>

<sub>Ċensiment meħud fit-2026-11-03 03:01:19 UTC bil-punt attwali ta' <code>release/v3.8.53</code> <code>05bc048d6c</code>. Iċ-ċensiment tal-GitHub GraphQL imqassam f'paġni fih 9,947 PR magħquda: 4,130 mis-sid tar-repożitorju, 240 minn Dependabot, 6 minn bots/apps oħra, u <b>5,571 PR esterni minn 883 kontributur distint</b>. “Linji mibdula” huma ż-żidiet + it-tħassir ta' GitHub u jinkludu fajls iġġenerati, lockfiles, katalgi, traduzzjonijiet u dokumentazzjoni; dan jirrappreżenta l-ammont ta' tibdil, mhux il-LOC miktuba mill-awtur. 53 PR jirrappurtaw differenzi ta' GitHub ta' aktar minn 500,000 linja (pereżempju #13399, żieda waħda ta' provider, jelenka 2,347 fajl mibdul), u dan ikabbar diversi totali ta' hawn fuq. Il-pari jingħataw l-istess pożizzjoni.</sub>

### Kommits attribwiti lil GitHub

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/maxmad64bis">
        <img src="https://github.com/maxmad64bis.png" width="40" style="border-radius:50%" alt="Dizzle"/><br/>
        <b>Dizzle</b>
      </a><br/>
      <sub>🥇 418 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/HouMinXi">
        <img src="https://github.com/HouMinXi.png" width="40" style="border-radius:50%" alt="Bob.Hou"/><br/>
        <b>Bob.Hou</b>
      </a><br/>
      <sub>🥈 294 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/oyi77">
        <img src="https://github.com/oyi77.png" width="40" style="border-radius:50%" alt="Paijo"/><br/>
        <b>Paijo</b>
      </a><br/>
      <sub>🥉 229 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png" width="40" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>🏅 222 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/backryun">
        <img src="https://github.com/backryun.png" width="40" style="border-radius:50%" alt="backryun"/><br/>
        <b>backryun</b>
      </a><br/>
      <sub>🏅 202 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/JxnLexn">
        <img src="https://github.com/JxnLexn.png" width="40" style="border-radius:50%" alt="Jan Leon"/><br/>
        <b>Jan Leon</b>
      </a><br/>
      <sub>🏅 134 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/RaviTharuma">
        <img src="https://github.com/RaviTharuma.png" width="40" style="border-radius:50%" alt="Ravi Tharuma"/><br/>
        <b>Ravi Tharuma</b>
      </a><br/>
      <sub>🏅 126 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/hartmark">
        <img src="https://github.com/hartmark.png" width="40" style="border-radius:50%" alt="Markus Hartung"/><br/>
        <b>Markus Hartung</b>
      </a><br/>
      <sub>🏅 115 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/rdself">
        <img src="https://github.com/rdself.png" width="40" style="border-radius:50%" alt="Randi"/><br/>
        <b>Randi</b>
      </a><br/>
      <sub>🏅 108 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/christopher-s">
        <img src="https://github.com/christopher-s.png" width="40" style="border-radius:50%" alt="Chris"/><br/>
        <b>Chris</b>
      </a><br/>
      <sub>🏅 70 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/jonlwheat2-gif">
        <img src="https://github.com/jonlwheat2-gif.png" width="40" style="border-radius:50%" alt="WebPerson"/><br/>
        <b>WebPerson</b>
      </a><br/>
      <sub>🏅 68 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/KooshaPari">
        <img src="https://github.com/KooshaPari.png" width="40" style="border-radius:50%" alt="Koosha Paridehpour"/><br/>
        <b>Koosha Paridehpour</b>
      </a><br/>
      <sub>🏅 68 kontribuzzjoni attribwiti minn GitHub</sub>
    </td>
  </tr>
</table>

<sub>Iċċekkjat mill-ġdid fit-2026-11-03 02:09:16 UTC: kontribuzzjonijiet attribwiti minn GitHub irrappurtati mill-API tal-Kontributuri tar-repożitorju għall-fergħa awtomatika <code>release/v3.8.53</code>. L-API rritornat 903 identità (429 utenti, 2 bots, 472 anonimi); din it-tabella teskludi lill-mantenitur, il-bots u l-identitajiet anonimi, u żżomm ir-riżultati ndaqs fil-kompetizzjoni. Hija distinta kemm mill-klassifikazzjoni tal-PRs magħquda hawn fuq kif ukoll miċ-ċensiment tal-metadejta ta’ Git hawn taħt.</sub>

> 🙏 Il-karatteristiċi, it-tiswijiet tal-bugs u t-titjib fl-infrastruttura ta’ dawn il-kontributuri huma **parti ewlenija** minn dak li jagħmel lil OmniRoute affidabbli u b’ħafna karatteristiċi. Kull pull request, kull każ tat-test u kull fajl tat-traduzzjoni tal-i18n huma importanti. Is-sors miftuħ jinbena minn nies bħalhom.

</div>

---

<br/>

## 💖 Sponsorizzaturi

<div align="center">

Ringrazzjament mill-qalb lil dawk li jiffinanzjaw lil OmniRoute minn buthom stess — kull kontribuzzjoni żżomm il-proġett b'xejn, indipendenti u miexi 'l quddiem.

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/drewbitt">
        <img src="https://github.com/drewbitt.png?size=140" width="72" style="border-radius:50%" alt="Andrew"/><br/>
        <b>Andrew</b>
      </a><br/>
      <sub>💛 Sponsor attiv ta' kull xahar</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/psylligent">
        <img src="https://github.com/psylligent.png?size=140" width="72" style="border-radius:50%" alt="Vlad I"/><br/>
        <b>Vlad I</b>
      </a><br/>
      <sub>💛 Sponsor attiv ta' kull xahar</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/xiaoyaner0201">
        <img src="https://github.com/xiaoyaner0201.png?size=140" width="72" style="border-radius:50%" alt="小妍儿"/><br/>
        <b>小妍儿</b>
      </a><br/>
      <sub>💛 Sponsor attiv ta' kull xahar</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/Guilsc">
        <img src="https://github.com/Guilsc.png?size=140" width="72" style="border-radius:50%" alt="Guilherme Costa"/><br/>
        <b>Guilherme Costa</b>
      </a><br/>
      <sub>💛 Sponsor attiv ta' darba</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/TheVingance">
        <img src="https://github.com/TheVingance.png?size=140" width="72" style="border-radius:50%" alt="Henrique Triches Iurkiv"/><br/>
        <b>Henrique Iurkiv</b>
      </a><br/>
      <sub>💛 Sponsor attiv ta' darba</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/somesh-ghaturle">
        <img src="https://github.com/somesh-ghaturle.png?size=140" width="72" style="border-radius:50%" alt="Somesh Ghaturle"/><br/>
        <b>Somesh Ghaturle</b>
      </a><br/>
      <sub>💛 Sponsor attiv ta' darba</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/Kolonie-AI">
        <img src="https://github.com/Kolonie-AI.png?size=140" width="72" style="border-radius:50%" alt="Kolonie AI"/><br/>
        <b>Kolonie AI</b>
      </a><br/>
      <sub>💛 Sostenitur preċedenti ta' darba</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/igormorais123">
        <img src="https://github.com/igormorais123.png?size=140" width="72" style="border-radius:50%" alt="Professor Igor Morais Vasconcelos"/><br/>
        <b>Prof. Igor Morais</b>
      </a><br/>
      <sub>💛 Sostenitur preċedenti ta' darba</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/PixmaNts">
        <img src="https://github.com/PixmaNts.png?size=140" width="72" style="border-radius:50%" alt="Pixma"/><br/>
        <b>Pixma</b>
      </a><br/>
      <sub>💛 Sostenitur preċedenti ta' darba</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png?size=140" width="72" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>💛 Sostenitur preċedenti ta' darba</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/longtao77">
        <img src="https://github.com/longtao77.png?size=140" width="72" style="border-radius:50%" alt="longtao"/><br/>
        <b>longtao</b>
      </a><br/>
      <sub>💛 Sostenitur preċedenti ta' darba</sub>
    </td>
  </tr>
</table>

<sub>… u oħrajn li jippreferu jibqgħu privati 💛</sub>

<sub>Il-GitHub Sponsors pubbliċi ġew ivvalidati mill-ġdid fit-2026-10-18 permezz tal-GitHub Sponsors GraphQL API: 11-il sponsorizzazzjoni pubblika (6 attivi, 5 preċedenti) minn total ta' 14. L-istatus <code>isActive</code> ta' GitHub jiddetermina t-tikketti attivi ta' hawn fuq; is-sostenituri pubbliċi preċedenti ta' darba jibqgħu jingħataw radd il-ħajr, filwaqt li l-isponsors privati jibqgħu anonimi. Id-donazzjonijiet permezz ta' Ko-fi, Buy Me a Coffee, Liberapay, PIX u l-kripto mhumiex elenkati għax m'għandhomx rekord pubbliku ta' sponsor.</sub>

<b><a href="https://github.com/sponsors/diegosouzapw">💖 Sir sponsor →</a></b> — kull dollaru jżomm lil OmniRoute b'xejn u indipendenti.

</div>

<br/>

<div align="center">

## 👥 Aktar minn 1,000 Kontributur

</div>

[![Kontributuri](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=1074&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

<sub>Awditjat fit-2026-11-02 fuq il-ponta attiva ta' <code>release/v3.8.53</code> <code>1c7135e0fb</code> (7,972 commit): <b>1,074 identità umani normalizzati ta' Git</b> — 759 jidhru bħala awturi tal-commit (inkluż il-mantenitur) u 315 jidhru biss f'headers espliċiti <code>Co-authored-by</code>. Iċ-ċensiment japplika <code>.mailmap</code>, iqabbel l-indirizzi tal-posta elettronika mingħajr ma jqis il-majuskoli u l-minuskoli, jgħaqqad l-indirizzi numeriċi u sempliċi ta' GitHub noreply biss meta jikkodifikaw l-istess handle, jeskludi 29 identità ta' bot/aġent/servizz/placeholder, u ma jgħaqqadx indirizzi ordinarji tal-posta elettronika sempliċement għax l-ismijiet murija tagħhom jaqblu. L-awditjar tal-2026-08-24 ippubblika 639; meta dan il-metodu jerġa' jitħaddem fuq il-bażi ta' dak l-awditjar <code>ac02c5b42f</code>, jagħti 619, għalhekk iż-żieda ġejja minn kontributuri ġodda, mhux minn metodu aktar laxk.</sub>

### Kif Tikkontribwixxi

1. Oħloq fork tar-repożitorju
2. Oħloq branch mill-ponta **attiva** ta' `release/vX.Y.Z` (mhux `main`) — ara [Mudell tal-Branches u tar-Rilaxx](docs/ops/BRANCHING_MODEL.md)
3. Oħloq il-branch tal-karatteristika tiegħek (`git checkout -b feat/amazing-feature`)
4. Ikkummenta l-bidliet tiegħek (`git commit -m 'feat: add amazing feature'`)
5. Ibgħat lill-branch (`git push origin feat/amazing-feature`)
6. Iftaħ Pull Request b'**base = dik il-branch `release/vX.Y.Z`**

Ara [CONTRIBUTING.md](CONTRIBUTING.md) għal linji gwida dettaljati.

### Rilaxx ta' Verżjoni Ġdida

```bash
# Oħloq rilaxx — npm publish isir awtomatikament
VERSION=x.y.z
gh release create "v${VERSION}" --title "v${VERSION}" --generate-notes
```

<br/>

<div align="center">

## 📊 Stilel

<a href="https://www.star-history.com/?repos=diegosouzapw%2FOmniRoute&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&theme=dark&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <img alt="Grafika tal-Istorja tal-Istilel" src="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
 </picture>
</a>

<br/>

<div align="center">

## 🌍 StarMapper

<a href="https://starmapper.bruniaux.com/diegosouzapw/omniroute">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=light" />
    <img alt="StarMapper" src="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute" />
  </picture>
</a>
</div>

<br/>

<div align="center">

## 🙏 Rikonoxximenti

</div>

OmniRoute tistrieħ fuq spallejn ġganti. Bdiet bħala fork ta’ **[9router](https://github.com/decolua/9router)** u port ta’ TypeScript tal-proġett Go **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — u minn hemm ’il quddiem, kull subsistema hawn taħt ġiet ispirata minn proġett open-source li wasal hemm qabilha. Kull wieħed minnhom sawwar parti konkreta ta’ OmniRoute. Dan huwa r-ringrazzjament tagħna lilhom kollha. 🙏

> ⭐ in-numri tal-istars ġew ivverifikati mill-GitHub REST API fit-3 ta’ Novembru 2026 — mur agħti stilla lil dawn il-proġetti. In-numri huma stampa eżatta ta’ dik id-data u naturalment se jinbidlu.

### 🧬 Linja ta’ nisel u gateway

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/decolua/9router">9router</a></b></td><td align="center">31,861</td><td>Il-proġett oriġinali li fuqu hija mibnija din il-fork — estiż hawn b’APIs multimodali u kitba mill-ġdid sħiħa f’TypeScript.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/router-for-me/CLIProxyAPI">CLIProxyAPI</a></b></td><td align="center">57,329</td><td>L-implimentazzjoni f’Go li ispirat dan il-port f’JavaScript / TypeScript.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/BerriAI/litellm">LiteLLM</a></b></td><td align="center">62,580</td><td>Il-gateway tal-AI li d-dataset pubbliku tiegħu tal-prezzijiet jipprovdi d-dejta għas-sinkronizzazzjoni tat-traċċar tal-ispejjeż tagħna u li l-mudell tiegħu ta’ normalizzazzjoni tal-fornituri informa r-routing tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuuyy/codex-chatgpt-web">codex-chatgpt-web</a></b></td><td align="center">15,435</td><td>Il-kodiċi tas-sors MIT adattat fil-bridge vendored ChatGPT Web → Codex Responses, inklużi adapters għas-sessjoni tal-browser, għat-tfassil tar-risposti, għall-użu u għat-tiftix fuq il-web.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Alishahryar1/free-claude-code">free-claude-code</a></b></td><td align="center">65,966</td><td>Disinji portati għall-irkupru tal-flussi, għal aliases mingħajr thinking, għat-tiftix alternattiv fuq il-web, għal-limiti ta’ sliding window, għall-ħabi tad-dejta sensittiva fil-logs u għal flussi ta’ tnedija msaħħin.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/standardagents/composer-api">composer-api</a></b></td><td align="center">347</td><td>Disinji ta’ Cursor Composer għall-għażla tal-għodod, għall-kostrinzjonijiet tal-output u għall-ikkommettjar tal-għodod ġew adattati fl-eżekutur nattiv ta’ Cursor.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ndycode/codex-multi-auth">codex-multi-auth</a></b></td><td align="center">561</td><td>Disinji għal login ġdid u għar-rotazzjoni tar-refresh token ġew portati għall-awtentikazzjoni mill-ġdid ta’ Codex OAuth.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ex-machina-co/opencode-anthropic-auth">opencode-anthropic-auth</a></b></td><td align="center">562</td><td>Defaults ta’ trasformazzjoni kompatibbli ma’ Claude Code u l-imġiba tal-billing headers ġew ġeneralizzati fil-bridge ta’ OmniRoute mmexxi mill-konfigurazzjoni.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/520mmxx/grok2api-merged">grok2api-merged</a></b></td><td align="center">2</td><td>Il-mappings tal-mudelli ta’ Grok, il-ġeneratur Statsig fake-TypeError, id-defaults tat-talbiet u tal-apparat, u l-proċessur tar-risposti NDJSON tiegħu ġew adattati b’mod materjali fl-eżekutur Grok Web ta’ OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/TQZHR/grok2api">TQZHR/grok2api</a></b></td><td align="center">707</td><td>Is-sors ewlieni transittiv tal-kodiċi wara grok2api-merged; l-implimentazzjonijiet tiegħu tal-mudell, tal-headers, tal-payload, ta’ Statsig u tal-proċessur huma ppreservati fil-linja ta’ nisel ta’ Grok Web.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/chenyme/grok2api">chenyme/grok2api</a></b></td><td align="center">7,874</td><td>Is-sors sottostanti MIT għall-payload u d-defaults tal-apparat ta’ Grok, għall-ġeneratur Statsig, u għall-proċessur <code>result.response</code> li għadda minn TQZHR u grok2api-merged.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuzhaii/grok2api-pro">grok2api-pro</a></b></td><td align="center">27</td><td>Sors transittiv ikkreditat minn grok2api-merged għas-saff tal-pool tal-proxy; OmniRoute tippreserva din in-nota tal-linja ta’ nisel iżda ma ssostnix li portat pool tal-proxy fl-eżekutur Grok Web limitat tagħha.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/CNFlyCat/GrokProxy">GrokProxy</a></b></td><td align="center">52</td><td>Il-proxy ta’ Grok awtentikat bil-cookie u d-disinn ta’ streaming <code>result.response.token</code> tiegħu influwenzaw it-trasport Grok Web ta’ OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lianying1716/GrokBridge">GrokBridge</a></b></td><td align="center">5</td><td>L-implimentazzjoni oriġinali ta’ Grok Web ġiet ikkonsultata għad-disinn upstream tagħha tal-HTTP/browser; il-mogħdija diretta tagħha tal-HTTP ġejja minn GrokProxy, għalhekk ma huwiex sostnut port indipendenti tal-kodiċi.</td></tr>
</table>

### 🗜️ Kompressjoni tal-kuntest u tat-tokens — magni

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/JuliusBrussee/caveman">Caveman</a></b></td><td align="center">116,957</td><td>Il-proġett virali “why use many token when few token do trick” — il-filosofija tiegħu tat-taħdit tal-caveman tħaddem il-mod standard tagħna tal-kompressjoni u aktar minn 30 regola ta’ mili/ikkondensar.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/rtk-ai/rtk">RTK – Rust Token Killer</a></b></td><td align="center">85,350</td><td>Kompressjoni ta’ prestazzjoni għolja tal-output tal-kmandi — ispirat il-magna RTK tagħna, il-DSL tal-filtri JSON, l-irkupru tal-output mhux ipproċessat u l-pipeline f’saffi RTK → Caveman.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/headroomlabs-ai/headroom">headroom</a></b></td><td align="center">78,672</td><td>Kompressjoni riversibbli tal-kuntest (SmartCrusher) — ispirat il-magna <code>headroom</code> tagħna u l-mudell tal-markatur tal-irkupru <code>ccr</code>.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/microsoft/LLMLingua">LLMLingua</a></b></td><td align="center">6,797</td><td>Riċerka dwar il-kompressjoni tal-prompts (LLMLingua / LLMLingua-2) — ispirat il-magna <code>llmlingua</code> tagħna, asinkronika, sigura għall-kodiċi u li tiftaħ il-fluss meta jkun hemm żball.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atjsh/llmlingua-2-js">llmlingua-2-js</a></b></td><td align="center">33</td><td>Il-port JS/ONNX (MobileBERT / XLM-RoBERTa) użat bħala backend tal-worker thread għall-magna LLMLingua tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/leninejunior/troglodita">Troglodita</a></b></td><td align="center">50</td><td>Kompressjoni ta’ tokens PT-BR — tħaddem il-pakkett tal-lingwa pt-BR tagħna: tnaqqis tal-pleonażmi u tneħħija ta’ kliem mimli adattati għall-grammatika tal-Portugiż Brażiljan.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/DietrichGebert/ponytail">ponytail</a></b></td><td align="center">182,929</td><td>Il-ħila YAGNI-coder virali tal-“lazy senior dev” — ispirat l-Istil tal-Output <b>less-code</b> tagħna: gwida lejn l-iżgħar bidla li taħdem, li tnaqqas il-kodiċi _iġġenerat_ (il-kontroparti fuq l-assi tal-output għall-proża qasira ta’ Caveman).</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ayghri/i-have-adhd">i-have-adhd</a></b></td><td align="center">59,838</td><td>L-istil ta’ tweġibiet tiegħu, iffukat fuq l-azzjoni u faċli għal persuni b’ADHD, ġie adattat fl-istil konċiż tal-output ta’ OmniRoute f’ħames lingwi.</td></tr>
</table>

### 🧩 Formati kompatti, riċerka dwar it-tokens u għodod konxji mill-kodiċi

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/toon-format/toon">TOON</a></b></td><td align="center">25,602</td><td>Token-Oriented Object Notation — il-mudell tiegħu b’kolonni, b’intestatura u ringieli, ifforma l-istadju tagħna tal-kompattazzjoni tabulari.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf">GCF – Graph Compact Format</a></b></td><td align="center">61</td><td>Il-format kompatt tal-graffi tiegħu u d-disinn tal-profil ġeneriku influwenzaw il-kompattazzjoni tabulari ta’ OmniRoute u l-format tal-codec ta’ Headroom.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf-typescript">gcf-typescript</a></b></td><td align="center">4</td><td>L-implimentazzjoni MIT TypeScript ġiet inkluża direttament u estiża bħala l-codec tal-profil ġeneriku ta’ Headroom.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ooples/token-optimizer-mcp">token-optimizer-mcp</a></b></td><td align="center">566</td><td>Cache Brotli/SQLite + context-delta għal kull sessjoni — ispirat il-magna <code>session-dedup</code> tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Mibayy/token-savior">token-savior</a></b></td><td align="center">1,203</td><td>Kompattazzjoni tal-output ta’ Bash + profili MCP — ispirat id-dixxiplina tagħna biex nieqfu mill-kompressjoni meta jkun meħtieġ u t-tnaqqis tal-manifest tal-għodod MCP.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ppgranger/token-saver">token-saver</a></b></td><td align="center">162</td><td>Kompressjoni tal-output konxja mill-kontenut u skont it-tip ta’ fajl, b’waqfien meta jkun hemm falliment — ivvalidat id-dispaċċ tagħna skont it-tip u l-qbiż meta l-qligħ ikun minimu.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/alexgreensh/token-optimizer">token-optimizer</a></b></td><td align="center">2,853</td><td>“Sib it-tokens fantażma” — il-mudell tiegħu ta’ offload + handle li jista’ jiġi rkuprat informa l-ħsieb tagħna dwar l-offload ta’ CCR.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Shweta-Mishra-ai/tokenmizer">TokenMizer</a></b></td><td align="center">34</td><td>Blueprint ta’ graff tas-sessjoni + deduplikazzjoni tal-linji bejn id-dawriet, li informa d-disinn tagħna ta’ session-dedup.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jessefreitas/OmniCompress">OmniCompress</a></b></td><td align="center">3</td><td>JSON f’kolonni ta’ Rust + retrieve indirizzat skont il-kontenut + deduplikazzjoni bejn il-messaġġi — ivvalidaw id-disinn tagħna tal-magni <code>headroom</code>/<code>ccr</code>/<code>session-dedup</code> u l-invariant stabbli għall-cache li l-“forma kkompressata hija indipendenti mill-pożizzjoni”.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atlassian-labs/mcp-compressor">mcp-compressor</a></b></td><td align="center">140</td><td>Kompressjoni tal-iskema u d-deskrizzjoni tal-għodod MCP — infurmat it-tnaqqis tagħna fil-kardinalità tal-manifest tal-għodod MCP.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/pdavis68/RepoMapper">RepoMapper</a></b></td><td align="center">218</td><td>Ranking tal-mappa tar-repo stil Aider — informa l-esplorazzjoni tagħna tal-mappa tar-repo / ranking tal-irkupru.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/mrsimpson/quiet-shell-mcp">quiet-shell-mcp</a></b></td><td align="center">4</td><td>Tnaqqis dikjarattiv tal-output tal-shell permezz ta’ MCP — ivvalida l-kompattazzjoni dikjarattiva tagħna tal-output ta’ bash.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/dsherret/ts-morph">ts-morph</a></b></td><td align="center">6,222</td><td>Toolkit tal-API tal-Kompilatur ta’ TypeScript — ispirat it-tneħħija tal-kummenti bbażata fuq parser li tippreserva l-literals ta’ strings, templates u regex.</td></tr>
</table>

### 🧠 Memorja u RAG

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/mem0ai/mem0">Mem0</a></b></td><td align="center">68,294</td><td>Saff universali tal-memorja — il-mudell tiegħu ta’ proxy bħala konfini għall-kitba/qari sawwar l-arkitettura tal-memorja tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/letta-ai/letta">Letta (MemGPT)</a></b></td><td align="center">25,321</td><td>Aġenti b’memorja statali f’livelli — ispira l-mudell f’livelli ta’ Context Control & Recovery (CCR) tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/onestardao/WFGY">WFGY</a></b></td><td align="center">1,804</td><td>It-tassonomija ProblemMap ta’ 16-il modalità rikorrenti ta’ falliment ta’ RAG/LLM — il-vokabularju komuni fil-gwida tagħna għas-soluzzjoni tal-problemi.</td></tr>
</table>

### 🛰️ Spezzjoni tat-traffiku, MITM u proxy trasparenti

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/chouzz/llm-interceptor">llm-interceptor</a></b></td><td align="center">81</td><td>L-interċezzjoni/analiżi MITM tat-traffiku bejn l-assistent tal-kodifikazzjoni u l-LLM infurmat ir-rekwiżiti bikrija ta’ Traffic Inspector. Erba’ moduli derivati qabel — l-għaqda tal-SSE, in-normalizzazzjoni tal-konverżazzjonijiet, il-ħabi tas-sigrieti u s-sanitizzazzjoni tal-headers — ġew sostitwiti b’implimentazzjonijiet indipendenti clean-room ibbażati fuq standards pubbliċi tal-protokolli. Iż-żewġ superfiċi ta’ host-passthrough (<code>passthrough.ts</code> u <code>_internal/bypass.cjs</code>) jibqgħu implimentazzjonijiet interni ta’ OmniRoute, ikklassifikati b’mod indipendenti; ma nkitbux mill-ġdid bħala parti minn dik is-sostituzzjoni.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/InterceptSuite/ProxyBridge">ProxyBridge</a></b></td><td align="center">6,978</td><td>Rotot trasparenti tal-proxy għal kull proċess — ispira t-tneħħija MITM sigura kontra l-ħsarat, il-timeouts tal-inattività tas-sockets, l-attribuzzjoni tal-proċessi permezz ta’ <code>/proc</code> u l-qbid TPROXY tagħna.</td></tr>
</table>

### 📚 Dejta tal-mudelli, osservabbiltà u UI

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/anomalyco/models.dev">models.dev</a></b></td><td align="center">7,486</td><td>Database miftuħ tal-ispeċifikazzjonijiet, il-prezzijiet u l-kapaċitajiet tal-mudelli tal-AI — sinkronizzat b’mod nattiv fil-katalgu tal-mudelli tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/xyflow/xyflow">React Flow / xyflow</a></b></td><td align="center">38,874</td><td>Il-librerija tal-graffi bbażati fuq in-nodi li tħaddem il-Compression Studio u l-Combo/Routing Studio tagħna f’ħin reali.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langchain-ai/langgraph">LangGraph</a></b></td><td align="center">44,349</td><td>Il-viżwalizzazzjoni diretta tal-graff tal-fluss tax-xogħol ta’ LangGraph Studio ispirat il-veduta f’ħin reali tal-kaskata fl-Istudios tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langfuse/langfuse">Langfuse</a></b></td><td align="center">36,907</td><td>Il-mudell tiegħu ta’ osservabbiltà trace → span → generation sawwar il-veduta waterfall tal-Compression Studio tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/kiali/kiali">Kiali</a></b></td><td align="center">3,647</td><td>Osservabbiltà tas-service mesh ta’ Istio — ispirat il-badges tal-circuit breaker u l-viżwali tat-truf tal-iżbalji tagħna fir-Routing/Combo Studio.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lobehub/lobe-icons">lobe-icons</a></b></td><td align="center">2,666</td><td>Logos tal-marki tal-AI/LLM li jirrendu l-ikoni tal-fornituri fid-dashboard tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lipis/flag-icons">flag-icons</a></b></td><td align="center">12,499</td><td>Jipprovdi l-bnadar SVG liċenzjati taħt il-MIT użati mis-selettur tal-lingwi tar-README.</td></tr>
</table>

### 🛡️ Sigurtà

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/tldrsec/awesome-secure-defaults">awesome-secure-defaults</a></b></td><td align="center">723</td><td>Lista kkurata ta’ libreriji siguri b’mod awtomatiku li tiggwida l-għażliet ta’ sigurtà tagħna (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink).</td></tr>
</table>

### 🧭 Għodod komplementari

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif ispira lil OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/BlockRunAI/ClawRouter">ClawRouter</a></b></td><td align="center">6,649</td><td>Ispira d-deduplicazzjoni tat-talbiet, il-fallback ta’ emerġenza mingħajr spiża, l-istrateġiji Auto-Combo pluggable u l-klassifikazzjoni tal-intenzjoni multilingwi.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lbjlaq/Antigravity-Manager">Antigravity-Manager</a></b></td><td align="center">32,785</td><td>Ir-rimappjar tal-mudelli konxju mill-kontijiet, il-validazzjoni tal-mogħdijiet tal-eżekutabbli u l-imġiba tat-tikketti tal-pjan tiegħu infurmaw ir-runtime Antigravity ta’ OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jlcodes99/vscode-antigravity-cockpit">vscode-antigravity-cockpit</a></b></td><td align="center">4,852</td><td>Il-format kompatt tiegħu tal-countdown għar-reset tal-kwota ispira l-wiri korrispondenti tal-limitu tal-fornitur f’OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/iOfficeAI/AionUi">AionUi</a></b></td><td align="center">33,996</td><td>L-integrazzjonijiet ACP tiegħu ispiraw l-iskoperta awtomatika tal-aġenti CLI installati minn OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/steipete/CodexBar">CodexBar</a></b></td><td align="center">22,955</td><td>Identifika s-superfiċi tal-kwota ta’ Grok Build; OmniRoute imbagħad ivverifika u kkoreġa l-format wire attiv b’mod indipendenti.</td></tr>
</table>

## 📄 Liċenzja

Liċenzja MIT - ara [LIĊENZJA](LICENSE) għal aktar dettalji.

---

<div align="center">

**[⬆ Lura għall-quċċata](#-omniroute)** · Mibni b’❤️ għall-komunità tal-IA open-source.

<sub>Maħluq minn <a href="https://github.com/diegosouzapw">Diego Souza</a> · OmniRoute v3.8.54 · Node ≥22.22.2 · Liċenzja MIT · <a href="https://omniroute.online">omniroute.online</a></sub>

</div>
<!-- Id-Diskussjonijiet ta’ GitHub huma attivati għall-mistoqsijiet u t-tweġibiet tal-komunità -->
