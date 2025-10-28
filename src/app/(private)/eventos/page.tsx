"use client";

import { EventForm } from "./_components/event-form";
import { EventList } from "./_components/event-list";
import { useEvents } from "./_components/use-events";

export default function EventosPage() {
  const { name, time, setName, setTime, events, addEvent, loading } =
    useEvents();

  return (
    <div className="space-y-4 w-[calc(100vw-20rem)] overflow-x-hidden py-4">
      <h1 className="text-2xl font-semibold text-gray-800">📅 Eventos</h1>

      <EventForm
        name={name}
        time={time}
        setName={setName}
        setTime={setTime}
        onAdd={addEvent}
      />

      {loading ? (
        <div className="text-gray-500">Carregando...</div>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
}
