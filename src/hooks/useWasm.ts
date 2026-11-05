import { useState, useEffect } from "react";

export type WasmStatus = "idle" | "loading" | "ready" | "error";

export interface WasmResult<T> {
  module: T | null;
  status: WasmStatus;
  error: Error | null;
}

/**
 * Load a WebAssembly module from a URL.
 * Returns the exports of the module once instantiated.
 */
export function useWasm<T = WebAssembly.Exports>(url: string): WasmResult<T> {
  const [module, setModule] = useState<T | null>(null);
  const [status, setStatus] = useState<WasmStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        if (typeof WebAssembly === "undefined") {
          throw new Error("WebAssembly is not supported in this environment.");
        }
        const result = await WebAssembly.instantiateStreaming(fetch(url));
        if (!cancelled) {
          setModule(result.instance.exports as T);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { module, status, error };
}
