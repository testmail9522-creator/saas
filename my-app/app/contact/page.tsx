"use client";

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-24 relative overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#140012] via-[#050505] to-[#001028] opacity-80" />

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-purple-600/20 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-10 w-[430px] h-[430px] bg-blue-500/20 blur-[140px] rounded-full -z-10" />

      {/* FORM CONTAINER */}
      <div className="max-w-xl w-full bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl p-10 shadow-xl animate-[fadeUp_0.8s_ease_forwards] opacity-0">

        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Contact <span className="text-red-500">Us</span>
        </h1>

        <p className="text-neutral-400 text-center mb-10 text-sm">
          We usually respond within a few hours.
        </p>

        {/* CONTACT OPTIONS */}
        <div className="grid grid-cols-1 gap-4 mb-10">

          {/* EMAIL BOX */}
          <a
            href="mailto:youremail@gmail.com"
            className="bg-neutral-900/60 border border-neutral-700 hover:border-red-500 rounded-lg px-5 py-4 flex items-center gap-4 transition-all hover:scale-[1.02]"
          >
            <div className="w-10 h-10 bg-red-600/20 border border-red-600/40 rounded-lg flex items-center justify-center">
              📧
            </div>
            <div>
              <p className="font-semibold">Email Us</p>
              <p className="text-neutral-400 text-sm">youremail@gmail.com</p>
            </div>
          </a>

          {/* INSTAGRAM BOX */}
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            className="bg-neutral-900/60 border border-neutral-700 hover:border-red-500 rounded-lg px-5 py-4 flex items-center gap-4 transition-all hover:scale-[1.02]"
          >
            {/* Instagram SVG */}
            <div className="w-10 h-10 bg-pink-500/20 border border-pink-500/40 rounded-lg flex items-center justify-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff2db3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>

            <div>
              <p className="font-semibold">Instagram</p>
              <p className="text-neutral-400 text-sm">@yourprofile</p>
            </div>
          </a>

        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* NAME */}
          <div className="group">
            <input
              placeholder="Your Name"
              className="w-full bg-neutral-900/60 px-4 py-3 rounded-lg border border-neutral-700 text-white
              focus:border-red-500 outline-none transition-all duration-300"
            />
            <div className="h-[2px] w-0 bg-red-500 mt-1 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* EMAIL */}
          <div className="group">
            <input
              placeholder="Your Email"
              className="w-full bg-neutral-900/60 px-4 py-3 rounded-lg border border-neutral-700 text-white
              focus:border-red-500 outline-none transition-all duration-300"
            />
            <div className="h-[2px] w-0 bg-red-500 mt-1 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* MESSAGE */}
          <div className="group">
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full bg-neutral-900/60 px-4 py-3 rounded-lg border border-neutral-700 text-white
              focus:border-red-500 outline-none transition-all duration-300 resize-none"
            ></textarea>
            <div className="h-[2px] w-0 bg-red-500 mt-1 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* BUTTON */}
          <button
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold text-white
            shadow-lg shadow-red-900/40 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Send Message
          </button>

        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
