"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl font-bold mb-6">
        Upload Your Video
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-xl">
        Select a video file from your computer. Our AI will automatically
        analyze and convert it into viral Shorts.
      </p>

      <div className="border border-gray-800 rounded-xl p-10 w-full max-w-md text-center">

        <input
          type="file"
          accept="video/*"
          id="videoUpload"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <label
          htmlFor="videoUpload"
          className="block border border-gray-700 px-6 py-3 rounded-lg cursor-pointer hover:border-white transition mb-6"
        >
          Choose Video File
        </label>

        {file && (
          <p className="text-sm text-green-400 mb-6">
            Selected: {file.name}
          </p>
        )}

        <button
          disabled={!file}
          className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
            file
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Upload & Process
        </button>

      </div>

    </main>
  );
}
