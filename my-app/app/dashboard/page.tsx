"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type VideoItem = {
  name: string;
  url: string;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔐 CHECK LOGIN + LOAD VIDEOS
  useEffect(() => {
    const init = async () => {
      setLoadingUser(true);
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
      setLoadingUser(false);
      await fetchVideos(data.user.id);
    };

    init();
  }, [router]);

  // 📂 FETCH USER VIDEOS FROM SUPABASE STORAGE
  const fetchVideos = async (userId: string) => {
    setLoadingVideos(true);
    setError(null);

    // list files in folder "userId/"
    const { data, error } = await supabase.storage
      .from("videos")
      .list(userId, {
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      setError(error.message);
      setLoadingVideos(false);
      return;
    }

    const items: VideoItem[] =
      data?.map((item) => {
        const { data: publicData } = supabase.storage
          .from("videos")
          .getPublicUrl(`${userId}/${item.name}`);

        return {
          name: item.name,
          url: publicData.publicUrl,
          created_at: item.created_at || "",
        };
      }) || [];

    setVideos(items);
    setLoadingVideos(false);
  };

  // ⬆️ UPLOAD HANDLER
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video file first.");
      return;
    }
    if (!user) {
      alert("You must be logged in to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const filePath = `${user.id}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // refresh list
      await fetchVideos(user.id);
      setFile(null);
      const inputEl = document.getElementById("video-input") as HTMLInputElement | null;
if (inputEl) inputEl.value = "";
    } catch (err: any) {
      setError(err.message || "Failed to upload video");
    } finally {
      setUploading(false);
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
      {/* TOP BAR */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
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

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[2fr,3fr]">
        {/* UPLOAD CARD */}
        <section className="border border-white/15 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Upload a long video (YouTube stream recording, etc.)
          </h2>

          <input
            id="video-input"
            type="file"
            accept="video/*"
            className="mb-4 w-full"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="px-5 py-2 rounded bg-white text-black text-sm disabled:bg-white/40 disabled:text-black/60"
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>

          <p className="mt-3 text-xs text-gray-400">
            Tip: Start with a 5–20 minute MP4 file while testing.
          </p>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </section>

        {/* VIDEO LIST / PREVIEW */}
        <section className="border border-white/15 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Your uploaded videos
          </h2>

          {loadingVideos ? (
            <p className="text-gray-400 text-sm">Loading videos...</p>
          ) : videos.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No videos yet. Upload your first long video to start generating
              highlights.
            </p>
          ) : (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {videos.map((video) => (
                <div
                  key={video.name}
                  className="border border-white/10 rounded-lg p-4"
                >
                  <p className="text-sm mb-2 break-all">
                    {video.name.replace(`${user.id}-`, "")}
                  </p>

                  <video
                    src={video.url}
                    controls
                    className="w-full rounded-md border border-white/10"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Stored in cloud. This will later be used to auto-detect
                    highlights & create shorts.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
