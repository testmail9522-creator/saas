'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-gray-400 mt-1">
            We usually reply within 24 hours
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="border border-gray-700 px-5 py-2 rounded-lg hover:border-white"
        >
          ← Back
        </button>
      </div>

      {/* CONTACT FORM */}
      <div className="max-w-md border border-gray-800 rounded-xl p-8">

        <label className="block text-sm mb-2">Full Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 outline-none"
        />

        <label className="block text-sm mb-2">Email Address</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 outline-none"
        />

        <label className="block text-sm mb-2">Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full mb-6 p-3 rounded-lg bg-black border border-gray-700 outline-none resize-none"
        />

        <button
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Send Message
        </button>

      </div>

    </main>
  );
}
