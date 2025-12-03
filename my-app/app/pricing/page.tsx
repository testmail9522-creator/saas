'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function PricingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    };

    getUser();
  }, []);

  const handleAction = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-20">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">Simple, Transparent Pricing</h1>
      <p className="text-gray-400 mb-14">Start free. Upgrade only when you grow.</p>

      {/* PRICING GRID */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl w-full">

        {/* FREE */}
        <div className="border border-gray-800 rounded-2xl p-10 text-center hover:border-white transition">
          <h2 className="text-2xl font-bold mb-2">Free</h2>
          <p className="text-gray-400 mb-6">Try the product risk-free</p>

          <p className="text-4xl font-bold mb-8">₹0</p>

          <ul className="space-y-3 text-gray-300 mb-10 text-sm">
            <li>✅ 5 Shorts / Month</li>
            <li>✅ Basic Highlights</li>
            <li>✅ Watermark</li>
            <li className="text-red-500">❌ No Auto Upload</li>
          </ul>

          <button
            onClick={handleAction}
            className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Start Free
          </button>
        </div>

        {/* PRO (MOST POPULAR) */}
        <div className="border-2 border-white rounded-2xl p-10 text-center relative scale-105">

          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold">
            MOST POPULAR
          </div>

          <h2 className="text-2xl font-bold mb-2">Pro</h2>
          <p className="text-gray-400 mb-6">For daily creators</p>

          <p className="text-4xl font-bold mb-8">₹499 / month</p>

          <ul className="space-y-3 text-gray-300 mb-10 text-sm">
            <li>✅ Unlimited Shorts</li>
            <li>✅ Advanced AI Highlights</li>
            <li>✅ No Watermark</li>
            <li>✅ YouTube Auto Upload</li>
          </ul>

          <button
            onClick={handleAction}
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* AGENCY */}
        <div className="border border-gray-800 rounded-2xl p-10 text-center hover:border-white transition">
          <h2 className="text-2xl font-bold mb-2">Agency</h2>
          <p className="text-gray-400 mb-6">For teams</p>

          <p className="text-4xl font-bold mb-8">₹1999 / month</p>

          <ul className="space-y-3 text-gray-300 mb-10 text-sm">
            <li>✅ Multiple Channels</li>
            <li>✅ Unlimited Uploads</li>
            <li>✅ Priority Support</li>
          </ul>

          <button
            onClick={handleAction}
            className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Contact Sales
          </button>
        </div>

      </div>
    </main>
  );
}
