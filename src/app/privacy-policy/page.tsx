export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-3/4 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              At Wonderlog, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our service.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl">
                <h3 className="font-medium mb-3 text-purple-600 dark:text-purple-400">
                  Personal Information
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Name and email address</li>
                  <li>• Profile information</li>
                  <li>• Account preferences</li>
                  <li>• User-generated content</li>
                </ul>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/30 p-6 rounded-xl">
                <h3 className="font-medium mb-3 text-pink-600 dark:text-pink-400">
                  Usage Information
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Device information</li>
                  <li>• Log data</li>
                  <li>• Usage patterns</li>
                  <li>• Performance data</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">
              How We Use Your Information
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-medium text-lg mb-3">Service Provision</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Account management</li>
                  <li>• Content delivery</li>
                  <li>• Customer support</li>
                </ul>
              </div>
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="font-medium text-lg mb-3">
                  Service Improvement
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Analytics and research</li>
                  <li>• Feature development</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">Your Rights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Access Rights</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can request access to your personal data and obtain a copy
                  of the personal data we maintain about you.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Modification Rights</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can update or correct your personal data if it is
                  inaccurate or incomplete.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Deletion Rights</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can request deletion of your personal data under certain
                  circumstances.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Objection Rights</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can object to our processing of your personal data under
                  specific conditions.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <a
              href="mailto:privacy@wonderlog.com"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors shadow-sm hover:shadow-md"
            >
              privacy@wonderlog.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
