"use client";

import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-10 py-14 relative">
      {/* ✅ RIGHT SIDE BACK BUTTON (SAME SIZE) */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-10 bg-gray-800 px-5 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-10">Contact Us</h1>

      <div className="max-w-xl border border-gray-800 rounded-xl p-8">
        <form className="space-y-6">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-2"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-2"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Message</label>
            <textarea
              rows={4}
              className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-2"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded-lg font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
