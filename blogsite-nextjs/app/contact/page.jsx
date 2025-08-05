"use client";

import { useState } from "react";

export const metadata = {
  title: "Contact — BlogSite",
  description: "Contact BlogSite — get in touch with us for feedback or support.",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", form);
    setStatus("Message sent!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">📩 Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your message..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Send Message
          </button>
        </form>

        {status && (
          <div className="mt-4 text-center text-green-300">
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
