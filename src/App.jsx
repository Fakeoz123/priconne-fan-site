import React, { useEffect, useState } from "react";
import EventTimer from "./components/EventTimer";
import "./App.css";

const isPrivate = import.meta.env.VITE_MODE === "private";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fileName = isPrivate ? "events.private.json" : "events.public.json";

    fetch(`/data/${fileName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        data.sort((a, b) => new Date(a.start) - new Date(b.start));
        setEvents(data);
      })
      .catch((error) => {
        console.error("❌ Failed to load event data:", error);
      });
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
