import { useState } from 'react'

// ─── MenuItem Card ─────────────────────────────────────────────────────────────
const MenuItem = ({ item, onOpenModal, onAddToCart }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    setAdded(true)
    onAddToCart({ ...item, size: null, finalPrice: item.price })
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <article
      className="group bg-white rounded-3xl overflow-hidden flex flex-col w-full h-full cursor-pointer
        transition-all duration-300 ease-in-out
        hover:scale-[1.025] hover:shadow-2xl hover:shadow-black/10"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
      onClick={() => onOpenModal(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpenModal(item)}
      aria-label={`عرض تفاصيل ${item.name}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100 shrink-0">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-[#FFC72C] border-t-transparent animate-spin" />
          </div>
        )}
        <img
          src={item.image}
          alt={item.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* Badge */}
        {item.badge && (
          <span
            className="absolute top-2.5 right-2.5 text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow"
            style={{ background: item.badgeColor }}
          >
            {item.badge}
          </span>
        )}

        {/* Quick-add hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-white font-bold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
            👁️ تفاصيل أكتر
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2" style={{ direction: 'rtl' }}>
        <div className="flex-1">
          <h3 className="font-black text-gray-900 text-base leading-snug mb-1">{item.name}</h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
        </div>

        {/* Price + Buttons */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <span
            className="font-black text-xl"
            style={{ color: '#FFC72C', textShadow: '0 0 16px rgba(255,199,44,0.25)' }}
          >
            {item.price} جنيه
          </span>
          <div className="flex gap-2">
            {/* Details button */}
            <button
              onClick={(e) => { e.stopPropagation(); onOpenModal(item) }}
              id={`details-${item.id}`}
              className="px-3 py-2 rounded-2xl text-xs font-bold
                transition-all duration-300 ease-in-out hover:scale-105 border-2"
              style={{ borderColor: '#DA291C', color: '#DA291C' }}
            >
              تفاصيل
            </button>
            {/* Add to cart */}
            <button
              onClick={handleAdd}
              id={`add-cart-${item.id}`}
              className="px-3 py-2 rounded-2xl text-xs font-bold
                transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 min-w-[70px]"
              style={{
                background: added
                  ? 'linear-gradient(135deg,#27ae60,#2ecc71)'
                  : 'linear-gradient(135deg,#DA291C,#c0231a)',
                color: 'white',
                boxShadow: added ? '0 4px 12px rgba(39,174,96,.35)' : '0 4px 12px rgba(218,41,28,.3)',
              }}
            >
              {added ? '✅' : '🛒 أضف'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MenuItem
