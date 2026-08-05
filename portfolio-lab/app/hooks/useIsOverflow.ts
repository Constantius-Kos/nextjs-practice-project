import { useState, useEffect, RefObject } from 'react';

export function useIsOverflow(
    containerRef: RefObject<HTMLElement | null>,
    textRef: RefObject<HTMLElement | null>,
    dependency?: string | number
): boolean {
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current && textRef.current) {
                // ПОРІВНЯННЯ: чи scrollWidth більший за clientWidth
                const hasOverflow = textRef.current.scrollWidth > containerRef.current.clientWidth;
                setIsOverflow(hasOverflow);
            }
        };

        checkOverflow();

        // Додаємо ResizeObserver для відстеження зміни розміру екрана
        const observer = new ResizeObserver(checkOverflow);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [containerRef, textRef, dependency]);

    return isOverflow;
}
