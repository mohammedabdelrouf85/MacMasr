import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTAINER, SECTION_PY, SECTION_H2, FM_VIEWPORT, FM_FADE_UP, FM_SCALE_IN } from '../styles/tokens'

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'مواعيد توصيل الطلبات؟',
    a: 'بنقدم خدمة التوصيل 24 ساعة في معظم فروعنا عشان تستمتع بوجبتك المفضلة في أي وقت.',
  },
  {
    q: 'إزاي أقدر أسترجع فلوسي لو الطلب اتأخر؟',
    a: 'لو الطلب اتأخر عن الوقت المحدد، تقدر تتواصل معانا على الخط الساخن 19999 وسيتم مراجعة الطلب وتعويضك فوراً.',
  },
  {
    q: 'إزاي أتتبع الطلب بتاعي؟',
    a: 'بمجرد تأكيد الطلب، هيوصلك رسالة فيها لينك لتتبع الطلب خطوة بخطوة لحد باب البيت.',
  },
  {
    q: 'هل العروض متاحة في كل الفروع؟',
    a: 'معظم العروض متاحة في كل الفروع والتوصيل، لكن بعض العروض بتكون حصرية للطلبات من خلال الأبلكيشن.',
  },
]

const FORM_OPTIONS = ['شكوى', 'استفسار عن طلب', 'اقتراح', 'مشكلة دفع']

// ─── FAQ Item Component ────────────────────────────────────────────────────────
const FaqItem = ({ faq, isOpen, onClick }) => (
  <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-right transition-colors"
      style={{ background: isOpen ? '#fffdfdf' : 'white' }}
    >
      <span className="font-bold text-gray-900 pr-2">{faq.q}</span>
      <span
        className="w-8 h-8 flex items-center justify-center rounded-full shrink-0 transition-transform duration-300"
        style={{
          background: isOpen ? '#DA291C' : 'rgba(218,41,28,0.08)',
          color: isOpen ? 'white' : '#DA291C',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        ▼
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-5 pt-0 text-gray-600 leading-relaxed text-sm pr-7">
            {faq.a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

// ─── Support Section ───────────────────────────────────────────────────────────
const SupportSection = () => {
  const [openFaq, setOpenFaq] = useState(0)
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', type: FORM_OPTIONS[0], message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب'
    if (!formData.phone.match(/^01[0125][0-9]{8}$/)) newErrors.phone = 'رقم موبايل مصري غير صحيح'
    if (!formData.message.trim()) newErrors.message = 'الرسالة مطلوبة'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', phone: '', type: FORM_OPTIONS[0], message: '' })
      setTimeout(() => setIsSuccess(false), 4000)
    }, 1500)
  }

  return (
    <section
      id="support-section"
      className={`${SECTION_PY} px-4 md:px-8 bg-gray-50 relative`}
      style={{ direction: 'rtl' }}
    >
      <div className={CONTAINER}>
        
        {/* Header */}
        <motion.div
          variants={FM_FADE_UP}
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
              🤝 الدعم والمساعدة
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(to right,#DA291C,transparent)' }} />
          </div>
          <h2 className={`${SECTION_H2} text-gray-900`}>
            إحنا هنا عشان <span style={{ color: '#DA291C' }}>نسمعك</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            عندك استفسار أو مشكلة؟ تواصل معانا في أي وقت وهنرد عليك فوراً.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Right Column: Contact Info & FAQ */}
          <motion.div
            variants={FM_SCALE_IN}
            initial="hidden"
            whileInView="visible"
            viewport={FM_VIEWPORT}
            custom={1}
            className="flex flex-col gap-10"
          >
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl bg-red-50 text-red-600 group-hover:scale-110 transition-transform">
                  📞
                </div>
                <h4 className="font-bold text-gray-900 mb-1">الخط الساخن</h4>
                <p className="text-gray-500 text-sm mb-3">متوفر 24 ساعة للطلبات والشكاوى</p>
                <a href="tel:19999" className="font-black text-2xl text-[#DA291C] hover:text-[#b01f15]">19999</a>
              </div>
              
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <h4 className="font-bold text-gray-900 mb-1">واتساب</h4>
                <p className="text-gray-500 text-sm mb-3">فريقنا جاهز يرد على استفساراتك</p>
                <a href="#" className="font-bold text-lg text-green-600 hover:text-green-700 dir-ltr">
                  +20 100 000 0000
                </a>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="font-black text-2xl text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full inline-block" style={{ background: '#FFC72C' }} />
                الأسئلة الشائعة
              </h3>
              <div className="flex flex-col gap-3">
                {FAQS.map((faq, idx) => (
                  <FaqItem
                    key={idx}
                    faq={faq}
                    isOpen={openFaq === idx}
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  />
                ))}
              </div>
            </div>
            
            {/* Social & Map */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">تابعنا على السوشيال ميديا</h4>
                  <p className="text-sm text-gray-500 mt-1">عشان تعرف أحدث عروضنا</p>
                </div>
                <div className="flex gap-2">
                  {['📱', '📸', '🎵'].map((icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg hover:bg-[#FFC72C] hover:text-[#DA291C] transition-colors">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
              <div className="h-48 bg-gray-200 relative">
                {/* Embed Map (Placeholder using iframe) */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60389552702!2d31.176774!3d30.0596185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1715000000000!5m2!1sen!2seg" 
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="أقرب فرع ماكدونالدز"
                ></iframe>
              </div>
            </div>

          </motion.div>

          {/* Left Column: Contact Form */}
          <motion.div
            variants={FM_SCALE_IN}
            initial="hidden"
            whileInView="visible"
            viewport={FM_VIEWPORT}
            custom={2}
          >
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Form decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC72C] opacity-10 rounded-bl-[100px]" />
              
              <h3 className="font-black text-2xl text-center text-gray-900 mb-2 relative z-10">ابعتلنا رسالة 📧</h3>
              <p className="text-gray-500 text-center mb-8 relative z-10">املأ البيانات دي وهنتواصل معاك في أسرع وقت.</p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-4 text-green-500">
                    ✅
                  </div>
                  <h4 className="font-black text-2xl text-gray-900 mb-2">تم الإرسال بنجاح!</h4>
                  <p className="text-gray-500">شكراً لرسالتك. فريقنا هيراجعها ويتواصل معاك قريباً.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                  
                  {/* Name */}
                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-3 text-center">الاسم بالكامل</label>
                    <input
                      type="text"
                      placeholder="اكتب اسمك هنا"
                      value={formData.name}
                      onChange={(e) => { setFormData({...formData, name: e.target.value}); if(errors.name) setErrors({...errors, name: ''}) }}
                      className={`w-full text-center bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#DA291C] focus:bg-white transition-colors`}
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1.5 font-bold block text-center">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-3 text-center">رقم الموبايل</label>
                    <input
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => { setFormData({...formData, phone: e.target.value}); if(errors.phone) setErrors({...errors, phone: ''}) }}
                      className={`w-full text-center bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#DA291C] focus:bg-white transition-colors`}
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1.5 font-bold block text-center">{errors.phone}</span>}
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-3 text-center">نوع الرسالة</label>
                    <div className="relative">
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full text-center bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 appearance-none focus:outline-none focus:border-[#DA291C] focus:bg-white transition-colors cursor-pointer"
                      >
                        {FORM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-3 text-center">تفاصيل الرسالة</label>
                    <textarea
                      rows="4"
                      placeholder="اكتب كل التفاصيل اللي عايز تبلغنا بيها..."
                      value={formData.message}
                      onChange={(e) => { setFormData({...formData, message: e.target.value}); if(errors.message) setErrors({...errors, message: ''}) }}
                      className={`w-full text-center bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#DA291C] focus:bg-white transition-colors resize-none`}
                    ></textarea>
                    {errors.message && <span className="text-red-500 text-xs mt-1.5 font-bold block text-center">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg,#DA291C,#c0231a)',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(218,41,28,0.3)',
                    }}
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 rounded-full border-4 border-white/30 border-t-white animate-spin block" />
                    ) : (
                      <>
                        إرسال الرسالة 🚀
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default SupportSection
