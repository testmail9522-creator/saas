"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function YouTubeConnectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const loadYouTubeData = async () => {
      // ✅ Check App Login
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) {
        router.replace("/login");
        return;
      }

      // ✅ Get Google Access Token
      const { data: session } = await supabase.auth.getSession();
      const providerToken = session?.session?.provider_token;

      if (!providerToken) {
        setLoading(false);
        return;
      }

      // ✅ Fetch Channel Info
      const channelRes = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true",
        {
          headers: {
            Authorization: `Bearer ${providerToken}`,
          },
        }
      );

      const channelData = await channelRes.json();
      const myChannel = channelData.items[0];
      setChannel(myChannel);

      // ✅ Get Upload Playlist ID
      const uploadsPlaylistId =
        myChannel.contentDetails.relatedPlaylists.uploads;

      // ✅ Fetch Videos From Upload Playlist
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${uploadsPlaylistId}`,
        {
          headers: {
            Authorization: `Bearer ${providerToken}`,
          },
        }
      );

      const videosData = await videosRes.json();
      setVideos(videosData.items);

      setLoading(false);
    };

    loadYouTubeData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading YouTube Channel & Videos...
      </div>
    );
  }

  if (!channel) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Connect Your YouTube Channel</h1>

        <button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                scopes: "https://www.googleapis.com/auth/youtube.readonly",
                redirectTo: "http://localhost:3000/youtube",
              },
            });
          }}
          className="bg-red-600 px-8 py-3 rounded-lg text-white font-semibold"
        >
          Login With YouTube
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* ✅ CHANNEL INFO */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={channel.snippet.thumbnails.high.url}
          className="w-24 h-24 rounded-full"
        />

        <div>
          <h1 className="text-3xl font-bold">{channel.snippet.title}</h1>
          <p className="text-gray-400">
            Subscribers:{" "}
            {Number(channel.statistics.subscriberCount).toLocaleString()}
          </p>
          <p className="text-gray-400">
            Total Videos: {channel.statistics.videoCount}
          </p>
        </div>
      </div>

      {/* ✅ VIDEO GRID */}
      <h2 className="text-2xl font-bold mb-6">Your Uploaded Videos</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.snippet.resourceId.videoId}
            className="border border-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={video.snippet.thumbnails.high.url}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <p className="font-semibold text-sm line-clamp-2">
                {video.snippet.title}
              </p>

              <p className="text-gray-500 text-xs mt-1">
                {new Date(video.snippet.publishedAt).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
