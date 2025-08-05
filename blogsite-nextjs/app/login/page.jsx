"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      alert(err.response?.data?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    // parent must be relative so Particles can be absolutely positioned
    <div className="relative min-h-3 mx-96 flex items-center justify-center bg-slate-900">
      {/* Particles (absolute, behind) */}
      <ParticlesBackground />

      {/* login card */}
      <main className="relative z-10 w-full max-w-md p-8">
        <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold text-center mb-6 text-white text-gradient">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-300 mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-300 hover:underline">
              Register
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
