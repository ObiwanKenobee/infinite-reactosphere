import { useState, useEffect, useRef } from "react";
import {
  createRuntime,
  getRuntimeMetrics,
  type RuntimeContext,
  type RuntimeMetrics,
} from "@/lib/runtime";
import type { AppConfig } from "@/lib/createApp";

export interface UseRuntimeResult {
  ctx: RuntimeContext | null;
  metrics: RuntimeMetrics;
  loading: boolean;
  error: Error | null;
}

const DEFAULT_METRICS: RuntimeMetrics = {
  fps: 0,
  memoryMB: null,
  jsHeapMB: null,
  uptime: 0,
};

export function useRuntime(config: AppConfig): UseRuntimeResult {
  const [ctx, setCtx] = useState<RuntimeContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [metrics, setMetrics] = useState<RuntimeMetrics>(DEFAULT_METRICS);

  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;
    createRuntime(config)
      .then((runtime) => {
        if (!cancelled) {
          setCtx(runtime);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FPS + memory loop
  useEffect(() => {
    const tick = () => {
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastFrameRef.current;

      if (elapsed >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / elapsed);
        frameCountRef.current = 0;
        lastFrameRef.current = now;
        setMetrics({ ...getRuntimeMetrics(), fps });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { ctx, metrics, loading, error };
}
