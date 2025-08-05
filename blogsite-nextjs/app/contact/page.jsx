"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded bg-white/20 text-white"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white/20 text-white"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="w-full p-3 rounded bg-white/20 text-white"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
