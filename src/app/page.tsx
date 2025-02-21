"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative space-y-32 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-2/3 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              Welcome to the future of blogging
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="text-gray-900 dark:text-white">
              Share Your Story on{" "}
            </span>
            <span className="bg-clip-text text-transparent tracking-wide bg-gradient-to-r from-purple-600 to-pink-600">
              Wonderlog
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
            A modern platform for writers and readers to share ideas, stories,
            and knowledge in a beautiful, engaging way.
          </p>
          {/* Hero Section Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {user ? (
              <>
                <a
                  href="/posts"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5"
                >
                  Explore Blogs
                </a>
                <a
                  href="/profile"
                  className="px-8 py-4 rounded-xl border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white font-medium transition-all transform hover:-translate-y-0.5"
                >
                  View Profile
                </a>
              </>
            ) : (
              <>
                <a
                  href="/register"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5"
                >
                  Start Writing
                </a>
                <a
                  href="/posts"
                  className="px-8 py-4 rounded-xl border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white font-medium transition-all transform hover:-translate-y-0.5"
                >
                  Explore Posts
                </a>
              </>
            )}
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <img
            src="/images/home/hero.svg"
            alt="Hero"
            className="relative w-full dark:opacity-90 transform group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold">Why Choose Wonderlog?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of powerful features and elegant design
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "✍️",
              title: "Easy Writing",
              description:
                "Intuitive editor with markdown support and real-time preview",
            },
            {
              icon: "🎨",
              title: "Beautiful Design",
              description:
                "Modern, responsive design that looks great on any device",
            },
            {
              icon: "💬",
              title: "Engage & Connect",
              description:
                "Build meaningful connections through comments and discussions",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30 mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reading Experience Section */}
      <section className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <h2 className="text-3xl font-bold">Immersive Reading Experience</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Dive into a world of captivating stories and insightful articles.
            Our clean, distraction-free reading environment helps you focus on
            what matters most - the content.
          </p>
          <ul className="space-y-4">
            {[
              "Customizable reading preferences",
              "Bookmark your favorite articles",
              "Estimated reading times",
              "Dark mode support",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative group order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <img
            src="/images/home/reading.svg"
            alt="Reading Experience"
            className="relative w-full dark:opacity-90 transform group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </section>

      {/* Community Section */}
      <section className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <img
          src="/images/home/community.svg"
          alt="Community"
          className="w-full dark:opacity-90"
        />
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Connect with like-minded writers and readers. Share your
            perspectives, get feedback, and grow together in a supportive
            environment.
          </p>
          <ul className="space-y-4">
            {[
              "Engage in meaningful discussions",
              "Get inspired by diverse content",
              "Build your writing portfolio",
              "Reach a wider audience",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-5xl mx-auto px-4">
        <div className="relative p-12 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative text-center space-y-8">
            <h2 className="text-3xl font-bold text-white">
              {user
                ? "Ready to Share Your Story?"
                : "Ready to Start Your Journey?"}
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              {user
                ? "Share your thoughts and experiences with our growing community."
                : "Join thousands of writers and readers who are already part of our growing community."}
            </p>
            <a
              href={user ? "/profile" : "/register"}
              className="inline-block px-8 py-4 rounded-xl bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 font-medium hover:bg-purple-50 transition-colors transform hover:-translate-y-0.5"
            >
              {user ? "Write a blog" : "Get Started Today"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
