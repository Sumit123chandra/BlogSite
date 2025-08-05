// components/BlogCard.js
"use client";
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  const id = post._id ?? post.slug ?? Math.random().toString(36).slice(2);
  const authorName =
    typeof post.author === "string"
      ? post.author
      : post.author?.username ?? "Unknown";

  return (
    <article className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
      {post.image && (
        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4 group">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
        </div>
      )}

      <h2 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
        {post.title}
      </h2>

      <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
        {post.content?.slice(0, 220)}
        {post.content?.length > 220 ? "..." : ""}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>By {authorName}</span>
        <Link
          href={`/blog/${post.slug ?? id}`}
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-colors duration-300"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
