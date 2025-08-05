"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import api from "@/lib/clientApi";
import { useRouter } from "next/navigation";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function CreatePost() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  async function uploadToCloudinary(file) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", preset);
    const res = await fetch(url, { method: "POST", body: fd });
    const data = await res.json();
    if (!data.secure_url) throw new Error("Cloudinary upload failed");
    return data.secure_url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }
      const body = { title, content, image: imageUrl };
      const res = await api.post("/api/posts", body);
      const created = res.data;
      const slugOrId = created.slug ?? created._id;
      router.push(`/blog/${slugOrId}`);
    } catch (err) {
      console.error(err);
      alert("Create post failed");
    } finally {
      setLoading(false);
    }
  }

  if (user === undefined) return <p>Loading...</p>;
  if (!user) return <p>Redirecting...</p>;

  return (
    <>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
            ✨ Create a New Blog Post
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              rows={6}
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              className="text-white rounded-md"
            />
            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-bold shadow-lg transition duration-300 ease-in-out"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
