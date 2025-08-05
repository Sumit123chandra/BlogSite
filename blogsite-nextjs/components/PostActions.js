// components/PostActions.jsx
"use client";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import api from "@/lib/clientApi";

export default function PostActions({ postId, authorId }) {
  const { user } = useAuth(); // user must be { id: "...", ... }
  const router = useRouter();

  // Make sure both sides are strings for the comparison
  const currentUserId = user?.id ?? (user?.userId ?? user?._id ?? null);
  const authorIdStr = authorId ? String(authorId) : null;

  if (!currentUserId || !authorIdStr) return null;
  if (String(currentUserId) !== authorIdStr) return null;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/api/posts/${postId}`);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={() => router.push(`/edit/${postId}`)}
        className="text-blue-400 hover:underline"
      >
        Edit Post
      </button>

      <button onClick={handleDelete} className="text-red-400 hover:underline">
        Delete Post
      </button>
    </div>
  );
}
