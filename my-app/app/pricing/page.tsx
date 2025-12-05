"use client";

import { useState } from "react";

export default function PricingPage() {
  const [selected, setSelected] = useState("pro");

  return (
    <main className="min-h-screen bg-black text-white pt-20 px-6">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#140012] via-[#050505] to-[#001028] opacity-90" />

      {/* Glow Effects */}
      <div className="absolute top-40 left-10 w-[480px] h-[480px] bg-purple-600/20 blur-[140px] rounded-full -z-10" />
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-blue-500/20 blur-[140px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-5xl font-extrabold">
          Simple <span className="text-red-500">Pricing</span>
        </h1>
        <p className="text-neutral-300 mt-4 mb-12 text-lg">
          Start free. Upgrade only when you grow.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-6">

          {/* FREE PLAN */}
          <div
            onClick={() => setSelected("free")}
            className={`
              cursor-pointer rounded-2xl p-8 bg-neutral-900/60 backdrop-blur-md border transition-all duration-500 ease-out 
              relative overflow-hidden group
              ${
                selected === "free"
                  ? "border-red-500 shadow-red-500/40 shadow-2xl scale-[1.06]"
                  : "border-neutral-700 hover:border-neutral-500 hover:scale-[1.03]"
              }
            `}
          >
            {/* Floating glow */}
            {selected === "free" && (
              <div className="absolute inset-0 bg-red-500/10 blur-2xl opacity-40 animate-pulse"></div>
            )}

            <h2 className="text-xl font-bold mb-2">Free</h2>
            <p className="text-4xl font-extrabold mb-6">₹0</p>

            <ul className="text-left space-y-3 text-neutral-300 text-sm">
              <li>✔ 3 Shorts per video</li>
              <li>✔ 720p Export</li>
              <li>✔ Watermark</li>
            </ul>

            <button className="mt-8 w-full bg-neutral-800 hover:bg-neutral-700 py-3 rounded-lg transition font-medium">
              Get Started
            </button>
          </div>

          {/* PRO PLAN */}
          <div
            onClick={() => setSelected("pro")}
            className={`
              cursor-pointer rounded-2xl p-8 bg-neutral-900/60 backdrop-blur-md border transition-all duration-500 ease-out 
              relative overflow-hidden group
              ${
                selected === "pro"
                  ? "border-red-500 shadow-red-500/40 shadow-2xl scale-[1.06]"
                  : "border-neutral-700 hover:border-neutral-500 hover:scale-[1.03]"
              }
            `}
          >
            {/* Floating glow */}
            {selected === "pro" && (
              <div className="absolute inset-0 bg-red-500/10 blur-2xl opacity-40 animate-pulse"></div>
            )}

            <h2 className="text-xl font-bold mb-2">Pro</h2>
            <p className="text-4xl font-extrabold mb-6">₹799/mo</p>

            <ul className="text-left space-y-3 text-neutral-300 text-sm">
              <li>✔ Unlimited Shorts</li>
              <li>✔ 4K Export</li>
              <li>✔ No Watermark</li>
              <li>✔ Priority Processing</li>
            </ul>

            <button className="mt-8 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg transition font-semibold">
              Go Pro
            </button>
          </div>

          {/* STUDIO PLAN */}
          <div
            onClick={() => setSelected("studio")}
            className={`
              cursor-pointer rounded-2xl p-8 bg-neutral-900/60 backdrop-blur-md border transition-all duration-500 ease-out 
              relative overflow-hidden group
              ${
                selected === "studio"
                  ? "border-red-500 shadow-red-500/40 shadow-2xl scale-[1.06]"
                  : "border-neutral-700 hover:border-neutral-500 hover:scale-[1.03]"
              }
            `}
          >
            {/* Floating glow */}
            {selected === "studio" && (
              <div className="absolute inset-0 bg-red-500/10 blur-2xl opacity-40 animate-pulse"></div>
            )}

            <h2 className="text-xl font-bold mb-2">Studio</h2>
            <p className="text-4xl font-extrabold mb-6">₹2499/mo</p>

            <ul className="text-left space-y-3 text-neutral-300 text-sm">
              <li>✔ Team Access</li>
              <li>✔ Bulk Uploads</li>
              <li>✔ API Access</li>
            </ul>

            <button className="mt-8 w-full bg-neutral-800 hover:bg-neutral-700 py-3 rounded-lg transition font-medium">
              Contact Sales
            </button>
          </div>

        </div>
      </div>

      {/* Subtle floating animation */}
      <style jsx>{`
        .group:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </main>
  );
}
