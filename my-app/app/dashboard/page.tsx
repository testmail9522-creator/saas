"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const shortsData = [
  { name: "Jan", shorts: 12 },
  { name: "Feb", shorts: 18 },
  { name: "Mar", shorts: 25 },
  { name: "Apr", shorts: 31 },
  { name: "May", shorts: 45 },
];

const viewsData = [
  { name: "Jan", views: 1200 },
  { name: "Feb", views: 3200 },
  { name: "Mar", views: 6100 },
  { name: "Apr", views: 9400 },
  { name: "May", views: 15800 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) router.push("/login");
      else setUser(data.user);
    });
  }, [router]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-black text-white px-10 py-10 relative">
      {/* ✅ RIGHT SIDE BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-10 bg-gray-800 px-5 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-gray-400 mb-10">Account: {user.email}</p>

      {/* ✅ STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card title="Total Shorts" value="132" sub="+18% this month" />
        <Card title="Total Views" value="36,400" sub="+42% growth" />
        <Card title="Avg Views / Short" value="276" sub="Improving" />
        <Card title="Active Plan" value="Free" sub="Upgrade for more tools" />
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <ChartBlock title="Shorts Generated (Monthly)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shortsData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="shorts" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBlock>

        <ChartBlock title="Views Growth (Monthly)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={viewsData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="views" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBlock>
      </div>
    </main>
  );
}

function Card({ title, value, sub }: any) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 text-center">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-green-500 text-xs mt-1">{sub}</p>
    </div>
  );
}

function ChartBlock({ title, children }: any) {
  return (
    <div className="border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
