export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-36">
        <h1 className="text-5xl font-bold mb-4">
          Convert Long Videos into Viral Shorts
        </h1>

        <p className="text-gray-400 max-w-xl mb-8">
          Upload once and share to YouTube Shorts & Facebook Reels automatically.
        </p>

        <div className="flex gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium"
          >
            Upload Video
          </a>

          <a
            href="/login"
            className="px-6 py-3 border border-white rounded-lg"
          >
            Connect YouTube
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-6 pb-32">

        <h2 className="text-4xl font-bold text-center mb-2">
          Simple, Transparent Pricing
        </h2>

        <p className="text-center text-gray-400 mb-12">
          Start free. Upgrade only when you grow.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {/* FREE */}
          <div className="border border-white/20 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-6">₹0</p>

            <ul className="text-sm text-gray-300 space-y-2 mb-6 text-left">
              <li>✅ 5 Shorts / Month</li>
              <li>✅ Basic Highlights</li>
              <li>✅ Watermark</li>
              <li className="text-red-400">❌ No Auto Upload</li>
            </ul>

            <a href="/login" className="block border border-white rounded-lg py-2">
              Start Free
            </a>
          </div>

          {/* PRO */}
          <div className="border-2 border-white rounded-xl p-8 text-center scale-105">
            <div className="text-xs bg-white text-black inline-block px-3 py-1 rounded mb-3">
              MOST POPULAR
            </div>

            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-6">₹499 / month</p>

            <ul className="text-sm text-gray-300 space-y-2 mb-6 text-left">
              <li>✅ Unlimited Shorts</li>
              <li>✅ Advanced AI Highlights</li>
              <li>✅ No Watermark</li>
              <li>✅ YouTube Auto Upload</li>
            </ul>

            <a
              href="/login"
              className="block bg-white text-black rounded-lg py-2"
            >
              Upgrade to Pro
            </a>
          </div>

          {/* AGENCY */}
          <div className="border border-white/20 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Agency</h3>
            <p className="text-3xl font-bold mb-6">₹1999 / month</p>

            <ul className="text-sm text-gray-300 space-y-2 mb-6 text-left">
              <li>✅ Multiple Channels</li>
              <li>✅ Unlimited Uploads</li>
              <li>✅ Priority Support</li>
            </ul>

            <a
              href="/login"
              className="block border border-white rounded-lg py-2"
            >
              Contact Sales
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
