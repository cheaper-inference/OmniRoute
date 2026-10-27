"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
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
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Icon from "@/shared/components/Icon";

interface SortableProviderListProps {
  providerIds: string[];
  disabled: boolean;
  onReorder: (fromProvider: string, toProvider: string) => void;
  children: ReactNode;
}

/**
 * Drag-to-reorder container for Quota Tracker provider sections. Dropping a
 * section on another reports `(fromProvider, toProvider)`; the caller persists
 * the resulting provider order. `disabled` never changes the rendered tree
 * (sections keep their open/closed state); it only turns dragging off.
 */
export function SortableProviderList({
  providerIds,
  disabled,
  onReorder,
  children,
}: SortableProviderListProps) {
  // Same id on server and client; dnd-kit's default comes from a process-wide counter.
  const dndContextId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (disabled || !over || active.id === over.id) return;
    onReorder(String(active.id), String(over.id));
  };

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={providerIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

/**
 * One draggable provider section. Only the grip passed to `children` starts a
 * drag, so the rest of the section (its <details> toggle, card actions) keeps
 * working. `showHandle=false` renders no grip (nothing to reorder); `disabled`
 * keeps it visible but inert (e.g. while the previous order is being saved).
 * Clicks on the grip are swallowed so grabbing it never toggles the section.
 */
export function SortableProviderItem({
  id,
  disabled,
  showHandle,
  handleLabel,
  children,
}: {
  id: string;
  disabled: boolean;
  showHandle: boolean;
  handleLabel: string;
  children: (dragHandle: ReactNode) => ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : undefined,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 10 : undefined,
  };

  const dragHandle = showHandle ? (
    <button
      type="button"
      disabled={disabled}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      className="shrink-0 cursor-grab touch-none rounded p-0.5 text-text-muted hover:text-primary active:cursor-grabbing disabled:cursor-default disabled:opacity-40"
      title={handleLabel}
      aria-label={handleLabel}
    >
      <Icon name="drag_indicator" size={16} />
    </button>
  ) : null;

  return (
    <div ref={setNodeRef} style={style} data-quota-provider-sortable={id}>
      {children(dragHandle)}
    </div>
  );
}
