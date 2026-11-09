import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import SegmentedControl from "@/shared/components/SegmentedControl";
import {
  hasExactModelStepDuplicate,
  type ComboBuilderGlobalModelEntry,
} from "@/lib/combos/builderDraft";

type TranslationFn = {
  (key: string, values?: Record<string, unknown>): string;
  has?: (key: string) => boolean;
};

const QUICK_PRESETS = ["Opus", "Sonnet", "DeepSeek", "Kimi", "Qwen", "Gemini Pro", "Flash"];

type Props = {
  builderSelectionMode: "step" | "global";
  onSelectionModeChange: (mode: "step" | "global") => void;
  globalSearchQuery: string;
  onGlobalSearchQueryChange: (query: string) => void;
  filteredGlobalModels: ComboBuilderGlobalModelEntry[];
  models: unknown[];
  onAddOne: (step: unknown) => void;
  onAddAll: () => void;
  t: TranslationFn;
};

function getI18nOrFallback(
  t: TranslationFn,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key, values);
  } catch {}
  return fallback;
}

/**
 * The combo builder's "Step by step" / "Global model search" mode toggle plus
 * the global-search panel itself (search box, quick presets, add-all, result
 * list). Extracted from ComboFormModal (#8285) to keep the mode toggle and
 * search UI cohesive and out of the already-frozen page.tsx.
 */
export default function GlobalModelSearchPanel({
  builderSelectionMode,
  onSelectionModeChange,
  globalSearchQuery,
  onGlobalSearchQueryChange,
  filteredGlobalModels,
  models,
  onAddOne,
  onAddAll,
  t,
}: Props) {
  return (
    <>
      <SegmentedControl
        size="sm"
        className="mt-2.5 mb-2 w-full [&_[role=tablist]]:w-full [&_[role=tab]]:flex-1"
        value={builderSelectionMode}
        onChange={(mode) => onSelectionModeChange(mode as "step" | "global")}
        options={[
          {
            value: "step",
            icon: "schema",
            label: getI18nOrFallback(t, "builderModeStep", "Step by step (Provider → Model)"),
          },
          {
            value: "global",
            icon: "search",
            label: getI18nOrFallback(t, "builderModeGlobal", "Global model search (Custom combo)"),
          },
        ]}
      />

      {builderSelectionMode === "global" && (
        <div className="mt-3 space-y-2.5 rounded-md border border-border bg-bg-subtle p-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                icon="search"
                value={globalSearchQuery}
                onChange={(e) => onGlobalSearchQueryChange(e.target.value)}
                aria-label={getI18nOrFallback(
                  t,
                  "builderModeGlobal",
                  "Global model search (Custom combo)"
                )}
                placeholder={getI18nOrFallback(
                  t,
                  "builderGlobalSearchPlaceholder",
                  "Search models across all providers (e.g. opus, sonnet, deepseek, kimi, qwen)..."
                )}
                inputClassName="pe-8"
              />
              {globalSearchQuery && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onGlobalSearchQueryChange("")}
                  aria-label={getI18nOrFallback(t, "clearSearch", "Clear search")}
                  className="absolute end-1 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  <Icon name="close" size={14} />
                </Button>
              )}
            </div>
            {filteredGlobalModels.length > 0 && (
              <Button
                type="button"
                onClick={onAddAll}
                variant="secondary"
                size="sm"
                icon="playlist_add"
                className="shrink-0"
              >
                {getI18nOrFallback(t, "builderGlobalAddAll", "Add all")} (
                {filteredGlobalModels.length})
              </Button>
            )}
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs text-text-muted uppercase font-semibold me-1">
              {getI18nOrFallback(t, "builderGlobalShortcuts", "Shortcuts:")}
            </span>
            {QUICK_PRESETS.map((preset) => (
              <Button
                key={preset}
                size="sm"
                variant={
                  globalSearchQuery.toLowerCase() === preset.toLowerCase() ? "secondary" : "ghost"
                }
                aria-pressed={globalSearchQuery.toLowerCase() === preset.toLowerCase()}
                onClick={() => onGlobalSearchQueryChange(preset.toLowerCase())}
                className="rounded-full"
              >
                {preset}
              </Button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[220px] overflow-y-auto rounded border border-border bg-surface divide-y divide-border">
            {filteredGlobalModels.length === 0 ? (
              <div className="p-4 text-center text-xs text-text-muted">
                {getI18nOrFallback(
                  t,
                  "builderGlobalNoResults",
                  `No model found for "${globalSearchQuery}".`,
                  {
                    query: globalSearchQuery,
                  }
                )}
              </div>
            ) : (
              filteredGlobalModels.map((item) => {
                const isAdded = hasExactModelStepDuplicate(models, item.step);
                return (
                  <div
                    key={`${item.providerId}-${item.modelId}`}
                    className="flex items-center justify-between px-3 py-2 text-xs hover:bg-bg-subtle"
                  >
                    <div className="flex flex-col min-w-0 pe-2">
                      <span className="font-semibold text-text-main truncate">
                        {item.modelName}
                      </span>
                      <span className="text-xs text-text-muted truncate">
                        {getI18nOrFallback(t, "builderGlobalProviderLabel", "Provider:")}{" "}
                        <strong className="text-text-main">{item.providerName}</strong> (
                        {getI18nOrFallback(
                          t,
                          "builderGlobalAccountCount",
                          `${item.connectionCount} account${item.connectionCount === 1 ? "" : "s"}`,
                          { count: item.connectionCount }
                        )}
                        )
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant={isAdded ? "ghost" : "secondary"}
                      onClick={() => onAddOne(item.step)}
                      disabled={isAdded}
                      icon={isAdded ? "check" : "add"}
                      className={isAdded ? "shrink-0 text-success" : "shrink-0"}
                    >
                      {isAdded
                        ? getI18nOrFallback(t, "builderGlobalAdded", "Added")
                        : getI18nOrFallback(t, "builderGlobalAdd", "Add")}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}
