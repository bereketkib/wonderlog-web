"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeProvider";
import { useState } from "react";

export default function Navigation() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 border-b border-gray-200 dark:border-gray-700 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80 transition-opacity"
            >
              <span className="font-semibold tracking-tighter">WONDER</span>
              <span className="font-light tracking-tighter">log</span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/posts" className="nav-link">
                Posts
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>

            {user ? (
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <Link href="/profile" className="nav-link">
                  Profile
                </Link>
                <button onClick={logout} className="nav-link">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <Link href="/login" className="nav-link">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <Link href="/posts" className="mobile-nav-link">
              Posts
            </Link>
            <Link href="/about" className="mobile-nav-link">
              About
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="mobile-nav-link">
                  Profile
                </Link>
                <button onClick={logout} className="mobile-nav-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="mobile-nav-link">
                  Login
                </Link>
                <Link href="/register" className="mobile-nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
