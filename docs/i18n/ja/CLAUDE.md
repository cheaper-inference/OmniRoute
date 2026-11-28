# CLAUDE.md (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**すべてのプロジェクト ルールは[`AGENTS.md`](AGENTS.md)に存在します**—すべてのAIアシスタントにとって唯一の信頼できる情報源です。上記のインポートではすでにロードされています。ここでプロジェクト ルールを再追加しないでください。以下のすべては、 ONLY Claudeコードに適用します。 `AGENTS.md`ですでに定義されているルールの—操作上の改良です。

## ワークツリーの分離— Claudeコードの詳細

- オペレーターから既に指示されていない限り、 `AskUserQuestion` (ハード ルール#19) 経由でオペレーターにベース ブランチを確認してください。
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>`を使用してワークツリーを作成し ( `.claude/worktrees/`の下に配置され、 `node_modules`ハードリンクし、 `.husky/_`をコピーします)、その`path`を使用して`EnterWorktree`を呼び出します。常にベースを渡します。ベースがないと、スクリプトは最も高い`release/*`を選択しますが、これはオペレーターが確認したものではない可能性があります。 `EnterWorktree`独自に作成するワークツリーにはハード リンクもフックもないため、その中でプリコミット ゲートは実行されません。

## サブエージェントとgit

git (エージェント ツールまたはワークフロー スクリプト) に触れるすべてのサブエージェントには、プロンプト—で、サブエージェント経由で記録されたスタッシュ インシデントの再発を示すハード ルール#22 a の`git stash`禁止が逐語的に適用されます。

## 計画アーティファクト—スーパーパワー パス オーバーライド

スーパーパワーのスキルは`docs/superpowers/plans/`、 `docs/superpowers/specs/`および`docs/research/`でデフォルトを通知します。書き込む前に、それぞれを`AGENTS.md` → "Planning & Research Artifacts" で`_tasks/`に相当するものに書き換え、メイン リポジトリではなく`git -C _tasks …`を使用してコミットします。

## スクラッチ ファイル—ではなく`_artifacts/` `/tmp`

このプロジェクトは、ハーネスのセッション スクラッチパッド (`/tmp/claude-*/…`) をオーバーライドします。一時ファイル—エクスポート、生成された zip、1 回限りの中間出力—から`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`への書き込み: gitignored ルート`_*`パス。これにより、オペレーターはすべてのスクラッチを 1 か所で見つけて削除します。耐久性のある計画、仕様、研究、引き継ぎは、代わりに`_tasks/`に送られます (ハード ルール#23)。

## レッドベース

蓄積された赤の状態 (ベースチップ+赤PRs) を排出するには、 `/sweep-reds`スキルを使用します。
