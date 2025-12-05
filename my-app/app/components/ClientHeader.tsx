"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function ClientHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user?.email) {
        const clean = user.email.split("@")[0];
        setUsername(clean);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Shorts<span className="text-red-500">AI</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right Side - Login/User */}
        {username ? (
          <div className="flex items-center gap-3">
            <UserCircleIcon className="w-8 h-8 text-white" />
            <span className="text-white font-medium">{username}</span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-white text-black px-4 py-2 rounded text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
