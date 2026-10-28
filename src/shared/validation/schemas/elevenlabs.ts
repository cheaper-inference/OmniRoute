// The ElevenLabs request schemas live with the engine handler that validates them
// (open-sse/handlers/mediaGeneration/elevenLabsSchemas.ts) so open-sse does not import
// from src/ (check:boundary:ratchet). The app routes keep importing them from here.
export {
  elevenLabsSoundGenerationSchema,
  elevenLabsMusicSchema,
  elevenLabsMusicPlanSchema,
} from "@omniroute/open-sse/handlers/mediaGeneration/elevenLabsSchemas.ts";
