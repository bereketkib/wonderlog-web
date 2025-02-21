"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { commentsService } from "@/services/comments";
import { postsService } from "@/services/posts";
import { userService } from "@/services/user";
import { z } from "zod";
import type { UserComment } from "@/services/comments";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TabNavigation from "@/components/profile/TabNavigation";
import CommentsList from "@/components/profile/CommentsList";
import PostsTab from "@/components/profile/PostsTab";
import SettingsTab from "@/components/profile/SettingsTab";
import TermsModal from "@/components/profile/TermsModal";

const passwordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [upgrading, setUpgrading] = useState(false);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"comments" | "posts" | "settings">(
    "comments"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [commentsData, countData] = await Promise.all([
          commentsService.getUserComments(),
          postsService.getMyPostCount(),
        ]);
        setComments(commentsData);
        setPostCount(Number(countData));
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleUpgrade = async () => {
    try {
      setUpgrading(true);
      const response = await userService.upgradeUser();
      updateUser(response.user);
      setShowTermsModal(false);
    } catch (error) {
      console.error("Failed to upgrade account:", error);
    } finally {
      setUpgrading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalError("");
    setModalSuccess("");

    const formData = new FormData(e.currentTarget);
    const data = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmNewPassword: formData.get("confirmNewPassword") as string,
    };

    try {
      passwordSchema.parse(data);
      await userService.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      setModalSuccess("Password updated successfully");
      setTimeout(() => {
        setShowPasswordModal(false);
        setModalSuccess("");
      }, 2000);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setModalError(error.errors[0].message);
      } else {
        setModalError(
          error.response?.data?.message || "Failed to update password"
        );
      }
    }
  };

  const validatePasswordField = (
    name: string,
    value: string,
    form: HTMLFormElement
  ) => {
    try {
      if (name === "confirmNewPassword") {
        const newPassword = form.querySelector(
          '[name="newPassword"]'
        ) as HTMLInputElement;
        if (newPassword.value !== value) {
          setModalError("Passwords do not match");
          return;
        }
      }

      if (name === "newPassword") {
        const newPasswordSchema = passwordSchema._def.schema.shape.newPassword;
        newPasswordSchema.parse(value);
      }

      setModalError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setModalError(error.errors[0].message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteAccount();
      router.push("/login");
    } catch (error: any) {
      setModalError(
        error.response?.data?.message || "Failed to delete account"
      );
    }
  };

  if (!user) return null;

  const tabs = [
    { id: "comments" as const, label: "Comments", count: comments.length },
    { id: "posts" as const, label: "Posts", count: postCount },
    { id: "settings" as const, label: "Settings" },
  ];

  return (
    <div className="relative min-h-screen py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-3/4 -right-64 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 px-4">
        <ProfileHeader
          user={user}
          comments={comments.length}
          postCount={postCount}
          upgrading={upgrading}
          onUpgrade={handleUpgrade}
          onShowTerms={() => setShowTermsModal(true)}
        />

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="min-h-[300px]">
          {activeTab === "comments" && (
            <CommentsList comments={comments} loading={loading} error={error} />
          )}

          {activeTab === "posts" && (
            <PostsTab postCount={postCount} userRole={user.role} />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              modalError={modalError}
              modalSuccess={modalSuccess}
              onPasswordChange={handlePasswordChange}
              onPasswordFieldChange={validatePasswordField}
              onShowPasswordModal={() => setShowPasswordModal(true)}
              onShowDeleteModal={() => setShowDeleteModal(true)}
              showPasswordModal={showPasswordModal}
              showDeleteModal={showDeleteModal}
              onClosePasswordModal={() => {
                setShowPasswordModal(false);
                setModalError("");
              }}
              onCloseDeleteModal={() => setShowDeleteModal(false)}
              onDeleteAccount={handleDeleteAccount}
            />
          )}
        </div>
      </div>

      <TermsModal
        show={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onUpgrade={handleUpgrade}
        upgrading={upgrading}
      />
    </div>
  );
}
