import React, { useEffect, useState } from "react";
import EventTimer from "./components/EventTimer";
import "./App.css";

// Read from environment variable
const isPrivate = import.meta.env.VITE_MODE === "private";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const fileName = isPrivate ? "events.private.json" : "events.public.json";

      try {
        const module = await import(`./data/${fileName}`);
        const data = module.default;

        // Optional: sort by start date
        data.sort((a, b) => new Date(a.start) - new Date(b.start));
        setEvents(data);
      } catch (error) {
        console.error("❌ Failed to load event data:", error);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="App">
      <h1>Princess Connect Event Timers</h1>
      {events.length === 0 ? (
        <p>Loading events...</p>
      ) : (
        events.map((event) => (
          <EventTimer
            key={event.id}
            title={event.title}
            start={event.start}
            end={event.end}
          />
        ))
      )}
    </div>
  );
}

export default App;
