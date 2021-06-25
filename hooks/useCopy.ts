import { useCallback } from "react";
import { useClipboard } from "use-clipboard-copy";

export default function useCopy(id) {
  const clipboard = useClipboard({
    copiedTimeout: 1500,
  });

  const handleCopy = useCallback(() => {
    const copiedValue = document.getElementById(id).innerText;
    clipboard.copy(copiedValue);
  }, [clipboard.copy]);

  return [handleCopy, clipboard.copied];
}