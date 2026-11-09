# README (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇪🇹 [am](../am/README.md) · 🇸🇦 [ar](../ar/README.md) · 🇦🇿 [az](../az/README.md) · 🇧🇬 [bg](../bg/README.md) · 🇧🇩 [bn](../bn/README.md) · 🇧🇦 [bs](../bs/README.md) · 🇨🇿 [cs](../cs/README.md) · 🇩🇰 [da](../da/README.md) · 🇩🇪 [de](../de/README.md) · 🇬🇷 [el](../el/README.md) · 🇪🇸 [es](../es/README.md) · 🇪🇪 [et](../et/README.md) · 🇮🇷 [fa](../fa/README.md) · 🇫🇮 [fi](../fi/README.md) · 🇫🇷 [fr](../fr/README.md) · 🇮🇪 [ga](../ga/README.md) · 🇮🇳 [gu](../gu/README.md) · 🇳🇬 [ha](../ha/README.md) · 🇮🇱 [he](../he/README.md) · 🇮🇳 [hi](../hi/README.md) · 🇭🇷 [hr](../hr/README.md) · 🇭🇺 [hu](../hu/README.md) · 🇦🇲 [hy](../hy/README.md) · 🇮🇩 [id](../id/README.md) · 🇳🇬 [ig](../ig/README.md) · 🇮🇹 [it](../it/README.md) · 🇬🇪 [ka](../ka/README.md) · 🇰🇭 [km](../km/README.md) · 🇮🇳 [kn](../kn/README.md) · 🇰🇷 [ko](../ko/README.md) · 🇱🇹 [lt](../lt/README.md) · 🇱🇻 [lv](../lv/README.md) · 🇮🇳 [ml](../ml/README.md) · 🇮🇳 [mr](../mr/README.md) · 🇲🇾 [ms](../ms/README.md) · 🇲🇹 [mt](../mt/README.md) · 🇲🇲 [my](../my/README.md) · 🇳🇵 [ne](../ne/README.md) · 🇳🇱 [nl](../nl/README.md) · 🇳🇴 [no](../no/README.md) · 🇮🇳 [or](../or/README.md) · 🇮🇳 [pa](../pa/README.md) · 🇵🇭 [phi](../phi/README.md) · 🇵🇱 [pl](../pl/README.md) · 🇵🇹 [pt](../pt/README.md) · 🇧🇷 [pt-BR](../pt-BR/README.md) · 🇷🇴 [ro](../ro/README.md) · 🇷🇺 [ru](../ru/README.md) · 🇱🇰 [si](../si/README.md) · 🇸🇰 [sk](../sk/README.md) · 🇸🇮 [sl](../sl/README.md) · 🇷🇸 [sr](../sr/README.md) · 🇸🇪 [sv](../sv/README.md) · 🇰🇪 [sw](../sw/README.md) · 🇮🇳 [ta](../ta/README.md) · 🇮🇳 [te](../te/README.md) · 🇹🇭 [th](../th/README.md) · 🇹🇷 [tr](../tr/README.md) · 🇺🇦 [uk-UA](../uk-UA/README.md) · 🇵🇰 [ur](../ur/README.md) · 🇺🇿 [uz](../uz/README.md) · 🇻🇳 [vi](../vi/README.md) · 🇳🇬 [yo](../yo/README.md) · 🇨🇳 [zh-CN](../zh-CN/README.md) · 🇹🇼 [zh-TW](../zh-TW/README.md)

---

<div align="center">

<img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute ダッシュボード" width="820"/>

<br/>
<br/>

# 🚀 OmniRoute — 無料の AI ゲートウェイ

**[Diego Souza](https://github.com/diegosouzapw) によって作成**

<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — コーディングを止めない。すべての AI ツールを、1 つのエンドポイント経由で 381 のプロバイダー（無料のものは 150 以上）へ。Claude Code、Codex、Cursor、Cline、Copilot、Antigravity を、オートフォールバック対応の無料の Claude / GPT / Gemini へ接続。RTK + Caveman の積層圧縮により、トークンを 15～95% 節約（平均約 89%）し、制限に達することはありません。AI プロバイダー 381 社 · 無料ティア 150 以上 · 月間無料トークン約 16.2 億 · ルーティング戦略 20 種類 · $0 で開始可能。"/>

</div>

<div align="center">

## 💰 サードパーティーの無料枠全体で月間約16.2億トークン

</div>

> **プロバイダーアカウントをご自身で用意してください。** これは、個別に利用資格のあるサードパーティー無料枠を合算した推定値であり、OmniRouteから付与されるトークンではありません。登録し、必要に応じて認証情報を取得して、利用できるプロバイダーを接続してください。各プロバイダーが上限、提供状況、利用規約を管理します。
>
> 無料枠を手作業で積み重ねるのは大変です — 数十のSDK、数十のレート制限、そして実際にどれだけ利用できるのか分かりません。OmniRouteは、**34個の継続的なプールキーにわたる465件の無料枠エントリ**をカタログ化し、**公開された正の月間予算を持つ17個のプールと、5つのモデル別Groq上限**からトークン総量を算出します。共有プールは重複排除されます。地域の本人確認後にのみ開放されるクォータ（現在はModelScope）は別枠で表示され、地域の本人確認分として約600万トークンが追加されますが、見出しの合計には含めません。結果はダッシュボード（`/dashboard/free-tiers`）に表示され続けます。

<img src="./docs/diagrams/free-tier-budget.svg" width="100%" alt="OmniRouteの無料枠予算カード：月間約16.2億の無料トークンを安定して利用でき、登録クレジットを含めると初月は最大約22.2億。1つのエンドポイントの背後に、カタログ化された465件の無料枠エントリをカバーする34個の文書化された継続的なプールキー。共有プールはそれぞれ1回だけカウントする、正直なプール重複排除方式の計算。公開された正の月間トークン予算を持つ17個の継続的なプールと、5つのモデル別Groq上限を含む。利用規約上のリスクカタログでは12個のプロバイダーに回避推奨の印が付いているため、利用するかどうかはご自身で判断できます。予算バーにはMistral 10億、Nara 2.1億、LLM7 1.5億、xKiro 1.5億、Groq 3,000万（5つのモデル別上限）および小規模なプールが含まれ、初月の登録クレジットと、トークン上限のない完全無料プロバイダーは別途表示されるため、見出しの数値を水増ししません。/dashboard/free-tiersで使用量と残量をリアルタイム表示。"/>

> 稼働中の `/dashboard/free-tiers` ページのアニメーション概要。完全な方法論（プールの重複排除、クレジット階層、プロバイダー規約）：**[docs/reference/FREE_TIERS.md](docs/reference/FREE_TIERS.md)**。
>
> <sub>これらの数値は、稼働中のカタログに基づいて2週間ごとに再監査され、**増減します** — プロバイダーが無料枠を終了すれば数値は減り、新しいプロバイダーが追加されれば増加します。カタログが実際に算出した値を公開しており、都合よく切り上げた最良ケースは掲載していません。</sub>

<br/>

<div align="center">

<h3>

OMNIROUTEが費用の節約や作業の効率化に役立ったなら、リポジトリに⭐スターを付けてください。

</h3>

[![スター数](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute)
<a href="https://trendshift.io/repositories/23589" target="_blank"><img src="https://trendshift.io/api/badge/repositories/23589" alt="diegosouzapw%2FOmniRoute | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
[![スター履歴ランキング](https://api.star-history.com/badge?repo=diegosouzapw/OmniRoute&theme=dark)](https://www.star-history.com/diegosouzapw/omniroute)
[![olud.ai](https://olud.ai/badge.php?tool=diegosouzapw-omniroute)](https://olud.ai/project/diegosouzapw-omniroute.html)

### 💬 コミュニティに参加

**👋 メンテナーをフォロー — 新しいプロバイダー、リリース、ヒントをいち早く入手できます：**

[![LinkedInでDiegoをフォロー](https://img.shields.io/badge/Follow_Diego_on-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diegosouzapw/)
[![GitHubで@diegosouzapwをフォロー](https://img.shields.io/github/followers/diegosouzapw?style=for-the-badge&logo=github&logoColor=white&label=Follow%20on%20GitHub&color=181717)](https://github.com/diegosouzapw)

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/U47eFqAXCn)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/omnirouteOficial)
[![WhatsApp Global](https://img.shields.io/badge/WhatsApp_Global-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)
[![WhatsApp Brasil](https://img.shields.io/badge/WhatsApp_Brasil-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)
[![Webサイト](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)

**質問、プロバイダーに関するヒント、ロードマップ、サポート → [Discord](https://discord.gg/U47eFqAXCn) · [Telegram](https://t.me/omnirouteOficial) · WhatsApp [🌍 グローバル](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4) / [🇧🇷 ブラジル](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4) / [ポータル](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)**

<br/>

## 📈 ゲートウェイは成長を続けています

<div align="center">

|                                 |              v3.8.50              | **v3.8.51** |      `v3.8.54+`       |
| ------------------------------- | :-------------------------------: | :---------: | :-------------------: |
| 🌐 プロバイダー                 |                352                |   **358**   |          382          |
| 🧠 一意のチャットモデル ID      |               1320                |  **1374**   |         1491          |
| 🖼️ モダリティブリッジ           | 🆕 ビジョン + オーディオ + ビデオ |      ✓      |           ✓           |
| 📡 Radar 無料カタログ           |           🆕 オプトイン           |      ✓      |           ✓           |
| ⚖️ クォータ対応スケジューリング |          🆕 Quota-Share           |      ✓      |           ✓           |
| 📊 クォータテレメトリ           |             🆕 ライブ             |      ✓      |           ✓           |
| 🧰 ヘッドレスモード             |                 —                 |      —      | 🆕 `serve --headless` |
| 🛤️ LTS レールインフラ           |                 —                 |      —      |  🆕 リリースチャネル  |
| 🔎 モデル検出 API               |                 —                 |      —      | 🆕 `/v1/models/query` |

**→ [ロードマップ](ROADMAP.md) — レールに乗って `v3.9.0 LTS` へ**

</div>

<br/>

## 🧩 利用可能

[![npm バージョン](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
![NPM 月間](https://img.shields.io/npm/dm/omniroute?label=npm/month&color=cb3837&logo=npm)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
![ライセンス: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![Docker ダウンロード数](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?label=docker%20pulls&logo=docker&color=2496ED)
![Electron ダウンロード数](https://img.shields.io/github/downloads/diegosouzapw/omniroute/total?style=flat&label=electron%20downloads&logo=electron&color=47848F)

<table>
  <tr>
    <td align="right"><b>🚀 はじめる</b></td>
    <td align="center"><a href="#-quick-start">🚀 クイックスタート</a></td>
    <td align="center"><a href="#-more-install-methods--docker-source-pnpm-arch">📦 インストール</a></td>
    <td align="center"><a href="#first-run">🆓 プロバイダーに接続</a></td>
  </tr>
  <tr>
    <td align="right"><b>💡 学ぶ</b></td>
    <td align="center"><a href="#-the-promise">💥 提供する価値</a></td>
    <td align="center"><a href="#-why-omniroute">🤔 OmniRoute を選ぶ理由</a></td>
    <td align="center"><a href="#-what-sets-omniroute-apart">🏆 独自の特徴</a></td>
  </tr>
  <tr>
    <td align="right"><b>⚙️ 機能</b></td>
    <td align="center"><a href="#-combos--the-flagship">🎯 コンボ</a></td>
    <td align="center"><a href="#-382-ai-providers--153-catalog-marked-free">🌐 プロバイダー</a></td>
    <td align="center"><a href="#-full-cli--a2a--mcp">🔌 CLI &amp; MCP</a></td>
  </tr>
  <tr>
    <td align="right"></td>
    <td align="center"><a href="#%EF%B8%8F-save-1595-tokens--automatically">🗜️ 圧縮</a></td>
    <td align="center"><a href="#%EF%B8%8F-where-omniroute-runs--anywhere">🖥️ 実行環境</a></td>
    <td align="center"><a href="#-private--local-first">🔒 プライベート</a></td>
  </tr>
  <tr>
    <td align="right"><b>👀 確認する</b></td>
    <td align="center"><a href="#-omniroute-in-action">🎬 動作の様子</a></td>
    <td align="center"><a href="#-whats-new">✨ 新機能</a></td>
    <td align="center"><a href="#-compatible-clis--coding-agents">🤖 対応 CLI</a></td>
  </tr>
  <tr>
    <td align="right"><b>💚 支援する</b></td>
    <td align="center"><a href="#-support-omniroute">💚 支援 / 寄付</a></td>
    <td align="center"><a href="#-community--help">💬 コミュニティ</a></td>
    <td align="center"><a href="#-sponsors">💖 スポンサー</a></td>
  </tr>
  <tr>
    <td align="right"><b>📦 プロジェクト</b></td>
    <td align="center"><a href="#%EF%B8%8F-tech-stack">🛠️ 技術スタック</a></td>
    <td align="center"><a href="#-documentation">📖 ドキュメント</a></td>
    <td align="center"><a href="#-1000-contributors">👥 コントリビューター</a></td>
  </tr>
</table>

</div>

<div align="center">
  <b>🌐 67言語対応</b>
  <br/><br/>
  <a href="README.md"><img src="docs/assets/flags/us.svg" width="30" alt="英語 (en)" title="英語 (en)"></a>
  <a href="docs/i18n/pt-BR/README.md"><img src="docs/assets/flags/br.svg" width="30" alt="ポルトガル語 — ブラジル (pt-BR)" title="ポルトガル語 — ブラジル (pt-BR)"></a>
  <a href="docs/i18n/pt/README.md"><img src="docs/assets/flags/pt.svg" width="30" alt="ポルトガル語 (pt)" title="ポルトガル語 (pt)"></a>
  <a href="docs/i18n/es/README.md"><img src="docs/assets/flags/es.svg" width="30" alt="スペイン語 (es)" title="スペイン語 (es)"></a>
  <a href="docs/i18n/fr/README.md"><img src="docs/assets/flags/fr.svg" width="30" alt="フランス語 (fr)" title="フランス語 (fr)"></a>
  <a href="docs/i18n/it/README.md"><img src="docs/assets/flags/it.svg" width="30" alt="イタリア語 (it)" title="イタリア語 (it)"></a>
  <a href="docs/i18n/de/README.md"><img src="docs/assets/flags/de.svg" width="30" alt="ドイツ語 (de)" title="ドイツ語 (de)"></a>
  <a href="docs/i18n/nl/README.md"><img src="docs/assets/flags/nl.svg" width="30" alt="オランダ語 (nl)" title="オランダ語 (nl)"></a>
  <a href="docs/i18n/ru/README.md"><img src="docs/assets/flags/ru.svg" width="30" alt="ロシア語 (ru)" title="ロシア語 (ru)"></a>
  <a href="docs/i18n/uk-UA/README.md"><img src="docs/assets/flags/ua.svg" width="30" alt="ウクライナ語 (uk-UA)" title="ウクライナ語 (uk-UA)"></a>
  <a href="docs/i18n/pl/README.md"><img src="docs/assets/flags/pl.svg" width="30" alt="ポーランド語 (pl)" title="ポーランド語 (pl)"></a>
  <a href="docs/i18n/cs/README.md"><img src="docs/assets/flags/cz.svg" width="30" alt="チェコ語 (cs)" title="チェコ語 (cs)"></a>
  <a href="docs/i18n/sk/README.md"><img src="docs/assets/flags/sk.svg" width="30" alt="スロバキア語 (sk)" title="スロバキア語 (sk)"></a>
  <a href="docs/i18n/ro/README.md"><img src="docs/assets/flags/ro.svg" width="30" alt="ルーマニア語 (ro)" title="ルーマニア語 (ro)"></a>
  <a href="docs/i18n/hu/README.md"><img src="docs/assets/flags/hu.svg" width="30" alt="ハンガリー語 (hu)" title="ハンガリー語 (hu)"></a>
  <a href="docs/i18n/bg/README.md"><img src="docs/assets/flags/bg.svg" width="30" alt="ブルガリア語 (bg)" title="ブルガリア語 (bg)"></a>
  <a href="docs/i18n/da/README.md"><img src="docs/assets/flags/dk.svg" width="30" alt="デンマーク語 (da)" title="デンマーク語 (da)"></a>
  <a href="docs/i18n/fi/README.md"><img src="docs/assets/flags/fi.svg" width="30" alt="フィンランド語 (fi)" title="フィンランド語 (fi)"></a>
  <a href="docs/i18n/no/README.md"><img src="docs/assets/flags/no.svg" width="30" alt="ノルウェー語 (no)" title="ノルウェー語 (no)"></a>
  <a href="docs/i18n/sv/README.md"><img src="docs/assets/flags/se.svg" width="30" alt="スウェーデン語 (sv)" title="スウェーデン語 (sv)"></a>
  <a href="docs/i18n/zh-CN/README.md"><img src="docs/assets/flags/cn.svg" width="30" alt="中国語 — 簡体字 (zh-CN)" title="中国語 — 簡体字 (zh-CN)"></a>
  <a href="docs/i18n/zh-TW/README.md"><img src="docs/assets/flags/tw.svg" width="30" alt="中国語 — 繁体字 (zh-TW)" title="中国語 — 繁体字 (zh-TW)"></a>
  <a href="docs/i18n/ja/README.md"><img src="docs/assets/flags/jp.svg" width="30" alt="日本語 (ja)" title="日本語 (ja)"></a>
  <a href="docs/i18n/ko/README.md"><img src="docs/assets/flags/kr.svg" width="30" alt="韓国語 (ko)" title="韓国語 (ko)"></a>
  <a href="docs/i18n/th/README.md"><img src="docs/assets/flags/th.svg" width="30" alt="タイ語 (th)" title="タイ語 (th)"></a>
  <a href="docs/i18n/vi/README.md"><img src="docs/assets/flags/vn.svg" width="30" alt="ベトナム語 (vi)" title="ベトナム語 (vi)"></a>
  <a href="docs/i18n/id/README.md"><img src="docs/assets/flags/id.svg" width="30" alt="インドネシア語 (id)" title="インドネシア語 (id)"></a>
  <a href="docs/i18n/ms/README.md"><img src="docs/assets/flags/my.svg" width="30" alt="マレー語 (ms)" title="マレー語 (ms)"></a>
  <a href="docs/i18n/phi/README.md"><img src="docs/assets/flags/ph.svg" width="30" alt="フィリピン語 (phi)" title="フィリピン語 (phi)"></a>
  <a href="docs/i18n/hi/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ヒンディー語 (hi)" title="ヒンディー語 (hi)"></a>
  <a href="docs/i18n/gu/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="グジャラート語 (gu)" title="グジャラート語 (gu)"></a>
  <a href="docs/i18n/mr/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="マラーティー語 (mr)" title="マラーティー語 (mr)"></a>
  <a href="docs/i18n/ta/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="タミル語 (ta)" title="タミル語 (ta)"></a>
  <a href="docs/i18n/te/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="テルグ語 (te)" title="テルグ語 (te)"></a>
  <a href="docs/i18n/bn/README.md"><img src="docs/assets/flags/bd.svg" width="30" alt="ベンガル語 (bn)" title="ベンガル語 (bn)"></a>
  <a href="docs/i18n/ur/README.md"><img src="docs/assets/flags/pk.svg" width="30" alt="ウルドゥー語 (ur)" title="ウルドゥー語 (ur)"></a>
  <a href="docs/i18n/fa/README.md"><img src="docs/assets/flags/ir.svg" width="30" alt="ペルシア語 (fa)" title="ペルシア語 (fa)"></a>
  <a href="docs/i18n/ar/README.md"><img src="docs/assets/flags/sa.svg" width="30" alt="アラビア語 (ar)" title="アラビア語 (ar)"></a>
  <a href="docs/i18n/he/README.md"><img src="docs/assets/flags/il.svg" width="30" alt="ヘブライ語 (he)" title="ヘブライ語 (he)"></a>
  <a href="docs/i18n/tr/README.md"><img src="docs/assets/flags/tr.svg" width="30" alt="トルコ語 (tr)" title="トルコ語 (tr)"></a>
  <a href="docs/i18n/az/README.md"><img src="docs/assets/flags/az.svg" width="30" alt="アゼルバイジャン語 (az)" title="アゼルバイジャン語 (az)"></a>
  <a href="docs/i18n/sw/README.md"><img src="docs/assets/flags/tz.svg" width="30" alt="スワヒリ語 (sw)" title="スワヒリ語 (sw)"></a>
  <a href="docs/i18n/el/README.md"><img src="docs/assets/flags/gr.svg" width="30" alt="ギリシャ語 (el)" title="ギリシャ語 (el)"></a>
  <a href="docs/i18n/hr/README.md"><img src="docs/assets/flags/hr.svg" width="30" alt="クロアチア語 (hr)" title="クロアチア語 (hr)"></a>
  <a href="docs/i18n/sr/README.md"><img src="docs/assets/flags/rs.svg" width="30" alt="セルビア語 (sr)" title="セルビア語 (sr)"></a>
  <a href="docs/i18n/lt/README.md"><img src="docs/assets/flags/lt.svg" width="30" alt="リトアニア語 (lt)" title="リトアニア語 (lt)"></a>
  <a href="docs/i18n/et/README.md"><img src="docs/assets/flags/ee.svg" width="30" alt="エストニア語 (et)" title="エストニア語 (et)"></a>
  <a href="docs/i18n/lv/README.md"><img src="docs/assets/flags/lv.svg" width="30" alt="ラトビア語 (lv)" title="ラトビア語 (lv)"></a>
  <a href="docs/i18n/sl/README.md"><img src="docs/assets/flags/si.svg" width="30" alt="スロベニア語 (sl)" title="スロベニア語 (sl)"></a>
  <a href="docs/i18n/mt/README.md"><img src="docs/assets/flags/mt.svg" width="30" alt="マルタ語 (mt)" title="マルタ語 (mt)"></a>
  <a href="docs/i18n/ga/README.md"><img src="docs/assets/flags/ie.svg" width="30" alt="アイルランド語 (ga)" title="アイルランド語 (ga)"></a>
  <a href="docs/i18n/kn/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="カンナダ語 (kn)" title="カンナダ語 (kn)"></a>
  <a href="docs/i18n/ml/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="マラヤーラム語 (ml)" title="マラヤーラム語 (ml)"></a>
  <a href="docs/i18n/or/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="オディア語 (or)" title="オディア語 (or)"></a>
  <a href="docs/i18n/pa/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="パンジャーブ語 (pa)" title="パンジャーブ語 (pa)"></a>
  <a href="docs/i18n/ne/README.md"><img src="docs/assets/flags/np.svg" width="30" alt="ネパール語 (ne)" title="ネパール語 (ne)"></a>
  <a href="docs/i18n/si/README.md"><img src="docs/assets/flags/lk.svg" width="30" alt="シンハラ語 (si)" title="シンハラ語 (si)"></a>
  <a href="docs/i18n/my/README.md"><img src="docs/assets/flags/mm.svg" width="30" alt="ビルマ語 (my)" title="ビルマ語 (my)"></a>
  <a href="docs/i18n/km/README.md"><img src="docs/assets/flags/kh.svg" width="30" alt="クメール語 (km)" title="クメール語 (km)"></a>
  <a href="docs/i18n/ha/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="ハウサ語 (ha)" title="ハウサ語 (ha)"></a>
  <a href="docs/i18n/yo/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="ヨルバ語 (yo)" title="ヨルバ語 (yo)"></a>
  <a href="docs/i18n/ig/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="イボ語 (ig)" title="イボ語 (ig)"></a>
  <a href="docs/i18n/am/README.md"><img src="docs/assets/flags/et.svg" width="30" alt="アムハラ語 (am)" title="アムハラ語 (am)"></a>
  <a href="docs/i18n/uz/README.md"><img src="docs/assets/flags/uz.svg" width="30" alt="ウズベク語 (uz)" title="ウズベク語 (uz)"></a>
  <a href="docs/i18n/ka/README.md"><img src="docs/assets/flags/ge.svg" width="30" alt="ジョージア語 (ka)" title="ジョージア語 (ka)"></a>
  <a href="docs/i18n/hy/README.md"><img src="docs/assets/flags/am.svg" width="30" alt="アルメニア語 (hy)" title="アルメニア語 (hy)"></a>
  <a href="docs/i18n/bs/README.md"><img src="docs/assets/flags/ba.svg" width="30" alt="ボスニア語 (bs)" title="ボスニア語 (bs)"></a>
</div>

<br/>
<br/>

<div align="center">

<a id="first-run"></a>

## 🆓 インストールしてプロバイダーに接続し、1つのエンドポイント経由でルーティング

</div>

<img src="./docs/diagrams/works-zero-config.svg" width="100%" alt="3つのステップ：OmniRouteをインストールして起動し、自分のアカウントまたはAPIキーで利用可能なプロバイダーに接続し、OmniRoute APIキーとmodel autoを使用してツールをlocalhost:20128/v1に向けます。ルーティングは、利用可能な接続とプロバイダーの制限に応じて決まります。"/>

```bash
# プロバイダーに接続したら、ダッシュボード → エンドポイントからOmniRouteキーをコピーします：
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

<sub>`auto`には利用可能なルートが必要です。新規インストール直後は、キー不要で利用できる対象に利用可能なものがない場合があり、キー不要のプロバイダーがサードパーティ製クライアントを拒否することもあります。`tos: avoid`とマークされたプロバイダー（Kiroを含む）は、デフォルトで自動ルーティングから除外されます。アカウントを接続しても、この設定は上書きされません。プロバイダーを選ぶ前に、[無料ティアガイド](docs/getting-started/FREE-TIERS-GUIDE.md)を参照してください。</sub>

<sub>📦 **Python、Node.js、PHP、cURL** 用のコピー＆ペースト可能なクイックスタートスクリプト → [`examples/quickstart/`](examples/quickstart/)</sub>

<br/>

<div align="center">

# 💥 OmniRouteが約束するもの

</div>

<img src="./docs/diagrams/promise-pillars.svg" width="100%" alt="OmniRouteが約束するもの — 1つのエンドポイントと381のプロバイダー。利用可能で健全な別の対象がある限り、自動フォールバックによってルーティングを継続します。6つの柱：381のプロバイダーにまたがる回復力の高いフォールバック · 対象となるワークロードで最大95%のトークン削減 · 150以上の無料ティアと、継続利用可能またはキー不要で永久無料の52プロバイダーにより、0ドルから開始 · 1つの設定で39のCLI/エージェント連携 · /v1でのOpenAI、Claude、Gemini、Responses API互換性 · サーキットブレーカー、TLSステルス、MCP 110ツール、A2A、メモリ、ガードレール、評価、7,800以上の追跡テストファイルにわたる56,000以上の静的テスト宣言など、本番環境向けの制御機能。"/>

<br/>
<br/>

<div align="center">

# 🤔 なぜOmniRouteなのか？

</div>

<img src="./docs/diagrams/why-pain-fix.svg" width="100%" alt="なぜOmniRouteなのか — 10個のダッシュボード、使用されないまま期限切れになるAPIキー、予想外の請求をやりくりするのをやめましょう。日々の10の課題と解決策：未使用のままクォータが失効 → サブスクリプションを最大限に活用；コーディング中のレート制限 → 4段階の自動フォールバック（サブスクリプション → API → 安価 → 無料）；ツール出力によるトークン消費 → RTK + Caveman圧縮（15–95%）；高額なAPI → コスト最適化ルーティング；ツールごとに個別の設定が必要 → 1つのエンドポイント、1つのダッシュボード；AIがブロックされる → 3段階プロキシ + TLSステルス；使用不能なキー → 3層の回復力（サーキットブレーカー、キーのクールダウン、モデルのロックアウト）；チームで1つのサブスクリプションを共有 → 公平な共有クォータを備えたキープール；誰かのクラウドを経由するプロンプト → AES-256-GCMで暗号化されたキーによるローカル優先；支出の可視性がない → リアルタイム分析（使用量、クォータ、節約額、p95レイテンシ）。"/>

<div align="center">

<img src="./docs/diagrams/tier-cascade.svg" width="100%" alt="OmniRouteのリクエストフロー：IDEまたはCLI（Claude Code、Cursor、Cline…）が1つのローカルエンドポイント（http://localhost:20128/v1）を呼び出します。OmniRoute Smart Router（RTK + Caveman圧縮、20のルーティング戦略、サーキットブレーカー、TLSステルス、MCP、A2A、ガードレール）は、利用可能で健全な対象がある限り、4つのプロバイダーティアにまたがってフォールバックできます — ティア1 サブスクリプション、ティア2 APIキー、ティア3 安価、ティア4 無料。"/>

</div>

<br/>

<div align="center">

## 🤝 オープンソースフレンドによるサポート

</div>

<p align="center">
  <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
    <img src="public/sponsors/kimi-k3-banner.png" width="100%" alt="Kimi K3 — オープンフロンティアインテリジェンス · 2.8Tパラメータ · 1Mトークンコンテキスト"/>
  </a>
</p>

> **オープンソースフレンドとして参加しませんか？** これらの企業はオープンソースを支援し、OmniRouteの活動を継続するのに役立っています。そして、私たちは彼らが提供するすべてのトークンがどこに使われるかを公にしています。ご連絡ください: [diegosouza.pw@outlook.com](mailto:diegosouza.pw@outlook.com)

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
      <img src="https://img.shields.io/badge/Founding_Friend-1783FF?style=flat-square" alt="創設オープンソースフレンド"/>
    </td>
    <td>
      このプロジェクトを支援してくださる、創設オープンソースフレンドである<b>Kimi (Moonshot AI)</b>に感謝いたします！Kimiは、オープンウェイトのK2およびK3モデルファミリーを開発するAIラボです。<b>Kimi K3</b>は、1Mトークンのコンテキストウィンドウ、ネイティブビジョン、フロンティアレベルのコーディングを、クローズドモデルのわずかな価格で提供し、Claude Code、Codex、およびOmniRouteが提供するすべてのコーディングツールとすぐに連携します。
      <br/><br/>
      <b>Kimiのサポートがもたらすもの:</b> KimiのAPIクレジットは、OmniRouteのAI検証済みリリースパイプライン（すべてのプルリクエストが出荷される前にレビューされる<i>Kimi K3によるマージ検証</i>ステージ）と、日々の機能開発を支えています。ファーストクラスのKimiサポートは、直接の<a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">Kimi API</a>（<code>kimi-k3</code>）と<a href="https://www.kimi.ai/code?aff=omniroute">Kimi Codeコーディングプラン</a>（OAuthおよびAPIキー）の両方で提供されます。OmniRouteは、Kimiのサポートプログラムにおける最初のブラジル製オープンソースプロジェクトでもあります。<a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute"><b>15%追加クレジット付きのKimi APIキーを入手 →</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://cheaperinference.com/?utm_source=omniroute">
        <img src="./public/providers/cli-generic.svg" width="64" alt="Cheaper Inference"/>
      </a>
      <br/><b>Cheaper Inference</b><br/><sub>cheaperinference.com</sub><br/><br/>
      <img src="https://img.shields.io/badge/Open_Source_Friend-31f889?style=flat-square&labelColor=04170d" alt="オープンソースフレンド"/>
    </td>
    <td>
      このプロジェクトを支援してくださる、OmniRouteのオープンソースフレンドである<b>Cheaper Inference</b>に感謝いたします！Cheaper Inferenceは、42のフロンティアモデル（Claude、GPT-5.x、Gemini、Kimi K3、GLM、DeepSeek、Grok、MiniMax）を1つのOpenAI互換エンドポイントの背後で再販する、コストランク付けされたゲートウェイです。各リクエストを最も安価な適格プロバイダーにルーティングし、モデルメーカーの定価を超える料金を請求することはありません。
      <br/><br/>
      <b>OmniRouteでのファーストクラスサポート:</b> チャット補完、ネイティブの<code>/v1/responses</code>エンドポイント、ビジョン、ツール呼び出し、および3つの画像モデル（<code>grok-imagine</code>、<code>nano-banana-pro</code>、<code>nano-banana-2</code>、<code>cheaperinference/&lt;model&gt;</code>としてアクセス可能）。<a href="https://cheaperinference.com/?utm_source=omniroute"><b>APIキーを入手 →</b></a>
    </td>
  </tr>
</table>

<sub><code>aff=omniroute</code>タグ付きのリンクはパートナーリンクです。これらは追加費用なしでプロジェクトに資金を提供します。</sub>

<br/>

<details open>
<summary><sub><b>🎟️ アフィリエイトプロモーション</b> — スポンサーではないプロバイダーからの無料登録クーポン（クリックで展開）</sub></summary>

<sub><i>このセクションは紹介/クーポンコードのみを対象としています。スポンサーシップパートナーシップは上記の<b>🤝 オープンソースフレンドによるサポート</b>に記載されています。OmniRouteはここに記載されているプロバイダーとのスポンサーシップやパートナーシップは一切ありません。これらは誰でも利用できる公開クーポンです。</i></sub>

<table>
  <tr>
    <td align="center" width="120">
      <a href="https://agentrouter.org/register?aff=70LM">
        <img src="./public/providers/cli-generic.svg" width="32" alt="AgentRouter"/>
      </a>
      <br/><sub><b>AgentRouter</b></sub><br/><sub>agentrouter.org</sub>
    </td>
    <td>
      <sub><b><a href="https://agentrouter.org/register?aff=70LM">AgentRouter</a></b> — アフィリエイト登録 · 登録時に<b>$100の無料クレジット</b>（無料サーバー、レイテンシが高くなる可能性があります — 本番環境ではなくテストに最適）。OmniRouteでは<b>v3.8.50</b>以降、チャット補完、Anthropic互換のワイヤーフォーマット、OpenAI互換パスでファーストクラスのサポートを提供。利用可能なモデルには<code>claude-opus-4-8</code>、<code>claude-opus-5</code>、<code>gpt-5.6-sol</code>などがあります。<b><a href="https://agentrouter.org/register?aff=70LM">$100を獲得 →</a></b></sub>
      <br/><br/>
      <sub>⚠️ <i>アフィリエイトリンク — OmniRouteはこのプロバイダーとのスポンサーシップやパートナーシップはありません。</i></sub>
    </td>
  </tr>
</table>

<sub>OmniRouteユーザーに利益をもたらす、寛大な無料登録クーポンを提供する他のプロバイダーをご存知ですか？イシューをオープンしていただければ、ここに追記します。</sub>

</details>

<br/>

<div align="center">

## 🎯 コンボ — 主力機能

</div>

<img src="./docs/diagrams/strategies-grid.svg" width="100%" alt="20種類のコンボルーティング戦略のうち18種類のアニメーション例 — 戦略ごとに1タイル：priority、fill-first、weighted、round-robin、p2c、least-used、random、strict-random、cost-optimized、headroom、reset-window、reset-aware、context-relay、context-optimized、lkgp、auto、fusion、pipeline。cache-optimizedとquota-weightedにはアニメーションがありません。以下の表では全20種類を説明しています。"/>

> **コンボ**とは、OmniRouteが**自動的に**切り替えながらルーティングするモデルのチェーンです。クォータを使い切った場合、プロバイダーに障害が発生した場合、またはコストが急増した場合、コンボは次に利用可能な正常なモデルへ移行できます。🛡️

### ⚡ 設定不要 — `auto`を使うだけ

コンボを作成する必要はありません。モデルを`auto`（またはそのバリエーション）に設定すると、OmniRouteが接続済みプロバイダーから仮想コンボを構築し、リアルタイムでスコアリングします。

<table>
  <tr><th align="left">モデルID</th><th align="left">最適化の対象</th></tr>
  <tr><td align="left" nowrap><code>auto</code></td><td align="left">🎯 バランスの取れたデフォルト（LKGP — 最後に正常だったプロバイダーを継続使用）</td></tr>
  <tr><td align="left" nowrap><code>auto/coding</code></td><td align="left">🧑💻 コード生成向けの品質優先ウェイト</td></tr>
  <tr><td align="left" nowrap><code>auto/fast</code></td><td align="left">⚡ レイテンシが最も低いものを優先</td></tr>
  <tr><td align="left" nowrap><code>auto/cheap</code></td><td align="left">💰 トークン単価が最も安いものを優先</td></tr>
  <tr><td align="left" nowrap><code>auto/subscription</code></td><td align="left">🎟️ すでに料金を支払っているサブスクリプションのクォータのみを使用 — フェイルクローズ方式で、課金対象のフォールバックは一切なし（<a href="./docs/routing/SUBSCRIPTION_LADDER.md">ガイド</a>）</td></tr>
  <tr><td align="left" nowrap><code>auto/thrifty</code></td><td align="left">🪜 まずプランのクォータを使用し、その後は最も安い従量課金オプションへ1段ずつ移行 — リセット後はプランに復帰（<a href="./docs/routing/SUBSCRIPTION_LADDER.md">ガイド</a>）</td></tr>
  <tr><td align="left" nowrap><code>auto/offline</code></td><td align="left">🔋 クォータ／レート制限の余裕が最も大きいものを優先</td></tr>
  <tr><td align="left" nowrap><code>auto/smart</code></td><td align="left">🔭 品質優先＋より優れたモデルを発見するための10%の探索</td></tr>
  <tr><td align="left" nowrap><code>auto/lkgp</code></td><td align="left">📌 最後に正常だったプロバイダーを明示的に継続使用</td></tr>
  <tr><td align="left" nowrap><code>auto/chaos</code></td><td align="left">🧪 複数モデルのパネル（プロバイダーごとに1つ、デフォルトでは5つ）へ並列にファンアウトし、1つの回答を返す。パネル内のモデルごとにアップストリーム呼び出しを1回実行するものであり、フォールトインジェクションではありません</td></tr>
</table>

##

### 🔀 または独自に構築 — 20種類のルーティング戦略

**20種類**すべての戦略を、コンボのステップごとに自由に組み合わせられます。

<table>
  <tr>
    <th>#</th>
    <th align="left">戦略</th>
    <th align="left">動作</th>
  </tr>
  <tr>
    <td align="center">1</td>
    <td nowrap><code>priority</code></td>
    <td>先頭ターゲット優先の順序付きリスト — 各ターゲットを使い切ってから次へ移行 🥇</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td nowrap><code>fill-first</code></td>
    <td>次へ移行する前に、各ターゲットのクォータを完全に使い切る</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td nowrap><code>weighted</code></td>
    <td>ターゲットごとのウェイトに基づく加重ランダム選択</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td nowrap><code>round-robin</code></td>
    <td>ターゲットを順番に循環</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td nowrap><code>p2c</code></td>
    <td>「2つの選択肢」方式によるランダム負荷分散</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td nowrap><code>least-used</code></td>
    <td>現在の負荷が最も低いターゲットを選択</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td nowrap><code>random</code></td>
    <td>一様ランダム選択（重複を排除）</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td nowrap><code>strict-random</code></td>
    <td>重複する選択を排除しないランダム方式 🎲</td>
  </tr>
  <tr>
    <td align="center">9</td>
    <td nowrap><code>cost-optimized</code></td>
    <td>ライブカタログの価格情報に基づき、リクエストあたりのコストを最小化 💸</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td nowrap><code>headroom</code></td>
    <td>残りのクォータが最も多いターゲットを選択</td>
  </tr>
  <tr>
    <td align="center">11</td>
    <td nowrap><code>quota-weighted</code></td>
    <td>クォータを使い切ったアカウントを除外し、残りのクォータ÷処理中の負荷に比例して選択 — 既存の会話は固定を維持 ⚖️</td>
  </tr>
  <tr>
    <td align="center">12</td>
    <td nowrap><code>reset-window</code></td>
    <td>クォータの期間が最も早くリセットされるターゲットを優先</td>
  </tr>
  <tr>
    <td align="center">13</td>
    <td nowrap><code>reset-aware</code></td>
    <td>クォータのリセット時刻で順位付け — 短い期間を優先 📊</td>
  </tr>
  <tr>
    <td align="center">14</td>
    <td nowrap><code>context-relay</code></td>
    <td>長い会話でターゲット間のコンテキストを引き継ぐ 🧠</td>
  </tr>
  <tr>
    <td align="center">15</td>
    <td nowrap><code>context-optimized</code></td>
    <td>現在のコンテキストサイズに最適なターゲットを選択</td>
  </tr>
  <tr>
    <td align="center">16</td>
    <td nowrap><code>cache-optimized</code></td>
    <td>再利用可能な各プロンプト接頭辞を同じアカウントに固定 — プロンプトキャッシュのヒット率を最大化 🎯</td>
  </tr>
  <tr>
    <td align="center">17</td>
    <td nowrap><code>lkgp</code></td>
    <td>Last-Known-Good Path — 最後に成功したプロバイダーに固定し、その後ルールにフォールバック</td>
  </tr>
  <tr>
    <td align="center">18</td>
    <td nowrap><code>auto</code></td>
    <td>すべての接続を対象とした16要素のリアルタイムスコアリング 🤖</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td nowrap><code>fusion</code></td>
    <td>複数モデルのパネルへファンアウトし、ジャッジが1つの回答に統合 🧬</td>
  </tr>
  <tr>
    <td align="center">20</td>
    <td nowrap><code>pipeline</code></td>
    <td>ステップを連結 — 各ターゲットの出力を次のターゲットへ渡す 🔗</td>
  </tr>
</table>

<sub>Auto-Combo エンジンは、すべての候補を **16 の要因**（ヘルス、クォータ、コスト、レイテンシ、タスク適合性、品質、セッション可用性など）で評価します — 詳細は [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md) を参照してください。</sub>

##

### 🧱 レジリエンスを標準搭載（独立した 3 層）

<img src="./docs/diagrams/resilience-layers.svg" width="100%" alt="OmniRoute のレジリエンス — 独立した 3 つの自己修復レイヤーにより、障害に応じて適切なレイヤーが対処します。レイヤー 1：プロバイダー・サーキットブレーカー（プロバイダー全体）。408/5xx の場合にのみ作動し、しきい値は OAuth 8 回 / API キー 12 回 / ローカル 2 回です。60 秒 / 30 秒 / 15 秒後に HALF-OPEN プローブへリセットされ、遅延回復を行います。OPEN の間、コンボは次のプロバイダーへ再ルーティングします。レイヤー 2：接続クールダウン（1 つのキーまたはアカウント）。基本時間は OAuth 5 秒 / API キー 3 秒で、サンダリングハード防止機構を備えた指数関数的な ×2 バックオフを使用します。429 では Retry-After に従い、成功するとすべてのエラー状態がクリアされます。クールダウン中のキーはスキップされ、他のキーは引き続き処理を提供します。レイヤー 3：モデルのロックアウト（1 つのモデル）。モデル単位の 429、ローカルの 404、またはモード拒否では、そのモデルだけがロックされ、接続全体がロックされることはありません。終端状態（禁止、期限切れ、クレジット枯渇）はクールダウンの対象ではなく、オペレーターによる対応が必要です。"/>

<sub>📖 [Auto-Combo エンジン](docs/routing/AUTO-COMBO.md) · [レジリエンスガイド](docs/architecture/RESILIENCE_GUIDE.md)</sub>

<br/>

<div align="center">

## 🏆 OmniRouteを際立たせる特徴

</div>

<img src="./docs/diagrams/comparison-table.svg" width="100%" alt="OmniRouteを際立たせる特徴 — 9router、OpenRouter、CLIProxyAPI、LiteLLMと13の機能を比較した日付入りのスナップショット。OmniRouteには、381のプロバイダー、組み込みの150以上の無料ティア、20のルーティング戦略、12エンジンによるトークン圧縮、110ツールを備えた組み込みMCPサーバー、A2Aエージェントプロトコル、永続メモリ、ガードレール、クラウドエージェント、TLSフィンガープリントによるステルス、Desktop/Termux/PWA、67のi18n UIロケールが含まれます。OmniRouteはMITライセンスで提供され、セルフホストできます。競合製品の機能や数は変更される場合があります。詳細はリンク先の方法論をご覧ください。"/>

<sub>📊 9router、OpenRouter、CLIProxyAPI、LiteLLMとの完全な方法論と機能別詳細 → [`docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`](docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)</sub>

<br/>

## 💚 OmniRoute を支援する

OmniRoute は MIT ライセンスで公開され、オープンに保守されています。時間や費用の節約に役立った場合は、独立性を維持するために、ご自分に合った方法でご支援ください。スポンサーシップがルーティングの優先順位に影響することはありません。得られるのは可視性であり、順位ではありません。

<table>
  <tr><td nowrap>⭐ <b>リポジトリにスターを付ける</b></td><td>無料 — 可視性の向上に本当に役立ちます</td><td><a href="https://github.com/diegosouzapw/OmniRoute">OmniRoute にスターを付ける</a></td></tr>
  <tr><td nowrap>🐙 <b>GitHub Sponsors</b></td><td>単発または月額 · プラットフォーム手数料なし</td><td><a href="https://github.com/sponsors/diegosouzapw">github.com/sponsors/diegosouzapw</a></td></tr>
  <tr><td nowrap>☕ <b>Ko-fi</b></td><td>手軽な単発支援、支援者の登録は不要</td><td><a href="https://ko-fi.com/diegosouzapw">ko-fi.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🧋 <b>Buy Me a Coffee</b></td><td>少額で気軽な支援</td><td><a href="https://www.buymeacoffee.com/diegosouzapw">buymeacoffee.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🖐 <b>Liberapay</b></td><td>継続支援 · 非営利 · オープンソース</td><td><a href="https://liberapay.com/diegosouzapw">liberapay.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🇧🇷 <b>PIX</b>（ブラジル）</td><td>即時、手数料なし</td><td>キーと QR は以下</td></tr>
  <tr><td nowrap>₿ <b>暗号資産</b></td><td>BTC · ETH · USDT-TRC20 · USDC-Solana</td><td>アドレスは以下</td></tr>
</table>

**🇧🇷 PIX** — 即時、手数料なし（ブラジル）

<img src="docs/assets/pix-qr.png" width="140" align="right" alt="OmniRoute の PIX QR コード"/>

キー（ランダム）：`5d865059-bc44-483a-962d-43ceb80126eb`

Pix コピー＆ペースト：

```
00020101021126580014br.gov.bcb.pix01365d865059-bc44-483a-962d-43ceb80126eb5204000053039865802BR5922OMNIROUTE CONTRIBUICAO6006BRASIL62070503***630475DD
```

<br clear="right"/>

<details>
<summary><b>₿ 暗号資産</b> — BTC · ETH · USDT-TRC20 · USDC-Solana（クリックして展開）</summary>

<table>
  <tr><td nowrap><b>₿ BTC</b></td><td nowrap>Bitcoin (SegWit)</td><td><code>bc1qh00smz004sy85wyl28v77tenkt3ckl6eaep7fd</code></td></tr>
  <tr><td nowrap><b>Ξ ETH</b></td><td nowrap>Ethereum (ERC20)</td><td><code>0x64Cf6B68A6Ff34288e89172950a2d00102337a84</code></td></tr>
  <tr><td nowrap><b>₮ USDT</b></td><td nowrap>Tron (TRC20)</td><td><code>TKAF41JpuQrHbKTnsQa9svJE2T192Hvsc2</code></td></tr>
  <tr><td nowrap><b>$ USDC</b></td><td nowrap>Solana</td><td><code>2emNNZzVVWQc3FQ2wk9M6qXUQmW8AKdjjL174fXR28Tu</code></td></tr>
</table>

<sub>⚠️ 各コインは、表示されているネットワークでのみ送金してください。誤ったネットワークで送金すると、資金を失う可能性があります。</sub>

</details>

🐛 バグを見つけた場合やフィードバックがある場合は、[Discussion](https://github.com/diegosouzapw/OmniRoute/discussions) を作成してください。

<br/>

<p><strong>開発者向け注記：</strong> このプロジェクトでは、開発者の利便性のため、npm install/postinstall の実行中にローカルの <code>.env</code> ファイルが生成される場合があります。このファイルは意図的に <code>.gitignore</code> 経由で無視されており（<code>.gitignore</code> を参照）、決してコミットしてはなりません。誤ってコミットした場合は、露出したシークレットをすべてローテーションし、履歴からそのファイルを削除してください。ローカル環境ファイルとシークレットの管理方法については、<a href="docs/DEVELOPER-ENVIRONMENT.md">docs/DEVELOPER-ENVIRONMENT.md</a> を参照してください。</p>

## 📡 OmniRoute Radar

無料枠の主な目安は、上記のドキュメント化されたプール重複排除済みカタログに基づき、引き続き**月間約1.62Bトークン**です。プロバイダーの一時的なサインアップクレジットにより、初月は別途**約2.22B**まで増える可能性があります。Radarは、OmniRouteのリリース間でも無料モデルの提供状況をより最新の状態で把握したい方のための、署名付きカタログオーバーレイです。利用は任意であり、コミュニティカタログおよび既存のすべての無料機能は、引き続き無料です。

サポーターは、ライブカタログと追加のプロバイダー利用機会を受け取ることができます。この枠は独立して変動し、プロバイダーの提供状況に応じて、上限は**最大で月間約3Bトークン**です。この上限は保証されるものではありません。プロバイダーは、割り当て量、利用資格、モデル、または対象地域をいつでも変更できます。

Radarはオプトイン方式で、GETリクエストのみを使用します。OmniRouteクライアントが、プロンプト、トラフィック、プロバイダー設定、使用状況テレメトリ、またはローカルのお知らせ非表示状態をアップロードすることはありません。利用資格と現在のカタログについては、**[radar.omniroute.online/planos](https://radar.omniroute.online/planos)**をご覧ください。

<br/>

<div align="center">

## ✨ 新機能

</div>

> **v3.8.20 → v3.8.54** の主な変更点です。完全な履歴は [`CHANGELOG.md`](CHANGELOG.md) を参照してください。

- **⚖️ `quota-weighted` ルーティング** — 20番目のコンボ戦略です。使い切ったアカウントをスキップし、残りのアカウントから残りのクォータ ÷ 実行中の負荷の割合に応じて選択します。既存の会話は同じアカウントに固定されます。→ [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🧰 ヘッドレスモード** — `omniroute serve --headless`（または `OMNIROUTE_HEADLESS=1`）を実行すると、`/v1/*` プロキシエンジンのみが稼働し、ダッシュボードとダッシュボード専用サブシステムは無効になります。→ [ヘッドレスモード](docs/guides/HEADLESS.md)
- **🔎 モデル検出** — `/v1/models` は機能、コンテキスト、種別、テキストでフィルタリングでき、`POST /v1/models/query` は同じキーごとの可視性を適用した、短く決定論的な候補リストを返します。→ [APIリファレンス](docs/reference/API_REFERENCE.md)
- **🔑 キーごとのルーティング制御** — `forcedModel` を使ってAPIキーを1つのモデルまたはコンボに固定し、キーのモデルとコンボをアトミックに追加・削除できます（`/api/keys/{id}/access`）。→ [APIリファレンス](docs/reference/API_REFERENCE.md) · [OpenAPI](docs/openapi.yaml)
- **🛡️ より細かなPII制御** — 種類ごとの選択、最大20個の検証済みカスタムマスキングパターン、種類ごとの検出カウンターに対応しました。マスキング自体は引き続きオプトインです。→ [ガードレール](docs/security/GUARDRAILS.md)
- **🌍 67言語** — ダッシュボード、ドキュメントミラー、CLIに対応し、`npm run i18n:add-locale` を実行するだけで、すべての場所に言語を追加できます。→ [i18nガイド](docs/guides/I18N.md)
- **🎛️ OmniConductor** — エージェントフリートへのインバウンドA2A委任、Agent Card上のConductorスキル、Faroのプッシュ・トゥ・トーク音声チャットを備えたダッシュボードパネルに対応しました。→ [A2Aサーバー](docs/frameworks/A2A-SERVER.md)
- **🛂 適応型アドミッションと過負荷保護** — 負荷の大きいチャットリクエストは503を返す代わりにキューに入り、接続ごとにRPMのローリングリースをアトミックに処理します。→ [レジリエンスガイド](docs/architecture/RESILIENCE_GUIDE.md)
- **🗂️ 正規化された `/v1/models` の順序** — プロバイダーごとに、コンボを先頭に固定した連続したプロバイダーグループのブロックを1つだけ配置し、すべてのカタログソースで順序が安定します。→ [APIリファレンス](docs/reference/API_REFERENCE.md)
- **🗜️ 圧縮の堅牢化** — インフレーションガードをデフォルトで有効化し、DE / FR / JA + 中国語（文言）のCavemanパック、Gradleと.NET向けのRTKフィルターを追加しました。→ [圧縮](docs/compression/COMPRESSION_ENGINES.md)
- **💸 正直な定額料金** — サブスクリプション / コーディングプランのプロバイダーはコスト分析上 **$0** として扱われます。予算、クォータ、ルーティングでは引き続き推定値が使用されます。→ [APIリファレンス](docs/reference/API_REFERENCE.md)
- **⚖️ Quota-Shareルーティング** — 共有アカウントのクォータをプールされたキー間で公平に分配します。アイドル状態の割り当て分を貸し出すワークコンserving方式です。→ [レジリエンスガイド](docs/architecture/RESILIENCE_GUIDE.md)
- **🤖 ワンコマンドのCLI/エージェントセットアップ** — 15個の `setup-*` コマンドを登録し、`omniroute run` で7つのCLI（Claude Code、Codex、Aider、Goose、OpenCode、Qwen Code、Gemini CLI）を起動できます。`omniroute configure` は11個のターゲットに対応し、対話型のプロバイダー+モデルピッカーと、コンテキストごとのお気に入りを提供します。→ [CLI連携](docs/guides/CLI-INTEGRATIONS.md)
- **🛰️ リモートモード** — スコープ付きトークン（`connect` / `contexts` / `tokens`）を使ってリモートのOmniRouteを操作でき、VPSへのインストール向けに `antigravity` OAuthヘルパーも利用できます。→ [リモートモード](docs/guides/REMOTE-MODE.md)
- **🧭 よりスマートな自動ルーティング** — `auto/<category>:<tier>` コンボ、**Fusion**（モデルパネル + ジャッジ）、タスク対応ルーティング、リクエストごとのモデル / モード / USD予算の上書きに対応しました。→ [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🗜️ プラガブルな圧縮** — 12個の組み合わせ可能なエンジンとCompression Studiosに対応しました。LLMLingua-2、2段階Ultra、omniglyph、ステップごとの忠実度ゲート、GCF v3.2、ドラッグ＆ドロップによる並べ替えエディターを利用できます。→ [圧縮](docs/compression/COMPRESSION_ENGINES.md)
- **🕵️ 透過的なMITM復号（TPROXY）** — プロキシ環境変数を無視するCLIをキャプチャでき、SNIごとのCAとトラストストアインストーラーを備えています。→ [MITM/TPROXY](docs/security/MITM-TPROXY-DECRYPT.md)
- **💸 あらゆる場所でのコストテレメトリ** — すべてのエンドポイントで `X-OmniRoute-*` コスト/使用量ヘッダーを提供し、キャッシュHITによる節約額ヘッダーと、キーごとのUSD支出クォータにも対応しました。→ [APIリファレンス](docs/reference/API_REFERENCE.md)
- **🧠 制御可能なメモリ** — デフォルトでは無効で、オプトインのint8ベクトル量子化と型付き減衰、およびリクエストごとの `x-omniroute-no-memory` に対応します。→ [メモリ](docs/frameworks/MEMORY.md)
- **🛡️ セキュリティ** — すべてのLLMルートにプロンプトインジェクションガード（レッドチームスイート）を適用し、オプトインの認証情報マスキングガードレール（送受信の両方向で漏洩したAPIキー/シークレットを編集）、無料のDuckDuckGo最終手段Web検索、ダッシュボード向けのオプションのOIDCログインゲートを提供します（パスワードログインは常に利用可能です）。→ [ガードレール](docs/security/GUARDRAILS.md)
- **🖼️ 新しいエンドポイント** — `/v1/ocr`（Mistral OCR）と `/v1/audio/translations`（Whisper形式）を追加し、メディアAPIを拡充しました。→ [APIリファレンス](docs/reference/API_REFERENCE.md)
- **🎨 画像 / 動画 / 音声生成** — メディア向けの単一APIで、xAI Grok ImagineとNovita AIの動画、ComfyUI、Magnific、Adobe Firefly、Segmind、ElevenLabsなどの音声プロバイダーを利用できます。→ [APIリファレンス](docs/reference/API_REFERENCE.md)
- **🌍 デプロイと運用** — リバースプロキシの `basePath`、ブラウザー言語の自動検出、キーごとのデバイス追跡、root権限不要のMITM信頼、zh-TWローカライゼーションに対応しました。→ [環境変数](docs/reference/ENVIRONMENT.md)
- **🤝 さらに多くのプロバイダーとエージェント** — クラウドエージェント（Codex Cloud、Cursor、Devin、Jules）、ブラウザー + OAuthログイン対応のGrok Build（xAI）、正式対応のOllamaカード、Claude Opus 5とSonnet 5、Kimi公式パートナーシップ（Code/Web/Moonshot）、Zed、Requesty、SenseNova、Yuanbao、Agnes AIなどに対応し、**381プロバイダーのカタログ**を刷新しました。→ [プロバイダー](docs/reference/PROVIDER_REFERENCE.md)
- **📡 ルーティングの透明性** — すべてのレスポンスに、処理した戦略/プロバイダー/レイテンシーを示す `X-OmniRoute-Decision` ヘッダーが付与されます。新しい `cache-optimized` コンボ戦略とAuto-Comboの `cacheAffinity` 要素により、繰り返しリクエストをキャッシュ済みプレフィックスを保持する接続へ戻します。また、読み取り専用の `/v1/auto-combo/{channel}/candidates` エンドポイントで、`auto/*` チャネルの現在の候補プールを公開します。→ [Auto-Combo](docs/routing/AUTO-COMBO.md)。
- **⚡ ローカルパフォーマンスとインフラ** — ワンクリックで起動できるローカル Redis、Cloudflare Workers / Deno Deploy リレーデプロイヤー、監視対象の組み込みサービスとしての Bifrost と Mux。→ [組み込みサービス](docs/frameworks/EMBEDDED-SERVICES.md)
- **🧩 これらも標準搭載** — プラグインフレームワーク + マーケットプレイス、Omni/Agent/GitHub スキルフレームワーク、Obsidian vault 統合（22 個の MCP ツール）、OpenAI 互換の Batch & Files API、セマンティックレスポンスキャッシュ、リーダーボード付きのゲーミフィケーション、ACP エージェント検出（15 個の組み込みエージェント）、BigQuery へのスケジュール済みログエクスポート、`auto/chaos` による並列マルチモデルファンアウト、Telegram ボットブリッジ、アプリ内バージョンマネージャー、LMArena-ELO による無料プロバイダーランキング。→ [ドキュメント](docs/README.md)

<br/>

<div align="center">

## 🤖 対応CLI & コーディングエージェント

> 1つの設定 — `http://localhost:20128/v1` — で、**すべて**のAI IDEやCLIが無料・低コストのモデルで動作します。

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
<b>＋ 他にも対応</b> · Agent Deck · Kiro · Command Code · Antigravity · Windsurf · AMP · <b>あらゆるOpenAI互換ツール</b>
</div>

<sub>📖 すべての39ツール（CLI Code 28種 + CLI Agent 11種）のツールごとのセットアップ → [`docs/reference/CLI-TOOLS.md`](docs/reference/CLI-TOOLS.md) · 🧩 OpenCodeプラグイン → [`@omniroute/opencode-provider`](https://www.npmjs.com/package/@omniroute/opencode-provider)</sub>

</div>

<br/>

**OmniRouteを使って、サポートされている任意のCLIを1コマンドで起動** — 設定ファイル不要、
認証情報はプロセスごとに注入、Qwen/Geminiには使い捨ての分離されたホームを割り当て:

```bash
omniroute run claude   --model openai/gpt-5.4          # Claude Code
omniroute run codex    --model glm/glm-5.2             # OpenAI Codex CLI
omniroute run aider    --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose    --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen     --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# または、プロバイダーとモデルを対話的に選択し、ツール独自の設定を書き込む:
omniroute configure codex          # 他にも: claude opencode qwen aider goose gemini cline continue kilo 5dive
```

すべてのコマンドはアクティブなリモートコンテキスト（`omniroute connect <host>`）を尊重し、`--dry-run`で
実行せずに正確な環境変数や引数をプレビュー、`--api-key-env NAME`で
シェル履歴に秘密情報を残しません。→ [CLI統合](docs/guides/CLI-INTEGRATIONS.md)

<br/>

<div align="center">

## 🌐 381 AI プロバイダー — カタログ登録済み無料 153

</div>

> **381 の登録済みプロバイダー**が、正規のチャット、メディア、検索、ローカル、クラウドエージェント、システムの各コレクションにまたがって存在し、そのうち **153 は `hasFree: true` の検出メタデータを付与**されています。チャットモデルレジストリには **239 プロバイダー / 3,059 個の個別プロバイダー・モデルペア / 1,475 個の生モデル ID**が含まれます。別個に管理される無料予算カタログには、**モデルごとの行が 471 件**、**継続的なプールが 34 件**、**継続利用可能・キー不要で永久無料のプロバイダーが 52 件**あります。これらは意図的に異なる分母を使用しています。定義およびプール重複排除後の計算については、[プロバイダーリファレンス](docs/reference/PROVIDER_REFERENCE.md)と[無料ティア](docs/reference/FREE_TIERS.md)をご覧ください。

<div align="center">

### 🏢 主要なすべてのラボを — 1 つのエンドポイントから

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

<sub>…さらに 350 以上 — すべてのアイコンはダッシュボードのプロバイダーカタログからリアルタイムで解決されます。📖 [プロバイダーリファレンス](docs/reference/PROVIDER_REFERENCE.md)</sub>

<br/>

### 🆓 永久無料 — $0、カード不要

<table>
  <tr>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="OpenCode Zen"/><br/><b>OpenCode Zen</b><br/><sub>DeepSeek V4、Nemotron 3<br/>トークン上限なし</sub></td>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="Kilo Code"/><br/><b>Kilo Code</b><br/><sub>自動ルーター、Tencent Hy3<br/>永久無料</sub></td>
    <td align="center" width="150"><img src="./public/providers/requesty.svg" width="42" alt="Requesty"/><br/><b>Requesty</b><br/><sub>GPT-OSS 120B、Nemotron<br/>永久無料</sub></td>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/siliconcloud-color.svg" width="42" alt="SiliconFlow"/><br/><b>SiliconFlow</b><br/><sub>DeepSeek V3.2 / R1<br/>無料枠あり</sub></td>
    <td align="center" width="150"><img src="./public/providers/zhipu.svg" width="42" alt="Z.AI GLM"/><br/><b>Z.AI GLM</b><br/><sub>GLM-4.7 / 4.5-Flash<br/>永久無料</sub></td>
    <td align="center" width="150"><img src="./public/providers/baidu.svg" width="42" alt="Baidu ERNIE"/><br/><b>Baidu ERNIE</b><br/><sub>ERNIE 4.0<br/>永久無料</sub></td>
  </tr>
  <tr>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qoder-color.svg" width="42" alt="Qoder AI"/><br/><b>Qoder AI</b><br/><sub>Qwen3-Max、Kimi-K2<br/>無制限で無料</sub></td>
    <td align="center" width="150"><img src="./public/providers/pollinations.svg" width="42" alt="Pollinations"/><br/><b>Pollinations</b><br/><sub>GPT、Llama、Claude<br/>キー不要</sub></td>
    <td align="center" width="150"><img src="./public/providers/cloudflare.svg" width="42" alt="Cloudflare AI"/><br/><b>Cloudflare AI</b><br/><sub>50以上のモデル<br/>1日あたり10Kニューロン</sub></td>
    <td align="center" width="150"><img src="./public/providers/nvidia.svg" width="42" alt="NVIDIA NIM"/><br/><b>NVIDIA NIM</b><br/><sub>GLM、MiniMax<br/>無料で約40 RPM</sub></td>
    <td align="center" width="150"><img src="./public/providers/cerebras.svg" width="42" alt="Cerebras"/><br/><b>Cerebras</b><br/><sub>GLM 4.7、GPT-OSS<br/>初回のみ$5クレジット、カード必須</sub></td>
    <td align="center" width="150"><img src="./public/providers/openrouter.svg" width="42" alt="OpenRouter"/><br/><b>OpenRouter</b><br/><sub>:無料モデル<br/>+$10 → より高いRPM</sub></td>
  </tr>
</table>

📖 機械可読な完全なカタログ → [`docs/reference/PROVIDER_REFERENCE.md`](docs/reference/PROVIDER_REFERENCE.md)

<br/>
</div>

<div align="center">

## 🖥️ OmniRouteが実行される場所 - どこでも

</div>

> 同じアプリ、同じマシン、あなたのルール。グローバル npm インストールから**あなたの電話**Termux経由。

<table>
  <tr><th align="left">プラットフォーム</th><th align="left">インストール</th><th align="left">ハイライト</th></tr>
  <tr><td align="left" nowrap>📦 <b> npm (グローバル)</b></td><td align="left" nowrap><code> npm install -gオムニルート</code></td><td align="left"> 1 つのコマンド、任意のOS</td></tr>
  <tr><td align="left" nowrap>⚡ <b>Bun (グローバル)</b></td><td align="left" nowrap><code> bun add -gオムニルート</code></td><td align="left">同じレジストリ tarball、高速インストール</td></tr>
  <tr><td align="left" nowrap>🐳 <b>Docker</b></td><td align="left" nowrap><code> docker run … diegosouzapw/omniroute</code></td><td align="left">マルチアーチ<b>AMD64 + ARM64</b></td></tr>
  <tr><td align="left" nowrap>🖥️ <b>デスクトップ (Electron)</b></td><td align="left" nowrap><code> npm run electric:build </code></td><td align="left">ネイティブ ウィンドウ+システム トレイ — <b>Windows / macOS / Linux</b></td></tr>
  <tr><td align="left" nowrap>🎩 <b>メニューバー (OmniRouteTray)</b></td><td align="left" nowrap><code> brew install --cask zoispag/tap/omniroute-tray</code></td><td align="left">&amp;サーバーの自動更新の監視 — <b>macOS</b></td></tr>
  <tr><td align="left" nowrap>💪 <b>ARM</b></td><td align="left" nowrap>ネイティブ<code> arm64 </code></td><td align="left"> Raspberry Pi、 ARMサーバー、Apple Silicon </td></tr>
  <tr><td align="left" nowrap>📱 <b> Android (Termux)</b></td><td align="left" nowrap><code> pkg install Nodejs && npx -yオムニルート</code></td><td align="left">携帯電話で<b>を実行します</b>、 24/7、ルートなし</td></tr>
  <tr><td align="left" nowrap>📲 <b>PWA</b></td><td align="left" nowrap>「ホーム画面に追加」</td><td align="left">フルスクリーン、オフライン、ブラウザからインストール可能</td></tr>
  <tr><td align="left" nowrap>🧩 <b>OpenCodeプラグイン</b></td><td align="left" nowrap><code>@omniroute/opencode-provider</code></td><td align="left">OpenCode zqn 統合</td></tr>
  <tr><td align="left" nowrap>🤖 <b>VSコードCopilotチャット</b></td><td align="left" nowrap>インストール<b>OmniCopilot</b>拡張</td><td align="left">ネイティブCopilotのすべてのOmniRouteモデル チャット ピッカー — 安定した&amp; Insiders </td></tr>
  <tr><td align="left" nowrap>🛠️ <b>ソースから</b></td><td align="left" nowrap><code> npm install && npm run dev </code></td><td align="left">ハックして、</td></tr>に貢献してください
</table>

<sub>📖 [Dockerガイド](docs/guides/DOCKER_GUIDE.md)·[デスクトップ](electron/README.md)·[メニューバー トレイ](https://github.com/zoispag/omniroute-tray)· [Termux](docs/guides/TERMUX_GUIDE.md) · [PWA](docs/guides/PWA_GUIDE.md) · [OpenCode](docs/frameworks/OPENCODE.md)</sub>

<br/>

<div align="center">

### 🧩新しい: VSコードのネイティブCopilotチャット内のOmniRoute

</div>

> 新しいサイドバーや新しいチャットUIはありませんOmniRoute提供するすべてのモデルは、**すでに使用しているCopilotチャット モデル ピッカー**。 VSコード 1.122 以降、プロバイダー モデルは、 GitHubサインインやCopilotサブスクリプションなしでも、エージェント モード、ツール呼び出し、ビジョンを無料で利用できます。

をインストールします。** [OmniCopilot](https://github.com/diegosouzapw/OmniCopilot)**拡張子を使用して、 OmniRouteサーバー (デフォルトは`localhost:20128`) を指定してから、 Copilot Chat → model picker →を開きます。**モデルを管理…** →**OmniRoute** 。

<table>
  <tr><th align="left">ストア</th><th align="left">リンク</th><th align="left"></th></tr>で動作
  <tr><td align="left" nowrap>🧩 <b>VSコード マーケットプレイス</b></td><td align="left"><a href="https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot">→<をインストール /a ></td ><="左" に整列>VSコード — 安定した&amp; Insiders </td></tr>
  <tr><td align="left" nowrap>🔓 <b>VSXレジストリを開く</b></td><td align="left"><a href="https://open-vsx.org/extension/diegosouzapw/omnicopilot">をインストールする /a →</><>< td ="left" に整列>Cursor、 Windsurf、 VSCodium、Theia、 code-server、 Gitpod、 Antigravity、 Kiro…</td></tr>
</table>

エディター内から:**拡張機能**見る、検索する**「OmniRoute」** 、 クリック**インストール**— どちらのストアでも同じように機能します。ソース、問題、発行 Runbook は[diegosouzapw/OmniCopilot](https://github.com/diegosouzapw/OmniCopilot)にあります。

<sub>📖 [VSコードCopilotチャット ガイド](docs/guides/VSCODE-COPILOT.md)— セットアップ、ピッカーの表示内容、タブ内のダッシュボード、</sub>トラブルシューティング

<br/>

<div align="center">

### 🎩 New: OmniRouteTray — メニューバーにあるゲートウェイ

</div>

> `omniroute serve`常にオンになっているときが最も幸せです。** [OmniRouteTray](https://github.com/zoispag/omniroute-tray)**これをmacOS用の、設定して忘れるメニューバー アプリに変えます。サーバーを起動し、再起動後もサーバーを存続させ、所定の位置に更新し、ワンクリックでライブ トークン バジェットを設定します。**ターミナル ウィンドウを開いたままにすることも、 `npm install -g omniroute`ベビーシッターをすることもありません。**

[Tauri v2](https://v2.tauri.app/) (丸め誤差のサイズの Rust コア) で構築されており、独自の署名付き Node 24 ランタイムが同梱され、アプリ所有のOmniRouteインストールを管理するため、グローバル`node`/`bun`と競合することはありません。それ**既存の`~/.omniroute/`構成とデータベースを共有します**— つまり、帽子をかぶっているだけで、すでに実行しているのと同じOmniRouteです。 🎩

<table>
  <tr><th align="left">内容</th><th align="left">方法</tr></th>
  <tr><td align="left" nowrap>🟢 <b>サーバーを監視します</b></td><td align="left"><code>オムニルート サーブ</code>を生成し、複製する代わりにすでに実行中のインスタンスを採用します</td></tr>
  <tr><td align="left" nowrap>📊 <b>一目でわかるライブ使用量</b></td><td align="left">プロバイダー クォータ バー、リセット カウントダウン付きのClaude session/weekly制限、30 日間のコストの内訳</td></tr>
  <tr><td align="left" nowrap>🔄 <b>自動更新を導入</b></td><td align="left">段階的インストール、アトミックスワップ、失敗時のロールバック — 常に最新リリース</td></tr>
  <tr><td align="left" nowrap>🚀 <b>ログイン時に開始</b></td><td align="left">ログイン時にオプションで起動します。トレイのみ、ドックアイコンなし</td></tr>
  <tr><td align="left" nowrap>🩺 <b> Doctor &amp;ログ</b></td><td align="left">ワンクリック診断とサーバー ログ アクセス</td></tr>
</table>

```sh
brew install --cask zoispag/tap/omniroute-tray
```

<sub>ダウンロードをご希望ですか?最新の<code>.dmg </code>を次の場所から取得します。
<a href="https://github.com/zoispag/omniroute-tray/releases"></a>をリリースします。ソース、問題、ビルド
ドキュメントは<a href="https://github.com/zoispag/omniroute-tray">zoispag/omniroute-tray</a>にあります。
<br/>💛 <a href="https://github.com/zoispag">@zoispag </a>によるコミュニティ プロジェクト — 公式のOmniRouteリリースではありません。</sub>

<br/>

<div align="center">

## 🔒 プライベート＆ローカルファースト

</div>

<img src="./docs/diagrams/privacy-local.svg" width="100%" alt="プライベートかつローカルファースト — OmniRoute のゲートウェイとコントロールプレーンは、お使いのマシン上で動作します。プロンプトはリクエストごとに選択されたアップストリームプロバイダーへ送信されます。OmniRoute がホストするプロンプト処理の中継地点はなく、テレメトリはデフォルトで無効です。認証情報は保存時に AES-256-GCM で暗号化されます。セキュリティ制御には、API キーのスコープ設定、IP フィルタリング、レート制限、プロンプトインジェクション対策、アップストリームヘッダーの除去、オプトイン方式の PII 編集、サニタイズされたエラー、ローカル SQLite 監査証跡が含まれます。OmniRoute は MIT ライセンスで提供され、セルフホストできます。"/>

<sub>📖 [認可](docs/architecture/AUTHZ_GUIDE.md) · [ガードレール](docs/security/GUARDRAILS.md) · [コンプライアンス](docs/security/COMPLIANCE.md)</sub>

<br/>

<div align="center">

## 🔌 完全な CLI + A2A & MCP

</div>

> サーバーだけではありません。OmniRoute は **80 以上のコマンド**を備えた**本格的なコマンドライン・コックピット**であり、オープンなエージェントプロトコルにより、AI エージェントが**自律的に**操作できます。

### ⌨️ 本格的な CLI（単なる `start` ではありません）

```bash
omniroute               # ゲートウェイ + ダッシュボードを起動（ポート 20128）
omniroute chat          # 対話型 TUI チャットクライアント（スラッシュコマンド: /model /combo /skill /memory）
omniroute setup         # ガイド付き初回セットアップウィザード
omniroute doctor        # プロバイダー、ポート、ネイティブ依存関係を診断
```

### 🛰️ リモートモード — CLI はここで、OmniRoute は VPS 上で実行

OmniRoute をサーバー上で運用していますか？**同じ CLI** を使ってノート PC から操作できます。スコープ付きアクセストークンで一度ログインすれば、
以降のすべてのコマンドはリモートを対象に実行されます。

```bash
omniroute connect 192.168.0.15            # パスワード → スコープ付きトークン。コンテキストとして保存
omniroute models                         # ← リモートサーバーに対して実行
omniroute configure codex                 # ← リモートモデルを選択し、ローカルの Codex プロファイルに書き込み
omniroute tokens create --name ci --scope read   # 他のマシン向けに、より限定的なトークンを発行
omniroute contexts use default            # ← ローカルサーバーに切り替え
```

トークンのスコープは `read` / `write` / `admin`。プロセスを起動するルートはループバックからのみアクセスできます。
<sub>📖 [リモートモード](docs/guides/REMOTE-MODE.md)</sub>

<div align="left">

<img src="./docs/diagrams/cli-terminal.svg" width="50%" alt="OmniRoute CLI のデモを行うアニメーション付きターミナル — omniroute providers list、omniroute combo list、omniroute health — 89 コマンドからなるトップレベル機能を順に表示: providers · oauth · keys · combo · nodes · models · cache · compression · cost · usage · quota · health · resilience · telemetry · logs · audit · mcp · a2a · cloud · memory · skills · eval · tunnel · backup · sync · webhooks · policy · pricing · translator · simulate …"/>

</div>

### 🤝 エージェントを接続すれば、OmniRoute 自体を操作できます

**MCP**、**A2A**、**REST API**、**webhooks**、または**リモート CLI** 経由で OmniRoute を公開すると、対応する任意のエージェント（または独自のコード）が、ルーティング、プロバイダー、コンボ、キャッシュ、圧縮、メモリなど、ゲートウェイ全体を自律的に操作できるようになります。以下の HTTP エンドポイントは `http://localhost:20128` 配下で提供されます。

<table>
  <tr><th align="left">インターフェース</th><th align="left">エンドポイント / コマンド</th><th align="left">用途</th></tr>
  <tr><td align="left" nowrap>🧰 <b>MCP (stdio)</b></td><td align="left" nowrap><code>omniroute --mcp</code></td><td align="left">Claude Desktop、Cursor、任意の MCP クライアントに接続</td></tr>
  <tr><td align="left" nowrap>🌊 <b>MCP (HTTP)</b></td><td align="left" nowrap><code>/api/mcp/stream</code></td><td align="left">リモート MCP — <b>110 個のツール</b>、33 個のスコープ（適用はオプトイン）、完全な監査証跡</td></tr>
  <tr><td align="left" nowrap>📡 <b>MCP (SSE)</b></td><td align="left" nowrap><code>/api/mcp/sse</code></td><td align="left">ストリーミング MCP トランスポート</td></tr>
  <tr><td align="left" nowrap>🤝 <b>A2A</b></td><td align="left" nowrap><code>/.well-known/agent.json</code></td><td align="left">エージェント間通信、<b>JSON-RPC 2.0</b> + SSE、6 個のスキル</td></tr>
  <tr><td align="left" nowrap>🌐 <b>REST API</b></td><td align="left" nowrap><code>/v1/*</code></td><td align="left">OpenAI 互換 — チャット、埋め込み、画像、音声、OCR</td></tr>
  <tr><td align="left" nowrap>🔔 <b>Webhooks</b></td><td align="left" nowrap><code>/api/webhooks</code></td><td align="left">リクエスト / クォータイベントを Slack、Discord、Telegram、または任意の URL にプッシュ</td></tr>
  <tr><td align="left" nowrap>🛰️ <b>リモート CLI</b></td><td align="left" nowrap><code>omniroute connect <host></code></td><td align="left">スコープ付きアクセストークンを使用してリモートインスタンスを操作</td></tr>
</table>

```bash
# MCP 経由で Claude Code に OmniRoute の全ツールセットを提供:
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

<sub>📖 [MCP サーバー](docs/frameworks/MCP-SERVER.md) · [A2A サーバー](docs/frameworks/A2A-SERVER.md) · [エージェントプロトコル](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md)</sub>

<br/>

<div align="center">

## 🗜️ トークンを自動で15～95%削減

</div>

### 📖 仕組み — パイプライン、アーキテクチャ、削減率の計算

<img src="./docs/diagrams/compression-pipeline.svg" width="100%" alt="OmniRouteの圧縮パイプライン：10,000トークンのクライアントリクエストが、Session-Dedup、CCR、Lite、RTK、Responses Tool Output、Headroom、Relevance、Caveman、Aggressive、LLMLingua-2、Ultra、OmniGlyphという12個の組み合わせ可能なエンジンを通過し、記載された積み重ねの例では約1,080トークンでプロバイダーに到達できます。構造化コンテンツは保持ガードと各ステップの忠実度ゲートによって保護されます。明示的に指定したロッシーまたは実験的なモードでは、対象となるコンテンツが変換される場合があります。"/>

デフォルトの積み重ねコンボは `RTK → Caveman` を実行します。両方が同じツール／コンテキストのペイロードに作用すると、削減効果は累積します。

```txt
combined = 1 − (1 − RTK) × (1 − Caveman_input)
average  = 1 − (1 − 0.80) × (1 − 0.46) = 89.2%
range    = 78.4 – 94.6%
```

コードブロック、URL、JSON、構造化データは、**常に**保持エンジンによって保護されます。

> **少ないトークンで済むのに、なぜ多くのトークンを使うのでしょうか？** すべてのリクエストは **透過的に** OmniRouteの圧縮パイプラインを通過します — クライアントの変更は不要です。現在は、順番に実行され、ルーティングコンボごとに自由に組み合わせられる **12個の組み合わせ可能なエンジンのスタック**となっています。[RTK](https://github.com/rtk-ai/rtk)、[Caveman](https://github.com/JuliusBrussee/caveman)（⭐ 90K+）、[LLMLingua-2](https://github.com/microsoft/LLMLingua)、[Troglodita](https://github.com/leninejunior/troglodita)（PT-BR）のアイデアを基盤としています。

### 🧱 12エンジンのスタック

エンジンはパイプラインの順序で実行され、それぞれをコンボごとに個別に有効化／無効化および設定できます。

<table>
  <tr><th align="center">#</th><th align="left">エンジン</th><th align="left">機能</th></tr>
  <tr><td align="center" nowrap>1</td><td align="left" nowrap><b>Session-Dedup</b></td><td align="left">ターン間で繰り返されるコンテンツを削除（コンテンツアドレス指定、ターン横断）</td></tr>
  <tr><td align="center" nowrap>2</td><td align="left" nowrap><b>CCR</b></td><td align="left">大きなブロックを取得マーカーの背後にアーカイブし、必要に応じて取得</td></tr>
  <tr><td align="center" nowrap>3</td><td align="left" nowrap><b>Lite</b></td><td align="left">空白文字と画像URLをトリミング（低レイテンシのベースライン）</td></tr>
  <tr><td align="center" nowrap>4</td><td align="left" nowrap><b>RTK</b></td><td align="left">スマートなツール結果のフィルタリング、重複排除、切り詰め（コマンド対応）</td></tr>
  <tr><td align="center" nowrap>5</td><td align="left" nowrap><b>Responses Tool Output</b></td><td align="left">シェル／パッチ／検索／ビルド出力向けのロスレス優先JSONと、範囲を制限した診断圧縮（Responses API）</td></tr>
  <tr><td align="center" nowrap>6</td><td align="left" nowrap><b>Headroom</b></td><td align="left">ベンダー提供の<b>GCF</b>コーデックによる、JSON配列のロスレス表形式コンパクション（約30%）</td></tr>
  <tr><td align="center" nowrap>7</td><td align="left" nowrap><b>Relevance</b></td><td align="left">直近のユーザークエリに対する抽出型の文スコアリング</td></tr>
  <tr><td align="center" nowrap>8</td><td align="left" nowrap><b>Caveman</b></td><td align="left">ルールベースの散文圧縮（出力で約65～75%）</td></tr>
  <tr><td align="center" nowrap>9</td><td align="left" nowrap><b>Aggressive</b></td><td align="left">古いターンの要約と段階的な劣化</td></tr>
  <tr><td align="center" nowrap>10</td><td align="left" nowrap><b>LLMLingua-2</b></td><td align="left">MobileBERT ONNXによるMLセマンティックプルーニング — コードセーフ、非同期</td></tr>
  <tr><td align="center" nowrap>11</td><td align="left" nowrap><b>Ultra</b></td><td align="left">オプションの小規模モデル（SLM）層を備えたヒューリスティックなトークンプルーニング</td></tr>
  <tr><td align="center" nowrap>12</td><td align="left" nowrap><b>OmniGlyph</b></td><td align="left">Anthropicの直接ワイヤー上で測定されたClaude Fable 5向けの、実験的なコンテキスト画像エンコーディング。GPT 5.6のトランスフォーマーは、プロバイダーの受領確認が得られるまでフェイルクローズドのままです。4つの圧縮プロファイル（aggressiveがデフォルト、balanced、coding-safe、passthrough）（最も積極的；オプトイン）</td></tr>
</table>

コードブロック、URL、構造化データは、**常に**バイト単位で完全に保持されます。**ワンクリックプリセット**でエンジンを組み合わせられます。

<table>
  <tr><th align="left">モード</th><th align="left">削減率</th><th align="left">最適な用途</th></tr>
  <tr><td align="left" nowrap>🪶 <b>Lite</b></td><td align="left" nowrap>約15%</td><td align="left">常時有効にできる安全なデフォルト</td></tr>
  <tr><td align="left" nowrap>🪨 <b>Standard (Caveman)</b></td><td align="left" nowrap>約30%</td><td align="left">日常的なコーディング</td></tr>
  <tr><td align="left" nowrap>⚡ <b>Aggressive</b></td><td align="left" nowrap>約50%</td><td align="left">ツールを多用する長時間のセッション</td></tr>
  <tr><td align="left" nowrap>🔥 <b>Ultra</b></td><td align="left" nowrap>約75%</td><td align="left">最大限の削減</td></tr>
  <tr><td align="left" nowrap>🧰 <b>RTK</b></td><td align="left" nowrap>60～90%</td><td align="left">シェル／テスト／ビルド／gitの出力</td></tr>
  <tr><td align="left" nowrap>🔗 <b>Stacked (RTK → Caveman)</b></td><td align="left" nowrap><b>78～95%</b></td><td align="left">さまざまなプロンプトとツールログ</td></tr>
</table>

**実例 — Standardモード：**

> **Before（69トークン）：** _"Reactコンポーネントが再レンダリングされる理由は、各レンダリングサイクルで新しいオブジェクト参照を作成しているためである可能性が高いです。インラインオブジェクトをプロップとして渡すと、Reactの浅い比較では毎回異なるオブジェクトとして認識されるため、再レンダリングが発生します。オブジェクトをメモ化するためにuseMemoを使用することをお勧めします。"_
>
> **After（19トークン）：** _"各レンダリングで新しいオブジェクト参照。インラインオブジェクトのプロップ = 新しい参照 = 再レンダリング。useMemoでラップ。"_
>
> **同じ回答。トークンを72%削減。精度の低下はゼロ。** ✅

**PT-BRの例 — [Troglodita](https://github.com/leninejunior/troglodita)モード：**

> **前（42トークン）：** _「問題は、レンダリングサイクルごとに新しいオブジェクト参照が作成されるため、コンポーネントが再レンダリングされていることです。`useMemo` の使用をお勧めします。」_
>
> **後（12トークン）：** _「再レンダリング：各サイクルで新しい参照（インラインオブジェクトが再作成）。`useMemo` を使用。」_
>
> **同じ回答。約70%少ないトークン数。技術的な正確性はそのまま。** ✅

<br/>

### 🎚️ エンジンの先へ — 出力スタイル、適応型ダイヤル、リクエスト単位の制御

上記の12個のエンジンは、**入力される**内容を縮小します。さらに3つのレイヤーが、**どのように**、**いつ**、そして何が**出力されるか**を形作ります。

- **🪄 出力スタイル** _(出力軸の調整)_ — 決定論的でキャッシュに安全なレスポンス整形指示を注入します。組み合わせ可能で、それぞれ `lite` / `full` / `ultra` の強度を指定できます。スタイルの追加は、レジストリに1行追加するだけです。
  - **簡潔な文章** — 冗長な語句・冠詞・曖昧な表現を削除し、技術的な内容の正確さを維持します。
  - **コードを減らす** — 「怠惰なシニア開発者」のYAGNI：動作する最小限の変更を行い、要求されていない足場コードは追加しません。
  - **ポニーテール（怠惰なシニア開発者）** — YAGNIの段階を進み、根本原因を修正し、動作する最小限の差分にします。
  - **ADHDがあります（アクション優先）** — 次のアクションを先頭に置き、手順に番号を付け、具体的な次のステップを1つ示し、前置きを入れません。
  - **簡潔なCJK（文言）** — 古典中国語による超簡潔なスタイル（ロケールが `zh` の場合のみ有効）。
- **🎯 適応型コンテキスト予算** _(ダイヤル)_ — 1つのオン／オフ式トークンしきい値を使う代わりに、モデルのコンテキストウィンドウに**収まる**ために必要な範囲で、最も低コストで情報損失の少ないエンジンを段階的に適用します。ポリシー：`reserve-output`（デフォルト、モデル対応） · `percentage` · `absolute`。モード：`floor`（収まることを保証） · `replace-autotrigger`（明示的な選択を優先） · `off`（従来のしきい値）。
- **🎛️ 圧縮の決定場所** _(優先順位、高 → 低)_ — リクエスト単位の `x-omniroute-compression` ヘッダー › ルーティングコンボの上書き › アクティブな名前付きプロファイル › 適応型 / 自動トリガー › パネルのデフォルト › 無効。適用されたプランは、`X-OmniRoute-Compression: <mode>; source=<source>` レスポンスヘッダーに返されます。

トークンしきい値による自動トリガー、適応型ダイヤルの有効化、名前付きプロファイルの固定、リクエスト単位の一時設定、ルーティングコンボごとのパイプライン割り当てなど、ワークロードに合った方法を選べます。オプトイン方式のオフライン **評価ハーネス**（`npm run eval:compression`）では、変更を昇格させる前に、固定コーパスを使って忠実度と削減量を評価できます。

📖 [`COMPRESSION_GUIDE.md`](docs/compression/COMPRESSION_GUIDE.md) · [`RTK_COMPRESSION.md`](docs/compression/RTK_COMPRESSION.md) · [`COMPRESSION_ENGINES.md`](docs/compression/COMPRESSION_ENGINES.md)

<br/>

<div align="center">

# ⚡ クイックスタート

</div>

**1) インストールして実行**

```bash
npm install -g omniroute
omniroute
```

> 💡 `npm warn ERESOLVE` や peer dependency の警告が表示されますか？[問題ありません](docs/guides/TROUBLESHOOTING.md#npm-install-warnings-eresolve--peer--deprecated)。
> **npm 11以降を使用していますか？** npmは、許可されていないパッケージのライフサイクルスクリプトをブロックする場合があります。OmniRouteの `postinstall`（`node scripts/build/postinstall.mjs`）は、ネイティブランタイムファイルの準備に必要です。グローバルインストール時に、npmの警告に表示されたパッケージ名を許可してください。OmniRoute 3.8.54で報告されるパッケージセットの場合：
>
> ```bash
> npm install -g --allow-scripts=omniroute,keytar,onnxruntime-node,@parcel/watcher,@swc/core,protobufjs,esbuild omniroute
> ```
>
> 今後のグローバルインストールでこの許可リストを再利用するには、一度設定してから通常どおりインストールします。
>
> ```bash
> npm config set allow-scripts=omniroute,keytar,onnxruntime-node,@parcel/watcher,@swc/core,protobufjs,esbuild --location=user
> npm install -g omniroute
> ```
>
> 依存関係の一覧はリリースごとに変わる場合があります。npmが異なる一覧を報告した場合は、その警告に表示されたパッケージ名を使用してください。パッケージを許可すると、そのインストールスクリプトの実行が許可されます。
> **Gemini Webまたは別のWeb Cookieプロバイダーを使用していますか？** npmパッケージには
> Playwrightは含まれていますが、Chromiumバイナリは含まれていません。最初のWebプロバイダーリクエストを行う前に、
> [Playwright Chromiumのセットアップ](docs/guides/TROUBLESHOOTING.md#gemini-web-and-playwright-chromium)
> の注意事項を確認してください。

ダッシュボードは `http://localhost:20128`、APIは `http://localhost:20128/v1` です。

**2) 自分のアカウントで利用資格のあるプロバイダーに接続**

ダッシュボード → **プロバイダー** → 現在の利用規約とクォータが用途に合うプロバイダーを選択 → APIキーを追加するか、アカウントの手続きを完了します。無料プランでは、サインアップ、承認、または支払い方法の登録が必要になる場合があります。[無料プランガイド](docs/getting-started/FREE-TIERS-GUIDE.md)を確認してください。キーなしで利用できるとは限らず、`tos: avoid` とマークされたプロバイダーはデフォルトで `auto` から除外されます。

**3) コーディングツールを指定**

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Dashboard → Endpoints]
Model:    auto            (routes among eligible connections — or choose provider/model)
```

**4) 動作を確認**

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

接続されているモデルの一覧が表示されます。🎉 これで完了です。コーディングを始めれば、OmniRouteが自動的にルーティングとフォールバックを行います。

クライアントがカスタムヘッダーを送信できない場合、OmniRouteはトークン化された互換エイリアスも提供します。

```txt
OpenAI catalog:   http://localhost:20128/vscode/YOUR_KEY/
OpenAI models:    http://localhost:20128/vscode/YOUR_KEY/models
OpenAI chat:      http://localhost:20128/vscode/YOUR_KEY/chat/completions
OpenAI responses: http://localhost:20128/vscode/YOUR_KEY/responses
Ollama chat:      http://localhost:20128/vscode/YOUR_KEY/api/chat
Ollama tags:      http://localhost:20128/vscode/YOUR_KEY/api/tags
```

これらは `Authorization: Bearer ...` を付加できないクライアントでのみ使用してください。ヘッダー認証が引き続き推奨される方式です。

<br/>

## 📦 その他のインストール方法 — Docker、ソース、pnpm、Arch

**🐳 Docker**

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

`:latest` は、**公開済み**の安定版 SemVer のうち最も高いバージョンを指します。git の `main` は追跡しません。GitOps では `:X.Y.Z` に固定してください。[Docker リリースチャンネル](docs/guides/DOCKER_GUIDE.md#release-channels)を参照してください。このイメージでは **`OMNIROUTE_MEMORY_MB=1024`** に固定されています。これはダッシュボードと軽量なチャットには十分です。**コーディングエージェント**（Claude Code、Codex、Grok などからの `POST /v1/responses`）には、はるかに大きな V8 ヒープが必要です。そうでない場合、2 つの長いコンテキストが重複すると約 12 GiB でプロセスが `FATAL ERROR` になります。ネイティブバッファは V8 の外部に配置されるため、コンテナのサイズはヒープより大きく設定してください。

| ワークロード                               | ヒープ（`-e OMNIROUTE_MEMORY_MB`） | コンテナ（`--memory`） |
| ------------------------------------------ | ---------------------------------- | ---------------------- |
| ダッシュボード／軽量なチャット             | `1024`（イメージのデフォルト）     | ≥2 g                   |
| 1 つのコーディングエージェント             | `8192`                             | ≥10 g                  |
| 2 つの長時間実行される同時 `/v1/responses` | `10240`–`12288`                    | ≥12–16 g               |

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

完全な表：[Docker ガイド — ランタイム RAM](docs/guides/DOCKER_GUIDE.md#runtime-ram-for-coding-agents)。

> **プレリリース Docker チャンネル：** `diegosouzapw/omniroute:next` と
> `diegosouzapw/omniroute:next-web` は、現在のデフォルトの `release/v*`
> ブランチを追跡します。これらの可変タグは、未リリースの修正をテストする目的にのみ使用するものであり、
> **本番環境ではサポートされません**。詳しくは
> [Docker リリースチャンネル](docs/guides/DOCKER_GUIDE.md#release-channels)を参照してください。

**🥟 Bun**

Bun ランタイムの検出により、標準の `bun install` とグローバルインストール（`bun install -g omniroute`）がサポートされています。

- **組み込みの `bun:sqlite`**：OmniRoute は Bun 上で実行されている場合、Bun 組み込みの `bun:sqlite` ドライバーを使用し、Node.js では `better-sqlite3` または `sql.js` にフォールバックします。
- **開発時の Webpack バンドラー自動選択**：開発環境（`bun run dev`）では Bun を自動的に検出し、ネイティブ V8 バインディングの非互換性を防ぐため、Turbopack を無効にして Webpack を使用します。本番ビルド（`bun run build`）では、Node とまったく同様に `OMNIROUTE_USE_TURBOPACK` に従います。デフォルトでは Turbopack を使用し、`OMNIROUTE_USE_TURBOPACK=0` を指定すると Webpack でビルドします（`Dockerfile.bun` では `--build-arg` として公開されています）。
- **専用の Bun Dockerfile**：ネイティブ Bun 本番デプロイ用のマルチステージ `Dockerfile.bun`（`docker build -f Dockerfile.bun -t omniroute:bun .`）。

```bash
# Bun でインストールして実行
bun install
bun run dev
```

**🛠️ ソースから**

```bash
cp .env.example .env && npm install
PORT=20128 npm run dev
```

**📦 pnpm**

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core && omniroute
```

**🐧 Arch Linux（AUR）**

```bash
yay -S omniroute-bin && systemctl --user enable --now omniroute.service
```

**🔧 Nix（Flake）**

```bash
# Nix flakes を使用
nix develop
npm run dev

# または devbox を使用
devbox run npm run dev
```

📖 [Docker ガイド](docs/guides/DOCKER_GUIDE.md) — Compose プロファイル、Caddy HTTPS、Cloudflare トンネル。

**🦭 Podman**

```bash
# 1. バインドマウントするデータディレクトリを準備
mkdir -p data

# 2. Linux + ローカルのルートレス Podman のみ（リモートの Podman Machine クライアントでは決して実行しないでください）：
podman unshare chown 1000:1000 ./data

# 3. ランタイムヒントを設定し、ローカルの Compose イメージをビルドして起動
echo "CONTAINER_HOST=podman" >> .env
podman compose --profile base up -d --build
```

macOS または Windows では、Podman はリモートの Podman Machine を使用します。`podman unshare` を省略し、
[トポロジー別のデータディレクトリに関するガイダンス](contrib/podman/README.md#data-directory-permissions-by-topology)に従ってください。

📖 [Podman ガイド](contrib/podman/README.md) — Compose ビルド、Podman Machine、および
Linux/systemd Quadlet のセットアップ。

**⚡ より高速／軽量なインストール（ネイティブビルドを省略）**

ネイティブ SQLite エンジン（`better-sqlite3`）は**オプション**の依存関係であるため、グローバル
インストールがソースからのコンパイルでブロックされることはありません。プラットフォーム／Node に適合する
ビルド済みバイナリがある場合はそれを使用し、ない場合は透過的に純粋な JS エンジン
（Node 22+ では `node:sqlite`、それ以外では同梱の `sql.js` WASM）にフォールバックします。ビルドツールは不要です。

インストール後のネイティブウォームアップを完全に省略するには（CI、ヘッドレス環境、または低速なマシン）：

```bash
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute   # CI=1 でも省略されます
```

最速でインストールするには、**pnpm**（コンテンツアドレス方式のストア + ハードリンク — 上記参照）を推奨します。
ダッシュボードを使用しないヘッドレスランタイムには、Docker の `base` プロファイル（上記）または
[Termux ガイド](docs/guides/TERMUX_GUIDE.md)を使用してください。CLI と Web ダッシュボードは同じプロセスから
1 つのポートで提供されるため、現時点では CLI 専用パッケージはありません。

<br/>

<div align="center">

# 🎬 OmniRoute の動作デモ

</div>

## 📹 動画ガイド

<div align="center">

<sub>2026-10-18 時点のダッシュボードのスナップショット · 未加工カタログ: YT 1.352 | TT 334 | IG 290 · 鮮度（日数）: YT 5 | TT 48 | IG 49</sub>

<table>
  <tr>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Da8ZthUPK98/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nick_saraev&font=montserrat&bold=true" alt="Instagram Reel — nick_saraev" width="300"/>
      </a><br/>
      <b>🎬 #1 — Instagram</b><br/>
      <sub>nick_saraev — 3,042,474 回視聴</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Dbp7wv_CIO0/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nnapier7&font=montserrat&bold=true" alt="Instagram Reel — nnapier7" width="300"/>
      </a><br/>
      <b>🎬 #2 — Instagram</b><br/>
      <sub>nnapier7 — 1,454,535 回視聴</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.youtube.com/watch?v=NJ0TQ-pyMDY">
        <img src="https://img.youtube.com/vi/NJ0TQ-pyMDY/maxresdefault.jpg" alt="YouTube — Amidia AI & Tech" width="300"/>
      </a><br/>
      <b>🎬 #3 — YouTube</b><br/>
      <sub>Amidia AI & Tech — 794,974 回視聴</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/DaSs65mMrHk/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+theopenstack&font=montserrat&bold=true" alt="Instagram Reel — theopenstack" width="300"/>
      </a><br/>
      <b>🎬 #4 — Instagram</b><br/>
      <sub>theopenstack — 692,419 回視聴</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.tiktok.com/@migue.baena/video/7670919268216622358">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=TikTok+%7C+migue.baena&font=montserrat&bold=true" alt="TikTok — migue.baena" width="300"/>
      </a><br/>
      <b>🎬 #5 — TikTok</b><br/>
      <sub>migue.baena — 685,788 回視聴</sub>
    </td>
  </tr>
</table>

</div>

**総合ランキング（重複を除外した正規 URL、`v > 0`、リーチの多い順）:**

| #1                                                                                     | #2                                                                                  | #3                                                                                      | #4                                                                                    | #5                                                                                                  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [nick_saraev — Instagram](https://www.instagram.com/reel/Da8ZthUPK98/) — **3,042,474** | [nnapier7 — Instagram](https://www.instagram.com/reel/Dbp7wv_CIO0/) — **1,454,535** | [Amidia AI & Tech — YouTube](https://www.youtube.com/watch?v=NJ0TQ-pyMDY) — **794,974** | [theopenstack — Instagram](https://www.instagram.com/reel/DaSs65mMrHk/) — **692,419** | [migue.baena — TikTok](https://www.tiktok.com/@migue.baena/video/7670919268216622358) — **685,788** |

| #6                                                                                                      | #7                                                                                                  | #8                                                                                     | #9                                                                                        | #10                                                                                 |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [milesreevesai — TikTok](https://www.tiktok.com/@milesreevesai/video/7667980059189366019) — **620,400** | [nikothetech — TikTok](https://www.tiktok.com/@nikothetech/video/7671890769665477918) — **610,803** | [Vaibhav Sisinty — YouTube](https://www.youtube.com/watch?v=QucgvbO5gsM) — **509,281** | [buildwithai.club — Instagram](https://www.instagram.com/reel/DbIt9AjK7-U/) — **347,652** | [nivedan.ai — Instagram](https://www.instagram.com/reel/DbIrCksJiqq/) — **331,973** |

2026-10-18 時点の正規指標: **1.976 件のユニーク動画** · **20.220.289 回の既知の視聴数**（`v > 0`）· **ネットワーク別のチャンネル／プロフィール数 1.210 件**。未加工のダッシュボードには 1.976 行（YouTube 1.352 = 長尺動画 740 + Shorts 612 · TikTok 334 · Instagram 290）が含まれています。正規 URL による正規化後、重複は残っておらず、動画ごとに最大の視聴回数が保持されています。YouTube のデータ収集は 2026-10-13 以降停止しており（14/10～18/10 に API クォータを使い切ったため）、TikTok／Instagram は 2026-09-02 以降停止しています（収集クレジットがないため）。76 件の動画には、まだ視聴回数がありません。

> 🎬 **OmniRoute についての動画を作成しましたか？** リンクを添えて [issue](https://github.com/diegosouzapw/OmniRoute/issues/new) または [discussion](https://github.com/diegosouzapw/OmniRoute/discussions) を作成してください。こちらで紹介します。

<br/>

<div align="center">

# 📧 コミュニティとヘルプ

> すべてを一か所にまとめています — メンテナーをフォローしたり、コミュニティとチャットしたり、issue を作成したりできます。

| チャンネル                                     | 場所 / 方法                                                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 💼 **LinkedIn** — メンテナーをフォロー         | [linkedin.com/in/diegosouzapw](https://www.linkedin.com/in/diegosouzapw/)                                                    |
| 🐙 **GitHub** — リリース情報やヒントをフォロー | [@diegosouzapw](https://github.com/diegosouzapw)                                                                             |
| 💬 **Discord**                                 | [discord.gg/U47eFqAXCn](https://discord.gg/U47eFqAXCn)                                                                       |
| ✈️ **Telegram**                                | [t.me/omnirouteOficial](https://t.me/omnirouteOficial)                                                                       |
| 🟢 **WhatsApp — 🌍 グローバル**                | [グループに参加](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)                                            |
| 🟢 **WhatsApp — 🇧🇷 ブラジル**                  | [グループに参加](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)                                            |
| 🌍 **ウェブサイト**                            | [omniroute.online](https://omniroute.online)                                                                                 |
| 🌍 **🌍StHub OmniRoute コミュニティ（無料）**  | [StHubポータル](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)                       |
| 📦 **ソースコード**                            | [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)                                               |
| 🐛 **バグを報告**                              | [Issueを作成](https://github.com/diegosouzapw/OmniRoute/issues) — `npm run system-info` の出力を添付してください             |
| 🤝 **コントリビュート**                        | [CONTRIBUTING.md](CONTRIBUTING.md) · [ブランチおよびリリースモデル](docs/ops/BRANCHING_MODEL.md) · `good first issue` を選択 |
| 💚 **プロジェクトを支援**                      | [支援方法 ↑](#-support-omniroute) · [GitHub Sponsors](https://github.com/sponsors/diegosouzapw)                              |

</div>

---

<br/>
<div align="center">

## 🛠️ 技術スタック

</div>

<table>
  <tr><th align="left">層</th><th align="left">テクノロジー</th></tr>
  <tr><td nowrap><b>ランタイム</b></td><td>Node.js 22.x / 24.x LTS — <code>&gt;=22.22.2 &lt;23 || &gt;=24.0.0 &lt;27</code></td></tr>
  <tr><td nowrap><b>言語</b></td><td>TypeScript 6.0 — <code>src/</code> と <code>open-sse/</code> 全体で <b>100% TypeScript</b>（v2.0 以降のコアに <code>any</code> はゼロ）</td></tr>
  <tr><td nowrap><b>フレームワーク</b></td><td>Next.js 16 + React 19 + Tailwind CSS 4</td></tr>
  <tr><td nowrap><b>データベース</b></td><td>better-sqlite3（SQLite、WAL ジャーナリング）+ LowDB（JSON レガシー）— 147 のドメインモジュール、229 のマイグレーション</td></tr>
  <tr><td nowrap><b>メモリ</b></td><td>SQLite FTS5 全文検索 + int8 量子化ベクトル埋め込み、型付き減衰</td></tr>
  <tr><td nowrap><b>スキーマ</b></td><td>Zod 4 — MCP ツールの I/O 検証 + API コントラクト</td></tr>
  <tr><td nowrap><b>プロトコル</b></td><td>MCP（stdio / HTTP / SSE）+ A2A v0.3（JSON-RPC 2.0 + SSE）</td></tr>
  <tr><td nowrap><b>ストリーミング</b></td><td>Server-Sent Events（SSE）+ WebSocket ブリッジ（<code>/v1/ws</code>）</td></tr>
  <tr><td nowrap><b>圧縮</b></td><td>12 エンジンのパイプライン — RTK、Caveman、LLMLingua-2（MobileBERT ONNX）、GCF、OmniGlyph</td></tr>
  <tr><td nowrap><b>認証とセキュリティ</b></td><td>OAuth 2.0（PKCE）+ JWT + API Keys + MCP スコープ認証 · 保存時 AES-256-GCM · DOMPurify</td></tr>
  <tr><td nowrap><b>ステルス</b></td><td>wreq-js — JA3 / JA4 TLS フィンガープリント偽装、3 段階プロキシ</td></tr>
  <tr><td nowrap><b>レジリエンス</b></td><td>サーキットブレーカー、指数バックオフ、サンダリングハード対策、自動コンボ自己修復</td></tr>
  <tr><td nowrap><b>ロギング</b></td><td>pino — リクエストコンテキスト付き構造化 JSON ログ</td></tr>
  <tr><td nowrap><b>テスト</b></td><td>Node.js テストランナー + Vitest — 8,400 以上の追跡対象テストファイル（単体、統合、E2E、セキュリティ、エコシステム）全体で <b>60,000 件以上の静的テスト宣言</b></td></tr>
  <tr><td nowrap><b>プラットフォーム</b></td><td>デスクトップ（Electron）· Android（Termux）· PWA（あらゆるブラウザ）</td></tr>
  <tr><td nowrap><b>CI/CD</b></td><td>GitHub Actions — リリース時に npm publish + Docker Hub へ自動公開</td></tr>
  <tr><td nowrap><b>リンク</b></td><td><a href="https://omniroute.online">ウェブサイト</a> · <a href="https://www.npmjs.com/package/omniroute">npm</a> · <a href="https://hub.docker.com/r/diegosouzapw/omniroute">Docker Hub</a></td></tr>
</table>

<div align="center">

<br/>

## 📖 ドキュメント

</div>

### 📘 はじめに

<table>
  <tr><th align="left">ドキュメント</th><th align="left">説明</th></tr>
  <tr><td nowrap><b><a href="docs/guides/USER_GUIDE.md">ユーザーガイド</a></b></td><td>プロバイダー、コンボ、CLI 統合、デプロイ</td></tr>
  <tr><td nowrap><b><a href="docs/guides/SETUP_GUIDE.md">セットアップガイド</a></b></td><td>完全なインストール方法、CLI ツール設定、プロトコルのセットアップ、タイムアウト調整</td></tr>
  <tr><td nowrap><b><a href="docs/reference/CLI-TOOLS.md">CLI ツールガイド</a></b></td><td>Claude Code、Codex、Cursor、Cline、OpenClaw、Kilo、Copilot のツールごとのセットアップ</td></tr>
  <tr><td nowrap><b><a href="docs/guides/REMOTE-MODE.md">リモートモード</a></b></td><td>スコープ付きアクセストークンを使用して、ノート PC の CLI からリモート OmniRoute（VPS）を操作</td></tr>
  <tr><td nowrap><b><a href="docs/guides/CLAUDE-CODE-CONFIGURATION.md">Claude Code 設定</a></b></td><td><code>launch</code> + モデルごとのプロファイルを使用して、Claude Code を OmniRoute（ローカル／リモート）に接続</td></tr>
  <tr><td nowrap><b><a href="README.md#-quick-start">クイックスタート</a></b></td><td>3 ステップでインストール → 接続 → 設定</td></tr>
</table>

### 🔧 運用とデプロイ

<table>
  <tr><th align="left">ドキュメント</th><th align="left">説明</th></tr>
  <tr><td nowrap><b><a href="docs/guides/DOCKER_GUIDE.md">Docker ガイド</a></b></td><td>Docker の実行、Compose プロファイル、Caddy HTTPS、トンネル、イメージタグ</td></tr>
  <tr><td nowrap><b><a href="contrib/podman/README.md">Podman ガイド</a></b></td><td>Quadlet の systemd 統合、podman-compose、SELinux</td></tr>
  <tr><td nowrap><b><a href="docs/ops/VM_DEPLOYMENT_GUIDE.md">VM デプロイ</a></b></td><td>完全ガイド：VM + nginx + Cloudflare のセットアップ</td></tr>
  <tr><td nowrap><b><a href="docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md">Fly.io デプロイ</a></b></td><td>永続ストレージを使用して Fly.io にデプロイ</td></tr>
  <tr><td nowrap><b><a href="docs/guides/TERMUX_GUIDE.md">Termux ガイド</a></b></td><td>Termux 経由で Android 上で OmniRoute を実行</td></tr>
  <tr><td nowrap><b><a href="docs/guides/PWA_GUIDE.md">PWA ガイド</a></b></td><td>Progressive Web App のインストール、キャッシュ、アーキテクチャ</td></tr>
  <tr><td nowrap><b><a href="docs/guides/UNINSTALL.md">アンインストールガイド</a></b></td><td>すべてのインストール方法に対応した完全な削除</td></tr>
  <tr><td nowrap><b><a href="docs/reference/ENVIRONMENT.md">環境設定</a></b></td><td><code>.env</code> の変数と参照の完全ガイド</td></tr>
</table>

### 🧠 機能とアーキテクチャ

<table>
  <tr><th align="left">ドキュメント</th><th align="left">説明</th></tr>
  <tr><td nowrap><b><a href="docs/architecture/ARCHITECTURE.md">アーキテクチャ</a></b></td><td>システムアーキテクチャ、データフロー、内部構造</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_GUIDE.md">圧縮ガイド</a></b></td><td>7 つのオプションによるパイプライン：off / lite / standard / aggressive / ultra / RTK / stacked</td></tr>
  <tr><td nowrap><b><a href="docs/compression/RTK_COMPRESSION.md">RTK 圧縮</a></b></td><td>コマンド出力の圧縮、フィルター、信頼、検証、未加工出力の復元</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_ENGINES.md">圧縮エンジン</a></b></td><td>Caveman、RTK、積層パイプライン、ダッシュボード／API／MCP の各インターフェース</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_RULES_FORMAT.md">圧縮ルール形式</a></b></td><td>Caveman および RTK フィルター用の JSON ルールパックのスキーマ</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_LANGUAGE_PACKS.md">圧縮言語パック</a></b></td><td>言語検出と Caveman ルールパックの作成</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/RESILIENCE_GUIDE.md">レジリエンスガイド</a></b></td><td>サーキットブレーカー、クールダウン、キュー、群集雪崩対策、TLS スプーフィング</td></tr>
  <tr><td nowrap><b><a href="docs/routing/AUTO-COMBO.md">自動コンボエンジン</a></b></td><td>16 要素のスコアリング、モードパック、自己修復</td></tr>
  <tr><td nowrap><b><a href="docs/ops/PROXY_GUIDE.md">プロキシガイド</a></b></td><td>3 レベルのプロキシシステム、1proxy マーケットプレイス、レジストリの CRUD</td></tr>
  <tr><td nowrap><b><a href="docs/reference/FREE_TIERS.md">無料ティア</a></b></td><td>統合ディレクトリ：文書化された継続利用可能なプール 34 件／カタログ化された無料ティア項目 465 件</td></tr>
  <tr><td nowrap><b><a href="docs/guides/FEATURES.md">機能ギャラリー</a></b></td><td>スクリーンショットで見るビジュアルダッシュボードツアー</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/CODEBASE_DOCUMENTATION.md">コードベースドキュメント</a></b></td><td>初心者向けのコードベース解説</td></tr>
</table>

### 🤖 プロトコルと API

<table>
  <tr><th align="left">ドキュメント</th><th align="left">説明</th></tr>
  <tr><td nowrap><b><a href="docs/reference/API_REFERENCE.md">API リファレンス</a></b></td><td>すべてのエンドポイントと使用例</td></tr>
  <tr><td nowrap><b><a href="docs/openapi.yaml">OpenAPI 仕様</a></b></td><td>OpenAPI 3.0 仕様</td></tr>
  <tr><td nowrap><b><a href="open-sse/mcp-server/README.md">MCP サーバー</a></b></td><td>110 個の MCP ツール、IDE 設定、Python／TS／Go クライアント</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/MCP-SERVER.md">MCP サーバーガイド</a></b></td><td>MCP のインストール、トランスポート、ツールリファレンス</td></tr>
  <tr><td nowrap><b><a href="src/lib/a2a/README.md">A2A サーバー</a></b></td><td>JSON-RPC 2.0 プロトコル、スキル、ストリーミング、タスク管理</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/A2A-SERVER.md">A2A サーバーガイド</a></b></td><td>A2A エージェントカード、タスク、スキル、ストリーミング</td></tr>
</table>

### 📋 プロジェクトと品質

<table>
  <tr><th align="left">ドキュメント</th><th align="left">説明</th></tr>
  <tr><td nowrap><b><a href="CONTRIBUTING.md">コントリビューション</a></b></td><td>開発環境のセットアップとガイドライン</td></tr>
  <tr><td nowrap><b><a href="docs/ops/BRANCHING_MODEL.md">ブランチおよびリリースモデル</a></b></td><td>PR の対象先（<code>release/*</code>）、<code>main</code> とタグの意味</td></tr>
  <tr><td nowrap><b><a href="CHANGELOG.md">変更履歴</a></b></td><td>バージョンごとの完全なリリース履歴</td></tr>
  <tr><td nowrap><b><a href="SECURITY.md">セキュリティポリシー</a></b></td><td>脆弱性の報告とセキュリティ対策</td></tr>
  <tr><td nowrap><b><a href="docs/guides/I18N.md">i18n ガイド</a></b></td><td>67 言語のサポート、翻訳ワークフロー、RTL</td></tr>
  <tr><td nowrap><b><a href="docs/ops/RELEASE_CHECKLIST.md">リリースチェックリスト</a></b></td><td>リリース前の検証手順</td></tr>
  <tr><td nowrap><b><a href="docs/ops/COVERAGE_PLAN.md">カバレッジ計画</a></b></td><td>8,400 以上の追跡対象テストファイルにまたがる 60,000 以上の静的テスト宣言に対するテストカバレッジ戦略</td></tr>
</table>

<br/>

<div align="center">

# ⭐ 主なコントリビューター

> OmniRoute は、情熱を持つオープンソースコミュニティによって形作られています。これらの個人は、プロジェクトの品質、安定性、到達範囲に直接影響する、卓越した貢献を行いました。**ありがとうございます。**

### マージされたプルリクエスト数による外部コントリビューター

<table>
  <tr><th align="center">順位</th><th align="left">コントリビューター</th><th align="center">マージされた PR</th><th align="right">~変更行数</th></tr>
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

<sub>2026-11-03 03:01:19 UTC に、ライブの <code>release/v3.8.53</code> の先端 <code>05bc048d6c</code> を対象として集計。ページ分割された GitHub GraphQL の集計には、マージされた PR が 9,947 件含まれています。その内訳は、リポジトリ所有者によるものが 4,130 件、Dependabot によるものが 240 件、その他のボット／アプリによるものが 6 件、そして<b>883 人の異なるコントリビューターによる外部 PR が 5,571 件</b>です。「変更行数」は GitHub の追加行数と削除行数を合計したもので、生成ファイル、ロックファイル、カタログ、翻訳、ドキュメントを含みます。これは変更量であり、作成者が記述した LOC ではありません。53 件の PR では GitHub の差分が 500,000 行を超えていると報告されています（たとえば #13399 では、単一のプロバイダー追加で 2,347 個の変更ファイルが記録されています）。そのため、上記のいくつかの合計値が膨らんでいます。同順位は同じ順位として扱います。</sub>

### GitHub に帰属するコミット

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/maxmad64bis">
        <img src="https://github.com/maxmad64bis.png" width="40" style="border-radius:50%" alt="Dizzle"/><br/>
        <b>Dizzle</b>
      </a><br/>
      <sub>🥇 GitHubに帰属するコミット 418件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/HouMinXi">
        <img src="https://github.com/HouMinXi.png" width="40" style="border-radius:50%" alt="Bob.Hou"/><br/>
        <b>Bob.Hou</b>
      </a><br/>
      <sub>🥈 GitHubに帰属するコミット 294件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/oyi77">
        <img src="https://github.com/oyi77.png" width="40" style="border-radius:50%" alt="Paijo"/><br/>
        <b>Paijo</b>
      </a><br/>
      <sub>🥉 GitHubに帰属するコミット 229件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png" width="40" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 222件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/backryun">
        <img src="https://github.com/backryun.png" width="40" style="border-radius:50%" alt="backryun"/><br/>
        <b>backryun</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 202件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/JxnLexn">
        <img src="https://github.com/JxnLexn.png" width="40" style="border-radius:50%" alt="Jan Leon"/><br/>
        <b>Jan Leon</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 134件</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/RaviTharuma">
        <img src="https://github.com/RaviTharuma.png" width="40" style="border-radius:50%" alt="Ravi Tharuma"/><br/>
        <b>Ravi Tharuma</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 126件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/hartmark">
        <img src="https://github.com/hartmark.png" width="40" style="border-radius:50%" alt="Markus Hartung"/><br/>
        <b>Markus Hartung</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 115件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/rdself">
        <img src="https://github.com/rdself.png" width="40" style="border-radius:50%" alt="Randi"/><br/>
        <b>Randi</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 108件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/christopher-s">
        <img src="https://github.com/christopher-s.png" width="40" style="border-radius:50%" alt="Chris"/><br/>
        <b>Chris</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 70件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/jonlwheat2-gif">
        <img src="https://github.com/jonlwheat2-gif.png" width="40" style="border-radius:50%" alt="WebPerson"/><br/>
        <b>WebPerson</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 68件</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/KooshaPari">
        <img src="https://github.com/KooshaPari.png" width="40" style="border-radius:50%" alt="Koosha Paridehpour"/><br/>
        <b>Koosha Paridehpour</b>
      </a><br/>
      <sub>🏅 GitHubに帰属するコミット 68件</sub>
    </td>
  </tr>
</table>

<sub>2026-11-03 02:09:16 UTCに再確認：<code>release/v3.8.53</code>デフォルトブランチについて、リポジトリのContributors APIが報告したGitHubに帰属するコミットです。APIは903件のID（ユーザー429人、ボット2件、匿名472件）を返しました。この表ではメンテナー、ボット、匿名のIDを除外し、同順位を維持しています。上記のマージ済みPRランキングおよび下記のGitメタデータ集計とは異なるものです。</sub>

> 🙏 これらのコントリビューターによる機能、バグ修正、インフラストラクチャの改善は、OmniRouteの信頼性と豊富な機能を支える**中核的な要素**です。すべてのプルリクエスト、すべてのテストケース、そしてすべてのi18n翻訳ファイルが重要です。オープンソースは、彼らのような人々によって築かれています。

</div>

---

<br/>

## 💖 スポンサー

<div align="center">

私費で OmniRoute を支援してくださっている皆さまに、心より感謝いたします。皆さまからのご支援の一つひとつが、このプロジェクトを無料かつ独立した形で継続し、前進させる力になっています。

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/drewbitt">
        <img src="https://github.com/drewbitt.png?size=140" width="72" style="border-radius:50%" alt="Andrew"/><br/>
        <b>Andrew</b>
      </a><br/>
      <sub>💛 現在の月額スポンサー</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/psylligent">
        <img src="https://github.com/psylligent.png?size=140" width="72" style="border-radius:50%" alt="Vlad I"/><br/>
        <b>Vlad I</b>
      </a><br/>
      <sub>💛 現在の月額スポンサー</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/xiaoyaner0201">
        <img src="https://github.com/xiaoyaner0201.png?size=140" width="72" style="border-radius:50%" alt="小妍儿"/><br/>
        <b>小妍儿</b>
      </a><br/>
      <sub>💛 現在の月額スポンサー</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/Guilsc">
        <img src="https://github.com/Guilsc.png?size=140" width="72" style="border-radius:50%" alt="Guilherme Costa"/><br/>
        <b>Guilherme Costa</b>
      </a><br/>
      <sub>💛 現在の単発スポンサー</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/TheVingance">
        <img src="https://github.com/TheVingance.png?size=140" width="72" style="border-radius:50%" alt="Henrique Triches Iurkiv"/><br/>
        <b>Henrique Iurkiv</b>
      </a><br/>
      <sub>💛 現在の単発スポンサー</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/somesh-ghaturle">
        <img src="https://github.com/somesh-ghaturle.png?size=140" width="72" style="border-radius:50%" alt="Somesh Ghaturle"/><br/>
        <b>Somesh Ghaturle</b>
      </a><br/>
      <sub>💛 現在の単発スポンサー</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/Kolonie-AI">
        <img src="https://github.com/Kolonie-AI.png?size=140" width="72" style="border-radius:50%" alt="Kolonie AI"/><br/>
        <b>Kolonie AI</b>
      </a><br/>
      <sub>💛 過去の単発支援者</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/igormorais123">
        <img src="https://github.com/igormorais123.png?size=140" width="72" style="border-radius:50%" alt="Professor Igor Morais Vasconcelos"/><br/>
        <b>Prof. Igor Morais</b>
      </a><br/>
      <sub>💛 過去の単発支援者</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/PixmaNts">
        <img src="https://github.com/PixmaNts.png?size=140" width="72" style="border-radius:50%" alt="Pixma"/><br/>
        <b>Pixma</b>
      </a><br/>
      <sub>💛 過去の単発支援者</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png?size=140" width="72" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>💛 過去の単発支援者</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/longtao77">
        <img src="https://github.com/longtao77.png?size=140" width="72" style="border-radius:50%" alt="longtao"/><br/>
        <b>longtao</b>
      </a><br/>
      <sub>💛 過去の単発支援者</sub>
    </td>
  </tr>
</table>

<sub>…そして、匿名を希望されるその他の皆さまにも感謝いたします 💛</sub>

<sub>公開されている GitHub Sponsors の情報は、GitHub Sponsors GraphQL API を通じて 2026-10-18 に再検証済みです。合計 14 件のうち、公開スポンサーシップは 11 件（現在 6 件、過去 5 件）です。上記の現在のスポンサー区分は、GitHub の <code>isActive</code> ステータスに基づいています。過去に公開で単発支援してくださった方々も引き続き感謝の対象として掲載し、非公開スポンサーの方々は匿名のままとしています。Ko-fi、Buy Me a Coffee、Liberapay、PIX、および暗号資産による寄付は、公開スポンサー記録がないため掲載していません。</sub>

<b><a href="https://github.com/sponsors/diegosouzapw">💖 スポンサーになる →</a></b> — 皆さまからのご支援の一つひとつが、OmniRoute を無料かつ独立したプロジェクトとして維持する力になります。

</div>

<br/>

<div align="center">

## 👥 1,000人以上のコントリビューター

</div>

[![コントリビューター](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=1074&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

<sub>2026-11-02、ライブの <code>release/v3.8.53</code> の先端 <code>1c7135e0fb</code>（7,972コミット）で監査：<b>正規化された人間のGitアイデンティティ1,074件</b> — 759件はコミット作成者（メンテナーを含む）として表示され、315件は明示的な <code>Co-authored-by</code> トレーラーにのみ表示されます。この集計では <code>.mailmap</code> を適用し、メールアドレスを大文字と小文字を区別せずに比較し、数値形式と通常形式のGitHub noreplyアドレスについては同じハンドルを示す場合にのみ統合しています。また、ボット、エージェント、サービス、プレースホルダーのアイデンティティ29件を除外し、表示名が一致するという理由だけで通常のメールアドレスを統合することはありません。2026-08-24の監査では639件が公開されましたが、その監査のベース <code>ac02c5b42f</code> に対してこの方法を再実行すると619件となるため、増加は新しいコントリビューターによるものであり、方法を緩和した結果ではありません。</sub>

### 貢献方法

1. リポジトリをフォークする
2. **アクティブな** `release/vX.Y.Z` の先端（`main` ではありません）からブランチを作成する — [ブランチ分けとリリースモデル](docs/ops/BRANCHING_MODEL.md)を参照
3. フィーチャーブランチを作成する（`git checkout -b feat/amazing-feature`）
4. 変更をコミットする（`git commit -m 'feat: add amazing feature'`）
5. ブランチにプッシュする（`git push origin feat/amazing-feature`）
6. **base = その `release/vX.Y.Z` ブランチ**でプルリクエストを作成する

詳しいガイドラインについては、[CONTRIBUTING.md](CONTRIBUTING.md)を参照してください。

### 新しいバージョンのリリース

```bash
# リリースを作成 — npm publish は自動的に実行されます
VERSION=x.y.z
gh release create "v${VERSION}" --title "v${VERSION}" --generate-notes
```

<br/>

<div align="center">

## 📊 スター

<a href="https://www.star-history.com/?repos=diegosouzapw%2FOmniRoute&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&theme=dark&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <img alt="スター履歴チャート" src="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
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

## 🙏 謝辞

</div>

OmniRoute は、多くの先人たちの成果の上に成り立っています。**[9router](https://github.com/decolua/9router)** のフォークとして始まり、Go プロジェクト **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** の TypeScript ポートとして発展しました。そしてそこから、以下の各サブシステムは、それぞれ先に道を切り開いたオープンソースプロジェクトから着想を得ています。各プロジェクトが OmniRoute の具体的な一部分を形作りました。これらすべてに感謝を捧げます。🙏

> ⭐ スター数は 2026 年 11 月 3 日に GitHub REST API で確認済みです。ぜひこれらのプロジェクトにスターを付けてください。スター数は特定日時点の正確なスナップショットであり、今後自然に変動します。

### 🧬 系譜とゲートウェイ

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute への影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/decolua/9router">9router</a></b></td><td align="center">31,861</td><td>このフォークの基盤となった元のプロジェクトであり、ここではマルチモーダル API と完全な TypeScript 書き換えによって拡張されています。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/router-for-me/CLIProxyAPI">CLIProxyAPI</a></b></td><td align="center">57,329</td><td>この JavaScript / TypeScript ポートに着想を与えた Go 実装です。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/BerriAI/litellm">LiteLLM</a></b></td><td align="center">62,580</td><td>公開価格データセットがコスト追跡の同期に利用され、プロバイダー正規化モデルがルーティングの参考となった AI ゲートウェイです。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuuyy/codex-chatgpt-web">codex-chatgpt-web</a></b></td><td align="center">15,435</td><td>MIT ソースをベンダー提供の ChatGPT Web → Codex Responses ブリッジに適用しました。ブラウザーセッション、レスポンスフレーミング、使用量、Web 検索の各アダプターを含みます。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Alishahryar1/free-claude-code">free-claude-code</a></b></td><td align="center">65,966</td><td>ストリーム復旧、no-thinking エイリアス、フォールバック Web 検索、スライディングウィンドウ制限、ログの秘匿化、堅牢化されたランチャーフローにパターンを移植しました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/standardagents/composer-api">composer-api</a></b></td><td align="center">347</td><td>Cursor Composer のツール選択、出力制約、ツールコミットのパターンをネイティブ Cursor executor に適用しました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ndycode/codex-multi-auth">codex-multi-auth</a></b></td><td align="center">561</td><td>Codex OAuth の再認証に、新規ログインと refresh-token ローテーションのパターンを移植しました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ex-machina-co/opencode-anthropic-auth">opencode-anthropic-auth</a></b></td><td align="center">562</td><td>Claude Code 互換の変換デフォルトと課金ヘッダーの動作を、OmniRoute の設定駆動型ブリッジへと一般化しました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/520mmxx/grok2api-merged">grok2api-merged</a></b></td><td align="center">2</td><td>その Grok モデルマッピング、偽の TypeError Statsig ジェネレーター、リクエストおよびデバイスのデフォルト、NDJSON レスポンスプロセッサーを、OmniRoute の Grok Web executor に実質的に適用しました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/TQZHR/grok2api">TQZHR/grok2api</a></b></td><td align="center">707</td><td>grok2api-merged の背後にある主要な間接コードソースです。そのモデル、ヘッダー、ペイロード、Statsig、プロセッサーの実装は、Grok Web の系譜に保持されています。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/chenyme/grok2api">chenyme/grok2api</a></b></td><td align="center">7,874</td><td>Grok のペイロードとデバイスのデフォルト、Statsig ジェネレーター、および <code>result.response</code> プロセッサーの基盤となる MIT ソースであり、TQZHR と grok2api-merged を経由して引き継がれています。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuzhaii/grok2api-pro">grok2api-pro</a></b></td><td align="center">27</td><td>プロキシプール層について grok2api-merged が帰属先として挙げている間接的なソースです。OmniRoute はその系譜に関する注記を保持していますが、範囲を限定した Grok Web executor にプロキシプールを移植したとは主張していません。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/CNFlyCat/GrokProxy">GrokProxy</a></b></td><td align="center">52</td><td>Cookie 認証された Grok プロキシと <code>result.response.token</code> のストリーミングパターンが、OmniRoute の Grok Web トランスポートに影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lianying1716/GrokBridge">GrokBridge</a></b></td><td align="center">5</td><td>元の Grok Web 実装について、その HTTP / ブラウザー上流設計を参照しました。その直接 HTTP パスは GrokProxy に由来するため、独立したコード移植は主張していません。</td></tr>
</table>

### 🗜️ コンテキストとトークンの圧縮 — エンジン

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute に与えた影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/JuliusBrussee/caveman">Caveman</a></b></td><td align="center">116,957</td><td>話題となった「少ないトークンで足りるのに、なぜ多くのトークンを使うのか」プロジェクト。その原始人風の表現哲学が、標準圧縮モードと30以上の冗長表現除去／短縮ルールの基盤となっています。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/rtk-ai/rtk">RTK – Rust Token Killer</a></b></td><td align="center">85,350</td><td>高性能なコマンド出力圧縮。RTK エンジン、JSON フィルター DSL、生出力の復元、そして RTK → Caveman の多段パイプラインに着想を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/headroomlabs-ai/headroom">headroom</a></b></td><td align="center">78,672</td><td>可逆的なコンテキスト圧縮（SmartCrusher）。<code>headroom</code> エンジンと、<code>ccr</code> の取得マーカーパターンに着想を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/microsoft/LLMLingua">LLMLingua</a></b></td><td align="center">6,797</td><td>プロンプト圧縮の研究（LLMLingua / LLMLingua-2）。非同期でコードに安全かつフェイルオープンな <code>llmlingua</code> エンジンに着想を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atjsh/llmlingua-2-js">llmlingua-2-js</a></b></td><td align="center">33</td><td>LLMLingua エンジンのワーカースレッド用バックエンドとして使用している JS/ONNX ポート（MobileBERT / XLM-RoBERTa）です。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/leninejunior/troglodita">Troglodita</a></b></td><td align="center">50</td><td>ブラジルポルトガル語のトークン圧縮。ブラジルポルトガル語の文法に合わせて調整された冗語の削減と不要語の除去を行う、pt-BR 言語パックの基盤となっています。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/DietrichGebert/ponytail">ponytail</a></b></td><td align="center">182,929</td><td>話題となった「怠け者のシニア開発者」向け YAGNI コーディングスキル。_生成される_コードを削減する、動作する最小限の変更へ導く <b>less-code</b> 出力スタイルに着想を与えました（Caveman の簡潔な文章に対応する出力軸の兄弟機能です）。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ayghri/i-have-adhd">i-have-adhd</a></b></td><td align="center">59,838</td><td>行動を優先する ADHD フレンドリーな応答スタイルを、5言語に対応した OmniRoute の簡潔な出力スタイルへ適用しました。</td></tr>
</table>

### 🧩 コンパクト形式、トークン研究、コード対応ツール

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute に与えた影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/toon-format/toon">TOON</a></b></td><td align="center">25,602</td><td>Token-Oriented Object Notation。その列指向の「ヘッダー＋行」モデルが、表形式圧縮ステージの設計に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf">GCF – Graph Compact Format</a></b></td><td align="center">61</td><td>コンパクトなグラフ形式と汎用プロファイル設計が、OmniRoute の表形式圧縮と Headroom コーデック形式の参考になりました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf-typescript">gcf-typescript</a></b></td><td align="center">4</td><td>Headroom の汎用プロファイルコーデックとして直接ベンダリングし、拡張した MIT ライセンスの TypeScript 実装です。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ooples/token-optimizer-mcp">token-optimizer-mcp</a></b></td><td align="center">566</td><td>Brotli/SQLite キャッシュとセッション単位のコンテキスト差分。<code>session-dedup</code> エンジンに着想を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Mibayy/token-savior">token-savior</a></b></td><td align="center">1,203</td><td>Bash 出力の圧縮と MCP プロファイル。圧縮を中止する判断基準と、MCP ツールマニフェストの削減に着想を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ppgranger/token-saver">token-saver</a></b></td><td align="center">162</td><td>コンテンツを考慮したファイル形式別の出力圧縮と、失敗を考慮した中止処理。形式別の振り分けと、最小削減量に満たない場合のスキップが妥当であることを裏付けました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/alexgreensh/token-optimizer">token-optimizer</a></b></td><td align="center">2,853</td><td>「見えないトークンを見つける」という発想。そのオフロードと復元可能なハンドルのパターンが、CCR のオフロード設計の参考になりました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Shweta-Mishra-ai/tokenmizer">TokenMizer</a></b></td><td align="center">34</td><td>セッショングラフとターンをまたぐ行重複排除の設計例であり、session-dedup の設計に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jessefreitas/OmniCompress">OmniCompress</a></b></td><td align="center">3</td><td>Rust による列指向 JSON、コンテンツアドレス方式の取得、メッセージ間の重複排除。<code>headroom</code>/<code>ccr</code>/<code>session-dedup</code> エンジンの設計と、キャッシュの安定性を保証する「圧縮形式は位置に依存しない」という不変条件が妥当であることを裏付けました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atlassian-labs/mcp-compressor">mcp-compressor</a></b></td><td align="center">140</td><td>MCP ツールのスキーマ／説明の圧縮。MCP ツールマニフェストのカーディナリティ削減の参考になりました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/pdavis68/RepoMapper">RepoMapper</a></b></td><td align="center">218</td><td>Aider 形式のリポジトリマップランキング。リポジトリマップ／検索ランキングの検討に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/mrsimpson/quiet-shell-mcp">quiet-shell-mcp</a></b></td><td align="center">4</td><td>MCP を介した宣言的なシェル出力削減。宣言的な Bash 出力圧縮が妥当であることを裏付けました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/dsherret/ts-morph">ts-morph</a></b></td><td align="center">6,222</td><td>TypeScript Compiler API ツールキット。文字列、テンプレート、正規表現リテラルを保持する、パーサーベースのコメント除去に着想を与えました。</td></tr>
</table>

### 🧠 メモリと RAG

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute への影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/mem0ai/mem0">Mem0</a></b></td><td align="center">68,294</td><td>ユニバーサルメモリーレイヤー — プロキシを介した書き込み／読み取り境界モデルが、当社のメモリアーキテクチャの形成に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/letta-ai/letta">Letta (MemGPT)</a></b></td><td align="center">25,321</td><td>階層化メモリを備えたステートフルエージェント — Context Control & Recovery (CCR) の階層モデルに影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/onestardao/WFGY">WFGY</a></b></td><td align="center">1,804</td><td>繰り返し発生する RAG/LLM の16の障害モードを分類した ProblemMap タクソノミー — トラブルシューティングガイドで使用する共通語彙の基盤となりました。</td></tr>
</table>

### 🛰️ トラフィック検査、MITM、透過プロキシ

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute への影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/chouzz/llm-interceptor">llm-interceptor</a></b></td><td align="center">81</td><td>コーディングアシスタントと LLM 間の MITM によるトラフィックの傍受・分析は、初期の Traffic Inspector 要件に影響を与えました。以前に派生した4つのモジュール — SSE のマージ、会話の正規化、シークレットのマスキング、ヘッダーのサニタイズ — は、公開プロトコル標準に基づく独立したクリーンルーム実装に置き換えられています。2つのホストパススルー領域（<code>passthrough.ts</code> および <code>_internal/bypass.cjs</code>）は、OmniRoute 内部の独立した実装として引き続き扱われます。これらは、その置き換えの一環として書き直されたものではありません。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/InterceptSuite/ProxyBridge">ProxyBridge</a></b></td><td align="center">6,978</td><td>プロセス単位の透過プロキシルーティング — クラッシュセーフな MITM のティアダウン、ソケットのアイドルタイムアウト、<code>/proc</code> によるプロセスの帰属、TPROXY キャプチャに影響を与えました。</td></tr>
</table>

### 📚 モデルデータ、可観測性、UI

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute への影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/anomalyco/models.dev">models.dev</a></b></td><td align="center">7,486</td><td>AI モデルの仕様、価格、機能に関するオープンデータベース — 当社のモデルカタログにネイティブに同期されています。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/xyflow/xyflow">React Flow / xyflow</a></b></td><td align="center">38,874</td><td>リアルタイムの Compression Studio と Combo/Routing Studio を支えるノードベースのグラフライブラリです。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langchain-ai/langgraph">LangGraph</a></b></td><td align="center">44,349</td><td>LangGraph Studio のライブワークフローグラフ可視化は、当社の Studio におけるリアルタイムのカスケード表示に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langfuse/langfuse">Langfuse</a></b></td><td align="center">36,907</td><td>その trace → span → generation という可観測性モデルが、当社の Compression Studio のウォーターフォール表示の形を作りました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/kiali/kiali">Kiali</a></b></td><td align="center">3,647</td><td>Istio サービスメッシュの可観測性 — Routing/Combo Studio におけるサーキットブレーカーのバッジとエラーエッジの表示に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lobehub/lobe-icons">lobe-icons</a></b></td><td align="center">2,666</td><td>ダッシュボード全体でプロバイダーアイコンとして表示される AI/LLM ブランドロゴを提供します。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lipis/flag-icons">flag-icons</a></b></td><td align="center">12,499</td><td>README の言語セレクターで使用される MIT ライセンスの SVG 国旗を提供します。</td></tr>
</table>

### 🛡️ セキュリティ

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute への影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/tldrsec/awesome-secure-defaults">awesome-secure-defaults</a></b></td><td align="center">723</td><td>セキュアなデフォルト設定を備えたライブラリの厳選リストであり、当社のセキュリティ上の選択（Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink）の指針となっています。</td></tr>
</table>

### 🧭 補完的なツール

<table>
  <tr><th align="left">プロジェクト</th><th align="center">⭐</th><th align="left">OmniRoute への影響</th></tr>
  <tr><td nowrap><b><a href="https://github.com/BlockRunAI/ClawRouter">ClawRouter</a></b></td><td align="center">6,649</td><td>リクエストの重複排除、緊急時のゼロコストフォールバック、プラuggable な Auto-Combo 戦略、多言語のインテント分類に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lbjlaq/Antigravity-Manager">Antigravity-Manager</a></b></td><td align="center">32,785</td><td>アカウントを考慮したモデルのリマッピング、実行可能ファイルパスの検証、プランラベルの動作が、OmniRoute の Antigravity ランタイムに影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jlcodes99/vscode-antigravity-cockpit">vscode-antigravity-cockpit</a></b></td><td align="center">4,852</td><td>コンパクトなクォータリセットのカウントダウン形式が、OmniRoute における対応するプロバイダー制限表示の着想となりました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/iOfficeAI/AionUi">AionUi</a></b></td><td align="center">33,996</td><td>その ACP 統合が、インストール済み CLI エージェントの OmniRoute による自動検出に影響を与えました。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/steipete/CodexBar">CodexBar</a></b></td><td align="center">22,955</td><td>Grok Build のクォータ領域を特定しました。その後、OmniRoute はライブのワイヤー形式を独自に検証し、修正しました。</td></tr>
</table>

## 📄 ライセンス

MITライセンス - 詳細は [LICENSE](LICENSE) を参照してください。

---

<div align="center">

**[⬆ トップに戻る](#-omniroute)** · オープンソースAIコミュニティのために❤️を込めて作られています。

<sub><a href="https://github.com/diegosouzapw">Diego Souza</a> 作成 · OmniRoute v3.8.54 · Node ≥22.22.2 · MITライセンス · <a href="https://omniroute.online">omniroute.online</a></sub>

</div>
<!-- コミュニティ向けQ&AのためにGitHub Discussionsを有効化 -->
