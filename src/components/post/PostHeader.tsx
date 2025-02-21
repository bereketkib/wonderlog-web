import { format } from "date-fns";

interface PostHeaderProps {
  title: string;
  author: {
    name: string;
  };
  createdAt: string;
  viewCount: number;
}

export default function PostHeader({
  title,
  author,
  createdAt,
  viewCount,
}: PostHeaderProps) {
  return (
    <header className="space-y-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        {title}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            {author.name[0].toUpperCase()}
          </div>
          <span>{author.name}</span>
        </div>
        <span>•</span>
        <span>{format(new Date(createdAt), "MMMM d, yyyy")}</span>
        <span>•</span>
        <span>{viewCount} views</span>
      </div>
    </header>
  );
}
