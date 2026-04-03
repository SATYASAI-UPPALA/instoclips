import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ReelsShowcase from "@/components/ReelsShowcase";
// import BrandsSection from "@/components/BrandsSection";
import PricingSection from "@/components/PricingSection";
import WhySection from "@/components/WhySection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <StatsSection />
    <ReelsShowcase />
    {/* <BrandsSection /> */}
    <WhySection />
    <PricingSection />
    <ProcessSection />
    <TestimonialsSection />
    <BookingSection />
    <FAQSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
