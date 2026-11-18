# Custom JSON API provider nodes (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

カスタムJSON APIノードは、 OpenAIまたはAnthropicプロトコルを使用しないJSONビジネス エンドポイントに接続します。 OmniRoute 、 JSONリクエスト テンプレートを入力し、完全なエンドポイントURLに送信し、応答パスから応答を読み取り、クライアント独自の形式 (チャット完了、応答、メッセージなど) でクライアントに返します。

これは、 `apiType: "custom-json"`を備えた OpenAI 互換ノードです。その ID の形式は`openai-compatible-custom-json-<suffix>`です。ダッシュボード フォームはまだ利用できません。以下のプロバイダー ノードAPIを通じてこれらのノードを作成および編集します。

## ノードを作成する

`POST /api/provider-nodes` (管理認証):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl`は**完了**エンドポイントURL。何も追加されず ( `/chat/completions`、 `/models`もなし)、他の OpenAI 互換ノードとは異なり、デフォルトのURLはありません。これは、埋め込み資格情報または`#fragment`持たない`http(s)`である必要があり、ノードの保存時とすべてのリクエストの両方で、すべてのプロバイダー ノードと同じアウトバウンドURLガードを渡します。
- 接続キー (`authType` `bearer`または`api-key`、デフォルトを含む) を送信するノードは、 `https://`を使用する必要があります。プレーン`http://`は、ループバック ホスト (`localhost`、 `127.0.0.0/8`、 `::1`) またはキーを送信しない`authType: "none"`でのみ受け入れられます。プライベートLANアドレス (`10.x`、 `172.16-31.x`、 `192.168.x`) は除外されません。そのネットワーク上の誰もがキーを読み取ることができます。このようなノードの保存は`400`で失敗し、以前に保存されたノードは、リクエストが送信される前に、同じメッセージを持つすべてのリクエストでフェイルクローズされます。 LAN上のキー付きエンドポイントの場合は、 TLS背後に配置します (リバース プロキシなど)。
- `customJson`はZodで検証されます。不明なキーは拒否されます。すべてのフィールドはオプションです。

| 分野              | 価値観                                | デフォルト                                             |
| ----------------- | ------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`           | `bearer`                                               |
| `authHeader`      | `api-key`のときに使用されるヘッダー名 | `X-API-Key`                                            |
| `requestTemplate` | JSONオブジェクト (≤ 64 KB、深さ≤ 32)  | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | フィールド パス、または本体全体の`$`  | `choices[0].message.content`                           |

- シークレットは接続のAPIキーに残り、テンプレートには決して残りません。 `bearer` `Authorization: Bearer <key>`を送信します。 `api-key` `<authHeader>: <key>`を送信します。 auth ヘッダーには、 `Host`、 `Content-Type`、 `Content-Length`、 `Connection`、 `Transfer-Encoding`、 `Authorization`、 `Cookie`またはホップバイホップ ヘッダーを使用することはできません。 `none`を使用すると、接続にキーは必要ありません。
- 追加の静的ヘッダーは、ノードの通常の`customHeaders`を使用します (互換性のある他のすべてのノードと同じ検証。そこでは認証ヘッダーは許可されません)。

`PUT /api/provider-nodes/<id>` accepts the same `customJson` and rewrites `baseUrl` and the config on every existing connection of the node. Omitting `customJson` keeps the stored config; switching `apiType` to `chat` or `responses` removes it from the node and its connections.

次に、通常どおりノードに接続を追加し (ノード ID を指定した`POST /api/providers` )、 `<prefix>/<model>`(たとえば`biz/assistant-v1`をリクエストします。エンドポイントはモデル リストを公開しないため、モデル ID を手動で追加します。

## リクエストテンプレート

テンプレートはプレーンなJSONです。文字列値には`{{placeholder}}`マーカーが含まれる場合があります。何も評価または実行されず、オブジェクト キーが置換されることはありません。

| プレースホルダー     | 価値                                                               |
| -------------------- | ------------------------------------------------------------------ |
| `{{prompt}}`         | 最新のユーザーメッセージのテキスト（改行で結合されたテキスト部分） |
| `{{messages}}`       | OpenAIチャット形式での会話                                         |
| `{{model}}`          | リクエストされたモデル ID (プロバイダー プレフィックスなし)        |
| `{{stream}}`         | 常に`false` —エンドポイントは 1 つのJSONドキュメントで応答します   |
| `{{request.<path>}}` | 翻訳された (OpenAIチャット形式) リクエストのフィールド             |

- 正確に 1 つのプレースホルダーである値は、そのJSON型を維持します (`"{{messages}}"`配列になります)。長い文字列内のプレースホルダーはテキストとして挿入されます。
- 何も解決されないプレースホルダーは、不完全なペイロードを送信する代わりに、 HTTP 400 でリクエストを失敗させます。
- パスではドット表記と数値インデックス (`data.items[0].text`) が使用されます。 `__proto__`、 `prototype`および`constructor`はキーとパスで拒否されます。

## 応答

`responsePath`の値はアシスタント応答になります。文字列は通過し、他のJSON値はシリアル化されます。欠落しているフィールドまたは`null`フィールド、またはJSONではない本体は、 HTTP 502 を返します。アップストリーム エラー ステータスは渡されます。ストリーミング クライアントの場合、 OmniRoute JSON応答全体を待ってから、それを 1 つのコンテンツ チャンクと終了チャンクとして出力します。これはトークン ストリーミングではありません。ツール呼び出しと使用フィールドはマップされません。

## 二度と再生されない

ビジネス リクエストは、失敗した場合でも副作用が生じる可能性があります。したがって、 OmniRouteそれを 1 回送信します。

- トランスポートの再試行やリダイレクトのフォローはありません。
- 別の接続での再試行は行われません (アカウント フォールバック) —失敗はそのまま返され、接続は冷却されません。
- 空の応答または失敗した応答であっても、次のコンボ ターゲットへのフォールバックはありません。

個別のクライアント リクエスト、および複数のモデルを明示的に呼び出す融合パネルでも、エンドポイントは個別に呼び出されます。

## ノードのテスト

接続、接続の保存**テスト**ボタンとバックグラウンドのヘルスチェックはエンドポイントを呼び出すことはありません。保存された構成を検証し、接続が検証不可能であると報告するだけです。

`POST /api/provider-nodes/validate`と`"apiType": "custom-json"`およびノード フィールド (`baseUrl`、 `apiKey`、 `customJson`、オプションの`customHeaders`および`modelId`) は、 `ping`を最新のユーザー テキストとして、実際のリクエストを 1 つだけ送信します。 `{ "valid": true }`または上流のステータスに応答します (上流の本体ではありません)。

## ストレージ

構成は`provider_nodes.custom_json_config_json` (移行`240_provider_node_custom_json_config.sql`) に保存され、各接続の`providerSpecificData.customJson`にコピーされます。

実装: `open-sse/utils/customJson.ts` (検証およびテンプレート)、 `open-sse/executors/customJson.ts` (エグゼキュータ)、 `open-sse/services/combo/noReplayLatch.ts`および`src/sse/handlers/chat/responsePolicies.ts` (リプレイなし)。
