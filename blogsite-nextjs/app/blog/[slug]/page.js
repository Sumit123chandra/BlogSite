// app/blog/[slug]/page.js
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import PostActionsWrapper from "@/components/PostActionsWrapper"; // client wrapper

// NOTE: we intentionally do NOT import next/head because this is a server component
// and we're injecting JSON-LD directly.

export async function generateMetadata({ params }) {
  // Unwrap params (Next 15+)
  const p = await params;
  const slug = p?.slug;

  // server-safe backend base
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://blogsite-fxsk.onrender.com";

  if (!slug) {
    return {
      title: "Blog Post | BlogSite",
      description: "Read amazing blog posts on BlogSite.",
    };
  }

  try {
    const res = await fetch(`${API_BASE}/api/posts/${encodeURIComponent(slug)}`, {
      // server fetch; no credentials needed for public content
      next: { revalidate: 60 }, // optional: revalidate metadata every 60s
    });

    if (!res.ok) throw new Error("Failed to fetch post metadata");

    const post = await res.json();

    const excerpt = (post.content || "").slice(0, 150) + (post.content?.length > 150 ? "..." : "");

    return {
      title: `${post.title} | BlogSite`,
      description: excerpt,
      openGraph: {
        title: post.title,
        description: excerpt,
        url: `https://blog-site-silk-nine.vercel.app/blog/${slug}`,
        siteName: "BlogSite",
        images: [
          {
            url: post.image || "/file.svg",
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
        description: excerpt,
        images: [post.image || "/file.svg"],
      },
    };
  } catch (err) {
    // fallback metadata
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
  const isoPublished = safePost.createdAt ?? new Date().toISOString();
  const isoModified = safePost.updatedAt ?? safePost.createdAt ?? new Date().toISOString();
  const postUrl = `https://blog-site-silk-nine.vercel.app/blog/${safePost.slug ?? safePost._id}`;

  // JSON-LD structured data for the article (server-rendered)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: safePost.title,
    description: (safePost.content || "").slice(0, 150) + (safePost.content?.length > 150 ? "..." : ""),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "BlogSite",
      logo: {
        "@type": "ImageObject",
        url: "https://blog-site-silk-nine.vercel.app/file.svg",
      },
    },
    datePublished: isoPublished,
    dateModified: isoModified,
    image: safePost.image || "https://blog-site-silk-nine.vercel.app/file.svg",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      {/* JSON-LD structured data for the article (server-rendered) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

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
