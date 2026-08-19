import { CONTAINER } from '../styles/tokens'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="pt-16 pb-6 relative overflow-hidden"
      style={{
        direction: 'rtl',
        background: 'linear-gradient(180deg,#181818 0%,#0a0a0a 100%)',
        color: 'white',
      }}
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#DA291C] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFC72C] opacity-5 rounded-full blur-3xl" />

      <div className={`relative z-10 ${CONTAINER}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#DA291C] flex items-center justify-center shadow-lg font-black text-xl text-[#FFC72C]">
                M
              </div>
              <span className="font-black text-2xl tracking-tight">ماك<span className="text-[#DA291C]">مصر</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed pr-2 border-r-2 border-[#DA291C]/30">
              أصل الطعم اللي بتحبه، بنقدم أفضل جودة بأعلى معايير النظافة العالمية في كل فروعنا من 1994.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-black text-lg mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#FFC72C]" />
              روابط سريعة
            </h4>
            <ul className="flex flex-col gap-3">
              {['الرئيسية', 'المنيو', 'أقوى العروض', 'فروعنا', 'الدعم والمساعدة'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white hover:pr-2 transition-all text-sm flex items-center gap-1.5 before:content-['›'] before:text-[#DA291C]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h4 className="font-black text-lg mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#FFC72C]" />
              سياسات وشروط
            </h4>
            <ul className="flex flex-col gap-3">
              {['سياسة الخصوصية', 'الشروط والأحكام', 'سياسة الاسترجاع', 'معلومات التغذية', 'مسؤوليتنا المجتمعية'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white hover:pr-2 transition-all text-sm flex items-center gap-1.5 before:content-['›'] before:text-[#DA291C]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div>
            <h4 className="font-black text-lg mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#FFC72C]" />
              النشرة البريدية
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              اشترك عشان توصلك أحدث عروضنا وتخفيضاتنا الحصرية.
            </p>
            <form className="flex gap-2 mb-6" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFC72C] transition-colors text-left dir-ltr placeholder:text-right"
              />
              <button
                type="submit"
                className="bg-[#DA291C] hover:bg-[#b01f15] text-white px-4 rounded-xl text-sm font-bold transition-colors"
              >
                اشترك
              </button>
            </form>
            
            <div className="flex gap-3">
              {['📱', '📸', '🎵', '🐦'].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFC72C] hover:text-[#DA291C] transition-all hover:scale-110">
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Line: Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-gray-500 text-xs font-medium">
            جميع الحقوق محفوظة © {currentYear} ماكدونالدز مصر (مثال تجريبي)
          </p>
          <div className="flex gap-4 text-gray-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">عربي</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white transition-colors">English</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
