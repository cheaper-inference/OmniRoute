# Chaos Mode (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Panel:** **Modo Caos** (barra lateral) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesión del panel) · `POST /api/skills/collect/chaos` (clave de API)  
> **Código fuente:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

El Modo Caos envía **una tarea a varios proveedores a la vez**: cada proveedor participante
aporta una instancia de modelo, y se obtienen todas las respuestas una al lado de la otra (o encadenadas). Es una
superficie de ejecución multimodelo, no una estrategia de enrutamiento: el tráfico normal de `/v1/chat/completions`
nunca se ve afectado.

**Aclaración: se incluyen tres elementos diferentes con "chaos" en el nombre:**

| Elemento                     | Qué es                                                                                                                                                                                          | Dónde está documentado                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Modo Caos**                | La página del panel y la API aquí descritas: distribuye una tarea entre muchos proveedores (en paralelo o de forma colaborativa).                                                               | Esta guía                                    |
| `auto/chaos`                 | Id. de modelo Auto-Combo: distribución en paralelo, un modelo por proveedor y una llamada ascendente por cada uno. No es inyección de fallos ([detalles](#autochaos-distribución-en-paralelo)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configuración de combo Chaos | Un combo persistente con `config.chaos.enabled` realiza la distribución del mismo modo (solo mediante API); `judgeModel` únicamente elige la respuesta final, sin llamada de síntesis.          | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: distribución en paralelo

`auto/chaos` **no** es un mecanismo de inyección de fallos ni de pruebas de resiliencia. Al solicitar
`model: "auto/chaos"` en `/v1/chat/completions`:

1. Se crea un panel de **un modelo por proveedor**: el primer candidato de cada
   proveedor conectado, en el orden del conjunto de candidatos, con un máximo de 5 miembros
   (`OMNIROUTE_CHAOS_MAX_PANEL`, limitado a 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). El paquete de ponderaciones `chaos-mode`
   solo establece el `weight` de cada miembro; la distribución no lo consulta.
2. Se envía la misma solicitud a todos los miembros del panel **en paralelo**, por lo que una solicitud
   cuesta una llamada ascendente por cada miembro del panel
   (`open-sse/services/autoCombo/chaosEngine.ts`, despachada desde
   `open-sse/services/combo.ts`).
3. Se transmite una línea de estado por cada miembro del panel a medida que llega: un comentario SSE
   (`: chaos <index> ok|fail <model>`) de forma predeterminada, además de un evento `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) cuando la solicitud establece
   `stream_options.include_chaos_parts: true`. Estos no contienen texto de respuesta.
4. Se envía **una** respuesta del panel como fragmento final con formato de OpenAI: la del primer
   miembro del panel (`auto/chaos` lo establece como `judgeModel`) cuando tiene éxito; de lo contrario,
   la del último miembro que haya tenido éxito. Las demás respuestas del panel no se devuelven, por lo que
   se pagan N llamadas y se recibe una sola finalización.

## Configuración

1. Abierto** Panel de control → Modo Caos** (`/dashboard/chaos`).
2. Gíralo** en** Naves del Modo Caos —** deshabilitado por defecto** (`enabled: false` en `src/lib/chaos/chaosConfig.ts`). Mientras está deshabilitado, `POST /api/chaos/run` responde `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Elija los participantes y los valores predeterminados (persistentes por instancia a través de la tienda de configuración):

   | Campo               | Significado                                                               | Predeterminado/límites                     |
   | ------------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | interruptor maestro                                                       | `false`                                    |
   | `defaultMode`       | `parallel` o `collaborative` (ver más abajo)                              | `parallel`                                 |
   | `providerOverrides` | Participación por proveedor (`providerId`, opcional `modelId`, `enabled`) | vaciar = cada proveedor activo, máximo 200 |
   | `systemPrompt`      | Anulación del mensaje integrado del sistema Chaos                         | opcional, máximo 10 000 caracteres         |
   | `timeoutMs`         | Tiempo máximo por llamada de modelo                                       | `120000` (5 000–600 000)                   |
   | `maxTokens`         | `max_tokens` por llamada de modelo                                        | `4096` (256–128 000)                       |

4. Ofrezca a cada proveedor participante una** modelo** . El modelo de un proveedor es el `modelId` de su anulación habilitada en la página del Modo Caos (gana); de lo contrario, el** modelo predeterminado** de su conexión. Nunca se utiliza una identificación de proveedor como nombre de modelo. Un proveedor que no tiene ninguno de los dos es** no llamado** : aparece en los resultados como `status: "error"` con el mensaje _"No hay modelo establecido para este proveedor. Establezca un modelo para él en la página Modo Caos o un modelo predeterminado en la conexión."_ y un `modelId` vacío, mientras los otros proveedores se ejecutan normalmente. Si ningún proveedor seleccionado tiene un modelo, la ejecución falla antes de cualquier solicitud ascendente con _"Ningún proveedor tiene un modelo establecido..."_ (HTTP 500 en ambos puntos finales).
5. ejecutar un** prueba desde la propia página** — el panel de resultados muestra la respuesta, el estado y la duración de cada proveedor.

## Modos de ejecución

- **`parallel`**: todos los modelos reciben la misma tarea simultáneamente; usted recibe todas las respuestas
  de forma independiente.
- **`collaborative`**: los modelos se ejecutan **en cadena**: cada uno ve la salida del modelo anterior y
  recibe instrucciones para refinarla, ampliarla, criticarla u ofrecer una alternativa. El campo `summary` de la respuesta
  concatena las salidas correctas en el orden de la cadena (las ejecuciones en paralelo no tienen `summary`).

## API

### sesión del panel de — `POST /api/chaos/run`

Autenticado por cookie (la sesión de administración — ver [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); utilizado por la página del panel de control.

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

### clave `POST /api/skills/collect/chaos` — API

Variante de token al portador para llamantes externos. La llave debe llevar el** Permiso del modo Caos** (`chaosModeEnabled`), que es** desactivado por defecto** — lo habilita por clave en** Panel de control → API Manager → editar clave permisos → → Modo Caos** . Mismo cuerpo que el anterior.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ambos puntos finales devuelven la misma forma:

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

## Solución de problemas

- **`400 Chaos Mode is not enabled`** — paso 2 anterior: el interruptor global está apagado.
- **La clave API es rechazada en `/api/skills/collect/chaos`** — la clave carece del permiso `chaosModeEnabled` por clave (desactivado de forma predeterminada; esto es una configuración, no un error).
- **Un proveedor muestra `No model set for this provider`** — configura su modelo en la página Modo Caos o un modelo predeterminado en su conexión (consulte Configuración, paso 4).
- **Un proveedor que esperabas no aparece en los resultados.** — verifique `providerOverrides` en la página Modo Caos (una anulación deshabilitada lo excluye) y si la conexión del proveedor está activa.
