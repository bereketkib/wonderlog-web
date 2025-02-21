import { formatDistanceToNow } from "date-fns";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import CommentEditor from "./CommentEditor";

interface CommentProps {
  comment: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
    };
    createdAt: string;
  };
  currentUserId?: string;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  editingId: string | null;
  editContent: string;
  setEditingId: (id: string | null) => void;
  setEditContent: (content: string) => void;
}

export default function Comment({
  comment,
  currentUserId,
  onEdit,
  onDelete,
  editingId,
  editContent,
  setEditingId,
  setEditContent,
}: CommentProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
          {comment.author.name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div>
              {currentUserId === comment.author.id ? (
                <span className="text-sm text-purple-600 dark:text-purple-400">
                  You
                </span>
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {comment.author.name}
                </span>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </p>
            </div>
            {currentUserId === comment.author.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditContent(comment.content);
                  }}
                  className="p-1.5 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {editingId === comment.id ? (
            <div className="mt-2 space-y-3">
              <CommentEditor
                content={editContent}
                onChange={setEditContent}
                placeholder="Edit your comment..."
              />
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(comment.id, editContent)}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="mt-2 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 [&>p]:my-0 [&>p:first-child]:mt-4 [&>p:last-child]:mb-4"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
