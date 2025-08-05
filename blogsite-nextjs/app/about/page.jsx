// app/about/page.jsx
export const metadata = {
  title: "About — BlogSite",
  description: "About BlogSite — who we are and what we publish.",
};

export default function AboutPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About BlogSite</h1>
      <p className="text-lg leading-relaxed">
        Welcome to BlogSite — a place where we publish articles about web development, productivity,
        travel, and healthy living. Our mission is to share useful, original content that helps readers
        learn and grow.
      </p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">What we publish</h2>
        <ul className="list-disc pl-6">
          <li>Guides, tutorials and practical articles</li>
          <li>Opinion pieces and personal experiences</li>
          <li>Health, habits and productivity write-ups</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Why trust us</h2>
        <p className="leading-relaxed">
          All articles are original and created by our authors. If you need to contact us about content,
          corrections, or partnerships, visit the Contact page.
        </p>
      </section>
    </main>
  );
}
