"use client";

import { useState, useEffect } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
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

    setTimeout(() => {
      router.push("/generate");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-28">

      {/* HERO TEXT */}
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-5xl font-bold mb-2">
          Paste a YouTube Link.
        </h1>

        <h2 className="text-red-500 text-4xl font-bold mb-4">
          Get Viral Shorts Automatically
        </h2>

        <p className="text-neutral-400 text-lg mb-10">
          Just paste your YouTube video or livestream link. Our AI will convert it into viral-ready Shorts.
        </p>

        {/* Input Field */}
        <form
          onSubmit={handleGenerate}
          className="flex justify-center gap-4 items-center"
        >
          <div className="flex items-center bg-neutral-900 px-4 py-3 rounded-full w-[460px]">
            <LinkIcon className="w-5 h-5 text-neutral-400 mr-3" />
            <input
              type="text"
              placeholder="Drop a video link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-transparent w-full outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-neutral-200 transition"
          >
            Get Clips
          </button>
        </form>

        {/* Loader */}
        {loading && (
          <div className="mt-10 animate-pulse text-neutral-400">
            Processing video… Creating viral clips…
          </div>
        )}
      </div>

      {/* MOVING IMAGE CARDS SECTION */}
      <section className="mt-20 max-w-6xl mx-auto">
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scrollSlow">
            <img src="/sample1.webp" className="w-[320px] rounded-xl" />
            <img src="/sample2.webp" className="w-[320px] rounded-xl" />
            <img src="/sample1.webp" className="w-[320px] rounded-xl" />
          </div>
        </div>
      </section>

    </main>
  );
}
