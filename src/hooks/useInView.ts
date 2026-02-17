import { useState, useEffect, useRef } from 'react';
import type { RefCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseInViewReturn {
  isInView: boolean;
  ref: RefCallback<HTMLElement>;
}

export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const hasTriggered = useRef(false);

  const ref: RefCallback<HTMLElement> = (element) => {
    elementRef.current = element;
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: assume in view
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (triggerOnce) {
          if (inView && !hasTriggered.current) {
            setIsInView(true);
            hasTriggered.current = true;
            observer.disconnect();
          }
        } else {
          setIsInView(inView);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { isInView, ref };
}
