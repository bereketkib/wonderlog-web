interface PostsTabProps {
  postCount: number;
  userRole: string;
}

export default function PostsTab({ postCount, userRole }: PostsTabProps) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
        <span className="text-2xl">✍️</span>
      </div>
      {postCount > 0 ? (
        <div>
          <h3 className="text-lg font-medium mb-2">
            We appreciate your participation
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Click the above link ☝️ to manage your posts
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Share your thoughts and stories with the community
          </p>
          <p className="text-purple-600 dark:text-purple-400 mb-6">
            {userRole === "AUTHOR"
              ? "Click the above link ☝️ to create a blog"
              : "Upgrade your account ☝️ to create a blog"}
          </p>
        </div>
      )}
    </div>
  );
}
