import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticlesWrapper from "@/components/ParticlesWrapper";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog",
  description: "My blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">
        {/* Put client components inside: AuthProvider is a client component */}
        <AuthProvider>
          <ParticlesWrapper />
          <div className="relative z-10 min-h-screen">
            <Navbar />
            <div className="pt-20"><main>{children}</main></div>
          </div>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
