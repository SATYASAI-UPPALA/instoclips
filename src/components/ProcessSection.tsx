import { CalendarCheck, UserCheck, Camera, Scissors, Send, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book Instantly",
    desc: "Fill a quick 2-minute form — choose your event type, date, and location. No calls, no waiting.",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/40",
    tag: "< 2 mins",
    emoji: "📅",
  },
  {
    icon: UserCheck,
    title: "Get Matched",
    desc: "We instantly pair you with a certified creator near your venue. You'll get their profile before they arrive.",
    color: "from-purple-500 to-pink-500",
    glow: "shadow-pink-500/40",
    tag: "Instant",
    emoji: "🤝",
  },
  {
    icon: Camera,
    title: "On-Ground Shoot",
    desc: "Your creator arrives on time, blends into the event, and captures every candid, emotional moment.",
    color: "from-pink-500 to-rose-500",
    glow: "shadow-rose-500/40",
    tag: "Live Coverage",
    emoji: "🎥",
  },
  {
    icon: Scissors,
    title: "On-Spot Editing",
    desc: "While you celebrate, your creator edits in real-time — trending music, cuts, and captions included.",
    color: "from-rose-500 to-orange-400",
    glow: "shadow-orange-400/40",
    tag: "Real-time",
    emoji: "✂️",
  },
  {
    icon: Send,
    title: "Instant Delivery",
    desc: "Reels land in your WhatsApp or DMs within minutes of the shoot. Ready to post, no delays.",
    color: "from-orange-400 to-amber-400",
    glow: "shadow-amber-400/40",
    tag: "Minutes",
    emoji: "🚀",
  },
  {
    icon: MessageCircle,
    title: "Revise & Celebrate",
    desc: "Not 100% happy? Get 2 free revisions with dedicated support until you love every frame.",
    color: "from-amber-400 to-green-400",
    glow: "shadow-green-400/40",
    tag: "2 Free Revisions",
    emoji: "🎉",
  },
];

const StepCard = ({ step, index, isLeft }: { step: typeof steps[0]; index: number; isLeft: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-6 md:gap-10 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0" : isLeft ? "opacity-0 -translate-x-16" : "opacity-0 translate-x-16"
      } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icon bubble */}
      <div className="flex-shrink-0 relative">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl ${step.glow} group-hover:scale-110 transition-transform duration-300`}>
          <step.icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
        </div>
        {/* Step number badge */}
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-border text-xs font-bold flex items-center justify-center text-foreground shadow-sm">
          {index + 1}
        </span>
      </div>

      {/* Content card */}
      <div className={`group flex-1 relative p-5 md:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden ${isLeft ? "" : ""}`}>
        {/* Hover gradient fill */}
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{step.emoji}</span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${step.color} text-white`}>
              {step.tag}
            </span>
          </div>
          <h3 className="font-heading font-bold text-base md:text-lg group-hover:text-primary transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{step.desc}</p>
        </div>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-500`} />
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTitleVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-[0.04] blur-[80px] pointer-events-none" />

      <div className="container max-w-3xl relative z-10">

        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-white mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            From Booking to{" "}
            <span className="gradient-text">Viral Reel</span>
            <br />in Minutes
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base leading-relaxed">
            No complicated setup. No waiting days. Just book, shoot, and post — it's that simple.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Vertical connector line */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/30 via-pink-500/30 to-green-400/30 -translate-x-1/2 hidden sm:block" />

          <div className="flex flex-col gap-8 md:gap-10">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-muted-foreground text-sm mb-4">Ready to get started? It takes less than 2 minutes.</p>
          <a
            href="#book-now"
            className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
          >
            🎬 Book My Reel Session
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
