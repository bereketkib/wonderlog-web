import { api } from "@/services/api";

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  postId: string;
}

export interface CommentInPost {
  id: string;
  content: string; // This will now contain HTML content
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  post: {
    id: string;
    title: string;
  };
}

export interface PostList {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  _count: {
    comments: number;
  };
}

export interface PostDetail {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  comments: CommentInPost[];
}

export interface PostsResponse {
  posts: PostList[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    hasMore: boolean;
  };
}

export interface PostCount {
  count: number;
}

export const postsService = {
  async getPosts(
    page = 1,
    search = "",
    sort = "recent"
  ): Promise<PostsResponse> {
    const response = await api.get(
      `/posts?page=${page}&search=${search}&sort=${sort}`
    );
    return response.data;
  },

  async getPost(id: string): Promise<PostDetail> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async createComment(postId: string, content: string): Promise<Comment> {
    const response = await api.post(`/comments/${postId}`, { content });
    return response.data;
  },

  async getMyPostCount(): Promise<PostCount> {
    const response = await api.get("/posts/my/count");
    return response.data;
  },
};
