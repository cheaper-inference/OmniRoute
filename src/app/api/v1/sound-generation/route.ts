import { elevenLabsOptionsResponse } from "@/app/api/v1/_shared/elevenLabsProxy";
import { proxyElevenLabsGeneration } from "@/app/api/v1/_shared/elevenLabsGeneration";
import { elevenLabsSoundGenerationSchema } from "@/shared/validation/schemas/elevenlabs";

export async function OPTIONS() {
  return elevenLabsOptionsResponse();
}

export async function POST(request: Request) {
  return proxyElevenLabsGeneration(
    request,
    "/sound-generation",
    elevenLabsSoundGenerationSchema,
    "eleven_text_to_sound_v2"
  );
}
