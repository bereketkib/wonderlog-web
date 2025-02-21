import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { UserComment } from "@/services/comments";

interface CommentsListProps {
  comments: UserComment[];
  loading: boolean;
  error: string;
}

export default function CommentsList({
  comments,
  loading,
  error,
}: CommentsListProps) {
  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-3">
        <span role="img" aria-label="error" className="text-xl">
          ⚠️
        </span>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <span className="text-2xl">💭</span>
        </div>
        <h3 className="text-lg font-medium mb-2">No Comments Yet</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Start engaging with posts to see your comments here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Link
            href={`/posts/${comment.post.id}`}
            className="text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 mb-2 block"
          >
            {comment.post.title}
          </Link>
          <div
            className="mt-2 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 [&>p]:my-0 [&>p:first-child]:mt-4 [&>p:last-child]:mb-4"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(comment.createdAt))} ago
          </p>
        </div>
      ))}
    </div>
  );
}
