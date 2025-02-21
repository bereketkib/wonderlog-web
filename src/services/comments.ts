import { api } from "@/services/api";
import type { Comment } from "./posts";

export interface UserComment extends Comment {
  post: {
    id: string;
    title: string;
  };
}

export const commentsService = {
  async getUserComments(): Promise<UserComment[]> {
    const response = await api.get("/comments/my");
    return response.data;
  },

  async updateComment(id: string, content: string) {
    const response = await api.put(`/comments/${id}`, { content });
    return response.data;
  },

  async deleteComment(id: string) {
    await api.delete(`/comments/${id}`);
  },
};
