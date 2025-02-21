import { Montserrat } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Wonderlog - A Modern Blog Platform",
    template: "%s | Wonderlog - A Modern Blog Platform",
  },
  description: "Share your thoughts and ideas with the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${montserrat.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <ThemeProvider>
            <Navigation />
            <main className="container flex-grow mx-auto px-4 pt-20">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
