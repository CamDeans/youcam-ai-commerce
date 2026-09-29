"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "app_error_boundary",
        digest: error.digest,
        name: error.name,
      }),
    );
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center gap-4 px-6 py-16 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        Something went wrong
      </p>
      <h1 className="font-[family-name:var(--font-fraunces)] text-3xl text-[var(--deep)]">
        SkinCast hit a snag
      </h1>
      <p className="text-[var(--ink-soft)]">
        The demo recovered enough to keep going. Try again, or return home.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-[var(--deep)] px-5 py-3 text-sm font-semibold text-[var(--foam)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-3 text-sm font-medium text-[var(--deep)] underline-offset-4 hover:underline"
        >
          Back to SkinCast
        </Link>
      </div>
    </main>
  );
}
