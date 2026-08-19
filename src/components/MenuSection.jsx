import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MENU_TABS, MENU_ITEMS } from '../data/menuData'
import MenuItem from './MenuItem'
import ItemModal from './ItemModal'
import { CONTAINER, SECTION_PY, GRID_4, SECTION_H2, FM_SCALE_IN, FM_FADE_UP, FM_VIEWPORT } from '../styles/tokens'

// ─── Cart Toast ────────────────────────────────────────────────────────────────
const CartToast = ({ item, onDismiss }) => {
  useEffect(() => {
    const id = setTimeout(onDismiss, 3000)
    return () => clearTimeout(id)
  }, [onDismiss])

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40
        flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bold text-sm"
      style={{
        background: 'linear-gradient(135deg,#27ae60,#2ecc71)',
        animation: 'toastIn 0.35s ease',
        minWidth: 260,
      }}
    >
      <span className="text-xl">✅</span>
      <span>"{item.name}" اتضاف للسلة!</span>
      <button
        onClick={onDismiss}
        className="mr-auto opacity-70 hover:opacity-100 text-base transition-opacity duration-200"
      >
        ✕
      </button>
      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translate(-50%,24px); }
          to   { opacity:1; transform:translate(-50%,0); }
        }
      `}</style>
    </div>
  )
}

// ─── Menu Section ──────────────────────────────────────────────────────────────
const MenuSection = () => {
  const [activeTab, setActiveTab]     = useState('burger')
  const [selectedItem, setSelectedItem] = useState(null)
  const [cartCount, setCartCount]     = useState(0)
  const [toast, setToast]             = useState(null)
  const tabsRef = useRef(null)

  const filtered = MENU_ITEMS.filter((i) => i.category === activeTab)

  const handleAddToCart = (item) => {
    setCartCount((c) => c + 1)
    setToast(item)
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    tabsRef.current
      ?.querySelector(`[data-tab="${tabId}"]`)
      ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section
      id="menu-section"
      className={`${SECTION_PY} px-4 md:px-8`}
      style={{
        direction: 'rtl',
        background: 'linear-gradient(180deg,#181818 0%,#2d1a1a 50%,#181818 100%)',
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
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(to left,#FFC72C,transparent)' }} />
            <span
              className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(255,199,44,0.12)', color: '#FFC72C', border: '1px solid rgba(255,199,44,0.25)' }}
            >
              🍽️ قائمة الطعام الكاملة
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(to right,#FFC72C,transparent)' }} />
          </div>

          <h2 className={`${SECTION_H2} text-white`}>
            اختار <span style={{ color: '#FFC72C' }}>وجبتك</span> المفضلة 😋
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            اضغط على أي وجبة لتشوف التفاصيل الكاملة والقيمة الغذائية
          </p>

          {cartCount > 0 && (
            <div
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full font-bold text-sm"
              style={{ background: 'rgba(255,199,44,0.12)', color: '#FFC72C', border: '1px solid rgba(255,199,44,0.3)' }}
            >
              🛒 السلة: {cartCount} {cartCount === 1 ? 'صنف' : 'أصناف'}
            </div>
          )}
        </motion.div>

        {/* Tab Bar */}
        <div
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto pb-2 mb-10 justify-center scrollbar-hide"
        >
          {MENU_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => handleTabChange(tab.id)}
                id={`menu-tab-${tab.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm
                  whitespace-nowrap shrink-0
                  transition-all duration-300 ease-in-out"
                style={{
                  background: isActive ? 'linear-gradient(135deg,#FFC72C,#f0b800)' : 'rgba(255,255,255,0.06)',
                  color:      isActive ? '#DA291C' : 'rgba(255,255,255,0.55)',
                  boxShadow:  isActive ? '0 6px 20px rgba(255,199,44,0.35)' : 'none',
                  border:     isActive ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  transform:  isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <span className="text-lg">{tab.emoji}</span>
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Cards Grid — 4 cols desktop / 2 tablet / 1 mobile, equal height via h-full */}
        <div key={activeTab} className={GRID_4}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              variants={FM_SCALE_IN}
              initial="hidden"
              animate="visible"
              custom={i}
              className="flex"   /* flex so the inner article can use h-full */
            >
              <MenuItem
                item={item}
                onOpenModal={setSelectedItem}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-xs mt-10">
          * جميع الأسعار بالجنيه المصري وتشمل الضريبة. القيمة الغذائية تقريبية.
        </p>
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {toast && <CartToast item={toast} onDismiss={() => setToast(null)} />}
    </section>
  )
}

export default MenuSection
