"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(
    JSON.stringify({
      level: "error",
      msg: "global_error_boundary",
      digest: error.digest,
      name: error.name,
    }),
  );

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "Georgia, serif",
          background: "linear-gradient(160deg, #e8f0ec, #f7f3ee)",
          color: "#1c2b26",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>SkinCast</h1>
          <p style={{ opacity: 0.75, marginBottom: 20 }}>
            A critical error interrupted the page. You can retry.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: "none",
              background: "#2a3a34",
              color: "#f7f3ee",
              padding: "0.75rem 1.25rem",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
