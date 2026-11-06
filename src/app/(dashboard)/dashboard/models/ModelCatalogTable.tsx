"use client";

import { useTranslations } from "next-intl";
import { SortableTableHead } from "@omniroute/ui-kit/data-table-shell";
import { ModelIdentity } from "@omniroute/ui-kit/model-identity";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { Badge, Button, Icon } from "@/shared/components";
import CatalogTestBadge from "./CatalogTestBadge";
import {
  ActionsHeading,
  CatalogTableFooter,
  PlainHeading,
  SelectAllHeaderCell,
  SelectRowCell,
} from "./CatalogTableParts";
import type { CatalogTestResult } from "./catalogTestStorage";
import { getModelTestKey } from "./catalogTestStorage";
import type { CatalogModelRow, CatalogSortDirection, CatalogSortField } from "./modelCatalogUtils";

function formatCount(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function formatOptionalCount(value: number | undefined): string {
  return typeof value === "number" ? formatCount(value) : "—";
}

function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll(/[_-]+/g, " ")
    .replace(/^\w/, (first) => first.toUpperCase());
}

function capabilityLabels(
  model: CatalogModelRow,
  labelsByDirection: { input: string; output: string }
): string[] {
  const labels = Object.entries(model.capabilities ?? {}).flatMap(([key, value]) => {
    if (value === true) return [humanize(key)];
    if (Array.isArray(value)) {
      return value.filter((entry): entry is string => typeof entry === "string");
    }
    return [];
  });

  for (const modality of model.input_modalities ?? [])
    labels.push(`${labelsByDirection.input}: ${humanize(modality)}`);
  for (const modality of model.output_modalities ?? [])
    labels.push(`${labelsByDirection.output}: ${humanize(modality)}`);
  return [...new Set(labels)];
}

function SortableHeading({
  field,
  label,
  activeField,
  direction,
  onSort,
}: {
  field: CatalogSortField;
  label: string;
  activeField: CatalogSortField;
  direction: CatalogSortDirection;
  onSort: (field: CatalogSortField) => void;
}) {
  const active = field === activeField;
  // The page's onSort owns the flip rule (same field flips, a new field starts "asc").
  return (
    <SortableTableHead
      scope="col"
      className="px-4"
      direction={active ? direction : undefined}
      defaultDirection="asc"
      onDirectionChange={() => onSort(field)}
    >
      {label}
    </SortableTableHead>
  );
}

type ModelCatalogLabels = {
  provider: string;
  model: string;
  type: string;
  capabilities: string;
  context: string;
  output: string;
  flags: string;
  custom: string;
  free: string;
};

type ProviderHealth = "healthy" | "degraded" | "down";

function ModelCatalogTableHead({
  labels,
  sortField,
  sortDirection,
  onSort,
  allOnPageSelected,
  someOnPageSelected,
  onToggleSelectAll,
  showActions,
  showVisibility,
}: {
  labels: ModelCatalogLabels;
  sortField: CatalogSortField;
  sortDirection: CatalogSortDirection;
  onSort: (field: CatalogSortField) => void;
  allOnPageSelected: boolean;
  someOnPageSelected: boolean;
  onToggleSelectAll?: () => void;
  showActions: boolean;
  showVisibility: boolean;
}) {
  const t = useTranslations("modelCatalog");
  return (
    <TableHeader>
      <TableRow>
        {onToggleSelectAll && (
          <SelectAllHeaderCell
            checked={allOnPageSelected}
            indeterminate={someOnPageSelected}
            onToggle={onToggleSelectAll}
            label={t("selectAllModels")}
          />
        )}
        <SortableHeading
          field="provider"
          label={labels.provider || t("provider")}
          activeField={sortField}
          direction={sortDirection}
          onSort={onSort}
        />
        <SortableHeading
          field="id"
          label={labels.model || t("model")}
          activeField={sortField}
          direction={sortDirection}
          onSort={onSort}
        />
        <SortableHeading
          field="type"
          label={labels.type || t("type")}
          activeField={sortField}
          direction={sortDirection}
          onSort={onSort}
        />
        <PlainHeading>{labels.capabilities || t("capabilities")}</PlainHeading>
        <SortableHeading
          field="context_length"
          label={labels.context || t("context")}
          activeField={sortField}
          direction={sortDirection}
          onSort={onSort}
        />
        <SortableHeading
          field="max_output_tokens"
          label={labels.output || t("output")}
          activeField={sortField}
          direction={sortDirection}
          onSort={onSort}
        />
        <PlainHeading>{labels.flags || t("flags")}</PlainHeading>
        {showVisibility && <PlainHeading>{t("visibleColumn")}</PlainHeading>}
        <PlainHeading>{t("healthTest")}</PlainHeading>
        {showActions && <ActionsHeading />}
      </TableRow>
    </TableHeader>
  );
}

function ModelProviderCell({
  model,
  providerHealth,
}: {
  model: CatalogModelRow;
  providerHealth?: ProviderHealth;
}) {
  const t = useTranslations("modelCatalog");
  return (
    <TableCell className="h-auto px-4 py-3 align-top">
      <div className="flex items-center gap-1.5">
        <ModelIdentity
          name={model.provider}
          provider={model.provider}
          logo={<ProviderIcon providerId={model.providerId} size={18} type="color" />}
        />
        {providerHealth && providerHealth !== "healthy" && (
          <Badge size="sm" variant={providerHealth === "degraded" ? "warning" : "error"} dot>
            {providerHealth === "degraded" ? t("degraded") : t("down")}
          </Badge>
        )}
      </div>
      <span className="mt-0.5 block font-mono text-xs text-text-muted">{model.providerId}</span>
    </TableCell>
  );
}

function ModelTypeCell({ model }: { model: CatalogModelRow }) {
  return (
    <TableCell className="h-auto px-4 py-3 align-top text-text-main">
      {humanize(model.type)}
      {model.subtype && (
        <span className="mt-0.5 block text-xs text-text-muted">{humanize(model.subtype)}</span>
      )}
    </TableCell>
  );
}

/** The first three capability badges, then a "+N" badge whose label lists the rest. */
function ModelCapabilitiesCell({ capabilities }: { capabilities: string[] }) {
  const t = useTranslations("modelCatalog");
  const additionalCapabilities = capabilities.slice(3);
  return (
    <TableCell className="h-auto max-w-xs whitespace-normal px-4 py-3 align-top">
      {capabilities.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {capabilities.slice(0, 3).map((capability) => (
            <Badge key={capability} size="sm" variant="default">
              {capability}
            </Badge>
          ))}
          {additionalCapabilities.length > 0 && (
            <span
              role="img"
              aria-label={t("additionalCapabilities", {
                list: additionalCapabilities.join(", "),
              })}
              title={additionalCapabilities.join(", ")}
            >
              <Badge size="sm" variant="default">
                +{additionalCapabilities.length}
              </Badge>
            </span>
          )}
        </div>
      ) : (
        <span className="text-text-muted" title={t("noCapabilities")}>
          —
        </span>
      )}
    </TableCell>
  );
}

function ModelFlagsCell({ model, labels }: { model: CatalogModelRow; labels: ModelCatalogLabels }) {
  const t = useTranslations("modelCatalog");
  return (
    <TableCell className="h-auto px-4 py-3 align-top">
      <div className="flex flex-wrap gap-1.5">
        {model.custom === true && (
          <Badge size="sm" variant="info">
            {labels.custom || t("custom")}
          </Badge>
        )}
        {model.free === true && (
          <Badge size="sm" variant="success">
            {labels.free || t("free")}
          </Badge>
        )}
        {model.hidden === true && (
          <Badge size="sm" variant="warning">
            {t("hiddenBadge")}
          </Badge>
        )}
        {model.custom !== true && model.free !== true && model.hidden !== true && (
          <span className="text-text-muted" title={t("noFlags")}>
            —
          </span>
        )}
      </div>
    </TableCell>
  );
}

/** Eye toggle: shows/hides the model in `/v1/models` via the provider-models store. */
function ModelVisibilityCell({
  model,
  busy,
  onToggle,
}: {
  model: CatalogModelRow;
  busy: boolean;
  onToggle: (model: CatalogModelRow) => void;
}) {
  const t = useTranslations("modelCatalog");
  const hidden = model.hidden === true;
  return (
    <TableCell className="h-auto px-4 py-3 align-top">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        role="switch"
        aria-checked={!hidden}
        aria-label={
          hidden ? t("showModel", { name: model.name }) : t("hideModel", { name: model.name })
        }
        title={hidden ? t("showModel", { name: model.name }) : t("hideModel", { name: model.name })}
        disabled={busy || !model.visibility}
        onClick={() => onToggle(model)}
        data-testid={`toggle-visibility-${model.id}`}
        className="text-text-muted hover:text-text-main"
      >
        <Icon
          name={hidden ? "visibility_off" : "visibility"}
          size={18}
          className={hidden ? undefined : "text-primary"}
        />
      </Button>
    </TableCell>
  );
}

function ModelCatalogTableRow({
  model,
  labels,
  selectedIds,
  testResults,
  activeTestingKeys,
  providerHealthMap,
  onToggleSelect,
  renderKeyAccess,
  onTestModel,
  bulkRunning,
  onToggleVisibility,
  visibilityBusy,
}: {
  model: CatalogModelRow;
  labels: ModelCatalogLabels;
  selectedIds: Set<string>;
  testResults: Record<string, CatalogTestResult>;
  activeTestingKeys: ReadonlySet<string>;
  providerHealthMap: Record<string, ProviderHealth>;
  onToggleSelect?: (id: string) => void;
  renderKeyAccess?: (model: CatalogModelRow) => import("react").ReactNode;
  onTestModel?: (providerId: string, modelId: string) => void;
  bulkRunning: boolean;
  onToggleVisibility?: (model: CatalogModelRow) => void;
  visibilityBusy: boolean;
}) {
  const t = useTranslations("modelCatalog");
  const common = useTranslations("common");
  const rowId = `${model.providerId}:${model.id}`;
  const isSelected = selectedIds.has(rowId);
  const testKey = getModelTestKey(model.providerId, model.id);
  const isTesting = activeTestingKeys.has(testKey);
  const result = testResults[testKey];

  const capabilities = capabilityLabels(model, {
    input: common("input"),
    output: common("output"),
  });
  return (
    <TableRow
      data-state={isSelected ? "selected" : undefined}
      className={`align-top ${model.hidden === true ? "opacity-60" : ""}`}
    >
      {onToggleSelect && (
        <SelectRowCell
          checked={isSelected}
          onToggle={() => onToggleSelect(rowId)}
          label={t("selectModel", { name: model.name })}
        />
      )}
      <ModelProviderCell model={model} providerHealth={providerHealthMap[model.providerId]} />
      <TableCell className="h-auto max-w-sm whitespace-normal px-4 py-3 align-top">
        <span className="block break-words font-medium text-text-main">{model.name}</span>
        <span className="mt-0.5 block break-all font-mono text-xs text-text-muted">{model.id}</span>
      </TableCell>
      <ModelTypeCell model={model} />
      <ModelCapabilitiesCell capabilities={capabilities} />
      <TableCell className="h-auto px-4 py-3 align-top tabular-nums text-text-main">
        {formatOptionalCount(model.context_length)}
      </TableCell>
      <TableCell className="h-auto px-4 py-3 align-top tabular-nums text-text-main">
        {formatOptionalCount(model.max_output_tokens)}
      </TableCell>
      <ModelFlagsCell model={model} labels={labels} />
      {onToggleVisibility && (
        <ModelVisibilityCell model={model} busy={visibilityBusy} onToggle={onToggleVisibility} />
      )}
      <TableCell className="h-auto px-4 py-3 align-top">
        <CatalogTestBadge result={result} loading={isTesting} />
      </TableCell>
      {onTestModel && (
        <TableCell className="h-auto whitespace-nowrap px-4 py-3 text-right align-top">
          {renderKeyAccess?.(model)}
          <Button
            variant="secondary"
            size="sm"
            disabled={isTesting || bulkRunning}
            onClick={() => onTestModel(model.providerId, model.id)}
            data-testid={`test-model-${model.id}`}
          >
            {t("test")}
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}

interface ModelCatalogTableProps {
  rows: CatalogModelRow[];
  sortField: CatalogSortField;
  sortDirection: CatalogSortDirection;
  onSort: (field: CatalogSortField) => void;
  page: number;
  pageCount: number;
  startIndex: number;
  totalCount: number;
  loading: boolean;
  error: boolean;
  onPrevious: () => void;
  onNext: () => void;
  labels: ModelCatalogLabels;
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string) => void;
  onToggleSelectAll?: () => void;
  testResults?: Record<string, CatalogTestResult>;
  activeTestingKeys?: ReadonlySet<string>;
  renderKeyAccess?: (model: CatalogModelRow) => import("react").ReactNode;
  onTestModel?: (providerId: string, modelId: string) => void;
  providerHealthMap?: Record<string, "healthy" | "degraded" | "down">;
  /** A bulk run owns the runner; per-row tests wait until it ends. */
  bulkRunning?: boolean;
  onToggleVisibility?: (model: CatalogModelRow) => void;
  visibilityBusy?: boolean;
}

export default function ModelCatalogTable({
  rows,
  sortField,
  sortDirection,
  onSort,
  page,
  pageCount,
  startIndex,
  totalCount,
  loading,
  error,
  onPrevious,
  onNext,
  labels,
  selectedIds = new Set(),
  onToggleSelect,
  onToggleSelectAll,
  testResults = {},
  activeTestingKeys = new Set<string>(),
  renderKeyAccess,
  onTestModel,
  providerHealthMap = {},
  bulkRunning = false,
  onToggleVisibility,
  visibilityBusy = false,
}: ModelCatalogTableProps) {
  const t = useTranslations("modelCatalog");
  const firstResult = startIndex + 1;
  const lastResult = startIndex + rows.length;

  const rowIds = rows.map((r) => `${r.providerId}:${r.id}`);
  const allOnPageSelected = rowIds.length > 0 && rowIds.every((id) => selectedIds.has(id));
  const someOnPageSelected = rowIds.some((id) => selectedIds.has(id)) && !allOnPageSelected;

  return (
    <>
      <div role="region" aria-label={t("tableRegion")}>
        <Table
          scrollbarLabel={t("tableRegion")}
          containerClassName="rounded-none border-0"
          className="min-w-[1100px]"
        >
          <TableCaption className="sr-only">{t("tableCaption")}</TableCaption>
          <ModelCatalogTableHead
            labels={labels}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            allOnPageSelected={allOnPageSelected}
            someOnPageSelected={someOnPageSelected}
            onToggleSelectAll={onToggleSelectAll}
            showActions={Boolean(onTestModel)}
            showVisibility={Boolean(onToggleVisibility)}
          />
          <TableBody>
            {rows.map((model) => (
              <ModelCatalogTableRow
                key={`${model.providerId}:${model.id}`}
                model={model}
                labels={labels}
                selectedIds={selectedIds}
                testResults={testResults}
                activeTestingKeys={activeTestingKeys}
                providerHealthMap={providerHealthMap}
                onToggleSelect={onToggleSelect}
                renderKeyAccess={renderKeyAccess}
                onTestModel={onTestModel}
                bulkRunning={bulkRunning}
                onToggleVisibility={onToggleVisibility}
                visibilityBusy={visibilityBusy}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <CatalogTableFooter page={page} pageCount={pageCount} onPrevious={onPrevious} onNext={onNext}>
        {t("showingModels", {
          first: formatCount(firstResult),
          last: formatCount(lastResult),
          total: formatCount(totalCount),
        })}
        {loading && <span className="ml-2">{t("refreshing")}</span>}
        {error && <span className="ml-2 text-error">{t("refreshFailed")}</span>}
      </CatalogTableFooter>
    </>
  );
}
