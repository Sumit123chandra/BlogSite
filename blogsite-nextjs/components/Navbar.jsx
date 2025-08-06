"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // for hamburger & close icons
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          BlogSite
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium font-serif">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/privacy">Privacy</NavLink>

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

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/20">
          <nav className="flex flex-col items-center gap-4 py-4 text-white font-medium font-serif">
            <NavLink href="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink href="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink href="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
            <NavLink href="/privacy" onClick={() => setMenuOpen(false)}>Privacy</NavLink>

            {user === undefined ? (
              <span className="animate-pulse text-gray-300">Loading...</span>
            ) : user ? (
              <>
                <Link
                  href="/create"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  ✏ Create
                </Link>

                <button
                  onClick={() => {
                    logout?.();
                    setMenuOpen(false);
                  }}
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
                <NavLink href="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink href="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/* Reusable Nav Link */
function NavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative px-1 py-0.5 group"
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
