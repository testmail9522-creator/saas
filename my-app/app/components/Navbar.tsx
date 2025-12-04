"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Shorts<span className="text-red-500">AI</span>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6 text-zinc-400">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-zinc-200 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
