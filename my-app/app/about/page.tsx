"use client";

import React from "react";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white px-6 pt-24">

      {/* Background Fade */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#140012] via-[#050505] to-[#001028] opacity-80" />

      {/* Light Glow Accents */}
      <div className="absolute top-28 left-10 w-[480px] h-[480px] bg-purple-600/20 blur-[140px] rounded-full -z-10" />
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-blue-500/20 blur-[140px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto text-center">

        {/* HEADER */}
        <h1 className="text-5xl font-extrabold mb-6 animate-fadeUp">
          About <span className="text-red-500">ShortsAI</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-neutral-300 text-lg leading-relaxed animate-fadeUp delay-100">
          ShortsAI is a next-generation AI platform built to help creators grow
          faster by instantly converting long-form YouTube videos into
          high-impact, viral-ready Shorts. We remove the complexity of editing,
          letting you focus only on creating — while our AI does the heavy lifting.
        </p>

        {/* DIVIDER */}
        <div className="w-full flex justify-center mt-12 mb-16">
          <div className="h-[2px] w-1/3 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-40" />
        </div>

        {/* MISSION / VISION SECTION */}
        <section className="text-left space-y-10 animate-fadeUp delay-200">

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Our Mission
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              To empower every creator — beginners and professionals — to grow using
              the power of AI. We believe anyone should be able to produce viral-ready
              content without expensive tools, advanced editing skills, or countless
              hours of manual work.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Our Vision
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              A content world where creativity is effortless. ShortsAI aims to become
              the fastest and smartest AI clipping engine for every platform —
              enabling creators to reach more audiences and grow their influence
              across YouTube, TikTok, and Instagram.
            </p>
          </div>

          {/* Why ShortsAI */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Why ShortsAI?
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              Traditional editing tools are slow, complicated, and time-consuming.
              ShortsAI eliminates that friction. With intelligent scene detection,
              clean vertical formatting, and instant export, you can turn any long
              video into multiple viral-ready Shorts — in seconds.
            </p>
          </div>
        </section>

        {/* VALUE ICON SECTION */}
        <section className="grid md:grid-cols-3 gap-6 mt-20 mb-20 animate-fadeUp delay-300">

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl text-left">
            <h3 className="text-xl font-semibold mb-2">AI-Driven</h3>
            <p className="text-neutral-400 text-sm">
              Smart algorithms detect high-value moments automatically — no manual trimming.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl text-left">
            <h3 className="text-xl font-semibold mb-2">Creator-Friendly</h3>
            <p className="text-neutral-400 text-sm">
              Designed for speed, simplicity, and clarity. Anyone can use it.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl text-left">
            <h3 className="text-xl font-semibold mb-2">Future-Focused</h3>
            <p className="text-neutral-400 text-sm">
              Built for the next generation of AI-powered content creation.
            </p>
          </div>

        </section>

      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeUp {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
