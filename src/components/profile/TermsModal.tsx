interface TermsModalProps {
  show: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  upgrading: boolean;
}

export default function TermsModal({
  show,
  onClose,
  onUpgrade,
  upgrading,
}: TermsModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full">
        <h3 className="text-2xl font-bold mb-4">Become an Author</h3>
        <div className="prose dark:prose-invert max-w-none mb-6">
          <h4>Author Responsibilities:</h4>
          <ul>
            <li>
              Create high-quality, original content that adds value to the
              community
            </li>
            <li>Respect intellectual property rights and avoid plagiarism</li>
            <li>Maintain professional conduct in interactions with readers</li>
            <li>Regularly engage with your audience through comments</li>
            <li>Follow our content guidelines and community standards</li>
          </ul>

          <h4>Content Guidelines:</h4>
          <ul>
            <li>Content must be original and not published elsewhere</li>
            <li>No hate speech, discrimination, or harmful content</li>
            <li>Proper attribution for any referenced materials</li>
            <li>Clear and accurate information</li>
            <li>Respect reader privacy and data protection</li>
          </ul>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            By becoming an author, you agree to these terms and
            responsibilities. Violation of these terms may result in the
            revocation of author privileges.
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onUpgrade}
            disabled={upgrading}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {upgrading ? "Upgrading..." : "I Agree & Become Author"}
          </button>
        </div>
      </div>
    </div>
  );
}
