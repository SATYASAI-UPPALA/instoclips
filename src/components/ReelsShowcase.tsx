import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

import img1 from "@/assets/imgs/Screenshot_20260403-215108_Gallery.png";
import img2 from "@/assets/imgs/Screenshot_20260403-215127_Gallery.png";
import img3 from "@/assets/imgs/Screenshot_20260403-215224_Gallery.png";
import img4 from "@/assets/imgs/Screenshot_20260403-215400_Gallery.png";
import img5 from "@/assets/imgs/Screenshot_20260403-215436_Gallery.png";
import img6 from "@/assets/imgs/Screenshot_20260403-215449_Gallery.png";
import img7 from "@/assets/imgs/Screenshot_20260403-215500_Gallery.png";
import img8 from "@/assets/imgs/Screenshot_20260403-215514_Gallery.png";
import img9 from "@/assets/imgs/Screenshot_20260403-215622_Gallery.png";

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

// Split into two rows
const ROW1 = [img1, img2, img3, img4, img5];
const ROW2 = [img6, img7, img8, img9, img1, img2];

const ReelCard = ({ src, index, onClick }: { src: string; index: number; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="flex-shrink-0 w-40 sm:w-48 aspect-[9/16] rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.03]"
  >
    <img
      src={src}
      alt={`Reel ${index + 1}`}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {/* Dark overlay on hover */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

    {/* Play button */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-xl">
        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
      </div>
    </div>

    {/* Bottom gradient + label */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-[10px] text-white/80 font-medium">Instoclips</span>
    </div>
  </div>
);

const Lightbox = ({ index, onClose, onPrev, onNext }: {
  index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

    {/* Close */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
    >
      <X className="w-5 h-5 text-white" />
    </button>

    {/* Counter */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
      {index + 1} / {IMAGES.length}
    </div>

    {/* Prev */}
    <button
      onClick={(e) => { e.stopPropagation(); onPrev(); }}
      className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
    >
      <ChevronLeft className="w-5 h-5 text-white" />
    </button>

    {/* Image */}
    <div className="relative z-10 max-h-[88vh] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <img
        src={IMAGES[index]}
        alt={`Reel ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Next */}
    <button
      onClick={(e) => { e.stopPropagation(); onNext(); }}
      className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
    >
      <ChevronRight className="w-5 h-5 text-white" />
    </button>
  </div>
);

const ReelsShowcase = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((p) => ((p ?? 0) - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setLightboxIndex((p) => ((p ?? 0) + 1) % IMAGES.length);

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mb-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-white mb-5">
          <Play className="w-3 h-3" /> Our Work
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold">
          Our <span className="gradient-text">Reels</span> Speak
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Real moments. Real events. Delivered in minutes.
        </p>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee">
          {[...ROW1, ...ROW1].map((src, i) => (
            <ReelCard key={`r1-${i}`} src={src} index={i % ROW1.length} onClick={() => open(i % ROW1.length)} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee-reverse">
          {[...ROW2, ...ROW2].map((src, i) => (
            <ReelCard key={`r2-${i}`} src={src} index={(i % ROW2.length) + ROW1.length} onClick={() => open((i % ROW2.length) + ROW1.length >= IMAGES.length ? (i % ROW2.length) : (i % ROW2.length) + ROW1.length)} />
          ))}
        </div>
      </div>

      {/* Tap hint */}
      <p className="text-center text-xs text-muted-foreground/50 mt-6">Tap any image to view full screen</p>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
};

export default ReelsShowcase;
