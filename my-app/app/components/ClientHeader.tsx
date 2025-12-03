"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ClientHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
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
    <header className="border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-6">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          ShortsAI
        </div>

        <nav className="flex gap-6 text-sm items-center">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/pricing">Pricing</a>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"
              >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold uppercase">
                  {user.email?.charAt(0)}
                </div>

                <span className="text-sm">{user.email}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-neutral-900 border border-white/20 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/20 text-sm">
                    <p className="font-medium">User</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>

                  <button
                    className="w-full text-left px-4 py-3 hover:bg-white/10 text-sm"
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </button>

                  <button
                    className="w-full text-left px-4 py-3 hover:bg-white/10 text-sm"
                    onClick={() => router.push("/pricing")}
                  >
                    Upgrade Plan
                  </button>

                  <button
                    className="w-full text-left px-4 py-3 hover:bg-red-500 text-sm text-red-400"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push("/login");
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login">Login</a>
          )}
        </nav>
      </div>
    </header>
  );
}
