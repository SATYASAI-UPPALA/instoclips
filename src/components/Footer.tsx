import { Mail, Phone, MapPin } from "lucide-react";
import { LegalLinks } from "@/components/LegalModal";

const Footer = () => (
  <footer className="section-dark pt-16 pb-8">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-hero-foreground/10">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="text-2xl font-heading font-bold">
            <span className="gradient-text">Insto</span>
            <span className="text-hero-foreground">clips</span>
          </span>
          <p className="text-hero-foreground/50 text-sm mt-3 leading-relaxed">
            India's First & Fastest Event Content Service. Shoot. Edit. Post in Minutes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-hero-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {["Services", "Pricing", "How It Works", "Testimonials", "Book Now"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-hero-foreground/50 hover:text-primary transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-heading font-semibold text-hero-foreground mb-4">Legal</h4>
          <LegalLinks />
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-hero-foreground mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-hero-foreground/50">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <a href="mailto:instoclips@gmail.com" className="hover:text-primary transition-colors">instoclips@gmail.com</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-hero-foreground/50">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <a href="tel:9908990465" className="hover:text-primary transition-colors">+91 99089 90465</a>
            </li>
            <li className="flex items-start gap-3 text-sm text-hero-foreground/50">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Jangareddygudem, Andhra Pradesh, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-hero-foreground/30">© 2025 Instoclips. All rights reserved.</p>
        <div className="flex gap-3">
          {["Visa", "Mastercard", "UPI", "GPay"].map((p) => (
            <span key={p} className="px-3 py-1 rounded-md text-xs font-medium text-hero-foreground/30 border border-hero-foreground/10">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
