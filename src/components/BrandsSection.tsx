const brands = [
  "Zara", "Nike", "Myntra", "Nykaa", "boAt", "Mamaearth",
  "Sugar", "Lenskart", "Meesho", "Swiggy", "Zomato", "Flipkart",
];

const BrandsSection = () => (
  <section className="py-16 border-y border-border/50">
    <div className="container mb-8">
      <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
        Trusted by 250+ brands across India
      </p>
    </div>
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-16 animate-marquee items-center">
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-xl md:text-2xl font-heading font-bold text-muted-foreground/30 hover:text-primary transition-colors duration-300 cursor-default whitespace-nowrap"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default BrandsSection;
