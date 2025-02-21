"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters")
      .max(100, "Email cannot exceed 100 characters"),
    password: z
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // First, define the base schema without refine
  const baseSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters")
      .max(100, "Email cannot exceed 100 characters"),
    password: z
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
    confirmPassword: z.string(),
  });

  // Then create the full schema with refine
  const registerSchema = baseSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

  const validateField = (name: string, value: string) => {
    try {
      if (name === "confirmPassword") {
        const formData = new FormData(
          document.querySelector("form") as HTMLFormElement
        );
        const password = formData.get("password") as string;
        if (password !== value) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
          return;
        }
      }

      // Fix: Use type-safe field names
      const fieldName = name as keyof typeof baseSchema.shape;
      baseSchema.shape[fieldName].parse(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    try {
      registerSchema.parse(data);
      await register(data.name, data.email, data.password);
      router.push("/");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      } else if (err instanceof Error) {
        setErrors({ form: err.message });
      } else {
        setErrors({ form: "Failed to create account" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex flex-row-reverse">
      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="relative max-w-lg">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl" />
          <img
            src="/images/register.svg"
            alt="Register illustration"
            className="w-full dark:opacity-80 drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
          />
          <div className="text-center mt-12 space-y-4 relative">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Join Wonderlog Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start your writing journey with us
            </p>
          </div>
        </div>
      </div>

      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-block p-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl mb-2">
              <span role="img" aria-label="sparkles" className="text-2xl">
                ✨
              </span>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join the Wonderlog community
            </p>
          </div>

          {errors.form && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <span role="img" aria-label="error" className="text-lg">
                ⚠️
              </span>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <Input
              label="Full Name"
              name="name"
              type="text"
              required
              autoComplete="name"
              error={errors.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={errors.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              required
              error={errors.password}
              onChange={handleChange}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              error={errors.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
