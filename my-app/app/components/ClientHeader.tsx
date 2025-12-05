"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientHeader() {
  const pathname = usePathname();

  // Hide login button on /login and /signup
  const hideLogin = pathname === "/login" || pathname === "/signup";

  return (
    <header className="w-full border-b border-neutral-800 bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Shorts<span className="text-red-500">AI</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8 text-white text-sm font-medium">
          <Link href="/" className="hover:text-red-500 transition">Home</Link>
          <Link href="/pricing" className="hover:text-red-500 transition">Pricing</Link>
          <Link href="/about" className="hover:text-red-500 transition">About</Link>
          <Link href="/contact" className="hover:text-red-500 transition">Contact</Link>
        </nav>

        {/* Login Button — show only when not on /login or /signup */}
        {!hideLogin && (
          <Link
            href="/login"
            className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-neutral-200 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
