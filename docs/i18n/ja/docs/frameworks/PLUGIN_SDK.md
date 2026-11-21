# OmniRoute Plugin SDK (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## クイックスタート

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## APIリファレンス

### `definePlugin(def: PluginDefinition): Plugin`

デフォルトで Plugin オブジェクトを作成するファクトリ関数。

**パラメータ:**

- `name` (文字列、必須) —ケバブケースのプラグイン名
- `priority` (数値、オプション、デフォルト: 100) —低い値が最初に実行されます。
- `enabled` (ブール値、オプション、デフォルト: true) —スタートは有効ですか?
- `onRequest` (関数、オプション) —チャットハンドラーの前に実行されます。
- `onResponse` (関数、オプション) —チャットハンドラの後に実行
- `onError` (関数、オプション) —ハンドラーエラー時に実行

### `blockRequest(response?): BlockingHookResult`

リクエストをブロックし、必要に応じてカスタム応答を返します。

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

リクエスト本文がプロバイダーに到達する前に変更してください。

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

リクエストコンテキストにメタデータを添付します。

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## プラグインコンテキスト (`PluginContext`)

| 分野         | タイプ                    | 説明                          |
| ------------ | ------------------------- | ----------------------------- |
| `requestId`  | `string`                  | 一意のリクエスト識別子        |
| `model`      | `string`                  | 要求されたモデル名            |
| `provider`   | `string`                  | ターゲットプロバイダーID      |
| `body`       | `Record<string, unknown>` | リクエストボディ              |
| `headers`    | `Record<string, string>`  | リクエストヘッダー (注を参照) |
| `metadata`   | `Record<string, unknown>` | 変更可能なメタデータ          |
| `timestamp`  | `number`                  | リクエストのタイムスタンプ    |
| `apiKeyInfo` | `object` (オプション)     | APIキーメタデータ (注を参照)  |

コンテキストはクライアントの資格情報を持ちません。 `authorization`、 `x-api-key`、 `proxy-authorization`および`cookie`ヘッダーは削除され (大文字と小文字は区別されます)、 `apiKeyInfo`キーのメタデータ ( `id`、 `name` 、 `scopes`など) を保持しますが、キーの値やそのフィンガープリント ( `src/lib/plugins/hooks.ts`の`redactPluginContext()` ) は保持しません。これは、 `onRequest`、 `onResponse`および`onError`に適用されます。

## マニフェスト（`plugin.json`）

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### フックの優先度

フックには優先度を設定できます（値が小さいほど先に実行されます）。

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

単純な boolean 値として指定することもできます（デフォルトの優先度は 100）。

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## 許可制度

既定では、プラグインは**サンドボックス化されません**。有効なプラグインは、通常の独立した Node.js 子プロセス（`src/lib/plugins/loader.ts` の `loadPlugin()`）として、OmniRoute と同じ OS ユーザーで動作します。VM コンテキストや Node.js の権限フラグは使われません。プラグインのコードは `node:fs`、`node:child_process`、`fetch` など、任意の Node.js API を使用できます。そのため、OmniRoute ユーザーに権限があるファイル（データディレクトリを含む）の読み書きや、プログラムの実行、ネットワークへのアクセスが可能です。

マニフェストの`requires.permissions` 、 `network`、 `file-read`、 `file-write`、 `env` 、および`exec`を受け入れます。デフォルト設定では、実行時に`env`のみが影響します。

### オプトイン許可モデル (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED`機能フラグ (カテゴリ`security`、**デフォルトではオフになっています**) は、 [Node.js権限モデル](https://nodejs.org/api/permissions.html)(`--permission`、サポートされているすべてのNode.js行: 22.22 +、24 および 26) で各プラグイン プロセスを開始します。フラグは、 `src/lib/plugins/permissionModel.ts`内の`buildPermissionModelArgs()`によってマニフェストから構築されます。このフラグはプラグインがアクティブ化されるときに読み取られるため、変更後にアクティブ化されたプラグインに適用されます。実行中のプラグインを非アクティブにしてからアクティブにして適用します。

プラグイン データ ディレクトリは、プラグイン ルートの隣の`plugin-data/<plugin-name>`です (デフォルトでは`~/.omniroute/plugin-data/<plugin-name>` 、 `getPluginDataDir()`)。フラグをオンにすると、そのパスは`PLUGIN_DATA_DIR`としてプラグインに渡されます。

| 許可         | フラグオフ (デフォルト)                                                                                                                                                                                                                                        | フラグを立てます                                                                                                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| （なし）     | OmniRouteユーザーの完全な権限。                                                                                                                                                                                                                                | ファイルはプラグイン ディレクトリ内でのみ読み取ります。ファイルの書き込み、子プロセス、ワーカー スレッド、ネイティブ アドオン、 WASIはありません。                                                                            |
| `env`        | プラグイン プロセスは、 `PORT`、 `HOSTNAME`、 `TZ`および`TMPDIR`も受け取ります。これがないと、 `PATH`、 `HOME`、 `USER`、 `LANG`、 `LC_ALL`、 `NODE_ENV`、 `PLUGIN_ENTRY`および`PLUGIN_NAME` (さらにWindows上の`SystemRoot`および`windir` ) のみを受信します。 | フラグをオフにした場合と同じです。                                                                                                                                                                                            |
| `file-read`  | なし (宣言のみ)。                                                                                                                                                                                                                                              | プラグイン データ ディレクトリも読み取り可能になります (見つからない場合は作成されます)。                                                                                                                                     |
| `file-write` | なし (宣言のみ)。                                                                                                                                                                                                                                              | プラグイン データ ディレクトリが読み取りおよび書き込み可能 (`--allow-fs-write`) になります。他に書き込み可能なものはありません。                                                                                              |
| `exec`       | なし (宣言のみ)。                                                                                                                                                                                                                                              | 子プロセスは許可されます (`--allow-child-process`)。 Node.js 、 `NODE_OPTIONS`を介して子Node.jsプロセスに許可フラグを渡しますが、他のプログラムは制限なく実行されるため、 `exec`ファイル システムの制限を効果的に解除します。 |
| `network`    | なし (宣言のみ)。                                                                                                                                                                                                                                              | なし。 Node.js権限モデルは送信ネットワーク アクセスを制限しないため、 `network`宣言のままであり、強制されることはありません。                                                                                                 |

フラグをオンにすると、独自のディレクトリ外のファイル (たとえば、親`node_modules`から解決されたモジュール) を読み取ったり、データ ディレクトリ以外の場所に書き込んだり、 `exec`宣言せずにプロセスを生成したりするプラグインが中断されます。フラグを設定しても、プラグインはネットワーク アクセスを維持し、 OmniRouteユーザーとして実行されるため、信頼できるソースのプラグインのみをインストールしてください。

## 設定スキーマ

設定可能な項目を `configSchema` で定義します。

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "外部 API キー" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

フィールド型: `string`、`number`、`boolean`、`select`

フィールドオプション: `default`、`min`、`max`、`enum`、`description`

設定値はデータベースに永続化され、ダッシュボードの設定ページからアクセスできます。

## 組み込みイベント

| イベント          | 発生タイミング                                           | ペイロード                    |
| ----------------- | -------------------------------------------------------- | ----------------------------- |
| `onRequest`       | チャットハンドラーの実行前                               | リクエストコンテキスト        |
| `onResponse`      | チャットハンドラーの実行後                               | レスポンスデータ              |
| `onError`         | ハンドラーエラーの発生時                                 | エラーオブジェクト            |
| `onModelSelect`   | ルーティング用のモデルが選択されたとき                   | モデル情報                    |
| `onComboResolve`  | コンボルーティングが解決されたとき                       | コンボのターゲット            |
| `onRateLimit`     | レート制限に達したとき                                   | 制限情報                      |
| `onQuotaExhaust`  | クォータを使い切ったとき                                 | クォータ情報                  |
| `onProviderError` | プロバイダーがエラーを返したとき                         | エラーの詳細                  |
| `onStreamStart`   | SSE ストリームが開始されたとき                           | ストリーム情報                |
| `onStreamEnd`     | SSE ストリームが終了したとき                             | ストリーム統計                |
| `onInstall`       | プラグインがインストールされたとき                       | `{ name, version, manifest }` |
| `onActivate`      | プラグインが有効化されたとき                             | `{ name, version, manifest }` |
| `onDeactivate`    | プラグインが無効化されたとき                             | `{ name, version, manifest }` |
| `onUninstall`     | プラグインがアンインストールされたとき（ファイル削除前） | `{ name, version, manifest }` |

## 例

### リクエストロガー

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### レートリミッター

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.apiKeyInfo?.id || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minute
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### 応答トランスフォーマー

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
