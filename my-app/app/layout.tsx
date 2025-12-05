import "./globals.css";
import ClientHeader from "./components/ClientHeader";

export const metadata = {
  title: "ShortsAI",
  description: "Create viral shorts automatically",
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
        <div className="pt-2">{children}</div>
      </body>
    </html>
  );
}
