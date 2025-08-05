"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import api from "@/lib/clientApi";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function EditPost({ params }) {
  // unwrap params (params is a Promise in Next 15 app router client components)
  const { id } = use(params);

  const { user } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // wait until user is known (undefined = loading)
    if (user === undefined) return;

    // if not logged in, redirect
    if (!user) {
      router.push("/login");
      return;
    }

    // fetch post only when id exists
    if (!id) return;

    async function fetchPost() {
      try {
        const res = await api.get(`/api/posts/${id}`);
        setPost(res.data);
        setTitle(res.data.title ?? "");
        setContent(res.data.content ?? "");
      } catch (err) {
        console.error("Fetch post failed:", err);
        alert("Failed to fetch post");
      }
    }
    fetchPost();
  }, [user, id, router]);

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/api/posts/${id}`, { title, content });
      router.push(`/blog/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  if (user === undefined || !post) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-10">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
            ✏️ Edit Your Blog Post
          </h1>
          <form onSubmit={handleUpdate} className="space-y-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title..."
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Update your content..."
              rows={8}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-bold shadow-lg transition duration-300 ease-in-out"
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
