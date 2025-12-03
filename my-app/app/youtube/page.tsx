"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function YouTubeConnectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      // ✅ Block access if not logged in
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) {
        router.replace("/login");
        return;
      }

      // ✅ Get OAuth session
      const { data: session } = await supabase.auth.getSession();
      const providerToken = session?.session?.provider_token;

      if (!providerToken) {
        setLoading(false);
        return;
      }

      // ✅ Fetch YouTube Channel Info using Google Token
      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
        {
          headers: {
            Authorization: `Bearer ${providerToken}`,
          },
        }
      );

      const data = await res.json();
      if (data?.items?.length > 0) {
        setChannel(data.items[0]);
      }

      setLoading(false);
    };

    checkAuthAndFetch();
  }, [router]);

  const connectYouTube = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/youtube.readonly",
        redirectTo: "http://localhost:3000/youtube",
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading YouTube Connection...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-4">Connect Your YouTube Channel</h1>
      <p className="text-gray-400 mb-10">Login with YouTube to analyze your Shorts</p>

      {!channel ? (
        <button
          onClick={connectYouTube}
          className="bg-red-600 px-8 py-3 rounded-lg text-white font-semibold hover:bg-red-700 transition"
        >
          Login with YouTube
        </button>
      ) : (
        <div className="border border-gray-800 rounded-xl p-8 text-center max-w-md w-full mt-10">

          <img
            src={channel.snippet.thumbnails.default.url}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />

          <h2 className="text-2xl font-bold">{channel.snippet.title}</h2>
          <p className="text-gray-400 mt-1">
            Subscribers: {Number(channel.statistics.subscriberCount).toLocaleString()}
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 bg-white text-black px-6 py-2 rounded-lg font-semibold"
          >
            Go to Dashboard
          </button>

        </div>
      )}
    </main>
  );
}
