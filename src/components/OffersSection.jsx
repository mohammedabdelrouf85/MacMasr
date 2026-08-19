import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Countdown from './Countdown'
import { CONTAINER, SECTION_PY, GRID_3, SECTION_H2, FM_SCALE_IN, FM_FADE_UP, FM_VIEWPORT } from '../styles/tokens'

// ─── Data ─────────────────────────────────────────────────────────────────────
const now = Date.now()
const h = (n) => new Date(now + n * 3600000).toISOString()

const OFFERS = [
  {
    id: 1, category: 'وجبات', name: 'ميل بيج ماك',
    description: 'بيج ماك + فرايز ميديوم + كوك',
    oldPrice: 149, newPrice: 99, discount: 34, deadline: h(5),
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop',
    tag: '🔥 الأكثر مبيعًا', tagColor: '#DA291C',
  },
  {
    id: 2, category: 'وجبات', name: 'ميل كريسبي',
    description: 'ماك كريسبي + فرايز + عصير',
    oldPrice: 135, newPrice: 89, discount: 34, deadline: h(3),
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80&auto=format&fit=crop',
    tag: '⚡ عرض محدود', tagColor: '#e67e22',
  },
  {
    id: 3, category: 'وجبات', name: 'ميل فاميلي',
    description: '4 ساندوتشات + فرايز كبير + 4 كولا',
    oldPrice: 389, newPrice: 249, discount: 36, deadline: h(8),
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&auto=format&fit=crop',
    tag: '👨‍👩‍👧‍👦 عائلي', tagColor: '#27ae60',
  },
  {
    id: 4, category: 'سناكس', name: 'ناجيتس 20 قطعة',
    description: '20 قطعة ناجيتس + صوص BBQ',
    oldPrice: 89, newPrice: 59, discount: 34, deadline: h(2),
    image: 'https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=600&q=80&auto=format&fit=crop',
    tag: '🍗 بيست سيلر', tagColor: '#8e44ad',
  },
  {
    id: 5, category: 'سناكس', name: 'فرايز XL + صوص',
    description: 'فرايز إكسترا لارج مع 3 صوص',
    oldPrice: 55, newPrice: 35, discount: 36, deadline: h(6),
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80&auto=format&fit=crop',
    tag: '🍟 كلاسيك', tagColor: '#b8940a',
  },
  {
    id: 6, category: 'مشروبات', name: 'ماك كافيه كومبو',
    description: 'قهوة + ماك فلاري بالفراولة',
    oldPrice: 75, newPrice: 49, discount: 35, deadline: h(4),
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop',
    tag: '☕ نيو', tagColor: '#2980b9',
  },
]

const TABS = ['الكل', 'وجبات', 'سناكس', 'مشروبات']

// ─── Filter Tabs ───────────────────────────────────────────────────────────────
const FilterTabs = ({ active, onChange }) => {
  const tabRefs = useRef([])
  const [indicator, setIndicator] = useState({})

  useEffect(() => {
    const el = tabRefs.current[TABS.indexOf(active)]
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
  }, [active])

  return (
    <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide w-full">
      <div
        className="relative inline-flex items-center p-1.5 rounded-2xl gap-1 shrink-0"
        style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <span
          className="absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-300 ease-out"
          style={{
            ...indicator,
            background: 'linear-gradient(135deg,#DA291C,#c0231a)',
            boxShadow: '0 4px 12px rgba(218,41,28,0.35)',
          }}
        />
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[i] = el)}
            onClick={() => onChange(tab)}
            id={`filter-tab-${tab}`}
            className="relative z-10 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap shrink-0
              transition-colors duration-300 ease-in-out"
            style={{ color: active === tab ? 'white' : '#555' }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Offer Card ────────────────────────────────────────────────────────────────
const OfferCard = ({ offer, index }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [added, setAdded] = useState(false)

  return (
    <motion.article
      variants={FM_SCALE_IN}
      initial="hidden"
      whileInView="visible"
      viewport={FM_VIEWPORT}
      custom={index}
      className="group bg-white rounded-3xl overflow-hidden flex flex-col h-full
        transition-all duration-300 ease-in-out
        hover:scale-[1.025] hover:shadow-2xl hover:shadow-black/12"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden bg-gray-100 shrink-0">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full border-4 border-[#FFC72C] border-t-transparent animate-spin" />
          </div>
        )}
        <img
          src={offer.image}
          alt={offer.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500
            group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Discount badge */}
        <div
          className="absolute top-3 right-3 w-14 h-14 rounded-full flex flex-col items-center
            justify-center font-black text-white shadow-lg"
          style={{ background: '#DA291C' }}
        >
          <span className="text-lg leading-none">{offer.discount}%</span>
          <span className="text-[9px] leading-none mt-0.5">خصم</span>
        </div>

        {/* Tag */}
        <div
          className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow"
          style={{ background: offer.tagColor }}
        >
          {offer.tag}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4" style={{ direction: 'rtl' }}>
        <div className="flex-1">
          <h3 className="font-black text-gray-900 text-lg leading-snug mb-1">{offer.name}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{offer.description}</p>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-2xl font-black" style={{ color: '#FFC72C' }}>
            {offer.newPrice} جنيه
          </span>
          <span className="text-gray-400 text-sm line-through font-medium">
            {offer.oldPrice} جنيه
          </span>
          <span
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ background: 'rgba(218,41,28,0.09)', color: '#DA291C' }}
          >
            وفّر {offer.oldPrice - offer.newPrice} جنيه
          </span>
        </div>

        {/* Countdown */}
        <div
          className="flex items-center gap-3 py-3 px-4 rounded-2xl"
          style={{ background: 'rgba(218,41,28,0.04)', border: '1px dashed rgba(218,41,28,0.2)' }}
        >
          <span className="text-xs font-bold text-gray-500 shrink-0">ينتهي خلال</span>
          <Countdown deadline={offer.deadline} />
        </div>

        {/* CTA */}
        <button
          onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
          id={`order-offer-${offer.id}`}
          className="mt-auto w-full py-3.5 rounded-2xl font-black text-base
            transition-all duration-300 ease-in-out active:scale-95 relative overflow-hidden"
          style={{
            background: added
              ? 'linear-gradient(135deg,#27ae60,#2ecc71)'
              : 'linear-gradient(135deg,#DA291C,#c0231a)',
            color: 'white',
            boxShadow: added
              ? '0 6px 20px rgba(39,174,96,0.4)'
              : '0 6px 20px rgba(218,41,28,0.3)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            {added ? <>✅ تمت الإضافة للسلة</> : <>🛒 اطلب العرض <span className="text-[#FFC72C]">←</span></>}
          </span>
          {!added && (
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.07]
              transition-opacity duration-300" />
          )}
        </button>
      </div>
    </motion.article>
  )
}

// ─── Offers Section ────────────────────────────────────────────────────────────
const OffersSection = () => {
  const [activeTab, setActiveTab] = useState('الكل')
  const filtered = activeTab === 'الكل' ? OFFERS : OFFERS.filter((o) => o.category === activeTab)

  return (
    <section
      id="offers"
      className={`${SECTION_PY} px-4 md:px-8`}
      style={{
        direction: 'rtl',
        background: 'linear-gradient(180deg,#fff8f8 0%,#ffffff 50%,#fffdf0 100%)',
      }}
    >
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          variants={FM_FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={FM_VIEWPORT}
          custom={0}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(to left,#DA291C,transparent)' }} />
            <span
              className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(218,41,28,0.08)', color: '#DA291C' }}
            >
              ⚡ عروض لفترة محدودة
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(to right,#DA291C,transparent)' }} />
          </div>

          <h2 className={`${SECTION_H2} text-gray-900`}>
            أقوى{' '}
            <span className="relative inline-block" style={{ color: '#DA291C' }}>
              العروض
              <svg className="absolute -bottom-2 left-0 right-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 9C50 3 100 12 198 4" stroke="#FFC72C" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>{' '}
            النهارده 🔥
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            استغل العروض دي قبل ما تخلص! خصومات تصل لـ 36% على أشهى الوجبات
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <FilterTabs active={activeTab} onChange={setActiveTab} />

        {/* Cards Grid — 3 cols with equal height */}
        <div key={activeTab} className={GRID_3}>
          {filtered.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <a
            href="#menu-section"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-base
              transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              background: 'linear-gradient(135deg,#FFC72C,#f0b800)',
              color: '#DA291C',
              boxShadow: '0 8px 24px rgba(255,199,44,0.35)',
            }}
          >
            شوف المنيو الكامل
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center font-black"
              style={{ background: '#DA291C', color: '#FFC72C' }}
            >
              ←
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default OffersSection
