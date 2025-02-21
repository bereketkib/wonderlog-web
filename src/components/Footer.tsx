"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeProvider";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative mt-32 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950/60 dark:to-gray-800/60 border-t border-gray-200 dark:border-gray-700">
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-gray-100/[0.02]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  <span className="text-2xl font-semibold tracking-tighter ">
                    WONDER
                  </span>
                  <span className="text-2xl font-light tracking-tighter ">
                    log
                  </span>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Share your story with the world
                </span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A modern platform for writers and readers to share ideas, stories,
              and knowledge in a beautiful, engaging way.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-3">
              {[
                { key: "Home", value: "" },
                { key: "About", value: "about" },
                { key: "Posts", value: "posts" },
                { key: "Contact", value: "contact" },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${item.value}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: FaGithub,
                  label: "Github",
                  href: "https://github.com/bereketkib",
                },
                {
                  icon: FaLinkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/bereket-jenay-2107821b8/",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  className="group relative p-3 rounded-xl text-black bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                  aria-label={item.label}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                  <item.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Wonderlog. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Made with ❤️ by Wonderlog Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
