import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticlesWrapper from "@/components/ParticlesWrapper";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";

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

  // ✅ Google Search Console verification
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
        url: "/file.svg", // replace with logo/banner if you want
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
