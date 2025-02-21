import { CommentInPost } from "@/services/posts";
import CommentEditor from "./CommentEditor";
import SingleComment from "./Comment";

interface CommentSectionProps {
  comments: CommentInPost[];
  user: any;
  errorMessage: string | null;
  submitting: boolean;
  comment: string;
  editingId: string | null;
  editContent: string;
  resetKey: number;
  onCommentSubmit: (e: React.FormEvent) => void;
  onCommentChange: (html: string) => void;
  onEditComment: (id: string, content: string) => void;
  onDeleteComment: (id: string) => void;
  setEditingId: (id: string | null) => void;
  setEditContent: (content: string) => void;
}

export default function CommentSection({
  comments,
  user,
  errorMessage,
  submitting,
  comment,
  editingId,
  editContent,
  resetKey,
  onCommentSubmit,
  onCommentChange,
  onEditComment,
  onDeleteComment,
  setEditingId,
  setEditContent,
}: CommentSectionProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
          {errorMessage}
        </div>
      )}

      {user ? (
        <form onSubmit={onCommentSubmit} className="space-y-4">
          <CommentEditor
            key={resetKey}
            content={comment}
            onChange={onCommentChange}
            placeholder="Share your thoughts..."
            onReset={() => onCommentChange("")}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !comment.trim() || comment === "<p></p>"}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Please{" "}
            <a
              href="/login"
              className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              sign in
            </a>{" "}
            to join the discussion
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments
          .sort((a, b) => (a.author.id === user?.id ? -1 : 1))
          .map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              currentUserId={user?.id}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
              editingId={editingId}
              editContent={editContent}
              setEditingId={setEditingId}
              setEditContent={setEditContent}
            />
          ))}
      </div>
    </section>
  );
}
