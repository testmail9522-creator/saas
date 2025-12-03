"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ClientHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-800 bg-black text-white">

      {/* LOGO */}
      <Link href="/" className="text-xl font-bold">
        ShortsAI
      </Link>

      {/* LINKS */}
      <div className="flex items-center gap-6 text-sm">

        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        {/* ✅ AUTH SECTION */}
        {!loading && (
          user ? (
            <>
              {/* USER BADGE */}
              <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full">
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">{user.email}</span>
              </div>

              {/* ✅ LOGOUT BUTTON */}
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/login");
                }}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Login
            </button>
          )
        )}

      </div>
    </nav>
  );
}
