# Guardrails (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **信頼できる唯一の情報源:** `src/lib/guardrails/`
> **最終更新:** 2026-08-29 — v3.8.51（Video Bridge の文字起こしの来歴は呼び出し元による宣言であり、
> まだサーバー側では検証されていないことを #11661 に基づき明確化）

ガードレールは、OmniRoute とアップストリームプロバイダーの境界で、安全性、ポリシー、およびコンテンツ変換を適用します。各ガードレールは、リクエストペイロード（`preCall`）とアップストリームレスポンス（`postCall`）を検査し、必要に応じて拒否、変換、または注釈付けできます。

システムは **フェイルオープン** です。ガードレールの実行中に例外が発生した場合、レジストリはエラーを記録し、リクエストを失敗させるのではなく、次のガードレールの処理を続行します。ブロックは常に明示的な判断（`block: true`）であり、偶発的に発生することはありません。

## 組み込みガードレール

レジストリはインポート時に、優先順位に従って6つのガードレールを自動的に読み込みます
（`registry.ts` → `registerDefaultGuardrails()` を参照）。

| 優先度 | 名前                | ステージ       | ファイル              |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先度の数値が小さいものが**先に**実行されます。

### Vision Bridge（`visionBridge.ts`）— Modality Bridge PR-1

**ビジョン非対応モデル**を対象とする画像付きリクエストをインターセプトし、リクエスト全体をビジョン対応モデルへ再ルーティングするか、アップストリーム呼び出しの前に、画像部分を設定可能なビジョンモデルが生成したテキスト説明へ置き換えます。これにより、テキスト専用プロバイダーでもマルチモーダルペイロードを透過的に処理できます。

フロー：

1. 対象モデルがすでにビジョンに対応している場合はスキップします（ただし、強制ブリッジリスト `isVisionBridgeForcedModel` に含まれる場合を除きます）。
2. `extractImageParts(messages)`（`visionBridgeHelpers.ts`）を使用して画像部分を抽出します。この関数は、`open-sse/utils/mediaParts.ts` の**統合メディア検出機構** `detectMediaParts()` に処理を委譲します。これは、コンボ互換性フィルターと共有される唯一の信頼できる情報源です。抽出対象は、`replaceImageParts` が元の位置へ差し戻せる形状のトップレベル部分に限定されています（extract↔replace 契約）：OpenAI の `image_url`、Anthropic の base64 `source.type:"base64"`、Anthropic の URL `source.type:"url"`、および Responses API の `input_image` です。ネストされた検出結果やインジケーターのみの形状はコンボフィルター用であり、抽出されることはありません。何も見つからなければスキップします。
3. `resolveVisionBridgeRuntimeSettings()`（`src/shared/constants/modalityBridgeDefaults.ts`）を通じてランタイム設定を解決します。新しい `modalityBridge*` 設定キーが優先され、従来の `visionBridge*` キーは**1サイクル限定のフォールバック**（ロールバック期間）として維持されます。ブリッジが無効な場合は、メディアを走査する前にスキップします。
4. モードセレクター（`modalityBridgeVisionMode`、下表を参照）が、再ルーティングか説明生成かを決定します。再ルーティングでは、`model` のみを差し替えた `modifiedPayload` と、メタ情報 `{ rerouted, fromModel, toModel, imagesKept }` を返します。
5. 説明生成パスでは、画像数を `maxImages` に制限し、タスク対応プロンプトを構成して説明キャッシュを参照し、ビジョンモデルを**並列**で呼び出し（`Promise.allSettled`）、元の位置に `[Image N]: <description>` というテキスト部分を挿入します。説明生成に失敗した場合は `null` となり、元の画像部分は**保持**されます（#4012）。ただし、コンボの説明生成パスですべての説明生成に失敗した場合は例外で、ビジョン非対応であることが確認済みのアップストリームには、代わりに `(unavailable — no vision-capable provider connected)` というスタブが渡されます（#8430）。
6. `modifiedPayload` とメタ情報（`imagesProcessed`、`descriptions`、`processingTimeMs`、`visionModel`）を返します。

#### モードセレクター（`modalityBridgeVisionMode`）

| モード     | デフォルト | 動作                                                                                                                                                                                                                                                                                                                      |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | 変更されていない従来のヒューリスティック（#6640/#7204）：非コンボモデルおよび `auto/` モデルは、元のモデルに使用可能な認証情報がすでにある場合を除き（その場合は説明を生成）、最適なビジョンモデルへ再ルーティングされます。コンボ対象では常に説明を生成します。                                                          |
| `describe` |            | 常に説明を生成します。再ルーティングブロックは完全にスキップされ、常にユーザーが選択したモデルが応答します。                                                                                                                                                                                                              |
| `reroute`  |            | 再ルーティングを強制します。認証情報を持つモデルを維持するためのガードはバイパスされます。再ルーティング**先**の認証情報ガードは引き続き適用されます。使用可能なビジョン対応の対象が存在しない場合、リクエストは説明生成へフォールスルーするため、生の画像がテキスト専用バックエンドへ到達することはありません（#8430）。 |

強制モードは、auto ヒューリスティックが実行される**前に**短絡します。`auto` の動作は PR-1 以前のガードレールとバイト単位で同一です。

#### APIキーのスコープ（`visionBridgeKeyScope.ts`）

呼び出し元のAPIキーによって `allowedConnections`、クォータプール（`allowedQuotas`）、またはモデル（`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`）が制限されている場合、ブリッジは、そのキーが使用可能な接続上で、そのキーが使用可能な再ルーティング用モデルおよび説明生成用モデルのみを選択します。その後、説明生成の呼び出しは常に `x-omniroute-self-loop-key-id` ヘッダーを付けて OmniRoute のセルフループを経由するため、受信側のチャットリクエストで、そのキーの接続およびモデルポリシーが再度適用されます。`enforceApiKeyPolicy()` は、このヘッダーをセルフループ用 bearer と組み合わせた場合にのみ有効とするため、アクセス範囲を狭めることしかできません。また、解決できない id は拒否されます。

そのキーに許可されたビジョンモデルがない場合、説明生成パスは処理を行わず、リクエストは変更されずにそのまま通過します。これは、ガードレールが無効な場合と同じフェイルオープン動作です（メタ情報 `{ skipped: true, reason: "no_permitted_vision_model" }`）。キーのないリクエスト、およびこれらの制限がないキーは、従来とまったく同じように動作します。

#### タスク対応の説明生成プロンプト（`modalityBridgeVisionTaskAware`）

デフォルトは **true** です。`composeVisionPrompt()`（`visionBridgeHelpers.ts`）は、
**最後のユーザーメッセージ**のテキスト（500文字に切り詰め）を基本の
説明プロンプトに追加し、ユーザーが実際に要求した内容に沿うよう説明を誘導
（codex-vision-proxy パターン）するとともに、表示されているテキストを文字起こしするよう
ビジョンモデルに求めます。このフラグがオフの場合、またはユーザーテキストがない場合は、
基本プロンプトが変更されずに使用されます。

説明セルフループ自体の OpenAI 互換リクエスト（`visionBridgeHelpers.ts` の
`callVisionModelSingle()`）では、常に `image_url.detail: "high"` を要求します。
これは、クライアント側のシグナルによる制御なしに、すべての呼び出し元／プロバイダーに対して
無条件に適用されます。低詳細度のサンプリングは、このプロンプトが要求する
テキスト文字起こしタスクそのものの OCR 精度を低下させるため、元の受信リクエストで
使用されていた詳細度に関係なく、説明呼び出し自体は常に高詳細度を要求します。
これは内部の説明リクエスト本文にのみ影響し、OmniRoute がプライマリリクエストで
呼び出し元自身の `image_url.detail` を転送する方法は変更しません。そのデフォルトは
`defaultImageDetail()`（`open-sse/handlers/chatCore/upstreamBody.ts`）で
個別に適用され、検出された OpenCode クライアントに対してのみ適用されます。
説明セルフループの Anthropic ワイヤーフォーマット分岐には `detail` フィールドがないため、
どちらのデフォルトの影響も受けません。

#### 説明出力の上限（`modalityBridgeVisionMaxChars`）

| キー                           | デフォルト | 範囲                 |
| ------------------------------ | ---------- | -------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` または 100–50000 |

`0`（デフォルト）は **上限なし** を意味します。`callVisionModel()` が返す説明は
変更されずにそのまま渡され、既存の動作が維持されます。100–50000 の範囲の値を
指定すると、説明が `[Image N]: <description>` として差し戻される前に、
末尾へ `…` を付けて切り詰められます
（`src/lib/guardrails/visionBridge.ts` の `VisionBridgeGuardrail.preCall()`）。
後続モデルが完全な文字起こしを必要とする、詳細情報の多い OCR タスクではこの値を
引き上げてください。出力の多いビジョンモデルによるトークン使用量を制限するには、
この値を引き下げてください。ダッシュボードのフィールドは Vision タブの Advanced パネル
（`ModalityBridgeVisionTab.tsx` の `modality-bridge-max-chars`）にあり、
明示的な `0` は変更せず、1～99 の値を下限の 100 まで引き上げます。`0` は単なる
「未設定」のデフォルトではなく、それ自体が有効な Zod 値です
（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`）。

#### 説明キャッシュ（`modalityBridge/bridgeCache.ts`）

説明出力用のインメモリ LRU + TTL キャッシュで、プロセス全体で共有されます。
キー = `sha256(imageRef + composedPrompt + configuredBridgeModel)` で、
長さプレフィックスによるフレーミングを使用します（フィールド境界の衝突なし）。
モデル部分には、実際に応答したモデルではなく、**設定された**ブリッジモデルを使用します。
`callVisionModel` は内部でフォールバックする可能性があり、試行ごとにキーを設定すると
キャッシュが断片化するためです。失敗した説明はキャッシュされません。設定は次のとおりです。

| キー                            | デフォルト | 範囲    |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### リモート画像の正規化（セルフループ説明／base64 取得）

ブリッジ自体が **リモート**画像を取得する場合、つまり Anthropic の説明セルフコールと、
claude ワイヤーフォーマット向けの base64 変換
（`ensureBase64ImagesForClaudeWire`）の両方において、
`visionBridgeHelpers.ts` の `fetchRemoteImageAsDataUri()` を介して取得された
データ URI は、ビジョンモデルのリクエストへ埋め込まれる前に `normalizeDataUri()`
（`open-sse/utils/imageNormalize.ts`）へ渡されます。サイズが大きすぎる画像は、
**長辺 2048px** に縮小されます（OpenAI/Anthropic がサーバー側ですでに適用している
リサイズ上限に合わせています）。これにより、ビジョンモデルから見える内容を変えずに、
アップロードのバイト数／レイテンシーを削減できます。リサイズには、動的インポートで
読み込まれる `sharp` を使用します。ネイティブバイナリの読み込みに失敗する
プラットフォームでも、`normalizeDataUri()` は **決して例外をスローしません**。
元のバイトをそのまま渡す動作へフォールバックするため、説明／base64 変換のパスは
常に動作し続けます。画像ではないバイト（取得結果がデコード可能な画像ではなかった場合）も、
変更されずにそのまま渡されます。この正規化の適用範囲は、ブリッジが自身のセルフコール用に
取得する画像に限定されます。呼び出し元の未加工のパススルーペイロードには決して適用されず、
オプトイン時のみ変更するという原則（Hard Rule #20）に準拠します。

#### 設定スキーマ + マイグレーション

新しい `modalityBridge*` キーは、`updateSettingsSchema`
（`src/shared/validation/settingsSchemas.ts`）で Zod により検証されます。
対象は `modalityBridgeVisionEnabled`、
`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、
`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、
`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、
`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` の3項目、および
Audio Bridge で使用される `modalityBridgeAudio*` グループです。マイグレーション
`141_modality_bridge_settings.sql` は、既存のレガシーな `visionBridge*` 値を
対応する新しいキーへコピーします（冪等であり、運用者が設定した `modalityBridge*` 値を
上書きすることはありません）。レガシーキーは、1リリースサイクルの間、
読み取り時のフォールバックとして引き続き受け入れられます。

#### 透過性ヘッダー + 統計

説明変換されたレスポンスには、
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
が付与されます（`modalityBridge/bridgeStats.ts` の
`buildModalityBridgeHeader()` で構築され、
`src/sse/handlers/chatHelpers.ts` の `withModalityBridgeHeader()` で設定されます）。
再ルーティングされたリクエストにはヘッダーが **付与されません**。ペイロードは変更されておらず、
モデルの切り替えはレスポンス本文の `model` フィールドですでに確認できるためです。

`GET /api/modality-bridge/stats`（管理認証が必要で、`GET /api/settings` と同じ階層）は、`vision`、`audio`、`video` について、モダリティごとのインメモリカウンター
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` を返します。`averageLatencyMs` は、すべての試行回数ではなく `latencySamples` を分母として使用します。計測時間のない操作に対して、0 ミリ秒のサンプルが捏造されることはありません。
`bridged` は、変換成功を表す後方互換性のあるエイリアスとして維持されます。失敗した試行では増加しません。
カウンターは設計上、プロセスの再起動時にリセットされます
（会計ではなくテレメトリであるため）。

#### ダッシュボード設定

専用のダッシュボードページは
`/dashboard/settings/modality-bridge` です。URL で直接指定可能な `Vision`、`Audio`、
`Video` タブでは、`tab` の値を切り替える際にもクエリパラメーターが保持されます。
Vision タブでは、有効化、モード、モデル選択（自動デフォルトを含む）、タスク対応プロンプト、高度なタイムアウト／画像／説明文の長さ／キャッシュの上限、ランタイム
カウンター、および保護されたサンプルリクエストを設定できます。Audio タブも稼働状態にあり、有効化、Auto を備えた STT 専用モデルピッカー、タイムアウト／最大クリップ数の上限、音声
カウンター、および `input_audio` サンプルテストを提供します。Video タブも機能しており、FFmpeg/ffprobe のランタイム状態を報告します。UI には明示的な 4 つの状態があります（プローブの実行中または完了できなかった場合は `unknown`、ループバックではないダッシュボードホストでクライアント側によりプローブがスキップされた場合は `restricted`、プローブ後に存在しないことが確認された場合は `unavailable`、FFmpeg/ffprobe のバージョンを取得できた場合は `available`）。また、有効化／モデル／フレーム／動画／タイムアウトの上限を永続化し、モデルピッカーを視覚対応モデルに絞り込み、動画カウンターを表示します。

AI 設定にあった旧 Vision Bridge カードは、新しいページへの互換性リンクになりました。フォームのコピーを別途保持することはなくなりました。Media Providers からも、既存の Speech-to-Text プレイグラウンドを削除することなく、Image-to-Text および Speech-to-Text ワークフローに対応する Modality Bridge タブへリンクします。

**自己ループのアドミッションバイパス：** describe 呼び出しが OmniRoute 自身の `/v1` 自己ループ（非標準プロバイダーモデル）を経由する場合、サブリクエストは
`x-omniroute-admission-bypass: internal` を送信し、解決済みの自己ループ認証情報で認証されます。ローカルモードではローカルの `sk_omniroute` センチネル、それ以外ではオペレーターが設定した `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境変数キー（#1350）が使用されるため、`REQUIRE_API_KEY=true` のデプロイでも describe 呼び出しを実行できます。このバイパスは、これらの認証情報と完全に一致する場合にのみ許可されるため、外部クライアントがこのヘッダーを使用してアドミッションを回避することはできません。

従来のデフォルト値は `src/shared/constants/visionBridgeDefaults.ts` にあり、新しいモード／タスク対応／キャッシュのデフォルト値と設定リゾルバーは
`src/shared/constants/modalityBridgeDefaults.ts` にあります。ガードレールは
`deps` コンストラクターオプションを公開しており、テストで偽の `getSettings` および
`callVisionModel` 実装を注入できます。

### Audio Bridge（`audioBridge.ts`）— Modality Bridge PR-3

音声入力を受け付けることが確認されていないターゲットへ到達する前に、音声を含むチャットリクエストをインターセプトします。チャットリクエストを別ルートへ送ることはありません。音声部分は既存の OpenAI 互換マルチパートエンドポイントを通じて文字起こしされ、選択されたチャットモデルはテキストの文字起こし結果を使用して処理を続行します。

フロー：

1. `getResolvedModelCapabilities()` を通じて `supportsAudio` を解決します。明示的なプロバイダーレジストリのメタデータ、静的モデルメタデータ、同期済みの `modalities_input` の順に優先されます。宣言された入力リストに `audio` が含まれない場合は `false` となり、機能に関する根拠がない場合は `null` のままです。`false` と `null` はどちらも保守的なブリッジを有効にし、`true` の場合はバイパスします。
2. `modalityBridgeAudio*` 設定を解決し、共有の `detectMediaParts()` 検出器を通じて、各メッセージから接合可能なトップレベルの音声部分を抽出します。サポートされるワイヤー形式は、OpenAI の `input_audio`、`audio_url`、および `source.media_type: "audio/*"` です。ネストされた音声はルーティング用に検出されますが、接合処理では削除されません。処理量は `modalityBridgeAudioMaxClips` によって制限され、それ以降の部分は変更されません。
3. 設定済みの `provider/model` を使用するか、`selectAudioBridgeModel()` に `AUDIO_TRANSCRIPTION_PROVIDERS` を安定したカタログ順で走査させ、利用可能な有効なプロバイダー認証情報を持つ最初のモデルを選択します。
4. `callAudioTranscription()` は、base64/data-URI 音声をマルチパートの `file` に変換するか、DNS ピンニングと 25 MB の上限を備えた公開先限定のアウトバウンドガードを通じてリモートの `audio_url` をダウンロードします。その後、ファイルと選択されたモデルをローカルの `/v1/audio/transcriptions` 自己ループへ POST し、`resolveSelfLoopBearer()` で認証します。既存の文字起こしルートが、通常の認証情報検索、クールダウン／レート制限処理、プロバイダーへのディスパッチを実行します。
5. 成功した呼び出しでは、その部分が `[Audio N]: <transcript>` に置き換えられます。呼び出しは `Promise.allSettled` で実行され、個々の失敗時には元の音声部分が保持されます（#4012 の契約）。すべての呼び出しが失敗し、ターゲットが `supportsAudio === false` であることが証明されている場合、その部分は
   `[Audio N]: (unavailable — no STT provider connected)` になります（#8430 の契約）。不明なターゲット（`null`）では、すべて失敗した場合も変更されません。利用可能な STT 認証情報がないことが証明されたテキスト専用ターゲットには、ネットワーク呼び出しを行わずに同じ明示的なスタブが渡されます。

成功した文字起こしでは、プロセス全体で共有される Modality Bridge の LRU/TTL キャッシュが使用されます。キーは、音声参照、固定の `audio-transcription` 操作ラベル、および選択された STT モデルを組み合わせたものです。失敗はキャッシュされません。音声の試行では、共有の `bridged`、`cacheHits`、`failures`、`lastUsedAt` カウンターが更新されます。
変換されたレスポンスには
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` が含まれます。変更されていないリクエストには Audio Bridge セグメントが追加されません。

ランタイム設定は DB に保存され、Zod で検証されます：

| キー                          | デフォルト | 範囲              |
| ----------------------------- | ---------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                 |
| `modalityBridgeAudioModel`    | `""`       | 自動または STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10              |

共有キャッシュは引き続き `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes`、`modalityBridgeCacheMaxEntries` によって制御されます。

### 動画ブリッジ（`videoBridge.ts`、`videoBridgePipeline.ts`）

ネイティブの動画サポートが確認されていないターゲットが呼び出される前に、Chat Completions の `messages` および Responses
API の `input` に含まれるトップレベルの動画パートをインターセプトします。
サポートされる形式は、`input_video`、`video_url`、`video_source`、HTTPS URL、
および `data:video/*;base64,...` データ URI です。テキスト内の単なるファイル名は
動画として扱われません。

`VideoBridgeGuardrail.preCall`（`videoBridge.ts`）は、リクエストの走査、
機能／ポリシーのチェック、リクエスト単位の集約、およびレスポンスペイロードを担当します。
動画単位の処理（取得、結果全体のキャッシュ、フレームシーケンスの記述
（呼び出し元が宣言した音声文字起こしがあれば統合）、試行単位の
メトリクス／中断／クリーンアップ）は、`videoBridgePipeline.ts` の
`processVideoPart` の背後に隠蔽されており、`preCall` のループ内で動画パートごとに一度呼び出されます。
このモジュールでは、明示的なポート境界である `VideoMediaBrokerPort`
（バイトの取得とサンプリング済みフレームの抽出）、`VideoAudioTranscriptionPort`
（呼び出し元が宣言した音声文字起こしとサンプリング済みキャプションの統合）、および
`VideoDrilldownPort`（フレームのドリルダウン永続化境界。まだ
`processVideoPart` には接続されておらず、現時点でドリルダウンエントリを書き込むのは独立した `/api/modality-bridge/video/drilldown`
ルートのみ）も定義されています。

公開 `/v1` リクエストパスがサブプロセスをインポートまたは呼び出すことはありません。リモート
動画は 50 MiB の上限内でダウンロードされます。インライン base64 動画には、モデル／メッセージ／フレーミングのエンベロープを
公開 JSON リクエストの受け入れ上限である 50 MiB 以内に収められるよう、動画ごとにデコード後 36 MiB という保守的な上限が設定されます。インライン
長とデコード後サイズの見積もりは、割り当て前にチェックされます。最初のリモート URL とすべてのリダイレクトで
HTTPS が必須であり、DNS ピンニングを備えた既存の
公開先限定アウトバウンドガードが使用されます。その後、バイト列は厳密な内部
`POST /api/modality-bridge/video/extract` ブローカー境界を通過します。このルートは
`LOCAL_ONLY` かつ `SPAWN_CAPABLE` であり、プロセス単位で認証された
信頼済みループバックリクエストのみを受け入れ、URL、ファイルシステムパス、実行可能ファイル、
引数リストは一切受け入れません。API のボディサイズ処理パイプラインとハンドラーの増分ボディ
リーダーは、それぞれ独立してブローカー入力に 50 MiB の上限を適用します。制限付きキューは
一度に 1 件の抽出を実行し、保留中のジョブを 4 件まで許可し、保留中の入力を
100 MiB に制限します。

ブローカー内部では、`ffprobe` が非公開のローカルファイルを読み取ります。固定されたフォーマットの
許可リストからは、プレイリスト形式とマニフェスト形式が除外されています。許可された MOV 系
コンテナでは、外部 MOV データ参照はデフォルトで無効のままであり、
固定コマンドもそれらを有効にしません。`ffprobe` と `ffmpeg` はいずれも、
`file` のみに制限されたプロトコル許可リスト、1 スレッド、固定引数配列、シェルなし、
および `PATH` から解決された実行可能ファイルを使用します。添付画像のカバーストリームは
再生可能な候補ではありません。すべての再生可能ストリームは制限を満たす必要があり、
決定論的な最小インデックスへのフォールバックよりも、明示的なデフォルトストリームが優先されます。
動画は 600 秒、各次元 8,192 ピクセル、ソース全体で
33,554,432 ピクセルに制限されます。FFmpeg は中間点にある 1～16 枚の JPEG フレームをサンプリングし、
小さい入力を拡大することなく長辺を最大 1,024 ピクセルまで縮小し、
URL を受け取ることはありません。サンプリングはデフォルトで `uniform` です。オプションの
`scene_aware` および実験的な `segment_aware` ポリシーは、検証済みのローカルストリームに対して
固定された FFmpeg パスを追加で 1 回実行し、上限付きの
`showinfo` シーンタイムスタンプを選択します。また、検出器の失敗、タイムアウト、不正な出力、または候補セットが空の場合には、
決定論的に同じ均等配置の中間点へフォールバックします。セグメント認識モードでは、
検証済みのシーン区間に比例して中間点サンプルを割り当てます。セグメント認識の根拠とフォールバック動作については、
以下で詳しく説明します。すべてのポリシーにおいて、選択後に
最大 16 フレームという厳格な上限が適用されます。シーン認識リクエストのフレーム予算が
1 フレームだけの場合、アクティブな動画全体またはフォーカスウィンドウの均等配置された中間点を使用し、
`policyEffective: uniform` を報告します。選択された単一のシーンフレームでは、
時間軸の両端をともに保持できないためです。呼び出し元は、有限の
フォーカスウィンドウ（`start`／`end` 秒）を任意で指定できます。境界はメディアの再生時間内に収まるようクランプされ、
前後が逆転したウィンドウや有限でないウィンドウは拒否され、すべてのサンプリング
ポリシーは正規化された区間内でのみ実行されます。結果として得られた
ウィンドウは、サンプリングメタデータおよび信頼されていない説明の
プレフィックスに含まれるため、下流モデルはフォーカスされた抜粋とタイムライン全体を区別できます。

セマンティックキャプションのフォーカスは、独立した明示的な設定です。デフォルトの `full`
分析モードでは、既存のフレームプロンプトが維持され、リクエストテキストがキャプションモデルへ転送されることはありません。
`focused` モードでは、ブリッジは同じ Chat または Responses
コンテナから、ユーザーが作成した最新の空でない `text`／`input_text` のみを読み取り、
NFC に正規化し、制御文字と空白文字をまとめ、
500 Unicode コードポイントに制限します。結果が空の場合は、正確な
`full` プロンプトにフォールバックします。使用可能なヒントは、専用の
信頼されていないユーザーコンテキストブロック内で JSON としてシリアライズされ、観察可能な詳細の優先付けにのみ使用できます。
メディア内で視認または聴取できる指示に従わないよう求める独立した警告を、
このヒントで上書きすることはできません。テキストによるフォーカスが `start`／`end` を推論したり、
時間サンプラーを変更したりすることはありません。

#### FU-07 の構造的セグメント根拠

`segment_aware` は、検証済みのローカル動画ストリームに対して、制限付きの事前分析パスを1回実行します。固定されたフィルターチェーンは、まず幅が最大320ピクセルになるようにスケーリングし、シーンチェンジとフリーズ区間を検出した後、ぼけ、平均輝度、空間的・時間的情報を分析するために毎秒1フレームをサンプリングします。このパスは、構造サンプル600件、FFmpeg/フィルタースレッド1本、同一の `file` 専用プロトコルおよびコンテナ許可リスト、1 MiB のプロセス出力上限、ならびにブローカーの共有中断処理・期限内で最大30秒に制限されます。リクエストからコマンド、フィルター、パス、URL を受け取ることはありません。

構造値は決定論的なサンプリング証拠であり、動画の意味的理解ではありません。被写体、動作、キャプション、音声、ユーザーの意図を推論するものではありません。シーン境界とフリーズ境界によってセグメントが形成されます。フリーズの占有率、ぼけ、露出、空間的ディテール、時間的変化は、既存の1～16フレームの予算配分にのみ影響します。完全にフリーズしているセグメントは1フレームに制限され、それ以外のセグメントが残りの予算を競います。境界数がフレーム数を上回る場合も、タイムライン全体の均等なカバレッジが維持されるため、冒頭の素早いカット群によって長い末尾セグメントが隠れることはありません。フリーズ境界から1秒の分析解像度内にあるシーン境界は統合されます。

フィルターの欠落、不正または空の証拠、検出器エラー、制限付き事前分析のタイムアウトが発生した場合は、厳密に均等な中点ポリシーへフォールバックします。呼び出し元による中断またはブローカーの期限超過ではフォールバックしません。実行中のサブプロセスを終了し、それ以降のフレーム抽出を防止し、プライベートな一時ディレクトリツリーを `finally` で削除します。

`scripts/perf/video-bridge-fu07-eval.ts` は、重複除去後のキャプション呼び出し削減量、高密度モーションへの予算配分、ぼけ・露出・SI-TI の証拠、長い末尾を伴う高速カット、緩やかなフェードによる偽陽性を評価するため、決定論的な実 FFmpeg フィクスチャを生成します。事前分析の実時間を記録し、`/usr/bin/time` が利用可能な場合は、子プロセスの CPU 使用量とピーク RSS も記録します。品質チェックは構造的なオラクルに限定されます。このハーネスには認可済みエンドポイントまたは固定された判定器がないため、実際のキャプションモデル品質は引き続き `HOLD` です。金銭的な削減効果も、`--caption-cost-per-call-usd` で呼び出しごとの明示的な正のコスト見積もりが指定されない限り、`HOLD` のままです。スクリプトがいずれかの結果を捏造することはありません。

各フレームは4 MiB、すべての RAW フレームの合計は23 MiB、シリアル化されたブローカー応答は32 MiB に制限されます。プライベートな一時ディレクトリは `finally` で削除されます。OmniRoute は FFmpeg を同梱せず、カスタム実行可能ファイルのパスも受け付けません。キャプション生成の前に、ブリッジは保守的な視覚的重複除去パスを適用します。各 JPEG は16×16のグレースケールバッファに縮小され、最後に保持されたフレームとのみ比較されます。要求されたキャプション予算が1フレームを超える場合、抽出処理はその予算の最大2倍、かつ最大16フレームまでの制限付き候補プールを提供します。要求された上限は重複除去後にのみ適用され、予算が2以上の場合、最終的な間引き処理で最初と最後に選択された候補が保持されます。バージョン管理された `grayscale-16x16-mean-cells-v2` ポリシーでは、平均輝度差と、正規化差が0.05以上であるサムネイルセルの比率のうち、大きい方を使用します。重複判定しきい値は定数0.04であり、実行時設定として公開するのではなく、予測可能性を重視して選定されています。この補助的な高コントラスト信号により、平均値のみの比較では見落とされる可能性がある小さな動きや可視テキストの変化が保持されます。比較器またはデコーダーのエラー時はフォールバックしてカバレッジを維持します。出力メタデータでは、抽出された候補、正常に使用されたフレーム、除外された視覚的重複を区別します。

明示的に指定された動画パートでは、タイムスタンプ付きコンタクトシートを要求できます。ブリッジは最大4列、16フレームの JPEG グリッドを構築します。512ピクセルの各セルでは、高コントラストの下部帯にソースのタイムスタンプを焼き付けます。同じタイムスタンプは、後続処理での関連付けと監査のため、テキストメタデータにも保持されます。完成した JPEG は32 MiB 以下に制限されます。`sharp` がグリッドをデコードまたは合成できない場合、ブリッジは個別の JPEG フレームにフォールバックします。クライアントによる中断は、引き続きシート処理全体へ伝播します。

昇格の根拠は、合成処理のマイクロベンチマークから意図的に分離されています。`scripts/perf/video-bridge-contact-sheet-eval.ts` は、実際の OpenAI 互換ビジョンモデル向けに、スキーマでバージョン管理された A/B ハーネスを定義します。プロバイダーから報告されたトークン数、シート合成を含むエンドツーエンドの実時間レイテンシ、モデル呼び出し回数、マニフェストで定義された事実の保持率を測定します。モデルの生レスポンスはレポートに書き込まれません。SHA-256 ダイジェストと一致した事実 ID のみが保持されます。`--execute-real` が渡され、かつ `--model`、`OMNIROUTE_BASE_URL`、`OMNIROUTE_API_KEY` が設定されていない限り、ハーネスはネットワーク呼び出しも有料モデル呼び出しも実行しません。その明示的な実行がなければ、機械可読な判定は `HOLD` のままです。合成ペイロードや呼び出し回数の測定値だけでは、昇格の根拠になりません。

呼び出し元は、対応している動画パートに、すでに同期済みテキストを保有している場合、オプションの `transcript.cues` 配列を添付できます。各キューには `text`、プローブされた再生時間内の有限な `start`/`end` 区間、許可リストに含まれる `source`（`client`、`embedded`、または `audio-bridge`）が必要です。`confidence` のデフォルト値は `1` であり、`0` から `1` の範囲内でなければなりません。完全に重複するキューは統合されます。OmniRoute がこのメタデータから文字起こしを開始することはありません。検証済みのキューは、ソース、信頼度、区間とともに記述済みの結果へコピーされ、フレームキャプションと並んで信頼されていない観測結果としてレンダリングされます。無効なテキスト、範囲外のテキスト、または出所情報のないテキストは、キャプションストリームへ混在させずに拒否されます。リクエスト本文の両方のトランスクリプトチャネルでは、自己申告された `embedded` または `audio-bridge` ラベルを含め、指定された出所を `client` に正規化します。信頼済みラベルをコード専用の `trustedSource` 引数を介して割り当てられるのは、サーバーが所有するアダプターだけです。リクエストの JSON フィールドからこの引数に到達することはできません。トランスクリプトのテキストは、その出所にかかわらず、信頼されていないメディア由来コンテンツであり、認可を決定するために使用してはなりません。

高度な呼び出し元は、同じ動画に対して `audioTranscript` トラックを指定できます。
これは、サーバーによる文字起こしの証拠ではなく、クライアント提供のテキストとして扱われます。
融合境界では、映像と音声の観測を単一の期限および中断シグナルの下で実行し、
共通のタイムライン上に並べ、完全な重複を統合し、片方だけが成功した場合は
部分的な結果を報告します。無効な `audioTranscript` があっても動画全体は失敗せず、
部分的な結果に縮退します。つまり、映像の説明は維持され、音声ブランチには
サニタイズされた失敗コードが記録されます。ブランチごとの可用性、部分結果フラグ、
およびサニタイズされた失敗コードは、説明結果、ガードレールのメタデータ
（`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`）、結果キャッシュのメタデータ、およびブリッジの
融合カウンターに保持されます。デフォルトの Video Bridge パスは音声テキスト変換を
呼び出さず、メディアのコピーを追加でダウンロードすることもありません。このトラックが
明示的に指定されていない場合は、引き続き動画のみを処理します。

**文字起こしの保持（#12150 P1）。** これは、Video Bridge（それ自体がオプトイン）が
文字起こしキューをレンダリングするたびに自動的に適用されます。個別の保持フラグは
ありません。リクエストが文字起こしキュー（呼び出し元が宣言した `transcript`、または
融合された `audioTranscript`）をレンダリングすると、ガードレールはそれを
`videoBridgeObserved` としてマークし、動画説明の編集済みシャドウを生成します。
これは、各キューの自由形式テキスト本文を `[redacted-video-transcript]` に置き換えた
同一のレンダリングであり、文字列を組み立てる前に構造化されたキューフィールドを
置換することで構築されます（平坦化されたテキストを解析することは決してありません。
そのため、敵対的か通常かを問わず、`]` を含む本文（`[inaudible]`/`[music]` など）を
含め、キューの内容が残存することはありません）。永続化される呼び出しログの
リクエスト本文では、動画由来の各テキストパートが、内容の一致によって対応付けられた
編集済みシャドウに置き換えられます。`fullText` アンカーは、完了した呼び出し前
ガードレールのペイロードから再読み込みされるため、後続のチェーンガードレール
（優先度 10/95 の PII および認証情報マスカー）が説明テキストをその場で書き換えた後や、
システムプロンプト、ハンドオフ、メモリ注入によってメッセージ配列の形状が変わった後でも、
一致は引き続き成功します。モデルにアップストリーム送信される本文は変更されません。
観測対象となったリクエストは永続的な Memory にも何も格納しません
（リクエスト由来およびレスポンス由来の抽出はいずれもスキップされます）。
そのため、モデル自身の応答によって文字起こしテキストが Memory に反映されることも
ありません。

**生の動画フィールド（#12430）。** ブリッジが有効で、ネイティブ動画サポートが不明または存在しない場合、定義済みの `transcript`/`audioTranscript` フィールドも、説明が失敗した後や `maxVideos` の上限に達した後であっても、`videoBridgeObserved` を有効にします。`null` と空文字列も対象になりますが、存在しないフィールドと動画以外のメタデータは対象外です。保持されるコピーでは、これらのフィールドが編集されるか、リクエスト自体が省略され、キャッシュと Memory はバイパスされます。

これらのフォールバックパスでは、呼び出し元が指定した有効なキューは、非標準の
プロバイダーフィールドではなく、サポートされる `text`/`input_text` パートになります。
リクエストで指定された両方のトラックは、動画が説明されておらず、タイムスタンプが
メディアに対して検証されていないという明示的な警告とともに、信頼されていない
`client` 観測として維持されます。既存の 256 キュー/合計 64 KiB の制限および
キューごとの制限は、2 つのトラック全体に適用されます。タイムスタンプは、
ブローカーの上限である 600 秒、および指定されている場合はフォーカスウィンドウ内に
収まる必要があります。無効なトラックは破棄され、任意のテキストとして転送されません。
合計制限を超えない限り、有効な兄弟トラックは引き続き使用できます。null/空の
フィールドからテキストが追加されることはありません。このフォールバックによって、
メディアの取得や文字起こしが追加されることもありません。文字起こしの拡張フィールドは、
フォールバックの動画キャリアと、その `video_url`/`source` オブジェクトから削除されます。
OpenAI のワイヤー許可リストは引き続き厳格に維持されます。不明なネイティブ動画キャリアは
引き続き利用でき、テキストのみをサポートすることが判明しているターゲットでは安全な
マーカーが維持されます。構造化された編集済みシャドウによって、追加された
文字起こしテキストが保護される一方、呼び出し元が所有する元のリクエストは変更されません。
ネイティブサポート対象のターゲットと無効化されたブリッジでは、既存のバイパス動作が
維持されます。

追加で保持されるコピーも、同じ観測済みリクエストシグナルを使用します。ガードレール適用前の
生のクライアントリクエストスナップショット、メモリ内の保留中リクエスト、および早期に
拒否されたリクエストのログでは、動画パート内の文字起こしフィールドが構造的に置換されます。
パイプラインステージとコンテキストハンドオフによって合成された文字列プロンプトは、
永続化されるリクエスト本文のシンクで編集されます。永続化された
`video_content_removed` マーカーにより、`previous_response_id` を使用した継続は、
意図的に破棄されたテキストを再構築するのではなく、フェイルクローズします。観測済みの
リクエストがログ記録前にパートごとの編集済みシャドウを失った場合、または後続の
リクエスト変更後に複数ある動画シャドウのうち 1 つでも一致しなかった場合は、
部分的に編集された文字起こしを保持するのではなく、保持対象のリクエスト本文全体が
省略されます。

観測済みのリクエストでは、モデルのレスポンスが構造化されたキュー境界なしに
文字起こしの任意の部分を引用する可能性があります。そのため、永続化される呼び出しログの
`responseBody` は省略マーカーに置き換えられます。詳細なパイプラインアーティファクト
（アップストリーム/クライアントの本文およびストリームチャンクを含む可能性があります）は
保持されません。そのリクエストでは、セマンティックキャッシュ、冪等性キャッシュ、
および推論リプレイキャッシュの読み取りと書き込みがバイパスされます。プロバイダーへの
リクエストとクライアントから見えるレスポンスは変更されません。詳細なアーティファクトが
省略される場合、早期のキープアライブバイトは一時バッファから排出されます。Kiro の
不正な形式の EventStream に関する警告は、ペイロードのバイト数のみを報告し、その内容や
JSON パーサーの生のエラーは決して報告しません。
これは、無関係なすべてのプロバイダー/プラグイン診断が監査済みであると主張するものでは
ありません。保持対象シンクのより広範な調査は #11658 で追跡されています。

内部の `/api/modality-bridge/video/drilldown` ライフサイクルは、ループバックおよびトークン認証された独立のキャッシュ基盤です。すべての操作には、正規の不透明なプリンシパル ID も必要です。本番環境の呼び出し元を有効にする前に、その ID を認証済みテナントから導出する必要があり、クライアントが選択した値を転送してはなりません。キャッシュキーは、そのプリンシパルを正規のセッション ID および動画参照 ID に結び付け、それらから SHA-256 で導出したキーのみを保存し、読み取りと削除の両方を同一のプリンシパルに限定します。キャッシュはエントリごとに最大 16 個の派生 JPEG フレームを保存し、10 分後に期限切れとします。また、範囲が制限された `start`/`end` 読み取り、または明示的なセッション削除をサポートします。

各プリンシパルは、16 エントリおよび 64 MiB の正規 JPEG データに制限されます。これらの制限は、グローバルな 64 エントリ/256 MiB の上限とは独立しています。プリンシパルのクォータが逼迫した場合、グローバル LRU エビクションを検討する前に、そのプリンシパルの最も長く使用されていないエントリのみを削除します。期限切れのエントリは、キャッシュ操作時にプリンシパルとグローバルの両方の計上から除去されます。一方、キャンセルや検証失敗では、不完全な置換はコミットされません。

キャッシュは、非正規の Base64、過剰なパディング、JPEG 以外のメディア、不正または途中で切れた JPEG、および範囲が制限された全画像の `sharp` デコード中に警告が発生する JPEG を拒否します。受理した各画像を正規の JPEG として再エンコードし、呼び出し元のフィールドを信頼するのではなくデコード済みバイトから幅と高さを導出し、末尾に付加されたポリグロットバイトは保持せず破棄します。範囲が制限された正規の圧縮バッファのみが、両方のクォータに対して計上されます。JSON の通信上限には、32 MiB のデコード済み入力上限に伴う Base64 のオーバーヘッドが含まれます。保存される各派生データには、検証済みの JPEG 形式/解像度、サンプリングポリシー、派生バージョン、作成時刻、サーバーが計算したコンテンツハッシュ、ハッシュ化された親参照、および信頼された呼び出し元による親コンテンツハッシュが記録されます。アトミックなキャッシュコミットの前に、非同期のデコード/ハッシュフェーズ間でキャンセルが確認されます。

このトランシェでは、まだ本番環境のプロデューサーをルートに接続しておらず、複数解像度のバリアント選択も提供していません。そのため、透過的な Video Bridge リクエストパスで追加処理が発生することはありません。一方、テナントに紐付けられたプリンシパルの導出と完全な FU-08 複数解像度ライフサイクルは、完了済みの動作として記載されるのではなく、明示的な後続作業として残されています。

フレームには、設定された Video モデルを使用して順番にキャプションが付けられます。Video のオーバーライドが空の場合は Vision の設定を継承し、両方が空の場合は Vision の自動ルーターが有効な視覚対応モデルを選択します。キャプションの生成に成功すると、元のパートは安定した `[Video description:` プレフィックスを持つテキストに置換されます。このプレフィックスは、そのテキストが信頼できないメディア由来の観測情報であることも示し、メディア内で見つかった指示に従わないよう後段のモデルに伝えます。フレームキャプションのキャッシュキーには、JPEG バイト、プロンプト、タイムスタンプ、および有効なモデルが含まれます。成功したキャプションのみがキャッシュされます。キャッシュエントリには、フォールバックモデルを含め、実際に成功したプロデューサーモデルが保持されます。異なるフレームが異なるモデルによって生成された場合、ブリッジは `mixed` と報告します。キャッシュヒット時は、そのプロデューサーの識別情報を再利用し、要求されたルーティングプランとして再ラベル付けすることはありません。動画全体の結果キャッシュは、出力を変化させるすべての入力、すなわちプロンプト、有効なモデル、サンプリングポリシー、フレーム数、セマンティック解析モード、正規化されたフォーカスヒントの SHA-256 フィンガープリント、フォーカスウィンドウ、`transcript`、`audioTranscript`、およびコンタクトシートフラグをキーとします。そのため、これらの要素のいずれかを変更するとキャッシュミスとなり、古い結果が再利用されることはありません。視覚的重複排除ポリシーのバージョン、しきい値、および上限付きの候補フレーム数も、結果キャッシュのキーとメタデータに明示的に含まれます。したがって、ポリシーの変更によって古い動画全体の説明が再利用されることはありません。結果キャッシュ v4 のメタデータにはモードとフィンガープリントが保持されますが、生のユーザータスクは保持されません。ガードレールのメタデータは、要求された解析モードと有効な解析モードの両方を報告します。使用可能なユーザーテキストがない状態で `focused` モードが要求された場合、有効なモードは `full` として報告されます。

ガードレールは、サポートされているすべての動画パートを抽出しますが、説明する動画の数は `modalityBridgeVideoMaxVideos` を超えません。`supportsVideo === false` であることが確認されたターゲットでは、処理に失敗した動画と上限を超えた動画が明示的で安全なテキストマーカーに変換されるため、生の動画が残ることはありません。機能が不明な場合、それらのパートでは動画キャリアが維持されます。フォールバックのトランスクリプトは、前述の上限付きテキスト変換に従います。`supportsVideo === true` のターゲットはブリッジをバイパスします。クライアントリクエストの中止シグナルは、ダウンロード、ブローカーキュー、サブプロセス、およびキャプション呼び出し全体に伝播します。中止時は動画間で処理が停止し、生のメディアをフェイルオープンで通過させることはありません。

ランタイム設定は DB に保存され、Zod によって検証されます。

| キー                                | デフォルト  | 範囲 / 動作                                                                                               |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | オプションのランタイム、オプトイン方式                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` は汎用キャプションを維持し、`focused` は範囲を限定した信頼できない最新のユーザーコンテキストを使用 |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge モデルを継承                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware`、または比例配分の `segment_aware`。検出器の障害時は `uniform` にフォールバック   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                            |

永続化された従来の Video タイムアウト値が 120 秒を超えている場合は、
ブローカーのデッドラインにクランプされます。新しい設定でこの上限を超える値を書き込むと拒否されます。
`GET /api/modality-bridge/video/runtime` では、認証またはランタイムのプロービングより前に、
信頼済みとしてスタンプされたループバックローカリティが必要であり、その後に管理認証が必要です。
返されるのは `available`、サニタイズ済みの FFmpeg/ffprobe バージョン、およびランタイムが
利用できない場合の固定理由のみです。内部抽出エンドポイントは公開アップロード API ではありません。
キューが飽和している場合は `503` と `Retry-After`、呼び出し元が切断した場合は `499`、
固定されたブローカーのデッドラインに達した場合は `504` が返されます。変換済みレスポンスでは、
Vision または Audio セグメントを削除せずに、中央の
`x-omniroute-modality-bridge` ヘッダーへ
`video->text;model=<visionModel>;parts=<videos>` が追加されます。

### PII マスカー（`piiMasker.ts`）

**両方**のステージで実行されます。

- **`preCall`** はペイロードを複製し、`system`、`messages`、`input`、および
  `prompt`（プレーン文字列項目を含む）を走査して、文字列の `content`/`text`
  フィールドに `processPII()`（`@/shared/utils/inputSanitizer` から）を適用します。
  `PII_REDACTION_ENABLED=true` の場合、検出された PII は送信ペイロード内で
  編集されます。これは `INPUT_SANITIZER_MODE`（プロンプトインジェクションポリシーのみを制御）
  とは独立しています。編集がオフの場合、内容を書き換えずに検出数を記録します。
- **`postCall`** はレスポンスをディープクローンし、`sanitizePIIResponse()` に加えて
  Responses API 形式のマスカー（`maskResponsesOutput` — `output_text` および
  `output[].content[].text` を対象）を実行します。編集が行われた場合は、
  変更後のレスポンスが元のレスポンスを置き換えます。

このガードレールは決してブロックせず、注釈（`meta.detections`、
`meta.redacted`）の付加または書き換えのみを行います。

#### タイプごとの選択、カスタムパターン、および検出カウンター

**ダッシュボード → 設定 → セキュリティ → PII マスキング**では、マスキングする_対象_を選択します。
ここでマスキング自体が有効になるわけではありません。有効化は引き続き
`PII_REDACTION_ENABLED`（リクエスト）および
`PII_RESPONSE_SANITIZATION`（レスポンス + SSE）で制御され、どちらもデフォルトではオフです。

- **タイプごとの選択** — 組み込み ID は
  `src/shared/constants/piiTypes.ts`（`PII_BUILTIN_TYPES`）に一覧化されています。
  未設定の場合はすべてのタイプが対象になります（この設定が導入される前と同じ動作）。
  リクエストエンジンの `ssn_us` パターンは `ssn` にマッピングされます。
  テンプレート（Minimal、Standard、Financial、Brazilian、USA、Full）は、
  UI 上のチェックボックスを設定するだけです。
- **カスタムパターン** — 最大 20 個の正規表現またはワイルドカードパターン
  （`*` = 空白以外の文字を最大 64 文字、`?` = 1 文字）を設定できます。
  一致箇所は `[CUSTOM_REDACTED]` になります。すべてのパターンは
  `compilePiiCustomPattern()`（`src/shared/utils/piiCustomPatterns.ts`）を通過します。
  最大 500 文字、フラグは `g i m s u` のみに制限され、コンパイル可能であり、
  `safe-regex`（壊滅的バックトラッキング）の検査に合格し、空文字列や編集プレースホルダーに
  一致してはなりません。検査に失敗したパターンは保存時およびテスト時に拒否され、
  保存済みの行が失敗した場合は、コンパイルされずに実行時にスキップされます。
  カスタムパターンはマスキングがオンの場合にのみ実行されます。
- **検出カウンター** — タイプごとの件数（一致した値そのものは含まない）をメモリ内に保持し、
  再起動時にリセットします（`src/lib/pii/piiDetectionStats.ts`）。
  マスキングがオンの場合にのみ増加します。

設定は `key_value` テーブル（名前空間 `pii_settings`、
`src/lib/db/piiSettings.ts`）に保存され、1 秒間のキャッシュを通じて読み取られます。API：

| メソッド | パス                     | 目的                                                                      |
| -------- | ------------------------ | ------------------------------------------------------------------------- |
| `GET`    | `/api/settings/pii`      | フラグの状態、`enabledTypes`、`customPatterns`、検出カウンター            |
| `PUT`    | `/api/settings/pii`      | `enabledTypes`（`null` = すべて）および/または `customPatterns` を置換    |
| `POST`   | `/api/settings/pii/test` | 最大 8 KB のサンプルに対して 1 つのパターンをドライラン。何も保存されない |

3 つすべてで管理認証が必要であり、Zod
（`src/shared/validation/schemas/piiSettings.ts`）を使用して本文を検証します。

### プロンプトインジェクション（`promptInjection.ts`）

ユーザー提供コンテンツ内の敵対的な構造を検出し、設定済みのポリシーを適用します。
動作は環境変数とコンストラクターオプションによって制御されます。

| 設定             | 環境変数                                                                                                  | デフォルト | 効果                                                                                                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 有効化           | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`     | `false` の場合、ガードレールは処理を短絡します。                                                                                                                                                                        |
| モード           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`     | インジェクションポリシー：`block`、`warn`、または `log`。（後方互換性のため `redact` も受け付けますが、インジェクションテキストは削除されません。リクエストの PII 書き換えは `PII_REDACTION_ENABLED` で制御されます。） |
| ブロックしきい値 | `blockThreshold` オプション / `INPUT_SANITIZER_BLOCK_THRESHOLD`（別名 `INJECTION_GUARD_BLOCK_THRESHOLD`） | `high`     | ブロックに必要な最小重大度。デフォルトでは Medium は監視のみです。                                                                                                                                                      |

**モードの優先順位**（`getMode`）：呼び出し元の `options.mode` →
`INJECTION_GUARD_MODE` の **DB 機能フラグによるオーバーライド**（Dashboard → Settings →
Feature Flags）→ `INJECTION_GUARD_MODE` 環境変数 → `INPUT_SANITIZER_MODE` 環境変数 →
`warn`。したがって、ダッシュボードのオーバーライドは環境変数より優先されるため、Feature
Flags UI から稼働中のガードをリアルタイムで制御できます（再起動不要）。DB の読み取りはフェイルセーフです。
エラーが発生した場合、ガードは環境変数ベースの動作にフォールバックし、
オーバーライドが設定されていない場合の動作は、環境変数のみで解決する場合と同一です。

検出ソース：

1. `@/shared/utils/inputSanitizer` の `sanitizeRequest()`（パイプライン内の
   他の箇所でも使用される共有検出器セット）。
2. 組み込みの `DEFAULT_GUARD_PATTERNS`（現在は `system_override_inline` と
   `markdown_system_block` で、どちらも重大度は `high`）。
3. コンストラクターオプション経由で渡される、任意の `customPatterns`（文字列、正規表現、
   または `{ name, pattern, severity }` レコード）。

`mode === "block"` **かつ**少なくとも 1 件の検出が重大度の
しきい値を満たす場合、`preCall` は `{ block: true, message: "Request rejected:
suspicious content detected" }` を返します。`warn`/`log` モードでは、ガードレールはログを記録しますが、
呼び出しは許可します。レジストリを経由せずにプロンプトを評価する必要がある
呼び出し元向けに、共有ヘルパー `evaluatePromptInjection()` もエクスポートされています。

**スキャン上限（v3.8.20）：**検出器が調査するのは、結合されたプロンプトテキストの
**先頭 16 KB** のみです。`src/shared/utils/inputSanitizer.ts` では
`MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16 384 バイト）です。`detectInjection()` と
`evaluatePromptInjection()` はどちらも、パターンループを実行する前に
`slice(0, MAX_INJECTION_SCAN_BYTES)` を呼び出します。インジェクション指示は入力の先頭付近に置かれるため、
これにより検出能力を低下させることなく、数百 KB のペイロードに対する正規表現の CPU/GC 使用量を
制限できます（#3932、#4041 を参照）。

### 認証情報マスカー（`credentialMasker.ts`）

**両方**のステージで、デフォルトチェーンの最後（優先度 `95`）に実行されます。送信ペイロード
（メッセージ内容、ツール呼び出し引数、ツール結果）**および**プロバイダーのレスポンスから、
既知の API キー／シークレットトークンのパターンをマスキングします。これにより、
プロンプトに貼り付けられた認証情報（またはツール結果から返された認証情報）が、
上流プロバイダーやクライアントに漏洩するのを防ぎます。

- **オプトインのみ**であり、PII マスキングと同じ規約です（Hard Rule #20 に準拠）。
  `settings.credentialRedactionEnabled === true` **または**
  `CREDENTIAL_REDACTION_ENABLED=true` でない限り無効です。無効な場合、ガードレールは何も行いません。
  ブロックも書き換えも一切行いません。
- `redactCredentials()` はペイロード／レスポンスのツリー全体を走査し（`walkValue()`、
  プロトタイプ汚染に対して安全、`WeakSet` により循環参照にも対応）、一致箇所を
  `[REDACTED:<type>]` プレースホルダーに置き換えます。実際に変更された
  ブランチのみを複製します。
- `CREDENTIAL_PATTERNS` は、LLM プロバイダーキー（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS/SaaS トークン（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、決済キー（Stripe、Square）、クラウド
  キー（AWS アクセスキー、Twilio、SendGrid、Mailgun）、秘密鍵／JWT、
  認証情報を含む接続文字列（`mongodb://user:pass@...` など）、および汎用の
  `Authorization`/`x-api-key`/`api-key`/`apikey` ヘッダー値
  パターンを対象とします。ヘッダー形式のキー（`authorization`、`x-api-key`、`api-key`、
  `apikey`）は、汎用テキスト正規表現ではなく構造的にマスキングされます（値のみが対象で、
  `Bearer `/`Basic ` のようなスキームのプレフィックスは保持されます）。
- このガードレールがブロックすることはありません。書き換え（`modifiedPayload` /
  `modifiedResponse`）と注釈付け（`meta.credentialsRedacted`、`meta.count`）のみを行います。

リグレッションガード：`tests/unit/credential-masker-guardrail.test.ts`。

## 基底コントラクト (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true の場合、チェーンを即座に終了する
  message?: string; // ブロック時に通知される
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // リクエストを書き換えるために preCall から返される
  modifiedResponse?: TValue; // レスポンスを書き換えるために postCall から返される
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

ガードレールは、`void`、`{}`、または `{ block: false }` のいずれかを返すことで「変更なし」を示します。`modifiedPayload`/`modifiedResponse` を返すと、チェーンを通って後続のガードレールに渡される値が置き換えられます。
`signal?: AbortSignal` は、呼び出し元のライフサイクルをガードレールに引き継ぎます。リクエストの中断は、意図的なフェイルオープンの例外です。メディアブリッジは処理を停止してクリーンアップを行い、未加工のメディアをサポートしないことが判明しているターゲットに、そのメディアを復元することはありません。

## レジストリ (`registry.ts`)

シングルトンの `guardrailRegistry` は、以下を公開します。

- `register(guardrail)` — ガードレールを追加（または正規化された名前に基づいて置換）し、`priority` の昇順で再ソートします。
- `clear()` / `list()` — 管理用のヘルパーです。
- `runPreCallHooks(payload, context)` — 有効なガードレールを反復処理し、`modifiedPayload` を介してペイロードを順次引き渡し、最初の `block: true` で停止します。
- `runPostCallHooks(response, context)` — レスポンス側で同じ処理を行います。
- `resetGuardrailsForTests({ registerDefaults })` — 状態をクリアし、必要に応じてデフォルトを再登録することで、テストをクリーンに分離します。

どちらのランナーも `{ blocked, payload|response, results, guardrail?, message? }` を返します。ここで `results` は、ガードレールごとの `blocked`、`skipped`、`modified`、`error`、`meta` フィールドを含む `GuardrailExecutionResult` レコードの配列であり、トレースに役立ちます。

### リクエストごとのガードレールの無効化

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` は、現在のリクエストでスキップすべきガードレール名を重複のないリストとして集約します。情報源は以下のとおりです（すべて任意であり、すべてマージされます）。

- `apiKeyInfo.disabledGuardrails`
- リクエスト本文の `disabledGuardrails`（トップレベル）
- リクエスト本文の `metadata.disabledGuardrails`
- ヘッダー `x-omniroute-disabled-guardrails`（またはレガシーの `x-disabled-guardrails`）

値には文字列の配列またはカンマ区切りの文字列を指定できます。名前は小文字のケバブケースに正規化されます（`pii_masker` → `pii-masker`）。結果は `context.disabledGuardrails` を介してレジストリに渡され、レジストリは一致するガードレールをスキップします（`results` 内で `skipped: true`）。

## 実行順序

`src/sse/handlers/chat.ts` および
`open-sse/handlers/chatCore.ts` を通過する各リクエストについて:

1. `resolveDisabledGuardrails(...)` は、API キー、ボディ、
   ヘッダーからスキップリストを構築します。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` は、優先度の昇順で
   ガードレールを実行します:
   - 無効化されたガードレールは `skipped` として記録されます。
   - 各ガードレールの `preCall` は、`modifiedPayload` を介してペイロードを書き換える場合があります。
   - 最初の `block: true` によってチェーンが短絡され、ハンドラーは
     ガードレールによる拒否レスポンスを返します。
3. （書き換えられている可能性のある）ペイロードは、コンボルーティングとアップストリームへの
   ディスパッチに渡されます。
4. レスポンスの構築後、`guardrailRegistry.runPostCallHooks(...)`
   はレスポンスに対して同じチェーンを実行します。ここで `block: true` になると、アップストリームの
   レスポンスは破棄されます。

例外をスローしたガードレールは `error: <message>` として記録され、
`logger.warn` を介してログに記録されますが、チェーンは継続します。これは意図的なフェイルオープン設計です。

## 設定

組み込みガードレールが読み取る環境変数:

| 変数                                  | 使用元                           | 効果                                                                                                                          |
| ------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`               | 検出を完全に無効化するには `false` に設定します。                                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`               | インジェクションポリシー: `warn`、`block`、または `log`。従来の値 `redact` ではインジェクションテキストは書き換えられません。 |
| `INJECTION_GUARD_MODE`                | `prompt-injection`               | インジェクションガードのモード。環境変数を**上書きする** DB 機能フラグでもあります（DB > ENV）。                              |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`               | `MODE=block` が拒否する最小重大度: `high`（デフォルト）、`medium`、または `low`。                                             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`               | `INPUT_SANITIZER_BLOCK_THRESHOLD` の従来のエイリアス。                                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`                     | `true` の場合、リクエスト内の PII が秘匿化されます（インジェクションモードとは独立）。                                        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker`（ダウンストリーム） | レスポンス側のマスカーの動作を制御します。                                                                                    |

Modality Bridge ガードレールは、環境変数ではなく、DB を基盤とする設定
ストア（`getSettings()`）からランタイム設定を読み取ります。Vision の主要キーは
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes`、および
`modalityBridgeCacheMaxEntries` です。従来の
`visionBridge*` キーは、文書化されている 1 サイクル限りの読み取り
フォールバックとしてのみ受け入れられます。ダッシュボードからの書き込みには主要キーが使用されます。デフォルト値とフォールバック
リゾルバーは `src/shared/constants/modalityBridgeDefaults.ts` にあり、従来の
定数は `src/shared/constants/visionBridgeDefaults.ts` に保持されています。

Audio は `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout`、`modalityBridgeAudioMaxClips`、および共有の
`modalityBridgeCache*` 設定を使用します。これらのキーは Modality Bridge スキーマとともに
導入されたため、Audio には従来キーへのフォールバックはありません。

Video は `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos`、および
`modalityBridgeVideoTimeout` と、共有の `modalityBridgeCache*` 設定を使用します。
FFmpeg/ffprobe は任意の運用依存関係であり、
フレームのキャプション生成によってレイテンシとモデルコストが増加するため、デフォルトでは無効になっています。

## カスタムガードレール

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

手順:

1. `BaseGuardrail` を継承する `src/lib/guardrails/myGuardrail.ts` を作成します。
2. `preCall` および/または `postCall` を実装します。
3. インポート時に登録する（`registerDefaultGuardrails` から追加する）か、
   実行時に `guardrailRegistry.register(...)` を呼び出します。レジストリは、
   正規化された名前が同じ既存のガードレールを置き換えます。
4. `tests/unit/` 配下にテストを追加します（既存の例:
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`）。

## テスト

テスト間では `resetGuardrailsForTests()` を使用し、既知の状態から開始します。
空のレジストリから開始し、テスト対象のガードレールのみを登録するには、
`{ registerDefaults: false }` を渡します。Vision Bridge は依存性注入
（`deps.getSettings`、`deps.callVisionModel`）を受け付けます。Audio Bridge も、
設定、ケイパビリティ、STT モデル選択、認証情報チェック、文字起こしについて
同等の差し替えポイントを公開しています。そのため、テストでは DB や
ネットワークにアクセスせずに、両方のフローを実行できます。

## 関連項目

- `src/lib/guardrails/` — 実装
- `src/shared/utils/inputSanitizer.ts` — プロンプトインジェクションと PII マスキングを
  支える共有検出器
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge のデフォルト値と
  強制ブリッジモデルのリスト
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio で共有される実行時のデフォルト値
- `docs/architecture/RESILIENCE_GUIDE.md` — 直交するレイヤー（サーキットブレーカー、クールダウン）
- `docs/reference/ENVIRONMENT.md` — 環境変数の完全なリファレンス

## インジェクションガードのルートカバレッジとレッドチーム（フェーズ 8 · ブロック D）

インジェクションガード（`createInjectionGuard` / `withInjectionGuard`）は、ユーザープロンプトを
受け付けるすべてのルートを対象とします。`INJECTION_GUARD_MODE` に従って動作します（デフォルトの
`warn` = ログのみ、`block` = HTTP 400 `SECURITY_001` を返します）。

| 種類             | ルート                                                                                                                                               | デフォルトモード |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| テキスト（既存） | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| 生成系           | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| データ           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

テキスト抽出（`extractMessageContents`）は、`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` を対象とします。

**レッドチーム（夜間実行、`nightly-llm-security.yml`）:** promptfoo は、
`INJECTION_GUARD_MODE=block` で各ルートが OWASP-LLM コーパスをブロックすることを検証します。
garak はプローブを実行します（シークレットがない場合はスキップします）。
一貫性を保つため、`moderations` も対象に含まれています。ブロックモードの運用者は、
`resolveDisabledGuardrails` を使用してこれを除外できます。

夜間ワークフロー（`.github/workflows/nightly-llm-security.yml`、cron + 手動
ディスパッチ）には、次の 2 つのジョブがあります:

- **`promptfoo-guard`（ブロッキング）** — `INJECTION_GUARD_MODE=block` を指定して
  `promptfoo eval -c promptfooconfig.yaml` を実行します。各敵対的ケース（例:
  「以前の指示をすべて無視せよ…」、DAN 形式のジェイルブレイク）では、
  レスポンスに `error.code === "SECURITY_001"` が含まれること、つまりガードが
  実際にリクエストを拒否したことを検証します。
- **`garak`（参考情報）** — ローカルの OmniRoute インスタンス
  （`http://localhost:20128/v1`）に対して、garak
  `--probes promptinject,dan,leakreplay` を実行します。プロバイダーシークレット
  （`PROMPTFOO_PROVIDER_KEY`）の存在を条件とし、シークレットがない場合は問題なく
  スキップされます。また、末尾に `|| true` が付いているため、CI を失敗させずに
  結果を報告します。

ガードヘルパー（`createInjectionGuard` / `withInjectionGuard`）のカバレッジは、
プロンプトを受け取るすべての `/v1` ルートに及びます。プロンプトテキストは、
`src/shared/utils/inputSanitizer.ts` 内の `extractMessageContents()` によって、
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` から
抽出されます。
