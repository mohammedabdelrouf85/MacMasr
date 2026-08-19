// ─── Design Tokens — Single Source of Truth ──────────────────────────────────
// Import this in any component that needs consistent spacing / styles

export const COLORS = {
  red:    '#DA291C',
  yellow: '#FFC72C',
  dark:   '#1a1a1a',
}

// Unified section container — apply to every <div> wrapping section content
export const CONTAINER = 'max-w-7xl mx-auto px-4 md:px-8'

// Unified section vertical padding
export const SECTION_PY = 'py-20'

// Unified card gap
export const CARD_GAP = 'gap-6'

// Unified grid breakpoints for meal / offer cards
export const GRID_3 = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${CARD_GAP}`
export const GRID_4 = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${CARD_GAP}`

// Unified section H2 style  (apply as className)
export const SECTION_H2 = 'text-4xl sm:text-5xl font-black leading-tight mb-4'

// Unified section subtitle style
export const SECTION_SUB = 'text-lg leading-relaxed max-w-xl mx-auto mb-14'

// Unified primary button (red → hover yellow)
export const BTN_PRIMARY =
  'inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm ' +
  'transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95'

// Unified outline button (white border)
export const BTN_OUTLINE =
  'inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 ' +
  'transition-all duration-300 ease-in-out hover:scale-105 active:scale-95'

// Shared Framer Motion viewport settings — reuse everywhere
export const FM_VIEWPORT = { once: true, amount: 0.15 }

// Shared fade+slide-up variants
export const FM_FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

// Shared scale-in variant for cards
export const FM_SCALE_IN = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
}
