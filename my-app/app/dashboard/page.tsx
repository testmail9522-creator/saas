"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [originalURL, setOriginalURL] = useState<string | null>(null);

  const [shortURL, setShortURL] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Check login
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoadingUser(false);
    };
    init();
  }, [router]);

  const handleFileSelect = (f: File | null) => {
    setFile(f);
    setShortURL(null);
    setError(null);
    if (f) {
      const url = URL.createObjectURL(f);
      setOriginalURL(url);
    } else {
      setOriginalURL(null);
    }
  };

  // 🎬 Core: generate short from local file (no storage)
  const generateShort = async () => {
    if (!file) {
      setError("Please select a video first.");
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      // Write file into FFmpeg's virtual FS
      ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));

      // For now: fake "AI highlight" = first 20 seconds, 9:16 vertical
      // Later: this is where real AI highlight detection will plug in.
      await ffmpeg.run(
        "-i",
        "input.mp4",
        "-ss",
        "00:00:00", // start at 0 sec
        "-t",
        "20", // duration 20 seconds
        "-vf",
        "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2",
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "output.mp4"
      );

      const data = ffmpeg.FS("readFile", "output.mp4");
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      setShortURL(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate short.");
    } finally {
      setProcessing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loadingUser) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shorts Generator Dashboard</h1>
          {user && (
            <p className="text-sm text-gray-400 mt-1">
              Logged in as <span className="text-gray-200">{user.email}</span>
            </p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {/* LEFT: Upload + Controls */}
        <section className="border border-white/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            1. Select long video (YouTube recording, stream, etc.)
          </h2>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            className="mb-4 w-full"
          />

          <button
            onClick={generateShort}
            disabled={processing || !file}
            className="px-5 py-2 rounded bg-white text-black text-sm disabled:bg-white/40 disabled:text-black/60"
          >
            {processing ? "Generating short..." : "Generate 20s Short"}
          </button>

          <p className="mt-3 text-xs text-gray-400">
            For now, this takes the first 20 seconds and converts to vertical
            9:16. Later we’ll plug in real AI highlight detection from your
            YouTube lives/long videos.
          </p>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </section>

        {/* RIGHT: Preview */}
        <section className="border border-white/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            2. Preview & Download Short
          </h2>

          {!file && (
            <p className="text-sm text-gray-500">
              Select a video on the left to see preview and generate a short.
            </p>
          )}

          {originalURL && (
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1">Original video</p>
              <video
                src={originalURL}
                controls
                className="w-full rounded border border-white/10"
              />
            </div>
          )}

          {shortURL && (
            <div>
              <p className="text-xs text-gray-400 mb-1">Generated short (9:16)</p>
              <video
                src={shortURL}
                controls
                className="w-full rounded border border-white/10 mb-3"
              />

              <a
                href={shortURL}
                download="shorts-ai-output.mp4"
                className="inline-block px-4 py-2 bg-green-500 text-black text-sm rounded"
              >
                Download Short
              </a>

              <p className="mt-2 text-xs text-gray-400">
                After download, you can upload this to YouTube Shorts,
                Instagram Reels, or Facebook manually.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
