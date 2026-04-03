import { useState } from "react";
import { X, Shield, FileText, RefreshCw, Users } from "lucide-react";

const policies = {
  "Privacy Policy": {
    icon: Shield,
    color: "from-violet-500 to-purple-600",
    lastUpdated: "January 2025",
    sections: [
      {
        title: "Information We Collect",
        content: "When you book a session or contact us, we collect your name, mobile number, email address, event details, and location. We also collect usage data such as pages visited and device information to improve our service.",
      },
      {
        title: "How We Use Your Information",
        content: "Your information is used solely to match you with a creator, confirm bookings, deliver your content, and send service-related communications. We do not sell or share your personal data with third parties for marketing purposes.",
      },
      {
        title: "Content & Media",
        content: "All photos and videos captured during your session are your property. We may request permission to use select content for our portfolio or marketing with your explicit written consent. You can revoke this consent at any time.",
      },
      {
        title: "Data Storage & Security",
        content: "Your data is stored securely on encrypted cloud servers. We retain booking data for up to 2 years for service records. You may request deletion of your data at any time by emailing instoclips@gmail.com.",
      },
      {
        title: "Cookies",
        content: "Our website uses essential cookies to function properly. We do not use tracking or advertising cookies. You can disable cookies in your browser settings without affecting core functionality.",
      },
      {
        title: "Contact",
        content: "For any privacy-related queries, email us at instoclips@gmail.com or call +91 99089 90465.",
      },
    ],
  },
  "Terms of Service": {
    icon: FileText,
    color: "from-pink-500 to-rose-500",
    lastUpdated: "January 2025",
    sections: [
      {
        title: "Acceptance of Terms",
        content: "By booking a session with Instoclips, you agree to these Terms of Service. These terms apply to all customers, creators, and visitors of our platform.",
      },
      {
        title: "Booking & Confirmation",
        content: "A booking is confirmed only after 50% advance payment is received. We reserve the right to cancel unconfirmed bookings. You will receive a confirmation message with your creator's details before the event.",
      },
      {
        title: "Service Delivery",
        content: "Instoclips will make every effort to deliver edited reels on the same day. Delivery timelines may vary based on event duration and complexity. We guarantee a minimum of 1 edited reel per booked session.",
      },
      {
        title: "Revisions",
        content: "Each plan includes 2 free revisions. Revision requests must be submitted within 48 hours of delivery. Additional revisions beyond the included count will be charged at ₹299 per revision.",
      },
      {
        title: "Travelling Charges",
        content: "For events located beyond 15 km from our base location in Jangareddygudem, Andhra Pradesh, additional travelling charges will apply. These will be communicated at the time of booking confirmation.",
      },
      {
        title: "Intellectual Property",
        content: "All raw footage and edited content delivered to you is your property. Instoclips retains no rights to your content unless you have explicitly granted permission for portfolio use.",
      },
      {
        title: "Limitation of Liability",
        content: "Instoclips is not liable for any indirect, incidental, or consequential damages. Our maximum liability is limited to the amount paid for the specific session in question.",
      },
    ],
  },
  "Refund Policy": {
    icon: RefreshCw,
    color: "from-amber-400 to-orange-500",
    lastUpdated: "January 2025",
    sections: [
      {
        title: "Cancellation by Customer",
        content: "Cancellations made 48 hours or more before the event are eligible for a full refund of the advance payment. Cancellations made less than 48 hours before the event will forfeit the advance payment.",
      },
      {
        title: "Cancellation by Instoclips",
        content: "In the rare event that Instoclips cancels a confirmed booking due to unforeseen circumstances, a full refund of all payments made will be processed within 5–7 business days.",
      },
      {
        title: "No-Show Policy",
        content: "If our creator arrives at the confirmed venue and the event is not accessible or the customer is unreachable, it will be treated as a late cancellation and no refund will be issued.",
      },
      {
        title: "Quality Disputes",
        content: "If you are unsatisfied with the delivered content, please raise a dispute within 48 hours of delivery. We will offer up to 2 free revisions. If the issue remains unresolved, a partial refund of up to 50% may be considered at our discretion.",
      },
      {
        title: "Refund Processing",
        content: "Approved refunds are processed to the original payment method within 5–7 business days. UPI and bank transfer refunds may take up to 10 business days depending on your bank.",
      },
      {
        title: "How to Request a Refund",
        content: "Email instoclips@gmail.com with your booking details and reason for refund. Our team will respond within 24 hours.",
      },
    ],
  },
  "Creator Agreement": {
    icon: Users,
    color: "from-green-400 to-emerald-500",
    lastUpdated: "January 2025",
    sections: [
      {
        title: "Eligibility",
        content: "To become an Instoclips creator, you must be 18 years or older, own or have access to an iPhone 12 or above, and be located in or willing to travel within Andhra Pradesh or surrounding regions.",
      },
      {
        title: "Certification",
        content: "All creators must complete the Instoclips certification process, which includes training in iPhone videography, trending reel formats, on-spot editing techniques, and client communication standards.",
      },
      {
        title: "Assignment & Availability",
        content: "Creators are assigned bookings based on proximity and availability. You must confirm or decline assignments within 30 minutes of notification. Repeated declines may affect your assignment priority.",
      },
      {
        title: "Content Standards",
        content: "All content must meet Instoclips quality standards. Reels must be delivered within the agreed timeframe. Creators are responsible for ensuring proper lighting, stable footage, and on-trend editing.",
      },
      {
        title: "Payment to Creators",
        content: "Creator payouts are processed within 48 hours of successful delivery confirmation by the customer. Payout rates are communicated during onboarding and may vary by plan type and event complexity.",
      },
      {
        title: "Confidentiality",
        content: "Creators must maintain strict confidentiality of customer information and event details. Sharing customer data or content without explicit permission is grounds for immediate termination from the platform.",
      },
      {
        title: "Termination",
        content: "Instoclips reserves the right to remove a creator from the platform for quality violations, misconduct, or repeated cancellations. Creators may also voluntarily exit by providing 7 days written notice.",
      },
    ],
  },
};

type PolicyKey = keyof typeof policies;

const LegalModal = ({ policyKey, onClose }: { policyKey: PolicyKey; onClose: () => void }) => {
  const policy = policies[policyKey];
  const Icon = policy.icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-card rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${policy.color} p-6 flex items-start justify-between flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-white text-xl">{policyKey}</h2>
              <p className="text-white/70 text-xs mt-0.5">Last updated: {policy.lastUpdated} · Instoclips</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {policy.sections.map((section, i) => (
            <div key={i}>
              <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${policy.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                  {i + 1}
                </span>
                {section.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2 pl-7">
                {section.content}
              </p>
            </div>
          ))}

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Questions? Contact us at{" "}
              <a href="mailto:instoclips@gmail.com" className="text-primary hover:underline">instoclips@gmail.com</a>
              {" "}or{" "}
              <a href="tel:9908990465" className="text-primary hover:underline">+91 99089 90465</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LegalLinks = () => {
  const [open, setOpen] = useState<PolicyKey | null>(null);

  return (
    <>
      <ul className="space-y-2.5">
        {(Object.keys(policies) as PolicyKey[]).map((key) => {
          const Icon = policies[key].icon;
          return (
            <li key={key}>
              <button
                onClick={() => setOpen(key)}
                className="flex items-center gap-2 text-sm text-hero-foreground/50 hover:text-primary transition-colors group"
              >
                <Icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                {key}
              </button>
            </li>
          );
        })}
      </ul>

      {open && <LegalModal policyKey={open} onClose={() => setOpen(null)} />}
    </>
  );
};
