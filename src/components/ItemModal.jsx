import { useState, useEffect, useRef } from 'react'

// ─── Size Selector ─────────────────────────────────────────────────────────────
const SizeSelector = ({ selected, onChange }) => (
  <div className="flex gap-3">
    {['Regular', 'Large'].map((size) => (
      <button
        key={size}
        onClick={() => onChange(size)}
        className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 border-2"
        style={{
          borderColor: selected === size ? '#FFC72C' : '#e5e7eb',
          background: selected === size ? '#FFC72C' : 'transparent',
          color: selected === size ? '#DA291C' : '#6b7280',
        }}
      >
        {size === 'Regular' ? '📏 ريجولار' : '📦 لارج'}
        <span className="block text-xs mt-0.5 opacity-70">
          {size === 'Large' ? '+15 جنيه' : ''}
        </span>
      </button>
    ))}
  </div>
)

// ─── Nutrition Row ─────────────────────────────────────────────────────────────
const NutritionRow = ({ label, value, unit, color, max }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-gray-500 w-16 shrink-0 text-right">{label}</span>
    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }}
      />
    </div>
    <span className="text-sm font-bold text-gray-800 w-14 text-left">
      {value} {unit}
    </span>
  </div>
)

// ─── Item Detail Modal ─────────────────────────────────────────────────────────
const ItemModal = ({ item, onClose, onAddToCart }) => {
  const [size, setSize] = useState('Regular')
  const [added, setAdded] = useState(false)
  const overlayRef = useRef(null)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const finalPrice = item.price + (item.hasSize && size === 'Large' ? 15 : 0)

  const handleAdd = () => {
    onAddToCart({ ...item, size: item.hasSize ? size : null, finalPrice })
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1400)
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', animation: 'fadeIn 0.2s ease' }}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
        style={{ animation: 'slideUp 0.3s ease' }}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.35)', color: 'white' }}
          aria-label="إغلاق"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative h-56 shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {item.badge && (
            <span
              className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full text-white shadow"
              style={{ background: item.badgeColor }}
            >
              {item.badge}
            </span>
          )}
          <div className="absolute bottom-4 right-4 text-right">
            <h2 className="text-2xl font-black text-white drop-shadow">{item.name}</h2>
            <p className="text-white/80 text-sm">{item.description}</p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5" style={{ direction: 'rtl' }}>

          {/* Size Selector */}
          {item.hasSize && (
            <div>
              <h3 className="font-black text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: '#DA291C' }} />
                اختار المقاس
              </h3>
              <SizeSelector selected={size} onChange={setSize} />
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h3 className="font-black text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: '#DA291C' }} />
              المكونات
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="text-sm px-3 py-1.5 rounded-xl font-medium"
                  style={{ background: 'rgba(218,41,28,0.07)', color: '#DA291C' }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Nutrition Table */}
          <div>
            <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: '#FFC72C' }} />
              القيمة الغذائية
            </h3>
            <div className="space-y-3">
              <NutritionRow label="سعرات" value={item.nutrition.calories} unit="kcal" color="#DA291C" max={800} />
              <NutritionRow label="بروتين" value={item.nutrition.protein} unit="g" color="#27ae60" max={50} />
              <NutritionRow label="دهون" value={item.nutrition.fat} unit="g" color="#e67e22" max={60} />
              <NutritionRow label="كارب" value={item.nutrition.carbs} unit="g" color="#3498db" max={100} />
            </div>

            {/* Nutrition Summary Cards */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { label: 'سعرات', value: item.nutrition.calories, unit: 'kcal', color: '#DA291C', bg: 'rgba(218,41,28,0.08)' },
                { label: 'بروتين', value: `${item.nutrition.protein}g`, unit: '', color: '#27ae60', bg: 'rgba(39,174,96,0.08)' },
                { label: 'دهون', value: `${item.nutrition.fat}g`, unit: '', color: '#e67e22', bg: 'rgba(230,126,34,0.08)' },
                { label: 'كارب', value: `${item.nutrition.carbs}g`, unit: '', color: '#3498db', bg: 'rgba(52,152,219,0.08)' },
              ].map(({ label, value, unit, color, bg }) => (
                <div key={label} className="text-center py-3 px-2 rounded-2xl" style={{ background: bg }}>
                  <div className="font-black text-lg" style={{ color }}>{value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="shrink-0 p-4 border-t border-gray-100 flex items-center gap-4"
          style={{ direction: 'rtl' }}
        >
          <div className="shrink-0 min-w-[75px]">
            <div className="text-xs text-gray-400">السعر</div>
            <div className="font-black text-xl whitespace-nowrap" style={{ color: '#FFC72C' }}>
              {finalPrice} جنيه
            </div>
          </div>
          <button
            onClick={handleAdd}
            id={`modal-add-cart-${item.id}`}
            className="flex-1 py-3.5 rounded-2xl font-black text-base transition-all duration-300 active:scale-95"
            style={{
              background: added
                ? 'linear-gradient(135deg,#27ae60,#2ecc71)'
                : 'linear-gradient(135deg,#DA291C,#c0231a)',
              color: 'white',
              boxShadow: added ? '0 6px 20px rgba(39,174,96,.4)' : '0 6px 20px rgba(218,41,28,.35)',
            }}
          >
            {added ? '✅ تمت الإضافة!' : '🛒 أضف للسلة'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  )
}

export default ItemModal
