import { Film, Star, Users, Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: Film, value: 1000, suffix: "+", label: "Reels Delivered" },
  { icon: Star, value: 4.85, suffix: "/5", label: "Average Rating", decimal: true },
  { icon: Users, value: 10, suffix: "+", label: "Reel Makers" },
  { icon: Building2, value: 10, suffix: "+", label: "Brands Partnered" },
];

function useCountUp(target: number, decimal = false, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const t = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(decimal ? Math.round(current * 100) / 100 : Math.floor(current));
      if (current >= target) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [started, target, decimal, duration]);

  return { count, ref };
}

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const { count, ref } = useCountUp(stat.value, stat.decimal);
  return (
    <div
      ref={ref}
      className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 text-center card-tilt overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 gradient-bg-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-bg-subtle flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
          <stat.icon className="w-6 h-6 text-primary" />
        </div>
        <div className="text-2xl md:text-3xl font-heading font-bold text-foreground tabular-nums">
          {stat.decimal ? count.toFixed(2) : count.toLocaleString()}{stat.suffix}
        </div>
        <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
      </div>
    </div>
  );
};

const StatsSection = () => (
  <section className="py-20 relative -mt-16 z-10">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
      </div>
    </div>
  </section>
);

export default StatsSection;
