"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ username, email, password });
      // register() already redirects on success in your AuthProvider
    } catch (err) {
      if (err?.response) {
        alert(err.response.data?.message || "Unknown server error");
      } else {
        alert("Network error: " + (err.message || "Unknown"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-1 bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Particles behind card */}
      <ParticlesBackground />

      <main className="relative z-10 w-full max-w-md">
        <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-white">
            Create an account
          </h1>

          <form onSubmit={submit} className="space-y-4">
            <label className="sr-only" htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg transition duration-200"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-300 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
