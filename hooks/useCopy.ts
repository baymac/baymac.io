import { useCallback } from 'react';
import { useClipboard } from 'use-clipboard-copy';

export default function useCopy(id, timeout) {
  const clipboard = useClipboard({
    copiedTimeout: timeout ?? 1500
  });

  const handleCopy = useCallback(() => {
    const copiedValue = document.getElementById(id).innerText;
    clipboard.copy(copiedValue);
  }, [clipboard.copy]);

  return [handleCopy, clipboard.copied];
}
