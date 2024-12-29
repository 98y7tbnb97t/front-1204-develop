import { useCallback, useRef } from 'react';

export const useThrottle = <T, R>(callback: (...args: T[]) => R, ms: number) => {
    const throttleRef = useRef(false);

    return useCallback((...args: T[]) => {
        if (!throttleRef.current) {
            throttleRef.current = true;
            callback(...args);
            setTimeout(() => throttleRef.current = false, ms);
        }
    }, [callback, ms]);
};