// app/layout.tsx
import "./globals.css";
import ClientHeader from "./components/ClientHeader";

export const metadata = {
  title: "ShortsAI",
  description: "Convert YouTube videos into viral shorts automatically."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white pt-20">
        <ClientHeader />
        {children}
      </body>
    </html>
  );
}
