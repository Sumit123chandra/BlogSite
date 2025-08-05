"use client";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  let user;
  let logout;

  try {
    const auth = useAuth();
    user = auth.user;
    logout = auth.logout;
  } catch (err) {
    user = null;
    logout = null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-2 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          BlogSite
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-white font-medium font-serif">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/privacy-policy">Privacy</NavLink>

          {user === undefined ? (
            <span className="animate-pulse text-gray-300">Loading...</span>
          ) : user ? (
            <>
              <Link
                href="/create"
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all shadow-md"
              >
                ✏ Create
              </Link>

              <button
                onClick={() => logout?.()}
                className="px-4 py-1.5 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors shadow-md"
              >
                Logout
              </button>

              <span className="ml-1 text-sm text-gray-200">
                Hi,{" "}
                <span className="font-semibold text-white">
                  {user.username ?? user.name ?? "You"}
                </span>
              </span>
            </>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

/* Reusable Nav Link with hover underline animation */
function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative px-1 py-0.5 group"
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
