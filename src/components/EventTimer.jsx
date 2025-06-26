import React, { useEffect, useState } from "react";
import "./EventTimer.css";

function EventTimer({ title, start, end }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [now, setNow] = useState(new Date());

  const startDate = new Date(start);
  const endDate = new Date(end);

  const isUpcoming = now < startDate;
  const isOngoing = now >= startDate && now <= endDate;
  const isEnded = now > endDate;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (target) => {
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getDayDifference = (a, b) =>
    Math.floor(Math.abs(a - b) / (1000 * 60 * 60 * 24));

  const formatDate = (date, timeZone) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone,
    }).format(date);

  return (
    <div className="event-card">
      <h2>{title}</h2>

      {isUpcoming && (
        <p className="countdown">Starts in {formatCountdown(startDate)}</p>
      )}
      {isOngoing && (
        <p className="countdown">Ends in {formatCountdown(endDate)}</p>
      )}
      {isEnded && (
        <p className="ended">Ended {getDayDifference(now, endDate)} days ago</p>
      )}

      <button
        className="dropdown-toggle"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Time Details" : "Show Time Details"}
      </button>

      {showDetails && (
        <div className="time-details">
          {isOngoing && (
            <>
              <div className="started-row">
                <span>Started {getDayDifference(now, startDate)} days ago</span>
                <button
                  className="info-icon"
                  onClick={() => setShowPopup(!showPopup)}
                >
                  i
                </button>
              </div>

              {showPopup && (
                <div className="info-popup">
                  <p>
                    <strong>Start:</strong>
                  </p>
                  <ul>
                    <li>🗾 JST: {formatDate(startDate, "Asia/Tokyo")}</li>
                    <li>
                      🌐 Local:{" "}
                      {formatDate(
                        startDate,
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                      )}
                    </li>
                  </ul>
                  <p>
                    <strong>End:</strong>
                  </p>
                  <ul>
                    <li>🗾 JST: {formatDate(endDate, "Asia/Tokyo")}</li>
                    <li>
                      🌐 Local:{" "}
                      {formatDate(
                        endDate,
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          {!isOngoing && (
            <div className="static-time-info">
              <p>
                <strong>Start:</strong>
              </p>
              <ul>
                <li>🗾 JST: {formatDate(startDate, "Asia/Tokyo")}</li>
                <li>
                  🌐 Local:{" "}
                  {formatDate(
                    startDate,
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  )}
                </li>
              </ul>
              <p>
                <strong>End:</strong>
              </p>
              <ul>
                <li>🗾 JST: {formatDate(endDate, "Asia/Tokyo")}</li>
                <li>
                  🌐 Local:{" "}
                  {formatDate(
                    endDate,
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EventTimer;
