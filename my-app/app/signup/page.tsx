"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const isValid = hasMinLength && hasCapital && hasNumber;

  // ✅ ENTER + BUTTON SUBMIT
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ PREVENT PAGE RELOAD
    setError("");

    if (!isValid) {
      setError("Please follow all password rules.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert("Signup successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white pt-24">
      <form
        onSubmit={handleSignup} // ✅ ENTER WORKS
        className="bg-[#111] p-8 rounded-xl w-full max-w-sm shadow-xl border border-neutral-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account <span className="text-red-500">ShortsAI</span>
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 outline-none border border-neutral-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-3 rounded bg-gray-800 outline-none border border-neutral-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Password rules */}
        <div className="text-sm mb-4 space-y-1">
          <p className={hasMinLength ? "text-green-500" : "text-red-500"}>
            • Minimum 8 characters
          </p>
          <p className={hasCapital ? "text-green-500" : "text-red-500"}>
            • At least 1 Capital Letter
          </p>
          <p className={hasNumber ? "text-green-500" : "text-red-500"}>
            • At least 1 Number
          </p>
        </div>

        <button
          type="submit" // ✅ ENTER TRIGGERS THIS
          disabled={!isValid || loading}
          className={`w-full py-3 rounded font-semibold transition ${
            !isValid || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-sm text-neutral-400 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
