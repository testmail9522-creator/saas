export default function About() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">
          About <span className="text-red-600">ShortsAI</span>
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          ShortsAI is built to help creators grow faster by automatically
          converting long YouTube videos into viral-ready Shorts using AI.
          No editing skills, no expensive software, just paste a link and grow.
        </p>
      </div>
    </main>
  );
}
