# OmniRoute MCP Server Documentation (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> سرور پروتکل متن مدل با 110 ابزار در مسیریابی، حافظه پنهان، فشرده سازی، حافظه، مهارت ها، پروکسی، استخر، رادار و عملیات منبع زمینه.
>
> Source of truth: `open-sse/mcp-server/server.ts` computes **110 unique tools** with `countUniqueMcpTools()`: 45 canonical definitions (including the six CCR lifecycle tools, the agent-skills trio, `omniroute_radar_catalog`, and `omniroute_x_search`), plus memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), and two RTK-only compression tools.

## نصب و راه اندازی

OmniRoute MCP تعبیه شده است. شروعش کنید با:

```bash
omniroute --mcp
```

یا از طریق حمل و نقل open-sse:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

انتقالهای HTTP (`sse` / `streamable-http`، در حین پردازش توسط سرور داشبورد ارائه میشود) بهطور پیشفرض خاموش هستند و قبلاً فقط از صفحه `/dashboard/mcp` قابل تغییر بودند. از نسخه 3.8.51، CLI برابری دارد:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH همان `mcpEnabled` (و در صورت اختیاری `mcpTransport`) تنظیم داشبورد از طریق `/api/settings` ضامن میشود. `mcp restart` `POST /api/mcp/restart` را فراخوانی میکند: جلسات `sse`/`streamable-http` فعال را از بین میبرد، بنابراین درخواست بعدی بهطور تمیز مجدداً شروع میشود، اگر MCP غیرفعال باشد `409` برمیگرداند، و `501` برای حمل و نقل `stdio` برمیگرداند (کلاینتهای stdio زیرفرایند خود را دارند — هیچ دسته درونفرایندی برای راهاندازی مجدد وجود ندارد).

## حمل و نقل

سرور MCP سه انتقال را نشان می دهد که همگی توسط یک کارخانه `createMcpServer()` پشتیبانی می شوند:

| حمل و نقل         | کجا                                             | زمان استفاده                                           |
| :---------------- | :---------------------------------------------- | :----------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | ادغام IDE (Claude دسکتاپ، Cursor، و غیره)              |
| `sse`             | `POST/GET /api/mcp/sse` از طریق `httpTransport` | مشتریان Browser/agent که به یک جریان رویداد نیاز دارند |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | مشتریان HTTP چند جلسه ای (سرصفحه `mcp-session-id` )    |

انتقال فعال HTTP (`sse` یا `streamable-http`) با تنظیم `mcpTransport` انتخاب می شود. تعویض حمل و نقل، جلسات موجود در حمل و نقل دیگر را می بندد.

### دسترسی از راه دور (مدیریت دور زدن دامنه)

`/api/mcp/*` به صورت پیشفرض در ردیف LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — است، فقط میزبانهای حلقه بک (`localhost`، `127.0.0.1`، `::1`) میتوانند به آن دسترسی پیدا کنند. از نسخه 3.8.2، کلاینتهای غیرحلقهای در صورت ارائه `Authorization: Bearer <api-key>` که کلید آن محدوده `manage` را دارد، ممکن است متصل شوند. این تنها راه برای دسترسی به سرور MCP راه دور از طریق یک تونل، پروکسی معکوس یا نام میزبان عمومی است.

```bash
# Grant manage scope: open the dashboard API Keys page and toggle
# "Management Access" on the key, or POST scopes:["manage"] when creating.

# Then connect from a remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

یک کلید غیر مدیریت (یا بدون حامل) `403 LOCAL_ONLY` را برمیگرداند. پیشوند خواهر و برادر `/api/cli-tools/runtime/*` عمدا NOT قابل دور زدن — است [. Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### اعتبارسنجی مبدا

پس از احراز هویت، هر درخواستی برای `/api/mcp/*` — حمل و نقل و مسیرهای مدیریتی مانند `status`، `tools`، `audit` و `restart` — ، هدر `Origin` خود را تأیید میکند، صرف نظر از تماسگیرنده (کلید API ، رمز CLI ، جلسه داشبورد، یا حلقه بک ناشناس با غیرفعال شدن ورود). این حفاظتی است که با DNS rebinding مشخصات MCP Streamable HTTP به آن نیاز دارد.

- **بدون سربرگ `Origin`** → مجاز است. مشتریان OmniRoute CLI، SDK و IDE یکی را ارسال نمی کنند.
- **مجاز `Origin`** → `localhost`، `127.0.0.1` یا `[::1]` در هر پورت، یا مبدا عمومی خود OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`، مبدا ارسالشده یک پروکسی معکوس مطمئن (`OMNIROUTE_TRUST_PROXY`، فقط زمانی که URL پایه تنظیم نشده باشد)، یا یک میزبان loopback/LAN IP مستقیم. هدر `Host` به تنهایی هرگز منبعی را قابل اعتماد نمی کند.
- **هر `Origin` دیگری از جمله `null`** → `403` با بدنه خطای JSON-RPC: `id: null`، `error.code: -32000`، `error.data.code: "INVALID_ORIGIN"`. جلسه داشبورد که یک توکن CSRF معتبر ارائه میکند همچنان پذیرفته میشود، مانند سایر نوشتههای داشبورد.

یک سرویس گیرنده مرورگر MCP که پشت پراکسی معکوس ارائه می شود به `OMNIROUTE_PUBLIC_BASE_URL` نیاز دارد. هیچ لیست مجاز برای مبداهای دیگر وجود ندارد. CORS preflight (`OPTIONS`) با منبع بررسی نشده است. درخواستی که در ادامه می آید این است.

## پیکربندی IDE

[MCP Client Configuration را](../guides/SETUP_GUIDE.md#mcp-client-configuration) برای Claude Desktop، Cursor، Cline و راه اندازی سرویس گیرنده MCP سازگار ببینید.

---

## ابزار ضروری (14) — فاز 1

| ابزار                           | محدوده ها             | توضیحات                                                                                                                                 |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime، حافظه، قطع کننده های مدار، محدودیت های نرخ، آمار حافظه نهان                                                                     |
| `omniroute_list_combos`         | `read:combos`         | همه ترکیبهای ترکیبی پیکربندی شده با استراتژی (متریکهای اختیاری)                                                                         |
| `omniroute_get_combo_metrics`   | `read:combos`         | معیارهای عملکرد برای یک ترکیب خاص                                                                                                       |
| `omniroute_switch_combo`        | `write:combos`        | یک ترکیبی را فعال یا غیرفعال کنید                                                                                                       |
| `omniroute_create_combo`        | `write:combos`        | یک کمبو تایید شده از طریق ترکیب موجود API ایجاد کنید                                                                                    |
| `omniroute_check_quota`         | `read:quota`          | سهمیه used/total، درصد باقیمانده، زمان بازنشانی، سلامت نشانه                                                                            |
| `omniroute_route_request`       | `execute:completions` | تکمیل چت را از طریق مسیریابی OmniRoute ارسال کنید                                                                                       |
| `omniroute_cost_report`         | `read:usage`          | گزارش هزینه بر اساس دوره (session/day/week/month)                                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | کاتالوگ مدل کامل با قابلیت ها، وضعیت، قیمت                                                                                              |
| `omniroute_radar_catalog`       | `read:radar`          | کاتالوگ رادار امضا شده محلی؛ فیلترهای اختیاری provider/family                                                                           |
| `omniroute_tool_search`         | `read:tools`          | ابزارها را از کاتالوگ ثبت شده MCP کشف کنید                                                                                              |
| `omniroute_web_search`          | `execute:search`      | جستجوی وب از طریق ارائه دهندگان جستجوی پیکربندی شده. نه X/Twitter.                                                                      |
| `omniroute_x_search`            | `execute:search`      | X را از طریق xAI/SuperGrok جستجو کنید یا `xquik-search` را برای نتایج Xquik API انتخاب کنید. برای باطن انتخابی به اعتبارنامه نیاز دارد. |
| `omniroute_web_fetch`           | `execute:search`      | محتوای وب را از طریق ارائه دهندگان واکشی پیکربندی شده واکشی کنید                                                                        |

## ابزارهای پیشرفته (11) — فاز 2

| ابزار                              | محدوده ها                            | توضیحات                                                                                               |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | شبیهسازی مسیریابی خشک با درخت بازگشتی                                                                 |
| `omniroute_set_budget_guard`       | `write:budget`                       | بودجه جلسه با عمل degrade/block/alert                                                                 |
| `omniroute_set_routing_strategy`   | `write:combos`                       | به روز رسانی استراتژی ترکیبی در زمان اجرا (priority/weighted/auto/etc.)                               |
| `omniroute_set_resilience_profile` | `write:resilience`                   | از پیش تنظیم انعطاف پذیری `aggressive` / `balanced` / `conservative` استفاده کنید                     |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | تست زنده هر ارائه دهنده در یک ترکیب ترکیبی با استفاده از یک تماس بالادستی واقعی                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | معیارهای هر ارائه دهنده با تاخیر p50/p95/p99 و وضعیت قطع کننده مدار                                   |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ترکیبی را بر اساس نوع کار با محدودیتهای budget/latency توصیه کنید                                     |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | توضیح دهید که چرا یک درخواست به یک ارائهدهنده ارسال شده است (عوامل امتیازدهی مجدد + )                 |
| `omniroute_get_session_snapshot`   | `read:usage`                         | عکس فوری جلسه کامل: هزینه، توکن ها، models/providers برتر، خطاها، محافظ بودجه                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | تشخیص (و به صورت اختیاری تعمیر خودکار) جابجایی پایگاه داده مانند ref های ترکیبی شکسته / ردیف های یتیم |
| `omniroute_sync_pricing`           | `pricing:write`                      | همگام سازی داده های قیمت گذاری از منابع خارجی (LiteLLM)؛ `dryRun` پشتیبانی می کند                     |

## ابزارهای کش (2)

| ابزار                   | محدوده ها     | توضیحات                                                       |
| :---------------------- | :------------ | :------------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`  | کش معنایی، حافظه پنهان سریع، و آمار ناتوانی                   |
| `omniroute_cache_flush` | `write:cache` | حافظه نهان را در سطح جهانی یا توسط signature/model شستشو دهید |

## ابزار فشرده سازی (13)

| ابزار                               | محدوده ها           | توضیحات                                                                                                                   |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | تنظیمات فشرده سازی، خلاصه تجزیه و تحلیل، و آمار حافظه پنهان (شامل ابرداده `analytics.mcpDescriptionCompression` )         |
| `omniroute_compression_configure`   | `write:compression` | پیکربندی حالت فشرده سازی، آستانه، نسبت هدف، حفظ اعلان سیستم، تغییر حالت فشرده سازی توضیحات MCP                            |
| `omniroute_set_compression_engine`  | `write:compression` | موتور فعال (off/caveman/rtk/stacked) و شدت Caveman/RTK را انتخاب کنید                                                     |
| `omniroute_list_compression_combos` | `read:compression`  | لیستی از ترکیبات فشرده سازی و خطوط لوله موتور آنها                                                                        |
| `omniroute_compression_combo_stats` | `read:compression`  | تجزیه و تحلیل بر اساس ترکیب فشرده سازی و موتور گروه بندی شده است                                                          |
| `omniroute_ccr_store`               | `write:compression` | محتوای جدا شده از تماس گیرنده را در فروشگاه CCR در حافظه محدود ذخیره کنید و یک نشانگر به همراه مرجع `ccr://` را برگردانید |
| `omniroute_ccr_retrieve`            | `read:compression`  | محتوای CCR را به طور کامل یا با حالت های سر، دم، خطوط، grep و آمار بازیابی کنید                                           |
| `omniroute_ccr_inspect`             | `read:compression`  | فراداده CCR متعلق به تماسگیرنده را بدون بازگرداندن محتوا بررسی کنید                                                       |
| `omniroute_ccr_list`                | `read:compression`  | فراداده های صفحه بندی شده برای بلوک های CCR متعلق به تماس گیرنده را فهرست کنید                                            |
| `omniroute_ccr_delete`              | `write:compression` | بلوک CCR متعلق به تماس گیرنده را حذف کنید                                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | استفاده از حافظه با محدوده تماس گیرنده، شمارنده های چرخه عمر و محدودیت های ذخیره را گزارش دهید                            |
| `omniroute_rtk_discover`            | `read:compression`  | نویز تکرارشونده را در نمونههای خروجی RTK انتخاب کنید                                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | یک پیش نویس فیلتر RTK قابل بررسی از نمونه های انتخابی ایجاد کنید                                                          |

ورودیهای CCR از یک ذخیرهسازی دو لایه استفاده میکنند: یک لایه حافظه داغ که در زمانهای اجرا غیر ابری محلی، توسط یک ردیف SQLite بادوام (`ccr_blocks`، به طور پیشفرض روشن) پشتیبانی میشود، بنابراین یک بلوک تا زمانی که TTL آن تمام شود — پایان برسد، به جز بلوکهای بیش از 512 KB و زمانهای اجرا ابری، که در حافظه باقی میمانند. هر بلوک به 2 MiB، هر اصل به 16 MiB و فروشگاه جهانی به 64 MiB محدود شده است. ورودی ها به طور پیش فرض به TTL 24 ساعته (حداکثر هفت روز) می باشد. بازیابی کامل MCP به 256 KiB محدود شده است. بلوک های بزرگتر از طریق حالت های محدوده و grep در دسترس باقی می مانند. ذخیرهسازی، بازیابی، فهرستبندی، بازرسی، حذف و آمار توسط اصل کلید API تأیید شده جدا میشود. سوابق حسابرسی حاوی هش ها و ابرداده های اندازه هستند و هرگز محتوا ندارند. جزئیات مربوط به اپراتور (دو نشانگر، پیش نیازهای مشتری، `codemode:false`، محدوده هر ابزار، صفحه بندی، و یک ماتریس تشخیصی) در [موتورهای فشرده سازی → پیش نیازها / راهنمای اپراتور](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup) وجود دارد.

`omniroute_compression_status` فشرده سازی توضیحات MCP را به طور جداگانه تحت `analytics.mcpDescriptionCompression` گزارش می کند. این مقادیر تخمینهای اندازه ابرداده برای توصیفهای فهرستشده MCP هستند (`tools`، `prompts`، `resources` و `resourceTemplates`). آنها رسید استفاده ارائه دهنده نیستند و با `source: "mcp_metadata_estimate"` مشخص شده اند.

### فیلتر درخت دسترسی MCP (نسخه 3.8.0)

جدا از ابزارهای فشرده سازی بالا، OmniRoute شامل یک فیلتر پس از اجرا است که فیلتر را فشرده می کند** نتایج ابزار** ابزارهای MCP browser/accessibility قبل از اینکه به عامل بازگردانده شوند. این فیلتر به خودی خود یک ابزار — نیست و بر روی هر نتیجه ابزاری که حاوی متن درخت دسترسی پرمخاطب یا عکس فوری مرورگر (≥ 2000 کاراکتر) باشد به صورت شفاف اجرا می شود.

رفتارهای کلیدی:

- 30 خط ≥ و برادر تکراری متوالی را در خلاصه دم سر + جمع می کند
- لنگرهای `[ref=eXX]` مورد نیاز Playwright/computer-use را حفظ می کند
- متن بزرگ (> 50000 کاراکتر) را با یک اشاره پیمایش کوتاه می کند
- پس انداز مورد انتظار:** 60-80٪** در بارهای اسنپ شات مرورگر

پیکربندی: `compression.mcpAccessibility` در تنظیمات جهانی (مهاجرت 056). پیاده سازی: `open-sse/services/compression/engines/mcpAccessibility/`. اسناد کامل: [موتورهای فشرده سازی — MCP فیلتر درخت دسترسی](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

برای مدل فشرده سازی زمان اجرا در پشت این ابزارها [، Compression Engines](../compression/COMPRESSION_ENGINES.md) و [RTK Compression](../compression/RTK_COMPRESSION.md) را ببینید.

## 1 ابزار پروکسی (3)

| ابزار                       | محدوده ها      | توضیحات                                                                                  |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | واکشی پراکسی های رایگان از 1proxy marketplace (فیلترهای protocol/country/quality/limit ) |
| `omniroute_oneproxy_rotate` | `read:proxies` | پروکسی موجود بعدی را براساس استراتژی دریافت کنید (`random` / `quality` / `sequential`)   |
| `omniroute_oneproxy_stats`  | `read:proxies` | آمار استخر، وضعیت همگام سازی، توزیع بر اساس پروتکل و کشور                                |

## ابزارهای حافظه (3)

در `open-sse/mcp-server/tools/memoryTools.ts` تعریف شده است. Auth/scope از طریق خط لوله استاندارد MCP scope اعمال می شود.

| ابزار                     | محدوده ها      | توضیحات                                                                                                   |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | جستجوی خاطرات بر اساس پرسش / نوع / کلید API با اجرای بودجه رمز                                            |
| `omniroute_memory_add`    | `write:memory` | یک ورودی حافظه جدید اضافه کنید (`factual` / `episodic` / `procedural` / `semantic`)                       |
| `omniroute_memory_clear`  | `write:memory` | حافظهها را برای یک کلید API پاک کنید، که به صورت اختیاری بر اساس نوع یا مهر زمانی `olderThan` فیلتر میشود |

## ابزار مهارت (4)

در `open-sse/mcp-server/tools/skillTools.ts` تعریف شده است. با پشتیبانی `src/lib/skills/registry` + `src/lib/skills/executor`.

| ابزار                         | محدوده ها        | توضیحات                                                                               |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | مهارت های ثبت شده را با فیلتر اختیاری بر اساس کلید API ، نام یا وضعیت فعال فهرست کنید |
| `omniroute_skills_enable`     | `write:skills`   | یک مهارت خاص را توسط ID فعال یا غیرفعال کنید                                          |
| `omniroute_skills_execute`    | `execute:skills` | یک مهارت را با ورودی ارائه شده اجرا کنید و رکورد اجرا را برگردانید                    |
| `omniroute_skills_executions` | `read:skills`    | تاریخچه اخیر اجرای مهارت را فهرست کنید                                                |

## منبع زمینه Notion (6)

در `open-sse/mcp-server/tools/notionTools.ts` تعریف شده است. رمز ذخیره شده در جدول `key_value` از طریق `src/lib/db/notion.ts`. مشتری REST در `src/lib/notion/api.ts`. تنظیمات API در `src/app/api/settings/notion/route.ts`. داشبورد UI in `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

رمز ادغام Notion خود را از روی پیکربندی کنید** منابع زمینه** تب در داشبورد Endpoint یا از طریق REST API:

```bash
# Set token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Check status
curl http://localhost:20128/api/settings/notion

# Disconnect
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ابزار                        | محدوده ها      | توضیحات                                                            |
| :--------------------------- | :------------- | :----------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | جستجوی متن کامل در تمام صفحات و پایگاه های داده                    |
| `notion_get_page`            | `read:notion`  | یک صفحه توسط ID با خواص آن دریافت کنید                             |
| `notion_list_block_children` | `read:notion`  | بلوک های فرزند یک صفحه یا بلوک را فهرست کنید                       |
| `notion_query_database`      | `read:notion`  | یک پایگاه داده با فیلتر، مرتب سازی و صفحه بندی را پرس و جو کنید    |
| `notion_get_database`        | `read:notion`  | دریافت طرح پایگاه داده توسط ID                                     |
| `notion_append_blocks`       | `write:notion` | اضافه کردن بلوکهای فرزند به بلوک والدین (حداکثر 100 در هر درخواست) |

## ابزارهای کاتالوگ مهارت نماینده (3)

در `open-sse/mcp-server/tools/agentSkillTools.ts` تعریف شده است. با پشتیبانی `src/lib/agentSkills/catalog`. این ابزارها کاتالوگ مستندات Agent Skills با 45 ورودی را در اختیار مشتریان MCP و عوامل خارجی قرار می دهند. محدوده: `read:catalog`.

| ابزار                             | محدوده ها      | توضیحات                                                                                                                         |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | همه 45 مهارت عامل را با فیلترهای `category` اختیاری (api\| cli) و `area` فهرست کنید. فراداده را پوشش + برمی گرداند              |
| `omniroute_agent_skills_get`      | `read:catalog` | با استفاده از `id` متاداده کامل، محتوای + SKILL.md را برای یک مهارت واحد دریافت کنید                                            |
| `omniroute_agent_skills_coverage` | `read:catalog` | آمار پوشش: چه تعداد از مهارت های 23 API، 21 CLI و 1 پیکربندی دارای فایل های SKILL.md در سیستم فایل در مقابل مجموع کاتالوگ هستند |

برای مشاهده کاتالوگ کامل و نحوه مصرف عوامل خارجی از [AGENT-SKILLS.md](./AGENT-SKILLS.md) دیدن کنید.

## چارچوب های مرتبط (نسخه 3.8.0)

موجودی ابزار MCP در بالا (110 ابزار منحصر به فرد، محاسبه شده توسط `countUniqueMcpTools()`) عمداً به عملیات routing/cache/compression/memory/skills/proxy/context-source زمان اجرا اختصاص داده شده است. دو فریمورک مجاور در کنار سرور MCP در نسخه 3.8.0 ارسال می شوند و به طور جداگانه مستند می شوند:

### عوامل ابری

Cloud Agents عاملهای کدگذاری AI خارج از فرآیند (codex-cloud، cursor-cloud، devin، jules) هستند که از طریق همان مدل اتصال مورد استفاده برای ارائه دهندگان LLM به OmniRoute سیمکشی میشوند. آنها از طریق سطح REST خود (`/api/v1/agents/*`) در معرض دید قرار می گیرند و هستند** نه** بخشی از کاتالوگ ابزار MCP — که یک Cloud Agent را فراخوانی می کند، محدوده MCP را مصرف نمی کند.

- تطبیق: `src/lib/cloudAgent/` (`registry.ts`، `agents/codex.ts`، `agents/cursor.ts`، `agents/devin.ts`، `agents/jules.ts`).
- چرخه حیات: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- مستندات: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### نرده های محافظ

گاردریلها فیلترهای pre/post-execution (پل بینایی، pii-masker، تزریق سریع) هستند که در خط لوله چت اعمال میشوند. آنها قبل از رسیدن به لایه MCP tool/route اجرا می شوند و تخلفات ساختاری را به خط لوله ممیزی منتشر می کنند. آنها به عنوان ابزار MCP فراخوانی نمی شوند.

- اجرا: `src/lib/guardrails/`.
- مستندات: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

هنگام اشکال زدایی یک تماس MCP که مسدود به نظر می رسد، هم گزارش حسابرسی MCP ( ورودی های `scope_denied:*` ) و هم مسیر حسابرسی گاردریل ها را بررسی کنید — ممکن است یک درخواست توسط یک گاردریل رد شود.** قبل از** همیشه به لایه اجرای MCP scope می رسد.

---

## REST API نقاط پایانی

| نقطه پایانی            | روش                   | توضیحات                                                                                                | احراز هویت             |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :--------------------- |
| `/api/mcp/status`      | `GET`                 | وضعیت سرور: ضربان قلب، وضعیت حمل و نقل HTTP ، خلاصه فعالیت حسابرسی                                     | مدیریت (session/admin) |
| `/api/mcp/tools`       | `GET`                 | کاتالوگ ابزار (نام، توضیحات، محدوده، فاز، نقاط پایانی منبع)                                            | مدیریت                 |
| `/api/mcp/sse`         | `GET` / `POST`        | نقطه پایانی انتقال SSE (دردار توسط `mcpEnabled` + `mcpTransport === "sse"`)                            | API key + scopes       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | انتقال HTTP قابل جریان (از هدر `mcp-session-id` استفاده می کند؛ `DELETE` جلسه را پایان می دهد)         | API key + scopes       |
| `/api/mcp/audit`       | `GET`                 | ورودیهای گزارش حسابرسی از `mcp_tool_audit` (فیلترها: `limit`، `offset`، `tool`، `success`، `apiKeyId`) | مدیریت                 |
| `/api/mcp/audit/stats` | `GET`                 | آمار حسابرسی انبوه (`totalCalls`، `successRate`، `avgDurationMs`، ابزارهای برتر)                       | مدیریت                 |

فایل های منبع: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

هر دو انتقال SSE و Streamable HTTP مسدود می شوند تا زمانی که سرور MCP در تنظیمات (`mcpEnabled`) فعال شود و `mcpTransport` مناسب انتخاب شود. اگر حمل و نقل اشتباه پیکربندی شده باشد، مسیر HTTP 400 را با اشاره به تغییر تنظیمات برمیگرداند.

---

## احراز هویت و محدوده

ابزار MCP رشته های محدوده را از تماس گیرنده می خواند. این بررسی یکی از سه فضای نام مستقل است. پاس از یک چککننده، پاس دیگری نیست. قوانین [سه فضای نام دامنه](#three-scope-namespaces) هستند. کاتالوگ ابزار [MCP tool scopes](#mcp-tool-scopes) است.

### سه فضای نام دامنه

`manage` در یک کلید API ، `read:compression` در یک ابزار MCP و `read` در یک توکن دسترسی `oma_live_…` سه کمک هزینه متفاوت هستند. تماس گیرندگانی که رمز دسترسی `read` را به یک مسیر مدیریت جهش یافته ارسال می کنند HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` دریافت می کنند که رتبه `scopeSatisfies` است. با جدول MCP مشورت نمی کند و تطبیق MCP با آن مشورت نمی کند.

| فضای نام         | اعتبارنامه                                                                            | چکر              | یک پاس اجازه می دهد                              |
| :--------------- | :------------------------------------------------------------------------------------ | :--------------- | :----------------------------------------------- |
| مدیریت کلید API  | `api_keys.scopes`                                                                     | `hasManageScope` | مدیریت REST برای آن کلید حامل                    |
| افزودنی کلید API | همان آرایه، یک رشته دقیق                                                              | یاری به نام زیر  | فقط همین یک قابلیت                               |
| محدوده ابزار MCP | همان آرایه، دیگری MCP `_meta` (فقط HTTP/SSE )، در غیر این صورت `OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | آن ابزار، به محض اینکه اجرا روشن شد              |
| نشانه دسترسی     | `oma_live_…`                                                                          | `scopeSatisfies` | مسیر مدیریتی که روش و مسیر آن مستلزم آن رتبه است |

ثبت هر اعتبار در [احراز هویت مدیریت](../guides/MANAGEMENT-AUTH.md) پوشش داده شده است.

#### دامنه های کلید API

یک آرایه `api_keys.scopes` دو کار را تغذیه می کند. آنها از توابع مختلف استفاده می کنند.

**مدیریت REST.** `manage` و `admin` اعضای `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) هستند. `hasManageScope` چیزی است که مسیرهای مدیریتی را برای آن کلید مجاز می کند. `admin` در آن مسیرها قابلیت مدیریت دارد. کلمه `admin` در اینجا رتبه نشانه دسترسی نیست و به دامنه ابزار MCP گسترش نمی یابد.

**رشته های افزودنی** هر کدام یک آزمون عضویت دقیق است و هر کدام خارج از `MANAGEMENT_API_KEY_SCOPES` می مانند.

| دامنه                          | یک پاس اجازه می دهد                                                                                                                                                        |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | `/api/mcp/` LOCAL_ONLY بدون حلقه فقط حک شده (`hasMcpConnectOrManageScope`). یک کلید با `manage` یا `admin` هنوز از آن حک شده عبور می کند.                                  |
| `self:usage`                   | `GET /api/v1/me/status` برای این کلید (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` این محدوده را در ایجاد (`normalizeSelfServiceScopesForCreate`) اضافه می کند. |
| `self:account-quota`           | سهمیههای حساب بالادستی در آن بار وضعیت (`src/lib/usage/apiKeySelfService.ts`). مسیر وضعیت همچنان به `self:usage` نیاز دارد.                                                |
| `policy:bypass-provider-quota` | فراخوانی استنتاج این کلید از خط مشی سهمیه ارائه دهنده (`hasProviderQuotaBypassScope` در `src/sse/handlers/chat.ts`) رد می شود.                                             |

#### تطبیق

کاتالوگ جدول زیر [محدوده ابزار MCP](#mcp-tool-scopes) است. `MCP_SCOPE_LIST` در `src/shared/constants/mcpScopes.ts` به عنوان آن کاتالوگ در نظر نگیرید: زیر مجموعه اصلی تایپ شده است. ابزارهای بعدی دامنه های بیشتری را در کنار آن اعلام می کنند (`read:notion`، `read:skills`، `read:local-corpus`، و بقیه جدول).

`evaluateToolScopes` در `open-sse/mcp-server/scopeEnforcement.ts` زمانی امکان تماس را فراهم میکند که هر محدوده مورد نیاز با محدوده اعطایی مطابقت داشته باشد:

- `*` با هر محدوده مورد نیاز مطابقت دارد.
- یک محدوده اعطایی که به `*` ختم میشود با محدوده مورد نیازی که با پیشوند قبل از ستاره شروع میشود مطابقت دارد. `read:*` `read:compression` مطابقت دارد.
- هر دامنه اعطایی دیگر فقط با رشته مورد نیاز یکسان مطابقت دارد.

کلیدی که دامنه آن `["manage"]` است، `scopeMatches` برای `read:compression` ناموفق است. همان فراخوانی برای `admin`، `mcp:connect`، `read` و `write` ناموفق میشود، زمانی که آنها تنها رشتههای داده شده باشند. هیچ سلسله مراتبی در میان حوزه های ابزار MCP فراتر از `*` دنباله دار وجود ندارد.

اجرای غیرفعال است مگر اینکه `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (پیشفرض `false`). در حالی که خاموش است، `evaluateToolScopes` به تماس اجازه می دهد و از کاتالوگ می گذرد. هنگامی که روشن است، HTTP از `api_keys.scopes` کلید حامل به عنوان `authInfo` استفاده می کند ( [به هر کلید HTTP scope binding](#per-key-http-scope-binding-7895) مراجعه کنید). وقتی هیچ حوزه کلیدی حل نمیشود، مجموعه اعطا شده به MCP `_meta` میافتد (که فقط برای تماسگیرندگان HTTP/SSE ، در یک زمینه HTTP auth احترام گذاشته میشود؛ `_meta` تماسگیرنده stdio نادیده گرفته میشود، زیرا مشتری آن را کنترل میکند و هیچ هویتی برای هر تماسگیرنده ندارد)، سپس `OMNIROUTE_MCP_SCOPES`.

#### دامنه های نشانه دسترسی

نشانه های `oma_live_…` (`src/lib/accessTokens/scopes.ts`) `read`، `write` یا `admin` را حمل می کنند. `scopeSatisfies` یک مرتبه است: `admin` `write` و `read` را می پوشاند و `write` `read` می پوشاند. دامنه های ناشناخته چیزی را پوشش نمی دهند.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) آن رتبه را با `inferRequiredScope` (`src/server/authz/accessScopes.ts`) مقایسه می کند:

- `GET` و `HEAD` و `OPTIONS` نیاز به `read` دارند.
- هر روش دیگری به `write` نیاز دارد.
- مسیرها در `ADMIN_SCOPE_PREFIXES` برای هر روشی `admin` نیاز دارند. `/api/mcp` در آن لیست است، بنابراین یک رمز دسترسی `write` هنوز نمی تواند سطح MCP HTTP را فراخوانی کند.
- مسیرها در `ADMIN_MUTATION_PREFIXES` فقط برای جهش نیاز به `admin` دارند.
- مسیرهای موجود در `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`، `/api/settings/require-login`) فقط برای جهشها `admin` نیاز دارند، و فقط در آن مسیر دقیق — سایر مسیرهای فرعی `/api/settings/*` `write` را نگه میدارند.

`PATCH /api/keys/{id}` یک جهش است و در آن لیستهای مدیریت نیست، بنابراین یک توکن `read` 403 `Access token scope 'read' is insufficient; 'write' required.` دریافت میکند. توکن دسترسی `write` یا `admin` آن مسیر را برآورده میکند. داشبورد JWT، نشانه چرخشی CLI machine-id، و کلید API با `manage` یا `admin` شاخههای دیگری را میگیرند و با این رتبه محدود نمیشوند.

یک نشانه دسترسی که `scopeSatisfies` برای `/api/mcp` پاس میکند، فقط گیت مدیریت را پاک کرده است. فراخوانی ابزار همچنان `scopeMatches` در برابر حوزه های کلید API اجرا می کند. رتبه نشانه دسترسی ورودی `scopeMatches` نیست.

### محدوده ابزار MCP

اجرای محدوده در `open-sse/mcp-server/scopeEnforcement.ts` متمرکز است. هر ابزار به محدوده خاصی نیاز دارد:

| دامنه                 | ابزار                                                                                                                                                                          |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                              |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                      |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                         |
| `read:quota`          | `check_quota`                                                                                                                                                                  |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                         |
| `read:models`         | `list_models_catalog`                                                                                                                                                          |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                  |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                          |
| `write:budget`        | `set_budget_guard`                                                                                                                                                             |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                    |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                 |
| `read:cache`          | `cache_stats`                                                                                                                                                                  |
| `write:cache`         | `cache_flush`                                                                                                                                                                  |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                     |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                              |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                          |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                               |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                         |
| `read:memory`         | `memory_search`                                                                                                                                                                |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                   |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                             |
| `write:skills`        | `skills_enable`                                                                                                                                                                |
| `execute:skills`      | `skills_execute`                                                                                                                                                               |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                               |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                        |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                      |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                               |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                 |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                             |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                |
| `read:obsidian`       | 13 ابزار خواندن — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 ابزار نوشتن — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                              |

دامنههای Wildcard پشتیبانی میشوند: `read:*` به همه دامنههای خواندنی اعطا میکند، `*` دسترسی کامل را اعطا میکند.

### قابلیت مسیر باریک `mcp:connect` — (#7895)

رسیدن به انتقال HTTP/SSE MCP (`/api/mcp/*`) از غیر حلقه بک مستلزم حک کردن `/api/mcp/` LOCAL_ONLY است (به `docs/security/ROUTE_GUARD_TIERS.md` مراجعه کنید). از لحاظ تاریخی، این حکاکی فقط یک کلید `manage`/`admin` -scope API — کامل را برای تماس گیرنده ای که فقط نیاز به صحبت با MCP دارد بسیار گسترده است. `src/shared/constants/managementScopes.ts` اکنون `MCP_CONNECT_SCOPE = "mcp:connect"` را صادر می کند: یک دامنه باریک و افزودنی (همان سابقه `SELF_USAGE_SCOPE`) که به ONLY بای پس `/api/mcp/` در `src/server/authz/policies/management.ts` — اجازه دسترسی به مسیر مدیریت دیگری را نمی دهد و عمدا OUT از `MANAGEMENT_API_KEY_SCOPES` نگهداری می شود. کلیدی که `manage`/`admin` را نگه میدارد همچنان حکاکی را بدون تغییر عبور میدهد. `mcp:connect` یک جایگزین با امتیاز کمتر برای تماسگیرندگان فقط از راه دور MCP است که از طریق `hasMcpConnectOrManageScope()` بررسی میشود.

### صحافی دامنه HTTP هر کلید (#7895)

از طریق HTTP/SSE، `open-sse/mcp-server/httpTransport.ts` اکنون `api_keys.scopes` واقعی تماسگیرنده را از طریق `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) حل میکند و آن را به SDKMCP میدهد، بنابراین `extra.authInfo.scopes` رسیدن به هر فراخوانی ابزار `transport.handleRequest(req, { authInfo })` محدودههای خود کلید حامل را منعکس میکند. `scopeEnforcement.ts` `resolveCallerScopeContext()` قبلاً `authInfo` بر `_meta` و `OMNIROUTE_MCP_SCOPES` env را در اولویت قرار داده است — این تنها منبع اول و با بالاترین اولویت را پر می کند که قبلاً از HTTP تغذیه نمی شد. هنگامی که هیچ کلید API حل نمی شود (بدون هدر، کلید نامعتبر)، `authInfo` `undefined` باقی می ماند و وضوح به زنجیره `meta`/env موجود بدون تغییر می رسد. stdio هیچ هویتی برای هر تماسگیرنده ندارد (به `mcpCallerIdentity.ts` مراجعه کنید) و تحت تأثیر اتصال هر کلید — قرار نمیگیرد، از مرحله `_meta` میگذرد (`_meta` فقط در یک زمینه HTTP auth، #15159 احترام میشود) و تنها از کلید env `OMNIROUTE_MCP_SCOPES` حل میشود.

**برای تماس گیرندگان HTTP/SSE با دامنه محدود بدون در نظر گرفتن `OMNIROUTE_MCP_ENFORCE_SCOPES` اجرای قانون اجباری است.** پیشفرض `OMNIROUTE_MCP_ENFORCE_SCOPES` به `false` فقط برای جریان تک اپراتور local/stdio ایمن است، جایی که هیچ هویتی برای هر تماسگیرنده وجود ندارد. هر زمان که `resolveCallerScopeContext()` `shouldForceScopeEnforcement()` (به عنوان مثال یک سرصفحه مجوز HTTP واقعی به ازای هر کلید، HTTP/SSE-only) `source === "authInfo"` حل کرد، بدون قید و شرط، اجرای دامنه هر ابزار را بدون قید و شرط روشن میکند ( `open-sse/mcp-server/server.ts::withScopeEnforcement()` در `scopeEnforcement.ts`)، AND آن کلید محدوده `manage`/`admin` کامل را نگه نمیدارد. این شکافی را که در آن کلیدی ONLY محدوده بای پس `mcp:connect` باریک — را نگه میدارد، که در بالا مستند شده بود به عنوان مجوزی برای چیزی جز `/api/mcp/` LOCAL_ONLY حککردن — میبندد که در غیر این صورت میتواند هر ابزار MCP را هنگامی که اپراتور دسترسی remote/non-loopback MCP را فعال میکند فراخوانی کند، فقط به این دلیل که `OMNIROUTE_MCP_ENFORCE_SCOPES` به طور پیشفرض `false` ارسال میکند. یک کلید کامل `manage`/`admin` روی HTTP، و هر تماس گیرنده stdio/local ، رفتار `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated موجود را بدون تغییر نگه می دارد.

---

## متغیرهای محیطی

| متغیر                                   | پیش فرض                                  | هدف                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                 | مبنا URL سرور MCP هنگام فراخوانی OmniRoute داخلی APIs استفاده می کند                                                                                                                                                                                                                                                |
| `OMNIROUTE_API_KEY`                     | (خالی)                                   | کلید API به عنوان `Authorization: Bearer` به تماسهای داخلی API هدایت میشود                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (فقط `"true"` آن را فعال می کند) | وقتی فعال باشد، محدودههای گمشده تماس ابزار را رد میکنند و `scope_denied:<reason>` در گزارش حسابرسی ثبت میکنند. اجرای ALSO بدون توجه به این پرچم برای هر تماسگیرنده HTTP/SSE که از سرصفحه مجوز برای هر کلید (`source === "authInfo"`) که فاقد دامنه `manage` `mcp:connect` `admin` کامل — local/stdio ، اجباری است — |
| `OMNIROUTE_MCP_SCOPES`                  | (خالی)                                   | لیست مجاز از هم جدا شده با کاما از محدودههایی که بهطور پیشفرض «در دسترس» در نظر گرفته میشوند (زمانی که تماسگیرنده محدودههای خود را ارائه نمیکند استفاده میشود)                                                                                                                                                      |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (تنظیم = روشن)                           | هنگامی که روی `0/false/off/no` تنظیم می شود، فشرده سازی توضیحات MCP را در زمان ثبت نام غیرفعال می کند                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (تنظیم = روشن)                           | نام مستعار جایگزین برای همان ضامن مانند بالا                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                  | لغو بودجه برای مدیریت داخلی (سلامت، انعطاف پذیری، ترکیب، سهمیه، استفاده)                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                  | لغو بودجه برای هاپ هایی که منتظر ارائه دهنده هستند (`route_request`، `web_search`، `web_fetch`)                                                                                                                                                                                                                     |
| `MCP_TOOL_DENY`                         | (تنظیم = بدون فیلتر)                     | نام ابزار جدا شده با کاما برای حذف از `tools/list` (کاهش کاردینالیتی ابزار — زیر را ببینید)                                                                                                                                                                                                                         |
| `MCP_TOOL_ALLOW`                        | (تنظیم = بدون فیلتر)                     | نام ابزار جدا شده با کاما برای نگهداری منحصراً (حالت فهرست مجاز — در زیر ببینید)                                                                                                                                                                                                                                    |
| `DATA_DIR`                              | `~/.omniroute`                           | فایل ضربان قلب در `${DATA_DIR}/runtime/mcp-heartbeat.json` نوشته شده است                                                                                                                                                                                                                                            |

---

## توضیحات فشرده سازی

ابزار MCP ، اعلانها و ثبت منابع میتوانند توضیحات را در زمان registration/list فشردهسازی کنند تا ردپای ابرداده در معرض مشتریان (و در نتیجه هزینه متن سریع) را کاهش دهند. پیاده سازی در `open-sse/mcp-server/descriptionCompressor.ts` زندگی می کند و از طریق `compressMcpRegistryMetadata` داخل `createMcpServer()` به سرور MCP متصل می شود.

- فشردهسازی روی متن توضیحات با استفاده از مجموعه قوانین Caveman (`getRulesForContext("all", "full")`) با استخراج بلوکهای حفظشده (دهانههای کد، بلوکهای حصاردار، و غیره) اجرا میشود، بنابراین محتوای ساختاری تغییر نمیکند.
- تغییر وضعیت به ازای هر استقرار از طریق مقدار `compression.mcpDescriptionCompressionEnabled` در جدول تنظیمات `key_value` (پیشفرض: فعال) — در UI در معرض** فشرده سازی توضیحات تجزیه و تحلیل → MCP** .
- در سراسر فرآیند از طریق `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` یا `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` تغییر وضعیت دهید.
- آمارهای بیدرنگ از طریق `omniroute_compression_status` تحت `analytics.mcpDescriptionCompression` و برچسب `source: "mcp_metadata_estimate"` برای رفع ابهام از رسیدهای استفاده از ارائه دهنده واقعی ظاهر می شوند.

---

## کاهش کاردینالیته ابزار (F4.3)

فشرده سازی توضیحات، ابرداده هر ابزار را کوچک می کند.** کاهش کاردینالیته ابزار** با کاهش _چه تعداد_ ابزاری که اصلاً اعلام شده اند، یک قدم جلوتر می رود. تبلیغ ابزارهای کمتر در مانیفست `tools/list` هزینه توکن درخواستی را که مدل مشتری برای کاتالوگ ابزار پرداخت می کند کاهش می دهد (فشرده سازی "لایه 5"). پیاده سازی یک فیلتر خالص و بدون حالت در `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) است که به حلقه ثبت در `createMcpServer()` (`open-sse/mcp-server/server.ts`) متصل شده است.

**انتخاب، به طور پیشفرض غیرفعال است.** فیلتر فقط زمانی اجرا می شود که حداقل یکی از دو متغیر محیطی تنظیم شده باشد. با هیچ مجموعه ای، همه 110 ابزار بدون تغییر اعلام می شوند.

| متغیر            | حالت                                                                                           |
| :--------------- | :--------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | نام ابزارهای جدا شده با ویرگول — که همیشه از `tools/list` حذف می شوند را لیست سیاه کنید        |
| `MCP_TOOL_ALLOW` | Allow-list — نام ابزار جدا شده با کاما. فقط اینها زنده می مانند، بقیه چیزها کنار گذاشته می شود |

`deny` بر `allow` اولویت دارد. نام ها با کاما از هم جدا می شوند، بریده می شوند و ورودی های خالی نادیده گرفته می شوند. مثال ها:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**چگونه ابزارهای فیلتر شده حذف می شوند:** ثبت نام همیشه موفق است. ابزاری که نمایه آن را رد می کند، `.disable()` d روی دسته MCP SDK است، بنابراین هرگز در `tools/list` ظاهر نمی شود اما سیم کشی دست نخورده باقی می ماند ( enable/disable تمیز، بدون ثبت مجدد). تجزیه کننده پروفایل `readMcpToolProfileFromEnv(process.env)` است که وقتی هر دو متغیر خالی هستند `null` (بدون فیلتر) را برمی گرداند.

شکل غنیتر `ToolProfile` پشت `reduceToolManifest` همچنین از فیلتر محدوده تقاطع (`allowScopes`، با تطبیق حروف عام `read:*` -style ) و یک سرپوش قطعی `maxTools` پشتیبانی میکند، اما این دو دستگیره در زمان ثبت به مانیفست کامل نیاز دارند و** نه** امروزه از طریق متغیرهای محیطی در معرض دید قرار می گیرد (قلاب `tools/list` -level یک پیگیری ردیابی شده است). `estimateManifestTokens()` برای مقایسه هزینه توکن مانیفست قبل و بعد از کاهش در دسترس است.

---

## ضربان قلب زمان اجرا

حمل و نقل stdio هر 5 ثانیه به `${DATA_DIR}/runtime/mcp-heartbeat.json` ادامه می دهد. داشبورد (`/api/mcp/status`) این فایل را به همراه PID liveness برای استخراج `online` می خواند. HTTP وضعیت گزارش را از `getMcpHttpStatus()` در فرآیند انتقال میدهد (بدون نوشتن فایل).

عکس فوری ضربان قلب شامل:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## ثبت حسابرسی

هر فراخوانی ابزار توسط `open-sse/mcp-server/audit.ts` به جدول SQLite `mcp_tool_audit` ثبت می شود:

- نام ابزار، آرگومان ها (hashed/truncated as per-tool `auditLevel`)، نتیجه
- مدت زمان بر حسب ms، پرچم success/failure ، پیام خطا (در صورت وجود)
- هش کلید API ، مهر زمانی
- انکار دامنه بهعنوان `scope_denied:<reason>` با فهرست محدوده گمشده ثبت میشود

از داشبورد یا نقاط پایانی `/api/mcp/audit` و `/api/mcp/audit/stats` REST برای بررسی تماسهای اخیر استفاده کنید.

---

## فایل ها

| فایل                                                                     | هدف                                                          |
| :----------------------------------------------------------------------- | :----------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | کارخانه سرور MCP ، نقطه ورودی stdio، ثبت ابزارهای scoped     |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + حمل و نقل HTTP قابل جریان (مدیریت جلسه)                |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ارزیابی دامنه ابزار و وضوح تماس گیرنده                       |
| `open-sse/mcp-server/audit.ts`                                           | ثبت حسابرسی تماس ابزار (`mcp_tool_audit`)                    |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat writer (`mcp-heartbeat.json`)                |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | فشرده سازی توضیحات برای ثبت ابزار / اعلان / منبع             |
| `open-sse/mcp-server/schemas/tools.ts`                                   | طرحوارههای Zod رجیستری ابزار + (`MCP_TOOLS`، 45 ورودی)       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | فاز 2 + cache + 1proxy tool handlers                         |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | دسته های ابزار فشرده سازی                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | تعاریف ابزار حافظه (3 ابزار)                                 |
| `open-sse/mcp-server/tools/skillTools.ts`                                | تعاریف ابزار مهارت (4 ابزار)                                 |
| `open-sse/mcp-server/tools/notionTools.ts`                               | تعاریف ابزار منبع زمینه Notion (6 ابزار)                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | تعاریف ابزار گیمیفیکیشن (8 ابزار)                            |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | ابزارهای ثبت و مدیریت پلاگین (8 ابزار)                       |
| `src/app/api/mcp/status/route.ts`                                        | نقطه پایان `/api/mcp/status`                                 |
| `src/app/api/mcp/tools/route.ts`                                         | نقطه پایان `/api/mcp/tools`                                  |
| `src/app/api/mcp/sse/route.ts`                                           | مسیر حمل و نقل `/api/mcp/sse` SSE                            |
| `src/app/api/mcp/stream/route.ts`                                        | مسیر حمل و نقل HTTP قابل جریان `/api/mcp/stream`             |
| `src/app/api/mcp/audit/route.ts`                                         | جستجوی گزارش حسابرسی `/api/mcp/audit`                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | معیارهای حسابرسی انبوه `/api/mcp/audit/stats`                |
| `src/lib/notion/api.ts`                                                  | مشتری Notion REST API (تلاش مجدد، مهلت زمانی، طبقه بندی خطا) |
| `src/lib/db/notion.ts`                                                   | تداوم نشانه Notion (جدول `key_value` )                       |
| `src/app/api/settings/notion/route.ts`                                   | تنظیمات Notion API (GET/POST/DELETE)                         |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | مدیریت توکن Notion UI                                        |
| `tests/unit/notion-api.test.ts`                                          | تست های مشتری Notion API (7)                                 |
| `tests/unit/notion-tools.test.ts`                                        | تست های اجرای دامنه ابزار Notion (10)                        |
| `tests/unit/db/notion.test.mjs`                                          | تست های ماژول Notion DB (3)                                  |
