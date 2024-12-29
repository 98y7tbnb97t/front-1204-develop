import { useCallback, useRef } from 'react';

export function useDebounce<T>(callback: (...args: T[]) => void | Promise<void>, delay: number) {
    const timer = useRef<NodeJS.Timeout | null>();

    return useCallback((...args: T[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            void callback(...args);
        }, delay);
    }, [callback, delay]);
}
