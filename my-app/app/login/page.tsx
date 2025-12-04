"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


type Mode = "login" | "signup" | "forgot";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ PASSWORD VALIDATION (8+)
  const validatePassword = () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  // ✅ LOGIN
  const handleLogin = async () => {
    if (!validatePassword()) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  // ✅ SIGNUP
  const handleSignup = async () => {
    if (!validatePassword()) return;

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully! Please login.");
    setMode("login");
  };

  // ✅ FORGOT PASSWORD (INSIDE SAME PAGE)
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password reset link sent to your email.");
    setMode("login");
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="border border-gray-800 rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          {mode === "login" && "Login to ShortsAI"}
          {mode === "signup" && "Create Your Account"}
          {mode === "forgot" && "Reset Your Password"}
        </h1>

        {/* ✅ EMAIL ALWAYS SHOWN */}
        <label className="block text-sm mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 outline-none"
        />

        {/* ✅ PASSWORD ONLY FOR LOGIN & SIGNUP */}
        {mode !== "forgot" && (
          <>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-1 p-3 rounded-lg bg-black border border-gray-700 outline-none"
            />
            <p className="text-xs text-gray-500 mb-4">
              Password must be at least 8 characters
            </p>
          </>
        )}

        {/* ✅ MAIN ACTION BUTTON */}
        {mode === "login" && (
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition mb-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        )}

        {mode === "signup" && (
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition mb-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        )}

        {mode === "forgot" && (
          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition mb-4"
          >
            {loading ? "Sending reset link..." : "Send Reset Link"}
          </button>
        )}

        {/* ✅ GOOGLE LOGIN ONLY IN LOGIN MODE */}
        {mode === "login" && (
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-700 py-3 rounded-lg hover:border-white transition mb-4"
          >
            <img src="/youtube.png" className="w-5 h-5" />
            Continue with Google (YouTube)
          </button>
        )}

        {/* ✅ MODE TOGGLES */}
        <div className="text-center text-sm space-y-2 text-gray-400">

          {mode === "login" && (
            <>
              <button
                onClick={() => setMode("forgot")}
                className="hover:text-white"
              >
                Forgot password?
              </button>

              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-white underline"
                >
                  Create Account
                </button>
              </p>
            </>
          )}

          {mode !== "login" && (
            <p>
              Back to{" "}
              <button
                onClick={() => setMode("login")}
                className="text-white underline"
              >
                Login
              </button>
            </p>
          )}

        </div>

      </div>

    </main>
  );
}
