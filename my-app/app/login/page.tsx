"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LIVE PASSWORD RULES
  const hasMinLength = password.length >= 8;
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasCapital && hasNumber;

  // ✅ VALID EMAIL FORMAT CHECK
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ ENTER KEY SUPPORT
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleSubmit = async () => {
    setError("");

    if (!isValidEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (isSignup && !isPasswordValid) {
      setError("Password does not meet all requirements");
      return;
    }

    try {
      setLoading(true);

      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        alert("Verification email sent! Please verify and login.");
        setIsSignup(false);
        setEmail("");
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#0f0f0f] w-full max-w-sm p-8 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account " : "Login to "}
          <span className="text-red-500">ShortsAI</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full mb-4 px-4 py-3 rounded bg-[#1b1b1b] outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full mb-3 px-4 py-3 rounded outline-none bg-[#1b1b1b] ${
            isSignup && !isPasswordValid ? "border border-red-500" : ""
          }`}
        />

        {/* ✅ ✅ ✅ LIVE PASSWORD VALIDATION UI */}
        {isSignup && (
          <div className="text-xs mb-3 space-y-1">
            <p className={hasMinLength ? "text-green-400" : "text-red-400"}>
              • Minimum 8 characters
            </p>
            <p className={hasCapital ? "text-green-400" : "text-red-400"}>
              • 1 Capital letter
            </p>
            <p className={hasNumber ? "text-green-400" : "text-red-400"}>
              • 1 Number
            </p>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : isSignup ? "Create Account" : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-red-500 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>

      </div>
    </div>
  );
}
