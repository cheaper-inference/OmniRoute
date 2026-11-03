"use client";

import { useId, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Alert } from "@omniroute/ui-kit/alert";
import { Field } from "@omniroute/ui-kit/field";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import SegmentedControl from "@/shared/components/SegmentedControl";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import { IMAGE_PROVIDERS } from "@omniroute/open-sse/config/imageRegistryData.ts";
import { VIDEO_PROVIDERS } from "@omniroute/open-sse/config/videoRegistry.ts";
import { MUSIC_PROVIDERS } from "@omniroute/open-sse/config/musicRegistry.ts";
import {
  AUDIO_SPEECH_PROVIDERS,
  AUDIO_TRANSCRIPTION_PROVIDERS,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import { toProviderModels, type ProviderModelGroup } from "./mediaProviderModels";

type Modality = "image" | "video" | "music" | "speech" | "transcription";
type GenerationResult = {
  type: Modality;
  data: any;
  timestamp: number;
  audioUrl?: string;
};
const IMAGE_PROVIDER_MODELS = toProviderModels(IMAGE_PROVIDERS);
const VIDEO_PROVIDER_MODELS = toProviderModels(VIDEO_PROVIDERS);
const MUSIC_PROVIDER_MODELS = toProviderModels(MUSIC_PROVIDERS);
const SPEECH_PROVIDER_MODELS = toProviderModels(AUDIO_SPEECH_PROVIDERS);
const TRANSCRIPTION_PROVIDER_MODELS = toProviderModels(AUDIO_TRANSCRIPTION_PROVIDERS);

const MODALITY_CONFIG: Record<
  Modality,
  {
    icon: string;
    endpoint: string;
    labelKey: string;
    placeholderKey?: string;
  }
> = {
  image: {
    icon: "image",
    endpoint: "/api/v1/images/generations",
    labelKey: "imageGeneration",
    placeholderKey: "imagePromptPlaceholder",
  },
  video: {
    icon: "videocam",
    endpoint: "/api/v1/videos/generations",
    labelKey: "videoGeneration",
    placeholderKey: "videoPromptPlaceholder",
  },
  music: {
    icon: "music_note",
    endpoint: "/api/v1/music/generations",
    labelKey: "musicGeneration",
    placeholderKey: "musicPromptPlaceholder",
  },
  speech: {
    icon: "record_voice_over",
    endpoint: "/api/v1/audio/speech",
    labelKey: "textToSpeech",
    placeholderKey: "speechTextPlaceholder",
  },
  transcription: {
    icon: "mic",
    endpoint: "/api/v1/audio/transcriptions",
    labelKey: "transcription",
    placeholderKey: "transcriptionPlaceholder",
  },
};

// Provider+model registry derived from runtime registries to avoid dashboard drift
const PROVIDER_MODELS: Record<Modality, ProviderModelGroup[]> = {
  image: IMAGE_PROVIDER_MODELS,
  video: VIDEO_PROVIDER_MODELS,
  music: MUSIC_PROVIDER_MODELS,
  speech: SPEECH_PROVIDER_MODELS,
  transcription: TRANSCRIPTION_PROVIDER_MODELS,
};
const INITIAL_IMAGE_PROVIDER = PROVIDER_MODELS.image[0];
const INITIAL_IMAGE_MODEL = INITIAL_IMAGE_PROVIDER?.models[0];

// Voice presets per TTS provider
const VOICE_PRESETS: Record<string, { id: string; label: string }[]> = {
  default: [
    { id: "alloy", label: "Alloy" },
    { id: "echo", label: "Echo" },
    { id: "fable", label: "Fable" },
    { id: "onyx", label: "Onyx" },
    { id: "nova", label: "Nova" },
    { id: "shimmer", label: "Shimmer" },
  ],
  elevenlabs: [
    { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel (EN)" },
    { id: "AZnzlk1XvdvUeBnXmlld", label: "Domi (EN)" },
    { id: "EXAVITQu4vr4xnSDxMaL", label: "Bella (EN)" },
    { id: "ErXwobaYiN019PkySvjV", label: "Antoni (EN)" },
    { id: "MF3mGyEYCl7XYWbV9V6O", label: "Elli (EN)" },
    { id: "TxGEqnHWrfWFTfGW9XjX", label: "Josh (EN)" },
    { id: "VR6AewLTigWG4xSOukaG", label: "Arnold (EN)" },
    { id: "pNInz6obpgDQGcFmaJgB", label: "Adam (EN)" },
    { id: "yoZ06aMxZJJ28mfd3POQ", label: "Sam (EN)" },
  ],
  kie: [
    { id: "Rachel", label: "Rachel (EN)" },
    { id: "Adam", label: "Adam (EN)" },
    { id: "Brian", label: "Brian (EN)" },
    { id: "Roger", label: "Roger (EN)" },
    { id: "Bella", label: "Bella (EN)" },
  ],
  cartesia: [
    { id: "a0e99841-438c-4a64-b679-ae501e7d6091", label: "Barbershop Man" },
    { id: "694f9389-aac1-45b6-b726-9d9369183238", label: "Friendly Reading Man" },
    { id: "b7d50908-b17c-442d-ad8d-810c63997ed9", label: "California Girl" },
  ],
  deepgram: [
    { id: "aura-asteria-en", label: "Asteria (EN)" },
    { id: "aura-luna-en", label: "Luna (EN)" },
    { id: "aura-stella-en", label: "Stella (EN)" },
    { id: "aura-zeus-en", label: "Zeus (EN)" },
    { id: "aura-orion-en", label: "Orion (EN)" },
  ],
  inworld: [
    { id: "Abby", label: "Abby (EN)" },
    { id: "Alex", label: "Alex (EN)" },
    { id: "Amina", label: "Amina (EN)" },
    { id: "Anjali", label: "Anjali (EN)" },
    { id: "Arjun", label: "Arjun (EN)" },
    { id: "Ashley", label: "Ashley (EN)" },
    { id: "Avery", label: "Avery (EN)" },
    { id: "Bianca", label: "Bianca (EN)" },
    { id: "Blake", label: "Blake (EN)" },
    { id: "Brandon", label: "Brandon (EN)" },
    { id: "Brian", label: "Brian (EN)" },
    { id: "Callum", label: "Callum (EN)" },
    { id: "Carter", label: "Carter (EN)" },
    { id: "Cedric", label: "Cedric (EN)" },
    { id: "Celeste", label: "Celeste (EN)" },
    { id: "Chloe", label: "Chloe (EN)" },
    { id: "Claire", label: "Claire (EN)" },
    { id: "Clive", label: "Clive (EN)" },
    { id: "Conrad", label: "Conrad (EN)" },
    { id: "Craig", label: "Craig (EN)" },
    { id: "Damon", label: "Damon (EN)" },
    { id: "Darlene", label: "Darlene (EN)" },
    { id: "Deborah", label: "Deborah (EN)" },
    { id: "Dennis", label: "Dennis (EN)" },
    { id: "Derek", label: "Derek (EN)" },
    { id: "Dominus", label: "Dominus (EN)" },
    { id: "Duncan", label: "Duncan (EN)" },
    { id: "Edward", label: "Edward (EN)" },
    { id: "Eleanor", label: "Eleanor (EN)" },
    { id: "Elliot", label: "Elliot (EN)" },
    { id: "Ethan", label: "Ethan (EN)" },
    { id: "Evan", label: "Evan (EN)" },
    { id: "Evelyn", label: "Evelyn (EN)" },
    { id: "Felix", label: "Felix (EN)" },
    { id: "Gareth", label: "Gareth (EN)" },
    { id: "Graham", label: "Graham (EN)" },
    { id: "Hades", label: "Hades (EN)" },
    { id: "Hamish", label: "Hamish (EN)" },
    { id: "Hana", label: "Hana (EN)" },
    { id: "Hank", label: "Hank (EN)" },
    { id: "James", label: "James (EN)" },
    { id: "Jason", label: "Jason (EN)" },
    { id: "Jessica", label: "Jessica (EN)" },
    { id: "Jonah", label: "Jonah (EN)" },
    { id: "Kelsey", label: "Kelsey (EN)" },
    { id: "Lauren", label: "Lauren (EN)" },
    { id: "Levi", label: "Levi (EN)" },
    { id: "Liam", label: "Liam (EN)" },
    { id: "Loretta", label: "Loretta (EN)" },
    { id: "Lucian", label: "Lucian (EN)" },
    { id: "Luna", label: "Luna (EN)" },
    { id: "Malcolm", label: "Malcolm (EN)" },
    { id: "Marcus", label: "Marcus (EN)" },
    { id: "Mark", label: "Mark (EN)" },
    { id: "Marlene", label: "Marlene (EN)" },
    { id: "Mia", label: "Mia (EN)" },
    { id: "Miranda", label: "Miranda (EN)" },
    { id: "Mortimer", label: "Mortimer (EN)" },
    { id: "Nadia", label: "Nadia (EN)" },
    { id: "Naomi", label: "Naomi (EN)" },
    { id: "Nate", label: "Nate (EN)" },
    { id: "Oliver", label: "Oliver (EN)" },
    { id: "Olivia", label: "Olivia (EN)" },
    { id: "Pippa", label: "Pippa (EN)" },
    { id: "Pixie", label: "Pixie (EN)" },
    { id: "Reed", label: "Reed (EN)" },
    { id: "Riley", label: "Riley (EN)" },
    { id: "Ronald", label: "Ronald (EN)" },
    { id: "Rupert", label: "Rupert (EN)" },
    { id: "Saanvi", label: "Saanvi (EN)" },
    { id: "Sarah", label: "Sarah (EN)" },
    { id: "Sebastian", label: "Sebastian (EN)" },
    { id: "Selene", label: "Selene (EN)" },
    { id: "Serena", label: "Serena (EN)" },
    { id: "Simon", label: "Simon (EN)" },
    { id: "Snik", label: "Snik (EN)" },
    { id: "Sophie", label: "Sophie (EN)" },
    { id: "Tessa", label: "Tessa (EN)" },
    { id: "Theodore", label: "Theodore (EN)" },
    { id: "Timothy", label: "Timothy (EN)" },
    { id: "Trevor", label: "Trevor (EN)" },
    { id: "Tristan", label: "Tristan (EN)" },
    { id: "Tyler", label: "Tyler (EN)" },
    { id: "Veronica", label: "Veronica (EN)" },
    { id: "Victor", label: "Victor (EN)" },
    { id: "Victoria", label: "Victoria (EN)" },
    { id: "Vinny", label: "Vinny (EN)" },
    { id: "Wendy", label: "Wendy (EN)" },
    { id: "Aanya", label: "Aanya (HI)" },
    { id: "Aarav", label: "Aarav (HI)" },
    { id: "Manoj", label: "Manoj (HI)" },
    { id: "Riya", label: "Riya (HI)" },
    { id: "Alain", label: "Alain (FR)" },
    { id: "Étienne", label: "Étienne (FR)" },
    { id: "Hélène", label: "Hélène (FR)" },
    { id: "Mathieu", label: "Mathieu (FR)" },
    { id: "Asuka", label: "Asuka (JP)" },
    { id: "Haruto", label: "Haruto (JP)" },
    { id: "Hina", label: "Hina (JP)" },
    { id: "Satoshi", label: "Satoshi (JP)" },
    { id: "Beatriz", label: "Beatriz (PT)" },
    { id: "Heitor", label: "Heitor (PT)" },
    { id: "Maitê", label: "Maitê (PT)" },
    { id: "Mariana", label: "Mariana (PT)" },
    { id: "Murilo", label: "Murilo (PT)" },
    { id: "Camila", label: "Camila (ES)" },
    { id: "Diego", label: "Diego (ES)" },
    { id: "Lupita", label: "Lupita (ES)" },
    { id: "Mateo", label: "Mateo (ES)" },
    { id: "Mauricio", label: "Mauricio (ES)" },
    { id: "Miguel", label: "Miguel (ES)" },
    { id: "Rafael", label: "Rafael (ES)" },
    { id: "Sofia", label: "Sofia (ES)" },
    { id: "Dmitry", label: "Dmitry (RU)" },
    { id: "Elena", label: "Elena (RU)" },
    { id: "Nikolai", label: "Nikolai (RU)" },
    { id: "Svetlana", label: "Svetlana (RU)" },
    { id: "Erik", label: "Erik (NL)" },
    { id: "Katrien", label: "Katrien (NL)" },
    { id: "Lennart", label: "Lennart (NL)" },
    { id: "Lore", label: "Lore (NL)" },
    { id: "Gianni", label: "Gianni (IT)" },
    { id: "Orietta", label: "Orietta (IT)" },
    { id: "Hyunwoo", label: "Hyunwoo (KO)" },
    { id: "Minji", label: "Minji (KO)" },
    { id: "Seojun", label: "Seojun (KO)" },
    { id: "Yoona", label: "Yoona (KO)" },
    { id: "Jing", label: "Jing (ZH)" },
    { id: "Mei", label: "Mei (ZH)" },
    { id: "Ming", label: "Ming (ZH)" },
    { id: "Xiaoyin", label: "Xiaoyin (ZH)" },
    { id: "Xinyi", label: "Xinyi (ZH)" },
    { id: "Yichen", label: "Yichen (ZH)" },
    { id: "Johanna", label: "Johanna (DE)" },
    { id: "Josef", label: "Josef (DE)" },
    { id: "Nour", label: "Nour (AR)" },
    { id: "Omar", label: "Omar (AR)" },
    { id: "Oren", label: "Oren (HE)" },
    { id: "Yael", label: "Yael (HE)" },
    { id: "Szymon", label: "Szymon (PL)" },
    { id: "Wojciech", label: "Wojciech (PL)" },
  ],
  "xiaomi-mimo": [
    { id: "冰糖", label: "冰糖 (Chinese Female)" },
    { id: "茉莉", label: "茉莉 (Chinese Female)" },
    { id: "苏打", label: "苏打 (Chinese Male)" },
    { id: "白桦", label: "白桦 (Chinese Male)" },
    { id: "Mia", label: "Mia (English Female)" },
    { id: "Chloe", label: "Chloe (English Female)" },
    { id: "Milo", label: "Milo (English Male)" },
    { id: "Dean", label: "Dean (English Male)" },
  ],
};

const SPEECH_FORMATS = ["mp3", "wav", "opus", "flac", "pcm"];

function getSpeechFormats(providerId: string): string[] {
  const providerFormats = AUDIO_SPEECH_PROVIDERS[providerId]?.supportedFormats;
  return providerFormats?.length ? providerFormats : SPEECH_FORMATS;
}

function getVoiceList(providerId: string) {
  return VOICE_PRESETS[providerId] ?? VOICE_PRESETS.default;
}

/** Parse a human-readable error from the API error response */
function parseApiError(
  raw: any,
  statusCode: number,
  fallbackMessage: string
): { message: string; isCredentials: boolean } {
  const readErrorMessage = (value: any): string | null => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
      const messages = value
        .map((entry: any) => readErrorMessage(entry))
        .filter((entry: string | null): entry is string => Boolean(entry));
      if (messages.length > 0) return messages.join(", ");
      return null;
    }
    if (typeof value.message === "string") return value.message;
    if (typeof value.detail === "string") return value.detail;
    if (Array.isArray(value.errors)) {
      const messages = value.errors
        .map((entry: any) => readErrorMessage(entry))
        .filter((entry: string | null): entry is string => Boolean(entry));
      if (messages.length > 0) return messages.join(", ");
    }
    try {
      return JSON.stringify(value);
    } catch {
      return null;
    }
  };

  const msg =
    readErrorMessage(raw?.error) ||
    readErrorMessage(raw?.errors) ||
    raw?.err_msg ||
    raw?.message ||
    raw?.detail ||
    (typeof raw === "string" ? raw : null) ||
    fallbackMessage;

  const isCredentials =
    typeof msg === "string" &&
    // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
    (msg.toLowerCase().includes("no credentials") ||
      // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
      msg.toLowerCase().includes("invalid api key") ||
      // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
      msg.toLowerCase().includes("unauthorized") ||
      // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
      msg.toLowerCase().includes("authentication") ||
      // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
      msg.toLowerCase().includes("api key") ||
      statusCode === 401 ||
      statusCode === 403);

  return { message: String(msg), isCredentials };
}

/** Format file size to human-readable string */
// Native file pickers keep the browser's button; style it with the kit tokens.
const FILE_INPUT_CLASS =
  "file:mr-3 file:rounded file:border-0 file:bg-bg-subtle file:px-3 file:py-1 file:text-sm file:text-text-main";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function fileToDataUrl(file: File, errorMessage: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error(errorMessage));
    };
    reader.onerror = () => reject(reader.error || new Error(errorMessage));
    reader.readAsDataURL(file);
  });
}

/** Render image result thumbnails */
function ImageResults({ data }: { data: any }) {
  const t = useTranslations("media");
  const images: Array<{ url?: string; b64_json?: string; revised_prompt?: string }> =
    data?.data || [];
  if (images.length === 0) {
    return <p className="text-sm text-text-muted italic">{t("noImagesReturned")}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {images.map((img, i) => {
        const src = img.url || (img.b64_json ? `data:image/png;base64,${img.b64_json}` : null);
        if (!src) return null;
        return (
          <div key={i} className="relative group rounded-lg overflow-hidden border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={img.revised_prompt || t("generatedImageAlt", { index: i + 1 })}
              className="w-full"
            />
            <a
              href={src}
              download={`image-${i + 1}.png`}
              className="absolute bottom-2 right-2 bg-surface/90 text-text-main border border-border text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center gap-1"
            >
              <Icon name="download" size={13} />
              {t("save")}
            </a>
            {img.revised_prompt && (
              <p
                className="text-[11px] text-text-muted px-2 py-1 bg-surface/80 truncate"
                title={img.revised_prompt}
              >
                {img.revised_prompt}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function MediaPageClient() {
  const t = useTranslations("media");
  const tc = useTranslations("common");
  const [activeTab, setActiveTab] = useState<Modality>("image");
  const [prompt, setPrompt] = useState("");

  // Selected provider and model per modality
  const [selectedProvider, setSelectedProvider] = useState<string>(
    INITIAL_IMAGE_PROVIDER?.id ?? ""
  );
  const [selectedModel, setSelectedModel] = useState<string>(INITIAL_IMAGE_MODEL?.id ?? "");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCredentialsError, setIsCredentialsError] = useState(false);

  // Speech-specific
  const [speechVoice, setSpeechVoice] = useState("alloy");
  const [speechFormat, setSpeechFormat] = useState("mp3");

  // Transcription-specific
  const MAX_TRANSCRIPTION_FILE_SIZE = 4 * 1024 * 1024 * 1024; // 4 GB
  const promptId = useId();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [imageInputFile, setImageInputFile] = useState<File | null>(null);
  const [imageMaskFile, setImageMaskFile] = useState<File | null>(null);

  // Fix #390: Track which local providers (sdwebui, comfyui) are actually configured
  // so we can hide them when they haven't been set up in the providers page
  const LOCAL_PROVIDERS = ["sdwebui", "comfyui"];
  const [configuredLocalProviders, setConfiguredLocalProviders] = useState<Set<string>>(
    new Set(LOCAL_PROVIDERS) // Optimistic: show all until we know otherwise
  );

  useEffect(() => {
    const audioUrl = result?.audioUrl;
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [result?.audioUrl]);

  useEffect(() => {
    // Fetch configured provider connections to determine which local providers are set up
    fetch("/api/providers")
      .then((r) => r.json())
      .then((data) => {
        const connections: { provider?: string; testStatus?: string }[] = Array.isArray(data)
          ? data
          : (data?.connections ?? data?.providers ?? []);
        const configured = new Set<string>();
        for (const conn of connections) {
          const pId = conn?.provider;
          if (pId && LOCAL_PROVIDERS.includes(pId)) {
            configured.add(pId);
          }
        }
        // Only update if at least one local provider was found, otherwise keep optimistic
        if (configured.size > 0) {
          setConfiguredLocalProviders(configured);
        } else {
          // No local providers configured — hide sdwebui/comfyui
          setConfiguredLocalProviders(new Set());
        }
      })
      .catch(() => {
        // On error, keep showing all (fail-open)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter out unconfigured local providers from the provider list
  const currentProviders = (PROVIDER_MODELS[activeTab] ?? []).filter(
    (p) => !LOCAL_PROVIDERS.includes(p.id) || configuredLocalProviders.has(p.id)
  );
  const currentModels = currentProviders.find((p) => p.id === selectedProvider)?.models ?? [];

  const switchTab = (tab: Modality) => {
    setActiveTab(tab);
    setPrompt("");
    setResult(null);
    setError(null);
    setIsCredentialsError(false);
    setAudioFile(null);
    setImageInputFile(null);
    setImageMaskFile(null);
    // Pick first provider and first model automatically
    const providers = PROVIDER_MODELS[tab] ?? [];
    const firstProvider = providers[0];
    setSelectedProvider(firstProvider?.id ?? "");
    const firstModel = firstProvider?.models[0]?.id ?? "";
    setSelectedModel(firstModel);
    if (tab === "speech") {
      setSpeechVoice(getVoiceList(firstProvider?.id ?? "")[0]?.id ?? "alloy");
      setSpeechFormat(getSpeechFormats(firstProvider?.id ?? "")[0] ?? "mp3");
    }
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    const models = PROVIDER_MODELS[activeTab]?.find((p) => p.id === providerId)?.models ?? [];
    const firstModel = models[0]?.id ?? "";
    setSelectedModel(firstModel);
    if (activeTab === "speech") {
      setSpeechVoice(getVoiceList(providerId)[0]?.id ?? "alloy");
      const formats = getSpeechFormats(providerId);
      setSpeechFormat((current) => (formats.includes(current) ? current : (formats[0] ?? "mp3")));
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setIsCredentialsError(false);
    setResult(null);

    try {
      const config = MODALITY_CONFIG[activeTab];
      const modelId = selectedModel;
      const promptValue = prompt.trim();

      if (activeTab === "speech") {
        if (!promptValue) {
          setError(t("enterTextToSynthesize"));
          setLoading(false);
          return;
        }
        const res = await fetch(config.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: modelId,
            input: promptValue,
            voice: speechVoice,
            response_format: speechFormat,
          }),
        });
        if (!res.ok) {
          const raw = await res.json().catch(() => ({}));
          const { message, isCredentials } = parseApiError(
            raw,
            res.status,
            t("requestFailed", { status: res.status })
          );
          setIsCredentialsError(isCredentials);
          throw new Error(message);
        }
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        setResult({
          type: "speech",
          data: { format: speechFormat },
          timestamp: Date.now(),
          audioUrl,
        });
        setLoading(false);
        return;
      }

      if (activeTab === "transcription") {
        if (!audioFile) {
          setError(t("selectAudioToTranscribe"));
          setLoading(false);
          return;
        }
        const form = new FormData();
        form.append("file", audioFile);
        form.append("model", modelId);
        const res = await fetch(config.endpoint, { method: "POST", body: form });
        if (!res.ok) {
          const raw = await res.json().catch(() => ({}));
          const { message, isCredentials } = parseApiError(
            raw,
            res.status,
            t("requestFailed", { status: res.status })
          );
          setIsCredentialsError(isCredentials);
          throw new Error(message);
        }
        const data = await res.json();
        // Check for noSpeechDetected flag (music, silence, etc.) — NOT a credential error
        if (data?.noSpeechDetected) {
          setError(t("noSpeechDetected", { provider: selectedProvider }));
          setIsCredentialsError(false);
          setLoading(false);
          return;
        }
        // Warn if text is empty without the noSpeechDetected flag (unexpected)
        if (data && typeof data.text === "string" && data.text.trim() === "") {
          setError(t("emptyTranscription", { provider: selectedProvider }));
          // Only mark as credential error if we can confirm it from context
          setIsCredentialsError(false);
          setLoading(false);
          return;
        }
        setResult({ type: "transcription", data, timestamp: Date.now() });
        setLoading(false);
        return;
      }

      if (activeTab === "image" && selectedProvider === "topaz" && !imageInputFile) {
        setError(t("topazRequiresImage"));
        setLoading(false);
        return;
      }

      if (!prompt.trim()) {
        if (activeTab !== "image" || selectedProvider !== "topaz") {
          setError(t("enterPrompt"));
          setLoading(false);
          return;
        }
      }

      const payload: Record<string, unknown> = {
        model: modelId,
        prompt:
          promptValue ||
          (activeTab === "image" && selectedProvider === "topaz" ? t("enhanceThisImage") : ""),
        ...(activeTab === "image" ? { size: "1024x1024", n: 1 } : {}),
      };

      if (activeTab === "image" && imageInputFile) {
        const imageDataUrl = await fileToDataUrl(imageInputFile, t("failedToReadFile"));
        payload.image_url = imageDataUrl;
        payload.imageUrls = [imageDataUrl];
      }

      if (activeTab === "image" && imageMaskFile) {
        const maskDataUrl = await fileToDataUrl(imageMaskFile, t("failedToReadFile"));
        payload.mask = maskDataUrl;
        payload.mask_url = maskDataUrl;
      }

      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const raw = await res.json().catch(() => ({}));
        const { message, isCredentials } = parseApiError(
          raw,
          res.status,
          t("requestFailed", { status: res.status })
        );
        setIsCredentialsError(isCredentials);
        throw new Error(message);
      }
      const data = await res.json();
      setResult({ type: activeTab, data, timestamp: Date.now() });
    } catch (err: any) {
      setError(err.message || t("generationFailed"));
    }
    setLoading(false);
  };

  const config = MODALITY_CONFIG[activeTab];
  const voiceList = getVoiceList(selectedProvider);
  const currentSpeechFormats = getSpeechFormats(selectedProvider);
  const isTopazImageFlow = activeTab === "image" && selectedProvider === "topaz";
  const isGenerateDisabled =
    loading ||
    (activeTab === "transcription"
      ? !audioFile
      : activeTab === "image"
        ? isTopazImageFlow
          ? !imageInputFile
          : !prompt.trim()
        : !prompt.trim());

  return (
    <div className="space-y-6">
      {/* Modality Tabs */}
      <SegmentedControl
        aria-label={t("modalityTabsAria")}
        value={activeTab}
        onChange={(next) => switchTab(next as Modality)}
        options={(Object.keys(MODALITY_CONFIG) as Modality[]).map((key) => ({
          value: key,
          label: t(MODALITY_CONFIG[key].labelKey),
          icon: MODALITY_CONFIG[key].icon,
        }))}
      />

      {/* Generation Form */}
      <Card className="space-y-4" padding="md">
        {/* Provider + Model row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label={t("provider")}
            value={selectedProvider}
            onChange={(e) => handleProviderChange(e.target.value)}
            options={currentProviders.map((p) => ({ value: p.id, label: p.name }))}
          />
          <Select
            label={t("model")}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            options={currentModels.map((m) => ({ value: m.id, label: m.name }))}
          />
        </div>

        {/* Credential hint */}
        {selectedProvider && !["sdwebui", "comfyui", "qwen"].includes(selectedProvider) && (
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            <Icon name="info" size={14} className="text-warning" />
            {t.rich("credentialsRequired", {
              provider: () => <strong className="capitalize">{selectedProvider}</strong>,
              providers: (chunks) => (
                <Link
                  href="/dashboard/providers"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        )}

        {/* Speech: voice + format */}
        {activeTab === "speech" && (
          <div className="grid grid-cols-2 gap-4">
            <Select
              label={t("voice")}
              value={speechVoice}
              onChange={(e) => setSpeechVoice(e.target.value)}
              options={voiceList.map((v) => ({ value: v.id, label: v.label }))}
            />
            <Select
              label={t("format")}
              value={speechFormat}
              onChange={(e) => setSpeechFormat(e.target.value)}
              options={currentSpeechFormats.map((f) => ({ value: f, label: f }))}
            />
          </div>
        )}

        {/* Transcription: file upload */}
        {activeTab === "transcription" ? (
          <Input
            type="file"
            accept="audio/*,video/*"
            label={t("audioVideoFile")}
            error={fileSizeError || undefined}
            hint={
              <>
                {audioFile && !fileSizeError && (
                  <span className="block">
                    {audioFile.name} ({formatFileSize(audioFile.size)})
                  </span>
                )}
                <span className="block">{t("audioVideoFileHint")}</span>
              </>
            }
            inputClassName={FILE_INPUT_CLASS}
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setFileSizeError(null);
              if (file && file.size > MAX_TRANSCRIPTION_FILE_SIZE) {
                setFileSizeError(
                  t("fileTooLarge", { size: formatFileSize(file.size), max: "4 GB" })
                );
                setAudioFile(null);
                e.target.value = "";
                return;
              }
              setAudioFile(file);
            }}
          />
        ) : (
          <>
            {activeTab === "image" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  label={t("sourceImage")}
                  hint={
                    <>
                      {imageInputFile && (
                        <span className="block">
                          {imageInputFile.name} ({formatFileSize(imageInputFile.size)})
                        </span>
                      )}
                      <span className="block">{t("sourceImageHint")}</span>
                    </>
                  }
                  inputClassName={FILE_INPUT_CLASS}
                  onChange={(e) => setImageInputFile(e.target.files?.[0] ?? null)}
                />
                <Input
                  type="file"
                  accept="image/*"
                  label={t("maskImage")}
                  hint={
                    <>
                      {imageMaskFile && (
                        <span className="block">
                          {imageMaskFile.name} ({formatFileSize(imageMaskFile.size)})
                        </span>
                      )}
                      <span className="block">{t("maskImageHint")}</span>
                    </>
                  }
                  inputClassName={FILE_INPUT_CLASS}
                  onChange={(e) => setImageMaskFile(e.target.files?.[0] ?? null)}
                />
              </div>
            )}

            {/* Prompt / Text */}
            <Field
              htmlFor={promptId}
              label={
                activeTab === "speech"
                  ? t("text")
                  : activeTab === "image" && selectedProvider === "topaz"
                    ? t("promptOptional")
                    : t("prompt")
              }
            >
              <Textarea
                id={promptId}
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  activeTab === "image" && selectedProvider === "topaz"
                    ? t("enhancementInstructionsPlaceholder")
                    : config.placeholderKey
                      ? t(config.placeholderKey)
                      : undefined
                }
                className="resize-none"
              />
            </Field>
          </>
        )}

        {/* Generate button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleGenerate}
          disabled={isGenerateDisabled}
          loading={loading}
          icon={
            loading
              ? undefined
              : activeTab === "speech"
                ? "volume_up"
                : activeTab === "transcription"
                  ? "mic"
                  : "auto_awesome"
          }
        >
          {loading
            ? activeTab === "speech"
              ? t("synthesizing")
              : activeTab === "transcription"
                ? t("transcribing")
                : t("generating")
            : activeTab === "speech"
              ? t("synthesizeSpeech")
              : activeTab === "transcription"
                ? t("transcribeAudio")
                : t("generateModality", { modality: t(config.labelKey) })}
        </Button>
      </Card>

      {/* Error */}
      {error && (
        <Alert
          variant={isCredentialsError ? "warning" : "critical"}
          icon={<Icon name={isCredentialsError ? "key" : "error"} size={20} />}
          title={isCredentialsError ? t("apiKeyRequired") : t("error")}
          description={<span className="break-words">{error}</span>}
          dismissLabel={tc("dismissNotification")}
          onDismiss={() => setError(null)}
          actions={
            isCredentialsError ? (
              <Link
                href="/dashboard/providers"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Icon name="open_in_new" size={13} />
                {t("configureApiKeys")} →
              </Link>
            ) : undefined
          }
        />
      )}

      {/* Result */}
      {result && (
        <Card padding="md">
          <div className="flex items-center gap-2 mb-4">
            <Icon name={config.icon} size={20} className="text-primary" />
            <h3 className="text-sm font-medium text-text-main">{t("result")}</h3>
            <span className="text-xs text-text-muted ml-auto">
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {result.type === "speech" && result.audioUrl ? (
            <div className="space-y-3">
              <audio controls src={result.audioUrl} className="w-full rounded-lg" autoPlay />
              <a
                href={result.audioUrl}
                download={`speech.${result.data?.format || "mp3"}`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Icon name="download" size={16} />
                {t("downloadFormat", { format: result.data?.format?.toUpperCase() || "MP3" })}
              </a>
            </div>
          ) : result.type === "image" ? (
            <ImageResults data={result.data} />
          ) : result.type === "transcription" ? (
            <div className="space-y-3">
              <div className="bg-bg-subtle rounded-lg p-4 text-sm text-text-main leading-relaxed whitespace-pre-wrap">
                {result.data?.text || (
                  <span className="text-text-muted italic">{t("noTextReturned")}</span>
                )}
              </div>
              {result.data?.words && (
                <details className="mt-2">
                  <summary className="text-xs text-text-muted cursor-pointer hover:text-text-main">
                    {t("wordTimestamps", { count: result.data.words.length })}
                  </summary>
                  <pre className="bg-bg-subtle rounded mt-2 p-3 text-xs text-text-muted overflow-auto max-h-48 custom-scrollbar">
                    {JSON.stringify(result.data.words, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ) : (
            <pre className="bg-bg-subtle rounded-lg p-4 text-xs text-text-muted overflow-auto max-h-96 custom-scrollbar">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </Card>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {(Object.keys(MODALITY_CONFIG) as Modality[]).map((key) => {
          const cfg = MODALITY_CONFIG[key];
          const providerCount = PROVIDER_MODELS[key]?.length ?? 0;
          return (
            <Card key={key} padding="sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center size-8 rounded-lg bg-bg-subtle text-primary">
                  <Icon name={cfg.icon} size={16} />
                </div>
                <span className="text-sm font-medium text-text-main">{t(cfg.labelKey)}</span>
              </div>
              <p className="text-xs text-text-muted">
                {t("providerCount", { count: providerCount })}
              </p>
              <code className="block mt-2 break-all text-xs text-text-muted bg-bg-subtle rounded px-2 py-1">
                POST {cfg.endpoint}
              </code>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
