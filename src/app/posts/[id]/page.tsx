"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { postsService } from "@/services/posts";
import { commentsService } from "@/services/comments";
import { useState, useEffect } from "react";
import PostHeader from "@/components/post/PostHeader";
import CommentSection from "@/components/post/CommentSection";
import DeleteCommentModal from "@/components/post/DeleteCommentModal";
import type { PostDetail } from "@/services/posts";

const isValidComment = (content: string) => {
  const textContent = content.replace(/<[^>]*>/g, "").trim();
  return (
    textContent.length > 0 && content !== "<p></p>" && content !== "<p><br></p>"
  );
};

export default function PostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await postsService.getPost(id as string);
        setPost(data);
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidComment(comment)) {
      setErrorMessage("Comment cannot be empty");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    try {
      const newComment = await postsService.createComment(
        id as string,
        comment
      );
      setPost((prev) =>
        prev
          ? {
              ...prev,
              comments: [
                {
                  ...newComment,
                  post: { id: prev.id, title: prev.title },
                },
                ...prev.comments,
              ],
            }
          : null
      );
      setComment("");
      setResetKey((prev) => prev + 1);
    } catch (err) {
      setErrorMessage("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const handleEditComment = async (commentId: string, content: string) => {
    if (!content.trim() || content === "<p></p>") return;
    setErrorMessage(null);
    try {
      await commentsService.updateComment(commentId, content);
      setPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.map((c) =>
                c.id === commentId ? { ...c, content } : c
              ),
            }
          : null
      );
      setEditingId(null);
    } catch (err) {
      setErrorMessage("Failed to update comment. Please try again.");
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    setErrorMessage(null);
    try {
      await commentsService.deleteComment(commentToDelete);
      setPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.filter((c) => c.id !== commentToDelete),
            }
          : null
      );
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
    } catch (err) {
      setErrorMessage("Failed to delete comment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 space-y-8 animate-pulse px-4">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/3" />
        <div className="space-y-4 mt-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-3">
          <span role="img" aria-label="error" className="text-xl">
            ⚠️
          </span>
          <p>{error || "Post not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-3/4 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <article className="max-w-4xl mx-auto space-y-12 px-4">
        <PostHeader
          title={post.title}
          author={post.author}
          createdAt={post.createdAt}
          viewCount={post.viewCount}
        />

        <div
          className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <CommentSection
          comments={post.comments}
          user={user}
          errorMessage={errorMessage}
          submitting={submitting}
          comment={comment}
          editingId={editingId}
          editContent={editContent}
          resetKey={resetKey}
          onCommentSubmit={handleCommentSubmit}
          onCommentChange={setComment}
          onEditComment={handleEditComment}
          onDeleteComment={(id) => {
            setCommentToDelete(id);
            setIsDeleteModalOpen(true);
          }}
          setEditingId={setEditingId}
          setEditContent={setEditContent}
        />
      </article>

      <DeleteCommentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteComment}
      />
    </div>
  );
}
