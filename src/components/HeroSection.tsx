import { useEffect, useState, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Play, Star, Zap, Clock, CheckCircle, Heart, MessageCircle, Send } from "lucide-react";

import img1 from "@/assets/imgs/Screenshot_20260403-215108_Gallery.png";
import img2 from "@/assets/imgs/Screenshot_20260403-215127_Gallery.png";
import img3 from "@/assets/imgs/Screenshot_20260403-215224_Gallery.png";
import img4 from "@/assets/imgs/Screenshot_20260403-215400_Gallery.png";
import img5 from "@/assets/imgs/Screenshot_20260403-215436_Gallery.png";
import img6 from "@/assets/imgs/Screenshot_20260403-215449_Gallery.png";
import img7 from "@/assets/imgs/Screenshot_20260403-215500_Gallery.png";
import img8 from "@/assets/imgs/Screenshot_20260403-215514_Gallery.png";
import img9 from "@/assets/imgs/Screenshot_20260403-215622_Gallery.png";

const REEL_IMGS = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const WORDS = ["Weddings", "Brand Shoots", "Reels", "Events", "Moments"];

const TICKER_ITEMS = [
  { emoji: "🎬", text: "1,000+ Reels Delivered" },
  { emoji: "⭐", text: "4.85/5 Average Rating" },
  { emoji: "🚀", text: "Delivered in Minutes" },
  { emoji: "📍", text: "Pan India Coverage" },
  { emoji: "🎥", text: "Shot on iPhone Pro" },
  { emoji: "✅", text: "10+ Certified Creators" },
  { emoji: "💜", text: "10+ Brands Trust Us" },
  { emoji: "🔄", text: "2 Free Revisions" },
];

const NOTIFICATIONS = [
  { name: "Priya S.", action: "just booked a Wedding Reel", time: "2m ago", avatar: "PS" },
  { name: "Arjun M.", action: "received reels from his launch", time: "5m ago", avatar: "AM" },
  { name: "Sneha R.", action: "booked for her birthday shoot", time: "8m ago", avatar: "SR" },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2.5 + 1, delay: Math.random() * 6, dur: Math.random() * 4 + 5,
}));

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIndex((p) => (p + 1) % WORDS.length); setWordVisible(true); }, 400);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setNotifVisible(false);
      setTimeout(() => { setNotifIndex((p) => (p + 1) % NOTIFICATIONS.length); setNotifVisible(true); }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 24,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 24,
    });
  };

  const notif = NOTIFICATIONS[notifIndex];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col overflow-hidden section-dark"
    >
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0010] via-[#0d0018]/90 to-[#050008]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.12] blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }} />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-pink-500 opacity-[0.10] blur-[100px] pointer-events-none"
        style={{ transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)` }} />
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-purple-400 opacity-[0.08] blur-[80px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)` }} />

      {PARTICLES.map((p) => (
        <div key={p.id} className="absolute rounded-full bg-violet-400/30 animate-float pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} />
      ))}

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container pt-24 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* LEFT */}
            <div className="flex flex-col items-start">
              <div className="animate-slide-up flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm mb-7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
                </span>
                <span className="text-xs font-medium text-violet-300 tracking-wide">India's #1 Instant Event Content Service</span>
              </div>

              <h1 className="animate-slide-up-delay-1 font-heading font-black text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[3.8rem] leading-[1.08] text-white">
                Your{" "}
                <span
                  className={`inline-block gradient-text transition-all duration-400 ${wordVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
                  style={{ minWidth: "220px" }}
                >
                  {WORDS[wordIndex]}
                </span>
                <br />
                Deserve a{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">Viral Reel</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6 Q50 2 100 5 Q150 8 198 4" stroke="url(#u)" strokeWidth="2.5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="u" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="animate-slide-up-delay-2 mt-6 text-base md:text-lg text-white/55 leading-relaxed max-w-md">
                We send a <span className="text-white/80 font-medium">certified creator</span> to your event, shoot, edit on-spot, and deliver scroll-stopping reels —{" "}
                <span className="text-violet-300 font-medium">before the party ends.</span>
              </p>

              <div className="animate-slide-up-delay-2 mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Zap, label: "Delivered in Minutes" },
                  { icon: Clock, label: "Book in 2 mins" },
                  { icon: CheckCircle, label: "2 Free Revisions" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                    <Icon className="w-3 h-3 text-violet-400" /> {label}
                  </span>
                ))}
              </div>

              <div className="animate-slide-up-delay-3 mt-9 flex flex-col sm:flex-row gap-3">
                <a href="#book-now"
                  className="group relative inline-flex items-center justify-center gap-2 gradient-bg text-white font-bold px-8 py-4 rounded-full text-base shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Book My Reel Session
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                </a>
                <a href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 text-sm font-medium transition-all duration-200">
                  <Play className="w-4 h-4" /> See How It Works
                </a>
              </div>

              <div className="animate-slide-up-delay-3 mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["PS", "AM", "SR", "VK", "AP"].map((av, i) => (
                    <div key={i} className="w-8 h-8 rounded-full gradient-bg border-2 border-[#0d0018] flex items-center justify-center text-[10px] font-bold text-white">
                      {av}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    <span className="text-xs text-white/60 ml-1">4.85/5</span>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">Loved by 1,000+ customers</p>
                </div>
              </div>
            </div>

            {/* RIGHT — Phone with auto-scrolling reel feed */}
            <div
              className="relative flex justify-center lg:justify-end items-center"
              style={{ transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`, transition: "transform 0.1s ease-out" }}
            >
              {/* Glow */}
              <div className="absolute w-72 h-72 rounded-full gradient-bg opacity-20 blur-[70px]" />

              {/* Phone shell */}
              <div className="relative w-[210px] sm:w-[230px] animate-float" style={{ animationDuration: "5s" }}>
                <div
                  className="relative rounded-[2.8rem] border-[3px] border-white/15 bg-black overflow-hidden shadow-[0_40px_100px_rgba(124,58,237,0.45)]"
                  style={{ aspectRatio: "9/19" }}
                >
                  {/* Scrolling feed */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div style={{ animation: "phone-scroll 55s linear infinite", willChange: "transform" }}>
                      {[...REEL_IMGS, ...REEL_IMGS].map((src, i) => (
                        <div key={i} className="relative w-full" style={{ aspectRatio: "9/16" }}>
                          <img src={src} alt="" className="w-full h-full object-cover" />

                          {/* Gradient overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                          {/* Top — username */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full gradient-bg border border-white/40 flex items-center justify-center text-[7px] font-bold text-white">IC</div>
                              <span className="text-white text-[9px] font-semibold drop-shadow-sm">instoclips</span>
                            </div>
                            <span className="text-[8px] text-white/80 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-full font-medium">REEL</span>
                          </div>

                          {/* Right — action icons */}
                          <div className="absolute right-2.5 bottom-12 flex flex-col items-center gap-3.5">
                            <div className="flex flex-col items-center gap-0.5">
                              <Heart className="w-[14px] h-[14px] text-white drop-shadow" />
                              <span className="text-[6px] text-white/80 font-medium">2.4k</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                              <MessageCircle className="w-[14px] h-[14px] text-white drop-shadow" />
                              <span className="text-[6px] text-white/80 font-medium">48</span>
                            </div>
                            <Send className="w-[14px] h-[14px] text-white drop-shadow" />
                          </div>

                          {/* Bottom — caption */}
                          <div className="absolute bottom-3 left-3 right-10">
                            <p className="text-[8px] text-white font-bold drop-shadow">@instoclips</p>
                            <p className="text-[7px] text-white/65 mt-0.5 leading-tight">Captured live ✨ #reels #events #instoclips</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-20" />
                  {/* Home bar */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/25 rounded-full z-20" />
                </div>
              </div>

              {/* Floating notification */}
              <div
                key={notifIndex}
                className={`absolute -left-4 sm:-left-10 top-[15%] w-52 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-xl transition-all duration-300 ${notifVisible ? "animate-notification-pop opacity-100" : "opacity-0 scale-95"}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                    {notif.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-white font-semibold truncate">{notif.name}</p>
                    <p className="text-[10px] text-white/50 truncate">{notif.action}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                  <span className="text-[9px] text-white/30">{notif.time}</span>
                  <span className="text-[9px] text-violet-300 font-medium">✓ Confirmed</span>
                </div>
              </div>

              {/* Delivery badge */}
              <div className="absolute -right-2 sm:-right-6 bottom-[20%] bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-3 py-2.5 shadow-xl animate-float" style={{ animationDelay: "2s", animationDuration: "4s" }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <p className="text-[11px] text-white font-bold">Reel Ready!</p>
                    <p className="text-[9px] text-white/40">Delivered in 8 mins</p>
                  </div>
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute -right-2 sm:-right-4 top-[10%] bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl px-3 py-2 shadow-xl animate-float" style={{ animationDelay: "1s", animationDuration: "6s" }}>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-white font-bold">4.9</span>
                  <span className="text-[9px] text-white/40">rating</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.03] backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex gap-12 animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex-shrink-0 flex items-center gap-2 text-xs text-white/40 font-medium">
              <span>{item.emoji}</span>
              <span>{item.text}</span>
              <span className="text-white/15 ml-4">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
