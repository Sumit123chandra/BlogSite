"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/clientApi";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

// safer base64url decode
function decodeBase64Url(str) {
  try {
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    // pad with "=" if necessary
    const pad = b64.length % 4;
    const padded = pad ? b64 + "=".repeat(4 - pad) : b64;
    return atob(padded);
  } catch {
    return null;
  }
}

function safeJwtDecode(token) {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    const json = decodeBase64Url(payload);
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setUser(null);
      return;
    }

    (async () => {
      // try /api/auth/me first; fallback to token decode
      try {
        const res = await api.get("/api/auth/me");
        // normalize user object
        const payload = res.data?.user ?? res.data;
        setUser({
          id: payload?.id ?? payload?._id ?? payload?.userId ?? null,
          username: payload?.username ?? payload?.name ?? null,
          email: payload?.email ?? null,
        });
      } catch {
        const decoded = safeJwtDecode(token);
        const id = decoded?.userId ?? decoded?.sub ?? decoded?.id ?? null;
        setUser({
          id,
          username: decoded?.username ?? decoded?.name ?? null,
          email: decoded?.email ?? null,
        });
      }
    })();
  }, []);

  async function login(email, password) {
    const res = await api.post("/api/auth/login", { email, password });
    const token = res.data?.token ?? res.data?.accessToken ?? null;
    if (token) {
      localStorage.setItem("token", token);
      // set header for future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const me = await api.get("/api/auth/me");
        const payload = me.data?.user ?? me.data;
        setUser({
          id: payload?.id ?? payload?._id ?? payload?.userId ?? null,
          username: payload?.username ?? payload?.name ?? null,
          email: payload?.email ?? null,
        });
      } catch {
        const decoded = safeJwtDecode(token);
        setUser({
          id: decoded?.userId ?? decoded?.sub ?? decoded?.id ?? null,
          username: decoded?.username ?? decoded?.name ?? null,
          email: decoded?.email ?? null,
        });
      }

      router.push("/");
      return;
    }

    // fallback when API returns user directly
    const maybeUser = res.data?.user ?? res.data;
    setUser(maybeUser ?? null);
    router.push("/");
  }

  function logout() {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    router.push("/");
  }

  async function register(payload) {
    const res = await api.post("/api/auth/register", payload);
    const token = res.data?.token ?? res.data?.accessToken ?? null;
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const me = await api.get("/api/auth/me");
        const payload = me.data?.user ?? me.data;
        setUser({
          id: payload?.id ?? payload?._id ?? payload?.userId ?? null,
          username: payload?.username ?? payload?.name ?? null,
          email: payload?.email ?? null,
        });
      } catch {
        const decoded = safeJwtDecode(token);
        setUser({
          id: payload?._id ?? payload?.id ?? payload?.userId ?? null,
          username: payload?.username ?? payload?.name ?? null,
          email: payload?.email ?? null,
        });

      }

      router.push("/");
      return;
    }

    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined || ctx === null) {
    // helpful error for devs if AuthProvider isn't mounted
    throw new Error("useAuth must be used within an <AuthProvider>. Wrap your app with <AuthProvider>.");
  }
  return ctx;
}
