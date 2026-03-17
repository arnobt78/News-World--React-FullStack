import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-9xl mx-auto w-full">
        <PageHeader />
        <main className="py-12 max-w-3xl">
          <h1 className="font-playfair text-4xl sm:text-5xl text-white tracking-wider mb-8">
            About This Project
          </h1>
          <div className="space-y-6 font-outfit text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
            <p>
              This is an educational news world app built with Next.js, React,
              and the GNews API. It demonstrates modern web development patterns
              for beginners.
            </p>
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-white mt-8 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>
                Top headlines by category (general, world, technology, etc.)
              </li>
              <li>Keyword search across 80,000+ news sources</li>
              <li>Country and language filters</li>
              <li>Server-side rendering for fast initial load</li>
              <li>Client-side fetching for category switching</li>
              <li>Responsive layout with Tailwind CSS</li>
              <li>Framer Motion animations</li>
            </ul>
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-white mt-8 mb-4">
              Tech Stack
            </h2>
            <p className="text-white/80">
              Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion,
              Context API, and the GNews REST API.
            </p>
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-white mt-8 mb-4">
              GNews API
            </h2>
            <p className="text-white/80">
              Powered by{" "}
              <a
                href="https://gnews.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b88efc] hover:underline"
              >
                GNews API
              </a>
              , which provides access to real-time news and top headlines from
              Google News rankings. The API supports search, filtering by
              language and country, and pagination.
            </p>
            <div className="pt-8">
              <Link
                href="/"
                className="inline-block py-3 px-6 bg-white/20 hover:bg-white/30 rounded-xl text-white font-outfit transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
