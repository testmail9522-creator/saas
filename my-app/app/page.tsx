"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
      alert("Please paste a valid YouTube video link");
      return;
    }

    setLoading(true);

    // ✅ Store link for next step (dashboard / processing page)
    localStorage.setItem("yt_video_url", videoUrl);

    // ✅ Redirect to dashboard (processing page)
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* ============ HERO TEXT ============ */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
        Paste a YouTube Link.<br />
        Get <span className="text-red-600">Viral Shorts Automatically</span>
      </h1>

      <p className="text-gray-400 text-center max-w-2xl mb-10">
        Just paste your YouTube video or livestream link.
        Our AI will find the best moments and convert them into
        high-retention vertical Shorts — ready to download.
      </p>

      {/* ============ INPUT BOX ============ */}
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Paste YouTube video link here..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="flex-1 px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-700 outline-none text-white"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Generate Shorts"}
        </button>

      </div>

      {/* ============ TRUST STRIP ============ */}
      <div className="mt-12 flex gap-8 text-gray-400 text-sm">
        <span>✅ No Login Required</span>
        <span>✅ No Channel Access</span>
        <span>✅ Download Instantly</span>
      </div>

    </main>
  );
}
