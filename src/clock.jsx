import { useState, useEffect, useRef } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => new Date(prev.getTime() + 1000));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour12: true });

  return (
    <>
      <h2>Digital Clock</h2>
      <h1>{formatTime(time)}</h1>
      <button onClick={() => setRunning(true)} disabled={running}>
        Start
      </button>
      <button onClick={() => setRunning(false)} disabled={!running}>
        Pause
      </button>
      <button
        onClick={() => {
          setRunning(false);
          setTime(new Date());
        }}
      >
        Stop / Reset
      </button>
    </>
  );
};

export default Clock;