"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ClientHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ RESTORE SESSION ON REFRESH (THIS FIXES YOUR BUG)
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // ✅ LISTEN FOR LOGIN / LOGOUT CHANGES
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null; // ✅ prevents flicker

  return (
    <header className="w-full border-b border-gray-800 px-10 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        ShortsAI
      </Link>

      <nav className="flex items-center gap-8 text-sm text-gray-300">
        <Link href="/">Home</Link>
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
