import { useState, useRef, useEffect } from "react";
import { Check, Sparkles, Zap, Plus, Star, Phone, Info } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */
const tabs = ["Basic", "Event", "Corporate"] as const;
type Tab = typeof tabs[number];

const basicPlans = [
  {
    id: "lite",
    name: "Lite",
    tagline: "Fast, Simple & Impactful",
    desc: "Perfect for people who want a single reel",
    price: 699,
    badge: null,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    features: ["1 Edited Reel Delivered", "Same Day Preview", "Raw Data Included", "Instoclips Watermark"],
    note: null,
  },
  {
    id: "smart-duo",
    name: "Smart Duo",
    tagline: "Built for Events",
    desc: "Quick, high quality coverage for events",
    price: 1099,
    badge: "Popular",
    color: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/25",
    features: ["2 Edited Reels Delivered", "Same Day Preview", "Raw Data Included", "Instoclips Watermark"],
    note: null,
  },
  {
    id: "elite",
    name: "Elite Advance",
    tagline: "Flexible & Impactful",
    desc: "Instant, high quality — capture more moments",
    price: 2499,
    badge: "Best Value",
    color: "from-amber-400 to-orange-500",
    glow: "shadow-amber-400/25",
    features: ["3 Edited Reels Delivered", "Same Day Preview & On-site Delivery", "Raw Data Included", "Instoclips Watermark"],
    note: null,
  },
];

const eventPlans = [
  {
    id: "half-day",
    name: "Half Day",
    tagline: "Premium Plan",
    desc: "More moments. More magic. Crafted reels.",
    price: 4499,
    badge: "Popular",
    color: "from-violet-500 to-pink-500",
    glow: "shadow-violet-500/25",
    features: ["5 Edited Reels", "Reel Maker On-site", "Same Day Preview", "Raw Footage Access", "Complimentary Pictures", "Instoclips Watermark"],
    note: "Watermark optional on request",
  },
  {
    id: "full-event",
    name: "Full Event",
    tagline: "Signature Plan",
    desc: "Seamless coverage, stunning reels",
    price: 6999,
    badge: "Best Value",
    color: "from-rose-500 to-amber-400",
    glow: "shadow-rose-500/25",
    features: ["8 Edited Reels", "Up to 1 Reel Maker On-site", "Same Day Preview", "Raw Footage Access", "Complimentary Pictures", "Instoclips Watermark"],
    note: "Watermark optional on request",
  },
];

const corporatePlans = [
  {
    id: "weekly",
    name: "Weekly Creator",
    tagline: "Single Event",
    desc: "Sharp, scroll-stopping content from a single event",
    price: 2999,
    badge: null,
    color: "from-blue-500 to-violet-500",
    glow: "shadow-blue-500/20",
    features: ["2 Reels Provided", "BTS Videos", "Interaction Videos", "Watermark Optional"],
    note: null,
  },
  {
    id: "monthly",
    name: "Monthly Creator",
    tagline: "Full Month Coverage",
    desc: "Consistent brand content all month long",
    price: 14999,
    badge: "Best Deal",
    color: "from-violet-600 to-pink-500",
    glow: "shadow-violet-600/30",
    features: ["14 Reels Provided", "BTS Videos", "Interaction Videos", "Crowd Reaction Clips", "Concept & Content Planning", "Interview Style Videos", "Watermark Optional"],
    note: null,
  },
];

const addOns: Record<Tab, { label: string; price: number }[]> = {
  Basic: [{ label: "1 Extra Reel", price: 499 }],
  Event: [{ label: "1 Extra Reel", price: 699 }],
  Corporate: [{ label: "1 Extra Reel", price: 699 }],
};

const plansByTab: Record<Tab, typeof basicPlans> = {
  Basic: basicPlans,
  Event: eventPlans as typeof basicPlans,
  Corporate: corporatePlans as typeof basicPlans,
};

/* ─── PLAN CARD ─────────────────────────────────────── */
const PlanCard = ({ plan, index }: { plan: typeof basicPlans[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isHighlighted = !!plan.badge;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-700 ease-out group
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${isHighlighted
          ? "border-transparent shadow-2xl " + plan.glow
          : "border-border/60 bg-card hover:border-primary/20 hover:shadow-xl"
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${plan.color}`} />

      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4">
          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${plan.color} shadow-lg`}>
            <Sparkles className="w-2.5 h-2.5" /> {plan.badge}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div>
          <p className={`text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
            {plan.tagline}
          </p>
          <h3 className="font-heading font-bold text-xl mt-1">{plan.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{plan.desc}</p>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end gap-1">
          <span className="text-xs text-muted-foreground font-medium self-start mt-2">₹</span>
          <span className="text-4xl font-heading font-black leading-none">{plan.price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground mb-1">/ session</span>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-border/50" />

        {/* Features */}
        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">What's Included</p>
        <ul className="space-y-2.5 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <div className={`mt-0.5 w-4 h-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-foreground/80 leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        {plan.note && (
          <p className="mt-3 text-[10px] text-muted-foreground flex items-center gap-1">
            <Info className="w-3 h-3" /> {plan.note}
          </p>
        )}

        {/* CTA */}
        <a
          href="#book-now"
          className={`mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 relative overflow-hidden group/btn
            bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`}
        >
          <Zap className="w-3.5 h-3.5" />
          Book This Plan
          <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12" />
        </a>
      </div>
    </div>
  );
};

/* ─── MAIN SECTION ──────────────────────────────────── */
const PricingSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Basic");
  const plans = plansByTab[activeTab];
  const addOn = addOns[activeTab][0];

  return (
    <section id="pricing" className="py-24 bg-muted/20 overflow-hidden">
      <div className="container">

        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-white mb-5">
            <Star className="w-3 h-3" /> No Hidden Fees
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Pick a plan that fits your moment. Pay per shoot, no subscriptions.</p>
        </div>

        {/* Tab switcher */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-muted border border-border/50 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "gradient-bg text-white shadow-md scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "Basic" ? "🎬 Basic" : tab === "Event" ? "🎉 Event" : "🏢 Corporate"}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className={`mt-10 grid gap-6 ${plans.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3 max-w-5xl mx-auto"}`}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.id + activeTab} plan={plan} index={i} />
          ))}
        </div>

        {/* Add-on + Referral row */}
        <div className="mt-8 max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
          {/* Add-on */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Add-On</p>
              <p className="font-heading font-bold text-sm mt-0.5">{addOn.label}</p>
            </div>
            <span className="text-lg font-black gradient-text">₹{addOn.price}</span>
          </div>

          {/* Referral */}
          {activeTab === "Event" && (
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-amber-400/40 bg-amber-400/5 hover:bg-amber-400/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 text-lg">
                🎁
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Referral Offer</p>
                <p className="font-heading font-bold text-sm mt-0.5">5% Discount for any referral</p>
              </div>
              <span className="text-lg font-black text-amber-500">5% OFF</span>
            </div>
          )}
        </div>

        {/* T&C */}
        <div className="mt-10 max-w-5xl mx-auto rounded-2xl border border-border/50 bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Terms & Conditions</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {[
              "Above 15 km radius — travelling charges may apply",
              "50% advance payment required at time of booking",
              "48 hours prior notice required for cancellations",
              "No refunds for late cancellations",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-0.5 w-1 h-1 rounded-full bg-muted-foreground/50 flex-shrink-0 mt-1.5" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">For custom packages & queries:</span>
            <a href="tel:9908990465" className="text-xs font-bold text-primary hover:underline">+91 99089 90465</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
