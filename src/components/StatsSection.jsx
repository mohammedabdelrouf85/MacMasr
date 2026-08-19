import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CONTAINER, FM_FADE_UP, FM_SCALE_IN, FM_VIEWPORT } from '../styles/tokens'

// ─── useCountUp Hook ───────────────────────────────────────────────────────────
const useCountUp = ({ end, duration = 2000, start = 0, enabled = false }) => {
  const [value, setValue] = useState(start)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    setValue(start)
    const startTime = performance.now()
    const range = end - start
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(start + range * easeOutExpo(progress)))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [enabled, end, start, duration])

  return value
}

// ─── useInView ─────────────────────────────────────────────────────────────────
const useInView = (threshold = 0.25) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); ob.disconnect() } },
      { threshold }
    )
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ stat, inView, index }) => {
  const count = useCountUp({ end: stat.value, duration: stat.duration, enabled: inView })
  const formatted = stat.format ? stat.format(count) : count.toLocaleString('ar-EG')

  return (
    <motion.div
      variants={FM_FADE_UP}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
      className="flex flex-col items-center text-center px-6 py-10 relative group"
    >
      {/* Vertical divider (desktop only, not on last card) */}
      {index < 3 && (
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-px h-16 hidden lg:block"
          style={{ background: 'rgba(255,255,255,0.18)' }}
        />
      )}

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg
          group-hover:scale-110 transition-transform duration-300 ease-in-out"
        style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}
      >
        {stat.icon}
      </div>

      {/* Number */}
      <div
        className="font-black leading-none mb-2 tabular-nums"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
          color: 'white',
          textShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}
      >
        {formatted}
        <span className="text-[#FFC72C]">{stat.suffix}</span>
      </div>

      <div className="text-white/90 font-black text-base mb-1 leading-snug">{stat.label}</div>
      <div className="text-white/55 text-xs font-medium leading-relaxed">{stat.sublabel}</div>

      {/* Hover underline */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 h-0.5 w-0
          group-hover:w-10 rounded-full transition-all duration-300 ease-in-out"
        style={{ background: '#FFC72C' }}
      />
    </motion.div>
  )
}

// ─── Feature Card ──────────────────────────────────────────────────────────────
const FeatureCard = ({ feature, index, inView }) => (
  <motion.div
    variants={FM_SCALE_IN}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
    custom={index + 4}          /* offset so features animate after stats */
    className="group relative bg-white rounded-3xl p-7 flex flex-col gap-4 overflow-hidden h-full
      transition-all duration-300 ease-in-out
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/12"
    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
  >
    {/* Hover bg tint */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
      style={{ background: `linear-gradient(135deg,${feature.gradFrom}08,${feature.gradTo}04)` }}
    />

    {/* Icon */}
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0
        group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-in-out"
      style={{ background: `linear-gradient(135deg,${feature.gradFrom},${feature.gradTo})` }}
    >
      {feature.icon}
    </div>

    <div>
      <h3 className="font-black text-gray-900 text-lg mb-2 leading-snug">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
    </div>

    <div
      className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black"
      style={{ background: `${feature.gradFrom}15`, color: feature.gradFrom }}
    >
      {feature.metricIcon} {feature.metric}
    </div>

    {/* Bottom accent */}
    <div
      className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl
        scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-in-out
        origin-right group-hover:origin-left"
      style={{ background: `linear-gradient(90deg,${feature.gradFrom},${feature.gradTo})` }}
    />
  </motion.div>
)

// ─── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: '🏪', value: 40000, suffix: '+', label: 'فرع حول العالم', sublabel: 'في 6 قارات بدون توقف', duration: 2200,
    format: (n) => n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : n.toString() },
  { icon: '🌍', value: 100,   suffix: '+', label: 'دولة حاضرين فيها', sublabel: 'تغطية عالمية شاملة', duration: 1800,
    format: (n) => n.toString() },
  { icon: '🍔', value: 69,    suffix: 'M+', label: 'طلب يوميًا', sublabel: 'عملاء سعداء كل يوم', duration: 2000,
    format: (n) => n.toString() },
  { icon: '🏆', value: 83,    suffix: '',  label: 'سنة خبرة', sublabel: 'منذ 1940 ونحن نكبر', duration: 1600,
    format: (n) => n.toString() },
]

const FEATURES = [
  { icon: '⚡', title: 'سرعة التحضير',
    desc: 'نلتزم بتسليم كل طلب خلال 3 دقائق داخل الفرع أو 20 دقيقة للتوصيل — مضمون 100%.',
    metric: 'أقل من 3 دقائق', metricIcon: '⏱️', gradFrom: '#DA291C', gradTo: '#f05945' },
  { icon: '🌿', title: 'جودة المكونات',
    desc: 'نختار فقط اللحوم الطازجة 100% بدون مواد حافظة، والخضروات المقطوفة يوميًا من مزارعنا المعتمدة.',
    metric: 'طازج يومياً', metricIcon: '✅', gradFrom: '#27ae60', gradTo: '#52c77f' },
  { icon: '🛡️', title: 'معايير النظافة العالمية',
    desc: 'مطابقون لأعلى معايير ISO للسلامة الغذائية. مفتشون معتمدون يزوروننا بشكل دوري لضمان أفضل بيئة.',
    metric: 'ISO 22000 معتمد', metricIcon: '🏅', gradFrom: '#2980b9', gradTo: '#5dade2' },
]

// ─── Stats Section ─────────────────────────────────────────────────────────────
const StatsSection = () => {
  const [sectionRef, inView] = useInView(0.15)

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="relative overflow-hidden py-20 px-4 md:px-8"
      style={{ direction: 'rtl' }}
    >
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg,#DA291C 0%,#b01f15 40%,#8c1510 100%)' }} />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle,#FFC72C,transparent)' }} />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle,#FFC72C,transparent)' }} />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className={`relative ${CONTAINER}`}>

        {/* Header */}
        <motion.div
          variants={FM_FADE_UP}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(255,199,44,0.5)' }} />
            <span
              className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFC72C', border: '1px solid rgba(255,199,44,0.3)' }}
            >
              📊 أرقام تتكلم عن نفسها
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(255,199,44,0.5)' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            أرقام تثبت <span style={{ color: '#FFC72C' }}>تميّزنا</span> 🏆
          </h2>
          <p className="text-white/70 text-lg max-w-lg mx-auto leading-relaxed">
            من ماكدونالدز الأول عام 1940 حتى اليوم — إمبراطورية عالمية بأرقام لا تُصدَّق
          </p>
        </motion.div>

        {/* Stat Cards Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 mb-16 rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} inView={inView} index={i} />
          ))}
        </div>

        {/* Feature Cards */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
              ليه تختار <span style={{ color: '#FFC72C' }}>ماك مصر</span>؟
            </h3>
            <p className="text-white/55 text-sm">ثلاثة أسباب رئيسية بتميّزنا عن الجميع</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
