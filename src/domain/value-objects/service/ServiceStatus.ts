export const SERVICE_STATUS_VALUES = ["PENDING", "DONE"] as const;

export type ServiceStatus = typeof SERVICE_STATUS_VALUES[number];
