import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  { quote: "Instoclips captured our wedding beautifully! Got the reels before the reception even ended. Absolutely magical!", name: "Priya Sharma", role: "Bride", rating: 5, avatar: "PS" },
  { quote: "We use Instoclips for all our product launches. The speed and quality are unmatched. A game-changer for our D2C brand.", name: "Arjun Mehta", role: "Brand Manager, NykaaFashion", rating: 5, avatar: "AM" },
  { quote: "As an influencer, quick turnarounds matter. Instoclips delivers within minutes. My go-to for event coverage!", name: "Sneha Reddy", role: "Influencer (500K+)", rating: 5, avatar: "SR" },
  { quote: "Our corporate event looked incredibly professional thanks to Instoclips. The team was punctual and creative.", name: "Vikram Iyer", role: "VP Marketing", rating: 4, avatar: "VI" },
  { quote: "Booked for my birthday bash and the reels were ready before the party ended! My friends were amazed.", name: "Aarav Patel", role: "Social Event", rating: 5, avatar: "AP" },
  { quote: "The raw footage quality is superb. Instoclips creators really know their craft. Worth every rupee!", name: "Kavita Nair", role: "Event Planner", rating: 5, avatar: "KN" },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive((next + testimonials.length) % testimonials.length); setAnimating(false); }, 300);
  }, [animating]);

  useEffect(() => {
    const t = setInterval(() => go(active + 1), 4000);
    return () => clearInterval(t);
  }, [active, go]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="py-20 overflow-hidden">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Trusted by thousands across India</p>
        </div>

        {/* Featured testimonial */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className={`relative p-8 md:p-10 rounded-3xl bg-card border border-border/50 shadow-xl transition-all duration-300 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
            <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/10" />
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className={`w-5 h-5 transition-all duration-300 ${j < t.rating ? "fill-primary text-primary scale-110" : "text-border"}`} />
              ))}
            </div>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80 italic text-center">"{t.quote}"</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                {t.avatar}
              </div>
              <div>
                <div className="font-heading font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => go(active - 1)} className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-110">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? "w-6 h-2 gradient-bg" : "w-2 h-2 bg-border hover:bg-primary/40"}`}
                />
              ))}
            </div>
            <button onClick={() => go(active + 1)} className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-200 hover:scale-110">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini cards row */}
        <div className="mt-10 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {testimonials.filter((_, i) => i !== active).slice(0, 3).map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border/30 hover:border-primary/20 transition-all duration-300 cursor-pointer hover:shadow-md" onClick={() => go(testimonials.indexOf(t))}>
              <div className="flex gap-1 mb-2">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-primary text-primary" />)}
              </div>
              <p className="text-xs text-foreground/70 line-clamp-2 italic">"{t.quote}"</p>
              <div className="mt-2 text-xs font-semibold text-foreground/60">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
