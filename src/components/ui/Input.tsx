"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        className={`w-full px-4 py-3 rounded-xl border ${
          error
            ? "border-red-500 dark:border-red-400"
            : "border-gray-200 dark:border-gray-700"
        } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-all`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
