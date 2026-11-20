# 🐳 Docker Guide — OmniRoute (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker ডিপ্লয়মেন্টের সম্পূর্ণ রেফারেন্স। দ্রুত শুরু করতে, [README-এর Docker বিভাগ](../README.md#-docker) দেখুন।

## সূচিপত্র

- [দ্রুত চালু করা](#quick-run)
- [এনভায়রনমেন্ট ফাইলসহ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [উপলভ্য প্রোফাইলসমূহ](#available-profiles)
- [OmniRoute Docker-এ চলার সময় হোস্ট CLI টুল কনফিগার করা](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis সাইডকার](#redis-sidecar)
- [প্রোডাকশন Compose](#production-compose)
- [Dockerfile স্টেজসমূহ](#dockerfile-stages)
- [গুরুত্বপূর্ণ এনভায়রনমেন্ট ভেরিয়েবলসমূহ](#critical-environment-variables)
- [Caddy-সহ Docker Compose (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [ইমেজ ট্যাগসমূহ](#image-tags)
- [Docker-এ ড্যাশবোর্ড আপডেট](#dashboard-updates-in-docker)
- [উপলভ্যতা: ডিফল্ট SQLite একক-রেপ্লিকা](#availability-default-sqlite-is-single-replica)
- [Docker-এর ভেতরে Gemini-এর আঞ্চলিক ত্রুটি](#gemini-regional-errors-inside-docker)
- [গুরুত্বপূর্ণ নোটসমূহ](#important-notes)

---

## দ্রুত রান

> **এক কমান্ডে স্ব-হোস্ট?** [স্ব-হোস্ট গাইড](../getting-started/SELF_HOST_GUIDE.md) দেখুন — `docker compose -f docker-compose.selfhost.yml up -d` (প্রকাশিত চিত্র + Redis, শুধুমাত্র লুপব্যাক, কোন প্রোফাইল পছন্দ নেই)। নিচের Quick Run হল একক-কন্টেইনার পাথ যারা ইতিমধ্যেই অন্য কোথাও Redis চালাচ্ছেন।

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## এনভায়রনমেন্ট ফাইল সহ

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# বেস প্রোফাইল (কোনো CLI টুল নেই)
docker compose --profile base up -d

# CLI প্রোফাইল (Claude Code, Codex, OpenClaw বিল্ট-ইন)
docker compose --profile cli up -d

# হোস্ট প্রোফাইল (প্রধানত Linux-এর জন্য; হোস্ট CLI বাইনারিগুলো শুধু-পঠনযোগ্য হিসেবে মাউন্ট করে)
docker compose --profile host up -d

# ওয়েব প্রোফাইল (ওয়েব-সেশন প্রোভাইডারগুলোর জন্য Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI সাইডকার একত্রে ব্যবহার করুন
docker compose --profile cli --profile cliproxyapi up -d
```

## উপলভ্য প্রোফাইলসমূহ

প্রধান ডিপ্লয়মেন্ট বিন্যাসগুলোর জন্য OmniRoute-এর সঙ্গে Compose প্রোফাইল সরবরাহ করা হয়। আপনার পরিবেশের সঙ্গে মানানসই প্রোফাইলটি বেছে নিন।

| প্রোফাইল        | সার্ভিস          | কখন ব্যবহার করবেন                                                                                                                                      | কমান্ড                                       |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (ডিফল্ট) | `omniroute-base` | হেডলেস সার্ভার / ন্যূনতম রানটাইম, কোনো প্রোভাইডার CLI অন্তর্ভুক্ত নেই                                                                                  | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | `omniroute providers/setup/doctor` এবং অন্তর্ভুক্ত CLI-গুলোকে (Codex, Claude Code, Droid, OpenClaw) কল করা এজেন্টিক ওয়ার্কফ্লো                        | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | যেসব Linux হোস্ট `~/.local/bin`, `~/.codex`, `~/.claude` ইত্যাদি শুধু-পঠনযোগ্য হিসেবে মাউন্ট করে হোস্ট CLI-গুলোতে `network_mode`-এর মতো অ্যাক্সেস চায় | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | আপস্ট্রিম CLI প্রক্সিংয়ের জন্য `8317` পোর্টে [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) সাইডকার চালান                                | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | যেসব ওয়েব-সেশন প্রোভাইডারের ব্রাউজার প্রয়োজন: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` বিল্ড করে, Chromium অন্তর্ভুক্ত)          | `docker compose --profile web up -d`         |

> একাধিক প্রোফাইল একত্রে ব্যবহার করা যায়: `docker compose --profile cli --profile cliproxyapi up -d`।

## OmniRoute Docker-এ চলার সময় হোস্ট CLI টুল কনফিগার করা

`omniroute setup-codex`, `setup-claude`, `config set <tool>` এবং ড্যাশবোর্ডের
**কনফিগ সংরক্ষণ করুন** বোতাম—সবই `~/.codex/*.config.toml`-এর মতো ফাইলে লেখে। এই পাথগুলোর
অর্থ কেবল সেই মেশিনেই আছে, যেখানে CLI বাস্তবে চলে। এগুলো কনটেইনারের ভিতরে
চালালে লেখা কনটেইনারের নিজস্ব হোমে (`/home/node` —
ইমেজটি `USER node` হিসেবে চলে) সংরক্ষিত হয়, যেখান থেকে কোনো হোস্ট CLI কখনো এটি পড়বে না এবং
কনটেইনার পুনরায় তৈরি হওয়ার সঙ্গে সঙ্গেই এটি মুছে যাবে।

OmniRoute এটি শনাক্ত করে এবং আপনি ব্যবহার করতে পারবেন না এমন সাফল্য দেখানোর পরিবর্তে
নির্দেশনাসহ লেখার কাজটি প্রত্যাখ্যান করে: CLI `2` কোডে প্রস্থান করে এবং API `422`
ও `containerEphemeralTarget: true` সহ উত্তর দেয়।

### প্রস্তাবিত: CLI হোস্টে এবং OmniRoute Docker-এ চালান

কনটেইনার API পরিবেশন করে; CLI আপনার হোস্ট টুলগুলো কনফিগার করে।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-কে কনটেইনারের দিকে নির্দেশ করুন
omniroute setup-codex                      # আপনার হোস্টের আসল ~/.codex-এ লেখে
```

Codex, Claude Code, Cursor বা অনুরূপ টুল আপনার
ল্যাপটপে চললে এটিই সঠিক পছন্দ—যা সাধারণত প্রচলিত সেটআপ।

### বিকল্প: হোস্ট কনফিগ ডিরেক্টরিগুলো bind-mount করুন (`host` প্রোফাইল)

আপনি যদি কনটেইনার থেকেই হোস্ট কনফিগ লিখতে চান, তাহলে
ডিরেক্টরিগুলো মাউন্ট করুন এবং `CLI_CONFIG_HOME`-কে মাউন্ট রুটে নির্দেশ করুন। `host` প্রোফাইল
ইতিমধ্যেই এটি করে:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount-ই পাথটিকে বিশ্বাসযোগ্য করে: OmniRoute
`/proc/self/mountinfo` পড়ে এবং মাউন্ট করা পাথে (এবং যেসব ডিরেক্টরির
সন্তান ডিরেক্টরি মাউন্ট করা আছে, যা ঠিক উপরের `/host-home` বিন্যাসটির মতো) লেখার অনুমতি দেয়, একই সঙ্গে
মাউন্ট না করা পাথগুলো প্রত্যাখ্যান করে।

### বিকল্প ব্যবস্থা: কনটেইনারের নিজস্ব CLI-গুলো কনফিগার করুন (সীমিতভাবে ব্যবহার করুন)

CLI-গুলো যখন সত্যিই কনটেইনারের ভিতরে থাকে (`cli` প্রোফাইল), তখন লেখার কাজটি
ইচ্ছাকৃত। যেকোনো `setup-*` কমান্ডে `--allow-container-write` দিন, অথবা সার্ভারের জন্য
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` সেট করুন। লেখার কাজটি সম্পন্ন হবে,
তবে সতর্কবার্তা দেখাবে যে এটি কনটেইনারের পরেও টিকে থাকবে না।

> **নিরাপত্তা সতর্কতা — `cli` প্রোফাইল + `docker.sock` মাউন্ট।**
> `cli` প্রোফাইল `/var/run/docker.sock` bind-mount করে, যাতে কনটেইনারের ভিতরের
> auto-updater হোস্ট daemon থেকে stack পুনরায় তৈরি করতে পারে
> (`src/lib/system/autoUpdate.ts` ওই socket-এর উপস্থিতি পরীক্ষা করে এবং সেটি
> অনুপস্থিত থাকলে Docker পাথ এড়িয়ে যায়)। ওই socket হলো **হোস্ট-root বিশ্বাসের
> সীমানা**: এতে প্রবেশাধিকার আছে এমন যেকোনো কিছু root হিসেবে হোস্ট Docker daemon
> নিয়ন্ত্রণ করতে পারে—এটি হোস্টের যেকোনো কনটেইনার তৈরি, পরিদর্শন, বন্ধ এবং অপসারণ করতে পারে।
> এর প্রভাব:
>
> 1. **`cli` প্রোফাইলের port কখনো নেটওয়ার্কে উন্মুক্ত করবেন না।** এটিকে
>    `127.0.0.1`-এ প্রকাশ করুন (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN থেকে পৌঁছানো যায় এমন `cli` প্রোফাইল যেকোনো dashboard-স্তরের RCE-কে
>    সম্পূর্ণ হোস্ট আপসের সুযোগে পরিণত করে।
> 2. **`cli` প্রোফাইলে অতিরিক্ত কোনো হোস্ট ডিরেক্টরি bind করবেন না।**
>    Docker socket-এর সঙ্গে যেকোনো অতিরিক্ত mount কনটেইনারকে আপনার filesystem এবং
>    হোস্ট কনফিগে পূর্ণ read/write প্রবেশাধিকার দেয়। কোনো টুলের একটি project দেখার
>    প্রয়োজন হলে, সেটিকে CLI binary দিয়ে স্থানীয়ভাবে চালান—`cli` কনটেইনারে
>    mount করবেন না।
>
> কনটেইনারের ভিতরে auto-update প্রয়োজন না হলে `cli` প্রোফাইল বন্ধ রাখুন
> (`COMPOSE_PROFILES=core,redis` বা আরও সংক্ষিপ্ত কোনো মান)। অন্য প্রোফাইলগুলো
> Docker socket মাউন্ট করে না।
>
> MITM-সংক্রান্ত threat model-এর জন্য `docs/security/MITM-TPROXY-DECRYPT.md` দেখুন
> (git-এ আছে; `/docs`-এ compile করা হয়নি), এবং
> `codex`/`claude-code`/`droid`/`openclaw` binary provenance chain-এর জন্য
> `docs/security/SUPPLY_CHAIN.md` দেখুন।

## Redis সাইডকার

OmniRoute বিতরণকৃত রেট লিমিটার ও শেয়ার্ড ক্যাশের ব্যাকএন্ড হিসেবে Redis-এর ওপর নির্ভর করে। `redis` সার্ভিসটি `docker-compose.yml`-এ **সবসময় সংজ্ঞায়িত থাকে** (এতে কোনো প্রোফাইল গেট নেই) এবং অন্য যেকোনো প্রোফাইলের সঙ্গে চালু হয়।

| বিবরণ                   | মান                                    |
| ----------------------- | -------------------------------------- |
| ইমেজ                    | `redis:7-alpine`                       |
| কনটেইনারের নাম          | `omniroute-redis`                      |
| অভ্যন্তরীণ পোর্ট        | `6379`                                 |
| হোস্ট পোর্ট (ওভাররাইড)  | `REDIS_PORT` (ডিফল্ট `6379`)           |
| হোস্ট বাইন্ড (ওভাররাইড) | `REDIS_BIND_HOST` (ডিফল্ট `127.0.0.1`) |
| ভলিউম                   | `omniroute-redis-data` → `/data`       |
| হেলথচেক                 | `redis-cli ping` (10s ব্যবধান)         |

সংশ্লিষ্ট এনভায়রনমেন্ট ভেরিয়েবলসমূহ:

- `REDIS_URL` — অ্যাপে ইনজেক্ট করা সংযোগ স্ট্রিং (ডিফল্টভাবে `redis://redis:6379`)।
- `REDIS_PORT` — Redis কনটেইনারের জন্য হোস্ট-সাইড পোর্ট ম্যাপিং।
- `REDIS_BIND_HOST` — যে হোস্ট ইন্টারফেসে পোর্টটি প্রকাশ করা হয়। ডিফল্ট `127.0.0.1`।

> **ডিফল্টভাবে লুপব্যাক ব্যবহারের কারণ:** সাইডকারটি `requirepass` ছাড়াই চলে, এবং অ্যাপ
> কনটেইনারগুলো compose নেটওয়ার্কের মাধ্যমে এতে পৌঁছায় (`redis:6379`) — প্রকাশিত পোর্টটি
> কেবল হোস্ট-সাইড টুলিংয়ের জন্য (`redis-cli`, একটি স্থানীয় `npm run dev`)। `0.0.0.0`-এ
> প্রকাশ করলে আপনার LAN-এর প্রতিটি হোস্টের কাছে একটি প্রমাণীকরণবিহীন Redis উন্মুক্ত হয়ে যাবে। আপনি
> `REDIS_BIND_HOST=0.0.0.0` সেট করলে, সার্ভিসের `command:`-এ `--requirepass`-ও যোগ করুন।

**Redis নিষ্ক্রিয় করা** সুপারিশ করা হয় না (রেট লিমিটার ইন-মেমরি ফলব্যাকে অবনমিত হবে)। যদি করতেই হয়, তবে `docker-compose.yml`-এর `redis:` সার্ভিস ব্লকটি সরিয়ে/কমেন্ট করে দিন অথবা এটিকে শূন্যে স্কেল করুন:

```bash
docker compose up -d --scale redis=0
```

## প্রোডাকশন Compose

ডেভের পাশাপাশি চলমান একটি বিচ্ছিন্ন প্রোডাকশন স্ন্যাপশটের জন্য `docker-compose.prod.yml` ব্যবহার করুন।

| বিবরণ                   | মান                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| ফাইল                    | `docker-compose.prod.yml`                                                                    |
| ডিফল্ট ড্যাশবোর্ড পোর্ট | `PROD_DASHBOARD_PORT=20130` (অভ্যন্তরীণ `${DASHBOARD_PORT:-20128}`-এ ম্যাপ করা)              |
| ডিফল্ট API পোর্ট        | `PROD_API_PORT=20131`                                                                        |
| ইমেজ                    | `omniroute:prod` (`runner-cli` টার্গেট থেকে বিল্ড করা)                                       |
| Redis কনটেইনার          | `omniroute-redis-prod` (`redis:8.6.2`, নিবেদিত `redis-prod-data` ভলিউম)                      |
| ডেটা ভলিউম              | `omniroute-prod-data` (নামযুক্ত, পুনরায় বিল্ডের পরও সংরক্ষিত)                               |
| হেলথচেক                 | `node healthcheck.mjs` + `redis-cli ping`, যেখানে `depends_on` Redis-এর হেলথের ওপর নির্ভরশীল |

ব্যবহারের পদ্ধতি:

```bash
# প্রোডাকশন স্ট্যাক বিল্ড ও চালু করুন
docker compose -f docker-compose.prod.yml up -d --build

# লগ স্ট্রিম করুন
docker compose -f docker-compose.prod.yml logs -f

# বন্ধ করুন (ভলিউমগুলো রাখুন)
docker compose -f docker-compose.prod.yml down
```

প্রোড স্ট্যাকটি ডেভ compose-এর সঙ্গে সমান্তরালে চলে (কনটেইনারের নাম, পোর্ট ও ভলিউম আলাদা), তাই প্রোডাকশন চালু থাকা অবস্থাতেও আপনি স্থানীয়ভাবে কাজ চালিয়ে যেতে পারেন।

## ডকারফাইল পর্যায়গুলি

রিপোজিটরিটি একটি মাল্টি-স্টেজ ডকারফাইল (`Dockerfile`) পাঠায়। চারটি পর্যায় উন্মোচিত হয়; আপনার ব্যবহারের ক্ষেত্রে সঠিক `target` বেছে নিন।

| মঞ্চ          | বেস ইমেজ              | উদ্দেশ্য                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | deps (`npm ci --legacy-peer-deps`) ইনস্টল করে এবং `npm run build` চালায় (Turbopack ডিফল্ট — নিচে বিল্ড-টাইম রিসোর্স দেখুন)                                                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Next.js স্বতন্ত্র আউটপুট সহ উত্পাদন রানটাইম।** কোন প্রদানকারী CLIs বান্ডিল.**                                                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` এবং গ্লোবাল CLIs যোগ করে: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`।** এজেন্টিক কর্মপ্রবাহের জন্য এটি বেছে নিন।**                                                                                                                          |
| `runner-web`  | `runner-base`         | ওয়েব-সেশন প্রদানকারীদের জন্য Playwright + একটি Chromium ব্রাউজার (`--with-deps`) যোগ করে: `gemini-web`, `claude-web`, `claude-turnstile` ৷** আপনি যখন সেই প্রদানকারীগুলি ব্যবহার করেন তখন এটি বেছে নিন** — প্লেইন ছবিটি অনুরোধের সময় এটি ছাড়া ব্যর্থ হয় (রিলিজ চ্যানেলের অধীনে `-web` নোটটি দেখুন)। |

ম্যানুয়ালি একটি নির্দিষ্ট লক্ষ্য তৈরি করুন:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### বিল্ড-টাইম সম্পদ

তিনটি বিল্ড আর্গস নিয়ন্ত্রণ করে যে `builder` পর্যায়ে কত খরচ হয়। তারা বিল্ড-টাইম শুধুমাত্র — `OMNIROUTE_MEMORY_MB` (নীচে) একটি পৃথক, রানটাইম নব।

| আর্গ তৈরি করুন              | ডিফল্ট | প্রভাব                                                                                |
| --------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` ওয়েবপ্যাক দিয়ে তৈরি করে: নিম্ন পিক মেমরি, ধীর। `1` Turbopack নির্বাচন করে।      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | জন্মানো `next build` জন্য V8 হিপ সিলিং (`--max-old-space-size`)।                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | ফিড `CIRCLE_NODE_TOTAL`; পরবর্তী পৃষ্ঠা-ডেটা সংগ্রহের জন্য `workers = N - 1` প্রাপ্ত। |

`OMNIROUTE_BUILD_WORKERS` হল একটি বড় নির্মাতার উপর উত্থাপন করা এবং যখন একটি সীমাবদ্ধ বিল্ড মারা গেলে সন্দেহ করা হয়** পরে** `✓ Compiled successfully` প্রতিটি পৃষ্ঠা-ডেটা কর্মী তার নিজস্ব প্রক্রিয়া, এবং একইভাবে প্যারেন্ট `next build` নিজেই; একটি লাইভ VPS প্রজনন (ইস্যু #7518) প্রতিটি প্রক্রিয়ার পিক RSS পরিমাপ করেছে ~ 4.5 GB এ `NODE_OPTIONS` হিপ পতাকা থেকে স্বাধীন (Turbopack V8 স্তূপের বাইরে native/Rust মেমরিতে কম্পাইল করে)। `2` এর ডিফল্ট (→ 1 কর্মী, 2 প্রক্রিয়া মোট) 16 GB / 4 vCPU GitHub- হোস্টেড রানারদের জন্য সাইজ করা হয়েছে যা প্রকাশনা পাইপলাইন ব্যবহার করে। `8` এ (→ 7কর্মী) সেই রানার মেমরি ফুরিয়ে গিয়েছিল এবং বিল্ডকিট `ResourceExhausted: ... cannot allocate memory` এর সাথে ধাপে ব্যর্থ হয়েছিল; `3` (→ 2 কর্মী) এখনও ফিট হয়নি একবার প্রতি-প্রক্রিয়া RSS অনুমানের পরিবর্তে সরাসরি পরিমাপ করা হয়। `tests/unit/docker-build-memory-budget.test.ts` পরিমাপ করা চিত্রের বিপরীতে পাটিগণিত করে এবং ব্যর্থ হয় যদি কোন একটি নব রানারকে ছাড়িয়ে যায়।

Turbopack নেটিভ রাস্ট মেমরিতে কম্পাইল করে যা বেঁচে থাকে** বাইরে** V8 হিপ, তাই `OMNIROUTE_BUILD_MEMORY_MB` এটিকে আবদ্ধ করে না। একটি মেমরি সিলিং সহ একটি হোস্টে বিল্ডটি OOM কিলার দ্বারা SIGKILLed হয় কোন ত্রুটি টেক্সট ছাড়াই — এটি কেবল মিড-`Creating an optimized production build` স্টপ করে, যা মেমরির বাইরের পরিবর্তে একটি হ্যাং এর মতো পড়ে। সে কারণেই `npm run dev` / `npm run build` বিপরীতে `Dockerfile` ওয়েবপ্যাকে (`OMNIROUTE_USE_TURBOPACK=0`) ডিফল্ট হয়, যেখানে Turbopack হল কোড ডিফল্ট: একটি বেয়ার `docker build .` যার কোনো বিল্ড আর্গ নেই (যা রেলওয়ে এবং অন্যান্য এক-ক্লিক হোস্ট চালায়) মেমরি-ক্যাপড বিল্ডারে চুপচাপ মারা যাবে না। প্রকাশিত ছবিগুলি ইতিমধ্যেই `docker-publish.yml` এ স্পষ্টভাবে `OMNIROUTE_USE_TURBOPACK=0` পাস করেছে৷ প্রচুর পরিমাণে RAM আছে এমন একজন নির্মাতার উপর, দ্রুত বিল্ডের জন্য Turbopack বেছে নিন:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` সক্রিয় করা হয়েছে, তাই `next build` একজন অভিভাবক চালায়** এবং** একটি কর্মী প্রক্রিয়া এবং প্রতিটি সম্মান `OMNIROUTE_BUILD_MEMORY_MB` আলাদাভাবে। কন্টেইনার সিলিংকে একবার নয়, সেই মানের প্রায় দ্বিগুণ উপরে রাখুন।

এই গাছে পরিমাপ করা হয় (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| বান্ডলার   | কন্টেইনার সিলিং | ফলাফল                     |
| ---------- | --------------- | ------------------------- |
| Turbopack  | 8 GiB / 16 GiB  | ওওএম-নিঃশব্দে উভয়েই নিহত |
| ওয়েবপ্যাক | 8 GiB           | শ্রমিক SIGKILLed নির্মাণ  |
| ওয়েবপ্যাক | 12 GiB          | সফল, 11.1 GiB এ শীর্ষে    |

### রানটাইম ডিফল্ট

`runner-base` দ্বারা রপ্তানিকৃত ডিফল্ট: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker তে স্মৃতির আচরণ:

- ছবিটি `OMNIROUTE_MEMORY_MB=1024` সেট করে এবং এটি থেকে `NODE_OPTIONS=--max-old-space-size=1024` প্রাপ্ত হয়।
- প্রকৃত সার্ভার প্রক্রিয়াটি স্বতন্ত্র লঞ্চার দ্বারা শুরু হয়, যা `OMNIROUTE_MEMORY_MB` পড়ে এবং `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` যুক্ত করে।
- নোড শেষ বার বার করা `--max-old-space-size` মান ব্যবহার করে, তাই `OMNIROUTE_MEMORY_MB` সেট করা কার্যকর Docker হিপ সীমা নিয়ন্ত্রণ করে।
- যেহেতু চিত্রটি সর্বদা এটি সেট করে, লঞ্চারের নিজস্ব RAM-ক্যালিব্রেটেড ফলব্যাক কখনই Docker এর অধীনে প্রযোজ্য হয় না। কাজের চাপের জন্য এটি স্পষ্টভাবে বাড়ান (নীচের টেবিল)। কোডিং-এজেন্ট `/v1/responses` এর জন্য `2048` এখনও খুব ছোট।

### কোডিং এজেন্টদের জন্য রানটাইম RAM

1 GiB Docker ডিফল্ট একটি dashboard/light-chat ফ্লোর, উৎপাদন আকার নয়। কম্প্রেশনের সময় লং `POST /v1/responses` বডি (শতশত বার্তা, দশ হাজার টুল) একাধিক ইন-মেমরি গ্রাফ ধরে রাখে। দুটি ওভারল্যাপিং ~ 3 MiB / ~ 750k-টোকেন অনুরোধ একটি এ V8 বাতিল করেছে** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) এবং একটি 16 GiB cgroup OOM হিট করে। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) দেখুন।

আকার** স্তূপের উপরে cgroup `--memory`** — নেটিভ বাফার, SQLite এবং কম্প্রেশন ইন্টারমিডিয়েট V8 এর বাইরে বসে।

| কাজের চাপ                           | `OMNIROUTE_MEMORY_MB`    | ধারক / cgroup       | নোট                                                                                |
| ----------------------------------- | ------------------------ | ------------------- | ---------------------------------------------------------------------------------- |
| ড্যাশবোর্ড, এক হালকা চ্যাট          | `1024` (চিত্র ডিফল্ট)    | ≥2 GiB              |                                                                                    |
| এক কোডিং এজেন্ট (Claude/Codex/Grok) | `8192`                   | ≥10 GiB             | সাধারণ একক-সেশন `/v1/responses`                                                    |
| দুই সমবর্তী দীর্ঘ `/v1/responses`   | `10240`–`12288`          | ≥12–16 GiB          | ~ 12 GiB হিপে V8 পরিমাপ করা হয়েছে                                                 |
| তিন + সমবর্তী দীর্ঘ প্রসঙ্গ         | এক প্রক্রিয়ায় করবেন না | serialize / আরো RAM | ডিফল্ট হেভিওয়েট ভর্তি 1 ইন-ফ্লাইট; RAM ছাড়া এটি উত্থাপন গর্ভপাত পুনরায় প্রবর্তন |

বেয়ার মেটালের উপর `omniroute serve` যখন `OMNIROUTE_MEMORY_MB` হয় তখন RAM ~ ক্ল্যাম্পড `[512, 4096]`) ক্যালিব্রেট করে** আনসেট** . Docker সর্বদা `1024` সেট করে, যাতে ক্রমাঙ্কন কখনই অফিসিয়াল ছবিতে চলে না।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## গুরুত্বপূর্ণ এনভায়রনমেন্ট ভেরিয়েবলসমূহ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-এ নথিভুক্ত ডিফল্টগুলোর পাশাপাশি, Docker-এর অধীনে চালানোর সময় নিম্নলিখিত ভেরিয়েবলগুলো সবচেয়ে গুরুত্বপূর্ণ:

| ভেরিয়েবল                     | উদ্দেশ্য                                                                                                                                                                                                                                                             | ডিফল্ট                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ব্রিজের জন্য শেয়ার করা সিক্রেট। **প্রোডাকশনে আবশ্যক** — একটি শক্তিশালী র্যান্ডম স্ট্রিং নির্ধারণ করুন।                                                                                                                                                    | অনির্ধারিত (প্রদান করতে হবে) |
| `REDIS_URL`                   | রেট লিমিটার / ক্যাশ ব্যাকএন্ডের জন্য সংযোগ স্ট্রিং                                                                                                                                                                                                                   | `redis://redis:6379`         |
| `REDIS_PORT`                  | অন্তর্ভুক্ত Redis কনটেইনারের হোস্ট-সাইড পোর্ট                                                                                                                                                                                                                        | `6379`                       |
| `REDIS_BIND_HOST`             | যে হোস্ট ইন্টারফেসে অন্তর্ভুক্ত Redis পোর্ট প্রকাশিত হয় (AUTH যোগ না করলে লুপব্যাক)                                                                                                                                                                                 | `127.0.0.1`                  |
| `AUTO_UPDATE_HOST_REPO_DIR`   | স্বয়ংক্রিয় আপডেট ওয়ার্কফ্লোর জন্য `cli` প্রোফাইলে `/workspace/omniroute`-এ মাউন্ট করা হোস্ট পাথ                                                                                                                                                                   | `.` (বর্তমান ডিরেক্টরি)      |
| `OMNIROUTE_MEMORY_MB`         | Docker স্বতন্ত্র সার্ভারের রানটাইম Node হিপ সীমা; উপরের ইমেজ ডিফল্টকে ওভাররাইড করে। কোডিং এজেন্ট: `8192`+ ([রানটাইম RAM](#runtime-ram-for-coding-agents) দেখুন)।                                                                                                     | `1024`                       |
| `DASHBOARD_PORT` / `API_PORT` | ড্যাশবোর্ড (20128) এবং API-এর (20129) প্রকাশিত পোর্ট ওভাররাইড করে                                                                                                                                                                                                    | `20128` / `20129`            |
| `APP_BIND_HOST`               | যে হোস্ট ইন্টারফেসে docker-compose ড্যাশবোর্ড/API/live-WS পোর্টগুলো প্রকাশ করে। `REQUIRE_API_KEY=false` (ডিফল্ট) থাকলে, `0.0.0.0` বেনামী `/v1` প্রক্সিকে LAN-এ উন্মুক্ত করে — কেবল `REQUIRE_API_KEY=true` থাকলে বা সামনে একটি রিভার্স প্রক্সি থাকলে এর পরিধি বাড়ান। | `127.0.0.1`                  |
| `CLIPROXY_BIND_HOST`          | যে হোস্ট ইন্টারফেসে docker-compose `cliproxyapi` সাইডকারটি প্রকাশ করে — এর ডেটা ভলিউমে প্রোভাইডারের ক্রেডেনশিয়াল সংরক্ষিত থাকে।                                                                                                                                     | `127.0.0.1`                  |
| `OMNIROUTE_PLUGINS_DIR`       | রানটাইম প্লাগইন স্ক্যানার যে ডিরেক্টরি থেকে পড়ে এবং যেখানে ইনস্টল করে। প্লাগইনগুলো bind-mounted হলে এটি নির্ধারণ করুন: ডিফল্টটি `HOME` অনুসরণ করে, যা কোনো ইমেজ এক্সপোর্ট নাও করতে পারে।                                                                            | `~/.omniroute/plugins`       |
| `OMNIROUTE_BASE_PATH`         | অ্যাপটি রিভার্স প্রক্সির পেছনে প্রকাশিত হলে ব্যবহৃত URL সাবপাথ (যেমন `/omniroute`)                                                                                                                                                                                   | _(খালি = রুট)_               |
| `NEXT_PUBLIC_BASE_URL`        | সাবপাথসহ পাবলিক ব্রাউজার অরিজিন (যেমন `https://host/omniroute`)                                                                                                                                                                                                      | অনির্ধারিত                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-এর জন্য হোস্ট-সাইড ড্যাশবোর্ড পোর্ট                                                                                                                                                                                                        | `20130`                      |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` সাইডকারের জন্য হোস্ট-সাইড পোর্ট                                                                                                                                                                                                                        | `8317`                       |

## একটি সাবপথে বিপরীত প্রক্সি (ট্র্যাফিক / এনজিনএক্স)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### রচনা রচনা (প্রস্তাবিত)

উভয় ভেরিয়েবল `.env` এ সেট করুন, তারপর পুনর্নির্মাণ করুন যাতে চিত্র এবং রানটাইম সম্মত হয়:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker বিল্ড-আর্গ এবং রানটাইম এনভায়রনমেন্ট ভেরিয়েবল হিসাবে এগিয়ে দেয়।

### প্রি-বিল্ট রুট ইমেজ + রানটাইম সাবপাথ

প্রকাশিত `cheaperinference/omniroute:*` ছবি ডোমেইন রুটের জন্য তৈরি করা হয়েছে। আপনি এখনও রানটাইমে `OMNIROUTE_BASE_PATH` সেট করতে পারেন; স্টার্টআপে একবার ধারকটি বান্ডিলটিকে প্যাচ করে। এটিকে সামঞ্জস্যপূর্ণ পাবলিক মূলের সাথে যুক্ত করুন:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ফরওয়ার্ড করতে বিপরীত প্রক্সি কনফিগার করুন** পূর্ণ** বাহ্যিক পথ (উপসর্গটি ফালাবেন না)। ট্রাফিকের উচিত `PathPrefix(`/omniroute `)` `StripPrefix` ছাড়াই কন্টেইনারে রুট করা, তাই Next.js `/omniroute/...` গ্রহণ করে এবং `/omniroute/_next/...` থেকে সম্পদ পরিবেশন করে।

Docker হেলথচেক সক্রিয় `OMNIROUTE_BASE_PATH` এর সাথে উপসর্গযুক্ত হালকা ওজনের `/healthz` লাইফসাইকেল এন্ডপয়েন্টকে পরীক্ষা করে। human/dashboard ডায়াগনস্টিকসের জন্য `/api/monitoring/health` উপলব্ধ রয়েছে; ধারক HEALTHCHECK দিকে ফিরে নির্দেশ করতে (উদাহরণস্বরূপ গভীর স্বাস্থ্য প্রয়োগের জন্য), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` সেট করুন। সেই পথটি হল ক** গভীর** চেক করুন (DB + মনিটরিং সারাংশ) — Docker এর বিরল `HEALTHCHECK` এর জন্য উপযুক্ত যদি আপনি আবার বেছে নেন, কিন্তু** না** Kubernetes `livenessProbe` অন্তরের জন্য।

অর্কেস্ট্রেটরদের জন্য (কুবারনেটস, যাযাবর, ইত্যাদি):

| অনুসন্ধান        | পছন্দ করুন                                                      | এড়িয়ে চলুন                                               |
| ---------------- | --------------------------------------------------------------- | ---------------------------------------------------------- |
| সজীবতা           | প্রধান পোর্টেHTTP `GET /livez`, বা TCP (`PORT`, ডিফল্ট `20128`) | জীবন্ততা হিসাবে`/api/monitoring/health`                    |
| প্রস্তুতি        | HTTP `GET /healthz`                                             | টাইট টাইমআউট যা ইভেন্ট-লুপ ব্যস্তকে মৃত হিসাবে বিবেচনা করে |
| গভীর/ব্ল্যাকবক্স | `/api/monitoring/health`                                        | —                                                          |

`/healthz` রিপোর্ট প্রক্রিয়া জীবনচক্র (`ok` / `starting` / `stopping`)। `/livez` শুধুমাত্র প্রক্রিয়া-জীবিত (200 যখনই হ্যান্ডলার চালাতে পারে; এটি প্রস্তুতির জন্য অপেক্ষা করে না)। উভয়ই এখনও অনুরোধ হ্যান্ডলিং হিসাবে একই নোড ইভেন্ট লুপে চলে, তাই সিপিইউ-বাউন্ড ক্যাটালগ বা কম্প্রেশন কাজ তাদের — ব্যস্ত ≠ ডেড বিলম্বিত করতে পারে। HTTP টাইম আউট হলে TCP সজীবতা পছন্দ করুন। সম্পূর্ণ তদন্ত নির্দেশিকা: [মনিটরিং গাইড — Kubernetes প্রোবের সুপারিশ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ।

## Docker ক্যাডির সাথে রচনা করুন (HTTPS অটো-টিএলএস)

Caddy এর স্বয়ংক্রিয় SSL বিধান ব্যবহার করেOmniRoute নিরাপদে প্রকাশ করা যেতে পারে। আপনার ডোমেনের DNS নিশ্চিত করুন A রেকর্ড আপনার সার্ভারের IP এ নির্দেশ করে।

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

ক্যাডি আপস্ট্রিম কন্টেইনারের জন্য স্ট্যান্ডার্ড ফরওয়ার্ডিং হেডার সেট করে। OmniRoute OAuth কলব্যাক এবং জেনারেট করা পাবলিক লিঙ্কের জন্য `NEXT_PUBLIC_BASE_URL` ক্যানোনিকাল পাবলিক অরিজিন হিসাবে ব্যবহার করে; প্রমাণীকৃত ড্যাশবোর্ড একই-অরিজিন অনুরোধ এবং সেশন-বাউন্ড CSRF সুরক্ষা ব্যবহার করে। শুধুমাত্র উন্নত স্থাপনার জন্য `OMNIROUTE_TRUST_PROXY` সক্ষম করুন যেখানে আপনি ইচ্ছাকৃতভাবে OmniRoute স্পষ্ট কনফিগারেশনের পরিবর্তে বিশ্বস্ত ফরোয়ার্ড হেডার থেকে সর্বজনীন উত্স অর্জন করতে চান৷

## Cloudflare Quick Tunnel

Docker ডিপ্লয়মেন্টের জন্য ড্যাশবোর্ড সমর্থনে `Dashboard → Endpoints`-এ এক ক্লিকের **Cloudflare Quick Tunnel** অন্তর্ভুক্ত রয়েছে। প্রথমবার সক্রিয় করার সময় শুধুমাত্র প্রয়োজন হলেই `cloudflared` ডাউনলোড করা হয়, আপনার বর্তমান `/v1` এন্ডপয়েন্টে একটি অস্থায়ী টানেল চালু করা হয় এবং আপনার স্বাভাবিক পাবলিক URL-এর ঠিক নিচে তৈরি করা `https://*.trycloudflare.com/v1` URL দেখানো হয়।

সক্রিয় টানেলের অবস্থা পরিবর্তন না করেই `Settings → Appearance` থেকে এন্ডপয়েন্ট টানেল প্যানেলগুলো (Cloudflare, Tailscale, ngrok) দেখানো বা লুকানো যায়।

### টানেল-সংক্রান্ত নোট

- Quick Tunnel URL অস্থায়ী এবং প্রতিবার রিস্টার্টের পর পরিবর্তিত হয়।
- OmniRoute বা কনটেইনার রিস্টার্টের পর Quick Tunnel স্বয়ংক্রিয়ভাবে পুনরুদ্ধার করা হয় না। প্রয়োজন হলে ড্যাশবোর্ড থেকে সেগুলো পুনরায় সক্রিয় করুন।
- পরিচালিত ইনস্টল বর্তমানে `x64` / `arm64`-এ Linux, macOS এবং Windows সমর্থন করে।
- সীমিত কনটেইনার পরিবেশে অতিরিক্ত QUIC UDP বাফার সতর্কতা এড়াতে পরিচালিত Quick Tunnel ডিফল্টভাবে HTTP/2 ট্রান্সপোর্ট ব্যবহার করে। ভিন্ন ট্রান্সপোর্ট চাইলে `CLOUDFLARED_PROTOCOL=quic` বা `auto` সেট করুন।
- Docker ইমেজগুলো সিস্টেম CA রুট অন্তর্ভুক্ত করে এবং সেগুলো পরিচালিত `cloudflared`-এ পাঠায়, যা কনটেইনারের ভেতরে টানেল বুটস্ট্র্যাপ হওয়ার সময় TLS বিশ্বাসযোগ্যতা-সংক্রান্ত ব্যর্থতা এড়ায়।
- OmniRoute যেন নতুন একটি বাইনারি ডাউনলোড করার পরিবর্তে বিদ্যমান বাইনারি ব্যবহার করে, তা চাইলে `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` সেট করুন।

## ছবি ট্যাগ

| ছবি                          | ট্যাগ    | আকার    | বর্ণনা                                                    |
| ---------------------------- | -------- | ------- | --------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | সর্বোচ্চ** প্রকাশিত** স্থিতিশীল SemVer ( git `main` নয় ) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | GitOps এর জন্য এই শ্রেণীর ট্যাগ পিন করুন                  |

একই ছবি তিনটি রিপোজিটরিতে প্রকাশিত হয়েছে, একই প্রতি-আর্কিটেকচার ডাইজেস্ট সহ: `cheaperinference/omniroute` (Docker হাব, সস্তা ইনফারেন্স সংস্থা, 3.8.53 থেকে), `ghcr.io/cheaper-inference/omniroute` এবং লিগ্যাসি `diegosouzapw/omniroute`, যা এর পুল ইতিহাস ধরে রাখে এবং এখনও প্রতিটি প্রকাশ পায়। বিদ্যমান `diegosouzapw/omniroute` স্থাপনা আপডেট হতে থাকে; ছবির নাম পরিবর্তন করা ঐচ্ছিক। নীচের `:next` / `:next-web` প্রাক-রিলিজ চ্যানেলটি শুধুমাত্র `diegosouzapw/omniroute` এবং GHCR তে প্রকাশিত হয়েছে।

মাল্টি-প্ল্যাটফর্ম ম্যানিফেস্ট: `linux/amd64` + `linux/arm64` নেটিভ (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker স্বয়ংক্রিয়ভাবে ম্যাচিং আর্কিটেকচার নির্বাচন করে; আপনার যদি ARM হোস্টে AMD64 এমুলেশন জোর করতে হয় তাহলে `--platform linux/amd64` পাস করুন।

### চ্যানেল মুক্তি

OmniRoute স্থিতিশীল রিলিজ, সক্রিয় রিলিজ-শাখা পরীক্ষা, এবং উন্নয়ন নির্মাণের জন্য পৃথক Docker চ্যানেল প্রকাশ করে।

| চ্যানেল                         | উৎস                                    | পরিবর্তনশীলতা                       | প্রস্তাবিত ব্যবহার                                                                                                           |
| ------------------------------- | -------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned মুক্তি                | অপরিবর্তনীয়                        | প্রোডাকশন ডিপ্লয়মেন্ট যা একটি সঠিক রিলিজ পিন করে                                                                            |
| `:latest` / `:latest-web`       | সর্বোচ্চ** প্রকাশিত** স্থিতিশীল SemVer | পরিবর্তনযোগ্য স্থিতিশীল পয়েন্টার   | স্থিতিশীল রিলিজ অনুসরণ করে** পরে** একটি SemVer প্রকাশনার কাজ — করে** না** `main` বা অপ্রকাশিত `release/v*` কমিট ট্র্যাক করুন |
| `:next` / `:next-web`           | বর্তমান ডিফল্ট `release/v*` শাখা       | পরিবর্তনযোগ্য প্রাক-রিলিজ পয়েন্টার | টেস্টিং ফিক্স যা সক্রিয় রিলিজ শাখায় অবতরণ করেছে কিন্তু এখনও স্থিতিশীল রিলিজে নেই                                           |
| `:main` / `:main-web`           | `main` শাখা                            | পরিবর্তনযোগ্য উন্নয়ন পয়েন্টার     | শুধুমাত্র উন্নয়ন এবং ইন্টিগ্রেশন পরীক্ষা                                                                                    |

#### ওয়েব-সেশন প্রদানকারী: `-web` ইমেজ

উপরের প্রতিটি চ্যানেল একটি `-web` ট্যাগ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) হিসাবে দ্বিগুণ হয় , `runner-web` পর্যায় — একই চিত্র প্লাস Playwright এবং একটি Chromium ব্রাউজার থেকে নির্মিত৷ প্লেইন ইমেজ জাহাজ** ছাড়া** ক্রোমিয়াম; `gemini-web`, `claude-web` এবং `claude-turnstile` এর প্রয়োজন।

ব্যর্থতা পিছিয়ে গেছে, শুরুর সময় নয়: এই প্রদানকারীরা তাদের মডেলগুলি তালিকাভুক্ত করে এবং ড্যাশবোর্ডে সংযুক্ত হিসাবে দেখায় এবং শুধুমাত্র প্রথম অনুরোধটি ব্যর্থ হয়

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

আপনি যদি এই সরবরাহকারীগুলি ব্যবহার করেন, আপনি যে চ্যানেলটি ইতিমধ্যে — এ আছেন তার `-web` ট্যাগটি টানুন আর কিছুই পরিবর্তন হবে না। একটি npm/CLI ইনস্টলে (কোনও Docker চিত্র নেই), সমতুল্য অনুপস্থিত অংশটি হল ব্রাউজার বাইনারি: হোস্টে `npx playwright install chromium` চালান।

#### প্রি-রিলিজ চ্যানেল ব্যবহার করে

`next` চ্যানেলটি বর্তমান ডিফল্ট `release/v*` শাখায় প্রতি ধাক্কায় পুনর্নির্মাণ করা হয় এবং AMD64 এবং ARM64উভয়ের জন্যই প্রকাশিত হয়। পুরানো রক্ষণাবেক্ষণ শাখা এটি ওভাররাইট করতে পারে না। পরবর্তী স্থিতিশীল ট্যাগ কাটার আগে সক্রিয় রিলিজ শাখায় একত্রিত হওয়া সংশোধনগুলির জন্য চ্যানেলটি একটি টানযোগ্য চিত্র প্রদান করে।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker রচনার জন্য, নির্বাচিত প্রোফাইল দ্বারা ব্যবহৃত ইমেজ ট্যাগটি ওভাররাইড করুন, তারপর পরিষেবাটি টানুন এবং পুনরায় তৈরি করুন:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### নিরাপত্তা এবং রোলব্যাক

`next` হল একটি ভাসমান প্রি-রিলিজ চ্যানেল। এটি সক্রিয় রিলিজ শাখায় কোনো ধাক্কায় পরিবর্তন হতে পারে এবং হয়** উত্পাদন ব্যবহারের জন্য সমর্থিত নয়** . একটি নির্দিষ্ট বিল্ড মূল্যায়ন করার সময় ইমেজ ডাইজেস্ট পিন করুন:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

পরীক্ষা করার আগে, OmniRoute ডেটা ভলিউম বা বাইন্ড-মাউন্ট করা ডেটা ডিরেক্টরি ব্যাক আপ করুন। রোল ব্যাক করতে, পূর্বে ব্যবহৃত স্থিতিশীল সংস্করণটি পুনরুদ্ধার করুন বা ডাইজেস্ট করুন এবং ধারকটি পুনরায় তৈরি করুন:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

একটি রিলিজ-শাখা বিল্ড কখনই `latest` সরাতে পারে না; শুধুমাত্র একটি যোগ্য স্থিতিশীল শব্দার্থক সংস্করণ স্থিতিশীল পয়েন্টার প্রচার করতে পারে। `next` ইমেজ রিলিজ ইমেজ পরিদর্শন এবং ব্লকিং CRITICAL-ভালনারেবিলিটি গেট ধরে রাখে।

**`latest` গিটের জন্য একটি মুদ্রার গ্যারান্টি নয়।** `main` বা সক্রিয় `release/v*` শাখায় মার্জ করা সংশোধনগুলি হল৷** না** `:latest` এ যতক্ষণ না একটি স্থিতিশীল SemVer ইমেজ প্রকাশিত হয় এবং প্রকাশের কাজটি `:latest` প্রচার করে (সেই SemVer মতো একই ডাইজেস্ট)। যদি `latest` হিমায়িত দেখায় যখন GitHub ইতিমধ্যে ফিক্স দেখায়, রিলিজ শাখা পরীক্ষা করতে `:next` টানুন বা SemVer ট্যাগের জন্য অপেক্ষা করুন।

| আপনি চান                                                                   | ব্যবহার করুন                     |
| -------------------------------------------------------------------------- | -------------------------------- |
| GitOps / উত্পাদন যে প্রবাহিত করা উচিত নয়                                  | পিন `:X.Y.Z` (বা চিত্র ডাইজেস্ট) |
| প্রকাশিত আস্তাবল অনুসরণ করুন এবং প্রতিটি রিলিজে একটি রিক্রিয়েট গ্রহণ করুন | `:latest`                        |
| অপ্রকাশিত `release/v*` কমিট পরীক্ষা করুন                                   | `:next` (উৎপাদন নয়)             |
| পরীক্ষা `main`                                                             | `:main` (উৎপাদন নয়)             |

## Docker-এ ড্যাশবোর্ড আপডেট

প্রকাশিত ইমেজের একটি কনটেইনার নিজেকে প্রতিস্থাপন করতে পারে না। OmniRoute যখন শনাক্ত করে যে এটি একটি
কনটেইনারের ভিতরে চলছে (`.git` checkout নেই, npm install নয়), তখন হোম ড্যাশবোর্ডের আপডেট ব্যানারে
npm/git নির্দেশনার পরিবর্তে চালানোর জন্য হোস্ট কমান্ড দেখানো হয় এবং সঙ্গে একটি কপি বোতাম থাকে:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

সার্ভিসের নাম `AUTO_UPDATE_SERVICE` থেকে আসে (ডিফল্ট `omniroute`, যা
`docker-compose.selfhost.yml`-এর সার্ভিস)। `pull` শুধু একটি পরিবর্তনশীল ট্যাগ (`latest`, `next`) এগিয়ে নেয়;
পিন করা `:X.Y.Z` ট্যাগের ক্ষেত্রে প্রথমে ট্যাগটি সম্পাদনা করুন।

### হোস্ট ট্রিগার ফাইল দিয়ে এক-ক্লিক আপডেট

`/var/run/docker.sock` মাউন্ট না করেই **Update Now** সচল রাখতে (এটি কনটেইনারকে
হোস্টে root ক্ষমতা দেয়—উপরের `cli` প্রোফাইলের সতর্কতা দেখুন), OmniRoute সার্ভিসে
`DOCKER_UPDATE_TRIGGER_FILE` সেট করুন এবং হোস্টে একটি পর্যবেক্ষক চালান:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

পাথটি অবশ্যই `DATA_DIR`-এর ভিতরে হতে হবে (আপেক্ষিক মানগুলো এর সাপেক্ষে সমাধান করা হয়);
অন্য যেকোনো কিছু প্রত্যাখ্যান করা হয়। এরপর **Update Now** ওই ফাইলে
`{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` লেখে, `202` উত্তর দেয় এবং নতুন সংস্করণ
সক্রিয় হওয়া পর্যন্ত ড্যাশবোর্ড `/api/system/version` পোল করে, তারপর পুনরায় লোড হয়। এই মোডে
OmniRoute কখনো কোনো শেল বা Docker কমান্ড চালায় না। প্রতিটি আপডেট অ্যাকশনের মতোই, অনুরোধটি
শুধু লুপব্যাক/LAN ক্লায়েন্ট থেকে গ্রহণ করা হয়।

বাইন্ড-মাউন্ট করা ডেটা ডিরেক্টরি হোস্টকে পর্যবেক্ষণের জন্য একটি স্থিতিশীল পাথ দেয়। নমুনা `systemd` ইউনিট
(`/srv/omniroute`-কে আপনার compose ফাইল ও `data/` ধারণকারী ডিরেক্টরি অনুযায়ী সামঞ্জস্য করুন):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute ড্যাশবোর্ডের আপডেট অনুরোধ পর্যবেক্ষণ করুন

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute কনটেইনার pull করে পুনরায় তৈরি করুন

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

সার্ভিসটি pull করার আগে অনুরোধটি সরিয়ে দেয়, যাতে ব্যর্থ রান বারবার চলতে না থাকে।
`DOCKER_UPDATE_TRIGGER_FILE` ছাড়া ড্যাশবোর্ড ম্যানুয়াল কমান্ড প্রবাহটি বজায় রাখে।

## উপলব্ধতা: ডিফল্ট SQLite হল একক-প্রতিলিপি

স্টক Docker / Kubernetes OmniRoute হল** এক নোড প্রক্রিয়া + এক SQLite লেখক** . উচ্চ প্রাপ্যতা হয়** সমর্থিত নয়** যে টপোলজি উপর.

| সীমাবদ্ধতা                                                     | পরিণতি                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| একক লেখক                                                       | করবেন** না** একই SQLite ফাইলের বিরুদ্ধে একাধিক প্রতিলিপি চালান। এটি DB কে দূষিত করে।                                                                                                                                                                                                                                   |
| পুনরায় তৈরি করুন / পুনরায় চালু করুন / HEALTHCHECK হত্যা করুন | **সম্পূর্ণ বিভ্রাট** ইন-ফ্লাইট SSE, ড্যাশবোর্ড সেশন, এবং ইন-মেমরি অবস্থা। প্রতিটি সংযুক্ত ক্লায়েন্ট ড্রপ. খালি-এন্ডপয়েন্ট উইন্ডোর সময় নতুন অনুরোধগুলি একটি বিপরীত-প্রক্সি পায়**`502 Bad Gateway: Unknown error`** , OmniRoute JSON নয় — ক্লায়েন্টরা এটিকে প্রদানকারীর ব্যর্থতা (#11015) থেকে আলাদা করতে পারে না। |
| `/healthz` হিসাবে একই ঘটনা লুপ                                 | একটি ব্যস্ত ক্যাটালগ বা কম্প্রেশন টিক প্রোব বিলম্বিত করতে পারে; একটি সংক্ষিপ্ত টাইমআউট তারপর পুনরায় আরম্ভ করে** শুধুমাত্র** প্রতিরূপ                                                                                                                                                                                  |

**প্রোব ম্যাট্রিক্স** (এছাড়াও [Kubernetes প্রোবের সুপারিশ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) দেখুন):

| অনুসন্ধান  | টার্গেট                                                | ব্যবহার করবেন না                                           |
| ---------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| সজীবতা     | TCP অন `PORT` (ডিফল্ট `20128`), বা নরম HTTP `/healthz` | `/api/monitoring/health`                                   |
| প্রস্তুতি  | HTTP `GET /healthz`                                    | টাইট টাইমআউট যা ইভেন্ট-লুপ ব্যস্তকে মৃত হিসাবে বিবেচনা করে |
| গভীর/মানুষ | `/api/monitoring/health`                               | স্বয়ংক্রিয় কুবেলেট সজীবতা                                |

**আপগ্রেড:** প্রতিটি অধিবেশন ড্রপ আশা. আপনি যদি পারেন ক্লায়েন্ট নিষ্কাশন; ডিফল্ট SQLite তে কোনো রোলিং আপডেট নেই। কম্পোজ `restart: unless-stopped` প্লাস Docker `HEALTHCHECK` শুধুমাত্র প্রক্রিয়াটি প্রতিস্থাপন করবে যখন কন্টেইনারটি অস্বাস্থ্যকর — একই ব্লাস্ট ব্যাসার্ধ।

রেডিমেড ম্যানিফেস্ট এবং একটি হেলম চার্ট `deploy/kubernetes/` এবং `deploy/helm/omniroute/` এ লাইভ — [Kubernetes ডিপ্লয়মেন্ট গাইড](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) দেখুন।

একটি জন্য Kubernetes স্নিপেট** একক প্রতিরূপ** (পুনরায় তৈরি করা প্রয়োজন; একটি SQLite ফাইলের বিপরীতে `replicas` বাড়াবেন না):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` sleep kube কে SIGTERM এর আগে সার্ভিস এন্ডপয়েন্ট ড্রপ করতে দেয়** নতুন** ট্রাফিক মৃত্যু প্রক্রিয়া আঘাত স্টপ. ইন-ফ্লাইট `/v1/responses` SSE হেভিওয়েট অ্যাডমিশন লিজ (#11015) এর মাধ্যমে `SHUTDOWN_TIMEOUT_MS` (ডিফল্ট 30s) পর্যন্ত নিষ্কাশন করা হয়। যে নতুন অনুরোধগুলি এখনও প্রক্রিয়ায় পৌঁছায় তারা `503` + `Retry-After: 5` পায়। রিক্রিয়েট খালি-এন্ডপয়েন্ট গ্যাপ যতক্ষণ না প্রতিস্থাপন প্রস্তুত না হয় তা একটি কঠিন বিভ্রাট থেকে যায় — এটি SQLite টপোলজি, একটি প্রোব মিসকনফিগিং নয়।

বাহ্যিক Postgres / বহু-লেখক HA হয়** না** একটি নথিভুক্ত স্টক পথ। আপনার যদি HA প্রয়োজন হয়, একটি একক প্রতিলিপি রাখুন বা একটি টপোলজি চালান যা প্রকল্পটি পরীক্ষা করেছে এবং আলাদাভাবে নথিভুক্ত করেছে। Postgres/MySQL কাজটি [#8075-](https://github.com/diegosouzapw/OmniRoute/issues/8075) এ থাকে। যে জাহাজ পর্যন্ত, সংখ্যাবৃদ্ধি একমাত্র সমর্থিত উপায়** বড়** `/v1/responses` ক্ষমতা হল N স্বাধীন প্রক্রিয়া (পরবর্তী বিভাগ), এক ভলিউমে `replicas > 1` নয়।

## স্কেল-আউট: এন স্বাধীন প্রক্রিয়া

### Codex টোকেন রোটেশন মালিকানা

একটি Codex অ্যাকাউন্টের অনুলিপি স্বাধীনভাবে তার একক-ব্যবহারের রিফ্রেশ টোকেন ব্যবহার করা উচিত নয়। যেসব ক্ষেত্রে শুধুমাত্র সিঙ্ক্রোনাইজড শংসাপত্র ব্যবহার করে, সেক্ষেত্রে `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (অরফে `cx`) সেট করুন। এটি একক ঘূর্ণন মালিকের উপর সেট না করে ছেড়ে দিন। প্রতিটি প্রক্রিয়ার এখনও নিজস্ব `DATA_DIR` প্রয়োজন; এই বিকল্পটি SQLite শেয়ার করে না বা টোকেন সিঙ্ক্রোনাইজেশন বা বিতরণ করা লক সরবরাহ করে না।

একটি রিফ্রেশের প্রয়োজন হলে প্যাসিভ ইনস্ট্যান্স সংযোগটি পুনরায় পাঠ করে এবং শুধুমাত্র একটি ভিন্ন, অপ্রয়োজনীয় অ্যাক্সেস টোকেন গ্রহণ করে। অন্যথায় সংযোগের মেয়াদ শেষ বা নিষ্ক্রিয় না করে বা রিফ্রেশ-ব্রেকার ব্যর্থতা গণনা না করে রিফ্রেশ অক্ষম করা হয়। বাস্তব আপস্ট্রিম প্রমাণীকরণ ব্যর্থতা এখনও স্বাভাবিক ব্যর্থতা অ্যাকাউন্টিং, সূচকীয় কুলডাউন এবং সাধারণ ক্লায়েন্ট ত্রুটি ব্যবহার করে; অ্যাকাউন্ট নিষ্ক্রিয়করণ স্থায়ী থাকে। অ্যাক্সেস টোকেনগুলির মেয়াদ শেষ হওয়ার আগে মালিকের ঘোরানো টোকেনগুলি সিঙ্ক্রোনাইজ করুন (ডিফল্ট প্রোঅ্যাকটিভ রিফ্রেশ লিড পাঁচ মিনিট), বা Codex প্রমাণীকরণ ফাইলটি পুনরায় আমদানি করুন৷ প্যাসিভ ইম্পোর্ট সরবরাহকৃত টোকেনগুলিকে টোকেন এন্ডপয়েন্টে যাচাই না করেই সংরক্ষণ করে। ম্যানুয়াল dashboard/API রিফ্রেশ `409 refresh_disabled` প্রদান করে; নতুন OAuth লগইন অপরিবর্তিত। [পরিবেশের রেফারেন্স](../reference/ENVIRONMENT.md#passive-codex-token-refresh) দেখুন।

এক নোড প্রক্রিয়া হয়** একটি V8 গাদা** . দুটি ওভারল্যাপ করা ~ 3 MiB / ~ 750k-টোকেন কোডিং-এজেন্ট `POST /v1/responses` (RTK + Caveman) সেই হিপটিকে ~ 12 Gi (`FATAL ERROR: Reached heap limit`) এ বাতিল করে এবং একটি 16 Gi cgroup OOM করতে পারে। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) দেখুন। সেই পরিমাপ ক** মেমরি-বাজেট** সতর্কতা, দুটি সমসাময়িক দীর্ঘ `/v1/responses` এর একটি পণ্য হার্ড-ম্যাক্স নয়। হেভিওয়েট চ্যাট ভর্তি একটি স্বয়ংক্রিয়ভাবে প্রাপ্ত ইনজেস্ট বাইট বাজেট (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) দ্বারা গেট করা হয় যে একই V8/cgroup সিলিং — থেকে এটিকে ঊর্ধ্বমুখী করে (অথবা লিগ্যাসি `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` অনুরোধ-গণনা ক্যাপ সেট করা) একটি ইতিমধ্যে-আকারের প্রক্রিয়ায় গর্ভপাতের পুনরায় প্রবর্তন করে৷ ছোট চ্যাট, `/healthz`, `/v1/models` এবং MCP হল** না** সেই টুপিতে

### এক-প্রক্রিয়া: দুইটির বেশি দীর্ঘ `/v1/responses`

ক** সুস্থ** প্রক্রিয়া ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` নীচে গাদা, ডিফল্ট `0.75`)** হতে পারে** যখন প্রক্রিয়া-ওয়াইড ইনফ্লাইট-বাইট বাজেট (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) এখনও জায়গা থাকে তখন দুইটির বেশি সমবর্তী দীর্ঘ `POST /v1/responses` চালান। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` বা তার উপরে সংস্থাগুলি (ডিফল্ট 256 KiB) কাঠামো-ভারী অনুরোধের মতো একই হেভিওয়েট লিজ নেয় এবং একই [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` এস্কেপ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ব্যবহার করে। যুগান্তকারী দীর্ঘ SSE ক্লায়েন্টের দশটি (অপারেটরদের প্রায়ই 40-50 লাগে) হল একটি** মেমরি-বাজেট** প্রশ্ন — আকারের স্তূপ + primary/headroom স্লট + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — একটি কঠিন "সর্বোচ্চ 2" পণ্য সীমা নয়। একটি চাপযুক্ত স্তূপ এখনও পুনরায় চেষ্টাযোগ্য `503` দিয়ে সেড করে তাই #7849 ফিরে আসে না।

প্রতি** গুন স্তূপ** (স্বাধীন V8 পুরানো স্থান)** আজ** :

| করবেন                                                                                                                   | করবেন না                                                |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| চালান** N containers/pods** , প্রতিটি তার সঙ্গে** নিজস্ব** `DATA_DIR` /ভলিউম                                            | একটি SQLite ফাইলের বিপরীতে `replicas > 1` সেট করুন      |
| সাইজ হেভি ইন-ফ্লাইট + হেলদি-হেডরুম হিপ/ইনফ্লাইট-বাইট বাজেট থেকে; 1-2 হল রক্ষণশীল #7849 ডিফল্ট, কঠিন পণ্যের সর্বোচ্চ নয় | একটি প্রক্রিয়া 8 × RAM এবং একটি সীমাহীন গণনা ক্যাপ দিন |
| ঐচ্ছিক: জন্য `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`** ভাগ করা কোটা কাউন্টার**                             | Redis শেয়ার করা SQLite — হিসাবে বিবেচনা করুন এটা নয়   |
| প্রতিটি দৃষ্টান্তে নকল প্রদানকারীর গোপনীয়তা (বা পার্টিশন করা ড্যাশবোর্ড গ্রহণ করুন)                                    | উদাহরণ জুড়ে একটি ড্যাশবোর্ড / একটি কল-লগ আশা করুন৷     |
| কোন লোড ব্যালেন্সার সঙ্গে সামনে; API কী বা সেশন দ্বারা স্টিকি যথেষ্ট                                                    | একটি বিক্রেতা-নির্দিষ্ট আকার-সচেতন মিডলওয়্যার প্রয়োজন |

সেশন-টু-অ্যাকাউন্ট অ্যাফিনিটি Redis মাধ্যমেও শেয়ার করা যেতে পারে: প্রতিটি প্রক্রিয়ায় একই `REDIS_KEY_PREFIX` এবং একটি ইতিবাচক `sessionAffinityTtlMs` সেটিং সহ `OMNIROUTE_SESSION_AFFINITY_STORE=redis` এবং `REDIS_URL` সেট করুন। পিনগুলি প্রতিটি প্রক্রিয়ার যোগ্য স্থানীয় সংযোগে হ্যাশ করা ব্যবহার-অ্যাকাউন্ট আইডেন্টিটি সমাধান করে, তাই OAuth অ্যাকাউন্টের সাথে মিলিত পরিচয় মেটাডেটা IDs সাথে মিলিত সংযোগের প্রয়োজন নেই। পরিচিত অ্যাকাউন্ট আইডেন্টিটিগুলি পিন রেজোলিউশন এবং সুরক্ষিত উচ্ছেদে পরস্পরবিরোধী স্থানীয় IDs উপর অগ্রাধিকার পায়; পরিচয় ছাড়া রেকর্ড (বা পরিচয় ছাড়াই উচ্ছেদ কলার) উত্তরাধিকার ID গার্ড ধরে রাখে। একটি স্থিতিশীল ব্যবহার পরিচয় ছাড়া অ্যাকাউন্টের জন্য এখনও মিলিত IDs প্রয়োজন। Redis ত্রুটি বা 100 ms এর বেশি কল স্থানীয় SQLite এ ফিরে আসে। প্রতিটি Redis অ্যাফিনিটি স্টোর অসামান্য ক্রিয়াকলাপগুলিকে 8-এ ক্যাপ করে, পূর্ণ হয়ে গেলে অবিলম্বে Redis বাইপাস করে, এবং শুধুমাত্র যখন অন্তর্নিহিত কাজ স্থির হয় তখনই স্লট প্রকাশ করে, কলারের সময়সীমাতে নয়। একটি Redis বিভ্রাটের সময় কোন ভাগ করা সত্য নেই: প্রতিটি দৃষ্টান্ত তার নিজস্ব স্থানীয় সম্বন্ধে ফিরে আসে, সেশন প্রতি দৃষ্টান্তে একবার পুনরায় পিন হতে পারে এবং দৃষ্টান্তগুলি ভিন্ন হতে পারে। স্টিকিনেস Redis এর মাধ্যমে পুনরায় একত্রিত হয় যখন এটি পুনরুদ্ধার হয়। টাইমআউট অপেক্ষার সীমাবদ্ধ, একটি প্রেরিত EVAL নয়, যা ফলব্যাকের পরে অবতরণ করতে পারে। রাউটিং রাইটিং রাউটিং সিদ্ধান্ত দ্বারা পর্যবেক্ষণ করা সঠিক মান তুলনা করে, একটি নতুন মিউটেশন-টাইম রিড নয়; একটি পর্যবেক্ষিত মিস বা একটি SQLite ফলব্যাক পর্যবেক্ষণ একটি অনুপস্থিত Redis কী হিসাবে তুলনা করে। অপ্রচলিত পিনগুলি একটি CAS এ প্রতিস্থাপিত হয়, তাই একটি দেরী কমান্ড একটি নতুন, ভিন্ন পিন প্রতিস্থাপন বা মুছে ফেলতে পারে না। Redis রিড পরমাণুভাবে মান এবং অবশিষ্ট সার্ভার TTL ফেরত দেয়; পজিটিভ PTTL (বা মেয়াদ শেষ না হওয়া) জীবন্ততা নির্ধারণ করে, লেখকের JSON টাইমস্ট্যাম্প বা পাঠকের ঘড়ি নয়। স্থানীয় স্ন্যাপশট ম্যাপ যা একটি স্থানীয় সময়সীমার জন্য TTL অবশিষ্ট থাকে; বিদ্যমান JSON কীগুলি পঠনযোগ্য থাকে এবং তাদের কাঁচা বাইটগুলি CAS এর জন্য ধরে রাখা হয়। Redis সত্যের একমাত্র উৎস যখন এটি উত্তর দেয়। নিশ্চিত করা শেয়ার করা আপসার্ট, স্পর্শ এবং মুছে ফেলা স্থানীয় এন্ট্রি সরিয়ে দেয়, এটি কখনও ইনস্টল বা রিফ্রেশ করবেন না। Redis পথে SQLite শুধুমাত্র Redis ত্রুটি, টাইমআউট বা ভর্তির স্যাচুরেশন থেকে এই দৃষ্টান্তের নিজস্ব ফলব্যাক সিদ্ধান্ত ধারণ করে, TTL-আবদ্ধ আগের মতো। একটি অনুপস্থিত স্থানীয় পিনের পরবর্তী আউটেজের জন্য একটি নতুন বাছাই (একটি প্রম্পট-ক্যাশে মিস) খরচ হয়, ভুল বা উচ্ছেদ করা অ্যাকাউন্ট নয়। প্রত্যাখ্যাত আপসার্ট শেয়ার করা বিজয়ী এবং তার অবশিষ্ট TTL পরমাণুভাবে ফেরত দেয়: সাধারণ নির্বাচন ম্যাপ করা স্থানীয় সময়সীমা পুনঃচেক করে এবং একটি স্থির-লাইভ যোগ্য বিজয়ী ব্যবহার করে, ব্যবহার স্পর্শ করে এবং অন্য শেয়ার করা লেখা ছাড়াই সেই অ্যাকাউন্টের জন্য লগিং করে। যদি এটি অনুপলব্ধ হয়, নির্বাচন স্থানীয় প্রার্থীকে রাখে, ভাগ করা পিন অপরিবর্তিত রাখে এবং একটি ডিবাগ বার্তা নির্গত করে। প্রত্যাখ্যাত CAS SQLite লেখে না; Redis ত্রুটি, টাইমআউট বা ভর্তি স্যাচুরেশন এর পরিবর্তে বিদ্যমান স্থানীয় অপারেশন প্রয়োগ করে। যদি একটি প্রেরিত মিউটেশনের উত্তর টাইমআউটের পরে আসে (স্বীকৃত, প্রত্যাখ্যান বা ত্রুটি), একটি সিঙ্ক্রোনাস সঠিক ক্রমিক-মান তুলনা-এবং-মুছে ফেলা শুধুমাত্র বাইট-অনুরূপ টাইমআউট ফলব্যাক সারিটি সরিয়ে দেয়। সেই তুলনা এবং মুছে ফেলার মধ্যে কোন অপেক্ষা নেই; একটি নতুন বিভ্রাট লেখা সংরক্ষিত হয়. গার্ডেড উচ্ছেদ ব্যর্থ অ্যাকাউন্টের নিজস্ব স্থানীয় পিনকে সরিয়ে দেয় এমনকি Redis ডাউন করেও, এবং নিশ্চিত শেয়ার্ড উচ্ছেদ করার পরে এটি আবার পরিষ্কার করে। মুলতুবি থাকা পূর্ববর্তী ভাগ করা উত্তরগুলি একটি উচ্ছেদ করা স্থানীয় পিন পুনরুদ্ধার করতে পারে না কারণ ভাগ করা সাফল্য কখনই SQLite লেখে না। একটি পরবর্তী আউটেজ ফলব্যাক একটি অ্যাকাউন্ট পুনরায় পিন করতে পারে; পরবর্তীতে গৃহীত শেয়ার করা লেখা শুধুমাত্র Redis এ বিদ্যমান। Redis misses স্থানীয় ফলব্যাক রাজ্যের সাথে পরামর্শ করবেন না। ড্রাইভার বন্ধ থাকলে, নতুন নির্বাচিত পিনগুলি লিগ্যাসি চার-ক্ষেত্র SQLite JSON আকৃতি ধরে রাখে; শুধুমাত্র Redis রাউটিং হ্যাশ করা অ্যাকাউন্টের পরিচয় যোগ করে। প্রিফেচড পিনগুলি তাদের মেয়াদ শেষ হওয়ার সীমানায় পুনরায় পরীক্ষা করা হয়। Redis নন-লিজ নির্বাচন স্টোরটিকে পুনরায় রিড করে, কিন্তু সিঙ্ক্রোনাস ইজারা পরিকল্পনা এখনও প্রিফেচ এবং পরিকল্পনার মধ্যে উচ্ছেদ করা একটি পিন ব্যবহার করতে পারে (একটি গৃহীত সেরা-প্রচেষ্টা উইন্ডো)। একটি ইজারা প্রতিশ্রুতি একটি টেকসই দাবির পরে অ্যাকাউন্টগুলি স্যুইচ করতে পারে না: প্রত্যাখ্যান আপসার্টে এটি দাবিকৃত প্রার্থীকে শুধুমাত্র সেই অনুরোধের জন্য রাখে এবং ভাগ করা বিজয়ীকে অস্পৃশ্য রাখে, তাই দৃষ্টান্ত জুড়ে চুক্তি সেই পথে আবদ্ধ। বাকি টেবিল এখনও প্রযোজ্য: এটি কম্বো সেশন স্টিকিনেস, নেটিভ Codex টার্ন পিন, অ্যাকাউন্ট সেমাফোর, লকআউট, খরচের সীমা, কনফিগারেশন বা কল লগ শেয়ার করে না।

হার্ডওয়্যার: প্রতি-দৃষ্টান্ত সমবর্তী দীর্ঘ `/v1/responses` হল a** মেমরি-বাজেট** প্রশ্ন (heap + inflight-byte / #10110)। `N` স্বাধীন `DATA_DIR` s এখনও গুনগত স্তূপ: হোস্ট RAM অবশ্যই `N × cgroup` কভার করবে, "N = 8 এর সাথে একটি 16 Gi পড নয়।" একটি SQLite ফাইলে কখনও `replicas > 1` না।

স্কেচ রচনা করুন (দুটি গাদা, দুটি ভলিউম — `deploy.replicas: 2` নয়):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

ইন-প্রসেস ঘনত্ব ( HTTP আইসোলেট বন্ধ কম্প্রেশন) হল [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) । ভাগ করা টেকসই অবস্থার একটি লজিক্যাল ক্লাস্টার হল [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ।

## Docker-এর ভিতরে Gemini-এর আঞ্চলিক ত্রুটি

Google AI Studio / Gemini API HTTP 400-এর সঙ্গে FAILED_PRECONDITION এবং
`User location is not supported for the API use.` ফেরত দিতে পারে। হোস্টে একটি অনুরোধ সফল
হওয়া প্রমাণ করে না যে কনটেইনার একই বহির্গামী রুট ব্যবহার করছে। DNS ক্রম,
IPv4/IPv6 সংযোগ, VPN রাউটিং এবং কনফিগার করা প্রক্সি ভিন্ন হতে পারে।
[Google-এর সমর্থিত অঞ্চলসমূহ](https://ai.google.dev/gemini-api/docs/available-regions)
এবং প্রকৃত সংযোগ রুট—উভয়ই পরীক্ষা করুন; শুধু এই ত্রুটি দেখে API key-টি ত্রুটিপূর্ণ বলে শনাক্ত করা যায় না।

### সংযোগ-নির্দিষ্ট প্রক্সিকে অগ্রাধিকার দিন

প্রভাবিত Gemini সংযোগটির জন্য OmniRoute-এর
[প্রতি-সংযোগ প্রক্সি কনফিগারেশন](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ব্যবহার করুন, তারপর একই মডেল দিয়ে **Test Connection** এবং একটি ছোট অনুরোধ পুনরায় চালান।
এতে রাউটিং পরিবর্তনটি ওই সংযোগের মধ্যেই সীমাবদ্ধ থাকে। নিশ্চিত করুন যে কনটেইনার থেকে
প্রক্সিতে পৌঁছানো যায় এবং সংযোগটি সত্যিই সেটি নির্বাচন করছে। রুট পরিবর্তন করলেই
আপস্ট্রিমের আঞ্চলিক যোগ্যতা নিশ্চিত হয় না।

### হোস্ট ও কনটেইনারের নেটওয়ার্কিং তুলনা করুন

প্রমাণীকৃত ফলাফল তুলনা করার সময় key, model এবং request অভিন্ন রাখুন; কোনো issue-তে কখনোই
শংসাপত্র, proxy password বা সম্পূর্ণ authorization header পেস্ট করবেন না।
প্রথমে হোস্ট ও কনটেইনারের ভিতরে একই command ব্যবহার করে OS resolver কোন কোন address family
সরবরাহ করে তা পরীক্ষা করুন:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`-এর জায়গায় আপনি যে service চালান সেটির নাম দিন (যেমন, `omniroute-web`)। এই
command-গুলো শংসাপত্র বা IP address ছাড়াই address family মুদ্রণ করে। ফেরত পাওয়া `6`
শুধু একটি IPv6 DNS ফলাফল নির্দেশ করে: এটি ব্যবহারযোগ্য IPv6 route বা API access-এর প্রমাণ
**নয়**। যেখানে `curl` ইনস্টল করা আছে, উভয় environment-এ
`curl -4 -I https://generativelanguage.googleapis.com` এবং
`curl -6 -I https://generativelanguage.googleapis.com` তুলনা করুন।
কোনো HTTP response ওই পরীক্ষার জন্য connectivity প্রমাণ করে, এমনকি সেটি প্রমাণীকরণবিহীন
ত্রুটি হলেও; শুধু প্রমাণীকৃত model request-ই Gemini ব্যবহারের যোগ্যতা পরীক্ষা করে।

### হোস্ট-স্তরের বিকল্প: কার্যকর IPv6 এবং resolver policy

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)-এর প্রতিবেদক
container IPv6 সক্রিয় করে এবং glibc address selection পরিবর্তন করে তাঁদের environment-এ
access পুনরুদ্ধার করেছিলেন। এটিকে environment-নির্দিষ্ট বিকল্প হিসেবে বিবেচনা করুন।
resolver preference সমন্বয় করার আগে কার্যকর host IPv6, container egress/routing এবং
firewall rule নিশ্চিত করুন। শুধু একটি private ULA address থাকাই public IPv6 connectivity
প্রতিষ্ঠা করে না।

Compose-এর default network-এ ইতিমধ্যে যুক্ত service-গুলোর জন্য এই fragment-টি ওই network-এ
IPv6 সক্রিয় করে; আপনার service, port, volume এবং configuration-এর বাকি অংশ অপরিবর্তিত রাখুন:

```yaml
networks:
  default:
    enable_ipv6: true
```

named network-এর ক্ষেত্রে service-টি প্রকৃতপক্ষে যে network-এ যুক্ত হয়, সেটিতে এটি সক্রিয়
করুন। Docker একটি ULA subnet বরাদ্দ করতে পারে; আপনার network-এর প্রয়োজন হলেই কেবল একটি
স্পষ্টভাবে নির্ধারিত, overlap না করা subnet নির্বাচন করুন। দেখুন
[Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
এবং [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)।

একটি **glibc-ভিত্তিক image**-এ `/etc/gai.conf` address selection পরিবর্তন করতে পারে।
বর্তমান repository Dockerfile Debian ব্যবহার করে; custom musl-ভিত্তিক image-গুলোতে এই
ব্যবস্থা নেই। প্রতিবেদন করা সমন্বয়টি ULA label-কে `label fc00::/7 6` থেকে
`label fc00::/7 1`-এ পরিবর্তন করে। image-এর সম্পূর্ণ policy table দিয়ে শুরু করুন এবং এর
অন্যান্য entry অপরিবর্তিত রাখুন: একটি `label` বা `precedence` entry যোগ করলে সেই default
table প্রতিস্থাপিত হয়, তাই শুধু পরিবর্তিত line-টি থাকা একটি file যথেষ্ট নয়।
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
এই semantics নথিভুক্ত করে। পর্যালোচনা করা file-টি `/etc/gai.conf`-এ read-only হিসেবে
bind-mount করুন এবং এটি প্রয়োগ করতে service-টি পুনরায় তৈরি করুন।

এটি **ওই কনটেইনারের সব বহির্গামী ট্র্যাফিকের** জন্য OS address selection পরিবর্তন করে।
এটি প্রতিটি application-কে IPv6 নির্বাচন করতে বাধ্য করে না: Node-এর DNS order এবং
connection selection-ও গুরুত্বপূর্ণ। বিশেষ করে, `--dns-result-order=ipv4first` IPv4-কে
অগ্রাধিকার দেয় এবং IPv4-only ব্যর্থতার প্রতিকার নয়। দেখুন
[Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)।

হোস্ট-স্তরের যেকোনো পরিবর্তনের পর Gemini এবং আপনার অন্যান্য provider পুনরায় পরীক্ষা করুন।
পূর্বাবস্থায় ফেরাতে custom `gai.conf` mount সরিয়ে দিন, আগের network configuration
পুনরুদ্ধার করুন এবং maintenance window-এর সময় প্রভাবিত service/network পুনরায় তৈরি করুন।
একটি network পুনরায় তৈরি করলে তাতে যুক্ত অন্যান্য container-এ বিঘ্ন ঘটতে পারে; persistent
data volume মুছবেন না।

## গুরুত্বপূর্ণ নোটসমূহ

- **SQLite WAL মোড:** `docker stop`-কে সম্পন্ন হওয়ার সুযোগ দিতে হবে, যাতে OmniRoute সর্বশেষ পরিবর্তনগুলোকে চেকপয়েন্ট করে `storage.sqlite`-এ ফিরিয়ে লিখতে পারে। অন্তর্ভুক্ত Compose ফাইলগুলোতে ইতিমধ্যেই 40s-এর স্টপ গ্রেস পিরিয়ড নির্ধারণ করা আছে। আপনি যদি ইমেজটি সরাসরি চালান, তাহলে `--stop-timeout 40` বজায় রাখুন।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** নিয়মিত/লেখার-পূর্ববর্তী ব্যাকআপগুলো বাহ্যিকভাবে পরিচালিত হলে এটিকে `true`-এ সেট করুন। বিদ্যমান ডেটাবেসের মাইগ্রেশনের জন্য তবুও নিজস্ব টেকসই সুরক্ষা স্ন্যাপশট এবং বৃহৎ-পরিসরের মাইগ্রেশন গার্ড প্রয়োজন।
- **ডেটা স্থায়িত্ব:** কনটেইনার পুনরায় চালুর পরও আপনার ডেটাবেস, কী এবং কনফিগারেশন সংরক্ষণ করতে সর্বদা `/app/data`-এ একটি ভলিউম মাউন্ট করুন।
- **পোর্ট কনফিগারেশন:** ডিফল্ট `20128` পোর্ট পরিবর্তন করতে `PORT` এনভায়রনমেন্ট ভেরিয়েবল ওভাররাইড করুন।

## আরও দেখুন

- [VM ডিপ্লয়মেন্ট গাইড](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare সেটআপ
- [Fly.io ডিপ্লয়মেন্ট গাইড](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-তে ডিপ্লয় করুন
- [এনভায়রনমেন্ট কনফিগ](../reference/ENVIRONMENT.md) — সম্পূর্ণ `.env` রেফারেন্স
