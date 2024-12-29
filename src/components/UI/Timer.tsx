import { useState, useRef, useEffect, FC } from "react";
interface TimerProps {
    isRunning: boolean;
}
const Timer: FC<TimerProps> = ({ isRunning }) => {
    const [time, setTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning && intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        } else if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        return () => {
            clearInterval(intervalRef.current!);
        }
    }, [setTime, isRunning]);

    const seconds = time  % 60;
    const minutes = Math.floor((time / 60)) % 60;
    const hours = Math.floor(time  / 3600);

    return (
        <strong className="text-lg text-red-600">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</strong>
    );
}

export default Timer;