import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How fast is the delivery?", a: "We deliver edited reels within minutes of the shoot. Our on-spot editing process ensures you get content before your event even ends!" },
  { q: "What types of events do you cover?", a: "We cover weddings, corporate events, social gatherings, brand launches, influencer content, D2C product shoots, and more." },
  { q: "How do you ensure creator quality?", a: "All our creators go through a rigorous certification process. They're trained in iPhone videography, trending reel formats, and on-spot editing." },
  { q: "Is my content private and secure?", a: "Absolutely. All content is securely stored on the cloud and shared only with you. We follow strict privacy protocols." },
  { q: "How do I book a session?", a: "Simply fill out the booking form above or click 'Book Now'. You'll be matched with a creator within minutes of confirmation." },
  { q: "How can I become an Instoclips creator?", a: "Click on 'Become a Creator' and fill in your details. If you're passionate about video content, we'd love to have you on board!" },
];

const FAQSection = () => {
  const [query, setQuery] = useState("");
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground mt-3">Got questions? We've got answers.</p>
        </div>

        {/* Search */}
        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/50 bg-card text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition-colors">
              Clear
            </button>
          )}
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-4xl mb-3">🤔</p>
              <p>No results for "<span className="text-foreground">{query}</span>"</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {filtered.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/50 rounded-xl px-6 bg-card data-[state=open]:border-primary/30 data-[state=open]:shadow-md data-[state=open]:bg-gradient-to-r data-[state=open]:from-primary/5 data-[state=open]:to-transparent transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-heading font-medium hover:no-underline py-5 hover:text-primary transition-colors">
                    {query ? (
                      <span dangerouslySetInnerHTML={{
                        __html: faq.q.replace(new RegExp(`(${query})`, "gi"), '<mark class="bg-primary/20 text-primary rounded px-0.5">$1</mark>')
                      }} />
                    ) : faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
