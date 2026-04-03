import { Zap, FolderOpen, BadgeCheck, RefreshCw, IndianRupee, Cloud } from "lucide-react";
import { useEffect, useRef } from "react";

const reasons = [
  { icon: Zap, title: "Instant Delivery", desc: "Get your edited reels within minutes of the shoot", color: "from-yellow-400 to-orange-400" },
  { icon: FolderOpen, title: "Raw Footage Access", desc: "Complete access to all unedited raw footage", color: "from-blue-400 to-cyan-400" },
  { icon: BadgeCheck, title: "Certified Creators", desc: "Vetted and trained professional reel makers", color: "from-green-400 to-emerald-400" },
  { icon: RefreshCw, title: "2 Free Revisions", desc: "Not satisfied? Get 2 rounds of edits free", color: "from-purple-400 to-violet-400" },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Premium quality at pocket-friendly rates", color: "from-pink-400 to-rose-400" },
  { icon: Cloud, title: "Secure Cloud Storage", desc: "All content safely stored on the cloud", color: "from-indigo-400 to-blue-400" },
];

const WhySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".why-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; } }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="container">
        <div className="reveal text-center" ref={(el) => { if (el) { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); } }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Why <span className="gradient-text">Instoclips</span>?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Everything you need for instant event content</p>
        </div>

        <div ref={containerRef} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="why-card group p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all duration-500 cursor-default card-tilt"
              style={{ opacity: 0, transform: "translateY(40px)", transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, box-shadow 0.3s ease` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                <r.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mt-4 group-hover:text-primary transition-colors">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.desc}</p>
              <div className={`mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${r.color} rounded-full transition-all duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
