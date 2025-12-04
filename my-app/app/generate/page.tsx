"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GeneratePage() {
  const router = useRouter();

  useEffect(() => {
    let isGenerated = true; // 🔥 mark generation as active

    /* ✅ 1. BLOCK TAB CLOSE & REFRESH */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isGenerated) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    /* ✅ 2. BLOCK BACK BUTTON */
    const handlePopState = () => {
      const confirmLeave = confirm(
        "Video generated! If you leave, your generated shorts will be lost."
      );

      if (!confirmLeave) {
        history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    /* ✅ 3. BLOCK ALL LINK CLICKS (Navbar, Footer, etc.) */
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link || !isGenerated) return;

      e.preventDefault();

      const confirmLeave = confirm(
        "Video generated! If you leave, your generated shorts will be lost."
      );

      if (confirmLeave) {
        isGenerated = false;
        router.push(link.getAttribute("href") || "/");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-6">
      {/* ✅ SUCCESS MESSAGE */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          <span className="text-green-400 text-4xl">✅</span>
          Your Shorts Are Ready!
        </h1>
      </div>

      {/* ✅ GENERATED SHORTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="bg-neutral-900 rounded-xl p-6 flex flex-col items-center"
          >
            <div className="w-full h-52 bg-neutral-800 rounded mb-4"></div>

            <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-neutral-200 transition">
              Download
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
