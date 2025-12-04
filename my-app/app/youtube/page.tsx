"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function YouTubePage() {
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadYouTube();
  }, []);

  async function loadYouTube() {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.provider_token) {
      setLoading(false);
      return;
    }

    const token = session.provider_token;

    // ✅ FETCH ALL CHANNELS (PERSONAL + BRAND)
    const channelRes = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const channelData = await channelRes.json();

    if (!channelData.items?.length) {
      setLoading(false);
      return;
    }

    setChannels(channelData.items);
    setSelectedChannel(channelData.items[0]);

    loadVideos(channelData.items[0].id, token);
    setLoading(false);
  }

  async function loadVideos(channelId: string, token: string) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=12&order=date&type=video`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setVideos(data.items || []);
  }

  async function switchChannel(channel: any) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.provider_token) return;

    setSelectedChannel(channel);
    loadVideos(channel.id, session.provider_token);
  }

  if (loading) {
    return <div className="text-white p-10">Loading YouTube...</div>;
  }

  if (!channels.length) {
    return (
      <div className="text-red-500 text-center mt-20">
        YouTube not connected.
      </div>
    );
  }

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-2xl mb-6">YouTube Dashboard</h1>

      {/* ✅ CHANNEL SWITCH */}
      <div className="flex gap-4 mb-6">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => switchChannel(ch)}
            className={`px-4 py-2 rounded ${
              selectedChannel?.id === ch.id
                ? "bg-red-600"
                : "bg-gray-800"
            }`}
          >
            {ch.snippet.title}
          </button>
        ))}
      </div>

      {/* ✅ CHANNEL STATS */}
      <div className="bg-gray-900 p-4 rounded mb-8">
        <h2 className="text-xl font-bold">
          {selectedChannel.snippet.title}
        </h2>
        <p>Subscribers: {selectedChannel.statistics.subscriberCount}</p>
        <p>Total Views: {selectedChannel.statistics.viewCount}</p>
        <p>Videos: {selectedChannel.statistics.videoCount}</p>
      </div>

      {/* ✅ VIDEOS */}
      <h3 className="mb-3">Recent Uploads</h3>

      <div className="grid grid-cols-4 gap-4">
        {videos.map((v) => (
          <div key={v.id.videoId} className="bg-gray-800 p-2 rounded">
            <img
              src={v.snippet.thumbnails.high.url}
              className="rounded"
            />
            <p className="mt-2 text-sm">{v.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
