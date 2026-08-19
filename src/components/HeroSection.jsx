import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Navbar from './Navbar'
import { FM_FADE_UP, FM_VIEWPORT } from '../styles/tokens'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=85&auto=format&fit=crop'

const HeroSection = () => {
  const container = useRef(null)

  useGSAP(() => {
    // Parallax background
    gsap.to('.hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    // Parallax floating emojis
    gsap.utils.toArray('.hero-emoji-wrapper').forEach((el, i) => {
      gsap.to(el, {
        y: (i + 1) * -60,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    })
  }, { scope: container })

  return (
    <>
      <Navbar />

      <section
        ref={container}
        id="hero"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{ direction: 'rtl' }}
      >
        {/* Background Image */}
        <div className="absolute -inset-10 z-0">
          <img
            src={HERO_IMAGE}
            alt="وجبة ماكدونالدز شهية"
            className="hero-bg w-full h-full object-cover object-center"
            style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
          />
        </div>

        {/* Multi-layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 z-0" />
        <div
          className="absolute inset-0 opacity-15 z-0"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, #DA291C 0%, transparent 60%)' }}
        />

        {/* Floating Food Icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {['🍔', '🍟', '🥤', '🍦'].map((emoji, i) => (
            <div
              key={i}
              className="hero-emoji-wrapper absolute opacity-15"
              style={{
                top: `${20 + i * 20}%`,
                left:  i % 2 === 0 ? `${5 + i * 3}%` : 'auto',
                right: i % 2 !== 0 ? `${5 + i * 2}%` : 'auto',
              }}
            >
              <span
                className="text-4xl block"
                style={{
                  animation: `float ${3 + i}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {emoji}
              </span>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            variants={FM_FADE_UP}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex justify-center mb-6"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,199,44,0.15)', border: '1px solid #FFC72C', color: '#FFC72C' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#FFC72C] animate-pulse inline-block" />
              نضيف دايمًا للمنيو
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={FM_FADE_UP}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6"
          >
            الطعم اللي{' '}
            <span
              className="relative inline-block"
              style={{ color: '#FFC72C', textShadow: '0 0 40px rgba(255,199,44,0.4)' }}
            >
              بتحبه
              <span
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                style={{ background: '#DA291C' }}
              />
            </span>
            <br />
            <span style={{ color: '#FFC72C' }}>دايمًا</span>{' '}
            <span className="text-white">هنا</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={FM_FADE_UP}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            استمتع بأشهى الوجبات من ماكدونالدز — تحضير طازج في كل لقمة، وتوصيل سريع لباب بيتك!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={FM_FADE_UP}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#offers"
              id="cta-order-now"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl
                font-black text-lg overflow-hidden
                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{
                background: '#FFC72C',
                color: '#DA291C',
                boxShadow: '0 8px 32px rgba(255,199,44,0.35)',
              }}
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
              <span className="text-2xl">🍔</span>
              اطلب دلوقتي
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full text-base font-black
                  group-hover:-translate-x-1 transition-transform duration-300"
                style={{ background: '#DA291C', color: '#FFC72C' }}
              >
                ←
              </span>
            </a>

            <a
              href="#menu-section"
              id="cta-view-menu"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white
                transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              style={{
                border: '2px solid rgba(255,255,255,0.65)',
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.16)'
                e.currentTarget.style.borderColor = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)'
              }}
            >
              <span className="text-2xl">📋</span>
              شوف المنيو
            </a>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            variants={FM_FADE_UP}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-14"
          >
            {[
              { value: '50+',       label: 'وجبة في المنيو' },
              { value: '20 دقيقة', label: 'توصيل سريع' },
              { value: '4.9 ⭐',   label: 'تقييم العملاء' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#FFC72C] leading-tight">{value}</div>
                <div className="text-sm text-white/55 mt-1.5 font-medium">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/45 text-xs font-medium">
          <span>اسكرول للاكتشاف</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/25 flex justify-center pt-2">
            <div
              className="w-1.5 h-3 rounded-full bg-[#FFC72C]"
              style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection
