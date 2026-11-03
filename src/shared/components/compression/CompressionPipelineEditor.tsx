"use client";

// T06 — drag-to-reorder editor for the stacked-compression pipeline (gaps v3.8.42).
//
// A controlled component: it renders `steps` and reports every edit back through `onChange`
// (parent owns the state + persistence). All mutations go through the pure
// `compressionPipelineModel` so invariants (valid intensity, non-empty pipeline) hold.
//
import { useId } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import {
  allowedIntensities,
  addLayer,
  moveLayer,
  removeLayer,
  updateLayer,
  type EngineIntensities,
  type PipelineStep,
} from "./compressionPipelineModel";
import Button from "../Button";
import Icon from "../Icon";
import Select from "../Select";

export type { PipelineStep } from "./compressionPipelineModel";

type Props = {
  steps: PipelineStep[];
  onChange: (steps: PipelineStep[]) => void;
  engineIntensities: EngineIntensities;
};

function SortableRow(props: {
  id: string;
  index: number;
  step: PipelineStep;
  engines: string[];
  engineIntensities: EngineIntensities;
  canRemove: boolean;
  onPatch: (patch: Partial<PipelineStep>) => void;
  onRemove: () => void;
}) {
  const t = useTranslations("contextCombos");
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid={`pipeline-row-${props.index}`}
      className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2"
    >
      {/* dnd-kit drag handle: its listeners/attributes ride on the kit Button. */}
      <Button
        variant="outline"
        size="icon"
        aria-label={t("dragToReorder")}
        data-testid={`pipeline-drag-${props.index}`}
        className="cursor-grab text-text-muted"
        {...attributes}
        {...listeners}
      >
        <Icon name="drag_indicator" size={16} />
      </Button>
      <Select
        aria-label={t("engine")}
        value={props.step.engine}
        onChange={(event) => props.onPatch({ engine: event.target.value })}
      >
        {props.engines.map((engine) => (
          <option key={engine} value={engine}>
            {engine}
          </option>
        ))}
      </Select>
      <Select
        aria-label={t("intensity")}
        value={props.step.intensity ?? ""}
        onChange={(event) => props.onPatch({ intensity: event.target.value })}
      >
        {allowedIntensities(props.step.engine, props.engineIntensities).map((intensity) => (
          <option key={intensity} value={intensity}>
            {intensity}
          </option>
        ))}
      </Select>
      <Button
        variant="outline"
        onClick={props.onRemove}
        disabled={!props.canRemove}
        data-testid={`pipeline-remove-${props.index}`}
      >
        {t("removeStep")}
      </Button>
    </div>
  );
}

export function CompressionPipelineEditor({ steps, onChange, engineIntensities }: Props) {
  const t = useTranslations("contextCombos");
  // Same id on server and client; dnd-kit's default comes from a process-wide counter.
  const dndContextId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  // Index-based stable ids: a controlled list with no per-row id. Ids are stable within a
  // render (0..n-1); reorder maps id→index before delegating to the pure model.
  const ids = steps.map((_, index) => String(index));
  const engines = Object.keys(engineIntensities);
  const firstEngine = engines[0] ?? "rtk";

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    onChange(moveLayer(steps, from, to));
  };

  return (
    <div className="space-y-3" data-testid="compression-pipeline-editor">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-main">{t("pipeline")}</h3>
        <Button
          variant="outline"
          size="sm"
          icon="add"
          data-testid="pipeline-add-step"
          onClick={() => onChange(addLayer(steps, { engine: firstEngine }, engineIntensities))}
        >
          {t("addStep")}
        </Button>
      </div>
      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <SortableRow
                key={ids[index]}
                id={ids[index]}
                index={index}
                step={step}
                engines={engines}
                engineIntensities={engineIntensities}
                canRemove={steps.length > 1}
                onPatch={(patch) => onChange(updateLayer(steps, index, patch, engineIntensities))}
                onRemove={() => onChange(removeLayer(steps, index))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
