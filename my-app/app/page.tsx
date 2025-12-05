"use client";

import React, { useEffect, useRef, useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      alert("Please paste a YouTube link");
      return;
    }
    setLoading(true);
    setTimeout(() => router.push("/generate"), 1200);
  };

  /* ---------------- Parallax Background ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const layers = parallaxRef.current?.querySelectorAll<HTMLElement>("[data-depth]");
      if (!layers) return;
      const y = window.scrollY;
      layers.forEach((el) => {
        const depth = Number(el.dataset.depth);
        el.style.transform = `translateY(${y * depth}px)`;
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- Magnetic Hover Cards ---------------- */
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const cards = el.querySelectorAll<HTMLElement>(".mag-card");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        card.style.transform = `rotateX(${(-y / 30)}deg) rotateY(${x / 30}deg)`;
      });
    };

    const onLeave = () => {
      const cards = el.querySelectorAll<HTMLElement>(".mag-card");
      cards.forEach((card) => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ---------------- HERO BG + PARALLAX ---------------- */}
      <div ref={parallaxRef} className="relative overflow-hidden">

        {/* Smooth Fade Gradient Background */}
        <div
          data-depth="0.03"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#140012] via-[#050505] to-[#001028] opacity-90"
        />

        {/* Soft Glow Left */}
        <div
          data-depth="0.06"
          className="absolute -left-40 top-10 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]"
        />

        {/* Soft Glow Right */}
        <div
          data-depth="0.04"
          className="absolute right-[-120px] top-20 w-[450px] h-[450px] rounded-full bg-blue-400/20 blur-[120px]"
        />

        {/* --------------- HERO CONTENT ---------------- */}
        <div className="max-w-5xl mx-auto text-center mt-16 px-6 pb-8">

          <h1 className="text-[56px] md:text-[72px] font-extrabold leading-tight">
            Paste a YouTube Link.
          </h1>

          <h2 className="text-4xl md:text-[44px] font-extrabold mt-2">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent animate-gradientFade">
              Get Viral Shorts Automatically
            </span>
          </h2>

          <p className="text-neutral-300 text-lg max-w-3xl mx-auto mt-6">
            Paste your YouTube video or livestream link and let our AI detect the most shareable moments,
            format them for vertical platforms, and deliver polished, viral-ready Shorts — automatically.
          </p>

          {/* ---------- INPUT + BUTTON ---------- */}
          <form
            onSubmit={handleGenerate}
            className="flex justify-center items-center gap-4 mt-8"
          >
            <div className="px-4 py-3 rounded-full w-[520px] flex items-center bg-neutral-900/40 border border-neutral-700/60 backdrop-blur-md shadow-lg transition hover:border-neutral-500">
              <LinkIcon className="w-5 h-5 text-neutral-400 mr-3" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Drop a video link"
                className="bg-transparent w-full outline-none text-white placeholder:text-neutral-500"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-white text-black font-semibold shadow-xl hover:scale-[1.03] transition"
            >
              Get Clips
            </button>
          </form>

          {loading && (
            <div className="mt-6 animate-pulse text-neutral-400">
              Processing video… Creating viral clips…
            </div>
          )}
        </div>
      </div>

      {/* ---------------- SHOWCASE ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-12 pb-20">
        <div className="text-center text-neutral-400 mb-6">
          Preview — Real results generated by ShortsAI
        </div>

        <div ref={showcaseRef} className="overflow-hidden">
          <div className="flex gap-6 animate-scrollSmoother">

            {[
              "/sample1.webp",
              "/sample2.webp",
              "/sample3.png",
              "/sample1.webp",
              "/sample2.webp",
              "/sample3.png",
            ].map((src, idx) => (
              <div
                key={idx}
                className="mag-card w-[340px] min-w-[340px] bg-neutral-900 rounded-xl shadow-xl overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition"
              >
                <img src={src} className="w-full object-contain" />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ---------------- FEATURES (Original Text RESTORED) ---------------- */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <h3 className="font-semibold text-lg mb-2">AI-first</h3>
            <p className="text-neutral-400">
              Smart scene detection finds viral moments automatically — no manual work.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Platform Ready</h3>
            <p className="text-neutral-400">
              Outputs formatted vertical clips for YouTube Shorts, Instagram Reels, and TikTok.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Scale Faster</h3>
            <p className="text-neutral-400">
              Save hours of editing time and publish more content consistently.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------- CSS ANIMATIONS ---------------- */}
      <style jsx>{`
        .animate-gradientFade {
          background-size: 200% 200%;
          animation: gradientFade 6s ease infinite;
        }
        @keyframes gradientFade {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-scrollSmoother {
          animation: scrollSmoother 24s linear infinite;
        }
        @keyframes scrollSmoother {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
