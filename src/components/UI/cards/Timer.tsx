import React, { useState, useEffect } from 'react';

interface TimerProps {
  time: number; // total time in seconds
  onTimeEnd: () => void; // callback when the timer ends
}

const Timer: React.FC<TimerProps> = ({ time, onTimeEnd }) => {
  const [secondsLeft, setSecondsLeft] = useState(time);

  useEffect(() => {
    if (secondsLeft === 0) {
      onTimeEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, onTimeEnd]);

  return (
    <div>
      Time left: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
    </div>
  );
};

export default Timer;
