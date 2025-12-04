"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please paste a YouTube link");
      return;
    }

    setLoading(true);

    // ✅ Fake AI processing delay like ChatGPT
    setTimeout(() => {
      router.push("/generate");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-40 px-6">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-5xl font-bold mb-4">
          Paste a YouTube Link.
        </h1>

        <h2 className="text-red-500 text-4xl font-bold mb-3">
          Get Viral Shorts Automatically
        </h2>

        {/* ✅ SINGLE LINE DESCRIPTION */}
        <p className="text-neutral-400 mb-10 text-sm">
          Just paste your YouTube video or livestream link. Our AI will convert it into viral-ready Shorts.
        </p>

        {/* ✅ INPUT + BUTTON */}
        <form onSubmit={handleGenerate} className="flex justify-center gap-4">
          <input
            type="text"
            placeholder="Paste YouTube video link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-[420px] px-4 py-3 rounded bg-neutral-800 text-white outline-none"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded font-semibold"
          >
            Generate Shorts
          </button>
        </form>

        {/* ✅ CHATGPT STYLE LOADER */}
        {loading && (
          <div className="mt-10 flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-red-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-neutral-400 text-sm">
              Analyzing video… Creating viral clips…
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
