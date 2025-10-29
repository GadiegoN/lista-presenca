"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface Player {
  id: string;
  name: string;
  order: number;
}

interface Props {
  players: Player[];
  onReorder: (updated: Player[]) => void;
}

export function PlayerOrderList({ players, onReorder }: Props) {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = players.findIndex((p) => p.id === active.id);
      const newIndex = players.findIndex((p) => p.id === over.id);
      const newOrder = arrayMove(players, oldIndex, newIndex);
      onReorder(newOrder);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={players.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2">
          {players.map((p) => (
            <SortablePlayer key={p.id} id={p.id} name={p.name} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortablePlayer({ id, name }: { id: string; name: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-white p-3 rounded-md shadow cursor-grab"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-4 h-4 text-gray-400" />
      <span className="text-gray-800 font-medium">{name}</span>
    </li>
  );
}
