# 🗜️ Prompt Compression Guide — OmniRoute (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> উপযুক্ত কনটেক্সটে স্বয়ংক্রিয়ভাবে 15-95% সাশ্রয় করুন। দ্রুত ধারণা পেতে [README-এর Compression বিভাগ](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) দেখুন।

## সংক্ষিপ্ত বিবরণ

OmniRoute একটি মডিউলার প্রম্পট কম্প্রেশন পাইপলাইন বাস্তবায়ন করে, যা অনুরোধগুলো আপস্ট্রিম প্রোভাইডারের কাছে পৌঁছানোর **আগেই সক্রিয়ভাবে** চলে। অর্থাৎ, আপনার টোকেন সাশ্রয় স্বচ্ছভাবে ঘটে — ওয়ার্কফ্লোতে কোনো পরিবর্তনের প্রয়োজন নেই।

```
ক্লায়েন্টের অনুরোধ
  → কম্প্রেশন কৌশল নির্বাচক
    → কম্বো ওভাররাইড আছে? → কম্বো সেটিং ব্যবহার করুন
    → স্বয়ংক্রিয় ট্রিগার থ্রেশহোল্ড পূরণ হয়েছে? → স্বয়ংক্রিয় মোড ব্যবহার করুন
    → ডিফল্ট মোড আছে? → গ্লোবাল সেটিং ব্যবহার করুন
    → বন্ধ? → কম্প্রেশন এড়িয়ে যান
  → নির্বাচিত কম্প্রেশন মোড
    → বন্ধ: কোনো কম্প্রেশন নয়
    → Lite: নিরাপদ হোয়াইটস্পেস/ফরম্যাটিং পরিষ্কারকরণ (~15%)
    → Standard: টেলিগ্রাফিক ভাষায় অপ্রয়োজনীয় শব্দ অপসারণ (~30%)
    → Aggressive: ইতিহাসের পুরোনো অংশ সংকোচন + সারসংক্ষেপ (~50%)
    → Ultra: হিউরিস্টিক ছাঁটাই + কোড ব্লক পাতলা করা (~75%)
    → RTK: কমান্ড-সচেতন টার্মিনাল/টুল-আউটপুট ফিল্টারিং (আপস্ট্রিমে 60-90% পরিসর)
    → Stacked: ক্রমানুসারী মাল্টি-ইঞ্জিন পাইপলাইন, সাধারণত প্রথমে RTK, পরে Caveman (উপযুক্ত ক্ষেত্রে 78-95% পরিসর)
  → সংকুচিত অনুরোধ → প্রোভাইডার
```

---

## কম্প্রেশন মোড

### বন্ধ (Off)

কোনো কম্প্রেশন প্রয়োগ করা হয় না। সকল মেসেজ অপরিবর্তিত অবস্থায় পাস হয়।

### লাইট মোড (Lite) (~15% সঞ্চয়, <1ms লেটেন্সি)

সবচেয়ে নিরাপদ মোড — শূন্য সিমান্টিক পরিবর্তন, শুধুমাত্র ফরম্যাটিং পরিষ্কার:

| কৌশল                     | বর্ণনা                                       |
| ------------------------ | -------------------------------------------- |
| `collapseWhitespace`     | পরপর ফাঁকা লাইন এবং পেছনের স্পেস একত্রিত করে |
| `dedupSystemPrompt`      | ডুপ্লিকেট সিস্টেম মেসেজ সরিয়ে দেয়          |
| `compressToolResults`    | ভার্বোজ টুল/ফাংশন আউটপুট কম্প্রেস করে        |
| `removeRedundantContent` | পুনরাবৃত নির্দেশনা বাদ দেয়                  |
| `replaceImageUrls`       | base64 ইমেজ ডেটা URI সংক্ষিপ্ত করে           |

**কোন ক্ষেত্রে উপযুক্ত:** সবসময় চালু রাখার ব্যবহার, নিরাপত্তা-সংবেদনশীল ওয়ার্কফ্লো।

### স্ট্যান্ডার্ড মোড (Standard) (~30% সঞ্চয়)

[Caveman](https://github.com/JuliusBrussee/caveman) দ্বারা অনুপ্রাণিত — অর্থ বজায় রেখে ফিলার শব্দ এবং ভার্বোজ বাক্যাংশ সরিয়ে দেয়:

- ফিলার শব্দ সরিয়ে দেয় ("please", "I think", "basically", "actually")
- ভার্বোজ বাক্যাংশ সংক্ষেপ করে ("in order to" → "to", "as a result of" → "because")
- ভদ্র দ্বিধান্তরিত বাক্যাংশ বাদ দেয় ("Would you mind...", "If you could possibly...")
- কোডিং প্রম্পটের জন্য টিউন করা 30+ রেজেক্স রুল

**কোন ক্ষেত্রে উপযুক্ত:** দৈনন্দিন কোডিং ওয়ার্কফ্লো, খরচ-সচেতন টিম।

### অ্যাগ্রেসিভ মোড (Aggressive) (~50% সঞ্চয়)

দীর্ঘ সেশনের জন্য স্মার্ট হিস্টরি ম্যানেজমেন্ট:

- **মেসেজ এজিং** — পুরনো মেসেজগুলো ক্রমান্বয়ে কম্প্রেস হয়
- **টুল রেজাল্ট কম্প্রেশন** — লম্বা টুল আউটপুট ছাঁটা বা বাদ দেওয়া হয় (প্রথম/শেষ লাইন,
  ম্যাচ-লাইন ফিল্টারিং, JSON key সংকোচন)
- **স্ট্রাকচারাল ইন্টেগ্রিটি গার্ড** — `tool_use` + `tool_result` জোড়া সামঞ্জস্যপূর্ণ থাকে তা নিশ্চিত করে
- **কনটেক্সট উইন্ডো সচেতনতা** — প্রতি-মডেল টোকেন সীমা মেনে চলে

**কোন ক্ষেত্রে উপযুক্ত:** দীর্ঘায়িত ডিবাগিং সেশন, বড় কোডবেস।

### আলট্রা মোড (Ultra) (~75% সঞ্চয়)

টোকেন-সংকটপূর্ণ পরিস্থিতির জন্য সর্বোচ্চ কম্প্রেশন:

- **হিউরিস্টিক প্রুনিং** — গদ্যের স্কোর-ভিত্তিক টোকেন প্রুনিং
- **স্ট্রাকচার সংরক্ষণ** — fenced code block, inline code, URL এবং identifier-গুলো
  tombstone করা হয় এবং হুবহু পুনঃসংযোজন করা হয়, কখনো প্রুন করা হয় না
- **ঐচ্ছিক SLM স্তর** — কনফিগার করা হলে একটি ছোট লোকাল মডেল প্রুন পরিমার্জন করতে পারে
- অ্যাগ্রেসিভ মোড থেকে স্বাধীন: এটি মেসেজ এজিং, টুল-রেজাল্ট কম্প্রেশন
  বা ফলব্যাক সামারাইজার চালায় না (শুধুমাত্র SLM-স্তর ব্যর্থতা একটি ফলব্যাক পাস
  অ্যাগ্রেসিভের মাধ্যমে রুট করতে পারে)

**কোন ক্ষেত্রে উপযুক্ত:** যখন আপনি বারবার কনটেক্সট সীমায় পৌঁছে যাচ্ছেন।

### RTK মোড (60-90% আপস্ট্রিম পরিসীমা)

RTK মোড কোডিং-এজেন্ট সেশনে দেখা যায় এমন ভার্বোজ টুল আউটপুটের জন্য অপ্টিমাইজ করা:

- `git status`, `git diff`, `git log`, টেস্ট রানার,
  TypeScript/Vite/Webpack বিল্ড, ESLint/Biome/Prettier, npm audit/install, Docker লগ, ইনফ্রা
  আউটপুট এবং জেনেরিক শেল আউটপুটের মতো কমান্ড/আউটপুট শ্রেণী শনাক্ত করে
- `open-sse/services/compression/engines/rtk/filters/` থেকে JSON ফিল্টার প্যাক প্রয়োগ করে
- প্রজেক্ট বা গ্লোবাল `filters.toml` ফাইল থেকে RTK TOML schema v1 ফিল্টার ইমপোর্ট করে, ইনলাইন-টেস্ট
  যাচাইকরণ এবং প্রজেক্ট ফাইলের জন্য ট্রাস্ট-গেটিং সহ
- ইনলাইন ভেরিফাই স্যাম্পল সহ 56টি বিল্ট-ইন ফিল্টার সরবরাহ করে
- ANSI কন্ট্রোল সিকোয়েন্স, প্রোগ্রেস বার, পুনরাবৃত লাইন এবং অ-কার্যকর নয়েজ সরিয়ে দেয়
- ব্যর্থতা, এরর, সতর্কতা, পরিবর্তিত ফাইল, সারসংক্ষেপ এবং লম্বা আউটপুটের শেষাংশ সংরক্ষণ করে
- ট্রাস্ট-গেটেড প্রজেক্ট ফিল্টার, গ্লোবাল ফিল্টার এবং ঐচ্ছিক রিডাক্টেড র-আউটপুট রিকভারি সমর্থন করে

**কোন ক্ষেত্রে উপযুক্ত:** শেল, বিল্ড, টেস্ট, git, grep এবং ফাইল-আউটপুট ট্রান্সক্রিপ্টসহ এজেন্ট সেশন।

### স্ট্যাকড মোড (Stacked) (78-95% যোগ্য পরিসীমা)

স্ট্যাকড মোড নির্ধারিত ক্রমে একাধিক কম্প্রেশন ইঞ্জিন চালায়। ডিফল্ট পাইপলাইন হলো:

```txt
RTK -> Caveman
```

এই ক্রমটি প্রথমে টার্মিনাল/টুল আউটপুট কমপ্যাক্ট রাখে, তারপর অবশিষ্ট স্বাভাবিক-ভাষা
প্রম্পটে Caveman সিমান্টিক সংক্ষেপণ প্রয়োগ করে। স্ট্যাকড পাইপলাইন গ্লোবালি বা
রুটিং কম্বোতে নির্ধারিত কম্প্রেশন কম্বোর মাধ্যমে কনফিগার করা যায়।

**কোন ক্ষেত্রে উপযুক্ত:** বড় টুল লগ এবং মানব নির্দেশনা বা অ্যাসিস্ট্যান্ট সারসংক্ষেপ মেশানো কনটেক্সট।

---

## আপস্ট্রিম সাশ্রয়ের হিসাব

OmniRoute দুটি উৎস থেকে পাওয়া কম্প্রেশন সাশ্রয় নথিভুক্ত করে: আপস্ট্রিম প্রকল্পের বেঞ্চমার্ক এবং
OmniRoute-এর নিজস্ব ইঞ্জিন সমন্বয়।

| উৎস     | এখানে ব্যবহৃত আপস্ট্রিম README-এর সংখ্যা                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` কম আউটপুট টোকেন, বেঞ্চমার্কে গড় আউটপুট সাশ্রয় `65%`, পরিসর `22-87%`, এবং `~46%` ইনপুট কম্প্রেশন টুল |
| RTK     | কমান্ড-আউটপুটে `60-90%` সাশ্রয়; নমুনা সেশনে `~118,000 -> ~23,900` টোকেন, অর্থাৎ `79.7%` সাশ্রয় (`~80%`)    |

ওভারল্যাপিং টুল/কনটেক্সট পেলোডের ক্ষেত্রে, ডিফল্ট OmniRoute কম্বো ইঞ্জিনগুলোকে স্তরবদ্ধভাবে প্রয়োগ করে:

```txt
RTK -> Caveman
```

সম্মিলিত সাশ্রয় যোগফলভিত্তিক নয়, গুণফলভিত্তিক:

```txt
combined = 1 - (1 - RTK সাশ্রয়) * (1 - Caveman ইনপুট সাশ্রয়)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

`78-95%` সংখ্যাটি তখন প্রযোজ্য, যখন RTK এবং Caveman উভয়ই একই ইনপুট/কনটেক্সট পেলোড কমাতে পারে।
Caveman-এর রেসপন্স আউটপুট মোড আলাদা: এটি সক্রিয় থাকলে Caveman-এর নিজস্ব আউটপুট সাশ্রয় ব্যবহার করুন (`65%`
গড়, `~75%` প্রধান দাবি, `22-87%` পরিসর)। মোট বিলিং সাশ্রয় আপনার প্রম্পট/আউটপুটের অনুপাতের ওপর নির্ভর করে।

### "যোগ্য" বলতে আসলে কী বোঝায়

15-95%-এর প্রধান দাবিকৃত পরিসরটি বাস্তব, তবে এটি শুধু **পুনরাবৃত্তিমূলক বা অতিরিক্ত বাগাড়ম্বরপূর্ণ** কনটেন্টের ক্ষেত্রে প্রযোজ্য — পুনরাবৃত্ত
ত্রুটির লাইন, একই সতর্কতা বারবার দেখানো কোনো বিল্ড লগ, অতিরিক্ত বড় `grep`/ফাইল-রিড ডাম্প। এর অর্থ এই
**নয়** যে প্রতিটি রিকোয়েস্টেই এতটা সাশ্রয় হবে।

পরীক্ষামূলকভাবে যাচাইকৃত (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300টি অভিন্ন
ত্রুটির লাইনযুক্ত Anthropic-আকৃতির একটি `tool_result` ব্লকের ওপর `stacked` (RTK + Caveman) রান চালিয়ে
**95.93% টোকেন সাশ্রয় / 96.26% অক্ষর সাশ্রয়** পাওয়া গেছে — যা ঘোষিত পরিসরের
মধ্যেই পড়ে। কিন্তু একই পাইপলাইন স্বাভাবিক, পুনরাবৃত্তিহীন টুল আউটপুটের ওপর চালালে (পরিচ্ছন্ন `grep` ম্যাচের তালিকা,
সংক্ষিপ্ত ফাইল রিড, সাধারণ কথোপকথনের টেক্সট) সঠিকভাবেই **প্রায় শূন্য সাশ্রয়** দেয়, কারণ
সরিয়ে দেওয়ার মতো পুনরাবৃত্তিমূলক কিছু নেই এবং `validateCompression()` (`validation.ts`) এমন কোনো
পুনর্লিখন পাঠাতে অস্বীকার করে, যা কোড ব্লক, URL, শিরোনাম, সংস্করণ বা ALL-CAPS ধ্রুবক শনাক্তকারী বাদ দেবে বা পরিবর্তন করবে।

এটি প্রত্যাশিত ও নিরাপদ আচরণ, কোনো বাগ নয়: যে কোডিং সেশনে প্রধানত পরিচ্ছন্ন ফাইল রিড/grep করা হয়, সেখানে
কম্প্রেশন পুরোপুরি সক্রিয় থাকলেও মোট সাশ্রয় সীমিত হবে; অন্যদিকে কোনো সেশন ব্যর্থতার
লুপ বা অতিরিক্ত বার্তা দেওয়া লিন্টারের সম্মুখীন হলে সেই ট্র্যাফিকে সম্পূর্ণ 78-95% পরিসরের সাশ্রয় দেখা যাবে। কম্প্রেশন ভুলভাবে কনফিগার করা হয়েছে—এমন প্রমাণ হিসেবে
একটি সেশনের কম সামগ্রিক সাশ্রয় শতাংশ ব্যবহার করবেন না — প্রথমে পরীক্ষা করুন
অন্তর্নিহিত টুল আউটপুটটি সত্যিই পুনরাবৃত্তিমূলক ছিল কি না।

---

## টোকেন সাশ্রয়ের দৃশ্যায়ন

```
কম্প্রেশন ছাড়া:     LLM-এ 47K টোকেন পাঠানো হয়েছে
Lite সহ:             40K টোকেন পাঠানো হয়েছে          (15% সাশ্রয় — নিরাপদ, সর্বদা সক্রিয়)
Standard সহ:         33K টোকেন পাঠানো হয়েছে          (30% সাশ্রয় — caveman-ধাঁচের নিয়ম)
Aggressive সহ:       24K টোকেন পাঠানো হয়েছে          (50% সাশ্রয় — এজিং + সারসংক্ষেপ)
Ultra সহ:            12K টোকেন পাঠানো হয়েছে          (75% সাশ্রয় — হিউরিস্টিক ছাঁটাই)
RTK সহ:              19K-5K টোকেন পাঠানো হয়েছে      (কমান্ড/টুল আউটপুটে 60-90% সাশ্রয়)
Stacked সহ:          10K-2.5K টোকেন পাঠানো হয়েছে    (যোগ্য RTK+Caveman কনটেন্টে 78-95% পরিসর)
```

---

## কনফিগারেশন

### ড্যাশবোর্ড

`Dashboard → Context & Cache`-এ যান:

- **Caveman** — মোড নির্বাচন, ভাষা প্যাক, প্রিভিউ এবং গ্লোবাল ডিফল্ট
- **RTK** — কমান্ড-ফিল্টার প্রিভিউ, RTK নিরাপত্তা সেটিংস এবং ফিল্টার ক্যাটালগ
- **Compression Combos** — রাউটিং কম্বোতে নির্ধারিত নামযুক্ত ইঞ্জিন পাইপলাইন
- **Auto-Trigger Threshold** — টোকেনের সংখ্যা থ্রেশহোল্ড অতিক্রম করলে স্বয়ংক্রিয়ভাবে কম্প্রেশন সক্রিয় করে

### প্রতি-কম্বো ওভাররাইড

`Dashboard → Context & Cache → Compression Combos`-এ একটি রাউটিং কম্বোর জন্য একটি কম্প্রেশন
কম্বো নির্ধারণ করুন:

```txt
কম্বো: "free-tier-fallback"
  কম্প্রেশন কম্বো: "coding-agent-stack"
  পাইপলাইন: RTK -> Caveman
  লক্ষ্যসমূহ:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

এর মাধ্যমে পেইড সাবস্ক্রিপশনে লাইট মোড বজায় রেখে ফ্রি/কোডিং প্রোভাইডারে স্ট্যাকড কম্প্রেশন
ব্যবহার করতে পারবেন।

এই "প্রতি-কম্বো ওভাররাইড" অ্যাসাইনমেন্টটি **রাউটিং-কম্বো কম্প্রেশন
মোড** ওভাররাইড (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — ফিল্ডটির
স্কিমা `rtk`, `stacked` এবং `omniglyph`-ও গ্রহণ করে) থেকে আলাদা একটি নিয়ন্ত্রণ — ওই ওভাররাইড কোনো নামযুক্ত
কম্প্রেশন-কম্বো পাইপলাইন নির্বাচন করে না; এটি শুধু `resolveCompressionPlan` দ্বারা
ব্যবহৃত `compressionMode` ফিল্ড সেট করে। এটি হয় কম্বো কার্ডে (`Dashboard → Combos`), অথবা
#6760 থেকে, উপরে নথিভুক্ত পাইপলাইন-অ্যাসাইনমেন্ট চেকবক্সের ঠিক পাশে
`Dashboard → Context & Cache → Compression Combos`-এর "Assign to routing" তালিকায় প্রতি রাউটিং কম্বোর জন্য
সেট করা যায়। উভয় ইন্টারফেস একই `PUT /api/combos/{id}` এন্ডপয়েন্টের মাধ্যমে সংরক্ষিত হয়।

### প্রতি-রিকোয়েস্ট ওভাররাইড

একটি নির্দিষ্ট রিকোয়েস্টের কম্প্রেশন প্ল্যান ওভাররাইড করতে `x-omniroute-compression` রিকোয়েস্ট হেডার
পাঠান। এটির অগ্রাধিকার সর্বোচ্চ — এটি রাউটিং-কম্বো ওভাররাইড, সক্রিয় প্রোফাইল,
অটো-ট্রিগার এবং প্যানেলের Default-কে অগ্রাহ্য করে। অজানা মান উপেক্ষা করা হয় (রিকোয়েস্ট কখনো প্রত্যাখ্যাত হয় না) এবং
গ্লোবাল মাস্টার সুইচ এখনও সবকিছু নিয়ন্ত্রণ করে: গ্লোবালি কম্প্রেশন বন্ধ থাকলে হেডারটি
তা চালু করতে পারে না। মানসমূহ:

| মান           | প্রভাব                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `off`         | এই রিকোয়েস্টে কোনো কম্প্রেশন নেই।                                                                |
| `default`     | প্যানেল থেকে নির্ধারিত Default প্রোফাইল (সক্রিয় প্রোফাইল উপেক্ষা করে)। লসি ইঞ্জিনগুলো বন্ধ থাকে। |
| `safe`        | হেডারটি বাদ দেওয়ার মতোই: শুধু ডিডুপ এবং হোয়াইটস্পেস ফোল্ডিং।                                    |
| `allow-lossy` | সারাংশ, প্রাসঙ্গিকতা ফিল্টার এবং স্টাইল রিরাইটসহ এই রিকোয়েস্টের অপারেটর প্ল্যান বজায় রাখে।      |
| `engine:<id>` | সক্রিয় থাকলে একটি একক ইঞ্জিন, যেমন `engine:rtk`। এটি ওই ইঞ্জিনের জন্য প্রতি-রিকোয়েস্ট অপ্ট-ইন।  |
| `<combo>`     | একটি নামযুক্ত কম্বো, প্রথমে নামের ভিত্তিতে (কেস-ইনসেনসিটিভ), তারপর id অনুযায়ী মেলানো হয়।        |

`allow-lossy`, `engine:<id>`, অথবা কোনো নামযুক্ত কম্বো ছাড়া লসি ইঞ্জিন প্রয়োগ করা হয় না।
কম্প্রেশন চালু থাকলে রিকোয়েস্টটি তবুও সেশন ডিডুপ এবং হোয়াইটস্পেস ফোল্ডিং পায়।

প্রয়োগ করা প্ল্যানটি `X-OmniRoute-Compression: <mode>; source=<source>` রেসপন্স
হেডারে ফেরত পাঠানো হয়, যেখানে `<source>` হলো `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, অথবা `off`-এর একটি।

### API

```bash
# কম্প্রেশন সেটিংস সংগ্রহ করুন
curl http://localhost:20128/api/settings/compression

# কম্প্রেশন সেটিংস আপডেট করুন
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# একটি নির্দিষ্ট RTK/stacked পেলোডের প্রিভিউ দেখুন
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK ফিল্টার প্যাকগুলোর তালিকা দেখুন
curl http://localhost:20128/api/context/rtk/filters

# ঐচ্ছিক কমান্ড মেটাডেটাসহ সরাসরি RTK পরীক্ষা করুন
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## কী কী সুরক্ষিত থাকে

কম্প্রেশন ইঞ্জিন **সবসময় সংরক্ষণ করে:**

- ✅ কোড ব্লক (ফেন্সড এবং ইনলাইন)
- ✅ URL এবং ফাইল পাথ
- ✅ JSON কাঠামো এবং স্ট্রাকচার্ড ডেটা
- ✅ আইডেন্টিফায়ার এবং সুরক্ষিত প্রযুক্তিগত টোকেন
- ✅ গাণিতিক এক্সপ্রেশন
- ✅ টুল/ফাংশন কলের সংজ্ঞা
- ✅ সিস্টেম প্রম্পট (লাইট মোডে)

RTK-এর র-আউটপুট পুনরুদ্ধার প্রক্রিয়া কোনো কিছু সংরক্ষিত হওয়ার আগে সাধারণ API কী, বেয়ারার টোকেন, Slack টোকেন, AWS অ্যাক্সেস কী,
পাসওয়ার্ড, টোকেন এবং সিক্রেট রিড্যাক্ট করে।

---

## কম্প্রেশন পরিসংখ্যান

প্রতিটি কম্প্রেস করা রিকোয়েস্টের পরিসংখ্যান সার্ভার লগে অন্তর্ভুক্ত থাকে:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## পর্যায়ভিত্তিক রোডম্যাপ

| পর্যায়    | মোডসমূহ                                                                                                                                         | অবস্থা      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| পর্যায় 1  | বন্ধ, লাইট                                                                                                                                      | ✅ প্রকাশিত |
| পর্যায় 2  | স্ট্যান্ডার্ড, অ্যাগ্রেসিভ, আল্ট্রা                                                                                                             | ✅ প্রকাশিত |
| পর্যায় 3  | RTK, স্ট্যাকড, কম্প্রেশন কম্বো                                                                                                                  | ✅ প্রকাশিত |
| পর্যায় 4  | আউটপুট স্টাইল, SLM-স্তরের আল্ট্রা, ইভ্যাল হারনেস                                                                                                | ✅ প্রকাশিত |
| পর্যায় 4C | অভিযোজিত কনটেক্সট-বাজেট ("ডায়াল") — কম্পিউট ইঞ্জিন + API (`PUT /api/settings/compression`-এ `contextBudget`) + ড্যাশবোর্ড মোড/পলিসি নিয়ন্ত্রণ | ✅ প্রকাশিত |

---

## স্বীকৃতি

স্ট্যান্ডার্ড মোডের কম্প্রেশন নিয়মগুলো **[JuliusBrussee](https://github.com/JuliusBrussee)**-এর **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) থেকে অনুপ্রাণিত — ভাইরাল "যখন অল্প টোকেনেই কাজ হয়, তখন বেশি টোকেন কেন ব্যবহার করবেন" প্রকল্প। Caveman-এর প্রতিবেদন অনুযায়ী, আউটপুট টোকেন `~75%` কম, বেঞ্চমার্কে গড় আউটপুট সাশ্রয় `65%`, আউটপুটের পরিসর `22-87%` এবং ইনপুট-কম্প্রেশন টুলে `~46%` সাশ্রয় হয়।

RTK মোড **[RTK AI](https://github.com/rtk-ai)**-এর **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** থেকে অনুপ্রাণিত — টার্মিনাল, বিল্ড, টেস্ট, git এবং টুল-আউটপুট ফিল্টারিংয়ের জন্য উচ্চ-কর্মক্ষমতাসম্পন্ন কমান্ড-আউটপুট কম্প্রেশন প্রকল্প। RTK-এর প্রতিবেদন অনুযায়ী, এতে `60-90%` সাশ্রয় হয় এবং এর README-এর নমুনা সেশনে `~80%` সাশ্রয় দেখানো হয়েছে।

---

## উন্নত কম্প্রেশন সিস্টেম

উপরে বর্ণিত 7টি মোডের বাইরে (সোর্সটি `codex-responses` এবং
`omniglyph` মোডও গ্রহণ করে, যা এই নির্দেশিকায় অন্তর্ভুক্ত নয়), নিচের বিভাগগুলোতে এমন ফিচার
আলোচনা করা হয়েছে যা ওই মোডগুলোর মধ্যে বা পাশাপাশি কাজ করে: Tool Result Compression এবং Progressive Aging
হলো aggressive ইঞ্জিনের ধাপ 1 ও 2 (Aggressive মোড এবং একটি
stacked pipeline-এর `aggressive` ধাপ), Stacked Pipeline হলো Stacked মোড যেভাবে চলে, Cache-Aware Compression
ক্যাশিং প্রদানকারীদের জন্য `aggressive` ও `ultra`-কে `standard`-এ নামিয়ে আনে যখন কম্প্রেশন
চালু থাকে, আর Caveman Output Mode এবং Output Styles হলো ঐচ্ছিক system-prompt নির্দেশনা,
যা ডিফল্টভাবে বন্ধ থাকে এবং অনুরোধ কম্প্রেস করার পরিবর্তে মডেলের আউটপুটকে আকার দেয়।

### ক্যাশ-সচেতন কম্প্রেশন

কিছু প্রদানকারী (যেমন prompt caching-সহ Anthropic) **prompt caching** সমর্থন করে,
যা তাদের খরচ ও ল্যাটেন্সি কমাতে প্রম্পটের কিছু অংশ ক্যাশ করার সুযোগ দেয়। যখন
ক্যাশিং সক্রিয় থাকে, aggressive কম্প্রেশন আসলে কর্মদক্ষতার **ক্ষতি** করতে পারে
কারণ এটি ক্যাশ করা টোকেনগুলো পরিবর্তন করে, ফলে ক্যাশ অবৈধ হয়ে যায়।

`cachingAware.ts` মডিউলটি **ক্যাশিং প্রসঙ্গ শনাক্ত** করে এবং সেই অনুযায়ী
**কম্প্রেশন কৌশল সমন্বয়** করে এই সমস্যার সমাধান করে।

#### এটি যেভাবে কাজ করে

1. **ক্যাশিং প্রসঙ্গ শনাক্ত করা** — `cache_control` মার্কারের জন্য request body স্ক্যান করে
2. **ক্যাশিং প্রদানকারী শনাক্ত করা** — লক্ষ্য প্রদানকারী ক্যাশিং সমর্থন করে কি না পরীক্ষা করে
3. **কৌশল সমন্বয় করা** — ক্যাশিং প্রদানকারীদের জন্য `aggressive`/`ultra`-কে `standard`-এ নামিয়ে আনে
4. **system prompt এড়িয়ে যাওয়া** — system prompt সাধারণত ক্যাশ করা হয়, তাই সেগুলো কম্প্রেস করা হয় না

কৌশল-সহায়কটি একটি `deterministicOnly` ফ্ল্যাগও ফেরত দেয়, তবে plan builder
শুধু কৌশলটিই ব্যবহার করে — বর্তমানে downstream-এর কিছুই ফ্ল্যাগটি পড়ে না।

#### কোডের উদাহরণ

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← ক্যাশ মার্কার
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### কখন ব্যবহার করবেন

ক্যাশ-সচেতন কম্প্রেশন **সবসময় চালু** থাকে — কোনো কনফিগারেশনের প্রয়োজন নেই। এটি তখনই
কার্যকর হয় যখন কম্প্রেশন চালু থাকে এবং লক্ষ্য প্রদানকারী prompt caching সমর্থন করে (Anthropic, OpenAI,
ইত্যাদি); স্পষ্ট `cache_control` মার্কারের প্রয়োজন নেই — শুধু একটি ক্যাশিং প্রদানকারীই
ডাউনগ্রেডটি ট্রিগার করে, আর শুধু মার্কার কখনোই তা করে না (মার্কার শনাক্তকরণ ক্যাশ
টেলিমেট্রিতে তথ্য দেয়, কৌশল নির্ধারণে নয়)।

### প্রগ্রেসিভ এজিং

দীর্ঘ কথোপকথনে অনেক message turn জমা হয়, কিন্তু পুরোনো turn-গুলো ধীরে ধীরে কম
প্রাসঙ্গিক হয়ে ওঠে। `progressiveAging.ts` মডিউলটি **turn-এর দূরত্ব অনুযায়ী message-এর বিশদ কমায়**
(কথোপকথনের শেষ থেকে দূরত্ব পরিমাপ করা হয়)। প্রদত্ত ডিফল্টগুলোর ক্ষেত্রে
(`verbatim: 2, light: 2, moderate: 3`):

- **শেষ 2টি turn (দূরত্ব ≤ 2)**: হুবহু রাখা হয়
- **দূরত্ব 3**: Caveman কম্প্রেশন (অপ্রয়োজনীয় শব্দ অপসারণ)
- **দূরত্ব 4+**: Assistant message-এর সারসংক্ষেপ করা হয়; user message-কে তার প্রথম
  লাইনে সীমিত করা হয়, সর্বোচ্চ 120 অক্ষর পর্যন্ত; অন্যান্য role অপরিবর্তিত থাকে। System prompt, ইতিমধ্যে-aged
  message এবং সর্বশেষ user message দূরত্ব নির্বিশেষে সবসময় হুবহু রাখা হয়।
  কোনো কিছুই সম্পূর্ণ বাদ দেওয়া হয় না, এবং প্রদত্ত ডিফল্টগুলোর ক্ষেত্রে `light`
  band-এ পৌঁছানো যায় না (`light` এবং `verbatim` সমান)।

#### কোডের উদাহরণ

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... আরও 50টি turn ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // শেষ 3টি turn: হুবহু
  light: 8, // দূরত্ব <= 8: lite কম্প্রেশন
  moderate: 20, // দূরত্ব <= 20: caveman কম্প্রেশন
  fullSummary: 5, // type-এর জন্য আবশ্যক, banding code এটি পড়ে না
  // দূরত্ব > 20: সারসংক্ষেপ করা হয় (assistant) / প্রথম লাইন রাখা হয় (user)
});

// saved = সাশ্রয় হওয়া টোকেনের সংখ্যা
```

#### কখন ব্যবহার করবেন

`aggressive` মোডে progressive aging **সবসময় চালু** থাকে — এটি
`compressAggressive()`-এর ধাপ 2। Ultra মোড এটি চালায় না। এটি
বিশেষভাবে কার্যকর:

- দীর্ঘমেয়াদি coding session
- একাধিক দিনব্যাপী কথোপকথন
- অনেক tool call-সহ agentic workflow

### Caveman আউটপুট মোড

Caveman আউটপুট মোড এমন **system prompt নির্দেশনা** যোগ করে যা মডেলকেই
সংক্ষিপ্ত আউটপুট দিতে বলে — `lite` স্তর পূর্ণাঙ্গ বাক্য বজায় রেখে সংক্ষিপ্ত উত্তর দিতে বলে, `full`
তাকে "respond terse like smart caveman" বলতে বলে, আর `ultra` টেলিগ্রাফিক আউটপুট চায়;
নির্দেশনাগুলো শুধু অনুরোধ করে, সেগুলো এটি নিশ্চিত করতে পারে না। অনুরোধগুলো
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)-এর মাধ্যমে সেগুলো পায়:
`open-sse/handlers/chatCore.ts` প্রথমে back-compat shim দিয়ে নির্বাচনটি নির্ধারণ করে
(`open-sse/services/compression/outputStyles/backCompat.ts`-এর
`resolveOutputStyleSelection()`), যা `outputStyles`
খালি থাকা অবস্থায় সক্রিয় `cavemanOutputMode`-কে
`cavemanOutputMode.intensity`-এর `terse-prose` আউটপুট স্টাইলে ম্যাপ করে (নিচের Back-compat দেখুন); একটি খালি নয় এমন `outputStyles`
নির্বাচন অপরিবর্তিতভাবে ব্যবহৃত হয় এবং তখন `cavemanOutputMode.enabled` ও `intensity`-এর কোনো
প্রভাব থাকে না, যদিও এর `autoClarity` টগল তখনও প্রযোজ্য থাকে। `outputMode.ts`-এ
নির্দেশনার টেক্সট (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), content bypass এবং
injection যে placement helper ব্যবহার করে তা রয়েছে; এর নিজস্ব `applyCavemanOutputMode()` injector-এর কোনো
production caller নেই।

#### এটি যেভাবে কাজ করে

এই মোড ইনপুট সংকুচিত করে না। এটি system prompt-এ একটি instruction block যোগ করে
(নিচে ইনজেকশন কীভাবে কাজ করে দেখুন), এবং অনুরোধের জন্য নির্বাচিত যেকোনো input compression mode
এরপরও চলে, এবার block-সহ body-এর ওপর। প্রতিটি level যে shared
boundaries clause দিয়ে শেষ হয়, তার আগে ইংরেজি `full` level-এ লেখা থাকে:

> "বুদ্ধিমান গুহামানবের মতো সংক্ষেপে উত্তর দিন। article (a/an/the), অপ্রয়োজনীয় শব্দ (just/really/basically/actually/simply), সৌজন্যসূচক কথা, দ্বিধাসূচক ভাষা বাদ দিন। বাক্যাংশ চলবে। সংক্ষিপ্ত সমার্থক শব্দ ব্যবহার করুন (extensive নয়, big; implement নয়, fix)। সব প্রযুক্তিগত বিষয়বস্তু, code, error, URL, identifier হুবহু রাখুন।"

এটি বিশেষভাবে ভালো কাজ করে:

- Code generation (আরও সংক্ষিপ্ত output = কম token)
- দ্রুত Q&A (বিস্তারিত ব্যাখ্যার প্রয়োজন নেই)
- Batch processing (throughput সর্বাধিক করে)

#### কখন ব্যবহার করবেন

Caveman output mode **opt-in**। compression চালু থাকলে (`enabled: true`, Compression Settings page-এর master toggle
চালু), `cavemanOutputMode.enabled` দিয়ে এটি চালু করুন; `intensity`
`lite`, `full` অথবা `ultra` নির্বাচন করে:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

একটি compression combo-এর **Output Mode** toggle (`outputMode`, level থাকে `outputModeIntensity`-এ)
combo-টি যেসব অনুরোধে প্রযোজ্য, সেগুলোর জন্য একই switch সেট করে, এবং
`omniroute_set_compression_engine` MCP tool তার boolean `outputMode`
argument-এর মাধ্যমে এটি লেখে। খালি নয় এমন `outputStyles` selection এই switch-এর চেয়ে অগ্রাধিকার পায়।
dashboard-এ **Terse prose** output style চালু করলে একই block inject হয় (নিচে Output
Styles দেখুন)।

### Output Styles (catalog)

উপরের Caveman output mode হলো **legacy single-style path**। Phase 4 এটিকে বিস্তৃত করে
composable output style-এর একটি catalog করেছে: `open-sse/services/compression/outputStyles/catalog.ts`-এ
`OUTPUT_STYLE_CATALOG`। প্রতিটি style একটি system-prompt
instruction, যা model-কেই কম ব্যয়বহুল output দিতে বলে; style-গুলো একসঙ্গে চালু করা যায়
এবং catalog-এর ক্রমে inject হয়।

| Style                          | `id`            | এটি কী করে                                                                                                                                                                                                                                               | Instruction-এর ভাষা                           |
| ------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| সংক্ষিপ্ত গদ্য                 | `terse-prose`   | অপ্রয়োজনীয় শব্দ/article/দ্বিধাসূচক ভাষা বাদ দেয়; প্রযুক্তিগত বিষয়বস্তু হুবহু রাখে। legacy caveman output mode-এর একই text (পুনরায় লেখা নয়, reference করা)।                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| কম code                        | `less-code`     | YAGNI ladder: সবচেয়ে ছোট কার্যকর পরিবর্তন, অনুরোধ না করা abstraction নয়।                                                                                                                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (অলস senior dev)      | `ponytail`      | "সেরা code হলো সেই code, যা কখনো লেখা হয়নি": reuse > rewrite, root cause > symptom, সবচেয়ে ছোট কার্যকর diff।                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| আমার ADHD আছে (action-first)   | `i-have-adhd`   | আগে action (গদ্যের আগে command/path/snippet), সংখ্যাযুক্ত সীমাবদ্ধ ধাপ, একটি নির্দিষ্ট পরবর্তী ধাপ, কোনো preamble/recap/সমাপ্তিসূচক কথা নয়। [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) থেকে অভিযোজিত।                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter             | `antislop-ui`   | প্রতিটি visual technique-কে উদ্দেশ্য পরীক্ষায় উত্তীর্ণ হতে হবে (hierarchy, identity, readability); default gradient/glass/glow নয়, সীমিত palette, template layout নয়। উভয় antislop style-ই no-dead-controls / no-fabricated-claims boundary যোগ করে। | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop copy এবং human filter | `antislop-copy` | নির্দিষ্ট copy (em dash, generic CTA, buzzword, chatbot-এর সমাপ্তিসূচক কথা, উদ্ভাবিত তথ্য নয়), সঙ্গে মানুষের জন্য নিয়ম: WCAG AA contrast, দৃশ্যমান focus, keyboard দিয়ে নাগাল, empty/loading/error state, mobile reflow।                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| সংক্ষিপ্ত CJK (文言)           | `terse-cjk`     | `full`/`ultra` উত্তর Classical Chinese-এ (文言); `lite` শুধু function word, সৌজন্যসূচক কথা বা অলংকরণ ছাড়া সংক্ষিপ্ত উত্তর চায়।                                                                                                                         | zh (locale-gated, নিচে দেখুন)                 |

প্রতিটি style-এর তিনটি intensity level রয়েছে — `lite`, `full`, `ultra` — এবং প্রতিটি level
shared boundaries clause দিয়ে শেষ হয় (`outputMode.ts`-এ `SHARED_BOUNDARIES`), যা
code block, file path, command, error এবং URL হুবহু রাখে। `terse-prose` এবং
`terse-cjk` level-এর text সেই তালিকায় identifier যোগ করে।

`terse-cjk` দুটি স্থানে `zh`-এর জন্য locale-gated। Compression Settings page শুধু তখনই
এর row দেখায়, যখন dashboard UI-এর ভাষা Chinese (`zh-CN` অথবা `zh-TW`), এবং
অনুরোধটির resolved language (নিচে Language selection দেখুন) `zh` হলেই
`applyOutputStyles()` এটি inject করে। row লুকিয়ে রাখলে সংরক্ষিত `terse-cjk` selection মুছে যায় না:
settings API যেকোনো style id গ্রহণ করে, এবং page-এ অন্য style সংরক্ষণ করলেও এটি থেকে যায়।
অনুরোধের সময়, `applyOutputStyles()`-এর language check-ই একমাত্র locale gate।

#### ইনজেকশন কীভাবে কাজ করে

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) নির্বাচনটিকে ক্যাটালগের সঙ্গে মিলিয়ে সমাধান করে (অজানা id এবং locale-এর সঙ্গে না-মেলা style বাদ দেওয়া হয়, কখনোই error হয় না; কোনো style-এ সমাধান না-হওয়া নির্বাচন body অপরিবর্তিত রাখে এবং `no_styles` হিসেবে skip করা হয়), নির্বাচিত instruction-গুলোকে ক্যাটালগের ক্রমে সংযুক্ত করে, boundaries clause-টি **একবার** যোগ করে (এবং `less-code` বা `ponytail` নির্বাচিত হলে safety clause, `SAFETY_BOUNDARIES` বা এর অনুবাদও যোগ করে), এবং block-টি একটি একক idempotency marker (`[OmniRoute Output Styles]`) দিয়ে শুরু করে, ফলে পুনরায় প্রয়োগ করা হলে কিছুই ঘটে না। সমাধান করা ভাষার (নিচের Language selection দেখুন) অনুবাদ থাকলে English-এর পরিবর্তে স্থানীয়কৃত instruction প্রবেশ করানো হয়।

খালি নয় এমন `messages` array-সহ body-তে content bypass-এর আগে idempotency check চলে: `[OmniRoute Output Styles]` marker-টি ইতিমধ্যে top-level `system` field-এ (string বা content-block array) অথবা string content-সহ কোনো system message-এ থাকলে body-টি `already_applied` হিসেবে অপরিবর্তিত রাখা হয় এবং কোনো keyword check চলে না। অন্যথায় একটি content bypass (`open-sse/services/compression/outputMode.ts`-এর `shouldBypassCavemanOutputMode()`) সর্বশেষ তিনটি message-এর text পরীক্ষা করে, তাদের role যা-ই হোক না কেন, এবং সেই text-এর সঙ্গে security, irreversible-action বা clarification keyword মিলে গেলে, অথবা একটি order-sensitive sequence মিললে পুরো turn-এর জন্য style-গুলো skip করে: `first`, `then`, `after that`, `before`, `rollback` বা `backup`-এর 240 character-এর মধ্যে `delete`, `drop`, `migrate`, `deploy` বা `release` থাকলে। **Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, default-ভাবে on) চালু থাকা অবস্থায় bypass চলে; toggle বন্ধ করলে keyword check skip করা হয়।

Bypass turn-টিকে যেতে দিলে, `placeSystemInstruction()` (একই file), যা কখনো নতুন `messages[0]` তৈরি করে না, block-টিকে নিচের প্রথম পাওয়া স্থানে রাখে:

1. string content-সহ শুরুর system message: block-টি এর text-এর পরে যোগ করা হয়।
2. top-level `system` field: string হলে block-টি text-এর পরে যোগ করা হয়, অথবা content-block array হলে নতুন text block হিসেবে যোগ করা হয়।
3. পরের দিকে থাকা string content-সহ প্রথম system message: block-টি এর text-এর পরে যোগ করা হয়।
4. উপরের কোনোটিই না থাকলে: block-টি `messages`-এর শেষে একটি নতুন system message-এ রাখা হয়।

`messages` array-বিহীন (অথবা খালি array-সহ) body-তে কোনো content bypass চলে না এবং top-level `system` field বিবেচনা করা হয় না। block-টি string `instructions` field-এর text-এর পরে যোগ করা হয়, যদি না ওই field-এ আগে থেকেই `[OmniRoute Output Styles]` marker থাকে; সে ক্ষেত্রে body-টি `already_applied` হিসেবে অপরিবর্তিত রাখা হয়। body-তে string `instructions` field না থাকলেও `input` (string বা array) থাকলে block-টি `instructions` হয়ে যায় এবং ওই field-এ থাকা যেকোনো non-string value প্রতিস্থাপন করে। string `instructions` field কিংবা string বা array `input`—কোনোটিই নেই এমন body অপরিবর্তিত রাখা হয় এবং `no_messages` হিসেবে skip করা হয়।

#### কীভাবে চালু করবেন

Dashboard-এ: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles section: প্রতিটি style-এর জন্য on/off toggle এবং level selector-সহ একটি row। Compression নিজে চালু থাকলে (page-এর master toggle, `enabled`) style-গুলো inject হয়। **Auto-Clarity Bypass** toggle-টি **Caveman** page-এ (`/dashboard/context/caveman`), এর **Output Mode** card-এর মধ্যে রয়েছে। Programmatically, compression config নির্বাচনটি এভাবে সংরক্ষণ করে:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: `outputStyles` খালি থাকা অবস্থায় legacy `cavemanOutputMode.enabled` setting, `cavemanOutputMode.intensity`-এ `terse-prose` হিসেবে map হয়। এরপর block-টি `[OmniRoute Output Styles]` marker দিয়ে শুরু হয়, যেখানে legacy `applyCavemanOutputMode()` injector `[OmniRoute Caveman Output Mode]` লিখত। Marker-এর নিচে en, pt-BR, es, de, fr, it, ru, id এবং vi-তে text legacy injection-এর সঙ্গে মেলে; ja এবং zh-তে boundaries clause-এর আগে একটি অতিরিক্ত space থাকে। `terse-prose` pt-BR, es, de, fr, it, ru, zh, ja, id এবং vi-তে অনূদিত হয়, তাই resolved language `hu` হওয়া request-এ English text ব্যবহৃত হয়, যেখানে legacy injector তার Hungarian text ব্যবহার করত।

Output-style-এর language selection (`outputStyles/apply.ts`-এর `resolveOutputStyleLanguage()`): `languageConfig.enabled` চালু থাকলে, `autoDetect` request-এর `messages` array থেকে text-সহ সর্বশেষ user message-এর নমুনা নেয় (string content অথবা এর content part-গুলোর `text`) এবং সেটির ওপর Caveman engine-এর detector (`detectCompressionLanguage()`) চালায়। Text-এ Han character থাকলেও kana না থাকলে detector `zh` ফেরত দেয়; অন্যথায় `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` এবং `id`-এর মধ্যে যেটিতে সর্বাধিক hint match থাকে সেটি ফেরত দেয়, আর কোনোটি না মিললে `en` ফেরত দেয়—যে text শ্রেণিবদ্ধ করা যায় না সেটি English পায়, কখনোই `defaultLanguage` নয়, এবং style-গুলোর সঙ্গে `vi` text সরবরাহ করা হলেও `vi` কখনো detect করা হয় না। Responses API body তার turn-গুলো `input`-এ রাখে, যার নমুনা নেওয়া হয় না, তাই এটি প্রথমে `defaultLanguage`, তারপর English পায়। `messages`-এর কোনো user message-এ text না থাকলে, অথবা `autoDetect` বন্ধ থাকলে, প্রথমে `defaultLanguage`, তারপর English প্রয়োগ হয়। `languageConfig.enabled` বন্ধ থাকলে language হয় English—যদি না request-টিতে কোনো compression combo প্রযোজ্য হয় (request-এর routing combo-তে assigned কোনো combo, অথবা built-in stacked pipeline-এর জন্য chatCore যে default compression combo-তে fallback করে): combo প্রয়োগ করলে ওই request-এর জন্য `languageConfig.enabled` চালু হয় এবং combo-এর language pack থেকে `defaultLanguage` নির্ধারণ করা হয় (সংরক্ষিত value-টি combo-এর pack-গুলোর একটি হলে সেটি, অন্যথায় combo-এর প্রথম pack, যার default `en`), আর সংরক্ষিত `autoDetect` (default-ভাবে on) তখনও প্রযোজ্য থাকে। Caveman input engine তার rule-pack language ভিন্নভাবে বেছে নেয়—প্রতি text part অনুযায়ী এবং auto-detect বন্ধ থাকলে `enabledPacks` দ্বারা gated হয়ে।

স্টাইল × ভাষা ম্যাট্রিক্সটি
`tests/unit/compression/output-styles-i18n-matrix.test.ts` দ্বারা নির্ধারিত: প্রতিটি ক্যাটালগ স্টাইলের জন্য টেস্টের `BASELINE_LANGUAGES`-এ একটি
এন্ট্রি থাকতে হবে; লোকেল-গেটেড নয় এমন স্টাইলের সঙ্গে অবশ্যই একটি
pt-BR অনুবাদ সরবরাহ করতে হবে (লোকেল-গেটেড `terse-cjk` এই নিয়ম থেকে অব্যাহতিপ্রাপ্ত), যদি না সেটি
`KNOWN_ENGLISH_ONLY`-এ তালিকাভুক্ত থাকে, যেখানে কেবল একেবারেই কোনো অনুবাদ নেই এমন স্টাইল রাখা যেতে পারে —
তালিকাভুক্ত কোনো স্টাইলের যেকোনো অনুবাদ থাকলে টেস্টটি ব্যর্থ হয়; এবং কোনো স্টাইল তার
`BASELINE_LANGUAGES` এন্ট্রিতে তালিকাভুক্ত কোনো ভাষা হারালে টেস্টটি ব্যর্থ হয়। কোনো স্টাইল যোগ করতে,
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) দেখুন।

### টুল ফলাফল কম্প্রেশন

`open-sse/services/compression/toolResultCompressor.ts`-এর `compressToolResult()`
**5টি কৌশল** ব্যবহার করে টুল-ফলাফলের টেক্সট কম্প্রেস করে। এটি নিচের ক্রমে সেগুলো চেষ্টা করে এবং যে প্রথম সক্রিয় কৌশলের যাচাই কনটেন্টের সঙ্গে মেলে, সেটিই ফলাফল নির্ধারণ করে:

1. **`fileContent`**: 3 বা তার বেশি লাইনের কনটেন্ট, যেখানে অন্তত একটি লাইন অগ্রবর্তী
   ইন্ডেন্টেশন উপেক্ষা করে `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` বা `return ` (কীওয়ার্ডের পরে একটি স্পেস) দিয়ে, অথবা `if`,
   `for` বা `while`-এর পরে `(` বা ` (` দিয়ে শুরু হয়; এটি প্রথম 20টি এবং শেষ 5টি লাইন রেখে
   মাঝখান থেকে বাদ দেওয়া অংশ চিহ্নিত করে।
2. **`grepSearch`**: `<path>:<digits>:` ফর্মের অন্তত একটি লাইনসহ কনটেন্ট,
   যেখানে প্রথম কোলনের আগের টেক্সটে কোনো হোয়াইটস্পেস নেই; এটি কেবল সেই লাইনগুলো রাখে,
   সর্বোচ্চ 30টি, তারপর অতিরিক্ত ম্যাচের সংখ্যা এবং ম্যাচ হওয়া ফাইলগুলোর তালিকা যোগ করে;
   অন্য প্রতিটি লাইন বাদ দেওয়া হয়। কৌশলটি সক্রিয় করতে এমন একটি লাইনই যথেষ্ট, তাই
   `12:30:45`-এর মতো টাইমস্ট্যাম্প দিয়ে শুরু হওয়া কোনো লগ লাইনও গণ্য হয়।
3. **`shellOutput`**: যে আউটপুটে একটি ANSI CSI সিকোয়েন্স (`ESC[`-এর পরে সংখ্যা বা
   সেমিকোলন, তারপর একটি অক্ষর, যেমন কালার কোডে থাকে) অথবা টেক্সটের যেকোনো স্থানে
   `$`-এর পরে হোয়াইটস্পেস রয়েছে, সেটি ওই সিকোয়েন্সগুলো হারায় (অন্যান্য এস্কেপ, যেমন `ESC[?25l` বা কোনো
   OSC উইন্ডো-টাইটেল সিকোয়েন্স, রাখা হয়) এবং পরপর পুনরাবৃত্ত লাইনগুলো একত্র করে
   শেষ 50টি লাইন রাখে। যেহেতু এই যাচাইটি `json` এবং `errorMessage`-এর আগে চলে,
   তাই এমন `$` থাকা JSON বা ত্রুটি আউটপুট `shellOutput` চালু থাকলে কখনোই সেগুলোর কাছে পৌঁছায় না।
4. **`json`**: 2,000 অক্ষরের বেশি দৈর্ঘ্যের এমন একটি JSON পেলোড, যা ঐচ্ছিক
   হোয়াইটস্পেসের পরে `{` বা `[` দিয়ে শুরু হয় এবং সফলভাবে পার্স হয়, সেটি সারসংক্ষেপ করা হয়: 7টির বেশি আইটেমের একটি অ্যারে
   তার প্রথম 5টি ও শেষ 2টি আইটেম এবং মোট সংখ্যা রাখে, আর একটি অবজেক্ট তার প্রথম 20টি
   কী রাখে; প্রতিটি নেস্টেড অবজেক্ট বা অ্যারে ভ্যালুকে একটি `{…N keys}` প্লেসহোল্ডার দিয়ে
   প্রতিস্থাপন করা হয় (অ্যারের ক্ষেত্রে N হলো এর দৈর্ঘ্য), এবং প্রথম 20টির পরে বাদ পড়া কীগুলোর সংখ্যা জানাতে
   একটি `_remaining_<N>_keys` মার্কার যোগ করা হয়। স্কেলার ভ্যালুগুলো সম্পূর্ণভাবে কপি করা হয়, তাই 20টি
   বা তার কম কীসহ এবং কোনো নেস্টেড ভ্যালু ছাড়া একটি অবজেক্টকে শুধু পুনরায় ইন্ডেন্ট করা হয় — মিনিফাই করা হলে এতে অক্ষর
   বেড়ে যায় এবং এটি অপরিবর্তিত থাকে।
5. **`errorMessage`**: যে আউটপুটের যেকোনো স্থানে এবং যেকোনো অক্ষরের কেসে `error:`,
   `error ` (শব্দটির পরে একটি স্পেস, যেমন `no error found`-এ), `[error]`,
   `exception:`, `exception `, `[exception]` বা `traceback` রয়েছে, সেটি তার প্রথম লাইন,
   পরবর্তী 10টি লাইন এবং শেষ 3টি লাইন রাখে, আর মাঝের লাইনগুলোর জায়গায় একটি
   `… [N frames elided] …` মার্কার বসায়। প্রথম লাইনের পরে 13টির বেশি লাইন থাকলেই কেবল
   মার্কারটি দেখা যায়, তাই 14 বা তার কম লাইনের ত্রুটি আউটপুট সংক্ষিপ্ত করা হয় না (12 বা 13 লাইনে
   শেষ 3টি লাইন ইতিমধ্যে রাখা লাইনগুলোর পুনরাবৃত্তি করে)।

কোনো কৌশল মিলে যাওয়ার পরে, সেটি কিছুই সাশ্রয় না করলেও পরবর্তী কৌশলগুলো
চেষ্টা করা হয় না। মিলে যাওয়া কৌশলটি আনুমানিক কোনো টোকেন সাশ্রয় না করলে (দৈর্ঘ্য ÷ 4, ঊর্ধ্বমুখী পূর্ণসংখ্যায় রাউন্ড করা) —
উদাহরণস্বরূপ, 25 বা তার কম লাইনের কোড-সদৃশ ফাইল, অথবা 2,000
অক্ষরের বেশি দৈর্ঘ্যের কিন্তু 7 বা তার কম আইটেমের JSON অ্যারে — অ্যাগ্রেসিভ ইঞ্জিন মূল টুল
ফলাফলটিই রাখে: `saved` 0 বা তার কম হলে উভয় কলার (`compressAggressive()` এবং `compressAnthropicToolResultBlock()`)
মূলটি রাখে, যদিও `compressToolResult()` নিজে তখনও ওই কৌশলের আউটপুট
ফেরত দেয়। টুল-ফলাফল ধাপটিই চূড়ান্ত নয়: ইঞ্জিনের ফলব্যাক সামারাইজার এখনও 8,192 অক্ষরের চেয়ে দীর্ঘ
কোনো `tool` বা `function` মেসেজ (`maxTokensPerMessage`, 2,048, গুণ 4) সংক্ষিপ্ত করতে পারে।

#### কখন ব্যবহার করবেন

টুল ফলাফল কম্প্রেশন হলো অ্যাগ্রেসিভ ইঞ্জিনের ধাপ 1 (`open-sse/services/compression/aggressive.ts`-এর
`compressAggressive()`), তাই এটি Aggressive মোডে এবং স্ট্যাকড পাইপলাইনের একটি
`aggressive` ধাপে চলে। এটি OpenAI-আকৃতির `tool` ও `function`
মেসেজ এবং Anthropic `tool_result` ব্লকের ভেতরের টেক্সট কম্প্রেস করে। প্রতিটি কৌশলের জন্য
`aggressive.toolStrategies`-এর অধীনে নিজস্ব সুইচ রয়েছে, যেগুলো ডিফল্টভাবে সব চালু থাকে। ড্যাশবোর্ডে,
কম্প্রেশন চালু এবং ডিফল্ট মোড Aggressive থাকা অবস্থায় সুইচগুলো Caveman পৃষ্ঠার **Advanced** ভিউতে থাকে।

### স্ট্যাকড পাইপলাইন

স্ট্যাকড মোড **একাধিক ইঞ্জিন ধারাবাহিকভাবে** চালায় — সাধারণত প্রথমে RTK
(টুল আউটপুটে 60-90% সাশ্রয়), তারপর অবশিষ্ট টেক্সটে Caveman (~46% ইনপুট
সাশ্রয়)। সম্মিলিতভাবে এটি **78-95% যোগ্য পরিসর** (উপরে Upstream Savings Math দেখুন):
`1 - (1 - 0.60..0.90) × (1 - 0.46)`-এর গড় ≈89%।

#### এটি যেভাবে কাজ করে

```
ইনপুট (1000 টোকেন)
  → RTK (কমান্ড-সচেতন ফিল্টার) → 200 টোকেন
    → Caveman (অপ্রয়োজনীয় অংশ অপসারণ) → 108 টোকেন
  → আউটপুট (108 টোকেন, ~89% সাশ্রয়)
```

#### কখন ব্যবহার করবেন

স্ট্যাকড মোড ব্যবহার করুন:

- টুল-নির্ভর ওয়ার্কফ্লোর জন্য (এজেন্টিক কোডিং, গবেষণা)
- খরচ-সংবেদনশীল ব্যাচ প্রসেসিংয়ের জন্য
- যখন আপনার সর্বোচ্চ টোকেন সাশ্রয় প্রয়োজন

স্ট্যাকড পাইপলাইনগুলো গ্লোবাল `stackedPipeline` কম্প্রেশন
সেটিংয়ের মাধ্যমে অথবা কোনো রাউটিং কম্বোতে অ্যাসাইন করা নামযুক্ত কম্প্রেশন কম্বোর মাধ্যমে কনফিগার করা হয় (উপরে
Per-Combo Override দেখুন) — কোনো অটো-কম্বো `modePack`-এর মাধ্যমে নয় (ওই ফিল্ডটি শুধু
অটো-কম্বো মডেল নির্বাচনের ওজন পুনর্নির্ধারণ করে, এবং `stacked` কোনো বৈধ প্যাকের নাম নয়)।

---

## কম্প্রেশন কম্বো ওভাররাইড

বিভিন্ন ব্যবহারের ক্ষেত্রে আচরণ সূক্ষ্মভাবে সামঞ্জস্য করতে আপনি গ্লোবাল কম্প্রেশন মোডটি **প্রতিটি কম্বোর জন্য আলাদাভাবে** ওভাররাইড করতে পারেন:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

এটি যেসব ক্ষেত্রে উপযোগী:

- **কোডিং কম্বো**: দীর্ঘ সেশনের জন্য `aggressive` মোড ব্যবহার করুন
- **দ্রুত প্রশ্নোত্তর কম্বো**: দ্রুত প্রতিক্রিয়ার জন্য `lite` মোড ব্যবহার করুন
- **টুল-নির্ভর কম্বো**: সর্বোচ্চ সাশ্রয়ের জন্য `stacked` মোড ব্যবহার করুন
- **প্রোডাকশন কম্বো**: ক্যাশিং প্রোভাইডারের ক্ষেত্রে ওভাররাইড বন্ধ রাখুন — সর্বদা সক্রিয়
  ক্যাশ-সচেতন সমন্বয় স্বয়ংক্রিয়ভাবে `aggressive`/`ultra`-কে `standard`-এ নামিয়ে আনে
  (নির্বাচনযোগ্য কোনো `cache-aware` মোড নেই)

---

## আরও দেখুন

- [এনভায়রনমেন্ট কনফিগ](../reference/ENVIRONMENT.md) — কম্প্রেশন এনভায়রনমেন্ট ভেরিয়েবল
- [আর্কিটেকচার গাইড](../architecture/ARCHITECTURE.md) — কম্প্রেশন পাইপলাইনের অভ্যন্তরীণ কার্যপ্রণালি
- [ব্যবহারকারী নির্দেশিকা](../guides/USER_GUIDE.md) — কম্প্রেশন ব্যবহার শুরু করা
- [RTK কম্প্রেশন](./RTK_COMPRESSION.md) — RTK ফিল্টার, ট্রাস্ট মডেল, ভেরিফাই গেট, র-আউটপুট পুনরুদ্ধার
- [কম্প্রেশন ইঞ্জিন](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, ড্যাশবোর্ড
- [কম্প্রেশন রুলস ফরম্যাট](./COMPRESSION_RULES_FORMAT.md) — JSON রুল-প্যাক ফরম্যাট
- [কম্প্রেশন ল্যাঙ্গুয়েজ প্যাক](./COMPRESSION_LANGUAGE_PACKS.md) — ভাষা-নির্দিষ্ট Caveman নিয়মাবলি
