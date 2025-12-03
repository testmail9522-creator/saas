'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ClientHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-800 bg-black text-white">

      <Link href="/" className="text-xl font-bold">
        ShortsAI
      </Link>

      <div className="flex items-center gap-6 text-sm">

        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>       {/* ✅ NEW */}
        <Link href="/contact">Contact</Link>   {/* ✅ NEW */}

        {user ? (
          <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full">
            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            {user.email}
          </div>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Login
          </button>
        )}

      </div>
    </nav>
  );
}
