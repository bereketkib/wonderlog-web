import { User } from "@/services/user";

interface ProfileHeaderProps {
  user: User;
  comments: number;
  postCount: number;
  upgrading: boolean;
  onUpgrade: () => void;
  onShowTerms: () => void;
}

export default function ProfileHeader({
  user,
  comments,
  postCount,
  upgrading,
  onUpgrade,
  onShowTerms,
}: ProfileHeaderProps) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-lg">
            {user.name[0].toUpperCase()}
          </div>
        </div>

        <div className="flex-grow space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                user.role === "AUTHOR"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {user.role}
            </span>
            {user.role !== "AUTHOR" && (
              <div className="flex flex-col ml-auto items-center">
                <button
                  onClick={onShowTerms}
                  disabled={upgrading}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {upgrading ? "Upgrading..." : "Upgrade to Author"}
                </button>
                <p className="text-sm font-light text-purple-500 mt-2">
                  ⬆︎ to write a blog...
                </p>
              </div>
            )}

            {user.role === "AUTHOR" && (
              <a
                href={`${
                  process.env.NEXT_PUBLIC_DASHBOARD_URL
                }/api/auth/transfer?token=${encodeURIComponent(
                  localStorage.getItem("accessToken") || ""
                )}&user=${encodeURIComponent(
                  localStorage.getItem("user") || ""
                )}&theme=${encodeURIComponent(
                  localStorage.getItem("theme") || "light"
                )}`}
                className="text-sm flex items-center ml-auto font-medium text-gray-950 dark:text-gray-50 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <span className="border-b border-gray-950 dark:border-gray-50">
                  Author Dashboard{" "}
                </span>
                <span className="inline-block text-xl ml-1 transform -rotate-45">
                  ☞
                </span>
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {comments}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comments
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {postCount}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
