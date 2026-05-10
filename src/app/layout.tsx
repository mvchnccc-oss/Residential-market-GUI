import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/contexts/AppContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { Navigation } from "@/components/Navigation";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Residential — Property Marketplace",
  description:
    "Discover your perfect home across Egypt's finest neighborhoods. Browse villas, apartments, townhouses and more.",
  keywords: ["real estate", "property", "Egypt", "apartments", "villas", "buy home"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth",
        notoSans.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProvider>
          <ToastProvider>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
