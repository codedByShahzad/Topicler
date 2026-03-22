"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BLOGS } from "@/src/lib/blog";

type NavLink = {
  label: string;
  href: string;
  dropdown?: {
    label: string;
    href: string;
  }[];
};

const baseNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function slugifyCategory(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const [desktopSearch, setDesktopSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(BLOGS.map((blog) => blog.category).filter(Boolean))
    );

    return uniqueCategories.map((category) => ({
      label: category,
      href: `/categories/${slugifyCategory(category)}`,
    }));
  }, []);

  const navLinks: NavLink[] = [
    baseNavLinks[0],
    baseNavLinks[1],
    {
      label: "Categories",
      href: "#",
      dropdown: categories,
    },
    baseNavLinks[2],
    baseNavLinks[3],
  ];

  const filteredDesktopBlogs = useMemo(() => {
    const query = desktopSearch.trim().toLowerCase();
    if (!query) return [];

    return BLOGS.filter((blog) => {
      const title = blog.title?.toLowerCase() || "";
      const subtitle = blog.subtitle?.toLowerCase() || "";
      const category = blog.category?.toLowerCase() || "";

      return (
        title.includes(query) ||
        subtitle.includes(query) ||
        category.includes(query)
      );
    }).slice(0, 6);
  }, [desktopSearch]);

  const filteredMobileBlogs = useMemo(() => {
    const query = mobileSearch.trim().toLowerCase();
    if (!query) return [];

    return BLOGS.filter((blog) => {
      const title = blog.title?.toLowerCase() || "";
      const subtitle = blog.subtitle?.toLowerCase() || "";
      const category = blog.category?.toLowerCase() || "";

      return (
        title.includes(query) ||
        subtitle.includes(query) ||
        category.includes(query)
      );
    }).slice(0, 6);
  }, [mobileSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(target)
      ) {
        setDesktopSearchOpen(false);
      }

      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target)
      ) {
        setMobileSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDesktopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = desktopSearch.trim();
    if (!query) return;

    router.push(`/blog?search=${encodeURIComponent(query)}`);
    setDesktopSearchOpen(false);
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = mobileSearch.trim();
    if (!query) return;

    router.push(`/blog?search=${encodeURIComponent(query)}`);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="Topicler Logo"
            width={190}
            height={60}
            className="h-11 w-auto object-contain sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-[15px] font-medium text-[#0B1220] transition hover:text-[#FF5A14]"
                >
                  <span>{link.label}</span>
                  <ChevronDown size={16} />
                </button>

                <div className="invisible absolute left-0 top-full mt-3 w-60 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-[#0B1220] transition hover:bg-[#FFF4EE] hover:text-[#FF5A14]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[15px] font-medium transition ${
                  isActive(link.href)
                    ? "text-[#FF5A14]"
                    : "text-[#0B1220] hover:text-[#FF5A14]"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div
          ref={desktopSearchRef}
          className="relative hidden w-full max-w-[320px] lg:block"
        >
          <form onSubmit={handleDesktopSearchSubmit}>
            <div className="flex h-12 items-center rounded-full border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-[#FF5A14]">
              <Search size={18} className="mr-3 text-slate-400" />
              <input
                type="text"
                value={desktopSearch}
                onChange={(e) => {
                  setDesktopSearch(e.target.value);
                  setDesktopSearchOpen(true);
                }}
                onFocus={() => setDesktopSearchOpen(true)}
                placeholder="Search blogs..."
                className="w-full bg-transparent text-sm text-[#0B1220] outline-none placeholder:text-slate-400"
              />
            </div>
          </form>

          {desktopSearchOpen && desktopSearch.trim() && (
            <div className="absolute left-0 right-0 top-[calc(100%+12px)] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
              {filteredDesktopBlogs.length > 0 ? (
                <div className="space-y-1">
                  {filteredDesktopBlogs.map((blog) => (
                    <button
                      key={blog.slug}
                      type="button"
                      onClick={() => {
                        router.push(`/blog/${blog.slug}`);
                        setDesktopSearch("");
                        setDesktopSearchOpen(false);
                      }}
                      className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-[#FFF4EE]"
                    >
                      <p className="text-sm font-semibold text-[#0B1220]">
                        {blog.title}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#FF5A14]">
                        {blog.category}
                      </p>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      router.push(
                        `/blog?search=${encodeURIComponent(desktopSearch.trim())}`
                      );
                      setDesktopSearchOpen(false);
                    }}
                    className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#FF5A14] transition hover:bg-[#FFF4EE]"
                  >
                    View all results for “{desktopSearch.trim()}”
                  </button>
                </div>
              ) : (
                <div className="rounded-xl px-4 py-4 text-sm text-slate-500">
                  No blog found.
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#0B1220] transition hover:border-[#FF5A14] hover:text-[#FF5A14] lg:hidden"
          aria-label="Toggle Menu"
          type="button"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-4">
          <div ref={mobileSearchRef} className="relative mb-4">
            <form onSubmit={handleMobileSearchSubmit}>
              <div className="flex h-12 items-center rounded-full border border-slate-200 bg-white px-4 shadow-sm">
                <Search size={18} className="mr-3 text-slate-400" />
                <input
                  type="text"
                  value={mobileSearch}
                  onChange={(e) => {
                    setMobileSearch(e.target.value);
                    setMobileSearchOpen(true);
                  }}
                  onFocus={() => setMobileSearchOpen(true)}
                  placeholder="Search blogs..."
                  className="w-full bg-transparent text-sm text-[#0B1220] outline-none placeholder:text-slate-400"
                />
              </div>
            </form>

            {mobileSearchOpen && mobileSearch.trim() && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                {filteredMobileBlogs.length > 0 ? (
                  <div className="space-y-1">
                    {filteredMobileBlogs.map((blog) => (
                      <button
                        key={blog.slug}
                        type="button"
                        onClick={() => {
                          router.push(`/blog/${blog.slug}`);
                          setMobileSearch("");
                          setMobileMenuOpen(false);
                          setMobileSearchOpen(false);
                        }}
                        className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-[#FFF4EE]"
                      >
                        <p className="text-sm font-semibold text-[#0B1220]">
                          {blog.title}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#FF5A14]">
                          {blog.category}
                        </p>
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        router.push(
                          `/blog?search=${encodeURIComponent(mobileSearch.trim())}`
                        );
                        setMobileMenuOpen(false);
                        setMobileSearchOpen(false);
                      }}
                      className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#FF5A14] transition hover:bg-[#FFF4EE]"
                    >
                      View all results for “{mobileSearch.trim()}”
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl px-4 py-4 text-sm text-slate-500">
                    No blog found.
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="rounded-xl">
                  <button
                    onClick={() => setMobileDropdownOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-[#0B1220] transition hover:bg-[#FFF4EE] hover:text-[#FF5A14]"
                    type="button"
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={`transition ${
                        mobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileDropdownOpen
                        ? "max-h-[400px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-slate-200 pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-[#0B1220] transition hover:bg-[#FFF4EE] hover:text-[#FF5A14]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                    isActive(link.href)
                      ? "bg-[#FFF4EE] text-[#FF5A14]"
                      : "text-[#0B1220] hover:bg-[#FFF4EE] hover:text-[#FF5A14]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}