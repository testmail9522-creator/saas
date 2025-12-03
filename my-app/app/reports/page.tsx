'use client';

import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Performance Reports</h1>
          <p className="text-gray-400 mt-1">
            Detailed insights into your Shorts performance
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="border border-gray-700 px-5 py-2 rounded-lg hover:border-white"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* ===== REPORTS GRID ===== */}
      <div className="grid md:grid-cols-3 gap-8">

        <div className="border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Top Performing Short</h3>
          <p className="text-3xl font-bold">18,420</p>
          <p className="text-gray-400 text-sm mt-1">Views on best video</p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
          <p className="text-3xl font-bold">6.8%</p>
          <p className="text-gray-400 text-sm mt-1">Likes + Shares</p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Avg Watch Time</h3>
          <p className="text-3xl font-bold">28s</p>
          <p className="text-gray-400 text-sm mt-1">Per short</p>
        </div>

      </div>

      {/* ===== DETAILED TABLE MOCK ===== */}
      <div className="border border-gray-800 rounded-xl p-6 mt-12 overflow-x-auto">

        <h2 className="text-xl font-semibold mb-4">Recent Shorts Performance</h2>

        <table className="w-full text-sm">
          <thead className="border-b border-gray-700">
            <tr className="text-gray-400 text-left">
              <th className="py-3">Title</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            <tr className="border-b border-gray-800">
              <td className="py-3">Viral Clip #1</td>
              <td>12,400</td>
              <td>1,230</td>
              <td className="text-green-400">Live</td>
            </tr>

            <tr className="border-b border-gray-800">
              <td className="py-3">Gaming Highlight</td>
              <td>8,900</td>
              <td>860</td>
              <td className="text-green-400">Live</td>
            </tr>

            <tr className="border-b border-gray-800">
              <td className="py-3">Podcast Moment</td>
              <td>3,450</td>
              <td>312</td>
              <td className="text-yellow-400">Processing</td>
            </tr>

          </tbody>
        </table>

      </div>

    </main>
  );
}
