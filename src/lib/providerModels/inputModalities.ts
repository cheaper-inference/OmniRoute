import { z } from "zod";

const list = z.array(z.string()).max(100);
const supported = new Set(["text", "image", "audio", "video", "pdf", "file"]);

/** Explicit upstream declarations only; no model-name inference. */
export function declaredInputModalities(
  record: Record<string, unknown>,
  providerId?: string
): string[] | undefined {
  const architecture = record.architecture as Record<string, unknown> | undefined;
  const parsed = list.safeParse(
    record.supportedInputTypes ?? record.input_modalities ?? architecture?.input_modalities
  );
  if (parsed.success)
    return [...new Set(parsed.data.map((v) => v.toLowerCase()).filter((v) => supported.has(v)))];
  if (providerId !== "cheaperinference" && providerId !== "cinf") return undefined;
  const features = list.safeParse(record.features);
  if (!features.success) return undefined;
  const values = new Set(features.data);
  // CI's file-input contract is PDF on Chat Completions. Generic file support
  // must be declared explicitly via supportedInputTypes, never guessed here.
  return [
    "text",
    ...[
      ["image-input", "image"],
      ["audio-input", "audio"],
      ["video-input", "video"],
      ["file-input", "pdf"],
    ]
      .filter(([f]) => values.has(f))
      .map(([, kind]) => kind),
  ];
}
