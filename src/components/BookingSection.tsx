import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, XCircle } from "lucide-react";

const STEPS = ["Your Details", "Event Info", "Confirm"];

const BookingSection = () => {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "", mobile: "", eventType: "", eventDate: "", location: "",
  });

  const set = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "ba30ca33-1615-4b3f-9d1a-75aa05620ad0",
          subject: `New Booking Request — ${formData.eventType} by ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          mobile: formData.mobile,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          event_location: formData.location,
          botcheck: "",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setStep(0);
    setFormData({ name: "", mobile: "", eventType: "", eventDate: "", location: "" });
  };

  /* ── Success ── */
  if (status === "success") {
    return (
      <section id="book-now" className="py-20 section-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-10 blur-[120px]" />
        <div className="container relative z-10 flex flex-col items-center justify-center text-center py-10">
          <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center animate-glow-pulse mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-hero-foreground">
            You're all set, <span className="gradient-text">{formData.name}!</span>
          </h2>
          <p className="text-hero-foreground/60 mt-3 max-w-sm leading-relaxed">
            We've received your booking request and will reach out on{" "}
            <span className="text-primary font-semibold">{formData.mobile}</span> shortly.
          </p>
          <div className="mt-6 px-5 py-3 rounded-2xl glass text-sm text-hero-foreground/50 space-y-1 text-left">
            <p><span className="text-hero-foreground/30">Event:</span> <span className="text-hero-foreground/70 font-medium">{formData.eventType}</span></p>
            <p><span className="text-hero-foreground/30">Date:</span> <span className="text-hero-foreground/70 font-medium">{formData.eventDate}</span></p>
            <p><span className="text-hero-foreground/30">Location:</span> <span className="text-hero-foreground/70 font-medium">{formData.location}</span></p>
          </div>
          <button onClick={reset} className="mt-8 text-sm text-hero-foreground/40 hover:text-primary transition-colors underline underline-offset-4">
            Book another session
          </button>
        </div>
      </section>
    );
  }

  /* ── Error ── */
  if (status === "error") {
    return (
      <section id="book-now" className="py-20 section-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-10 blur-[120px]" />
        <div className="container relative z-10 flex flex-col items-center justify-center text-center py-10">
          <div className="w-24 h-24 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-6">
            <XCircle className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-hero-foreground">Something went wrong</h2>
          <p className="text-hero-foreground/50 mt-3 max-w-sm">
            Please try again or reach us directly at{" "}
            <a href="mailto:instoclips@gmail.com" className="text-primary hover:underline">instoclips@gmail.com</a>
          </p>
          <button onClick={() => setStatus("idle")} className="mt-6 gradient-bg text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* ── Form ── */
  return (
    <section id="book-now" className="py-20 section-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-10 blur-[120px]" />

      <div className="container relative z-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-white mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Quick Booking
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-hero-foreground">
            Ready to <span className="gradient-text">Reel It</span>?
          </h2>
          <p className="text-hero-foreground/50 mt-3 max-w-md mx-auto">
            Fill in your details — we'll match you with a creator and confirm within minutes.
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          {/* Step indicators */}
          <div className="flex items-center justify-center mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={() => i < step && setStep(i)}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${i < step ? "gradient-bg text-white" : i === step ? "gradient-bg text-white animate-glow-pulse" : "bg-hero-foreground/10 text-hero-foreground/30"}`}>
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium transition-colors duration-300 whitespace-nowrap
                    ${i === step ? "text-primary" : "text-hero-foreground/30"}`}>
                    {s}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="w-14 md:w-20 h-0.5 mx-2 mb-4 rounded-full overflow-hidden bg-hero-foreground/10">
                    <div className={`h-full gradient-bg rounded-full transition-all duration-500 ${i < step ? "w-full" : "w-0"}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="glass rounded-2xl p-6 md:p-8">

            {/* hidden honeypot for web3forms */}
            <input type="checkbox" name="botcheck" className="hidden" />

            {/* Step 0 — Personal */}
            {step === 0 && (
              <div className="space-y-5 animate-slide-up">
                <div className="space-y-1.5">
                  <label className="text-hero-foreground/60 text-xs font-semibold uppercase tracking-wider">Full Name *</label>
                  <Input
                    placeholder="e.g. Rahul Sharma"
                    className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/25 rounded-xl h-12 focus:border-primary/60 transition-colors"
                    value={formData.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-hero-foreground/60 text-xs font-semibold uppercase tracking-wider">Mobile Number *</label>
                  <Input
                    placeholder="+91 99089 90465"
                    type="tel"
                    className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/25 rounded-xl h-12 focus:border-primary/60 transition-colors"
                    value={formData.mobile}
                    onChange={(e) => set("mobile", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 1 — Event Info */}
            {step === 1 && (
              <div className="space-y-5 animate-slide-up">
                <div className="space-y-1.5">
                  <label className="text-hero-foreground/60 text-xs font-semibold uppercase tracking-wider">Event Type *</label>
                  <Select value={formData.eventType} onValueChange={(v) => set("eventType", v)}>
                    <SelectTrigger className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground rounded-xl h-12 focus:border-primary/60">
                      <SelectValue placeholder="Select your event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Wedding", "Corporate Event", "Social Event", "Brand / D2C", "Influencer Content", "Birthday Party", "Product Launch", "Other"].map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-hero-foreground/60 text-xs font-semibold uppercase tracking-wider">Event Date *</label>
                  <Input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground rounded-xl h-12 focus:border-primary/60 transition-colors"
                    value={formData.eventDate}
                    onChange={(e) => set("eventDate", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-hero-foreground/60 text-xs font-semibold uppercase tracking-wider">Event Location *</label>
                  <Input
                    placeholder="e.g. Jangareddygudem, Andhra Pradesh"
                    className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/25 rounded-xl h-12 focus:border-primary/60 transition-colors"
                    value={formData.location}
                    onChange={(e) => set("location", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Confirm */}
            {step === 2 && (
              <div className="animate-slide-up">
                <h3 className="font-heading font-bold text-hero-foreground text-lg mb-5">Confirm Your Booking</h3>
                <div className="space-y-0 rounded-xl overflow-hidden border border-hero-foreground/10">
                  {[
                    { label: "Name", value: formData.name },
                    { label: "Mobile", value: formData.mobile },
                    { label: "Event Type", value: formData.eventType },
                    { label: "Date", value: formData.eventDate },
                    { label: "Location", value: formData.location },
                  ].map(({ label, value }, i) => (
                    <div key={label} className={`flex justify-between items-center px-4 py-3 ${i % 2 === 0 ? "bg-hero-foreground/5" : "bg-transparent"}`}>
                      <span className="text-xs text-hero-foreground/40 font-semibold uppercase tracking-wider w-24">{label}</span>
                      <span className="text-sm text-hero-foreground font-medium text-right">{value || <span className="text-hero-foreground/20">—</span>}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-hero-foreground/30 text-center">
                  By submitting, you agree to our terms. We'll contact you within minutes.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-7">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-full border border-hero-foreground/15 text-hero-foreground/60 hover:text-hero-foreground hover:border-hero-foreground/30 text-sm font-medium transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                disabled={
                  status === "loading" ||
                  (step === 0 && (!formData.name.trim() || !formData.mobile.trim())) ||
                  (step === 1 && (!formData.eventType || !formData.eventDate || !formData.location.trim()))
                }
                onClick={() => step < 2 ? setStep(step + 1) : handleSubmit()}
                className="flex-1 flex items-center justify-center gap-2 gradient-bg text-white font-bold py-3 rounded-full text-sm shadow-lg hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 relative overflow-hidden group"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </span>
                ) : step === 2 ? (
                  <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Let's Reel It! 🎬</span>
                ) : (
                  <span className="flex items-center gap-2">
                    Next <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </button>
            </div>
          </div>

          {/* Contact fallback */}
          <p className="text-center text-xs text-hero-foreground/25 mt-5">
            Prefer to reach us directly?{" "}
            <a href="mailto:instoclips@gmail.com" className="text-primary hover:underline">instoclips@gmail.com</a>
            {" "}·{" "}
            <a href="tel:9908990465" className="text-primary hover:underline">+91 99089 90465</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
