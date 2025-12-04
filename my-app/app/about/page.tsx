"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-10 py-14 relative">
      {/* ✅ RIGHT SIDE BACK BUTTON (SAME AS DASHBOARD & PRICING) */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-10 bg-gray-800 px-5 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-2">About ShortsAI</h1>
      <p className="text-gray-400 mb-8">
        Smart AI-powered Shorts creation platform
      </p>

      <p className="mb-4 text-gray-300 max-w-3xl">
        <span className="font-semibold text-white">ShortsAI</span> is an AI-powered
        platform designed to help creators convert long-form content into
        high-performing viral Shorts automatically.
      </p>

      <p className="mb-4 text-gray-300 max-w-3xl">
        Our mission is simple:{" "}
        <span className="text-white font-semibold">
          Save creators time, boost reach, and grow faster.
        </span>
      </p>

      <p className="mb-12 text-gray-300 max-w-3xl">
        Using advanced AI moment-detection algorithms, ShortsAI finds the best,
        most engaging parts of your videos and converts them into ready-to-post
        vertical Shorts for YouTube, Instagram, and TikTok.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
        <StatCard value="10K+" label="Creators" />
        <StatCard value="2M+" label="Shorts Generated" />
        <StatCard value="98%" label="Client Satisfaction" />
      </div>
    </main>
  );
}

function StatCard({ value, label }: any) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 text-center">
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  );
}
