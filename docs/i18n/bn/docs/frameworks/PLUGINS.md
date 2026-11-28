# OmniRoute CLI Plugin System (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute`-এর মূল অংশ পরিবর্তন না করেই এর CLI সম্প্রসারণ করুন। প্লাগইনগুলো `gh extension` বা `kubectl plugin`-এর মতো `omniroute-cmd-*` নামকরণ রীতি অনুসরণ করে।

## দ্রুত শুরু

```bash
# npm থেকে একটি প্লাগইন ইনস্টল করুন
omniroute plugin install stripe

# ডেভেলপমেন্টে থাকা একটি লোকাল প্লাগইন ইনস্টল করুন
omniroute plugin install ./my-plugin

# ইনস্টল করা প্লাগইনগুলোর তালিকা দেখুন
omniroute plugin list

# একটি নতুন প্লাগইনের কাঠামো তৈরি করুন
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## প্লাগইনের গঠন

একটি প্লাগইন হলো `omniroute-cmd-<name>` (অথবা `@scope/omniroute-cmd-<name>`) নামের একটি npm প্যাকেজ।

```
omniroute-cmd-myplugin/
├── package.json     # এতে অবশ্যই "type": "module" এবং "main": "index.mjs" থাকতে হবে
├── index.mjs        # register(program, ctx) এবং ঐচ্ছিক meta এক্সপোর্ট করে
└── README.md
```

### `package.json`

```json
{
  "name": "omniroute-cmd-myplugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.mjs",
  "engines": { "omniroute": ">=4.0.0" },
  "keywords": ["omniroute-plugin", "omniroute-cmd"]
}
```

### `index.mjs`

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "My plugin for OmniRoute",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

## প্লাগইন কনটেক্সট API

`register(program, ctx)`-এ পাঠানো `ctx` অবজেক্ট:

| প্রপার্টি                    | ধরন              | বিবরণ                                                   |
| ---------------------------- | ---------------- | ------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute সার্ভারে প্রমাণীকৃত fetch                     |
| `ctx.emit(data, opts)`       | `function`       | `--output` ফ্ল্যাগ অনুযায়ী table/json/jsonl/csv আউটপুট |
| `ctx.t(key)`                 | `async function` | i18n অনুবাদ অনুসন্ধান                                   |
| `ctx.withSpinner(label, fn)` | `async function` | async fn-কে ora spinner দিয়ে আবৃত করে                  |
| `ctx.baseUrl`                | `string`         | নির্ধারিত বেস URL                                       |
| `ctx.apiKey`                 | `string \| null` | প্রদান করা হলে API key                                  |

## আবিষ্কার

প্লাগইনগুলি থেকে আবিষ্কৃত হয়:

1. `~/.omniroute/plugins/node_modules/<name>/` — যেখানে `omniroute plugin install` প্যাকেজ রাখে (একটি npm `--prefix`, `npm -g` নয়)
2. `~/.omniroute/plugins/<name>/` — হ্যান্ড-কপি করা প্লাগইন ডিরেক্টরি
3. `OMNIROUTE_PLUGIN_PATH` env var — কাস্টম ডিরেক্টরি

সিমলিঙ্ক করা ডিরেক্টরি (npm `plugin install ./dir` এর জন্য কী তৈরি করে) অনুসরণ করা হয়।

উভয়ই** CLI-শুধুমাত্র** . সার্ভার-সাইড প্লাগইন রানটাইম (মার্কেটপ্লেস/`plugin.json` প্লাগইন যা প্রক্সির ভিতরে চলে) এর নিজস্ব ওভাররাইড সহ নিজস্ব স্ক্যানার রয়েছে, `OMNIROUTE_PLUGINS_DIR` — [PLUGIN_MARKETPLACE.md → প্লাগইন ডিরেক্টরি](./PLUGIN_MARKETPLACE.md#plugin-directory) দেখুন। একটি সেট করা অন্যটিকে প্রভাবিত করে না।

লোডিং ত্রুটি ধরা হয় এবং সতর্কতা হিসাবে মুদ্রিত হয় — একটি ভাঙা প্লাগইন কখনই CLI কে ক্র্যাশ করে না।

## নিরাপত্তা

প্লাগইনগুলো `omniroute`-এর মতো একই Node.js প্রসেসের অনুমতি নিয়ে চলে। শুধু বিশ্বস্ত উৎস থেকে প্লাগইন ইনস্টল করুন। `omniroute plugin install` একটি স্পষ্ট সতর্কতা দেখায় এবং `--yes` অথবা ইন্টার্যাক্টিভ নিশ্চিতকরণ প্রয়োজন হয়।

## প্রকাশনা

1. নিশ্চিত করুন যে `package.json`-এ `"keywords": ["omniroute-plugin"]` রয়েছে
2. স্বাভাবিক নিয়মে `npm publish` চালান
3. ব্যবহারকারীরা `omniroute plugin search <query>`-এর মাধ্যমে খুঁজে পাবেন (npm registry-তে অনুসন্ধান করে)

## উদাহরণ প্লাগইন

`meta` + `register()`-সহ একটি ন্যূনতম কার্যকর উদাহরণের জন্য [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) দেখুন।
