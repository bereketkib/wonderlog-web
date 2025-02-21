"use client";

import { useAuth } from "@/context/AuthContext";

export default function About() {
  const { user } = useAuth();

  return (
    <div className="relative space-y-32 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
          <span className="text-purple-600 dark:text-purple-400 font-medium">
            Our Story
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          About Wonderlog
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
          A platform built for modern storytellers and thought leaders.
        </p>
      </section>

      {/* Mission Section */}
      <section className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            At Wonderlog, we believe everyone has a story worth sharing. Our
            mission is to provide a platform where writers can express their
            ideas freely and readers can discover unique perspectives.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We're building more than just a blogging platform – we're creating a
            community where ideas flourish and connections are made.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <img
            src="/images/about/creator.svg"
            alt="Content Creator"
            className="relative w-full dark:opacity-90"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "✨",
              title: "Quality Content",
              description:
                "We prioritize thoughtful, well-crafted content that adds value to our readers' lives.",
              color: "purple",
            },
            {
              icon: "👥",
              title: "Community First",
              description:
                "We foster an inclusive environment where diverse voices can thrive and connect.",
              color: "pink",
            },
            {
              icon: "💡",
              title: "Innovation",
              description:
                "We continuously evolve our platform to meet the needs of modern writers.",
              color: "purple",
            },
            {
              icon: "🎨",
              title: "User Experience",
              description:
                "We create intuitive and enjoyable experiences for our users.",
              color: "pink",
            },
          ].map((value, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl bg-${value.color}-100 dark:bg-${value.color}-900/30 mb-6 group-hover:scale-110 transition-transform`}
              >
                <span className="text-3xl">{value.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="relative max-w-6xl mx-auto px-4 text-center space-y-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Team</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're a passionate team of writers, developers, and creatives
            working together to build the future of digital storytelling.
          </p>
        </div>
        <img
          src="/images/about/team.svg"
          alt="Team"
          className="w-full max-w-2xl mx-auto dark:opacity-90"
        />
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="/images/about/features.svg"
            alt="Features"
            className="w-full dark:opacity-90"
          />
          <div className="space-y-12">
            <h2 className="text-3xl font-bold">Platform Features</h2>
            {[
              {
                title: "Rich Text Editor",
                description:
                  "Write and format your content with our intuitive editor.",
              },
              {
                title: "Engagement Analytics",
                description:
                  "Track how your content performs with detailed insights.",
              },
              {
                title: "Community Interaction",
                description:
                  "Connect with readers through comments and discussions.",
              },
            ].map((feature, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    {i + 1}
                  </span>
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 pl-11">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl font-bold">Start Your Journey Today</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Join our community of writers and readers. Share your stories, ideas,
          and perspectives with the world.
        </p>
        <div className="flex justify-center gap-4">
          {user ? (
            <a
              href="/profile"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5"
            >
              View Profile
            </a>
          ) : (
            <a
              href="/register"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5"
            >
              Join Wonderlog
            </a>
          )}

          <a
            href="/posts"
            className="px-8 py-3 rounded-lg border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white font-medium transition-all transform hover:-translate-y-0.5"
          >
            Explore Posts
          </a>
        </div>
      </section>
    </div>
  );
}
