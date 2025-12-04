"use client";

import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-10 py-14 relative">
      {/* ✅ RIGHT SIDE BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-10 bg-gray-800 px-5 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center mb-4">Simple Pricing</h1>
      <p className="text-center text-gray-400 mb-12">
        Upgrade only when you grow 🚀
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <PriceCard
          title="Free"
          price="₹0"
          features={["5 Shorts / Month", "Basic AI Highlights", "Watermarked"]}
        />

        <PriceCard
          title="Pro"
          price="₹499"
          highlight
          features={[
            "Unlimited Shorts",
            "Advanced AI",
            "No Watermark",
            "YouTube Auto Upload",
          ]}
        />

        <PriceCard
          title="Agency"
          price="₹1999"
          features={[
            "Multiple Channels",
            "Unlimited Uploads",
            "Priority Support",
          ]}
        />
      </div>
    </main>
  );
}

function PriceCard({ title, price, features, highlight }: any) {
  return (
    <div
      className={`border rounded-xl p-8 text-center ${
        highlight ? "border-white" : "border-gray-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-green-400 mb-6">{price}</p>

      <ul className="space-y-3 text-gray-300 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i}>✅ {f}</li>
        ))}
      </ul>

      <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold">
        {highlight ? "Upgrade Now" : "Start"}
      </button>
    </div>
  );
}
