/**
 * OmniRoute Electron Types
 *
 * TypeScript definitions for the Electron API exposed to the renderer process.
 *
 * Updated to reflect:
 * - Fix #6: onServerStatus/onPortChanged return disposer functions
 * - Removed removeServerStatusListener/removePortChangedListener (replaced by disposers)
 */

export interface AppInfo {
  name: string;
  version: string;
  platform: "win32" | "darwin" | "linux";
  isDev: boolean;
  port: number;
  /** Set when Remote Server Mode is active (tray → Remote Server → Connect…). */
  remoteServerUrl: string | null;
}

export interface ServerStatus {
  status: "starting" | "running" | "stopped" | "restarting" | "error";
  port: number;
  /** Present only while connected to a remote server instead of the embedded one. */
  remoteUrl?: string;
}

/** Payload of the `update-status` channel; electron/main.js emits these fields. */
export interface UpdateStatus {
  status: string;
  version?: string;
  percent?: number;
  [key: string]: unknown;
}

export interface ElectronAPI {
  // ── Invoke (async) ─────────────────────────────────────
  getAppInfo(): Promise<AppInfo>;
  openExternal(url: string): Promise<void>;
  getDataDir(): Promise<string>;
  restartServer(): Promise<{ success: boolean }>;
  getAppVersion(): Promise<string>;

  // ── Auto-update (preload.js: check-for-updates / download-update /
  //    install-update, plus the update-status receive channel) ────────────
  checkForUpdates(): Promise<void>;
  downloadUpdate(): Promise<void>;
  installUpdate(): Promise<void>;

  // ── Autostart ──────────────────────────────────────────────────────────
  // main.js returns a plain boolean on every platform branch (true on success,
  // false on a thrown error), and AppearanceTab branches on it.
  getAutostartStatus(): Promise<boolean>;
  enableAutostart(): Promise<boolean>;
  disableAutostart(): Promise<boolean>;

  // ── Send (fire-and-forget) ─────────────────────────────
  minimizeWindow(): void;
  maximizeWindow(): void;
  closeWindow(): void;

  // ── Receive (returns disposer for cleanup) ─────────────
  onServerStatus(callback: (data: ServerStatus) => void): () => void;
  onPortChanged(callback: (port: number) => void): () => void;
  onUpdateStatus(callback: (data: UpdateStatus) => void): () => void;

  // ── Static Properties ──────────────────────────────────
  isElectron: boolean;
  platform: "win32" | "darwin" | "linux";
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
