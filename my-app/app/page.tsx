export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShortsAI</h1>

      <p className="text-gray-400 mb-6 text-center max-w-xl">
        Turn your YouTube Live streams and long videos into viral Shorts automatically using AI.
      </p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-white text-black rounded hover:opacity-90"
        >
          Login
        </a>

        <a
          href="/login"
          className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
