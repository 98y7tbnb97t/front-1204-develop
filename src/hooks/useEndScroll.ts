import { MutableRefObject, useEffect, useRef } from 'react';

interface useEndScrollProps {
    rootRef?: MutableRefObject<HTMLDivElement | null>;
    targetRef: MutableRefObject<HTMLDivElement | null>;
    onIntersect?: () => void;
    delay?: number
}

export const useEndScroll =  ({ rootRef, targetRef, onIntersect, delay = 0 } : useEndScrollProps) => {
    const timeout = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        let observer: IntersectionObserver;
        const rootElement = rootRef?.current as Element || null;
        const targetElement = targetRef.current as Element;
        if (onIntersect) {
            const options = {
                root: rootElement,
                rootMargin: '0px',
                threshold: 1.0,
            };
            
            observer = new IntersectionObserver(([entity], ob) => {
                if (entity.isIntersecting) {
                    timeout.current = setTimeout(() => {
                        ob.unobserve(entity.target)
                        onIntersect();
                    }, delay)
                } else if (timeout.current) {
                    clearTimeout(timeout.current);
                }
                
            }, options);
            observer.observe(targetElement);
            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
                if (observer && targetElement) {
                    observer.unobserve(targetElement);
                }
            };
        }
    }, [delay, onIntersect, rootRef, targetRef]);
};