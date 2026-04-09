import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  Phone,
  Award,
  Shield,
  Star,
  Clock,
  ArrowRight,
  ArrowDown,
  Play,
  ChevronRight,
  MapPin,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   VARIANT A — "The Editorial Split"
   Oversized serif headline left, full-bleed image right
   with a diagonal clip-path slice
   ═══════════════════════════════════════════════════════ */
function HeroA() {
  return (
    <section className="relative min-h-screen bg-brand-warm overflow-hidden">
      {/* Diagonal image panel */}
      <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
            backgroundImage: `url('https://lalicatacement.com/wp-content/uploads/2023/12/driveway31.jpeg')`,
          }}
        />
        <div
          className="absolute inset-0 bg-brand-navy/10"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
      </div>

      {/* Gold accent strip at diagonal edge */}
      <div className="absolute top-0 right-[45%] w-[3px] h-full bg-gradient-to-b from-brand-gold/60 via-brand-gold/20 to-transparent hidden lg:block" style={{ transform: "skewX(-5deg)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-px bg-brand-gold" />
            <span className="text-brand-gold-dark text-xs font-bold uppercase tracking-[0.2em]">
              Since 1965
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[3.5rem] sm:text-7xl lg:text-8xl font-semibold text-brand-navy leading-[0.9] tracking-tight mb-8"
          >
            The Name
            <br />
            Behind the
            <br />
            <span className="text-brand-gold italic">Concrete.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-lg text-stone-600 leading-relaxed max-w-md mb-10"
          >
            Three generations. One standard of excellence.
            Wisconsin's most awarded concrete contractor.
          </motion.p>

          {/* Inline phone CTA — not a button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center gap-6"
          >
            <a
              href="tel:+12628954992"
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-brand-navy flex items-center justify-center group-hover:bg-brand-navy-light transition-colors shadow-lg shadow-brand-navy/20">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-stone-500 uppercase tracking-wider font-medium">
                  Free Estimate
                </div>
                <div className="text-xl font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                  262-895-4992
                </div>
              </div>
            </a>
            <div className="w-px h-10 bg-stone-300" />
            <a
              href="#gallery"
              className="text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors cursor-pointer flex items-center gap-1"
            >
              View Work
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Trust bar — horizontal compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-16 flex items-center gap-5 text-xs text-stone-500"
          >
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-brand-gold" />
              <span>#1 WI Award</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-gold" />
              <span>A+ BBB</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-brand-gold" />
              <span>5.0 Google</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile image fallback */}
      <div className="lg:hidden px-6 pb-12">
        <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://lalicatacement.com/wp-content/uploads/2023/12/driveway31.jpeg"
            alt="LaLicata concrete driveway"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   VARIANT B — "The Overlap Stack"
   Full-width image with text card overlapping from bottom,
   magazine-style composition with asymmetric layout
   ═══════════════════════════════════════════════════════ */
function HeroB() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen bg-brand-warm overflow-hidden">
      {/* Full hero image */}
      <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img
            src="https://lalicatacement.com/wp-content/uploads/2023/12/driveway31.jpeg"
            alt="Premium concrete driveway by LaLicata"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-warm via-transparent to-brand-navy/20" />

        {/* Top badge floating on image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-28 left-6 lg:left-12 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2"
        >
          <Award className="w-4 h-4 text-brand-gold" />
          <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">#1 WI Concrete Design Award</span>
        </motion.div>
      </div>

      {/* Overlapping content card */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 -mt-40 lg:-mt-52">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-8 lg:p-14 shadow-2xl shadow-stone-900/8 border border-stone-100 max-w-3xl"
        >
          <div className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Est. 1965 — 3rd Generation
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-navy leading-[0.95] tracking-tight mb-6">
            Concrete Craftsmanship,
            <br />
            <span className="text-brand-gold italic">Perfected.</span>
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed max-w-lg mb-8">
            From custom stamped driveways to precision sidewalks — the LaLicata family
            has set the standard in Southeast Wisconsin for over 60 years.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <a
              href="tel:+12628954992"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-light transition-all cursor-pointer hover:shadow-xl hover:shadow-brand-navy/15 hover:-translate-y-0.5 group"
            >
              <Phone className="w-5 h-5" />
              Get Free Estimate
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 text-sm text-stone-500">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                <span>5.0 Google</span>
              </div>
              <span className="text-stone-300">|</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-gold" />
                <span>A+ BBB</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-20" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   VARIANT C — "The Horizontal Ticker"
   Minimal text, massive serif number, horizontal
   scrolling ticker of services, image in circle cutout
   ═══════════════════════════════════════════════════════ */
function HeroC() {
  return (
    <section className="relative min-h-screen bg-brand-warm overflow-hidden flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left — big number + text */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-display text-[10rem] lg:text-[13rem] font-bold text-brand-navy/[0.06] leading-none -mb-16 lg:-mb-20 select-none">
                  60
                </div>
                <div className="relative">
                  <div className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    Years of Excellence
                  </div>
                  <h1 className="font-display text-4xl sm:text-5xl font-semibold text-brand-navy leading-[1] tracking-tight mb-6">
                    Built on
                    <br />
                    Family. Built
                    <br />
                    on <span className="text-brand-gold italic">Trust.</span>
                  </h1>
                  <p className="text-stone-600 leading-relaxed max-w-sm mb-8">
                    LaLicata Cement — three generations of award-winning concrete
                    work across Southeast Wisconsin.
                  </p>
                  <a
                    href="tel:+12628954992"
                    className="inline-flex items-center gap-3 px-7 py-3.5 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-light transition-all cursor-pointer group"
                  >
                    <Phone className="w-4 h-4" />
                    262-895-4992
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Center — circular image */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl shadow-stone-900/10 border-4 border-white">
                  <img
                    src="https://lalicatacement.com/wp-content/uploads/2023/12/driveway33.jpeg"
                    alt="Decorative concrete patio"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Small floating badge */}
                <div className="absolute -top-2 -right-2 bg-brand-gold text-brand-navy-deep rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-[10px] font-bold uppercase">Est.</span>
                  <span className="font-display text-lg font-bold leading-none">1965</span>
                </div>
              </motion.div>
            </div>

            {/* Right — vertical list of services */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-3 hidden lg:block"
            >
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
                Our Services
              </div>
              {[
                "Driveways & Patios",
                "Sidewalks & Steps",
                "Stamped Concrete",
                "Brick Borders",
                "Excavating",
                "Landscaping",
              ].map((service, i) => (
                <div
                  key={service}
                  className="py-3 border-b border-stone-200 last:border-0 flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-sm text-stone-700 group-hover:text-brand-navy font-medium transition-colors">
                    {service}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-brand-gold transition-colors" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="bg-brand-navy py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {Array.from({ length: 3 }).map((_, rep) =>
            ["Driveways", "Patios", "Sidewalks", "Stamped Concrete", "Brick Borders", "Excavating", "Free Estimates"].map((item, i) => (
              <span key={`${rep}-${i}`} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              </span>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   VARIANT D — "The Architectural Grid"
   Bento-style grid layout with image tiles, text blocks,
   and a map block. Feels like a dashboard / lookbook.
   ═══════════════════════════════════════════════════════ */
function HeroD() {
  return (
    <section className="relative min-h-screen bg-brand-warm pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top row — headline spanning full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-brand-navy leading-[0.95] tracking-tight">
            LaLicata Cement <span className="text-brand-gold italic">Contractor</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-px bg-brand-gold" />
            <span className="text-sm text-stone-500 font-medium">
              Southeast Wisconsin's premier concrete craftsmen since 1965
            </span>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px] lg:auto-rows-[200px]">
          {/* Hero image — large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer"
          >
            <img
              src="https://lalicatacement.com/wp-content/uploads/2023/12/driveway31.jpeg"
              alt="Premium driveway"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="text-white/70 text-xs uppercase tracking-wider mb-1">Featured</div>
              <div className="text-white text-lg font-semibold">Custom Stamped Driveways</div>
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-2xl bg-brand-navy p-6 flex flex-col justify-between"
          >
            <div>
              <Phone className="w-6 h-6 text-brand-gold mb-3" />
              <div className="text-xs text-white/50 uppercase tracking-wider">Free Estimate</div>
            </div>
            <div>
              <a href="tel:+12628954992" className="text-xl font-bold text-white hover:text-brand-gold transition-colors cursor-pointer">
                262-895-4992
              </a>
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="rounded-2xl bg-white border border-stone-200 p-6 flex flex-col justify-between"
          >
            <div className="font-display text-5xl font-bold text-brand-navy">60+</div>
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider">Years of</div>
              <div className="text-sm text-brand-navy font-semibold">Excellence</div>
            </div>
          </motion.div>

          {/* Image tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src="https://lalicatacement.com/wp-content/uploads/2023/12/driveway33.jpeg"
              alt="Patio work"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </motion.div>

          {/* Award card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="rounded-2xl bg-brand-gold/10 border border-brand-gold/20 p-6 flex flex-col justify-between"
          >
            <Award className="w-7 h-7 text-brand-gold" />
            <div>
              <div className="text-sm font-semibold text-brand-navy">#1 WI Concrete</div>
              <div className="text-xs text-stone-500">Design Award Winner</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 flex flex-wrap items-center justify-between bg-white rounded-2xl border border-stone-200 px-8 py-5"
        >
          <div className="flex items-center gap-6">
            {[
              { icon: Shield, text: "A+ BBB Rating" },
              { icon: Star, text: "5.0 Google Reviews" },
              { icon: Clock, text: "3rd Generation" },
              { icon: MapPin, text: "Muskego, WI" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-stone-600">
                <item.icon className="w-4 h-4 text-brand-gold" />
                <span className="hidden sm:inline">{item.text}</span>
              </div>
            ))}
          </div>
          <a
            href="#services"
            className="text-sm font-semibold text-brand-navy hover:text-brand-gold transition-colors cursor-pointer flex items-center gap-1"
          >
            Explore Services
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   VARIANTS PAGE
   ═══════════════════════════════════════════ */
export default function HeroVariants() {
  const [active, setActive] = useState(0);
  const variants = [
    { name: "A — Editorial Split", desc: "Diagonal clip-path, serif headline, inline phone CTA", component: HeroA },
    { name: "B — Overlap Stack", desc: "Full-bleed image with overlapping white card", component: HeroB },
    { name: "C — Horizontal Ticker", desc: "Giant number, circular image, scrolling service ticker", component: HeroC },
    { name: "D — Bento Grid", desc: "Architectural bento layout with image/stat/CTA tiles", component: HeroD },
  ];

  const ActiveHero = variants[active].component;

  return (
    <div className="min-h-screen bg-brand-warm">
      {/* Variant switcher bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-2">
            Hero Variants:
          </span>
          {variants.map((v, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                active === i
                  ? "bg-brand-navy text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-2">
          <p className="text-xs text-stone-500">{variants[active].desc}</p>
        </div>
      </div>

      {/* Active hero */}
      <div className="pt-[88px]">
        <ActiveHero key={active} />
      </div>
    </div>
  );
}
