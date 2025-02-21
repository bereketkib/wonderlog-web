export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-3/4 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using Wonderlog, you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you
              disagree with any part of these terms, you may not access our
              service.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">User Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl">
                <h3 className="font-medium mb-3 text-purple-600 dark:text-purple-400">
                  Account Creation
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Accurate information required</li>
                  <li>• One account per user</li>
                  <li>• Age restrictions apply</li>
                  <li>• Secure password required</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/30 p-6 rounded-xl">
                <h3 className="font-medium mb-3 text-pink-600 dark:text-pink-400">
                  Account Responsibilities
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Maintain security</li>
                  <li>• Report unauthorized use</li>
                  <li>• Keep information updated</li>
                  <li>• Follow community guidelines</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">Content Guidelines</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-medium text-lg mb-3">Acceptable Content</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Original content</li>
                  <li>• Respectful discussions</li>
                  <li>• Constructive feedback</li>
                </ul>
              </div>
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="font-medium text-lg mb-3">Prohibited Content</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Harmful or illegal content</li>
                  <li>• Hate speech or harassment</li>
                  <li>• Spam or misleading information</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Your Content</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You retain ownership of content you create and share on
                  Wonderlog.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Our Rights</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You grant us license to use and display your content on our
                  platform.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">Termination</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              We reserve the right to terminate or suspend access to our service
              immediately, without prior notice, for any reason including breach
              of these Terms.
            </p>
            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl">
              <h3 className="font-medium text-lg text-red-600 dark:text-red-400 mb-3">
                Account Termination
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Violation of terms</li>
                <li>• Harmful behavior</li>
                <li>• Extended inactivity</li>
                <li>• User request</li>
              </ul>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <a
              href="mailto:legal@wonderlog.com"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors shadow-sm hover:shadow-md"
            >
              legal@wonderlog.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
