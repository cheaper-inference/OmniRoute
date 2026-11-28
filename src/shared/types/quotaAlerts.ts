/**
 * Latch map for the dashboard quota alerts: alert key -> the value that produced the alert
 * (remaining percentage for a window, expiry timestamp for a reset credit).
 * Serialisable on purpose (persisted straight into `key_value`).
 */
export type QuotaAlertLatch = Record<string, number>;
