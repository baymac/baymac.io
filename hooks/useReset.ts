import { useEffect, useRef } from 'react';

/* Originally written in https://github.com/wsmd/use-clipboard-copy/blob/master/src/useTimedToggle.ts */

export function useReset(show: boolean, reset: () => void, duration: number) {
  const timeoutRef = useRef<number | undefined>(undefined);
  const initialValueRef = useRef<boolean>(false);

  useEffect(() => {
    if (show && !initialValueRef.current) {
      initialValueRef.current = true;
    }

    if (show && initialValueRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        reset();
        initialValueRef.current = false;
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [show, reset, duration]);

  return initialValueRef.current;
}
