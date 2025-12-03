'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const shortsData = [
  { name: 'Jan', shorts: 12 },
  { name: 'Feb', shorts: 19 },
  { name: 'Mar', shorts: 25 },
  { name: 'Apr', shorts: 31 },
  { name: 'May', shorts: 45 },
];

const viewsData = [
  { name: 'Jan', views: 1200 },
  { name: 'Feb', views: 3200 },
  { name: 'Mar', views: 6100 },
  { name: 'Apr', views: 9400 },
  { name: 'May', views: 15800 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.push('/login');
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Account: {user.email}
          </p>
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
          }}
          className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* ================= KPI STATS ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-14">

        <div className="border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Shorts</p>
          <p className="text-3xl font-bold mt-2">132</p>
          <p className="text-green-400 text-xs mt-1">+18% this month</p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Views</p>
          <p className="text-3xl font-bold mt-2">36,400</p>
          <p className="text-green-400 text-xs mt-1">+42% growth</p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Avg Views / Short</p>
          <p className="text-3xl font-bold mt-2">276</p>
          <p className="text-green-400 text-xs mt-1">Improving</p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Active Plan</p>
          <p className="text-3xl font-bold mt-2 text-green-400">Free</p>
          <p className="text-yellow-400 text-xs mt-1">Upgrade for more tools</p>
        </div>

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-10 mb-14">

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">
            Shorts Generated (Monthly)
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={shortsData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="shorts" fill="#ffffff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">
            Views Growth (Monthly)
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={viewsData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => router.push('/upload')}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Upload New Video
          </button>

          <button
            onClick={() => router.push('/pricing')}
            className="border border-gray-700 px-6 py-3 rounded-lg hover:border-white transition"
          >
            Upgrade Plan
          </button>

          {/* ✅ ✅ ✅ NOW WORKS */}
          <button
            onClick={() => router.push('/reports')}
            className="border border-gray-700 px-6 py-3 rounded-lg hover:border-white transition"
          >
            View Reports
          </button>

        </div>
      </div>

    </main>
  );
}
