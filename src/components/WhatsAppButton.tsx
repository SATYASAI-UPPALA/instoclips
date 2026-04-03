import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

const PHONE = "919908990465";

const QUICK_REPLIES = [
  "Hi! I want to book a reel session 🎬",
  "What are your pricing plans?",
  "I need reels for my wedding 💍",
  "Tell me more about Instoclips",
];

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const handleSend = () => {
    if (!message.trim()) return;
    const encoded = encodeURIComponent(message.trim());
    setSent(true);
    setTimeout(() => {
      window.open(`https://wa.me/${PHONE}?text=${encoded}`, "_blank");
      setSent(false);
      setMessage("");
      setOpen(false);
    }, 800);
  };

  const handleQuick = (text: string) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat popup */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[320px] sm:w-[340px] transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 flex flex-col" style={{ maxHeight: "480px" }}>

          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                IC
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Instoclips</p>
              <p className="text-[#a8d5a2] text-[11px]">Typically replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Chat body */}
          <div className="bg-[#ECE5DD] flex-1 px-3 py-4 space-y-3 overflow-y-auto"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5b8a8' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          >
            {/* Bot greeting bubble */}
            <div className="flex items-end gap-2">
              <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 mb-1">IC</div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2.5 shadow-sm max-w-[85%]">
                <p className="text-[13px] text-gray-800 leading-relaxed">
                  👋 Hey! Welcome to <span className="font-semibold text-[#075E54]">Instoclips</span>
                </p>
                <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">
                  India's #1 instant reel service. How can we help you today?
                </p>
                <p className="text-[10px] text-gray-400 text-right mt-1">now</p>
              </div>
            </div>

            {/* Quick reply chips */}
            <div className="flex flex-col gap-1.5 pl-8">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuick(q)}
                  className="text-left text-[12px] text-[#075E54] bg-white border border-[#25D366]/30 rounded-xl px-3 py-2 hover:bg-[#25D366]/10 transition-colors shadow-sm font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Sent message preview */}
            {sent && message && (
              <div className="flex justify-end">
                <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm max-w-[85%]">
                  <p className="text-[12px] text-gray-800">{message}</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1 flex items-center justify-end gap-1">
                    now
                    <svg className="w-3 h-3 text-[#53bdeb]" viewBox="0 0 16 11" fill="currentColor">
                      <path d="M11.071.653a.75.75 0 0 1 .025 1.06l-6.5 7a.75.75 0 0 1-1.085 0l-3-3.5a.75.75 0 1 1 1.138-.976L4.5 7.06l5.996-6.382a.75.75 0 0 1 1.06-.025h.015z"/>
                      <path d="M14.571.653a.75.75 0 0 1 .025 1.06l-6.5 7a.75.75 0 0 1-1.085 0 .75.75 0 0 1 0-1.06l6.5-7a.75.75 0 0 1 1.06.025v-.025z"/>
                    </svg>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="bg-[#F0F0F0] px-2 py-2 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-white rounded-2xl px-4 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-400 resize-none outline-none border-none shadow-sm max-h-24 overflow-y-auto leading-relaxed"
              style={{ scrollbarWidth: "none" }}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                message.trim()
                  ? "bg-[#25D366] hover:bg-[#1da851] shadow-md hover:scale-105 active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </div>

      {/* FAB button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 ${open ? "rotate-0" : ""}`}
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
      </button>
    </>
  );
};

export default WhatsAppButton;
