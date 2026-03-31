"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BLOGS } from "@/src/lib/blog";

type NavLink = {
  label: string;
  href: string;
};

function slugifyCategory(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSearch, setDesktopSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);
  const moreDropdownRef = useRef<HTMLDivElement | null>(null);

  const mainNavLinks: NavLink[] = useMemo(
    () => [
      {
        label: "Real Estate",
        href: `/categories/${slugifyCategory("Real Estate")}`,
      },
      {
        label: "Digital Marketing",
        href: `/categories/${slugifyCategory("Digital Marketing")}`,
      },
      { label: "Finance", href: `/categories/${slugifyCategory("Finance")}` },
    ],
    []
  );

  const moreNavLinks: NavLink[] = useMemo(
    () => [
      {
        label: "Home Improvement",
        href: `/categories/${slugifyCategory("Home Improvement")}`,
      },
      { label: "Politics", href: `/categories/${slugifyCategory("Politics")}` },
      {
        label: "Technology",
        href: `/categories/${slugifyCategory("Technology")}`,
      },
      { label: "Plumbing", href: `/categories/${slugifyCategory("Plumbing")}` },
      { label: "Health", href: `/categories/${slugifyCategory("Health")}` },
    ],
    []
  );

  const staticNavLinks: NavLink[] = useMemo(
    () => [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  const mobileNavLinks: NavLink[] = useMemo(
    () => [...mainNavLinks, ...moreNavLinks, ...staticNavLinks],
    [mainNavLinks, moreNavLinks, staticNavLinks]
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

      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target)
      ) {
        setMobileSearchOpen(false);
      }

      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(target)
      ) {
        setMoreOpen(false);
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
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isMoreActive = moreNavLinks.some((link) => isActive(link.href));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="Topicler Logo"
            width={190}
            height={60}
            className="h-10 w-auto object-contain sm:h-11 xl:h-12"
            priority
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <nav className="flex items-center gap-5 xl:gap-7">
            {mainNavLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative shrink-0 whitespace-nowrap"
                >
                  <span
                    className={`text-[14px] font-medium transition duration-300 xl:text-[15px] ${
                      active
                        ? "text-[#FF5A14]"
                        : "text-[#0B1220] group-hover:text-[#FF5A14]"
                    }`}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#FF5A14] transition-transform duration-300 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}

            <div ref={moreDropdownRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                className="group relative flex items-center gap-1 whitespace-nowrap"
              >
                <span
                  className={`text-[14px] font-medium transition duration-300 xl:text-[15px] ${
                    isMoreActive || moreOpen
                      ? "text-[#FF5A14]"
                      : "text-[#0B1220] group-hover:text-[#FF5A14]"
                  }`}
                >
                  More
                </span>

                <ChevronDown
                  size={16}
                  className={`transition duration-300 ${
                    isMoreActive || moreOpen
                      ? "rotate-180 text-[#FF5A14]"
                      : "text-[#0B1220] group-hover:text-[#FF5A14]"
                  }`}
                />

                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#FF5A14] transition-transform duration-300 ${
                    isMoreActive || moreOpen
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-[calc(100%+14px)] w-[240px] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl transition-all duration-200 ${
                  moreOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="space-y-1">
                  {moreNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-[14px] font-medium transition ${
                        isActive(link.href)
                          ? "bg-[#FFF4EE] text-[#FF5A14]"
                          : "text-[#0B1220] hover:bg-[#FFF4EE] hover:text-[#FF5A14]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {staticNavLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative shrink-0 whitespace-nowrap"
                >
                  <span
                    className={`text-[14px] font-medium transition duration-300 xl:text-[15px] ${
                      active
                        ? "text-[#FF5A14]"
                        : "text-[#0B1220] group-hover:text-[#FF5A14]"
                    }`}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#FF5A14] transition-transform duration-300 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
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
            <div className="flex h-12 items-center rounded-full border border-slate-200 bg-[#F9FAFB] px-5 shadow-sm transition duration-300 focus-within:border-[#FF5A14] focus-within:bg-white focus-within:shadow-md">
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#0B1220] transition hover:border-[#FF5A14] hover:text-[#FF5A14] lg:hidden"
          aria-label="Toggle Menu"
          type="button"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-[73px] z-40 border-t border-slate-200 bg-white lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="h-[calc(100vh-73px)] overflow-y-auto">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <div ref={mobileSearchRef} className="relative mb-4">
              <form onSubmit={handleMobileSearchSubmit}>
                <div className="flex h-12 items-center rounded-full border border-slate-200 bg-[#F9FAFB] px-5 shadow-sm transition duration-300 focus-within:border-[#FF5A14] focus-within:bg-white focus-within:shadow-md">
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
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMoreOpen(false);
                  }}
                  className={`rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                    isActive(link.href)
                      ? "bg-[#FFF4EE] text-[#FF5A14]"
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