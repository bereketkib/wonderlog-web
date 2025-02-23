import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { PostList } from "@/services/posts";

interface PostCardProps {
  post: PostList;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block group h-[400px]">
      {" "}
      <article className="relative h-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-200 transform group-hover:-translate-y-1 flex flex-col">
        {" "}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/[0.03] group-hover:to-pink-600/[0.03] transition-colors" />
        <div className="relative flex flex-col flex-1">
          {" "}
          <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <div
            className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-4 flex-1"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-medium text-purple-600 dark:text-purple-400">
                  {post.author.name[0].toUpperCase()}
                </div>
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{post._count.comments}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
