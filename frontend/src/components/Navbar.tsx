"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BLOGS } from "@/src/lib/blog";

type NavLink = {
  label: string;
  href: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSearch, setDesktopSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  const navLinks: NavLink[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Connect", href: "/contact" },
    ],
    []
  );

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

      if (mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setMobileSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
  if (href === "/") {
    return (
      pathname === "/" ||
      pathname === "/tools/random-topic-generator" ||
      pathname.startsWith("/tools/random-topic-generator/")
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

  return (
    <header className="sticky top-2 z-50 w-full bg-white px-3 pb-2 pt-[3px] sm:px-5 lg:px-6 xl:px-8">
      <div className="relative mx-auto max-w-[1440px]">
        {/* Floating pill */}
        <div className="flex items-center justify-between gap-4 rounded-full border border-slate-200/80 bg-white px-4 py-2 shadow-[0_6px_24px_-14px_rgba(11,18,32,0.35)] sm:px-5 lg:px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt="Topicler Logo"
              width={190}
              height={60}
              className="h-9 w-auto object-contain sm:h-10 xl:h-11"
              priority
            />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <nav className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-200 xl:px-4 xl:text-[15px] ${
                      active
                        ? "bg-[#FFF1E8] text-[#FF5A14]"
                        : "text-[#0B1220] hover:bg-[#FFF4EE] hover:text-[#FF5A14]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div
            ref={desktopSearchRef}
            className="relative hidden w-full max-w-[240px] lg:block xl:max-w-[290px]"
          >
            <form onSubmit={handleDesktopSearchSubmit}>
              <div className="flex h-12 items-center rounded-full border border-slate-200 bg-[#FFF4EE] px-5 shadow-sm transition duration-300 focus-within:border-[#FF5A14] focus-within:bg-white focus-within:shadow-md">
                <Search size={18} className="mr-3 shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={desktopSearch}
                  onChange={(e) => {
                    setDesktopSearch(e.target.value);
                    setDesktopSearchOpen(true);
                  }}
                  onFocus={() => setDesktopSearchOpen(true)}
                  placeholder="Search blogs..."
                  className="w-full min-w-0 bg-transparent text-sm text-[#0B1220] outline-none placeholder:text-slate-400"
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
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#0B1220] transition hover:border-[#FF5A14] hover:text-[#FF5A14] lg:hidden"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile panel — anchored under the floating pill */}
        <div
          className={`absolute inset-x-0 top-full z-40 mt-2 rounded-3xl border border-slate-200 bg-white shadow-xl transition-all duration-300 lg:hidden ${
            mobileMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="max-h-[calc(100vh-110px)] overflow-y-auto px-4 py-4">
            <div ref={mobileSearchRef} className="relative mb-4">
              <form onSubmit={handleMobileSearchSubmit}>
                <div className="flex h-12 items-center rounded-full border border-slate-200 bg-[#FFF4EE] px-5 shadow-sm transition duration-300 focus-within:border-[#FF5A14] focus-within:bg-white focus-within:shadow-md">
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
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-full px-4 py-3 text-[15px] font-medium transition ${
                    isActive(link.href)
                      ? "bg-[#FFF1E8] text-[#FF5A14]"
                      : "text-[#0B1220] hover:bg-[#FFF4EE] hover:text-[#FF5A14]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}