export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { getAppEnv, peekAppEnv } = await import("./lib/env");
    const mode = process.env.YOUCAM_MODE?.trim().toLowerCase();
    if (mode === "live") {
      // Fail hard only when live was explicitly requested without a key.
      const env = getAppEnv();
      console.info(
        `[skincast] env ok · mode=${env.mode} · youcamLive=${env.youcamEnabled}`,
      );
      return;
    }
    const { env, configError } = peekAppEnv();
    if (configError) {
      console.error(`[skincast] env misconfigured: ${configError}`);
      return;
    }
    console.info(
      `[skincast] env ok · mode=${env?.mode ?? "mock"} · youcamLive=${env?.youcamEnabled ?? false}`,
    );
  }
}
