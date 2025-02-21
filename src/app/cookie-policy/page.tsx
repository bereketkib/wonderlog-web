export default function CookiePolicyPage() {
  return (
    <div className="relative min-h-screen py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-3/4 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              Understanding Our Cookie Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              At Wonderlog, we believe in being transparent about how we collect
              and use data. This policy provides detailed information about how
              and why we use cookies, as well as how you can control them on our
              website.
            </p>
          </section>

          {/* What Are Cookies */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cookies are small text files that websites place on your device as
              you browse the web. They serve various purposes and help us
              deliver the best possible experience to our users.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl">
                <h3 className="font-medium mb-2 text-purple-600 dark:text-purple-400">
                  Session Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Temporary cookies that expire when you close your browser
                </p>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/30 p-6 rounded-xl">
                <h3 className="font-medium mb-2 text-pink-600 dark:text-pink-400">
                  Persistent Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Cookies that remain on your device for a set period
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">How We Use Cookies</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-medium text-lg mb-2">Essential Cookies</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Required for basic site functionality:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                  <li>Authentication and security</li>
                  <li>Shopping cart functionality</li>
                  <li>User preferences</li>
                </ul>
              </div>

              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="font-medium text-lg mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Help us understand user behavior:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                  <li>Page visit statistics</li>
                  <li>User journey analysis</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-medium text-lg mb-2">Marketing Cookies</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Used for personalized experiences:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                  <li>Targeted advertising</li>
                  <li>Content recommendations</li>
                  <li>Social media integration</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in
              your browser settings.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl">
              <h3 className="font-medium text-lg mb-4">
                Popular Browser Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
                <div>
                  <p className="font-medium">Chrome:</p>
                  <p>Settings → Privacy and Security → Cookies</p>
                </div>
                <div>
                  <p className="font-medium">Firefox:</p>
                  <p>Options → Privacy & Security → Cookies</p>
                </div>
                <div>
                  <p className="font-medium">Safari:</p>
                  <p>Preferences → Privacy → Cookies</p>
                </div>
                <div>
                  <p className="font-medium">Edge:</p>
                  <p>Settings → Cookies and Site Permissions</p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates to Policy */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Updates to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for operational, legal, or regulatory
              reasons. We encourage you to periodically review this page for the
              latest information on our cookie practices.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
