"use client";

import { EventForm } from "./_components/event-form";
import { EventList } from "./_components/event-list";
import { useEvents } from "./_components/use-events";

export default function EventosPage() {
  const {
    name,
    time,
    setName,
    setTime,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    loading,
  } = useEvents();

  return (
    <div className="p-4 sm:p-6 space-y-5 w-full lg:w-[calc(100vw-20rem)] overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 flex items-center gap-2">
        📅 <span>Eventos</span>
      </h1>

      <EventForm
        name={name}
        time={time}
        setName={setName}
        setTime={setTime}
        onAdd={addEvent}
      />

      {loading ? (
        <div className="text-gray-500 text-center py-6">Carregando...</div>
      ) : (
        <EventList
          events={events}
          onUpdate={updateEvent}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
}
