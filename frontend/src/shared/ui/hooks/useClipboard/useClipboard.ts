import { useCallback, useEffect, useRef, useState } from "react";

export function useClipboard(resetMs = 1500) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(value);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(null), resetMs);
      } catch {
        // Clipboard unavailable (e.g. insecure context) — fail silently.
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
