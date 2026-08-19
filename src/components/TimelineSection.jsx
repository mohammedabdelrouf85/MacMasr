import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CONTAINER, SECTION_PY, SECTION_H2, FM_VIEWPORT } from '../styles/tokens'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE_DATA = [
  {
    year: '1940',
    title: 'البداية الحقيقية',
    description: 'افتتاح أول مطعم ماكدونالدز على يد الأخوين ديك وماك ماكدونالد في كاليفورنيا، بقائمة طعام بسيطة بتركز على البرجر، البطاطس، والمشروبات.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&auto=format&fit=crop', // Burger image
  },
  {
    year: '1955',
    title: 'تأسيس الشركة العالمية',
    description: 'راي كروك بيفتتح أول مطعم ليه بنظام الفرانشايز (الامتياز التجاري) في إلينوي، وبيأسس شركة ماكدونالدز كوربوريشن اللي نعرفها النهاردة.',
    image: null,
  },
  {
    year: '1968',
    title: 'اختراع البيج ماك',
    description: 'إطلاق الساندوتش الأيقوني "بيج ماك" اللي غير مفهوم الفاست فود في العالم كله، وأصبح رمز للعلامة التجارية.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop',
  },
  {
    year: '1994',
    title: 'وصول ماكدونالدز لمصر',
    description: 'افتتاح أول فرع في مصر، وبداية رحلتنا في تقديم أفضل طعم وتجربة لكل عيلة مصرية بمعايير جودة عالمية وتفضيلات محلية.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80&auto=format&fit=crop',
  },
  {
    year: '2024',
    title: 'التطور مستمر',
    description: 'أكتر من 100 فرع في مصر، بنقدم طرق طلب ذكية وتوصيل أسرع، وبنلتزم بخدمة المجتمع وتطوير مهارات شبابنا.',
    image: null,
  }
]

// Framer Motion variants
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const slideInMobile = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const TimelineSection = () => {
  const container = useRef(null)

  useGSAP(() => {
    gsap.to('.timeline-line', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    })
  }, { scope: container })

  return (
    <section
      ref={container}
      id="timeline-section"
      className={`${SECTION_PY} px-4 md:px-8 bg-white relative overflow-hidden`}
      style={{ direction: 'rtl' }}
    >
      <div className={CONTAINER}>
        
        {/* Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={FM_VIEWPORT}
          custom={0}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(to left,#DA291C,transparent)' }} />
            <span
              className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(218,41,28,0.08)', color: '#DA291C' }}
            >
              📖 قصتنا
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(to right,#DA291C,transparent)' }} />
          </div>
          <h2 className={`${SECTION_H2} text-gray-900`}>
            رحلة <span style={{ color: '#DA291C' }}>الطعم</span> اللي بتحبه 🍔
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            من مطعم صغير في كاليفورنيا لإمبراطورية عالمية، دي محطاتنا الأهم
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div
            className="absolute top-0 bottom-0 right-8 translate-x-1/2 md:right-1/2 w-1.5 bg-gray-100 rounded-full md:translate-x-1/2 overflow-hidden"
          >
            <div
              className="timeline-line absolute top-0 left-0 right-0 h-full rounded-full"
              style={{ background: 'linear-gradient(180deg,#FFC72C,#DA291C)', transformOrigin: 'top', transform: 'scaleY(0)' }}
            />
          </div>

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div key={item.year} className="relative flex flex-col md:flex-row items-center md:justify-between group">
                  
                  {/* Timeline Node (Dot) */}
                  <div
                    className="absolute right-8 translate-x-1/2 md:right-1/2 md:translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shadow-md z-10
                      transition-transform duration-300 group-hover:scale-125 group-hover:shadow-lg"
                    style={{ background: '#FFC72C' }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#DA291C]" />
                  </div>

                  {/* Desktop Layout - Left Side Content */}
                  <motion.div
                    variants={isEven ? slideInRight : slideInLeft} // Because RTL, right side is visually right, but logically left? Wait.
                    // Let's just use mobile animation for mobile and desktop for desktop, or handle it via CSS classes
                    initial="hidden"
                    whileInView="visible"
                    viewport={FM_VIEWPORT}
                    className={`w-full md:w-5/12 hidden md:block ${isEven ? 'text-left pl-8' : 'text-right pr-8 order-2'}`}
                  >
                    {isEven ? (
                      <div className="flex flex-col gap-3">
                        <span className="text-[#DA291C] font-black text-4xl leading-none">{item.year}</span>
                        <h3 className="font-bold text-2xl text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        {item.image && (
                          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 h-48 w-full">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <span className="text-[#DA291C] font-black text-4xl leading-none">{item.year}</span>
                        <h3 className="font-bold text-2xl text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        {item.image && (
                          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 h-48 w-full">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Empty space for the other side (Desktop) */}
                  <div className={`w-full md:w-5/12 hidden md:block ${isEven ? 'order-2' : ''}`}></div>

                  {/* Mobile Layout */}
                  <motion.div
                    variants={slideInMobile}
                    initial="hidden"
                    whileInView="visible"
                    viewport={FM_VIEWPORT}
                    className="w-full md:hidden pr-20 relative pt-2"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[#DA291C] font-black text-3xl leading-none">{item.year}</span>
                      <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                      {item.image && (
                        <div className="mt-3 rounded-2xl overflow-hidden shadow-md h-40 w-full">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
