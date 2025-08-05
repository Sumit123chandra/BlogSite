// app/contact/page.jsx
export const metadata = {
  title: "Contact — BlogSite",
  description: "Contact BlogSite — get in touch with the team for feedback, partnerships or support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">📩 Contact Us</h1>
        <p className="mb-6 text-center text-gray-300">
          Have questions or feedback? Email us at{" "}
          <a href="mailto:contact@blogsite.com" className="text-blue-400 hover:underline">
            contact@blogsite.com
          </a>
          , or use the form below.
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks — message sent (demo). Replace with server API to send real mail.");
          }}
        >
          <input
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400 focus:outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-400 focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your message..."
            rows="5"
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
      </div>
    </main>
  );
}
