import React, { useState, useEffect } from "react";

const Header = () => (
  <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 shadow-md sticky top-0 z-10">
    <h1 className="text-4xl font-bold text-center">Tapasya School Mahotsav</h1>
  </header>
);

const Footer = ({ loggedIn, onLoginClick }) => (
  <footer className="bg-gray-900 text-white py-4 text-center">
    <p>© 2024 Tapasya Mahotsav</p>
    <p className="mt-2">
      Status:{" "}
      <span className={loggedIn ? "text-green-500" : "text-red-500"}>
        {loggedIn ? "Admin Logged In" : "Guest"}
      </span>
    </p>
    {!loggedIn && (
      <button
        onClick={onLoginClick}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    )}
  </footer>
);

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "pass") {
      onLogin();
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-64 border p-2 mb-4 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-64 border p-2 mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        className="w-64 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    </div>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", time: "", anchor: "" });
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.time || !newEvent.anchor) {
      alert("All fields are required!");
      return;
    }
    fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => setEvents([...events, data]));
    setNewEvent({ name: "", time: "", anchor: "" });
  };

  const handleDeleteEvent = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    fetch(`http://localhost:3001/api/events/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setEvents(events.filter((event) => event._id !== id)));
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(filter.toLowerCase()) ||
      event.anchor.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "time") return a.time.localeCompare(b.time);
    if (sortOption === "anchor") return a.anchor.localeCompare(b.anchor);
    return 0;
  });

  if (showLogin) {
    return <Login onLogin={() => { setLoggedIn(true); setShowLogin(false); }} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-50 to-blue-100">
      <Header />
      <main className="flex-1 p-6">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Filter by name or anchor"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="time">Time</option>
            <option value="anchor">Anchor</option>
          </select>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Timing</th>
              <th className="border px-4 py-2">Anchor</th>
              {loggedIn && <th className="border px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedEvents.map((event) => (
              <tr key={event._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{event.name}</td>
                <td className="border px-4 py-2">{event.time}</td>
                <td className="border px-4 py-2">{event.anchor}</td>
                {loggedIn && (
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {loggedIn && (
          <div className="mt-6">
            <h2 className="text-lg font-bold">Add New Event</h2>
            <input
              type="text"
              placeholder="Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              className="border p-2 mr-2 rounded"
            />
            <select
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="border p-2 mr-2 rounded"
            >
              <option value="">Select Time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="9:30 AM">9:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="12:30 PM">12:30 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="01:30 PM">01:30 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="02:30 PM">02:30 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="05:30 PM">05:30 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              <option value="06:30 PM">06:30 PM</option>
              <option value="07:00 PM">07:00 PM</option>
              <option value="07:30 PM">07:30 PM</option>
              <option value="08:00 PM">08:00 PM</option>
              <option value="08:30 PM">08:30 PM</option>
              <option value="09:00 PM">09:00 PM</option>
              <option value="09:30 PM">09:30 PM</option>
              <option value="Custom">Custom</option>
            </select>
            {newEvent.time === "Custom" && (
              <input
                type="text"
                placeholder="Custom Time"
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="border p-2 mr-2 rounded"
              />
            )}
            <input
              type="text"
              placeholder="Anchor"
              value={newEvent.anchor}
              onChange={(e) => setNewEvent({ ...newEvent, anchor: e.target.value })}
              className="border p-2 mr-2 rounded"
            />
            <button
              onClick={handleAddEvent}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Event
            </button>
          </div>
        )}
      </main>
      <Footer loggedIn={loggedIn} onLoginClick={() => setShowLogin(true)} />
    </div>
  );
};

export default App;
