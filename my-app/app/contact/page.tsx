export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">
          Contact <span className="text-red-600">Us</span>
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Your Name"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg"
          />
          <input
            placeholder="Your Email"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg"
          ></textarea>

          <button className="w-full bg-red-600 py-3 rounded-lg font-semibold">
            Send Message
          </button>
        </div>
      </div>
    </main>
  );
}
