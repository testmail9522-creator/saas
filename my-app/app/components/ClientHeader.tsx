"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ClientHeader() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (user?.email) {
        setUsername(user.email.split("@")[0]);
      } else {
        setUsername(null);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUsername(null);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="text-xl font-bold">
          Shorts<span className="text-red-500">AI</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-neutral-300">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {username ? (
          <div className="flex items-center gap-3">
            {/* ✅ USER ICON */}
            <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full font-bold">
              {username[0].toUpperCase()}
            </div>

            <span className="text-sm text-white font-medium">
              {username}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-white text-black px-4 py-1.5 rounded text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
