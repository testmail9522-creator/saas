import "./globals.css";
import ClientHeader from "./components/ClientHeader";

export const metadata = {
  title: "ShortsAI",
  description: "Convert long videos into viral shorts using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* ✅ GLOBAL HEADER ONLY HERE */}
        <ClientHeader />

        {/* ✅ ALL PAGES RENDER HERE */}
        {children}
      </body>
    </html>
  );
}
