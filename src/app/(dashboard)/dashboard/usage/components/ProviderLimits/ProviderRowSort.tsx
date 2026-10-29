"use client";
import { useId, type ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
export function ProviderSortContext({
  ids,
  labels,
  onReorder,
  children,
}: {
  ids: string[];
  labels: Record<string, string>;
  onReorder: (ids: string[]) => void;
  children: ReactNode;
}) {
  const id = useId();
  const t = useTranslations("usage");
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const finish = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(String(active.id)),
      to = ids.indexOf(String(over.id));
    if (from >= 0 && to >= 0) onReorder(arrayMove(ids, from, to));
  };
  const announce = (provider: string, target = provider) =>
    t("healthDragPosition", {
      provider: labels[provider] || provider,
      position: Math.max(0, ids.indexOf(target)) + 1,
      count: ids.length,
    });
  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      accessibility={{
        screenReaderInstructions: {
          draggable: `${t("healthDrag")}: ␣ → ↑ ↓ → ␣; ${t("cancel")} (⎋)`,
        },
        announcements: {
          onDragStart: ({ active }) => announce(String(active.id)),
          onDragOver: ({ active, over }) =>
            announce(String(active.id), String(over?.id ?? active.id)),
          onDragEnd: ({ active, over }) =>
            announce(String(active.id), String(over?.id ?? active.id)),
          onDragCancel: ({ active }) => announce(String(active.id)),
        },
      }}
      onDragEnd={finish}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
export function SortableProviderRow({
  id,
  label,
  header,
  children,
}: {
  id: string;
  label: string;
  header: ReactNode;
  children: ReactNode;
}) {
  const t = useTranslations("usage");
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <section
      ref={setNodeRef}
      data-provider={id}
      data-dragging={isDragging || undefined}
      aria-label={label}
      style={{
        transform: CSS.Transform.toString(
          transform ? { ...transform, scaleX: 1, scaleY: 1 } : null
        ),
        transition,
        position: "relative",
        zIndex: isDragging ? 10 : undefined,
      }}
      className={`min-w-0 border-b border-border/70 bg-surface px-[18px] py-[14px] last:border-b-0 ${isDragging ? "cursor-grabbing rounded-xl shadow-xl ring-1 ring-border" : ""}`}
    >
      <div className="mb-[10px] flex min-w-0 flex-wrap items-center gap-2">
        <Button
          ref={setActivatorNodeRef}
          variant="ghost"
          size="icon-sm"
          {...attributes}
          {...listeners}
          data-drag-handle
          aria-label={t("healthDrag")}
          className="-ms-[6px] shrink-0 touch-none cursor-grab active:cursor-grabbing"
        >
          <Icon name="drag_indicator" size={15} />
        </Button>
        {header}
      </div>
      {children}
    </section>
  );
}
