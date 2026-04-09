import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import {
  Phone,
  MapPin,
  Clock,
  Award,
  Shield,
  Star,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Quote,
  CheckCircle2,
  Users,
  Hammer,
  Home as HomeIcon,
  TreePine,
  Truck,
  Footprints,
  Play,
} from "lucide-react";

/* ─── Scroll-triggered reveal ─── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger wrapper ─── */
function Stagger({ children, className = "", stagger = 0.08 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.6, delay: i * stagger, ease: [0.16, 1, 0.3, 1] }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR — Light
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-stone-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-brand-navy border border-brand-navy flex items-center justify-center">
              <span className="font-display text-white font-bold text-lg">L</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-brand-navy text-lg font-semibold tracking-tight leading-tight">
                LaLicata
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-dark font-semibold">
                Cement Contractor
              </div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-stone-600 hover:text-brand-navy font-medium transition-colors duration-200 relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+12628954992"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white text-sm font-semibold rounded-lg hover:bg-brand-navy-light transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-brand-navy/15"
            >
              <Phone className="w-4 h-4" />
              262-895-4992
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-brand-navy cursor-pointer hover:text-brand-gold transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-stone-200 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-stone-700 hover:text-brand-navy hover:bg-brand-cream rounded-lg transition-colors cursor-pointer font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+12628954992"
                className="mt-4 flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy text-white font-semibold rounded-lg cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call for Free Estimate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════
   HERO — Editorial Split (Variant A)
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-warm overflow-hidden">
      {/* Diagonal image panel — bordered edge, no gold strip */}
      <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center border-l-[3px] border-brand-gold/25"
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

          {/* Inline phone CTA */}
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

          {/* Trust bar */}
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

/* ═══════════════════════════════════════════
   STATS BAR — Light
   ═══════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { value: "60+", label: "Years in Business" },
    { value: "3rd", label: "Generation Owners" },
    { value: "1000+", label: "Projects Completed" },
    { value: "#1", label: "WI Design Award" },
  ];
  return (
    <div className="relative z-10 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl sm:text-5xl font-bold text-brand-navy mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-stone-500 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEGACY — Variant C rework (big number, circle image, timeline)
   ═══════════════════════════════════════════ */
function Legacy() {
  const generations = [
    {
      era: "1965",
      title: "The Foundation",
      name: "Tony Sr. & Mary Ann LaLicata",
      text: "Established the company with uncompromising standards. Built the LaLicata name from the ground up in Southeast Wisconsin.",
    },
    {
      era: "1980s",
      title: "The Growth",
      name: "Anthony Sr. (Tony)",
      text: "Joined the family trade with passion, mentored by his father for years. Took over management by the mid-90s and expanded the operation.",
    },
    {
      era: "2010s",
      title: "The Future",
      name: "Anthony Jr. (Tony III) & Nino",
      text: "Third-generation owners carrying forward six decades of expertise, family values, and an unwavering commitment to impeccable workmanship.",
    },
  ];

  return (
    <section id="about" className="relative py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left — big number + headline */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="font-display text-[10rem] lg:text-[13rem] font-bold text-brand-navy/[0.05] leading-none -mb-16 lg:-mb-20 select-none">
                60
              </div>
              <div className="relative">
                <div className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Years of Excellence
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-brand-navy leading-[1] tracking-tight mb-6">
                  Built on
                  <br />
                  Family. Built
                  <br />
                  on <span className="text-brand-gold italic">Trust.</span>
                </h2>
                <p className="text-stone-600 leading-relaxed max-w-sm mb-8">
                  From 1965 to the present day, Tony LaLicata Cement Contractor has grown
                  to be one of the leading cement contractors in Southeastern Wisconsin.
                  Our success is dictated by strong family values, work ethic, and
                  impeccable workmanship.
                </p>
                <div className="flex items-center gap-4">
                  {[
                    { icon: Users, label: "Family Owned" },
                    { icon: Award, label: "#1 WI Award" },
                    { icon: Shield, label: "A+ BBB" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5 text-xs text-stone-500">
                      <item.icon className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Center — circular image */}
          <div className="lg:col-span-3 flex justify-center">
            <Reveal delay={0.15}>
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl shadow-stone-900/10 border-4 border-white">
                  <img
                    src="https://lalicatacement.com/wp-content/uploads/2021/02/Tony-Lalicata-Cement.jpeg"
                    alt="Tony LaLicata Cement crew at work"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-brand-gold text-brand-navy-deep rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-[10px] font-bold uppercase">Est.</span>
                  <span className="font-display text-lg font-bold leading-none">1965</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — generation timeline */}
          <div className="lg:col-span-4">
            <Reveal delay={0.25}>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">
                Three Generations
              </div>
              {generations.map((gen, i) => (
                <div
                  key={gen.era}
                  className={`relative pl-8 pb-8 ${i < generations.length - 1 ? "border-l-2 border-stone-200" : "border-l-2 border-transparent"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-gold border-[3px] border-white shadow-sm" />
                  <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-1">
                    {gen.era} — {gen.title}
                  </div>
                  <div className="text-sm font-semibold text-brand-navy mb-1">
                    {gen.name}
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {gen.text}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   VIDEO — YouTube Embed
   ═══════════════════════════════════════════ */
function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-28 lg:py-36 bg-brand-cream">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <div className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Featured On TV
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-brand-navy mb-4">
            As Seen on <span className="text-brand-gold italic">Builders Showcase</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Watch our feature on Builders Showcase & Remodeling Television and see
            why LaLicata is Southeast Wisconsin's most trusted cement contractor.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10 bg-stone-200 group">
              {!playing ? (
                <>
                  <img
                    src="https://lalicatacement.com/wp-content/uploads/2024/01/Tony-LaLicata-video-cover.png"
                    alt="Tony LaLicata on Builders Showcase TV"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/30 transition-colors" />
                  <button
                    onClick={() => setPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-brand-navy ml-1 fill-brand-navy" />
                    </div>
                  </button>
                </>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/lRq2bfb4Ewo?autoplay=1&rel=0"
                  title="Tony Lalicata Cement on Builders Showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES — Light
   ═══════════════════════════════════════════ */
function Services() {
  const services = [
    {
      icon: HomeIcon,
      title: "Driveways & Patios",
      description: "Custom concrete driveways and patios that elevate curb appeal with expert craftsmanship and durable materials.",
      image: "https://lalicatacement.com/wp-content/uploads/2023/12/driveway31.jpeg",
    },
    {
      icon: Footprints,
      title: "Sidewalks, Stoops & Steps",
      description: "Professionally installed walkways, stoops, and steps designed to blend seamlessly with your landscape.",
      image: "https://lalicatacement.com/wp-content/uploads/2023/12/driveway33.jpeg",
    },
    {
      icon: Hammer,
      title: "Stamped & Colored Concrete",
      description: "Imprinted patterns and vibrant colors for unique, visually stunning surfaces that transform any space.",
      image: "https://lalicatacement.com/wp-content/uploads/2023/12/driveway4.jpeg",
    },
    {
      icon: TreePine,
      title: "Brick Borders & Inlays",
      description: "Precision-set brick borders and decorative inlays that frame your concrete with distinctive character.",
      image: "https://lalicatacement.com/wp-content/uploads/2023/12/crew1.jpeg",
    },
    {
      icon: Truck,
      title: "Excavating & Trucking",
      description: "Full-service excavation and hauling to prepare your site properly before concrete is poured.",
      image: "https://lalicatacement.com/wp-content/uploads/2023/12/truck3.jpeg",
    },
    {
      icon: TreePine,
      title: "Landscaping Services",
      description: "Complete landscaping alongside your concrete installation for a cohesive outdoor transformation.",
      image: "https://lalicatacement.com/wp-content/uploads/2023/12/trailer.jpeg",
    },
  ];

  return (
    <section id="services" className="relative py-28 lg:py-36 bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <div className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            What We Do
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-brand-navy mb-4">
            Premium Concrete <span className="text-brand-gold italic">Services</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            From removal and replacement to custom decorative finishes — six decades
            of expertise behind every project.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-brand-gold/40 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-stone-900/5">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 h-[140px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors shrink-0">
                      <s.icon className="w-5 h-5 text-brand-gold-dark" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-navy">{s.title}</h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12">
          <div className="bg-brand-cream border border-brand-gold/15 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8 text-brand-gold" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-brand-navy mb-2">
                Specializing in Removal & Replacement
              </h3>
              <p className="text-stone-600">
                Need to refurbish aging concrete? We specialize in complete tear-out and
                replacement — restoring your property with precision and minimal disruption.
              </p>
            </div>
            <a
              href="tel:+12628954992"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-light transition-all cursor-pointer hover:shadow-lg hover:shadow-brand-navy/15"
            >
              Free Estimate
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   GALLERY — Light
   ═══════════════════════════════════════════ */
function Gallery() {
  const images = [
    { src: "https://lalicatacement.com/wp-content/uploads/2023/12/driveway31.jpeg", alt: "Custom stamped concrete driveway" },
    { src: "https://lalicatacement.com/wp-content/uploads/2023/12/driveway33.jpeg", alt: "Decorative concrete patio" },
    { src: "https://lalicatacement.com/wp-content/uploads/2023/12/driveway4.jpeg", alt: "Colored concrete walkway" },
    { src: "https://lalicatacement.com/wp-content/uploads/2023/12/crew1.jpeg", alt: "LaLicata crew finishing concrete" },
    { src: "https://lalicatacement.com/wp-content/uploads/2023/12/truck3.jpeg", alt: "LaLicata cement truck on site" },
    { src: "https://lalicatacement.com/wp-content/uploads/2023/12/trailer.jpeg", alt: "Equipment at project site" },
  ];

  return (
    <section id="gallery" className="relative py-28 lg:py-36 bg-brand-warm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <div className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Our Work
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-brand-navy mb-4">
            Built to <span className="text-brand-gold italic">Last</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Every project showcases our commitment to quality craftsmanship
            across Southeast Wisconsin.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4" stagger={0.06}>
          {images.map((img, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-stone-900/8 transition-shadow duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/30 transition-colors duration-300 flex items-end">
                <div className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-sm text-white font-medium drop-shadow-lg">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS — Light
   ═══════════════════════════════════════════ */
function Testimonials() {
  const testimonials = [
    {
      name: "Kathy Egelkrout",
      project: "Walkway & Driveway",
      text: "I'm not sure if 5 stars is enough for this amazing family business. I have never seen such a hard working crew of polite focused workers. A well oiled machine is putting it lightly. Our walkway and drive have that signature LaLicata elegance.",
    },
    {
      name: "Richard Hannig",
      project: "Driveway",
      text: "I just had my home driveway completed by Tony Lalicata Cement Contractors. The driveway looks fantastic! The workers were very professional. Communication and customer service was A+. I would highly recommend them.",
    },
    {
      name: "Tyler D",
      project: "Driveway",
      text: "10/10!!! HUGE shoutout to Tony and his crew for the amazing and beautiful driveway! They have an amazing crew, very friendly, knowledgeable, 20+ years of experience, and they were in and out in Two days!",
    },
  ];

  return (
    <section id="testimonials" className="relative py-28 lg:py-36 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
      <div className="absolute top-20 left-10 text-brand-gold/[0.06] font-display text-[280px] leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <Reveal className="text-center mb-16">
          <div className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Testimonials
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-brand-navy mb-4">
            What Our Clients <span className="text-brand-gold italic">Say</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Real reviews from real homeowners across the Greater Milwaukee area.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <div className="h-full flex flex-col bg-brand-warm border border-stone-200 rounded-2xl p-8 hover:border-brand-gold/30 hover:shadow-lg hover:shadow-stone-900/5 transition-all duration-500 group">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-brand-gold/25 mb-4 group-hover:text-brand-gold/40 transition-colors" />
                <p className="text-stone-700 leading-relaxed text-[15px] flex-1">{t.text}</p>
                <div className="border-t border-stone-200 pt-6 mt-8">
                  <div className="font-semibold text-brand-navy">{t.name}</div>
                  <div className="text-sm text-brand-gold-dark">{t.project}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-cream rounded-full border border-stone-200">
            <div className="flex -space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="text-sm text-stone-600">
              5.0 Rating on <span className="text-brand-navy font-semibold">Google</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA + CONTACT — Light
   ═══════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-brand-warm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="mb-24">
          <div className="relative rounded-3xl overflow-hidden bg-brand-navy p-12 lg:p-20 text-center">
            <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20512%20512%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20baseFrequency%3D%220.65%22%20numOctaves%3D%224%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22/%3E%3C/svg%3E')]" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
                Ready to Start Your
                <br />
                <span className="text-brand-gold italic">New Project?</span>
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
                Get a free, no-obligation estimate from the most trusted concrete
                contractor in SE Wisconsin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+12628954992"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-gold text-brand-navy-deep font-bold text-lg rounded-xl hover:bg-brand-gold-light transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-brand-gold/30 hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  262-895-4992
                </a>
                <a
                  href="mailto:info@lalicatacement.com"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-white font-semibold text-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  Send a Message
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-stone-900/8 border border-stone-200">
            <iframe
              src="https://www.google.com/maps?q=S110+W19506+Muskego+Dam+Drive,+Muskego,+WI+53150&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tony LaLicata Cement Contractor location"
              className="w-full"
            />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-stone-200 px-8 py-5">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
              <div>
                <div className="font-semibold text-brand-navy text-sm">S110 W19506 Muskego Dam Drive, Muskego, WI 53150</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>Serving Greater Milwaukee, Waukesha, Racine & SE Wisconsin</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER — Light
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative bg-brand-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="font-display text-brand-gold font-bold text-lg">L</span>
              </div>
              <div>
                <div className="font-display text-white text-lg font-semibold tracking-tight leading-tight">
                  Tony LaLicata
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-muted font-medium">
                  Cement Contractor, Inc.
                </div>
              </div>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              Three generations of concrete excellence serving Southeast Wisconsin.
              Family-owned. Award-winning. Committed to craftsmanship since 1965.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <Shield className="w-3.5 h-3.5 text-brand-gold-muted" />
                A+ BBB
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <Award className="w-3.5 h-3.5 text-brand-gold-muted" />
                MBA Parade of Homes
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Services", "Gallery", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/40 hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              {["Driveways & Patios", "Sidewalks & Steps", "Stamped Concrete", "Brick Borders", "Excavating"].map((s) => (
                <li key={s}><span className="text-sm text-white/40">{s}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Tony LaLicata Cement Contractor, Inc. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Serving Milwaukee, Waukesha, Racine & Surrounding Areas
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Legacy />
      <VideoSection />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
