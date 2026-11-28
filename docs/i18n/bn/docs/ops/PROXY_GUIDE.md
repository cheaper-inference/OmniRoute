# 🌐 OmniRoute Proxy Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **ভৌগোলিক ব্লক এড়িয়ে যান, আপনার পরিচয় সুরক্ষিত রাখুন এবং যেকোনো প্রক্সির মাধ্যমে AI ট্রাফিক রাউট করুন — কোনো জটিল কনফিগারেশন ছাড়াই।**

OmniRoute-এ একটি পূর্ণাঙ্গ প্রক্সি ব্যবস্থাপনা সিস্টেম রয়েছে, যা আপনাকে HTTP, HTTPS অথবা SOCKS5 প্রক্সির মাধ্যমে আপস্ট্রিম AI প্রদানকারীর ট্রাফিক রাউট করতে দেয়। আপনি ব্লক করা অঞ্চলে থাকুন, IP রোটেশনের প্রয়োজন হোক অথবা গোপন ফিঙ্গারপ্রিন্টিং চাইুন — এই নির্দেশিকায় সবকিছু অন্তর্ভুক্ত রয়েছে।

---

## সূচিপত্র

- [কেন প্রক্সি ব্যবহার করবেন?](#why-use-proxies)
- [আর্কিটেকচারের সারসংক্ষেপ](#architecture-overview)
- [৪-স্তরবিশিষ্ট প্রক্সি সিস্টেম](#4-level-proxy-system)
- [প্রক্সি রেজিস্ট্রি (CRUD)](#proxy-registry-crud)
- [1proxy বিনামূল্যের মার্কেটপ্লেস](#1proxy-free-proxy-marketplace)
- [প্রক্সি রোটেশন](#proxy-rotation)
- [শনাক্তকরণ প্রতিরোধ ও গোপনীয়তা](#anti-detection--stealth)
- [আপস্ট্রিম প্রক্সি মোড](#upstream-proxy-modes)
- [ড্যাশবোর্ড UI](#dashboard-ui)
- [API রেফারেন্স](#api-reference)
- [এনভায়রনমেন্ট ভেরিয়েবল](#environment-variables)
- [সমস্যা সমাধান](#troubleshooting)

---

## কেন প্রক্সি ব্যবহার করবেন?

অনেক AI প্রদানকারী ভৌগোলিক অঞ্চলের ভিত্তিতে অ্যাক্সেস সীমাবদ্ধ করে। **রাশিয়া, চীন, ইরান, কিউবা, তুরস্ক** এবং অন্যান্য দেশের ডেভেলপাররা নিম্নলিখিত ধরনের ত্রুটির সম্মুখীন হন:

```
unsupported_country_region_territory
```

এমনকি ব্লক করা অঞ্চলের বাইরেও প্রক্সি বিভিন্ন কাজে উপযোগী:

| ব্যবহারের ক্ষেত্র       | বিবরণ                                                                  |
| ----------------------- | ---------------------------------------------------------------------- |
| **ভৌগোলিক ব্লক এড়ানো** | ব্লক করা দেশগুলো থেকে OpenAI, Anthropic, Codex, Copilot অ্যাক্সেস করুন |
| **IP রোটেশন**           | রেট লিমিটিং এড়াতে একাধিক IP-তে অনুরোধ বিতরণ করুন                      |
| **গোপনীয়তা**           | আপস্ট্রিম প্রদানকারীদের কাছ থেকে আপনার আসল IP লুকিয়ে রাখুন            |
| **কমপ্লায়েন্স**        | নির্দিষ্ট বিচারব্যবস্থার মাধ্যমে ট্রাফিক রাউট করুন                     |
| **পরীক্ষা**             | বিভিন্ন অঞ্চল থেকে আসা অনুরোধ সিমুলেট করুন                             |

---

## আর্কিটেকচারের সারসংক্ষেপ

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute সার্ভার                       │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ প্রক্সি      │    │ প্রক্সি       │    │ প্রক্সি           │  │
│  │ রেজিস্ট্রি   │───▶│ ডিসপ্যাচার    │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (ক্যাশড)      │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy সিঙ্ক │                        │ আপস্ট্রিম         │  │
│  │ (বিনামূল্যের পুল) │                        │ প্রদানকারী API    │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### প্রধান কম্পোনেন্টসমূহ

| কম্পোনেন্ট             | ফাইল                                         | ভূমিকা                                                      |
| ---------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| **প্রক্সি রেজিস্ট্রি** | `src/lib/db/proxies.ts`                      | প্রক্সি এন্ট্রি ও স্কোপ অ্যাসাইনমেন্টের জন্য CRUD           |
| **প্রক্সি ডিসপ্যাচার** | `open-sse/utils/proxyDispatcher.ts`          | ক্যাশিংসহ `undici` ProxyAgent/SOCKS ডিসপ্যাচার তৈরি করে     |
| **প্রক্সি Fetch**      | `open-sse/utils/proxyFetch.ts`               | প্রক্সি ডিসপ্যাচার ইনজেকশনসহ `fetch()` র্যাপ করে            |
| **সেটিংস রুট**         | `src/app/api/settings/proxy/route.ts`        | লিগ্যাসি প্রক্সি কনফিগারেশন API (GET/PUT/DELETE)            |
| **ম্যানেজমেন্ট রুট**   | `src/app/api/v1/management/proxies/route.ts` | রেজিস্ট্রি CRUD API (GET/POST/PATCH/DELETE)                 |
| **1proxy DB**          | `src/lib/db/oneproxy.ts`                     | বিনামূল্যের প্রক্সি মার্কেটপ্লেসের স্থায়ী সংরক্ষণ ব্যবস্থা |

---

## নতুন অ্যাকাউন্টের জন্য ডিফল্ট প্রক্সি অবস্থা

ইন** সেটিংস → প্রক্সি → গ্লোবাল কনফিগারেশন** , ব্যবহার করুন** নতুন সংযোগের জন্য ডিফল্টরূপে প্রক্সি সক্ষম করুন৷** নতুন যোগ করা প্রদানকারী অ্যাকাউন্টের প্রাথমিক প্রক্সি অবস্থা বেছে নিতে।

নতুন সেটিং নতুন যোগ করা প্রদানকারী অ্যাকাউন্টের প্রাথমিক প্রক্সি অবস্থা নিয়ন্ত্রণ করে। এটি বিদ্যমান অ্যাকাউন্ট পরিবর্তন করে না বা গ্লোবাল প্রক্সি সুইচ প্রতিস্থাপন করে না। এর প্রাথমিক মান পূর্ববর্তী আচরণ সংরক্ষণ করে। ডিফল্টরূপে অক্ষম প্রক্সি সহ ভবিষ্যতের অ্যাকাউন্ট তৈরি করতে একবার এটি বন্ধ করুন৷

পছন্দটি বিদ্যমান সেটিংস API মাধ্যমে `defaultNewConnectionProxyEnabled` হিসাবে সংরক্ষণ করা হয়। এটি `true` তে ডিফল্ট হয় যখন সংরক্ষণ করা হয় না। রিস্টার্ট ছাড়াই পরবর্তী নতুন অ্যাকাউন্টগুলির জন্য `false` সংরক্ষণ করা কার্যকর হয়৷ `POST /api/providers` একটি ঐচ্ছিক কঠোর বুলিয়ান `proxyEnabled` গ্রহণ করে; একটি স্পষ্ট `true` বা `false` ক্রিয়েশন ডিফল্টের উপর প্রাধান্য পায়। একটি ডুপ্লিকেট অ্যাকাউন্ট বা OAuth পুনরায় সংযোগে বাদ দেওয়া সেই অ্যাকাউন্টের সংরক্ষিত অবস্থা সংরক্ষণ করে। ব্যক্তিগত অ্যাকাউন্টগুলি তারপরেও সক্ষম বা অক্ষম করা যেতে পারে।

নির্বাচনী প্রদানকারী স্থানান্তরগুলি নতুন অ্যাকাউন্টগুলির জন্য গন্তব্য ইনস্টলেশনের ডিফল্ট ব্যবহার করে এবং বিদ্যমান অ্যাকাউন্টগুলি প্রতিস্থাপন করার সময় গন্তব্য নীতি সংরক্ষণ করে। প্রক্সি টগলগুলি বহনযোগ্য স্থানান্তর ক্ষেত্র নয়৷ সম্পূর্ণ ব্যাকআপ পুনরুদ্ধার এবং ঐতিহাসিক JSON/SQL মাইগ্রেশন তাদের বিদ্যমান পুনরুদ্ধার শব্দার্থকে ধরে রাখে, সংরক্ষিত অ্যাকাউন্ট মান এবং লিগ্যাসি স্কিমা ডিফল্ট সহ; একটি সম্পূর্ণ সেটিংস পুনরুদ্ধারও এই পছন্দটি পুনরুদ্ধার করতে পারে।

এই পছন্দটি একটি প্রক্সি বরাদ্দ করে না বা প্রতিষ্ঠিত করে না যে একটি সুস্থ বা ব্যবহার করা হচ্ছে। প্রকৃত রাউটিং এখনও বিশ্বব্যাপী প্রক্সি সুইচ এবং প্রযোজ্য প্রক্সি কনফিগারেশনের উপর নির্ভর করে। ক্রমাগত অ্যাকাউন্ট ছাড়াই সিন্থেটিক প্রদানকারী, অ্যাকাউন্ট তৈরির আগে OAuth ট্রাফিক, environment/system প্রক্সি, এবং বহিরাগত ব্যাকএন্ডের নেটওয়ার্কিং এর সুযোগের বাইরে।

## ৪-স্তরীয় প্রক্সি সিস্টেম

OmniRoute **চারটি স্বতন্ত্র স্কোপে** প্রক্সি কনফিগারেশন সমর্থন করে, যেগুলো অগ্রাধিকারের ক্রম অনুসারে সমাধান করা হয়:

```
অগ্রাধিকার অনুযায়ী সমাধানের ক্রম (সর্বোচ্চ → সর্বনিম্ন):

  1. 🔵 অ্যাকাউন্ট/কানেকশন প্রক্সি  →  প্রতি API কী / OAuth কানেকশন
  2. 🟡 প্রোভাইডার প্রক্সি          →  প্রতি প্রোভাইডার (যেমন, সমস্ত OpenAI ট্রাফিক)
  3. 🟠 কম্বো প্রক্সি               →  প্রতি কম্বো/রাউটিং কনফিগারেশন
  4. 🟢 গ্লোবাল প্রক্সি             →  সমস্ত ট্রাফিক, সমস্ত প্রোভাইডার
```

### সমাধান কীভাবে কাজ করে

OmniRoute যখন কোনো আপস্ট্রিম প্রোভাইডারের কাছে অনুরোধ পাঠায়, তখন এটি `resolveProxyForConnectionFromRegistry()` কল করে, যা প্রতিটি স্তর ক্রমানুসারে পরীক্ষা করে:

1. **অ্যাকাউন্ট-স্তর** — এই নির্দিষ্ট কানেকশন ID-তে কি কোনো প্রক্সি নির্ধারিত আছে?
2. **প্রোভাইডার-স্তর** — এই প্রোভাইডারের জন্য (যেমন, `openai`) কি কোনো প্রক্সি নির্ধারিত আছে?
3. **গ্লোবাল-স্তর** — কোনো গ্লোবাল প্রক্সি কি কনফিগার করা আছে?
4. **কোনো প্রক্সি নেই** — প্রোভাইডারের সঙ্গে সরাসরি কানেকশন।

প্রথম মিলে যাওয়া কনফিগারেশনটিই ব্যবহৃত হয়। এর অর্থ হলো, আপনি ফলব্যাক হিসেবে একটি গ্লোবাল প্রক্সি সেট করতে পারেন, তবে নির্দিষ্ট প্রোভাইডার বা কানেকশনের জন্য সেটি ওভাররাইড করতে পারেন।

### কোন ট্রাফিক প্রক্সির মাধ্যমে যায়

| ট্রাফিকের ধরন         | প্রক্সির মাধ্যমে যায়? | নোট                                                |
| --------------------- | ---------------------- | -------------------------------------------------- |
| চ্যাট কমপ্লিশন        | ✅                     | সমস্ত `/v1/chat/completions` অনুরোধ                |
| এম্বেডিং              | ✅                     | `/v1/embeddings`                                   |
| ছবি তৈরি              | ✅                     | `/v1/images/generations`                           |
| অডিও (TTS/STT)        | ✅                     | `/v1/audio/*`                                      |
| OAuth টোকেন এক্সচেঞ্জ | ✅                     | `unsupported_country_region_territory` সমাধান করে  |
| কানেকশন পরীক্ষা       | ✅                     | "কানেকশন পরীক্ষা করুন" বোতামটি প্রক্সি ব্যবহার করে |
| টোকেন রিফ্রেশ         | ✅                     | ব্যাকগ্রাউন্ড OAuth নবায়ন                         |
| মডেল সিঙ্ক            | ✅                     | মডেলের তালিকা তৈরি ও আবিষ্কার                      |

---

## প্রক্সি রেজিস্ট্রি (CRUD)

প্রক্সি রেজিস্ট্রি হলো একটি SQLite টেবিল (`proxy_registry`), যেখানে আপনার সব প্রক্সি সংরক্ষিত থাকে। প্রতিটি প্রক্সিতে রয়েছে:

| ফিল্ড      | ধরন     | বিবরণ                                                           |
| ---------- | ------- | --------------------------------------------------------------- |
| `id`       | UUID    | অনন্য শনাক্তকারী                                                |
| `name`     | String  | মানুষের পাঠযোগ্য লেবেল                                          |
| `type`     | String  | প্রোটোকল: `http`, `https`, `socks5`                             |
| `host`     | String  | প্রক্সির হোস্টনেম বা IP                                         |
| `port`     | Integer | পোর্ট নম্বর                                                     |
| `username` | String  | প্রমাণীকরণের ব্যবহারকারীর নাম (সংরক্ষিত অবস্থায় এনক্রিপ্ট করা) |
| `password` | String  | প্রমাণীকরণের পাসওয়ার্ড (সংরক্ষিত অবস্থায় এনক্রিপ্ট করা)       |
| `region`   | String  | ভৌগোলিক অঞ্চলের লেবেল                                           |
| `notes`    | String  | মুক্ত-পাঠ্য নোট                                                 |
| `status`   | String  | `active` অথবা `inactive`                                        |
| `source`   | String  | `manual` অথবা `oneproxy`                                        |

### একটি প্রক্সি তৈরি করা

**ড্যাশবোর্ডের মাধ্যমে:**

1. **Settings → Proxy**-এ যান
2. **Add Proxy**-তে ক্লিক করুন
3. ধরন, হোস্ট, পোর্ট এবং ঐচ্ছিক প্রমাণীকরণ ক্রেডেনশিয়াল পূরণ করুন
4. সংরক্ষণ করুন

**API-এর মাধ্যমে:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### একটি প্রক্সি আপডেট করা

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **নোট:** আপনি স্পষ্টভাবে ফাঁকা নয় এমন প্রতিস্থাপন পাঠানো না পর্যন্ত ক্রেডেনশিয়ালগুলো সংরক্ষিত থাকে। `username`/`password`-এর জন্য ফাঁকা স্ট্রিং পাঠালে সংরক্ষিত মানগুলো অপরিবর্তিত থাকবে।

### একটি প্রক্সি মুছে ফেলা

```bash
# প্রক্সিটি কোনো স্কোপে নির্ধারিত থাকলে ব্যর্থ হবে
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# জোরপূর্বক মুছে ফেলা (অ্যাসাইনমেন্টও সরিয়ে দেয়)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### প্রক্সিগুলোর তালিকা দেখা

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### স্কোপে প্রক্সি নির্ধারণ করা

```bash
# গ্লোবাল স্কোপে নির্ধারণ করুন
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# একটি নির্দিষ্ট প্রোভাইডারে নির্ধারণ করুন
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# একটি নির্দিষ্ট কানেকশন/কীতে নির্ধারণ করুন
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### কার্যকর প্রক্সি নির্ধারণ করা

একটি নির্দিষ্ট কানেকশনের জন্য কোন প্রক্সি ব্যবহৃত হবে তা পরীক্ষা করুন:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

এটি সমাধান করা প্রক্সিটিকে তার স্তর (`account`, `provider`, অথবা `global`) এবং উৎসসহ ফেরত দেয়।

### বাল্ক অ্যাসাইনমেন্ট

একসঙ্গে একাধিক প্রোভাইডার বা কানেকশনে একটি প্রক্সি নির্ধারণ করুন:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### ইমপোর্ট/এক্সপোর্ট

প্রক্সিগুলো **Backup/Restore** সিস্টেমে অন্তর্ভুক্ত থাকে। আপনার OmniRoute কনফিগারেশন এক্সপোর্ট করার সময়:

1. **Dashboard → Settings → Backup**-এ যান
2. **Export**-এ ক্লিক করুন — প্রক্সি রেজিস্ট্রি এবং অ্যাসাইনমেন্টগুলো অন্তর্ভুক্ত থাকবে
3. পুনরুদ্ধার করতে, **Import**-এ ক্লিক করুন এবং ব্যাকআপ ফাইলটি আপলোড করুন

প্রক্সি রেজিস্ট্রি **host+port অনুযায়ী upsert**-ও সমর্থন করে — আপনি আগে থেকেই বিদ্যমান কোনো প্রক্সি (একই হোস্ট ও পোর্ট) ইমপোর্ট করলে, ডুপ্লিকেট তৈরি করার পরিবর্তে সেটি আপডেট করা হয়।

### লিগ্যাসি মাইগ্রেশন

আপনি যদি পুরোনো কোনো সংস্করণে (রেজিস্ট্রি-পূর্ববর্তী) প্রক্সি কনফিগার করে থাকেন, OmniRoute সেগুলো স্বয়ংক্রিয়ভাবে মাইগ্রেট করে:

```
লিগ্যাসি key_value স্টোর → proxy_registry + proxy_assignments
```

আপগ্রেডের পর প্রথমবার চালু হওয়ার সময় এটি একবার ঘটে। পুনরায় চালাতে `migrateLegacyProxyConfigToRegistry({ force: true })` ব্যবহার করুন।

---

## 1প্রক্সি ফ্রি প্রক্সি মার্কেটপ্লেস

> 🆕** [@oyi77](https://github.com/oyi77) দ্বারা অবদান** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (ইস্যু [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute এর সাথে একীভূত হয়** [1 প্রক্সি](https://1proxy-api.aitradepulse.com)** কমিউনিটি প্ল্যাটফর্ম অ্যাক্সেস প্রদান করতে** শত শত বিনামূল্যে, বৈধ প্রক্সি** সারা বিশ্ব থেকে এটি এমন ব্যবহারকারীদের জন্য উপযুক্ত যাদের নিজস্ব প্রক্সি অবকাঠামো নেই৷

### কিভাবে এটা কাজ করে

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **সিঙ্ক** — OmniRoute 1proxy API থেকে বৈধ প্রক্সি নিয়ে আসে
2. **দোকান** — প্রক্সিগুলি `source = 'oneproxy'` সাথে একই `proxy_registry` টেবিলে সংরক্ষিত হয়
3. **ফিল্টার** প্রোটোকল, দেশ, মানের স্কোর দ্বারা — ফিল্টার
4. **ঘোরান** — গুণমান, এলোমেলো, বা অনুক্রমিক কৌশল ব্যবহার করে সেরা প্রক্সি বেছে নিন
5. **অটো-ডিগ্রেড** — ব্যর্থ প্রক্সিরা তাদের মানের স্কোর হ্রাস পায়; থ্রেশহোল্ডের নীচে → নিষ্ক্রিয় হিসাবে চিহ্নিত৷

### প্রক্সি সিঙ্ক করা হচ্ছে

**ড্যাশবোর্ডের মাধ্যমে:**

1. যান** সেটিংস → 1proxy** ট্যাব
2. ক্লিক করুন** "এখনই সিঙ্ক করুন"**
3. পরিসংখ্যান দেখুন: মোট প্রক্সি, সক্রিয় গণনা, গড় গুণমান, দেশ অনুসারে ভাঙ্গন

**API এর মাধ্যমে:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### ফিল্টারিং প্রক্সি

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### প্রক্সি কোয়ালিটি স্কোর

প্রতিটি 1 প্রক্সি প্রক্সি মেটাডেটা সহ আসে:

| মাঠ             | বর্ণনা                                               |
| --------------- | ---------------------------------------------------- |
| `qualityScore`  | 1প্রক্সি বৈধতা থেকে 0-100 রেটিং                      |
| `latencyMs`     | পরিমাপ করা নেটওয়ার্ক লেটেন্সি                       |
| `anonymity`     | `transparent`, `anonymous`, বা `elite`               |
| `googleAccess`  | প্রক্সি Google পরিষেবাগুলি অ্যাক্সেস করতে পারে কিনা৷ |
| `countryCode`   | দুই-অক্ষরের ISO কান্ট্রি কোড                         |
| `lastValidated` | শেষ বৈধতার টাইমস্ট্যাম্প                             |

গুণমানের স্কোর গতিশীলভাবে সমন্বয় করা হয়:

- **ব্যর্থ অনুরোধ** 10 পয়েন্ট দ্বারা স্কোর কমাতে
- **স্কোর ≤ 10 এ নেমে গেছে** → প্রক্সি `inactive` চিহ্নিত করা হয়েছে
- নিষ্ক্রিয় প্রক্সি ঘূর্ণন থেকে বাদ দেওয়া হয়

### ঘূর্ণন কৌশল

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### সার্কিট ব্রেকার

1প্রক্সি সিঙ্কে একটি অন্তর্নির্মিত সার্কিট ব্রেকার রয়েছে:

- পরে** 5 টানা সিঙ্ক ব্যর্থতা** , আরও সিঙ্ক প্রচেষ্টা ব্লক করা হয়েছে
- এর সাথে রিসেট করুন: `resetOneproxyCircuitBreaker()` বা সার্ভার পুনরায় চালু করুন
- সিঙ্ক স্ট্যাটাস `GET /api/settings/oneproxy?action=status` এ উপলব্ধ

### 1 প্রক্সি প্রক্সি সাফ করা হচ্ছে

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## অ্যান্টি-ডিটেকশন ও স্টেলথ

OmniRoute শুধু একটি প্রক্সির মাধ্যমে ট্রাফিক রাউটই করে না — এটি ট্রাফিককে বৈধ বলেও প্রতীয়মান করে:

### TLS ফিঙ্গারপ্রিন্ট স্পুফিং

`wreq-js` ব্যবহার করে ব্রাউজারের মতো TLS ফিঙ্গারপ্রিন্ট তৈরি করে, যা নন-ব্রাউজার TLS হ্যান্ডশেক শনাক্তকারী বট ডিটেকশন সিস্টেমকে এড়িয়ে যায়।

### CLI ফিঙ্গারপ্রিন্ট ম্যাচিং

**CLI ফিঙ্গারপ্রিন্ট টগল** (`Settings → Security`) HTTP হেডার এবং JSON বডি ফিল্ডগুলো পুনর্বিন্যস্ত করে, যাতে সেগুলো নেটিভ CLI বাইনারির (Claude Code, Codex ইত্যাদি) সুনির্দিষ্ট সিগনেচারের সঙ্গে মিলে যায়। এটি প্রক্সির **উপর একটি অতিরিক্ত স্তর হিসেবে** কাজ করে:

```
আপনার IP (ব্লক করা) → প্রক্সি IP (US) → প্রোভাইডার API
                       + TLS স্পুফ
                       + CLI ফিঙ্গারপ্রিন্ট
```

আপনি একই সঙ্গে **IP মাস্কিং** এবং **রিকোয়েস্টের সত্যতা**—উভয় সুবিধাই পান।

### প্রক্সি IP সংরক্ষণ

ড্যাশবোর্ডের রঙভিত্তিক ব্যাজগুলো দেখায় কোন প্রক্সি স্তর সক্রিয় রয়েছে:

| ব্যাজ | স্তর       | অর্থ                                                |
| ----- | ---------- | --------------------------------------------------- |
| 🟢    | গ্লোবাল    | সমস্ত ট্রাফিক এই প্রক্সির মাধ্যমে যায়              |
| 🟡    | প্রোভাইডার | শুধু এই প্রোভাইডারের ট্রাফিক প্রক্সি করা হয়        |
| 🔵    | কানেকশন    | এই নির্দিষ্ট কী/অ্যাকাউন্টটি এই প্রক্সি ব্যবহার করে |

যাচাইয়ের জন্য ব্যাজে রিজলভ করা প্রক্সি IP-ও দেখানো হয়।

---

## আপস্ট্রিম প্রক্সি মোড

CLIProxyAPI প্যাটার্ন ব্যবহারকারী প্রোভাইডারগুলোর জন্য OmniRoute তিনটি আপস্ট্রিম প্রক্সি মোড সমর্থন করে:

| মোড           | বিবরণ                                                          |
| ------------- | -------------------------------------------------------------- |
| `native`      | OmniRoute সরাসরি প্রক্সি রাউটিং পরিচালনা করে (ডিফল্ট)          |
| `cliproxyapi` | একটি বাহ্যিক CLIProxyAPI ইনস্ট্যান্সের কাছে দায়িত্ব অর্পণ করে |
| `fallback`    | প্রথমে নেটিভ চেষ্টা করে, ব্যর্থ হলে CLIProxyAPI ব্যবহার করে    |

প্রতিটি প্রোভাইডারের জন্য কনফিগার করুন:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## ড্যাশবোর্ড UI

### Settings → Proxy ট্যাব

- সমস্ত ট্রাফিকের জন্য **গ্লোবাল প্রক্সি** কনফিগারেশন (একবার সেট করুন)
- **প্রতি-প্রোভাইডার প্রক্সি** ওভাররাইড
- **প্রতি-কানেকশন প্রক্সি** অ্যাসাইনমেন্ট
- কনফিগার করা প্রক্সির মাধ্যমে **কানেকশন পরীক্ষা**
- সক্রিয় প্রক্সি স্তর প্রদর্শনকারী **রঙভিত্তিক ব্যাজ**

### Settings → 1proxy ট্যাব

- বিনামূল্যের প্রক্সি আনতে **Sync Now** বোতাম
- **পরিসংখ্যান কার্ড**: মোট, সক্রিয়, গড় মান, সর্বশেষ সিঙ্ক
- **ফিল্টার**: প্রোটোকল, দেশের কোড, ন্যূনতম মান
- হোস্ট, প্রোটোকল, দেশ, মানের স্কোর, ল্যাটেন্সি, অ্যানোনিমিটি এবং Google অ্যাক্সেসসহ **প্রক্সি টেবিল**
- সফলতা/ব্যর্থতা ট্র্যাকিং এবং ধারাবাহিক ব্যর্থতার সংখ্যা দেখানো **সিঙ্ক স্ট্যাটাস** প্যানেল
- সব 1proxy এন্ট্রি সরাতে **Clear All**

---

## API রেফারেন্স

### প্রক্সি সেটিংস API

| মেথড     | এন্ডপয়েন্ট                                    | বিবরণ                         |
| -------- | ---------------------------------------------- | ----------------------------- |
| `GET`    | `/api/settings/proxy`                          | সম্পূর্ণ প্রক্সি কনফিগ পান    |
| `GET`    | `/api/settings/proxy?level=global`             | গ্লোবাল প্রক্সি পান           |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | প্রোভাইডার প্রক্সি পান        |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | কার্যকর প্রক্সি রিজলভ করুন    |
| `PUT`    | `/api/settings/proxy`                          | প্রক্সি কনফিগ আপডেট করুন      |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | নির্দিষ্ট স্তরের প্রক্সি সরান |

### প্রক্সি রেজিস্ট্রি API

| মেথড     | এন্ডপয়েন্ট                                       | বিবরণ                                  |
| -------- | ------------------------------------------------- | -------------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | সব প্রক্সির তালিকা দেখুন               |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | ID অনুযায়ী প্রক্সি পান                |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | প্রক্সি অ্যাসাইনমেন্ট পান              |
| `POST`   | `/api/v1/management/proxies`                      | প্রক্সি তৈরি করুন                      |
| `PATCH`  | `/api/v1/management/proxies`                      | প্রক্সি আপডেট করুন                     |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | প্রক্সি মুছুন                          |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | জোরপূর্বক মুছুন                        |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | একসঙ্গে অ্যাসাইন করুন                  |
| `GET`    | `/api/v1/management/proxies/assignments`          | অ্যাসাইনমেন্টের তালিকা দেখুন           |
| `GET`    | `/api/v1/management/proxies/health`               | প্রক্সির স্বাস্থ্যসংক্রান্ত পরিসংখ্যান |

### টানেল API

প্রক্সির মাধ্যমে আউটবাউন্ড রাউটিংয়ের পরিবর্তে আপনার OmniRoute ইনস্ট্যান্সকে পাবলিক ইন্টারনেটে (Cloudflare/ngrok/Tailscale) উন্মুক্ত করতে [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) দেখুন। টানেলের REST API `/api/tunnels/{cloudflared,ngrok,tailscale}/*`-এর অধীনে রয়েছে এবং এটি উপরে নথিভুক্ত আউটবাউন্ড প্রক্সি চেইন থেকে স্বতন্ত্র।

### 1proxy API

| মেথড     | এন্ডপয়েন্ট                            | বিবরণ                            |
| -------- | -------------------------------------- | -------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy প্রক্সির তালিকা দেখুন     |
| `GET`    | `/api/settings/oneproxy?action=stats`  | পরিসংখ্যান + সিঙ্ক স্ট্যাটাস পান |
| `GET`    | `/api/settings/oneproxy?action=status` | শুধু সিঙ্ক স্ট্যাটাস পান         |
| `POST`   | `/api/settings/oneproxy`               | সিঙ্ক ট্রিগার করুন               |
| `POST`   | `/api/settings/oneproxy/rotate`        | পরবর্তী প্রক্সিতে রোটেট করুন     |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | একটি মুছুন                       |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | সব মুছুন                         |

### আপস্ট্রিম প্রক্সি API

| মেথড     | এন্ডপয়েন্ট                       | বিবরণ                          |
| -------- | --------------------------------- | ------------------------------ |
| `GET`    | `/api/upstream-proxy/:providerId` | আপস্ট্রিম প্রক্সি কনফিগ পান    |
| `PUT`    | `/api/upstream-proxy/:providerId` | আপস্ট্রিম প্রক্সি মোড সেট করুন |
| `DELETE` | `/api/upstream-proxy/:providerId` | আপস্ট্রিম প্রক্সি কনফিগ সরান   |

---

## এনভায়রনমেন্ট ভেরিয়েবলসমূহ

| ভেরিয়েবল             | ডিফল্ট | বিবরণ                                                               |
| --------------------- | ------ | ------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | SOCKS5 প্রক্সি সমর্থন সক্রিয় করুন (`.env.example`-এ ডিফল্ট `true`) |

---

## সমস্যা সমাধান

### "SOCKS5 প্রক্সি নিষ্ক্রিয়"

আপনার `.env` ফাইলে `ENABLE_SOCKS5_PROXY=true` সেট করুন এবং পুনরায় চালু করুন।

### প্রক্সির মাধ্যমে "socket hang up" ত্রুটি

নিষ্ক্রিয় সংযোগ বিচ্ছিন্ন করে দেয় এমন সস্তা প্রক্সির ক্ষেত্রে এটি স্বাভাবিক। OmniRoute ইতিমধ্যেই নিম্নলিখিত উপায়ে এটি পরিচালনা করে:

- প্রক্সি সংযোগে keep-alive নিষ্ক্রিয় করে (`keepAliveTimeout: 1`)
- pipelining নিষ্ক্রিয় করে (`pipelining: 0`)
- বারবার handshake এড়াতে dispatcher ক্যাশ করে

সমস্যাটি চলতে থাকলে, অন্য কোনো প্রক্সি চেষ্টা করুন অথবা 1proxy rotation ফিচার ব্যবহার করুন।

### OAuth-এর সময় "unsupported_country_region_territory"

OAuth প্রবাহ শুরু করার **আগে** প্রক্সি কনফিগার করা হয়েছে কি না নিশ্চিত করুন। OmniRoute কনফিগার করা প্রক্সির মাধ্যমে OAuth token exchange রাউট করে। প্রথমে একটি global বা provider-level প্রক্সি সেট করুন, তারপর সংযোগ করুন।

### প্রক্সি ব্যবহৃত হচ্ছে না

resolution-এর ক্রম পরীক্ষা করুন:

1. `GET /api/settings/proxy?resolve=your-connection-id` দিয়ে যাচাই করুন
2. প্রক্সির `status` `active` কি না পরীক্ষা করুন (`inactive` নয়)
3. প্রক্সি assignment scope আপনার সংযোগের সঙ্গে মেলে কি না নিশ্চিত করুন

### 1proxy sync ব্যর্থ হচ্ছে

sync status পরীক্ষা করুন:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

যদি `consecutiveFailures >= 5` হয়, তবে circuit breaker ট্রিগার হয়েছে। রিসেট করতে সার্ভার পুনরায় চালু করুন অথবা ম্যানুয়াল রিসেটের জন্য অপেক্ষা করুন।

---

## ডেটাবেস স্কিমা

### `proxy_registry` টেবিল

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' অথবা 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (শুধুমাত্র 1proxy)
  latency_ms INTEGER,                        -- মিলিসেকেন্ড (শুধুমাত্র 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- Google অ্যাক্সেস করা যায়? (1proxy)
  last_validated TEXT,                       -- ISO টাইমস্ট্যাম্প (1proxy)
  country_code TEXT,                         -- ISO 2-অক্ষরের কোড (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` টেবিল

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- provider ID, connection ID অথবা combo ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## প্রক্সির স্বাস্থ্য পরীক্ষা (v3.8.16+)

OmniRoute-এর **proxy fast-fail** ব্যবস্থা (`src/lib/proxyHealth.ts`) দ্রুত TCP সংযোগ পরীক্ষার মাধ্যমে <2s-এর মধ্যে অচল প্রক্সি শনাক্ত করে এবং এরপর প্রতিটি request-এর overhead এড়াতে **ফলাফলটি ক্যাশ করে**।

### এটি যেভাবে কাজ করে

```
Request ──▶ ProxyHealthCache.get(url)
             │
             ├─ Cache hit + fresh?  ──▶ ক্যাশ করা status ফেরত দিন
             │
             └─ Cache miss / stale?  ──▶ host:port-এ TCP সংযোগ করুন
                                          (timeout: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ HEALTH_CACHE_TTL_MS পর্যন্ত ক্যাশ করুন
                                          ──▶ ফলাফল ফেরত দিন
```

এটি না থাকলে, একটি অচল প্রক্সি ব্যর্থ হওয়ার আগে প্রতিটি request-কে সম্পূর্ণ `PROXY_TIMEOUT_MS` সময় ধরে (ডিফল্ট 30s) আটকে রাখত।

### সামঞ্জস্যযোগ্য এনভায়রনমেন্ট ভেরিয়েবলসমূহ

| ভেরিয়েবল                    | ডিফল্ট  | উদ্দেশ্য                                      |
| ---------------------------- | ------- | --------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | প্রতিটি স্বাস্থ্য পরীক্ষার TCP সংযোগ timeout  |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | স্বাস্থ্য পরীক্ষার ফলাফল কতক্ষণ ক্যাশ করা হবে |

**প্রস্তাবিত মানসমূহ:**

| পরিস্থিতি                      | Fast-fail timeout | Cache TTL | যুক্তি                                                                       |
| ------------------------------ | ----------------- | --------- | ---------------------------------------------------------------------------- |
| উচ্চ-throughput API gateway    | 1500ms            | 60000ms   | আক্রমণাত্মক fail-fast, পরীক্ষা কমাতে দীর্ঘতর cache                           |
| ভৌগোলিকভাবে বিতরণকৃত node      | 3000ms            | 15000ms   | ধীরগতির network-এর আরও সময় প্রয়োজন; দ্রুত failover-এর জন্য সংক্ষিপ্ত cache |
| ডেভেলপমেন্ট / পরীক্ষা          | 1000ms            | 10000ms   | স্থানীয় প্রক্সিতে দ্রুত iteration                                           |
| গোপনীয়তা / শনাক্তকরণ প্রতিরোধ | 2500ms            | 45000ms   | rate limit ট্রিগার করতে পারে এমন দ্রুত probing এড়ান                         |

### প্রক্সির স্বাস্থ্য পরিদর্শন

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// নির্দিষ্ট একটি প্রক্সি জোরপূর্বক পুনরায় পরীক্ষা করুন
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

cache entry-এর সময়সীমা `HEALTH_CACHE_TTL_MS` অতিক্রম করলে `stale` flag-এর মান `true` হয় এবং পরবর্তী request একটি নতুন পরীক্ষা ট্রিগার করবে।

### প্রতিটি প্রক্সি টাইপের ডিফল্ট

স্বাস্থ্য পরীক্ষা URL scheme-এর ভিত্তিতে উপযুক্ত ডিফল্ট ব্যবহার করে:

| Scheme                     | ডিফল্ট port |
| -------------------------- | ----------- |
| `http://`                  | 8080        |
| `https://`                 | 443         |
| `socks5://` / `socks5h://` | 1080        |

URL-এর custom port (`http://host:9999`) সবসময় scheme-এর ডিফল্টের তুলনায় অগ্রাধিকার পায়।

---

## প্রক্সি অ্যানালিটিক্স ও পর্যবেক্ষণযোগ্যতা

অপারেটরদের রাউটিং প্যাটার্ন, ল্যাটেন্সির আকস্মিক বৃদ্ধি এবং পুনরাবৃত্ত ব্যর্থতা নির্ণয়ে সহায়তা করতে OmniRoute প্রতিটি প্রক্সির ব্যবহার ট্র্যাক করে।

### কী কী ট্র্যাক করা হয়

কনফিগার করা প্রক্সির মধ্য দিয়ে যাওয়া প্রতিটি অনুরোধের জন্য OmniRoute নিম্নলিখিত তথ্য রেকর্ড করে:

| মেট্রিক      | বিবরণ                                                          |
| ------------ | -------------------------------------------------------------- |
| `proxy_url`  | সম্পূর্ণ প্রক্সি URL (প্রমাণীকরণ ক্রেডেনশিয়াল মাস্ক করা থাকে) |
| `provider`   | আপস্ট্রিম প্রোভাইডার ID (openai, anthropic ইত্যাদি)            |
| `latency_ms` | প্রক্সি হ্যান্ডশেকসহ মোট রাউন্ড-ট্রিপ সময়                     |
| `connect_ms` | শুধু TCP সংযোগের সময়                                          |
| `status`     | আপস্ট্রিম থেকে পাওয়া HTTP স্ট্যাটাস কোড                       |
| `error`      | অনুরোধ ব্যর্থ হলে ত্রুটির শ্রেণি                               |
| `timestamp`  | ISO 8601 UTC                                                   |

### ডেটা অ্যাক্সেস করা

```bash
# সাম্প্রতিক প্রক্সি ইভেন্ট
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

প্রকৃত এন্ডপয়েন্ট হলো `/api/usage/proxy-logs` (`src/app/api/usage/proxy-logs/route.ts` দেখুন)। এই এন্ডপয়েন্ট সমর্থন করে:

- `GET /api/usage/proxy-logs` — প্রক্সি লগ সংগ্রহ করুন
- `DELETE /api/usage/proxy-logs` — সব প্রক্সি লগ মুছুন

প্রয়োজন হলে SQL-এর মাধ্যমে সরাসরি `proxy_logs` টেবিল থেকে সমষ্টিগত পরিসংখ্যান কোয়েরি করা যায়। ড্যাশবোর্ড UI-তে সমষ্টিগত ভিউ থাকতে পারে।

### সাধারণ প্যাটার্ন

**একটি অস্থিতিশীল প্রক্সি শনাক্ত করুন** (পর্যায়ক্রমে সফল/ব্যর্থ হয়):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**ধীরগতির প্রক্সি খুঁজুন** (p95 ল্যাটেন্সি > 2s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## রোটেশন কৌশল নির্বাচনের সিদ্ধান্ত-বৃক্ষ

একটি স্কোপে একাধিক প্রক্সি নির্ধারিত থাকলে, প্রতিটি অনুরোধের জন্য কোনটি ব্যবহার করা হবে তা বেছে নিতে OmniRoute একটি **রোটেশন কৌশল** ব্যবহার করে। কৌশলটি স্কোপ স্তরে কনফিগার করা হয় (গ্লোবাল, প্রতি-প্রোভাইডার, প্রতি-অ্যাকাউন্ট, প্রতি-কম্বো)।

### উপলভ্য কৌশলসমূহ

| কৌশল               | কখন ব্যবহার করবেন                 | আপস                                                                                     |
| ------------------ | --------------------------------- | --------------------------------------------------------------------------------------- |
| `quality` (ডিফল্ট) | বিভিন্ন মানের প্রক্সিসহ প্রোডাকশন | উচ্চ রেটিং পাওয়া প্রক্সিকে অগ্রাধিকার দেয়; কম রেটিং পাওয়া প্রক্সি অনাহারে থাকতে পারে |
| `random`           | লোড বিতরণ, গোপনীয়তা              | সমান বিতরণ; মানসংক্রান্ত সংকেত উপেক্ষা করে                                              |
| `sequential`       | ডিবাগিং, নির্ধারণমূলক পরীক্ষা     | ক্রমানুসারে প্রক্সিগুলোর মধ্যে আবর্তিত হয়; বোঝা সহজ                                    |

### সিদ্ধান্ত-বৃক্ষ

```
                    আপনার প্রক্সিগুলোর জন্য কি মানের স্কোর আছে?
                    │
        ┌───────────┴───────────┐
        │                       │
       হ্যাঁ                    না
        │                       │
   সব প্রক্সি কি               │
   মানের দিক থেকে                │
   প্রায় সমান?                 │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  হ্যাঁ      না               ব্যবহার করুন
   │         │              `random`
   │         │              (সমান বিতরণ
   │         │              সময়ের সঙ্গে মানের
   │         │              ডেটা তৈরি করে)
   │         │
   │    ব্যবহার করুন `quality`
   │    (মিশ্র মানের জন্য
   │    সর্বোত্তম)
   │
ব্যবহার করুন `random`
(লোড সমানভাবে
বিতরণ করুন)
```

## আপনার নিজের প্রক্সির জন্য স্বয়ংক্রিয় ব্যর্থতা বর্জন

1প্রক্সি মার্কেটপ্লেস পুল ইতিমধ্যেই ব্যর্থ প্রক্সিগুলিকে স্বয়ংক্রিয়ভাবে অবনমিত করে ( [প্রক্সি কোয়ালিটি স্কোর](#proxy-quality-scores) দেখুন)। প্রক্সিদের জন্য** আপনি** রেজিস্ট্রিতে যোগ করা হয়েছে, ব্যাকগ্রাউন্ড হেলথ শিডিউলার (`src/lib/proxyHealth/scheduler.ts`) একই "একজন মৃত সদস্যকে স্বয়ংক্রিয়ভাবে চেইন থেকে বাদ দিন" আচরণ প্রদান করে, কিছু মুছে না দিয়ে:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

এটি একটি মাল্টি-প্রক্সি চেইনে কীভাবে ফিট করে:

1. শিডিউলার প্রতিটি `PROXY_HEALTH_INTERVAL_MS` প্রতিটি নিবন্ধিত প্রক্সি পরীক্ষা করে (ডিফল্ট 10 মিনিট; সর্বনিম্ন 1 মিনিট)।
2. পরপর `PROXY_AUTO_REMOVE_AFTER`** চূড়ান্ত** ব্যর্থতা (একটি সত্যিকারের সংযোগ ব্যর্থতা — একটি টাইমআউট বা প্রোবের টার্গেটের নিজস্ব 5xx কখনই গণনা করা হয় না, [প্রক্সি হেলথ চেকিং](#proxy-health-checking-v3816) দেখুন), প্রক্সির `status` `dead` এ সেট করা হয়েছে।
3. `dead` হল pool/rotation রেজোলিউশন দ্বারা ব্যবহৃত লাইভ-স্ট্যাটাস ফিল্টার বাদ দেওয়া অবস্থাগুলির মধ্যে একটি, তাই একটি স্কোপের ঘূর্ণন (রাউন্ড-রবিন / র্যান্ডম / স্টিকি / লেটেন্সি / সেশন — দেখুন [রোটেশন স্ট্র্যাটেজি ডিসিশন ট্রি](#rotation-strategy-decision-tree) ) অবিলম্বে সেই প্রক্সিটিকে নতুন অনুরোধে হস্তান্তর করা বন্ধ করে দেয়৷ পুলের অন্য কোন প্রক্সি প্রভাবিত হয় না, এবং পুরো পুলটি কখনই নিঃশব্দে সরাসরি সংযোগে ফিরে আসে না — [4-লেভেল প্রক্সি সিস্টেম](#4-level-proxy-system) ব্যর্থ-বন্ধ গার্ড দেখুন।
4. The scheduler keeps probing `dead` proxies on the same interval. The next successful probe flips `status` back to `active` and it re-enters rotation — no manual re-add required.

এটা ইচ্ছাকৃতভাবে** অপ্ট-ইন এবং অ-ধ্বংসাত্মক** : ডিফল্টরূপে সময়সূচী শুধুমাত্র ব্যর্থতা গণনা করে এবং লগ করে ( `decision.ts` তে নীতি C দেখুন), এবং `PROXY_AUTO_DISABLE` কখনই একটি সারি — মুছে দেয় না যার জন্য আলাদা, আরও আক্রমনাত্মক `PROXY_AUTO_REMOVE` পতাকা। যদি উভয়ই `true` তে সেট করা থাকে, `PROXY_AUTO_REMOVE` জিতবে (একটি প্রক্সি মুছে ফেলা হবে তার মধ্যে একটি সফ্ট-অক্ষম করার জন্য কোন ব্যবহার নেই)। সম্পূর্ণ পরিবর্তনশীল তালিকার জন্য [পরিবেশ কনফিগার](../reference/ENVIRONMENT.md) রেফারেন্স দেখুন।

---

> 📖** সম্পর্কিত ডকুমেন্টেশন:**
>
> - [ব্যবহারকারীর নির্দেশিকা](../guides/USER_GUIDE.md) — সাধারণ সেটআপ এবং কনফিগারেশন - [API রেফারেন্স](../reference/API_REFERENCE.md) — সম্পূর্ণ API ডকুমেন্টেশন - [এনভায়রনমেন্ট কনফিগার](../reference/ENVIRONMENT.md) — সমস্ত পরিবেশ ভেরিয়েবল
