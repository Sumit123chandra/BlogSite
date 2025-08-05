"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            BlogSite
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Your go-to source for articles on web dev, productivity, and lifestyle.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><FooterLink href="/about">About</FooterLink></li>
            <li><FooterLink href="/contact">Contact</FooterLink></li>
            <li><FooterLink href="/privacy-policy">Privacy Policy</FooterLink></li>
          </ul>
        </div>

        {/* Column 3: Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <SocialLink href="https://github.com/Sumit123chandra" icon={<Github size={20} />} />
            <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} />
            <SocialLink href="https://www.linkedin.com/in/sumit-chandra-925014258/" icon={<Linkedin size={20} />} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} BlogSite. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, icon }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
    >
      {icon}
    </Link>
  );
}
