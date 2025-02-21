import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  ListBulletIcon,
  NumberedListIcon,
} from "@heroicons/react/24/outline";

interface CommentEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onReset?: () => void;
}

export default function CommentEditor({
  content,
  onChange,
  placeholder,
  onReset,
}: CommentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {},
        orderedList: {},
        heading: false,
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write a comment...",
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-purple-600 dark:text-purple-400 hover:underline",
        },
      }),
    ],
    content: content,
    editable: true,
    autofocus: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[60px] px-4 [&>p]:my-0 [&>p:first-child]:mt-4 [&>p:last-child]:mb-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
      <EditorContent
        editor={editor}
        className="border border-gray-400/10 bg-gray-200/40 dark:bg-gray-700/20 rounded-lg"
      />
      <div className="flex gap-2 p-2 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded ${
            editor?.isActive("bold")
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <BoldIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded ${
            editor?.isActive("italic")
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <ItalicIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded ${
            editor?.isActive("strike")
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <StrikethroughIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded ${
            editor?.isActive("bulletList")
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <ListBulletIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded ${
            editor?.isActive("orderedList")
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <NumberedListIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
