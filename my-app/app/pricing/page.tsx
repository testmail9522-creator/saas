export default function Pricing() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Simple <span className="text-red-600">Pricing</span>
        </h1>
        <p className="text-zinc-400 mb-12">
          Start free. Upgrade only when you grow.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* FREE */}
          <div className="border border-zinc-800 p-8 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">Free</h2>
            <p className="text-4xl font-bold mb-4">₹0</p>
            <ul className="space-y-2 text-sm text-zinc-400 mb-6">
              <li>✅ 3 Shorts per video</li>
              <li>✅ 720p Export</li>
              <li>✅ Watermark</li>
            </ul>
            <button className="w-full bg-zinc-800 py-3 rounded-lg">
              Get Started
            </button>
          </div>

          {/* PRO */}
          <div className="border-2 border-red-600 p-8 rounded-2xl scale-105">
            <h2 className="text-xl font-semibold mb-2">Pro</h2>
            <p className="text-4xl font-bold mb-4">₹799/mo</p>
            <ul className="space-y-2 text-sm text-zinc-400 mb-6">
              <li>✅ Unlimited Shorts</li>
              <li>✅ 4K Export</li>
              <li>✅ No Watermark</li>
              <li>✅ Priority Processing</li>
            </ul>
            <button className="w-full bg-red-600 py-3 rounded-lg font-semibold">
              Go Pro
            </button>
          </div>

          {/* STUDIO */}
          <div className="border border-zinc-800 p-8 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">Studio</h2>
            <p className="text-4xl font-bold mb-4">₹2499/mo</p>
            <ul className="space-y-2 text-sm text-zinc-400 mb-6">
              <li>✅ Team Access</li>
              <li>✅ Bulk Uploads</li>
              <li>✅ API Access</li>
            </ul>
            <button className="w-full bg-zinc-800 py-3 rounded-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
