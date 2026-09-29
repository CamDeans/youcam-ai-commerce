import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100svh] w-full max-w-lg flex-col justify-center px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sage)]">
        404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-[var(--deep)]">
        Page not found
      </h1>
      <p className="mt-3 text-[var(--ink-soft)]">
        That route isn’t part of SkinCast. Head back to cast your skin before
        you buy.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit bg-[var(--deep)] px-5 py-3 text-sm font-semibold text-[var(--foam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sage)]"
      >
        Back to SkinCast
      </Link>
    </main>
  );
}
