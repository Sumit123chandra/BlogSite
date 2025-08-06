// app/blog/[slug]/page.js
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import PostActionsWrapper from "@/components/PostActionsWrapper";
import { Metadata } from "next";

export async function generateMetadata({ params }) {
  const p = await params;
  const slug = p?.slug;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://blogsite-fxsk.onrender.com";

  if (!slug) {
    return {
      title: "Blog Post | BlogSite",
      description: "Read amazing blog posts on BlogSite.",
    };
  }

  try {
    const res = await fetch(`${API_BASE}/api/posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch post metadata");

    const post = await res.json();
    const excerpt = (post.content || "").slice(0, 150) + (post.content?.length > 150 ? "..." : "");
    const url = `https://blog-site-silk-nine.vercel.app/blog/${slug}`;

    return {
      title: `${post.title} | BlogSite`,
      description: excerpt,
      openGraph: {
        title: post.title,
        description: excerpt,
        url,
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
  } catch {
    return {
      title: "Blog Post | BlogSite",
      description: "Read amazing blog posts on BlogSite.",
    };
  }
}

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db("blogsite");

  const posts = await db.collection("posts").find({}, { projection: { slug: 1 } }).toArray();

  return posts.map((p) => ({
    slug: p.slug ?? p._id.toString(),
  }));
}

function makeSafe(doc) {
  if (!doc) return null;
  const safe = JSON.parse(JSON.stringify(doc));
  safe._id = doc._id?.toString?.() ?? safe._id;
  safe.author = doc.author?.toString?.() ?? safe.author;
  safe.createdAt = doc.createdAt?.toISOString?.() ?? safe.createdAt;
  safe.updatedAt = doc.updatedAt?.toISOString?.() ?? safe.updatedAt;
  return safe;
}

export default async function BlogPost({ params }) {
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const slug = resolvedParams?.slug;

  const client = await clientPromise;
  const db = client.db("blogsite");

  let post =
    (await db.collection("posts").findOne({ slug })) ||
    (/^[0-9a-fA-F]{24}$/.test(slug)
      ? await db.collection("posts").findOne({ _id: new ObjectId(slug) })
      : null);

  if (!post) return <div className="p-6">Post not found.</div>;

  const safePost = makeSafe(post);

  // Resolve author display name
  let authorName = "Unknown";
  if (post.author && typeof post.author === "object" && post.author.username) {
    authorName = post.author.username;
  } else if (safePost.author) {
    try {
      const authorDoc = await db
        .collection("users")
        .findOne({ _id: new ObjectId(safePost.author) }, { projection: { username: 1 } });
      authorName = authorDoc?.username ?? safePost.author;
    } catch {
      authorName = safePost.author;
    }
  }

  const createdDate = safePost.createdAt
    ? new Date(safePost.createdAt).toLocaleString()
    : "";
  const isoPublished = safePost.createdAt ?? new Date().toISOString();
  const isoModified = safePost.updatedAt ?? safePost.createdAt ?? new Date().toISOString();
  const postUrl = `https://blog-site-silk-nine.vercel.app/blog/${safePost.slug ?? safePost._id}`;
  const excerpt =
    (safePost.content || "").slice(0, 150) +
    (safePost.content?.length > 150 ? "..." : "");

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: safePost.title,
    description: excerpt,
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
      {/* OpenGraph + Twitter Meta Tags */}
      <head>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={safePost.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={safePost.image || "https://blog-site-silk-nine.vercel.app/file.svg"} />
        <meta property="og:url" content={postUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={safePost.title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={safePost.image || "https://blog-site-silk-nine.vercel.app/file.svg"} />
      </head>

      {/* JSON-LD for Rich Results */}
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

        <div className="mt-6 animate-fadeInUp">
          <PostActionsWrapper postId={safePost._id} authorId={safePost.author} />
        </div>
      </article>
    </main>
  );
}
