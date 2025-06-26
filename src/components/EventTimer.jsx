import React from "react";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStatus(start, end) {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now < startDate) {
    const daysUntil = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
    return `Starts in ${daysUntil} day(s)`;
  } else if (now > endDate) {
    const daysSince = Math.ceil((now - endDate) / (1000 * 60 * 60 * 24));
    return `Ended ${daysSince} day(s) ago`;
  } else {
    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    return `Ends in ${daysLeft} day(s)`;
  }
}

const EventTimer = ({ title, start, end }) => {
  return (
    <div className="event-card">
      <h2>{title}</h2>
      <p>{getStatus(start, end)}</p>
      <details>
        <summary>Show time details</summary>
        <p>
          <strong>Start:</strong> {formatDate(start)}
        </p>
        <p>
          <strong>End:</strong> {formatDate(end)}
        </p>
      </details>
    </div>
  );
};

export default EventTimer;
