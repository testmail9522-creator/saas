"use client";

import Image from "next/image";

export default function SampleShowcase() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mt-10">
      
      {/* Card 1 */}
      <div className="bg-neutral-900 p-4 rounded-2xl shadow-xl hover:scale-105 transition">
        <Image
          src="/sample1.webp"
          width={500}
          height={500}
          alt="Sample 1"
          className="rounded-xl"
        />
      </div>

      {/* Card 2 */}
      <div className="bg-neutral-900 p-4 rounded-2xl shadow-xl hover:scale-105 transition">
        <Image
          src="/sample2.webp"
          width={500}
          height={500}
          alt="Sample 2"
          className="rounded-xl"
        />
      </div>

      {/* Card 3 */}
      <div className="bg-neutral-900 p-4 rounded-2xl shadow-xl hover:scale-105 transition">
        <Image
          src="/sample.png"
          width={500}
          height={500}
          alt="Sample 3"
          className="rounded-xl"
        />
      </div>

    </div>
  );
}
