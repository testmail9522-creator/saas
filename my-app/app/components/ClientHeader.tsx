"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ClientHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
  }, []);

  return (
    <header className="w-full border-b border-gray-800 px-10 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        ShortsAI
      </Link>

      <nav className="flex items-center gap-8 text-sm text-gray-300">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        {!user ? (
          <Link
            href="/login"
            className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        ) : (
          <>
            <span className="bg-purple-600 px-4 py-2 rounded-full text-sm">
              {user.email}
            </span>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
              className="bg-red-600 px-5 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
