import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'العروض',   href: '#offers' },
  { label: 'المنيو',   href: '#menu-section' },
  { label: 'إحصائياتنا', href: '#stats-section' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Unified transition class
  const navBase =
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out'
  const navScrolled = 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-2'
  const navTop      = 'bg-transparent py-4'

  return (
    <nav className={`${navBase} ${scrolled ? navScrolled : navTop}`} id="main-nav">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <a href="#hero" className="flex items-center gap-3 group" aria-label="ماك مصر - الرئيسية">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl font-black shadow-lg
                group-hover:scale-110 transition-transform duration-300"
              style={{ background: 'linear-gradient(135deg, #DA291C, #FFC72C)' }}
            >
              M
            </div>
            <span
              className={`text-xl font-black tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-[#DA291C]' : 'text-white'
              }`}
            >
              ماك<span className="text-[#FFC72C]">مصر</span>
            </span>
          </a>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`relative font-semibold text-sm tracking-wide transition-colors duration-300
                  after:absolute after:-bottom-0.5 after:right-0 after:h-0.5 after:w-0
                  after:bg-[#FFC72C] after:transition-all after:duration-300 hover:after:w-full
                  ${scrolled ? 'text-gray-700 hover:text-[#DA291C]' : 'text-white hover:text-[#FFC72C]'}`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            <a
              href="#offers"
              id="nav-cta"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl
                font-bold text-sm bg-[#DA291C] text-white
                hover:bg-[#FFC72C] hover:text-[#DA291C]
                transition-all duration-300 ease-in-out
                shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              🛒 اطلب الآن
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-xl transition-colors duration-300"
              style={{ color: scrolled ? '#1f2937' : 'white' }}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
            >
              <span
                className="block w-5 h-0.5 mb-1.5 rounded transition-all duration-300"
                style={{
                  background: scrolled ? '#1f2937' : 'white',
                  transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : '',
                }}
              />
              <span
                className="block w-5 h-0.5 mb-1.5 rounded transition-all duration-300"
                style={{
                  background: scrolled ? '#1f2937' : 'white',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 rounded transition-all duration-300"
                style={{
                  background: scrolled ? '#1f2937' : 'white',
                  transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : '',
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: menuOpen ? 320 : 0, opacity: menuOpen ? 1 : 0 }}
        >
          <div
            className="py-4 px-4 mt-2 rounded-2xl space-y-1"
            style={{
              background: scrolled ? 'white' : 'rgba(10,10,10,0.75)',
              backdropFilter: 'blur(12px)',
              border: scrolled ? '1px solid #f3f4f6' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 px-3 text-right font-semibold rounded-xl
                  transition-colors duration-200
                  ${scrolled
                    ? 'text-gray-700 hover:text-[#DA291C] hover:bg-red-50'
                    : 'text-white hover:text-[#FFC72C] hover:bg-white/10'
                  }`}
              >
                {label}
              </a>
            ))}
            <a
              href="#offers"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 py-3 text-center rounded-2xl font-black text-white"
              style={{ background: '#DA291C' }}
            >
              🛒 اطلب الآن
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
