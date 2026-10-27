import { elevenLabsOptionsResponse } from "@/app/api/v1/_shared/elevenLabsProxy";
import { proxyElevenLabsGeneration } from "@/app/api/v1/_shared/elevenLabsGeneration";
import { elevenLabsMusicPlanSchema } from "@/shared/validation/schemas/elevenlabs";

export async function OPTIONS() {
  return elevenLabsOptionsResponse();
}

export async function POST(request: Request) {
  return proxyElevenLabsGeneration(request, "/music/plan", elevenLabsMusicPlanSchema, "music_v1");
}
