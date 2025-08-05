// app/privacy/page.jsx
export const metadata = {
  title: "Privacy Policy — BlogSite",
  description: "Privacy policy for BlogSite — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">🔒 Privacy Policy</h1>

        <p className="mb-4">
          At <strong>BlogSite</strong>, we respect your privacy. This policy explains how we collect
          and use data when you visit and interact with the site.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
        <p>
          We may collect information you provide directly (e.g., contact form), and non-personal
          data (analytics, cookies) to improve the site.
        </p>

        <h2 className="text-2xl font-semibold mt-6">How We Use Information</h2>
        <p>
          We use information to respond to inquiries, improve content, and maintain the service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Third-Party Services</h2>
        <p>
          We may use third-party services (hosting, analytics, ads) that have their own privacy
          policies. We recommend reviewing those services for details.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:contact@blogsite.com" className="text-blue-400 hover:underline">
            contact@blogsite.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
