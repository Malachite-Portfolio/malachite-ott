"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { storageKeys } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function requestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSent(true);
  }

  function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp !== "123456") {
      setError("Use demo OTP 123456.");
      return;
    }

    window.localStorage.setItem(storageKeys.login, "true");
    window.localStorage.setItem("malachite:email", email);
    router.push("/profiles");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#020403] px-4 py-10 text-emerald-50 malachite-grid">
      <section className="glass-panel w-full max-w-md rounded-2xl p-6 sm:p-8">
        <Link href="/" className="text-sm font-black uppercase tracking-[0.28em] text-emerald-300">
          Malachite Play
        </Link>
        <h1 className="mt-8 text-3xl font-black text-emerald-50">Email OTP login</h1>
        <p className="mt-3 text-sm leading-6 text-emerald-100/70">
          Demo only. Enter any email, then verify with OTP 123456.
        </p>
        {!sent ? (
          <form onSubmit={requestOtp} className="mt-8 space-y-4">
            <label className="block text-sm font-semibold text-emerald-100">
              Email address
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-emerald-300/15 bg-black/45 px-4 py-3 text-emerald-50 outline-none transition placeholder:text-emerald-100/35 focus:border-emerald-300/55"
              />
            </label>
            <button className="w-full rounded-lg bg-emerald-400 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-emerald-300">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-8 space-y-4">
            <label className="block text-sm font-semibold text-emerald-100">
              Enter OTP
              <input
                inputMode="numeric"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="123456"
                className="mt-2 w-full rounded-lg border border-emerald-300/15 bg-black/45 px-4 py-3 text-emerald-50 outline-none transition placeholder:text-emerald-100/35 focus:border-emerald-300/55"
              />
            </label>
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            <button className="w-full rounded-lg bg-emerald-400 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-emerald-300">
              Verify and Continue
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
