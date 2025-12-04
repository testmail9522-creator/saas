import "./globals.css";
import { GenerationProvider } from "./context/GenerationContext";
import ClientHeader from "./components/ClientHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <GenerationProvider>
          <ClientHeader />
          {children}
        </GenerationProvider>
      </body>
    </html>
  );
}
