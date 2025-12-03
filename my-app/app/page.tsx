"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col items-center justify-center text-center mt-12 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Convert Long Videos into Viral Shorts
        </h1>

        <p className="text-gray-400 max-w-2xl mb-10">
          Upload your video or connect YouTube. Our AI finds the best moments and
          converts them into ready-made Shorts automatically.
        </p>

        {/* ===== BUTTONS ===== */}
        <div className="flex gap-4">

          {/* ✅ LOGIN-PROTECTED UPLOAD BUTTON */}
          <button
            onClick={async () => {
              const { data } = await supabase.auth.getUser();

              if (!data?.user) {
                router.push("/login");
              } else {
                router.push("/upload");
              }
            }}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Upload Video
          </button>

          {/* ✅ ✅ LOGIN-PROTECTED CONNECT YOUTUBE BUTTON */}
          <button
            onClick={async () => {
              const { data } = await supabase.auth.getUser();

              if (!data?.user) {
                router.push("/login");        // 🔒 Not logged in
              } else {
                router.push("/youtube");     // ✅ Logged in (future page)
              }
            }}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg border border-gray-700 hover:border-red-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="w-5 h-5 fill-red-600"
            >
              <path d="M549.655 124.083C534.73 80.597 502.4 69.646 454.4 64.845 393.6 58.612 288 58.612 288 58.612s-105.6 0-166.4 6.233C73.6 69.646 41.27 80.597 26.345 124.083 18.04 151.404 16 204.8 16 256s2.04 104.596 10.345 131.917c14.925 43.486 47.255 54.437 95.255 59.238C182.4 453.388 288 453.388 288 453.388s105.6 0 166.4-6.233c48-4.801 80.33-15.752 95.255-59.238C557.96 360.596 560 307.2 560 256s-2.04-104.596-10.345-131.917zM232 336V176l142 80-142 80z"/>
            </svg>
            Connect YouTube
          </button>

        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="mt-20 px-10 pb-40">

        <h2 className="text-4xl font-bold text-center mb-3">
          Simple, Transparent Pricing
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Start free. Upgrade only when you grow.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* ===== FREE PLAN ===== */}
          <div className="border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-400 mb-4">Try the product risk-free</p>

            <div className="text-4xl font-bold mb-6">₹0</div>

            <ul className="space-y-2 text-sm mb-6">
              <li>✅ 5 Shorts / Month</li>
              <li>✅ Basic Highlights</li>
              <li>✅ Watermark</li>
              <li>❌ No Auto Upload</li>
            </ul>

            <button className="border border-gray-700 px-6 py-2 rounded-lg hover:border-white">
              Start Free
            </button>
          </div>

          {/* ===== PRO PLAN ===== */}
          <div className="border-2 border-white rounded-xl p-10 text-center relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-4 py-1 rounded-full font-bold">
              MOST POPULAR
            </span>

            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-gray-400 mb-4">For daily creators</p>

            <div className="text-4xl font-bold mb-6">
              ₹499 <span className="text-sm text-gray-400">/ month</span>
            </div>

            <ul className="space-y-2 text-sm mb-6">
              <li>✅ Unlimited Shorts</li>
              <li>✅ Advanced AI Highlights</li>
              <li>✅ No Watermark</li>
              <li>✅ YouTube Auto Upload</li>
            </ul>

            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200">
              Upgrade to Pro
            </button>
          </div>

          {/* ===== AGENCY PLAN ===== */}
          <div className="border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Agency</h3>
            <p className="text-gray-400 mb-4">For teams</p>

            <div className="text-4xl font-bold mb-6">₹1999</div>

            <ul className="space-y-2 text-sm mb-6">
              <li>✅ Multiple Channels</li>
              <li>✅ Unlimited Uploads</li>
              <li>✅ Priority Support</li>
            </ul>

            <button className="border border-gray-700 px-6 py-2 rounded-lg hover:border-white">
              Contact Sales
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}
