import React, { useState, useEffect } from "react";

const Table = ({ isLoggedIn }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", time: "", anchor: "" });

  useEffect(() => {
    // Fetch data from MongoDB here
    fetch("/api/events") // Replace with actual backend route
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleAddEvent = () => {
    // Post data to MongoDB here
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => setEvents([...events, data]));
    setNewEvent({ name: "", time: "", anchor: "" });
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-4 py-2">Song/Music Name</th>
            <th className="border px-4 py-2">Timing</th>
            <th className="border px-4 py-2">Anchor</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{event.name}</td>
              <td className="border px-4 py-2">{event.time}</td>
              <td className="border px-4 py-2">{event.anchor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoggedIn && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Add New Event</h2>
          <input
            type="text"
            placeholder="Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Anchor"
            value={newEvent.anchor}
            onChange={(e) => setNewEvent({ ...newEvent, anchor: e.target.value })}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleAddEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
