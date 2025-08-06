import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticlesWrapper from "@/components/ParticlesWrapper";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";

/* metadata stays in the top-level export (Next uses it automatically) */
export const metadata = {
  metadataBase: new URL("https://blog-site-silk-nine.vercel.app"),
  title: {
    default: "BlogSite - Share Your Thoughts with the World",
    template: "%s | BlogSite",
  },
  description:
    "BlogSite is a modern blogging platform where you can share your stories, ideas, and knowledge with the world.",
  keywords: ["blog", "BlogSite", "write blogs", "modern blog platform", "share stories"],
  authors: [{ name: "BlogSite Team" }],
  verification: {
    google: "sk7ZhZv5-ohKb_A4t9CeVeE4WzTHgw7RsOc31OWIv68",
  },
  openGraph: {
    title: "BlogSite - Share Your Thoughts with the World",
    description:
      "A modern blogging platform where you can write, edit, and share blogs with the world.",
    url: "https://blog-site-silk-nine.vercel.app",
    siteName: "BlogSite",
    images: [
      {
        url: "/file.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogSite - Share Your Thoughts with the World",
    description:
      "A modern blogging platform where you can write, edit, and share blogs with the world.",
    images: ["/file.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/*
  IMPORTANT:
  - Replace the `blogPost` array below with either:
    a) a small representative hardcoded list (OK for few posts), OR
    b) server-side generated JSON-LD (recommended) — fetch your posts and build the JSON-LD.
  - The JSON-LD *must* match page content (title/url/images/dates).
*/

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "BlogSite",
  url: "https://blog-site-silk-nine.vercel.app/",
  description:
    "BlogSite is a modern blogging platform where you can share your stories, ideas, and knowledge with the world.",
  publisher: {
    "@type": "Organization",
    name: "BlogSite Team",
    logo: {
      "@type": "ImageObject",
      url: "https://blog-site-silk-nine.vercel.app/file.svg",
    },
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "Why Learning Web Development in 2025 is the Smartest Career Move",
      author: {
        "@type": "Person",
        name: "Sumit Chandra",
      },
      datePublished: "2025-08-04",
      image:
        "https://res.cloudinary.com/dvv10dtck/image/upload/v1754236092/BlogSite_Images/od9wxp3g6pjv2doj7muo.png",
      url: "https://blog-site-silk-nine.vercel.app/blog/688f84bcb9f2a6f1bc86e86f",
    },
    {
      "@type": "BlogPosting",
      headline: "How AI is Changing the Future of Work",
      author: {
        "@type": "Person",
        name: "Sumit Chandra",
      },
      datePublished: "2025-08-04",
      image:
        "https://res.cloudinary.com/dvv10dtck/image/upload/v1754236194/BlogSite_Images/zrlaztuwebyi6bzgnvx9.jpg",
      url: "https://blog-site-silk-nine.vercel.app/blog/688f8523b9f2a6f1bc86e873",
    },
    // add more if needed
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Place script in head so crawlers find it */}
      <head>
        <meta name="google-adsense-account" content="ca-pub-7164455649602046"></meta>
        {/* If you already use metadata (Next injects it), this head is additive */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      </head>

      <body className="bg-slate-900 text-white min-h-screen">
        <AuthProvider>
          <ParticlesWrapper />
          <div className="relative z-10 min-h-screen">
            <Navbar />
            <div className="pt-20">
              <main>{children}</main>
            </div>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
