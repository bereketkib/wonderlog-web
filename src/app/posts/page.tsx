"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import { useSearchParams, useRouter } from "next/navigation";
import { postsService } from "@/services/posts";
import type { PostList } from "@/services/posts";
import Select from "react-select";
import { PenLine } from "lucide-react";

export default function Posts() {
  const [posts, setPosts] = useState<PostList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "recent";

  // Add pagination state
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1,
    hasMore: false,
  });

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "transparent",
      borderColor: "rgb(229 231 235)",
      borderRadius: "0.75rem",
      padding: "0.5rem",
      minHeight: "56px",
      "&:hover": {
        borderColor: "rgb(156 163 175)",
      },
      boxShadow: "none",
      "&:focus-within": {
        borderColor: "rgb(139 92 246)",
        boxShadow: "0 0 0 1px rgb(139 92 246)",
      },
      ".dark &": {
        backgroundColor: "rgb(31 41 55)",
        borderColor: "rgb(55 65 81)",
        "&:hover": {
          borderColor: "rgb(75 85 99)",
        },
      },
    }),
    option: (
      base: any,
      state: { isSelected: boolean; isFocused: boolean }
    ) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgb(139 92 246)"
        : state.isFocused
        ? "rgb(243 244 246)"
        : "transparent",
      color: state.isSelected ? "white" : "rgb(17 24 39)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "rgb(124 58 237)",
      },
      ".dark &": {
        backgroundColor: state.isSelected
          ? "rgb(139 92 246)"
          : state.isFocused
          ? "rgba(55 65 81 / 0.5)"
          : "transparent",
        color: state.isSelected ? "white" : "rgb(243 244 246)",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "white",
      borderColor: "rgb(229 231 235)",
      borderRadius: "0.75rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      ".dark &": {
        backgroundColor: "rgb(31 41 55)",
        borderColor: "rgb(55 65 81)",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "rgb(17 24 39)",
      ".dark &": {
        color: "white",
      },
    }),
  };

  // Update the useEffect to include pagination data
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await postsService.getPosts(page, search, sort);
        setPosts(data.posts);
        setPagination(data.pagination);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page, search, sort]);

  // Add this pagination controls component before the closing section tag
  return (
    <div className="relative min-h-screen space-y-12 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-3/4 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Header Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Explore Amazing Stories
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Discover thought-provoking articles from our community of writers
        </p>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="search"
              placeholder="Search posts..."
              className="w-full h-[4.7rem] px-6 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              value={search}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set("search", e.target.value);
                router.push(`/posts?${newParams.toString()}`);
              }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              ⌘K
            </span>
          </div>
          <Select
            value={{
              value: sort,
              label: sort === "recent" ? "Most Recent" : "Featured",
            }}
            onChange={(option: any) => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("sort", option.value);
              router.push(`/posts?${newParams.toString()}`);
            }}
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "featured", label: "Featured" },
            ]}
            className="w-60"
            styles={selectStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#8b5cf6",
              },
            })}
          />
        </div>
      </section>

      {/* Error State */}
      {error && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-2">
            <span role="img" aria-label="error" className="text-lg">
              ⚠️
            </span>
            {error}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative group h-[280px] p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse"
              >
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl" />
              <div className="relative bg-white dark:bg-gray-800 rounded-full p-4">
                <PenLine className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
              No posts found
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-sm">
              {search
                ? "No posts match your search criteria. Try different keywords or filters."
                : "Stay tuned! New stories will be published soon."}
            </p>
            {search && (
              <button
                onClick={() => router.push("/posts")}
                className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={{ ...post, _count: post._count || { comments: 0 } }}
              />
            ))}
          </div>
        )}
        {!loading && posts.length > 0 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set("page", String(Math.max(1, page - 1)));
                router.push(`/posts?${newParams.toString()}`);
              }}
              disabled={page <= 1}
              className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 dark:hover:border-purple-400 transition-all"
            >
              Previous
            </button>
            <span className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              Page {pagination.currentPage} of {pagination.pages}
            </span>
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set("page", String(page + 1));
                router.push(`/posts?${newParams.toString()}`);
              }}
              disabled={!pagination.hasMore}
              className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 dark:hover:border-purple-400 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
