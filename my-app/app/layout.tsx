import "./globals.css";
import ClientHeader from "./components/ClientHeader";

export const metadata = {
  title: "ShortsAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClientHeader />
        {children}
      </body>
    </html>
  );
}
