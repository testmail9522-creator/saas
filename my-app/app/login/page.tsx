"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [resetMode, setResetMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ STRONG PASSWORD CHECK
  const isStrongPassword = (password: string) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return strongRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // ✅ FORGOT PASSWORD MODE
    if (resetMode) {
      if (!email) {
        setError("Please enter your email");
        return;
      }

      setLoading(true);

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:3000/reset-password",
        });

        if (error) throw error;

        setMessage("Password reset link sent to your email.");
      } catch (err: any) {
        setError(err.message || "Failed to send reset email");
      } finally {
        setLoading(false);
      }

      return;
    }

    // ✅ SIGNUP VALIDATION
    if (!isLogin) {
      if (!isStrongPassword(password)) {
        setError(
          "Password must be at least 8 characters and include uppercase, lowercase, number & special character."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        // ✅ LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // ✅ SIGN UP
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // ✅ AUTO LOGIN AFTER SIGNUP
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="border border-white/20 rounded-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          {resetMode
            ? "Reset your password"
            : isLogin
            ? "Log in to ShortsAI"
            : "Create your ShortsAI account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ✅ EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-black border border-white/30 rounded text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* ✅ PASSWORD FIELDS */}
          {!resetMode && (
            <>
              <input
                type="password"
                placeholder={isLogin ? "Password" : "New Password"}
                className="w-full px-4 py-2 bg-black border border-white/30 rounded text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {!isLogin && (
                <>
                  <p className="text-xs text-gray-400">
                    Password must be 8+ characters with uppercase, lowercase, number & special character.
                  </p>

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 bg-black border border-white/30 rounded text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </>
              )}
            </>
          )}

          {/* ✅ MESSAGES */}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {message && <p className="text-green-400 text-sm">{message}</p>}

          {/* ✅ FORGOT PASSWORD LINK */}
          {isLogin && !resetMode && (
            <button
              type="button"
              onClick={() => {
                setResetMode(true);
                setError(null);
                setMessage(null);
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-sm text-gray-300 underline"
            >
              Forgot password?
            </button>
          )}

          {/* ✅ SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-white text-black rounded font-medium"
          >
            {loading
              ? "Please wait..."
              : resetMode
              ? "Send reset link"
              : isLogin
              ? "Log In"
              : "Sign Up"}
          </button>
        </form>

        {/* ✅ TOGGLE */}
        <button
          onClick={() => {
            if (resetMode) {
              setResetMode(false);
              setError(null);
              setMessage(null);
              return;
            }

            setIsLogin(!isLogin);
            setError(null);
            setMessage(null);
            setPassword("");
            setConfirmPassword("");
          }}
          className="mt-4 w-full text-sm text-gray-300 underline"
        >
          {resetMode
            ? "Back to login"
            : isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Log in"}
        </button>

      </div>
    </main>
  );
}
