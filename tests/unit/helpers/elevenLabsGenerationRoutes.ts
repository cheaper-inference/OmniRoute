import * as soundRoute from "../../../src/app/api/v1/sound-generation/route.ts";
import * as musicRoute from "../../../src/app/api/v1/music/route.ts";
import * as streamRoute from "../../../src/app/api/v1/music/stream/route.ts";
import * as detailedRoute from "../../../src/app/api/v1/music/detailed/route.ts";
import * as detailedStreamRoute from "../../../src/app/api/v1/music/detailed/stream/route.ts";
import * as planRoute from "../../../src/app/api/v1/music/plan/route.ts";

export const nativeGenerationRoutes = [
  {
    path: "/v1/sound-generation",
    route: soundRoute,
    body: { text: "A soft bell", duration_seconds: 1 },
    defaultModel: "eleven_text_to_sound_v2",
  },
  {
    path: "/v1/music",
    route: musicRoute,
    body: { prompt: "Calm piano", music_length_ms: 3000 },
    defaultModel: "music_v1",
  },
  {
    path: "/v1/music/stream",
    route: streamRoute,
    body: { prompt: "Calm piano" },
    defaultModel: "music_v1",
  },
  {
    path: "/v1/music/detailed",
    route: detailedRoute,
    body: { composition_plan: { positive_global_styles: ["jazz"], sections: [] } },
    defaultModel: "music_v1",
  },
  {
    path: "/v1/music/detailed/stream",
    route: detailedStreamRoute,
    body: { prompt: "Calm piano" },
    defaultModel: "music_v1",
  },
  {
    path: "/v1/music/plan",
    route: planRoute,
    body: { prompt: "Calm piano", music_length_ms: 3000 },
    defaultModel: "music_v1",
  },
];
