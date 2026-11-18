# Chaos Mode (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **대시보드:** **Chaos Mode**(사이드바) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run`(대시보드 세션) · `POST /api/skills/collect/chaos`(API 키)  
> **소스:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode는 **하나의 작업을 여러 프로바이더에 동시에 전송**합니다. 참여하는 각 프로바이더는 하나의 모델 인스턴스를 제공하며, 모든 응답을 나란히 확인하거나 체인으로 연결해 확인할 수 있습니다. 이는 라우팅 전략이 아니라 다중 모델 실행 인터페이스이므로, 일반적인 `/v1/chat/completions` 트래픽에는 전혀 영향을 주지 않습니다.

**구분 — 이름에 "chaos"가 포함된 서로 다른 세 가지 기능이 제공됩니다:**

| 항목            | 설명                                                                                                                                                                         | 문서 위치                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**  | 여기에서 설명하는 대시보드 페이지 및 API로, 하나의 작업을 여러 프로바이더에 분산합니다(병렬 또는 협업 방식).                                                                 | 이 가이드                                    |
| `auto/chaos`    | Auto-Combo 모델 ID로, 프로바이더마다 모델 하나를 사용해 병렬로 분산하며 각각 업스트림 호출을 한 번 수행합니다. 장애 주입 기능이 아닙니다([세부 정보](#autochaos-병렬-분산)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos 조합 구성 | `config.chaos.enabled`가 설정된 영구 저장 조합은 동일한 방식으로 분산됩니다(API 전용). `judgeModel`은 최종 답변만 선택하며, 합성 호출은 수행하지 않습니다.                   | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: 병렬 분산

`auto/chaos`는 장애 주입이나 복원력 테스트를 위한 설정이 **아닙니다**. `/v1/chat/completions`에서 `model: "auto/chaos"`를 요청하면 다음과 같이 동작합니다.

1. **프로바이더마다 모델 하나**로 구성된 패널을 생성합니다. 연결된 각 프로바이더의 첫 번째 후보를 후보 풀 순서대로 선택하며, 최대 5개 멤버까지 포함합니다
   (`OMNIROUTE_CHAOS_MAX_PANEL`, 상한 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` 가중치
   팩은 각 멤버의 `weight`만 설정하며, 분산 실행에서는 이를 읽지 않습니다.
2. 동일한 요청을 모든 패널 멤버에게 **병렬로** 전송하므로, 요청 하나당 패널 멤버별로 한 번씩 업스트림 호출 비용이 발생합니다
   (`open-sse/services/autoCombo/chaosEngine.ts`,
   `open-sse/services/combo.ts`에서 디스패치).
3. 각 패널 멤버의 결과가 도착할 때마다 상태 줄 하나를 스트리밍합니다. 기본적으로 SSE 주석
   (`: chaos <index> ok|fail <model>`)을 전송하며, 요청에
   `stream_options.include_chaos_parts: true`가 설정된 경우 `omni-chaos-part`
   이벤트(`model`, `index`, `ok`, `error`)도 전송합니다. 여기에는 답변 텍스트가 포함되지 않습니다.
4. 패널 답변 중 **하나**를 최종 OpenAI 형식 청크로 전송합니다. 첫 번째 패널 멤버의 답변
   (`auto/chaos`가 이를 `judgeModel`로 설정)이 성공하면 이를 사용하고, 그렇지 않으면 마지막으로 성공한 멤버의 답변을 사용합니다. 나머지 패널 답변은 반환되지 않으므로, N번의 호출 비용을 지불하고 하나의 완성 결과만 받게 됩니다.

## 설정

1. 열려 있는** 대시보드 → 카오스 모드** (`/dashboard/chaos`).
2. 켜세요** ~에** — 카오스 모드 함선** 기본적으로 비활성화됨** ( `src/lib/chaos/chaosConfig.ts` 의 `enabled: false` ). 비활성화된 동안 `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` 응답합니다.
3. 참가자 및 기본값을 선택합니다(설정 저장소를 통해 인스턴스별로 유지됨).

   | 필드                | 의미                                                        | 기본값 / 한도                                      |
   | ------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
   | `enabled`           | 마스터 스위치                                               | `false`                                            |
   | `defaultMode`       | `parallel` 또는 `collaborative` (아래 참조)                 | `parallel`                                         |
   | `providerOverrides` | 공급자별 참여(`providerId`, 선택 사항 `modelId`, `enabled`) | 모든 활성 공급자마다 = 비우세요. 최대 200개입니다. |
   | `systemPrompt`      | 내장된 Chaos 시스템 프롬프트에 대한 재정의                  | 선택사항, 최대 10,000자                            |
   | `timeoutMs`         | 모델 호출당 최대 시간                                       | `120000` (5 000–600 000)                           |
   | `maxTokens`         | 모델 호출당 `max_tokens`                                    | `4096` (256–128 000)                               |

4. 모든 참여 제공자에게** 모델** . 공급자의 모델은 카오스 모드 페이지에서 활성화된 재정의의 `modelId` 입니다(승리). 그렇지 않은 경우** 기본 모델** 그 연결의. 공급자 ID는 모델 이름으로 사용되지 않습니다. 둘 다 없는 제공자는 다음과 같습니다.** 호출되지 않음** : 결과에 _"이 공급자에 대해 모델이 설정되지 않았습니다. 카오스 모드 페이지에서 모델을 설정하거나 연결의 기본 모델을 설정하세요."_ 메시지와 함께 `status: "error"` 로 결과에 표시되고, 다른 공급자는 `modelId` 실행됩니다. 선택한 공급자에 모델이 없으면 _"No 공급자에 모델 세트가 없습니다. …"_(두 끝점 모두에서 HTTP 500)가 포함된 업스트림 요청 전에 실행이 실패합니다.
5. 실행** 페이지 자체에서 테스트** — 결과 패널에는 각 제공자의 답변, 상태 및 기간이 표시됩니다.

## 실행 모드

- **`parallel`** — 모든 모델이 동일한 작업을 동시에 받으며, 각 답변을
  독립적으로 받습니다.
- **`collaborative`** — 모델이 **체인 형태로** 실행됩니다. 각 모델은 이전 모델의 출력을 확인하고
  이를 개선하거나 확장하고, 비평하거나 대안을 제시하도록 요청받습니다. 응답의 `summary` 필드는
  성공한 출력을 체인 순서대로 이어 붙입니다(`parallel` 실행에는 `summary`가 없음).

## API

### `POST /api/chaos/run` — 보드 세션

쿠키 인증(관리 세션 — [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) 참조) 대시보드 페이지에서 사용됩니다.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — API 키

외부 호출자를 위한 Bearer-token 변형입니다. 키에는 다음 사항이 담겨 있어야 합니다.** 카오스 모드 권한** (`chaosModeEnabled`), 이는** 기본적으로 꺼짐** — 키당 활성화합니다.** 대시보드 → API Manager → 편집 키 → 권한 → 카오스 모드** . 위와 같은 본체입니다.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

두 끝점 모두 동일한 모양을 반환합니다.

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## 문제 해결

- **`400 Chaos Mode is not enabled`** 위의 — 2단계: 전역 스위치가 꺼져 있습니다.
- **API 키가 `/api/skills/collect/chaos` 에서 거부됨** — 키에는 키별 `chaosModeEnabled` 권한이 없습니다(기본적으로 꺼져 있습니다. 이는 오류가 아닌 설정입니다).
- **공급자가 `No model set for this provider` 보여줍니다.** — 카오스 모드 페이지에서 모델을 설정하거나 연결에서 기본 모델을 설정합니다(설정, 4단계 참조).
- **예상한 제공업체가 결과에서 누락되었습니다.** — 카오스 모드 페이지에서 `providerOverrides` 확인하고(비활성화된 재정의는 이를 제외함) 공급자 연결이 활성 상태인지 여부를 확인합니다.
