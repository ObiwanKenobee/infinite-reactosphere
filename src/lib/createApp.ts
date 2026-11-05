export type Renderer = "dom" | "webgpu";
export type Execution = "js" | "wasm";
export type OptimizationStrategy = "adaptive" | "aggressive" | "conservative";
export type BackendRuntime = "edge" | "node" | "cloudflare";

export interface AppConfig {
  name: string;
  renderer?: Renderer;
  execution?: Execution;
  optimization?: {
    enabled: boolean;
    strategy?: OptimizationStrategy;
  };
  backend?: {
    runtime?: BackendRuntime;
  };
}

export interface InfiniteApp {
  config: AppConfig;
  optimize: () => InfiniteApp;
  deploy: () => Promise<{ success: boolean; message: string }>;
  getCapabilities: () => {
    webgpu: boolean;
    wasm: boolean;
    sharedArrayBuffer: boolean;
  };
}

export function createApp(config: AppConfig): InfiniteApp {
  const app: InfiniteApp = {
    config,

    optimize() {
      if (config.optimization?.enabled) {
        console.info(
          `[React Infinite] Optimization strategy: ${config.optimization.strategy ?? "adaptive"}`
        );
      }
      return app;
    },

    async deploy() {
      console.info(`[React Infinite] Deploying "${config.name}" to ${config.backend?.runtime ?? "edge"}`);
      return {
        success: true,
        message: `${config.name} deployed successfully.`,
      };
    },

    getCapabilities() {
      return {
        webgpu: "gpu" in navigator,
        wasm: typeof WebAssembly !== "undefined",
        sharedArrayBuffer: typeof SharedArrayBuffer !== "undefined",
      };
    },
  };

  return app;
}
