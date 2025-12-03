'use client';

import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold">About ShortsAI</h1>
          <p className="text-gray-400 mt-1">
            Smart AI-powered Shorts creation platform
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="border border-gray-700 px-5 py-2 rounded-lg hover:border-white"
        >
          ← Back
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl space-y-8 text-gray-300">

        <p>
          <span className="text-white font-semibold">ShortsAI</span> is an
          AI-powered platform designed to help creators convert long-form
          content into high-performing viral Shorts automatically.
        </p>

        <p>
          Our mission is simple:
          <span className="text-white font-semibold">
            {" "}Save creators time, boost reach, and grow faster.
          </span>
        </p>

        <p>
          Using advanced AI moment-detection algorithms, ShortsAI finds the best,
          most engaging parts of your videos and converts them into ready-to-post
          vertical Shorts for YouTube, Instagram, and TikTok.
        </p>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="border border-gray-800 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold">10K+</p>
            <p className="text-gray-400 mt-1">Creators</p>
          </div>

          <div className="border border-gray-800 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold">2M+</p>
            <p className="text-gray-400 mt-1">Shorts Generated</p>
          </div>

          <div className="border border-gray-800 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold">98%</p>
            <p className="text-gray-400 mt-1">Client Satisfaction</p>
          </div>

        </div>

      </div>

    </main>
  );
}
