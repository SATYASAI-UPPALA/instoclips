import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = ["Services", "Pricing", "How It Works", "Testimonials"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const link of [...links].reverse()) {
        const id = link.toLowerCase().replace(/ /g, "-");
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveLink(id); return; }
      }
      setActiveLink("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center gap-1 transition-all duration-500 ease-out
            ${scrolled
              ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60 px-3 py-2 rounded-full"
              : "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.15)] px-4 py-2.5 rounded-full"
            }`}
        >
          {/* Logo */}
          <a
            href="#"
            className={`font-heading font-bold text-base mr-3 shrink-0 transition-all duration-300 ${scrolled ? "text-foreground" : "text-white"}`}
          >
            <span className="gradient-text">Insto</span>clips
          </a>

          {/* Divider */}
          <div className={`w-px h-4 mx-1 shrink-0 transition-colors duration-300 ${scrolled ? "bg-border" : "bg-white/20"}`} />

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const id = link.toLowerCase().replace(/ /g, "-");
              const isActive = activeLink === id;
              return (
                <a
                  key={link}
                  href={`#${id}`}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "gradient-bg text-white shadow-sm"
                      : scrolled
                        ? "text-foreground/70 hover:text-foreground hover:bg-black/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className={`hidden md:block w-px h-4 mx-1 shrink-0 transition-colors duration-300 ${scrolled ? "bg-border" : "bg-white/20"}`} />

          {/* CTA */}
          <a
            href="#book-now"
            className="hidden md:flex items-center gap-1.5 gradient-bg text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
          >
            Book Now
          </a>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden ml-1 p-1.5 rounded-full transition-all duration-200 hover:scale-110 ${scrolled ? "text-foreground hover:bg-black/5" : "text-white hover:bg-white/10"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown — floats below the pill */}
      {mobileOpen && (
        <div className="fixed top-[72px] left-4 right-4 z-40 animate-slide-up">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-2xl p-3 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#book-now"
              className="mt-1 gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center hover:opacity-90 transition-opacity"
              onClick={() => setMobileOpen(false)}
            >
              Book Now 🎬
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
