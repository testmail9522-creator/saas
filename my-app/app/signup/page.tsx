"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import SampleShowcase from "@/app/components/SampleShowcase";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please paste a YouTube link");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      window.location.href = "/generate";
    }, 1500);
  };

  return (
    <main className="bg-black min-h-screen text-white pb-24">

      {/* 🟦 EXACT SAME TOP SPACING AS PRICING PAGE */}
      <div className="max-w-5xl mx-auto text-center pt-24 px-6">

        <h1 className="text-6xl font-bold mb-4">
          Paste a YouTube Link.
        </h1>

        <h2 className="text-red-500 text-5xl font-bold mb-6">
          Get Viral Shorts Automatically
        </h2>

        <p className="text-neutral-400 mb-12 text-lg">
          Just paste your YouTube video or livestream link.  
          Our AI will convert it into viral-ready Shorts.
        </p>

        {/* Input + Button */}
        <form onSubmit={handleGenerate} className="flex justify-center gap-4">

          <div className="flex items-center gap-3 w-[480px] bg-neutral-900 px-4 py-3 rounded-full shadow-md shadow-black/40">
            <LinkIcon className="h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Drop a video link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-10 py-3 rounded-full font-semibold text-lg hover:bg-neutral-200 transition shadow-lg shadow-black/30"
          >
            Get Clips
          </button>
        </form>

        {/* Loading Animation */}
        {loading && (
          <div className="mt-8 text-neutral-300 text-sm animate-pulse">
            Processing video... Creating viral shorts...
          </div>
        )}
      </div>

      {/* Showcase Area */}
      <div className="mt-20 max-w-6xl mx-auto px-6">
        <SampleShowcase />
      </div>
    </main>
  );
}
