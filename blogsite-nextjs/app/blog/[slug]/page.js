// app/blog/[slug]/page.js
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import PostActionsWrapper from "@/components/PostActionsWrapper"; // client wrapper

import api from "@/lib/clientApi";

export async function generateMetadata({ params }) {
  try {
    const res = await api.get(`/api/posts/${params.slug}`);
    const post = res.data;

    return {
      title: `${post.title} | BlogSite`,
      description: post.content.slice(0, 150) + "...",
      openGraph: {
        title: post.title,
        description: post.content.slice(0, 150) + "...",
        url: `https://blog-site-silk-nine.vercel.app/blog/${params.slug}`,
        siteName: "BlogSite",
        images: [
          {
            url: post.image || "/file.svg", // fallback image
            width: 800,
            height: 600,
          },
        ],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.content.slice(0, 150) + "...",
        images: [post.image || "/file.svg"],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post | BlogSite",
      description: "Read amazing blog posts on BlogSite.",
    };
  }
}


export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db("blogsite");

  const posts = await db
    .collection("posts")
    .find({}, { projection: { slug: 1 } })
    .toArray();

  return posts.map((p) => {
    const slugOrId = p.slug ?? (p._id ? p._id.toString() : "");
    return { slug: slugOrId };
  });
}

function makeSafe(doc) {
  if (!doc) return null;
  const safe = JSON.parse(JSON.stringify(doc));
  safe._id = doc._id?.toString ? doc._id.toString() : safe._id;
  if (doc.author && typeof doc.author === "object" && doc.author.toString) {
    safe.author = doc.author.toString();
  }
  if (doc.createdAt && doc.createdAt.toISOString) safe.createdAt = doc.createdAt.toISOString();
  if (doc.updatedAt && doc.updatedAt.toISOString) safe.updatedAt = doc.updatedAt.toISOString();
  return safe;
}

export default async function BlogPost(props) {
  const { params } = props;
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const slug = resolvedParams?.slug;

  const client = await clientPromise;
  const db = client.db("blogsite");

  let post = null;
  if (slug) {
    post = await db.collection("posts").findOne({ slug });
  }

  if (!post && slug && /^[0-9a-fA-F]{24}$/.test(slug)) {
    try {
      post = await db.collection("posts").findOne({ _id: new ObjectId(slug) });
    } catch {}
  }

  if (!post) return <div className="p-6">Post not found.</div>;

  const safePost = makeSafe(post);

  // resolve author display name
  let authorName = "Unknown";
  if (post.author && typeof post.author === "object" && post.author.username) {
    authorName = post.author.username;
  } else if (safePost.author) {
    try {
      const authorDoc = await db
        .collection("users")
        .findOne({ _id: new ObjectId(safePost.author) }, { projection: { username: 1 } });
      if (authorDoc?.username) authorName = authorDoc.username;
      else authorName = safePost.author;
    } catch {
      authorName = safePost.author;
    }
  }

  const createdDate = safePost.createdAt ? new Date(safePost.createdAt).toLocaleString() : "";

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <article className="relative z-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 glass-inner shadow-2xl">
        {safePost.image && (
          <div className="w-full h-72 relative rounded-lg overflow-hidden mb-6 animate-fadeInUp">
            <Image
              src={safePost.image}
              alt={safePost.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        <header className="mb-4 animate-fadeInUp">
          <h1 className="text-4xl font-extrabold mb-2 text-gradient">{safePost.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span>
              By <span className="text-white font-medium">{authorName}</span>
            </span>
            <span>•</span>
            <time className="text-slate-400">{createdDate}</time>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-lg whitespace-pre-line animate-fadeInUp">
          {safePost.content}
        </div>

        {/* client-side actions: we pass plain strings only */}
        <div className="mt-6 animate-fadeInUp">
          <PostActionsWrapper postId={safePost._id} authorId={safePost.author} />
        </div>
      </article>
    </main>
  );
}
