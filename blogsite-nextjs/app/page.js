// app/page.js
import BlogCard from "@/components/BlogCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://blogsite-fxsk.onrender.com";

function makeSafeList(posts = []) {
  return posts.map((p) => {
    const safe = {
      ...p,
      _id: p._id?.toString ? p._id.toString() : p._id,
      author:
        typeof p.author === "object"
          ? p.author.username ?? (p.author.toString ? p.author.toString() : null)
          : p.author,
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : p.createdAt,
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : p.updatedAt,
    };
    return JSON.parse(JSON.stringify(safe));
  });
}

async function fetchPostsFromApi() {
  const res = await fetch(`${API_URL}/api/posts`, { cache: "no-store" });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Fetch failed: ${res.status} ${txt}`);
  }
  const data = await res.json();
  return data;
}

export default async function Home() {
  let posts = [];
  try {
    posts = await fetchPostsFromApi();
  } catch (err) {
    console.error("Server fetchPosts error:", err);
    return (
      <main className="p-6 max-w-6xl mx-auto pt-20 relative z-10">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gradient mb-2">Latest Blogs</h1>
        </header>
        <p className="text-red-500">Error loading posts.</p>
      </main>
    );
  }

  const safePosts = makeSafeList(posts);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* Hero */}
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gradient mb-3">
          Latest Blogs
        </h1>
      </header>

      {/* Grid */}
      {!safePosts.length ? (
        <p className="text-slate-400">No posts found. Loading...</p>
      ) : (
        <section
          className="grid gap-6
                     grid-cols-1
                     sm:grid-cols-2
                     lg:grid-cols-2
                     auto-rows-fr"
        >
          {safePosts.map((post) => (
            <BlogCard key={post._id ?? post.slug} post={post} />
          ))}
        </section>
      )}
    </main>
  );
}
