import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Categories", href: "/categories/technology" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  categories: [
    { label: "Politics", href: "/categories/politics" },
    { label: "Finance", href: "/categories/finance" },
    { label: "Science", href: "/categories/science" },
    { label: "Sport", href: "/categories/sport" },
  ],
  support: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#fffaf7]">
      <div className="mx-auto max-w-[100rem] px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="Topicler Logo"
                width={180}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-slate-600">
              Topicler brings together modern blogs across politics, finance,
              science, sport, and more — designed to be clean, readable, and
              useful.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-[#FF5A14] hover:text-[#FF5A14]"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-[#0B1220]">Company</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-slate-600 transition hover:text-[#FF5A14]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-[#0B1220]">Categories</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-slate-600 transition hover:text-[#FF5A14]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Support */}
          <div>
            <h3 className="text-lg font-bold text-[#0B1220]">Contact</h3>

            <div className="mt-5 space-y-4 text-[15px] text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-[#FF5A14]" />
                <span>hello@topicler.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-[#FF5A14]" />
                <span>+1 (000) 123-4567</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-[#FF5A14]" />
                <span>New York, United States</span>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-slate-600 transition hover:text-[#FF5A14]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Topicler. All rights reserved.</p>
          <p>
            Designed with <span className="text-[#FF5A14]">clarity</span> and{" "}
            <span className="text-[#FF5A14]">modern editorial style</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;