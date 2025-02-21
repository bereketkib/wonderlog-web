import { api } from "@/services/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  async upgradeUser() {
    const response = await api.post<{ message: string; user: User }>(
      "/users/upgrade-to-author"
    );
    return response.data;
  },

  async updatePassword(data: UpdatePasswordData) {
    const response = await api.put<{ message: string }>(
      "/users/update-password",
      data
    );
    return response.data;
  },

  async deleteAccount() {
    const response = await api.delete<{ message: string }>("/users/delete");
    return response.data;
  },
};
