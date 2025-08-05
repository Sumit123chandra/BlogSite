// app/contact/page.jsx
"use client";

import { useState } from "react";

export const metadata = {
  title: "Contact — BlogSite",
  description: "Contact BlogSite — get in touch with the team for feedback, partnerships or support.",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Demo behavior — replace with API call if you have one
    console.log("Contact form submitted:", form);
    setStatus("Thanks — your message was sent (demo).");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">📩 Contact Us</h1>

        <p className="mb-6 text-center text-gray-300">
          Have questions or feedback? Email us at{" "}
          <a href="mailto:contact@blogsite.com" className="text-blue-400 hover:underline">
            chandra78.sumit1@gmail.com
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400 focus:outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400 focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your message..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
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
