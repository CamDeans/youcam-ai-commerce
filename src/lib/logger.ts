export type LogLevel = "info" | "warn" | "error";

export function createRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Structured console logs for Vercel — never log secrets or image payloads. */
export function log(
  level: LogLevel,
  message: string,
  fields?: Record<string, unknown>,
) {
  const payload = {
    level,
    msg: message,
    ts: new Date().toISOString(),
    ...fields,
  };
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}
