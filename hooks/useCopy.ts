import { useCallback } from 'react';
import { useClipboard } from 'use-clipboard-copy';

export default function useCopy(id: string, timeout: number) {
  const clipboard = useClipboard({
    copiedTimeout: timeout ?? 1500,
  });

  const handleCopy = useCallback(() => {
    const copiedValue = document.getElementById(id).innerText;
    clipboard.copy(copiedValue);
  }, [clipboard, id]);

  return [handleCopy, clipboard.copied];
}
