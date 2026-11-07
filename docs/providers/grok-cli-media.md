---
title: "Grok Build OAuth media"
version: 3.8.54
lastUpdated: 2026-11-07
---

# Grok Build OAuth media

Connect **Grok Build** (`grok-cli`) using its existing OAuth flow. Media requests
reuse that connection pool and its renewable access token; no extra login or
developer API key is required. Availability and billing depend on the account's
entitlements and upstream settings. This adapter does not imply free usage or
change the account's on-demand spending cap.

| Gateway endpoint           | Model                                             |
| -------------------------- | ------------------------------------------------- |
| `/v1/images/generations`   | `grok-cli/grok-imagine-image` (opt-in, see below) |
| `/v1/videos/generations`   | `grok-cli/grok-imagine-video`                     |
| `/v1/audio/speech`         | `grok-cli/grok-tts`                               |
| `/v1/audio/transcriptions` | `grok-cli/grok-voice-transcribe-2.0`              |

The short prefix `gc/` also works. Always include the OAuth prefix: bare Imagine
model IDs still resolve to the separate `xai` API-key provider for compatibility.
OAuth requests never substitute an API key or switch to that provider implicitly.
`xai-oauth` is a different login provider and is not added to these media registries.

## Request examples

Send these JSON bodies to the corresponding gateway endpoint with your normal
OmniRoute authentication:

```json
{
  "model": "gc/grok-imagine-image",
  "prompt": "A blue cube on white",
  "n": 1,
  "size": "1024x1024",
  "response_format": "url"
}
```

Images are opt-in: `grok-cli` / `gc` is an image provider only while
`GROK_SUBSCRIPTION_IMAGES_ENABLED` is `true` (default `false`), the same switch as the
other Grok subscription image routes in [Grok Image Generation](../guides/GROK_IMAGES.md).
With the flag on, the request body follows that guide (native `aspect_ratio` /
`resolution`, OpenAI-style `size` mapping, `quality` on Image 2.0, `url` or `b64_json`);
only the transport differs: the call goes to the Grok Build proxy with the CLI
token-auth header instead of the public xAI endpoint.

```json
{
  "model": "gc/grok-imagine-video",
  "prompt": "A blue cube rotating slowly",
  "duration": 2,
  "aspect_ratio": "1:1",
  "resolution": "480p"
}
```

Video generation submits once and polls with the creating account's token. It
returns the existing MP4 URL response shape on completion. Authentication errors,
ambiguous network failures, and polling timeouts do not resubmit the job. A timeout
does not prove the upstream job stopped; do not blindly repeat the request.
Explicit video combos retain their existing concurrent fan-out behavior, so use
a concrete model when you want only one generation.

Video requests accept a positive `timeout_ms` up to 1,800,000 ms,
`poll_interval_ms` from 1,000 to 1,800,000 ms, and `max_polls` from 1 to 300.
Defaults are 300,000 ms and 2,500 ms; the poll count is bounded by the request
deadline and the server ceiling. Invalid or out-of-range controls return 400
before creating a job. Create and poll JSON responses are limited to 1 MiB.
The deadline also covers response-body reads. Client cancellation stops local
fetches, waits and polling for Grok/xAI and compatible job-polling handlers,
including their combo targets. It does not establish that the provider's remote
job was cancelled.

### Image and video input

`image` sets the first frame. It accepts a public URL or a `data:` URI (JPEG, PNG
or WebP) as a string, or an object `{ "url": "..." }` / `{ "file_id": "..." }`.
`reference_images` takes an array of the same objects (up to 7) and guides the
scene without pinning the first frame. `grok-imagine-video` rejects `image` and
`reference_images` in the same request.

```json
{
  "model": "gc/grok-imagine-video",
  "prompt": "The cat turns its head toward the camera",
  "image": "https://example.com/cat.jpg",
  "duration": 6
}
```

`video` edits an existing MP4 (up to 8.7 seconds), using the same string or object
forms. The output keeps the source length and aspect ratio, capped at 720p, so
`duration`, `aspect_ratio` and `resolution` are ignored.

```json
{
  "model": "gc/grok-imagine-video",
  "prompt": "Make it snow",
  "video": "https://example.com/clip.mp4"
}
```

Adding `"mode": "extend"` with a `duration` of 2 to 10 seconds extends the source
video instead. Only the `xai` API-key provider supports this: the Grok Build proxy
has no extension endpoint, so `grok-cli` returns 400 before creating a job.

```json
{
  "model": "gc/grok-tts",
  "input": "Olá, este é um teste",
  "voice": "eve",
  "language": "pt-BR",
  "response_format": "mp3"
}
```

`grok-tts` is a gateway routing ID, not an upstream TTS model name. The adapter
maps `input` to `text` and `voice` to `voice_id`; defaults are `eve`, `auto`, and
MP3. Supported codecs are `mp3`, `wav`, `pcm`, `mulaw`, and `alaw`; speed must be
between `0.7` and `1.5`. Native `output_format` options can set sample/bit rates.
OpenAI voice names and unsupported codecs such as `opus` are not remapped.

For transcription, use multipart fields `model`, `file`, and optional `language`.
`response_format` can be `json`, `verbose_json`, or `text`; JSON preserves native
word timestamps and duration. The adapter puts native options before the file
and relabels `.opus` uploads as `.ogg` without changing the bytes. Supported native
options include `diarize`, `multichannel`, `channels`, `sample_rate`,
`audio_format`, `format`, and `filler_words`. This is batch STT, not a WebSocket
voice or translation adapter.

## Upstream split

Imagine requests use `cli-chat-proxy.grok.com/v1`; voice uses `api.x.ai/v1/tts`
and `/stt` with the same OAuth token. Voice paths on the CLI proxy return 404.
See the [xAI TTS documentation](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech)
and [batch STT documentation](https://docs.x.ai/developers/model-capabilities/audio/speech-to-text)
for native voice options.
