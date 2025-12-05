"use client";

import React, { useEffect, useRef, useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  /* --------------------------------------------
      THE REAL PROFESSIONAL YOUTUBE VALIDATOR
  ---------------------------------------------*/
  const validateYouTubeURL = (inputURL: string): boolean => {
    try {
      const url = new URL(inputURL.trim());
      const host = url.hostname.replace("www.", "");

      if (!["youtube.com", "youtu.be"].includes(host)) return false;

      // Shortened URLs → https://youtu.be/VIDEOID
      if (host === "youtu.be") return url.pathname.length > 1;

      // Full YouTube URLs
      if (host === "youtube.com") {
        const path = url.pathname;

        // watch?v=xxxx
        if (path === "/watch") return url.searchParams.has("v");

        // shorts/xxxx
        if (path.startsWith("/shorts/")) {
          return path.split("/").filter(Boolean).length === 2;
        }

          // embed/xxxx
        if (path.startsWith("/embed/")) {
          return path.split("/").filter(Boolean).length === 2;
        }

        return false;
      }

      return false;
    } catch {
      return false;
    }
  };

  /* --------------------------------------------
            HANDLE GENERATE BUTTON
  ---------------------------------------------*/
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please paste a YouTube link.");
      return;
    }

    if (!validateYouTubeURL(url)) {
      setError("Invalid link — only YouTube URLs are supported.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => router.push("/generate"), 1200);
  };

  /* --------------------------------------------
                 PARALLAX EFFECT
  ---------------------------------------------*/
  useEffect(() => {
    const onScroll = () => {
      const layers = parallaxRef.current?.querySelectorAll<HTMLElement>(
        "[data-depth]"
      );
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

  /* --------------------------------------------
               MAGNETIC CARD EFFECT
  ---------------------------------------------*/
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const cards = el.querySelectorAll<HTMLElement>(".mag-card");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        card.style.transform = `rotateX(${-y / 30}deg) rotateY(${x / 30}deg)`;
      });
    };

    const onLeave = () => {
      const cards = el.querySelectorAll<HTMLElement>(".mag-card");
      cards.forEach(
        (card) => (card.style.transform = "rotateX(0deg) rotateY(0deg)")
      );
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* ------------------- AI LOADING UI ------------------- */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex flex-col items-center justify-center animate-fadeIn">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-purple-400/30 border-t-purple-500 animate-spin-slow"></div>
            <div className="absolute inset-3 rounded-full border-4 border-pink-300/20 border-b-pink-500 animate-spin-slower"></div>
          </div>
          <p className="text-xl text-neutral-300 animate-pulse">
            AI is generating your viral clips…
          </p>
        </div>
      )}

      {/* ------------------- HERO SECTION ------------------- */}
      <div ref={parallaxRef} className="relative overflow-hidden">
        <div
          data-depth="0.03"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#140012] via-[#050505] to-[#001028]"
        />

        <div
          data-depth="0.06"
          className="absolute -left-40 top-10 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]"
        />

        <div
          data-depth="0.04"
          className="absolute right-[-120px] top-20 w-[450px] h-[450px] rounded-full bg-blue-400/20 blur-[120px]"
        />

        <div className="max-w-5xl mx-auto text-center py-20 px-6">
          <h1 className="text-[56px] md:text-[72px] font-extrabold leading-tight">
            Paste a YouTube Link.
          </h1>

          <h2 className="text-4xl md:text-[44px] font-extrabold mt-2">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent animate-gradientFade">
              Get Viral Shorts Automatically
            </span>
          </h2>

          <p className="text-neutral-300 text-lg max-w-3xl mx-auto mt-6">
            Paste your YouTube video or livestream link and let our AI detect the
            most shareable moments and deliver polished, viral-ready Shorts —
            automatically.
          </p>

          {/* INPUT */}
          <form
            onSubmit={handleGenerate}
            className="flex flex-col justify-center items-center gap-3 mt-8"
          >
            <div
              className={`px-5 py-3 rounded-full w-[520px] flex items-center bg-neutral-900/40 border shadow-lg transition
              ${
                error
                  ? "border-red-500 shadow-red-500/20"
                  : "border-neutral-700/60 hover:border-neutral-500"
              }`}
            >
              <LinkIcon className="w-5 h-5 text-neutral-400 mr-3" />
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder="Drop a video link"
                className="bg-transparent w-full outline-none text-white placeholder:text-neutral-500"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm animate-fadeIn">{error}</p>
            )}

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-white text-black font-semibold shadow-xl hover:scale-[1.03] transition"
            >
              Get Clips
            </button>
          </form>
        </div>
      </div>

      {/* ------------------- SHOWCASE ------------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-12 pb-20">
        <p className="text-center text-neutral-400 mb-6">
          Preview — Real results generated by ShortsAI
        </p>

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

      {/* ------------------- FEATURES ------------------- */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <h3 className="font-semibold text-lg mb-2">AI-first</h3>
            <p className="text-neutral-400">
              Smart scene detection finds viral moments automatically — no manual
              work.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Platform Ready</h3>
            <p className="text-neutral-400">
              Outputs vertical clips for Shorts, Reels, and TikTok.
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

      {/* ------------------- ANIMATIONS ------------------- */}
      <style jsx>{`
        .animate-gradientFade {
          background-size: 200% 200%;
          animation: gradientFade 6s ease infinite;
        }
        @keyframes gradientFade {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-scrollSmoother {
          animation: scrollSmoother 26s linear infinite;
        }
        @keyframes scrollSmoother {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        .animate-spin-slower {
          animation: spin 3.5s linear infinite reverse;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
