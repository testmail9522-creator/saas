"use client";

import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-10 py-14 relative">
      
      {/* ✅ BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-10 bg-gray-800 px-5 py-2 rounded-lg text-sm hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* ✅ HEADER */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Simple & Creator-Friendly Pricing
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Start free. Upgrade only when you grow 🚀
      </p>

      {/* ✅ PRICING GRID */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
        <PriceCard
          title="Free (No Login)"
          price="₹0"
          features={[
            "✅ 3 Shorts Only",
            "✅ Any Public YouTube Video",
            "✅ Auto Captions",
            "❌ No History Saved",
            "❌ Limited Speed",
          ]}
          buttonText="Try Now"
        />

        <PriceCard
          title="Free (With Login)"
          price="₹0"
          highlight
          features={[
            "✅ 5 Shorts",
            "✅ Any Public YouTube Video",
            "✅ Auto Captions",
            "✅ Faster Processing",
            "✅ Download Anytime",
          ]}
          buttonText="Login & Start"
        />

        <PriceCard
          title="Pro Creator"
          price="₹499 / month"
          features={[
            "✅ Unlimited Shorts",
            "✅ Unlimited YouTube Videos",
            "✅ Advanced AI Highlights",
            "✅ No Watermark",
            "✅ Fastest Processing",
            "✅ Priority Support",
          ]}
          buttonText="Upgrade to Pro"
        />
      </div>

      {/* ✅ FOOTER NOTE */}
      <p className="text-center text-gray-500 mt-14 text-sm">
        You can create Shorts from <b>any public YouTube video or livestream replay</b>.
        All Shorts come with <b>automatic captions</b>.
      </p>
    </main>
  );
}

function PriceCard({
  title,
  price,
  features,
  highlight,
  buttonText,
}: any) {
  return (
    <div
      className={`border rounded-xl p-8 text-center ${
        highlight
          ? "border-white scale-105 shadow-xl"
          : "border-gray-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>

      <p className="text-3xl font-bold text-green-400 mb-6">
        {price}
      </p>

      <ul className="space-y-3 text-gray-300 mb-8 text-sm">
        {features.map((f: string, i: number) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <button
        className={`px-6 py-2 rounded-lg font-semibold ${
          highlight
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
